# Handoff: latency-tolerant multiplayer movement

## Goal

Finish the current latency/jitter task without changing the A/D and W/S control feel, and preserve fishing, chat, stones, catches, and the leaderboard. The requested design is client-owned local motion, server validation/corrections, buffered remote interpolation, one frame loop, latency-aware fishing/stone behavior, and reconnect grace.

## Diagnosis already reported

- The local avatar was being nudged toward its own server snapshots in `GameScene.upsert()`. Delayed snapshots could also overwrite its facing angle, fighting the local A/D turn.
- Remote interpolation existed, but it needed adaptive delay, robust sample ordering/extrapolation, and buffer diagnostics.
- The camera follows the local rendered avatar, but its positional damping uses a fixed per-frame lerp rather than frame-rate-independent damping.
- Movement used requestAnimationFrame with a 50 ms delta clamp, but movement packets were being sent periodically without sequence IDs, change detection, or send-buffer protection.
- Key state was already cleared on blur and visibility changes; repeat events were mostly guarded.
- Map shimmer is plausibly shadow/raster aliasing or pond-edge depth interaction; shadow bias and water roughness have been adjusted, but visual confirmation is still needed.

## Work currently in the tree

### Step 0 diagnostics

- `Network` reads development-only `?lag=<ms>&jitter=<ms>&loss=<percent>` and delays outgoing/incoming WebSocket messages. Loss simulation applies to movement sends and room state snapshots so control transactions are not randomly lost.
- `?netdebug` shows RTT, jitter, snapshot rate, interpolation buffer depth/delay, correction count, simulator settings, and simulated drops.
- Server WebSocket compression is disabled, TCP no-delay is enabled, and application ping/pong plus WebSocket keepalive are present.

### Movement and reconnect refactor

- Added `shared/movement.ts` with `stepMovement`, movement bounds, speed/turn rules, and validation helpers.
- `client/src/main.ts` now has a movement sequence, change/heartbeat sender, local `stepMovement` prediction, immediate start/stop sends, and the A/D turn + W/S forward/back inputs.
- `client/src/scene.ts` has local correction blending and remote snapshot buffers/interpolation scaffolding.
- Server `move` handling accepts `{ seq, x, z, rotY, moving, t, rttMs }`, drops older sequences, validates bounds/speed/rotation against a capped elapsed interval, and sends `correction` on violations.
- Main filters the local player's entry out of normal `state` snapshots so it won't apply server snapshots as local motion.
- Remote interpolation uses the measured adaptive delay (including one-way RTT), ignores out-of-order samples, and extrapolates for at most 150 ms only while the remote player is moving. After a buffer underrun it blends back to the recovered timeline. Clock offset uses the median of five NTP-style samples; camera damping is frame-rate independent.
- Congested movement sends retain only the latest payload and retry when the socket buffer drains. The game uses a single frame loop.
- Fishing casts allow one unit of range slack; bounded RTT informs bite reaction and reel plausibility. Stone target lead uses accepted velocity and hit radius is 1.8.
- Disconnects leave a 10-second player ghost with a resume token. Resume keeps the ID and position; disconnected fishing is cleared, carried stones drop, and expired ghosts emit `player_left`.

## Verification status

The stale server input references and duplicate Network handlers have been removed. `npm.cmd run build` and `npm.cmd test` passed after the movement, interpolation, fishing, and reconnect changes. The smoke test now sends absolute movement transforms and verifies correction and player ID/position restoration on reconnect.

## Recommended next steps

1. **Baseline and movement validation — complete**
   - Removed the legacy movement input references and duplicate Network handlers.
   - Kept cast/bite/reel lifecycle, stone flight/respawn, and snapshot broadcasts in the server tick.
   - Build passes.

2. **Local ownership and validation — complete**
   - Client movement should call `stepMovement()` from the single main rAF loop and send its resulting position/rotation.
   - Server should validate sequence, bounds/water, speed (`maxSpeed * elapsed * 1.5 + slack`), and rotation; only invalid updates send `{ type: 'correction', x, z, seq }`.
   - Ensure local correction blending is driven by rAF delta and local snapshots are never passed to `scene.upsert()`.
   - Remove any leftover server-authoritative input movement and check that stone lead uses accepted velocity fields.

3. **Send cadence and interpolation — complete**
   - Movement payload: `{ seq, x, z, rotY, moving, t }`; send changed states at 15–20 Hz, immediate start/stop, plus a 1 Hz heartbeat.
   - Keep the latest movement payload only when the socket is congested; drop stale movement using `bufferedAmount` and sequence IDs.
   - Wire `Network.diagnostics().interpolationDelayMs` into `GameScene` (currently scene delay is still config/static). Use `clamp(2 * snapshotInterval + snapshotJitter, 80, 300)`.
   - Check sample pruning, bounded extrapolation (≤150 ms), and blend-back after underruns.
   - Add the NTP-style median-of-five server clock offset from ping/pong; use it for snapshot render time.
   - Keep exactly one game rAF loop; camera damping should use `1 - exp(-k * dt)`.

4. **Latency-tolerant fishing/stones — complete**
   - Add about 1 unit of slack to cast range validation based on the server's last accepted position.
   - Pass bounded RTT in `reel_start`/movement metadata; subtract RTT/2 and add ~100 ms bite grace. Reduce reel-end minimum duration by a bounded latency grace.
   - Use accepted velocity for stone target lead; widen hit radius to ~1.8; preserve deterministic start/end/time flight.

5. **Reconnect grace — complete**
   - Keep disconnected players for 10 seconds with a resume token, allow same room/name/token to reclaim the same player ID and position, and expire ghosts after the grace period.
   - Ensure a carried stone drops on disconnect and an interrupted reel cannot leave the room/player stuck.
   - Update client reconnect behavior and snapshot reconciliation without duplicating local avatars.

6. **Verify and document — automated checks complete; browser soak remains**
   - Updated `scripts/smoke-test.mjs` to send absolute movement transforms and verify correction/reconnect behavior.
   - Build and automated tests pass. Still manually test `?lag=200&jitter=80&loss=2&netdebug` with two browsers, especially A/D-only rotation, stop delivery, fishing, stones, and reconnect under jitter/loss.
   - README now documents simulator settings, interpolation, protocol updates, and reconnect grace.

## Files touched for this task

- `shared/movement.ts` (new shared movement step/validation rules)
- `shared/fishConfig.ts` (sync/movement tuning)
- `client/src/main.ts` (simulator/debug UI, local movement scaffolding, sends/corrections)
- `client/src/network.ts` (simulated delay/loss, ping diagnostics, movement sender scaffolding)
- `client/src/scene.ts` (remote buffers, local correction blending, sync diagnostics)
- `server/src/index.ts` (ping/keepalive and partial position validation; legacy tick still needs cleanup)
- `server/src/types.ts`, `server/src/rooms.ts` (movement sequence/velocity/state fields)
- `client/index.html`, `client/src/style.css` (debug overlay)
- `scripts/smoke-test.mjs`, `README.md` (verification and protocol/network docs)

## Assumptions

- Simulator `lag` is one-way baseline latency; `jitter` is uniform ± jitter per direction. The `loss` percentage drops only movement sends and room state snapshots to model stale/lost updates without randomly losing join, catch, chat, or reel transactions.
- Local movement remains responsive and non-competitive; the server's correction envelope is intentionally forgiving.
- Ngrok still uses one public Vite origin with `/ws` proxied locally; movement/reconnect work should keep this same-origin setup.
