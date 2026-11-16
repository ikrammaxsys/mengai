import { BOWLING_CONFIG, bowlingPinLayout } from '../../shared/bowlingConfig.js';

export interface LanePin {
  id: number;
  x: number;
  z: number;
  baseX: number;
  baseZ: number;
  vx: number;
  vz: number;
  tilt: number;
  knocked: boolean;
  removed: boolean;
  hit: boolean;
}

export interface LaneBall {
  x: number;
  z: number;
  vx: number;
  vz: number;
  visible: boolean;
  inGutter: boolean;
  hitPins: Set<number>;
}

export interface LaneState {
  ball: LaneBall;
  pins: LanePin[];
  elapsed: number;
  accumulator: number;
  lastImpactAt: number;
  impacts: number;
  settled: boolean;
  gutter: boolean;
}

export interface LaneThrowInput {
  aim: number;
  power: number;
}

const HALF_LANE = BOWLING_CONFIG.lane.width / 2;
const PIN_RADIUS = BOWLING_CONFIG.lane.pinRadius;
const BALL_RADIUS = BOWLING_CONFIG.lane.ballRadius;

export function createLaneState(): LaneState {
  return {
    ball: { x: 0, z: 0, vx: 0, vz: 0, visible: false, inGutter: false, hitPins: new Set() },
    pins: bowlingPinLayout().map((pin) => ({
      id: pin.id,
      x: pin.x,
      z: pin.z,
      baseX: pin.x,
      baseZ: pin.z,
      vx: 0,
      vz: 0,
      tilt: 0,
      knocked: false,
      removed: false,
      hit: false,
    })),
    elapsed: 0,
    accumulator: 0,
    lastImpactAt: 0,
    impacts: 0,
    settled: false,
    gutter: false,
  };
}

export function resetLane(state: LaneState): void {
  state.ball = { x: 0, z: 0, vx: 0, vz: 0, visible: false, inGutter: false, hitPins: new Set() };
  for (const pin of state.pins) {
    pin.x = pin.baseX;
    pin.z = pin.baseZ;
    pin.vx = 0;
    pin.vz = 0;
    pin.tilt = 0;
    pin.knocked = false;
    pin.removed = false;
    pin.hit = false;
  }
  state.elapsed = 0;
  state.accumulator = 0;
  state.lastImpactAt = 0;
  state.impacts = 0;
  state.settled = false;
  state.gutter = false;
}

export function startRoll(state: LaneState, input: LaneThrowInput): void {
  const aim = Math.max(-1, Math.min(1, input.aim));
  const power = Math.max(0, Math.min(1, input.power));
  const speed = BOWLING_CONFIG.physics.ballMinSpeed +
    power * (BOWLING_CONFIG.physics.ballMaxSpeed - BOWLING_CONFIG.physics.ballMinSpeed);
  const angle = aim * BOWLING_CONFIG.physics.maxAimRadians;
  state.ball = {
    x: aim * 0.32,
    z: 0,
    vx: Math.sin(angle) * speed,
    vz: Math.cos(angle) * speed,
    visible: true,
    inGutter: false,
    hitPins: new Set(),
  };
  state.elapsed = 0;
  state.accumulator = 0;
  state.lastImpactAt = 0;
  state.impacts = 0;
  state.settled = false;
  state.gutter = false;
  for (const pin of state.pins) pin.hit = false;
}

function pinDistance(pin: LanePin): number {
  return Math.hypot(pin.x - pin.baseX, pin.z - pin.baseZ);
}

export function isPinDown(pin: LanePin): boolean {
  return !pin.removed && (
    pin.tilt >= BOWLING_CONFIG.physics.pinKnockTiltThreshold ||
    pinDistance(pin) >= BOWLING_CONFIG.physics.pinKnockDisplacementThreshold
  );
}

export function countDownPins(state: LaneState): number {
  return state.pins.reduce((total, pin) => total + (isPinDown(pin) ? 1 : 0), 0);
}

export function markKnockedPins(state: LaneState): void {
  for (const pin of state.pins) pin.knocked = isPinDown(pin);
}

