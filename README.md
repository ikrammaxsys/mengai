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

The Vite client runs on port `5173`; the WebSocket, room-list API, and voice-token endpoint run privately on port `3002`. Vite proxies same-origin `/ws` upgrades and `/api` and `/voice-token` requests to the local server, so a single public tunnel is enough. LiveKit signaling/media traffic connects directly from the browser to `LIVEKIT_URL`.

### Share the dev app with ngrok

Start `npm run dev`, then in another terminal run:

```sh
ngrok http 5173
```

Share the generated HTTPS URL. The browser will use `wss://<that-same-host>/ws`, and Vite will forward the WebSocket upgrade to local port `3002`. The Vite config allows ngrok's `*.ngrok-free.dev` hostnames. Do not expose port `3002` separately.

For a production/reverse-proxy deployment, proxy `/ws` to the Node server with WebSocket upgrades enabled and forward `/voice-token` to the same Node server, or set `VITE_WS_URL` at build time to the public `wss://` endpoint.

### Proximity voice chat

Voice is optional and connects only after a player enables the microphone in the HUD. Configure LiveKit Cloud or a self-hosted LiveKit server on the game server with:

```sh
LIVEKIT_URL=wss://your-livekit-host
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret
```

Keep `LIVEKIT_API_SECRET` on the server; it is only used to mint short-lived, room-scoped participant tokens. The game validates the room-scoped resume token before issuing a voice token and uses the player ID/name as LiveKit identity/display name. Proximity audio is spatialized in the browser; voice needs HTTPS in deployed environments (localhost is allowed). The V key is push-to-talk when that option is enabled in Voice settings; otherwise V retains its view-switch shortcut.

Put these values in the repository-root `.env` file (copy `.env.example` to start); `.env` is gitignored and loaded by the game server. Environment variables set by the deployment environment take precedence.

### Shared jukebox

The room jukebox uses YouTube Data API v3 for search, then downloads audio on the game server with `yt-dlp` and `ffmpeg` (`-x --audio-format mp3`). Install both tools on the server and make them available on `PATH`, or set `YT_DLP_PATH` and `FFMPEG_PATH`. YouTube extraction uses Deno and the bundled EJS scripts, with defaults `deno:/home/ec2-user/.deno/bin/deno` and `/opt/mengai-dev/secrets/youtube-cookies.txt`; override these with `YT_DLP_JS_RUNTIME` and `YT_DLP_COOKIES_PATH` if needed. The server checks yt-dlp and ffmpeg at startup; if either is missing, jukebox tracks will fail preparation while the rest of the game remains available. Set `YOUTUBE_API_KEYS` to a comma-separated list of YouTube Data API v3 keys in the repository-root `.env`; the server tries keys in order until a request succeeds. A single `YOUTUBE_API_KEY` is still supported if the plural variable is unset. Keys are read only by the game server and are never sent to the browser. Search is cached for two minutes and limited to 20 requests per IP per minute.

Some server IPs are challenged by YouTube with “Sign in to confirm you’re not a bot.” The server passes the configured Netscape-format cookies file to yt-dlp. A cookies file grants access to the associated YouTube account: keep it private, outside version control, and refresh it if YouTube expires it.

Server console output is also appended with timestamps to `logs/server.txt` (override the path with `SERVER_LOG_FILE`). The file is created relative to the server's working directory, and the `logs/` folder is gitignored.

MP3s are cached under `cache/music/` and thumbnails under `cache/thumb/`. The server removes cache files older than 24 hours and enforces a 1 GiB default cache cap (override with `JUKEBOX_CACHE_MAX_BYTES`). The browser loads audio and thumbnails only from this server; audio is played through the Web Audio API for local proximity-volume control. Browser autoplay rules can require **Enable playback** on the jukebox.

Walk to the jukebox near the island's eastern edge and press **J**. Search results include duration metadata; tracks longer than six minutes cannot be queued. Each room allows ten upcoming tracks (duplicate songs are allowed). The server downloads each requested track before starting playback and broadcasts download/ready/playing state. Unavailable tracks are reported to the requester and skipped. The requester can skip their track, or two distinct players can vote to skip it. The server owns queue order and start times, and clients seek to the room's synchronized offset and periodically correct playback drift. The player has a local volume control and fades to silence outside the hearing radius; background music ducks while the jukebox is audible.

