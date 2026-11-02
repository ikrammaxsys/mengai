import * as THREE from 'three';
import { FISH_CONFIG, type FishSpeciesId } from '../../shared/fishConfig';

const fishById = new Map(FISH_CONFIG.species.map((fish) => [fish.id, fish]));

function mat(color: string, emissive?: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, flatShading: true, emissive: emissive ?? '#000000', emissiveIntensity: emissive ? 0.18 : 0 });
}

function addSphere(group: THREE.Group, color: string, position: [number, number, number], scale: [number, number, number], segments = 8, emissive?: string): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, segments, Math.max(5, segments - 2)), mat(color, emissive));
  mesh.position.set(...position); mesh.scale.set(...scale); mesh.castShadow = true; group.add(mesh); return mesh;
}

function addFin(group: THREE.Group, color: string, position: [number, number, number], scale: [number, number, number], rotationZ = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.72, 5), mat(color));
  mesh.position.set(...position); mesh.scale.set(...scale); mesh.rotation.z = rotationZ; group.add(mesh); return mesh;
}

function disposeGroup(group: THREE.Group): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  group.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      geometries.add(node.geometry);
      for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
}

export function createFishModel(speciesId: FishSpeciesId, weightKg: number): THREE.Group {
  const species = fishById.get(speciesId)!;
  const fish = new THREE.Group();
  const factor = Math.cbrt(Math.max(0.01, weightKg) / species.medianKg);
  fish.scale.setScalar(factor);

  if (speciesId === 'bluegill') {
    addSphere(fish, '#71834b', [0, 0, 0], [0.51, 0.55, 0.2], 9);
    addSphere(fish, '#e4a64b', [0.04, -0.24, 0.025], [0.39, 0.29, 0.195], 8);
    addSphere(fish, '#273c31', [0.29, 0.04, 0.18], [0.075, 0.085, 0.035], 6);
    addFin(fish, '#637747', [-0.55, 0, 0], [0.75, 0.8, 0.65], Math.PI / 2);
    addFin(fish, '#7f914c', [-0.02, 0.48, 0], [1.2, 0.55, 0.6]);
    addFin(fish, '#e7a14a', [0.05, -0.42, 0], [0.8, 0.4, 0.5], Math.PI);
  } else if (speciesId === 'rainbow-trout') {
    addSphere(fish, '#b7c3bb', [0, 0, 0], [0.79, 0.32, 0.19], 10);
    addSphere(fish, '#df8e9b', [-0.02, 0.005, 0.17], [0.58, 0.075, 0.035], 8);
    addSphere(fish, '#f1e4d1', [0.05, -0.17, 0.02], [0.56, 0.16, 0.16], 8);
    addFin(fish, '#aebdb4', [-0.78, 0, 0], [0.7, 0.75, 0.65], Math.PI / 2);
    addFin(fish, '#bd8790', [-0.2, 0.29, 0], [1.5, 0.38, 0.6]);
    addFin(fish, '#b4c5bd', [0.12, -0.24, 0], [0.7, 0.45, 0.6], Math.PI);
    for (let i = 0; i < 12; i++) {
      const x = -0.48 + (i % 6) * 0.17;
      const y = i < 6 ? 0.12 : -0.1;
      addSphere(fish, '#52645e', [x, y, 0.192], [0.025, 0.025, 0.012], 5);
    }
  } else if (speciesId === 'largemouth-bass') {
    addSphere(fish, '#66844d', [0, 0, 0], [0.82, 0.36, 0.21], 9);
    addSphere(fish, '#384f39', [-0.02, -0.015, 0.19], [0.63, 0.105, 0.035], 8);
    addSphere(fish, '#a5a264', [0.06, -0.24, 0.01], [0.62, 0.15, 0.17], 8);
    addFin(fish, '#567340', [-0.82, 0, 0], [0.76, 0.8, 0.7], Math.PI / 2);
    for (let i = 0; i < 7; i++) addFin(fish, '#51683e', [-0.45 + i * 0.14, 0.28 + (i % 2) * 0.035, 0], [0.45, 0.5, 0.55]);
    addSphere(fish, '#40543a', [0.78, -0.08, 0], [0.26, 0.12, 0.19], 7);
    addSphere(fish, '#f3d996', [0.83, -0.09, 0.16], [0.15, 0.025, 0.025], 6);
  } else if (speciesId === 'common-carp') {
    addSphere(fish, '#a8793e', [0, 0.02, 0], [0.72, 0.47, 0.27], 9);
    addSphere(fish, '#d3a052', [-0.02, -0.26, 0.03], [0.53, 0.23, 0.23], 8);
    addFin(fish, '#936a3c', [-0.73, 0.02, 0], [0.7, 0.75, 0.65], Math.PI / 2);
    addFin(fish, '#aa8044', [-0.05, 0.4, 0], [1.2, 0.45, 0.65]);
    for (let row = 0; row < 3; row++) for (let col = 0; col < 5; col++) {
      addSphere(fish, row % 2 ? '#d5aa60' : '#c6944c', [-0.47 + col * 0.19, 0.12 - row * 0.14, 0.245], [0.065, 0.055, 0.018], 5);
    }
    addSphere(fish, '#745832', [0.66, -0.16, 0.12], [0.11, 0.07, 0.11], 6);
    for (const y of [-0.2, -0.27]) {
      const barbel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.15, 5), mat('#765634'));
      barbel.position.set(0.72, y, 0.2); barbel.rotation.z = -0.75; fish.add(barbel);
    }
  } else {
    addSphere(fish, '#f1ead7', [0, 0, 0], [0.84, 0.34, 0.2], 10, '#8a6917');
    addSphere(fish, '#e87b36', [-0.38, 0.12, 0.17], [0.25, 0.18, 0.045], 7);
    addSphere(fish, '#d9a734', [0.2, -0.05, 0.17], [0.27, 0.19, 0.045], 7);
    addSphere(fish, '#e9873c', [0.59, 0.11, 0.13], [0.19, 0.16, 0.045], 7);
    addFin(fish, '#df913f', [-0.84, 0, 0], [0.95, 1.1, 0.8], Math.PI / 2);
    addFin(fish, '#e8a744', [-0.08, 0.32, 0], [1.35, 0.44, 0.75]);
    addFin(fish, '#e8a744', [0.12, -0.28, 0], [1.15, 0.38, 0.75], Math.PI);
    addSphere(fish, '#bb6e39', [0.05, 0.18, 0.19], [0.7, 0.018, 0.012], 6, '#d0a741');
  }

  // Shared eye placement keeps the fish readable in the popup and tiny leaderboard previews.
  addSphere(fish, '#fff9e9', [0.42, 0.11, 0.175], [0.075, 0.075, 0.04], 7);
  addSphere(fish, '#1d302c', [0.445, 0.11, 0.21], [0.032, 0.038, 0.02], 6);
  return fish;
}

