import { FISH_CONFIG, type ReelParameters } from '../../shared/fishConfig';

export type ReelOutcome = 'active' | 'success' | 'escaped';

export interface ReelSnapshot {
  marker: number;
  zoneCenter: number;
  zoneWidth: number;
  meter: number;
  inside: boolean;
  pulling: boolean;
  elapsed: number;
}

export class ReelGame {
  private params: ReelParameters;
  private marker: number = FISH_CONFIG.reel.markerStart;
  private velocity = 0;
  private meter: number = FISH_CONFIG.reel.catchMeterStart;
  private elapsed = 0;
  private held = false;
  private pullRemaining = 0;
  private nextPullAt = FISH_CONFIG.reel.fishPullIntervalMinSeconds + Math.random() *
    (FISH_CONFIG.reel.fishPullIntervalMaxSeconds - FISH_CONFIG.reel.fishPullIntervalMinSeconds);
  private outcome: ReelOutcome = 'active';
  private snapshot: ReelSnapshot;

  constructor(params: ReelParameters) {
    this.params = params;
    this.snapshot = this.makeSnapshot(false);
  }

  setParameters(params: ReelParameters): void { this.params = params; }
  setHeld(held: boolean): void { this.held = held; }
  get current(): ReelSnapshot { return this.snapshot; }
  get result(): ReelOutcome { return this.outcome; }

  update(deltaSeconds: number): ReelSnapshot {
    if (this.outcome !== 'active') return this.snapshot;
    const config = FISH_CONFIG.reel;
    const dt = Math.max(0, Math.min(deltaSeconds, config.simulationMaxStepSeconds));
    this.elapsed += dt;

    if (this.elapsed >= this.nextPullAt && this.pullRemaining <= 0) {
      this.pullRemaining = config.fishPullDurationSeconds;
      this.nextPullAt = this.elapsed + config.fishPullIntervalMinSeconds + Math.random() *
        (config.fishPullIntervalMaxSeconds - config.fishPullIntervalMinSeconds);
    }
    this.pullRemaining = Math.max(0, this.pullRemaining - dt);
    const pulling = this.pullRemaining > 0;
    const drift = this.params.driftSpeed * (pulling ? config.fishPullDriftMultiplier : 1);
    const rawCenter = config.greenCenterStart + config.zoneMainAmplitude * Math.sin(this.elapsed * drift * config.zoneSineRate) +
      config.zoneRippleAmplitude * Math.sin(this.elapsed * drift * config.zoneRippleRate);
    const center = Math.max(config.greenCenterMin, Math.min(config.greenCenterMax, rawCenter));

    const acceleration = this.held ? config.markerAccelerationHold : -config.markerAccelerationRelease;
    this.velocity = (this.velocity + acceleration * dt) * Math.exp(-config.markerDamping * dt);
    this.velocity = Math.max(-config.markerMaxVelocity, Math.min(config.markerMaxVelocity, this.velocity));
    this.marker += this.velocity * dt;
    if (this.marker < config.markerMin) {
      this.marker = config.markerMin;
      this.velocity = Math.abs(this.velocity) * config.markerBounce;
    } else if (this.marker > config.markerMax) {
      this.marker = config.markerMax;
      this.velocity = -Math.abs(this.velocity) * config.markerBounce;
    }

    const inside = Math.abs(this.marker - center) <= this.params.greenWidth / 2;
    this.meter += this.params.fillRate * dt * (inside ? 1 : -config.catchMeterDrainMultiplier);
    this.meter = Math.max(0, Math.min(1, this.meter));
    if (this.meter >= 1) this.outcome = 'success';
    else if (this.meter <= 0) this.outcome = 'escaped';
    this.snapshot = { marker: this.marker, zoneCenter: center, zoneWidth: this.params.greenWidth, meter: this.meter, inside, pulling, elapsed: this.elapsed };
    return this.snapshot;
  }

  private makeSnapshot(inside: boolean): ReelSnapshot {
    return { marker: this.marker, zoneCenter: FISH_CONFIG.reel.greenCenterStart, zoneWidth: this.params.greenWidth, meter: this.meter, inside, pulling: false, elapsed: 0 };
  }
}
