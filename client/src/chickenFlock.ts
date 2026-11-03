import * as THREE from 'three';
import { CHICKEN_CONFIG, type ChickenSnapshot, type ChickenState } from '../../shared/chickenConfig';

interface TimedChicken extends ChickenSnapshot {
  serverTime: number;
}

interface ChickenTrack {
  id: string;
  bodyColor: THREE.Color;
  samples: TimedChicken[];
  state: ChickenState;
  phase: number;
}

interface ChickenPose {
  x: number;
  z: number;
  facing: number;
  state: ChickenState;
}

interface PopBurst {
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  startedAt: number;
  velocities: Float32Array;
}

interface ScorePopup {
  chickenId: string;
  element: HTMLDivElement;
  startedAt: number;
}

export class ChickenFlock {
  static readonly count = CHICKEN_CONFIG.maxCount;

  private readonly tracks = new Map<string, ChickenTrack>();
  private readonly order: string[] = [];
  private readonly hiddenChickens = new Set<string>();
  private readonly popups: ScorePopup[] = [];
  private readonly bursts: PopBurst[] = [];
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

  constructor(private readonly scene: THREE.Scene, private readonly labels: HTMLElement) {
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
  }

  setSnapshots(snapshots: ChickenSnapshot[], serverTime: number): void {
    this.order.length = 0;
    const present = new Set<string>();
    for (const [index, snapshot] of snapshots.entries()) {
      present.add(snapshot.id);
      this.order.push(snapshot.id);
      let track = this.tracks.get(snapshot.id);
      if (!track) {
        track = {
          id: snapshot.id,
          bodyColor: new THREE.Color(snapshot.bodyColor),
          samples: [],
          state: snapshot.state,
          phase: index * 2.31,
        };
        this.tracks.set(snapshot.id, track);
      }
      track.state = snapshot.state;
      track.bodyColor.set(snapshot.bodyColor);
      if (snapshot.state === 'respawning') this.hiddenChickens.add(snapshot.id);
      else this.hiddenChickens.delete(snapshot.id);
      const last = track.samples[track.samples.length - 1];
      if (last?.state === 'respawning' && snapshot.state !== 'respawning') {
        track.samples = [{ ...snapshot, serverTime }];
      } else if (!last || serverTime > last.serverTime) {
        track.samples.push({ ...snapshot, serverTime });
        while (track.samples.length > 4) track.samples.shift();
      }
      this.bodies.setColorAt(index, track.bodyColor);
      this.wings.setColorAt(index * 2, track.bodyColor);
      this.wings.setColorAt(index * 2 + 1, track.bodyColor);
    }
    for (const id of this.tracks.keys()) if (!present.has(id)) this.tracks.delete(id);
    this.setActiveCount(snapshots.length);
    if (this.bodies.instanceColor) this.bodies.instanceColor.needsUpdate = true;
    if (this.wings.instanceColor) this.wings.instanceColor.needsUpdate = true;
  }

  hit(message: { chickenId: string; startTime: number }): void {
    this.hiddenChickens.add(message.chickenId);
    const element = document.createElement('div');
    element.className = 'chicken-score-pop';
    element.textContent = '+1';
    this.labels.appendChild(element);
    this.popups.push({ chickenId: message.chickenId, element, startedAt: message.startTime });
    const chicken = this.tracks.get(message.chickenId);
    const last = chicken?.samples[chicken.samples.length - 1];
    if (last) this.createPopBurst(last.x, last.z, message.startTime);
  }

  render(serverTime: number, camera: THREE.Camera): void {
    const renderTime = serverTime - 120;
    const seconds = serverTime / 1000;
    for (const [index, id] of this.order.entries()) {
      const chicken = this.tracks.get(id);
      if (!chicken) continue;
      const pose = this.poseAt(chicken, renderTime);
      const moving = pose.state === 'wander';
      const pace = moving ? 9 : 2.2;
      const waddle = Math.sin(seconds * pace + chicken.phase) * (moving ? 0.06 : 0.02);
      const step = Math.sin(seconds * pace * 1.8 + chicken.phase) * 0.14;

      this.root.position.set(pose.x, 0, pose.z);
      this.root.scale.setScalar(pose.state === 'respawning' || this.hiddenChickens.has(id) ? 0 : 1);
      this.root.rotation.set(0, pose.facing, waddle);
      this.root.updateMatrix();

      this.place(this.bodies, index, [0, 0.34, 0], [0.36, 0.27, 0.45]);
      this.place(this.heads, index, [0, 0.59, 0.27], [0.17, 0.17, 0.17]);
      this.place(this.beaks, index, [0, 0.58, 0.43], [0.075, 0.075, 0.13], [Math.PI / 2, 0, 0]);
      this.place(this.combs, index, [0, 0.78, 0.25], [0.105, 0.12, 0.09]);
      this.place(this.tails, index, [0, 0.45, -0.39], [0.12, 0.2, 0.13], [-Math.PI / 4, 0, 0]);

      for (const side of [-1, 1]) {
        const sideIndex = index * 2 + (side === -1 ? 0 : 1);
        const wingFlap = Math.abs(step) * 0.08;
        this.place(this.wings, sideIndex, [side * 0.25, 0.36, 0], [0.13, 0.18, 0.27], [0, 0, side * (0.22 + wingFlap)]);
        this.place(this.legs, sideIndex, [side * 0.105, 0.115, step * side * 0.035], [0.035, 0.12, 0.035], [step * side, 0, 0]);
        this.place(this.eyes, sideIndex, [side * 0.105, 0.62, 0.405], [0.027, 0.03, 0.027]);
      }
    }

    for (const mesh of [this.bodies, this.wings, this.heads, this.beaks, this.combs, this.tails, this.legs, this.eyes]) {
      mesh.instanceMatrix.needsUpdate = true;
    }
    this.renderPopups(serverTime, renderTime, camera);
    this.renderPopBursts(serverTime);
  }

