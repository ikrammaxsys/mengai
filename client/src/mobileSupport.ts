/** Mobile device detection, persisted settings, haptics and quality pacing. */

export type QualityLevel = 'high' | 'medium' | 'low';
export type QualityPreference = 'auto' | QualityLevel;
export type TouchModePreference = 'auto' | 'on' | 'off';

export interface MobileSettings {
  touchMode: TouchModePreference;
  leftHanded: boolean;
  controlScale: number;
  controlOpacity: number;
  haptics: boolean;
  quality: QualityPreference;
}

const STORAGE_KEY = 'mengai:mobile-settings';

const DEFAULT_SETTINGS: MobileSettings = {
  touchMode: 'auto',
  leftHanded: false,
  controlScale: 1,
  controlOpacity: 0.86,
  haptics: true,
  quality: 'auto',
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** True when the primary pointer is a finger (phones, tablets, most touch laptops). */
export function isCoarsePointer(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
}

/** True for phones/tablets and hybrid laptops with any touch input available. */
export function isTouchCapable(): boolean {
  if (typeof window === 'undefined') return false;
  return isCoarsePointer() || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
}

export function isLandscape(): boolean {
  return innerWidth >= innerHeight;
}

export function loadMobileSettings(): MobileSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<MobileSettings>;
    return {
      touchMode: parsed.touchMode === 'on' || parsed.touchMode === 'off' ? parsed.touchMode : 'auto',
      leftHanded: parsed.leftHanded === true,
      controlScale: clamp(Number(parsed.controlScale) || DEFAULT_SETTINGS.controlScale, 0.75, 1.4),
      controlOpacity: clamp(Number(parsed.controlOpacity) || DEFAULT_SETTINGS.controlOpacity, 0.3, 1),
      haptics: parsed.haptics !== false,
      quality: parsed.quality === 'high' || parsed.quality === 'medium' || parsed.quality === 'low' ? parsed.quality : 'auto',
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveMobileSettings(settings: MobileSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Private browsing / storage disabled: keep the in-memory settings.
  }
}

/** Android Chrome supports this; iOS Safari does not (it returns undefined). */
export function vibrate(pattern: number | number[], enabled = true): void {
  if (!enabled) return;
  if (typeof navigator.vibrate !== 'function') return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Haptics are best-effort feedback.
  }
}

export function fullscreenSupported(): boolean {
  return typeof document.documentElement.requestFullscreen === 'function' && Boolean(document.fullscreenEnabled);
}

export async function toggleFullscreen(): Promise<boolean> {
  if (!fullscreenSupported()) return false;
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return false;
    }
    await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    return true;
  } catch {
    return document.fullscreenElement !== null;
  }
}

/**
 * Watches frame pacing and reports once when the frame rate stays low for long
 * enough that dropping to a cheaper quality tier is worthwhile.
 */
export class PerformanceGovernor {
  private elapsed = 0;
  private frames = 0;
  private lowSeconds = 0;
  private fired = false;

  constructor(
    private readonly onSustainedLow: () => void,
    private readonly thresholdFps = 40,
    private readonly windowSeconds = 2,
    private readonly sustainedSeconds = 6,
  ) {}

  frame(deltaSeconds: number): void {
    if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return;
    this.elapsed += deltaSeconds;
    this.frames += 1;
    if (this.elapsed < this.windowSeconds) return;
    const fps = this.frames / this.elapsed;
    this.lowSeconds = fps < this.thresholdFps ? this.lowSeconds + this.elapsed : 0;
    this.elapsed = 0;
    this.frames = 0;
    if (this.fired || this.lowSeconds < this.sustainedSeconds) return;
    this.fired = true;
    this.onSustainedLow();
  }

  reset(): void {
    this.elapsed = 0;
    this.frames = 0;
    this.lowSeconds = 0;
    this.fired = false;
  }
}
