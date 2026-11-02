import * as THREE from 'three';
import type { CatchEntry } from './network';
import { FISH_CONFIG } from '../../shared/fishConfig';
import { createFishModel } from './fishModels';

export class FishViewer {
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private fish?: THREE.Group;
  private frame = 0;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private canvas?: HTMLCanvasElement;
  private readonly stage: HTMLElement;
  private readonly rarity: HTMLElement;
  private readonly name: HTMLElement;
  private readonly weight: HTMLElement;
  private readonly length: HTMLElement;
  private readonly catcher: HTMLElement;
  private readonly caughtAt: HTMLElement;
  private readonly rank: HTMLElement;

  constructor(private readonly root: HTMLElement, private readonly leaderboard: () => CatchEntry[]) {
    this.stage = root.querySelector<HTMLElement>('#fish-viewer-stage')!;
    this.rarity = root.querySelector<HTMLElement>('#fish-viewer-rarity')!;
    this.name = root.querySelector<HTMLElement>('#fish-viewer-name')!;
    this.weight = root.querySelector<HTMLElement>('#fish-viewer-weight')!;
    this.length = root.querySelector<HTMLElement>('#fish-viewer-length')!;
    this.catcher = root.querySelector<HTMLElement>('#fish-viewer-catcher')!;
    this.caughtAt = root.querySelector<HTMLElement>('#fish-viewer-time')!;
    this.rank = root.querySelector<HTMLElement>('#fish-viewer-rank')!;
    root.querySelector<HTMLButtonElement>('#fish-viewer-close')!.addEventListener('click', () => this.close());
    root.querySelector<HTMLElement>('#fish-viewer-backdrop')!.addEventListener('click', () => this.close());
  }

  open(entry: CatchEntry): void {
    this.disposeScene();
    const species = FISH_CONFIG.species.find((fish) => fish.id === entry.species)!;
    this.rarity.textContent = species.rarity;
    this.rarity.style.setProperty('--rarity-color', species.rarityColor);
    this.name.textContent = species.name;
    this.weight.textContent = `${entry.weightKg.toFixed(2)} kg`;
    this.length.textContent = `~${Math.round(species.lengthK * Math.cbrt(entry.weightKg))} cm estimated length`;
    this.catcher.textContent = `Caught by ${entry.playerName}`;
    this.caughtAt.textContent = this.timeAgo(entry.timestamp);
    const index = this.leaderboard().findIndex((catchEntry) => catchEntry.id === entry.id);
    this.rank.textContent = index >= 0 ? `Room leaderboard · #${index + 1}` : 'Not in the room top 10';
    this.root.classList.remove('hidden');

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 1.5, 0.1, 30);
    this.camera.position.set(0, 0.2, 6.2);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(new THREE.HemisphereLight('#fff9e8', '#738b7a', 2.3));
    const key = new THREE.DirectionalLight('#fff5d3', 3.2); key.position.set(-2, 4, 5); this.scene.add(key);
    const fill = new THREE.DirectionalLight('#d2e9df', 1.1); fill.position.set(3, 1, -2); this.scene.add(fill);
    this.fish = createFishModel(entry.species, entry.weightKg);
    this.scene.add(this.fish);
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'fish-viewer-canvas';
    this.stage.replaceChildren(this.canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.resize();
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointercancel', this.onPointerUp);
    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  close(): void {
    this.root.classList.add('hidden');
    this.disposeScene();
  }

  dispose(): void {
    this.close();
  }

  private animate = (): void => {
    if (!this.renderer || !this.scene || !this.camera || !this.fish) return;
    if (!this.dragging) this.fish.rotation.y += 0.006;
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };

  private onPointerDown = (event: PointerEvent): void => {
    if (!this.canvas || !this.fish) return;
    this.dragging = true; this.lastX = event.clientX; this.lastY = event.clientY;
    this.canvas.setPointerCapture(event.pointerId);
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.dragging || !this.fish) return;
    const dx = event.clientX - this.lastX, dy = event.clientY - this.lastY;
    this.fish.rotation.y += dx * 0.012;
    this.fish.rotation.x = Math.max(-0.45, Math.min(0.45, this.fish.rotation.x + dy * 0.008));
    this.lastX = event.clientX; this.lastY = event.clientY;
  };

  private onPointerUp = (): void => { this.dragging = false; };

  private onResize = (): void => this.resize();

  private resize(): void {
    if (!this.renderer || !this.camera) return;
    const width = Math.max(1, this.stage.clientWidth);
    const height = Math.max(1, this.stage.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private disposeScene(): void {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.onResize);
    if (this.canvas) {
      this.canvas.removeEventListener('pointerdown', this.onPointerDown);
      this.canvas.removeEventListener('pointermove', this.onPointerMove);
      this.canvas.removeEventListener('pointerup', this.onPointerUp);
      this.canvas.removeEventListener('pointercancel', this.onPointerUp);
    }
    if (this.fish) {
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      this.fish.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          geometries.add(node.geometry);
          for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
        }
      });
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      this.scene?.remove(this.fish);
    }
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
    this.stage.replaceChildren();
    this.renderer = undefined; this.scene = undefined; this.camera = undefined; this.fish = undefined; this.canvas = undefined;
    this.dragging = false;
  }

  private timeAgo(timestamp: number): string {
    const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    return `${Math.floor(hours / 24)} days ago`;
  }
}
