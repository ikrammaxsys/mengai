import { WORLD_CONFIG } from './worldConfig.js';
import { WEATHER_CONFIG, type WeatherType } from './weatherConfig.js';

export const FISH_CONFIG = {
  bigCatch: {
    zScoreThreshold: 1.5,
    notableRarities: ['epic', 'legendary'],
    spectacularRarities: ['legendary'],
    spectacularZScoreThreshold: 1.5,
    bannerDurationMs: 5000,
    spectacularDurationMs: 7000,
    queueLimit: 3,
  },
  stones: {
    pickupRange: 2.5,
    hitRadius: 1.8,
    cooldownMs: 1000,
    minFlightMs: 500,
    maxFlightMs: 900,
    flightDistanceMs: 28,
    lobDistance: 4.2,
    throwEdgeRadius: WORLD_CONFIG.stoneThrowRadius,
    apexMin: 1.1,
    apexDistanceFactor: 0.12,
    splashDurationSeconds: 0.8,
    respawnDelayMs: 5000,
    heldOffset: { x: 0.55, y: 1.72, z: 0.16 },
    pebbles: [
      { id: 'pebble-1', x: -5.5, z: -8.5, color: '#f0d9d9' },
      { id: 'pebble-2', x: -4.5, z: 8.4, color: '#efe7d8' },
      { id: 'pebble-3', x: 6.2, z: 9.2, color: '#e5c5d6' },
      { id: 'pebble-4', x: 10.2, z: 5.8, color: '#f2ece2' },
      { id: 'pebble-5', x: -10.2, z: 5.2, color: '#d9c7e5' },
      { id: 'pebble-6', x: 4.5, z: -10.2, color: '#f0ded0' },
      { id: 'pebble-7', x: 14, z: 2.3, color: '#eee7d8' },
      { id: 'pebble-8', x: -13.5, z: -3.5, color: '#e7cbd5' },
      { id: 'pebble-9', x: 1, z: 14.5, color: '#f3e6de' },
      { id: 'pebble-10', x: -1.5, z: -14.3, color: '#ddd0e8' },
    ],
  },
  sync: {
    interpolationDelayMs: 120,
    nominalSnapshotIntervalMs: 50,
    interpolationIntervals: 2,
    interpolationDelayMinMs: 80,
    interpolationDelayMaxMs: 300,
    maxExtrapolationMs: 150,
    snapshotBufferLimit: 32,
    correctionBlendMs: 150,
    hardCorrectionDistance: 6,
    maxBufferedMovementBytes: 16384,
  },
  movement: {
    maxSpeed: 5.2,
    turnSpeedRadians: 2.6,
    maxFrameSeconds: 0.05,
    mapRadius: WORLD_CONFIG.movementRadius,
    waterRadius: 4.25,
    waterSafetyMargin: 0.01,
    speedAllowance: 1.5,
    speedSlack: 0.4,
    turnAllowance: 1.5,
    turnSlackRadians: 0.24,
  },
  pond: {
    waterRadius: 4.15,
    edgeRange: 4,
    maxCastDistance: 8.4,
    minTargetRadius: 0.25,
    maxTargetRadius: 0.85,
    waterY: 0.23,
    splashSeconds: 0.8,
  },
  cast: {
    minFlightSeconds: 0.6,
    maxFlightSeconds: 0.9,
    distanceSeconds: 0.035,
    maxApexHeight: 2.8,
    apexDistanceFactor: 0.34,
    reelSeconds: 0.48,
    floatHeight: 0.31,
    floatAmplitude: 0.055,
    floatPeriodMs: 1250,
  },
  bite: {
    minWaitMs: 2000,
    maxWaitMs: 6000,
    reactionWindowMs: 1500,
    quickReactionMs: 500,
  },
  reel: {
    rarityFactors: { common: 0, uncommon: 0.25, rare: 0.5, epic: 0.75, legendary: 1 },
    rarityDifficultyWeight: 0.6,
    weightDifficultyWeight: 0.4,
    weightZOffset: 2,
    weightZRange: 4,
    markerMin: 0,
    markerMax: 100,
    markerStart: 50,
    markerAccelerationHold: 140,
    markerAccelerationRelease: 110,
    markerMaxVelocity: 60,
    markerDamping: 0.48,
    markerBounce: 0.32,
    simulationMaxStepSeconds: 0.05,
    helperDisplayCount: 3,
    greenCenterStart: 50,
    greenCenterMin: 20,
    greenCenterMax: 80,
    greenWidthMin: 18,
    greenWidthMax: 38,
    driftSpeedMin: 6,
    driftSpeedMax: 16,
    fillRateMin: 0.12,
    fillRateMax: 0.18,
    catchMeterStart: 0.3,
    catchMeterDrainMultiplier: 0.5,
    minimumDurationFraction: 0.6,
    zoneSineRate: 0.035,
    zoneRippleRate: 0.075,
    zoneMainAmplitude: 23,
    zoneRippleAmplitude: 5,
    fishPullIntervalMinSeconds: 5,
    fishPullIntervalMaxSeconds: 8,
    fishPullDurationSeconds: 1,
    fishPullDriftMultiplier: 1.45,
    fishPullShake: 1,
  },
  depth: {
    deepRadiusFraction: 0.4,
    shallowStartFraction: 0.6,
    shallowCommonMultiplier: 1.3,
    shallowRareMultiplier: 0.7,
    deepCommonMultiplier: 0.7,
    deepRareMultiplier: 1.3,
  },
  modifiers: {
    quickRareMultiplier: 1.25,
    pityIncreasePerMiss: 0.1,
    pityMaximum: 1,
    varietyMultiplier: 0.5,
    protectedRarities: ['epic', 'legendary'],
  },
  leaderboard: { maxEntries: 10 },
  species: [
    { id: 'bluegill', name: 'Ikan Insang Biru', rarity: 'common', rarityColor: '#929d98', medianKg: 0.2, sigma: 0.35, minKg: 0.05, maxKg: 1, baseWeight: 50, depthGroup: 'common', lengthK: 37.6 },
    { id: 'rainbow-trout', name: 'Ikan Trout Pelangi', rarity: 'uncommon', rarityColor: '#55a66c', medianKg: 0.9, sigma: 0.5, minKg: 0.2, maxKg: 6, baseWeight: 25, depthGroup: 'neutral', lengthK: 51.8 },
    { id: 'largemouth-bass', name: 'Ikan Bass Mulut Besar', rarity: 'rare', rarityColor: '#4b8bc8', medianKg: 1.2, sigma: 0.5, minKg: 0.3, maxKg: 6, baseWeight: 14, depthGroup: 'rare', lengthK: 42.4 },
    { id: 'common-carp', name: 'Ikan Kap Biasa', rarity: 'epic', rarityColor: '#a16bc2', medianKg: 3.5, sigma: 0.55, minKg: 0.8, maxKg: 20, baseWeight: 8, depthGroup: 'rare', lengthK: 42 },
    { id: 'golden-koi', name: 'Ikan Koi Emas', rarity: 'legendary', rarityColor: '#d5a633', medianKg: 3, sigma: 0.45, minKg: 1, maxKg: 12, baseWeight: 3, depthGroup: 'rare', lengthK: 42 },
    { id: 'todak', name: 'Ikan Todak', rarity: 'epic', rarityColor: '#668fa5', medianKg: 16, sigma: 0.58, minKg: 3, maxKg: 90, baseWeight: 5, depthGroup: 'rare', lengthK: 62 },
    { id: 'buntal', name: 'Ikan Buntal', rarity: 'uncommon', rarityColor: '#d68a4c', medianKg: 0.6, sigma: 0.4, minKg: 0.15, maxKg: 4, baseWeight: 14, depthGroup: 'neutral', lengthK: 32 },
    { id: 'pari', name: 'Ikan Pari', rarity: 'rare', rarityColor: '#7f8b6d', medianKg: 5, sigma: 0.55, minKg: 1, maxKg: 32, baseWeight: 7, depthGroup: 'rare', lengthK: 70 },
  ],
} as const;

