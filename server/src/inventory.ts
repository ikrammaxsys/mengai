import type { FishKind, FishRarity, FishSpeciesId } from '../../shared/fishConfig.js';

export interface CatchRecord {
  catchId: string;
  species: FishSpeciesId;
  rarity: FishRarity;
  weightKg: number;
  caughtAt: number;
  kind?: FishKind;
}

export interface InventoryStore {
  list(sessionId: string): CatchRecord[];
  totalCaught(sessionId: string): number;
  personalBest(sessionId: string): CatchRecord | null;
  collection(sessionId: string): CatchRecord[];
  restore(sessionId: string, data: { items: CatchRecord[]; totalCaught: number; personalBest: CatchRecord | null; collection: CatchRecord[] }): void;
  add(sessionId: string, item: CatchRecord): void;
  remove(sessionId: string, catchId: string): boolean;
  delete(sessionId: string): void;
}

export class InMemoryInventoryStore implements InventoryStore {
  private readonly inventories = new Map<string, { items: Map<string, CatchRecord>; totalCaught: number; personalBest: CatchRecord | null; speciesBest: Map<string, CatchRecord> }>();

  list(sessionId: string): CatchRecord[] {
    return [...(this.inventories.get(sessionId)?.items.values() ?? [])];
  }

  totalCaught(sessionId: string): number { return this.inventories.get(sessionId)?.totalCaught ?? 0; }
  personalBest(sessionId: string): CatchRecord | null { return this.inventories.get(sessionId)?.personalBest ?? null; }
  collection(sessionId: string): CatchRecord[] { return [...(this.inventories.get(sessionId)?.speciesBest.values() ?? [])]; }

  restore(sessionId: string, data: { items: CatchRecord[]; totalCaught: number; personalBest: CatchRecord | null; collection: CatchRecord[] }): void {
    this.inventories.set(sessionId, {
      items: new Map(data.items.map((item) => [item.catchId, item])),
      totalCaught: data.totalCaught,
      personalBest: data.personalBest,
      speciesBest: new Map(data.collection.map((item) => [item.species, item])),
    });
  }

  add(sessionId: string, item: CatchRecord): void {
    let inventory = this.inventories.get(sessionId);
    if (!inventory) {
      inventory = { items: new Map(), totalCaught: 0, personalBest: null, speciesBest: new Map() };
      this.inventories.set(sessionId, inventory);
    }
    inventory.items.set(item.catchId, item);
    if (item.kind === 'junk') return;
    inventory.totalCaught += 1;
    if (!inventory.personalBest || item.weightKg > inventory.personalBest.weightKg) inventory.personalBest = item;
    const speciesBest = inventory.speciesBest.get(item.species);
    if (!speciesBest || item.weightKg > speciesBest.weightKg) inventory.speciesBest.set(item.species, item);
  }

  remove(sessionId: string, catchId: string): boolean {
    const inventory = this.inventories.get(sessionId);
    if (!inventory) return false;
    return inventory.items.delete(catchId);
  }

  delete(sessionId: string): void { this.inventories.delete(sessionId); }
}
