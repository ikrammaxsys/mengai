import { BOWLING_CONFIG, type BowlingSnapshot } from '../../shared/bowlingConfig';
import { WORLD_CONFIG } from '../../shared/worldConfig';
import type { PlayerSnapshot } from './network';
import { BowlingNet } from './bowlingNet';
import type { BowlingInvitation } from './bowlingUi';
import { BowlingUi } from './bowlingUi';
import { BowlingView } from './bowlingView';
import { BowlingAudio } from './bowlingAudio';

export interface BowlingModeCallbacks {
  getNetwork(): BowlingNet | null;
  getWorldPosition(): { x: number; z: number };
  showToast(message: string): void;
  onExit(): void;
  onCallout?(callout: 'strike' | 'spare' | 'gutter'): void;
}

export class BowlingMode {
  private readonly view: BowlingView;
  private readonly ui: BowlingUi;
  private readonly audio = new BowlingAudio();
  private readonly callbacks: BowlingModeCallbacks;
  private network: BowlingNet | null = null;
  private snapshot: BowlingSnapshot | null = null;
  private selfId = '';
  private roomPlayers = new Map<string, PlayerSnapshot>();
  private currentParty: import('./network').BowlingPartyState | null = null;
  private invitations = new Map<string, BowlingInvitation>();
  private promptDismissed = false;
  private aim = 0;
  private power = 0;
  private charging = false;
  private chargeStartedAt = 0;
  private throwSent = false;
  private turnKey = '';
  private lastPhase: BowlingSnapshot['phase'] = 'aiming';
  private lastCalloutAt = 0;
  private lastDownPins = 0;
  private bestSoloScore = 0;
  private active = false;
  private pointerId: number | null = null;
  private lastPointerX = 0;

  constructor(callbacks: BowlingModeCallbacks) {
    this.callbacks = callbacks;
    const host = document.querySelector<HTMLElement>('#bowling-canvas-host')!;
    this.view = new BowlingView(host);
    this.ui = new BowlingUi(document.querySelector<HTMLElement>('#bowling-overlay')!, {
      solo: () => this.network?.startSolo(),
      createParty: () => this.network?.createParty(),
      cancelPrompt: () => this.dismissPrompt(),
      invite: (playerId) => this.network?.invite(playerId),
      respond: (partyId, accept) => {
        this.invitations.delete(partyId);
        this.ui.showInvites(this.invitations);
        this.network?.respond(partyId, accept);
      },
      startParty: () => this.network?.startParty(),
      leaveParty: () => this.network?.leaveParty(),
      leaveGame: () => this.leaveGame(),
      playAgain: () => this.network?.playAgain(),
    });
    this.view.canvas.addEventListener('pointerdown', (event) => this.handlePointerDown(event));
    this.view.canvas.addEventListener('pointermove', (event) => this.handlePointerMove(event));
    this.view.canvas.addEventListener('pointerup', (event) => this.handlePointerUp(event));
    this.view.canvas.addEventListener('pointercancel', (event) => this.handlePointerUp(event));
  }

  get isActive(): boolean {
    return this.active;
  }

  /** 0..1 while the player holds the throw button (shown as a ring on mobile). */
  get chargePower(): number {
    return this.charging ? this.power : 0;
  }

  get isCharging(): boolean {
    return this.charging;
  }

  /** Touch input bridge: hold the on-screen throw button, release to bowl. */
  beginTouchCharge(): void {
    this.startCharge();
  }

  endTouchCharge(): void {
    this.releaseThrow();
  }

  setNetwork(network: BowlingNet | null): void {
    this.network = network;
  }

  setSelfId(selfId: string): void {
    this.selfId = selfId;
  }

  setRoomPlayers(players: PlayerSnapshot[]): void {
    const changed = players.length !== this.roomPlayers.size || players.some((player) => this.roomPlayers.get(player.id)?.name !== player.name);
    this.roomPlayers = new Map(players.map((player) => [player.id, player]));
    if (changed && this.currentParty) this.ui.showParty(this.currentParty, this.selfId, this.roomPlayerList());
  }

  setBestSoloScore(score: number | undefined): void {
    this.bestSoloScore = Math.max(0, Math.floor(score ?? 0));
  }

