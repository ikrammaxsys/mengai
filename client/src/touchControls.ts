import type { InputAction, InputState } from './inputState';

export type TouchControlMode = 'world' | 'arena' | 'bowling';

export interface TouchControlsCallbacks {
  onPress(action: InputAction): void;
  onRelease(action: InputAction): void;
}

export interface TouchControlSettings {
  scale: number;
  opacity: number;
  leftHanded: boolean;
}

const DEFAULT_PRIMARY_LABEL = 'Interact';
const DEFAULT_SECONDARY_LABEL = 'Cast';

/**
 * On-screen controls for touch devices.
 *
 * - Floating analog stick in the left half (appears where the thumb lands).
 * - Drag-to-turn on the 3D render canvas.
 * - Charge/action buttons that write into the shared InputState.
 *
 * Every pointer is tracked by `pointerId`, so the joystick thumb and the button
 * thumb never interfere with each other.
 */
export class TouchControls {
  private readonly root: HTMLDivElement;
  private readonly stickZone: HTMLDivElement;
  private readonly stickBase: HTMLDivElement;
  private readonly stickKnob: HTMLDivElement;
  private readonly primaryButton: HTMLButtonElement;
  private readonly secondaryButton: HTMLButtonElement;
  private readonly primaryLabel: HTMLSpanElement;
  private readonly secondaryLabel: HTMLSpanElement;
  private readonly primaryGlyph: HTMLSpanElement;
  private readonly chargeRing: HTMLSpanElement;
  private readonly settings: TouchControlSettings = { scale: 1, opacity: 0.86, leftHanded: false };

  private stickPointerId: number | null = null;
  private lookPointerId: number | null = null;
  private stickOriginX = 0;
  private stickOriginY = 0;
  private stickMaxRadius = 60;
  private lookLastX = 0;
  private lookLastY = 0;
  private lastCharge = -1;
  private visible = false;
  private readonly actionPointers = new Map<InputAction, number>();
  private readonly labels = { primary: DEFAULT_PRIMARY_LABEL, secondary: DEFAULT_SECONDARY_LABEL };

  constructor(
    host: HTMLElement,
    private readonly input: InputState,
    private readonly callbacks: TouchControlsCallbacks,
  ) {
    this.root = document.createElement('div');
    this.root.id = 'touch-controls';
    this.root.className = 'touch-controls';
    this.root.setAttribute('aria-label', 'Touch controls');
    this.root.innerHTML = `
      <div class="touch-stick-zone" data-touch-zone="stick" aria-hidden="true">
        <div class="touch-stick-base">
          <div class="touch-stick-ring"></div>
          <div class="touch-stick-knob"></div>
        </div>
      </div>
      <div class="touch-actions">
        <button class="touch-action touch-secondary" type="button" aria-label="Cast or reel">
          <span class="touch-action-glyph" aria-hidden="true">🎣</span>
          <span class="touch-action-label">${DEFAULT_SECONDARY_LABEL}</span>
        </button>
        <button class="touch-action touch-primary" type="button" aria-label="Interact">
          <span class="touch-charge-ring" aria-hidden="true"></span>
          <span class="touch-action-glyph" aria-hidden="true">🪨</span>
          <span class="touch-action-label">${DEFAULT_PRIMARY_LABEL}</span>
        </button>
      </div>
    `;
    host.append(this.root);

    this.stickZone = this.root.querySelector<HTMLDivElement>('.touch-stick-zone')!;
    this.stickBase = this.root.querySelector<HTMLDivElement>('.touch-stick-base')!;
    this.stickKnob = this.root.querySelector<HTMLDivElement>('.touch-stick-knob')!;
    this.primaryButton = this.root.querySelector<HTMLButtonElement>('.touch-primary')!;
    this.secondaryButton = this.root.querySelector<HTMLButtonElement>('.touch-secondary')!;
    this.primaryLabel = this.primaryButton.querySelector<HTMLSpanElement>('.touch-action-label')!;
    this.secondaryLabel = this.secondaryButton.querySelector<HTMLSpanElement>('.touch-action-label')!;
    this.primaryGlyph = this.primaryButton.querySelector<HTMLSpanElement>('.touch-action-glyph')!;
    this.chargeRing = this.primaryButton.querySelector<HTMLSpanElement>('.touch-charge-ring')!;

    this.bindStick();
    this.bindLook();
    this.bindAction(this.primaryButton, 'primary');
    this.bindAction(this.secondaryButton, 'secondary');
    this.setSettings(this.settings);
  }

