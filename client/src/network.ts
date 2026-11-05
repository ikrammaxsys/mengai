import type { FishRarity, FishSpeciesId, ReelParameters } from '../../shared/fishConfig';
import { FISH_CONFIG } from '../../shared/fishConfig';
import type { WeatherSnapshot, WeatherType } from '../../shared/weatherConfig';
import type { ChickenSnapshot } from '../../shared/chickenConfig';
import type { ArenaSnapshot } from '../../shared/arenaConfig';

export type FishingState = 'idle' | 'casting' | 'waiting' | 'bite' | 'fighting' | 'reeling';

export interface FishCast {
  targetX: number;
  targetZ: number;
  startX: number;
  startZ: number;
  facing: number;
  startTime: number;
  flightSeconds: number;
  reelStartedAt?: number;
}

export interface CatchEntry {
  id: string;
  playerId: string;
  playerName: string;
  species: FishSpeciesId;
  weightKg: number;
  rarity: FishRarity;
  timestamp: number;
}

export interface InventoryItem {
  catchId: string;
  species: FishSpeciesId;
  rarity: FishRarity;
  weightKg: number;
  caughtAt: number;
}

export type HeldFish = InventoryItem;

export interface CampfireCooking {
  cookId: string;
  playerId: string;
  playerName: string;
  fish: InventoryItem;
  startedAt: number;
  durationMs: number;
}

export interface CampfireCookedEvent {
  cooking: CampfireCooking;
  finishedAt: number;
  recipientIds: string[];
}

export interface CatchResult {
  entry: CatchEntry;
  flags: { newPersonalBest: boolean; newRoomRecord: boolean };
  personalBest: CatchEntry;
}

export interface BigCatchEvent {
  catchId: string;
  playerName: string;
  species: FishSpeciesId;
  rarity: FishRarity;
  weightKg: number;
  tier: 'notable' | 'spectacular';
  timestamp: number;
  catch: CatchEntry;
}

export interface StoneFlight {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
  startTime: number;
  flightMs: number;
  targetId: string | null;
  throwerId: string;
}

export interface CrocodileScore {
  playerId: string;
  playerName: string;
  count: number;
}

export interface ArenaPartyMember {
  playerId: string;
  name: string;
  color: string;
}

export interface ArenaPartyInvitation {
  playerId: string;
  name: string;
}

export interface ArenaPartyState {
  partyId: string;
  leaderId: string;
  members: ArenaPartyMember[];
  invited: ArenaPartyInvitation[];
}

export interface StoneSnapshot {
  id: string;
  originX: number;
  originZ: number;
  x: number;
  z: number;
  color: string;
  state: 'ground' | 'carried' | 'flying' | 'respawning';
  carriedBy: string | null;
  flight: StoneFlight | null;
  chickenHitId: string | null;
  respawnAt: number | null;
}

export interface NetDiagnostics {
  rttMs: number | null;
  jitterMs: number;
  snapshotsPerSecond: number;
  interpolationDelayMs: number;
  droppedSimulatedMessages: number;
  bufferedAmount: number;
  simulation: { lagMs: number; jitterMs: number; lossPercent: number };
}

export interface PlayerSnapshot {
  id: string;
  name: string;
  color: string;
  x: number;
  z: number;
  facing: number;
  fishing: FishingState;
  cast: FishCast | null;
  carryingStoneId: string | null;
  holdingFish?: HeldFish | null;
  moving: boolean;
  inPhotobooth: boolean;
  speaking?: boolean;
  chickenScore: number;
  crocodilesSlain: number;
  seatedSeatId?: string | null;
}

export interface JukeboxTrack {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  durationSeconds: number;
  requesterId: string;
  requestedBy: string;
  status: 'downloading' | 'ready' | 'playing' | 'failed';
}

export interface JukeboxCurrent extends JukeboxTrack {
  startedAt: number | null;
}

export interface TheaterState {
  currentPresenterId: string | null;
  presenterName: string | null;
  mode: 'none' | 'screen' | 'pdf';
  pdfUrl: string | null;
  currentPage: number;
  freeBrowse: boolean;
}

export interface TheaterSignal {
  fromId: string;
  signalType: 'viewer' | 'offer' | 'answer' | 'ice';
  payload?: RTCSessionDescriptionInit | RTCIceCandidateInit;
}

