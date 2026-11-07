export const ARENA_CONFIG = {
  platformRadius: 22,
  playerMaxHp: 100,
  playerMoveSpeed: 4.2,
  playerMoveSlack: 0.5,
  playerTurnRate: 3.2,
  playerCollisionRadius: 0.55,
  playerSpawn: { x: -10, z: 0, facing: Math.PI / 2 },
  exitPortal: { x: -13, z: -5, useRadius: 2.4 },
  stonePile: { x: -6, z: -1, maxCount: 8, refillEveryMs: 2600, refillAmount: 2, useRadius: 2.4 },
  maxCarriedStones: 5,
  stoneThrowDistance: 18,
  stoneFlightMs: 900,
  stoneHitRadius: 1.7,
  stoneDamage: 20,
  monsterMaxHp: 1000,
  monsterEnrageThreshold: 500,
  monsterEnrageMultiplier: 1.125,
  monsterRadius: 1.8,
  monsterMoveSpeed: 1.65,
  monsterAttackCooldownMs: 850,
  newSkills: {
    tailSmash: {
      damage: 23, radius: 3.8, warningMs: 1200, recoveryMs: 1500, cooldownMs: 12000,
      knockback: 3.2, stoneFlightMs: 700, scatterRadiusMin: 5, scatterRadiusMax: 10,
    },
    burrow: {
      damage: 25, radius: 3.2, diveMs: 800, undergroundMs: 3200, emergeWarningMs: 1000,
      recoveryMs: 2000, cooldownMs: 15000, speed: 2.4, knockback: 3.8, bonusStoneDamage: 1.5,
    },
  },
  playerRespawnDelayMs: 3000,
  monsterDeathDurationMs: 1400,
  tickIntervalMs: 100,
  attacks: {
    bite: { damage: 18, range: 2, windupMs: 550, cooldownMs: 2400 },
    tailSweep: { damage: 24, range: 4.1, warningMs: 1000, cooldownMs: 5600 },
    lunge: { damage: 29, range: 12, windupMs: 1000, chargeMs: 650, speed: 11, hitRadius: 1.25, cooldownMs: 7600 },
    tailSmash: { damage: 23, range: 0, warningMs: 1200, cooldownMs: 12000 },
    burrow: { damage: 25, range: 0, windupMs: 800, cooldownMs: 15000 },
  },
} as const;

export type ArenaState = 'active' | 'victory' | 'defeat';
export type MonsterState = 'idle' | 'chase' | 'attack' | 'cooldown' | 'dead';
export type MonsterSkill = keyof typeof ARENA_CONFIG.attacks;
export type MonsterAttackPhase = 'windup' | 'charge' | 'dive' | 'underground' | 'telegraph' | 'recovery';

export interface ArenaParticipantSnapshot {
  playerId: string;
  name: string;
  color: string;
  x: number;
  z: number;
  facing: number;
  hp: number;
  maxHp: number;
  stones: number;
}

export interface ArenaAttackSnapshot {
  skill: MonsterSkill;
  phase: MonsterAttackPhase;
  startedAt: number;
  resolveAt: number;
  endsAt: number;
  originX: number;
  originZ: number;
  directionX: number;
  directionZ: number;
  radius: number;
  targetX?: number;
  targetZ?: number;
}

export interface ArenaStoneSnapshot {
  id: string;
  x: number;
  z: number;
}

export interface ArenaMonsterSnapshot {
  id: string;
  kind: 'crocodile';
  name: 'Mecha Crocodile';
  x: number;
  z: number;
  facing: number;
  hp: number;
  maxHp: number;
  state: MonsterState;
  attack: ArenaAttackSnapshot | null;
}

export interface ArenaProjectileSnapshot {
  id: string;
  startX: number;
  startZ: number;
  endX: number;
  endZ: number;
  startedAt: number;
  durationMs: number;
}

export interface ArenaSnapshot {
  instanceId: string;
  state: ArenaState;
  serverTime: number;
  players: ArenaParticipantSnapshot[];
  monster: ArenaMonsterSnapshot;
  stonePile: { x: number; z: number; count: number; maxCount: number; nextRefillAt: number };
  scatteredStones: ArenaStoneSnapshot[];
  projectiles: ArenaProjectileSnapshot[];
  exitPortal: { x: number; z: number; useRadius: number };
  respawnAt: number | null;
}
