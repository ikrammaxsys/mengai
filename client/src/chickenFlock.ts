import * as THREE from 'three';
import { CHICKEN_COUNT, CHICKEN_PATHS, chickenPositionAt, type ChickenPath } from '../../shared/chickenPaths';

type ChickenAgent = Omit<ChickenPath, 'bodyColor'> & {
  bodyColor: THREE.Color;
};

interface ChickenKnockback {
  startedAt: number;
  directionX: number;
  directionZ: number;
}

export class ChickenFlock {
  static readonly count = CHICKEN_COUNT;

  private readonly agents: ChickenAgent[];
  private readonly bodies: THREE.InstancedMesh;
  private readonly wings: THREE.InstancedMesh;
  private readonly heads: THREE.InstancedMesh;
  private readonly beaks: THREE.InstancedMesh;
  private readonly combs: THREE.InstancedMesh;
  private readonly tails: THREE.InstancedMesh;
  private readonly legs: THREE.InstancedMesh;
  private readonly eyes: THREE.InstancedMesh;
  private readonly root = new THREE.Object3D();
  private readonly part = new THREE.Object3D();
  private readonly worldMatrix = new THREE.Matrix4();
  private readonly knockbacks = new Map<string, ChickenKnockback>();

  constructor(private readonly scene: THREE.Scene) {
    const ivory = new THREE.MeshStandardMaterial({ color: '#fffdf4', roughness: 1, flatShading: true });
    const orange = new THREE.MeshStandardMaterial({ color: '#e79a45', roughness: 1, flatShading: true });
    const red = new THREE.MeshStandardMaterial({ color: '#cf6258', roughness: 1, flatShading: true });
    const dark = new THREE.MeshStandardMaterial({ color: '#34433a', roughness: 1, flatShading: true });

    this.bodies = this.makeInstances(new THREE.DodecahedronGeometry(1, 0), ivory, ChickenFlock.count);
    this.wings = this.makeInstances(new THREE.DodecahedronGeometry(1, 0), ivory, ChickenFlock.count * 2);
    this.heads = this.makeInstances(new THREE.SphereGeometry(1, 7, 5), ivory, ChickenFlock.count);
    this.beaks = this.makeInstances(new THREE.ConeGeometry(1, 1, 5), orange, ChickenFlock.count);
    this.combs = this.makeInstances(new THREE.DodecahedronGeometry(1, 0), red, ChickenFlock.count);
    this.tails = this.makeInstances(new THREE.ConeGeometry(1, 1, 5), ivory, ChickenFlock.count);
    this.legs = this.makeInstances(new THREE.CylinderGeometry(1, 1, 1, 5), orange, ChickenFlock.count * 2);
    this.eyes = this.makeInstances(new THREE.SphereGeometry(1, 6, 4), dark, ChickenFlock.count * 2);

    this.agents = this.makeAgents();
    for (const [index, chicken] of this.agents.entries()) {
      this.bodies.setColorAt(index, chicken.bodyColor);
      this.wings.setColorAt(index * 2, chicken.bodyColor);
      this.wings.setColorAt(index * 2 + 1, chicken.bodyColor);
    }
    if (this.bodies.instanceColor) this.bodies.instanceColor.needsUpdate = true;
    if (this.wings.instanceColor) this.wings.instanceColor.needsUpdate = true;
  }

  render(serverTime: number): void {
    const seconds = serverTime / 1000;
    for (const [index, chicken] of this.agents.entries()) {
      const pathPosition = chickenPositionAt(chicken, serverTime);
      const yaw = Math.atan2(pathPosition.velocityX, pathPosition.velocityZ);
      const waddle = Math.sin(seconds * chicken.speed * 5 + chicken.phase) * 0.045;
      const step = Math.sin(seconds * chicken.speed * 10 + chicken.phase) * 0.18;
      let x = pathPosition.x;
      let z = pathPosition.z;
      let y = 0;
      let tumble = 0;
      const knockback = this.knockbacks.get(chicken.id);
      if (knockback) {
        const elapsed = (serverTime - knockback.startedAt) / 1000;
        if (elapsed >= 1.05) this.knockbacks.delete(chicken.id);
        else if (elapsed >= 0) {
          const arc = Math.sin(Math.PI * Math.min(1, elapsed / 1.05));
          const hop = Math.sin(Math.PI * Math.min(1, elapsed / 0.62));
          const shove = 1.65 * arc * Math.exp(-0.65 * elapsed);
          x += knockback.directionX * shove;
          z += knockback.directionZ * shove;
          y = hop * 0.62;
          tumble = hop * 1.05;
        }
      }

      this.root.position.set(x, y, z);
      this.root.rotation.set(tumble * 0.24, yaw, waddle + tumble);
      this.root.updateMatrix();

      this.place(this.bodies, index, [0, 0.34, 0], [0.36, 0.27, 0.45]);
      this.place(this.heads, index, [0, 0.59, 0.27], [0.17, 0.17, 0.17]);
      this.place(this.beaks, index, [0, 0.58, 0.43], [0.075, 0.075, 0.13], [Math.PI / 2, 0, 0]);
      this.place(this.combs, index, [0, 0.78, 0.25], [0.105, 0.12, 0.09]);
      this.place(this.tails, index, [0, 0.45, -0.39], [0.12, 0.2, 0.13], [-Math.PI / 4, 0, 0]);

      for (const side of [-1, 1]) {
        const sideIndex = index * 2 + (side === -1 ? 0 : 1);
        this.place(this.wings, sideIndex, [side * 0.25, 0.36, 0], [0.13, 0.18, 0.27], [0, 0, side * (0.22 + Math.abs(step) * 0.08)]);
        this.place(this.legs, sideIndex, [side * 0.105, 0.115, step * side * 0.035], [0.035, 0.12, 0.035], [step * side, 0, 0]);
        this.place(this.eyes, sideIndex, [side * 0.105, 0.62, 0.405], [0.027, 0.03, 0.027]);
      }
    }
    for (const mesh of [this.bodies, this.wings, this.heads, this.beaks, this.combs, this.tails, this.legs, this.eyes]) {
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  hit(chickenId: string, startedAt: number, directionX: number, directionZ: number): void {
    if (!this.agents.some((chicken) => chicken.id === chickenId)) return;
    const length = Math.hypot(directionX, directionZ) || 1;
    this.knockbacks.set(chickenId, { startedAt, directionX: directionX / length, directionZ: directionZ / length });
  }

  private makeInstances(geometry: THREE.BufferGeometry, material: THREE.Material, count: number): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    this.scene.add(mesh);
    return mesh;
  }

  private place(mesh: THREE.InstancedMesh, index: number, position: [number, number, number], scale: [number, number, number], rotation: [number, number, number] = [0, 0, 0]): void {
    this.part.position.set(position[0], position[1], position[2]);
    this.part.rotation.set(rotation[0], rotation[1], rotation[2]);
    this.part.scale.set(scale[0], scale[1], scale[2]);
    this.part.updateMatrix();
    this.worldMatrix.multiplyMatrices(this.root.matrix, this.part.matrix);
    mesh.setMatrixAt(index, this.worldMatrix);
  }

  private makeAgents(): ChickenAgent[] {
    return CHICKEN_PATHS.map((path) => ({ ...path, bodyColor: new THREE.Color(path.bodyColor) }));
  }
}
