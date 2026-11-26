import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { FishSpecies, FishSpeciesId } from '../../shared/fishConfig.js';
import { FISH_CONFIG } from '../../shared/fishConfig.js';

export type ShopSlot = 'head' | 'body' | 'feet' | 'rodSkin' | 'bobber' | 'held' | 'chair';
export interface ShopEquipped {
  head: string | null;
  body: string | null;
  feet: string | null;
  rodSkin: string | null;
  bobber: string | null;
  held: string | null;
  chair: string | null;
}
export interface ShopPlayerData {
  coins: number;
  scrap: number;
  ownedItems: string[];
  equipped: ShopEquipped;
  dailySold: { date: string; count: number };
  pinnedItem: string | null;
  firstPurchase: boolean;
}
export interface ShopItem {
  id: string;
  name: string;
  slot: ShopSlot;
  price: number;
  scrap: number;
  prerequisite: string | null;
  requiredFish: { species: FishSpeciesId; count: number } | null;
}
export interface ShopConfig {
  stall: { x: number; z: number; interactionRadius: number };
  weightFactor: { baseline: number; weightRange: number };
  dailySell: { tiers: { through: number; payFactor: number }[] };
  confirmThresholdCoins: number;
  baseValues: Partial<Record<FishSpeciesId, number>>;
  items: ShopItem[];
}

const configPath = fileURLToPath(new URL('../data/shop-config.json', import.meta.url));
export const SHOP_CONFIG: ShopConfig = JSON.parse(readFileSync(configPath, 'utf8')) as ShopConfig;
const configuredMoneyOverride = Number(process.env.MONEY_OVERRIDE_COINS);
export const MONEY_OVERRIDE_COINS = Number.isFinite(configuredMoneyOverride) && configuredMoneyOverride >= 0
  ? Math.floor(configuredMoneyOverride)
  : null;
const configuredScrapOverride = Number(process.env.SCRAP_OVERRIDE_COUNT);
export const SCRAP_OVERRIDE_COUNT = Number.isFinite(configuredScrapOverride) && configuredScrapOverride >= 0
  ? Math.floor(configuredScrapOverride)
  : null;
const configuredKoiEmasOverride = Number(process.env.KOI_EMAS_OVERRIDE_COUNT);
export const KOI_EMAS_OVERRIDE_COUNT = Number.isFinite(configuredKoiEmasOverride) && configuredKoiEmasOverride >= 0
  ? Math.floor(configuredKoiEmasOverride)
  : null;

export function defaultShopData(): ShopPlayerData {
  return { coins: applyMoneyOverride(0), scrap: applyScrapOverride(0), ownedItems: [], equipped: { head: null, body: null, feet: null, rodSkin: null, bobber: null, held: null, chair: null }, dailySold: { date: todayKey(), count: 0 }, pinnedItem: null, firstPurchase: false };
}

export function todayKey(now = Date.now()): string {
  const date = new Date(now);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function normalizeShopData(value: Partial<ShopPlayerData> | undefined): ShopPlayerData {
  const defaults = defaultShopData();
  if (!value) return defaults;
  const equipped = value.equipped ?? {};
  return {
    coins: applyMoneyOverride(safeInt(value.coins)),
    scrap: applyScrapOverride(safeInt(value.scrap)),
    ownedItems: Array.isArray(value.ownedItems) ? value.ownedItems.filter((id): id is string => typeof id === 'string') : [],
    equipped: {
      head: typeof equipped.head === 'string' ? equipped.head : null,
      body: typeof equipped.body === 'string' ? equipped.body : null,
      feet: typeof equipped.feet === 'string' ? equipped.feet : null,
      rodSkin: typeof equipped.rodSkin === 'string' ? equipped.rodSkin : null,
      bobber: typeof equipped.bobber === 'string' ? equipped.bobber : null,
      held: typeof equipped.held === 'string' ? equipped.held : null,
      chair: typeof equipped.chair === 'string' ? equipped.chair : null,
    },
    dailySold: {
      date: typeof value.dailySold?.date === 'string' ? value.dailySold.date : todayKey(),
      count: safeInt(value.dailySold?.count),
    },
    pinnedItem: typeof value.pinnedItem === 'string' ? value.pinnedItem : null,
    firstPurchase: value.firstPurchase === true,
  };
}

export function applyMoneyOverride(coins: number): number {
  return MONEY_OVERRIDE_COINS ?? coins;
}

export function applyScrapOverride(scrap: number): number {
  return SCRAP_OVERRIDE_COUNT ?? scrap;
}

export function effectiveKoiEmasCount(actualCount: number): number {
  return KOI_EMAS_OVERRIDE_COUNT ?? actualCount;
}

export function resetDailyIfNeeded(data: ShopPlayerData, now = Date.now()): void {
  const date = todayKey(now);
  if (data.dailySold.date !== date) data.dailySold = { date, count: 0 };
}

export function sellPrice(species: FishSpecies, weightKg: number): number {
  if (species.kind === 'junk') return 0;
  const base = SHOP_CONFIG.baseValues[species.id] ?? 0;
  const position = (weightKg - species.minKg) / Math.max(0.0001, species.maxKg - species.minKg);
  const clamped = Math.max(0, Math.min(1, position));
  const factor = SHOP_CONFIG.weightFactor.baseline + SHOP_CONFIG.weightFactor.weightRange * clamped;
  return Math.max(1, Math.round(base * factor));
}

export function payFactor(data: ShopPlayerData, soldIndex: number): number {
  resetDailyIfNeeded(data);
  for (const tier of SHOP_CONFIG.dailySell.tiers) {
    if (soldIndex <= tier.through) return tier.payFactor;
  }
  return SHOP_CONFIG.dailySell.tiers.at(-1)?.payFactor ?? 0.25;
}

export function fullPriceRemaining(data: ShopPlayerData): number {
  resetDailyIfNeeded(data);
  return Math.max(0, 20 - data.dailySold.count);
}

function safeInt(value: unknown): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(Number(value))) : 0;
}
