import * as THREE from 'three';
import { BOWLING_CONFIG, bowlingPinLayout, type BowlingSnapshot } from '../../shared/bowlingConfig';

interface PinVisual {
  group: THREE.Group;
  baseX: number;
  baseZ: number;
  removed: boolean;
  resetAt: number;
}

interface BowlerVisual {
  group: THREE.Group;
  arm: THREE.Group;
  body: THREE.Mesh;
  hat: THREE.Mesh;
  bodyMaterial: THREE.MeshStandardMaterial;
}

export class BowlingView {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.05, 120);
  private readonly scene = new THREE.Scene();
  private readonly host: HTMLElement;
  private readonly laneGroup = new THREE.Group();
  private readonly pins = new Map<number, PinVisual>();
  private readonly ball = new THREE.Mesh(new THREE.IcosahedronGeometry(BOWLING_CONFIG.lane.ballRadius, 1), new THREE.MeshStandardMaterial({ color: '#3b4f95', roughness: 0.42, metalness: 0.05, flatShading: true }));
  private readonly aimArrow = new THREE.Group();
  private readonly bowler: BowlerVisual;
  private readonly snapshots: BowlingSnapshot[] = [];
  private snapshot: BowlingSnapshot | null = null;
  private renderedBall = new THREE.Vector3(0, BOWLING_CONFIG.lane.ballRadius, 0);
  private renderedLook = new THREE.Vector3(0, 0.5, BOWLING_CONFIG.lane.headPinZ * 0.7);
  private aim = 0;
  private throwAnimationStartedAt = 0;
  private lastPhase: BowlingSnapshot['phase'] = 'aiming';
  private localPlayerId = '';

  constructor(host: HTMLElement) {
    this.host = host;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    host.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color('#202b2d');
    this.scene.fog = new THREE.FogExp2('#202b2d', 0.017);
    this.bowler = this.buildBowler();
    this.buildScene();
    window.addEventListener('resize', this.onResize);
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  get current(): BowlingSnapshot | null {
    return this.snapshot;
  }

  enter(snapshot: BowlingSnapshot, playerId: string): void {
    this.localPlayerId = playerId;
    this.snapshots.length = 0;
    this.snapshot = null;
    this.lastPhase = 'aiming';
    this.receive(snapshot);
  }

  close(): void {
    this.snapshots.length = 0;
    this.snapshot = null;
    this.renderedBall.set(0, BOWLING_CONFIG.lane.ballRadius, 0);
    this.aim = 0;
  }

  receive(snapshot: BowlingSnapshot): void {
    if (this.snapshot && this.snapshot.id !== snapshot.id) {
      this.snapshots.length = 0;
      this.lastPhase = 'aiming';
    }
    if (snapshot.phase === 'rolling' && this.lastPhase !== 'rolling') {
      this.throwAnimationStartedAt = performance.now();
      this.renderedBall.set(snapshot.ball.x, BOWLING_CONFIG.lane.ballRadius, snapshot.ball.z);
    }
    this.lastPhase = snapshot.phase;
    this.snapshot = snapshot;
    this.snapshots.push(snapshot);
    while (this.snapshots.length > 8) this.snapshots.shift();
  }

  setAim(aim: number): void {
    this.aim = Math.max(-1, Math.min(1, aim));
  }

  render(serverNow: number, deltaSeconds: number): void {
    const snapshot = this.snapshot;
    if (!snapshot) return;
    const dt = Math.max(0, Math.min(0.06, deltaSeconds));
    const ballTarget = new THREE.Vector3(snapshot.ball.x, BOWLING_CONFIG.lane.ballRadius, snapshot.ball.z);
    if (!snapshot.ball.visible) ballTarget.y = BOWLING_CONFIG.lane.ballRadius;
    this.renderedBall.lerp(ballTarget, 1 - Math.exp(-18 * dt));
    this.ball.position.copy(this.renderedBall);
    this.ball.visible = snapshot.ball.visible;
    this.ball.rotation.x += dt * 12;
    this.ball.rotation.z += dt * 4;

    for (const pin of snapshot.pins) {
      const visual = this.pins.get(pin.id);
      if (!visual) continue;
      if (visual.removed && !pin.removed) visual.resetAt = performance.now();
      visual.removed = pin.removed;
      visual.group.visible = !pin.removed;
      visual.group.position.set(pin.x, 0, pin.z);
      const dx = pin.x - visual.baseX;
      const dz = pin.z - visual.baseZ;
      const direction = new THREE.Vector3(-dz, 0, dx);
      if (direction.lengthSq() < 0.00001) direction.set(1, 0, 0);
      direction.normalize();
      visual.group.quaternion.setFromAxisAngle(direction, pin.tilt);
      if (visual.resetAt) {
        const progress = Math.min(1, (performance.now() - visual.resetAt) / 320);
        const eased = 1 - (1 - progress) * (1 - progress);
        visual.group.scale.setScalar(0.55 + eased * 0.45);
        if (progress >= 1) visual.resetAt = 0;
      } else visual.group.scale.setScalar(1);
    }

    const active = snapshot.players.find((player) => player.playerId === snapshot.activePlayerId);
    this.bowler.group.visible = snapshot.phase !== 'game_over';
    if (active) this.tintBowler(active.color);
    const chargingPhase = snapshot.phase === 'aiming' || snapshot.phase === 'rolling' || snapshot.phase === 'turn_end';
    this.aimArrow.visible = chargingPhase && snapshot.phase === 'aiming';
    this.aimArrow.rotation.y = this.aim * BOWLING_CONFIG.physics.maxAimRadians;
    this.aimArrow.position.set(0, 0.035, 0.2);
    this.updateBowlerPose(snapshot, dt);

    this.updateCamera(snapshot, serverNow, dt);
    this.renderer.render(this.scene, this.camera);
  }

  private updateBowlerPose(snapshot: BowlingSnapshot, deltaSeconds: number): void {
    const aiming = snapshot.phase === 'aiming';
    const elapsed = this.throwAnimationStartedAt ? performance.now() - this.throwAnimationStartedAt : 0;
    const swing = snapshot.phase === 'rolling' && elapsed < 650
      ? Math.sin(Math.min(1, elapsed / 650) * Math.PI)
      : 0;
    const targetArm = aiming ? -0.65 + Math.sin(performance.now() * 0.006) * 0.03 : -0.65 + swing * 2.4;
    this.bowler.arm.rotation.x += (targetArm - this.bowler.arm.rotation.x) * Math.min(1, deltaSeconds * 18);
    this.bowler.group.position.y = aiming ? Math.sin(performance.now() * 0.004) * 0.012 : 0;
  }

  private updateCamera(snapshot: BowlingSnapshot, serverNow: number, deltaSeconds: number): void {
    const ball = this.renderedBall;
    let target: THREE.Vector3;
    let look: THREE.Vector3;
    if (snapshot.phase === 'game_over') {
      target = new THREE.Vector3(0, 5.8, -6.5);
      look = new THREE.Vector3(0, 0.4, BOWLING_CONFIG.lane.headPinZ * 0.55);
    } else if (snapshot.phase === 'aiming') {
      target = new THREE.Vector3(0, 2.55, -5.2);
      look = new THREE.Vector3(this.aim * 1.4, 0.55, BOWLING_CONFIG.lane.headPinZ + 0.4);
    } else if (snapshot.phase === 'rolling') {
      target = new THREE.Vector3(ball.x * 0.7, 2.1, ball.z - 4.6);
      look = new THREE.Vector3(ball.x, 0.35, ball.z + 3.2);
    } else {
      target = new THREE.Vector3(0, 3.15, BOWLING_CONFIG.lane.headPinZ - 5.1);
      look = new THREE.Vector3(ball.x * 0.4, 0.35, BOWLING_CONFIG.lane.headPinZ + 0.8);
    }
    if (snapshot.phase === 'rolling' && serverNow - snapshot.calloutAt < 200) {
      target.x += (Math.random() - 0.5) * 0.035;
    }
    const positionDamping = 1 - Math.exp(-5.5 * deltaSeconds);
    const lookDamping = 1 - Math.exp(-8 * deltaSeconds);
    this.camera.position.lerp(target, positionDamping);
    this.renderedLook.lerp(look, lookDamping);
    this.camera.lookAt(this.renderedLook);
  }

  private buildScene(): void {
    this.scene.add(new THREE.HemisphereLight('#dff7ff', '#3b3530', 1.9));
    const key = new THREE.DirectionalLight('#fff0cc', 2.8);
    key.position.set(-7, 13, -5);
    this.scene.add(key);
    const pinLight = new THREE.PointLight('#ffe8b5', 1.5, 22, 2);
    pinLight.position.set(0, 4.2, BOWLING_CONFIG.lane.headPinZ + 1.2);
    this.scene.add(pinLight);
    const neon = new THREE.PointLight('#59e6ff', 1.2, 14, 2);
    neon.position.set(0, 2.3, BOWLING_CONFIG.lane.length + 1.4);
    this.scene.add(neon);

    const carpet = new THREE.Mesh(new THREE.PlaneGeometry(26, 38), new THREE.MeshStandardMaterial({ color: '#27343a', roughness: 1, flatShading: true }));
    carpet.rotation.x = -Math.PI / 2;
    carpet.position.set(0, -0.12, 8);
    this.scene.add(carpet);

    const lane = BOWLING_CONFIG.lane;
    const plankWidth = lane.width / 9;
    for (let index = 0; index < 9; index++) {
      const plank = new THREE.Mesh(
        new THREE.BoxGeometry(plankWidth - 0.008, 0.1, lane.length),
        new THREE.MeshStandardMaterial({ color: index % 2 ? '#c9a86a' : '#d2b278', roughness: 0.9, flatShading: true }),
      );
      plank.position.set(-lane.width / 2 + plankWidth / 2 + index * plankWidth, 0.0, lane.length / 2);
      this.laneGroup.add(plank);
    }
    const foulLine = new THREE.Mesh(new THREE.BoxGeometry(lane.width, 0.012, 0.06), new THREE.MeshStandardMaterial({ color: '#f3ead2', roughness: 1 }));
    foulLine.position.set(0, 0.058, 0.12);
    this.laneGroup.add(foulLine);
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(lane.width + 0.1, 0.1, lane.length - lane.headPinZ),
      new THREE.MeshStandardMaterial({ color: '#b9975f', roughness: 1, flatShading: true }),
    );
    deck.position.set(0, 0, (lane.headPinZ + lane.length) / 2);
    this.laneGroup.add(deck);
    for (const side of [-1, 1]) {
      const gutter = new THREE.Mesh(
        new THREE.BoxGeometry(lane.gutterWidth, 0.12, lane.length + 0.5),
        new THREE.MeshStandardMaterial({ color: '#454d4e', roughness: 1, flatShading: true }),
      );
      gutter.position.set(side * (lane.width / 2 + lane.gutterWidth / 2), -0.055, (lane.length + 0.5) / 2);
      this.laneGroup.add(gutter);
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.16, lane.length + 0.5),
        new THREE.MeshStandardMaterial({ color: '#6d7777', roughness: 1, flatShading: true }),
      );
      rail.position.set(side * (lane.width / 2 + lane.gutterWidth + 0.02), 0.02, (lane.length + 0.5) / 2);
      this.laneGroup.add(rail);
    }

    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 2.5, 0.28),
      new THREE.MeshStandardMaterial({ color: '#313c43', roughness: 1, flatShading: true }),
    );
    backWall.position.set(0, 1.2, lane.length + 0.55);
    this.laneGroup.add(backWall);
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(2.9, 0.62, 0.12),
      new THREE.MeshStandardMaterial({ color: '#1e2a31', roughness: 0.7, metalness: 0.1, emissive: '#1b5f74', emissiveIntensity: 0.55, flatShading: true }),
    );
    sign.position.set(0, 2.2, lane.length + 0.38);
    this.laneGroup.add(sign);
    const pit = new THREE.Mesh(
      new THREE.BoxGeometry(lane.width + lane.gutterWidth * 2, 0.35, 0.9),
      new THREE.MeshStandardMaterial({ color: '#121a1e', roughness: 1, flatShading: true }),
    );
    pit.position.set(0, -0.22, lane.length + 0.35);
    this.laneGroup.add(pit);
    this.scene.add(this.laneGroup);

    for (const layout of bowlingPinLayout()) {
      const group = new THREE.Group();
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#f5f1e2', roughness: 0.72, flatShading: true });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.115, 0.31, 6), bodyMaterial);
      body.position.y = 0.155;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.085, 0.115, 6), bodyMaterial);
      neck.position.y = 0.365;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.067, 6, 5), bodyMaterial);
      head.position.y = 0.46;
      const stripe = new THREE.Mesh(
        new THREE.TorusGeometry(0.088, 0.014, 4, 8),
        new THREE.MeshStandardMaterial({ color: '#c64d43', roughness: 0.8, flatShading: true }),
      );
      stripe.rotation.x = Math.PI / 2;
      stripe.position.y = 0.27;
      group.add(body, neck, head, stripe);
      group.position.set(layout.x, 0, layout.z);
      this.scene.add(group);
      this.pins.set(layout.id, { group, baseX: layout.x, baseZ: layout.z, removed: false, resetAt: 0 });
    }

    this.ball.position.set(0, BOWLING_CONFIG.lane.ballRadius, 0);
    this.scene.add(this.ball);

    const arrowMaterial = new THREE.MeshBasicMaterial({ color: '#ffe27a', transparent: true, opacity: 0.82, depthWrite: false });
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.012, 2.1), arrowMaterial);
    shaft.position.z = 1.05;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 4), arrowMaterial);
    tip.rotation.x = Math.PI / 2;
    tip.position.z = 2.3;
    this.aimArrow.add(shaft, tip);
    this.aimArrow.position.set(0, 0.035, 0.2);
    this.scene.add(this.aimArrow);

    this.bowler.group.position.set(0, 0, -1.15);
    this.scene.add(this.bowler.group);
    this.camera.position.set(0, 2.55, -5.2);
    this.camera.lookAt(0, 0.6, BOWLING_CONFIG.lane.headPinZ);
  }

  private buildBowler(): BowlerVisual {
    const group = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#4cb89b', roughness: 1, flatShading: true });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.62, 3, 6), bodyMaterial);
    body.position.y = 0.72;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.21, 7, 5), new THREE.MeshStandardMaterial({ color: '#f2c7a5', roughness: 1, flatShading: true }));
    head.position.y = 1.32;
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.24, 6), bodyMaterial);
    hat.position.y = 1.55;
    const armPivot = new THREE.Group();
    armPivot.position.set(0.24, 1.05, 0);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.67, 5), bodyMaterial);
    arm.position.y = -0.32;
    armPivot.add(arm);
    group.add(body, head, hat, armPivot);
    return { group, arm: armPivot, body, hat, bodyMaterial };
  }

  private tintBowler(color: string): void {
    this.bowler.bodyMaterial.color.set(color);
  }

  private onResize = (): void => {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
  };
}