World/audio tuning is in `shared/worldConfig.ts` (`jukebox` position, interaction, full-volume, and hearing radii) and `client/src/jukebox.ts` (`JUKEBOX_AUDIO`: maximum local volume, smoothing time, and drift correction threshold). To test synchronization, start `npm run dev`, join the same room in two browser tabs with different names, walk to the jukebox in each, search and add a short song in one tab, then press **Enable playback** in each tab if prompted. Move away in one tab to confirm its jukebox volume fades independently.

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

### Touch and mobile

- Input is abstracted in `client/src/inputState.ts`. Keyboard/mouse and the touch controls write into the same `InputState`; movement, the arena and bowling only read from it.
- On touch devices a floating stick appears wherever the left thumb lands (10% dead zone, analog speed). Push it forward/back to move and sideways to turn. Camera drag works by dragging anywhere on the 3D canvas.
- The big right-hand button is contextual: pick up / throw stones, sit or stand, board the Ferris wheel, open the jukebox or theater, leave the arena at its exit portal, or throw a stone in the arena. In the bowling alley it is hold-to-charge (the ring shows power) and release to bowl. The smaller button casts/reels and holds the reel mini-game.
- The ☰ menu button (top-left, below the room card) opens the HUD dock on phones. **Settings** cover touch controls (Auto / Always on / Off), left-handed layout, control size and opacity, vibration, graphics quality and fullscreen.
- Hybrid devices reveal the controls after the first real touch. Portrait phones show a “rotate your phone” overlay; landscape is the recommended orientation.
- The page uses `viewport-fit=cover`, `100dvh`, safe-area padding and `touch-action: none` on the render canvas so scrolling, pinch zoom and long-press menus do not interrupt play.
- Performance: pixel ratio is capped at 2x (1.5x on coarse pointers, 1x with shadows off on Low). An auto-quality governor drops to Low when the frame rate stays under 40 FPS, and rendering pauses while the tab is hidden.
- Haptics use `navigator.vibrate` where available (Android Chrome); iPhone Safari ignores it. Fullscreen uses the Fullscreen API, or **Share → Add to Home Screen** on iPhone.

### Bowling alley

Walk to the glowing **Mengai Lanes** sign on the south-west side of the island (near `-24, -20`) and use the mode select:

- **Play Solo** starts a five-row game immediately.
- **Create / Join Party** opens a lobby. The leader invites room members, up to `BOWLING_CONFIG.maxPlayers` (default 4). Invitees accept from the invite card. The leader starts once at least two players are in the party.

Each row gives every player up to two throws with the pins reset for each player's row. A strike ends the row early and adds `scoring.strikeBonus`; a spare adds `scoring.spareBonus`. Knock down a row with the ball and the remaining pins are swept for the second throw. Scores are shown per player (throw 1, throw 2, row total, running total); the active player is highlighted. A 20-second turn timer auto-throws a weak ball if a player does not act. Players can leave at any time and are returned to their pre-entry world position. Late joins are not allowed after the game starts; leavers keep their visible score but are skipped.

Controls on desktop: **A/D** or the arrow keys aim, hold **Space** to charge, release to throw. Touch devices can drag horizontally to aim and hold/release the lane to charge and throw. **Escape** or **Leave lane** exits.

Config lives in `shared/bowlingConfig.ts` (max players, turn time, scoring bonuses, ball mass/speed, lane size, settle/timeout timings). Scoring is in `shared/bowlingScore.ts` and is covered by `scripts/test-bowling.ts`.

