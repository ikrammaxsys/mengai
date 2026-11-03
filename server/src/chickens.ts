import { CHICKEN_CONFIG, type ChickenAgent, type ChickenSnapshot } from '../../shared/chickenConfig.js';
import { WORLD_CONFIG } from '../../shared/worldConfig.js';
import type { Player } from './types.js';

function randomBetween(random: () => number, min: number, max: number): number {
  return min + random() * (max - min);
}

function randomPoint(random: () => number): { x: number; z: number } {
  const angle = random() * Math.PI * 2;
  const radius = Math.sqrt(CHICKEN_CONFIG.pondSafeRadius ** 2 + random() *
    (CHICKEN_CONFIG.outerRadius ** 2 - CHICKEN_CONFIG.pondSafeRadius ** 2));
  return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}

function isSafePoint(x: number, z: number): boolean {
  const radius = Math.hypot(x, z);
  if (radius < CHICKEN_CONFIG.pondSafeRadius || radius > CHICKEN_CONFIG.outerRadius) return false;
  if (Math.hypot(x - WORLD_CONFIG.campfire.x, z - WORLD_CONFIG.campfire.z) < CHICKEN_CONFIG.campfireClearance) return false;
  const obstacles = [...WORLD_CONFIG.trees, ...WORLD_CONFIG.rocks];
  return !obstacles.some(([obstacleX, obstacleZ]) => Math.hypot(x - obstacleX, z - obstacleZ) < CHICKEN_CONFIG.obstacleClearance);
}

function randomSafePoint(random: () => number, around?: Pick<ChickenAgent, 'x' | 'z'>): { x: number; z: number } {
  for (let attempt = 0; attempt < 80; attempt++) {
    const candidate = around
      ? { x: around.x + (random() * 2 - 1) * CHICKEN_CONFIG.wanderDistanceMax, z: around.z + (random() * 2 - 1) * CHICKEN_CONFIG.wanderDistanceMax }
      : randomPoint(random);
    if (isSafePoint(candidate.x, candidate.z)) return candidate;
  }
  return randomPoint(random);
}

