# Mengai

A tiny real-time multiplayer fishing getaway built with Three.js, Vite, Node.js, and WebSockets. The island is assembled from low-poly primitives at runtime, so no downloaded art assets are required. Live room/player state is in memory; catch history, active backpacks, and room leaderboards are stored in a JSON file between server restarts.

## Run locally

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in two or more tabs. Choose a room from the live list (player counts refresh every five seconds), or click **Create a new room** for a fresh number. Enter your player name and join. A name can only be used once per room; room identifiers are trimmed strings (`001` and `1` are different rooms).

If a connection drops, rejoin with the same room and name within 10 seconds to reclaim the same player and position. The browser keeps the room-scoped resume token locally; an interrupted fishing action is cleared and a carried stone is dropped.

### Share on your local network

Run `npm run dev` on the host computer, then open the **Network** URL printed by Vite on each device. It will look like `http://192.168.x.x:5173`. You can also find the host's IPv4 address with `ipconfig` on Windows and visit `http://<IPv4-address>:5173` from another device on the same Wi-Fi/LAN. Allow Node.js through the host computer's firewall for private networks if prompted. The `/ws` multiplayer connection and `/api/rooms` list are proxied through port `5173`; port `3002` does not need to be exposed.

Run the WebSocket integration smoke test with `npm test`.
Run a 1,000-catch distribution and pity check with `npm run simulate:fishing`.

The Vite client runs on port `5173`; the WebSocket and room-list API run privately on port `3002`. Vite proxies same-origin `/ws` upgrades and `/api` requests to the local server, so a single public tunnel is enough.

### Share the dev app with ngrok

Start `npm run dev`, then in another terminal run:

```sh
ngrok http 5173
```

Share the generated HTTPS URL. The browser will use `wss://<that-same-host>/ws`, and Vite will forward the WebSocket upgrade to local port `3002`. The Vite config allows ngrok's `*.ngrok-free.dev` hostnames. Do not expose port `3002` separately.

For a production/reverse-proxy deployment, proxy `/ws` to the Node server with WebSocket upgrades enabled, or set `VITE_WS_URL` at build time to the public `wss://` endpoint.

## Play

- Hold **W/S** (or Up/Down) to move forward/backward relative to your character. Hold **A/D** (or Left/Right) to continuously turn; the third-person camera follows behind your facing direction.
- The island is now larger, with the playable boundary extended outward and more low-poly scenery and chickens across the expanded ground.
- A cozy campfire clearing with a stone fire ring and log benches sits on the outer island. Press **C** or choose **Cook** on a Backpack fish while near the fire; it cooks for nine seconds, then active players within eight units receive a “Yummy!” bubble. Cooking consumes the Backpack fish but keeps its catch and leaderboard record.
- Walk within four units of the pond edge and press **Space** to cast. The bait automatically targets the water and all players see the same arc and landing point.
- When the bobber bites, press **Space** within 1.5 seconds to start the gentle reel challenge. Hold Space to lift the marker and release to let it sink; keep it in the green until the meter fills. Losing the meter releases the fish without affecting pity.
- Test reel difficulty with `?reelDifficulty=0` (easiest) or `?reelDifficulty=1` (hardest). Quick reaction to the bite still improves rare-fish odds.
- Catches use five procedural low-poly species, log-normal weights, depth-based odds, a variety modifier, and bad-luck protection. Each room shows the top ten catches and each player’s personal best.
- Catch records and room leaderboards persist in `server/data/pond-data.json`. Every catch is retained in history; releasing a fish removes it from the active Backpack but not from the catch history or leaderboard. Set `GAME_DATA_FILE` to use another JSON path. Without accounts, persisted player data is keyed by room and case-insensitive player name.
- Press **Enter** anywhere in the game to open and focus the room chat; press Enter again to send. Messages also appear briefly above the sender and stay in the right-side chat log (up to 240 characters per message).
- Your room, player count, and connection status are shown at the top of the screen.
- Movement is predicted locally for immediate controls. Position snapshots are buffered and interpolated for other players, while the server validates movement and sends corrections for invalid transforms.

### Latency and jitter testing

In development, add query parameters to simulate network conditions and show diagnostics:

```text
http://localhost:5173/?lag=200&jitter=80&loss=2&netdebug
```

`lag` is the baseline one-way delay in milliseconds, `jitter` adds a uniformly random ± delay in each direction, and `loss` is a percentage applied only to movement packets and room snapshots. Join transactions, fishing, chat, and catch messages are not randomly dropped. Remote interpolation delay includes the measured one-way RTT estimate and snapshot jitter, clamped to 80–300 ms. Extrapolation stops when a player is stationary; after a buffer underrun, the remote avatar blends back to the recovered timeline. The `netdebug` overlay reports RTT, jitter, snapshot rate, interpolation buffer/delay, underruns, movement corrections, simulator settings, and simulated drops. These controls are development-only.

## Project layout