  private createPopBurst(x: number, z: number, startedAt: number): void {
    const count = 7;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      const angle = index / count * Math.PI * 2;
      const offset = index * 3;
      velocities[offset] = Math.cos(angle) * (0.5 + (index % 3) * 0.12);
      velocities[offset + 1] = 0.55 + (index % 4) * 0.13;
      velocities[offset + 2] = Math.sin(angle) * (0.5 + (index % 2) * 0.16);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: '#fff1c8', size: 0.2, transparent: true, opacity: 0.95, depthWrite: false, sizeAttenuation: true });
    const points = new THREE.Points(geometry, material);
    points.position.set(x, 0.72, z);
    points.frustumCulled = false;
    this.scene.add(points);
    this.bursts.push({ points, geometry, material, startedAt, velocities });
  }

  private renderPopBursts(serverTime: number): void {
    for (let index = this.bursts.length - 1; index >= 0; index--) {
      const burst = this.bursts[index];
      const progress = (serverTime - burst.startedAt) / 450;
      if (progress >= 1) {
        this.scene.remove(burst.points);
        burst.geometry.dispose();
        burst.material.dispose();
        this.bursts.splice(index, 1);
        continue;
      }
      const t = Math.max(0, progress);
      const positions = burst.geometry.attributes.position as THREE.BufferAttribute;
      for (let particle = 0; particle < burst.velocities.length / 3; particle++) {
        const offset = particle * 3;
        positions.setXYZ(offset / 3,
          burst.velocities[offset] * t,
          burst.velocities[offset + 1] * t + 0.22 * t * t,
          burst.velocities[offset + 2] * t);
      }
      positions.needsUpdate = true;
      burst.material.opacity = 0.95 * (1 - t);
    }
  }

  private setActiveCount(count: number): void {
    this.bodies.count = count;
    this.heads.count = count;
    this.beaks.count = count;
    this.combs.count = count;
    this.tails.count = count;
    this.wings.count = count * 2;
    this.legs.count = count * 2;
    this.eyes.count = count * 2;
  }

  private poseAt(chicken: ChickenTrack, at: number): ChickenPose {
    const samples = chicken.samples;
    if (samples.length < 2 || at <= samples[0].serverTime) {
      const first = samples[0];
      return { x: first.x, z: first.z, facing: first.facing, state: first.state };
    }
    let next = samples.findIndex((sample) => sample.serverTime >= at);
    if (next > 0) {
      const left = samples[next - 1], right = samples[next];
      const mix = (at - left.serverTime) / Math.max(1, right.serverTime - left.serverTime);
      const angleDelta = Math.atan2(Math.sin(right.facing - left.facing), Math.cos(right.facing - left.facing));
      return {
        x: left.x + (right.x - left.x) * mix,
        z: left.z + (right.z - left.z) * mix,
        facing: left.facing + angleDelta * mix,
        state: mix < 0.5 ? left.state : right.state,
      };
    }
    next = samples.length - 1;
    const last = samples[next];
    const before = samples[next - 1];
    const sampleSpan = Math.max(1, last.serverTime - before.serverTime);
    const extrapolate = Math.min(0.12, Math.max(0, at - last.serverTime)) / sampleSpan;
    return {
      x: last.x + (last.x - before.x) * extrapolate,
      z: last.z + (last.z - before.z) * extrapolate,
      facing: last.facing,
      state: last.state,
    };
  }

  private renderPopups(serverTime: number, renderTime: number, camera: THREE.Camera): void {
    for (let index = this.popups.length - 1; index >= 0; index--) {
      const popup = this.popups[index];
      const elapsed = serverTime - popup.startedAt;
      if (elapsed >= CHICKEN_CONFIG.scorePopupDurationMs) {
        popup.element.remove();
        this.popups.splice(index, 1);
        continue;
      }
      const chicken = this.tracks.get(popup.chickenId);
      if (!chicken) { popup.element.style.display = 'none'; continue; }
      const pose = this.poseAt(chicken, renderTime);
      const point = new THREE.Vector3(pose.x, 1.35 + Math.max(0, elapsed) * 0.00045, pose.z).project(camera);
      popup.element.style.left = `${Math.round((point.x * 0.5 + 0.5) * innerWidth)}px`;
      popup.element.style.top = `${Math.round((-point.y * 0.5 + 0.5) * innerHeight)}px`;
      popup.element.style.opacity = String(Math.max(0, 1 - elapsed / CHICKEN_CONFIG.scorePopupDurationMs));
      popup.element.style.display = point.z <= 1 && Math.abs(point.x) <= 1.2 && Math.abs(point.y) <= 1.2 ? 'block' : 'none';
    }
  }

  private makeInstances(geometry: THREE.BufferGeometry, material: THREE.Material, count: number): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.count = 0;
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
}
