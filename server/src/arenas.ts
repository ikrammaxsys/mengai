import { randomUUID } from 'node:crypto';
import { ARENA_CONFIG, type ArenaAttackSnapshot, type ArenaParticipantSnapshot, type ArenaProjectileSnapshot, type ArenaSnapshot, type MonsterSkill } from '../../shared/arenaConfig.js';
import type { Player } from './types.js';

interface ArenaParticipant extends ArenaParticipantSnapshot {
  lastMoveAt: number;
}

interface Crocodile {
  id: string;
  kind: 'crocodile';
  name: 'Crocodile';
  x: number;
  z: number;
  facing: number;
  hp: number;
  maxHp: number;
  state: ArenaSnapshot['monster']['state'];
  attack: ArenaAttackSnapshot | null;
  cooldownUntil: number;
  skillReadyAt: Record<MonsterSkill, number>;
  chargeHitIds: Set<string>;
}

interface ArenaProjectile extends ArenaProjectileSnapshot {
  throwerId: string;
}

export interface ArenaInstance {
  id: string;
  players: ArenaParticipant[];
  monster: Crocodile;
  state: ArenaSnapshot['state'];
  stonePileCount: number;
  nextStoneRefillAt: number;
  projectiles: ArenaProjectile[];
  respawnAt: number | null;
  lastUpdatedAt: number;
  nextStateAt: number;
}

export type ArenaEvent =
  | { type: 'monsterHit'; damage: number; hp: number; maxHp: number }
  | { type: 'playerDamaged'; playerId: string; damage: number; hp: number; maxHp: number; skill: MonsterSkill }
  | { type: 'monsterDied'; hp: 0 }
  | { type: 'playerDied'; hp: 0; respawnAt: number };

const SKILLS: MonsterSkill[] = ['bite', 'tailSweep', 'lunge'];

export function createCrocodileArena(player: Player, now: number): ArenaInstance {
  return {
    id: randomUUID(),
    players: [createParticipant(player, 0, now)],
    monster: {
      id: 'crocodile', kind: 'crocodile', name: 'Crocodile',
      x: 7, z: 0, facing: -Math.PI / 2,
      hp: ARENA_CONFIG.monsterMaxHp, maxHp: ARENA_CONFIG.monsterMaxHp,
      state: 'chase', attack: null, cooldownUntil: 0,
      skillReadyAt: { bite: now, tailSweep: now, lunge: now }, chargeHitIds: new Set(),
    },
    state: 'active',
    stonePileCount: ARENA_CONFIG.stonePile.maxCount,
    nextStoneRefillAt: now + ARENA_CONFIG.stonePile.refillEveryMs,
    projectiles: [],
    respawnAt: null,
    lastUpdatedAt: now,
    nextStateAt: now,
  };
}

function createParticipant(player: Player, index: number, now: number): ArenaParticipant {
  const angle = index * 2.399;
  const radius = index === 0 ? 0 : Math.min(3.5, 1.5 + Math.sqrt(index) * 0.7);
  return {
    playerId: player.id,
    name: player.name,
    color: player.color,
    x: ARENA_CONFIG.playerSpawn.x + Math.cos(angle) * radius,
    z: ARENA_CONFIG.playerSpawn.z + Math.sin(angle) * radius,
    facing: ARENA_CONFIG.playerSpawn.facing,
    hp: ARENA_CONFIG.playerMaxHp,
    maxHp: ARENA_CONFIG.playerMaxHp,
    stones: 0,
    lastMoveAt: now,
  };
}

export function addArenaPlayer(arena: ArenaInstance, player: Player, now: number): void {
  if (arena.players.some((entry) => entry.playerId === player.id)) return;
  arena.players.push(createParticipant(player, arena.players.length, now));
}

export function removeArenaPlayer(arena: ArenaInstance, playerId: string): void {
  arena.players = arena.players.filter((entry) => entry.playerId !== playerId);
  arena.monster.chargeHitIds.delete(playerId);
}

