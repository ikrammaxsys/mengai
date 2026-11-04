import { randomUUID } from 'node:crypto';
import type { FishingProfile, Player, PlayerSnapshot, Room } from './types.js';
import { FISH_CONFIG } from '../../shared/fishConfig.js';
import { createWeatherSnapshot } from '../../shared/weatherConfig.js';
import { createChickenFlock } from './chickens.js';
import { WORLD_CONFIG } from '../../shared/worldConfig.js';

const COLORS = ['#f07853', '#5c9ee8', '#e6b84b', '#a978d1', '#4cb89b', '#e37eae', '#7eb653', '#e08a43'];
export const RESUME_GRACE_MS = 10_000;

export class Rooms {
  private readonly rooms = new Map<string, Room>();

  createPlayer(roomId: string, name: string, socket: Player['socket'], resumeToken?: string): { room: Room; player: Player } | string {
    let room = this.rooms.get(roomId);
    if (!room) {
      const stones = new Map(FISH_CONFIG.stones.pebbles.map((pebble) => [pebble.id, {
         id: pebble.id, originX: pebble.x, originZ: pebble.z, x: pebble.x, z: pebble.z, color: pebble.color,
         state: 'ground' as const, carriedBy: null, flight: null, chickenHitId: null, respawnAt: null,
       }]));
       const createdAt = Date.now();
       room = { id: roomId, players: new Map(), leaderboard: [], personalBests: new Map(), fishingProfiles: new Map(), stones, campfireCooking: null, campfireReserved: false, weather: createWeatherSnapshot('clear', createdAt), chickens: createChickenFlock(createdAt), crocodileScores: new Map(), jukebox: { current: null, queue: [], skipVotes: new Set(), emptySince: null } };
       this.rooms.set(roomId, room);
    } else if (room.players.size === 0) room.weather = createWeatherSnapshot('clear', Date.now());
    if (room.players.size === 0 && room.jukebox.emptySince !== null) {
      if (room.jukebox.current && room.jukebox.current.startedAt !== null) room.jukebox.current.startedAt += Date.now() - room.jukebox.emptySince;
      room.jukebox.emptySince = null;
    }
    const normalized = name.toLocaleLowerCase();
    const existing = [...room.players.values()].find((player) => player.name.toLocaleLowerCase() === normalized);
    if (existing) {
        const now = Date.now();
        if (existing.disconnectedAt !== null && now - existing.disconnectedAt >= RESUME_GRACE_MS) {
          room.players.delete(existing.id);
          if (room.players.size === 0) room.weather = createWeatherSnapshot('clear', now);
        } else if (existing.disconnectedAt !== null && resumeToken && existing.resumeToken === resumeToken) {
          existing.socket = socket;
          existing.disconnectedAt = null;
          if (existing.arenaInstanceId) {
            existing.arenaInstanceId = null;
            existing.x = WORLD_CONFIG.crocodilePortal.x;
            existing.z = WORLD_CONFIG.crocodilePortal.z;
            existing.facing = 0;
          }
        existing.lastMoveSeq = 0;
        existing.lastMoveAt = now;
        existing.velocityX = 0;
        existing.velocityZ = 0;
        existing.moving = false;
        return { room, player: existing };
      } else {
        return 'That name is already taken in this room.';
      }
    }

    const id = randomUUID();
    const index = room.players.size;
    const profile: FishingProfile = room.fishingProfiles.get(normalized) ?? { pityMisses: 0, lastSpecies: null };
    room.fishingProfiles.set(normalized, profile);
      const angle = (index / Math.max(1, index + 1)) * Math.PI * 2 + Math.PI / 4;
      const radius = 10 + (index % 3) * 1.5;
      const now = Date.now();
      const player: Player = {
      id,
      name,
      color: COLORS[index % COLORS.length],
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      facing: 0,
      moving: false,
      velocityX: 0,
      velocityZ: 0,
      lastMoveSeq: 0,
      lastMoveAt: now,
      resumeToken: randomUUID(),
      disconnectedAt: null,
      latencyRttMs: 0,
      fishing: 'idle',
      cast: null,
      biteAt: null,
      biteDeadline: null,
      biteRoll: null,
      reelStartedAt: null,
      reelCandidates: null,
      pendingCatch: null,
      carryingStoneId: null,
      chickenScore: 0,
      crocodilesSlain: 0,
      arenaInstanceId: null,
      inPhotobooth: false,
      speaking: false,
      lastStoneThrowAt: 0,
      pityMisses: profile.pityMisses,
      lastSpecies: profile.lastSpecies,
      holdingFish: null,
      resumeHoldingCatchId: null,
      socket,
    };
    room.players.set(id, player);
    return { room, player };
  }

  removePlayer(roomId: string, playerId: string): Room | undefined {
    const room = this.rooms.get(roomId);
    if (!room) return undefined;
    room.players.delete(playerId);
    if (room.players.size === 0) {
      room.weather = createWeatherSnapshot('clear', Date.now());
      if (room.jukebox.current || room.jukebox.queue.length) room.jukebox.emptySince = Date.now();
    }
    if (room.players.size === 0 && room.leaderboard.length === 0 && !room.jukebox.current && !room.jukebox.queue.length) {
      this.rooms.delete(roomId);
      return undefined;
    }
    return room.players.size > 0 ? room : undefined;
  }

  cleanupEmptyRooms(now: number): void {
    for (const [roomId, room] of this.rooms) {
      if (room.players.size || room.jukebox.emptySince === null || now - room.jukebox.emptySince < 60_000) continue;
      room.jukebox.current = null;
      room.jukebox.queue = [];
      room.jukebox.skipVotes.clear();
      room.jukebox.emptySince = null;
      if (!room.leaderboard.length) this.rooms.delete(roomId);
    }
  }

  getPlayer(roomId: string, playerId: string): Player | undefined {
    return this.rooms.get(roomId)?.players.get(playerId);
  }

  findPlayerByResumeToken(roomId: string, resumeToken: string): Player | undefined {
    const room = this.rooms.get(roomId);
    if (!room) return undefined;
    return [...room.players.values()].find((player) => player.resumeToken === resumeToken && player.disconnectedAt === null);
  }

  getRoom(roomId: string): Room | undefined { return this.rooms.get(roomId); }

  all(): IterableIterator<Room> {
    return this.rooms.values();
  }

  list(): { room: string; playerCount: number }[] {
    return [...this.rooms.values()]
      .map((room) => ({ room: room.id, playerCount: [...room.players.values()].filter((player) => player.arenaInstanceId === null).length }))
      .sort((a, b) => a.room.localeCompare(b.room, undefined, { numeric: true, sensitivity: 'base' }));
  }

  snapshot(room: Room, includeHoldingFish = true, includeSpeaking = true): PlayerSnapshot[] {
    return [...room.players.values()].filter((player) => player.arenaInstanceId === null).map(({ id, name, color, x, z, facing, fishing, cast, carryingStoneId, holdingFish, moving, inPhotobooth, chickenScore, crocodilesSlain, speaking }) => ({
      id, name, color, x, z, facing, fishing, cast, carryingStoneId,
      inPhotobooth,
      chickenScore,
      crocodilesSlain,
      ...(includeSpeaking ? { speaking } : {}),
      ...(includeHoldingFish ? { holdingFish } : {}),
      moving,
    }));
  }

  stoneSnapshot(room: Room) { return [...room.stones.values()]; }
}