function randomRespawnPoint(chicken: ChickenAgent, random: () => number): { x: number; z: number } {
  for (let attempt = 0; attempt < 200; attempt++) {
    const candidate = randomPoint(random);
    if (isSafePoint(candidate.x, candidate.z) &&
        Math.hypot(candidate.x - chicken.respawnOriginX, candidate.z - chicken.respawnOriginZ) >= CHICKEN_CONFIG.respawnMinDistance) return candidate;
  }
  const baseAngle = Math.atan2(chicken.respawnOriginZ, chicken.respawnOriginX) + Math.PI;
  const radius = (CHICKEN_CONFIG.pondSafeRadius + CHICKEN_CONFIG.outerRadius) / 2;
  for (let attempt = 0; attempt < 360; attempt++) {
    const angle = baseAngle + attempt * Math.PI / 180;
    const candidate = { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
    if (isSafePoint(candidate.x, candidate.z) &&
        Math.hypot(candidate.x - chicken.respawnOriginX, candidate.z - chicken.respawnOriginZ) >= CHICKEN_CONFIG.respawnMinDistance) return candidate;
  }
  return randomSafePoint(random);
}

export function createChickenFlock(now: number, random: () => number = Math.random): Map<string, ChickenAgent> {
  const count = CHICKEN_CONFIG.minCount + Math.floor(random() * (CHICKEN_CONFIG.maxCount - CHICKEN_CONFIG.minCount + 1));
  const chickens = new Map<string, ChickenAgent>();
  for (let index = 0; index < count; index++) {
    let spawn = randomSafePoint(random);
    for (let attempt = 0; attempt < 60; attempt++) {
      const candidate = randomSafePoint(random);
      if ([...chickens.values()].every((chicken) => Math.hypot(chicken.x - candidate.x, chicken.z - candidate.z) > 1.6)) {
        spawn = candidate;
        break;
      }
    }
    const id = `chicken-${index + 1}`;
    chickens.set(id, {
      id,
      x: spawn.x,
      z: spawn.z,
      facing: random() * Math.PI * 2,
      state: 'idle',
      bodyColor: CHICKEN_CONFIG.bodyColors[Math.floor(random() * CHICKEN_CONFIG.bodyColors.length)],
      targetX: spawn.x,
      targetZ: spawn.z,
      nextDecisionAt: now + randomBetween(random, 300, CHICKEN_CONFIG.idleDurationMaxMs),
      respawnAt: null,
      respawnOriginX: spawn.x,
      respawnOriginZ: spawn.z,
    });
  }
  return chickens;
}

export function chickenSnapshots(chickens: Map<string, ChickenAgent>): ChickenSnapshot[] {
  return [...chickens.values()].map(({ id, x, z, facing, state, bodyColor }) => ({ id, x, z, facing, state, bodyColor }));
}

function moveChicken(chicken: ChickenAgent, directionX: number, directionZ: number, speed: number, deltaSeconds: number): void {
  const length = Math.hypot(directionX, directionZ);
  if (length < 0.001) return;
  const dx = directionX / length * speed * deltaSeconds;
  const dz = directionZ / length * speed * deltaSeconds;
  let x = chicken.x + dx;
  let z = chicken.z + dz;
  const radius = Math.hypot(x, z);
  if (radius < CHICKEN_CONFIG.pondSafeRadius) {
    const scale = CHICKEN_CONFIG.pondSafeRadius / Math.max(radius, 0.001);
    x *= scale;
    z *= scale;
  } else if (radius > CHICKEN_CONFIG.outerRadius) {
    const scale = CHICKEN_CONFIG.outerRadius / radius;
    x *= scale;
    z *= scale;
  }
  chicken.x = x;
  chicken.z = z;
  chicken.facing = Math.atan2(dx, dz);
}

export function updateChickenFlock(
  chickens: Map<string, ChickenAgent>,
  now: number,
  deltaSeconds = CHICKEN_CONFIG.snapshotIntervalMs / 1000,
  random: () => number = Math.random,
): void {
  const step = Math.max(0, Math.min(0.2, deltaSeconds));
  for (const chicken of chickens.values()) {
    if (chicken.state === 'respawning') {
      if (chicken.respawnAt !== null && now >= chicken.respawnAt) {
        const spawn = randomRespawnPoint(chicken, random);
        chicken.x = spawn.x;
        chicken.z = spawn.z;
        chicken.facing = random() * Math.PI * 2;
        chicken.state = 'idle';
        chicken.nextDecisionAt = now + randomBetween(random, CHICKEN_CONFIG.idleDurationMinMs, CHICKEN_CONFIG.idleDurationMaxMs);
        chicken.targetX = spawn.x;
        chicken.targetZ = spawn.z;
        chicken.respawnAt = null;
      }
      continue;
    }

    if (chicken.state === 'idle') {
      if (now >= chicken.nextDecisionAt) {
        const target = randomSafePoint(random, chicken);
        chicken.targetX = target.x;
        chicken.targetZ = target.z;
        chicken.state = 'wander';
      }
      continue;
    }

    const dx = chicken.targetX - chicken.x;
    const dz = chicken.targetZ - chicken.z;
    if (Math.hypot(dx, dz) <= CHICKEN_CONFIG.wanderSpeed * step + 0.06) {
      chicken.x = chicken.targetX;
      chicken.z = chicken.targetZ;
      chicken.state = 'idle';
      chicken.nextDecisionAt = now + randomBetween(random, CHICKEN_CONFIG.idleDurationMinMs, CHICKEN_CONFIG.idleDurationMaxMs);
    } else moveChicken(chicken, dx, dz, CHICKEN_CONFIG.wanderSpeed, step);
  }
}

export function popChicken(chicken: ChickenAgent, now: number, random: () => number = Math.random): void {
  if (chicken.state === 'respawning') return;
  chicken.state = 'respawning';
  chicken.respawnAt = now + randomBetween(random, CHICKEN_CONFIG.respawnDelayMinMs, CHICKEN_CONFIG.respawnDelayMaxMs);
  chicken.respawnOriginX = chicken.x;
  chicken.respawnOriginZ = chicken.z;
  chicken.targetX = chicken.x;
  chicken.targetZ = chicken.z;
}

export function hitChickenAt(
  chickens: Map<string, ChickenAgent>,
  x: number,
  z: number,
  now: number,
  random: () => number = Math.random,
): ChickenAgent | null {
  let nearest: ChickenAgent | null = null;
  let nearestDistance: number = CHICKEN_CONFIG.hitRadius;
  for (const chicken of chickens.values()) {
    if (chicken.state === 'respawning') continue;
    const distance = Math.hypot(chicken.x - x, chicken.z - z);
    if (distance <= nearestDistance) {
      nearest = chicken;
      nearestDistance = distance;
    }
  }
  if (!nearest) return null;
  popChicken(nearest, now, random);
  return nearest;
}

export function awardChickenScore(player: Pick<Player, 'chickenScore'>): number {
  player.chickenScore += 1;
  return player.chickenScore;
}
