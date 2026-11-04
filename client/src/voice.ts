import {
  createLocalAudioTrack,
  Room,
  RoomEvent,
  Track,
  type LocalAudioTrack,
  type Participant,
  type RemoteAudioTrack,
  type RemoteParticipant,
} from 'livekit-client';

export const VOICE_SPATIAL_CONFIG = {
  distanceModel: 'linear' as DistanceModelType,
  refDistance: 3,
  maxDistance: 25,
  rolloffFactor: 1,
  hearingRange: 25,
  subscribeRange: 35,
  subscribeHysteresis: 3,
  updateIntervalMs: 100,
  smoothingSeconds: 0.08,
  tokenRefreshMs: 8 * 60 * 1000,
};

export type VoiceConnectionStatus = 'off' | 'connecting' | 'connected' | 'failed';
export interface VoicePlayerPosition { id: string; x: number; z: number; facing: number; local: boolean }

type SpatialTrack = {
  source: MediaStreamAudioSourceNode;
  panner: PannerNode;
  gain: GainNode;
};

type VoiceCallbacks = {
  status: (status: VoiceConnectionStatus, message?: string) => void;
  microphone: (enabled: boolean) => void;
  speaking: (playerId: string, speaking: boolean) => void;
  mutedPlayersChanged: () => void;
};

type TokenResponse = { token: string; url: string; expiresInSeconds?: number };

export class VoiceClient {
  private room: Room | null = null;
  private localTrack: LocalAudioTrack | null = null;
  private audioContext: AudioContext | null = null;
  private readonly spatialTracks = new Map<string, SpatialTrack>();
  private readonly subscriptions = new Map<string, boolean>();
  private readonly mutedPlayers = new Set<string>();
  private readonly speakingPlayers = new Set<string>();
  private active = false;
  private microphoneEnabled = false;
  private pushToTalk = false;
  private pushToTalkHeld = false;
  private masterVolume = Number(localStorage.getItem('mengai:voice-volume') ?? 0.8);
  private lastSpatialUpdate = 0;
  private tokenRefreshTimer = 0;
  private reconnectTimer = 0;
  private reconnectAttempts = 0;
  private playerId = '';
  private gameRoomId = '';
  private resumeToken = '';
  private status: VoiceConnectionStatus = 'off';
  private cachedCredentials: TokenResponse | null = null;
  private cachedCredentialsExpireAt = 0;

  constructor(private readonly callbacks: VoiceCallbacks) {
    this.masterVolume = Number.isFinite(this.masterVolume) ? Math.max(0, Math.min(1, this.masterVolume)) : 0.8;
    this.pushToTalk = localStorage.getItem('mengai:voice-ptt') === '1';
    try {
      for (const id of JSON.parse(localStorage.getItem('mengai:voice-muted-players') ?? '[]') as unknown[]) {
        if (typeof id === 'string') this.mutedPlayers.add(id);
      }
    } catch { /* discard invalid local preferences */ }
  }

  get connectionStatus(): VoiceConnectionStatus { return this.status; }
  get isEnabled(): boolean { return this.active; }
  get isMicrophoneEnabled(): boolean { return this.microphoneEnabled; }
  get isPushToTalk(): boolean { return this.pushToTalk; }
  get volume(): number { return this.masterVolume; }

  setSession(roomId: string, playerId: string, resumeToken: string): void {
    this.gameRoomId = roomId;
    this.playerId = playerId;
    this.resumeToken = resumeToken;
  }

  async enable(roomId: string, playerId: string, resumeToken: string): Promise<void> {
    if (this.active) return;
    if (!window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      this.setStatus('failed', 'Voice chat needs HTTPS.');
      return;
    }
    this.active = true;
    this.setSession(roomId, playerId, resumeToken);
    this.setStatus('connecting');
    try {
      await this.resumeAudioContext();
      if (!this.localTrack) {
        this.localTrack = await createLocalAudioTrack({ echoCancellation: true, noiseSuppression: true, autoGainControl: true });
      }
      this.microphoneEnabled = !this.pushToTalk || this.pushToTalkHeld;
      await this.applyMicrophoneState();
      await this.connectRoom();
      this.startTokenRefresh();
      this.callbacks.microphone(this.microphoneEnabled);
    } catch (error) {
      this.active = false;
      this.microphoneEnabled = false;
      const room = this.room;
      this.room = null;
      if (room) await room.disconnect().catch(() => undefined);
      this.disposeRoomAudio();
      this.localTrack?.stop();
      this.localTrack = null;
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = 0;
      this.setStatus('failed', this.isPermissionError(error)
        ? 'Microphone access was blocked. Allow microphone access in your browser settings, then try again.'
        : 'Voice could not connect. Check your connection and try again.');
      this.callbacks.microphone(false);
    }
  }

