export class BowlingAudio {
  private context: AudioContext | null = null;
  private noise: AudioBuffer | null = null;

  resume(): void {
    try {
      this.context ??= new AudioContext();
      if (this.context.state === 'suspended') void this.context.resume();
    } catch { /* Audio may be unavailable. */ }
  }

  roll(): void {
    this.playNoise(0.55, 140, 0.055);
  }

  crash(strength = 1): void {
    this.playNoise(0.3, 520 + strength * 380, 0.16);
    this.playTone(92, 0.2, 0.09, 'triangle');
    this.playTone(146, 0.16, 0.06, 'square');
  }

  strike(): void {
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.playTone(frequency, 0.25, 0.08, 'sine', index * 0.075);
    });
  }

  spare(): void {
    this.playTone(587.33, 0.2, 0.07, 'sine');
    this.playTone(783.99, 0.28, 0.07, 'sine', 0.1);
  }

  gutter(): void {
    this.playTone(118, 0.36, 0.055, 'sawtooth');
    this.playTone(82, 0.42, 0.05, 'triangle', 0.05);
  }

  private getNoiseBuffer(context: AudioContext): AudioBuffer {
    if (this.noise) return this.noise;
    const buffer = context.createBuffer(1, context.sampleRate * 0.5, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index++) data[index] = Math.random() * 2 - 1;
    this.noise = buffer;
    return buffer;
  }

  private playNoise(duration: number, frequency: number, gainValue: number): void {
    const context = this.ensureContext();
    if (!context) return;
    try {
      const source = context.createBufferSource();
      source.buffer = this.getNoiseBuffer(context);
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = frequency;
      filter.Q.value = 0.8;
      const gain = context.createGain();
      const now = context.currentTime;
      gain.gain.setValueAtTime(gainValue, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start(now);
      source.stop(now + duration);
    } catch { /* Ignore unavailable audio. */ }
  }

  private playTone(frequency: number, duration: number, gainValue: number, type: OscillatorType, delay = 0): void {
    const context = this.ensureContext();
    if (!context) return;
    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + delay;
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.02);
    } catch { /* Ignore unavailable audio. */ }
  }

  private ensureContext(): AudioContext | null {
    try {
      this.context ??= new AudioContext();
      if (this.context.state === 'suspended') void this.context.resume();
      return this.context;
    } catch {
      return null;
    }
  }
}
