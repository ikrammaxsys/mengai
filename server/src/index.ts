import { createServer } from 'node:http';
import type { Socket as NetSocket } from 'node:net';
import { randomUUID } from 'node:crypto';
import { WebSocket, WebSocketServer } from 'ws';
import { BROADCAST_SCOPE, calculateReelParameters, FISH_CONFIG } from '../../shared/fishConfig.js';
import { isSafeMovementPosition, movementViolation, MOVEMENT_RULES, normalizeRotation } from '../../shared/movement.js';
import { RESUME_GRACE_MS, Rooms } from './rooms.js';
import { rollSpecies, rollWeight } from './fishing.js';
import type { CatchEntry, Player, Room } from './types.js';
import { InMemoryInventoryStore, type CatchRecord, type InventoryStore } from './inventory.js';
import { chickenNear, CHICKEN_HIT_RADIUS } from '../../shared/chickenPaths.js';
import { JsonGameDataStore, type PersistentGameDataStore } from './persistence.js';
import { WORLD_CONFIG } from '../../shared/worldConfig.js';
import { createWeatherSnapshot, isWeatherType, WEATHER_CONFIG } from '../../shared/weatherConfig.js';

const PORT = Number(process.env.PORT ?? 3002);
const server = createServer((request, response) => {
  const pathname = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`).pathname;
  if (request.method === 'GET' && pathname === '/api/rooms') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ rooms: rooms.list() }));
    return;
  }
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not found');
});
const wss = new WebSocketServer({ server, maxPayload: 16 * 1024, perMessageDeflate: false });
const rooms = new Rooms();
const inventoryStore: InventoryStore = new InMemoryInventoryStore();
const persistentData: PersistentGameDataStore = new JsonGameDataStore();
const memberships = new Map<WebSocket, { roomId: string; playerId: string }>();
const aliveSockets = new WeakSet<WebSocket>();
const isDev = process.env.NODE_ENV !== 'production' && process.env.FISH_ROLL_LOG !== '0';

function send(socket: WebSocket, message: object): void {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message));
}

function broadcast(room: Room, message: object, except?: WebSocket): void {
  const payload = JSON.stringify(message);
  for (const player of room.players.values()) {
    if (player.socket !== except && player.socket.readyState === WebSocket.OPEN) player.socket.send(payload);
  }
}

function broadcastBigCatch(room: Room, message: object): void {
  if (BROADCAST_SCOPE === 'server') {
    for (const targetRoom of rooms.all()) broadcast(targetRoom, message);
  } else broadcast(room, message);
}

function clampToMap(x: number, z: number): { x: number; z: number } {
  const distance = Math.hypot(x, z);
  const radius = FISH_CONFIG.stones.throwEdgeRadius;
  if (distance <= radius) return { x, z };
  const scale = radius / Math.max(distance, 0.001);
  return { x: x * scale, z: z * scale };
}

function clearFishing(player: Player): void {
  player.fishing = 'idle';
  player.cast = null;
  player.biteAt = null;
  player.biteDeadline = null;
  player.biteRoll = null;
  player.reelStartedAt = null;
  player.reelCandidates = null;
  player.pendingCatch = null;
}

function clearHeldFish(room: Room, player: Player): void {
  if (!player.holdingFish) return;
  player.holdingFish = null;
  broadcast(room, { type: 'player_holding', playerId: player.id, fish: null });
}

function heldFishRecord(item: CatchRecord): CatchRecord {
  return { catchId: item.catchId, species: item.species, rarity: item.rarity, weightKg: item.weightKg, caughtAt: item.caughtAt };
}

function startReel(room: Room, player: Player, now: number, escaped = false): void {
  if (!player.cast) { clearFishing(player); return; }
  player.fishing = 'reeling';
  player.reelStartedAt = now;
  player.cast = { ...player.cast, reelStartedAt: now };
  player.biteDeadline = null;
  player.biteRoll = null;
  player.reelCandidates = null;
  player.pendingCatch = null;
  broadcast(room, {
    type: 'fish_reel',
    playerId: player.id,
    startTime: now,
    duration: FISH_CONFIG.cast.reelSeconds,
    targetX: player.cast.targetX,
    targetZ: player.cast.targetZ,
    escaped,
  });
  if (escaped) broadcast(room, { type: 'fish_escaped', playerId: player.id });
}

function roomSnapshot(room: Room, player: Player) {
  return {
    type: 'joined',
    selfId: player.id,
    room: room.id,
    serverTime: Date.now(),
    players: rooms.snapshot(room),
    leaderboard: room.leaderboard,
    personalBest: room.personalBests.get(player.name.toLocaleLowerCase()) ?? null,
    stones: rooms.stoneSnapshot(room),
    campfireCooking: room.campfireCooking,
    weather: room.weather,
    resumeToken: player.resumeToken,
  };
}

function updateWeather(room: Room, now: number): void {
  while (room.players.size > 0 && now >= room.weather.endsAt) {
    const startedAt = room.weather.endsAt;
    const type = room.weather.next;
    room.weather = createWeatherSnapshot(type, startedAt);
    broadcast(room, { type: 'weather:update', weather: room.weather });
  }
}

function setDebugWeather(room: Room, type: ReturnType<typeof createWeatherSnapshot>['type']): void {
  room.weather = createWeatherSnapshot(type, Date.now());
  broadcast(room, { type: 'weather:update', weather: room.weather });
}

async function recordCatch(room: Room, player: Player, now: number): Promise<void> {
  const candidate = player.pendingCatch;
  if (!candidate) return;
  const species = FISH_CONFIG.species.find((entry) => entry.id === candidate.species)!;
  const weightKg = candidate.weightKg;
  const entry: CatchEntry = { id: randomUUID(), playerId: player.id, playerName: player.name, species: species.id, weightKg, rarity: species.rarity, timestamp: now };
  const inventoryItem: CatchRecord = { catchId: entry.id, species: entry.species, rarity: entry.rarity, weightKg: entry.weightKg, caughtAt: now };
  inventoryStore.add(player.id, inventoryItem);
  try {
    await persistentData.recordCatch(room.id, player.name, entry, inventoryItem);
  } catch (error) {
    console.error('[game-data] Failed to persist catch:', error);
  }
  const playerKey = player.name.toLocaleLowerCase();
  const previousBest = room.personalBests.get(playerKey);
  const newPersonalBest = !previousBest || weightKg > previousBest.weightKg;
  if (newPersonalBest) room.personalBests.set(playerKey, entry);
  const previousRecord = room.leaderboard[0];
  const newRoomRecord = !previousRecord || weightKg > previousRecord.weightKg;
  room.leaderboard.push(entry);
  room.leaderboard.sort((a, b) => b.weightKg - a.weightKg || a.timestamp - b.timestamp);
  room.leaderboard = room.leaderboard.slice(0, FISH_CONFIG.leaderboard.maxEntries);

  if ((FISH_CONFIG.modifiers.protectedRarities as readonly string[]).includes(species.rarity)) player.pityMisses = 0;
  else player.pityMisses += 1;
  player.lastSpecies = species.id;
  player.pendingCatch = null;
  room.fishingProfiles.set(playerKey, { pityMisses: player.pityMisses, lastSpecies: player.lastSpecies });
  const zScore = Math.log(weightKg / species.medianKg) / species.sigma;
  const heavy = zScore >= FISH_CONFIG.bigCatch.zScoreThreshold;
  const highRarity = (FISH_CONFIG.bigCatch.notableRarities as readonly string[]).includes(species.rarity);
  const notable = highRarity || heavy || newRoomRecord;
  startReel(room, player, now);
  send(player.socket, {
    type: 'catch_result', entry,
    flags: { newPersonalBest, newRoomRecord },
    personalBest: room.personalBests.get(playerKey),
  });
  send(player.socket, { type: 'inventory_add', item: inventoryItem });
  broadcast(room, { type: 'leaderboard_update', entries: room.leaderboard });
  if (species.rarity === 'epic' || species.rarity === 'legendary' || newRoomRecord) {
    const announcement = `${player.name} caught a ${weightKg.toFixed(2)} kg ${species.name}!`;
    broadcast(room, { type: 'room_announcement', message: announcement });
  }
  if (notable) {
    const catchMessage = `${player.name} caught a ${weightKg.toFixed(2)} kg ${species.name}!`;
    broadcast(room, { type: 'chat', message: { playerId: 'system', name: 'Mengai', text: catchMessage, at: now, catch: entry } });
  }
  if (notable) {
    const spectacular = (FISH_CONFIG.bigCatch.spectacularRarities as readonly string[]).includes(species.rarity) ||
      (highRarity && zScore >= FISH_CONFIG.bigCatch.spectacularZScoreThreshold);
    broadcastBigCatch(room, {
      type: 'big_catch',
      catchId: entry.id,
      playerName: player.name,
      species: species.id,
      rarity: species.rarity,
      weightKg,
      tier: spectacular ? 'spectacular' : 'notable',
      timestamp: now,
      catch: entry,
    });
  }
}

wss.on('connection', (socket) => {
  (socket as WebSocket & { _socket?: NetSocket })._socket?.setNoDelay(true);
  aliveSockets.add(socket);
  socket.on('pong', () => aliveSockets.add(socket));
  socket.on('message', async (raw) => {
    let message: Record<string, unknown>;
    try {
      message = JSON.parse(raw.toString()) as Record<string, unknown>;
    } catch {
      send(socket, { type: 'error', message: 'Invalid message.' });
      return;
    }

    if (message.type === 'ping') {
      const serverReceiveTime = Date.now();
      send(socket, { type: 'pong', id: message.id, serverReceiveTime, serverSendTime: Date.now() });
      return;
    }

    const membership = memberships.get(socket);
    if (message.type === 'join') {
      if (membership) {
        send(socket, { type: 'error', message: 'You have already joined a room.' });
        return;
      }
      const roomId = typeof message.room === 'string' ? message.room.trim() : '';
      const name = typeof message.name === 'string' ? message.name.trim() : '';
      if (!roomId) {
        send(socket, { type: 'error', message: 'Enter a room number.' });
        return;
      }
      if (name.length < 1 || name.length > 16) {
        send(socket, { type: 'error', message: 'Name must be 1–16 characters.' });
        return;
      }
      const resumeToken = typeof message.resumeToken === 'string' ? message.resumeToken : undefined;
      const result = rooms.createPlayer(roomId, name, socket, resumeToken);
      if (typeof result === 'string') {
        send(socket, { type: 'error', message: result });
        return;
      }
      const { room, player } = result;
      memberships.set(socket, { roomId, playerId: player.id });
      persistentData.hydrateRoom(room);
      inventoryStore.restore(player.id, persistentData.playerFish(roomId, player.name));
      const inventory = inventoryStore.list(player.id);
      if (player.resumeHoldingCatchId) {
        const restored = inventory.find((item) => item.catchId === player.resumeHoldingCatchId);
        player.holdingFish = restored ? heldFishRecord(restored) : null;
        player.resumeHoldingCatchId = null;
      }
      send(socket, roomSnapshot(room, player));
      send(socket, { type: 'inventory_sync', items: inventory, totalCaught: inventoryStore.totalCaught(player.id), personalBest: inventoryStore.personalBest(player.id), collection: inventoryStore.collection(player.id) });
      if (player.holdingFish) broadcast(room, { type: 'player_holding', playerId: player.id, fish: player.holdingFish }, socket);
      broadcast(room, { type: 'player_joined', player: rooms.snapshot(room).find((entry) => entry.id === player.id), serverTime: Date.now() }, socket);
      return;
    }

    if (!membership) {
      send(socket, { type: 'error', message: 'Join a room first.' });
      return;
    }
    const player = rooms.getPlayer(membership.roomId, membership.playerId);
    const room = rooms.getRoom(membership.roomId);
    if (!player || !room) return;

    if (message.type === 'weather:debug') {
      if (process.env.NODE_ENV === 'production') return;
      if (!isWeatherType(message.weatherType)) {
        send(socket, { type: 'notice', message: 'Unknown weather. Try clear, cloudy, rain, fog, or storm.' });
        return;
      }
      setDebugWeather(room, message.weatherType);
      return;
    }

    if (message.type === 'move') {
      const seq = Number(message.seq);
      if (!Number.isSafeInteger(seq) || seq <= player.lastMoveSeq) return;
      player.lastMoveSeq = seq;
      const reportedRtt = Number(message.rttMs);
      if (Number.isFinite(reportedRtt)) player.latencyRttMs = Math.max(0, Math.min(500, reportedRtt));
      if (player.fishing !== 'idle') {
        player.moving = false;
        player.velocityX = 0;
        player.velocityZ = 0;
        player.lastMoveAt = Date.now();
        return;
      }
      const x = Number(message.x), z = Number(message.z), rotY = Number(message.rotY);
      const now = Date.now();
      const elapsed = Math.min(1, Math.max(0, (now - player.lastMoveAt) / 1000));
      const previous = { x: player.x, z: player.z, rotY: player.facing };
      const next = { x, z, rotY: normalizeRotation(rotY) };
      const violation = Number.isFinite(x) && Number.isFinite(z) && Number.isFinite(rotY)
        ? movementViolation(previous, next, elapsed)
        : 'bounds';
      if (violation) {
        player.moving = false; player.velocityX = 0; player.velocityZ = 0;
        send(socket, { type: 'correction', x: player.x, z: player.z, seq });
        return;
      }
      const safeElapsed = Math.max(elapsed, 0.001);
      player.velocityX = (x - player.x) / safeElapsed;
      player.velocityZ = (z - player.z) / safeElapsed;
      player.x = x; player.z = z; player.facing = next.rotY;
      player.moving = Boolean(message.moving) && Math.hypot(player.velocityX, player.velocityZ) > 0.05;
      if (!player.moving) { player.velocityX = 0; player.velocityZ = 0; }
      player.lastMoveAt = now;
      return;
    }

    if (message.type === 'fish_cast') {
      if (player.carryingStoneId) {
        send(socket, { type: 'notice', message: 'Put the stone down first (E to throw).' });
        return;
      }
      if (player.fishing !== 'idle') return;
      const targetX = Number(message.targetX);
      const targetZ = Number(message.targetZ);
      if (!Number.isFinite(targetX) || !Number.isFinite(targetZ)) return;
      const playerRadius = Math.hypot(player.x, player.z);
      const targetRadius = Math.hypot(targetX, targetZ);
      const edgeDistance = playerRadius - FISH_CONFIG.pond.waterRadius;
      const castDistance = Math.hypot(targetX - player.x, targetZ - player.z);
      if (edgeDistance > FISH_CONFIG.pond.edgeRange + 1 || edgeDistance < 0 ||
          targetRadius < FISH_CONFIG.pond.waterRadius * FISH_CONFIG.pond.minTargetRadius ||
          targetRadius > FISH_CONFIG.pond.waterRadius * FISH_CONFIG.pond.maxTargetRadius ||
          castDistance > FISH_CONFIG.pond.maxCastDistance + 1) {
        send(socket, { type: 'notice', message: 'Move closer to the pond to fish.' });
        return;
      }
      clearHeldFish(room, player);
      const facing = Math.atan2(-player.x, -player.z);
      const startTime = Date.now();
      const flightSeconds = Math.max(FISH_CONFIG.cast.minFlightSeconds,
        Math.min(FISH_CONFIG.cast.maxFlightSeconds, FISH_CONFIG.cast.minFlightSeconds + castDistance * FISH_CONFIG.cast.distanceSeconds));
      player.facing = facing;
      player.moving = false; player.velocityX = 0; player.velocityZ = 0;
      player.cast = { targetX, targetZ, startX: player.x, startZ: player.z, facing, startTime, flightSeconds };
      player.fishing = 'casting';
      broadcast(room, { type: 'fish_cast_broadcast', playerId: player.id, ...player.cast });
      return;
    }

    if (message.type === 'fish_cancel') {
      if (player.fishing === 'casting' || player.fishing === 'waiting') startReel(room, player, Date.now());
      return;
    }

    if (message.type === 'stone_pickup') {
      if (player.fishing !== 'idle') {
        send(socket, { type: 'notice', message: 'Finish fishing before picking up a stone.' });
        return;
      }
      if (player.carryingStoneId) return;
      const stoneId = typeof message.stoneId === 'string' ? message.stoneId : '';
      const stone = room.stones.get(stoneId);
      if (!stone || stone.state !== 'ground' || Math.hypot(stone.x - player.x, stone.z - player.z) > FISH_CONFIG.stones.pickupRange) return;
      clearHeldFish(room, player);
      stone.state = 'carried';
      stone.carriedBy = player.id;
      player.carryingStoneId = stone.id;
      broadcast(room, { type: 'stone_picked', stoneId: stone.id, playerId: player.id });
      return;
    }

    if (message.type === 'inventory_release') {
      const catchId = typeof message.catchId === 'string' ? message.catchId : '';
      if (!catchId || !inventoryStore.list(player.id).some((item) => item.catchId === catchId)) return;
      try {
        if (!await persistentData.releaseFish(membership.roomId, player.name, catchId)) return;
      } catch (error) {
        console.error('[game-data] Failed to persist fish release:', error);
        send(socket, { type: 'notice', message: 'Could not save that release. Please try again.' });
        return;
      }
      if (!inventoryStore.remove(player.id, catchId)) return;
      if (player.holdingFish?.catchId === catchId) clearHeldFish(room, player);
      if (player.resumeHoldingCatchId === catchId) player.resumeHoldingCatchId = null;
      send(socket, { type: 'inventory_remove', catchId });
      return;
    }

    if (message.type === 'hold_fish') {
      const catchId = typeof message.catchId === 'string' ? message.catchId : null;
      if (catchId === null) {
        player.resumeHoldingCatchId = null;
        clearHeldFish(room, player);
        return;
      }
      if (player.carryingStoneId) {
        send(socket, { type: 'notice', message: 'Throw the stone first.' });
        return;
      }
      const item = inventoryStore.list(player.id).find((record) => record.catchId === catchId);
      if (!item) return;
      player.resumeHoldingCatchId = null;
      player.holdingFish = heldFishRecord(item);
      broadcast(room, { type: 'player_holding', playerId: player.id, fish: player.holdingFish });
      return;
    }

    if (message.type === 'campfire_cook') {
      const catchId = typeof message.catchId === 'string' ? message.catchId : '';
      if (!catchId) return;
      if (room.campfireCooking || room.campfireReserved) {
        send(socket, { type: 'notice', message: 'Someone is already cooking at the campfire.' });
        return;
      }
      const fireDistance = Math.hypot(player.x - WORLD_CONFIG.campfire.x, player.z - WORLD_CONFIG.campfire.z);
      if (fireDistance > WORLD_CONFIG.campfire.useRadius) {
        send(socket, { type: 'notice', message: 'Come closer to the campfire to cook a fish.' });
        return;
      }
      const fish = inventoryStore.list(player.id).find((item) => item.catchId === catchId);
      if (!fish) {
        send(socket, { type: 'notice', message: 'That fish is no longer in your Backpack.' });
        return;
      }
      const cooking: NonNullable<Room['campfireCooking']> = {
        cookId: randomUUID(), playerId: player.id, playerName: player.name,
        fish, startedAt: Date.now(), durationMs: WORLD_CONFIG.campfire.cookDurationMs,
      };
      room.campfireReserved = true;
      let started = false;
      let persistenceFailed = false;
      try {
        started = await persistentData.startCooking(room.id, player.name, catchId, cooking);
      } catch (error) {
        console.error('[game-data] Failed to persist campfire cooking:', error);
        persistenceFailed = true;
      }
      if (!started) {
        room.campfireReserved = false;
        send(socket, { type: 'notice', message: persistenceFailed ? 'Could not save that fish for cooking. Please try again.' : 'That fish is no longer available to cook.' });
        return;
      }
      if (!inventoryStore.remove(player.id, catchId)) {
        room.campfireReserved = false;
        return;
      }
      if (player.holdingFish?.catchId === catchId) clearHeldFish(room, player);
      if (player.resumeHoldingCatchId === catchId) player.resumeHoldingCatchId = null;
      send(socket, { type: 'inventory_remove', catchId });
      room.campfireCooking = cooking;
      room.campfireReserved = false;
      broadcast(room, { type: 'campfire_cooking', cooking });
      return;
    }

    if (message.type === 'stone_throw') {
      if (player.fishing !== 'idle') {
        send(socket, { type: 'notice', message: 'Finish fishing before throwing a stone.' });
        return;
      }
      if (!player.carryingStoneId) return;
      const now = Date.now();
      if (now - player.lastStoneThrowAt < FISH_CONFIG.stones.cooldownMs) return;
      const stone = room.stones.get(player.carryingStoneId);
      if (!stone || stone.state !== 'carried' || stone.carriedBy !== player.id) {
        player.carryingStoneId = null;
        return;
      }

      const offset = FISH_CONFIG.stones.heldOffset;
      const rawX = player.x + Math.sin(player.facing) * FISH_CONFIG.stones.lobDistance;
      const rawZ = player.z + Math.cos(player.facing) * FISH_CONFIG.stones.lobDistance;
      const { x: endX, z: endZ } = clampToMap(rawX, rawZ);
      const target = [...room.players.values()]
        .filter((candidate) => candidate.id !== player.id && candidate.disconnectedAt === null)
        .map((candidate) => ({ candidate, distance: Math.hypot(candidate.x - endX, candidate.z - endZ) }))
        .filter(({ distance }) => distance <= FISH_CONFIG.stones.hitRadius)
        .sort((a, b) => a.distance - b.distance)[0]?.candidate;
      const targetId = target?.id ?? null;
      const c = Math.cos(player.facing), s = Math.sin(player.facing);
      const start = {
        x: player.x + c * offset.x + s * offset.z,
        y: offset.y,
        z: player.z - s * offset.x + c * offset.z,
      };
      const waterLanding = !target && Math.hypot(endX, endZ) < MOVEMENT_RULES.waterRadius;
      const distance = Math.hypot(endX - start.x, endZ - start.z);
      const flightMs = Math.max(FISH_CONFIG.stones.minFlightMs,
        Math.min(FISH_CONFIG.stones.maxFlightMs, FISH_CONFIG.stones.minFlightMs + distance * FISH_CONFIG.stones.flightDistanceMs));
      stone.state = 'flying';
      stone.carriedBy = null;
      stone.flight = { start, end: { x: endX, y: 0.2, z: endZ }, startTime: now, flightMs, targetId, waterLanding };
      stone.respawnAt = null;
      player.carryingStoneId = null;
      player.lastStoneThrowAt = now;
      broadcast(room, { type: 'stone_thrown', stoneId: stone.id, fromId: player.id, targetId, start: stone.flight.start, end: stone.flight.end, startTime: now, flightMs });
      return;
    }

    if (message.type === 'reel_start') {
      if (player.fishing !== 'bite' || player.biteAt === null || player.biteDeadline === null || !player.cast) return;
      const now = Date.now();
      const reportedRtt = Number(message.rttMs);
      if (Number.isFinite(reportedRtt)) player.latencyRttMs = Math.max(0, Math.min(500, reportedRtt));
      if (now > player.biteDeadline) {
        startReel(room, player, now, true);
        return;
      }
      const effectiveReactionTime = Math.max(0, now - player.biteAt - player.latencyRttMs / 2);
      const quickReaction = effectiveReactionTime < FISH_CONFIG.bite.quickReactionMs;
      const candidate = player.reelCandidates?.[quickReaction ? 'quick' : 'normal'];
      if (!candidate) { startReel(room, player, now, true); return; }
      player.pendingCatch = candidate;
      player.fishing = 'fighting';
      player.reelStartedAt = now;
      player.biteDeadline = null;
      broadcast(room, { type: 'reel_state', playerId: player.id, active: true });
      const params = calculateReelParameters(candidate.species, candidate.weightKg, room.weather.type);
      if (isDev) {
        const table = Object.entries(candidate.probabilities).map(([id, probability]) => `${id}: ${(probability * 100).toFixed(2)}%`).join(', ');
        console.info(`[fish-roll] room=${room.id} depth=${candidate.zone} quick=${quickReaction} pity=${player.pityMisses} { ${table} } => ${candidate.species}`);
        console.info(`[reel-difficulty] room=${room.id} difficulty=${params.difficulty.toFixed(3)} greenWidth=${params.greenWidth.toFixed(1)} driftSpeed=${params.driftSpeed.toFixed(1)} fillRate=${params.fillRate.toFixed(3)}`);
      }
      send(socket, { type: 'reel_params', greenWidth: params.greenWidth, driftSpeed: params.driftSpeed, fillRate: params.fillRate, rarity: params.rarity, rarityColor: params.rarityColor });
      return;
    }

    if (message.type === 'reel_end') {
      if (player.fishing !== 'fighting' || !player.pendingCatch || player.reelStartedAt === null) return;
      const now = Date.now();
      const shortestFillMs = ((1 - FISH_CONFIG.reel.catchMeterStart) / FISH_CONFIG.reel.fillRateMax) * 1000;
      const latencyGraceMs = Math.min(150, player.latencyRttMs / 2);
      const minimumElapsedMs = Math.max(0, shortestFillMs * FISH_CONFIG.reel.minimumDurationFraction - latencyGraceMs);
      const success = message.success === true && now - player.reelStartedAt >= minimumElapsedMs;
      broadcast(room, { type: 'reel_state', playerId: player.id, active: false });
      if (!success) {
        startReel(room, player, now, true);
        return;
      }
      await recordCatch(room, player, now);
      return;
    }

    if (message.type === 'chat') {
      const text = typeof message.text === 'string' ? message.text.trim() : '';
      if (!text) return;
      if (text.length > 240) {
        send(socket, { type: 'notice', message: 'Chat messages are limited to 240 characters.' });
        return;
      }
      broadcast(room, { type: 'chat', message: { playerId: player.id, name: player.name, text, at: Date.now() } });
    }
  });

  socket.on('close', () => {
    const membership = memberships.get(socket);
    if (!membership) return;
    memberships.delete(socket);
    const departing = rooms.getPlayer(membership.roomId, membership.playerId);
    const existingRoom = rooms.getRoom(membership.roomId);
    if (departing?.fishing === 'fighting' && existingRoom) {
      broadcast(existingRoom, { type: 'reel_state', playerId: departing.id, active: false }, socket);
    }
    if (departing?.carryingStoneId && existingRoom) {
      const stone = existingRoom.stones.get(departing.carryingStoneId);
      if (stone) {
        stone.state = 'ground'; stone.x = departing.x; stone.z = departing.z; stone.carriedBy = null; stone.flight = null; stone.respawnAt = null;
        broadcast(existingRoom, { type: 'stone_landed', stoneId: stone.id, position: { x: stone.x, z: stone.z }, water: false, hitPlayerId: null }, socket);
      }
      departing.carryingStoneId = null;
    }
    if (departing) {
      if (departing.holdingFish) {
        departing.resumeHoldingCatchId = departing.holdingFish.catchId;
        departing.holdingFish = null;
        if (existingRoom) broadcast(existingRoom, { type: 'player_holding', playerId: departing.id, fish: null }, socket);
      }
      clearFishing(departing);
      departing.moving = false; departing.velocityX = 0; departing.velocityZ = 0;
      departing.disconnectedAt = Date.now();
    }
  });
});

setInterval(() => {
  for (const socket of wss.clients) {
    if (socket.readyState !== WebSocket.OPEN) continue;
    if (!aliveSockets.has(socket)) { socket.terminate(); continue; }
    aliveSockets.delete(socket);
    socket.ping();
  }
}, 15000);

setInterval(() => {
  const now = Date.now();
  for (const room of rooms.all()) {
    updateWeather(room, now);
    let changed = false;
    for (const player of room.players.values()) {
      if (player.fishing === 'casting' && player.cast && now >= player.cast.startTime + player.cast.flightSeconds * 1000) {
        player.fishing = 'waiting';
        const baseWait = FISH_CONFIG.bite.minWaitMs + Math.random() * (FISH_CONFIG.bite.maxWaitMs - FISH_CONFIG.bite.minWaitMs);
        player.biteAt = now + baseWait * WEATHER_CONFIG.states[room.weather.type].fishing.biteWaitMultiplier;
        changed = true;
      } else if (player.fishing === 'waiting' && player.biteAt !== null && player.biteAt <= now) {
        player.fishing = 'bite';
        player.biteAt = now;
        player.biteDeadline = now + FISH_CONFIG.bite.reactionWindowMs + 100 + Math.min(250, player.latencyRttMs / 2);
        const depthRadius = player.cast ? Math.hypot(player.cast.targetX, player.cast.targetZ) : FISH_CONFIG.pond.waterRadius * 0.5;
        const rollCandidate = (quick: boolean) => {
          const result = rollSpecies(depthRadius, { pityMisses: player.pityMisses, lastSpecies: player.lastSpecies }, quick, Math.random(), room.weather.type);
          return { species: result.species.id, weightKg: rollWeight(result.species), probabilities: result.probabilities, zone: result.zone };
        };
        // Both reaction-adjusted outcomes are sampled now; the server picks
        // the quick or normal candidate when reel_start arrives.
        player.reelCandidates = { normal: rollCandidate(false), quick: rollCandidate(true) };
        broadcast(room, { type: 'fish_bite', playerId: player.id, biteAt: now, deadline: player.biteDeadline });
        changed = true;
      } else if (player.fishing === 'bite' && player.biteDeadline !== null && player.biteDeadline < now) {
        startReel(room, player, now, true);
        changed = true;
      } else if (player.fishing === 'reeling' && player.reelStartedAt !== null && now >= player.reelStartedAt + FISH_CONFIG.cast.reelSeconds * 1000) {
        clearFishing(player);
        changed = true;
      }
    }
    const cooking = room.campfireCooking;
    if (cooking && now >= cooking.startedAt + cooking.durationMs) {
      const recipientIds = [...room.players.values()]
        .filter((player) => player.disconnectedAt === null &&
          Math.hypot(player.x - WORLD_CONFIG.campfire.x, player.z - WORLD_CONFIG.campfire.z) <= WORLD_CONFIG.campfire.shareRadius)
        .map((player) => player.id);
      room.campfireReserved = true;
      room.campfireCooking = null;
      void persistentData.finishCooking(room.id, cooking.cookId).then((completed) => {
        if (completed) broadcast(room, { type: 'campfire_cooked', cooking, finishedAt: now, recipientIds });
      }).catch((error: unknown) => {
        console.error('[game-data] Failed to save completed cooking:', error);
        room.campfireCooking = cooking;
      }).finally(() => { room.campfireReserved = false; });
    }
    for (const stone of room.stones.values()) {
      if (stone.state === 'flying' && stone.flight && now >= stone.flight.startTime + stone.flight.flightMs) {
        const flight = stone.flight;
        const hit = !flight.waterLanding && flight.targetId ? room.players.get(flight.targetId) : undefined;
        const hitPlayerId = hit && Math.hypot(hit.x - flight.end.x, hit.z - flight.end.z) <= FISH_CONFIG.stones.hitRadius ? hit.id : null;
        stone.x = flight.end.x; stone.z = flight.end.z; stone.flight = null;
        if (flight.waterLanding) {
          stone.state = 'respawning';
          stone.respawnAt = now + FISH_CONFIG.stones.respawnDelayMs;
        } else {
          stone.state = 'ground';
          stone.respawnAt = null;
        }
        broadcast(room, { type: 'stone_landed', stoneId: stone.id, position: { x: stone.x, z: stone.z }, water: flight.waterLanding, hitPlayerId });
        if (hitPlayerId) broadcast(room, { type: 'stone_hit', playerId: hitPlayerId, stoneId: stone.id });
        const chicken = flight.waterLanding ? null : chickenNear(stone.x, stone.z, now, CHICKEN_HIT_RADIUS);
        if (chicken) {
          const directionX = flight.end.x - flight.start.x;
          const directionZ = flight.end.z - flight.start.z;
          broadcast(room, { type: 'chicken_hit', chickenId: chicken.chickenId, startTime: now, directionX, directionZ });
        }
      } else if (stone.state === 'respawning' && stone.respawnAt !== null && now >= stone.respawnAt) {
        stone.state = 'ground'; stone.x = stone.originX; stone.z = stone.originZ; stone.respawnAt = null;
        broadcast(room, { type: 'stone_respawn', stoneId: stone.id, position: { x: stone.x, z: stone.z } });
      }
    }
    if ((changed || room.players.size) && room.players.size) broadcast(room, { type: 'state', players: rooms.snapshot(room, false), serverTime: now });
  }
}, 50);

setInterval(() => {
  const now = Date.now();
  for (const room of rooms.all()) {
    for (const player of room.players.values()) {
      if (player.disconnectedAt === null || now - player.disconnectedAt < RESUME_GRACE_MS) continue;
      const remainingRoom = rooms.removePlayer(room.id, player.id);
      inventoryStore.delete(player.id);
      if (remainingRoom) broadcast(remainingRoom, { type: 'player_left', playerId: player.id });
    }
  }
}, 1000);

await persistentData.load();
server.listen(PORT, () => console.log(`Mengai server listening on http://localhost:${PORT}`));
