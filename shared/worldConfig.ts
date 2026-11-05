export const WORLD_CONFIG = {
  movementRadius: 36.4,
  stoneThrowRadius: 35.8,
  groundRadius: 45.5,
  grassRadius: 42.9,
  crocodilePortal: { x: 18, z: -20, useRadius: 2.8 },
  jukebox: { x: 21, z: -2, interactionRadius: 4.5, hearingRadius: 22, fullVolumeRadius: 4 },
  campfire: { x: 0, z: 20, useRadius: 4.8, shareRadius: 8, cookDurationMs: 9000 },
  theater: { x: -29, z: 0, rotationY: Math.PI / 2, width: 17.5, height: 9.84375, interactionRadius: 5.5, colliderHalfWidth: 9.35, colliderHalfDepth: 0.45 },
  playground: {
    wheel: { x: 0, z: -28.5, radius: 2.35, centerY: 2.85, rotationSeconds: 28, boardingRadius: 4.2, queueRadius: 4.2, boardingSpot: { x: 0, z: -22.2 } },
    slide: { x: 6.2, z: -23.2, rotationY: -0.5 },
    seesaw: { x: -6.4, z: -23.4, rotationY: 0.2 },
    colliderPadding: 0.55,
  },
  trees: [
    [-12, -8], [-13, 7], [12, -10], [13, 7], [-7, 14], [8, 13], [16, -1], [-16, 0],
    [-21, -9], [-22, 7], [-17, 19], [-8, 24], [5, 22], [20, 14], [24, 4], [21, -13],
    [-24, -12], [0, 26],
  ],
  rocks: [
    [-8, -2], [8, 3], [-3, 12], [3, -13], [-15, -9], [14, 11], [10, -4],
    [20, -8], [23, 12], [-23, 14], [-20, -17], [6, 26], [-6, -27], [26, 0],
    [-27, -3], [15, 21], [-15, 21], [11, -24], [-19, 11],
  ],
} as const;
