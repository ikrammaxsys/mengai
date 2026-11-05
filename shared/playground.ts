import { WORLD_CONFIG } from './worldConfig.js';

export const FERRIS_SEAT_COUNT = 6;
export const FERRIS_SEAT_CAPACITY = 2;
export const FERRIS_BOTTOM_TOLERANCE = 0.12;

export interface FerrisSeatPose { x: number; y: number; z: number; angle: number }

export function ferrisWheelAngle(startedAt: number, now: number): number {
  return ((now - startedAt) / (WORLD_CONFIG.playground.wheel.rotationSeconds * 1000)) * Math.PI * 2;
}

export function ferrisSeatAngle(seatIndex: number, wheelAngle: number): number {
  return wheelAngle + seatIndex * Math.PI * 2 / FERRIS_SEAT_COUNT - Math.PI / 2;
}

export function ferrisSeatPose(seatIndex: number, slot: number, startedAt: number, now: number): FerrisSeatPose {
  const wheel = WORLD_CONFIG.playground.wheel;
  const angle = ferrisSeatAngle(seatIndex, ferrisWheelAngle(startedAt, now));
  const sideOffset = (slot - (FERRIS_SEAT_CAPACITY - 1) / 2) * 0.34;
  return {
    x: wheel.x + Math.cos(angle) * wheel.radius + sideOffset,
    y: wheel.centerY + Math.sin(angle) * wheel.radius,
    z: wheel.z + 0.18,
    angle,
  };
}

export function ferrisSeatBottomDistance(seatIndex: number, startedAt: number, now: number): number {
  const angle = ferrisSeatAngle(seatIndex, ferrisWheelAngle(startedAt, now));
  return Math.abs(Math.atan2(Math.sin(angle + Math.PI / 2), Math.cos(angle + Math.PI / 2)));
}

export function ferrisBottomSeat(startedAt: number, now: number): number {
  let bestIndex = 0;
  let bestDistance = Infinity;
  for (let index = 0; index < FERRIS_SEAT_COUNT; index++) {
    const distance = ferrisSeatBottomDistance(index, startedAt, now);
    if (distance < bestDistance) { bestDistance = distance; bestIndex = index; }
  }
  return bestIndex;
}