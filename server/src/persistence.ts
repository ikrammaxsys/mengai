import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CampfireCooking, CatchEntry, Room } from './types.js';
import type { CatchRecord } from './inventory.js';
import { FISH_CONFIG } from '../../shared/fishConfig.js';

export interface PlayerFishData {
  items: CatchRecord[];
  totalCaught: number;
  personalBest: CatchRecord | null;
  collection: CatchRecord[];
  crocodilesSlain: number;
}

export interface PersistentGameDataStore {
  load(): Promise<void>;
  hydrateRoom(room: Room): void;
  playerFish(roomId: string, playerName: string): PlayerFishData;
  recordCrocodileKill(roomId: string, playerName: string): Promise<number>;
  recordCatch(roomId: string, playerName: string, entry: CatchEntry, item: CatchRecord): Promise<void>;
  releaseFish(roomId: string, playerName: string, catchId: string): Promise<boolean>;
  startCooking(roomId: string, playerName: string, catchId: string, cooking: CampfireCooking): Promise<boolean>;
  finishCooking(roomId: string, cookId: string): Promise<boolean>;
  flush(): Promise<void>;
}

interface StoredPlayer {
  inventory: CatchRecord[];
  crocodilesSlain?: number;
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
