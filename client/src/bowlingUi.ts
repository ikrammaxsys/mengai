import type { BowlingPartyState, BowlingReward } from './network';
import type { BowlingFrame, BowlingSnapshot } from '../../shared/bowlingConfig';

export interface BowlingInvitation {
  partyId: string;
  leaderId: string;
  leaderName: string;
}

export interface BowlingUiCallbacks {
  solo(): void;
  createParty(): void;
  cancelPrompt(): void;
  invite(playerId: string): void;
  respond(partyId: string, accept: boolean): void;
  startParty(): void;
  leaveParty(): void;
  leaveGame(): void;
  playAgain(): void;
}

function formatThrow(frame: BowlingFrame, index: number): string {
  if (index >= frame.throws.length) return '·';
  if (frame.strike && index === 0) return 'X';
  if (frame.spare && index === 1) return '/';
  const pins = frame.throws[index];
  return pins === 0 ? 'G' : String(pins);
}

export class BowlingUi {
  private readonly prompt: HTMLElement;
  private readonly promptBest: HTMLElement;
  private readonly partyPanel: HTMLElement;
  private readonly partyMembers: HTMLElement;
  private readonly partyRoom: HTMLElement;
  private readonly partyStart: HTMLButtonElement;
  private readonly partyLeave: HTMLButtonElement;
  private readonly invites: HTMLElement;
  private readonly invitesList: HTMLElement;
  private readonly overlay: HTMLElement;
  private readonly scoreboard: HTMLElement;
  private readonly turn: HTMLElement;
  private readonly timer: HTMLElement;
  private readonly callout: HTMLElement;
  private readonly waiting: HTMLElement;
  private readonly waitingName: HTMLElement;
  private readonly turnOrder: HTMLElement;
  private readonly power: HTMLElement;
  private readonly powerFill: HTMLElement;
  private readonly controls: HTMLElement;
  private readonly results: HTMLElement;
  private readonly resultsList: HTMLElement;
  private readonly resultsNote: HTMLElement;
  private readonly callbacks: BowlingUiCallbacks;
  private scoreboardSignature = '';
  private resultsSignature = '';
  private waitingSignature = '';
  private lastCalloutAt = 0;
  private calloutTimer = 0;
  private pendingInvites = new Map<string, BowlingInvitation>();

  constructor(private readonly root: HTMLElement, callbacks: BowlingUiCallbacks) {
    this.callbacks = callbacks;
    this.prompt = document.querySelector<HTMLElement>('#bowling-prompt')!;
    this.promptBest = document.querySelector<HTMLElement>('#bowling-prompt-best')!;
    this.partyPanel = document.querySelector<HTMLElement>('#bowling-party-panel')!;
    this.partyMembers = document.querySelector<HTMLElement>('#bowling-party-members')!;
    this.partyRoom = document.querySelector<HTMLElement>('#bowling-party-room')!;
    this.partyStart = document.querySelector<HTMLButtonElement>('#bowling-party-start')!;
    this.partyLeave = document.querySelector<HTMLButtonElement>('#bowling-party-leave')!;
    this.invites = document.querySelector<HTMLElement>('#bowling-party-invites')!;
    this.invitesList = document.querySelector<HTMLElement>('#bowling-party-invites-list')!;
    this.overlay = document.querySelector<HTMLElement>('#bowling-overlay')!;
    this.scoreboard = document.querySelector<HTMLElement>('#bowling-scoreboard')!;
    this.turn = document.querySelector<HTMLElement>('#bowling-turn')!;
    this.timer = document.querySelector<HTMLElement>('#bowling-timer')!;
    this.callout = document.querySelector<HTMLElement>('#bowling-callout')!;
    this.waiting = document.querySelector<HTMLElement>('#bowling-waiting')!;
    this.waitingName = document.querySelector<HTMLElement>('#bowling-waiting-name')!;
    this.turnOrder = document.querySelector<HTMLElement>('#bowling-turn-order')!;
    this.power = document.querySelector<HTMLElement>('#bowling-power')!;
    this.powerFill = document.querySelector<HTMLElement>('#bowling-power-fill')!;
    this.controls = document.querySelector<HTMLElement>('#bowling-controls')!;
    this.results = document.querySelector<HTMLElement>('#bowling-results')!;
    this.resultsList = document.querySelector<HTMLElement>('#bowling-results-list')!;
    this.resultsNote = document.querySelector<HTMLElement>('#bowling-results-note')!;
    document.querySelector<HTMLButtonElement>('#bowling-solo')!.addEventListener('click', () => callbacks.solo());
    document.querySelector<HTMLButtonElement>('#bowling-create-party')!.addEventListener('click', () => callbacks.createParty());
    document.querySelector<HTMLButtonElement>('#bowling-cancel')!.addEventListener('click', () => callbacks.cancelPrompt());
    document.querySelector<HTMLButtonElement>('#bowling-play-again')!.addEventListener('click', () => callbacks.playAgain());
    document.querySelector<HTMLButtonElement>('#bowling-results-leave')!.addEventListener('click', () => callbacks.leaveGame());
    document.querySelector<HTMLButtonElement>('#bowling-leave')!.addEventListener('click', () => callbacks.leaveGame());
    this.partyStart.addEventListener('click', () => callbacks.startParty());
    this.partyLeave.addEventListener('click', () => callbacks.leaveParty());
  }

