export const PHOTOBOOTH_CONFIG = {
  logoPath: '/toray-logo1.png',
  position: { x: 0, z: -20 },
  interactionRadius: 3.4,
  stageRadius: 3.4,
  stageWidth: 7.6,
  stageDepth: 7.2,
  cameraOffset: { x: 0, y: 3.1, z: 9.8 },
  targetOffset: { x: 0, y: 1.55, z: 0 },
  logoAspect: 289 / 51,
  photoWidth: 1080,
  photoHeight: 1350,
} as const;

export type PhotoFilter = 'none' | 'warm' | 'sunset' | 'mono';

export interface PhotoCaptureFrame {
  source: HTMLCanvasElement;
  namePoint: { x: number; y: number } | null;
  room: string;
  playerName: string;
}

interface PhotoRecord {
  id: number;
  dataUrl: string;
  filename: string;
  room: string;
  playerName: string;
  date: Date;
}

interface PhotoboothCallbacks {
  onExit: () => void;
  prepareCapture: () => Promise<void>;
  captureScene: (showName: boolean) => PhotoCaptureFrame;
}

const FILTERS: Record<PhotoFilter, { name: string; css: string }> = {
  none: { name: 'Natural', css: 'none' },
  warm: { name: 'Warm', css: 'sepia(.16) saturate(1.12)' },
  sunset: { name: 'Sunset', css: 'saturate(1.18) hue-rotate(-9deg)' },
  mono: { name: 'Black & white', css: 'grayscale(1)' },
};

export class Photobooth {
  private readonly root: HTMLElement;
  private readonly resultModal: HTMLElement;
  private readonly resultPhoto: HTMLImageElement;
  private readonly gallery: HTMLElement;
  private readonly countdown: HTMLElement;
  private readonly flash: HTMLElement;
  private readonly status: HTMLElement;
  private readonly timerSelect: HTMLSelectElement;
  private readonly filterSelect: HTMLSelectElement;
  private readonly showNameInput: HTMLInputElement;
  private readonly captureButton: HTMLButtonElement;
  private readonly logo = new Image();
  private readonly logoReady: Promise<boolean>;
  private readonly callbacks: PhotoboothCallbacks;
  private readonly photos: PhotoRecord[] = [];
  private active = false;
  private busy = false;
  private nextPhotoId = 1;
  private countdownTimer = 0;
  private flashTimer = 0;
  private currentPhoto: PhotoRecord | null = null;

  constructor(root: HTMLElement, callbacks: PhotoboothCallbacks) {
    this.root = root;
    this.callbacks = callbacks;
    this.resultModal = document.querySelector<HTMLElement>('#photo-result')!;
    this.resultPhoto = document.querySelector<HTMLImageElement>('#photo-result-image')!;
    this.gallery = root.querySelector<HTMLElement>('#photobooth-gallery')!;
    this.countdown = root.querySelector<HTMLElement>('#photobooth-countdown')!;
    this.flash = root.querySelector<HTMLElement>('#photobooth-flash')!;
    this.status = root.querySelector<HTMLElement>('#photobooth-status')!;
    this.timerSelect = root.querySelector<HTMLSelectElement>('#photo-timer')!;
    this.filterSelect = root.querySelector<HTMLSelectElement>('#photo-filter')!;
    this.showNameInput = root.querySelector<HTMLInputElement>('#photo-show-name')!;
    this.captureButton = root.querySelector<HTMLButtonElement>('#photo-capture')!;

    this.logoReady = new Promise((resolve) => {
      this.logo.onload = () => resolve(true);
      this.logo.onerror = () => resolve(false);
      this.logo.src = PHOTOBOOTH_CONFIG.logoPath;
      if (this.logo.complete && this.logo.naturalWidth > 0) resolve(true);
    });

    this.captureButton.addEventListener('click', () => this.requestCapture());
    root.querySelector<HTMLButtonElement>('#photo-exit')!.addEventListener('click', callbacks.onExit);
    this.resultModal.querySelector<HTMLButtonElement>('#photo-download')!.addEventListener('click', () => this.downloadCurrent());
    this.resultModal.querySelector<HTMLButtonElement>('#photo-share')!.addEventListener('click', () => this.shareOrDownloadCurrent());
    this.resultModal.querySelector<HTMLButtonElement>('#photo-retake')!.addEventListener('click', () => this.closeResult());
    this.resultModal.querySelector<HTMLButtonElement>('#photo-result-close')!.addEventListener('click', () => this.closeResult());
    this.resultModal.querySelector<HTMLElement>('.photo-result-backdrop')!.addEventListener('click', () => this.closeResult());
  }