type Handlers = {
  joined: (message: { selfId: string; room: string; resumeToken: string; serverTime: number; players: PlayerSnapshot[]; leaderboard: CatchEntry[]; personalBest: CatchEntry | null; stones: StoneSnapshot[]; campfireCooking: CampfireCooking | null; weather: WeatherSnapshot; chickens: ChickenSnapshot[]; crocodileScores: CrocodileScore[]; theater: TheaterState; seatOccupancy: Record<string, string> }) => void;
  state: (players: PlayerSnapshot[], serverTime: number) => void;
  playerJoined: (player: PlayerSnapshot, serverTime: number) => void;
  playerLeft: (playerId: string) => void;
  speaking: (playerId: string, speaking: boolean) => void;
  correction: (message: { x: number; z: number; seq: number }) => void;
  clockOffset: (offsetMs: number) => void;
  error: (message: string) => void;
  notice: (message: string) => void;
  fishCast: (message: { playerId: string } & FishCast) => void;
  fishBite: (message: { playerId: string; biteAt: number; deadline: number }) => void;
  fishReel: (message: { playerId: string; startTime: number; duration: number; targetX: number; targetZ: number; escaped: boolean }) => void;
  fishEscaped: (playerId: string) => void;
  reelParams: (params: ReelParameters) => void;
  reelState: (playerId: string, active: boolean) => void;
  catchResult: (result: CatchResult) => void;
  leaderboard: (entries: CatchEntry[]) => void;
  crocodileScore: (score: CrocodileScore) => void;
  portalEntered: (arena: ArenaSnapshot) => void;
  arenaState: (arena: ArenaSnapshot) => void;
  arenaPartyState: (party: ArenaPartyState) => void;
  arenaPartyInvite: (invitation: { partyId: string; leaderId: string; leaderName: string }) => void;
  arenaPartyClosed: (message: { partyId: string; reason: string }) => void;
  monsterHit: (message: { damage: number; hp: number; maxHp: number }) => void;
  playerDamaged: (message: { playerId: string; damage: number; hp: number; maxHp: number; skill: 'bite' | 'tailSweep' | 'lunge' }) => void;
  monsterDied: () => void;
  playerDied: (respawnAt: number) => void;
  portalExited: (respawned: boolean) => void;
  announcement: (message: string) => void;
  bigCatch: (message: BigCatchEvent) => void;
  stonePicked: (stoneId: string, playerId: string) => void;
  stoneThrown: (message: { stoneId: string; fromId: string; targetId: string | null } & StoneFlight) => void;
  stoneLanded: (message: { stoneId: string; position: { x: number; z: number }; water: boolean; hitPlayerId: string | null }) => void;
  stoneRespawn: (message: { stoneId: string; position: { x: number; z: number } }) => void;
  stoneHit: (playerId: string, fishingCancelled: boolean) => void;
  chickenHit: (message: { chickenId: string; playerId: string; newScore: number; startTime: number }) => void;
  chickenState: (chickens: ChickenSnapshot[], serverTime: number) => void;
  chat: (message: { playerId: string; name: string; text: string; at: number; catch?: CatchEntry }) => void;
  inventorySync: (items: InventoryItem[], totalCaught: number, personalBest: InventoryItem | null, collection: InventoryItem[]) => void;
  inventoryAdd: (item: InventoryItem) => void;
  inventoryRemove: (catchId: string) => void;
  playerHolding: (playerId: string, fish: HeldFish | null) => void;
  campfireCooking: (cooking: CampfireCooking | null) => void;
  campfireCooked: (event: CampfireCookedEvent) => void;
  weatherChanged: (weather: WeatherSnapshot) => void;
  jukeboxState: (current: JukeboxCurrent | null, queue: JukeboxTrack[], skipVotes: number) => void;
  jukeboxError: (message: string) => void;
  theaterState: (state: TheaterState) => void;
  theaterSignal: (signal: TheaterSignal) => void;
  theaterError: (message: string) => void;
  seatState: (occupancy: Record<string, string>) => void;
  disconnected: () => void;
};

export class Network {
  private socket?: WebSocket;
  private handlers: Handlers;
  private intentionalClose = false;
  private readonly simulation = this.readSimulation();
  private pingTimer = 0;
  private pingId = 0;
  private pendingPings = new Map<number, number>();
  private rttMs: number | null = null;
  private jitterMs = 0;
  private snapshotIntervalMs: number = FISH_CONFIG.sync.nominalSnapshotIntervalMs;
  private snapshotJitterMs = 0;
  private lastSnapshotAt = 0;
  private serverOffsetMs = 0;
  private hasServerOffset = false;
  private serverOffsetSamples: number[] = [];
  private snapshotTimes: number[] = [];
  private droppedSimulatedMessages = 0;
  private scheduledTimers = new Set<number>();
  private pendingMoveTimer = 0;
  private pendingMovePayload: string | null = null;