  /** Show/hide the whole layer. Hiding releases any held thumbs cleanly. */
  setVisible(visible: boolean): void {
    if (visible === this.visible) return;
    this.visible = visible;
    this.root.classList.toggle('is-visible', visible);
    if (!visible) this.reset();
  }

  get isVisible(): boolean {
    return this.visible;
  }

  setMode(mode: TouchControlMode): void {
    if (this.root.dataset.mode === mode) return;
    this.root.dataset.mode = mode;
    this.primaryGlyph.textContent = mode === 'bowling' ? '🎳' : '🪨';
  }

  setLabels(primary: string, secondary: string): void {
    if (this.labels.primary !== primary) {
      this.labels.primary = primary;
      this.primaryLabel.textContent = primary;
      this.primaryButton.setAttribute('aria-label', primary);
    }
    if (this.labels.secondary !== secondary) {
      this.labels.secondary = secondary;
      this.secondaryLabel.textContent = secondary;
      this.secondaryButton.setAttribute('aria-label', secondary);
    }
  }

  /** 0..1 charge shown as a ring fill around the primary button. */
  setCharge(progress: number, active: boolean): void {
    const clamped = Math.max(0, Math.min(1, progress));
    if (!active && this.lastCharge === 0) return;
    if (active && Math.abs(clamped - this.lastCharge) < 0.01) return;
    this.lastCharge = active ? clamped : 0;
    this.primaryButton.classList.toggle('is-charging', active);
    this.chargeRing.style.background = active
      ? `conic-gradient(#ffd479 ${(clamped * 100).toFixed(1)}%, rgba(255,255,255,.16) 0)`
      : '';
  }

  setSettings(settings: TouchControlSettings): void {
    this.settings.scale = settings.scale;
    this.settings.opacity = settings.opacity;
    this.settings.leftHanded = settings.leftHanded;
    this.root.style.setProperty('--touch-scale', String(settings.scale));
    this.root.style.setProperty('--touch-opacity', String(settings.opacity));
    this.root.classList.toggle('is-left-handed', settings.leftHanded);
  }

  /** Release the stick without touching the action buttons. */
  releaseMovement(): void {
    this.releaseStick();
  }

  /** Release every pointer, stick and held button. Used on blur/resize/hide. */
  reset(): void {
    this.releaseStick();
    this.releaseLook();
    for (const [action, pointerId] of [...this.actionPointers]) {
      this.actionPointers.delete(action);
      const button = action === 'primary' ? this.primaryButton : this.secondaryButton;
      try { button.releasePointerCapture(pointerId); } catch { /* Ignore. */ }
      button.classList.remove('is-held');
      this.callbacks.onRelease(action);
    }
    this.input.releaseTouchMove();
    this.setCharge(0, false);
  }

