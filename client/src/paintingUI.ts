import { PaintCanvas, type BrushType, type Stroke } from './paintCanvas';

export const PAINTING_COLORS = [
  '#e74c3c', // red
  '#e67e22', // orange
  '#f1c40f', // yellow
  '#2ecc71', // green
  '#3498db', // light blue
  '#2980b9', // dark blue
  '#9b59b6', // purple
  '#e91e63', // pink
  '#8b6f47', // brown
  '#34495e', // black
  '#ffffff', // white
];

export type SizePreset = 'small' | 'medium' | 'large';

const SIZE_PRESETS: Record<SizePreset, number> = {
  small: 4,
  medium: 8,
  large: 16,
};

/**
 * UI for painting control: palette, brush selector, size, undo, save.
 * Minimal design, touch-friendly.
 */
export class PaintingUI {
  private root: HTMLElement;
  private paletteContainer: HTMLElement;
  private brushSelector: HTMLElement;
  private sizeSlider: HTMLInputElement;
  private sizeLabel: HTMLElement;
  private undoButton: HTMLButtonElement;
  private clearButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;
  private closeButton: HTMLButtonElement;
  private currentColor = '#000000';
  private currentBrush: BrushType = 'round';
  private currentSize = 12;

  private onColorChange?: (color: string) => void;
  private onBrushChange?: (brush: BrushType) => void;
  private onSizeChange?: (size: number) => void;
  private onUndo?: () => void;
  private onClear?: () => void;
  private onSave?: () => void;
  private onClose?: () => void;

  constructor() {
    this.root = document.createElement('div');
    this.root.id = 'painting-ui';
    this.root.className = 'painting-ui';
    this.root.innerHTML = `
      <div class="painting-top-actions">
        <button class="painting-save-btn" type="button">Save</button>
        <button class="painting-close" type="button" title="Close (Esc)">✕</button>
      </div>
      <aside class="painting-brush-panel" aria-label="Brush tools">
        <button class="brush-btn" data-brush="round" type="button"><span>●</span><b>Round</b></button>
        <button class="brush-btn" data-brush="soft" type="button"><span>◐</span><b>Soft</b></button>
        <button class="brush-btn" data-brush="flat" type="button"><span>▭</span><b>Flat</b></button>
      </aside>
      <aside class="painting-size-panel" aria-label="Brush size">
        <div class="size-preview"><span></span></div>
        <div class="painting-label"><span class="size-value">12</span> px</div>
        <input type="range" class="size-slider" min="4" max="24" value="12" />
        <button class="painting-action-btn painting-undo" type="button">Undo</button>
        <button class="painting-action-btn painting-clear" type="button">Clear</button>
      </aside>
      <div class="painting-palette" aria-label="Painting colors"></div>
    `;

    this.paletteContainer = this.root.querySelector<HTMLElement>('.painting-palette')!;
    this.brushSelector = this.root.querySelector<HTMLElement>('.painting-brush-panel')!;
    this.sizeSlider = this.root.querySelector<HTMLInputElement>('.size-slider')!;
    this.sizeLabel = this.root.querySelector<HTMLElement>('.size-value')!;
    this.undoButton = this.root.querySelector<HTMLButtonElement>('.painting-undo')!;
    this.clearButton = this.root.querySelector<HTMLButtonElement>('.painting-clear')!;
    this.saveButton = this.root.querySelector<HTMLButtonElement>('.painting-save-btn')!;
    this.closeButton = this.root.querySelector<HTMLButtonElement>('.painting-close')!;

    this.buildPalette();
    this.setupEventListeners();
    this.selectColor(PAINTING_COLORS[0]);
    this.selectBrush('round');
    this.updateSizePreview(12);
  }

  private buildPalette(): void {
    for (const color of PAINTING_COLORS) {
      const btn = document.createElement('button');
      btn.className = 'color-swatch';
      btn.style.backgroundColor = color;
      btn.dataset.color = color;
      btn.title = color;
      btn.addEventListener('click', () => this.selectColor(color));
      this.paletteContainer.appendChild(btn);
    }
  }

  private selectColor(color: string): void {
    document.querySelectorAll('.color-swatch').forEach((btn) => {
      btn.classList.toggle('selected', (btn as HTMLElement).dataset.color === color);
    });
    this.currentColor = color;
    this.onColorChange?.(color);
  }

