import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CampfireCooking, CatchEntry, Room } from './types.js';
import type { CatchRecord } from './inventory.js';
import { FISH_CONFIG, type FishSpeciesId } from '../../shared/fishConfig.js';
import {
  defaultSeedInventory, isGardenSpotId, isGardenTreeType,
  UNLIMITED_SEEDS, type GardenSpot, type GardenTreeType, type SeedInventory,
} from '../../shared/gardenConfig.js';

export interface PlayerFishData {
  items: CatchRecord[];
  totalCaught: number;
  personalBest: CatchRecord | null;
  collection: CatchRecord[];
  fishCollection: FishCollection;
  aquariumFish: CatchRecord[];
  crocodilesSlain: number;
  garden: GardenSpot[];
  seeds: SeedInventory;
}

export interface CollectionEntry {
  caught: boolean;
  bestWeight: number;
  totalCaught: number;
  firstCaughtAt: number;
}

export type FishCollection = Partial<Record<FishSpeciesId, CollectionEntry>>;

export interface PersistentGameDataStore {
  load(): Promise<void>;
  hydrateRoom(room: Room): void;
  ensurePlayer(roomId: string, playerName: string): Promise<void>;
  playerFish(roomId: string, playerName: string): PlayerFishData;
  recordCrocodileKill(roomId: string, playerName: string): Promise<number>;
  recordCatch(roomId: string, playerName: string, entry: CatchEntry, item: CatchRecord): Promise<void>;
  recordJunk(roomId: string, playerName: string, item: CatchRecord): Promise<void>;
  plantGardenTree(roomId: string, playerName: string, spotId: string, treeType: GardenTreeType, plantedAt: number): Promise<boolean>;
  removeGardenTree(roomId: string, playerName: string, spotId: string): Promise<boolean>;
  addSeed(roomId: string, playerName: string, treeType: GardenTreeType): Promise<number>;
  releaseFish(roomId: string, playerName: string, catchId: string): Promise<boolean>;
  startCooking(roomId: string, playerName: string, catchId: string, cooking: CampfireCooking): Promise<boolean>;
  finishCooking(roomId: string, cookId: string): Promise<boolean>;
  flush(): Promise<void>;
}

interface StoredPlayer {
  inventory: CatchRecord[];
  collection?: FishCollection;
  aquariumFish?: CatchRecord[];
  crocodilesSlain?: number;
  garden?: GardenSpot[];
  seeds?: SeedInventory;
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
    let migrated = false;
    for (const room of Object.values(this.data.rooms)) {
      room.players ??= {};
      for (const entry of room.catches ?? []) {
        const player = room.players[normalizePlayerName(entry.playerName)] ??= { inventory: [] };
        player.aquariumFish ??= [
          ...room.catches
          .filter((playerCatch) => normalizePlayerName(playerCatch.playerName) === normalizePlayerName(entry.playerName))
          .map(catchRecord),
          ...(player.inventory ?? []).filter((item) => item.kind === 'junk'),
        ];
        if (!player.collection) {
          player.collection = {};
          for (const playerCatch of room.catches.filter((candidate) =>
            normalizePlayerName(candidate.playerName) === normalizePlayerName(entry.playerName))) {
            const record = player.collection[playerCatch.species];
            if (record) {
              record.bestWeight = Math.max(record.bestWeight, playerCatch.weightKg);
              record.totalCaught += 1;
              record.firstCaughtAt = Math.min(record.firstCaughtAt, playerCatch.timestamp);
            } else {
              player.collection[playerCatch.species] = {
                caught: true, bestWeight: playerCatch.weightKg, totalCaught: 1, firstCaughtAt: playerCatch.timestamp,
              };
            }
          }
        }
      }
      for (const player of Object.values(room.players)) {
        player.inventory ??= [];
        const garden = normalizeGarden(player.garden);
        const seeds = defaultSeedInventory(player.seeds);
        if (!player.garden || JSON.stringify(garden) !== JSON.stringify(player.garden) ||
            JSON.stringify(seeds) !== JSON.stringify(player.seeds)) migrated = true;
        player.garden = garden;
        player.seeds = seeds;
      }
    }
    if (migrated) await this.queueWrite();
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

