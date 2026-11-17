/**
 * Single source of truth for player intent.
 *
 * Desktop keyboard/mouse and mobile touch controls both write here; gameplay
 * (movement, arena, bowling, fishing) only reads from this object. That keeps the
 * gameplay loop device-agnostic and means a new input source never needs to touch
 * movement code.
 */

export type InputAction = 'primary' | 'secondary';

/** Analog stick dead zone: below this the stick reports neutral. */
const STICK_DEAD_ZONE = 0.1;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export class InputState {
  /** Raw keys currently held on the keyboard (kept for menu/shortcut handlers). */
  readonly keys = new Set<string>();

  private touchX = 0;
  private touchY = 0;
  private lookX = 0;
  private lookY = 0;
  private readonly held = new Set<InputAction>();
  private readonly pressedThisFrame = new Set<InputAction>();
  private readonly releasedThisFrame = new Set<InputAction>();

  /**
   * Horizontal intent in `-1..1`, positive to the right.
   * Keyboard A/D are digital; the touch stick is analog.
   */
  get moveX(): number {
    const keyboard = (this.keys.has('d') ? 1 : 0) - (this.keys.has('a') ? 1 : 0);
    return clamp(keyboard + this.touchX, -1, 1);
  }

  /**
   * Forward intent in `-1..1`, positive forward.
   * Keyboard W/S are digital; the touch stick is analog.
   */
  get moveY(): number {
    const keyboard = (this.keys.has('w') ? 1 : 0) - (this.keys.has('s') ? 1 : 0);
    return clamp(keyboard + this.touchY, -1, 1);
  }

  /** Forward axis used by `stepMovement`/`arenaView.move`. */
  get forward(): number {
    return this.moveY;
  }

  /**
   * Turn axis in `-1..1`, positive turns left (matches the keyboard A/D
   * convention in main.ts). The follow camera sits behind the avatar, so this is
   * the camera-relative mapping for both the stick and the drag-to-look gesture.
   */
  get turn(): number {
    return -this.moveX;
  }

  get hasForwardInput(): boolean {
    return Math.abs(this.moveY) > 0.01;
  }

  get hasMovementInput(): boolean {
    return Math.abs(this.moveY) > 0.01 || Math.abs(this.moveX) > 0.01;
  }

  /** Feed an analog stick vector where `y` is forward-positive and both are `-1..1`. */
  setTouchMove(x: number, y: number): void {
    const magnitude = Math.hypot(x, y);
    if (magnitude <= STICK_DEAD_ZONE) {
      this.touchX = 0;
      this.touchY = 0;
      return;
    }
    // Rescale past the dead zone so the full output range stays reachable.
    const scaled = Math.min(1, (magnitude - STICK_DEAD_ZONE) / (1 - STICK_DEAD_ZONE)) / magnitude;
    this.touchX = clamp(x * scaled, -1, 1);
    this.touchY = clamp(y * scaled, -1, 1);
  }

  releaseTouchMove(): void {
    this.touchX = 0;
    this.touchY = 0;
  }

  /** Accumulate a camera-drag delta in CSS pixels for the next frame. */
  addLook(deltaX: number, deltaY: number): void {
    this.lookX += deltaX;
    this.lookY += deltaY;
  }

  /** Read and clear drag deltas. Called once per animation frame. */
  consumeLook(): { x: number; y: number } {
    const look = { x: this.lookX, y: this.lookY };
    this.lookX = 0;
    this.lookY = 0;
    return look;
  }

  press(action: InputAction): void {
    if (!this.held.has(action)) this.pressedThisFrame.add(action);
    this.held.add(action);
  }

  release(action: InputAction): void {
    if (this.held.delete(action)) this.releasedThisFrame.add(action);
  }

  isHeld(action: InputAction): boolean {
    return this.held.has(action);
  }

  wasPressed(action: InputAction): boolean {
    return this.pressedThisFrame.has(action);
  }

  wasReleased(action: InputAction): boolean {
    return this.releasedThisFrame.has(action);
  }

  /** Clear every source. Used on blur, tab hide, mode switches and disconnect. */
  clear(): void {
    this.keys.clear();
    this.releaseTouchMove();
    this.held.clear();
    this.pressedThisFrame.clear();
    this.releasedThisFrame.clear();
    this.lookX = 0;
    this.lookY = 0;
  }

  /** Clear per-frame edges. Call at the end of the animation frame. */
  endFrame(): void {
    this.pressedThisFrame.clear();
    this.releasedThisFrame.clear();
  }
}