**Turn sync:** bowling uses the arena's server-authoritative model (Option B). The server owns the state machine (`LOBBY`/party lobby -> `ASSIGN_ORDER` -> `aiming` -> `rolling` -> `settling` -> `scoring` -> `turn_end` -> `game_over`), validates that only the active player can throw and that aim/power stay in range, runs a deterministic fixed-step ball/pin simulation, and broadcasts authoritative snapshots at 20 Hz. Clients render the streamed ball and pins and never compute or submit their own pin count, so every player sees the same result and the scoreboard only updates from the server. Best solo scores persist through the existing JSON game-data store. A server-side `awardBowlingReward` hook emits `first-strike` and `party-win` events; existing reward handling can subscribe there without adding a new reward type.

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
  public/manifest.webmanifest  PWA manifest (fullscreen landscape, Add to Home Screen)
  src/main.ts       UI, input, client prediction, and the single game frame loop
  src/inputState.ts Device-agnostic move/look/action state shared by all input sources
  src/touchControls.ts Floating stick, charge/action buttons and camera drag for touch
  src/mobileSupport.ts Touch detection, persisted settings, haptics, fullscreen and quality pacing
  src/network.ts    WebSocket client and protocol types
  src/voice.ts      Swappable LiveKit voice transport and Web Audio proximity audio
  src/scene.ts      Three.js island, avatars, labels, cast arcs, and interpolation
  src/campfire.ts   Campfire clearing, log benches, and flickering firelight
  src/fishModels.ts Procedural fish, catch preview, and leaderboard icons
  src/reelGame.ts   Local tension meter physics and catch progress
  src/bowlingNet.ts Bowling protocol facade used by the client
  src/bowlingView.ts Low-poly lane, pins, ball, bowler, cameras, and aim arrow
  src/bowlingUi.ts  Bowling HUD, scoreboard, party panel, and results
  src/bowlingMode.ts Bowling input, turn state, SFX hooks, and screen lifecycle
  src/bowlingAudio.ts Procedural roll/crash/strike/spare/gutter sounds
server/src/
  index.ts          WebSocket protocol, validation, fishing lifecycle and leaderboard
  fishing.ts        Server-only weighted catch rolls and log-normal sizes
  rooms.ts          In-memory room and player lifecycle
  inventory.ts      Replaceable inventory store interface and in-memory session adapter
  persistence.ts    JSON-backed catch history, inventories, and leaderboard hydration
  types.ts          Shared server-side state and map constants
  bowling.ts        Authoritative bowling rules, turn state machine, and events
  bowlingPhysics.ts Deterministic server-side ball and pin simulation
shared/
  fishConfig.ts     Pond, fishing, odds, sync interpolation, rarity, and species tuning
  bowlingConfig.ts  Bowling rules, lane/physics tuning, and snapshot contracts
  bowlingScore.ts   Pure scoring and ranking functions
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
| HTTP GET `/voice-token?room=<roomId>&playerId=<playerId>` | Client → server | Authenticated with `Authorization: Bearer <resumeToken>`; returns a 10-minute room-scoped LiveKit JWT and public LiveKit URL. |
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
| Client → server | `bowlingStartSolo` / `bowlingPartyCreate` / `bowlingPartyInvite` / `bowlingPartyRespond` / `bowlingPartyStart` | Bowling mode select and invite-based party lobby. The server checks alley proximity, availability, party size, and leader permission. |
| Server → client | `bowlingPartyState` / `bowlingPartyInvite` / `bowlingPartyClosed` | Bowling party membership and invitation updates. |
| Client → server | `bowlingThrow` | `{ aim, power }`; accepted only from the active player during `aiming`, with both values bounded. |
| Server → client | `bowlingEnter` / `bowlingState` | Full authoritative bowling snapshot: phase, turn order, active player, timer deadline, scorecards, ball, pins, callout, ranking, and best solo score. |
| Server → client | `bowlingExit` | `{ reason, position }`; returns the player to their saved world position. |
| Server → room | `bowlingReward` | `{ playerId, name, kind, label }` reward hook for a first strike or party win. |
| Server → peers | `player_left` | `{ playerId }`; sent when a disconnected player’s 10-second resume grace expires. During grace, the player retains their ID and position. |

All room broadcasts are scoped to that room. On startup, the server loads the JSON data file and rebuilds each room’s top-ten leaderboard and personal bests from the full catch history. Released fish remain in the catch history and leaderboard, while only unreleased fish are restored to the Backpack. A room with a leaderboard is retained after its last player leaves so its board can be restored when someone rejoins.