export function restartCrocodileArena(arena: ArenaInstance, now: number): void {
  arena.monster.x = 7;
  arena.monster.z = 0;
  arena.monster.facing = -Math.PI / 2;
  arena.monster.hp = arena.monster.maxHp;
  arena.monster.state = 'chase';
  arena.monster.attack = null;
  arena.monster.cooldownUntil = 0;
  arena.monster.skillReadyAt = { bite: now, tailSweep: now, lunge: now };
  arena.monster.chargeHitIds.clear();
  arena.state = 'active';
  arena.stonePileCount = ARENA_CONFIG.stonePile.maxCount;
  arena.nextStoneRefillAt = now + ARENA_CONFIG.stonePile.refillEveryMs;
  arena.projectiles = [];
  arena.respawnAt = null;
  arena.lastUpdatedAt = now;
  arena.nextStateAt = now;
  arena.players.forEach((player, index) => {
    const angle = index * 2.399;
    const radius = index === 0 ? 0 : Math.min(3.5, 1.5 + Math.sqrt(index) * 0.7);
    player.x = ARENA_CONFIG.playerSpawn.x + Math.cos(angle) * radius;
    player.z = ARENA_CONFIG.playerSpawn.z + Math.sin(angle) * radius;
    player.facing = ARENA_CONFIG.playerSpawn.facing;
    player.hp = player.maxHp;
    player.stones = 0;
    player.lastMoveAt = now;
  });
}

export function arenaSnapshot(arena: ArenaInstance, serverTime: number): ArenaSnapshot {
  const { id, kind, name, x, z, facing, hp, maxHp, state, attack } = arena.monster;
  return {
    instanceId: arena.id,
    state: arena.state,
    serverTime,
    players: arena.players.map(({ playerId, name, color, x, z, facing, hp, maxHp, stones }) => ({ playerId, name, color, x, z, facing, hp, maxHp, stones })),
    monster: { id, kind, name, x, z, facing, hp, maxHp, state, attack: attack ? { ...attack } : null },
    stonePile: { x: ARENA_CONFIG.stonePile.x, z: ARENA_CONFIG.stonePile.z, count: arena.stonePileCount, maxCount: ARENA_CONFIG.stonePile.maxCount, nextRefillAt: arena.nextStoneRefillAt },
    projectiles: arena.projectiles.map(({ id, startX, startZ, endX, endZ, startedAt, durationMs }) => ({ id, startX, startZ, endX, endZ, startedAt, durationMs })),
    exitPortal: ARENA_CONFIG.exitPortal,
    respawnAt: arena.respawnAt,
  };
}

export function moveArenaPlayer(arena: ArenaInstance, playerId: string, x: number, z: number, facing: number, now: number): boolean {
  if (arena.state !== 'active') return false;
  const player = arena.players.find((entry) => entry.playerId === playerId);
  if (!player || player.hp <= 0 || ![x, z, facing].every(Number.isFinite)) return false;
  const elapsed = Math.max(0.02, Math.min(0.5, (now - player.lastMoveAt) / 1000));
  const distance = Math.hypot(x - player.x, z - player.z);
  const angle = Math.atan2(Math.sin(facing - player.facing), Math.cos(facing - player.facing));
  if (distance > ARENA_CONFIG.playerMoveSpeed * elapsed * 1.6 + ARENA_CONFIG.playerMoveSlack ||
      Math.abs(angle) > ARENA_CONFIG.playerTurnRate * elapsed * 1.8 + 0.24 ||
      Math.hypot(x, z) > ARENA_CONFIG.platformRadius - 1) return false;
  player.x = x;
  player.z = z;
  player.facing = Math.atan2(Math.sin(facing), Math.cos(facing));
  player.lastMoveAt = now;
  return true;
}

export function arenaStoneAction(arena: ArenaInstance, playerId: string, now: number): 'picked' | 'thrown' | 'full' | 'empty' | 'inactive' {
  if (arena.state !== 'active') return 'inactive';
  const player = arena.players.find((entry) => entry.playerId === playerId);
  if (!player) return 'inactive';
  const pileDistance = Math.hypot(player.x - ARENA_CONFIG.stonePile.x, player.z - ARENA_CONFIG.stonePile.z);
  if (pileDistance <= ARENA_CONFIG.stonePile.useRadius) {
    if (player.stones >= ARENA_CONFIG.maxCarriedStones) return 'full';
    if (arena.stonePileCount <= 0) return 'empty';
    player.stones += 1;
    arena.stonePileCount -= 1;
    return 'picked';
  }
  if (player.stones <= 0) return 'empty';
  player.stones -= 1;
  const directionX = Math.sin(player.facing), directionZ = Math.cos(player.facing);
  const startX = player.x + directionX * 0.9;
  const startZ = player.z + directionZ * 0.9;
  const rawEndX = startX + directionX * ARENA_CONFIG.stoneThrowDistance;
  const rawEndZ = startZ + directionZ * ARENA_CONFIG.stoneThrowDistance;
  const distance = Math.hypot(rawEndX, rawEndZ);
  const maxDistance = ARENA_CONFIG.platformRadius - 1;
  const scale = distance > maxDistance ? maxDistance / distance : 1;
  arena.projectiles.push({
    id: randomUUID(), throwerId: playerId,
    startX, startZ, endX: rawEndX * scale, endZ: rawEndZ * scale,
    startedAt: now, durationMs: ARENA_CONFIG.stoneFlightMs,
  });
  return 'thrown';
}

