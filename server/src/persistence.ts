import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CampfireCooking, CatchEntry, Room } from './types.js';
import type { CatchRecord } from './inventory.js';
import { FISH_CONFIG } from '../../shared/fishConfig.js';
import { applyScrapOverride, effectiveKoiEmasCount, normalizeShopData, payFactor, resetDailyIfNeeded, sellPrice, SHOP_CONFIG, type ShopEquipped, type ShopPlayerData } from './shop.js';

export interface PlayerFishData {
  items: CatchRecord[];
  totalCaught: number;
  personalBest: CatchRecord | null;
  collection: CatchRecord[];
  crocodilesSlain: number;
  bowlingBestScore: number;
  shop: ShopPlayerData;
}

export interface PersistentGameDataStore {
  load(): Promise<void>;
  hydrateRoom(room: Room): void;
  playerFish(roomId: string, playerName: string): PlayerFishData;
  recordCrocodileKill(roomId: string, playerName: string): Promise<number>;
  recordBowlingBestScore(roomId: string, playerName: string, score: number): Promise<number>;
  recordCatch(roomId: string, playerName: string, entry: CatchEntry, item: CatchRecord): Promise<void>;
  recordJunk(roomId: string, playerName: string, item: CatchRecord): Promise<void>;
  releaseFish(roomId: string, playerName: string, catchId: string): Promise<boolean>;
  startCooking(roomId: string, playerName: string, catchId: string, cooking: CampfireCooking): Promise<boolean>;
  finishCooking(roomId: string, cookId: string): Promise<boolean>;
  flush(): Promise<void>;
  playerEconomy(roomId: string, playerName: string): ShopPlayerData;
  sellFish(roomId: string, playerName: string, species: string, count: number | 'all'): Promise<{ coins: number; scrap: number; sold: number; gained: number; items: CatchRecord[] }>;
  buyItem(roomId: string, playerName: string, itemId: string): Promise<{ ok: boolean; reason?: string; shop: ShopPlayerData; items: CatchRecord[] }>;
  equipItem(roomId: string, playerName: string, slot: keyof ShopEquipped, itemId: string | null): Promise<{ ok: boolean; reason?: string; shop: ShopPlayerData }>;
  pinItem(roomId: string, playerName: string, itemId: string | null): Promise<ShopPlayerData>;
  toggleChair(roomId: string, playerName: string): Promise<{ seated: boolean; shop: ShopPlayerData }>;
}

interface StoredPlayer {
  inventory: CatchRecord[];
  crocodilesSlain?: number;
  bowlingBestScore?: number;
  shop?: Partial<ShopPlayerData>;
}

interface StoredRoom {
  catches: CatchEntry[];
  players: Record<string, StoredPlayer>;
  campfireCooking: CampfireCooking | null;
}

interface StoredGameData {
  version: 1;
  rooms: Record<string, StoredRoom>;
}

export const DEFAULT_GAME_DATA_FILE = fileURLToPath(new URL('../data/pond-data.json', import.meta.url));

export class JsonGameDataStore implements PersistentGameDataStore {
  private data: StoredGameData = { version: 1, rooms: {} };
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(private readonly filePath = process.env.GAME_DATA_FILE || DEFAULT_GAME_DATA_FILE) {}

  async load(): Promise<void> {
    let raw: string;
    try {
      raw = await readFile(this.filePath, 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw error;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || (parsed as StoredGameData).version !== 1 ||
        !(parsed as StoredGameData).rooms || typeof (parsed as StoredGameData).rooms !== 'object') {
      throw new Error(`Unsupported or invalid game data file: ${this.filePath}`);
    }
    this.data = parsed as StoredGameData;
    for (const room of Object.values(this.data.rooms)) {
      for (const [playerKey, player] of Object.entries(room.players)) {
        player.shop = normalizeShopData(player.shop);
        if (!Array.isArray(player.inventory)) player.inventory = [];
      }
    }
  }

  hydrateRoom(room: Room): void {
    const stored = this.data.rooms[room.id];
    room.campfireCooking = stored?.campfireCooking ?? null;
    room.leaderboard = (stored?.catches ?? [])
      .slice()
      .sort((a, b) => b.weightKg - a.weightKg || a.timestamp - b.timestamp)
      .slice(0, FISH_CONFIG.leaderboard.maxEntries);
    room.personalBests.clear();
    for (const entry of stored?.catches ?? []) {
      const key = normalizePlayerName(entry.playerName);
      const previous = room.personalBests.get(key);
      if (!previous || entry.weightKg > previous.weightKg) room.personalBests.set(key, entry);
    }
  }

  playerFish(roomId: string, playerName: string): PlayerFishData {
    const room = this.data.rooms[roomId];
    const playerKey = normalizePlayerName(playerName);
    const catches = (room?.catches ?? []).filter((entry) => normalizePlayerName(entry.playerName) === playerKey);
    const bestCatch = catches.reduce<CatchEntry | null>((best, entry) => !best || entry.weightKg > best.weightKg ? entry : best, null);
    const speciesBest = new Map<string, CatchEntry>();
    for (const entry of catches) {
      const previous = speciesBest.get(entry.species);
      if (!previous || entry.weightKg > previous.weightKg) speciesBest.set(entry.species, entry);
    }
    return {
      items: (room?.players[playerKey]?.inventory ?? []).map((item) => ({ ...item })),
      totalCaught: catches.length,
      personalBest: bestCatch ? catchRecord(bestCatch) : null,
      collection: [...speciesBest.values()].map(catchRecord),
      crocodilesSlain: room?.players[playerKey]?.crocodilesSlain ?? 0,
      bowlingBestScore: room?.players[playerKey]?.bowlingBestScore ?? 0,
      shop: normalizeShopData(room?.players[playerKey]?.shop),
    };
  }

  recordCrocodileKill(roomId: string, playerName: string): Promise<number> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    player.crocodilesSlain = (player.crocodilesSlain ?? 0) + 1;
    const count = player.crocodilesSlain;
    return this.queueWrite().then(() => count);
  }