  open(): void {
    this.active = true;
    this.root.classList.remove('hidden');
    this.root.querySelector<HTMLButtonElement>('#photo-capture')!.focus({ preventScroll: true });
  }

  close(): void {
    this.active = false;
    this.clearCountdown();
    this.closeResult();
    this.root.classList.add('hidden');
    this.status.textContent = '';
  }

  handleKey(event: KeyboardEvent): void {
    if (!this.active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.callbacks.onExit();
      return;
    }
    const target = event.target;
    const formControl = target instanceof HTMLInputElement || target instanceof HTMLSelectElement;
    if ((event.key.toLowerCase() === 'p') && !formControl) {
      event.preventDefault();
      this.callbacks.onExit();
      return;
    }
    if ((event.code === 'Space' || event.key === 'Enter') && !formControl && !(target instanceof HTMLButtonElement) && this.resultModal.classList.contains('hidden')) {
      event.preventDefault();
      this.requestCapture();
    }
  }

  private requestCapture(): void {
    if (this.busy || !this.active) return;
    const seconds = Number(this.timerSelect.value);
    if (seconds > 0) this.startCountdown(seconds);
    else void this.capture();
  }

  private startCountdown(seconds: number): void {
    this.clearCountdown();
    let remaining = seconds;
    const tick = (): void => {
      this.countdown.textContent = String(remaining);
      this.countdown.classList.remove('hidden');
      if (remaining <= 1) {
        this.countdownTimer = window.setTimeout(() => {
          this.countdown.classList.add('hidden');
          this.countdownTimer = 0;
          void this.capture();
        }, 1000);
      } else {
        remaining -= 1;
        this.countdownTimer = window.setTimeout(tick, 1000);
      }
    };
    tick();
  }

  private clearCountdown(): void {
    window.clearTimeout(this.countdownTimer);
    this.countdownTimer = 0;
    this.countdown.classList.add('hidden');
  }

  private async capture(): Promise<void> {
    if (this.busy || !this.active) return;
    this.busy = true;
    this.captureButton.disabled = true;
    this.status.textContent = 'Ready…';
    try {
      const [hasLogo] = await Promise.all([this.logoReady, this.callbacks.prepareCapture()]);
      if (!this.active) return;
      const capturedAt = new Date();
      const frame = this.callbacks.captureScene(this.showNameInput.checked);
      const photo = this.composePhoto(frame, this.filterSelect.value as PhotoFilter, hasLogo, capturedAt);
      const record: PhotoRecord = {
        id: this.nextPhotoId++,
        dataUrl: photo,
        filename: this.filename(frame.room, capturedAt),
        room: frame.room,
        playerName: frame.playerName,
        date: capturedAt,
      };
      this.photos.unshift(record);
      if (this.photos.length > 10) this.photos.length = 10;
      this.renderGallery();
      this.openResult(record);
      this.flash.classList.remove('flash');
      void this.flash.offsetWidth;
      this.flash.classList.add('flash');
      window.clearTimeout(this.flashTimer);
      this.flashTimer = window.setTimeout(() => this.flash.classList.remove('flash'), 180);
      this.status.textContent = '';
    } catch {
      this.status.textContent = 'Couldn’t capture that photo. Try again.';
    } finally {
      this.busy = false;
      this.captureButton.disabled = false;
    }
  }

  private composePhoto(frame: PhotoCaptureFrame, filter: PhotoFilter, hasLogo: boolean, capturedAt: Date): string {
    const width = PHOTOBOOTH_CONFIG.photoWidth;
    const height = PHOTOBOOTH_CONFIG.photoHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is unavailable');

    const source = frame.source;
    const targetAspect = width / height;
    const sourceAspect = source.width / source.height;
    let sx = 0, sy = 0, sw = source.width, sh = source.height;
    if (sourceAspect > targetAspect) {
      sw = source.height * targetAspect;
      sx = (source.width - sw) / 2;
    } else {
      sh = source.width / targetAspect;
      sy = (source.height - sh) / 2;
    }
    context.filter = FILTERS[filter]?.css ?? 'none';
    context.drawImage(source, sx, sy, sw, sh, 0, 0, width, height);
    context.filter = 'none';

    if (this.showNameInput.checked && frame.namePoint) this.drawNameTag(context, frame.namePoint, sx, sy, sw, sh, source.width, source.height, frame.playerName);

    const stripY = height - 112;
    context.fillStyle = 'rgba(32, 54, 47, .76)';
    context.fillRect(0, stripY, width, 112);
    context.strokeStyle = 'rgba(255,255,255,.9)';
    context.lineWidth = 18;
    context.strokeRect(9, 9, width - 18, height - 18);

    if (hasLogo && this.logo.naturalWidth > 0) {
      const maxWidth = 178, maxHeight = 48;
      const scale = Math.min(maxWidth / this.logo.naturalWidth, maxHeight / this.logo.naturalHeight);
      const logoWidth = this.logo.naturalWidth * scale, logoHeight = this.logo.naturalHeight * scale;
      context.fillStyle = 'rgba(255,255,255,.94)';
      this.roundRect(context, 38, stripY + 28, 202, 58, 13);
      context.fill();
      context.drawImage(this.logo, 50, stripY + (112 - logoHeight) / 2, logoWidth, logoHeight);
    }

    const dateLabel = this.formatDate(capturedAt);
    const caption = `Room ${frame.room} · ${frame.playerName} · ${dateLabel}`;
    context.fillStyle = '#fff';
    context.font = '600 27px Trebuchet MS, Segoe UI, sans-serif';
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    context.fillText(caption, width - 42, stripY + 56, width - 315);
    return canvas.toDataURL('image/png');
  }