  private setupEventListeners(): void {
    this.brushSelector.querySelectorAll<HTMLButtonElement>('.brush-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const brush = btn.dataset.brush as BrushType;
        this.selectBrush(brush);
      });
    });

    this.sizeSlider.addEventListener('input', (e) => {
      const size = Number((e.target as HTMLInputElement).value);
      this.currentSize = size;
      this.sizeLabel.textContent = String(size);
      this.updateSizePreview(size);
      this.onSizeChange?.(size);
    });

    this.undoButton.addEventListener('click', () => this.onUndo?.());
    this.clearButton.addEventListener('click', () => {
      if (confirm('Clear the canvas? This cannot be undone.')) {
        this.onClear?.();
      }
    });
    this.saveButton.addEventListener('click', () => this.onSave?.());
    this.closeButton.addEventListener('click', () => this.onClose?.());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.onClose?.();
    });
  }

  private selectBrush(brush: BrushType): void {
    this.brushSelector.querySelectorAll<HTMLButtonElement>('.brush-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.brush === brush);
    });
    this.currentBrush = brush;
    this.onBrushChange?.(brush);
  }

  private updateSizePreview(size: number): void {
    const preview = this.root.querySelector<HTMLElement>('.size-preview span');
    if (!preview) return;
    const diameter = Math.max(10, Math.min(34, size * 1.5));
    preview.style.width = `${diameter}px`;
    preview.style.height = `${diameter}px`;
  }

  getCurrentColor(): string {
    return this.currentColor;
  }

  getCurrentBrush(): BrushType {
    return this.currentBrush;
  }

  getCurrentSize(): number {
    return this.currentSize;
  }

  getRoot(): HTMLElement {
    return this.root;
  }

  setCallbacks(callbacks: {
    onColorChange?: (color: string) => void;
    onBrushChange?: (brush: BrushType) => void;
    onSizeChange?: (size: number) => void;
    onUndo?: () => void;
    onClear?: () => void;
    onSave?: () => void;
    onClose?: () => void;
  }): void {
    this.onColorChange = callbacks.onColorChange;
    this.onBrushChange = callbacks.onBrushChange;
    this.onSizeChange = callbacks.onSizeChange;
    this.onUndo = callbacks.onUndo;
    this.onClear = callbacks.onClear;
    this.onSave = callbacks.onSave;
    this.onClose = callbacks.onClose;
  }

  dispose(): void {
    this.root.remove();
  }
}

/**
 * Save/gallery UI for paintings.
 */
export class PaintingGalleryUI {
  private root: HTMLElement;
  private titleInput: HTMLInputElement;
  private saveConfirmButton: HTMLButtonElement;
  private saveCancelButton: HTMLButtonElement;
  private onSaveConfirm?: (title: string) => void;
  private onSaveCancel?: () => void;

  constructor() {
    this.root = document.createElement('div');
    this.root.id = 'painting-save-dialog';
    this.root.className = 'painting-save-dialog';
    this.root.innerHTML = `
      <div class="painting-save-modal">
        <div class="painting-save-title">Save Painting</div>
        <input type="text" class="painting-save-input" placeholder="Painting name (optional)" maxlength="50" />
        <div class="painting-save-buttons">
          <button class="painting-save-confirm">Save</button>
          <button class="painting-save-cancel">Cancel</button>
        </div>
      </div>
    `;
    this.root.style.display = 'none';

    this.titleInput = this.root.querySelector<HTMLInputElement>('.painting-save-input')!;
    this.saveConfirmButton = this.root.querySelector<HTMLButtonElement>('.painting-save-confirm')!;
    this.saveCancelButton = this.root.querySelector<HTMLButtonElement>('.painting-save-cancel')!;

    this.saveConfirmButton.addEventListener('click', () => {
      this.onSaveConfirm?.(this.titleInput.value.trim());
      this.hide();
    });

    this.saveCancelButton.addEventListener('click', () => {
      this.onSaveCancel?.();
      this.hide();
    });
  }

  show(callbacks: { onConfirm: (title: string) => void; onCancel: () => void }): void {
    this.onSaveConfirm = callbacks.onConfirm;
    this.onSaveCancel = callbacks.onCancel;
    this.titleInput.value = '';
    this.root.style.display = 'flex';
    this.titleInput.focus();
  }

  hide(): void {
    this.root.style.display = 'none';
  }

  getRoot(): HTMLElement {
    return this.root;
  }

  dispose(): void {
    this.root.remove();
  }
}
