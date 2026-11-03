import assert from 'node:assert/strict';
import { CHICKEN_CONFIG } from '../shared/chickenConfig.js';
import { awardChickenScore, createChickenFlock, hitChickenAt, updateChickenFlock } from '../server/src/chickens.js';

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const now = 100_000;
const flock = createChickenFlock(now, seededRandom(47));
assert.ok(flock.size >= CHICKEN_CONFIG.minCount && flock.size <= CHICKEN_CONFIG.maxCount);
for (const chicken of flock.values()) {
  const radius = Math.hypot(chicken.x, chicken.z);
  assert.ok(radius >= CHICKEN_CONFIG.pondSafeRadius, 'chicken spawn should avoid the pond');
  assert.ok(radius <= CHICKEN_CONFIG.outerRadius, 'chicken spawn should remain within the island bounds');
}

const chicken = flock.values().next().value!;
const solo = new Map([[chicken.id, chicken]]);
const originalPosition = { x: chicken.x, z: chicken.z };
assert.equal(hitChickenAt(solo, chicken.x, chicken.z, now, () => 0), chicken, 'stone-radius collision should hit a nearby chicken');
assert.equal(chicken.state, 'respawning', 'a hit chicken should pop immediately');
assert.ok(chicken.respawnAt! >= now + CHICKEN_CONFIG.respawnDelayMinMs);
assert.ok(chicken.respawnAt! < now + CHICKEN_CONFIG.respawnDelayMaxMs);
assert.equal(hitChickenAt(solo, chicken.x, chicken.z, now + 100, () => 0), null,
  'a popped chicken cannot be scored during its respawn delay');
updateChickenFlock(solo, chicken.respawnAt! - 1, 0.1, seededRandom(17));
assert.equal(chicken.state, 'respawning');
updateChickenFlock(solo, chicken.respawnAt!, 0.1, seededRandom(19));
assert.equal(chicken.state, 'idle', 'chicken returns to wandering after its respawn delay');
assert.ok(Math.hypot(chicken.x - originalPosition.x, chicken.z - originalPosition.z) >= CHICKEN_CONFIG.respawnMinDistance,
  'respawned chicken must relocate away from its old spot');
assert.ok(hitChickenAt(solo, chicken.x, chicken.z, chicken.respawnAt!, () => 0), 'respawned chicken can be scored again at its new location');

const wanderer = [...flock.values()].find((entry) => entry.id !== chicken.id)!;
wanderer.state = 'idle';
wanderer.nextDecisionAt = now;
updateChickenFlock(new Map([[wanderer.id, wanderer]]), now, 0.1, seededRandom(7));
assert.equal(wanderer.state, 'wander');
const beforeWander = { x: wanderer.x, z: wanderer.z };
updateChickenFlock(new Map([[wanderer.id, wanderer]]), now + 100, 0.1, seededRandom(7));
assert.ok(Math.hypot(wanderer.x - beforeWander.x, wanderer.z - beforeWander.z) > 0, 'wandering chicken should move');

const scorer = { chickenScore: 0 };
assert.equal(awardChickenScore(scorer), 1);
assert.equal(awardChickenScore(scorer), 2);

console.log('Chicken checks passed: random safe flock, pop/respawn cooldown, relocation, wandering, and score increments.');
