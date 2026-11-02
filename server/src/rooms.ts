import { randomUUID } from 'node:crypto';
import type { FishingProfile, Player, PlayerSnapshot, Room } from './types.js';
import { FISH_CONFIG } from '../../shared/fishConfig.js';
import { createWeatherSnapshot } from '../../shared/weatherConfig.js';

const COLORS = ['#f07853', '#5c9ee8', '#e6b84b', '#a978d1', '#4cb89b', '#e37eae', '#7eb653', '#e08a43'];
export const RESUME_GRACE_MS = 10_000;

export class Rooms {
  private readonly rooms = new Map<string, Room>();

  createPlayer(roomId: string, name: string, socket: Player['socket'], resumeToken?: string): { room: Room; player: Player } | string {
    let room = this.rooms.get(roomId);
    if (!room) {
      const stones = new Map(FISH_CONFIG.stones.pebbles.map((pebble) => [pebble.id, {
        id: pebble.id, originX: pebble.x, originZ: pebble.z, x: pebble.x, z: pebble.z, color: pebble.color,
        state: 'ground' as const, carriedBy: null, flight: null, respawnAt: null,
      }]));
       room = { id: roomId, players: new Map(), leaderboard: [], personalBests: new Map(), fishingProfiles: new Map(), stones, campfireCooking: null, campfireReserved: false, weather: createWeatherSnapshot('clear', Date.now()) };
       this.rooms.set(roomId, room);
    } else if (room.players.size === 0) room.weather = createWeatherSnapshot('clear', Date.now());
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
    if (room.players.size === 0) room.weather = createWeatherSnapshot('clear', Date.now());
    if (room.players.size === 0 && room.leaderboard.length === 0) {
      this.rooms.delete(roomId);
      return undefined;
    }
    return room.players.size > 0 ? room : undefined;
  }

  getPlayer(roomId: string, playerId: string): Player | undefined {
    return this.rooms.get(roomId)?.players.get(playerId);
  }

  getRoom(roomId: string): Room | undefined { return this.rooms.get(roomId); }

  all(): IterableIterator<Room> {
    return this.rooms.values();
  }

  list(): { room: string; playerCount: number }[] {
    return [...this.rooms.values()]
      .map((room) => ({ room: room.id, playerCount: room.players.size }))
      .sort((a, b) => a.room.localeCompare(b.room, undefined, { numeric: true, sensitivity: 'base' }));
  }

  snapshot(room: Room, includeHoldingFish = true): PlayerSnapshot[] {
    return [...room.players.values()].map(({ id, name, color, x, z, facing, fishing, cast, carryingStoneId, holdingFish, moving }) => ({
      id, name, color, x, z, facing, fishing, cast, carryingStoneId,
      ...(includeHoldingFish ? { holdingFish } : {}),
      moving,
    }));
  }

  stoneSnapshot(room: Room) { return [...room.stones.values()]; }
}