  showPrompt(bestScore: number | null): void {
    this.prompt.classList.remove('hidden');
    this.promptBest.textContent = bestScore === null ? '' : `Your best solo score: ${bestScore}`;
  }

  hidePrompt(): void {
    this.prompt.classList.add('hidden');
  }

  showParty(party: BowlingPartyState, selfId: string, roomPlayers: { id: string; name: string }[]): void {
    this.hidePrompt();
    this.partyPanel.classList.remove('hidden');
    this.partyMembers.replaceChildren();
    for (const member of party.members) {
      const row = document.createElement('div');
      row.className = 'arena-party-member';
      const name = document.createElement('strong');
      name.textContent = `${member.name}${member.playerId === selfId ? ' · You' : ''}`;
      const role = document.createElement('span');
      role.className = 'arena-party-role';
      role.textContent = member.playerId === party.leaderId ? 'Leader' : 'Joined';
      row.append(name, role);
      this.partyMembers.append(row);
    }
    for (const invited of party.invited) {
      const row = document.createElement('div');
      row.className = 'arena-party-member';
      const name = document.createElement('strong');
      name.textContent = invited.name;
      const role = document.createElement('span');
      role.className = 'arena-party-role';
      role.textContent = 'Invite pending';
      row.append(name, role);
      this.partyMembers.append(row);
    }

    this.partyRoom.replaceChildren();
    const memberIds = new Set([...party.members.map((member) => member.playerId), ...party.invited.map((member) => member.playerId)]);
    const available = roomPlayers.filter((player) => player.id !== selfId && !memberIds.has(player.id));
    if (!available.length) {
      const empty = document.createElement('div');
      empty.className = 'arena-party-empty';
      empty.textContent = 'No other players are currently in the room.';
      this.partyRoom.append(empty);
    }
    for (const player of available) {
      const row = document.createElement('div');
      row.className = 'arena-party-player';
      const name = document.createElement('span');
      name.textContent = player.name;
      const invite = document.createElement('button');
      invite.type = 'button';
      invite.textContent = party.members.length >= party.maxPlayers ? 'Full' : 'Invite';
      invite.disabled = party.leaderId !== selfId || party.members.length >= party.maxPlayers;
      invite.addEventListener('click', () => this.callbacks.invite(player.id));
      row.append(name, invite);
      this.partyRoom.append(row);
    }

    const isLeader = party.leaderId === selfId;
    this.partyStart.disabled = !isLeader || party.members.length < 2 || party.members.length > party.maxPlayers;
    this.partyStart.textContent = isLeader
      ? party.members.length < 2 ? 'Invite a player' : `Start party (${party.members.length}/${party.maxPlayers})`
      : 'Waiting for leader';
    this.partyLeave.textContent = isLeader ? 'Cancel party' : 'Leave party';
  }

  hideParty(): void {
    this.partyPanel.classList.add('hidden');
  }

