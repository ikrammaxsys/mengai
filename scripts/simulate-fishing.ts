import { FISH_CONFIG } from '../shared/fishConfig.js';
import { getWeightedTable, rollSpecies, rollWeight } from '../server/src/fishing.js';
import assert from 'node:assert/strict';

const iterations = 1000;
const neutralCounts = new Map(FISH_CONFIG.species.map((species) => [species.id, 0]));
for (let index = 0; index < iterations; index++) {
  const result = rollSpecies(FISH_CONFIG.pond.waterRadius * 0.5, { pityMisses: 0, lastSpecies: null }, false);
  neutralCounts.set(result.species.id, neutralCounts.get(result.species.id)! + 1);
}
const counts = new Map(FISH_CONFIG.species.map((species) => [species.id, 0]));
const weights = new Map(FISH_CONFIG.species.map((species) => [species.id, [] as number[]]));
let pityMisses = 0;
let lastSpecies: (typeof FISH_CONFIG.species)[number]['id'] | null = null;

for (let index = 0; index < iterations; index++) {
  // Sample casts across all three depth regions and include a modest share of fast reactions.
  const depth = Math.random() * FISH_CONFIG.pond.waterRadius;
  const quickReaction = Math.random() < 0.18;
  const result = rollSpecies(depth, { pityMisses, lastSpecies }, quickReaction);
  counts.set(result.species.id, counts.get(result.species.id)! + 1);
  weights.get(result.species.id)!.push(rollWeight(result.species));
  if (result.species.rarity === 'epic' || result.species.rarity === 'legendary') pityMisses = 0;
  else pityMisses += 1;
  lastSpecies = result.species.id;
}

console.log(`Simulated ${iterations} catches with depth, reaction, pity, and variety modifiers:`);
for (const species of FISH_CONFIG.species) {
  const samples = weights.get(species.id)!;
  const average = samples.length ? samples.reduce((sum, value) => sum + value, 0) / samples.length : 0;
  console.log(`${species.name.padEnd(18)} ${String(counts.get(species.id)).padStart(4)} (${((counts.get(species.id)! / iterations) * 100).toFixed(1)}%)  n=${samples.length}  avg=${average.toFixed(2)} kg  median config=${species.medianKg.toFixed(2)} kg`);
}

const neutralTable = getWeightedTable(FISH_CONFIG.pond.waterRadius * 0.5, { pityMisses: 0, lastSpecies: null }, false);
console.log('\nNeutral-zone sample versus configured base odds:');
for (const species of FISH_CONFIG.species) {
  const observed = neutralCounts.get(species.id)! / iterations;
  const expected = neutralTable[species.id];
  const tolerance = Math.max(0.055, 4 * Math.sqrt(expected * (1 - expected) / iterations));
  assert.ok(Math.abs(observed - expected) <= tolerance, `${species.name} sample outside tolerance: ${observed} vs ${expected}`);
  console.log(`  ${species.name}: ${(observed * 100).toFixed(1)}% observed / ${(expected * 100).toFixed(1)}% expected`);
}
assert.ok(neutralCounts.get('golden-koi')! > 0, 'Koi should be rare but possible in a 1,000 catch sample');

console.log('\nLog-normal weight checks (1,000 samples per species):');
for (const species of FISH_CONFIG.species) {
  const sample = Array.from({ length: 1000 }, () => rollWeight(species)).sort((a, b) => a - b);
  const observedMedian = sample[Math.floor(sample.length / 2)];
  assert.ok(sample.every((weight) => weight >= species.minKg && weight <= species.maxKg));
  assert.ok(Math.abs(observedMedian / species.medianKg - 1) < 0.2, `${species.name} median sample outside expected range`);
  console.log(`  ${species.name}: median=${observedMedian.toFixed(2)} kg (configured ${species.medianKg.toFixed(2)} kg), bounds=${species.minKg}-${species.maxKg} kg`);
}

const base = getWeightedTable(FISH_CONFIG.pond.waterRadius * 0.5, { pityMisses: 0, lastSpecies: null }, false);
const protectedOdds = getWeightedTable(FISH_CONFIG.pond.waterRadius * 0.5, { pityMisses: 10, lastSpecies: null }, false);
console.log('\nBase neutral-zone probabilities:');
for (const species of FISH_CONFIG.species) console.log(`  ${species.name}: ${(base[species.id] * 100).toFixed(1)}%`);
console.log(`Pity after 10 non-protected catches raises carp odds to ${(protectedOdds['common-carp'] * 100).toFixed(1)}% and koi odds to ${(protectedOdds['golden-koi'] * 100).toFixed(1)}%.`);
assert.ok(protectedOdds['common-carp'] > base['common-carp']);
assert.ok(protectedOdds['golden-koi'] > base['golden-koi']);
