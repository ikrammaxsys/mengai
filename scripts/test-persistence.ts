import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { CampfireCooking, CatchEntry, Room } from '../server/src/types.js';
import type { CatchRecord } from '../server/src/inventory.js';
import { JsonGameDataStore } from '../server/src/persistence.js';

const directory = await mkdtemp(join(tmpdir(), 'mengai-json-store-'));
const filePath = join(directory, 'pond-data.json');

try {
  const first = new JsonGameDataStore(filePath);
  await first.load();
  const catches: CatchEntry[] = [
    { id: 'catch-heavy', playerId: 'old-session', playerName: 'River', species: 'common-carp', weightKg: 4.2, rarity: 'epic', timestamp: 1000 },
    { id: 'catch-light', playerId: 'old-session', playerName: 'River', species: 'bluegill', weightKg: 0.3, rarity: 'common', timestamp: 2000 },
  ];
  const records: CatchRecord[] = catches.map((entry) => ({
    catchId: entry.id, species: entry.species, rarity: entry.rarity, weightKg: entry.weightKg, caughtAt: entry.timestamp,
  }));
  for (let index = 0; index < catches.length; index++) {
    await first.recordCatch('pond-one', 'River', catches[index], records[index]);
  }
  assert.equal(await first.recordCrocodileKill('pond-one', 'River'), 1);
  assert.equal(await first.recordCrocodileKill('pond-one', 'RIVER'), 2);
  assert.equal(await first.releaseFish('pond-one', 'RIVER', catches[0].id), true);
  const cooking: CampfireCooking = {
    cookId: 'cook-one', playerId: 'session-two', playerName: 'River', fish: records[1], startedAt: 3000, durationMs: 9000,
  };
  assert.equal(await first.startCooking('pond-one', 'River', catches[1].id, cooking), true);
  await first.flush();

  const restarted = new JsonGameDataStore(filePath);
  await restarted.load();
  const inventory = restarted.playerFish('pond-one', 'river');
  assert.equal(inventory.totalCaught, 2, 'catch total survives release and reload');
  assert.equal(inventory.crocodilesSlain, 2, 'crocodile kills survive reload');
  assert.deepEqual(inventory.items, [], 'released and cooking fish are absent from the active backpack');
  assert.equal(inventory.personalBest?.catchId, catches[0].id, 'personal best remains in catch history after release');
  assert.deepEqual(inventory.collection.map((item) => item.species).sort(), ['bluegill', 'common-carp']);

  const room = { id: 'pond-one', leaderboard: [], personalBests: new Map() } as unknown as Room;
  restarted.hydrateRoom(room);
  assert.deepEqual(room.leaderboard.map((entry) => entry.id), ['catch-heavy', 'catch-light']);
  assert.equal(room.personalBests.get('river')?.id, catches[0].id);
  assert.equal(room.campfireCooking?.cookId, cooking.cookId, 'in-progress cooking restores after reload');
  assert.equal(await restarted.finishCooking('pond-one', cooking.cookId), true);
  await restarted.flush();
  const afterCook = new JsonGameDataStore(filePath);
  await afterCook.load();
  const completedRoom = { id: 'pond-one', leaderboard: [], personalBests: new Map() } as unknown as Room;
  afterCook.hydrateRoom(completedRoom);
  assert.equal(completedRoom.campfireCooking, null, 'completed cooking is cleared from persistent room state');
  console.log('JSON persistence checks passed: reload, catch history, leaderboard, personal best, collection, and release state.');
} finally {
  await rm(directory, { recursive: true, force: true });
}
