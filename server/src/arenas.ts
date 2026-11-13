import { randomUUID } from 'node:crypto';
import { ARENA_CONFIG, type ArenaAttackSnapshot, type ArenaParticipantSnapshot, type ArenaProjectileSnapshot, type ArenaSnapshot, type MonsterSkill } from '../../shared/arenaConfig.js';
import type { Player } from './types.js';

interface ArenaParticipant extends ArenaParticipantSnapshot {
  lastMoveAt: number;
}

interface Crocodile {
  id: string;
  kind: 'crocodile';
  name: 'Mecha Crocodile';
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
  lastSkill: MonsterSkill | null;
}

interface ArenaProjectile extends ArenaProjectileSnapshot {
  throwerId: string;
}

export interface ArenaInstance {
  id: string;
  startedAt: number;
  isSolo: boolean;
  players: ArenaParticipant[];
  monster: Crocodile;
  state: ArenaSnapshot['state'];
  stonePileCount: number;
  scatteredStones: { id: string; x: number; z: number }[];
  nextStoneRefillAt: number;
  projectiles: ArenaProjectile[];
  respawnAt: number | null;
  lastUpdatedAt: number;
  nextStateAt: number;
  firstHitAt: number | null;
}

export type ArenaEvent =
  | { type: 'monsterHit'; damage: number; hp: number; maxHp: number }
  | { type: 'playerDamaged'; playerId: string; damage: number; hp: number; maxHp: number; skill: MonsterSkill }
  | { type: 'monsterDied'; hp: 0; playerId: string; timeMs: number }
  | { type: 'playerDied'; hp: 0; respawnAt: number };

export function createCrocodileArena(player: Player, now: number): ArenaInstance {
  return {
    id: randomUUID(),
    startedAt: now,
    isSolo: true,
    players: [createParticipant(player, 0, now)],
    monster: {
      id: 'crocodile', kind: 'crocodile', name: 'Mecha Crocodile',
      x: 7, z: 0, facing: -Math.PI / 2,
      hp: ARENA_CONFIG.monsterMaxHp, maxHp: ARENA_CONFIG.monsterMaxHp,
      state: 'chase', attack: null, cooldownUntil: 0,
      skillReadyAt: { bite: now, tailSweep: now, lunge: now, tailSmash: now, burrow: now }, chargeHitIds: new Set(), lastSkill: null,
    },
    state: 'active',
    stonePileCount: ARENA_CONFIG.stonePile.maxCount,
    scatteredStones: [],
    nextStoneRefillAt: now + ARENA_CONFIG.stonePile.refillEveryMs,
    projectiles: [],
    respawnAt: null,
    lastUpdatedAt: now,
    nextStateAt: now,
    firstHitAt: null,
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
    hasPet: player.hasPet,
    lastMoveAt: now,
  };
}

export function addArenaPlayer(arena: ArenaInstance, player: Player, now: number): void {
  if (arena.players.some((entry) => entry.playerId === player.id)) return;
  arena.isSolo = false;
  arena.players.push(createParticipant(player, arena.players.length, now));
}

export function removeArenaPlayer(arena: ArenaInstance, playerId: string): void {
  const player = arena.players.find((entry) => entry.playerId === playerId);
  if (player) arena.stonePileCount = Math.min(ARENA_CONFIG.stonePile.maxCount, arena.stonePileCount + player.stones);
  arena.players = arena.players.filter((entry) => entry.playerId !== playerId);
  arena.monster.chargeHitIds.delete(playerId);
}

export function restartCrocodileArena(arena: ArenaInstance, now: number): void {
  arena.startedAt = now;
  arena.monster.x = 7;
  arena.monster.z = 0;
  arena.monster.facing = -Math.PI / 2;
  arena.monster.hp = arena.monster.maxHp;
  arena.monster.state = 'chase';
  arena.monster.attack = null;
  arena.monster.cooldownUntil = 0;
  arena.monster.skillReadyAt = { bite: now, tailSweep: now, lunge: now, tailSmash: now, burrow: now };
  arena.monster.chargeHitIds.clear();
  arena.monster.lastSkill = null;
  arena.state = 'active';
  arena.stonePileCount = ARENA_CONFIG.stonePile.maxCount;
  arena.scatteredStones = [];
  arena.nextStoneRefillAt = now + ARENA_CONFIG.stonePile.refillEveryMs;
  arena.projectiles = [];
  arena.respawnAt = null;
  arena.lastUpdatedAt = now;
  arena.nextStateAt = now;
  arena.firstHitAt = null;
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
    startedAt: arena.startedAt,
    players: arena.players.map(({ playerId, name, color, x, z, facing, hp, maxHp, stones, hasPet }) => ({ playerId, name, color, x, z, facing, hp, maxHp, stones, hasPet })),
    monster: { id, kind, name, x, z, facing, hp, maxHp, state, attack: attack ? { ...attack } : null },
    stonePile: { x: ARENA_CONFIG.stonePile.x, z: ARENA_CONFIG.stonePile.z, count: arena.stonePileCount, maxCount: ARENA_CONFIG.stonePile.maxCount, nextRefillAt: arena.nextStoneRefillAt },
    scatteredStones: arena.scatteredStones.map((stone) => ({ ...stone })),
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
  const scatteredIndex = arena.scatteredStones.findIndex((stone) => Math.hypot(player.x - stone.x, player.z - stone.z) <= ARENA_CONFIG.stonePile.useRadius);
  if (scatteredIndex >= 0) {
    if (player.stones >= ARENA_CONFIG.maxCarriedStones) return 'full';
    player.stones += 1;
    arena.scatteredStones.splice(scatteredIndex, 1);
    return 'picked';
  }
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
  monster.cooldownUntil = now + combatCooldown(ARENA_CONFIG.monsterAttackCooldownMs, monster);
}

