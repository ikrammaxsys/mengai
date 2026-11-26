# Painting Easel - Integration Guide for main.ts

This guide walks through integrating the painting easel system into the main game loop.

## Step 1: Add Imports

At the top of `client/src/main.ts`, after other imports (around line 30):

```typescript
import { PaintingController } from './paintingMode';
import { EaselManager } from './easelManager';
```

## Step 2: Create Instances

After the scene is created (around line 435), add:

```typescript
// Painting system
const easelManager = new EaselManager(scene.scene);
let paintingController: PaintingController | null = null;
```

Then after `network` is initialized and other modules are set up (around line 475), create the controller:

```typescript
paintingController = new PaintingController(
  scene,
  easelManager,
  appRoot,
  playerName,
  (controller) => {
    // Handle mode changes if needed
    if (controller?.isActive()) {
      // Player entered painting mode
      // Could lock camera, disable movement, etc.
    }
  }
);
```

## Step 3: Add Keyboard Shortcut

In the keydown event listener (around line 2650), add:

```typescript
if (key === 'g' && joined && !event.repeat && !isPhotoboothMode) {
  event.preventDefault();
  if (paintingController?.isActive()) {
    paintingController.exitPainting();
  } else if (scene.fishingState() === 'idle' && !arenaMode && !bowlingMode.isActive) {
    const pos = scene.getPosition();
    const facing = scene.getAngle();
    paintingController?.startPainting(pos.x, pos.z, facing);
  }
  return;
}
```

Place this after the 'c' (cook) shortcut, before the WASD movement block.

## Step 4: Add Mobile Touch Button (Optional)

If using TouchControls, add a third button for easel (similar to primary/secondary):

In `client/src/touchControls.ts`, add to the button creation:

```typescript
const easelButton = document.createElement('button');
easelButton.className = 'touch-action touch-easel';
easelButton.type = 'button';
easelButton.setAttribute('aria-label', 'Open easel');
easelButton.innerHTML = `<span class="touch-action-glyph" aria-hidden="true">🎨</span>`;
```

Then wire it in `main.ts` to call the easel action.

## Step 5: Add Cleanup

In the cleanup section (around line 2730 in the blur event), add:

```typescript
if (paintingController?.isActive()) {
  paintingController.exitPainting();
}
```

And in the dispose/teardown code (if exists), add:

```typescript
paintingController?.dispose();
```

## Step 6: Update Prompts (Optional)

If using a keyboard hint system, add:

```
G – Open easel
```

To the controls display.

## Testing Checklist

After integration:

1. **Desktop**:
   - [ ] Press 'G' to open easel
   - [ ] Easel appears 3m in front of player
   - [ ] Can paint on canvas by clicking/dragging
   - [ ] All brush colors work
   - [ ] Undo button works
   - [ ] Save dialog appears
   - [ ] Press Esc to close, easel remains

2. **Mobile**:
   - [ ] Touch painting works
   - [ ] UI fits screen
   - [ ] No page scrolling during painting
   - [ ] Safe area respected
   - [ ] Buttons are touch-friendly

3. **Gameplay**:
   - [ ] Can't open easel during fishing/combat
   - [ ] Can't open easel in photobooth
   - [ ] Can't open easel during bowling
   - [ ] Works in any room
   - [ ] Multiple players can each have an easel

4. **Performance**:
   - [ ] No frame drops while painting
   - [ ] Smooth camera/controls
   - [ ] Smooth stroke rendering

## Configuration Tweaks

To customize the painting experience:

### Canvas Size
In `easelMesh.ts`, update `EASEL_CONFIG`:
```typescript
canvasWidth: 2.0,  // wider canvas
canvasHeight: 1.5, // taller canvas
```

### Brush History
In `paintCanvas.ts`:
```typescript
maxHistorySize = 100; // allow more undos
```

### Colors
In `paintingUI.ts`, modify `PAINTING_COLORS`:
```typescript
export const PAINTING_COLORS = [
  '#000000', // black
  '#ffffff', // white
  // Add or remove colors here
];
```

### Easel Placement
In `easelMesh.ts`:
```typescript
placementDistance: 2.5, // closer to player
placementHeight: 0.6,   // different height
```

## Future Enhancements

### Multiplayer Synchronization
Create `client/src/paintingNetworkSync.ts`:

```typescript
export class PaintingNetworkSync {
  private strokeBatch: Stroke[] = [];
  private lastSendTime = 0;
  private readonly BATCH_INTERVAL_MS = 50;

  addStroke(stroke: Stroke): void {
    this.strokeBatch.push(stroke);
    if (Date.now() - this.lastSendTime > this.BATCH_INTERVAL_MS) {
      this.flush();
    }
  }

  flush(): void {
    if (this.strokeBatch.length === 0) return;
    network.sendPaintingStrokes(this.strokeBatch);
    this.strokeBatch = [];
    this.lastSendTime = Date.now();
  }
}
```

Then in network message handlers, replay strokes on remote easels:

```typescript
onPaintingStrokes(easelId: string, strokes: Stroke[]): void {
  const easel = easelManager.getEasel(easelId);
  if (!easel) return;
  for (const stroke of strokes) {
    easel.paintCanvas.replayStroke(stroke);
  }
}
```

### Gallery UI
Create `client/src/paintingGallery.ts` to show thumbnails of saved paintings and allow reopening/sharing.

### First-Person View
In the painting controller, when entering painting mode:

```typescript
private transitionToFirstPerson(): void {
  const startFov = this.scene.camera.fov;
  const startPos = this.scene.camera.position.clone();
  const startQuat = this.scene.camera.quaternion.clone();
  
  // Animate camera to first-person view
  // Set up hand mesh with brush
}
```

### Sound Effects
Add when strokes complete:
```typescript
audio.play('paint-stroke', { volume: 0.3 });
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Easel not appearing | Check collision detection in `EaselManager.createEasel()` |
| Strokes not showing | Verify raycasting UV calculation in `PaintingController.raycastCanvas()` |
| Painting freezes game | Check canvas rendering performance; reduce resolution if needed |
| Mobile touches not working | Verify pointer events are captured; check safe area CSS |
| Saves not persisting | Check localStorage not disabled; look for quota errors |

## Performance Guidelines

- **Target FPS**: 60 on desktop, 30+ on mobile
- **Canvas resolution**: 1024×768 (reduce to 512×384 for performance)
- **Max strokes in history**: 50 (increase for undo depth)
- **Storage per painting**: ~100-200KB (limit to 10-20 paintings per player)
- **Distance culling**: Skip stroke sync for easels >50m away (future)

---

**Questions?** See `PAINTING_IMPLEMENTATION.md` for detailed architecture overview.
