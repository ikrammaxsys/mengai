import * as THREE from 'three';

export type BrushType = 'round' | 'soft' | 'flat';

export interface BrushConfig {
  type: BrushType;
  color: string;
  size: number;
}

export interface StrokePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface Stroke {
  id: string;
  brushType: BrushType;
  color: string;
  size: number;
  points: StrokePoint[];
  startTime: number;
}

/** Paints strokes onto a canvas texture using a soft brush technique. */
export class PaintCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: THREE.CanvasTexture;
  private currentStroke: Stroke | null = null;
  private strokeHistory: Stroke[] = [];
  private maxHistorySize = 50;

  constructor(
    public readonly width: number = 1024,
    public readonly height: number = 768,
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, width, height);

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = false;
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.minFilter = THREE.LinearFilter;
  }

  get canvasTexture(): THREE.CanvasTexture {
    return this.texture;
  }

  beginStroke(id: string, brush: BrushConfig): void {
    this.currentStroke = {
      id,
      brushType: brush.type,
      color: brush.color,
      size: brush.size,
      points: [],
      startTime: Date.now(),
    };
  }

  addPoint(x: number, y: number): void {
    if (!this.currentStroke) return;
    this.currentStroke.points.push({ x, y, timestamp: Date.now() });
  }

  endStroke(): Stroke | null {
    const stroke = this.currentStroke;
    if (!stroke || stroke.points.length === 0) {
      this.currentStroke = null;
      return null;
    }

    this.rasterizeStroke(stroke);
    this.strokeHistory.push(stroke);
    if (this.strokeHistory.length > this.maxHistorySize) {
      this.strokeHistory.shift();
    }

    this.currentStroke = null;
    this.texture.needsUpdate = true;
    return stroke;
  }

  private rasterizeStroke(stroke: Stroke): void {
    if (stroke.points.length === 0) return;

    this.ctx.save();
    this.ctx.globalAlpha = this.getOpacityForBrush(stroke.brushType);

    const points = stroke.points;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      this.paintBrushStroke(stroke, p0.x, p0.y, p1.x, p1.y, stroke.size);
    }

    this.ctx.restore();
  }

  private paintBrushStroke(stroke: Stroke, x0: number, y0: number, x1: number, y1: number, size: number): void {
    const steps = Math.max(2, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    const dx = (x1 - x0) / steps;
    const dy = (y1 - y0) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = x0 + dx * i;
      const y = y0 + dy * i;

      if (stroke.brushType === 'round') {
        this.paintRoundBrush(x, y, size, stroke.color);
      } else if (stroke.brushType === 'soft') {
        this.paintSoftBrush(x, y, size, stroke.color);
      } else if (stroke.brushType === 'flat') {
        this.paintFlatBrush(x, y, size, stroke.color);
      }
    }
  }

  private paintRoundBrush(x: number, y: number, size: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private paintSoftBrush(x: number, y: number, size: number, color: string): void {
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size / 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + '00');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private paintFlatBrush(x: number, y: number, size: number, color: string): void {
    const halfSize = size / 2;
    this.ctx.fillStyle = color;

    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.fillRect(x - halfSize * 0.9, y - halfSize * 0.7, size * 0.9, size * 0.7);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  private getOpacityForBrush(brushType: BrushType): number {
    switch (brushType) {
      case 'round': return 0.95;
      case 'soft': return 0.65;
      case 'flat': return 0.85;
    }
  }

  replayStroke(stroke: Stroke): void {
    if (this.strokeHistory.some((existing) => existing.id === stroke.id)) return;
    this.rasterizeStroke(stroke);
    this.strokeHistory.push(stroke);
    if (this.strokeHistory.length > this.maxHistorySize) this.strokeHistory.shift();
    this.texture.needsUpdate = true;
  }

  undo(): boolean {
    if (this.strokeHistory.length === 0) return false;
    this.strokeHistory.pop();
    this.redrawFromHistory();
    return true;
  }

  private redrawFromHistory(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);
    for (const stroke of this.strokeHistory) {
      this.rasterizeStroke(stroke);
    }
    this.texture.needsUpdate = true;
  }

  clear(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.strokeHistory = [];
    this.texture.needsUpdate = true;
  }

  getImage(): string {
    return this.canvas.toDataURL('image/png');
  }

  getStrokes(): Stroke[] {
    return [...this.strokeHistory];
  }

  dispose(): void {
    this.texture.dispose();
  }
}
