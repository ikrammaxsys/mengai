import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { Room, RoomEvent, Track, type RemoteParticipant } from 'livekit-client';
import type { TheaterState } from './network';

interface TheaterActions {
  start: (mode: 'screen' | 'pdf') => void;
  stop: () => void;
  page: (page: number) => void;
  freeBrowse: (enabled: boolean) => void;
  setPdf: (url: string) => void;
  upload: (room: string, resumeToken: string, file: File) => Promise<string>;
  display: (video: HTMLVideoElement | null, canvas: HTMLCanvasElement | null, refreshCanvas?: boolean) => void;
  focus: (focused: boolean) => void;
  presenter: (name: string | null) => void;
}

const IDLE_STATE: TheaterState = {
  currentPresenterId: null,
  presenterName: null,
  mode: 'none',
  pdfUrl: null,
  currentPage: 1,
  freeBrowse: false,
};

export class Theater {
  private readonly panel = document.createElement('div');
  private readonly prompt = document.createElement('button');
  private readonly promptText = document.createElement('span');
  private readonly presenterChip = document.createElement('div');
  private readonly presenterChipText = document.createElement('span');
  private readonly chipStopButton = document.createElement('button');
  private readonly menu = document.createElement('section');
  private readonly menuCloseButton = document.createElement('button');
  private readonly notice = document.createElement('div');
  private readonly status = document.createElement('div');
  private readonly video = document.createElement('video');
  private readonly audio = document.createElement('audio');
  private readonly pdfCanvas = document.createElement('canvas');
  private readonly pdfContext: CanvasRenderingContext2D;
  private readonly presentButton = document.createElement('button');
  private readonly pdfButton = document.createElement('button');
  private readonly stopButton = document.createElement('button');
  private readonly focusButton = document.createElement('button');
  private readonly pageControls = document.createElement('div');
  private readonly previousButton = document.createElement('button');
  private readonly nextButton = document.createElement('button');
  private readonly pageInput = document.createElement('input');
  private readonly pageCount = document.createElement('span');
  private readonly freeBrowseLabel = document.createElement('label');
  private readonly freeBrowseInput = document.createElement('input');
  private readonly screenControls = document.createElement('div');
  private readonly muteButton = document.createElement('button');
  private readonly volumeInput = document.createElement('input');
  private readonly fileInput = document.createElement('input');
  private readonly actions: TheaterActions;
  private state: TheaterState = IDLE_STATE;
  private localId = '';
  private room = '';
  private resumeToken = '';
  private localStream: MediaStream | null = null;
  private mediaRoom: Room | null = null;
  private mediaRoomGeneration = 0;
  private pdfDocument: PDFDocumentProxy | null = null;
  private pdfLoadingUrl = '';
  private renderedPage = 0;
  private renderTask: RenderTask | null = null;
  private localBrowsePage: number | null = null;
  private focused = false;
  private errorMessage = '';
  private occluded = false;
  private nearby = false;
  private menuOpen = false;
  private sceneVisible = false;
  private seated = false;
  private stopping = false;
  private volume = this.readVolume();
  private muted = localStorage.getItem('mengai:theater-muted') !== 'false';
  private pendingStart: { mode: 'screen' | 'pdf'; resolve: () => void; reject: (error: Error) => void; timer: number } | null = null;
  private noticeTimer = 0;

