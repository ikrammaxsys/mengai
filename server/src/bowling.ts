import {
  BOWLING_CONFIG,
  type BowlingCallout,
  type BowlingPhase,
  type BowlingRankingEntry,
  type BowlingScorecard,
  type BowlingSnapshot,
  type BowlingThrowResult,
} from '../../shared/bowlingConfig.js';
import { createScorecard, isFrameComplete, rankBowlingPlayers, recordThrow } from '../../shared/bowlingScore.js';
import { advanceLane, countDownPins, createLaneState, isPinDown, markKnockedPins, removeDownPins, resetLane, startRoll, type LaneState } from './bowlingPhysics.js';
import type { Player } from './types.js';

export interface BowlingParticipant {
  playerId: string;
  name: string;
  color: string;
  scorecard: BowlingScorecard;
  left: boolean;
  connected: boolean;
}

export type BowlingThrowCode = 'ok' | 'not-active' | 'wrong-phase' | 'invalid';

export type BowlingEvent =
  | { type: 'throwScored'; playerId: string; name: string; pins: number; gutter: boolean; strike: boolean; spare: boolean; row: number; throwIndex: number }
  | { type: 'firstStrike'; playerId: string; name: string }
  | { type: 'gameOver'; isSolo: boolean; playerId: string; score: number; ranking: BowlingRankingEntry[] };

export class BowlingGame {
  readonly id: string;
  readonly startedAt: number;
  isSolo: boolean;
  players: BowlingParticipant[];
  phase: BowlingPhase = 'aiming';
  row = 0;
  activeIndex = 0;
  callout: BowlingCallout = null;
  calloutAt = 0;
  lastThrow: BowlingThrowResult | null = null;
  ranking: BowlingRankingEntry[] = [];
  bestSoloScore = 0;
  gameOverAt: number | null = null;

  private readonly lane: LaneState = createLaneState();
  private turnDeadline: number | null = null;
  private phaseUntil = 0;
  private lastPhysicsAt = 0;
  private pendingPins = 0;
  private pendingGutter = false;
  private firstStrikeAwarded = false;

  constructor(id: string, players: Player[], now: number, isSolo: boolean, bestSoloScore = 0) {
    this.id = id;
    this.startedAt = now;
    this.isSolo = isSolo;
    this.bestSoloScore = bestSoloScore;
    this.players = players.map((player) => ({
      playerId: player.id,
      name: player.name,
      color: player.color,
      scorecard: createScorecard(),
      left: false,
      connected: player.disconnectedAt === null,
    }));
    this.beginAim(now, true);
  }

  get activePlayerId(): string | null {
    if (this.phase === 'game_over') return null;
    return this.players[this.activeIndex]?.playerId ?? null;
  }

  submitThrow(playerId: string, aim: number, power: number, now: number): BowlingThrowCode {
    if (this.phase !== 'aiming') return 'wrong-phase';
    if (this.activePlayerId !== playerId) return 'not-active';
    if (!Number.isFinite(aim) || !Number.isFinite(power)) return 'invalid';
    if (aim < -1 || aim > 1 || power < 0 || power > 1) return 'invalid';
    const player = this.players[this.activeIndex];
    if (!player || player.left) return 'not-active';
    startRoll(this.lane, { aim, power });
    this.phase = 'rolling';
    this.turnDeadline = null;
    this.lastPhysicsAt = now;
    this.callout = null;
    this.calloutAt = 0;
    return 'ok';
  }

  update(now: number): BowlingEvent[] {
    const events: BowlingEvent[] = [];
    if (this.players.every((player) => player.left)) {
      if (this.phase !== 'game_over') this.finishGame(now, events);
      return events;
    }
    if (this.phase === 'aiming' && this.turnDeadline !== null && now >= this.turnDeadline) {
      const active = this.players[this.activeIndex];
      if (active && !active.left) {
        const aim = (Math.random() * 2 - 1) * 0.45;
        const power = 0.16 + Math.random() * 0.24;
        this.submitThrow(active.playerId, aim, power, now);
      } else {
        this.phase = 'turn_end';
        this.phaseUntil = now;
      }
    }
    if (this.phase === 'rolling') {
      const elapsed = Math.max(0, (now - this.lastPhysicsAt) / 1000);
      this.lastPhysicsAt = now;
      advanceLane(this.lane, elapsed);
      if (this.lane.settled) {
        this.pendingPins = countDownPins(this.lane);
        this.pendingGutter = this.lane.gutter;
        this.phase = 'scoring';
        this.phaseUntil = now + BOWLING_CONFIG.timings.scorePauseMs;
      }
    }
    if (this.phase === 'scoring' && now >= this.phaseUntil) {
      this.resolveScoring(now, events);
    }
    if (this.phase === 'turn_end' && now >= this.phaseUntil) {
      this.advanceTurn(now, events);
    }
    return events;
  }

  removePlayer(playerId: string, now: number): void {
    const participant = this.players.find((player) => player.playerId === playerId);
    if (!participant) return;
    participant.left = true;
    participant.connected = false;
    if (this.phase === 'aiming' && this.activePlayerId === playerId) {
      this.phase = 'turn_end';
      this.phaseUntil = now;
    }
  }

  restart(now: number): boolean {
    this.players = this.players.filter((player) => !player.left);
    if (!this.players.length) return false;
    for (const player of this.players) {
      player.scorecard = createScorecard();
      player.connected = true;
    }
    this.isSolo = this.isSolo && this.players.length === 1;
    this.phase = 'aiming';
    this.row = 0;
    this.activeIndex = 0;
    this.callout = null;
    this.calloutAt = 0;
    this.lastThrow = null;
    this.ranking = [];
    this.gameOverAt = null;
    this.firstStrikeAwarded = false;
    this.beginAim(now, true);
    return true;
  }

