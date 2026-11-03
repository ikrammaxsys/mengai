import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { WebSocket } from 'ws';

const port = 3301;
const dataFile = join(tmpdir(), `mengai-smoke-${process.pid}.json`);
function startServer() {
  return spawn(process.execPath, ['node_modules/tsx/dist/cli.mjs', 'server/src/index.ts'], {
    env: { ...process.env, NODE_ENV: 'development', PORT: String(port), GAME_DATA_FILE: dataFile },
    stdio: 'ignore',
  });
}
function stopServer(processHandle) {
  if (process.platform === 'win32') spawnSync('taskkill.exe', ['/PID', String(processHandle.pid), '/T', '/F'], { stdio: 'ignore' });
  else processHandle.kill('SIGTERM');
}
let server = startServer();
const clients = [];

async function connect() {
  let socket;
  let connected = false;
  for (let attempt = 0; attempt < 50 && !connected; attempt++) {
    socket = new WebSocket(`ws://127.0.0.1:${port}`);
    try {
      await new Promise((resolve, reject) => {
        socket.once('open', resolve);
        socket.once('error', reject);
      });
      connected = true;
    } catch {
      socket.terminate();
      await delay(100);
    }
  }
  assert.ok(connected, 'server did not start');
  socket.messages = [];
  socket.on('message', (data) => socket.messages.push(JSON.parse(String(data))));
  clients.push(socket);
  return socket;
}

async function waitFor(socket, type, predicate = () => true, timeout = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const found = socket.messages.find((message) => message.type === type && predicate(message));
    if (found) return found;
    await delay(25);
  }
  throw new Error(`Timed out waiting for ${type}`);
}

function sendMove(socket, x, z, rotY, moving = true) {
  socket.moveSeq = (socket.moveSeq ?? 0) + 1;
  socket.send(JSON.stringify({ type: 'move', seq: socket.moveSeq, x, z, rotY, moving, t: Date.now(), rttMs: 0 }));
}

async function walkTowardPond(socket, joined, targetRadius = 5.5) {
  let x = joined.players.find((player) => player.id === joined.selfId).x;
  let z = joined.players.find((player) => player.id === joined.selfId).z;
  let facing = 0;
  while (Math.hypot(x, z) > targetRadius) {
    const radius = Math.hypot(x, z);
    const step = Math.min(0.22, radius - targetRadius);
    const targetFacing = Math.atan2(-x, -z);
    const angle = Math.atan2(Math.sin(targetFacing - facing), Math.cos(targetFacing - facing));
    facing += Math.max(-0.14, Math.min(0.14, angle));
    x -= x / radius * step;
    z -= z / radius * step;
    sendMove(socket, x, z, facing);
    await delay(50);
  }
  sendMove(socket, x, z, facing, false);
}

async function walkTo(socket, player, targetX, targetZ) {
  let x = player.x, z = player.z, facing = player.facing;
  for (let stepIndex = 0; stepIndex < 500; stepIndex++) {
    const dx = targetX - x, dz = targetZ - z;
    const distance = Math.hypot(dx, dz);
    if (distance <= 0.22) break;
    const targetFacing = Math.atan2(dx, dz);
    const turn = Math.atan2(Math.sin(targetFacing - facing), Math.cos(targetFacing - facing));
    facing += Math.max(-0.12, Math.min(0.12, turn));
    const step = Math.min(0.22, distance);
    x += dx / distance * step;
    z += dz / distance * step;
    sendMove(socket, x, z, facing);
    await delay(50);
  }
  sendMove(socket, x, z, facing, false);
}

async function turnInPlace(socket, player, targetFacing) {
  let facing = player.facing;
  while (Math.abs(Math.atan2(Math.sin(targetFacing - facing), Math.cos(targetFacing - facing))) > 0.08) {
    const delta = Math.atan2(Math.sin(targetFacing - facing), Math.cos(targetFacing - facing));
    facing += Math.max(-0.1, Math.min(0.1, delta));
    sendMove(socket, player.x, player.z, facing, false);
    await delay(50);
  }
  sendMove(socket, player.x, player.z, targetFacing, false);
}

