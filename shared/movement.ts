import { FISH_CONFIG } from './fishConfig.js';
import { WORLD_CONFIG } from './worldConfig.js';

export const MOVEMENT_RULES = {
  ...FISH_CONFIG.movement,
} as const;

export interface MovementTransform { x: number; z: number; rotY: number }

export function normalizeRotation(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

export function shortestAngleDelta(from: number, to: number): number {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function isSafeMovementPosition(x: number, z: number): boolean {
  const radius = Math.hypot(x, z);
  return Number.isFinite(x) && Number.isFinite(z) && radius <= MOVEMENT_RULES.mapRadius && radius >= MOVEMENT_RULES.waterRadius &&
    !isInsideTheaterCollider(x, z, 0.55) && !isInsidePlaygroundCollider(x, z, 0.55);
}

export function isInsideTheaterCollider(x: number, z: number, padding = 0): boolean {
  const { x: centerX, z: centerZ, rotationY, colliderHalfWidth, colliderHalfDepth } = WORLD_CONFIG.theater;
  const dx = x - centerX, dz = z - centerZ;
  const localX = Math.cos(rotationY) * dx - Math.sin(rotationY) * dz;
  const localZ = Math.sin(rotationY) * dx + Math.cos(rotationY) * dz;
  return Math.abs(localX) < colliderHalfWidth + padding && Math.abs(localZ) < colliderHalfDepth + padding;
}

export function isInsidePlaygroundCollider(x: number, z: number, padding = 0): boolean {
  const { playground } = WORLD_CONFIG;
  const wheel = playground.wheel;
  const dx = x - wheel.x, dz = z - wheel.z;
  const wheelSupport = Math.abs(dx) < 1.75 + padding && Math.abs(dz) < 0.42 + padding;
  const slide = playground.slide;
  const slideCollider = Math.abs(x - slide.x) < 1.15 + padding && Math.abs(z - slide.z) < 2.45 + padding;
  const seesaw = playground.seesaw;
  const seesawCollider = Math.abs(x - seesaw.x) < 2.2 + padding && Math.abs(z - seesaw.z) < 0.48 + padding;
  return wheelSupport || slideCollider || seesawCollider;
}

/** Shared client prediction step; server validation uses the same speed/bounds rules. */
export function stepMovement(current: MovementTransform, forwardAxis: number, turnAxis: number, deltaSeconds: number): MovementTransform {
  const dt = Math.max(0, Math.min(deltaSeconds, MOVEMENT_RULES.maxFrameSeconds));
  const rotY = normalizeRotation(current.rotY + turnAxis * MOVEMENT_RULES.turnSpeedRadians * dt);
  if (!forwardAxis || dt === 0) return { ...current, rotY };

  let x = current.x + Math.sin(rotY) * forwardAxis * MOVEMENT_RULES.maxSpeed * dt;
  let z = current.z + Math.cos(rotY) * forwardAxis * MOVEMENT_RULES.maxSpeed * dt;
  let radius = Math.hypot(x, z);
  const minimumRadius = MOVEMENT_RULES.waterRadius + MOVEMENT_RULES.waterSafetyMargin;
  if (radius < minimumRadius) {
    const scale = minimumRadius / Math.max(radius, 0.001);
    x *= scale; z *= scale; radius = minimumRadius;
  }
  if (radius > MOVEMENT_RULES.mapRadius) {
    const scale = MOVEMENT_RULES.mapRadius / Math.max(radius, 0.001);
    x *= scale; z *= scale;
  }
  if (isInsideTheaterCollider(x, z, 0.55) || isInsidePlaygroundCollider(x, z, 0.55)) return { ...current, rotY };
  return { x, z, rotY };
}

export function movementViolation(previous: MovementTransform, next: MovementTransform, elapsedSeconds: number): 'bounds' | 'speed' | 'rotation' | null {
  if (!isSafeMovementPosition(next.x, next.z)) return 'bounds';
  const elapsed = Math.max(0, elapsedSeconds);
  const distance = Math.hypot(next.x - previous.x, next.z - previous.z);
  if (distance > MOVEMENT_RULES.maxSpeed * elapsed * MOVEMENT_RULES.speedAllowance + MOVEMENT_RULES.speedSlack) return 'speed';
  if (Math.abs(shortestAngleDelta(previous.rotY, next.rotY)) > MOVEMENT_RULES.turnSpeedRadians * elapsed * MOVEMENT_RULES.turnAllowance + MOVEMENT_RULES.turnSlackRadians) return 'rotation';
  return null;
}
