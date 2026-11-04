export const MUSIC_TRACKS = {
  day: { files: ['/audio/music/day.ogg', '/audio/music/day.mp3'], roots: [146.83, 174.61, 196, 164.81], mood: 'warm' },
  rain: { files: ['/audio/music/rain.ogg', '/audio/music/rain.mp3'], roots: [130.81, 146.83, 164.81, 146.83], mood: 'soft' },
  night: { files: ['/audio/music/night.ogg', '/audio/music/night.mp3'], roots: [110, 130.81, 146.83, 123.47], mood: 'deep' },
  boss: { files: ['/audio/music/boss.ogg', '/audio/music/boss.mp3'], roots: [98, 110, 130.81, 116.54], mood: 'tense' },
} as const;

export type MusicTrackId = keyof typeof MUSIC_TRACKS;

type PlayingTrack = {
  source: AudioBufferSourceNode;
  gain: GainNode;
  stopTimer: number;
  fadeId: number;
};

const VOLUME_KEY = 'mengai:music-volume';
const MUTED_KEY = 'mengai:music-muted';
const TRACK_IDS = Object.keys(MUSIC_TRACKS) as MusicTrackId[];

function clampVolume(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.25;
}

export class MusicManager {
  private context: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private duckGain: GainNode | null = null;
  private effectsGain: GainNode | null = null;
  private readonly buffers = new Map<MusicTrackId, Promise<AudioBuffer>>();
  private readonly playing = new Map<MusicTrackId, PlayingTrack>();
  private volume = clampVolume(Number(localStorage.getItem(VOLUME_KEY) ?? 0.25));
  private muted = localStorage.getItem(MUTED_KEY) === 'true';
  private desiredTrack: MusicTrackId | null = null;
  private switchId = 0;
  private hasStarted = false;
  private ducked = false;
  private duckRestoreTimer = 0;

  constructor() {
    document.addEventListener('visibilitychange', () => this.setPageHidden(document.hidden));
  }

  get currentVolume(): number { return this.volume; }
  get isMuted(): boolean { return this.muted; }

  /** Separate output for effects so music volume and ducking never affect them. */
  get sfxOutput(): GainNode {
    this.ensureGraph();
    return this.effectsGain!;
  }

  /** Call directly from a user gesture to unlock audio before the server join completes. */
  unlock(): void {
    const context = this.ensureGraph();
    if (context.state === 'suspended' && !document.hidden) void context.resume().catch(() => undefined);
  }

  async play(trackId: MusicTrackId): Promise<void> {
    const firstStart = !this.hasStarted;
    this.hasStarted = true;
    await this.crossfadeTo(trackId, firstStart ? 2000 : 2500);
    if (firstStart) {
      for (const id of TRACK_IDS) if (id !== trackId) void this.loadTrack(id).catch(() => undefined);
    }
  }

  async crossfadeTo(trackId: MusicTrackId, ms: number): Promise<void> {
    const context = this.ensureGraph();
    if (context.state === 'suspended' && !document.hidden) {
      try { await context.resume(); } catch { return; }
    }
    if (this.desiredTrack === trackId && this.playing.has(trackId)) return;
    const switchId = ++this.switchId;
    let buffer: AudioBuffer;
    try { buffer = await this.loadTrack(trackId); }
    catch (error) { console.warn(`[music] Could not load ${trackId} music:`, error); return; }
    if (switchId !== this.switchId) return;

    let target = this.playing.get(trackId);
    if (!target) {
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      gain.gain.value = 0;
      source.connect(gain).connect(this.musicGain!);
      target = { source, gain, stopTimer: 0, fadeId: 0 };
      this.playing.set(trackId, target);
      source.start();
    }

    this.desiredTrack = trackId;
    for (const [id, playback] of this.playing) this.fadeTrack(id, playback, id === trackId ? 1 : 0, ms);
  }

  setVolume(value: number): void {
    this.volume = clampVolume(value);
    localStorage.setItem(VOLUME_KEY, String(this.volume));
    if (this.context && this.musicGain) this.ramp(this.musicGain.gain, this.muted ? 0 : this.volume, 45);
  }

  mute(muted: boolean): void {
    this.muted = muted;
    localStorage.setItem(MUTED_KEY, String(muted));
    if (this.context && this.musicGain) this.ramp(this.musicGain.gain, muted ? 0 : this.volume, 80);
  }

  duck(ducked: boolean): void {
    if (this.duckRestoreTimer) window.clearTimeout(this.duckRestoreTimer);
    this.duckRestoreTimer = 0;
    if (ducked) {
      this.ducked = true;
      if (this.context && this.duckGain) this.ramp(this.duckGain.gain, 0.4, 300);
      return;
    }
    this.ducked = false;
    this.duckRestoreTimer = window.setTimeout(() => {
      this.duckRestoreTimer = 0;
      if (!this.ducked && this.context && this.duckGain) this.ramp(this.duckGain.gain, 1, 800);
    }, 1000);
  }

  fadeOut(ms = 2000): void {
    this.desiredTrack = null;
    this.switchId++;
    for (const [id, playback] of this.playing) this.fadeTrack(id, playback, 0, ms);
  }