function damagePlayer(arena: ArenaInstance, player: ArenaParticipant, damage: number, skill: MonsterSkill, now: number, events: ArenaEvent[]): void {
  if (arena.state !== 'active' || player.hp <= 0) return;
  player.hp = Math.max(0, player.hp - damage);
  events.push({ type: 'playerDamaged', playerId: player.playerId, damage, hp: player.hp, maxHp: player.maxHp, skill });
  if (player.hp === 0 && arena.players.every((participant) => participant.hp <= 0)) {
    arena.state = 'defeat';
    arena.respawnAt = now + ARENA_CONFIG.playerRespawnDelayMs;
    events.push({ type: 'playerDied', hp: 0, respawnAt: arena.respawnAt });
  }
}

function nearestLivingPlayer(arena: ArenaInstance): ArenaParticipant | undefined {
  return arena.players.filter((player) => player.hp > 0).sort((a, b) =>
    Math.hypot(a.x - arena.monster.x, a.z - arena.monster.z) - Math.hypot(b.x - arena.monster.x, b.z - arena.monster.z),
  )[0];
}

function finishMonsterAttack(monster: Crocodile, now: number): void {
  monster.attack = null;
  monster.chargeHitIds.clear();
  monster.state = 'cooldown';
  monster.cooldownUntil = now + ARENA_CONFIG.monsterAttackCooldownMs;
}

function beginMonsterAttack(monster: Crocodile, player: ArenaParticipant, skill: MonsterSkill, now: number): void {
  const dx = player.x - monster.x, dz = player.z - monster.z;
  const length = Math.hypot(dx, dz) || 1;
  const directionX = dx / length, directionZ = dz / length;
  monster.facing = Math.atan2(directionX, directionZ);
  const windupMs = skill === 'bite' ? ARENA_CONFIG.attacks.bite.windupMs
    : skill === 'tailSweep' ? ARENA_CONFIG.attacks.tailSweep.warningMs
      : ARENA_CONFIG.attacks.lunge.windupMs;
  const cooldownMs = ARENA_CONFIG.attacks[skill].cooldownMs;
  monster.attack = {
    skill, phase: 'windup', startedAt: now, resolveAt: now + windupMs,
    endsAt: now + windupMs + (skill === 'lunge' ? ARENA_CONFIG.attacks.lunge.chargeMs : 0),
    originX: monster.x, originZ: monster.z, directionX, directionZ,
    radius: skill === 'bite' ? ARENA_CONFIG.attacks.bite.range : skill === 'tailSweep' ? ARENA_CONFIG.attacks.tailSweep.range : ARENA_CONFIG.attacks.lunge.hitRadius,
  };
  monster.skillReadyAt[skill] = now + cooldownMs;
  monster.chargeHitIds.clear();
  monster.state = 'attack';
}