export function removeDownPins(state: LaneState): void {
  for (const pin of state.pins) {
    const down = isPinDown(pin);
    pin.knocked = down;
    if (down) pin.removed = true;
  }
}

function collideBallAndPins(state: LaneState, previousX: number, previousZ: number): void {
  const ball = state.ball;
  if (!ball.visible || ball.inGutter) return;
  const speed = Math.hypot(ball.vx, ball.vz);
  if (speed <= 0) return;
  for (const pin of state.pins) {
    if (pin.removed || ball.hitPins.has(pin.id)) continue;
    const dx = pin.x - previousX;
    const dz = pin.z - previousZ;
    const segmentX = ball.x - previousX;
    const segmentZ = ball.z - previousZ;
    const segmentLengthSq = segmentX * segmentX + segmentZ * segmentZ;
    const amount = segmentLengthSq > 0
      ? Math.max(0, Math.min(1, (dx * segmentX + dz * segmentZ) / segmentLengthSq))
      : 0;
    const closestX = previousX + segmentX * amount;
    const closestZ = previousZ + segmentZ * amount;
    const distance = Math.hypot(pin.x - closestX, pin.z - closestZ);
    if (distance > PIN_RADIUS + BALL_RADIUS) continue;
    const normalLength = Math.hypot(pin.x - closestX, pin.z - closestZ) || 1;
    const nx = (pin.x - closestX) / normalLength;
    const nz = (pin.z - closestZ) / normalLength;
    const massShare = BOWLING_CONFIG.physics.ballMass / (BOWLING_CONFIG.physics.ballMass + BOWLING_CONFIG.physics.pinMass);
    const transfer = 0.7 + massShare * 0.22;
    const deflect = (1 - massShare) * 0.5;
    pin.vx += nx * speed * transfer;
    pin.vz += nz * speed * transfer;
    pin.hit = true;
    pin.tilt = Math.max(pin.tilt, 0.18);
    ball.hitPins.add(pin.id);
    ball.vx -= nx * speed * deflect;
    ball.vz -= nz * speed * deflect;
    ball.vx *= 0.96;
    ball.vz *= 0.96;
    state.impacts += 1;
    state.lastImpactAt = state.elapsed;
  }
}

function collidePins(state: LaneState, deltaSeconds: number): void {
  for (let first = 0; first < state.pins.length; first++) {
    const a = state.pins[first];
    if (a.removed) continue;
    for (let second = first + 1; second < state.pins.length; second++) {
      const b = state.pins[second];
      if (b.removed) continue;
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const distance = Math.hypot(dx, dz);
      const minimum = PIN_RADIUS * 2;
      if (distance >= minimum) continue;
      const nx = distance > 0.0001 ? dx / distance : 1;
      const nz = distance > 0.0001 ? dz / distance : 0;
      const overlap = minimum - distance;
      a.x -= nx * overlap * 0.5;
      a.z -= nz * overlap * 0.5;
      b.x += nx * overlap * 0.5;
      b.z += nz * overlap * 0.5;
      const relative = (a.vx - b.vx) * nx + (a.vz - b.vz) * nz;
      if (relative > 0) {
        const impulse = relative * 0.42;
        a.vx -= impulse * nx;
        a.vz -= impulse * nz;
        b.vx += impulse * nx;
        b.vz += impulse * nz;
        const transfer = Math.max(Math.hypot(a.vx, a.vz), Math.hypot(b.vx, b.vz));
        if (transfer > BOWLING_CONFIG.physics.pinStopSpeed) {
          a.tilt = Math.max(a.tilt, Math.min(1.5, transfer * deltaSeconds * 4));
          b.tilt = Math.max(b.tilt, Math.min(1.5, transfer * deltaSeconds * 4));
        }
        state.lastImpactAt = state.elapsed;
      }
    }
  }
}

