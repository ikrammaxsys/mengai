import { FISH_CONFIG } from '../../shared/fishConfig';
import { WORLD_CONFIG } from '../../shared/worldConfig';
import { THEATER_SEATS } from '../../shared/theaterSeats';

export interface MapPlayer {
  x: number;
  z: number;
  facing: number;
  color: string;
  name: string;
  fishing: boolean;
  local: boolean;
}

export class Minimap {
  private zoom = 46;
  private lastRenderAt = 0;
  private readonly canvases: HTMLCanvasElement[];
  private readonly expanded: HTMLElement;
  private readonly zoomIn: HTMLButtonElement;
  private readonly zoomOut: HTMLButtonElement;

  constructor(miniCanvas: HTMLCanvasElement, expandedCanvas: HTMLCanvasElement, expanded: HTMLElement) {
    this.canvases = [miniCanvas, expandedCanvas];
    this.expanded = expanded;
    this.zoomIn = document.querySelector<HTMLButtonElement>('#map-zoom-in')!;
    this.zoomOut = document.querySelector<HTMLButtonElement>('#map-zoom-out')!;
    this.zoomIn.addEventListener('click', () => this.setZoom(this.zoom - 3));
    this.zoomOut.addEventListener('click', () => this.setZoom(this.zoom + 3));
  }

  setZoom(zoom: number): void {
    this.zoom = Math.max(10, Math.min(48, zoom));
    this.lastRenderAt = 0;
  }

  toggleExpanded(open = this.expanded.classList.contains('hidden')): void {
    this.expanded.classList.toggle('hidden', !open);
  }

  render(now: number, players: MapPlayer[]): void {
    if (now - this.lastRenderAt < 66) return;
    this.lastRenderAt = now;
    const self = players.find((player) => player.local) ?? { x: 0, z: 0, facing: 0 };
    this.draw(this.canvases[0], players, self, now, this.zoom);
    if (!this.expanded.classList.contains('hidden')) this.draw(this.canvases[1], players, self, now, Math.max(22, this.zoom + 5));
  }

