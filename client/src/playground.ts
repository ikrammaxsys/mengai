import * as THREE from 'three';
import { WORLD_CONFIG } from '../../shared/worldConfig';

const COLORS = ['#efb8ca', '#9fd8c5', '#f1d98c', '#a8d7e8', '#e7bb8d', '#c4b5db'];

function material(color: string, emissive = '#000000'): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, flatShading: true, emissive, emissiveIntensity: emissive === '#000000' ? 0 : 0.24 });
}

function addBeam(parent: THREE.Group, start: THREE.Vector3, end: THREE.Vector3, radius: number, color: string): THREE.Mesh {
  const delta = end.clone().sub(start);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), 6), material(color));
  beam.position.copy(start).add(end).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  beam.castShadow = true;
  parent.add(beam);
  return beam;
}

export class Playground {
  private readonly root = new THREE.Group();
  private readonly wheel = new THREE.Group();
  private readonly gondolas: THREE.Group[] = [];
  private readonly bulbs: THREE.Mesh[] = [];
  private readonly seesawLever = new THREE.Group();

  constructor(private readonly scene: THREE.Scene) {
    this.buildFerrisWheel();
    this.buildSlide();
    this.buildSeesaw();
    this.scene.add(this.root);
  }

  private buildFerrisWheel(): void {
    const config = WORLD_CONFIG.playground.wheel;
    const support = new THREE.Group();
    support.position.set(config.x, 0, config.z);
    const white = material('#f2eee1');
    const wood = material('#b98967');
    for (const z of [-0.48, 0.48]) {
      addBeam(support, new THREE.Vector3(-2.2, 0.12, z), new THREE.Vector3(0, config.centerY, z), 0.13, '#f2eee1');
      addBeam(support, new THREE.Vector3(2.2, 0.12, z), new THREE.Vector3(0, config.centerY, z), 0.13, '#f2eee1');
      const brace = new THREE.Mesh(new THREE.BoxGeometry(3.35, 0.12, 0.12), wood);
      brace.position.set(0, 0.72, z); brace.castShadow = true; support.add(brace);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.2, 0.8), wood);
      foot.position.set(0, 0.1, z); foot.castShadow = true; support.add(foot);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.45, 10), material('#e9cc84'));
    hub.rotation.x = Math.PI / 2; hub.position.y = config.centerY; hub.castShadow = true; support.add(hub);
    this.root.add(support);

    this.wheel.position.set(config.x, config.centerY, config.z);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(config.radius, 0.09, 5, 28), material('#efb8ca'));
    ring.castShadow = true; this.wheel.add(ring);
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(config.radius - 0.2, 0.045, 4, 24), material('#a8d7c6'));
    innerRing.position.z = 0.03; this.wheel.add(innerRing);
    for (let index = 0; index < 8; index++) {
      const angle = index * Math.PI / 4;
      addBeam(this.wheel, new THREE.Vector3(0, 0, 0.06), new THREE.Vector3(Math.cos(angle) * (config.radius - 0.1), Math.sin(angle) * (config.radius - 0.1), 0.06), 0.035, index % 2 ? '#f0d98a' : '#9fd8c5');
    }
    const center = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.2, 10), material('#f2d98c'));
    center.rotation.x = Math.PI / 2; center.position.z = 0.12; center.castShadow = true; this.wheel.add(center);

    for (let index = 0; index < 28; index++) {
      const angle = index / 28 * Math.PI * 2;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.075, 5, 4), new THREE.MeshStandardMaterial({ color: COLORS[index % COLORS.length], emissive: COLORS[index % COLORS.length], emissiveIntensity: 0.42, roughness: 0.4, flatShading: true }));
      bulb.position.set(Math.cos(angle) * config.radius, Math.sin(angle) * config.radius, 0.14);
      this.wheel.add(bulb); this.bulbs.push(bulb);
    }

    for (let index = 0; index < 6; index++) {
      const angle = index / 6 * Math.PI * 2 - Math.PI / 2;
      const gondola = new THREE.Group();
      gondola.position.set(Math.cos(angle) * config.radius, Math.sin(angle) * config.radius, 0.24);
      this.buildGondola(gondola, COLORS[index]);
      this.wheel.add(gondola);
      this.gondolas.push(gondola);
    }
    this.root.add(this.wheel);

    const sign = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.42, 0.12), material('#f6eedb'));
    sign.position.set(0, 0.8, 1.02); sign.castShadow = true; support.add(sign);
    const canvas = document.createElement('canvas'); canvas.width = 360; canvas.height = 96;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#f6eedb'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#5c7566'; context.textAlign = 'center'; context.textBaseline = 'middle';
      context.font = 'bold 42px Trebuchet MS, sans-serif'; context.fillText('Ferris Wheel', 180, 49);
    }
    const signTexture = new THREE.CanvasTexture(canvas);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 0.36), new THREE.MeshBasicMaterial({ map: signTexture, transparent: true }));
    label.position.set(0, 0.8, 1.09); support.add(label);
    this.root.add(new THREE.PointLight('#f5d992', 0.55, 9, 2).translateY(2.4).translateZ(config.z));
  }

  private buildGondola(gondola: THREE.Group, color: string): void {
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.46, 0.56), material(color));
    cabin.position.y = -0.3; cabin.castShadow = true; cabin.receiveShadow = true; gondola.add(cabin);
    const opening = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.025), material('#f5f0e2'));
    opening.position.set(0, -0.27, 0.29); gondola.add(opening);
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.12, 0.3), material('#b98967'));
    bench.position.set(0, -0.42, -0.02); gondola.add(bench);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.28, 0.1), material('#b98967'));
    back.position.set(0, -0.23, -0.17); gondola.add(back);
    for (const x of [-0.31, 0.31]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.38, 0.56), material('#f5f0e2'));
      rail.position.set(x, -0.24, 0); gondola.add(rail);
      addBeam(gondola, new THREE.Vector3(x, 0.12, 0), new THREE.Vector3(x, -0.08, 0), 0.025, '#f5f0e2');
    }
  }

  private buildSlide(): void {
    const config = WORLD_CONFIG.playground.slide;
    const slide = new THREE.Group();
    slide.position.set(config.x, 0, config.z);
    slide.rotation.y = config.rotationY;
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 2.2, 7), material('#f0d98a'));
    tower.position.set(0, 1.1, -0.35); tower.castShadow = true; slide.add(tower);
    for (const x of [-0.42, 0.42]) {
      addBeam(slide, new THREE.Vector3(x, 0.1, -0.6), new THREE.Vector3(x, 2.25, -0.6), 0.045, '#f2eee1');
      for (let step = 0; step < 7; step++) {
        const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 5), material('#d5b77b'));
        rung.rotation.z = Math.PI / 2; rung.position.set(0, 0.25 + step * 0.3, -0.6); slide.add(rung);
      }
    }
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.1, -0.65), new THREE.Vector3(0, 2, 0.2),
      new THREE.Vector3(0, 1.45, 0.95), new THREE.Vector3(0, 0.55, 1.6), new THREE.Vector3(0, 0.1, 2.05),
    ]);
    const chute = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.38, 6, false), material('#efb8ca'));
    chute.castShadow = true; slide.add(chute);
    const sideRail = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.045, 5, false), material('#f5e9d8'));
    sideRail.position.x = 0.34; slide.add(sideRail);
    const otherRail = sideRail.clone(); otherRail.position.x = -0.34; slide.add(otherRail);
    this.root.add(slide);
  }

  private buildSeesaw(): void {
    const config = WORLD_CONFIG.playground.seesaw;
    const seesaw = new THREE.Group();
    seesaw.position.set(config.x, 0, config.z);
    seesaw.rotation.y = config.rotationY;
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.45, 0.78), material('#f0d98a'));
    base.position.y = 0.23; base.castShadow = true; seesaw.add(base);
    const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 0.62, 6), material('#a5d7c3'));
    pivot.position.y = 0.57; pivot.castShadow = true; seesaw.add(pivot);
    this.seesawLever.position.y = 0.78;
    const beam = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.18, 0.42), material('#efb8ca'));
    beam.castShadow = true; this.seesawLever.add(beam);
    for (const x of [-1.8, 1.8]) {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.62), material('#f0d98a'));
      seat.position.set(x, 0.17, 0); this.seesawLever.add(seat);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 5), material('#f5eee1'));
      handle.position.set(x, 0.45, 0); this.seesawLever.add(handle);
    }
    seesaw.add(this.seesawLever);
    this.root.add(seesaw);
  }

  render(now: number, startedAt: number): void {
    const seconds = WORLD_CONFIG.playground.wheel.rotationSeconds;
    const angle = ((now - startedAt) / (seconds * 1000)) * Math.PI * 2;
    this.wheel.rotation.z = angle;
    for (const gondola of this.gondolas) gondola.rotation.z = -angle;
    for (let index = 0; index < this.bulbs.length; index++) {
      const bulb = this.bulbs[index];
      const pulse = 0.22 + 0.26 * (0.5 + 0.5 * Math.sin(now * 0.002 + index * 0.8));
      (bulb.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    this.seesawLever.rotation.z = Math.sin(now * 0.00125) * 0.11;
  }
}