```text
client/
  index.html
  src/main.ts       UI, input, client prediction, and the single game frame loop
  src/network.ts    WebSocket client and protocol types
  src/scene.ts      Three.js island, avatars, labels, cast arcs, and interpolation
  src/campfire.ts   Campfire clearing, log benches, and flickering firelight
  src/fishModels.ts Procedural fish, catch preview, and leaderboard icons
  src/reelGame.ts   Local tension meter physics and catch progress
server/src/
  index.ts          WebSocket protocol, validation, fishing lifecycle and leaderboard
  fishing.ts        Server-only weighted catch rolls and log-normal sizes
  rooms.ts          In-memory room and player lifecycle
  inventory.ts      Replaceable inventory store interface and in-memory session adapter
  persistence.ts    JSON-backed catch history, inventories, and leaderboard hydration
  types.ts          Shared server-side state and map constants
shared/
  fishConfig.ts     Pond, fishing, odds, sync interpolation, rarity, and species tuning
  worldConfig.ts    Shared island size, movement boundary, and scenery layout
  movement.ts       Shared local movement step and server validation rules
```

## WebSocket protocol

Messages are JSON objects with a `type` field. The server is authoritative for room membership, movement validation, cast validation, fish rolls, and fishing timing. The client owns responsive local movement; the server accepts validated absolute positions and corrects violations. Remote players are rendered from timestamped snapshots using an adaptive interpolation delay.

| Direction | Type | Purpose |
| --- | --- | --- |
| Client → server | `join` | `{ room, name, resumeToken? }`; creates a room if needed and checks the 1–16 character name for uniqueness (case-insensitive), or reclaims the same player during the 10-second grace period. |
| Server → client | `joined` | `{ selfId, room, resumeToken, serverTime, players, leaderboard, personalBest, stones }`; full room snapshot after joining. |
| HTTP GET `/api/rooms` | Server → client | `{ rooms: [{ room, playerCount }] }`; public lobby list containing room numbers and active player counts only. |
| Server → peers | `player_joined` | Announces a player joining the room. |
| Client → server | `move` | `{ seq, x, z, rotY, moving, t, rttMs }` absolute transform, sequence, timestamp, movement state, and bounded RTT estimate. Updates are sent on changes at up to 20 Hz with a 1 Hz heartbeat. |
| Server → client | `correction` | `{ x, z, seq }` accepted position for an invalid or out-of-bounds transform; local correction is blended unless the error is large. |
| Server → room | `state` | `{ players, serverTime }` snapshots at 20 Hz; remote characters interpolate buffered, ordered snapshots and extrapolate for at most 150 ms. |
| Client ↔ server | `ping` / `pong` | Periodic clock/RTT sampling; the client estimates clock offset from the median of its latest five samples. |
| Client → server | `fish_cast` | `{ targetX, targetZ }`; target must be inside the water and within validated player range. |
| Server → room | `fish_cast_broadcast` | Authoritative start position, target, facing, timestamp, and flight time for deterministic cast animation. |
| Server → room | `fish_bite` | Starts a 1.5-second server-authoritative reaction window after the independent 2–6 second wait. |
| Client → server | `fish_cancel` | Cancel a cast/wait before a bite. |
| Server → room | `fish_reel` / `fish_escaped` | Starts the synchronized bobber return, optionally reporting that a bite escaped. |
| Client → server | `reel_start` | Begins the local tension game during the bite window. |
| Server → client | `reel_params` | `{ greenWidth, driftSpeed, fillRate, rarity, rarityColor }`; does not disclose fish species or weight. |
| Server → room | `reel_state` | `{ playerId, active }`; lets other clients show the fisher’s rod bend and taut line. |
| Client → server | `reel_end` | `{ success }`; the server accepts success only after a minimum plausible duration. |
| Server → client | `catch_result` | Server-rolled species, weight, rarity, personal-best and room-record flags. |
| Server → room | `leaderboard_update` | Updated top-ten catches, sorted by weight and then earlier timestamp. |
| Client → server | `campfire_cook` | `{ catchId }`; starts cooking an owned Backpack fish while near the campfire. |
| Server → room | `campfire_cooking` / `campfire_cooked` | Shares cooking progress state and notifies players within serving range when the fish is ready. |
| Server → room | `room_announcement` | Notable rarity or new room-record announcement. |
| Client → server | `chat` | `{ text }`; trimmed and limited to 240 characters. |
| Server → room | `chat` | `{ message: { playerId, name, text, at } }`; echoed to all players in that room, including the sender. |
| Server → client | `error` / `notice` | Join errors or contextual gameplay feedback. |
| Server → peers | `player_left` | `{ playerId }`; sent when a disconnected player’s 10-second resume grace expires. During grace, the player retains their ID and position. |

All room broadcasts are scoped to that room. On startup, the server loads the JSON data file and rebuilds each room’s top-ten leaderboard and personal bests from the full catch history. Released fish remain in the catch history and leaderboard, while only unreleased fish are restored to the Backpack. A room with a leaderboard is retained after its last player leaves so its board can be restored when someone rejoins.
