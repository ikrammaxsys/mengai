import * as THREE from 'three';
import { PaintCanvas } from './paintCanvas';
import { EaselManager, type EaselInstance } from './easelManager';
import { PaintingUI, PaintingGalleryUI, PAINTING_COLORS } from './paintingUI';
import { PaintingStorage } from './paintingStorage';
import type { GameScene } from './scene';
import type { Network, PlayerSnapshot, PaintingSnapshot } from './network';

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type PaintingMode = 'idle' | 'painting' | 'saving';

export interface PaintingSession {
  easelId: string;
  easel: EaselInstance;
  paintCanvas: PaintCanvas;
  ui: PaintingUI;
  mode: PaintingMode;
  startedAt: number;
}

/**
 * Manages the entire painting flow: mode transitions, canvas raycasting, brush strokes,
 * camera control, and integration with scene and network.
 */
export class PaintingController {
  private session: PaintingSession | null = null;
  private storage = new PaintingStorage();
  private galleryUI = new PaintingGalleryUI();
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private isPointerDown = false;
  private currentStrokeId = '';
  private firstPersonRig: THREE.Group | null = null;
  private brushRig: THREE.Group | null = null;
  private brushTip: THREE.Mesh | null = null;
  private cursorElement: HTMLElement | null = null;
  private lastPaintSound = 0;
  private network: Network | null = null;
  private readonly pointerWorld = new THREE.Vector3();
  private readonly worldQuaternion = new THREE.Quaternion();

  constructor(
    private scene: GameScene,
    private easelManager: EaselManager,
    private container: HTMLElement,
    private playerName: string,
    private ownerPlayerId?: string,
    private onModeChange?: (mode: PaintingController | null) => void,
  ) {
    document.body.appendChild(this.galleryUI.getRoot());
  }

  setPlayer(playerName: string, ownerPlayerId?: string): void {
    this.playerName = playerName;
    this.ownerPlayerId = ownerPlayerId;
  }

  setNetwork(network: Network): void {
    this.network = network;
  }

  syncRemotePaintings(players: PlayerSnapshot[]): void {
    const activeIds = new Set<string>();
    for (const player of players) {
      const painting = player.painting;
      if (!painting || player.id === this.ownerPlayerId) continue;
      activeIds.add(painting.easelId);
      this.scene.setAvatarPainting(player.id, true, painting.brushColor);
      let easel = this.easelManager.getEasel(painting.easelId);
      if (!easel) {
        const paintCanvas = new PaintCanvas(1024, 768);
        easel = this.easelManager.createSnapshotEasel(
          painting.easelId,
          player.id,
          painting.x,
          painting.z,
          painting.facing,
          paintCanvas,
        );
        for (const stroke of painting.strokes) paintCanvas.replayStroke(stroke);
      } else {
        const existingIds = new Set(easel.paintCanvas.getStrokes().map((stroke) => stroke.id));
        for (const stroke of painting.strokes) {
          if (!existingIds.has(stroke.id)) easel.paintCanvas.replayStroke(stroke);
        }
      }
    }
    for (const easel of this.easelManager.getAllEasels()) {
      if (easel.ownerPlayerId !== this.ownerPlayerId && !activeIds.has(easel.id)) {
        this.easelManager.removeEasel(easel.id);
        this.scene.setAvatarPainting(easel.ownerPlayerId, false);
      }
    }
  }

  /**
   * Attempts to start painting. Returns true if successful.
   */
  startPainting(playerX: number, playerZ: number, playerFacing: number): boolean {
    if (this.session) {
      console.warn('Painting already active');
      return false;
    }

    const easelId = uuid();
    const paintCanvas = new PaintCanvas(1024, 768);

    const easel = this.easelManager.createEasel(
      easelId,
      this.ownerPlayerId || this.playerName,
      playerX,
      playerZ,
      playerFacing,
      paintCanvas,
    );

    if (!easel) {
      paintCanvas.dispose();
      return false;
    }

    easel.canvasMesh.getWorldPosition(this.pointerWorld);
    const normal = new THREE.Vector3(0, 0, 1);
    easel.canvasMesh.getWorldQuaternion(this.worldQuaternion);
    normal.applyQuaternion(this.worldQuaternion);
    const cameraPosition = easel.canvasMesh.getWorldPosition(new THREE.Vector3()).add(normal.multiplyScalar(2.2));
    cameraPosition.y += 0.08;
    const canvasTarget = easel.canvasMesh.getWorldPosition(new THREE.Vector3());
    canvasTarget.y += 0.05;
    this.scene.enterPaintingCamera(cameraPosition, canvasTarget, 34);
    this.createFirstPersonProps();
    document.body.classList.add('painting-active');
    document.querySelector<HTMLElement>('#hud')?.classList.add('painting-hidden');
    this.scene.setAvatarPainting(this.ownerPlayerId || this.playerName, true);

    const ui = new PaintingUI();
    this.container.appendChild(ui.getRoot());

    this.session = {
      easelId,
      easel,
      paintCanvas,
      ui,
      mode: 'painting',
      startedAt: Date.now(),
    };

    this.setupUI();
    this.setupInput();
    this.network?.sendPaintingOpen({
      easelId,
      x: easel.x,
      z: easel.z,
      facing: easel.facing,
      strokes: [],
    });
    this.onModeChange?.(this);

    return true;
  }