export class FishArt {
  private readonly previewRenderer: THREE.WebGLRenderer;
  private readonly previewScene = new THREE.Scene();
  private readonly previewCamera = new THREE.PerspectiveCamera(35, 1.5, 0.1, 30);
  private previewFish?: THREE.Group;
  private previewVisible = false;
  private previewEndsAt = 0;
  private readonly iconRenderer: THREE.WebGLRenderer;
  private readonly iconScene = new THREE.Scene();
  private readonly iconCamera = new THREE.PerspectiveCamera(38, 1.5, 0.1, 30);

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.previewRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
    this.previewRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.previewRenderer.setSize(300, 190, false);
    this.previewRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.previewScene.add(new THREE.HemisphereLight('#fff9e8', '#738b7a', 2.2));
    const key = new THREE.DirectionalLight('#fff5d3', 3); key.position.set(-2, 4, 5); this.previewScene.add(key);
    this.previewCamera.position.set(0, 0.25, 6); this.previewCamera.lookAt(0, 0, 0);

    const iconCanvas = document.createElement('canvas');
    this.iconRenderer = new THREE.WebGLRenderer({ canvas: iconCanvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
    this.iconRenderer.setPixelRatio(1); this.iconRenderer.setSize(96, 64);
    this.iconRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.iconScene.add(new THREE.HemisphereLight('#fff9e8', '#738b7a', 2.2));
    const iconKey = new THREE.DirectionalLight('#fff5d3', 3); iconKey.position.set(-2, 4, 5); this.iconScene.add(iconKey);
    this.iconCamera.position.set(0, 0.1, 5); this.iconCamera.lookAt(0, 0, 0);
  }

  show(species: FishSpeciesId, weightKg: number): void {
    if (this.previewFish) { this.previewScene.remove(this.previewFish); disposeGroup(this.previewFish); }
    this.previewFish = createFishModel(species, weightKg);
    this.previewScene.add(this.previewFish);
    this.previewVisible = true;
    this.previewEndsAt = performance.now() + 3200;
  }

  iconDataUrl(species: FishSpeciesId, weightKg: number): string {
    const model = createFishModel(species, weightKg);
    this.iconScene.add(model);
    this.iconRenderer.render(this.iconScene, this.iconCamera);
    const image = this.iconRenderer.domElement.toDataURL('image/png');
    this.iconScene.remove(model); disposeGroup(model);
    return image;
  }

  render(now: number): boolean {
    if (!this.previewFish || !this.previewVisible) return false;
    if (now >= this.previewEndsAt) this.previewVisible = false;
    else {
      this.previewFish.rotation.y = Math.sin(now * 0.0012) * 0.48;
      this.previewFish.rotation.x = Math.sin(now * 0.0008) * 0.08;
    }
    this.previewRenderer.render(this.previewScene, this.previewCamera);
    return this.previewVisible;
  }

  dispose(): void {
    if (this.previewFish) disposeGroup(this.previewFish);
    this.previewRenderer.dispose(); this.iconRenderer.dispose();
  }
}
