import type { WebSocket } from 'ws';
import type { FishRarity, FishSpeciesId } from '../../shared/fishConfig.js';
import type { CatchRecord } from './inventory.js';

export type FishingState = 'idle' | 'casting' | 'waiting' | 'bite' | 'fighting' | 'reeling';

export interface ReelCatchCandidate {
  species: FishSpeciesId;
  weightKg: number;
  probabilities: Record<FishSpeciesId, number>;
  zone: 'deep' | 'middle' | 'shallow';
}

export interface CastSnapshot {
  targetX: number;
  targetZ: number;
  startX: number;
  startZ: number;
  facing: number;
  startTime: number;
  flightSeconds: number;
  reelStartedAt?: number;
}

export interface CatchEntry {
  id: string;
  playerId: string;
  playerName: string;
  species: FishSpeciesId;
  weightKg: number;
  rarity: FishRarity;
  timestamp: number;
}

export interface CampfireCooking {
  cookId: string;
  playerId: string;
  playerName: string;
  fish: CatchRecord;
  startedAt: number;
  durationMs: number;
}

export interface FishingProfile {
  pityMisses: number;
  lastSpecies: FishSpeciesId | null;
}

export type StoneState = 'ground' | 'carried' | 'flying' | 'respawning';

export interface StoneFlight {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
  startTime: number;
  flightMs: number;
  targetId: string | null;
  waterLanding: boolean;
}

export interface Stone {
  id: string;
  originX: number;
  originZ: number;
  x: number;
  z: number;
  color: string;
  state: StoneState;
  carriedBy: string | null;
  flight: StoneFlight | null;
  respawnAt: number | null;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  x: number;
  z: number;
  facing: number;
  moving: boolean;
  velocityX: number;
  velocityZ: number;
  lastMoveSeq: number;
  lastMoveAt: number;
  resumeToken: string;
  disconnectedAt: number | null;
  latencyRttMs: number;
  fishing: FishingState;
  cast: CastSnapshot | null;
  biteAt: number | null;
  biteDeadline: number | null;
  biteRoll: number | null;
  reelStartedAt: number | null;
  reelCandidates: { normal: ReelCatchCandidate; quick: ReelCatchCandidate } | null;
  pendingCatch: ReelCatchCandidate | null;
  carryingStoneId: string | null;
  lastStoneThrowAt: number;
  pityMisses: number;
  lastSpecies: FishSpeciesId | null;
  holdingFish: CatchRecord | null;
  resumeHoldingCatchId: string | null;
  socket: WebSocket;
}

export interface Room {
  id: string;
  players: Map<string, Player>;
  leaderboard: CatchEntry[];
  personalBests: Map<string, CatchEntry>;
  fishingProfiles: Map<string, FishingProfile>;
  stones: Map<string, Stone>;
  campfireCooking: CampfireCooking | null;
  campfireReserved: boolean;
}

export interface PlayerSnapshot {
  id: string;
  name: string;
  color: string;
  x: number;
  z: number;
  facing: number;
  moving: boolean;
  fishing: FishingState;
  cast: CastSnapshot | null;
  carryingStoneId: string | null;
  holdingFish?: CatchRecord | null;
}