  snapshot(serverTime: number): BowlingSnapshot {
    return {
      id: this.id,
      phase: this.phase,
      serverTime,
      startedAt: this.startedAt,
      isSolo: this.isSolo,
      activePlayerId: this.activePlayerId,
      turnOrder: this.players.map((player) => player.playerId),
      row: this.row,
      turnDeadline: this.turnDeadline,
      players: this.players.map((player) => ({
        playerId: player.playerId,
        name: player.name,
        color: player.color,
        scorecard: player.scorecard,
        left: player.left,
        connected: player.connected,
      })),
      pins: this.lane.pins.map((pin) => ({
        id: pin.id,
        x: pin.x,
        z: pin.z,
        tilt: pin.tilt,
        knocked: pin.knocked || isPinDown(pin),
        removed: pin.removed,
      })),
      ball: {
        x: this.lane.ball.x,
        z: this.lane.ball.z,
        visible: this.lane.ball.visible,
        inGutter: this.lane.ball.inGutter,
      },
      callout: this.callout,
      calloutAt: this.calloutAt,
      lastThrow: this.lastThrow,
      ranking: this.ranking,
      bestSoloScore: this.bestSoloScore,
      gameOverAt: this.gameOverAt,
    };
  }

  private beginAim(now: number, resetPins: boolean): void {
    if (resetPins) resetLane(this.lane);
    this.phase = 'aiming';
    this.turnDeadline = now + BOWLING_CONFIG.turnTimeMs;
    this.phaseUntil = 0;
    this.pendingPins = 0;
    this.pendingGutter = false;
    this.callout = null;
    this.calloutAt = 0;
  }

  private resolveScoring(now: number, events: BowlingEvent[]): void {
    const participant = this.players[this.activeIndex];
    if (!participant) {
      this.finishGame(now, events);
      return;
    }
    const frameBefore = participant.scorecard.frames[this.row];
    const throwIndex = frameBefore.throws.length + 1;
    const pins = Math.max(0, Math.min(this.pendingPins, BOWLING_CONFIG.pinsPerRow - frameBefore.throws.reduce((sum, value) => sum + value, 0)));
    participant.scorecard = recordThrow(participant.scorecard, this.row, pins);
    const frame = participant.scorecard.frames[this.row];
    const strike = throwIndex === 1 && pins === BOWLING_CONFIG.pinsPerRow;
    const spare = !strike && throwIndex === 2 && frame.throws.reduce((sum, value) => sum + value, 0) === BOWLING_CONFIG.pinsPerRow;
    const gutter = pins === 0;
    this.callout = gutter ? 'gutter' : strike ? 'strike' : spare ? 'spare' : null;
    this.calloutAt = now;
    this.lastThrow = { playerId: participant.playerId, row: this.row, throwIndex, pins, gutter: gutter || this.pendingGutter, strike, spare };
    markKnockedPins(this.lane);
    events.push({ type: 'throwScored', playerId: participant.playerId, name: participant.name, pins, gutter, strike, spare, row: this.row, throwIndex });
    if (strike && !this.firstStrikeAwarded) {
      this.firstStrikeAwarded = true;
      events.push({ type: 'firstStrike', playerId: participant.playerId, name: participant.name });
    }
    this.phase = 'turn_end';
    this.phaseUntil = now + BOWLING_CONFIG.timings.calloutMs;
  }

  private advanceTurn(now: number, events: BowlingEvent[]): void {
    const participant = this.players[this.activeIndex];
    if (participant && !participant.left && !isFrameComplete(participant.scorecard.frames[this.row])) {
      removeDownPins(this.lane);
      this.beginAim(now, false);
      return;
    }
    const next = this.findNextActiveForRow(this.activeIndex);
    if (next !== null) {
      this.activeIndex = next;
      this.beginAim(now, true);
      return;
    }
    this.row += 1;
    if (this.row >= BOWLING_CONFIG.rows) {
      this.finishGame(now, events);
      return;
    }
    const first = this.firstActiveIndex();
    if (first === null) {
      this.finishGame(now, events);
      return;
    }
    this.activeIndex = first;
    this.beginAim(now, true);
  }

  private findNextActiveForRow(fromIndex: number): number | null {
    for (let step = 1; step < this.players.length; step++) {
      const index = (fromIndex + step) % this.players.length;
      const player = this.players[index];
      if (player.left) continue;
      if (!isFrameComplete(player.scorecard.frames[this.row])) return index;
    }
    return null;
  }

  private firstActiveIndex(): number | null {
    const index = this.players.findIndex((player) => !player.left);
    return index >= 0 ? index : null;
  }

  private finishGame(now: number, events: BowlingEvent[]): void {
    if (this.phase === 'game_over') return;
    this.phase = 'game_over';
    this.turnDeadline = null;
    this.phaseUntil = 0;
    this.gameOverAt = now;
    resetLane(this.lane);
    this.ranking = rankBowlingPlayers(this.players.map((player) => ({
      playerId: player.playerId,
      name: player.name,
      card: player.scorecard,
    })));
    const leader = this.ranking[0];
    const leaderPlayer = leader ? this.players.find((player) => player.playerId === leader.playerId) : undefined;
    events.push({
      type: 'gameOver',
      isSolo: this.isSolo,
      playerId: leader?.playerId ?? leaderPlayer?.playerId ?? '',
      score: leader?.total ?? 0,
      ranking: this.ranking,
    });
  }
}
