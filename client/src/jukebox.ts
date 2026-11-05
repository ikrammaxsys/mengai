import type { JukeboxCurrent, JukeboxTrack } from './network';
import { WORLD_CONFIG } from '../../shared/worldConfig';

export const JUKEBOX_AUDIO = {
  maxVolume: 0.38,
  volumeSmoothingSeconds: 0.25,
  resyncThresholdSeconds: 1.5,
} as const;

interface JukeboxCallbacks {
  pauseMovement: () => void;
  enqueue: (videoId: string) => boolean;
  skip: () => void;
  enqueueLibrary: (libraryId: string) => boolean;
  ended: (videoId: string) => void;
  failed: (videoId: string) => void;
  toast: (message: string) => void;
}

interface SearchResult extends Omit<JukeboxTrack, 'requesterId' | 'requestedBy' | 'status'> {}
interface LibraryTrack { id: string; title: string; durationSeconds: number }

function decodeHtml(text: string): string {
  const parsed = new DOMParser().parseFromString(text, 'text/html');
  return parsed.body.textContent ?? text;
}

function formatDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export class Jukebox {
  private readonly root: HTMLElement;
  private readonly modal: HTMLElement;
  private readonly card: HTMLElement;
  private readonly searchInput: HTMLInputElement;
  private readonly searchButton: HTMLButtonElement;
  private readonly clearButton: HTMLButtonElement;
  private readonly results: HTMLElement;
  private readonly resultsHint: HTMLElement;
  private readonly searchTab: HTMLButtonElement;
  private readonly libraryTab: HTMLButtonElement;
  private readonly searchPane: HTMLElement;
  private readonly libraryPane: HTMLElement;
  private readonly libraryStatus: HTMLElement;
  private readonly libraryEmpty: HTMLElement;
  private readonly libraryResults: HTMLElement;
  private readonly playerSlot: HTMLElement;
  private readonly playerEmpty: HTMLElement;
  private readonly nowThumbnail: HTMLImageElement;
  private readonly nowStatus: HTMLElement;
  private readonly audio: HTMLAudioElement;
  private readonly nowPlaying: HTMLElement;
  private readonly nowTitle: HTMLElement;
  private readonly nowChannel: HTMLElement;
  private readonly nowRequester: HTMLElement;
  private readonly progress: HTMLElement;
  private readonly currentTime: HTMLElement;
  private readonly totalTime: HTMLElement;
  private readonly queueList: HTMLElement;
  private readonly queueCount: HTMLElement;
  private readonly status: HTMLElement;
  private readonly volume: HTMLInputElement;
  private readonly volumeLabel: HTMLElement;
  private readonly volumeMute: HTMLButtonElement;
  private readonly skipButton: HTMLButtonElement;
  private readonly enablePlayback: HTMLButtonElement;
  private readonly modalToast: HTMLElement;
  private readonly callbacks: JukeboxCallbacks;
  private current: JukeboxCurrent | null = null;
  private queue: JukeboxTrack[] = [];
  private skipVotes = 0;
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private serverOffsetMs = 0;
  private distance = Infinity;
  private volumePercent = this.readSavedVolume();
  private muted = localStorage.getItem('mengai:jukebox-muted') === 'true';
  private debounceTimer = 0;
  private closeTimer = 0;
  private progressTimer = 0;
  private volumeTimer = 0;
  private toastTimer = 0;
  private lastSyncAt = 0;
  private searchSequence = 0;
  private searched = false;
  private lastQuery = '';
  private searchResults: SearchResult[] = [];
  private libraryTracks: LibraryTrack[] = [];
  private libraryLoaded = false;
  private libraryLoading = false;
  private readonly addedFeedback = new Map<string, number>();
  private targetVolume = 0;
  private appliedVolume = 0;
  private playRequestSequence = 0;

  constructor(root: HTMLElement, callbacks: JukeboxCallbacks) {
    this.root = root;
    this.callbacks = callbacks;
    this.modal = root.querySelector<HTMLElement>('#jukebox-modal')!;
    this.card = root.querySelector<HTMLElement>('.jukebox-card')!;
    this.searchInput = root.querySelector<HTMLInputElement>('#jukebox-search')!;
    this.searchButton = root.querySelector<HTMLButtonElement>('#jukebox-search-button')!;
    this.clearButton = root.querySelector<HTMLButtonElement>('#jukebox-clear')!;
    this.results = root.querySelector<HTMLElement>('#jukebox-results')!;
    this.resultsHint = root.querySelector<HTMLElement>('#jukebox-results-hint')!;
    this.searchTab = root.querySelector<HTMLButtonElement>('#jukebox-search-tab')!;
    this.libraryTab = root.querySelector<HTMLButtonElement>('#jukebox-library-tab')!;
    this.searchPane = root.querySelector<HTMLElement>('#jukebox-search-pane')!;
    this.libraryPane = root.querySelector<HTMLElement>('#jukebox-library-pane')!;
    this.libraryStatus = root.querySelector<HTMLElement>('#jukebox-library-status')!;
    this.libraryEmpty = root.querySelector<HTMLElement>('#jukebox-library-empty')!;
    this.libraryResults = root.querySelector<HTMLElement>('#jukebox-library-results')!;
    this.playerSlot = root.querySelector<HTMLElement>('#jukebox-player-slot')!;
    this.playerEmpty = root.querySelector<HTMLElement>('#jukebox-player-empty')!;
    this.nowThumbnail = root.querySelector<HTMLImageElement>('#jukebox-now-thumbnail')!;
    this.nowStatus = root.querySelector<HTMLElement>('#jukebox-track-status')!;
    this.nowPlaying = root.querySelector<HTMLElement>('#jukebox-now-playing')!;
    this.nowTitle = root.querySelector<HTMLElement>('#jukebox-now-title')!;
    this.nowChannel = root.querySelector<HTMLElement>('#jukebox-now-channel')!;
    this.nowRequester = root.querySelector<HTMLElement>('#jukebox-now-requester')!;
    this.progress = root.querySelector<HTMLElement>('#jukebox-progress')!;
    this.currentTime = root.querySelector<HTMLElement>('#jukebox-current-time')!;
    this.totalTime = root.querySelector<HTMLElement>('#jukebox-total-time')!;
    this.queueList = root.querySelector<HTMLElement>('#jukebox-queue')!;
    this.queueCount = root.querySelector<HTMLElement>('#jukebox-queue-count')!;
    this.status = root.querySelector<HTMLElement>('#jukebox-status')!;
    this.volume = root.querySelector<HTMLInputElement>('#jukebox-volume')!;
    this.volumeLabel = root.querySelector<HTMLElement>('#jukebox-volume-label')!;
    this.volumeMute = root.querySelector<HTMLButtonElement>('#jukebox-volume-mute')!;
    this.skipButton = root.querySelector<HTMLButtonElement>('#jukebox-skip')!;
    this.enablePlayback = root.querySelector<HTMLButtonElement>('#jukebox-enable-playback')!;
    this.modalToast = root.querySelector<HTMLElement>('#jukebox-toast')!;
    this.audio = document.createElement('audio');
    this.audio.preload = 'auto';
    this.audio.hidden = true;
    this.audio.crossOrigin = 'anonymous';
    this.audio.addEventListener('ended', () => {
      if (this.current?.status === 'playing') this.callbacks.ended(this.current.videoId);
    });
    this.audio.addEventListener('error', () => {
      if (!this.current || this.current.status !== 'playing') return;
      this.callbacks.failed(this.current.videoId);
      this.showError('This track could not be played. Skipping it.');
    });
    root.append(this.audio);
    this.volume.value = String(this.volumePercent / 100);
    this.updateVolumeLabel();
    this.updateMuteButton();
    this.showInitialHint();

    root.querySelector<HTMLButtonElement>('#jukebox-open')!.addEventListener('click', () => this.open());
    root.querySelector<HTMLButtonElement>('#jukebox-close')!.addEventListener('click', () => this.close());
    root.querySelector<HTMLElement>('.jukebox-backdrop')!.addEventListener('click', () => this.close());
    this.searchTab.addEventListener('click', () => this.selectTab(false));
    this.libraryTab.addEventListener('click', () => this.selectTab(true));
    this.modal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = [...this.modal.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]')]
        .filter((element) => !element.classList.contains('hidden'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    });
    root.querySelector<HTMLFormElement>('#jukebox-search-form')!.addEventListener('submit', (event) => {
      event.preventDefault();
      this.search();
    });
    this.searchInput.addEventListener('input', () => {
      this.clearButton.classList.toggle('hidden', this.searchInput.value.length === 0);
    });
    this.clearButton.addEventListener('click', () => {
      this.searchInput.value = '';
      this.clearButton.classList.add('hidden');
      this.searchInput.focus();
      this.showInitialHint();
    });
    this.status.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('#jukebox-retry')) this.search(this.lastQuery);
    });
    this.skipButton.addEventListener('click', () => this.callbacks.skip());
    this.volume.addEventListener('input', () => {
      this.volumePercent = Math.round(Number(this.volume.value) * 100);
      this.muted = false;
      localStorage.setItem('mengai:jukebox-volume', String(this.volumePercent));
      localStorage.setItem('mengai:jukebox-muted', 'false');
      this.updateVolumeLabel();
      this.updateMuteButton();
      this.updateVolume();
    });
    this.volumeMute.addEventListener('click', () => {
      this.muted = !this.muted;
      localStorage.setItem('mengai:jukebox-muted', String(this.muted));
      this.updateMuteButton();
      this.updateVolume();
    });
    this.enablePlayback.addEventListener('click', () => {
      void this.playCurrent();
      this.enablePlayback.classList.add('hidden');
    });
    this.progressTimer = window.setInterval(() => this.updateProgress(), 500);
    this.volumeTimer = window.setInterval(() => this.applySmoothedVolume(), 100);
  }

  get isOpen(): boolean { return !this.modal.classList.contains('hidden'); }

  get isAudible(): boolean {
    return this.current?.status === 'playing' && !this.audio.paused && this.distance < WORLD_CONFIG.jukebox.hearingRadius && this.volumePercent > 0 && !this.muted;
  }

  open(): void {
    window.clearTimeout(this.closeTimer);
    this.modal.classList.remove('hidden', 'is-closing');
    this.callbacks.pauseMovement();
    this.enablePlayback.classList.toggle('hidden', !this.current || this.current.status !== 'playing');
    requestAnimationFrame(() => this.searchInput.focus({ preventScroll: true }));
  }

  close(): void {
    this.modal.classList.add('is-closing');
    window.clearTimeout(this.closeTimer);
    this.closeTimer = window.setTimeout(() => {
      this.modal.classList.add('hidden');
      this.modal.classList.remove('is-closing');
    }, 160);
  }

  setClockOffset(offsetMs: number): void {
    this.serverOffsetMs = offsetMs;
    this.syncPlayback(false);
  }

  setDistance(distance: number): void {
    this.distance = distance;
    this.updateVolume();
    const nowLine = this.root.querySelector<HTMLElement>('#jukebox-hud-line')!;
    nowLine.classList.toggle('hidden', !this.current || distance >= WORLD_CONFIG.jukebox.hearingRadius);
    if (this.current) this.root.querySelector<HTMLElement>('#jukebox-hud-title')!.textContent = `Now playing: ${decodeHtml(this.current.title)}`;
  }

  setState(current: JukeboxCurrent | null, queue: JukeboxTrack[], skipVotes = 0): void {
    const changed = current?.videoId !== this.current?.videoId || current?.startedAt !== this.current?.startedAt || current?.status !== this.current?.status;
    this.current = current;
    this.queue = queue;
    this.skipVotes = skipVotes;
    this.renderState();
    this.renderResults(this.searchResults);
    this.renderLibrary();
    if (current) {
      this.enablePlayback.classList.toggle('hidden', current.status !== 'playing');
      this.playerEmpty.classList.add('hidden');
      if (changed && current.status === 'playing') void this.playCurrent();
      else if (changed && current.status !== 'playing') this.audio.pause();
      else this.syncPlayback(false);
    } else {
      this.enablePlayback.classList.add('hidden');
      this.playerEmpty.classList.remove('hidden');
      this.audio.pause();
      this.audio.removeAttribute('src');
      this.audio.load();
      this.updateVolume();
    }
    this.updateProgress();
  }

  showError(message: string): void {
    this.status.replaceChildren(document.createTextNode(message));
    this.status.classList.remove('hidden', 'is-loading');
    this.callbacks.toast(message);
  }

  private readSavedVolume(): number {
    const stored = localStorage.getItem('mengai:jukebox-volume');
    if (stored === null) return 35;
    const saved = Number(stored);
    return Number.isFinite(saved) ? Math.max(0, Math.min(100, saved)) : 35;
  }

  private updateVolumeLabel(): void {
    this.volumeLabel.textContent = `${this.volumePercent}%`;
    const percentage = this.volumePercent;
    this.volume.style.setProperty('--volume-fill', `${percentage}%`);
  }

  private updateMuteButton(): void {
    this.volumeMute.textContent = this.muted || this.volumePercent === 0 ? '🔇' : '🔊';
    this.volumeMute.setAttribute('aria-label', this.muted || this.volumePercent === 0 ? 'Unmute jukebox' : 'Mute jukebox');
    this.volumeMute.setAttribute('aria-pressed', String(this.muted || this.volumePercent === 0));
  }

  private updateVolume(): void {
    const falloff = Math.max(0, Math.min(1, (WORLD_CONFIG.jukebox.hearingRadius - this.distance) /
      (WORLD_CONFIG.jukebox.hearingRadius - WORLD_CONFIG.jukebox.fullVolumeRadius)));
    const localVolume = this.volumePercent / 100 * JUKEBOX_AUDIO.maxVolume * falloff;
    this.targetVolume = this.current && !this.muted ? localVolume : 0;
  }

  private applySmoothedVolume(): void {
    const smoothing = Math.exp(-0.1 / JUKEBOX_AUDIO.volumeSmoothingSeconds);
    this.appliedVolume = this.targetVolume + (this.appliedVolume - this.targetVolume) * smoothing;
    if (Math.abs(this.targetVolume - this.appliedVolume) < 0.005) this.appliedVolume = this.targetVolume;
    if (this.gainNode) this.gainNode.gain.value = this.appliedVolume;
  }

  private async search(query = this.searchInput.value.trim()): Promise<void> {
    query = query.trim();
    if (query.length < 2) {
      this.showMessage('Type at least two characters to search.');
      return;
    }
    this.lastQuery = query;
    window.clearTimeout(this.debounceTimer);
    const sequence = ++this.searchSequence;
    this.setLoading(true);
    this.results.replaceChildren();
    this.resultsHint.classList.add('hidden');
    this.debounceTimer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/jukebox/search?q=${encodeURIComponent(query)}`);
        const payload = await response.json() as { results?: SearchResult[]; error?: string };
        if (sequence !== this.searchSequence) return;
        if (!response.ok) throw new Error(payload.error ?? 'Search could not be completed.');
        this.setLoading(false);
        this.searched = true;
        this.searchResults = (payload.results ?? [])
          .filter((item) => item.durationSeconds >= 30 && item.durationSeconds <= 600 &&
            !/(^|\s)#?shorts?(\s|$)/i.test(item.title))
          .map((item) => ({ ...item, title: decodeHtml(item.title), channel: decodeHtml(item.channel) }));
        this.renderResults(this.searchResults);
        this.status.classList.add('hidden');
        if (!this.searchResults.length) this.showMessage('No results, try another search');
      } catch (error) {
        if (sequence !== this.searchSequence) return;
        this.setLoading(false);
        this.showSearchError(error instanceof Error ? error.message : 'Search could not be completed.');
      }
    }, 220);
  }

  private renderResults(items: SearchResult[]): void {
    this.results.replaceChildren();
    this.resultsHint.classList.toggle('hidden', this.searched || items.length > 0);
    for (const item of items) {
      const alreadyPlaying = this.current?.videoId === item.videoId;
      const alreadyQueued = this.queue.some((track) => track.videoId === item.videoId);
      const recentlyAdded = this.addedFeedback.has(item.videoId);
      const row = document.createElement('article');
      row.className = 'jukebox-result';
      row.tabIndex = 0;
      row.setAttribute('aria-label', `${item.title}, ${formatDuration(item.durationSeconds)}`);
      const thumbnailWrap = document.createElement('span');
      thumbnailWrap.className = 'jukebox-result-thumbnail';
      const thumbnail = document.createElement('img');
      thumbnail.src = `/api/jukebox/thumb/${item.videoId}`;
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      const duration = document.createElement('span');
      duration.className = 'jukebox-duration';
      duration.textContent = formatDuration(item.durationSeconds);
      thumbnailWrap.append(thumbnail, duration);

      const copy = document.createElement('span');
      copy.className = 'jukebox-result-copy';
      const title = document.createElement('strong');
      title.textContent = item.title;
      title.title = item.title;
      const channel = document.createElement('span');
      channel.textContent = item.channel;
      copy.append(title, channel);

      const action = document.createElement('span');
      action.className = 'jukebox-result-action';
      if (alreadyPlaying || alreadyQueued) {
        action.classList.add('jukebox-track-badge');
        action.textContent = alreadyPlaying ? 'Playing' : 'In queue';
      } else if (recentlyAdded) {
        const added = document.createElement('button');
        added.type = 'button';
        added.className = 'jukebox-add-button is-added';
        added.textContent = 'Added ✓';
        added.disabled = true;
        action.append(added);
      } else {
        if (item.durationSeconds > 360) {
          action.classList.add('jukebox-track-badge');
          action.textContent = 'Over 6 min';
        } else {
          const addButton = document.createElement('button');
          addButton.type = 'button';
          addButton.className = 'jukebox-add-button';
          addButton.textContent = '＋ Add';
          addButton.setAttribute('aria-label', `Add ${item.title} to queue`);
          addButton.addEventListener('click', () => this.enqueueResult(item, addButton));
          action.append(addButton);
        }
      }
      row.append(thumbnailWrap, copy, action);
      row.addEventListener('keydown', (event) => {
        const rows = [...this.results.querySelectorAll<HTMLElement>('.jukebox-result')];
        const index = rows.indexOf(row);
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          rows[(index + (event.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length]?.focus();
        } else if (event.key === 'Enter' && event.target === row) {
          event.preventDefault();
          row.querySelector<HTMLButtonElement>('.jukebox-add-button')?.click();
        }
      });
      this.results.append(row);
    }
  }

  private selectTab(showLibrary: boolean): void {
    this.searchTab.classList.toggle('is-active', !showLibrary);
    this.libraryTab.classList.toggle('is-active', showLibrary);
    this.searchTab.setAttribute('aria-selected', String(!showLibrary));
    this.libraryTab.setAttribute('aria-selected', String(showLibrary));
    this.searchPane.classList.toggle('hidden', showLibrary);
    this.libraryPane.classList.toggle('hidden', !showLibrary);
    if (showLibrary && !this.libraryLoaded) void this.loadLibrary();
  }

  private async loadLibrary(): Promise<void> {
    if (this.libraryLoading) return;
    this.libraryLoading = true;
    this.libraryStatus.textContent = 'Loading music library…';
    this.libraryStatus.classList.remove('hidden', 'is-error');
    try {
      const response = await fetch('/api/jukebox/library');
      const payload = await response.json() as { tracks?: LibraryTrack[]; error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'The music library could not be loaded.');
      this.libraryTracks = payload.tracks ?? [];
      this.libraryLoaded = true;
      this.libraryStatus.classList.add('hidden');
      this.renderLibrary();
    } catch (error) {
      this.libraryStatus.textContent = error instanceof Error ? error.message : 'The music library could not be loaded.';
      this.libraryStatus.classList.remove('hidden');
      this.libraryStatus.classList.add('is-error');
    } finally {
      this.libraryLoading = false;
    }
  }

  private renderLibrary(): void {
    this.libraryResults.replaceChildren();
    this.libraryEmpty.classList.toggle('hidden', this.libraryTracks.length > 0);
    this.libraryResults.classList.toggle('hidden', this.libraryTracks.length === 0);
    for (const track of this.libraryTracks) {
      const videoId = `library_${track.id}`;
      const alreadyPlaying = this.current?.videoId === videoId;
      const alreadyQueued = this.queue.some((queued) => queued.videoId === videoId);
      const feedbackId = `library:${track.id}`;
      const row = document.createElement('article');
      row.className = 'jukebox-result';
      row.tabIndex = 0;
      row.setAttribute('aria-label', `${track.title}, ${formatDuration(track.durationSeconds)}`);
      const icon = document.createElement('span');
      icon.className = 'jukebox-library-icon';
      icon.textContent = '♫';
      const duration = document.createElement('span');
      duration.className = 'jukebox-duration';
      duration.textContent = formatDuration(track.durationSeconds);
      icon.append(duration);
      const copy = document.createElement('span');
      copy.className = 'jukebox-result-copy';
      const title = document.createElement('strong');
      title.textContent = track.title;
      title.title = track.title;
      const source = document.createElement('span');
      source.textContent = 'In-app music';
      copy.append(title, source);
      const action = document.createElement('span');
      action.className = 'jukebox-result-action';
      if (alreadyPlaying || alreadyQueued) {
        action.classList.add('jukebox-track-badge');
        action.textContent = alreadyPlaying ? 'Playing' : 'In queue';
      } else if (this.addedFeedback.has(feedbackId)) {
        const added = document.createElement('button');
        added.type = 'button';
        added.className = 'jukebox-add-button is-added';
        added.textContent = 'Added ✓';
        added.disabled = true;
        action.append(added);
      } else {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'jukebox-add-button';
        button.textContent = '＋ Add';
        button.setAttribute('aria-label', `Add ${track.title} to queue`);
        button.addEventListener('click', () => this.enqueueLibraryTrack(track, button));
        action.append(button);
      }
      row.append(icon, copy, action);
      row.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target === row) {
          event.preventDefault();
          row.querySelector<HTMLButtonElement>('.jukebox-add-button')?.click();
        }
      });
      this.libraryResults.append(row);
    }
  }

  private enqueueLibraryTrack(track: LibraryTrack, button: HTMLButtonElement): void {
    if (!this.callbacks.enqueueLibrary(track.id)) {
      this.showError('The room connection is not ready. Please try adding the song again in a moment.');
      return;
    }
    button.textContent = 'Added ✓';
    button.disabled = true;
    button.classList.add('is-added');
    this.showModalToast('Added to queue');
    const feedbackId = `library:${track.id}`;
    const previousTimer = this.addedFeedback.get(feedbackId);
    if (previousTimer) window.clearTimeout(previousTimer);
    const timer = window.setTimeout(() => {
      this.addedFeedback.delete(feedbackId);
      this.renderLibrary();
    }, 2200);
    this.addedFeedback.set(feedbackId, timer);
  }

  private enqueueResult(item: SearchResult, button: HTMLButtonElement): void {
    if (!this.callbacks.enqueue(item.videoId)) {
      this.showError('The room connection is not ready. Please try adding the song again in a moment.');
      return;
    }
    button.textContent = 'Added ✓';
    button.disabled = true;
    button.classList.add('is-added');
    this.showModalToast('Added to queue');
    const previousTimer = this.addedFeedback.get(item.videoId);
    if (previousTimer) window.clearTimeout(previousTimer);
    const timer = window.setTimeout(() => {
      this.addedFeedback.delete(item.videoId);
      this.renderResults(this.searchResults);
    }, 2200);
    this.addedFeedback.set(item.videoId, timer);
  }

  private renderState(): void {
    this.nowPlaying.classList.toggle('hidden', !this.current);
    this.skipButton.classList.toggle('hidden', !this.current);
    if (this.current) {
      this.nowTitle.textContent = decodeHtml(this.current.title);
      this.nowChannel.textContent = decodeHtml(this.current.channel);
      this.nowRequester.textContent = `Requested by ${this.current.requestedBy}`;
      const isLibraryTrack = this.current.source === 'library';
      this.playerSlot.classList.toggle('is-library-track', isLibraryTrack);
      if (isLibraryTrack) {
        this.nowThumbnail.removeAttribute('src');
        this.nowThumbnail.alt = '';
      } else {
        this.nowThumbnail.src = `/api/jukebox/thumb/${this.current.videoId}`;
        this.nowThumbnail.alt = `Thumbnail for ${decodeHtml(this.current.title)}`;
      }
      this.nowStatus.textContent = this.current.status === 'downloading' ? 'Preparing…'
        : this.current.status === 'ready' ? 'Ready to play…'
          : this.current.status === 'failed' ? 'Unavailable; skipping…' : '';
      this.nowStatus.classList.toggle('hidden', this.current.status === 'playing');
      this.skipButton.textContent = this.skipVotes ? `Skip · ${this.skipVotes}/2 votes` : 'Skip';
      this.totalTime.textContent = formatDuration(this.current.durationSeconds);
      this.playerEmpty.classList.add('hidden');
    } else {
      this.playerSlot.classList.remove('is-library-track');
      this.nowThumbnail.removeAttribute('src');
      this.nowStatus.textContent = '';
      this.nowStatus.classList.add('hidden');
    }
    this.queueCount.textContent = String(this.queue.length);
    this.queueList.replaceChildren();
    if (!this.queue.length) {
      const empty = document.createElement('li');
      empty.className = 'jukebox-queue-empty';
      empty.textContent = 'The queue is empty. Add a song to get things started.';
      this.queueList.append(empty);
      return;
    }
    for (const track of this.queue) {
      const row = document.createElement('li');
      row.className = 'jukebox-queue-item';
      const thumbnail = track.source === 'library' ? document.createElement('span') : document.createElement('img');
      if (track.source === 'library') {
        thumbnail.className = 'jukebox-queue-library-icon';
        thumbnail.textContent = '♫';
      } else {
        (thumbnail as HTMLImageElement).src = `/api/jukebox/thumb/${track.videoId}`;
        (thumbnail as HTMLImageElement).alt = '';
        (thumbnail as HTMLImageElement).loading = 'lazy';
      }
      const copy = document.createElement('span');
      copy.className = 'jukebox-queue-copy';
      const title = document.createElement('strong');
      title.textContent = decodeHtml(track.title);
      title.title = title.textContent;
      const requester = document.createElement('span');
      requester.textContent = `Requested by ${track.requestedBy}`;
      copy.append(title, requester);
      const duration = document.createElement('span');
      duration.className = 'jukebox-queue-duration';
      duration.textContent = formatDuration(track.durationSeconds);
      const state = document.createElement('span');
      state.className = `jukebox-queue-status is-${track.status}`;
      state.textContent = track.status === 'downloading' ? 'Preparing…' : track.status === 'ready' ? 'Ready' : track.status === 'failed' ? 'Unavailable' : 'Playing';
      row.append(thumbnail, copy, state, duration);
      this.queueList.append(row);
    }
  }

  private updateProgress(): void {
    if (!this.current) {
      this.progress.style.width = '0%';
      this.currentTime.textContent = '0:00';
      return;
    }
    const duration = this.current.source === 'library' && Number.isFinite(this.audio.duration) && this.audio.duration > 0
      ? this.audio.duration : this.current.durationSeconds;
    const elapsed = this.current.startedAt === null ? 0 : Math.max(0, Math.min(duration, (Date.now() + this.serverOffsetMs - this.current.startedAt) / 1000));
    this.progress.style.width = `${elapsed / duration * 100}%`;
    this.progress.parentElement?.setAttribute('aria-valuenow', String(Math.round(elapsed / duration * 100)));
    this.currentTime.textContent = formatDuration(Math.floor(elapsed));
  }

  private showInitialHint(): void {
    this.searched = false;
    this.searchResults = [];
    this.results.replaceChildren();
    this.resultsHint.classList.remove('hidden');
    this.status.classList.add('hidden');
  }

  private showMessage(message: string): void {
    this.status.replaceChildren(document.createTextNode(message));
    this.status.classList.remove('hidden', 'is-error', 'is-loading');
  }

  private showModalToast(message: string): void {
    this.modalToast.textContent = message;
    this.modalToast.classList.remove('hidden');
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.modalToast.classList.add('hidden'), 1800);
  }

  private showSearchError(message: string): void {
    this.status.replaceChildren();
    const text = document.createElement('span');
    text.textContent = message;
    const retry = document.createElement('button');
    retry.id = 'jukebox-retry';
    retry.type = 'button';
    retry.className = 'jukebox-retry';
    retry.textContent = 'Retry';
    retry.addEventListener('click', () => this.search(this.lastQuery));
    this.status.append(text, retry);
    this.status.classList.remove('hidden', 'is-loading');
    this.status.classList.add('is-error');
  }

  private setLoading(loading: boolean): void {
    this.searchButton.disabled = loading;
    this.searchButton.querySelector('span')!.textContent = loading ? 'Searching' : 'Search';
    this.searchButton.querySelector<HTMLElement>('.jukebox-spinner')!.classList.toggle('hidden', !loading);
    this.status.classList.toggle('hidden', !loading);
    this.status.classList.toggle('is-loading', loading);
    if (loading) this.status.textContent = 'Searching YouTube…';
  }

  private async playCurrent(): Promise<void> {
    const current = this.current;
    if (!current || current.status !== 'playing' || current.startedAt === null) return;
    const sequence = ++this.playRequestSequence;
    const source = current.source === 'library' && current.libraryId
      ? `/api/jukebox/library/${current.libraryId}.mp3`
      : `/api/jukebox/stream/${current.videoId}.mp3`;
    const absoluteSource = new URL(source, location.href).href;
    if (this.audio.src !== absoluteSource) {
      this.audio.src = source;
      this.audio.load();
    }
    try {
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
        this.sourceNode = this.audioContext.createMediaElementSource(this.audio);
        this.gainNode = this.audioContext.createGain();
        this.sourceNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.updateVolume();
      }
      await this.audioContext.resume();
      if (this.audio.readyState < HTMLMediaElement.HAVE_METADATA) {
        await new Promise<void>((resolve, reject) => {
          const loaded = () => { cleanup(); resolve(); };
          const failed = () => { cleanup(); reject(new Error('Audio metadata could not be loaded.')); };
          const cleanup = () => {
            this.audio.removeEventListener('loadedmetadata', loaded);
            this.audio.removeEventListener('error', failed);
          };
          this.audio.addEventListener('loadedmetadata', loaded, { once: true });
          this.audio.addEventListener('error', failed, { once: true });
        });
      }
      if (sequence !== this.playRequestSequence || this.current?.videoId !== current.videoId || this.current.status !== 'playing') return;
      this.audio.currentTime = this.expectedPlaybackTime(current);
      await this.audio.play();
      this.enablePlayback.classList.add('hidden');
      this.status.classList.add('hidden');
    } catch {
      if (sequence !== this.playRequestSequence || this.current?.videoId !== current.videoId) return;
      if (this.audio.error) {
        this.enablePlayback.classList.add('hidden');
        return;
      }
      this.enablePlayback.classList.remove('hidden');
      this.showMessage('Tap “Enable playback” to hear the room’s music.');
    }
  }

  private expectedPlaybackTime(current: JukeboxCurrent): number {
    if (current.startedAt === null) return 0;
    const duration = current.source === 'library' && Number.isFinite(this.audio.duration) && this.audio.duration > 0
      ? this.audio.duration : current.durationSeconds;
    return Math.max(0, Math.min(duration,
      (Date.now() + this.serverOffsetMs - current.startedAt) / 1000));
  }

  private syncPlayback(load: boolean): void {
    const current = this.current;
    if (!current || current.status !== 'playing' || current.startedAt === null) return;
    if (load) {
      void this.playCurrent();
      return;
    }
    const now = performance.now();
    if (now - this.lastSyncAt < 2000) return;
    this.lastSyncAt = now;
    if (!this.audio.paused && Math.abs(this.audio.currentTime - this.expectedPlaybackTime(current)) > JUKEBOX_AUDIO.resyncThresholdSeconds) {
      this.audio.currentTime = this.expectedPlaybackTime(current);
    }
  }
}