function stepBall(state: LaneState, deltaSeconds: number): void {
  const ball = state.ball;
  if (!ball.visible) return;
  const previousX = ball.x;
  const previousZ = ball.z;
  let speed = Math.hypot(ball.vx, ball.vz);
  speed = Math.max(0, speed - BOWLING_CONFIG.physics.ballDeceleration * deltaSeconds);
  if (speed > 0) {
    const scale = speed / (Math.hypot(ball.vx, ball.vz) || 1);
    ball.vx *= scale;
    ball.vz *= scale;
  } else {
    ball.vx = 0;
    ball.vz = 0;
  }
  ball.x += ball.vx * deltaSeconds;
  ball.z += ball.vz * deltaSeconds;
  if (!ball.inGutter && Math.abs(ball.x) > HALF_LANE) {
    ball.inGutter = true;
    state.gutter = true;
    ball.x = Math.sign(ball.x) * (HALF_LANE + BOWLING_CONFIG.lane.gutterWidth * 0.5);
    ball.vx = 0;
  }
  if (ball.z > BOWLING_CONFIG.lane.length + 0.9) {
    ball.z = BOWLING_CONFIG.lane.length + 0.9;
    ball.vx = 0;
    ball.vz = 0;
    speed = 0;
  }
  collideBallAndPins(state, previousX, previousZ);
  if (speed < BOWLING_CONFIG.physics.ballStopSpeed) {
    ball.vx = 0;
    ball.vz = 0;
    ball.visible = false;
  }
}

function stepPins(state: LaneState, deltaSeconds: number): void {
  for (const pin of state.pins) {
    if (pin.removed) continue;
    const speed = Math.hypot(pin.vx, pin.vz);
    if (speed > 0) {
      pin.x += pin.vx * deltaSeconds;
      pin.z += pin.vz * deltaSeconds;
      const nextSpeed = Math.max(0, speed - BOWLING_CONFIG.physics.pinFriction * deltaSeconds);
      const scale = nextSpeed / speed;
      pin.vx *= scale;
      pin.vz *= scale;
      pin.tilt = Math.min(Math.PI / 2, pin.tilt + nextSpeed * deltaSeconds * 3.2);
      if (nextSpeed < BOWLING_CONFIG.physics.pinStopSpeed) {
        pin.vx = 0;
        pin.vz = 0;
      }
    }
    if (Math.abs(pin.x) > HALF_LANE + 0.5 || pin.z > BOWLING_CONFIG.lane.length + 1.4 || pin.z < 1) {
      if (Math.hypot(pin.vx, pin.vz) > BOWLING_CONFIG.physics.pinStopSpeed) {
        pin.tilt = Math.PI / 2;
      }
      pin.x = Math.max(-HALF_LANE - 0.5, Math.min(HALF_LANE + 0.5, pin.x));
      pin.z = Math.max(1, Math.min(BOWLING_CONFIG.lane.length + 1.4, pin.z));
      pin.vx = 0;
      pin.vz = 0;
    }
  }
  collidePins(state, deltaSeconds);
}

export function advanceLane(state: LaneState, elapsedSeconds: number): void {
  if (state.settled) return;
  const safeElapsed = Math.max(0, Math.min(BOWLING_CONFIG.physics.maxTimeStepSeconds, elapsedSeconds));
  state.elapsed += safeElapsed;
  state.accumulator += safeElapsed;
  const step = BOWLING_CONFIG.physics.fixedStepSeconds;
  while (state.accumulator >= step && !state.settled) {
    state.accumulator -= step;
    stepBall(state, step);
    stepPins(state, step);
  }
  markKnockedPins(state);
  const ballSpeed = Math.hypot(state.ball.vx, state.ball.vz);
  const pinsMoving = state.pins.some((pin) => !pin.removed && Math.hypot(pin.vx, pin.vz) >= BOWLING_CONFIG.physics.pinStopSpeed);
  const quietFor = state.elapsed - state.lastImpactAt;
  const timedOut = state.elapsed > BOWLING_CONFIG.physics.maxRollSeconds + BOWLING_CONFIG.physics.maxSettleSeconds;
  const ballFinished = !state.ball.visible || ballSpeed < BOWLING_CONFIG.physics.ballStopSpeed;
  state.settled = timedOut || (ballFinished && !pinsMoving && quietFor > 0.35);
  if (state.settled) {
    state.ball.visible = false;
    state.ball.vx = 0;
    state.ball.vz = 0;
    for (const pin of state.pins) {
      pin.vx = 0;
      pin.vz = 0;
    }
    markKnockedPins(state);
  }
}