export function updateArena(arena: ArenaInstance, now: number): ArenaEvent[] {
  const events: ArenaEvent[] = [];
  const deltaSeconds = Math.max(0, Math.min(0.1, (now - arena.lastUpdatedAt) / 1000));
  arena.lastUpdatedAt = now;
  if (arena.state !== 'active') return events;
  const player = nearestLivingPlayer(arena);
  const monster = arena.monster;
  if (!player) {
    if (arena.players.length > 0 && arena.state === 'active') {
      arena.state = 'defeat';
      arena.respawnAt = now + ARENA_CONFIG.playerRespawnDelayMs;
      events.push({ type: 'playerDied', hp: 0, respawnAt: arena.respawnAt });
    }
    return events;
  }

  while (now >= arena.nextStoneRefillAt) {
    arena.stonePileCount = Math.min(ARENA_CONFIG.stonePile.maxCount, arena.stonePileCount + ARENA_CONFIG.stonePile.refillAmount);
    arena.nextStoneRefillAt += ARENA_CONFIG.stonePile.refillEveryMs;
  }

  for (let index = arena.projectiles.length - 1; index >= 0; index--) {
    const projectile = arena.projectiles[index];
    const progress = Math.max(0, Math.min(1, (now - projectile.startedAt) / projectile.durationMs));
    const eased = 1 - (1 - progress) * (1 - progress);
    const x = projectile.startX + (projectile.endX - projectile.startX) * eased;
    const z = projectile.startZ + (projectile.endZ - projectile.startZ) * eased;
    if (monster.state !== 'dead' && Math.hypot(x - monster.x, z - monster.z) <= ARENA_CONFIG.stoneHitRadius) {
      monster.hp = Math.max(0, monster.hp - ARENA_CONFIG.stoneDamage);
      events.push({ type: 'monsterHit', damage: ARENA_CONFIG.stoneDamage, hp: monster.hp, maxHp: monster.maxHp });
      arena.projectiles.splice(index, 1);
      if (monster.hp === 0) {
        monster.state = 'dead';
        monster.attack = null;
        arena.state = 'victory';
        events.push({ type: 'monsterDied', hp: 0 });
      }
    } else if (now >= projectile.startedAt + projectile.durationMs) arena.projectiles.splice(index, 1);
  }
  if (arena.state !== 'active') return events;

  if (monster.state === 'attack' && monster.attack) {
    const attack = monster.attack;
    if (attack.skill === 'lunge' && attack.phase === 'windup' && now >= attack.resolveAt) {
      attack.phase = 'charge';
      attack.resolveAt = now;
      attack.endsAt = now + ARENA_CONFIG.attacks.lunge.chargeMs;
    }
    if (attack.skill === 'lunge' && attack.phase === 'charge') {
      const remaining = Math.max(0, attack.endsAt - now);
      const movement = Math.min(ARENA_CONFIG.attacks.lunge.speed * deltaSeconds, Math.hypot(
        monster.x + attack.directionX - player.x,
        monster.z + attack.directionZ - player.z,
      ));
      monster.x += attack.directionX * movement;
      monster.z += attack.directionZ * movement;
      monster.facing = Math.atan2(attack.directionX, attack.directionZ);
      for (const target of arena.players) {
        if (target.hp > 0 && !monster.chargeHitIds.has(target.playerId) && Math.hypot(monster.x - target.x, monster.z - target.z) <= ARENA_CONFIG.attacks.lunge.hitRadius + ARENA_CONFIG.playerCollisionRadius) {
          monster.chargeHitIds.add(target.playerId);
          damagePlayer(arena, target, ARENA_CONFIG.attacks.lunge.damage, 'lunge', now, events);
        }
      }
      if (arena.state !== 'active') return events;
      if (remaining <= 0) finishMonsterAttack(monster, now);
      return events;
    }
    if (attack.skill !== 'lunge' && attack.phase === 'windup' && now >= attack.resolveAt) {
      for (const target of arena.players) {
        const distance = Math.hypot(target.x - attack.originX, target.z - attack.originZ);
        if (target.hp > 0 && distance <= attack.radius + ARENA_CONFIG.playerCollisionRadius) {
          damagePlayer(arena, target, ARENA_CONFIG.attacks[attack.skill].damage, attack.skill, now, events);
        }
      }
      if (arena.state !== 'active') return events;
      finishMonsterAttack(monster, now);
      return events;
    }
    return events;
  }

  if (monster.state === 'dead') return events;
  if (monster.state === 'cooldown') {
    if (now < monster.cooldownUntil) return events;
    monster.state = 'chase';
  }

  const dx = player.x - monster.x, dz = player.z - monster.z;
  const distance = Math.hypot(dx, dz);
  monster.state = 'chase';
  monster.facing = Math.atan2(dx, dz);
  const moveStep = Math.min(ARENA_CONFIG.monsterMoveSpeed * deltaSeconds, Math.max(0, distance - 1.65));
  if (distance > 1.65 && moveStep > 0) {
    monster.x += dx / (distance || 1) * moveStep;
    monster.z += dz / (distance || 1) * moveStep;
  }
  if (distance <= ARENA_CONFIG.attacks.bite.range && now >= monster.skillReadyAt.bite) beginMonsterAttack(monster, player, 'bite', now);
  else if (distance <= ARENA_CONFIG.attacks.tailSweep.range && now >= monster.skillReadyAt.tailSweep) beginMonsterAttack(monster, player, 'tailSweep', now);
  else if (distance <= ARENA_CONFIG.attacks.lunge.range && distance > ARENA_CONFIG.attacks.bite.range && now >= monster.skillReadyAt.lunge) beginMonsterAttack(monster, player, 'lunge', now);
  else if (distance <= ARENA_CONFIG.attacks.bite.range && now < monster.skillReadyAt.bite) monster.state = 'cooldown';
  return events;
}
