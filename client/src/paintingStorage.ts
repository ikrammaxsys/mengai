import type { Stroke } from './paintCanvas';

export interface PaintingRecord {
  id: string;
  title: string;
  author: string;
  imageData: string; // Data URL
  timestamp: number;
  strokes?: Stroke[];
}

/**
 * Client-side painting storage and gallery.
 * Saves to localStorage for now; can be extended to persist to server.
 */
export class PaintingStorage {
  private readonly storageKey = 'mengai-paintings';
  private paintings: Map<string, PaintingRecord> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data) as PaintingRecord[];
        for (const painting of parsed) {
          this.paintings.set(painting.id, painting);
        }
      }
    } catch (error) {
      console.error('Failed to load paintings from storage:', error);
    }
  }

  save(painting: PaintingRecord): void {
    this.paintings.set(painting.id, painting);
    this.syncToStorage();
  }

  delete(paintingId: string): boolean {
    const removed = this.paintings.delete(paintingId);
    if (removed) this.syncToStorage();
    return removed;
  }

  get(paintingId: string): PaintingRecord | null {
    return this.paintings.get(paintingId) ?? null;
  }

  getAll(): PaintingRecord[] {
    return Array.from(this.paintings.values());
  }

  update(paintingId: string, updates: Partial<PaintingRecord>): boolean {
    const painting = this.paintings.get(paintingId);
    if (!painting) return false;
    this.paintings.set(paintingId, { ...painting, ...updates });
    this.syncToStorage();
    return true;
  }

  private syncToStorage(): void {
    try {
      const array = Array.from(this.paintings.values());
      localStorage.setItem(this.storageKey, JSON.stringify(array));
    } catch (error) {
      console.error('Failed to save paintings to storage:', error);
    }
  }

  exportAsJson(paintingId: string): string | null {
    const painting = this.paintings.get(paintingId);
    if (!painting) return null;
    return JSON.stringify(painting, null, 2);
  }

  downloadImage(paintingId: string, filename?: string): void {
    const painting = this.paintings.get(paintingId);
    if (!painting) return;

    const link = document.createElement('a');
    link.href = painting.imageData;
    link.download = filename ?? `${painting.title || 'painting'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
