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
  const rawFactor = Math.cbrt(Math.max(0.01, weightKg) / species.medianKg);
  const factor = speciesId === 'ikan-bulan' ? Math.min(1.4, rawFactor) : rawFactor;
  fish.scale.setScalar(factor);

  if (speciesId === 'kasut-lama') {
    const sole = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.14, 0.5), mat('#b19a75'));
    sole.position.set(0.04, -0.3, 0); sole.castShadow = true; fish.add(sole);
    addSphere(fish, '#70533d', [0.12, -0.13, 0], [0.67, 0.31, 0.29], 7);
    addSphere(fish, '#805f44', [0.42, -0.12, 0], [0.34, 0.23, 0.28], 7);
    addSphere(fish, '#604734', [-0.29, 0.19, 0], [0.3, 0.53, 0.27], 7);
    const laceMaterial = mat('#302f2a');
    for (let index = 0; index < 3; index++) {
      const lace = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.035, 0.035), laceMaterial);
      lace.position.set(-0.2 + index * 0.13, 0.3 - index * 0.13, 0.245);
      lace.rotation.z = -0.35;
      fish.add(lace);
    }
    addSphere(fish, '#3a3028', [0.57, -0.06, 0.235], [0.11, 0.09, 0.035], 5);
    addSphere(fish, '#6d4935', [0.52, -0.01, 0.258], [0.075, 0.035, 0.02], 5);
    for (const [x, y, angle] of [[-0.1, 0.52, -0.25], [0.04, 0.48, 0.16], [0.17, 0.45, 0.42]]) {
      const weed = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.4, 4), mat('#64885a'));
      weed.position.set(x, y, 0.02); weed.rotation.z = angle; fish.add(weed);
    }
    for (const [x, y, z] of [[-0.55, 0.36, 0.05], [0.62, 0.22, 0.02], [0.5, -0.38, 0.04]]) {
      addSphere(fish, '#92b8af', [x, y, z], [0.045, 0.07, 0.045], 5);
    }
  } else if (speciesId === 'ikan-bulan') {
    addSphere(fish, '#91a8b7', [0, 0, 0], [0.78, 1, 0.3], 10);
    addSphere(fish, '#c7d2d3', [0.03, -0.42, 0.15], [0.6, 0.45, 0.18], 9);
    addFin(fish, '#7f98a6', [0, 1.03, 0], [0.47, 0.95, 0.55]);
    addFin(fish, '#7f98a6', [0, -1.03, 0], [0.47, 0.95, 0.55], Math.PI);
    addSphere(fish, '#879ba3', [-0.78, 0.02, 0], [0.2, 0.23, 0.2], 7);
    addSphere(fish, '#e8e5d7', [0.45, 0.2, 0.26], [0.13, 0.14, 0.07], 8);
    addSphere(fish, '#32464c', [0.49, 0.19, 0.32], [0.055, 0.075, 0.035], 6);
    addSphere(fish, '#8298a1', [0.57, 0.27, 0.28], [0.15, 0.045, 0.05], 7);
    addSphere(fish, '#42545a', [0.78, -0.08, 0.17], [0.06, 0.035, 0.035], 6);
  } else if (speciesId === 'ikan-naga') {
    const bodyPoints: THREE.Vector3[] = [];
    for (let index = 0; index < 9; index++) {
      const progress = index / 8;
      const x = 0.58 - progress * 1.95;
      const y = Math.sin(progress * Math.PI * 2.2) * 0.16;
      bodyPoints.push(new THREE.Vector3(x, y, 0));
      const radius = 0.16 - progress * 0.085;
      addSphere(fish, progress > 0.55 ? '#a48647' : '#167a68', [x, y, 0], [0.2 - progress * 0.08, radius, radius * 0.82], 7, progress < 0.35 ? '#0c554d' : undefined);
      addSphere(fish, '#d6ad5c', [x, y - radius * 0.42, 0.015], [0.13 - progress * 0.05, radius * 0.42, radius * 0.48], 6);
      if (index < 7) addFin(fish, '#d9aa4d', [x, y + radius * 0.8, 0], [0.2, 0.32, 0.22]);
    }
    addSphere(fish, '#176c5e', [0.68, 0.02, 0], [0.28, 0.23, 0.2], 7);
    addSphere(fish, '#ffce67', [0.78, 0.11, 0.17], [0.085, 0.09, 0.055], 7, '#c88725');
    addSphere(fish, '#273b32', [0.81, 0.11, 0.21], [0.035, 0.045, 0.025], 5);
    for (const y of [-0.08, -0.17]) {
      const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.42, 5), mat('#d9b35d'));
      whisker.position.set(0.83, y, 0.1); whisker.rotation.z = -0.62; fish.add(whisker);
    }
    for (const x of [0.54, 0.67]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.26, 5), mat('#d8b15c'));
      horn.position.set(x, 0.24, 0); horn.rotation.z = -0.25; fish.add(horn);
    }
    const tailPivot = new THREE.Group();
    tailPivot.position.copy(bodyPoints[8]);
    const tailMaterial = new THREE.MeshStandardMaterial({ color: '#e69a4c', roughness: 0.7, flatShading: true, transparent: true, opacity: 0.78, emissive: '#a64b27', emissiveIntensity: 0.2 });
    const tailFin = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.68, 5), tailMaterial);
    tailFin.rotation.z = -Math.PI / 2; tailFin.position.x = -0.28; tailPivot.add(tailFin);
    fish.add(tailPivot);
    fish.userData.tailPivot = tailPivot;
    const sparkles: THREE.Mesh[] = [];
    for (let index = 0; index < 4; index++) {
      const sparkle = new THREE.Mesh(new THREE.OctahedronGeometry(0.045, 0), new THREE.MeshBasicMaterial({ color: '#f5d477', transparent: true, opacity: 0.55 }));
      sparkle.position.set(0.1 - index * 0.38, 0.34 + (index % 2) * 0.08, 0.12);
      fish.add(sparkle); sparkles.push(sparkle);
    }
    fish.userData.sparkles = sparkles;
  } else if (speciesId === 'bluegill') {
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
  } else if (speciesId === 'golden-koi') {
    addSphere(fish, '#f1ead7', [0, 0, 0], [0.84, 0.34, 0.2], 10, '#8a6917');
    addSphere(fish, '#e87b36', [-0.38, 0.12, 0.17], [0.25, 0.18, 0.045], 7);
    addSphere(fish, '#d9a734', [0.2, -0.05, 0.17], [0.27, 0.19, 0.045], 7);
    addSphere(fish, '#e9873c', [0.59, 0.11, 0.13], [0.19, 0.16, 0.045], 7);
    addFin(fish, '#df913f', [-0.84, 0, 0], [0.95, 1.1, 0.8], Math.PI / 2);
    addFin(fish, '#e8a744', [-0.08, 0.32, 0], [1.35, 0.44, 0.75]);
    addFin(fish, '#e8a744', [0.12, -0.28, 0], [1.15, 0.38, 0.75], Math.PI);
    addSphere(fish, '#bb6e39', [0.05, 0.18, 0.19], [0.7, 0.018, 0.012], 6, '#d0a741');
  } else if (speciesId === 'todak') {
    addSphere(fish, '#608697', [-0.04, 0, 0], [0.88, 0.28, 0.18], 9);
    addSphere(fish, '#c4d0c8', [0.02, -0.16, 0.025], [0.63, 0.13, 0.15], 8);
    const bill = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.78, 5), mat('#a8b7b5'));
    bill.rotation.z = -Math.PI / 2; bill.position.set(1.02, 0.08, 0); bill.castShadow = true; fish.add(bill);
    addFin(fish, '#527483', [-0.78, 0, 0], [0.75, 0.7, 0.62], Math.PI / 2);
    addFin(fish, '#527483', [-0.12, 0.25, 0], [1.2, 0.4, 0.55]);
    addFin(fish, '#829b9d', [0.08, -0.21, 0], [0.75, 0.38, 0.55], Math.PI);
    addSphere(fish, '#d8c278', [-0.04, 0.03, 0.184], [0.63, 0.025, 0.012], 6);
  } else if (speciesId === 'buntal') {
    addSphere(fish, '#d79a4f', [0, 0, 0], [0.48, 0.46, 0.35], 9);
    addSphere(fish, '#f0d9a1', [0.02, -0.2, 0.14], [0.34, 0.23, 0.22], 8);
    addFin(fish, '#d58c48', [-0.4, -0.03, 0], [0.48, 0.55, 0.5], Math.PI / 2);
    addFin(fish, '#e0a453', [-0.05, 0.42, 0], [0.7, 0.35, 0.55]);
    addFin(fish, '#e0a453', [0.04, -0.4, 0], [0.65, 0.3, 0.5], Math.PI);
    for (let index = 0; index < 9; index++) {
      const angle = index / 9 * Math.PI * 2;
      addSphere(fish, '#765b45', [Math.cos(angle) * 0.25, Math.sin(angle) * 0.27 + 0.02, 0.31], [0.035, 0.035, 0.018], 5);
    }
    addSphere(fish, '#3a4235', [0.34, 0.11, 0.31], [0.09, 0.09, 0.045], 6);
  } else {
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0.68, 0);
    wingShape.lineTo(0.12, 0.2);
    wingShape.lineTo(-0.52, 0.55);
    wingShape.lineTo(-0.38, 0.08);
    wingShape.lineTo(-0.72, 0);
    wingShape.lineTo(-0.38, -0.08);
    wingShape.lineTo(-0.52, -0.55);
    wingShape.lineTo(0.12, -0.2);
    wingShape.closePath();
    const discGeometry = new THREE.ExtrudeGeometry(wingShape, { depth: 0.12, bevelEnabled: false, curveSegments: 1 });
    discGeometry.translate(0, 0, -0.06);
    const disc = new THREE.Mesh(discGeometry, mat('#7e8e70'));
    disc.castShadow = true; disc.receiveShadow = true; fish.add(disc);
    const underside = new THREE.Mesh(new THREE.ShapeGeometry(wingShape, 1), mat('#d7cfb3'));
    underside.position.z = -0.065; fish.add(underside);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.78, 5), mat('#64765f'));
    tail.rotation.z = Math.PI / 2; tail.position.set(-0.88, 0, 0); tail.castShadow = true; fish.add(tail);
    addSphere(fish, '#f6e8c9', [0.43, 0.095, 0.07], [0.07, 0.07, 0.035], 6);
    addSphere(fish, '#26372f', [0.45, 0.095, 0.102], [0.032, 0.035, 0.018], 5);
    addSphere(fish, '#f6e8c9', [0.43, -0.095, 0.07], [0.07, 0.07, 0.035], 6);
    addSphere(fish, '#26372f', [0.45, -0.095, 0.102], [0.032, 0.035, 0.018], 5);
    addSphere(fish, '#b0a98f', [-0.12, 0.12, 0.07], [0.16, 0.1, 0.025], 6);
    addSphere(fish, '#b0a98f', [-0.12, -0.12, 0.07], [0.16, 0.1, 0.025], 6);
  }

  // Shared eye placement keeps the fish readable in the popup and tiny leaderboard previews.
  if (speciesId !== 'kasut-lama' && speciesId !== 'ikan-bulan' && speciesId !== 'ikan-naga') {
    addSphere(fish, '#fff9e9', [0.42, 0.11, 0.175], [0.075, 0.075, 0.04], 7);
    addSphere(fish, '#1d302c', [0.445, 0.11, 0.21], [0.032, 0.038, 0.02], 6);
  }
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
