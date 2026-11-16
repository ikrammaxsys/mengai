export const BOWLING_CONFIG = {
  maxPlayers: 4,
  rows: 5,
  throwsPerRow: 2,
  pinsPerRow: 10,
  turnTimeMs: 20_000,
  scoring: {
    strikeBonus: 10,
    spareBonus: 5,
  },
  lane: {
    length: 18.5,
    width: 1.8,
    gutterWidth: 0.28,
    pinDeckLength: 2.2,
    headPinZ: 17.2,
    pinSpacing: 0.46,
    pinRowSpacing: 0.5,
    ballRadius: 0.16,
    pinRadius: 0.11,
    pinHeight: 0.42,
  },
  physics: {
    fixedStepSeconds: 1 / 120,
    ballMinSpeed: 7.5,
    ballMaxSpeed: 15.5,
    ballDeceleration: 1.1,
    ballStopSpeed: 0.4,
    pinFriction: 2.4,
    pinStopSpeed: 0.16,
    ballMass: 6.5,
    pinMass: 1.5,
    pinKnockTiltThreshold: 0.55,
    pinKnockDisplacementThreshold: 0.18,
    maxRollSeconds: 7,
    maxSettleSeconds: 3.5,
    maxAimRadians: 0.1,
    maxTimeStepSeconds: 0.25,
  },
  timings: {
    scorePauseMs: 650,
    calloutMs: 1_300,
    rowPauseMs: 900,
    resultsDelayMs: 800,
    resetPauseMs: 500,
  },
} as const;

export function bowlingPinLayout(): { id: number; x: number; z: number }[] {
  const pins: { id: number; x: number; z: number }[] = [];
  let id = 1;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column <= row; column++) {
      pins.push({
        id: id++,
        x: (column - row / 2) * BOWLING_CONFIG.lane.pinSpacing,
        z: BOWLING_CONFIG.lane.headPinZ + row * BOWLING_CONFIG.lane.pinRowSpacing,
      });
    }
  }
  return pins;
}

export type BowlingPhase = 'aiming' | 'rolling' | 'settling' | 'scoring' | 'turn_end' | 'game_over';
export type BowlingCallout = 'strike' | 'spare' | 'gutter' | null;

export interface BowlingFrame {
  throws: number[];
  total: number;
  strike: boolean;
  spare: boolean;
  complete: boolean;
}

export interface BowlingScorecard {
  frames: BowlingFrame[];
  total: number;
}

export interface BowlingRankingEntry {
  playerId: string;
  name: string;
  total: number;
  rank: number;
}

export interface BowlingPlayerSnapshot {
  playerId: string;
  name: string;
  color: string;
  scorecard: BowlingScorecard;
  left: boolean;
  connected: boolean;
}

export interface BowlingPinSnapshot {
  id: number;
  x: number;
  z: number;
  tilt: number;
  knocked: boolean;
  removed: boolean;
}

export interface BowlingBallSnapshot {
  x: number;
  z: number;
  visible: boolean;
  inGutter: boolean;
}

export interface BowlingThrowResult {
  playerId: string;
  row: number;
  throwIndex: number;
  pins: number;
  gutter: boolean;
  strike: boolean;
  spare: boolean;
}

export interface BowlingSnapshot {
  id: string;
  phase: BowlingPhase;
  serverTime: number;
  startedAt: number;
  isSolo: boolean;
  activePlayerId: string | null;
  turnOrder: string[];
  row: number;
  turnDeadline: number | null;
  players: BowlingPlayerSnapshot[];
  pins: BowlingPinSnapshot[];
  ball: BowlingBallSnapshot;
  callout: BowlingCallout;
  calloutAt: number;
  lastThrow: BowlingThrowResult | null;
  ranking: BowlingRankingEntry[];
  bestSoloScore: number;
  gameOverAt: number | null;
}

export interface BowlingRules {
  rows: number;
  pinsPerRow: number;
  scoring: {
    strikeBonus: number;
    spareBonus: number;
  };
}
