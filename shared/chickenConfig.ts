import { FISH_CONFIG } from './fishConfig.js';
import { WORLD_CONFIG } from './worldConfig.js';

export const CHICKEN_CONFIG = {
  minCount: 5,
  maxCount: 8,
  hitRadius: 0.8,
  snapshotIntervalMs: 100,
  wanderSpeed: 0.34,
  respawnDelayMinMs: 1600,
  respawnDelayMaxMs: 2400,
  respawnMinDistance: 6,
  idleDurationMinMs: 650,
  idleDurationMaxMs: 1700,
  wanderDistanceMin: 1.6,
  wanderDistanceMax: 4.8,
  pondClearance: 2.2,
  mapEdgeMargin: 2.5,
  obstacleClearance: 1.5,
  campfireClearance: 5.2,
  scorePopupDurationMs: 1000,
  bodyColors: ['#fffdf4', '#f1e7d2', '#e9ded0', '#fff5e5'],
  pondSafeRadius: FISH_CONFIG.pond.waterRadius + 2.2,
  outerRadius: WORLD_CONFIG.movementRadius - 2.5,
} as const;

export type ChickenState = 'idle' | 'wander' | 'respawning';

export interface ChickenSnapshot {
  id: string;
  x: number;
  z: number;
  facing: number;
  state: ChickenState;
  bodyColor: string;
}

export interface ChickenAgent extends ChickenSnapshot {
  targetX: number;
  targetZ: number;
  nextDecisionAt: number;
  respawnAt: number | null;
  respawnOriginX: number;
  respawnOriginZ: number;
}
