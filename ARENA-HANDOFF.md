# Crocodile Arena — handoff

## User request

Add a glowing main-map portal where a player can wait, invite members of their room, and start a shared Crocodile arena only after invitees accept. Use server-owned player/monster HP, stone pickups and throws, telegraphed Crocodile attacks, a victory/defeat flow, and a Crocodile Slain leaderboard score. Keep all arena UI colors flat, including health bars.

## Current status

Party waiting, room-member invitations, acceptance, leader-only start, and arena-specific tests are implemented. Direct portal entry is rejected. `npm run build` and `npm test` pass, including a WebSocket smoke test covering invite-based entry into one shared instance. Manual browser gameplay has not been run.

### Implemented so far

- Added `shared/arenaConfig.ts` with the arena layout, HP, stone limits/refill, movement, attack damage/ranges/cooldowns, and timing values.
- Added `server/src/arenas.ts` with shared party arena instances, distinct party spawns, player movement validation, shared stone pile/pickup/throw state, projectile hit checks, Crocodile chase/attack/cooldown AI, bite/tail/lunge telegraphs and damage, party defeat/victory states, and party-wide restart.
- Added `WORLD_CONFIG.crocodilePortal` and a glowing low-poly portal model in `client/src/scene.ts`.
- Added the portal prompt, party health HUD and avatars, solid-color health bars, Crocodile Slain section in the leaderboard, and a separate low-poly arena renderer in `client/src/arenaView.ts`.
- Wired party creation, invitations/acceptance, party cancellation/leave/promotion, leader-only start, portal entry/exit, arena movement/actions/state/events, player hiding from main-room snapshots while instanced, disconnect cleanup, three-second defeat return, fight-again, and room Crocodile Slain scores through `server/src/index.ts`, `server/src/rooms.ts`, `server/src/types.ts`, `client/src/network.ts`, and `client/src/main.ts`.

## Continue with

1. Extend arena checks for shared combat, simultaneous party damage, and party defeat timing.
2. Extend the WebSocket smoke test for leader disconnect promotion, party cancellation, and cleanup when one party member leaves or disconnects.
3. Manually test in the browser: create a party, wait for and invite players, accept/decline invitations, start together, collect/throw stones, evade attacks, win, restart, and allow party defeat to respawn.
4. Check low-resolution/mobile party-panel layout and tune values in `shared/arenaConfig.ts` if needed.

## Key files

- Config: `shared/arenaConfig.ts`, `shared/worldConfig.ts`
- Server: `server/src/arenas.ts`, `server/src/index.ts`, `server/src/rooms.ts`, `server/src/types.ts`
- Client: `client/index.html`, `client/src/arenaView.ts`, `client/src/main.ts`, `client/src/network.ts`, `client/src/scene.ts`, `client/src/style.css`

The last successful build reports the repository’s existing Vite advisory that the main JavaScript chunk exceeds 500 kB; it is a warning, not a build failure.