  updateProximity(position: { x: number; z: number }, canEnter: boolean): void {
    if (this.active) {
      this.ui.hidePrompt();
      return;
    }
    const near = Math.hypot(position.x - WORLD_CONFIG.bowlingAlley.x, position.z - WORLD_CONFIG.bowlingAlley.z) <= WORLD_CONFIG.bowlingAlley.useRadius;
    if (!near) this.promptDismissed = false;
    if (!canEnter || !near || this.promptDismissed || this.currentParty) {
      this.ui.hidePrompt();
      return;
    }
    this.ui.showPrompt(this.bestSoloScore > 0 ? this.bestSoloScore : null);
  }

  handlePartyState(party: import('./network').BowlingPartyState): void {
    this.currentParty = party;
    this.invitations.delete(party.partyId);
    this.ui.showInvites(this.invitations);
    this.ui.showParty(party, this.selfId, this.roomPlayerList());
  }

  handlePartyInvite(invitation: BowlingInvitation): void {
    this.invitations.set(invitation.partyId, invitation);
    this.ui.showInvites(this.invitations);
  }

  handlePartyClosed(partyId: string, reason: string): void {
    this.invitations.delete(partyId);
    if (this.currentParty?.partyId === partyId) {
      this.currentParty = null;
      this.ui.hideParty();
      if (reason === 'cancelled') this.callbacks.showToast('The bowling party was cancelled.');
      else if (reason === 'left') this.callbacks.showToast('You left the bowling party.');
    }
    this.ui.showInvites(this.invitations);
  }

  clearSocial(): void {
    this.currentParty = null;
    this.invitations.clear();
    this.ui.hideParty();
    this.ui.showInvites(this.invitations);
    this.ui.hidePrompt();
    this.promptDismissed = false;
  }

  enter(snapshot: BowlingSnapshot, selfId: string): void {
    this.active = true;
    this.selfId = selfId;
    this.snapshot = snapshot;
    this.currentParty = null;
    this.invitations.clear();
    this.ui.hidePrompt();
    this.ui.hideParty();
    this.ui.showInvites(this.invitations);
    this.ui.showOverlay();
    this.view.enter(snapshot, selfId);
    this.resetTurnInput();
    this.lastPhase = 'aiming';
    this.lastCalloutAt = 0;
    this.lastDownPins = 0;
    this.receive(snapshot);
  }

  receive(snapshot: BowlingSnapshot): void {
    if (!this.active) return;
    this.snapshot = snapshot;
    this.bestSoloScore = Math.max(this.bestSoloScore, snapshot.bestSoloScore);
    const nextTurnKey = `${snapshot.row}:${snapshot.activePlayerId ?? ''}:${this.activeThrows(snapshot)}`;
    if (nextTurnKey !== this.turnKey && snapshot.phase === 'aiming') {
      this.turnKey = nextTurnKey;
      this.resetTurnInput();
    }
    if (snapshot.phase !== 'rolling') this.lastDownPins = 0;
    if (snapshot.phase === 'rolling' && this.lastPhase !== 'rolling') this.audio.roll();
    const down = snapshot.pins.filter((pin) => pin.knocked).length;
    if (snapshot.phase === 'rolling' && down > this.lastDownPins) this.audio.crash(down);
    this.lastDownPins = Math.max(this.lastDownPins, down);
    if (snapshot.callout && snapshot.calloutAt !== this.lastCalloutAt) {
      this.lastCalloutAt = snapshot.calloutAt;
      if (snapshot.callout === 'strike') this.audio.strike();
      else if (snapshot.callout === 'spare') this.audio.spare();
      else this.audio.gutter();
      this.callbacks.onCallout?.(snapshot.callout);
    }
    this.lastPhase = snapshot.phase;
    this.view.receive(snapshot);
    this.ui.receive(snapshot, this.selfId, this.roomPlayerNames());
  }

  render(serverNow: number, deltaSeconds: number): void {
    if (!this.active || !this.snapshot) return;
    const snapshot = this.snapshot;
    const myTurn = snapshot.phase === 'aiming' && snapshot.activePlayerId === this.selfId;
    if (!myTurn && this.charging) this.cancelCharge();
    if (this.charging) this.power = Math.min(1, Math.max(0, (performance.now() - this.chargeStartedAt) / 1_100));
    this.view.setAim(this.aim);
    this.view.render(serverNow, deltaSeconds);
    this.ui.updateTimer(snapshot, serverNow);
    this.ui.setPower(myTurn || (this.charging && snapshot.phase === 'aiming'), this.power);
    this.ui.receive(snapshot, this.selfId, this.roomPlayerNames());
  }

