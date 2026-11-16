import assert from 'node:assert/strict';
import { BOWLING_CONFIG } from '../shared/bowlingConfig.js';
import { createScorecard, rankBowlingPlayers, recordThrow } from '../shared/bowlingScore.js';
import { advanceLane, countDownPins, createLaneState, startRoll } from '../server/src/bowlingPhysics.js';
import { BowlingGame } from '../server/src/bowling.js';
import type { Player } from '../server/src/types.js';

let card = createScorecard();
assert.equal(card.frames.length, BOWLING_CONFIG.rows, 'a game has five rows');
assert.equal(card.total, 0, 'a new scorecard starts at zero');

card = recordThrow(card, 0, 10);
assert.equal(card.frames[0].strike, true, 'ten on the first throw is a strike');
assert.equal(card.frames[0].complete, true, 'a strike ends the row early');
assert.equal(card.frames[0].total, 10 + BOWLING_CONFIG.scoring.strikeBonus, 'a strike adds the configured bonus');
assert.equal(recordThrow(card, 0, 4), card, 'a completed row cannot accept another throw');

let spare = createScorecard();
spare = recordThrow(spare, 0, 4);
spare = recordThrow(spare, 0, 6);
assert.equal(spare.frames[0].spare, true, 'ten across two throws is a spare');
assert.equal(spare.frames[0].complete, true, 'a spare ends the row');
assert.equal(spare.frames[0].total, 10 + BOWLING_CONFIG.scoring.spareBonus, 'a spare adds the configured bonus');

let gutter = createScorecard();
gutter = recordThrow(gutter, 0, 0);
gutter = recordThrow(gutter, 0, 0);
assert.equal(gutter.frames[0].total, 0, 'two gutter throws score nothing');
assert.equal(gutter.frames[0].strike, false);
assert.equal(gutter.frames[0].spare, false);

let full = createScorecard();
for (let row = 0; row < BOWLING_CONFIG.rows; row++) full = recordThrow(full, row, 10);
assert.equal(full.frames.every((frame) => frame.strike && frame.total === 20), true, 'five rows of strikes score 20 each');
assert.equal(full.total, 100, 'a full five-row strike game totals 100');

let mixed = createScorecard();
mixed = recordThrow(mixed, 0, 3);
mixed = recordThrow(mixed, 0, 4);
mixed = recordThrow(mixed, 1, 10);
assert.equal(mixed.total, 7 + 20, 'running total adds every row total');

const tied = rankBowlingPlayers([
  { playerId: 'a', name: 'Ari', card: full },
  { playerId: 'b', name: 'Bima', card: full },
  { playerId: 'c', name: 'Citra', card: mixed },
]);
assert.deepEqual(tied.map((entry) => entry.rank), [1, 1, 3], 'ties share a rank and the next rank is skipped');
assert.equal(tied[0].total, 100);

const ordered = rankBowlingPlayers([
  { playerId: 'low', name: 'Low', card: gutter },
  { playerId: 'high', name: 'High', card: full },
]);
assert.deepEqual(ordered.map((entry) => entry.playerId), ['high', 'low'], 'ranking sorts by total descending');

function throwLane(aim: number, power: number): { down: number; gutter: boolean; settled: boolean } {
  const lane = createLaneState();
  startRoll(lane, { aim, power });
  let steps = 0;
  while (!lane.settled && steps < 2_000) {
    advanceLane(lane, 1 / 60);
    steps++;
  }
  return { down: countDownPins(lane), gutter: lane.gutter, settled: lane.settled };
}

const perfect = throwLane(-0.05, 0.9);
const perfectRepeat = throwLane(-0.05, 0.9);
assert.equal(perfect.settled, true, 'a throw always settles within the timeout');
assert.equal(perfect.down, perfectRepeat.down, 'the same throw input produces a deterministic pin count');
assert.ok(perfect.down > 0, 'a centered throw knocks pins down');
const gutterThrow = throwLane(1, 1);
assert.equal(gutterThrow.gutter, true, 'a wide throw is trapped by the gutter');
assert.equal(gutterThrow.down, 0, 'a gutter throw knocks down no pins');

const fakePlayers = [
  { id: 'lane-a', name: 'Ari', color: '#f07853', disconnectedAt: null },
  { id: 'lane-b', name: 'Bima', color: '#5c9ee8', disconnectedAt: null },
] as unknown as Player[];
const game = new BowlingGame('game-test', fakePlayers, 1_000, false);
let gameNow = 1_000;
let guard = 0;
while (game.phase !== 'game_over' && guard < 2_000) {
  if (game.phase === 'aiming' && game.activePlayerId) game.submitThrow(game.activePlayerId, -0.05, 0.9, gameNow);
  gameNow += 100;
  game.update(gameNow);
  guard++;
}
assert.equal(game.phase, 'game_over', 'the authoritative game reaches game over');
assert.equal(game.ranking.length, 2, 'both party players stay on the final ranking');
assert.equal(game.ranking.every((entry) => entry.rank === 1 || entry.rank === 2), true, 'the final ranking uses valid ranks');
assert.equal(game.snapshot(gameNow).activePlayerId, null, 'no player is active after game over');

console.log('Bowling checks passed: scoring, strike, spare, gutter, five rows, ties, deterministic lane physics, and full game flow.');