  async toggleMicrophone(): Promise<void> {
    if (!this.active) return;
    if (this.pushToTalk) return;
    await this.setMicrophoneEnabled(!this.microphoneEnabled);
  }

  async setPushToTalk(enabled: boolean): Promise<void> {
    if (this.pushToTalk === enabled) return;
    this.pushToTalk = enabled;
    localStorage.setItem('mengai:voice-ptt', enabled ? '1' : '0');
    if (enabled) await this.setMicrophoneEnabled(this.pushToTalkHeld);
    else if (this.active) await this.setMicrophoneEnabled(true);
    this.callbacks.microphone(this.microphoneEnabled);
  }

  async setPushToTalkHeld(held: boolean): Promise<void> {
    this.pushToTalkHeld = held;
    if (!this.pushToTalk) return;
    if (held && !this.active) {
      await this.enable(this.gameRoomId, this.playerId, this.resumeToken);
      return;
    }
    if (this.active) await this.setMicrophoneEnabled(held);
  }

  async setMicrophoneEnabled(enabled: boolean): Promise<void> {
    if (!this.active || !this.localTrack || this.microphoneEnabled === enabled) return;
    this.microphoneEnabled = enabled;
    await this.applyMicrophoneState();
    this.callbacks.microphone(this.microphoneEnabled);
  }

  private async applyMicrophoneState(): Promise<void> {
    if (!this.localTrack) return;
    if (this.microphoneEnabled) await this.localTrack.unmute();
    else await this.localTrack.mute();
  }

  private async resumeAudioContext(): Promise<void> {
    if (!this.audioContext || this.audioContext.state === 'closed') this.audioContext = new AudioContext();
    const context = this.audioContext;
    if (context.state === 'running') return;
    try {
      await context.resume();
    } catch (error) {
      if (context.state !== 'closed') throw error;
      const replacement = new AudioContext();
      this.audioContext = replacement;
      if (replacement.state !== 'running') await replacement.resume();
    }
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('mengai:voice-volume', String(this.masterVolume));
    this.updateGains();
  }

  isPlayerMuted(playerId: string): boolean { return this.mutedPlayers.has(playerId); }

  setPlayerMuted(playerId: string, muted: boolean): void {
    if (muted) this.mutedPlayers.add(playerId);
    else this.mutedPlayers.delete(playerId);
    localStorage.setItem('mengai:voice-muted-players', JSON.stringify([...this.mutedPlayers]));
    this.updateGains();
    this.callbacks.mutedPlayersChanged();
  }

  removeGamePlayer(playerId: string): void {
    this.disconnectSpatialTrack(playerId);
    const participant = this.room?.remoteParticipants.get(playerId);
    if (participant) this.setParticipantSubscribed(participant, false);
    this.subscriptions.delete(playerId);
    this.updateSpeaking(playerId, false);
    this.callbacks.mutedPlayersChanged();
  }