export type FishSpecies = (typeof FISH_CONFIG.species)[number];
export type FishSpeciesId = FishSpecies['id'];
export type FishRarity = FishSpecies['rarity'];
export const BROADCAST_SCOPE: 'room' | 'server' = 'room';

export interface ReelParameters {
  greenWidth: number;
  driftSpeed: number;
  fillRate: number;
  rarity: FishRarity;
  rarityColor: string;
}

export function reelParametersForDifficulty(difficulty: number, rarity: FishRarity, rarityColor: string): ReelParameters {
  const reel = FISH_CONFIG.reel;
  const d = Math.max(0, Math.min(1, difficulty));
  return {
    greenWidth: reel.greenWidthMax + (reel.greenWidthMin - reel.greenWidthMax) * d,
    driftSpeed: reel.driftSpeedMin + (reel.driftSpeedMax - reel.driftSpeedMin) * d,
    fillRate: reel.fillRateMax + (reel.fillRateMin - reel.fillRateMax) * d,
    rarity,
    rarityColor,
  };
}

export function calculateReelDifficulty(speciesId: FishSpeciesId, weightKg: number): number {
  const reel = FISH_CONFIG.reel;
  const species = FISH_CONFIG.species.find((entry) => entry.id === speciesId)!;
  const rarityFactor = reel.rarityFactors[species.rarity];
  const z = Math.log(weightKg / species.medianKg) / species.sigma;
  const weightFactor = Math.max(0, Math.min(1, (z + reel.weightZOffset) / reel.weightZRange));
  return Math.max(0, Math.min(1, reel.rarityDifficultyWeight * rarityFactor + reel.weightDifficultyWeight * weightFactor));
}

export function calculateReelParameters(speciesId: FishSpeciesId, weightKg: number, weatherType: WeatherType = 'clear'): ReelParameters & { difficulty: number } {
  const species = FISH_CONFIG.species.find((entry) => entry.id === speciesId)!;
  const difficulty = calculateReelDifficulty(speciesId, weightKg);
  const parameters = reelParametersForDifficulty(difficulty, species.rarity, species.rarityColor);
  parameters.greenWidth *= WEATHER_CONFIG.states[weatherType].fishing.reelGreenWidthMultiplier;
  return { ...parameters, difficulty };
}