  private draw(canvas: HTMLCanvasElement, players: MapPlayer[], self: Pick<MapPlayer, 'x' | 'z' | 'facing'>, now: number, zoom: number): void {
    const context = canvas.getContext('2d');
    if (!context) return;
    const width = canvas.width, height = canvas.height;
    const cx = width / 2, cy = height / 2;
    const edge = Math.min(width, height) * 0.46;
    const scale = edge / zoom;
    const point = (x: number, z: number) => ({ x: cx + (x - self.x) * scale, y: cy - (z - self.z) * scale });

    context.clearRect(0, 0, width, height);
    context.save();
    context.beginPath();
    context.arc(cx, cy, edge, 0, Math.PI * 2);
    context.clip();
    context.fillStyle = '#c6e5e8';
    context.fillRect(0, 0, width, height);

    const island = point(0, 0);
    const islandRadius = WORLD_CONFIG.grassRadius * scale;
    context.beginPath();
    context.arc(island.x, island.y, islandRadius, 0, Math.PI * 2);
    context.fillStyle = '#b8d99d';
    context.fill();
    context.lineWidth = Math.max(2, scale * 1.8);
    context.strokeStyle = '#e5d8a9';
    context.stroke();

    const pondRadius = FISH_CONFIG.pond.waterRadius * scale;
    context.beginPath();
    context.arc(island.x, island.y, pondRadius + Math.max(2, scale * 0.8), 0, Math.PI * 2);
    context.fillStyle = '#e9dfbb';
    context.fill();
    context.beginPath();
    context.arc(island.x, island.y, pondRadius, 0, Math.PI * 2);
    context.fillStyle = '#61b8c4';
    context.fill();
    context.lineWidth = Math.max(1, scale * 0.12);
    context.strokeStyle = 'rgba(255,255,255,.55)';
    context.stroke();

    for (const [x, z] of WORLD_CONFIG.trees) {
      const p = point(x, z);
      context.beginPath(); context.arc(p.x, p.y, Math.max(2.3, scale * 0.42), 0, Math.PI * 2);
      context.fillStyle = '#477f61'; context.fill();
    }
    for (const [x, z] of WORLD_CONFIG.rocks) {
      const p = point(x, z);
      context.beginPath(); context.arc(p.x, p.y, Math.max(1.6, scale * 0.23), 0, Math.PI * 2);
      context.fillStyle = '#827e69'; context.fill();
    }
    for (const pebble of FISH_CONFIG.stones.pebbles) {
      const p = point(pebble.x, pebble.z);
      context.beginPath(); context.arc(p.x, p.y, Math.max(1.2, scale * 0.18), 0, Math.PI * 2);
      context.fillStyle = '#786e62'; context.fill();
    }

    const wheel = WORLD_CONFIG.playground.wheel;
    const wheelPoint = point(wheel.x, wheel.z);
    context.beginPath(); context.arc(wheelPoint.x, wheelPoint.y, Math.max(3, wheel.radius * scale), 0, Math.PI * 2);
    context.strokeStyle = '#d987a7'; context.lineWidth = Math.max(2, scale * 0.5); context.stroke();
    context.beginPath(); context.arc(wheelPoint.x, wheelPoint.y, Math.max(1.5, scale * 0.35), 0, Math.PI * 2);
    context.fillStyle = '#e8c874'; context.fill();
    const slide = point(WORLD_CONFIG.playground.slide.x, WORLD_CONFIG.playground.slide.z);
    context.fillStyle = '#d987a7'; context.fillRect(slide.x - 3, slide.y - 2, 6, 4);
    const seesaw = point(WORLD_CONFIG.playground.seesaw.x, WORLD_CONFIG.playground.seesaw.z);
    context.strokeStyle = '#c99b73'; context.lineWidth = Math.max(2, scale * 0.45);
    context.beginPath(); context.moveTo(seesaw.x - 4, seesaw.y); context.lineTo(seesaw.x + 4, seesaw.y); context.stroke();

    const theater = point(WORLD_CONFIG.theater.x, WORLD_CONFIG.theater.z);
    context.fillStyle = '#284c40'; context.fillRect(theater.x - 5, theater.y - 3.5, 10, 7);
    context.strokeStyle = '#f5eedc'; context.lineWidth = 1.5; context.strokeRect(theater.x - 5, theater.y - 3.5, 10, 7);
    context.fillStyle = '#83d3a9'; context.fillRect(theater.x - 2.5, theater.y - 2, 5, 4);
    context.fillStyle = '#b28a62';
    for (const seat of THEATER_SEATS) {
      const p = point(seat.x, seat.z);
      context.fillRect(p.x - 1.4, p.y - 0.9, 2.8, 1.8);
    }

    const campfire = point(WORLD_CONFIG.campfire.x, WORLD_CONFIG.campfire.z);
    context.beginPath(); context.arc(campfire.x, campfire.y, 12, 0, Math.PI * 2);
    context.fillStyle = 'rgba(232, 137, 74, .22)'; context.fill();
    context.lineCap = 'round'; context.lineWidth = 3.5; context.strokeStyle = '#79543e';
    context.beginPath(); context.moveTo(campfire.x - 7, campfire.y + 6); context.lineTo(campfire.x + 7, campfire.y + 2); context.moveTo(campfire.x - 6, campfire.y + 2); context.lineTo(campfire.x + 6, campfire.y + 6); context.stroke();
    context.beginPath(); context.moveTo(campfire.x, campfire.y + 5); context.bezierCurveTo(campfire.x - 8, campfire.y, campfire.x + 1, campfire.y - 4, campfire.x, campfire.y - 9); context.bezierCurveTo(campfire.x + 9, campfire.y - 3, campfire.x + 6, campfire.y + 3, campfire.x, campfire.y + 5); context.closePath();
    context.fillStyle = '#e8894a'; context.fill(); context.lineWidth = 1.8; context.strokeStyle = '#fff8e9'; context.stroke();
    context.beginPath(); context.moveTo(campfire.x, campfire.y + 2); context.quadraticCurveTo(campfire.x - 3, campfire.y - 1, campfire.x + 1, campfire.y - 5);
    context.strokeStyle = '#ffe5a6'; context.lineWidth = 1.5; context.stroke();

    for (const player of players) {
      if (player.local) continue;
      const p = point(player.x, player.z);
      if (player.fishing) {
        context.beginPath(); context.arc(p.x, p.y, 5 + (Math.sin(now / 180) + 1) * 2.4, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(55, 157, 125, .7)'; context.lineWidth = 1.8; context.stroke();
      }
      context.beginPath(); context.arc(p.x, p.y, 4.2, 0, Math.PI * 2);
      context.fillStyle = player.color; context.fill(); context.lineWidth = 1.5; context.strokeStyle = '#fff'; context.stroke();
    }

    const pondDistance = Math.hypot(island.x - cx, island.y - cy);
    if (pondDistance > edge - pondRadius * 0.85) {
      const angle = Math.atan2(island.y - cy, island.x - cx);
      const arrowX = cx + Math.cos(angle) * (edge - 7);
      const arrowY = cy + Math.sin(angle) * (edge - 7);
      context.save(); context.translate(arrowX, arrowY); context.rotate(angle);
      context.beginPath(); context.moveTo(6, 0); context.lineTo(-4, -4); context.lineTo(-4, 4); context.closePath();
      context.fillStyle = '#2995a1'; context.fill(); context.restore();
    }

    context.save(); context.translate(cx, cy); context.rotate(self.facing);
    context.beginPath(); context.moveTo(0, -10); context.lineTo(7, 7); context.lineTo(0, 4); context.lineTo(-7, 7); context.closePath();
    context.fillStyle = '#f3a34f'; context.fill(); context.lineWidth = 2; context.strokeStyle = '#fff'; context.stroke(); context.restore();
    context.restore();
  }
}
