import { WORLD_CONFIG } from './worldConfig.js';

export const CHICKEN_COUNT = 8;
export const CHICKEN_HIT_RADIUS = 1.0;

export interface ChickenPath {
  id: string;
  homeX: number;
  homeZ: number;
  phase: number;
  speed: number;
  wanderX: number;
  wanderZ: number;
  bodyColor: string;
}

export interface ChickenPosition {
  x: number;
  z: number;
  velocityX: number;
  velocityZ: number;
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function makePaths(): ChickenPath[] {
  const random = seededRandom(0x4d454e47);
  const obstacles: readonly (readonly [number, number])[] = [...WORLD_CONFIG.trees, ...WORLD_CONFIG.rocks];
  const paths: ChickenPath[] = [];
  let attempts = 0;
  while (paths.length < CHICKEN_COUNT && attempts < 3000) {
    attempts += 1;
    const angle = random() * Math.PI * 2;
    const outerRadius = WORLD_CONFIG.movementRadius - 4;
    const radius = Math.sqrt(7.2 ** 2 + random() * (outerRadius ** 2 - 7.2 ** 2));
    const homeX = Math.cos(angle) * radius;
    const homeZ = Math.sin(angle) * radius;
    if (obstacles.some(([x, z]) => Math.hypot(homeX - x, homeZ - z) < 1.65)) continue;
    if (Math.hypot(homeX - WORLD_CONFIG.campfire.x, homeZ - WORLD_CONFIG.campfire.z) < 5.2) continue;
    if (paths.some((chicken) => Math.hypot(homeX - chicken.homeX, homeZ - chicken.homeZ) < 1.25)) continue;
    paths.push({
      id: `chicken-${paths.length + 1}`,
      homeX,
      homeZ,
      phase: random() * Math.PI * 2,
      speed: 0.16 + random() * 0.2,
      wanderX: 0.55 + random() * 0.75,
      wanderZ: 0.45 + random() * 0.65,
      bodyColor: random() > 0.72 ? '#f1e7d2' : '#fffdf4',
    });
  }
  return paths;
}

export const CHICKEN_PATHS = makePaths();

export function chickenPositionAt(path: Pick<ChickenPath, 'homeX' | 'homeZ' | 'phase' | 'speed' | 'wanderX' | 'wanderZ'>, serverTime: number): ChickenPosition {
  const seconds = serverTime / 1000;
  const angle = seconds * path.speed + path.phase;
  return {
    x: path.homeX + Math.cos(angle) * path.wanderX,
    z: path.homeZ + Math.sin(angle * 0.78 + path.phase) * path.wanderZ,
    velocityX: -Math.sin(angle) * path.wanderX * path.speed,
    velocityZ: Math.cos(angle * 0.78 + path.phase) * path.wanderZ * path.speed * 0.78,
  };
}

export function chickenNear(x: number, z: number, serverTime: number, radius: number): { chickenId: string; x: number; z: number } | null {
  let nearest: { chickenId: string; x: number; z: number; distance: number } | null = null;
  for (const path of CHICKEN_PATHS) {
    const position = chickenPositionAt(path, serverTime);
    const distance = Math.hypot(x - position.x, z - position.z);
    if (distance <= radius && (!nearest || distance < nearest.distance)) {
      nearest = { chickenId: path.id, x: position.x, z: position.z, distance };
    }
  }
  return nearest ? { chickenId: nearest.chickenId, x: nearest.x, z: nearest.z } : null;
}
