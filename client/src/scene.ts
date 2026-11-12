import * as THREE from 'three';
import type { CampfireCooking, FishCast, FishingState, HeldFish, PlayerSnapshot, StoneFlight, StoneSnapshot } from './network';
import { FISH_CONFIG, type FishSpeciesId } from '../../shared/fishConfig';
import { createFishModel } from './fishModels';
import { ChickenFlock } from './chickenFlock';
import { WORLD_CONFIG } from '../../shared/worldConfig';
import { Campfire } from './campfire';
import { WeatherEffects } from './weatherEffects';
import type { WeatherSnapshot } from '../../shared/weatherConfig';
import type { ChickenSnapshot } from '../../shared/chickenConfig';
import { PHOTOBOOTH_CONFIG } from './photobooth';
import { THEATER_SEATS, THEATER_SEAT_INTERACTION_RADIUS } from '../../shared/theaterSeats';
import { ferrisBottomSeat, ferrisSeatBottomDistance, ferrisSeatPose, FERRIS_BOTTOM_TOLERANCE, FERRIS_SEAT_CAPACITY } from '../../shared/playground';
import { Playground } from './playground';
import { animateCrocodileWalk, populateCrocodileModel } from './crocodileModel';

type CastRender = FishCast & { phase: 'casting' | 'floating' | 'reeling'; reelSeconds: number };
type RemoteSample = { time: number; x: number; z: number; facing: number; moving: boolean };
type Avatar = { group: THREE.Group; label: HTMLDivElement; renderedLabelMarkup: string; rod: THREE.Mesh; line: THREE.Line; bobber: THREE.Mesh; splash: THREE.Mesh[]; cast: CastRender | null; fishing: FishingState; reelActive: boolean; lineTaut: boolean; dragonBite: boolean; ferrisSeatIndex: number | null; ferrisSlot: number | null; ferrisRideStartedAt: number | null; ferrisExitQueued: boolean; samples: RemoteSample[]; targetX: number; targetZ: number; targetFacing: number; local: boolean; color: string; inPhotobooth: boolean; inUnderrun: boolean; blendOffsetX: number; blendOffsetZ: number; blendOffsetFacing: number; blendStartedAt: number; holdingFish: HeldFish | null; heldModel: THREE.Group | null; bodyParts: THREE.Object3D[]; hat: THREE.Mesh; crown: THREE.Group; crocodileRobe: THREE.Group; speaking: boolean; crocodilesSlain: number; seatedSeatId: string | null; hasPet: boolean };
type ChatBubble = { element: HTMLDivElement; expiresAt: number; fadeMs?: number };
type StoneVisual = { group: THREE.Group; state: StoneSnapshot['state']; x: number; z: number; color: string; carriedBy: string | null; flight: StoneFlight | null; respawnAt: number | null; splashStartedAt: number | null; splash: THREE.Mesh };
type BonkFx = { element: HTMLDivElement; startedAt: number };
type JukeboxParticle = { object: THREE.Sprite | THREE.Mesh; material: THREE.SpriteMaterial | THREE.MeshStandardMaterial; startedAt: number; duration: number; x: number; y: number; z: number; drift: number; wobble: number; phase: number; spin: number; sparkle: boolean };
type DanceVisual = { root: THREE.Group; note: THREE.Sprite; moving: boolean; phase: number; speed: number; blend: number };
type PetVisual = { group: THREE.Group; tail: THREE.Group; legs: THREE.Mesh[]; hopStartedAt: number | null; initialized: boolean };

