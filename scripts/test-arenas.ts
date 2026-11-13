import assert from 'node:assert/strict';
import { ARENA_CONFIG } from '../shared/arenaConfig.js';
import { addArenaPlayer, arenaSnapshot, createCrocodileArena, removeArenaPlayer, restartCrocodileArena } from '../server/src/arenas.js';
import type { Player } from '../server/src/types.js';

function player(id: string, name: string, color: string): Player {
  return { id, name, color } as Player;
}

const now = 100_000;
const firstPlayer = player('player-one', 'Pond One', '#458a72');
const secondPlayer = player('player-two', 'Pond Two', '#5278bd');
const arena = createCrocodileArena(firstPlayer, now);
const instanceId = arena.id;
assert.equal(arena.isSolo, true, 'a one-player arena starts as a solo run');

addArenaPlayer(arena, secondPlayer, now + 100);
assert.equal(arena.isSolo, false, 'adding a teammate makes the run ineligible for solo records');
assert.equal(arena.players.length, 2, 'a second player can join the active arena');
assert.notDeepEqual(
  { x: arena.players[0].x, z: arena.players[0].z },
  { x: arena.players[1].x, z: arena.players[1].z },
  'party members should receive separate spawn positions',
);
assert.deepEqual(arenaSnapshot(arena, now + 100).players.map(({ name }) => name), ['Pond One', 'Pond Two'],
  'arena snapshots should include the complete named party');

arena.players[1].hp = 0;
arena.players[1].stones = 3;
arena.state = 'victory';
restartCrocodileArena(arena, now + 200);
assert.equal(arena.id, instanceId, 'restarting keeps the shared arena instance');
assert.equal(arena.players.length, 2, 'restarting preserves every party member');
assert.equal(arena.isSolo, false, 'restarting a party arena does not make it eligible for solo records');
assert.ok(arena.players.every(({ hp, maxHp, stones }) => hp === maxHp && stones === 0),
  'restarting restores every party member and resets their stones');
assert.equal(arena.monster.hp, ARENA_CONFIG.monsterMaxHp, 'restarting restores the shared crocodile health');

removeArenaPlayer(arena, firstPlayer.id);
assert.deepEqual(arena.players.map(({ playerId }) => playerId), [secondPlayer.id],
  'a departing player should leave teammates in the same arena');

console.log('Arena checks passed: shared party snapshots, distinct spawns, party restart, and independent leaving.');