  private createFirstPersonProps(): void {
    this.disposeFirstPersonProps();
    const rig = new THREE.Group();
    rig.name = 'painting-first-person-props';

    const wood = new THREE.MeshStandardMaterial({ color: '#7a5030', roughness: 0.75 });
    const skin = new THREE.MeshStandardMaterial({ color: '#e7bd92', roughness: 0.9 });

    const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 6), skin);
    leftHand.scale.set(1.1, 0.72, 0.7);
    leftHand.position.set(-0.58, -0.48, -0.92);
    rig.add(leftHand);

    const palette = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 8), wood);
    palette.scale.set(1.35, 0.22, 0.9);
    palette.position.set(-0.72, -0.43, -1.05);
    rig.add(palette);

    const paletteColors = ['#e74c3c','#e67e22','#f1c40f','#2ecc71','#3498db','#2980b9','#9b59b6','#e91e63','#8b6f47','#34495e','#ffffff'];
    paletteColors.forEach((color, index) => {
      const angle = -1.1 + index * (2.2 / Math.max(1, paletteColors.length - 1));
      const dab = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 5),
        new THREE.MeshStandardMaterial({ color, roughness: 0.7 }),
      );
      dab.position.set(-0.72 + Math.cos(angle) * 0.16, -0.25 - Math.abs(angle) * 0.01, -1.19);
      rig.add(dab);
    });

    const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 6), skin);
    rightHand.scale.set(0.85, 0.72, 0.75);
    rightHand.position.set(0.56, -0.48, -0.92);
    rig.add(rightHand);

    const brush = new THREE.Group();
    brush.name = 'painting-brush';
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.48, 8), wood);
    handle.rotation.x = Math.PI / 2;
    handle.position.z = -0.13;
    brush.add(handle);
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 10, 6),
      new THREE.MeshStandardMaterial({ color: '#e74c3c', roughness: 0.85 }),
    );
    tip.scale.set(0.8, 0.8, 1.35);
    tip.position.z = -0.41;
    brush.add(tip);
    brush.position.set(0.56, -0.48, -1.0);
    rig.add(brush);

    this.scene.camera.add(rig);
    if (!this.scene.scene.children.includes(this.scene.camera)) this.scene.scene.add(this.scene.camera);
    this.firstPersonRig = rig;
    this.brushRig = brush;
    this.brushTip = tip;

    this.cursorElement = document.createElement('div');
    this.cursorElement.id = 'painting-cursor';
    this.cursorElement.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.cursorElement);
  }

  private disposeFirstPersonProps(): void {
    if (this.firstPersonRig) {
      this.scene.camera.remove(this.firstPersonRig);
      this.firstPersonRig.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      this.firstPersonRig = null;
    }
    this.cursorElement?.remove();
    this.cursorElement = null;
    this.brushRig = null;
    this.brushTip = null;
  }

  private setupUI(): void {
    if (!this.session) return;

    this.session.ui.setCallbacks({
      onColorChange: (color) => this.setBrushColor(color),
      onBrushChange: () => {
        // Brush selection handled by UI
      },
      onSizeChange: () => {
        // Size changes handled by UI
      },
      onUndo: () => this.undo(),
      onClear: () => this.clear(),
      onSave: () => this.saveDialog(),
      onClose: () => this.exitPainting(),
    });
  }

  private setupInput(): void {
    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerdown', this.handlePointerDown);
    document.addEventListener('pointerup', this.handlePointerUp);
  }

  private removeInput(): void {
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerdown', this.handlePointerDown);
    document.removeEventListener('pointerup', this.handlePointerUp);
  }

  private handlePointerMove = (e: PointerEvent): void => {
    if (!this.session) return;

    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    const uv = this.raycastCanvas();
    if (this.cursorElement) {
      const size = this.session.ui.getCurrentSize();
      const scale = Math.max(18, size * 0.9);
      this.cursorElement.style.left = `${e.clientX}px`;
      this.cursorElement.style.top = `${e.clientY}px`;
      this.cursorElement.style.width = `${scale}px`;
      this.cursorElement.style.height = `${scale}px`;
      this.cursorElement.style.borderColor = this.session.ui.getCurrentColor();
      this.cursorElement.classList.toggle('on-canvas', Boolean(uv));
    }
    if (this.brushRig && uv) {
      const targetX = (uv.x - 0.5) * 1.45;
      const targetY = (0.5 - uv.y) * 0.85 - 0.42;
      this.brushRig.position.x = THREE.MathUtils.lerp(this.brushRig.position.x, targetX, 0.42);
      this.brushRig.position.y = THREE.MathUtils.lerp(this.brushRig.position.y, targetY, 0.42);
      this.brushRig.rotation.z = THREE.MathUtils.lerp(this.brushRig.rotation.z, (uv.x - 0.5) * 0.25, 0.35);
    }

    if (this.isPointerDown && this.currentStrokeId) {
      if (uv) {
        const x = uv.x * this.session.paintCanvas.width;
        const y = (1 - uv.y) * this.session.paintCanvas.height;
        this.session.paintCanvas.addPoint(x, y);
        const now = performance.now();
        if (now - this.lastPaintSound > 110) {
          this.lastPaintSound = now;
          this.playPaintSound();
        }
      }
    }
  };

  private handlePointerDown = (e: PointerEvent): void => {
    if (!this.session) return;
    if ((e.target as HTMLElement)?.closest?.('.painting-ui, .painting-save-dialog')) return;
    this.isPointerDown = true;
    this.currentStrokeId = uuid();

    const uv = this.raycastCanvas();
    if (!uv) return;

    try {
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } catch { /* Capture is optional. */ }

    const x = uv.x * this.session.paintCanvas.width;
    const y = (1 - uv.y) * this.session.paintCanvas.height;

    this.session.paintCanvas.beginStroke(this.currentStrokeId, {
      type: this.session.ui.getCurrentBrush(),
      color: this.session.ui.getCurrentColor(),
      size: this.session.ui.getCurrentSize(),
    });
    this.session.paintCanvas.addPoint(x, y);
  };

  private handlePointerUp = (): void => {
    if (!this.session) return;
    this.isPointerDown = false;
    const stroke = this.session.paintCanvas.endStroke();
    if (stroke) this.network?.sendPaintingStroke(this.session.easelId, stroke);
    this.currentStrokeId = '';
  };

  private raycastCanvas(): { x: number; y: number } | null {
    if (!this.session) return null;

    this.raycaster.setFromCamera(this.pointer, this.scene.camera);
    const intersects = this.raycaster.intersectObject(this.session.easel.canvasMesh);

    if (intersects.length === 0) return null;

    const intersection = intersects[0];
    const uv = intersection.uv;
    if (!uv) return null;

    return { x: uv.x, y: uv.y };
  }

  private setBrushColor(color: string): void {
    if (!this.brushTip) return;
    const material = this.brushTip.material as THREE.MeshStandardMaterial;
    material.color.set(color);
    this.scene.setAvatarPainting(this.ownerPlayerId || this.playerName, true, color);
  }

  private playPaintSound(): void {
    try {
      const context = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 180 + Math.random() * 50;
      gain.gain.setValueAtTime(0.018, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.045);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.05);
    } catch { /* Audio is optional. */ }
  }

  private undo(): void {
    if (!this.session) return;
    this.session.paintCanvas.undo();
  }

  private clear(): void {
    if (!this.session) return;
    this.session.paintCanvas.clear();
  }

  private saveDialog(): void {
    if (!this.session) return;

    this.session.mode = 'saving';
    this.galleryUI.show({
      onConfirm: (title) => this.confirmSave(title),
      onCancel: () => this.cancelSave(),
    });
  }

  private confirmSave(title: string): void {
    if (!this.session) return;

    const painting = {
      id: uuid(),
      title: title || 'Untitled',
      author: this.playerName,
      imageData: this.session.paintCanvas.getImage(),
      timestamp: Date.now(),
      strokes: this.session.paintCanvas.getStrokes(),
    };

    this.storage.save(painting);
    this.session.mode = 'painting';
    console.log('Painting saved:', painting.title);
    window.dispatchEvent(new CustomEvent('painting:saved', { detail: { title: painting.title } }));
  }

  private cancelSave(): void {
    if (!this.session) return;
    this.session.mode = 'painting';
  }

  exitPainting(): void {
    if (!this.session) return;

    this.removeInput();
    this.galleryUI.hide();
    this.network?.sendPaintingClose(this.session.easelId);
    this.session.ui.dispose();
    this.scene.exitPaintingCamera();
    this.scene.setAvatarPainting(this.ownerPlayerId || this.playerName, false);
    this.disposeFirstPersonProps();
    document.body.classList.remove('painting-active');
    document.querySelector<HTMLElement>('#hud')?.classList.remove('painting-hidden');

    this.session = null;
    this.onModeChange?.(null);
  }

  isActive(): boolean {
    return this.session !== null;
  }

  dispose(): void {
    if (this.session) {
      this.exitPainting();
    }
    this.galleryUI.dispose();
  }
}