  constructor(root: HTMLElement, actions: TheaterActions) {
    this.actions = actions;
    this.panel.className = 'theater-ui hidden';
    this.panel.setAttribute('aria-label', 'Theater controls');

    this.prompt.className = 'theater-proximity-prompt hidden';
    this.prompt.type = 'button';
    const interactKey = document.createElement('kbd');
    interactKey.textContent = 'E';
    this.prompt.append(interactKey, this.promptText);
    this.presenterChip.className = 'theater-presenter-chip hidden';
    this.presenterChip.setAttribute('role', 'button');
    this.presenterChip.tabIndex = 0;
    this.presenterChipText.textContent = 'You’re presenting';
    this.chipStopButton.type = 'button';
    this.chipStopButton.className = 'theater-chip-stop';
    this.chipStopButton.textContent = 'Stop';
    this.presenterChip.append(this.presenterChipText, this.chipStopButton);

    this.menu.className = 'theater-menu hidden';
    this.menu.setAttribute('role', 'dialog');
    this.menu.setAttribute('aria-label', 'Theater controls');
    this.notice.className = 'theater-notice hidden';
    this.notice.setAttribute('role', 'status');
    const header = document.createElement('header');
    header.className = 'theater-menu-header';
    const heading = document.createElement('strong');
    heading.textContent = 'Theater';
    this.status.className = 'theater-status';
    this.status.setAttribute('aria-live', 'polite');
    this.menuCloseButton.type = 'button';
    this.menuCloseButton.className = 'theater-menu-close';
    this.menuCloseButton.textContent = '×';
    this.menuCloseButton.setAttribute('aria-label', 'Close theater menu');
    header.append(heading, this.status, this.menuCloseButton);

    this.video.className = 'theater-source-video';
    this.video.hidden = false;
    this.video.playsInline = true;
    this.video.autoplay = true;
    this.video.muted = true;
    this.video.addEventListener('volumechange', () => this.updateMuteLabel());
    this.video.addEventListener('loadedmetadata', () => this.updateSceneDisplay());
    this.audio.hidden = true;
    this.audio.autoplay = true;
    this.audio.volume = this.volume;
    this.audio.muted = this.muted;
    const context = this.pdfCanvas.getContext('2d');
    if (!context) throw new Error('Could not create the theater PDF canvas.');
    this.pdfContext = context;

    const actionsRow = document.createElement('div');
    actionsRow.className = 'theater-actions';
    this.presentButton.type = 'button';
    this.presentButton.textContent = 'Share screen';
    this.pdfButton.type = 'button';
    this.pdfButton.textContent = 'Present a PDF';
    this.stopButton.type = 'button';
    this.stopButton.className = 'theater-stop hidden';
    this.stopButton.textContent = 'Stop presenting';
    this.fileInput.type = 'file';
    this.fileInput.accept = 'application/pdf,.pdf';
    this.fileInput.className = 'hidden';
    actionsRow.append(this.presentButton, this.pdfButton, this.stopButton, this.fileInput);

    this.pageControls.className = 'theater-page-controls hidden';
    this.previousButton.type = 'button';
    this.previousButton.textContent = '‹';
    this.previousButton.setAttribute('aria-label', 'Previous page');
    this.nextButton.type = 'button';
    this.nextButton.textContent = '›';
    this.nextButton.setAttribute('aria-label', 'Next page');
    this.pageInput.type = 'number';
    this.pageInput.min = '1';
    this.pageInput.value = '1';
    this.pageInput.setAttribute('aria-label', 'PDF page number');
    this.pageCount.textContent = '/ —';
    this.freeBrowseInput.type = 'checkbox';
    this.freeBrowseLabel.className = 'theater-free-browse';
    this.freeBrowseLabel.append(this.freeBrowseInput, document.createTextNode('Allow free browse'));
    this.pageControls.append(this.previousButton, this.pageInput, this.pageCount, this.nextButton, this.freeBrowseLabel);

    this.menu.append(header, actionsRow, this.pageControls);

    this.screenControls.className = 'theater-volume hidden';
    this.muteButton.type = 'button';
    this.muteButton.className = 'theater-mute';
    this.volumeInput.type = 'range';
    this.volumeInput.min = '0';
    this.volumeInput.max = '1';
    this.volumeInput.step = '0.01';
    this.volumeInput.value = String(this.volume);
    this.volumeInput.setAttribute('aria-label', 'Shared screen volume');
    this.focusButton.type = 'button';
    this.focusButton.className = 'theater-focus-button hidden';
    this.focusButton.textContent = 'Focus screen';
    this.screenControls.append(this.muteButton, this.volumeInput);

    this.panel.append(this.prompt, this.presenterChip, this.menu, this.focusButton, this.screenControls, this.notice, this.video, this.audio);
    root.append(this.panel);

    this.prompt.addEventListener('click', () => this.openMenu());
    this.presenterChip.addEventListener('click', (event) => { if (event.target !== this.chipStopButton) this.openMenu(); });
    this.presenterChip.addEventListener('keydown', (event) => {
      if (event.target === this.presenterChip && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); this.openMenu(); }
    });
    this.chipStopButton.addEventListener('click', (event) => { event.stopPropagation(); this.stopPresentation(); });
    this.menuCloseButton.addEventListener('click', () => this.closeMenu());
    this.presentButton.addEventListener('click', () => { void this.startScreenShare(); });
    this.pdfButton.addEventListener('click', () => this.fileInput.click());
    this.fileInput.addEventListener('change', () => { const file = this.fileInput.files?.[0]; if (file) void this.startPdf(file); this.fileInput.value = ''; });
    this.stopButton.addEventListener('click', () => this.stopPresentation());
    this.focusButton.addEventListener('click', () => this.toggleFocus());
    this.previousButton.addEventListener('click', () => this.navigatePage(-1));
    this.nextButton.addEventListener('click', () => this.navigatePage(1));
    this.pageInput.addEventListener('change', () => this.selectPage(Number(this.pageInput.value)));
    this.freeBrowseInput.addEventListener('change', () => this.actions.freeBrowse(this.freeBrowseInput.checked));
    this.muteButton.addEventListener('click', () => {
      this.muted = !this.muted;
      localStorage.setItem('mengai:theater-muted', String(this.muted));
      this.updateMuteLabel();
      if (!this.muted && this.audio.srcObject) void this.audio.play().catch(() => this.setError('Shared audio could not be played.'));
    });
    this.volumeInput.addEventListener('input', () => {
      this.volume = Number(this.volumeInput.value);
      if (this.volume > 0 && this.muted) this.muted = false;
      localStorage.setItem('mengai:theater-volume', String(this.volume));
      this.updateMuteLabel();
    });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    window.addEventListener('keydown', this.onKeyDown);
    this.updateMuteLabel();
    this.render();
  }

  setSession(localId: string, room: string, resumeToken: string): void {
    this.localId = localId;
    this.room = room;
    this.resumeToken = resumeToken;
    this.panel.classList.remove('hidden');
    this.render();
  }

  get isFocused(): boolean { return this.focused; }
  get isMenuOpen(): boolean { return this.menuOpen; }
  get isNearby(): boolean { return this.nearby; }
  get canFocus(): boolean { return this.state.mode !== 'none' || this.nearby || this.seated; }

  setSeated(seated: boolean): void {
    this.seated = seated;
    if (!seated && this.focused) {
      this.focused = false;
      this.actions.focus(false);
    }
    this.render();
  }

  toggleFocusFromKeyboard(): void {
    if (this.canFocus) this.toggleFocus();
  }

  setNearby(nearby: boolean): void {
    if (this.nearby === nearby) return;
    this.nearby = nearby;
    this.render();
  }

  openMenu(): void {
    if (this.panel.classList.contains('hidden')) return;
    this.menuOpen = true;
    this.render();
  }

  private closeMenu(): void {
    this.menuOpen = false;
    this.render();
  }

  setDisplayVisible(visible: boolean): void {
    this.sceneVisible = visible;
    const canDisplay = visible && !this.occluded && !document.hidden;
    if (this.state.mode === 'screen' && this.video.srcObject) {
      if (!canDisplay) { if (!this.video.paused) this.video.pause(); }
      else if (this.video.paused) void this.video.play().catch(() => this.setError('Click Focus or unmute to enable screen playback.'));
    }
    if (this.state.mode === 'pdf') {
      if (!canDisplay && this.renderTask) {
        this.renderTask.cancel();
        this.renderTask = null;
        this.renderedPage = 0;
      } else if (canDisplay) void this.renderPdfPage();
    }
  }

  applyState(next: TheaterState): void {
    const changedPresenter = next.currentPresenterId !== this.state.currentPresenterId || next.mode !== this.state.mode;
    this.state = { ...IDLE_STATE, ...next };
    this.actions.presenter(this.state.presenterName);
    if (changedPresenter) {
      this.errorMessage = '';
      this.closeMediaRoom();
      const keepLocalPreview = next.mode === 'screen' && next.currentPresenterId === this.localId && Boolean(this.localStream);
      if (!keepLocalPreview) { this.video.pause(); this.video.srcObject = null; }
      this.localBrowsePage = null;
      if (this.state.mode === 'screen' && this.state.currentPresenterId) {
        void this.connectMediaRoom(this.state.currentPresenterId === this.localId);
      }
      if (this.state.mode === 'none' && this.localStream) this.stopLocalTracks();
    }
    if (this.pendingStart && this.state.currentPresenterId === this.localId && this.state.mode === this.pendingStart.mode) {
      window.clearTimeout(this.pendingStart.timer);
      this.pendingStart.resolve();
      this.pendingStart = null;
    }
    if (this.state.mode === 'pdf') this.ensurePdfLoaded();
    else this.resetPdf();
    this.render();
  }

  handleError(message: string): void {
    if (this.pendingStart) {
      window.clearTimeout(this.pendingStart.timer);
      this.pendingStart.reject(new Error(message));
      this.pendingStart = null;
    }
    if (this.localStream) {
      this.closeMediaRoom();
      this.stopLocalTracks();
    }
    this.setError(message);
  }

  playerLeft(playerId: string): void {
    if (playerId === this.state.currentPresenterId) {
      this.closeMediaRoom();
      this.video.pause();
      this.video.srcObject = null;
      this.updateSceneDisplay();
    }
  }

  setOccluded(occluded: boolean): void {
    this.occluded = occluded;
    if (occluded) {
      this.menuOpen = false;
      if (this.focused) {
        this.focused = false;
        this.actions.focus(false);
      }
    }
    this.setDisplayVisible(this.sceneVisible);
    this.render();
  }

  reset(): void {
    if (this.pendingStart) {
      window.clearTimeout(this.pendingStart.timer);
      this.pendingStart.reject(new Error('The room connection was lost.'));
      this.pendingStart = null;
    }
    this.closeMediaRoom();
    this.stopLocalTracks();
    this.resetPdf();
    this.state = IDLE_STATE;
    this.actions.presenter(null);
    if (this.focused) this.actions.focus(false);
    this.occluded = false;
    this.errorMessage = '';
    window.clearTimeout(this.noticeTimer);
    this.notice.classList.add('hidden');
    this.focused = false;
    this.seated = false;
    this.nearby = false;
    this.menuOpen = false;
    this.panel.classList.remove('has-error');
    this.panel.classList.add('hidden');
    this.render();
  }

  private async startScreenShare(): Promise<void> {
    if (this.state.mode !== 'none') return;
    if (!navigator.mediaDevices?.getDisplayMedia) { this.setError('Screen sharing is not available in this browser.'); return; }
    this.setError('Choose a screen or window to share…');
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920, max: 2560 },
          height: { ideal: 1080, max: 1440 },
          frameRate: { ideal: 30, max: 60 },
        },
        audio: true,
      });
      this.localStream = stream;
      this.video.srcObject = stream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.contentHint = 'detail';
        await videoTrack.applyConstraints({
          width: { ideal: 1920, max: 2560 },
          height: { ideal: 1080, max: 1440 },
          frameRate: { ideal: 30, max: 60 },
        }).catch(() => undefined);
      }
      videoTrack.addEventListener('ended', () => { if (!this.stopping) this.stopPresentation(); }, { once: true });
      await this.waitForStart('screen');
      this.setError('');
      this.render();
    } catch (error) {
      this.stopLocalTracks();
      if ((error as DOMException)?.name === 'NotAllowedError') this.setError('Screen-share permission was denied.');
      else if (error instanceof Error && error.message !== 'The operation was aborted.') this.setError(error.message || 'Could not start screen sharing.');
    }
  }

  private async startPdf(file: File): Promise<void> {
    if (this.state.mode !== 'none') return;
    if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) { this.setError('Choose a PDF file.'); return; }
    if (file.size > 20 * 1024 * 1024) { this.setError('PDF files are limited to 20 MB.'); return; }
    if (!file.size) { this.setError('That PDF file is empty.'); return; }
    try {
      this.setError('Starting PDF presentation…');
      await this.waitForStart('pdf');
      this.setError('Uploading PDF…');
      const url = await this.actions.upload(this.room, this.resumeToken, file);
      this.actions.setPdf(url);
      this.setError('');
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'The PDF could not be shared.');
      if (this.state.currentPresenterId === this.localId) this.actions.stop();
    }
  }

  private waitForStart(mode: 'screen' | 'pdf'): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        if (!this.pendingStart) return;
        this.pendingStart = null;
        reject(new Error('The theater did not confirm the presentation. Try again.'));
      }, 5000);
      this.pendingStart = { mode, resolve, reject, timer };
      this.actions.start(mode);
    });
  }

  private stopPresentation(): void {
    if (this.state.currentPresenterId !== this.localId) return;
    this.actions.stop();
    this.closeMediaRoom();
    this.stopLocalTracks();
  }

  private stopLocalTracks(): void {
    this.stopping = true;
    for (const track of this.localStream?.getTracks() ?? []) track.stop();
    this.localStream = null;
    this.video.pause();
    this.video.srcObject = null;
    this.stopping = false;
    this.updateSceneDisplay();
  }

  private async connectMediaRoom(publishScreen: boolean): Promise<void> {
    const presenterId = this.state.currentPresenterId;
    if (!presenterId || !this.room || !this.localId || !this.resumeToken) return;
    const generation = this.mediaRoomGeneration;
    try {
      const query = new URLSearchParams({ room: this.room, playerId: this.localId, purpose: 'theater' });
      const response = await fetch(`/voice-token?${query}`, {
        headers: { Authorization: `Bearer ${this.resumeToken}` },
        cache: 'no-store',
      });
      const credentials = await response.json() as { token?: string; url?: string; error?: string };
      if (!response.ok || !credentials.token || !credentials.url) {
        throw new Error(credentials.error ?? 'The screen-share relay could not be reached.');
      }
      if (generation !== this.mediaRoomGeneration || this.state.currentPresenterId !== presenterId) return;

      const mediaRoom = new Room({ adaptiveStream: false, dynacast: false });
      this.mediaRoom = mediaRoom;
      const theaterIdentity = `${presenterId}-theater`;
      const subscribePresentationTracks = (participant: RemoteParticipant): void => {
        if (participant.identity !== theaterIdentity) return;
        for (const publication of participant.trackPublications.values()) publication.setSubscribed(true);
      };
      mediaRoom.on(RoomEvent.TrackPublished, (publication, participant) => {
        if (this.mediaRoom === mediaRoom && participant.identity === theaterIdentity) publication.setSubscribed(true);
      });
      mediaRoom.on(RoomEvent.TrackSubscribed, (track, _publication, participant) => {
        if (this.mediaRoom !== mediaRoom || participant.identity !== theaterIdentity || this.state.mode !== 'screen') return;
        if (track.kind === Track.Kind.Audio) {
          this.audio.srcObject = new MediaStream([track.mediaStreamTrack]);
          this.audio.volume = this.volume;
          this.audio.muted = this.muted;
          void this.audio.play().catch(() => this.setError('Click the volume control to enable shared audio.'));
        } else if (track.kind === Track.Kind.Video) {
          this.video.srcObject = new MediaStream([track.mediaStreamTrack]);
          this.updateSceneDisplay();
          this.setDisplayVisible(this.sceneVisible);
          void this.video.play().catch(() => this.setError('Click Focus to enable shared screen playback.'));
        }
      });
      mediaRoom.on(RoomEvent.TrackUnsubscribed, (track, _publication, participant) => {
        if (this.mediaRoom !== mediaRoom || participant.identity !== theaterIdentity) return;
        if (track.kind === Track.Kind.Video) {
          this.video.pause();
          this.video.srcObject = null;
          this.updateSceneDisplay();
        } else if (track.kind === Track.Kind.Audio) {
          this.clearRemoteAudio();
        }
      });
      mediaRoom.on(RoomEvent.Disconnected, () => {
        if (this.mediaRoom !== mediaRoom) return;
        console.error('[theater] LiveKit screen-share room disconnected.');
        this.setError('The screen-share connection was lost. Rejoin the room and try again.');
      });

      await mediaRoom.connect(credentials.url, credentials.token, { autoSubscribe: false });
      if (generation !== this.mediaRoomGeneration || this.mediaRoom !== mediaRoom) {
        await mediaRoom.disconnect();
        return;
      }

      for (const participant of mediaRoom.remoteParticipants.values()) subscribePresentationTracks(participant);

      if (publishScreen) {
        const stream = this.localStream;
        const videoTrack = stream?.getVideoTracks()[0];
        if (!videoTrack) throw new Error('The shared screen has no video track. Stop sharing and try again.');
        for (const track of stream?.getTracks() ?? []) {
          if (generation !== this.mediaRoomGeneration || this.mediaRoom !== mediaRoom) return;
          await mediaRoom.localParticipant.publishTrack(track, {
            source: track.kind === 'video' ? Track.Source.ScreenShare : Track.Source.ScreenShareAudio,
          });
        }
      }
    } catch (error) {
      if (generation !== this.mediaRoomGeneration) return;
      const message = error instanceof Error ? error.message : String(error);
      console.error('[theater] Could not connect screen share through LiveKit:', message);
      this.setError(`Could not connect the shared screen${message ? `: ${message}` : '.'}`);
      this.closeMediaRoom();
    }
  }

  private closeMediaRoom(): void {
    this.mediaRoomGeneration += 1;
    const mediaRoom = this.mediaRoom;
    this.mediaRoom = null;
    if (mediaRoom) void mediaRoom.disconnect();
    this.clearRemoteAudio();
  }

  private ensurePdfLoaded(): void {
    const url = this.state.pdfUrl;
    if (!url) { this.setError('Preparing PDF…'); return; }
    if (this.pdfLoadingUrl === url) { this.renderPdfPage(); return; }
    this.resetPdf();
    this.pdfLoadingUrl = url;
    this.setError('Loading PDF…');
    void Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(([pdfjs, worker]) => {
      if (this.pdfLoadingUrl !== url) return null;
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      return pdfjs.getDocument(url).promise;
    }).then((document) => {
      if (!document) return;
      if (this.pdfLoadingUrl !== url) { void document.destroy(); return; }
      this.pdfDocument = document;
      this.pageCount.textContent = `/ ${document.numPages}`;
      this.setError('');
      this.renderPdfPage();
      this.render();
    }).catch(() => {
      if (this.pdfLoadingUrl === url) this.setError('This PDF could not be loaded. Ask the presenter to upload it again.');
    });
  }

  private async renderPdfPage(): Promise<void> {
    const document = this.pdfDocument;
    if (!document || this.state.mode !== 'pdf' || !this.sceneVisible || this.occluded || window.document.hidden) return;
    const pageNumber = Math.max(1, Math.min(document.numPages, this.localBrowsePage ?? this.state.currentPage));
    if (this.renderedPage === pageNumber) return;
    this.renderTask?.cancel();
    this.renderedPage = pageNumber;
    let task: RenderTask | null = null;
    try {
      const page = await document.getPage(pageNumber);
      if (document !== this.pdfDocument || pageNumber !== (this.localBrowsePage ?? this.state.currentPage)) return;
      const base = page.getViewport({ scale: 1 });
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const targetWidth = innerWidth < 720 || deviceMemory !== undefined && deviceMemory <= 4 ? 1280 : 1920;
      const scale = Math.max(0.1, targetWidth / base.width);
      const viewport = page.getViewport({ scale });
      this.pdfCanvas.width = Math.floor(viewport.width);
      this.pdfCanvas.height = Math.floor(viewport.height);
      task = page.render({ canvasContext: this.pdfContext, viewport });
      this.renderTask = task;
      await task.promise;
      if (this.renderTask === task) this.renderTask = null;
      this.updateSceneDisplay(true);
    } catch (error) {
      if (this.renderTask === task) this.renderTask = null;
      if ((error as Error)?.name !== 'RenderingCancelledException' && this.state.mode === 'pdf') {
        this.renderedPage = 0;
        this.setError('The current PDF page could not be rendered.');
      }
    }
  }

  private resetPdf(): void {
    this.renderTask?.cancel();
    this.renderTask = null;
    this.renderedPage = 0;
    this.pdfLoadingUrl = '';
    const document = this.pdfDocument;
    this.pdfDocument = null;
    if (document) void document.destroy();
    this.pdfContext.clearRect(0, 0, this.pdfCanvas.width, this.pdfCanvas.height);
    this.pdfCanvas.width = 1;
    this.pdfCanvas.height = 1;
  }

  private navigatePage(amount: number): void {
    const current = this.localBrowsePage ?? this.state.currentPage;
    const count = this.pdfDocument?.numPages ?? 10_000;
    this.selectPage(Math.max(1, Math.min(count, current + amount)));
  }

  private selectPage(page: number): void {
    if (!Number.isSafeInteger(page) || page < 1) return;
    page = Math.min(page, this.pdfDocument?.numPages ?? 10_000);
    if (this.state.currentPresenterId === this.localId) this.actions.page(page);
    else if (this.state.freeBrowse && this.pdfDocument) {
      this.localBrowsePage = Math.max(1, Math.min(this.pdfDocument.numPages, page));
      this.renderPdfPage();
      this.render();
    }
  }

  private render(): void {
    const active = this.state.mode !== 'none';
    const isPresenter = active && this.state.currentPresenterId === this.localId;
    const normalStatus = active ? (isPresenter ? 'You’re presenting' : `${this.state.presenterName ?? 'Someone'} is presenting`) : 'Ready when you are';
    this.status.textContent = this.errorMessage || normalStatus;
    this.panel.classList.toggle('has-error', Boolean(this.errorMessage));
    this.notice.textContent = this.errorMessage;
    this.notice.classList.toggle('hidden', !this.errorMessage || this.menuOpen);
    this.prompt.classList.toggle('hidden', !this.nearby && !active);
    this.promptText.textContent = active ? `${this.state.presenterName ?? 'Theater'} · controls` : 'Open theater';
    const interactKey = this.prompt.querySelector('kbd');
    if (interactKey) interactKey.classList.toggle('hidden', active);
    this.presenterChip.classList.toggle('hidden', !isPresenter);
    this.presenterChipText.textContent = isPresenter ? 'You’re presenting' : '';
    this.menu.classList.toggle('hidden', !this.menuOpen);
    this.presentButton.disabled = active;
    this.pdfButton.disabled = active;
    this.stopButton.classList.toggle('hidden', !isPresenter);
    this.pageControls.classList.toggle('hidden', this.state.mode !== 'pdf' || !this.state.pdfUrl);
    this.screenControls.classList.toggle('hidden', this.state.mode !== 'screen');
    this.focusButton.classList.toggle('hidden', !active && !this.nearby && !this.seated);
    this.freeBrowseLabel.classList.toggle('hidden', !isPresenter || this.state.mode !== 'pdf');
    this.freeBrowseInput.checked = this.state.freeBrowse;
    const currentPage = this.localBrowsePage ?? this.state.currentPage;
    this.pageInput.value = String(currentPage);
    this.pageCount.textContent = `/ ${this.pdfDocument?.numPages ?? '—'}`;
    const canBrowse = isPresenter || (this.state.freeBrowse && this.state.mode === 'pdf');
    this.previousButton.disabled = !canBrowse || currentPage <= 1;
    this.nextButton.disabled = !canBrowse || Boolean(this.pdfDocument && currentPage >= this.pdfDocument.numPages);
    this.pageInput.disabled = !canBrowse;
    this.focusButton.textContent = this.focused ? 'Stop focus · F' : 'Focus screen · F';
    this.focusButton.setAttribute('aria-label', this.focused ? 'Return to normal camera' : 'Focus theater screen');
    this.updateSceneDisplay();
    this.setDisplayVisible(this.sceneVisible);
  }

  private updateSceneDisplay(refreshCanvas = false): void {
    if (this.state.mode === 'screen' && this.video.srcObject) this.actions.display(this.video, null);
    else if (this.state.mode === 'pdf' && this.pdfDocument) this.actions.display(null, this.pdfCanvas, refreshCanvas);
    else this.actions.display(null, null);
  }

  private setError(message: string): void {
    this.errorMessage = message;
    const normalStatus = this.state.mode === 'none' ? 'Ready when you are' : this.state.currentPresenterId === this.localId ? 'You’re presenting' : `${this.state.presenterName ?? 'Someone'} is presenting`;
    this.status.textContent = message || normalStatus;
    this.panel.classList.toggle('has-error', Boolean(message));
    window.clearTimeout(this.noticeTimer);
    this.notice.textContent = message;
    this.notice.classList.toggle('hidden', !message || this.menuOpen);
    if (message && !this.menuOpen) {
      this.noticeTimer = window.setTimeout(() => this.notice.classList.add('hidden'), 6500);
    }
  }

  private updateMuteLabel(): void {
    this.video.muted = true;
    this.audio.muted = this.muted;
    this.audio.volume = this.volume;
    this.volumeInput.value = String(this.volume);
    this.muteButton.textContent = this.muted ? '🔇' : '🔊';
    this.muteButton.setAttribute('aria-label', this.muted ? 'Unmute shared audio' : 'Mute shared audio');
    this.muteButton.setAttribute('aria-pressed', String(!this.muted));
  }

  private toggleFocus(): void {
    this.focused = !this.focused;
    if (this.focused) this.menuOpen = false;
    this.actions.focus(this.focused);
    this.render();
    if (this.focused) this.focusButton.focus();
  }

  private onVisibilityChange = (): void => {
    this.setDisplayVisible(this.sceneVisible);
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.focused) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      this.toggleFocus();
    } else if (event.key === 'Escape' && this.menuOpen) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      this.closeMenu();
    }
  };

  private clearRemoteAudio(): void {
    this.audio.pause();
    this.audio.srcObject = null;
  }

  private readVolume(): number {
    const stored = Number(localStorage.getItem('mengai:theater-volume') ?? 0.8);
    return Number.isFinite(stored) ? Math.max(0, Math.min(1, stored)) : 0.8;
  }
}
