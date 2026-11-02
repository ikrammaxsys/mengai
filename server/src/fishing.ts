import { FISH_CONFIG, type FishSpecies, type FishSpeciesId } from '../../shared/fishConfig.js';
import { WEATHER_CONFIG, type WeatherType } from '../../shared/weatherConfig.js';

export interface CatchRollState {
  pityMisses: number;
  lastSpecies: FishSpeciesId | null;
}

export interface RollResult {
  species: FishSpecies;
  probabilities: Record<FishSpeciesId, number>;
  zone: 'deep' | 'middle' | 'shallow';
}

export function standardNormal(random: () => number = Math.random): number {
  const u1 = Math.max(random(), Number.EPSILON);
  const u2 = random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export function rollWeight(species: FishSpecies, random: () => number = Math.random): number {
  const value = species.medianKg * Math.exp(species.sigma * standardNormal(random));
  const clamped = Math.max(species.minKg, Math.min(species.maxKg, value));
  return Math.round(clamped * 100) / 100;
}

export function getWeightedTable(
  depthRadius: number,
  state: CatchRollState,
  quickReaction: boolean,
  weatherType: WeatherType = 'clear',
): RollResult['probabilities'] & { zone: RollResult['zone'] } {
  const fraction = depthRadius / FISH_CONFIG.pond.waterRadius;
  const zone: RollResult['zone'] = fraction <= FISH_CONFIG.depth.deepRadiusFraction ? 'deep'
    : fraction >= FISH_CONFIG.depth.shallowStartFraction ? 'shallow' : 'middle';
  const pity = Math.min(state.pityMisses * FISH_CONFIG.modifiers.pityIncreasePerMiss, FISH_CONFIG.modifiers.pityMaximum);
  const adjusted = FISH_CONFIG.species.map((fish) => {
    let weight = fish.baseWeight * WEATHER_CONFIG.states[weatherType].fishing.speciesAffinity[fish.id];
    if (zone === 'shallow') {
      weight *= fish.depthGroup === 'common' ? FISH_CONFIG.depth.shallowCommonMultiplier
        : fish.depthGroup === 'rare' ? FISH_CONFIG.depth.shallowRareMultiplier : 1;
    } else if (zone === 'deep') {
      weight *= fish.depthGroup === 'common' ? FISH_CONFIG.depth.deepCommonMultiplier
        : fish.depthGroup === 'rare' ? FISH_CONFIG.depth.deepRareMultiplier : 1;
    }
    if (quickReaction && fish.depthGroup === 'rare') weight *= FISH_CONFIG.modifiers.quickRareMultiplier;
    if ((FISH_CONFIG.modifiers.protectedRarities as readonly string[]).includes(fish.rarity)) weight *= 1 + pity;
    if (fish.id === state.lastSpecies) weight *= FISH_CONFIG.modifiers.varietyMultiplier;
    return { fish, weight };
  });
  const total = adjusted.reduce((sum, entry) => sum + entry.weight, 0);
  const probabilities = Object.fromEntries(adjusted.map(({ fish, weight }) => [fish.id, weight / total])) as Record<FishSpeciesId, number>;
  return Object.assign(probabilities, { zone });
}

export function rollSpecies(
  depthRadius: number,
  state: CatchRollState,
  quickReaction: boolean,
  uniformRoll = Math.random(),
  weatherType: WeatherType = 'clear',
): RollResult {
  const table = getWeightedTable(depthRadius, state, quickReaction, weatherType);
  let threshold = uniformRoll;
  let selected = FISH_CONFIG.species[FISH_CONFIG.species.length - 1];
  for (const fish of FISH_CONFIG.species) {
    threshold -= table[fish.id];
    if (threshold < 0) { selected = fish; break; }
  }
  const { zone, ...probabilities } = table;
  return { species: selected, probabilities, zone };
}