  updateSpatialAudio(players: VoicePlayerPosition[], selfId: string, now = performance.now()): void {
    if (!this.active || now - this.lastSpatialUpdate < VOICE_SPATIAL_CONFIG.updateIntervalMs) return;
    this.lastSpatialUpdate = now;
    const context = this.audioContext;
    if (!context || context.state !== 'running') return;
    const byId = new Map(players.map((player) => [player.id, player]));
    this.lastPositions = byId;
    const local = byId.get(selfId);
    if (!local) return;
    const localX = local.x, localZ = local.z;

    const listener = context.listener;
    const time = context.currentTime;
    this.setAudioPosition(listener, localX, 1.6, localZ, time);
    this.setAudioOrientation(listener, Math.sin(local.facing), 0, Math.cos(local.facing), time);

    for (const participant of this.room?.remoteParticipants.values() ?? []) {
      const player = byId.get(participant.identity);
      const distance = player ? Math.hypot(player.x - localX, player.z - localZ) : Number.POSITIVE_INFINITY;
      const wasSubscribed = this.subscriptions.get(participant.identity) ?? false;
      const subscribe = wasSubscribed
        ? distance < VOICE_SPATIAL_CONFIG.subscribeRange + VOICE_SPATIAL_CONFIG.subscribeHysteresis
        : distance <= VOICE_SPATIAL_CONFIG.subscribeRange - VOICE_SPATIAL_CONFIG.subscribeHysteresis;
      if (subscribe !== wasSubscribed) this.setParticipantSubscribed(participant, subscribe);

      const audio = this.spatialTracks.get(participant.identity);
      if (audio && player) {
        this.setAudioPosition(audio.panner, player.x, 1.4, player.z, time);
        const beyondHearing = distance > VOICE_SPATIAL_CONFIG.maxDistance;
        this.setAudioParam(audio.gain.gain, beyondHearing || this.mutedPlayers.has(participant.identity) ? 0 : this.masterVolume, time);
      }
      this.updateSpeaking(participant.identity, participant.isSpeaking && distance <= VOICE_SPATIAL_CONFIG.hearingRange);
    }
    const localParticipant = this.room?.localParticipant;
    this.updateSpeaking(selfId, Boolean(localParticipant?.isSpeaking));
    this.updateGains();
  }

  private setAudioPosition(node: AudioListener | PannerNode, x: number, y: number, z: number, time: number): void {
    if (node.positionX && node.positionY && node.positionZ) {
      this.setAudioParam(node.positionX, x, time);
      this.setAudioParam(node.positionY, y, time);
      this.setAudioParam(node.positionZ, z, time);
    } else node.setPosition(x, y, z);
  }

  private setAudioOrientation(listener: AudioListener, forwardX: number, forwardY: number, forwardZ: number, time: number): void {
    if (listener.forwardX && listener.forwardY && listener.forwardZ && listener.upX && listener.upY && listener.upZ) {
      this.setAudioParam(listener.forwardX, forwardX, time);
      this.setAudioParam(listener.forwardY, forwardY, time);
      this.setAudioParam(listener.forwardZ, forwardZ, time);
      this.setAudioParam(listener.upX, 0, time);
      this.setAudioParam(listener.upY, 1, time);
      this.setAudioParam(listener.upZ, 0, time);
    } else listener.setOrientation(forwardX, forwardY, forwardZ, 0, 1, 0);
  }

  private setAudioParam(param: AudioParam | null | undefined, value: number, time: number): void {
    if (!param || typeof param.cancelScheduledValues !== 'function') return;
    param.cancelScheduledValues(time);
    if (typeof param.setTargetAtTime === 'function') param.setTargetAtTime(value, time, VOICE_SPATIAL_CONFIG.smoothingSeconds);
    else param.setValueAtTime(value, time);
  }

  private updateGains(): void {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    for (const [playerId, spatial] of this.spatialTracks) {
      const player = this.lastPositions.get(playerId);
      const local = this.lastPositions.get(this.playerId);
      const beyond = !player || !local || Math.hypot(player.x - local.x, player.z - local.z) > VOICE_SPATIAL_CONFIG.maxDistance;
      const target = beyond || this.mutedPlayers.has(playerId) ? 0 : this.masterVolume;
      this.setAudioParam(spatial.gain.gain, target, now);
    }
  }

  private lastPositions = new Map<string, VoicePlayerPosition>();

  private updateSpeaking(playerId: string, speaking: boolean): void {
    if (speaking === this.speakingPlayers.has(playerId)) return;
    if (speaking) this.speakingPlayers.add(playerId);
    else this.speakingPlayers.delete(playerId);
    this.callbacks.speaking(playerId, speaking);
  }

  private setParticipantSubscribed(participant: RemoteParticipant, subscribed: boolean): void {
    this.subscriptions.set(participant.identity, subscribed);
    for (const publication of participant.trackPublications.values()) {
      if (publication.kind === Track.Kind.Audio) publication.setSubscribed(subscribed);
    }
  }