function isEnraged(monster: Crocodile): boolean {
  return monster.hp <= ARENA_CONFIG.monsterEnrageThreshold && monster.hp > 0;
}

function combatBoost(monster: Crocodile): number {
  return isEnraged(monster) ? ARENA_CONFIG.monsterEnrageMultiplier : 1;
}

function combatDamage(value: number, monster: Crocodile): number {
  return Math.round(value * combatBoost(monster));
}

function combatRange(value: number, monster: Crocodile): number {
  return value * combatBoost(monster);
}

function combatCooldown(value: number, monster: Crocodile): number {
  return value / combatBoost(monster);
}

function beginMonsterAttack(arena: ArenaInstance, player: ArenaParticipant, skill: MonsterSkill, now: number): void {
  const monster = arena.monster;
  const dx = player.x - monster.x, dz = player.z - monster.z;
  const length = Math.hypot(dx, dz) || 1;
  const directionX = dx / length, directionZ = dz / length;
  monster.facing = Math.atan2(directionX, directionZ);
  const windupMs = skill === 'bite' ? ARENA_CONFIG.attacks.bite.windupMs
    : skill === 'tailSweep' ? ARENA_CONFIG.attacks.tailSweep.warningMs
      : skill === 'lunge' ? ARENA_CONFIG.attacks.lunge.windupMs
        : skill === 'tailSmash' ? ARENA_CONFIG.newSkills.tailSmash.warningMs
          : ARENA_CONFIG.newSkills.burrow.diveMs;
  const cooldownMs = combatCooldown(ARENA_CONFIG.attacks[skill].cooldownMs, monster);
  monster.attack = {
    skill, phase: skill === 'burrow' ? 'dive' : 'windup', startedAt: now, resolveAt: now + windupMs,
    endsAt: now + windupMs + (skill === 'lunge' ? ARENA_CONFIG.attacks.lunge.chargeMs : 0),
    originX: monster.x, originZ: monster.z, directionX, directionZ,
    radius: skill === 'bite' ? combatRange(ARENA_CONFIG.attacks.bite.range, monster)
      : skill === 'tailSweep' ? combatRange(ARENA_CONFIG.attacks.tailSweep.range, monster)
        : skill === 'lunge' ? combatRange(ARENA_CONFIG.attacks.lunge.hitRadius, monster)
          : skill === 'tailSmash' ? combatRange(ARENA_CONFIG.newSkills.tailSmash.radius, monster) : combatRange(ARENA_CONFIG.newSkills.burrow.radius, monster),
    targetX: skill === 'tailSmash' ? ARENA_CONFIG.stonePile.x : undefined,
    targetZ: skill === 'tailSmash' ? ARENA_CONFIG.stonePile.z : undefined,
  };
  monster.skillReadyAt[skill] = now + cooldownMs;
  monster.chargeHitIds.clear();
  monster.state = 'attack';
  monster.lastSkill = skill;
}

function knockback(player: ArenaParticipant, originX: number, originZ: number, distance: number): void {
  const dx = player.x - originX, dz = player.z - originZ;
  const length = Math.hypot(dx, dz) || 1;
  const scale = distance / length;
  const x = player.x + dx * scale, z = player.z + dz * scale;
  const maxRadius = ARENA_CONFIG.platformRadius - 1;
  const radius = Math.hypot(x, z);
  player.x = radius > maxRadius ? x * maxRadius / radius : x;
  player.z = radius > maxRadius ? z * maxRadius / radius : z;
}