  private ensureGraph(): AudioContext {
    if (this.context) return this.context;
    const context = new AudioContext();
    const musicGain = context.createGain();
    const duckGain = context.createGain();
    const effectsGain = context.createGain();
    musicGain.gain.value = this.muted ? 0 : this.volume;
    duckGain.gain.value = this.ducked ? 0.4 : 1;
    effectsGain.gain.value = 1;
    musicGain.connect(duckGain).connect(context.destination);
    effectsGain.connect(context.destination);
    this.context = context;
    this.musicGain = musicGain;
    this.duckGain = duckGain;
    this.effectsGain = effectsGain;
    return context;
  }

  private ramp(param: AudioParam, target: number, ms: number): void {
    if (!this.context) return;
    const now = this.context.currentTime;
    param.cancelScheduledValues(now);
    param.setValueAtTime(param.value, now);
    if (ms <= 0) param.setValueAtTime(target, now);
    else param.linearRampToValueAtTime(target, now + ms / 1000);
  }

  private fadeTrack(id: MusicTrackId, playback: PlayingTrack, target: number, ms: number): void {
    const context = this.context;
    if (!context) return;
    window.clearTimeout(playback.stopTimer);
    playback.stopTimer = 0;
    const fadeId = ++playback.fadeId;
    this.ramp(playback.gain.gain, target, ms);
    if (target === 0) {
      playback.stopTimer = window.setTimeout(() => {
        if (playback.fadeId !== fadeId || this.playing.get(id) !== playback || this.desiredTrack === id) return;
        try { playback.source.stop(); } catch { /* already stopped */ }
        playback.source.disconnect();
        playback.gain.disconnect();
        this.playing.delete(id);
      }, Math.max(0, ms) + 50);
    }
  }

  private loadTrack(id: MusicTrackId): Promise<AudioBuffer> {
    const cached = this.buffers.get(id);
    if (cached) return cached;
    const context = this.ensureGraph();
    const load = this.fetchTrack(context, id).catch(() => this.createAmbientBuffer(context, id));
    this.buffers.set(id, load);
    return load;
  }

  private async fetchTrack(context: AudioContext, id: MusicTrackId): Promise<AudioBuffer> {
    for (const url of MUSIC_TRACKS[id].files) {
      try {
        const response = await fetch(url);
        if (!response.ok) continue;
        return await context.decodeAudioData(await response.arrayBuffer());
      } catch { /* try the MP3 fallback, then use the built-in ambient loop */ }
    }
    return this.createAmbientBuffer(context, id);
  }

  private createAmbientBuffer(context: AudioContext, id: MusicTrackId): AudioBuffer {
    const track = MUSIC_TRACKS[id];
    const sampleRate = 22050;
    const duration = 24;
    const frameCount = sampleRate * duration;
    const buffer = context.createBuffer(2, frameCount, sampleRate);
    const roots = track.roots;
    const minor = track.mood === 'deep' || track.mood === 'tense' || track.mood === 'soft';
    const ratios = minor ? [1, 1.2, 1.5, 2, 2.4] : [1, 1.25, 1.5, 2, 2.5];
    const amplitudes = [0.34, 0.22, 0.2, 0.14, 0.1];
    const chordDuration = duration / roots.length;
    const transitionDuration = 1.1;
    const frequencies = roots.map((root) => ratios.map((ratio) => Math.round(root * ratio * duration) / duration));

    for (let channel = 0; channel < 2; channel++) {
      const output = buffer.getChannelData(channel);
      const phaseOffset = channel * 0.035;
      for (let frame = 0; frame < frameCount; frame++) {
        const time = frame / sampleRate;
        const chord = Math.floor(time / chordDuration) % roots.length;
        const nextChord = (chord + 1) % roots.length;
        const chordTime = time % chordDuration;
        const blendStart = chordDuration - transitionDuration;
        const blendProgress = Math.max(0, Math.min(1, (chordTime - blendStart) / transitionDuration));
        const blend = blendProgress * blendProgress * (3 - 2 * blendProgress);
        const swell = 0.82 + 0.18 * Math.sin((time / 12) * Math.PI * 2);
        let sample = 0;
        for (let note = 0; note < ratios.length; note++) {
          const phase = (time * frequencies[chord][note] + phaseOffset) * Math.PI * 2;
          const nextPhase = (time * frequencies[nextChord][note] + phaseOffset) * Math.PI * 2;
          const currentTone = Math.sin(phase) * amplitudes[note];
          const nextTone = Math.sin(nextPhase) * amplitudes[note];
          sample += currentTone * (1 - blend) + nextTone * blend;
        }
        const motifPhase = (time % 6) / 6;
        if (motifPhase < 0.13) {
          const bellFade = Math.sin((motifPhase / 0.13) * Math.PI) ** 2;
          const bellFrequency = Math.round(roots[chord] * 4 * duration) / duration;
          sample += Math.sin((time * bellFrequency + phaseOffset) * Math.PI * 2) * bellFade * 0.12;
        }
        output[frame] = sample * swell * 0.18;
      }
    }
    return buffer;
  }

  private setPageHidden(hidden: boolean): void {
    if (!this.context) return;
    if (hidden && this.context.state === 'running') void this.context.suspend().catch(() => undefined);
    else if (!hidden && this.context.state === 'suspended') void this.context.resume().catch(() => undefined);
  }
}
