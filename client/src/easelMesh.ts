import * as THREE from 'three';

export const EASEL_CONFIG = {
  interactionRadius: 2.5,
  placementDistance: 3.0,
  placementHeight: 0.4,
  canvasWidth: 1.6,
  canvasHeight: 1.2,
  canvasOffsetZ: 0.15,
} as const;

export interface EaselSnapshot {
  id: string;
  ownerPlayerId: string;
  x: number;
  z: number;
  facing: number;
  canvasTextureUrl?: string;
}

/** Procedurally generates and manages 3D easel meshes. */
export class EaselMesh {
  private group = new THREE.Group();

  constructor(config: { x: number; z: number; facing: number } = { x: 0, z: 0, facing: 0 }) {
    this.group.position.set(config.x, 0, config.z);
    this.group.rotation.y = config.facing;
    this.buildEasel();
  }

  private buildEasel(): void {
    const materials = {
      wood: new THREE.MeshStandardMaterial({ color: '#6b4423', roughness: 0.8, flatShading: true }),
      white: new THREE.MeshStandardMaterial({ color: '#f5f1e8', roughness: 0.6, flatShading: true }),
      linen: new THREE.MeshStandardMaterial({ color: '#f9f7f1', roughness: 0.95, flatShading: true }),
    };

    // Left leg
    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.2, 0.08),
      materials.wood
    );
    leftLeg.position.set(-0.35, 0.6, 0.3);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    this.group.add(leftLeg);

    // Right leg
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.35;
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    this.group.add(rightLeg);

    // Cross brace (back)
    const brace = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.6),
      materials.wood
    );
    brace.position.set(0, 0.5, 0.15);
    brace.castShadow = true;
    brace.receiveShadow = true;
    this.group.add(brace);

    // Top horizontal beam
    const topBeam = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.08, 0.08),
      materials.wood
    );
    topBeam.position.set(0, 1.3, 0.1);
    topBeam.castShadow = true;
    topBeam.receiveShadow = true;
    this.group.add(topBeam);

    // Canvas frame
    const frameThickness = 0.04;
    const frameColor = materials.wood;

    // Frame edges
    const edgeThickness = 0.025;
    const canvasW = EASEL_CONFIG.canvasWidth;
    const canvasH = EASEL_CONFIG.canvasHeight;

    // Left frame edge
    const leftFrame = new THREE.Mesh(
      new THREE.BoxGeometry(edgeThickness, canvasH, edgeThickness),
      frameColor
    );
    leftFrame.position.set(-canvasW / 2, canvasH / 2 + 0.4, EASEL_CONFIG.canvasOffsetZ);
    leftFrame.castShadow = true;
    leftFrame.receiveShadow = true;
    this.group.add(leftFrame);

    // Right frame edge
    const rightFrame = leftFrame.clone();
    rightFrame.position.x = canvasW / 2;
    rightFrame.castShadow = true;
    rightFrame.receiveShadow = true;
    this.group.add(rightFrame);

    // Top frame edge
    const topFrame = new THREE.Mesh(
      new THREE.BoxGeometry(canvasW, edgeThickness, edgeThickness),
      frameColor
    );
    topFrame.position.set(0, canvasH + 0.4, EASEL_CONFIG.canvasOffsetZ);
    topFrame.castShadow = true;
    topFrame.receiveShadow = true;
    this.group.add(topFrame);

    // Bottom frame edge
    const bottomFrame = topFrame.clone();
    bottomFrame.position.y = 0.4;
    bottomFrame.castShadow = true;
    bottomFrame.receiveShadow = true;
    this.group.add(bottomFrame);

    // Canvas mesh itself is added separately by the caller using setCanvasTexture
  }

  addCanvasMesh(texture: THREE.Texture): THREE.Mesh {
    const canvasMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    const canvasMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(EASEL_CONFIG.canvasWidth, EASEL_CONFIG.canvasHeight),
      canvasMaterial
    );
    canvasMesh.position.set(0, EASEL_CONFIG.canvasHeight / 2 + 0.4, EASEL_CONFIG.canvasOffsetZ + 0.025);
    canvasMesh.castShadow = true;
    canvasMesh.receiveShadow = true;
    this.group.add(canvasMesh);

    return canvasMesh;
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  dispose(): void {
    // Cleanup is handled by caller
  }
}
