export const GARDEN_CONFIG = {
  interactionRadius: 2.8,
  seedDrops: {
    round: 0.035,
    cherry: 0.01,
  },
  trees: {
    pine: {
      name: 'Pine', modelBuilder: 'layered-cone', growthStageMs: 120_000,
      seedSource: 'Free and unlimited', sizes: [0.38, 0.5, 0.74, 1], specialEffect: null,
    },
    round: {
      name: 'Round tree', modelBuilder: 'rounded-crown', growthStageMs: 120_000,
      seedSource: 'Fishing bonus', sizes: [0.38, 0.5, 0.74, 1], specialEffect: null,
    },
    cherry: {
      name: 'Cherry blossom', modelBuilder: 'blossom-crown', growthStageMs: 120_000,
      seedSource: 'Fishing bonus', sizes: [0.38, 0.5, 0.74, 1], specialEffect: 'falling-petals',
    },
  },
  spots: [
    { id: 'spot-1', x: 8.5, z: 8.5 }, { id: 'spot-2', x: 11.3, z: 8.5 },
    { id: 'spot-3', x: 14.1, z: 8.5 }, { id: 'spot-4', x: 16.9, z: 8.5 },
    { id: 'spot-5', x: 8.5, z: 11.3 }, { id: 'spot-6', x: 11.3, z: 11.3 },
    { id: 'spot-7', x: 14.1, z: 11.3 }, { id: 'spot-8', x: 16.9, z: 11.3 },
    { id: 'spot-9', x: 8.5, z: 14.1 }, { id: 'spot-10', x: 11.3, z: 14.1 },
    { id: 'spot-11', x: 14.1, z: 14.1 }, { id: 'spot-12', x: 16.9, z: 14.1 },
    { id: 'spot-13', x: 8.5, z: 16.9 }, { id: 'spot-14', x: 11.3, z: 16.9 },
    { id: 'spot-15', x: 14.1, z: 16.9 }, { id: 'spot-16', x: 16.9, z: 16.9 },
  ],
} as const;

export type GardenTreeType = keyof typeof GARDEN_CONFIG.trees;
export type GardenSpotId = (typeof GARDEN_CONFIG.spots)[number]['id'];
export type GardenSpot = { spotId: GardenSpotId; treeType: GardenTreeType; plantedAt: number };
export type GardenTree = GardenSpot;
export type SeedInventory = Record<GardenTreeType, number>;

export const UNLIMITED_SEEDS = -1;

export function isGardenTreeType(value: unknown): value is GardenTreeType {
  return typeof value === 'string' && Object.hasOwn(GARDEN_CONFIG.trees, value);
}

export function isGardenSpotId(value: unknown): value is GardenSpotId {
  return typeof value === 'string' && GARDEN_CONFIG.spots.some((spot) => spot.id === value);
}

export function defaultSeedInventory(seeds?: Partial<Record<GardenTreeType, number>>): SeedInventory {
  const count = (value: number | undefined) => Number.isSafeInteger(value) && value !== undefined && value >= 0 ? value : 0;
  return {
    pine: UNLIMITED_SEEDS,
    round: count(seeds?.round),
    cherry: count(seeds?.cherry),
  };
}