export class GameScene {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 150);
  readonly renderer: THREE.WebGLRenderer;
  private readonly avatars = new Map<string, Avatar>();
  private readonly pets = new Map<string, PetVisual>();
  private readonly avatarDance = new Map<string, DanceVisual>();
  private readonly crocodileSlainCounts = new Map<string, number>();
  private readonly chatBubbles = new Map<string, ChatBubble[]>();
  private readonly eatBubbles = new Map<string, ChatBubble>();
  private readonly stones = new Map<string, StoneVisual>();
  private readonly theaterSeats = new Map<string, { group: THREE.Group; cushionMaterial: THREE.MeshStandardMaterial; marker: THREE.Mesh; occupiedBy: string | null }>();
  private readonly bonks = new Map<string, BonkFx>();
  private readonly labels: HTMLElement;
  private readonly stoneHint: HTMLDivElement;
  private readonly photoboothLabel: HTMLDivElement;
  private readonly jukeboxLabel: HTMLDivElement;
  private readonly jukeboxRoot = new THREE.Group();
  private readonly playground: Playground;
  private ferrisWheelStartedAt = Date.now();
  private readonly jukeboxModel = new THREE.Group();
  private readonly jukeboxParticles: JukeboxParticle[] = [];
  private readonly jukeboxReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private jukeboxNoteTexture!: THREE.CanvasTexture;
  private jukeboxPlaying = false;
  private localDanceBlocked = false;
  private jukeboxIntensity = 0;
  private jukeboxParticleSpawnAt = 0;
  private jukeboxGlow!: THREE.Mesh;
  private jukeboxGlowMaterial!: THREE.MeshBasicMaterial;
  private jukeboxGlowLight!: THREE.PointLight;
  private readonly ray = new THREE.Vector3();
  private readonly cameraOffset = new THREE.Vector3(0, 8.5, -11);
  private readonly crocodilePortal = new THREE.Group();
  private readonly crocodilePortalRing = new THREE.Group();
  private localId = '';
  private leaderboardLeader = '';
  private serverClockOffset = 0;
  private interpolationDelayMs: number = FISH_CONFIG.sync.interpolationDelayMs;
  private correctionCount = 0;
  private correctionX = 0;
  private correctionZ = 0;
  private correctionRemaining = 0;
  private interpolationUnderruns = 0;
  private island!: THREE.Group;
  private ambientLight!: THREE.HemisphereLight;
  private directionalLight!: THREE.DirectionalLight;
  private waterGeometry!: THREE.BufferGeometry;
  private waterMaterial!: THREE.MeshStandardMaterial;
  private firstPersonView = false;
  private photoboothCameraActive = false;
  private photoboothLogoReady: Promise<void> = Promise.resolve();
  private readonly photoboothCameraPosition = new THREE.Vector3(
    PHOTOBOOTH_CONFIG.position.x + PHOTOBOOTH_CONFIG.cameraOffset.x,
    PHOTOBOOTH_CONFIG.cameraOffset.y,
    PHOTOBOOTH_CONFIG.position.z + PHOTOBOOTH_CONFIG.cameraOffset.z,
  );
  private readonly photoboothCameraTarget = new THREE.Vector3(
    PHOTOBOOTH_CONFIG.position.x + PHOTOBOOTH_CONFIG.targetOffset.x,
    PHOTOBOOTH_CONFIG.targetOffset.y,
    PHOTOBOOTH_CONFIG.position.z + PHOTOBOOTH_CONFIG.targetOffset.z,
  );
  private heldFishClickHandler?: (playerId: string, catchId: string) => void;
  private readonly chickens: ChickenFlock;
  private readonly campfire: Campfire;
  private readonly weatherEffects: WeatherEffects;
  private theaterScreenMaterial!: THREE.MeshBasicMaterial;
  private theaterScreenMesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private theaterScreenBacking!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private theaterPlaceholderTexture!: THREE.CanvasTexture;
  private theaterTexture!: THREE.Texture;
  private theaterTextureSource: HTMLVideoElement | HTMLCanvasElement | null = null;
  private theaterScreenAspect = 16 / 9;
  private theaterPresenterLabel!: HTMLDivElement;
  private theaterGlow!: THREE.Mesh;
  private theaterGlowLight!: THREE.PointLight;
  private theaterPresenterActive = false;
  private theaterFocused = false;
  private theaterScreenVisible = false;
  private theaterVisibilityHandler?: (visible: boolean) => void;
  private readonly theaterFrustum = new THREE.Frustum();
  private readonly theaterProjectionView = new THREE.Matrix4();
  private readonly theaterScreenWorldPosition = new THREE.Vector3();
  private readonly theaterScreenLabelPosition = new THREE.Vector3(WORLD_CONFIG.theater.x + 0.3, 11.45, WORLD_CONFIG.theater.z);
  private readonly theaterOrientation = new THREE.PerspectiveCamera();
  private readonly theaterFocusPosition = new THREE.Vector3();
  private readonly theaterFocusTarget = new THREE.Vector3(WORLD_CONFIG.theater.x, 0, WORLD_CONFIG.theater.z);
  private theaterFocusFov = 45;
  private readonly theaterParallax = new THREE.Vector2();
  private theaterTransition: { fromPosition: THREE.Vector3; fromQuaternion: THREE.Quaternion; fromFov: number; startedAt: number; focusing: boolean } | null = null;

  constructor(container: HTMLElement, labels: HTMLElement) {
    this.labels = labels;
    this.stoneHint = document.createElement('div'); this.stoneHint.className = 'pebble-hint hidden';
    labels.appendChild(this.stoneHint);
    this.photoboothLabel = document.createElement('div');
    this.photoboothLabel.className = 'photobooth-world-label';
    this.photoboothLabel.textContent = 'Photobooth 📸';
    labels.appendChild(this.photoboothLabel);
    this.jukeboxLabel = document.createElement('div');
    this.jukeboxLabel.className = 'jukebox-world-label';
    this.jukeboxLabel.textContent = 'Jukebox';
    labels.appendChild(this.jukeboxLabel);
    this.theaterPresenterLabel = document.createElement('div');
    this.theaterPresenterLabel.className = 'theater-world-label hidden';
    labels.appendChild(this.theaterPresenterLabel);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    container.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color('#c6e5df');
    this.scene.fog = new THREE.Fog('#c6e5df', 38, 90);
    this.camera.position.set(0, 14, 18);
    this.camera.lookAt(0, 0, 0);
    this.buildWorld();
    this.playground = new Playground(this.scene);
    this.weatherEffects = new WeatherEffects(this.scene, this.ambientLight, this.directionalLight, this.waterGeometry, this.waterMaterial);
    this.chickens = new ChickenFlock(this.scene, this.labels);
    this.campfire = new Campfire(this.scene, this.labels);
    window.addEventListener('resize', this.onResize);
  }

  private material(color: string, roughness = 1): THREE.MeshStandardMaterial { return new THREE.MeshStandardMaterial({ color, roughness, flatShading: true }); }

  private buildWorld(): void {
    this.ambientLight = new THREE.HemisphereLight('#f4fff4', '#8aa69a', 2.15);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight('#fff6d9', 3.3);
    this.directionalLight.position.set(-12, 22, 10);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.set(2048, 2048);
    this.directionalLight.shadow.bias = -0.00015;
    this.directionalLight.shadow.normalBias = 0.035;
    this.directionalLight.shadow.radius = 3;
    this.directionalLight.shadow.camera.left = -46; this.directionalLight.shadow.camera.right = 46; this.directionalLight.shadow.camera.top = 46; this.directionalLight.shadow.camera.bottom = -46;
    this.directionalLight.shadow.camera.near = 1; this.directionalLight.shadow.camera.far = 60;
    this.scene.add(this.directionalLight);

    this.island = new THREE.Group();
    this.scene.add(this.island);
    this.crocodilePortal.position.set(WORLD_CONFIG.crocodilePortal.x, 0, WORLD_CONFIG.crocodilePortal.z);
    const portalPad = new THREE.Mesh(new THREE.CircleGeometry(2.25, 12), this.material('#5e6564'));
    portalPad.rotation.x = -Math.PI / 2; portalPad.position.y = 0.035; this.crocodilePortal.add(portalPad);
    const padRing = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.12, 5, 18), new THREE.MeshStandardMaterial({ color: '#70e8df', emissive: '#1ab8b6', emissiveIntensity: 1.4, roughness: 0.45, flatShading: true }));
    padRing.rotation.x = Math.PI / 2; padRing.position.y = 0.08; this.crocodilePortal.add(padRing);
    const portalSurface = new THREE.Mesh(new THREE.CircleGeometry(1.38, 16), new THREE.MeshBasicMaterial({ color: '#48d9d4', transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false }));
    portalSurface.position.set(0, 1.62, 0); this.crocodilePortalRing.add(portalSurface);
    const portalFrame = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.16, 6, 20), new THREE.MeshStandardMaterial({ color: '#97fff0', emissive: '#1ecbc3', emissiveIntensity: 1.8, roughness: 0.35, flatShading: true }));
    portalFrame.position.set(0, 1.62, 0); this.crocodilePortalRing.add(portalFrame);
    const portalBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.55, 0.32), this.material('#6b7370'));
    portalBase.position.set(-1.3, 0.32, 0); this.crocodilePortal.add(portalBase);
    const portalBaseRight = portalBase.clone(); portalBaseRight.position.x = 1.3; this.crocodilePortal.add(portalBaseRight);
    this.crocodilePortal.add(this.crocodilePortalRing);
    const portalLight = new THREE.PointLight('#45e3dd', 1.8, 9, 2);
    portalLight.position.set(0, 1.6, 0); this.crocodilePortal.add(portalLight);
    this.scene.add(this.crocodilePortal);
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(WORLD_CONFIG.groundRadius - 1, WORLD_CONFIG.groundRadius, 1.2, 20), this.material('#7fbd83'));
    ground.position.y = -0.62; ground.receiveShadow = true; ground.castShadow = true; this.island.add(ground);
    const top = new THREE.Mesh(new THREE.CircleGeometry(WORLD_CONFIG.grassRadius, 20), this.material('#a7d38e'));
    top.rotation.x = -Math.PI / 2; top.position.y = 0.015; top.receiveShadow = true; this.island.add(top);
    const shore = new THREE.Mesh(new THREE.CylinderGeometry(6.3, 6.6, 0.25, 12), this.material('#dfd09a'));
    shore.position.y = 0.08; shore.receiveShadow = true; this.island.add(shore);
    this.waterGeometry = new THREE.CircleGeometry(4.15, 16);
    this.waterMaterial = new THREE.MeshStandardMaterial({ color: '#5bb7c1', roughness: 0.82, metalness: 0, flatShading: true });
    const water = new THREE.Mesh(this.waterGeometry, this.waterMaterial);
    water.rotation.x = -Math.PI / 2; water.position.y = 0.23; this.island.add(water);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(4.23, 0.13, 4, 16), this.material('#e9ddaf'));
    rim.rotation.x = Math.PI / 2; rim.position.y = 0.19; this.island.add(rim);

    // A small ring of low-poly trees, stones, and flowers keeps the clearing open.
    const trees = WORLD_CONFIG.trees;
    for (const [x, z] of trees) this.addTree(x, z, 0.75 + Math.random() * 0.35);
    const rocks = WORLD_CONFIG.rocks;
    for (const [x,z] of rocks) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 + Math.random() * 0.4, 0), this.material('#9b9d80'));
      rock.position.set(x, 0.25, z); rock.scale.y = 0.62; rock.rotation.set(Math.random(), Math.random(), Math.random()); rock.castShadow = true; this.island.add(rock);
    }
    for (let i = 0; i < 15; i++) {
      const angle = i * 2.4;
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.12, 5, 4), this.material(i % 2 ? '#f4e9b0' : '#e99a91'));
      flower.position.set(Math.cos(angle) * (7.3 + i % 3), 0.18, Math.sin(angle) * (7.3 + i % 3)); this.island.add(flower);
    }
    for (const pebble of FISH_CONFIG.stones.pebbles) {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), this.material(pebble.color));
      base.scale.set(1, 0.65, 0.82); base.castShadow = true; group.add(base);
      const glint = new THREE.Mesh(new THREE.DodecahedronGeometry(0.105, 0), this.material('#fff8f0'));
      glint.position.set(0.08, 0.08, 0.12); group.add(glint);
      group.position.set(pebble.x, 0.18, pebble.z); this.scene.add(group);
      const splash = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 4, 12), new THREE.MeshBasicMaterial({ color: '#dffaff', transparent: true, opacity: 0 }));
      splash.rotation.x = Math.PI / 2; splash.visible = false; this.scene.add(splash);
      this.stones.set(pebble.id, { group, state: 'ground', x: pebble.x, z: pebble.z, color: pebble.color, carriedBy: null, flight: null, respawnAt: null, splashStartedAt: null, splash });
    }
    this.buildPhotobooth();
    this.buildJukebox();
    this.buildTheaterScreen();
    this.buildTheaterSeats();
  }

  private buildTheaterScreen(): void {
    const canvas = document.createElement('canvas');
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    canvas.width = innerWidth < 720 || deviceMemory !== undefined && deviceMemory <= 4 ? 1280 : 1920;
    canvas.height = Math.round(canvas.width * 9 / 16);
    const context = canvas.getContext('2d')!;
    context.fillStyle = '#19362d'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#d9eadb'; context.textAlign = 'center'; context.textBaseline = 'middle';
    context.font = `700 ${Math.round(canvas.width * 0.052)}px Trebuchet MS, Segoe UI, sans-serif`;
    context.fillText('NO ONE IS PRESENTING', canvas.width / 2, canvas.height / 2 - canvas.height * 0.035);
    context.fillStyle = '#99b9a3'; context.font = `500 ${Math.round(canvas.width * 0.026)}px Trebuchet MS, Segoe UI, sans-serif`;
    context.fillText('Theater screen', canvas.width / 2, canvas.height / 2 + canvas.height * 0.085);
    this.theaterPlaceholderTexture = new THREE.CanvasTexture(canvas);
    this.theaterPlaceholderTexture.colorSpace = THREE.SRGBColorSpace;
    this.theaterTexture = this.theaterPlaceholderTexture;
    this.theaterScreenMaterial = new THREE.MeshBasicMaterial({ map: this.theaterPlaceholderTexture, toneMapped: false, fog: false });

    const structure = new THREE.Group();
    structure.position.set(WORLD_CONFIG.theater.x, 0.015, WORLD_CONFIG.theater.z);
    structure.rotation.set(0, WORLD_CONFIG.theater.rotationY, 0);
    const frameMaterial = this.material('#39584c');
    const width = WORLD_CONFIG.theater.width;
    const height = WORLD_CONFIG.theater.height;
    const bottomClearance = 1.0;
    const centerY = bottomClearance + height / 2;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(width + 0.5, height + 0.5, 0.32), frameMaterial);
    frame.position.set(0, centerY, -0.2); frame.castShadow = true; structure.add(frame);
    this.theaterScreenBacking = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ color: '#101b17', fog: false }));
    this.theaterScreenBacking.position.set(0, centerY, -0.02); structure.add(this.theaterScreenBacking);
    this.theaterScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), this.theaterScreenMaterial);
    this.theaterScreenMesh.position.set(0, centerY, 0.015); structure.add(this.theaterScreenMesh);
    const postHeight = centerY + height / 2 + 0.25;
    for (const x of [-(width / 2 + 0.42), width / 2 + 0.42]) {
      const support = new THREE.Mesh(new THREE.BoxGeometry(0.32, postHeight, 0.4), frameMaterial);
      support.position.set(x, postHeight / 2, -0.2); support.castShadow = true; structure.add(support);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.24, 0.9), frameMaterial);
      foot.position.set(x, 0.12, -0.14); foot.castShadow = true; structure.add(foot);
    }
    const header = new THREE.Mesh(new THREE.BoxGeometry(width + 0.5, 0.24, 0.38), this.material('#547768'));
    header.position.set(0, centerY + height / 2 + 0.14, -0.2); header.castShadow = true; structure.add(header);
    this.scene.add(structure);

    this.theaterGlow = new THREE.Mesh(new THREE.CircleGeometry(5.2, 20), new THREE.MeshBasicMaterial({ color: '#70d9ac', transparent: true, opacity: 0.11, depthWrite: false, side: THREE.DoubleSide }));
    this.theaterGlow.rotation.x = -Math.PI / 2;
    this.theaterGlow.position.set(WORLD_CONFIG.theater.x + 4.4, 0.04, WORLD_CONFIG.theater.z);
    this.theaterGlow.visible = false;
    this.scene.add(this.theaterGlow);
    this.theaterGlowLight = new THREE.PointLight('#8beac0', 0, 12, 2);
    this.theaterGlowLight.position.set(WORLD_CONFIG.theater.x + 1.9, 2.4, WORLD_CONFIG.theater.z);
    this.scene.add(this.theaterGlowLight);
  }

  private buildTheaterSeats(): void {
    const wood = this.material('#805b42');
    const occupiedMaterial = new THREE.MeshStandardMaterial({ color: '#e4b65c', emissive: '#8a5a13', emissiveIntensity: 0.5, flatShading: true });
    for (const seat of THEATER_SEATS) {
      const cushion = this.material('#668b73');
      const group = new THREE.Group();
      group.position.set(seat.x, 0, seat.z);
      group.rotation.y = seat.rotationY;
      const legs = new THREE.BoxGeometry(0.12, 0.58, 0.12);
      for (const x of [-0.34, 0.34]) for (const z of [-0.31, 0.31]) {
        const leg = new THREE.Mesh(legs, wood);
        leg.position.set(x, 0.29, z);
        leg.castShadow = true;
        group.add(leg);
      }
      const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.18, 0.82), cushion);
      seatBase.position.set(0, 0.62, 0);
      seatBase.castShadow = true;
      seatBase.receiveShadow = true;
      group.add(seatBase);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.9, 0.18), wood);
      back.position.set(0, 1.12, -0.34);
      back.castShadow = true;
      group.add(back);
      const backInset = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.05), cushion);
      backInset.position.set(0, 1.12, -0.23);
      group.add(backInset);
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.105, 6, 5), occupiedMaterial);
      marker.position.set(0, 1.7, -0.38);
      marker.visible = false;
      group.add(marker);
      group.traverse((part) => { if (part instanceof THREE.Mesh) part.castShadow = true; });
      this.scene.add(group);
      this.theaterSeats.set(seat.id, { group, cushionMaterial: cushion, marker, occupiedBy: null });
    }
  }

  setSeatOccupancy(occupancy: Record<string, string>): void {
    for (const [seatId, visual] of this.theaterSeats) {
      visual.occupiedBy = occupancy[seatId] ?? null;
      visual.cushionMaterial.color.set(visual.occupiedBy ? '#9b7750' : '#668b73');
      visual.marker.visible = Boolean(visual.occupiedBy);
    }
    for (const [playerId, avatar] of this.avatars) {
      const seatId = Object.entries(occupancy).find(([, occupantId]) => occupantId === playerId)?.[0] ?? null;
      this.setAvatarSeat(avatar, seatId);
    }
  }

  private setAvatarSeat(avatar: Avatar, seatId: string | null): void {
    const previousSeat = avatar.seatedSeatId ? THEATER_SEATS.find((entry) => entry.id === avatar.seatedSeatId) : null;
    avatar.seatedSeatId = seatId;
    avatar.group.scale.y = seatId ? 0.82 : 1;
    avatar.samples.length = 0;
    if (!seatId) {
      if (previousSeat) {
        avatar.group.position.set(previousSeat.x, 0, previousSeat.z);
        avatar.targetX = avatar.group.position.x;
        avatar.targetZ = avatar.group.position.z;
        avatar.targetFacing = previousSeat.rotationY;
        avatar.group.rotation.y = previousSeat.rotationY;
      }
      return;
    }
    const seat = THEATER_SEATS.find((entry) => entry.id === seatId);
    if (!seat) return;
    avatar.group.position.set(seat.x, 0, seat.z);
    avatar.targetX = seat.x;
    avatar.targetZ = seat.z;
    avatar.targetFacing = seat.rotationY;
    avatar.group.rotation.y = seat.rotationY;
  }

  setLocalSeat(seatId: string | null): void {
    const local = this.avatars.get(this.localId);
    if (local) this.setAvatarSeat(local, seatId);
  }

  get seatedSeatId(): string | null { return this.avatars.get(this.localId)?.seatedSeatId ?? null; }

  nearbySeatId(): string | null {
    const position = this.getPosition();
    let best: { id: string; distance: number } | null = null;
    for (const seat of THEATER_SEATS) {
      if (this.isSeatOccupied(seat.id)) continue;
      const distance = Math.hypot(position.x - seat.x, position.z - seat.z);
      if (distance <= THEATER_SEAT_INTERACTION_RADIUS && (!best || distance < best.distance)) best = { id: seat.id, distance };
    }
    return best?.id ?? null;
  }

  isSeatOccupied(seatId: string): boolean { return Boolean(this.theaterSeats.get(seatId)?.occupiedBy); }

  setTheaterDisplay(video: HTMLVideoElement | null, canvas: HTMLCanvasElement | null, refreshCanvas = false): void {
    const source = video ?? canvas;
    const aspect = video?.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight
      : canvas?.width && canvas.height ? canvas.width / canvas.height : 16 / 9;
    if (source === this.theaterTextureSource) {
      if (refreshCanvas && source && this.theaterTexture instanceof THREE.CanvasTexture) this.theaterTexture.needsUpdate = true;
      this.fitTheaterScreen(aspect);
      return;
    }
    if (this.theaterTexture !== this.theaterPlaceholderTexture) this.theaterTexture.dispose();
    this.theaterTextureSource = source;
    if (video) {
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      this.theaterTexture = texture;
    } else if (canvas) {
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      this.theaterTexture = texture;
    } else {
      this.theaterTexture = this.theaterPlaceholderTexture;
    }
    this.fitTheaterScreen(aspect);
    this.theaterScreenMaterial.map = this.theaterTexture;
    this.theaterScreenMaterial.needsUpdate = true;
  }

  private fitTheaterScreen(aspect: number): void {
    if (Math.abs(this.theaterScreenAspect - aspect) < 0.001) return;
    this.theaterScreenAspect = aspect;
    const maxWidth = WORLD_CONFIG.theater.width, maxHeight = WORLD_CONFIG.theater.height;
    const width = Math.min(maxWidth, maxHeight * aspect);
    const height = Math.min(maxHeight, maxWidth / aspect);
    this.theaterScreenMesh.geometry.dispose();
    this.theaterScreenMesh.geometry = new THREE.PlaneGeometry(width, height);
  }

  setTheaterPresenter(name: string | null): void {
    this.theaterPresenterActive = Boolean(name);
    this.theaterPresenterLabel.textContent = name ? `${name} is presenting` : '';
    this.theaterPresenterLabel.classList.toggle('hidden', !name);
    this.theaterGlow.visible = Boolean(name);
    this.theaterGlowLight.intensity = name ? 0.7 : 0;
  }

  setTheaterFocus(focused: boolean): void {
    if (focused === this.theaterFocused) return;
    this.theaterFocused = focused;
    if (!focused) this.theaterParallax.set(0, 0);
    this.theaterTransition = {
      fromPosition: this.camera.position.clone(),
      fromQuaternion: this.camera.quaternion.clone(),
      fromFov: this.camera.fov,
      startedAt: performance.now(),
      focusing: focused,
    };
  }

  setTheaterParallax(x: number, y: number): void {
    this.theaterParallax.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
  }

  private focusedCameraPose(): { position: THREE.Vector3; quaternion: THREE.Quaternion; fov: number } {
    this.theaterScreenMesh.updateWorldMatrix(true, false);
    this.theaterScreenMesh.getWorldPosition(this.theaterFocusTarget);
    const frontSeat = THEATER_SEATS.find((seat) => seat.id === this.seatedSeatId);
    const viewerX = frontSeat?.x ?? this.getPosition().x;
    const verticalFov = THREE.MathUtils.degToRad(70);
    const aspect = Math.max(0.25, this.camera.aspect);
    const { width, height } = this.theaterScreenMesh.geometry.parameters;
    const fitDistance = Math.max(height / 2, width / (2 * aspect)) / Math.tan(verticalFov / 2) * 1.1;
    const seatDistance = Math.max(0, viewerX - this.theaterFocusTarget.x);
    const distance = Math.max(fitDistance, seatDistance);
    this.theaterFocusPosition.set(this.theaterFocusTarget.x + distance, this.theaterFocusTarget.y + this.theaterParallax.y * 0.12, this.theaterFocusTarget.z - this.theaterParallax.x * 0.18);
    this.theaterOrientation.position.copy(this.theaterFocusPosition);
    this.theaterOrientation.up.set(0, 1, 0);
    this.theaterOrientation.lookAt(this.theaterFocusTarget);
    this.theaterFocusFov = 70;
    return { position: this.theaterFocusPosition, quaternion: this.theaterOrientation.quaternion, fov: this.theaterFocusFov };
  }

  private normalCameraPose(local: Avatar): { position: THREE.Vector3; quaternion: THREE.Quaternion; fov: number } {
    const position = new THREE.Vector3();
    let target: THREE.Vector3;
    if (this.photoboothCameraActive) {
      position.copy(this.photoboothCameraPosition);
      target = this.photoboothCameraTarget;
    } else if (this.firstPersonView) {
      position.copy(local.group.localToWorld(new THREE.Vector3(0, 1.56, 0.02)));
      const facing = local.group.rotation.y;
      target = new THREE.Vector3(position.x + Math.sin(facing) * 10, position.y - 0.12, position.z + Math.cos(facing) * 10);
    } else if (local.ferrisSeatIndex !== null) {
      position.set(local.group.position.x, local.group.position.y + 7.5, local.group.position.z - 10);
      target = new THREE.Vector3(local.group.position.x, local.group.position.y + 0.9, local.group.position.z);
    } else {
      position.copy(local.group.localToWorld(this.cameraOffset.clone()));
      const halfWidth = WORLD_CONFIG.theater.width / 2 + 0.65;
      if (Math.abs(position.z - WORLD_CONFIG.theater.z) < halfWidth && position.y < 10 && position.y > 0.5 && position.x < WORLD_CONFIG.theater.x + 0.7) {
        position.x = WORLD_CONFIG.theater.x + 0.7;
      }
      target = new THREE.Vector3(local.group.position.x, local.ferrisSeatIndex === null ? 0.8 : local.group.position.y + 0.8, local.group.position.z);
    }
    if (!this.photoboothCameraActive && !this.theaterFocused) {
      const maxRadius = WORLD_CONFIG.groundRadius - 1;
      const radius = Math.hypot(position.x, position.z);
      if (radius > maxRadius) { position.x *= maxRadius / radius; position.z *= maxRadius / radius; }
    }
    this.theaterOrientation.position.copy(position);
    this.theaterOrientation.up.set(0, 1, 0);
    this.theaterOrientation.lookAt(target);
    return { position, quaternion: this.theaterOrientation.quaternion, fov: 45 };
  }

  private updateTheaterCamera(local: Avatar, now: number, deltaSeconds: number): void {
    if (this.theaterFocused || this.theaterTransition?.focusing) {
      const pose = this.focusedCameraPose();
      if (this.theaterTransition) {
        const amount = Math.max(0, Math.min(1, (now - this.theaterTransition.startedAt) / 500));
        const eased = amount * amount * (3 - 2 * amount);
        this.camera.position.copy(this.theaterTransition.fromPosition).lerp(pose.position, eased);
        this.camera.quaternion.copy(this.theaterTransition.fromQuaternion).slerp(pose.quaternion, eased);
        this.camera.fov = THREE.MathUtils.lerp(this.theaterTransition.fromFov, pose.fov, eased);
        if (amount >= 1) this.theaterTransition = null;
      } else {
        this.camera.position.copy(pose.position);
        this.camera.quaternion.copy(pose.quaternion);
        this.camera.fov = pose.fov;
      }
      this.camera.updateProjectionMatrix();
      return;
    }

    const pose = this.normalCameraPose(local);
    if (this.theaterTransition) {
      const amount = Math.max(0, Math.min(1, (now - this.theaterTransition.startedAt) / 500));
      const eased = amount * amount * (3 - 2 * amount);
      this.camera.position.copy(this.theaterTransition.fromPosition).lerp(pose.position, eased);
      this.camera.quaternion.copy(this.theaterTransition.fromQuaternion).slerp(pose.quaternion, eased);
      this.camera.fov = THREE.MathUtils.lerp(this.theaterTransition.fromFov, pose.fov, eased);
      if (amount >= 1) this.theaterTransition = null;
    } else {
      const damping = 1 - Math.exp(-8 * Math.max(0, deltaSeconds));
      this.camera.position.lerp(pose.position, damping);
      this.camera.quaternion.slerp(pose.quaternion, damping);
      this.camera.fov = pose.fov;
    }
    this.camera.updateProjectionMatrix();
  }

  setTheaterVisibilityHandler(handler: (visible: boolean) => void): void {
    this.theaterVisibilityHandler = handler;
    handler(this.theaterScreenVisible);
  }

  private buildJukebox(): void {
    this.jukeboxRoot.position.set(WORLD_CONFIG.jukebox.x, 0.14, WORLD_CONFIG.jukebox.z);
    this.scene.add(this.jukeboxRoot);
    this.jukeboxModel.position.y = -0.14;
    this.jukeboxRoot.add(this.jukeboxModel);
    const dark = this.material('#3d5148');
    const body = this.material('#9b5b3e');
    const brass = this.material('#e3bb68');
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.28, 0.9), dark);
    base.position.y = 0.14; base.castShadow = true; base.receiveShadow = true; this.jukeboxModel.add(base);
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.12, 1.65, 0.72), body);
    cabinet.position.y = 1.08; cabinet.castShadow = true; cabinet.receiveShadow = true; this.jukeboxModel.add(cabinet);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.42, 8), body);
    crown.position.y = 2.08; crown.scale.z = 0.65; crown.castShadow = true; this.jukeboxModel.add(crown);
    const speaker = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.5, 0.06), dark);
    speaker.position.set(0, 1.5, 0.39); this.jukeboxModel.add(speaker);
    const speakerGrill = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.06, 8), brass);
    speakerGrill.rotation.x = Math.PI / 2; speakerGrill.position.set(0, 1.5, 0.44); this.jukeboxModel.add(speakerGrill);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.19, 0.06), brass);
    screen.position.set(0, 0.94, 0.39); this.jukeboxModel.add(screen);
    const dial = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), brass);
    dial.position.set(0, 0.63, 0.41); this.jukeboxModel.add(dial);
    for (const x of [-0.38, 0.38]) {
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 5, 4), brass);
      knob.position.set(x, 0.63, 0.41); this.jukeboxModel.add(knob);
    }

    this.jukeboxGlowMaterial = new THREE.MeshBasicMaterial({ color: '#b8f1d8', transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    this.jukeboxGlow = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.72, 12), this.jukeboxGlowMaterial);
    this.jukeboxGlow.rotation.x = -Math.PI / 2;
    this.jukeboxGlow.position.y = -0.13;
    this.jukeboxRoot.add(this.jukeboxGlow);
    this.jukeboxGlowLight = new THREE.PointLight('#b8f1d8', 0, 3.2, 2);
    this.jukeboxGlowLight.position.set(0, -0.05, 0);
    this.jukeboxRoot.add(this.jukeboxGlowLight);
    this.createJukeboxParticles();
  }

  setJukeboxPlaying(playing: boolean): void {
    this.jukeboxPlaying = playing;
    this.jukeboxLabel.textContent = playing ? '♫ Jukebox · now playing' : 'Jukebox';
  }

  setLocalDanceBlocked(blocked: boolean): void { this.localDanceBlocked = blocked; }

  private createJukeboxParticles(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#fff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = 'bold 52px Georgia, serif';
      context.fillText('♪', 32, 34);
    }
    this.jukeboxNoteTexture = new THREE.CanvasTexture(canvas);
    const colors = ['#a8ead1', '#f4b8cb', '#f4dc8c', '#a8d7f0'];
    for (let index = 0; index < 20; index++) {
      const material = new THREE.SpriteMaterial({ map: this.jukeboxNoteTexture, color: colors[index % colors.length], transparent: true, opacity: 0, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      sprite.visible = false;
      this.scene.add(sprite);
      this.jukeboxParticles.push({ object: sprite, material, startedAt: 0, duration: 2, x: 0, y: 0, z: 0, drift: 0, wobble: 0, phase: 0, spin: 0, sparkle: false });
    }
    const sparkleGeometry = new THREE.OctahedronGeometry(0.055, 0);
    for (let index = 0; index < 6; index++) {
      const material = new THREE.MeshStandardMaterial({ color: colors[index % colors.length], emissive: colors[index % colors.length], emissiveIntensity: 0.3, transparent: true, opacity: 0, roughness: 0.7, depthWrite: false });
      const star = new THREE.Mesh(sparkleGeometry, material);
      star.visible = false;
      this.scene.add(star);
      this.jukeboxParticles.push({ object: star, material, startedAt: 0, duration: 0.9, x: 0, y: 0, z: 0, drift: 0, wobble: 0, phase: 0, spin: 0, sparkle: true });
    }
  }

  private spawnJukeboxParticle(now: number, sparkle: boolean): void {
    const particle = this.jukeboxParticles.find((entry) => entry.sparkle === sparkle && !entry.object.visible);
    if (!particle) return;
    particle.startedAt = now;
    particle.duration = sparkle ? 0.75 + Math.random() * 0.5 : 1.8 + Math.random() * 0.4;
    particle.x = WORLD_CONFIG.jukebox.x + (Math.random() - 0.5) * 0.9;
    particle.y = 2.45 + Math.random() * 0.28;
    particle.z = WORLD_CONFIG.jukebox.z + (Math.random() - 0.5) * 0.5;
    particle.drift = (Math.random() - 0.5) * 0.7;
    particle.wobble = 0.08 + Math.random() * 0.12;
    particle.phase = Math.random() * Math.PI * 2;
    particle.spin = (Math.random() - 0.5) * 1.3;
    particle.object.visible = true;
  }

  private updateJukeboxEffect(deltaSeconds: number, now: number): void {
    const distance = this.camera.position.distanceTo(this.jukeboxRoot.position);
    const reduced = this.jukeboxReduceMotion.matches;
    const target = this.jukeboxPlaying && !reduced && distance <= 40 ? 1 : 0;
    const easingSeconds = target > this.jukeboxIntensity ? 0.18 : 0.1;
    this.jukeboxIntensity += (target - this.jukeboxIntensity) * (1 - Math.exp(-deltaSeconds / easingSeconds));
    const phase = now * 0.0065;
    this.jukeboxRoot.rotation.z = Math.sin(phase) * 0.09 * this.jukeboxIntensity;
    this.jukeboxRoot.rotation.y = Math.sin(phase * 0.5) * 0.018 * this.jukeboxIntensity;
    this.jukeboxRoot.position.y = 0.14 + Math.sin(phase * 2) * 0.025 * this.jukeboxIntensity;
    const squash = Math.sin(phase * 2 + 0.5) * 0.012 * this.jukeboxIntensity;
    this.jukeboxModel.scale.set(1 + squash * 0.35, 1 + squash, 1 + squash * 0.35);
    const pulse = (0.5 + 0.5 * Math.sin(now * 0.004)) * this.jukeboxIntensity;
    this.jukeboxGlowMaterial.opacity = pulse * 0.24;
    this.jukeboxGlow.scale.setScalar(0.92 + pulse * 0.12);
    this.jukeboxGlowLight.intensity = pulse * 0.8;

    if (this.jukeboxPlaying && target > 0 && now >= this.jukeboxParticleSpawnAt) {
      this.spawnJukeboxParticle(now, false);
      if (Math.random() < 0.45) this.spawnJukeboxParticle(now, true);
      this.jukeboxParticleSpawnAt = now + 300;
    }
    for (const particle of this.jukeboxParticles) {
      if (!particle.object.visible) continue;
      const age = Math.max(0, (now - particle.startedAt) / 1000);
      const progress = age / particle.duration;
      if (progress >= 1 || this.jukeboxIntensity < 0.01) {
        particle.object.visible = false;
        continue;
      }
      const envelope = Math.sin(Math.PI * progress);
      particle.object.position.set(
        particle.x + particle.drift * progress + Math.sin(progress * 7 + particle.phase) * particle.wobble,
        particle.y + progress * (particle.sparkle ? 0.55 : 1.35),
        particle.z + Math.sin(progress * 5 + particle.phase) * 0.09,
      );
      particle.object.rotation.z += particle.spin * deltaSeconds;
      const fade = envelope * this.jukeboxIntensity;
      particle.material.opacity = fade;
      const size = particle.sparkle ? 0.55 + envelope * 0.55 : 0.9 - progress * 0.35;
      particle.object.scale.setScalar(size * this.jukeboxIntensity);
    }
  }

  private buildPhotobooth(): void {
    const booth = new THREE.Group();
    booth.position.set(PHOTOBOOTH_CONFIG.position.x, 0, PHOTOBOOTH_CONFIG.position.z);
    this.scene.add(booth);

    const platform = new THREE.Mesh(new THREE.BoxGeometry(PHOTOBOOTH_CONFIG.stageWidth, 0.3, PHOTOBOOTH_CONFIG.stageDepth), this.material('#b98b6e'));
    platform.position.y = 0.15; platform.receiveShadow = true; platform.castShadow = true; booth.add(platform);
    const inset = new THREE.Mesh(new THREE.BoxGeometry(PHOTOBOOTH_CONFIG.stageWidth - 0.4, 0.08, PHOTOBOOTH_CONFIG.stageDepth - 0.4), this.material('#d9b39b'));
    inset.position.y = 0.32; inset.receiveShadow = true; booth.add(inset);
    const rug = new THREE.Mesh(new THREE.CylinderGeometry(2.65, 2.65, 0.055, 12), this.material('#9c7084'));
    rug.position.set(0, 0.38, 0.45); rug.receiveShadow = true; booth.add(rug);

    const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(6.25, 3.65), this.material('#e4ead6'));
    backdrop.position.set(0, 2.15, -3.32); backdrop.receiveShadow = true; booth.add(backdrop);
    const timber = this.material('#8c684f');
    for (const x of [-3.22, 3.22]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.22, 4.05, 0.28), timber);
      post.position.set(x, 2.02, -3.36); post.castShadow = true; booth.add(post);
    }
    const header = new THREE.Mesh(new THREE.BoxGeometry(6.65, 0.24, 0.32), timber);
    header.position.set(0, 4.03, -3.36); header.castShadow = true; booth.add(header);
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.5, 0.12), this.material('#f4e7cf'));
    plaque.position.set(0, 4.38, -3.34); plaque.castShadow = true; booth.add(plaque);

    const fallback = this.makePhotoboothPlaceholderTexture();
    const logoMaterial = new THREE.MeshBasicMaterial({ map: fallback, transparent: true, side: THREE.DoubleSide, toneMapped: false });
    const logoGeometry = new THREE.PlaneGeometry(3.8, 3.8 / PHOTOBOOTH_CONFIG.logoAspect);
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 2.75, -3.12); booth.add(logo);
    this.photoboothLogoReady = new Promise((resolve) => {
      new THREE.TextureLoader().load(PHOTOBOOTH_CONFIG.logoPath, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(this.renderer.capabilities.getMaxAnisotropy(), 8);
        const image = texture.image as { width?: number; height?: number };
        const aspect = image.width && image.height ? image.width / image.height : PHOTOBOOTH_CONFIG.logoAspect;
        logo.geometry.dispose();
        logo.geometry = new THREE.PlaneGeometry(3.8, 3.8 / aspect);
        logoMaterial.map = texture;
        logoMaterial.needsUpdate = true;
        fallback.dispose();
        resolve();
      }, undefined, () => {
        // Keep the canvas-texture LOGO plate if the supplied image is unavailable.
        resolve();
      });
    });

    const tripod = new THREE.Group();
    tripod.position.set(2.55, 0, 3.85);
    booth.add(tripod);
    const legMaterial = this.material('#735b4b');
    const legTop = new THREE.Vector3(0, 1.22, 0);
    for (const [x, z] of [[-0.42, 0.42], [0.42, 0.42], [0, -0.48]]) {
      const foot = new THREE.Vector3(x, 0.08, z);
      const delta = foot.clone().sub(legTop);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, delta.length(), 5), legMaterial);
      leg.position.copy(foot).add(legTop).multiplyScalar(0.5);
      leg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
      leg.castShadow = true; tripod.add(leg);
    }
    const cameraBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.48, 0.46), this.material('#51675f'));
    cameraBody.position.set(0, 1.45, 0); cameraBody.castShadow = true; tripod.add(cameraBody);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.28, 8), this.material('#718b80'));
    lens.rotation.x = -Math.PI / 2; lens.position.set(0, 1.45, -0.34); lens.castShadow = true; tripod.add(lens);
    const cameraTop = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.22), this.material('#d5bd8b'));
    cameraTop.position.set(-0.12, 1.77, 0); cameraTop.castShadow = true; tripod.add(cameraTop);
  }

  private makePhotoboothPlaceholderTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas'); canvas.width = 566; canvas.height = 100;
    const context = canvas.getContext('2d')!;
    context.fillStyle = 'rgba(255,255,255,.94)'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#284d43'; context.font = '800 54px Trebuchet MS, Segoe UI, sans-serif';
    context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillText('LOGO', canvas.width / 2, canvas.height / 2 + 2);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
  }

  private addTree(x: number, z: number, scale: number): void {
    const group = new THREE.Group(); group.position.set(x, 0, z); group.scale.setScalar(scale);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 1.35, 6), this.material('#90694a'));
    trunk.position.y = 0.67; trunk.castShadow = true; group.add(trunk);
    const foliage = new THREE.Mesh(new THREE.ConeGeometry(1.15, 2.5, 7), this.material('#4f9972'));
    foliage.position.y = 2.05; foliage.castShadow = true; group.add(foliage);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.82, 1.8, 7), this.material('#68ad7b'));
    crown.position.y = 2.85; crown.castShadow = true; group.add(crown);
    this.island.add(group);
  }

  private makeAvatar(player: PlayerSnapshot, local: boolean): Avatar {
    const group = new THREE.Group();
    const visualRoot = new THREE.Group();
    group.add(visualRoot);
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.65, 3, 6), this.material(player.color));
    body.position.y = 0.8; body.castShadow = true; body.visible = !local || !this.firstPersonView; visualRoot.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), this.material('#f2c7a5'));
    head.position.set(0, 1.55, 0.04); head.castShadow = true; head.visible = !local || !this.firstPersonView; visualRoot.add(head);
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.37, 0.35, 7), this.material(player.color));
    hat.position.set(0, 1.86, 0.04); hat.castShadow = true; hat.visible = !local || !this.firstPersonView; visualRoot.add(hat);
    const crown = this.createCrown();
    crown.visible = false; visualRoot.add(crown);
    const crocodileRobe = this.createCrocodileRobe();
    crocodileRobe.visible = false; visualRoot.add(crocodileRobe);
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), this.material('#344b45'));
    face.position.set(0.11, 1.57, 0.31); face.visible = !local || !this.firstPersonView; visualRoot.add(face);

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 1.25, 5), this.material('#765b40'));
    rod.position.set(0.48, 1.2, 0.18); rod.rotation.z = -0.42; rod.visible = false; visualRoot.add(rod);
    const noteColors = ['#a8ead1', '#f4b8cb', '#f4dc8c', '#a8d7f0'];
    const danceNote = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.jukeboxNoteTexture, color: noteColors[Math.floor(Math.random() * noteColors.length)], transparent: true, opacity: 0, depthWrite: false }));
    danceNote.position.set(0, 2.32, 0);
    danceNote.scale.set(0.22, 0.22, 1);
    danceNote.visible = false;
    visualRoot.add(danceNote);
    const linePoints = Array.from({ length: 7 }, () => new THREE.Vector3());
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePoints), new THREE.LineBasicMaterial({ color: '#f8f4dc' }));
    line.visible = false; this.scene.add(line);
    const bobber = new THREE.Mesh(new THREE.SphereGeometry(0.14, 7, 5), this.material('#f2745d'));
    bobber.visible = false; this.scene.add(bobber);
    const splash = Array.from({ length: 3 }, () => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.035, 4, 12), new THREE.MeshBasicMaterial({ color: '#dffaff', transparent: true, opacity: 0 }));
      ring.rotation.x = Math.PI / 2; ring.visible = false; this.scene.add(ring); return ring;
    });
    const label = document.createElement('div'); label.className = `name-label${local ? ' self' : ''}`; label.dataset.name = player.name;
    label.addEventListener('click', (event) => {
      const chip = (event.target as HTMLElement).closest<HTMLButtonElement>('.held-fish-chip');
      const catchId = chip?.dataset.catchId;
      if (catchId) this.heldFishClickHandler?.(player.id, catchId);
    });
    this.labels.appendChild(label);
    const crocodilesSlain = Math.max(this.crocodileSlainCounts.get(player.id) ?? 0, player.crocodilesSlain ?? 0);
    this.crocodileSlainCounts.set(player.id, crocodilesSlain);
    const avatar: Avatar = { group, label, renderedLabelMarkup: '', rod, line, bobber, splash, cast: null, fishing: player.fishing, reelActive: player.fishing === 'fighting', lineTaut: player.fishing === 'fighting', dragonBite: false, ferrisSeatIndex: player.ferrisSeatIndex ?? null, ferrisSlot: player.ferrisSlot ?? null, ferrisRideStartedAt: player.ferrisRideStartedAt ?? null, ferrisExitQueued: player.ferrisExitQueued ?? false, samples: [], targetX: player.x, targetZ: player.z, targetFacing: player.facing, local, color: player.color, inPhotobooth: player.inPhotobooth ?? false, inUnderrun: false, blendOffsetX: 0, blendOffsetZ: 0, blendOffsetFacing: 0, blendStartedAt: 0, holdingFish: null, heldModel: null, bodyParts: [body, head, hat, face, crown, crocodileRobe, danceNote], hat, crown, crocodileRobe, speaking: false, crocodilesSlain, seatedSeatId: null, hasPet: player.hasPet };
    this.avatarDance.set(player.id, { root: visualRoot, note: danceNote, moving: player.moving, phase: Math.random() * Math.PI * 2, speed: 0.9 + Math.random() * 0.2, blend: 0 });
    group.position.set(player.x, 0, player.z);
    this.scene.add(group); this.avatars.set(player.id, avatar); this.setFishing(player.id, player.fishing);
    this.updateLeaderAppearance(avatar);
    this.updateCrocodileRobeAppearance();
    this.syncPet(player.id, player.hasPet);
    if (player.holdingFish) this.setHoldingFish(player.id, player.holdingFish);
    return avatar;
  }

  setLocalId(id: string): void { this.localId = id; }

  setFirstPersonView(enabled: boolean): void {
    this.firstPersonView = enabled;
    const local = this.avatars.get(this.localId);
    if (local) {
      for (const part of local.bodyParts) part.visible = !enabled;
      this.updateLeaderAppearance(local);
    }
    this.updateCrocodileRobeAppearance();
  }

  private syncPet(ownerId: string, hasPet: boolean): void {
    if (!hasPet) {
      this.removePet(ownerId);
      return;
    }
    if (this.pets.has(ownerId)) return;
    const group = new THREE.Group();
    const tail = new THREE.Group();
    const model = populateCrocodileModel(group, tail);
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.1, 5, 12),
      this.material('#e5b13a', 0.72),
    );
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.64, 1.28);
    group.add(collar);
    group.scale.setScalar(0.2);
    this.scene.add(group);
    this.pets.set(ownerId, { group, tail, legs: model.legs, hopStartedAt: null, initialized: false });
  }

  private removePet(ownerId: string): void {
    const pet = this.pets.get(ownerId);
    if (!pet) return;
    this.scene.remove(pet.group);
    pet.group.traverse((part) => {
      if (!(part instanceof THREE.Mesh)) return;
      part.geometry.dispose();
      const materials = Array.isArray(part.material) ? part.material : [part.material];
      for (const material of materials) material.dispose();
    });
    this.pets.delete(ownerId);
  }

  private updatePet(ownerId: string, owner: Avatar, now: number, deltaSeconds: number): void {
    if (!owner.hasPet) return;
    const pet = this.pets.get(ownerId);
    if (!pet) return;
    const facing = owner.group.rotation.y;
    const targetX = owner.group.position.x - Math.sin(facing) * 1.5;
    const targetZ = owner.group.position.z - Math.cos(facing) * 1.5;
    if (!pet.initialized) {
      pet.group.position.set(targetX, 0, targetZ);
      pet.group.rotation.y = facing;
      pet.initialized = true;
    }
    const dx = targetX - pet.group.position.x;
    const dz = targetZ - pet.group.position.z;
    const distance = Math.hypot(dx, dz);
    if (distance > 15) {
      pet.group.position.set(targetX, 0, targetZ);
      pet.group.rotation.y = facing;
    } else {
      const pondX = owner.cast?.targetX ?? owner.group.position.x + Math.sin(facing);
      const pondZ = owner.cast?.targetZ ?? owner.group.position.z + Math.cos(facing);
      if (distance > 1.5) {
        const step = Math.min(distance, FISH_CONFIG.movement.maxSpeed * 0.82 * Math.max(0, deltaSeconds));
        pet.group.position.lerp(new THREE.Vector3(targetX, pet.group.position.y, targetZ), step / distance);
        const faceAngle = owner.fishing === 'idle' ? Math.atan2(dx, dz) : Math.atan2(pondX - pet.group.position.x, pondZ - pet.group.position.z);
        pet.group.rotation.y += this.angleDelta(pet.group.rotation.y, faceAngle) * Math.min(1, deltaSeconds * 8);
        animateCrocodileWalk(pet.legs, now, true);
      } else {
        animateCrocodileWalk(pet.legs, now, false);
        if (owner.fishing !== 'idle') pet.group.rotation.y += this.angleDelta(
          pet.group.rotation.y,
          Math.atan2(pondX - pet.group.position.x, pondZ - pet.group.position.z),
        ) * Math.min(1, deltaSeconds * 5);
        else pet.group.rotation.y += this.angleDelta(pet.group.rotation.y, facing) * Math.min(1, deltaSeconds * 3);
      }
    }
    const idleBob = Math.sin(now * 0.004 + owner.group.position.x) * 0.025;
    let hop = 0;
    if (pet.hopStartedAt !== null) {
      const progress = (performance.now() - pet.hopStartedAt) / 420;
      if (progress >= 1) pet.hopStartedAt = null;
      else hop = Math.sin(progress * Math.PI) * 0.38;
    }
    pet.group.position.y = idleBob + hop;
    pet.tail.rotation.x = Math.sin(now * 0.0025) * 0.09;
  }

  petHop(ownerId: string): void {
    const pet = this.pets.get(ownerId);
    if (pet) pet.hopStartedAt = performance.now();
  }

  setPhotoboothMode(active: boolean): void {
    this.photoboothCameraActive = active;
    if (active) {
      const local = this.avatars.get(this.localId);
      if (local) {
        local.targetFacing = 0;
        local.group.rotation.y = 0;
        for (const part of local.bodyParts) part.visible = true;
      }
      this.updateCrocodileRobeAppearance();
    } else this.setFirstPersonView(this.firstPersonView);
  }

  setPhotoboothState(id: string, active: boolean): void {
    const avatar = this.avatars.get(id); if (!avatar) return;
    avatar.inPhotobooth = active;
  }

  setCrocodileSlainCount(id: string, count: number): void {
    const total = Math.max(this.crocodileSlainCounts.get(id) ?? 0, Math.floor(count));
    this.crocodileSlainCounts.set(id, total);
    const avatar = this.avatars.get(id);
    if (avatar && avatar.crocodilesSlain !== total) {
      avatar.crocodilesSlain = total;
      avatar.renderedLabelMarkup = '';
    }
    this.updateCrocodileRobeAppearance();
  }

  setFastestSlayer(playerId: string | null): void {
    for (const [id, avatar] of this.avatars) {
      const hasPet = id === playerId;
      if (avatar.hasPet === hasPet) continue;
      avatar.hasPet = hasPet;
      avatar.renderedLabelMarkup = '';
      this.syncPet(id, hasPet);
    }
  }

  photoboothNamePoint(id: string): { x: number; y: number } | null {
    const avatar = this.avatars.get(id); if (!avatar) return null;
    const point = avatar.group.localToWorld(new THREE.Vector3(0, 2.25, 0)).project(this.camera);
    if (point.z > 1 || Math.abs(point.x) > 1 || Math.abs(point.y) > 1) return null;
    return { x: point.x * 0.5 + 0.5, y: -point.y * 0.5 + 0.5 };
  }

  async preparePhotoboothCapture(): Promise<void> {
    await this.photoboothLogoReady;
    if (this.photoboothCameraActive) {
      this.camera.position.copy(this.photoboothCameraPosition);
      this.camera.lookAt(this.photoboothCameraTarget);
      this.camera.updateMatrixWorld();
    }
  }

  setLeaderboardLeader(playerName: string | null): void {
    this.leaderboardLeader = playerName?.trim().toLocaleLowerCase() ?? '';
    for (const avatar of this.avatars.values()) this.updateLeaderAppearance(avatar);
  }

  private updateLeaderAppearance(avatar: Avatar): void {
    const isLeader = this.leaderboardLeader !== '' && avatar.label.dataset.name?.toLocaleLowerCase() === this.leaderboardLeader;
    const visible = !avatar.local || !this.firstPersonView;
    avatar.hat.visible = !isLeader && visible;
    avatar.crown.visible = isLeader && visible;
  }

  private updateCrocodileRobeAppearance(): void {
    let highestCount = 0;
    for (const count of this.crocodileSlainCounts.values()) highestCount = Math.max(highestCount, count);
    for (const avatar of this.avatars.values()) {
      const isTopSlayer = highestCount > 0 && avatar.crocodilesSlain === highestCount;
      avatar.crocodileRobe.visible = isTopSlayer && (!avatar.local || !this.firstPersonView);
    }
  }

  private createCrown(): THREE.Group {
    const crown = new THREE.Group();
    const gold = this.material('#e5b13a', 0.72);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.255, 0.31, 0.14, 8), gold);
    band.position.y = 1.87; band.castShadow = true; crown.add(band);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.027, 4, 8), gold);
    rim.rotation.x = Math.PI / 2; rim.position.y = 1.94; rim.castShadow = true; crown.add(rim);
    for (let index = 0; index < 5; index++) {
      const angle = index / 5 * Math.PI * 2;
      const point = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.2, 4), gold);
      point.position.set(Math.cos(angle) * 0.21, 2.015, Math.sin(angle) * 0.21);
      point.castShadow = true; crown.add(point);
    }
    const gem = new THREE.Mesh(new THREE.DodecahedronGeometry(0.055, 0), this.material('#e87962', 0.6));
    gem.position.set(0, 1.88, 0.29); crown.add(gem);
    return crown;
  }

  private createCrocodileRobe(): THREE.Group {
    const robe = new THREE.Group();
    const cloth = this.material('#315a48');
    const gold = this.material('#d8b45c', 0.72);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.56, 1.3, 7, 1, true), cloth);
    body.position.y = 0.68; body.castShadow = true; body.receiveShadow = true; robe.add(body);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.415, 0.035, 3, 7), gold);
    collar.rotation.x = Math.PI / 2; collar.position.y = 1.28; collar.castShadow = true; robe.add(collar);
    const hem = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 3, 7), gold);
    hem.rotation.x = Math.PI / 2; hem.position.y = 0.07; hem.castShadow = true; robe.add(hem);
    const crest = new THREE.Mesh(new THREE.OctahedronGeometry(0.105, 0), gold);
    crest.position.set(0, 1.03, 0.48); crest.scale.set(1, 1.2, 0.55); crest.castShadow = true; robe.add(crest);
    return robe;
  }

  setHeldFishClickHandler(handler: (playerId: string, catchId: string) => void): void { this.heldFishClickHandler = handler; }

  hitChicken(message: { chickenId: string; startTime: number }): void {
    this.chickens.hit(message);
  }

  setChickens(chickens: ChickenSnapshot[], serverTime: number): void { this.chickens.setSnapshots(chickens, serverTime); }

  setCampfireCooking(cooking: CampfireCooking | null): void { this.campfire.setCooking(cooking); }

  setWeather(weather: WeatherSnapshot): void {
    this.weatherEffects.setWeather(weather, Date.now() + this.serverClockOffset);
  }

  finishCampfireCooking(cookId: string): void {
    if (this.campfire.activeCookId === cookId) this.campfire.setCooking(null);
  }

  heldFish(playerId: string): HeldFish | null { return this.avatars.get(playerId)?.holdingFish ?? null; }
  playerName(playerId: string): string { return this.avatars.get(playerId)?.label.dataset.name ?? 'Pond friend'; }
  setVoiceSpeaking(playerId: string, speaking: boolean): void {
    const avatar = this.avatars.get(playerId);
    if (avatar) {
      avatar.speaking = speaking;
      avatar.label.dataset.speaking = String(speaking);
    }
  }

  setServerClockOffset(offsetMs: number): void { this.serverClockOffset = offsetMs; }
  setFerrisWheelStartedAt(startedAt: number): void { this.ferrisWheelStartedAt = startedAt; }
  get isFerrisRiding(): boolean { return (this.avatars.get(this.localId)?.ferrisSeatIndex ?? null) !== null; }
  get ferrisExitQueued(): boolean { return this.avatars.get(this.localId)?.ferrisExitQueued ?? false; }
  get ferrisBoardingReady(): boolean {
    const now = Date.now() + this.serverClockOffset;
    const seat = ferrisBottomSeat(this.ferrisWheelStartedAt, now);
    if (ferrisSeatBottomDistance(seat, this.ferrisWheelStartedAt, now) > FERRIS_BOTTOM_TOLERANCE) return false;
    return [...this.avatars.values()].filter((avatar) => avatar.ferrisSeatIndex === seat).length < FERRIS_SEAT_CAPACITY;
  }

  private applyFerrisSeatPose(avatar: Avatar, now: number): void {
    if (avatar.ferrisSeatIndex === null || avatar.ferrisSlot === null || avatar.ferrisRideStartedAt === null) {
      avatar.group.scale.y = avatar.seatedSeatId ? 0.82 : 1;
      return;
    }
    const pose = ferrisSeatPose(avatar.ferrisSeatIndex, avatar.ferrisSlot, this.ferrisWheelStartedAt, now);
    avatar.group.position.set(pose.x, pose.y - 0.42, pose.z);
    avatar.group.rotation.y = pose.angle + Math.PI / 2;
    avatar.group.rotation.z = 0;
    avatar.group.scale.y = 0.84;
  }

  setInterpolationDelay(delayMs: number): void {
    this.interpolationDelayMs = Math.max(FISH_CONFIG.sync.interpolationDelayMinMs,
      Math.min(FISH_CONFIG.sync.interpolationDelayMaxMs, delayMs));
  }

  noteCorrection(): void { this.correctionCount += 1; }

  syncDiagnostics(): { bufferDepth: number; interpolationDelayMs: number; corrections: number; underruns: number } {
    let bufferDepth = 0;
    for (const avatar of this.avatars.values()) if (!avatar.local) bufferDepth += avatar.samples.length;
    return { bufferDepth, interpolationDelayMs: Math.round(this.interpolationDelayMs), corrections: this.correctionCount, underruns: this.interpolationUnderruns };
  }

  upsert(player: PlayerSnapshot, serverTime = Date.now() + this.serverClockOffset): void {
    let avatar = this.avatars.get(player.id);
    if (!avatar) avatar = this.makeAvatar(player, player.id === this.localId);
    if (avatar.local) {
      // Local position and facing are owned by prediction; snapshots only update gameplay state.
    } else {
      avatar.targetX = player.x; avatar.targetZ = player.z; avatar.targetFacing = player.facing;
      const last = avatar.samples[avatar.samples.length - 1];
      if (!last || serverTime > last.time) {
        avatar.samples.push({ time: serverTime, x: player.x, z: player.z, facing: player.facing, moving: player.moving });
        if (avatar.samples.length > FISH_CONFIG.sync.snapshotBufferLimit) avatar.samples.shift();
      } else if (serverTime === last.time) {
        last.x = player.x; last.z = player.z; last.facing = player.facing; last.moving = player.moving;
      }
    }
    const crocodilesSlain = Math.max(this.crocodileSlainCounts.get(player.id) ?? 0, player.crocodilesSlain ?? 0);
    this.crocodileSlainCounts.set(player.id, crocodilesSlain);
    if (avatar.crocodilesSlain !== crocodilesSlain) {
      avatar.crocodilesSlain = crocodilesSlain;
      avatar.renderedLabelMarkup = '';
      this.updateCrocodileRobeAppearance();
    }
    avatar.fishing = player.fishing;
    avatar.hasPet = player.hasPet;
    this.syncPet(player.id, player.hasPet);
    avatar.ferrisSeatIndex = player.ferrisSeatIndex ?? null;
    avatar.ferrisSlot = player.ferrisSlot ?? null;
    avatar.ferrisRideStartedAt = player.ferrisRideStartedAt ?? null;
    avatar.ferrisExitQueued = player.ferrisExitQueued ?? false;
    const dance = this.avatarDance.get(player.id);
    if (dance) dance.moving = player.moving;
    if (player.seatedSeatId !== undefined && player.seatedSeatId !== avatar.seatedSeatId) this.setAvatarSeat(avatar, player.seatedSeatId);
    this.setPhotoboothState(player.id, player.inPhotobooth ?? false);
    if (player.holdingFish !== undefined) this.setHoldingFish(player.id, player.holdingFish);
    avatar.reelActive = player.fishing === 'fighting';
    if (avatar.reelActive) avatar.lineTaut = true;
    if (player.cast) {
      if (!avatar.cast || avatar.cast.startTime !== player.cast.startTime) this.startCast(player.id, player.cast);
      avatar.fishing = player.fishing;
      if (player.fishing === 'reeling' && avatar.cast?.phase !== 'reeling') {
        this.startReel(player.id, player.cast.reelStartedAt ?? Date.now(), FISH_CONFIG.cast.reelSeconds);
      }
    } else if (avatar.cast?.phase !== 'reeling') {
      this.clearCast(avatar);
    }
  }

  addLocal(player: PlayerSnapshot): void {
    this.localId = player.id;
    const avatar = this.makeAvatar(player, true);
    avatar.group.position.set(player.x, 0, player.z);
    this.camera.position.copy(avatar.group.localToWorld(this.cameraOffset.clone()));
    this.camera.lookAt(avatar.group.position.x, 0.8, avatar.group.position.z);
  }

  setFishing(id: string, state: FishingState): void {
    const avatar = this.avatars.get(id); if (!avatar) return;
    avatar.fishing = state;
    avatar.rod.visible = state !== 'idle';
  }

  cancelFishing(id: string): void {
    const avatar = this.avatars.get(id); if (!avatar) return;
    avatar.reelActive = false;
    avatar.lineTaut = false;
    this.clearCast(avatar);
  }

  setHoldingFish(id: string, fish: HeldFish | null): void {
    const avatar = this.avatars.get(id); if (!avatar) return;
    if (avatar.holdingFish?.catchId === fish?.catchId) return;
    if (avatar.heldModel) {
      this.avatarDance.get(id)?.root.remove(avatar.heldModel);
      this.disposeFishModel(avatar.heldModel);
      avatar.heldModel = null;
    }
    avatar.holdingFish = fish;
    if (!fish) return;
    const model = createFishModel(fish.species, fish.weightKg);
    const species = FISH_CONFIG.species.find((entry) => entry.id === fish.species)!;
    const weightScale = Math.cbrt(Math.max(0.01, fish.weightKg) / species.medianKg);
    // Slightly amplify the cube-root size difference so lighter/heavier catches read clearly in-world.
    model.scale.setScalar(Math.max(0.6, Math.min(1.6, 1 + (weightScale - 1) * 1.8)));
    model.position.set(0.34, 1.12, 0.4);
    model.rotation.y = 0.12;
    this.avatarDance.get(id)?.root.add(model);
    avatar.heldModel = model;
  }

  private disposeFishModel(model: THREE.Group): void {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    model.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        geometries.add(node.geometry);
        for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
      }
    });
    for (const geometry of geometries) geometry.dispose();
    for (const material of materials) material.dispose();
  }

  startCast(id: string, cast: FishCast): void {
    const avatar = this.avatars.get(id); if (!avatar) return;
    avatar.cast = { ...cast, phase: 'casting', reelSeconds: FISH_CONFIG.cast.reelSeconds };
    avatar.fishing = 'casting';
    if (!avatar.local) {
      avatar.targetX = cast.startX; avatar.targetZ = cast.startZ;
      avatar.group.position.x = cast.startX; avatar.group.position.z = cast.startZ;
      avatar.targetFacing = cast.facing;
    }
    avatar.rod.visible = true; avatar.line.visible = true; avatar.bobber.visible = true;
  }

  showBite(id: string): void { const avatar = this.avatars.get(id); if (avatar) avatar.fishing = 'bite'; }

  setDragonBite(id: string, active: boolean): void {
    const avatar = this.avatars.get(id);
    if (!avatar) return;
    avatar.dragonBite = active;
    const material = avatar.bobber.material as THREE.MeshStandardMaterial;
    material.emissive.set(active ? '#d9a13b' : '#000000');
    material.emissiveIntensity = active ? 0.9 : 0;
    for (const ring of avatar.splash) (ring.material as THREE.MeshBasicMaterial).color.set(active ? '#e5c16c' : '#dffaff');
  }

  setReelActive(id: string, active: boolean): void {
    const avatar = this.avatars.get(id); if (!avatar) return;
    avatar.reelActive = active;
    avatar.lineTaut = active;
  }

  setLineTaut(id: string, taut: boolean): void {
    const avatar = this.avatars.get(id); if (avatar?.reelActive) avatar.lineTaut = taut;
  }

  setStones(snapshots: StoneSnapshot[]): void {
    for (const snapshot of snapshots) {
      const stone = this.stones.get(snapshot.id);
      if (!stone) continue;
      stone.x = snapshot.x; stone.z = snapshot.z; stone.state = snapshot.state;
      stone.carriedBy = snapshot.carriedBy; stone.flight = snapshot.flight; stone.respawnAt = snapshot.respawnAt;
    }
  }

  pickStone(stoneId: string, playerId: string): void {
    const stone = this.stones.get(stoneId); if (!stone) return;
    stone.state = 'carried'; stone.carriedBy = playerId; stone.flight = null; stone.respawnAt = null;
  }

  throwStone(message: { stoneId: string; fromId: string; targetId: string | null } & StoneFlight): void {
    const stone = this.stones.get(message.stoneId); if (!stone) return;
    stone.state = 'flying'; stone.carriedBy = null; stone.flight = message; stone.respawnAt = null;
  }

  landStone(message: { stoneId: string; position: { x: number; z: number }; water: boolean }): void {
    const stone = this.stones.get(message.stoneId); if (!stone) return;
    stone.x = message.position.x; stone.z = message.position.z; stone.flight = null; stone.carriedBy = null;
    stone.state = message.water ? 'respawning' : 'ground';
    stone.respawnAt = message.water ? Date.now() + FISH_CONFIG.stones.respawnDelayMs : null;
    stone.splashStartedAt = message.water ? Date.now() : null;
  }

  respawnStone(stoneId: string, position: { x: number; z: number }): void {
    const stone = this.stones.get(stoneId); if (!stone) return;
    stone.x = position.x; stone.z = position.z; stone.state = 'ground'; stone.flight = null; stone.carriedBy = null; stone.respawnAt = null;
  }

  showBonk(playerId: string): void {
    const avatar = this.avatars.get(playerId); if (!avatar) return;
    let fx = this.bonks.get(playerId);
    if (!fx) {
      const element = document.createElement('div'); element.className = 'bonk-puff'; element.textContent = '✦';
      this.labels.appendChild(element); fx = { element, startedAt: 0 }; this.bonks.set(playerId, fx);
    }
    fx.startedAt = performance.now();
  }

  carryingStoneId(playerId = this.localId): string | null {
    return [...this.stones].find(([, stone]) => stone.state === 'carried' && stone.carriedBy === playerId)?.[0] ?? null;
  }

  nearbyStoneId(playerId = this.localId): string | null {
    const avatar = this.avatars.get(playerId); if (!avatar || this.carryingStoneId(playerId)) return null;
    let nearest: { id: string; distance: number } | null = null;
    for (const [id, stone] of this.stones) {
      if (stone.state !== 'ground') continue;
      const distance = Math.hypot(stone.x - avatar.group.position.x, stone.z - avatar.group.position.z);
      if (distance <= FISH_CONFIG.stones.pickupRange && (!nearest || distance < nearest.distance)) nearest = { id, distance };
    }
    return nearest?.id ?? null;
  }

  startReel(id: string, startTime: number, duration: number = FISH_CONFIG.cast.reelSeconds): void {
    const avatar = this.avatars.get(id); if (!avatar?.cast) return;
    this.setDragonBite(id, false);
    avatar.cast.phase = 'reeling'; avatar.cast.reelStartedAt = startTime; avatar.cast.reelSeconds = duration;
    avatar.fishing = 'reeling';
  }

  private clearCast(avatar: Avatar): void {
    avatar.cast = null; avatar.fishing = 'idle';
    avatar.rod.visible = false; avatar.line.visible = false; avatar.bobber.visible = false;
    for (const ring of avatar.splash) ring.visible = false;
  }

  private castRodTip(cast: FishCast): THREE.Vector3 {
    const localX = 0.9, localZ = 0.2;
    const c = Math.cos(cast.facing), s = Math.sin(cast.facing);
    return new THREE.Vector3(cast.startX + c * localX + s * localZ, 1.72, cast.startZ - s * localX + c * localZ);
  }

  private rodTip(avatar: Avatar): THREE.Vector3 {
    return avatar.group.localToWorld(new THREE.Vector3(0.9, 1.72, 0.2));
  }

  private renderCast(avatar: Avatar, now: number): void {
    const cast = avatar.cast;
    if (!cast) return;
    const flightMs = cast.flightSeconds * 1000;
    const landingTime = cast.startTime + flightMs;
    const distance = Math.hypot(cast.targetX - cast.startX, cast.targetZ - cast.startZ);
    const surfaceY = FISH_CONFIG.pond.waterY + FISH_CONFIG.cast.floatHeight;
    const start = this.castRodTip(cast);
    const target = new THREE.Vector3(cast.targetX, surfaceY, cast.targetZ);
    let bobPosition: THREE.Vector3;
    let lineStart = cast.phase === 'casting' ? start : this.rodTip(avatar);

    if (cast.phase === 'casting' && now < landingTime) {
      const t = Math.max(0, Math.min(1, (now - cast.startTime) / flightMs));
      const eased = 1 - (1 - t) * (1 - t);
      bobPosition = start.clone().lerp(target, eased);
      const apex = Math.min(FISH_CONFIG.cast.maxApexHeight, distance * FISH_CONFIG.cast.apexDistanceFactor);
      bobPosition.y = surfaceY + (start.y - surfaceY) * (1 - t) + 4 * apex * t * (1 - t);
    } else if (cast.phase === 'reeling') {
      const reelStartedAt = cast.reelStartedAt ?? now;
      const t = Math.max(0, Math.min(1, (now - reelStartedAt) / (cast.reelSeconds * 1000)));
      const eased = t * t * (3 - 2 * t);
      bobPosition = target.clone().lerp(this.rodTip(avatar), eased);
      bobPosition.y += Math.sin(Math.PI * t) * 0.75;
      if (t >= 1) { this.clearCast(avatar); return; }
    } else {
      cast.phase = 'floating';
      lineStart = this.rodTip(avatar);
      const amplitude = avatar.fishing === 'bite' ? FISH_CONFIG.cast.floatAmplitude * 2.1 : FISH_CONFIG.cast.floatAmplitude;
      bobPosition = target.clone();
      bobPosition.y += Math.sin((now - landingTime) * (Math.PI * 2 / FISH_CONFIG.cast.floatPeriodMs)) * amplitude;
    }

    avatar.bobber.visible = true;
    avatar.line.visible = true;
    avatar.bobber.position.copy(bobPosition);
    const positions = avatar.line.geometry.attributes.position as THREE.BufferAttribute;
    const sag = avatar.reelActive ? (avatar.lineTaut ? 0.025 : 0.21) : cast.phase === 'floating' ? 0.13 : 0.035;
    for (let i = 0; i < positions.count; i++) {
      const amount = i / (positions.count - 1);
      const point = lineStart.clone().lerp(bobPosition, amount);
      point.y -= sag * Math.sin(Math.PI * amount);
      positions.setXYZ(i, point.x, point.y, point.z);
    }
    positions.needsUpdate = true;
    avatar.line.geometry.computeBoundingSphere();

    const splashElapsed = (now - landingTime) / 1000;
    for (let i = 0; i < avatar.splash.length; i++) {
      const ring = avatar.splash[i];
      if (avatar.dragonBite && cast.phase !== 'reeling') {
        const phase = ((now / 1200 + i / avatar.splash.length) % 1 + 1) % 1;
        ring.visible = true;
        ring.position.set(cast.targetX, FISH_CONFIG.pond.waterY + 0.025, cast.targetZ);
        ring.scale.setScalar(0.45 + phase * 1.65);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - phase);
        continue;
      }
      const phase = Math.max(0, Math.min(1, (splashElapsed - i * 0.12) / FISH_CONFIG.pond.splashSeconds));
      const visible = splashElapsed >= i * 0.12 && phase < 1 && cast.phase !== 'reeling';
      ring.visible = visible;
      if (visible) {
        ring.position.set(cast.targetX, FISH_CONFIG.pond.waterY + 0.025, cast.targetZ);
        ring.scale.setScalar(0.35 + phase * 1.7);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.72 * (1 - phase);
      }
    }
  }

  remove(id: string): void {
    const avatar = this.avatars.get(id);
    if (avatar) {
      if (avatar.heldModel) this.disposeFishModel(avatar.heldModel);
      this.scene.remove(avatar.group, avatar.line, avatar.bobber, ...avatar.splash);
      this.avatarDance.get(id)?.note.material.dispose();
      this.avatarDance.delete(id);
      avatar.label.remove(); this.avatars.delete(id);
    }
    this.removePet(id);
    for (const bubble of this.chatBubbles.get(id) ?? []) bubble.element.remove();
    this.chatBubbles.delete(id);
    this.eatBubbles.get(id)?.element.remove();
    this.eatBubbles.delete(id);
    this.bonks.get(id)?.element.remove();
    this.bonks.delete(id);
    this.updateCrocodileRobeAppearance();
  }
  clearPlayers(): void { this.setSeatOccupancy({}); for (const id of [...this.avatars.keys()]) this.remove(id); this.localId = ''; this.crocodileSlainCounts.clear(); this.updateCrocodileRobeAppearance(); }
  getPosition(): THREE.Vector3 { const avatar = this.avatars.get(this.localId); return avatar?.group.position ?? new THREE.Vector3(); }
  setPosition(x: number, z: number): void { const avatar = this.avatars.get(this.localId); if (avatar) { avatar.group.position.x = x; avatar.group.position.z = z; } }
  setLocalMotion(x: number, z: number, rotY: number): void {
    const avatar = this.avatars.get(this.localId); if (!avatar) return;
    const dance = this.avatarDance.get(this.localId);
    if (dance) dance.moving = Math.hypot(x - avatar.group.position.x, z - avatar.group.position.z) > 0.001;
    avatar.group.position.x = x; avatar.group.position.z = z;
    avatar.targetFacing = Math.atan2(Math.sin(rotY), Math.cos(rotY));
    avatar.group.rotation.y = avatar.targetFacing;
  }
  applyCorrection(x: number, z: number): void {
    const avatar = this.avatars.get(this.localId); if (!avatar) return;
    this.correctionCount += 1;
    const dx = x - avatar.group.position.x, dz = z - avatar.group.position.z;
    if (Math.hypot(dx, dz) > FISH_CONFIG.sync.hardCorrectionDistance) {
      avatar.group.position.x = x; avatar.group.position.z = z;
      this.correctionX = 0; this.correctionZ = 0; this.correctionRemaining = 0;
    } else {
      this.correctionX = dx; this.correctionZ = dz;
      this.correctionRemaining = FISH_CONFIG.sync.correctionBlendMs / 1000;
    }
  }
  stepCorrection(deltaSeconds: number): void {
    const avatar = this.avatars.get(this.localId);
    if (!avatar || this.correctionRemaining <= 0) return;
    const amount = Math.min(1, deltaSeconds / this.correctionRemaining);
    avatar.group.position.x += this.correctionX * amount;
    avatar.group.position.z += this.correctionZ * amount;
    this.correctionX *= 1 - amount; this.correctionZ *= 1 - amount;
    this.correctionRemaining = Math.max(0, this.correctionRemaining - deltaSeconds);
  }
  face(directionX: number, directionZ: number): void {
    const avatar = this.avatars.get(this.localId);
    if (avatar && Math.hypot(directionX, directionZ) > 0.01) {
      avatar.targetFacing = Math.atan2(directionX, directionZ);
      avatar.group.rotation.y = avatar.targetFacing;
    }
  }
  turnLocal(radians: number): void {
    const avatar = this.avatars.get(this.localId); if (!avatar) return;
    avatar.targetFacing = Math.atan2(Math.sin(avatar.targetFacing + radians), Math.cos(avatar.targetFacing + radians));
    avatar.group.rotation.y = avatar.targetFacing;
  }
  localFacing(): number { return this.avatars.get(this.localId)?.targetFacing ?? 0; }
  private interpolateRemote(avatar: Avatar, renderTime: number): void {
    const samples = avatar.samples;
    if (!samples.length) return;
    let nextIndex = samples.findIndex((sample) => sample.time >= renderTime);
    let x: number, z: number, facing: number;
    if (nextIndex === 0) {
      const first = samples[0];
      x = first.x; z = first.z; facing = first.facing;
    } else if (nextIndex > 0) {
      const left = samples[nextIndex - 1], right = samples[nextIndex];
      const amount = Math.max(0, Math.min(1, (renderTime - left.time) / Math.max(1, right.time - left.time)));
      x = left.x + (right.x - left.x) * amount;
      z = left.z + (right.z - left.z) * amount;
      facing = left.facing + this.angleDelta(left.facing, right.facing) * amount;
    } else {
      const last = samples[samples.length - 1], before = samples[samples.length - 2];
      const extra = before ? Math.min(FISH_CONFIG.sync.maxExtrapolationMs, Math.max(0, renderTime - last.time)) : 0;
      if (before && last.moving && last.time > before.time) {
        const factor = extra / (last.time - before.time);
        x = last.x + (last.x - before.x) * factor;
        z = last.z + (last.z - before.z) * factor;
        facing = last.facing + this.angleDelta(before.facing, last.facing) * factor;
      } else {
        x = last.x; z = last.z; facing = last.facing;
      }
    }

    const last = samples[samples.length - 1];
    const underrun = renderTime > last.time + FISH_CONFIG.sync.maxExtrapolationMs;
    if (underrun && !avatar.inUnderrun) this.interpolationUnderruns += 1;
    if (!underrun && avatar.inUnderrun) {
      avatar.blendOffsetX = avatar.group.position.x - x;
      avatar.blendOffsetZ = avatar.group.position.z - z;
      avatar.blendOffsetFacing = this.angleDelta(facing, avatar.group.rotation.y);
      avatar.blendStartedAt = performance.now();
    }
    avatar.inUnderrun = underrun;
    if (!underrun && avatar.blendStartedAt) {
      const progress = Math.min(1, (performance.now() - avatar.blendStartedAt) / 120);
      const remaining = 1 - progress;
      x += avatar.blendOffsetX * remaining;
      z += avatar.blendOffsetZ * remaining;
      facing += avatar.blendOffsetFacing * remaining;
      if (progress >= 1) avatar.blendStartedAt = 0;
    }
    avatar.group.position.set(x, 0, z);
    avatar.group.rotation.y = facing;
    while (samples.length > 2 && samples[1].time < renderTime) samples.shift();
  }

  fishingState(): FishingState { return this.avatars.get(this.localId)?.fishing ?? 'idle'; }
  playerCount(): number { return this.avatars.size; }
  mapPlayers(): { id: string; x: number; z: number; facing: number; color: string; name: string; fishing: boolean; local: boolean }[] {
    return [...this.avatars.entries()].map(([id, avatar]) => ({
      id,
      x: avatar.group.position.x,
      z: avatar.group.position.z,
      facing: avatar.local ? avatar.targetFacing : avatar.group.rotation.y,
      color: avatar.color,
      name: avatar.label.dataset.name ?? '',
      fishing: avatar.fishing !== 'idle',
      local: avatar.local,
    }));
  }

  showChatBubble(id: string, text: string): void {
    if (!this.avatars.has(id)) return;
    const now = performance.now();
    const bubbles = this.chatBubbles.get(id) ?? [];
    for (const bubble of bubbles) bubble.expiresAt = Math.min(bubble.expiresAt, now + 1800);

    const element = document.createElement('div');
    element.className = `speech-bubble${id === this.localId ? ' mine' : ''}`;
    element.textContent = text;
    this.labels.appendChild(element);
    const duration = 4000 + Math.min(text.length, 240) / 240 * 2000;
    bubbles.push({ element, expiresAt: now + duration, fadeMs: 650 });
    while (bubbles.length > 3) bubbles.shift()!.element.remove();
    this.chatBubbles.set(id, bubbles);
  }

  showEatBubble(id: string, speciesName: string): void {
    if (!this.avatars.has(id)) return;
    let bubble = this.eatBubbles.get(id);
    if (!bubble) {
      const element = document.createElement('div');
      element.className = 'eat-bubble';
      this.labels.appendChild(element);
      bubble = { element, expiresAt: 0 };
      this.eatBubbles.set(id, bubble);
    }
    bubble.element.textContent = `Yummy! ${speciesName} 🍲`;
    bubble.expiresAt = performance.now() + 3600;
  }

  private updateTheaterLabel(): void {
    if (!this.theaterPresenterActive) { this.theaterPresenterLabel.classList.add('hidden'); return; }
    this.ray.copy(this.theaterScreenLabelPosition).project(this.camera);
    this.theaterPresenterLabel.style.left = `${Math.round((this.ray.x * 0.5 + 0.5) * innerWidth)}px`;
    this.theaterPresenterLabel.style.top = `${Math.round((-this.ray.y * 0.5 + 0.5) * innerHeight)}px`;
    this.theaterPresenterLabel.classList.toggle('hidden', this.ray.z < -1 || this.ray.z > 1 || Math.abs(this.ray.x) > 1.1 || Math.abs(this.ray.y) > 1.1);
  }

  private updateTheaterScreenVisibility(): void {
    this.theaterScreenMesh.updateWorldMatrix(true, false);
    this.theaterProjectionView.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.theaterFrustum.setFromProjectionMatrix(this.theaterProjectionView);
    this.theaterScreenMesh.getWorldPosition(this.theaterScreenWorldPosition);
    const visible = this.camera.position.distanceTo(this.theaterScreenWorldPosition) < 72 && this.theaterFrustum.intersectsObject(this.theaterScreenMesh);
    if (visible === this.theaterScreenVisible) return;
    this.theaterScreenVisible = visible;
    this.theaterVisibilityHandler?.(visible);
  }

  private updateAvatarDance(avatar: Avatar, dance: DanceVisual, now: number, deltaSeconds: number): void {
    const jukeboxDistance = Math.hypot(avatar.group.position.x - WORLD_CONFIG.jukebox.x, avatar.group.position.z - WORLD_CONFIG.jukebox.z);
    const cameraNear = this.camera.position.distanceToSquared(avatar.group.position) <= 40 * 40;
    const target = this.jukeboxPlaying && !this.jukeboxReduceMotion.matches && cameraNear && jukeboxDistance <= 7
      && !dance.moving && avatar.fishing === 'idle' && !avatar.seatedSeatId && !avatar.inPhotobooth
      && (!avatar.local || !this.localDanceBlocked);
    dance.blend += ((target ? 1 : 0) - dance.blend) * (1 - Math.exp(-Math.max(0, deltaSeconds) / 0.1));
    if (!target && dance.blend < 0.002) {
      dance.blend = 0;
      dance.root.position.y = 0;
      dance.root.rotation.set(0, 0, 0);
      dance.root.scale.set(1, 1, 1);
      dance.note.visible = false;
      return;
    }
    const beat = now * 0.0065 * dance.speed + dance.phase;
    dance.root.position.y = Math.sin(beat * 2) * 0.025 * dance.blend;
    dance.root.rotation.z = Math.sin(beat) * 0.105 * dance.blend;
    dance.root.rotation.y = Math.sin(beat + 0.8) * 0.035 * dance.blend;
    const squash = Math.sin(beat * 2 + 0.6) * 0.012 * dance.blend;
    dance.root.scale.set(1 - squash * 0.35, 1 + squash, 1 - squash * 0.35);
    const notePhase = ((now / 3200 + dance.phase / (Math.PI * 2)) % 1 + 1) % 1;
    const notePulse = notePhase < 0.15 ? Math.sin(Math.PI * notePhase / 0.15) : 0;
    dance.note.position.y = 2.3 + notePhase * 0.12;
    dance.note.material.opacity = dance.blend * notePulse * 0.75;
    dance.note.visible = dance.note.material.opacity > 0.01;
  }

  render(deltaSeconds = 1 / 60): void {
    const serverNow = Date.now() + this.serverClockOffset;
    this.playground.render(serverNow, this.ferrisWheelStartedAt);
    const portalPulse = Math.sin(serverNow * 0.0025);
    this.crocodilePortalRing.rotation.y = Math.sin(serverNow * 0.0007) * 0.12;
    this.crocodilePortalRing.position.y = portalPulse * 0.06;
    const remoteRenderTime = serverNow - this.interpolationDelayMs;
    const local = this.avatars.get(this.localId);
    if (local) {
      if (local.ferrisSeatIndex === null) local.group.rotation.y += this.angleDelta(local.group.rotation.y, local.targetFacing) * 0.24;
      this.applyFerrisSeatPose(local, serverNow);
      this.updateTheaterCamera(local, performance.now(), deltaSeconds);
    }
    this.camera.updateMatrixWorld();
    this.updateJukeboxEffect(deltaSeconds, serverNow);
    this.updateTheaterLabel();
    this.updateTheaterScreenVisibility();
    this.ray.set(PHOTOBOOTH_CONFIG.position.x, 5.1, PHOTOBOOTH_CONFIG.position.z).project(this.camera);
    this.photoboothLabel.style.left = `${Math.round((this.ray.x * 0.5 + 0.5) * innerWidth)}px`;
    this.photoboothLabel.style.top = `${Math.round((-this.ray.y * 0.5 + 0.5) * innerHeight)}px`;
    this.photoboothLabel.style.display = this.ray.z <= 1 && Math.abs(this.ray.x) <= 1.2 && Math.abs(this.ray.y) <= 1.2 ? 'block' : 'none';
    this.ray.set(WORLD_CONFIG.jukebox.x, 2.95, WORLD_CONFIG.jukebox.z).project(this.camera);
    this.jukeboxLabel.style.left = `${Math.round((this.ray.x * 0.5 + 0.5) * innerWidth)}px`;
    this.jukeboxLabel.style.top = `${Math.round((-this.ray.y * 0.5 + 0.5) * innerHeight)}px`;
    this.jukeboxLabel.style.display = this.ray.z <= 1 && Math.abs(this.ray.x) <= 1.2 && Math.abs(this.ray.y) <= 1.2 ? 'block' : 'none';
    for (const [id, avatar] of this.avatars) {
      avatar.rod.rotation.z = -0.42 + (avatar.reelActive ? 0.12 + Math.sin(Date.now() * 0.006) * 0.035 : 0);
      if (avatar.heldModel) {
        avatar.heldModel.position.y = 1.12 + Math.sin(serverNow * 0.0022 + avatar.group.position.x) * 0.035;
        avatar.heldModel.rotation.z = Math.sin(serverNow * 0.0018 + avatar.group.position.z) * 0.055;
        const wiggle = Math.sin(serverNow * 0.0061 + avatar.group.position.x * 2.1);
        avatar.heldModel.rotation.x = wiggle > 0.94 ? (wiggle - 0.94) * 0.35 : 0;
      }
      if (!avatar.local) this.interpolateRemote(avatar, remoteRenderTime);
      if (!avatar.local) this.applyFerrisSeatPose(avatar, serverNow);
      const dance = this.avatarDance.get(id);
      if (dance) this.updateAvatarDance(avatar, dance, serverNow, deltaSeconds);
      this.renderCast(avatar, serverNow);
      this.updatePet(id, avatar, serverNow, deltaSeconds);
      const labelHeight = avatar.ferrisSeatIndex === null ? 2.2 : avatar.group.position.y + 2.2;
      this.ray.set(avatar.group.position.x, labelHeight, avatar.group.position.z).project(this.camera);
      const labelLeft = Math.round((this.ray.x * 0.5 + 0.5) * innerWidth);
      const labelTop = Math.round((-this.ray.y * 0.5 + 0.5) * innerHeight);
      avatar.label.style.translate = `${labelLeft}px ${labelTop}px`;
      avatar.label.style.zIndex = String(Math.round((1 - this.ray.z) * 1000));
      avatar.label.style.display = avatar.local && this.firstPersonView || this.ray.z > 1 ? 'none' : 'block';
      const bonk = this.bonks.get(id);
      if (bonk) {
        const elapsed = performance.now() - bonk.startedAt;
        if (elapsed >= 900) { bonk.element.remove(); this.bonks.delete(id); avatar.group.rotation.z = 0; }
        else {
          const progress = elapsed / 900;
          avatar.group.rotation.z = Math.sin(elapsed * 0.045) * (1 - progress) * 0.18;
          bonk.element.style.left = `${labelLeft}px`;
          bonk.element.style.top = `${labelTop - 22 - progress * 24}px`;
          bonk.element.style.opacity = String(1 - progress);
          bonk.element.style.display = avatar.label.style.display;
        }
      } else avatar.group.rotation.z = 0;
      // Rebuild label contents only when the player's visible state changes, not on every animation frame.
      const isLeader = this.leaderboardLeader !== '' && avatar.label.dataset.name?.toLocaleLowerCase() === this.leaderboardLeader;
      const leaderTitle = isLeader ? '<span class="leader-title"><span aria-hidden="true">👑</span><strong>Kapla Mengai</strong></span>' : '';
      const crocodileSlayerTitle = avatar.crocodilesSlain > 0 ? `<span class="crocodile-slayer-title" title="Crocodile slayer"><span aria-hidden="true">🐊</span><strong>Penghantam Boya x${avatar.crocodilesSlain}</strong></span>` : '';
      const fish = avatar.holdingFish;
      const fishSpecies = fish ? FISH_CONFIG.species.find((entry) => entry.id === fish.species) : undefined;
      const fishChip = fish && fishSpecies
        ? `<button class="held-fish-chip" data-catch-id="${this.escape(fish.catchId)}" style="--rarity-color:${fishSpecies.rarityColor}" type="button">🐟 ${this.escape(fishSpecies.name)} · ${fish.weightKg.toFixed(1)} kg</button>`
        : '';
      const photoMark = avatar.inPhotobooth ? '<span class="photo-camera-mark" aria-label="In photobooth">📸</span>' : '';
      const voiceMark = '<span class="voice-speaking-mark" title="Speaking" aria-label="Speaking">🎙</span>';
      const petMark = avatar.hasPet ? '<span class="pet-name-icon" title="Baby croc companion" aria-label="Baby croc companion">🐊</span>' : '';
      const labelMarkup = `${leaderTitle}${crocodileSlayerTitle}<span class="name-label-row"><span class="player-name-box"><span class="player-name">${this.escape(avatar.label.dataset.name ?? '')}${petMark}${avatar.fishing === 'bite' ? '<span class="fishing-mark">!</span>' : avatar.fishing === 'waiting' ? '<span class="fishing-mark">🎣</span>' : ''}${photoMark}</span></span>${voiceMark}</span>${fishChip}`;
      if (avatar.renderedLabelMarkup !== labelMarkup) {
        avatar.label.innerHTML = labelMarkup;
        avatar.renderedLabelMarkup = labelMarkup;
      }
      const bubbles = this.chatBubbles.get(id);
      if (bubbles) {
        const now = performance.now();
        for (let i = bubbles.length - 1; i >= 0; i--) {
          if (bubbles[i].expiresAt <= now) {
            bubbles[i].element.remove();
            bubbles.splice(i, 1);
          }
        }
        // Reserve room for the downward tail so its tip stays about 8px above the nameplate.
        const labelAnchor = labelTop - avatar.label.offsetHeight - 16;
        let bubbleAnchor = labelAnchor;
        const depthZ = Math.round((1 - this.ray.z) * 1000);
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const bubble = bubbles[i];
          bubble.element.style.left = `${labelLeft}px`;
          bubble.element.style.top = `${bubbleAnchor}px`;
          bubble.element.style.display = avatar.label.style.display;
          bubble.element.style.zIndex = String(depthZ + i + 1);
          bubble.element.style.opacity = String(Math.min(1, Math.max(0, (bubble.expiresAt - now) / (bubble.fadeMs ?? 650))));
          bubbleAnchor -= bubble.element.offsetHeight + 6;
        }
        if (!bubbles.length) this.chatBubbles.delete(id);
      }
      const eatBubble = this.eatBubbles.get(id);
      if (eatBubble) {
        if (eatBubble.expiresAt <= performance.now()) {
          eatBubble.element.remove();
          this.eatBubbles.delete(id);
        } else if (avatar.local && this.firstPersonView) {
          eatBubble.element.style.left = `${innerWidth / 2}px`;
          eatBubble.element.style.top = `${innerHeight * 0.38}px`;
          eatBubble.element.style.zIndex = '900';
          eatBubble.element.style.display = 'block';
        } else {
          eatBubble.element.style.left = `${labelLeft}px`;
          eatBubble.element.style.top = `${labelTop - 32}px`;
          eatBubble.element.style.display = avatar.label.style.display;
        }
      }
    }
    this.renderStones(serverNow);
    this.chickens.render(serverNow, this.camera);
    this.campfire.render(serverNow, this.camera, this.getPosition());
    this.weatherEffects.update(serverNow, this.camera);
    this.renderer.render(this.scene, this.camera);
  }

  private renderStones(now: number): void {
    for (const stone of this.stones.values()) {
      const { group } = stone;
      if (stone.state === 'ground') {
        group.visible = true;
        group.position.set(stone.x, 0.18, stone.z);
        group.rotation.y = Math.sin(now * 0.0005 + stone.x) * 0.12;
      } else if (stone.state === 'carried') {
        const carrier = stone.carriedBy ? this.avatars.get(stone.carriedBy) : undefined;
        if (!carrier) { group.visible = false; continue; }
        const offset = FISH_CONFIG.stones.heldOffset;
        group.visible = true;
        group.position.copy(carrier.group.localToWorld(new THREE.Vector3(offset.x, offset.y, offset.z)));
      } else if (stone.state === 'flying' && stone.flight) {
        const flight = stone.flight;
        const t = Math.max(0, Math.min(1, (now - flight.startTime) / flight.flightMs));
        const eased = 1 - (1 - t) * (1 - t);
        const distance = Math.hypot(flight.end.x - flight.start.x, flight.end.z - flight.start.z);
        const apex = Math.max(FISH_CONFIG.stones.apexMin, distance * FISH_CONFIG.stones.apexDistanceFactor);
        group.visible = true;
        group.position.set(
          flight.start.x + (flight.end.x - flight.start.x) * eased,
          flight.start.y + (flight.end.y - flight.start.y) * t + 4 * apex * t * (1 - t),
          flight.start.z + (flight.end.z - flight.start.z) * eased,
        );
        group.rotation.x += 0.035; group.rotation.z += 0.025;
      } else group.visible = false;

      if (stone.splashStartedAt !== null) {
        const elapsed = (now - stone.splashStartedAt) / 1000;
        if (elapsed >= FISH_CONFIG.stones.splashDurationSeconds) {
          stone.splash.visible = false; stone.splashStartedAt = null;
        } else {
          const phase = Math.max(0, elapsed / FISH_CONFIG.stones.splashDurationSeconds);
          stone.splash.visible = true;
          stone.splash.position.set(stone.x, FISH_CONFIG.pond.waterY + 0.03, stone.z);
          stone.splash.scale.setScalar(0.35 + phase * 1.9);
          (stone.splash.material as THREE.MeshBasicMaterial).opacity = 0.72 * (1 - phase);
        }
      }
    }

      const local = this.avatars.get(this.localId);
    if (!local || local.fishing !== 'idle') { this.stoneHint.classList.add('hidden'); return; }
    let hintPosition: THREE.Vector3 | null = null;
    if (this.carryingStoneId(this.localId)) {
      hintPosition = local.group.localToWorld(new THREE.Vector3(0, 2.3, 0));
      this.stoneHint.textContent = 'E to throw';
    } else {
      const id = this.nearbyStoneId(this.localId);
      const pebble = id ? this.stones.get(id) : undefined;
      if (pebble) { hintPosition = new THREE.Vector3(pebble.x, 0.65, pebble.z); this.stoneHint.textContent = 'E to pick up'; }
    }
    if (hintPosition) {
      this.ray.copy(hintPosition).project(this.camera);
      this.stoneHint.style.left = `${Math.round((this.ray.x * 0.5 + 0.5) * innerWidth)}px`;
      this.stoneHint.style.top = `${Math.round((-this.ray.y * 0.5 + 0.5) * innerHeight)}px`;
      this.stoneHint.style.display = this.ray.z > 1 ? 'none' : 'block';
      this.stoneHint.classList.remove('hidden');
    } else this.stoneHint.classList.add('hidden');
  }

  private escape(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
  }
  private angleDelta(a: number, b: number): number { return Math.atan2(Math.sin(b - a), Math.cos(b - a)); }
  private onResize = (): void => { this.camera.aspect = innerWidth / innerHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(innerWidth, innerHeight); };
}