  constructor(handlers: Handlers) { this.handlers = handlers; }

  connect(room: string, name: string, resumeToken?: string): void {
    this.intentionalClose = false;
    this.socket?.close();
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socketUrl = import.meta.env.VITE_WS_URL || `${protocol}//${location.host}/ws`;
    const socket = new WebSocket(socketUrl);
    this.socket = socket;
    socket.addEventListener('open', () => {
       this.send({ type: 'join', room, name, resumeToken });
      this.pingTimer = window.setInterval(() => {
        const id = ++this.pingId;
        this.pendingPings.set(id, Date.now());
        for (const [pendingId, sentAt] of this.pendingPings) if (Date.now() - sentAt > 15000) this.pendingPings.delete(pendingId);
        this.send({ type: 'ping', id, clientTime: Date.now() });
      }, 2500);
    });
    socket.addEventListener('message', (event) => this.scheduleReceive(String(event.data)));
    socket.addEventListener('close', () => {
      window.clearInterval(this.pingTimer);
      if (!this.intentionalClose) this.handlers.disconnected();
    });
    socket.addEventListener('error', () => { if (socket.readyState === WebSocket.CONNECTING) socket.close(); });
  }

  private scheduleReceive(raw: string): void {
    let type = '';
    try { type = String((JSON.parse(raw) as Record<string, unknown>).type ?? ''); } catch { return; }
    if (this.shouldDrop(type, 'receive')) return;
    window.setTimeout(() => this.dispatch(raw), this.simulatedDelay());
  }