  showInvites(invitations: Map<string, BowlingInvitation>): void {
    this.pendingInvites = invitations;
    this.invitesList.replaceChildren();
    this.invites.classList.toggle('hidden', invitations.size === 0);
    for (const invitation of invitations.values()) {
      const row = document.createElement('div');
      row.className = 'arena-party-invite';
      const name = document.createElement('span');
      name.textContent = `${invitation.leaderName} invited you`;
      const actions = document.createElement('div');
      const accept = document.createElement('button');
      accept.type = 'button';
      accept.textContent = 'Join';
      accept.addEventListener('click', () => this.callbacks.respond(invitation.partyId, true));
      const decline = document.createElement('button');
      decline.type = 'button';
      decline.textContent = 'No thanks';
      decline.addEventListener('click', () => this.callbacks.respond(invitation.partyId, false));
      actions.append(accept, decline);
      row.append(name, actions);
      this.invitesList.append(row);
    }
  }

  get invitesOpen(): boolean {
    return this.pendingInvites.size > 0;
  }

  showOverlay(): void {
    this.overlay.classList.remove('hidden');
  }

  hideOverlay(): void {
    this.overlay.classList.add('hidden');
    this.results.classList.add('hidden');
    this.callout.classList.remove('show');
    this.power.classList.add('hidden');
    this.scoreboardSignature = '';
    this.resultsSignature = '';
  }

  receive(snapshot: BowlingSnapshot, selfId: string, roomPlayerNames: Map<string, string>): void {
    const names = new Map(roomPlayerNames);
    for (const player of snapshot.players) names.set(player.playerId, player.name);
    this.turn.textContent = snapshot.phase === 'game_over'
      ? 'Game over'
      : snapshot.activePlayerId === selfId
        ? 'Your turn'
        : `${names.get(snapshot.activePlayerId ?? '') ?? 'Player'}'s turn`;
    this.renderScoreboard(snapshot, selfId);
    const activeName = names.get(snapshot.activePlayerId ?? '') ?? 'another player';
    const waitingForOthers = snapshot.phase !== 'game_over' && snapshot.activePlayerId !== selfId;
    this.waiting.classList.toggle('hidden', !waitingForOthers);
    if (waitingForOthers) {
      const waitingSignature = `${snapshot.activePlayerId}:${snapshot.turnOrder.join(',')}:${snapshot.players.map((player) => `${player.playerId}${player.left ? '!' : ''}`).join(',')}`;
      if (waitingSignature !== this.waitingSignature) {
        this.waitingSignature = waitingSignature;
        this.waitingName.textContent = activeName;
        this.turnOrder.replaceChildren();
        snapshot.turnOrder.forEach((playerId, index) => {
          const item = document.createElement('li');
          item.textContent = names.get(playerId) ?? 'Player';
          item.classList.toggle('is-active', playerId === snapshot.activePlayerId);
          item.dataset.order = String(index + 1);
          this.turnOrder.append(item);
        });
      }
    } else {
      this.waitingSignature = '';
    }
    this.controls.textContent = snapshot.phase === 'game_over'
      ? ''
      : snapshot.activePlayerId === selfId
        ? 'A/D or drag to aim · Hold Space or pointer to charge · Release to throw'
        : 'Watching the lane · You will be called when it is your turn';
    if (snapshot.phase === 'game_over') this.renderResults(snapshot, selfId);
    else this.results.classList.add('hidden');
    if (snapshot.callout && snapshot.calloutAt !== this.lastCalloutAt) {
      this.lastCalloutAt = snapshot.calloutAt;
      this.showCallout(snapshot.callout);
    }
  }

  updateTimer(snapshot: BowlingSnapshot, serverNow: number): void {
    if (snapshot.phase === 'game_over' || snapshot.turnDeadline === null) {
      this.timer.classList.add('hidden');
      return;
    }
    this.timer.classList.remove('hidden');
    const remaining = Math.max(0, Math.ceil((snapshot.turnDeadline - serverNow) / 1000));
    this.timer.textContent = `${remaining}s`;
    this.timer.classList.toggle('is-low', remaining <= 5);
  }

  setPower(active: boolean, power: number): void {
    this.power.classList.toggle('hidden', !active);
    this.powerFill.style.width = `${Math.max(0, Math.min(1, power)) * 100}%`;
  }