  private drawNameTag(context: CanvasRenderingContext2D, point: { x: number; y: number }, sx: number, sy: number, sw: number, sh: number, sourceWidth: number, sourceHeight: number, name: string): void {
    const sourceX = point.x * sourceWidth, sourceY = point.y * sourceHeight;
    if (sourceX < sx || sourceX > sx + sw || sourceY < sy || sourceY > sy + sh) return;
    const x = (sourceX - sx) / sw * PHOTOBOOTH_CONFIG.photoWidth;
    const y = (sourceY - sy) / sh * PHOTOBOOTH_CONFIG.photoHeight;
    context.font = '700 24px Trebuchet MS, Segoe UI, sans-serif';
    const width = context.measureText(name).width + 30;
    context.fillStyle = 'rgba(255,255,255,.92)';
    this.roundRect(context, x - width / 2, y - 64, width, 40, 20);
    context.fill();
    context.fillStyle = '#31564d';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(name, x, y - 44, width - 20);
  }

  private roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
  }

  private filename(room: string, date: Date): string {
    const slug = room.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'pond';
    return `pondside-room${slug}-${date.toISOString().slice(0, 10)}.png`;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  }

  private renderGallery(): void {
    this.gallery.replaceChildren();
    this.gallery.classList.toggle('hidden', this.photos.length === 0);
    for (const photo of this.photos) {
      const tile = document.createElement('div'); tile.className = 'photo-gallery-tile';
      const open = document.createElement('button'); open.type = 'button'; open.className = 'photo-gallery-open'; open.setAttribute('aria-label', `Open photo from ${this.formatDate(photo.date)}`);
      const image = document.createElement('img'); image.src = photo.dataUrl; image.alt = '';
      open.append(image); open.addEventListener('click', () => this.openResult(photo));
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'photo-gallery-delete'; remove.textContent = '×'; remove.setAttribute('aria-label', 'Delete photo');
      remove.addEventListener('click', () => {
        const index = this.photos.findIndex((entry) => entry.id === photo.id);
        if (index >= 0) this.photos.splice(index, 1);
        if (this.currentPhoto?.id === photo.id) this.closeResult();
        this.renderGallery();
      });
      tile.append(open, remove); this.gallery.append(tile);
    }
  }

  private openResult(photo: PhotoRecord): void {
    this.currentPhoto = photo;
    this.resultPhoto.src = photo.dataUrl;
    this.resultModal.classList.remove('hidden');
    document.querySelector<HTMLButtonElement>('#photo-download')!.focus({ preventScroll: true });
  }

  private closeResult(): void {
    this.currentPhoto = null;
    this.resultModal.classList.add('hidden');
    this.resultPhoto.removeAttribute('src');
  }

  private downloadCurrent(): void {
    if (!this.currentPhoto) return;
    const link = document.createElement('a');
    link.href = this.currentPhoto.dataUrl;
    link.download = this.currentPhoto.filename;
    document.body.append(link); link.click(); link.remove();
  }

  private async shareOrDownloadCurrent(): Promise<void> {
    if (!this.currentPhoto) return;
    const photo = this.currentPhoto;
    try {
      const response = await fetch(photo.dataUrl);
      const file = new File([await response.blob()], photo.filename, { type: 'image/png' });
      if (typeof navigator.share === 'function' && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ files: [file], title: 'Pondside photo' });
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
    this.downloadCurrent();
  }
}