  recordBowlingBestScore(roomId: string, playerName: string, score: number): Promise<number> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    const safeScore = Math.max(0, Math.floor(Number.isFinite(score) ? score : 0));
    player.bowlingBestScore = Math.max(player.bowlingBestScore ?? 0, safeScore);
    const best = player.bowlingBestScore;
    return this.queueWrite().then(() => best);
  }

  playerEconomy(roomId: string, playerName: string): ShopPlayerData {
    const player = this.data.rooms[roomId]?.players[normalizePlayerName(playerName)];
    const shop = normalizeShopData(player?.shop);
    resetDailyIfNeeded(shop);
    if (player) player.shop = shop;
    return shop;
  }

  async sellFish(roomId: string, playerName: string, species: string, count: number | 'all'): Promise<{ coins: number; scrap: number; sold: number; gained: number; items: CatchRecord[] }> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    const shop = normalizeShopData(player.shop);
    resetDailyIfNeeded(shop);
    const fishSpecies = FISH_CONFIG.species.find((entry) => entry.id === species);
    if (!fishSpecies) throw new Error('Unknown fish species.');
    const matches = player.inventory.filter((item) => item.species === species);
    let removeCount = count === 'all' ? matches.length : Math.max(0, Math.floor(count));
    if (removeCount <= 0) return { coins: shop.coins, scrap: shop.scrap, sold: 0, gained: 0, items: [...player.inventory] };
    if (fishSpecies.kind !== 'junk') removeCount = Math.min(removeCount, Math.max(0, matches.length - 1));
    const selected = matches.slice(0, removeCount);
    let gain = 0;
    let scrapGain = 0;
    for (const item of selected) {
      if (fishSpecies.kind === 'junk') scrapGain += 1;
      else {
        const index = shop.dailySold.count + 1;
        const raw = sellPrice(fishSpecies, item.weightKg);
        gain += Math.max(1, Math.round(raw * payFactor(shop, index)));
        shop.dailySold.count += 1;
      }
      const index = player.inventory.findIndex((entry) => entry.catchId === item.catchId);
      if (index >= 0) player.inventory.splice(index, 1);
    }
    shop.coins += gain;
    shop.scrap = applyScrapOverride(shop.scrap + scrapGain);
    player.shop = shop;
    await this.queueWrite();
    return { coins: shop.coins, scrap: shop.scrap, sold: selected.length, gained: gain, items: [...player.inventory] };
  }

  async buyItem(roomId: string, playerName: string, itemId: string): Promise<{ ok: boolean; reason?: string; shop: ShopPlayerData; items: CatchRecord[] }> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    const shop = normalizeShopData(player.shop);
    resetDailyIfNeeded(shop);
    const item = SHOP_CONFIG.items.find((entry) => entry.id === itemId);
    if (!item) return { ok: false, reason: 'Unknown item.', shop, items: player.inventory };
    if (shop.ownedItems.includes(itemId)) return { ok: false, reason: 'Already owned.', shop, items: player.inventory };
    if (shop.coins < item.price) return { ok: false, reason: `Need ${item.price - shop.coins} more coins.`, shop, items: player.inventory };
    if (shop.scrap < item.scrap) return { ok: false, reason: `Need ${item.scrap - shop.scrap} more scrap.`, shop, items: player.inventory };
    if (item.prerequisite && !shop.ownedItems.includes(item.prerequisite)) {
      const prerequisite = SHOP_CONFIG.items.find((entry) => entry.id === item.prerequisite);
      return { ok: false, reason: prerequisite ? `Requires ${prerequisite.name}.` : 'Prerequisite item not owned.', shop, items: player.inventory };
    }
    if (item.requiredFish) {
      const copies = effectiveKoiEmasCount(player.inventory.filter((entry) => entry.species === item.requiredFish?.species).length);
      if (copies <= 1) return { ok: false, reason: 'Requires one extra Koi Emas; the aquarium copy is protected.', shop, items: player.inventory };
    }
    shop.coins -= item.price;
    shop.scrap = applyScrapOverride(shop.scrap - item.scrap);
    shop.ownedItems.push(itemId);
    if (item.requiredFish) {
      const matching = player.inventory.filter((entry) => entry.species === item.requiredFish?.species);
      const copy = matching.at(-1);
      if (!copy) return { ok: false, reason: 'Required fish is missing.', shop, items: player.inventory };
      const index = player.inventory.findIndex((entry) => entry.catchId === copy.catchId);
      player.inventory.splice(index, 1);
    }
    if (!shop.firstPurchase) shop.firstPurchase = true;
    player.shop = shop;
    await this.queueWrite();
    return { ok: true, shop, items: [...player.inventory] };
  }

  async equipItem(roomId: string, playerName: string, slot: keyof ShopEquipped, itemId: string | null): Promise<{ ok: boolean; reason?: string; shop: ShopPlayerData }> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    const shop = normalizeShopData(player.shop);
    if (itemId !== null) {
      const item = SHOP_CONFIG.items.find((entry) => entry.id === itemId);
      if (!item || item.slot !== slot || !shop.ownedItems.includes(itemId)) return { ok: false, reason: 'Item is not owned or does not fit this slot.', shop };
    }
    shop.equipped[slot] = itemId;
    player.shop = shop;
    await this.queueWrite();
    return { ok: true, shop };
  }

  async pinItem(roomId: string, playerName: string, itemId: string | null): Promise<ShopPlayerData> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    const shop = normalizeShopData(player.shop);
    shop.pinnedItem = itemId && SHOP_CONFIG.items.some((item) => item.id === itemId) ? itemId : null;
    player.shop = shop;
    await this.queueWrite();
    return shop;
  }

  async toggleChair(roomId: string, playerName: string): Promise<{ seated: boolean; shop: ShopPlayerData }> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    const shop = normalizeShopData(player.shop);
    const seated = shop.equipped.chair !== null;
    shop.equipped.chair = seated ? null : (shop.ownedItems.includes('fishing-chair') ? 'fishing-chair' : null);
    player.shop = shop;
    await this.queueWrite();
    return { seated: shop.equipped.chair !== null, shop };
  }

  recordCatch(roomId: string, playerName: string, entry: CatchEntry, item: CatchRecord): Promise<void> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    room.catches.push(entry);
    player.inventory.push(item);
    return this.queueWrite();
  }

  recordJunk(roomId: string, playerName: string, item: CatchRecord): Promise<void> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    player.inventory.push(item);
    return this.queueWrite();
  }

  async releaseFish(roomId: string, playerName: string, catchId: string): Promise<boolean> {
    const inventory = this.data.rooms[roomId]?.players[normalizePlayerName(playerName)]?.inventory;
    if (!inventory) return false;
    const index = inventory.findIndex((item) => item.catchId === catchId);
    if (index < 0) return false;
    const [removed] = inventory.splice(index, 1);
    try {
      await this.queueWrite();
    } catch (error) {
      inventory.splice(index, 0, removed);
      throw error;
    }
    return true;
  }

  async startCooking(roomId: string, playerName: string, catchId: string, cooking: CampfireCooking): Promise<boolean> {
    const room = this.data.rooms[roomId];
    const inventory = room?.players[normalizePlayerName(playerName)]?.inventory;
    if (!room || room.campfireCooking || !inventory) return false;
    const index = inventory.findIndex((item) => item.catchId === catchId);
    if (index < 0) return false;
    const [removed] = inventory.splice(index, 1);
    room.campfireCooking = cooking;
    try {
      await this.queueWrite();
    } catch (error) {
      inventory.splice(index, 0, removed);
      room.campfireCooking = null;
      throw error;
    }
    return true;
  }

  async finishCooking(roomId: string, cookId: string): Promise<boolean> {
    const room = this.data.rooms[roomId];
    if (!room?.campfireCooking || room.campfireCooking.cookId !== cookId) return false;
    const cooking = room.campfireCooking;
    room.campfireCooking = null;
    try {
      await this.queueWrite();
    } catch (error) {
      room.campfireCooking = cooking;
      throw error;
    }
    return true;
  }

  async flush(): Promise<void> { await this.writeQueue; }

  private room(roomId: string): StoredRoom {
    return this.data.rooms[roomId] ??= { catches: [], players: {}, campfireCooking: null };
  }

  private queueWrite(): Promise<void> {
    const payload = JSON.stringify(this.data, null, 2);
    const write = this.writeQueue.then(async () => {
      await mkdir(dirname(this.filePath), { recursive: true });
      const temporaryPath = `${this.filePath}.${process.pid}.tmp`;
      await writeFile(temporaryPath, payload, 'utf8');
      await rename(temporaryPath, this.filePath);
    });
    this.writeQueue = write.catch((error: unknown) => {
      console.error(`[game-data] Could not save ${this.filePath}:`, error);
    });
    return write;
  }
}

export function normalizePlayerName(name: string): string { return name.trim().toLocaleLowerCase(); }

function catchRecord(entry: CatchEntry): CatchRecord {
  return { catchId: entry.id, species: entry.species, rarity: entry.rarity, weightKg: entry.weightKg, caughtAt: entry.timestamp };
}
