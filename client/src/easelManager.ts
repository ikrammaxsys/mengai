import * as THREE from 'three';
import type { PaintCanvas } from './paintCanvas';
import { EaselMesh, type EaselSnapshot, EASEL_CONFIG } from './easelMesh';
import type { GameScene } from './scene';

export interface EaselInstance {
  id: string;
  ownerPlayerId: string;
  x: number;
  z: number;
  facing: number;
  mesh: THREE.Group;
  canvasMesh: THREE.Mesh;
  paintCanvas: PaintCanvas;
  createdAt: number;
}

/**
 * Manages easels in the world: placement, collision detection, tracking.
 */
export class EaselManager {
  private easels = new Map<string, EaselInstance>();
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Attempts to place an easel in front of the player.
   * Returns the easel instance or null if placement failed.
   */
  createEasel(
    easelId: string,
    playerId: string,
    playerX: number,
    playerZ: number,
    playerFacing: number,
    paintCanvas: PaintCanvas,
  ): EaselInstance | null {
    // Check if player already has an active easel
    const existing = Array.from(this.easels.values()).find((e) => e.ownerPlayerId === playerId);
    if (existing) {
      console.warn('Player already has an active easel');
      return null;
    }

    // Calculate placement position in front of player
    const distance = EASEL_CONFIG.placementDistance;
    const easelX = playerX + Math.sin(playerFacing) * distance;
    const easelZ = playerZ + Math.cos(playerFacing) * distance;

    // Check for collision with existing easels
    for (const easel of this.easels.values()) {
      const dist = Math.hypot(easelX - easel.x, easelZ - easel.z);
      if (dist < 1.5) {
        console.warn('Easel placement too close to existing easel');
        return null;
      }
    }

    // Create the 3D mesh
    const easelMesh = new EaselMesh({ x: easelX, z: easelZ, facing: playerFacing + Math.PI });
    const canvasMesh = easelMesh.addCanvasMesh(paintCanvas.canvasTexture);
    this.scene.add(easelMesh.getGroup());

    const instance: EaselInstance = {
      id: easelId,
      ownerPlayerId: playerId,
      x: easelX,
      z: easelZ,
      facing: playerFacing + Math.PI,
      mesh: easelMesh.getGroup(),
      canvasMesh,
      paintCanvas,
      createdAt: Date.now(),
    };

    this.easels.set(easelId, instance);
    return instance;
  }

  getEasel(easelId: string): EaselInstance | null {
    return this.easels.get(easelId) ?? null;
  }

  getPlayerEasel(playerId: string): EaselInstance | null {
    for (const easel of this.easels.values()) {
      if (easel.ownerPlayerId === playerId) return easel;
    }
    return null;
  }

  createSnapshotEasel(
    easelId: string,
    ownerPlayerId: string,
    x: number,
    z: number,
    facing: number,
    paintCanvas: PaintCanvas,
  ): EaselInstance {
    const existing = this.getEasel(easelId);
    if (existing) return existing;
    const easelMesh = new EaselMesh({ x, z, facing });
    const canvasMesh = easelMesh.addCanvasMesh(paintCanvas.canvasTexture);
    this.scene.add(easelMesh.getGroup());
    const instance: EaselInstance = {
      id: easelId,
      ownerPlayerId,
      x,
      z,
      facing,
      mesh: easelMesh.getGroup(),
      canvasMesh,
      paintCanvas,
      createdAt: Date.now(),
    };
    this.easels.set(easelId, instance);
    return instance;
  }

  getAllEasels(): EaselInstance[] {
    return Array.from(this.easels.values());
  }

  removeEasel(easelId: string): boolean {
    const easel = this.easels.get(easelId);
    if (!easel) return false;

    this.scene.remove(easel.mesh);
    easel.paintCanvas.dispose();
    this.easels.delete(easelId);
    return true;
  }

  snapshots(): EaselSnapshot[] {
    return Array.from(this.easels.values()).map((e) => ({
      id: e.id,
      ownerPlayerId: e.ownerPlayerId,
      x: e.x,
      z: e.z,
      facing: e.facing,
    }));
  }

  dispose(): void {
    for (const easel of this.easels.values()) {
      this.scene.remove(easel.mesh);
      easel.paintCanvas.dispose();
    }
    this.easels.clear();
  }
}