  private bindStick(): void {
    this.stickZone.addEventListener('pointerdown', (event) => {
      if (this.stickPointerId !== null) return;
      event.preventDefault();
      this.stickPointerId = event.pointerId;
      const rect = this.stickZone.getBoundingClientRect();
      this.stickOriginX = event.clientX;
      this.stickOriginY = event.clientY;
      this.stickBase.style.left = `${event.clientX - rect.left}px`;
      this.stickBase.style.top = `${event.clientY - rect.top}px`;
      this.root.classList.add('stick-active');
      const baseSize = this.stickBase.offsetWidth || 132;
      const knobSize = this.stickKnob.offsetWidth || 54;
      this.stickMaxRadius = Math.max(14, (baseSize - knobSize) / 2);
      try { this.stickZone.setPointerCapture(event.pointerId); } catch { /* Ignore. */ }
      this.updateStick(event.clientX, event.clientY);
    });
    this.stickZone.addEventListener('pointermove', (event) => {
      if (event.pointerId !== this.stickPointerId) return;
      event.preventDefault();
      this.updateStick(event.clientX, event.clientY);
    });
    const end = (event: PointerEvent) => {
      if (event.pointerId !== this.stickPointerId) return;
      this.releaseStick();
    };
    this.stickZone.addEventListener('pointerup', end);
    this.stickZone.addEventListener('pointercancel', end);
    this.stickZone.addEventListener('lostpointercapture', end);
  }

  private updateStick(clientX: number, clientY: number): void {
    const dx = clientX - this.stickOriginX;
    const dy = clientY - this.stickOriginY;
    const distance = Math.hypot(dx, dy);
    const scale = distance > this.stickMaxRadius ? this.stickMaxRadius / Math.max(distance, 0.001) : 1;
    const clampedX = dx * scale;
    const clampedY = dy * scale;
    this.stickBase.style.setProperty('--knob-x', `${clampedX}px`);
    this.stickBase.style.setProperty('--knob-y', `${clampedY}px`);
    this.input.setTouchMove(clampedX / this.stickMaxRadius, -clampedY / this.stickMaxRadius);
  }

  private releaseStick(): void {
    if (this.stickPointerId !== null) {
      try { this.stickZone.releasePointerCapture(this.stickPointerId); } catch { /* Ignore. */ }
      this.stickPointerId = null;
    }
    this.root.classList.remove('stick-active');
    this.stickBase.style.removeProperty('--knob-x');
    this.stickBase.style.removeProperty('--knob-y');
    this.input.releaseTouchMove();
  }

  private bindLook(): void {
    // Drag-to-turn starts on any render canvas. Using the canvas as the hit
    // target means HUD buttons, minimap and panels keep their own taps, while
    // the same gesture works on the island, arena and bowling renderers.
    window.addEventListener('pointerdown', (event) => {
      if (!this.visible || event.pointerType !== 'touch' || this.lookPointerId !== null) return;
      if (!(event.target instanceof HTMLCanvasElement)) return;
      this.lookPointerId = event.pointerId;
      this.lookLastX = event.clientX;
      this.lookLastY = event.clientY;
    }, { capture: true, passive: true });
    window.addEventListener('pointermove', (event) => {
      if (event.pointerId !== this.lookPointerId) return;
      this.input.addLook(event.clientX - this.lookLastX, event.clientY - this.lookLastY);
      this.lookLastX = event.clientX;
      this.lookLastY = event.clientY;
    }, { capture: true, passive: true });
    const end = (event: PointerEvent) => {
      if (event.pointerId !== this.lookPointerId) return;
      this.lookPointerId = null;
    };
    window.addEventListener('pointerup', end, { capture: true, passive: true });
    window.addEventListener('pointercancel', end, { capture: true, passive: true });
  }

  private releaseLook(): void {
    this.lookPointerId = null;
  }

  private bindAction(button: HTMLButtonElement, action: InputAction): void {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (this.actionPointers.has(action)) return;
      this.actionPointers.set(action, event.pointerId);
      button.classList.add('is-held');
      try { button.setPointerCapture(event.pointerId); } catch { /* Ignore. */ }
      this.callbacks.onPress(action);
    });
    const release = (event: PointerEvent) => {
      if (this.actionPointers.get(action) !== event.pointerId) return;
      this.actionPointers.delete(action);
      button.classList.remove('is-held');
      this.callbacks.onRelease(action);
    };
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
    button.addEventListener('contextmenu', (event) => event.preventDefault());
  }
}
