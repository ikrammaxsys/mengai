import * as THREE from 'three';
import { WORLD_CONFIG } from '../../shared/worldConfig';
import type { CampfireCooking } from './network';
import { FISH_CONFIG } from '../../shared/fishConfig';
import { createFishModel } from './fishModels';

export class Campfire {
  private readonly group = new THREE.Group();
  private readonly flames: THREE.Mesh[] = [];
  private readonly firelight: THREE.PointLight;
  private readonly interactionPrompt: HTMLDivElement;
  private readonly cookStatus: HTMLDivElement;
  private readonly cookTitle: HTMLElement;
  private readonly cookProgress: HTMLElement;
  private readonly cookProgressFill: HTMLElement;
  private cooking: CampfireCooking | null = null;
  private cookedFish: THREE.Group | null = null;

  get activeCookId(): string | null { return this.cooking?.cookId ?? null; }

  constructor(scene: THREE.Scene, labels: HTMLElement) {
    this.group.position.set(WORLD_CONFIG.campfire.x, 0, WORLD_CONFIG.campfire.z);
    scene.add(this.group);

    const clearing = new THREE.Mesh(
      new THREE.CircleGeometry(4.5, 12),
      new THREE.MeshStandardMaterial({ color: '#cbbb92', roughness: 1, flatShading: true }),
    );
    clearing.rotation.x = -Math.PI / 2; clearing.position.y = 0.028; clearing.receiveShadow = true; this.group.add(clearing);
    const border = new THREE.Mesh(new THREE.TorusGeometry(4.45, 0.07, 4, 12), new THREE.MeshStandardMaterial({ color: '#e1d2a9', roughness: 1, flatShading: true }));
    border.rotation.x = Math.PI / 2; border.position.y = 0.04; this.group.add(border);

    const stoneGeometry = new THREE.DodecahedronGeometry(0.27, 0);
    const stoneMaterials = [
      new THREE.MeshStandardMaterial({ color: '#777d70', roughness: 1, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: '#92917e', roughness: 1, flatShading: true }),
    ];
    for (let index = 0; index < 10; index++) {
      const angle = index / 10 * Math.PI * 2;
      const stone = new THREE.Mesh(stoneGeometry, stoneMaterials[index % stoneMaterials.length]);
      stone.position.set(Math.cos(angle) * 0.88, 0.2, Math.sin(angle) * 0.88);
      stone.scale.set(1.05, 0.72, 0.88); stone.rotation.set(0.2 * index, angle, 0.15 * index); stone.castShadow = true; stone.receiveShadow = true;
      this.group.add(stone);
    }

    const logMaterial = new THREE.MeshStandardMaterial({ color: '#8b6344', roughness: 1, flatShading: true });
    const firewood = new THREE.CylinderGeometry(0.12, 0.15, 1.05, 6);
    for (let index = 0; index < 3; index++) {
      const wood = new THREE.Mesh(firewood, logMaterial);
      wood.position.set(0, 0.31 + index * 0.035, 0);
      wood.rotation.set(0, index * Math.PI / 3, Math.PI / 2); wood.castShadow = true;
      this.group.add(wood);
    }

    const benchGeometry = new THREE.CylinderGeometry(0.16, 0.2, 1.75, 7);
    const benchMaterial = new THREE.MeshStandardMaterial({ color: '#9b714e', roughness: 1, flatShading: true });
    const benchEndMaterial = new THREE.MeshStandardMaterial({ color: '#72513b', roughness: 1, flatShading: true });
    for (let index = 0; index < 3; index++) {
      const angle = index / 3 * Math.PI * 2 + Math.PI / 6;
      const bench = new THREE.Mesh(benchGeometry, benchMaterial);
      bench.position.set(Math.cos(angle) * 2.7, 0.34, Math.sin(angle) * 2.7);
      bench.rotation.set(0, angle + Math.PI / 2, Math.PI / 2); bench.castShadow = true; bench.receiveShadow = true;
      this.group.add(bench);
      for (const side of [-1, 1]) {
        const end = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.2, 0.045, 7), benchEndMaterial);
        end.position.set(0, 0.86 * side, 0);
        bench.add(end);
      }
    }

    this.flames.push(
      this.addFlame('#ef7040', 0.46, 0.98, 0.62),
      this.addFlame('#f6a33e', 0.32, 0.74, 0.69),
      this.addFlame('#ffcf63', 0.2, 0.52, 0.75),
    );
    this.firelight = new THREE.PointLight('#ff9d50', 2.3, 11, 2);
    this.firelight.position.set(0, 1.05, 0); this.group.add(this.firelight);

    this.interactionPrompt = document.createElement('div');
    this.interactionPrompt.className = 'campfire-interaction-prompt hidden';
    this.interactionPrompt.setAttribute('aria-hidden', 'true');
    const key = document.createElement('kbd'); key.textContent = 'C';
    const instruction = document.createElement('span'); instruction.textContent = 'to cook';
    this.interactionPrompt.append(key, instruction);
    labels.append(this.interactionPrompt);

    this.cookStatus = document.createElement('div'); this.cookStatus.className = 'campfire-cook-status hidden'; this.cookStatus.setAttribute('aria-hidden', 'true');
    const heading = document.createElement('strong'); heading.className = 'campfire-cook-title';
    this.cookTitle = heading;
    this.cookProgress = document.createElement('div'); this.cookProgress.className = 'campfire-cook-progress';
    this.cookProgress.setAttribute('role', 'progressbar'); this.cookProgress.setAttribute('aria-valuemin', '0'); this.cookProgress.setAttribute('aria-valuemax', '100');
    this.cookProgressFill = document.createElement('div'); this.cookProgressFill.className = 'campfire-cook-progress-fill';
    this.cookProgress.append(this.cookProgressFill);
    this.cookStatus.append(heading, this.cookProgress);
    labels.append(this.cookStatus);
  }

  setCooking(cooking: CampfireCooking | null): void {
    if (this.cooking?.cookId === cooking?.cookId) return;
    this.removeCookedFish();
    this.cooking = cooking;
    if (!cooking) {
      this.cookStatus.classList.add('hidden');
      return;
    }
    const species = FISH_CONFIG.species.find((entry) => entry.id === cooking.fish.species)!;
    this.cookTitle.textContent = `Cooking ${species.name}…`;
    this.cookProgressFill.style.width = '0%';
    const model = createFishModel(cooking.fish.species, cooking.fish.weightKg);
    model.scale.multiplyScalar(0.52);
    model.position.set(0.05, 1.42, 0);
    model.rotation.y = 0.35;
    this.group.add(model);
    this.cookedFish = model;
    this.cookStatus.classList.remove('hidden');
  }

  render(now: number, camera: THREE.Camera, playerPosition: THREE.Vector3): void {
    const time = now * 0.001;
    for (let index = 0; index < this.flames.length; index++) {
      const flame = this.flames[index];
      const pulse = Math.sin(time * (7 + index * 1.7) + index * 1.8);
      flame.scale.set(1 + pulse * 0.08, 0.88 + pulse * 0.15, 1 + pulse * 0.08);
      flame.rotation.y = time * (index % 2 ? -0.55 : 0.42) + index;
    }
    this.firelight.intensity = 2.15 + Math.sin(time * 9) * 0.32 + Math.sin(time * 17) * 0.12;
    const nearby = Math.hypot(playerPosition.x - WORLD_CONFIG.campfire.x, playerPosition.z - WORLD_CONFIG.campfire.z) <= WORLD_CONFIG.campfire.useRadius;
    this.interactionPrompt.classList.toggle('hidden', !nearby || this.cooking !== null);

    if (this.cooking) {
      const progress = Math.max(0, Math.min(1, (now - this.cooking.startedAt) / this.cooking.durationMs));
      const percent = Math.round(progress * 100);
      this.cookProgressFill.style.width = `${percent}%`;
      this.cookProgress.setAttribute('aria-valuenow', String(percent));
    }

    if (nearby || this.cooking) {
      const anchor = new THREE.Vector3(WORLD_CONFIG.campfire.x, 2.35, WORLD_CONFIG.campfire.z).project(camera);
      const visible = anchor.z <= 1 && Math.abs(anchor.x) <= 1.2 && Math.abs(anchor.y) <= 1.2;
      const left = `${(anchor.x * 0.5 + 0.5) * innerWidth}px`;
      const top = `${(-anchor.y * 0.5 + 0.5) * innerHeight}px`;
      const zIndex = String(Math.round((1 - anchor.z) * 1000));
      this.interactionPrompt.style.left = left;
      this.interactionPrompt.style.top = top;
      this.interactionPrompt.style.zIndex = zIndex;
      this.interactionPrompt.style.display = visible && nearby && !this.cooking ? 'flex' : 'none';
      this.cookStatus.style.left = left;
      this.cookStatus.style.top = top;
      this.cookStatus.style.zIndex = zIndex;
      this.cookStatus.style.display = visible && this.cooking ? 'flex' : 'none';
    } else {
      this.interactionPrompt.style.display = 'none';
      this.cookStatus.style.display = 'none';
    }
  }

  private removeCookedFish(): void {
    if (!this.cookedFish) return;
    this.group.remove(this.cookedFish);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    this.cookedFish.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        geometries.add(node.geometry);
        for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
      }
    });
    for (const geometry of geometries) geometry.dispose();
    for (const material of materials) material.dispose();
    this.cookedFish = null;
  }

  private addFlame(color: string, width: number, height: number, y: number): THREE.Mesh {
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.48,
      roughness: 0.72,
      flatShading: true,
    });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 6), material);
    flame.position.set(0, y, 0);
    flame.scale.set(width, height, width);
    flame.castShadow = false;
    this.group.add(flame);
    return flame;
  }
}