  private dispatch(raw: string): void {
      let message: Record<string, unknown>;
      try { message = JSON.parse(raw) as Record<string, unknown>; } catch { return; }
      switch (message.type) {
        case 'joined': this.handlers.joined(message as unknown as Parameters<Handlers['joined']>[0]); break;
        case 'state':
          {
            const now = Date.now();
            if (this.lastSnapshotAt) {
              const interval = now - this.lastSnapshotAt;
              this.snapshotJitterMs = this.snapshotJitterMs * 0.8 + Math.abs(interval - this.snapshotIntervalMs) * 0.2;
              this.snapshotIntervalMs = this.snapshotIntervalMs * 0.8 + interval * 0.2;
            }
            this.lastSnapshotAt = now;
          }
          this.snapshotTimes.push(Date.now());
          this.snapshotTimes = this.snapshotTimes.filter((at) => Date.now() - at <= 1000);
          this.handlers.state(message.players as PlayerSnapshot[], Number(message.serverTime) || Date.now());
          break;
        case 'player_joined': this.handlers.playerJoined(message.player as PlayerSnapshot, Number(message.serverTime) || Date.now()); break;
        case 'player_left': this.handlers.playerLeft(String(message.playerId)); break;
        case 'jukebox:state': this.handlers.jukeboxState((message.current as JukeboxCurrent | null) ?? null, Array.isArray(message.queue) ? message.queue as JukeboxTrack[] : [], Number(message.skipVotes) || 0); break;
        case 'jukebox:error': this.handlers.jukeboxError(String(message.message ?? 'The jukebox could not complete that action.')); break;
        case 'theater:state': this.handlers.theaterState(message.state as TheaterState); break;
        case 'theater:signal': this.handlers.theaterSignal(message as unknown as TheaterSignal); break;
        case 'theater:error': this.handlers.theaterError(String(message.message ?? 'The theater action failed.')); break;
        case 'seat:state': this.handlers.seatState((message.occupancy as Record<string, string>) ?? {}); break;
        case 'speaking': this.handlers.speaking(String(message.playerId), Boolean(message.speaking)); break;
        case 'correction': this.handlers.correction(message as unknown as Parameters<Handlers['correction']>[0]); break;
        case 'error': this.handlers.error(String(message.message)); break;
        case 'notice': this.handlers.notice(String(message.message)); break;
        case 'pong': {
          const id = Number(message.id), sentAt = this.pendingPings.get(id);
          if (sentAt !== undefined) {
            const receivedAt = Date.now();
            const serverReceiveAt = Number(message.serverReceiveTime);
            const serverSendAt = Number(message.serverSendTime);
            const processing = Math.max(0, serverSendAt - serverReceiveAt);
            const sample = Math.max(0, receivedAt - sentAt - processing);
            this.jitterMs = this.rttMs === null ? 0 : this.jitterMs * 0.8 + Math.abs(sample - this.rttMs) * 0.2;
            this.rttMs = this.rttMs === null ? sample : this.rttMs * 0.8 + sample * 0.2;
            const offsetSample = ((serverReceiveAt - sentAt) + (serverSendAt - receivedAt)) / 2;
            this.serverOffsetSamples.push(offsetSample);
            if (this.serverOffsetSamples.length > 5) this.serverOffsetSamples.shift();
            const sorted = [...this.serverOffsetSamples].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)];
            this.serverOffsetMs = this.hasServerOffset ? this.serverOffsetMs + (median - this.serverOffsetMs) * 0.2 : median;
            this.hasServerOffset = true;
            this.handlers.clockOffset(this.serverOffsetMs);
            this.pendingPings.delete(id);
          }
          break;
        }
        case 'fish_cast_broadcast': this.handlers.fishCast(message as unknown as Parameters<Handlers['fishCast']>[0]); break;
        case 'fish_bite': this.handlers.fishBite(message as unknown as Parameters<Handlers['fishBite']>[0]); break;
        case 'fish_reel': this.handlers.fishReel(message as unknown as Parameters<Handlers['fishReel']>[0]); break;
        case 'fish_escaped': this.handlers.fishEscaped(String(message.playerId)); break;
        case 'reel_params': this.handlers.reelParams(message as unknown as ReelParameters); break;
        case 'reel_state': this.handlers.reelState(String(message.playerId), Boolean(message.active)); break;
        case 'catch_result': this.handlers.catchResult(message as unknown as CatchResult); break;
        case 'leaderboard_update': this.handlers.leaderboard(message.entries as CatchEntry[]); break;
        case 'crocodile_score': this.handlers.crocodileScore(message as unknown as CrocodileScore); break;
        case 'portalEnter': this.handlers.portalEntered(message.arena as ArenaSnapshot); break;
        case 'arenaState': this.handlers.arenaState(message.arena as ArenaSnapshot); break;
        case 'arenaPartyState': this.handlers.arenaPartyState(message as unknown as ArenaPartyState); break;
        case 'arenaPartyInvite': this.handlers.arenaPartyInvite(message as unknown as Parameters<Handlers['arenaPartyInvite']>[0]); break;
        case 'arenaPartyClosed': this.handlers.arenaPartyClosed(message as unknown as Parameters<Handlers['arenaPartyClosed']>[0]); break;
        case 'monsterHit': this.handlers.monsterHit(message as unknown as Parameters<Handlers['monsterHit']>[0]); break;
        case 'playerDamaged': this.handlers.playerDamaged(message as unknown as Parameters<Handlers['playerDamaged']>[0]); break;
        case 'monsterDied': this.handlers.monsterDied(); break;
        case 'playerDied': this.handlers.playerDied(Number(message.respawnAt)); break;
        case 'portalExit': this.handlers.portalExited(Boolean(message.respawned)); break;
        case 'room_announcement': this.handlers.announcement(String(message.message)); break;
        case 'big_catch': this.handlers.bigCatch(message as unknown as BigCatchEvent); break;
        case 'stone_picked': this.handlers.stonePicked(String(message.stoneId), String(message.playerId)); break;
        case 'stone_thrown': this.handlers.stoneThrown(message as unknown as Parameters<Handlers['stoneThrown']>[0]); break;
        case 'stone_landed': this.handlers.stoneLanded(message as unknown as Parameters<Handlers['stoneLanded']>[0]); break;
        case 'stone_respawn': this.handlers.stoneRespawn(message as unknown as Parameters<Handlers['stoneRespawn']>[0]); break;
        case 'stone_hit': this.handlers.stoneHit(String(message.playerId), Boolean(message.fishingCancelled)); break;
        case 'chicken_hit': this.handlers.chickenHit(message as unknown as Parameters<Handlers['chickenHit']>[0]); break;
        case 'chicken_state': this.handlers.chickenState(message.chickens as ChickenSnapshot[], Number(message.serverTime) || Date.now()); break;
        case 'chat': this.handlers.chat(message.message as Parameters<Handlers['chat']>[0]); break;
        case 'inventory_sync': this.handlers.inventorySync(message.items as InventoryItem[], Number(message.totalCaught) || 0, message.personalBest as InventoryItem | null, message.collection as InventoryItem[] ?? []); break;
        case 'inventory_add': this.handlers.inventoryAdd(message.item as InventoryItem); break;
        case 'inventory_remove': this.handlers.inventoryRemove(String(message.catchId)); break;
        case 'player_holding': this.handlers.playerHolding(String(message.playerId), message.fish as HeldFish | null); break;
        case 'campfire_cooking': this.handlers.campfireCooking(message.cooking as CampfireCooking); break;
        case 'campfire_cooked': this.handlers.campfireCooked(message as unknown as CampfireCookedEvent); break;
        case 'weather:update': this.handlers.weatherChanged(message.weather as WeatherSnapshot); break;
      }
  }

  diagnostics(): NetDiagnostics {
    const now = Date.now();
    this.snapshotTimes = this.snapshotTimes.filter((at) => now - at <= 1000);
    const oneWayLatencyMs = this.rttMs === null ? 0 : Math.min(150, this.rttMs / 2);
    const interpolationDelayMs = Math.max(FISH_CONFIG.sync.interpolationDelayMinMs,
      Math.min(FISH_CONFIG.sync.interpolationDelayMaxMs,
        FISH_CONFIG.sync.interpolationIntervals * this.snapshotIntervalMs + this.snapshotJitterMs + oneWayLatencyMs));
    return {
      rttMs: this.rttMs,
      jitterMs: this.jitterMs,
      snapshotsPerSecond: this.snapshotTimes.length,
      interpolationDelayMs,
      droppedSimulatedMessages: this.droppedSimulatedMessages,
      bufferedAmount: this.socket?.bufferedAmount ?? 0,
      simulation: this.simulation,
    };
  }

  private readSimulation(): NetDiagnostics['simulation'] {
    const params = new URLSearchParams(location.search);
    if (!import.meta.env.DEV) return { lagMs: 0, jitterMs: 0, lossPercent: 0 };
    const read = (key: string) => Math.max(0, Number(params.get(key)) || 0);
    return { lagMs: read('lag'), jitterMs: read('jitter'), lossPercent: Math.min(100, read('loss')) };
  }

  private simulatedDelay(): number {
    const variation = (Math.random() * 2 - 1) * this.simulation.jitterMs;
    return Math.max(0, this.simulation.lagMs + variation);
  }

  private shouldDrop(type: string, direction: 'send' | 'receive'): boolean {
    if (!this.simulation.lossPercent) return false;
    // Simulate lossy movement/snapshot delivery; preserve transactional join/fish/chat messages.
    const eligible = direction === 'send' ? type === 'move' : type === 'state';
    if (eligible && Math.random() * 100 < this.simulation.lossPercent) {
      this.droppedSimulatedMessages += 1;
      return true;
    }
    return false;
  }

  sendMove(seq: number, x: number, z: number, rotY: number, moving: boolean, t: number, inPhotobooth = false): void {
    this.send({ type: 'move', seq, x, z, rotY, moving, t, rttMs: this.rttMs ?? 0, inPhotobooth });
  }
  sendSpeaking(speaking: boolean): void { this.send({ type: 'speaking', speaking }); }
  castFish(targetX: number, targetZ: number): void { this.send({ type: 'fish_cast', targetX, targetZ }); }
  startReel(): void { this.send({ type: 'reel_start', rttMs: this.rttMs ?? 0 }); }
  endReel(success: boolean): void { this.send({ type: 'reel_end', success }); }
  cancelFishing(): void { this.send({ type: 'fish_cancel' }); }
  sendChat(text: string): void { this.send({ type: 'chat', text }); }
  enqueueJukebox(videoId: string): boolean {
    if (this.socket?.readyState !== WebSocket.OPEN) return false;
    this.send({ type: 'jukebox:enqueue', videoId });
    return true;
  }
  skipJukebox(): void { this.send({ type: 'jukebox:skip' }); }
  jukeboxEnded(videoId: string): void { this.send({ type: 'jukebox:ended', videoId }); }
  jukeboxFailed(videoId: string): void { this.send({ type: 'jukebox:failed', videoId }); }
  startTheater(mode: 'screen' | 'pdf'): void { this.send({ type: 'theater:start', mode }); }
  stopTheater(): void { this.send({ type: 'theater:stop' }); }
  setTheaterPage(currentPage: number): void { this.send({ type: 'theater:page', currentPage }); }
  setTheaterFreeBrowse(freeBrowse: boolean): void { this.send({ type: 'theater:freeBrowse', freeBrowse }); }
  setTheaterPdf(pdfUrl: string): void { this.send({ type: 'theater:file', pdfUrl }); }
  theaterSignal(targetId: string, signalType: 'viewer' | 'offer' | 'answer' | 'ice', payload?: RTCSessionDescriptionInit | RTCIceCandidateInit): void {
    this.send({ type: 'theater:signal', targetId, signalType, payload });
  }
  sitAtSeat(seatId: string): void { this.send({ type: 'seat:sit', seatId }); }
  standFromSeat(): void { this.send({ type: 'seat:stand' }); }
  async uploadTheaterPdf(room: string, resumeToken: string, file: File): Promise<string> {
    const response = await fetch(`/api/theater/upload?room=${encodeURIComponent(room)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/pdf', Authorization: `Bearer ${resumeToken}` },
      body: file,
    });
    const result = await response.json() as { url?: string; error?: string };
    if (!response.ok || !result.url) throw new Error(result.error ?? 'The PDF upload failed.');
    return result.url;
  }
  pickStone(stoneId: string): void { this.send({ type: 'stone_pickup', stoneId }); }
  throwStone(): void { this.send({ type: 'stone_throw' }); }
  setDebugWeather(weatherType: WeatherType): void { this.send({ type: 'weather:debug', weatherType }); }
  releaseFish(catchId: string): void { this.send({ type: 'inventory_release', catchId }); }
  holdFish(catchId: string | null): void { this.send({ type: 'hold_fish', catchId }); }
  cookFish(catchId: string): void { this.send({ type: 'campfire_cook', catchId }); }
  createArenaParty(): void { this.send({ type: 'arenaPartyCreate' }); }
  inviteArenaPartyPlayer(playerId: string): void { this.send({ type: 'arenaPartyInvite', playerId }); }
  respondArenaPartyInvite(partyId: string, accept: boolean): void { this.send({ type: 'arenaPartyRespond', partyId, accept }); }
  leaveArenaParty(): void { this.send({ type: 'arenaPartyLeave' }); }
  startArenaParty(): void { this.send({ type: 'arenaPartyStart' }); }
  moveArena(x: number, z: number, facing: number): void { this.send({ type: 'arenaMove', x, z, facing }); }
  arenaStoneAction(): void { this.send({ type: 'arenaStoneAction' }); }
  leaveArena(): void { this.send({ type: 'arenaLeave' }); }
  restartArena(): void { this.send({ type: 'arenaRestart' }); }
  close(): void {
    this.intentionalClose = true;
    window.clearInterval(this.pingTimer);
    for (const timer of this.scheduledTimers) window.clearTimeout(timer);
    this.scheduledTimers.clear();
    this.pendingMoveTimer = 0;
    this.pendingMovePayload = null;
    this.socket?.close();
  }
  private send(message: object): void {
    const socket = this.socket;
    if (socket?.readyState !== WebSocket.OPEN) return;
    const payload = JSON.stringify(message);
    let type = '';
    try { type = String((JSON.parse(payload) as Record<string, unknown>).type ?? ''); } catch { /* internal messages are JSON */ }
    if (this.shouldDrop(type, 'send')) return;
    if (type === 'move') {
      this.pendingMovePayload = payload;
      if (this.pendingMoveTimer) return;
      this.scheduleMoveSend(this.simulatedDelay());
      return;
    }
    const timer = window.setTimeout(() => {
      this.scheduledTimers.delete(timer);
      if (socket.readyState === WebSocket.OPEN) socket.send(payload);
    }, this.simulatedDelay());
    this.scheduledTimers.add(timer);
  }

  private scheduleMoveSend(delayMs: number): void {
    const socket = this.socket;
    if (!socket) return;
    const timer = window.setTimeout(() => {
      this.scheduledTimers.delete(timer);
      this.pendingMoveTimer = 0;
      const latest = this.pendingMovePayload;
      if (!latest || socket.readyState !== WebSocket.OPEN) { this.pendingMovePayload = null; return; }
      if (socket.bufferedAmount > FISH_CONFIG.sync.maxBufferedMovementBytes) {
        this.scheduleMoveSend(50);
        return;
      }
      this.pendingMovePayload = null;
      socket.send(latest);
    }, delayMs);
    this.pendingMoveTimer = timer;
    this.scheduledTimers.add(timer);
  }
}