function scatterPile(arena: ArenaInstance, now: number): void {
  const count = arena.stonePileCount;
  arena.stonePileCount = 0;
  for (let index = 0; index < count; index++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = ARENA_CONFIG.newSkills.tailSmash.scatterRadiusMin +
      Math.random() * (ARENA_CONFIG.newSkills.tailSmash.scatterRadiusMax - ARENA_CONFIG.newSkills.tailSmash.scatterRadiusMin);
    const maxRadius = ARENA_CONFIG.platformRadius - 1.5;
    const x = Math.cos(angle) * Math.min(distance, maxRadius);
    const z = Math.sin(angle) * Math.min(distance, maxRadius);
    if (Math.hypot(x - arena.monster.x, z - arena.monster.z) < 3) {
      arena.scatteredStones.push({ id: `arena-stone-${now}-${index}`, x: Math.cos(angle) * 5, z: Math.sin(angle) * 5 });
    } else arena.scatteredStones.push({ id: `arena-stone-${now}-${index}`, x, z });
  }
}

function chooseSkill(arena: ArenaInstance, player: ArenaParticipant, now: number): MonsterSkill | null {
  const distance = Math.hypot(player.x - arena.monster.x, player.z - arena.monster.z);
  const available: MonsterSkill[] = [];
  if (arena.stonePileCount >= 2 && arena.monster.lastSkill !== 'tailSmash' && now >= arena.monster.skillReadyAt.tailSmash) available.push('tailSmash');
  if (arena.monster.lastSkill !== 'burrow' && now >= arena.monster.skillReadyAt.burrow && (distance > combatRange(6, arena.monster) || Math.random() < 0.3)) available.push('burrow');
  return available[Math.floor(Math.random() * available.length)] ?? null;
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
    const burrowed = monster.attack?.skill === 'burrow' &&
      ['dive', 'underground', 'telegraph'].includes(monster.attack.phase);
    if (!burrowed && monster.state !== 'dead' && Math.hypot(x - monster.x, z - monster.z) <= ARENA_CONFIG.stoneHitRadius) {
      const damage = monster.attack?.skill === 'burrow' && monster.attack.phase === 'recovery'
        ? ARENA_CONFIG.stoneDamage * ARENA_CONFIG.newSkills.burrow.bonusStoneDamage : ARENA_CONFIG.stoneDamage;
      const firstHitAt = arena.firstHitAt ?? now;
      arena.firstHitAt = firstHitAt;
      monster.hp = Math.max(0, monster.hp - damage);
      events.push({ type: 'monsterHit', damage, hp: monster.hp, maxHp: monster.maxHp });
      arena.projectiles.splice(index, 1);
      if (monster.hp === 0) {
        monster.state = 'dead';
        monster.attack = null;
        arena.state = 'victory';
        events.push({ type: 'monsterDied', hp: 0, playerId: projectile.throwerId, timeMs: Math.max(0, now - firstHitAt) });
      }
    } else if (now >= projectile.startedAt + projectile.durationMs) arena.projectiles.splice(index, 1);
  }
  if (arena.state !== 'active') return events;

  if (monster.state === 'attack' && monster.attack) {
    const attack = monster.attack;
    if (attack.skill === 'tailSmash') {
      if (attack.phase === 'windup' && now >= attack.resolveAt) {
        scatterPile(arena, now);
        for (const target of arena.players) {
          if (target.hp > 0 && Math.hypot(target.x - ARENA_CONFIG.stonePile.x, target.z - ARENA_CONFIG.stonePile.z) <= attack.radius + ARENA_CONFIG.playerCollisionRadius) {
            damagePlayer(arena, target, combatDamage(ARENA_CONFIG.newSkills.tailSmash.damage, monster), 'tailSmash', now, events);
            knockback(target, ARENA_CONFIG.stonePile.x, ARENA_CONFIG.stonePile.z, ARENA_CONFIG.newSkills.tailSmash.knockback);
          }
        }
        if (arena.state !== 'active') return events;
        attack.phase = 'recovery';
        attack.resolveAt = now;
        attack.endsAt = now + ARENA_CONFIG.newSkills.tailSmash.recoveryMs;
      } else if (attack.phase === 'recovery' && now >= attack.endsAt) finishMonsterAttack(monster, now);
      return events;
    }
    if (attack.skill === 'burrow') {
      if (attack.phase === 'dive' && now >= attack.resolveAt) {
        attack.phase = 'underground';
        attack.resolveAt = now + ARENA_CONFIG.newSkills.burrow.undergroundMs;
        return events;
      }
      if (attack.phase === 'underground') {
        const target = nearestLivingPlayer(arena) ?? player;
        const desiredX = target.x + Math.sin(now * 0.001) * 1.8;
        const desiredZ = target.z + Math.cos(now * 0.0013) * 1.8;
        const dx = desiredX - monster.x, dz = desiredZ - monster.z;
        const length = Math.hypot(dx, dz) || 1;
        const step = Math.min(ARENA_CONFIG.newSkills.burrow.speed * deltaSeconds, length);
        monster.x += dx / length * step;
        monster.z += dz / length * step;
        monster.facing = Math.atan2(dx, dz);
        attack.targetX = monster.x;
        attack.targetZ = monster.z;
        if (now >= attack.resolveAt) {
          attack.phase = 'telegraph';
          attack.startedAt = now;
          attack.resolveAt = now + ARENA_CONFIG.newSkills.burrow.emergeWarningMs;
          attack.endsAt = attack.resolveAt + ARENA_CONFIG.newSkills.burrow.recoveryMs;
          attack.targetX = monster.x;
          attack.targetZ = monster.z;
        }
        return events;
      }
      if (attack.phase === 'telegraph' && now >= attack.resolveAt) {
        monster.x = attack.targetX ?? monster.x;
        monster.z = attack.targetZ ?? monster.z;
        for (const target of arena.players) {
          if (target.hp > 0 && Math.hypot(target.x - monster.x, target.z - monster.z) <= attack.radius + ARENA_CONFIG.playerCollisionRadius) {
            damagePlayer(arena, target, combatDamage(ARENA_CONFIG.newSkills.burrow.damage, monster), 'burrow', now, events);
            knockback(target, monster.x, monster.z, ARENA_CONFIG.newSkills.burrow.knockback);
          }
        }
        if (arena.state !== 'active') return events;
        attack.phase = 'recovery';
        attack.resolveAt = now;
      } else if (attack.phase === 'recovery' && now >= attack.endsAt) finishMonsterAttack(monster, now);
      return events;
    }
    if (attack.skill === 'lunge' && attack.phase === 'windup' && now >= attack.resolveAt) {
      attack.phase = 'charge';
      attack.resolveAt = now;
      attack.endsAt = now + ARENA_CONFIG.attacks.lunge.chargeMs;
    }
    if (attack.skill === 'lunge' && attack.phase === 'charge') {
      const remaining = Math.max(0, attack.endsAt - now);
      const movement = Math.min(combatRange(ARENA_CONFIG.attacks.lunge.speed, monster) * deltaSeconds, Math.hypot(
        monster.x + attack.directionX - player.x,
        monster.z + attack.directionZ - player.z,
      ));
      monster.x += attack.directionX * movement;
      monster.z += attack.directionZ * movement;
      monster.facing = Math.atan2(attack.directionX, attack.directionZ);
      for (const target of arena.players) {
        if (target.hp > 0 && !monster.chargeHitIds.has(target.playerId) && Math.hypot(monster.x - target.x, monster.z - target.z) <= combatRange(ARENA_CONFIG.attacks.lunge.hitRadius, monster) + ARENA_CONFIG.playerCollisionRadius) {
          monster.chargeHitIds.add(target.playerId);
          damagePlayer(arena, target, combatDamage(ARENA_CONFIG.attacks.lunge.damage, monster), 'lunge', now, events);
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
          damagePlayer(arena, target, combatDamage(ARENA_CONFIG.attacks[attack.skill].damage, monster), attack.skill, now, events);
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
  const moveStep = Math.min(combatRange(ARENA_CONFIG.monsterMoveSpeed, monster) * deltaSeconds, Math.max(0, distance - 1.65));
  if (distance > 1.65 && moveStep > 0) {
    monster.x += dx / (distance || 1) * moveStep;
    monster.z += dz / (distance || 1) * moveStep;
  }
  if (distance <= combatRange(ARENA_CONFIG.attacks.bite.range, monster) && now >= monster.skillReadyAt.bite)   beginMonsterAttack(arena, player, 'bite', now);
  else if (distance <= combatRange(ARENA_CONFIG.attacks.tailSweep.range, monster) && now >= monster.skillReadyAt.tailSweep) beginMonsterAttack(arena, player, 'tailSweep', now);
  else if (distance <= combatRange(ARENA_CONFIG.attacks.lunge.range, monster) && distance > combatRange(ARENA_CONFIG.attacks.bite.range, monster) && now >= monster.skillReadyAt.lunge) beginMonsterAttack(arena, player, 'lunge', now);
  else if (now >= Math.min(monster.skillReadyAt.tailSmash, monster.skillReadyAt.burrow)) {
    const skill = chooseSkill(arena, player, now);
    if (skill) beginMonsterAttack(arena, player, skill, now);
  }
  else if (distance <= combatRange(ARENA_CONFIG.attacks.bite.range, monster) && now < monster.skillReadyAt.bite) monster.state = 'cooldown';
  return events;
}
