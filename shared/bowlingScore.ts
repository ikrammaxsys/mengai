import { BOWLING_CONFIG, type BowlingFrame, type BowlingRankingEntry, type BowlingRules, type BowlingScorecard } from './bowlingConfig.js';

export function createScorecard(rules: BowlingRules = BOWLING_CONFIG): BowlingScorecard {
  return {
    frames: Array.from({ length: rules.rows }, () => ({
      throws: [],
      total: 0,
      strike: false,
      spare: false,
      complete: false,
    })),
    total: 0,
  };
}

function cloneScorecard(card: BowlingScorecard): BowlingScorecard {
  return {
    frames: card.frames.map((frame) => ({ ...frame, throws: [...frame.throws] })),
    total: card.total,
  };
}

function frameSum(frame: BowlingFrame): number {
  return frame.throws.reduce((sum, value) => sum + value, 0);
}

export function recordThrow(
  card: BowlingScorecard,
  row: number,
  pins: number,
  rules: BowlingRules = BOWLING_CONFIG,
): BowlingScorecard {
  if (row < 0 || row >= card.frames.length) return card;
  const source = card.frames[row];
  if (source.complete) return card;

  const remaining = Math.max(0, rules.pinsPerRow - frameSum(source));
  const value = Math.max(0, Math.min(remaining, Math.round(Number.isFinite(pins) ? pins : 0)));
  const next = cloneScorecard(card);
  const frame = next.frames[row];
  frame.throws.push(value);
  frame.strike = frame.throws.length === 1 && value === rules.pinsPerRow;
  frame.spare = !frame.strike && frame.throws.length === 2 && frameSum(frame) === rules.pinsPerRow;
  frame.complete = frame.strike || frame.throws.length >= 2;
  frame.total = frameSum(frame) + (frame.strike ? rules.scoring.strikeBonus : 0) + (frame.spare ? rules.scoring.spareBonus : 0);
  next.total = next.frames.reduce((sum, entry) => sum + entry.total, 0);
  return next;
}

export function isFrameComplete(frame: BowlingFrame): boolean {
  return frame.complete || frame.strike || frame.throws.length >= BOWLING_CONFIG.throwsPerRow;
}

export function runningTotal(card: BowlingScorecard, row: number): number {
  return card.frames.slice(0, Math.max(0, row + 1)).reduce((sum, frame) => sum + frame.total, 0);
}

export function rankBowlingPlayers(
  entries: { playerId: string; name: string; card: BowlingScorecard }[],
): BowlingRankingEntry[] {
  const sorted = entries
    .map((entry) => ({ playerId: entry.playerId, name: entry.name, total: entry.card.total }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  let rank = 0;
  let previousTotal: number | null = null;
  return sorted.map((entry, index) => {
    if (previousTotal === null || entry.total !== previousTotal) {
      rank = index + 1;
      previousTotal = entry.total;
    }
    return { ...entry, rank };
  });
}