  private async connectRoom(): Promise<void> {
    if (!this.active || !this.localTrack) return;
    this.setStatus('connecting');
    const credentials = this.cachedCredentials && this.cachedCredentialsExpireAt > Date.now() + 60_000
      ? this.cachedCredentials
      : await this.fetchToken();
    if (!this.active) return;
    const room = new Room({ adaptiveStream: false, dynacast: false, stopLocalTrackOnUnpublish: false });
    this.room = room;
    room.on(RoomEvent.ConnectionStateChanged, (state) => {
      if (this.room !== room || !this.active) return;
      if (state === 'connected') {
        this.reconnectAttempts = 0;
        this.setStatus('connected');
      } else if (state === 'connecting' || state === 'reconnecting') this.setStatus('connecting');
    });
    room.on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
      this.speakingPlayers.clear();
      for (const participant of speakers) if (participant.isSpeaking) this.speakingPlayers.add(participant.identity);
      this.refreshSpeakingFromPositions();
    });
    room.on(RoomEvent.TrackSubscribed, (track, _publication, participant) => {
      if (track.kind === Track.Kind.Audio) this.connectSpatialTrack(participant.identity, track as RemoteAudioTrack);
    });
    room.on(RoomEvent.TrackUnsubscribed, (_track, _publication, participant) => this.disconnectSpatialTrack(participant.identity));
    room.on(RoomEvent.ParticipantDisconnected, (participant) => {
      this.disconnectSpatialTrack(participant.identity);
      this.subscriptions.delete(participant.identity);
      this.updateSpeaking(participant.identity, false);
    });
    room.on(RoomEvent.TrackPublished, (_publication, participant) => {
      this.setParticipantSubscribed(participant as RemoteParticipant, this.shouldSubscribe(participant.identity));
    });
    room.on(RoomEvent.Disconnected, () => {
      if (this.room !== room || !this.active) return;
      this.room = null;
      this.disposeRoomAudio();
      this.scheduleReconnect();
    });

    await room.connect(credentials.url, credentials.token, { autoSubscribe: false });
    if (!this.active || this.room !== room) { await room.disconnect(); return; }
    await room.localParticipant.publishTrack(this.localTrack, { source: Track.Source.Microphone });
    this.setStatus('connected');
    for (const participant of room.remoteParticipants.values()) {
      this.subscriptions.set(participant.identity, false);
      this.setParticipantSubscribed(participant, this.shouldSubscribe(participant.identity));
    }
  }

  private shouldSubscribe(identity: string): boolean {
    const target = this.lastPositions.get(identity), local = this.lastPositions.get(this.playerId);
    if (!target || !local) return false;
    const previous = this.subscriptions.get(identity) ?? false;
    const distance = Math.hypot(target.x - local.x, target.z - local.z);
    return previous
      ? distance < VOICE_SPATIAL_CONFIG.subscribeRange + VOICE_SPATIAL_CONFIG.subscribeHysteresis
      : distance <= VOICE_SPATIAL_CONFIG.subscribeRange - VOICE_SPATIAL_CONFIG.subscribeHysteresis;
  }

  private connectSpatialTrack(identity: string, track: RemoteAudioTrack): void {
    if (!this.audioContext || this.spatialTracks.has(identity)) return;
    const source = this.audioContext.createMediaStreamSource(new MediaStream([track.mediaStreamTrack]));
    const panner = this.audioContext.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = VOICE_SPATIAL_CONFIG.distanceModel;
    panner.refDistance = VOICE_SPATIAL_CONFIG.refDistance;
    panner.maxDistance = VOICE_SPATIAL_CONFIG.maxDistance;
    panner.rolloffFactor = VOICE_SPATIAL_CONFIG.rolloffFactor;
    const gain = this.audioContext.createGain();
    gain.gain.value = 0;
    source.connect(panner).connect(gain).connect(this.audioContext.destination);
    this.spatialTracks.set(identity, { source, panner, gain });
    this.updateGains();
  }

  private disconnectSpatialTrack(identity: string): void {
    const audio = this.spatialTracks.get(identity);
    if (!audio) return;
    audio.source.disconnect();
    audio.panner.disconnect();
    audio.gain.disconnect();
    this.spatialTracks.delete(identity);
    this.updateSpeaking(identity, false);
  }

  private disposeRoomAudio(): void {
    for (const identity of this.spatialTracks.keys()) this.disconnectSpatialTrack(identity);
    this.subscriptions.clear();
    for (const id of this.speakingPlayers) this.updateSpeaking(id, false);
  }

  private refreshSpeakingFromPositions(): void {
    const local = this.lastPositions.get(this.playerId);
    for (const participant of this.room?.remoteParticipants.values() ?? []) {
      const player = this.lastPositions.get(participant.identity);
      const distance = player && local ? Math.hypot(player.x - local.x, player.z - local.z) : Number.POSITIVE_INFINITY;
      this.updateSpeaking(participant.identity, participant.isSpeaking && distance <= VOICE_SPATIAL_CONFIG.hearingRange);
    }
    this.updateSpeaking(this.playerId, Boolean(this.room?.localParticipant.isSpeaking));
  }

  private async fetchToken(): Promise<TokenResponse> {
    const query = new URLSearchParams({ room: this.gameRoomId, playerId: this.playerId });
    const response = await fetch(`/voice-token?${query}`, { headers: { Authorization: `Bearer ${this.resumeToken}` }, cache: 'no-store' });
    const body = await response.json() as TokenResponse & { error?: string };
    if (!response.ok || !body.token || !body.url) throw new Error(body.error ?? 'Voice token request failed.');
    this.cachedCredentials = body;
    this.cachedCredentialsExpireAt = Date.now() + Math.max(60, body.expiresInSeconds ?? 600) * 1000;
    return body;
  }

  private startTokenRefresh(): void {
    window.clearInterval(this.tokenRefreshTimer);
    this.tokenRefreshTimer = window.setInterval(() => {
      if (!this.active) return;
      void this.fetchToken().catch(() => { /* Keep the active LiveKit session; a reconnect will request a fresh token. */ });
    }, VOICE_SPATIAL_CONFIG.tokenRefreshMs);
  }

  private scheduleReconnect(): void {
    if (!this.active || this.reconnectTimer) return;
    const delay = Math.min(15_000, 1000 * 2 ** Math.min(this.reconnectAttempts++, 4));
    this.setStatus('connecting');
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = 0;
      void this.connectRoom().catch((error: unknown) => {
        if (!this.active) return;
        if (this.reconnectAttempts >= 5) {
          this.failReconnect();
          return;
        }
        this.scheduleReconnect();
        console.warn('[voice] Reconnect attempt failed:', error);
      });
    }, delay);
  }

  private failReconnect(): void {
    this.active = false;
    this.microphoneEnabled = false;
    window.clearTimeout(this.reconnectTimer);
    window.clearInterval(this.tokenRefreshTimer);
    this.reconnectTimer = 0;
    this.tokenRefreshTimer = 0;
    this.localTrack?.stop();
    this.localTrack = null;
    this.disposeRoomAudio();
    this.callbacks.microphone(false);
    this.setStatus('failed', 'Voice connection lost. Tap the mic to try again.');
  }

  async disconnect(): Promise<void> {
    this.active = false;
    this.microphoneEnabled = false;
    this.pushToTalkHeld = false;
    window.clearInterval(this.tokenRefreshTimer);
    window.clearTimeout(this.reconnectTimer);
    this.tokenRefreshTimer = 0;
    this.reconnectTimer = 0;
    const room = this.room;
    this.room = null;
    if (room) await room.disconnect();
    this.disposeRoomAudio();
    this.localTrack?.stop();
    this.localTrack = null;
    this.cachedCredentials = null;
    this.cachedCredentialsExpireAt = 0;
    this.callbacks.microphone(false);
    this.setStatus('off');
  }

  private isPermissionError(error: unknown): boolean {
    return error instanceof DOMException && ['NotAllowedError', 'PermissionDeniedError', 'SecurityError'].includes(error.name);
  }

  private setStatus(status: VoiceConnectionStatus, message?: string): void {
    this.status = status;
    this.callbacks.status(status, message);
  }
}