  ensurePlayer(roomId: string, playerName: string): Promise<void> {
    const storedRoom = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = storedRoom.players[playerKey] ??= { inventory: [] };
    const garden = normalizeGarden(player.garden);
    const seeds = defaultSeedInventory(player.seeds);
    const changed = !player.garden || JSON.stringify(garden) !== JSON.stringify(player.garden) ||
      JSON.stringify(seeds) !== JSON.stringify(player.seeds) || !player.inventory;
    player.inventory ??= [];
    player.garden = garden;
    player.seeds = seeds;
    return changed ? this.queueWrite() : Promise.resolve();
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
      fishCollection: Object.fromEntries(Object.entries(room?.players[playerKey]?.collection ?? {}).map(
        ([species, record]) => [species, { ...record }],
      )),
      aquariumFish: [...(room?.players[playerKey]?.aquariumFish ?? [])]
        .sort((a, b) => fishRarityRank(b.rarity) - fishRarityRank(a.rarity) || b.weightKg - a.weightKg)
        .slice(0, 40)
        .map((item) => ({ ...item })),
      crocodilesSlain: room?.players[playerKey]?.crocodilesSlain ?? 0,
      garden: (room?.players[playerKey]?.garden ?? []).map((spot) => ({ ...spot })),
      seeds: defaultSeedInventory(room?.players[playerKey]?.seeds),
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

  recordCatch(roomId: string, playerName: string, entry: CatchEntry, item: CatchRecord): Promise<void> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    room.catches.push(entry);
    player.inventory.push(item);
    (player.aquariumFish ??= []).push({ ...item });
    this.recordCollectionCatch(player, entry.species, entry.weightKg, entry.timestamp);
    return this.queueWrite();
  }

  recordJunk(roomId: string, playerName: string, item: CatchRecord): Promise<void> {
    const room = this.room(roomId);
    const playerKey = normalizePlayerName(playerName);
    const player = room.players[playerKey] ??= { inventory: [] };
    player.inventory.push(item);
    (player.aquariumFish ??= []).push({ ...item });
    this.recordCollectionCatch(player, item.species, item.weightKg, item.caughtAt);
    return this.queueWrite();
  }

  async plantGardenTree(roomId: string, playerName: string, spotId: string, treeType: GardenTreeType, plantedAt: number): Promise<boolean> {
    if (!isGardenSpotId(spotId) || !isGardenTreeType(treeType) || !Number.isFinite(plantedAt)) return false;
    const player = this.room(roomId).players[normalizePlayerName(playerName)] ??= { inventory: [] };
    player.garden ??= [];
    player.seeds = defaultSeedInventory(player.seeds);
    if (player.garden.some((spot) => spot.spotId === spotId) ||
        (treeType !== 'pine' && player.seeds[treeType] < 1)) return false;
    const planted = { spotId, treeType, plantedAt };
    player.garden.push(planted);
    if (treeType !== 'pine') player.seeds[treeType] -= 1;
    try {
      await this.queueWrite();
    } catch (error) {
      player.garden = player.garden.filter((spot) => spot.spotId !== spotId);
      if (treeType !== 'pine') player.seeds[treeType] += 1;
      throw error;
    }
    return true;
  }

  async removeGardenTree(roomId: string, playerName: string, spotId: string): Promise<boolean> {
    const player = this.data.rooms[roomId]?.players[normalizePlayerName(playerName)];
    const index = player?.garden?.findIndex((spot) => spot.spotId === spotId) ?? -1;
    if (!player?.garden || index < 0) return false;
    const [removed] = player.garden.splice(index, 1);
    try {
      await this.queueWrite();
    } catch (error) {
      player.garden.splice(index, 0, removed);
      throw error;
    }
    return true;
  }

  async addSeed(roomId: string, playerName: string, treeType: GardenTreeType): Promise<number> {
    if (treeType === 'pine') return UNLIMITED_SEEDS;
    const player = this.room(roomId).players[normalizePlayerName(playerName)] ??= { inventory: [] };
    player.seeds = defaultSeedInventory(player.seeds);
    player.seeds[treeType] += 1;
    const count = player.seeds[treeType];
    try {
      await this.queueWrite();
    } catch (error) {
      player.seeds[treeType] -= 1;
      throw error;
    }
    return count;
  }

  private recordCollectionCatch(player: StoredPlayer, species: FishSpeciesId, weightKg: number, caughtAt: number): void {
    const collection = player.collection ??= {};
    const record = collection[species];
    if (record) {
      record.caught = true;
      record.bestWeight = Math.max(record.bestWeight, weightKg);
      record.totalCaught += 1;
      record.firstCaughtAt = Math.min(record.firstCaughtAt, caughtAt);
    } else {
      collection[species] = { caught: true, bestWeight: weightKg, totalCaught: 1, firstCaughtAt: caughtAt };
    }
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

function fishRarityRank(rarity: CatchRecord['rarity']): number {
  return ({ common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 })[rarity];
}

function normalizeGarden(garden?: GardenSpot[]): GardenSpot[] {
  if (!Array.isArray(garden)) return [];
  const seen = new Set<string>();
  return garden.filter((spot) => {
    if (!isGardenSpotId(spot?.spotId) || !isGardenTreeType(spot.treeType) ||
        !Number.isFinite(spot.plantedAt) || spot.plantedAt < 0 || seen.has(spot.spotId)) return false;
    seen.add(spot.spotId);
    return true;
  }).map((spot) => ({ spotId: spot.spotId, treeType: spot.treeType, plantedAt: spot.plantedAt }));
}
