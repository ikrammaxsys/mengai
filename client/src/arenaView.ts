import * as THREE from 'three';
import { ARENA_CONFIG, type ArenaSnapshot } from '../../shared/arenaConfig';
import { animateCrocodileWalk, populateCrocodileModel } from './crocodileModel';

export interface ArenaViewCallbacks {
  leave(): void;
  restart(): void;
}

interface ArenaAvatar {
  group: THREE.Group;
  bodyMaterial: THREE.MeshStandardMaterial;
}

interface PartyHealthRow {
  row: HTMLElement;
  fill: HTMLElement;
  label: HTMLElement;
}

interface ArenaPet {
  group: THREE.Group;
  tail: THREE.Group;
  legs: THREE.Mesh[];
  initialized: boolean;
}

export class ArenaView {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 100);
  private readonly scene = new THREE.Scene();
  private readonly root: HTMLElement;
  private readonly partyHealth: HTMLElement;
  private readonly bossHp: HTMLElement;
  private readonly bossHpLabel: HTMLElement;
  private readonly bossName: HTMLElement;
  private readonly stonesHeld: HTMLElement;
  private readonly pileCount: HTMLElement;
  private readonly exitPrompt: HTMLElement;
  private readonly defeatedPanel: HTMLElement;
  private readonly victoryPanel: HTMLElement;
  private readonly monsterGroup = new THREE.Group();
  private readonly monsterTail = new THREE.Group();
  private monsterLegs: THREE.Mesh[] = [];
  private attackRing!: THREE.Mesh;
  private lungeWarning!: THREE.Mesh;
  private readonly stonePile = new THREE.Group();
  private readonly pileStones: THREE.Mesh[] = [];
  private readonly scatteredStoneMeshes = new Map<string, THREE.Mesh>();
  private readonly projectileMeshes = new Map<string, THREE.Mesh>();
  private readonly playerAvatars = new Map<string, ArenaAvatar>();
  private readonly partyHealthRows = new Map<string, PartyHealthRow>();
  private readonly pets = new Map<string, ArenaPet>();
  private readonly monsterMaterials: THREE.MeshStandardMaterial[] = [];
  private snapshots: ArenaSnapshot[] = [];
  private snapshot: ArenaSnapshot | null = null;
  private predictedPlayer: { x: number; z: number; facing: number } | null = null;
  private callbacks: ArenaViewCallbacks;
  private deathStartedAt: number | null = null;
  private monsterHitUntil = 0;
  private localHitUntil = 0;
  private localPlayerId = '';
  private lastAttackKey = '';

  constructor(root: HTMLElement, callbacks: ArenaViewCallbacks) {
    this.root = root;
    this.callbacks = callbacks;
    this.partyHealth = root.querySelector<HTMLElement>('#arena-party-health')!;
    this.bossHp = root.querySelector<HTMLElement>('#arena-boss-hp')!;
    this.bossHpLabel = root.querySelector<HTMLElement>('#arena-boss-hp-label')!;
    this.bossName = root.querySelector<HTMLElement>('#arena-boss-name')!;
    this.stonesHeld = root.querySelector<HTMLElement>('#arena-stones-held')!;
    this.pileCount = root.querySelector<HTMLElement>('#arena-pile-count')!;
    this.exitPrompt = root.querySelector<HTMLElement>('#arena-exit-prompt')!;
    this.defeatedPanel = root.querySelector<HTMLElement>('#arena-defeated')!;
    this.victoryPanel = root.querySelector<HTMLElement>('#arena-victory')!;
    root.querySelector<HTMLButtonElement>('#arena-leave-button')!.addEventListener('click', () => callbacks.leave());
    root.querySelector<HTMLButtonElement>('#arena-retry-button')!.addEventListener('click', () => callbacks.restart());

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    root.querySelector<HTMLElement>('#arena-canvas-host')!.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color('#a8bdb5');
    this.scene.fog = new THREE.FogExp2('#a8bdb5', 0.012);
    this.buildScene();
    window.addEventListener('resize', this.onResize);
  }

  enter(snapshot: ArenaSnapshot, playerId: string): void {
    this.root.classList.remove('hidden');
    this.defeatedPanel.classList.add('hidden');
    this.victoryPanel.classList.add('hidden');
    this.deathStartedAt = null;
    this.snapshots = [];
    this.snapshot = null;
    this.predictedPlayer = null;
    this.localPlayerId = playerId;
    this.receive(snapshot);
  }

  close(): void {
    this.root.classList.add('hidden');
    this.exitPrompt.classList.add('hidden');
    this.snapshots = [];
    this.snapshot = null;
    this.predictedPlayer = null;
    for (const avatar of this.playerAvatars.values()) this.scene.remove(avatar.group);
    this.playerAvatars.clear();
    this.partyHealthRows.clear();
    this.partyHealth.replaceChildren();
    for (const pet of this.pets.values()) {
      this.scene.remove(pet.group);
      pet.group.traverse((part) => {
        if (!(part instanceof THREE.Mesh)) return;
        part.geometry.dispose();
        const materials = Array.isArray(part.material) ? part.material : [part.material];
        for (const material of materials) material.dispose();
      });
    }
    this.pets.clear();
    this.deathStartedAt = null;
  }

  receive(snapshot: ArenaSnapshot): void {
    if (this.snapshot?.instanceId !== snapshot.instanceId) {
      this.snapshots = [];
      this.predictedPlayer = null;
    }
    const serverPlayer = snapshot.players.find((player) => player.playerId === this.localPlayerId);
    if (serverPlayer) {
      if (!this.predictedPlayer) this.predictedPlayer = { x: serverPlayer.x, z: serverPlayer.z, facing: serverPlayer.facing };
      else {
        const correction = Math.hypot(serverPlayer.x - this.predictedPlayer.x, serverPlayer.z - this.predictedPlayer.z);
        if (correction > 1.4) {
          this.predictedPlayer.x = serverPlayer.x;
          this.predictedPlayer.z = serverPlayer.z;
        } else {
          this.predictedPlayer.x += (serverPlayer.x - this.predictedPlayer.x) * 0.22;
          this.predictedPlayer.z += (serverPlayer.z - this.predictedPlayer.z) * 0.22;
        }
        const angle = Math.atan2(Math.sin(serverPlayer.facing - this.predictedPlayer.facing), Math.cos(serverPlayer.facing - this.predictedPlayer.facing));
        this.predictedPlayer.facing += angle * 0.25;
      }
    }
    this.snapshot = snapshot;
    const attack = snapshot.monster.attack;
    const attackKey = attack ? `${attack.skill}:${attack.phase}:${attack.resolveAt}` : '';
    if (attack && attackKey !== this.lastAttackKey) {
      window.dispatchEvent(new CustomEvent('arena:crocodile-skill', { detail: { skill: attack.skill, phase: attack.phase } }));
    }
    this.lastAttackKey = attackKey;
    this.snapshots.push(snapshot);
    while (this.snapshots.length > 5) this.snapshots.shift();
    this.updateHud(snapshot);
  }

  setFastestSlayer(playerId: string | null): void {
    if (!this.snapshot) return;
    for (const participant of this.snapshot.players) participant.hasPet = participant.playerId === playerId;
  }

  move(forward: number, turn: number, deltaSeconds: number): { x: number; z: number; facing: number } | null {
    const localParticipant = this.snapshot?.players.find((player) => player.playerId === this.localPlayerId);
    if (!this.snapshot || !this.predictedPlayer || this.snapshot.state !== 'active' || !localParticipant || localParticipant.hp <= 0) return null;
    const dt = Math.max(0, Math.min(0.05, deltaSeconds));
    const player = this.predictedPlayer;
    player.facing = Math.atan2(Math.sin(player.facing + turn * ARENA_CONFIG.playerTurnRate * dt), Math.cos(player.facing + turn * ARENA_CONFIG.playerTurnRate * dt));
    if (forward !== 0) {
      let x = player.x + Math.sin(player.facing) * forward * ARENA_CONFIG.playerMoveSpeed * dt;
      let z = player.z + Math.cos(player.facing) * forward * ARENA_CONFIG.playerMoveSpeed * dt;
      const radius = Math.hypot(x, z);
      const maxRadius = ARENA_CONFIG.platformRadius - 1;
      if (radius > maxRadius) { x *= maxRadius / radius; z *= maxRadius / radius; }
      player.x = x;
      player.z = z;
    }
    return { ...player };
  }

  isNearExit(): boolean {
    if (!this.snapshot || !this.predictedPlayer) return false;
    return Math.hypot(this.predictedPlayer.x - this.snapshot.exitPortal.x, this.predictedPlayer.z - this.snapshot.exitPortal.z) <= this.snapshot.exitPortal.useRadius;
  }

  monsterHit(message: { hp: number; maxHp: number }): void {
    this.monsterHitUntil = performance.now() + 240;
    this.bossHp.style.width = `${Math.max(0, Math.min(100, message.hp / message.maxHp * 100))}%`;
    this.bossHpLabel.textContent = `${message.hp} / ${message.maxHp}`;
  }

  playerDamaged(message: { playerId: string; hp: number; maxHp: number }): void {
    if (message.playerId === this.localPlayerId) this.localHitUntil = performance.now() + 320;
  }

  monsterDied(): void {
    this.deathStartedAt = performance.now();
    this.victoryPanel.classList.add('hidden');
  }

  playerDied(): void {
    this.defeatedPanel.classList.remove('hidden');
    this.victoryPanel.classList.add('hidden');
  }

  render(serverNow: number, deltaSeconds: number): void {
    if (!this.snapshot) return;
    const viewTime = serverNow - 120;
    const monsterPose = this.interpolateMonster(viewTime);
    const localParticipant = this.snapshot.players.find((entry) => entry.playerId === this.localPlayerId);
    const player = localParticipant ? this.predictedPlayer ?? localParticipant : null;
    if (!player) return;
    const attack = this.snapshot.monster.attack;
    const impact = attack?.phase === 'recovery' && serverNow - attack.resolveAt < 360;
    const shake = impact ? 0.14 : 0;
    const target = new THREE.Vector3(
      player.x - Math.sin(player.facing) * 8.5 + (Math.random() - 0.5) * shake,
      7.2 + (Math.random() - 0.5) * shake,
      player.z - Math.cos(player.facing) * 8.5 + (Math.random() - 0.5) * shake,
    );
    const cameraDamping = 1 - Math.exp(-5.5 * Math.max(0, deltaSeconds));
    this.camera.position.lerp(target, cameraDamping);
    this.camera.lookAt(player.x, 1.0, player.z);
    this.camera.updateMatrixWorld();

    for (const participant of this.snapshot.players) {
      let avatar = this.playerAvatars.get(participant.playerId);
      if (!avatar) {
        avatar = this.buildPlayer(participant.color);
        this.playerAvatars.set(participant.playerId, avatar);
        this.scene.add(avatar.group);
      }
      const pose = participant.playerId === this.localPlayerId ? player : participant;
      avatar.group.position.set(pose.x, 0, pose.z);
      avatar.group.rotation.y = pose.facing;
      avatar.group.scale.y = participant.hp > 0 ? 1 : 0.55;
      avatar.bodyMaterial.color.set(participant.hp > 0 ? participant.color : '#595c54');
      avatar.bodyMaterial.emissive.setHex(participant.playerId === this.localPlayerId && performance.now() < this.localHitUntil ? 0x8d3421 : 0x000000);
      if (participant.hasPet) {
        let pet = this.pets.get(participant.playerId);
        if (!pet) {
          const group = new THREE.Group();
          const tail = new THREE.Group();
          const model = populateCrocodileModel(group, tail);
          const collar = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 5, 12), new THREE.MeshStandardMaterial({ color: '#e5b13a', metalness: 0.72, roughness: 0.3 }));
          collar.rotation.x = Math.PI / 2;
          collar.position.set(0, 0.64, 1.28);
          group.add(collar);
          group.scale.setScalar(0.2);
          this.scene.add(group);
          pet = { group, tail, legs: model.legs, initialized: false };
          this.pets.set(participant.playerId, pet);
        }
        const targetX = pose.x - Math.sin(pose.facing) * 1.5;
        const targetZ = pose.z - Math.cos(pose.facing) * 1.5;
        const dx = targetX - pet.group.position.x, dz = targetZ - pet.group.position.z;
        const distance = Math.hypot(dx, dz);
        if (!pet.initialized || distance > 15) {
          pet.group.position.set(targetX, 0, targetZ);
          pet.group.rotation.y = pose.facing;
          pet.initialized = true;
        } else if (distance > 1.5) {
          const step = Math.min(distance, ARENA_CONFIG.playerMoveSpeed * 0.82 * Math.max(0, deltaSeconds));
          pet.group.position.lerp(new THREE.Vector3(targetX, pet.group.position.y, targetZ), step / distance);
          pet.group.rotation.y = Math.atan2(dx, dz);
        } else pet.group.rotation.y += Math.atan2(Math.sin(pose.facing - pet.group.rotation.y), Math.cos(pose.facing - pet.group.rotation.y)) * Math.min(1, deltaSeconds * 3);
        pet.group.visible = this.snapshot.monster.state === 'dead';
        pet.group.position.y = Math.sin(serverNow * 0.004 + pose.x) * 0.025;
        pet.tail.rotation.x = Math.sin(serverNow * 0.0025) * 0.09;
        animateCrocodileWalk(pet.legs, serverNow, distance > 1.5);
      }
    }
    const activePetOwners = new Set(this.snapshot.players.filter((player) => player.hasPet).map((player) => player.playerId));
    for (const [id, pet] of this.pets) {
      if (activePetOwners.has(id)) continue;
      this.scene.remove(pet.group);
      pet.group.traverse((part) => {
        if (!(part instanceof THREE.Mesh)) return;
        part.geometry.dispose();
        const materials = Array.isArray(part.material) ? part.material : [part.material];
        for (const material of materials) material.dispose();
      });
      this.pets.delete(id);
    }
    const currentPlayerIds = new Set(this.snapshot.players.map((entry) => entry.playerId));
    for (const [id, avatar] of this.playerAvatars) {
      if (currentPlayerIds.has(id)) continue;
      this.scene.remove(avatar.group);
      this.playerAvatars.delete(id);
    }
    this.monsterGroup.position.set(monsterPose.x, 0, monsterPose.z);
    this.monsterGroup.rotation.y = monsterPose.facing;
    animateCrocodileWalk(this.monsterLegs, serverNow, this.snapshot.monster.state === 'chase' && this.snapshot.state === 'active');
    const burrowPhase = attack?.skill === 'burrow' ? attack.phase : null;
    const attackElapsed = attack ? Math.max(0, serverNow - attack.startedAt) : 0;
    const diveProgress = attack?.skill === 'burrow' && attack.phase === 'dive'
      ? Math.min(1, attackElapsed / ARENA_CONFIG.newSkills.burrow.diveMs) : 0;
    const emergeProgress = attack?.skill === 'burrow' && attack.phase === 'telegraph'
      ? Math.min(1, Math.max(0, (serverNow - attack.startedAt) / ARENA_CONFIG.newSkills.burrow.emergeWarningMs)) : 0;
    const smashProgress = attack?.skill === 'tailSmash' && attack.phase === 'windup'
      ? Math.min(1, attackElapsed / ARENA_CONFIG.newSkills.tailSmash.warningMs) : 0;
    const recoveryElapsed = attack?.phase === 'recovery' ? Math.max(0, serverNow - attack.resolveAt) : 0;
    this.monsterGroup.visible = burrowPhase !== 'underground';
    this.monsterGroup.position.y = attack?.skill === 'burrow' && burrowPhase === 'dive'
      ? -0.65 * diveProgress
      : attack?.skill === 'burrow' && burrowPhase === 'telegraph' ? 0.7 * emergeProgress : 0;
    if (attack?.skill === 'tailSmash' && attack.phase === 'windup') {
      this.monsterGroup.position.y = Math.sin(smashProgress * Math.PI) * 0.72;
    } else if (attack?.skill === 'tailSmash' && attack.phase === 'recovery') {
      this.monsterGroup.position.y = Math.max(0, 0.18 - recoveryElapsed * 0.002);
    }
    const dying = this.deathStartedAt !== null;
    if (dying) {
      const progress = Math.min(1, (performance.now() - this.deathStartedAt!) / ARENA_CONFIG.monsterDeathDurationMs);
      this.monsterGroup.rotation.z = progress * 1.5;
      this.monsterGroup.scale.y = 1 - progress * 0.35;
      if (progress >= 1) this.victoryPanel.classList.remove('hidden');
    } else {
      this.monsterGroup.rotation.z = 0;
      this.monsterGroup.scale.y = attack?.skill === 'burrow' && burrowPhase === 'dive'
        ? 1 - diveProgress * 0.72
        : attack?.skill === 'burrow' && burrowPhase === 'telegraph'
          ? 0.28 + emergeProgress * 0.72
          : 1 + (this.snapshot.monster.state === 'attack' ? Math.sin(serverNow * 0.02) * 0.06 : 0);
    }
    this.monsterGroup.rotation.z += attack?.skill === 'tailSmash' && attack.phase === 'windup'
      ? Math.sin(Math.min(1, attackElapsed / ARENA_CONFIG.newSkills.tailSmash.warningMs) * Math.PI) * 0.12 : 0;
    this.monsterTail.rotation.x = attack?.skill === 'tailSmash' && attack.phase === 'windup'
      ? -0.8 - Math.sin(Math.min(1, attackElapsed / ARENA_CONFIG.newSkills.tailSmash.warningMs) * Math.PI) * 0.35
      : attack?.skill === 'tailSmash' && attack.phase === 'recovery'
        ? 0.55 : attack?.skill === 'tailSweep' && attack.phase === 'windup'
          ? Math.sin(Math.min(1, attackElapsed / ARENA_CONFIG.attacks.tailSweep.warningMs) * Math.PI) * 1.15
          : this.snapshot.monster.state === 'attack' ? Math.sin(serverNow * 0.025) * 0.18 : Math.sin(serverNow * 0.003) * 0.04;
    if (attack?.skill === 'tailSweep' && attack.phase === 'windup') {
      const turn = Math.sin(Math.min(1, attackElapsed / ARENA_CONFIG.attacks.tailSweep.warningMs) * Math.PI) * Math.PI;
      this.monsterGroup.rotation.y = monsterPose.facing + turn;
    }
    const enraged = this.snapshot.monster.hp <= ARENA_CONFIG.monsterEnrageThreshold && this.snapshot.monster.hp > 0;
    this.monsterMaterials[0].color.set(enraged ? '#c8783e' : '#547b45');
    this.monsterMaterials[0].emissive.setHex(performance.now() < this.monsterHitUntil ? 0x8d3421 : 0x000000);
    this.renderAttackTelegraph(monsterPose.x, monsterPose.z);
    this.renderProjectiles(serverNow);
    this.renderPile(serverNow);
    this.exitPrompt.classList.toggle('hidden', !this.isNearExit() || this.snapshot.state === 'victory');
    this.renderer.render(this.scene, this.camera);
  }

  private updateHud(snapshot: ArenaSnapshot): void {
    const player = snapshot.players.find((entry) => entry.playerId === this.localPlayerId);
    this.updatePartyHealth(snapshot.players);
    if (player) {
      this.stonesHeld.textContent = String(player.stones);
    }
    this.bossName.textContent = snapshot.monster.name;
    this.bossHp.style.width = `${Math.max(0, Math.min(100, snapshot.monster.hp / snapshot.monster.maxHp * 100))}%`;
    this.bossHpLabel.textContent = `${snapshot.monster.hp} / ${snapshot.monster.maxHp}`;
    this.pileCount.textContent = String(snapshot.stonePile.count);
    if (snapshot.state === 'victory') this.deathStartedAt ??= performance.now();
    else if (snapshot.state === 'defeat') this.playerDied();
  }

  private updatePartyHealth(players: ArenaSnapshot['players']): void {
    const playerIds = new Set(players.map((player) => player.playerId));
    for (const [id, entry] of this.partyHealthRows) {
      if (playerIds.has(id)) continue;
      entry.row.remove();
      this.partyHealthRows.delete(id);
    }
    for (const player of players) {
      let entry = this.partyHealthRows.get(player.playerId);
      if (!entry) {
        const row = document.createElement('div');
        row.className = 'arena-party-player';
        const name = document.createElement('span');
        name.className = 'arena-party-name';
        const track = document.createElement('div');
        track.className = 'arena-health-track';
        const fill = document.createElement('div');
        fill.className = 'arena-health-fill player-health-fill';
        fill.style.backgroundColor = player.color;
        track.append(fill);
        const label = document.createElement('strong');
        row.append(name, track, label);
        this.partyHealth.append(row);
        entry = { row, fill, label };
        this.partyHealthRows.set(player.playerId, entry);
      }
      const name = player.playerId === this.localPlayerId ? `${player.name} · YOU` : player.name;
      (entry.row.firstElementChild as HTMLElement).textContent = name;
      entry.row.classList.toggle('is-self', player.playerId === this.localPlayerId);
      entry.row.classList.toggle('is-down', player.hp <= 0);
      entry.fill.style.width = `${Math.max(0, Math.min(100, player.hp / player.maxHp * 100))}%`;
      entry.fill.style.backgroundColor = player.color;
      entry.label.textContent = `${player.hp} / ${player.maxHp}`;
    }
  }

  private interpolateMonster(at: number): { x: number; z: number; facing: number } {
    if (this.snapshots.length < 2 || at <= this.snapshots[0].serverTime) {
      const monster = this.snapshots[0]?.monster ?? this.snapshot!.monster;
      return { x: monster.x, z: monster.z, facing: monster.facing };
    }
    const next = this.snapshots.findIndex((snapshot) => snapshot.serverTime >= at);
    if (next > 0) {
      const left = this.snapshots[next - 1], right = this.snapshots[next];
      const amount = (at - left.serverTime) / Math.max(1, right.serverTime - left.serverTime);
      const angle = Math.atan2(Math.sin(right.monster.facing - left.monster.facing), Math.cos(right.monster.facing - left.monster.facing));
      return {
        x: left.monster.x + (right.monster.x - left.monster.x) * amount,
        z: left.monster.z + (right.monster.z - left.monster.z) * amount,
        facing: left.monster.facing + angle * amount,
      };
    }
    const monster = this.snapshot!.monster;
    return { x: monster.x, z: monster.z, facing: monster.facing };
  }

  private renderAttackTelegraph(monsterX: number, monsterZ: number): void {
    const attack = this.snapshot?.monster.attack;
    this.attackRing.visible = Boolean(attack && (
      (attack.skill === 'tailSmash' && attack.phase === 'windup') ||
      (attack.skill === 'burrow' && (attack.phase === 'underground' || attack.phase === 'telegraph')) ||
      (attack.phase === 'windup' && attack.skill !== 'lunge')
    ));
    this.lungeWarning.visible = Boolean(attack && attack.skill === 'lunge' && attack.phase === 'windup');
    if (!attack) return;
    if (this.attackRing.visible) {
      const targetX = attack.targetX ?? attack.originX;
      const targetZ = attack.targetZ ?? attack.originZ;
      this.attackRing.position.set(targetX, 0.075, targetZ);
      const pulse = attack.skill === 'burrow' ? 0.72 + Math.sin(performance.now() * 0.014) * 0.22 : 1;
      this.attackRing.scale.setScalar(attack.radius * 2 * pulse);
      (this.attackRing.material as THREE.MeshBasicMaterial).opacity = 0.22 + Math.sin(performance.now() * 0.018) * 0.1;
    }
    if (this.lungeWarning.visible) {
      this.lungeWarning.position.set(monsterX + attack.directionX * 5, 0.065, monsterZ + attack.directionZ * 5);
      this.lungeWarning.rotation.y = Math.atan2(attack.directionX, attack.directionZ);
      this.lungeWarning.scale.z = 10;
    }
  }

  private renderPile(serverNow: number): void {
    const count = this.snapshot?.stonePile.count ?? 0;
    this.stonePile.position.set(ARENA_CONFIG.stonePile.x, 0, ARENA_CONFIG.stonePile.z);
    for (const [index, stone] of this.pileStones.entries()) {
      stone.visible = index < count;
      stone.position.y = 0.3 + Math.sin(serverNow * 0.003 + index) * 0.04;
    }
    const active = new Set<string>();
    for (const scattered of this.snapshot?.scatteredStones ?? []) {
      active.add(scattered.id);
      let mesh = this.scatteredStoneMeshes.get(scattered.id);
      if (!mesh) {
        mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), new THREE.MeshStandardMaterial({ color: '#b7aa8b', roughness: 1, flatShading: true }));
        this.scatteredStoneMeshes.set(scattered.id, mesh);
        this.scene.add(mesh);
      }
      mesh.position.set(scattered.x, 0.32 + Math.sin(serverNow * 0.003 + scattered.x) * 0.03, scattered.z);
    }
    for (const [id, mesh] of this.scatteredStoneMeshes) {
      if (active.has(id)) continue;
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      this.scatteredStoneMeshes.delete(id);
    }
  }

  private renderProjectiles(serverNow: number): void {
    const active = new Set<string>();
    for (const projectile of this.snapshot?.projectiles ?? []) {
      active.add(projectile.id);
      let mesh = this.projectileMeshes.get(projectile.id);
      if (!mesh) {
        mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), new THREE.MeshStandardMaterial({ color: '#b7aa8b', roughness: 1, flatShading: true }));
        this.projectileMeshes.set(projectile.id, mesh);
        this.scene.add(mesh);
      }
      const t = Math.max(0, Math.min(1, (serverNow - projectile.startedAt) / projectile.durationMs));
      const eased = 1 - (1 - t) * (1 - t);
      mesh.position.set(projectile.startX + (projectile.endX - projectile.startX) * eased, 1.25 + Math.sin(Math.PI * t) * 2, projectile.startZ + (projectile.endZ - projectile.startZ) * eased);
      mesh.rotation.x += 0.08;
      mesh.rotation.z += 0.1;
    }
    for (const [id, mesh] of this.projectileMeshes) {
      if (active.has(id)) continue;
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      this.projectileMeshes.delete(id);
    }
  }

  private buildScene(): void {
    this.scene.add(new THREE.HemisphereLight('#e8f5e7', '#665f4b', 2.1));
    const sun = new THREE.DirectionalLight('#fff0cf', 2.8);
    sun.position.set(-8, 18, 10);
    this.scene.add(sun);

    const platform = new THREE.Mesh(new THREE.CylinderGeometry(ARENA_CONFIG.platformRadius, ARENA_CONFIG.platformRadius + 0.8, 1, 32), new THREE.MeshStandardMaterial({ color: '#756f5d', roughness: 1, flatShading: true }));
    platform.position.y = -0.52; platform.receiveShadow = true; this.scene.add(platform);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(ARENA_CONFIG.platformRadius - 0.5, 32), new THREE.MeshStandardMaterial({ color: '#aaa082', roughness: 1, flatShading: true }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0.005; floor.receiveShadow = true; this.scene.add(floor);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(ARENA_CONFIG.platformRadius - 0.5, 0.32, 5, 32), new THREE.MeshStandardMaterial({ color: '#5c594e', roughness: 1, flatShading: true }));
    rim.rotation.x = Math.PI / 2; rim.position.y = 0.05; this.scene.add(rim);
    for (let index = 0; index < 14; index++) {
      const angle = index / 14 * Math.PI * 2;
      const pillar = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7 + index % 3 * 0.12, 0), new THREE.MeshStandardMaterial({ color: '#777565', roughness: 1, flatShading: true }));
      pillar.position.set(Math.cos(angle) * 20.5, 0.42, Math.sin(angle) * 20.5);
      pillar.scale.y = 1.2 + index % 2 * 0.5;
      this.scene.add(pillar);
    }

    this.buildCrocodile();
    this.buildStonePile();
    this.buildExitPortal();
    const circle = new THREE.CircleGeometry(1, 32);
    this.attackRing = new THREE.Mesh(circle, new THREE.MeshBasicMaterial({ color: '#f03746', transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false }));
    this.attackRing.rotation.x = -Math.PI / 2; this.attackRing.visible = false; this.scene.add(this.attackRing);
    this.lungeWarning = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.035, 1), new THREE.MeshBasicMaterial({ color: '#ff303e', transparent: true, opacity: 0.38, depthWrite: false }));
    this.lungeWarning.visible = false; this.scene.add(this.lungeWarning);
    this.camera.position.set(0, 12, -18);
    this.camera.lookAt(0, 0, 0);
  }

  private buildPlayer(color: string): ArenaAvatar {
    const group = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.65, 3, 6), bodyMaterial);
    body.position.y = 0.8; group.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshStandardMaterial({ color: '#f2c7a5', roughness: 1, flatShading: true }));
    head.position.set(0, 1.55, 0.04); group.add(head);
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.37, 0.35, 7), new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true }));
    hat.position.set(0, 1.86, 0.04); group.add(hat);
    return { group, bodyMaterial };
  }

  private buildCrocodile(): void {
    const model = populateCrocodileModel(this.monsterGroup, this.monsterTail);
    this.monsterMaterials.push(model.bodyMaterial);
    this.monsterLegs = model.legs;
    this.scene.add(this.monsterGroup);
  }

  private buildStonePile(): void {
    this.stonePile.position.set(ARENA_CONFIG.stonePile.x, 0, ARENA_CONFIG.stonePile.z);
    for (let index = 0; index < ARENA_CONFIG.stonePile.maxCount; index++) {
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), new THREE.MeshStandardMaterial({ color: index % 2 ? '#c9c2ae' : '#aba48f', roughness: 1, flatShading: true }));
      const angle = index * 2.399;
      stone.position.set(Math.cos(angle) * 0.65, 0.3 + index % 2 * 0.24, Math.sin(angle) * 0.65);
      this.stonePile.add(stone); this.pileStones.push(stone);
    }
    this.scene.add(this.stonePile);
  }

  private buildExitPortal(): void {
    const exit = new THREE.Group();
    exit.position.set(ARENA_CONFIG.exitPortal.x, 0, ARENA_CONFIG.exitPortal.z);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.14, 5, 18), new THREE.MeshStandardMaterial({ color: '#8de9b5', emissive: '#1b9d61', emissiveIntensity: 1.2, roughness: 0.4, flatShading: true }));
    ring.position.y = 1.45; exit.add(ring);
    const surface = new THREE.Mesh(new THREE.CircleGeometry(1.22, 16), new THREE.MeshBasicMaterial({ color: '#50bd88', transparent: true, opacity: 0.23, side: THREE.DoubleSide, depthWrite: false }));
    surface.position.set(0, 1.45, 0); exit.add(surface);
    ring.rotation.z = Math.PI / 2;
    surface.rotation.y = 0;
    this.scene.add(exit);
  }

  private onResize = (): void => {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
  };
}