  handleKeyDown(event: KeyboardEvent): boolean {
    if (!this.active) return false;
    if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof HTMLButtonElement) return false;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.leaveGame();
      return true;
    }
    const key = event.key.toLowerCase();
    if (key === 'a' || key === 'arrowleft') {
      event.preventDefault();
      this.aim = Math.max(-1, this.aim - (event.repeat ? 0.045 : 0.12));
      return true;
    }
    if (key === 'd' || key === 'arrowright') {
      event.preventDefault();
      this.aim = Math.min(1, this.aim + (event.repeat ? 0.045 : 0.12));
      return true;
    }
    if (event.code === 'Space') {
      event.preventDefault();
      if (!event.repeat) this.startCharge();
      return true;
    }
    if (event.key === 'Enter') event.preventDefault();
    return true;
  }

  handleKeyUp(event: KeyboardEvent): boolean {
    if (!this.active) return false;
    if (event.code === 'Space') {
      event.preventDefault();
      this.releaseThrow();
      return true;
    }
    return false;
  }

  handleBlur(): void {
    if (this.charging) this.cancelCharge();
  }

  leaveGame(): void {
    this.audio.resume();
    this.network?.leave();
  }

  handleExit(reason: string): void {
    this.active = false;
    this.snapshot = null;
    this.charging = false;
    this.power = 0;
    this.aim = 0;
    this.throwSent = false;
    this.cancelPointer();
    this.view.close();
    this.ui.hideOverlay();
    if (reason === 'left') this.callbacks.showToast('You left the bowling alley.');
    this.callbacks.onExit();
  }

  showReward(reward: import('./network').BowlingReward): void {
    this.ui.showReward(reward, this.selfId);
    if (reward.playerId === this.selfId) this.callbacks.showToast(`Bowling: ${reward.label}!`);
  }

  private startCharge(): void {
    if (!this.active || !this.snapshot || this.snapshot.phase !== 'aiming') return;
    if (this.snapshot.activePlayerId !== this.selfId || this.throwSent || this.charging) return;
    this.audio.resume();
    this.charging = true;
    this.chargeStartedAt = performance.now();
    this.power = 0;
  }

  private releaseThrow(): void {
    if (!this.charging) return;
    const power = Math.max(0.05, this.power);
    const aim = this.aim;
    this.charging = false;
    if (this.throwSent) return;
    this.throwSent = true;
    this.power = 0;
    this.ui.setPower(false, 0);
    this.network?.throwBall(aim, power);
  }

  private cancelCharge(): void {
    this.charging = false;
    this.power = 0;
    this.ui.setPower(false, 0);
  }

  private resetTurnInput(): void {
    this.aim = 0;
    this.power = 0;
    this.charging = false;
    this.throwSent = false;
  }

  dismissPrompt(): void {
    this.promptDismissed = true;
    this.ui.hidePrompt();
  }

  private activeThrows(snapshot: BowlingSnapshot): number {
    const player = snapshot.players.find((entry) => entry.playerId === snapshot.activePlayerId);
    return player?.scorecard.frames[snapshot.row]?.throws.length ?? 0;
  }

  private roomPlayerList(): { id: string; name: string }[] {
    return [...this.roomPlayers.values()].map((player) => ({ id: player.id, name: player.name }));
  }

  private roomPlayerNames(): Map<string, string> {
    return new Map([...this.roomPlayers.values()].map((player) => [player.id, player.name]));
  }

  private handlePointerDown(event: PointerEvent): void {
    if (!this.active || event.button !== 0) return;
    if (!this.snapshot || this.snapshot.phase !== 'aiming' || this.snapshot.activePlayerId !== this.selfId) return;
    event.preventDefault();
    this.pointerId = event.pointerId;
    this.lastPointerX = event.clientX;
    try { this.view.canvas.setPointerCapture(event.pointerId); } catch { /* Pointer capture may be unavailable. */ }
    this.startCharge();
  }

  private handlePointerMove(event: PointerEvent): void {
    if (this.pointerId !== event.pointerId) return;
    const delta = event.clientX - this.lastPointerX;
    this.lastPointerX = event.clientX;
    this.aim = Math.max(-1, Math.min(1, this.aim + delta * 0.005));
  }

  private handlePointerUp(event: PointerEvent): void {
    if (this.pointerId !== event.pointerId) return;
    this.cancelPointer();
    this.releaseThrow();
  }

  private cancelPointer(): void {
    if (this.pointerId === null) return;
    try { this.view.canvas.releasePointerCapture(this.pointerId); } catch { /* Ignore. */ }
    this.pointerId = null;
  }
}

export { BOWLING_CONFIG };