function latestPlayer(socket, playerId) {
  const snapshot = [...socket.messages].reverse().find((message) => message.type === 'state' && message.players.some((player) => player.id === playerId));
  return snapshot?.players.find((player) => player.id === playerId);
}

async function waitForPlayerAt(socket, playerId, x, z) {
  const state = await waitFor(socket, 'state', (message) => {
    const player = message.players.find((entry) => entry.id === playerId);
    return player && Math.hypot(player.x - x, player.z - z) <= 0.35;
  });
  return state.players.find((player) => player.id === playerId);
}

try {
  const river = await connect();
  river.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'River' }));
  const riverJoined = await waitFor(river, 'joined');
  assert.equal(riverJoined.weather.type, 'clear');
  assert.ok(riverJoined.weather.endsAt > riverJoined.weather.startedAt);
  const initialRiver = riverJoined.players.find((player) => player.id === riverJoined.selfId);
  river.moveSeq = 0;
  assert.ok(riverJoined.stones.some((stone) => stone.id === 'pebble-3' && stone.state === 'ground'));

  const skye = await connect();
  skye.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'Skye' }));
  const skyeJoined = await waitFor(skye, 'joined');
  assert.deepEqual(skyeJoined.weather, riverJoined.weather, 'room join snapshots should carry the same server weather');
  skye.moveSeq = 0;
  await waitFor(river, 'player_joined');
  const roomsResponse = await fetch(`http://127.0.0.1:${port}/api/rooms`);
  const roomList = await roomsResponse.json();
  assert.equal(roomList.rooms.find((room) => room.room === 'pond-test').playerCount, 2);

  const duplicate = await connect();
  duplicate.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'river' }));
  const duplicateError = await waitFor(duplicate, 'error');
  assert.match(duplicateError.message, /already taken/i);

  const separate = await connect();
  separate.send(JSON.stringify({ type: 'join', room: 'other-room', name: 'River' }));
  const separateJoined = await waitFor(separate, 'joined');
  assert.equal(separateJoined.players.length, 1);
  assert.equal(separate.messages.some((message) => message.type === 'player_joined'), false);

  river.send(JSON.stringify({ type: 'weather:debug', weatherType: 'storm' }));
  const riverStorm = await waitFor(river, 'weather:update', (message) => message.weather.type === 'storm');
  const skyeStorm = await waitFor(skye, 'weather:update', (message) => message.weather.type === 'storm');
  assert.deepEqual(riverStorm.weather, skyeStorm.weather, 'all room members should receive the same weather state');
  assert.equal(separate.messages.some((message) => message.type === 'weather:update'), false, 'weather updates must stay in their room');
  river.send(JSON.stringify({ type: 'weather:debug', weatherType: 'clear' }));
  await Promise.all([
    waitFor(river, 'weather:update', (message) => message.weather.type === 'clear' && message.weather.startedAt > riverStorm.weather.startedAt),
    waitFor(skye, 'weather:update', (message) => message.weather.type === 'clear' && message.weather.startedAt > skyeStorm.weather.startedAt),
  ]);

  river.send(JSON.stringify({ type: 'fish_cast', targetX: 0, targetZ: 1.5 }));
  assert.match((await waitFor(river, 'notice')).message, /Move closer/i);

  const chatText = 'Hello pond!';
  river.send(JSON.stringify({ type: 'chat', text: chatText }));
  const deliveredChat = await waitFor(skye, 'chat', (message) => message.message.text === chatText);
  assert.equal(deliveredChat.message.name, 'River');
  await waitFor(river, 'chat', (message) => message.message.text === chatText);
  await delay(100);
  assert.equal(separate.messages.some((message) => message.type === 'chat'), false);

  river.send(JSON.stringify({ type: 'stone_pickup', stoneId: 'pebble-3' }));
  const pickedStone = await waitFor(skye, 'stone_picked', (message) => message.stoneId === 'pebble-3');
  assert.equal(pickedStone.playerId, riverJoined.selfId);
  river.send(JSON.stringify({ type: 'fish_cast', targetX: 0, targetZ: 1.5 }));
  assert.match((await waitFor(river, 'notice', (message) => /Put the stone down first/i.test(message.message))).message, /Put the stone down first/i);
  sendMove(river, 100, 100, 0);
  const correction = await waitFor(river, 'correction', (message) => message.seq === river.moveSeq);
  assert.ok(Math.hypot(correction.x - initialRiver.x, correction.z - initialRiver.z) < 0.01, 'invalid movement should be corrected to the last accepted position');

  // Walk from spawn toward the pond using validated absolute transforms.
  await Promise.all([walkTowardPond(river, riverJoined), walkTowardPond(skye, skyeJoined)]);
  await waitFor(skye, 'state', (message) => {
    const remote = message.players.find((player) => player.id === riverJoined.selfId);
    return remote && Math.hypot(remote.x - initialRiver.x, remote.z - initialRiver.z) > 1;
  });
  const movedRiver = [...river.messages].reverse().find((message) => message.type === 'state')?.players.find((player) => player.id === riverJoined.selfId);
  assert.ok(movedRiver, 'missing authoritative movement snapshot');
  const movedSkye = [...skye.messages].reverse().find((message) => message.type === 'state')?.players.find((player) => player.id === skyeJoined.selfId);
  assert.ok(movedSkye, 'missing peer movement snapshot');
  assert.ok(Math.hypot(movedRiver.x - movedSkye.x, movedRiver.z - movedSkye.z) <= 12, 'peer should be close enough to trigger the old auto-aim behavior');
  river.send(JSON.stringify({ type: 'stone_throw' }));
  const directionalThrow = await waitFor(skye, 'stone_thrown', (message) => message.stoneId === 'pebble-3');
  assert.equal(directionalThrow.targetId, null, 'a nearby player outside the throw path must not attract the stone');
  const expectedEndX = movedRiver.x + Math.sin(movedRiver.facing) * 4.2;
  const expectedEndZ = movedRiver.z + Math.cos(movedRiver.facing) * 4.2;
  assert.ok(Math.hypot(directionalThrow.end.x - expectedEndX, directionalThrow.end.z - expectedEndZ) < 0.2,
    `stone should follow River's existing facing (River=${JSON.stringify(movedRiver)}, throw=${JSON.stringify(directionalThrow)})`);
  const afterThrowState = await waitFor(skye, 'state', (message) => message.serverTime >= directionalThrow.startTime);
  const riverAfterThrow = afterThrowState.players.find((player) => player.id === riverJoined.selfId);
  assert.ok(riverAfterThrow, 'missing thrower state after throwing');
  assert.ok(Math.abs(Math.atan2(Math.sin(riverAfterThrow.facing - movedRiver.facing), Math.cos(riverAfterThrow.facing - movedRiver.facing))) < 0.1,
    'throwing must not rotate the thrower toward another player');
  await waitFor(skye, 'stone_landed', (message) => message.stoneId === 'pebble-3', 1500);
  const targetRadius = 4.15 * 0.55;
  const targetAngle = Math.atan2(-movedRiver.z, -movedRiver.x);
  river.send(JSON.stringify({ type: 'fish_cast', targetX: Math.cos(targetAngle) * targetRadius, targetZ: Math.sin(targetAngle) * targetRadius }));
  const cast = await waitFor(skye, 'fish_cast_broadcast');
  assert.ok(Math.hypot(cast.targetX, cast.targetZ) < 4.15, 'cast target must be inside pond');
  const echoedCast = await waitFor(river, 'fish_cast_broadcast');
  assert.equal(echoedCast.targetX, cast.targetX);
  assert.equal(echoedCast.targetZ, cast.targetZ);
  const bite = await waitFor(skye, 'fish_bite', (message) => message.playerId === riverJoined.selfId, 8000);
  assert.ok(bite.deadline - bite.biteAt >= 1400 && bite.deadline - bite.biteAt <= 1600);
  river.send(JSON.stringify({ type: 'reel_start' }));
  const reelParams = await waitFor(river, 'reel_params');
  assert.ok(reelParams.greenWidth >= 18 && reelParams.greenWidth <= 38);
  assert.equal(reelParams.species, undefined, 'species must stay hidden during the reel');
  assert.equal(reelParams.weightKg, undefined, 'weight must stay hidden during the reel');
  await waitFor(skye, 'reel_state', (message) => message.playerId === riverJoined.selfId && message.active);
  await delay(2400); // Slightly above the server plausibility threshold for a successful reel.
  river.send(JSON.stringify({ type: 'reel_end', success: true }));
  const caught = await waitFor(river, 'catch_result');
  assert.ok(caught.entry.weightKg > 0);
  const addedFish = await waitFor(river, 'inventory_add', (message) => message.item.catchId === caught.entry.id);
  assert.deepEqual(addedFish.item, {
    catchId: caught.entry.id,
    species: caught.entry.species,
    rarity: caught.entry.rarity,
    weightKg: caught.entry.weightKg,
    caughtAt: caught.entry.timestamp,
  });
  const skyeInventory = await waitFor(skye, 'inventory_sync');
  assert.equal(skyeInventory.items.length, 0, 'another player must not see River’s inventory');
  skye.send(JSON.stringify({ type: 'inventory_release', catchId: caught.entry.id }));
  await delay(100);
  assert.equal(skye.messages.some((message) => message.type === 'inventory_remove' && message.catchId === caught.entry.id), false,
    'another player must not release River’s fish');
  await waitFor(skye, 'reel_state', (message) => message.playerId === riverJoined.selfId && !message.active);
  assert.ok((await waitFor(skye, 'leaderboard_update')).entries.some((entry) => entry.id === caught.entry.id));
  assert.ok((await waitFor(skye, 'room_announcement')).message.includes('River caught'));
  const bannerCatch = await waitFor(skye, 'big_catch');
  assert.equal(bannerCatch.catchId, caught.entry.id);
  await waitFor(skye, 'chat', (message) => message.message.catch?.id === caught.entry.id);
  assert.equal(separate.messages.some((message) => message.type === 'big_catch'), false);

  river.send(JSON.stringify({ type: 'hold_fish', catchId: caught.entry.id }));
  const heldFish = await waitFor(skye, 'player_holding', (message) => message.playerId === riverJoined.selfId && message.fish?.catchId === caught.entry.id);
  assert.equal(heldFish.fish.species, caught.entry.species);
  const holdingSnapshot = [...river.messages].reverse().find((message) => message.type === 'state');
  assert.ok(holdingSnapshot && !Object.hasOwn(holdingSnapshot.players.find((player) => player.id === riverJoined.selfId), 'holdingFish'),
    'held-fish state must not be added to high-frequency snapshots');

  await delay(600); // Let the synchronized reel animation finish before another cast.
  const secondCastTarget = { x: Math.cos(targetAngle) * targetRadius, z: Math.sin(targetAngle) * targetRadius };
  river.send(JSON.stringify({ type: 'fish_cast', targetX: secondCastTarget.x, targetZ: secondCastTarget.z }));
  await waitFor(skye, 'fish_cast_broadcast', (message) => message.playerId === riverJoined.selfId && message.startTime > cast.startTime);
  await waitFor(skye, 'player_holding', (message) => message.playerId === riverJoined.selfId && message.fish === null);
  const secondBite = await waitFor(skye, 'fish_bite', (message) => message.playerId === riverJoined.selfId && message.biteAt > bite.biteAt, 8000);
  river.send(JSON.stringify({ type: 'reel_start' }));
  await waitFor(river, 'reel_params', () => river.messages.filter((message) => message.type === 'reel_params').length >= 2);
  river.send(JSON.stringify({ type: 'reel_end', success: true }));
  await waitFor(skye, 'fish_escaped', (message) => message.playerId === riverJoined.selfId, 2500);
  assert.equal(river.messages.filter((message) => message.type === 'catch_result').length, 1, 'missed bite must not create a catch');

  await waitFor(skye, 'stone_respawn', (message) => message.stoneId === 'pebble-3', 7000);
  const riverAtPond = latestPlayer(river, riverJoined.selfId);
  const skyeAtPond = latestPlayer(skye, skyeJoined.selfId);
  assert.ok(riverAtPond && skyeAtPond, 'missing player state before the interruption test');
  await walkTo(river, riverAtPond, 6.2, 9.2);
  river.send(JSON.stringify({ type: 'stone_pickup', stoneId: 'pebble-3' }));
  await waitFor(skye, 'stone_picked', (message) => message.stoneId === 'pebble-3');
  const riverAtStone = await waitForPlayerAt(river, riverJoined.selfId, 6.2, 9.2);
  await walkTo(river, riverAtStone, 5.5, 0.4);
  const riverAtThrow = await waitForPlayerAt(river, riverJoined.selfId, 5.5, 0.4);

  await walkTo(skye, skyeAtPond, -4, 5.5);
  let skyeFishingPosition = await waitForPlayerAt(skye, skyeJoined.selfId, -4, 5.5);
  await walkTo(skye, skyeFishingPosition, 0, 5.5);
  skyeFishingPosition = await waitForPlayerAt(skye, skyeJoined.selfId, 0, 5.5);
  await walkTo(skye, skyeFishingPosition, 5.5, 4.5);
  await waitForPlayerAt(skye, skyeJoined.selfId, 5.5, 4.5);
  await turnInPlace(river, riverAtThrow, 0);
  skye.send(JSON.stringify({ type: 'fish_cast', targetX: 0, targetZ: 1.5 }));
  await waitFor(skye, 'fish_cast_broadcast', (message) => message.playerId === skyeJoined.selfId);
  const interruptingThrowTime = Date.now();
  river.send(JSON.stringify({ type: 'stone_throw' }));
  const interruptingThrow = await waitFor(skye, 'stone_thrown', (message) => message.stoneId === 'pebble-3' && message.startTime >= interruptingThrowTime);
  assert.equal(interruptingThrow.targetId, skyeJoined.selfId,
    `stone throw should target the fishing player (${JSON.stringify({ throw: interruptingThrow, river: latestPlayer(river, riverJoined.selfId), skye: latestPlayer(skye, skyeJoined.selfId) })})`);
  const interruption = await waitFor(river, 'stone_hit', (message) => message.playerId === skyeJoined.selfId && message.fishingCancelled === true);
  assert.equal(interruption.fishingCancelled, true, 'stone hit should interrupt fishing');
  const interruptedState = await waitFor(river, 'state', (message) => {
    const target = message.players.find((player) => player.id === skyeJoined.selfId);
    return target?.fishing === 'idle' && target.cast === null;
  });
  assert.equal(interruptedState.players.find((player) => player.id === skyeJoined.selfId).fishing, 'idle');

  river.send(JSON.stringify({ type: 'hold_fish', catchId: caught.entry.id }));
  await waitFor(skye, 'player_holding', (message) => message.playerId === riverJoined.selfId && message.fish?.catchId === caught.entry.id);

  const finalRiverPosition = latestPlayer(river, riverJoined.selfId);
  assert.ok(finalRiverPosition, 'missing final River position');
  skye.close();
  river.close();
  await delay(150);
  const returning = await connect();
  returning.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'River', resumeToken: riverJoined.resumeToken }));
  const returned = await waitFor(returning, 'joined');
  assert.equal(returned.selfId, riverJoined.selfId, 'reconnect should reclaim the same player ID');
  const returnedPlayer = returned.players.find((player) => player.id === returned.selfId);
  assert.ok(returnedPlayer && Math.hypot(returnedPlayer.x - finalRiverPosition.x, returnedPlayer.z - finalRiverPosition.z) < 0.01, 'reconnect should preserve the player position');
  assert.ok(returned.leaderboard.some((entry) => entry.id === caught.entry.id), 'leaderboard should remain in memory after room empties');
  assert.equal(returned.personalBest.id, caught.entry.id);
  const restoredPlayer = returned.players.find((player) => player.id === returned.selfId);
  assert.equal(restoredPlayer.holdingFish.catchId, caught.entry.id, 'reconnect should restore held fish in the room snapshot');
  const returnedInventory = await waitFor(returning, 'inventory_sync');
  assert.ok(returnedInventory.items.some((item) => item.catchId === caught.entry.id), 'reconnect should restore the backpack');
  for (const socket of clients) socket.close();
  await delay(100);
  stopServer(server);
  await delay(150);

  server = startServer();
  const afterRestart = await connect();
  afterRestart.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'River' }));
  const restartedJoin = await waitFor(afterRestart, 'joined');
  assert.ok(restartedJoin.leaderboard.some((entry) => entry.id === caught.entry.id), 'server restart should reload room leaderboard history');
  assert.equal(restartedJoin.personalBest.id, caught.entry.id, 'server restart should reload personal best');
  const restartedInventory = await waitFor(afterRestart, 'inventory_sync');
  assert.ok(restartedInventory.items.some((item) => item.catchId === caught.entry.id), 'server restart should reload unreleased backpack fish');

  const nearbyFriend = await connect();
  nearbyFriend.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'CampfireFriend' }));
  const friendJoined = await waitFor(nearbyFriend, 'joined');
  const distantFriend = await connect();
  distantFriend.send(JSON.stringify({ type: 'join', room: 'pond-test', name: 'FarAway' }));
  const distantJoined = await waitFor(distantFriend, 'joined');
  const riverPosition = restartedJoin.players.find((player) => player.id === restartedJoin.selfId);
  const friendPosition = friendJoined.players.find((player) => player.id === friendJoined.selfId);
  const farPosition = distantJoined.players.find((player) => player.id === distantJoined.selfId);
  await Promise.all([
    walkTo(afterRestart, riverPosition, 0, 20),
    walkTo(nearbyFriend, friendPosition, 0, 25),
  ]);
  await walkTo(distantFriend, farPosition, -15, -5);
  afterRestart.send(JSON.stringify({ type: 'campfire_cook', catchId: caught.entry.id }));
  const cookingStarted = await waitFor(afterRestart, 'campfire_cooking');
  assert.equal(cookingStarted.cooking.fish.catchId, caught.entry.id);
  await waitFor(afterRestart, 'inventory_remove', (message) => message.catchId === caught.entry.id);
  const cookingFinished = await waitFor(afterRestart, 'campfire_cooked', (message) => message.cooking.cookId === cookingStarted.cooking.cookId, 15000);
  assert.ok(cookingFinished.recipientIds.includes(restartedJoin.selfId), 'cooker in range receives the shared-fish popup');
  assert.ok(cookingFinished.recipientIds.includes(friendJoined.selfId), 'nearby player receives the shared-fish popup');
  assert.equal(cookingFinished.recipientIds.includes(distantJoined.selfId), false, 'players outside the serving radius do not receive it');
  assert.ok(restartedJoin.leaderboard.some((entry) => entry.id === caught.entry.id), 'releasing after restart must leave the leaderboard record intact');
  console.log('Smoke test passed: multiplayer gameplay, stone-hit fishing interruption, inventory privacy/release, held-fish sync, reconnect and JSON restart restoration, campfire cooking, and range-limited sharing.');
} finally {
  for (const socket of clients) socket.close();
  stopServer(server);
  await rm(dataFile, { force: true });
  await rm(`${dataFile}.${server.pid}.tmp`, { force: true });
}