  showReward(reward: BowlingReward, selfId: string): void {
    if (reward.playerId === selfId) this.resultsNote.textContent = `You earned ${reward.label}!`;
  }

  private showCallout(callout: 'strike' | 'spare' | 'gutter'): void {
    this.callout.textContent = callout === 'strike' ? 'Strike!' : callout === 'spare' ? 'Spare!' : 'Gutter';
    this.callout.className = `bowling-callout is-${callout} show`;
    window.clearTimeout(this.calloutTimer);
    this.calloutTimer = window.setTimeout(() => this.callout.classList.remove('show'), 1_150);
  }

  private renderScoreboard(snapshot: BowlingSnapshot, selfId: string): void {
    const signature = JSON.stringify({
      active: snapshot.activePlayerId,
      phase: snapshot.phase,
      players: snapshot.players.map((player) => ({ id: player.playerId, card: player.scorecard, left: player.left })),
    });
    if (signature === this.scoreboardSignature) return;
    this.scoreboardSignature = signature;
    this.scoreboard.replaceChildren();
    for (const player of snapshot.players) {
      const card = document.createElement('article');
      card.className = 'bowling-score-card';
      card.classList.toggle('is-active', player.playerId === snapshot.activePlayerId);
      card.classList.toggle('is-left', player.left);
      card.style.setProperty('--player-color', player.color);
      const header = document.createElement('header');
      const dot = document.createElement('span');
      dot.className = 'bowling-score-dot';
      const name = document.createElement('strong');
      name.textContent = `${player.name}${player.playerId === selfId ? ' · You' : ''}${player.left ? ' · Left' : ''}`;
      const total = document.createElement('span');
      total.className = 'bowling-score-total';
      total.textContent = String(player.scorecard.total);
      header.append(dot, name, total);
      const table = document.createElement('div');
      table.className = 'bowling-frame-table';
      const head = document.createElement('div');
      head.className = 'bowling-frame-row is-head';
      head.append(this.cell('Frame', 'frame-number'), this.cell('T1'), this.cell('T2'), this.cell('Total', 'frame-total'));
      table.append(head);
      player.scorecard.frames.forEach((frame, index) => {
        const row = document.createElement('div');
        row.className = 'bowling-frame-row';
        row.append(
          this.cell(String(index + 1), 'frame-number'),
          this.cell(formatThrow(frame, 0)),
          this.cell(formatThrow(frame, 1)),
          this.cell(frame.throws.length ? String(frame.total) : '·', 'frame-total'),
        );
        table.append(row);
      });
      const footer = document.createElement('footer');
      footer.textContent = `Running total ${player.scorecard.total}`;
      card.append(header, table, footer);
      this.scoreboard.append(card);
    }
  }

  private cell(text: string, className = ''): HTMLElement {
    const span = document.createElement('span');
    if (className) span.className = className;
    span.textContent = text;
    return span;
  }

  private renderResults(snapshot: BowlingSnapshot, selfId: string): void {
    this.results.classList.remove('hidden');
    const signature = JSON.stringify({ ranking: snapshot.ranking, best: snapshot.bestSoloScore, solo: snapshot.isSolo });
    if (signature === this.resultsSignature) return;
    this.resultsSignature = signature;
    this.resultsList.replaceChildren();
    for (const entry of snapshot.ranking) {
      const row = document.createElement('div');
      row.className = 'bowling-result-row';
      row.classList.toggle('is-self', entry.playerId === selfId);
      const rank = document.createElement('strong');
      rank.textContent = `#${entry.rank}`;
      const name = document.createElement('span');
      name.textContent = entry.name;
      const total = document.createElement('span');
      total.textContent = String(entry.total);
      row.append(rank, name, total);
      this.resultsList.append(row);
    }
    const self = snapshot.players.find((player) => player.playerId === selfId);
    if (snapshot.isSolo && self) {
      this.resultsNote.textContent = self.scorecard.total >= snapshot.bestSoloScore
        ? `New best solo score: ${self.scorecard.total}!`
        : `Best solo score: ${snapshot.bestSoloScore}`;
    } else {
      this.resultsNote.textContent = '';
    }
  }

  respond(partyId: string, accept: boolean): void {
    this.callbacks.respond(partyId, accept);
  }
}
