import './style.css';
import { Network, type BigCatchEvent, type CatchEntry, type CatchResult, type HeldFish, type InventoryItem, type PlayerSnapshot } from './network';
import { GameScene } from './scene';
import { FishArt } from './fishModels';
import { FishViewer } from './fishViewer';
import { Minimap } from './minimap';
import { Photobooth, PHOTOBOOTH_CONFIG } from './photobooth';
import { FISH_CONFIG, reelParametersForDifficulty, type FishSpeciesId, type ReelParameters } from '../../shared/fishConfig';
import { ReelGame } from './reelGame';
import { MOVEMENT_RULES, stepMovement } from '../../shared/movement';
import { isWeatherType, WEATHER_CONFIG, type WeatherSnapshot, type WeatherType } from '../../shared/weatherConfig';

const joinScreen = document.querySelector<HTMLElement>('#join-screen')!;
const form = document.querySelector<HTMLFormElement>('#join-form')!;
const roomInput = document.querySelector<HTMLInputElement>('#room')!;
const nameInput = document.querySelector<HTMLInputElement>('#name')!;
const roomListElement = document.querySelector<HTMLElement>('#room-list')!;
const refreshRoomsButton = document.querySelector<HTMLButtonElement>('#refresh-rooms')!;
const createRoomButton = document.querySelector<HTMLButtonElement>('#create-room')!;
const joinButton = document.querySelector<HTMLButtonElement>('#join-button')!;
const formError = document.querySelector<HTMLElement>('#form-error')!;
const hud = document.querySelector<HTMLElement>('#hud')!;
const roomHud = document.querySelector<HTMLElement>('#hud-room')!;
const playerCount = document.querySelector<HTMLElement>('#player-count')!;
const connectionDot = document.querySelector<HTMLElement>('#connection-dot')!;
const connectionLabel = document.querySelector<HTMLElement>('#connection-label')!;
const viewToggle = document.querySelector<HTMLButtonElement>('#view-toggle')!;
const whatsNew = document.querySelector<HTMLElement>('#whats-new')!;
const whatsNewGrid = document.querySelector<HTMLElement>('#whats-new-grid')!;
const whatsNewClose = document.querySelector<HTMLButtonElement>('#whats-new-close')!;
const whatsNewDismiss = document.querySelector<HTMLButtonElement>('#whats-new-dismiss')!;
const toast = document.querySelector<HTMLElement>('#toast')!;
const hitFlash = document.querySelector<HTMLElement>('#hit-flash')!;
const photoboothEnter = document.querySelector<HTMLButtonElement>('#photobooth-enter')!;
const photoboothPrompt = document.querySelector<HTMLElement>('#photobooth-prompt')!;
const weatherControl = document.querySelector<HTMLElement>('#weather-control')!;
const weatherBadge = document.querySelector<HTMLButtonElement>('#weather-badge')!;
const weatherIcon = document.querySelector<HTMLElement>('#weather-icon')!;
const weatherName = document.querySelector<HTMLElement>('#weather-name')!;
const weatherHint = document.querySelector<HTMLElement>('#weather-hint')!;
const fishPrompt = document.querySelector<HTMLElement>('#fish-prompt')!;
const chatUi = document.querySelector<HTMLElement>('#chat-ui')!;
const chatToggle = document.querySelector<HTMLButtonElement>('#chat-toggle')!;
const chatPanel = document.querySelector<HTMLElement>('#chat-panel')!;
const chatClose = document.querySelector<HTMLButtonElement>('#chat-close')!;
const chatMessages = document.querySelector<HTMLElement>('#chat-messages')!;
const chatForm = document.querySelector<HTMLFormElement>('#chat-form')!;
const chatInput = document.querySelector<HTMLInputElement>('#chat-input')!;
const chatUnread = document.querySelector<HTMLElement>('#chat-unread')!;
const leaderboardUi = document.querySelector<HTMLElement>('#leaderboard-ui')!;
const leaderboardToggle = document.querySelector<HTMLButtonElement>('#leaderboard-toggle')!;
const leaderboardPanel = document.querySelector<HTMLElement>('#leaderboard-panel')!;
const leaderboardClose = document.querySelector<HTMLButtonElement>('#leaderboard-close')!;
const leaderboardList = document.querySelector<HTMLOListElement>('#leaderboard-list')!;
const backpackUi = document.querySelector<HTMLElement>('#backpack-ui')!;
const backpackToggle = document.querySelector<HTMLButtonElement>('#backpack-toggle')!;
const backpackPanel = document.querySelector<HTMLElement>('#backpack-panel')!;
const backpackClose = document.querySelector<HTMLButtonElement>('#backpack-close')!;
const backpackCount = document.querySelector<HTMLElement>('#backpack-count')!;
const backpackSummary = document.querySelector<HTMLElement>('#backpack-summary')!;
const backpackStats = document.querySelector<HTMLElement>('#backpack-stats')!;
const collectionStrip = document.querySelector<HTMLElement>('#collection-strip')!;
const backpackFilters = document.querySelector<HTMLElement>('#backpack-filters')!;
const backpackSort = document.querySelector<HTMLSelectElement>('#backpack-sort')!;
const backpackList = document.querySelector<HTMLElement>('#backpack-list')!;
const expandedMap = document.querySelector<HTMLElement>('#expanded-map')!;
const expandedMapButton = document.querySelector<HTMLButtonElement>('#map-expand')!;
const expandedMapClose = document.querySelector<HTMLButtonElement>('#expanded-map-close')!;
const expandedMapBackdrop = document.querySelector<HTMLButtonElement>('#expanded-map-backdrop')!;
const catchPopup = document.querySelector<HTMLElement>('#catch-popup')!;
const catchName = document.querySelector<HTMLElement>('#catch-name')!;
const catchWeight = document.querySelector<HTMLElement>('#catch-weight')!;
const catchRarity = document.querySelector<HTMLElement>('#catch-rarity')!;
const catchTags = document.querySelector<HTMLElement>('#catch-tags')!;
const catchViewButton = document.querySelector<HTMLButtonElement>('#catch-view-button')!;
const catchHoldButton = document.querySelector<HTMLButtonElement>('#catch-hold-button')!;
const bigCatchBanner = document.querySelector<HTMLElement>('#big-catch-banner')!;
const bigCatchButton = document.querySelector<HTMLButtonElement>('#big-catch-button')!;
const bigCatchIcon = document.querySelector<HTMLImageElement>('#big-catch-icon')!;
const bigCatchTier = document.querySelector<HTMLElement>('#big-catch-tier')!;
const bigCatchText = document.querySelector<HTMLElement>('#big-catch-text')!;
const fishViewerRoot = document.querySelector<HTMLElement>('#fish-viewer')!;
const reelElement = document.querySelector<HTMLElement>('#reel-game')!;
const reelZone = document.querySelector<HTMLElement>('#reel-zone')!;
const reelMarker = document.querySelector<HTMLElement>('#reel-marker')!;
const reelMeterFill = document.querySelector<HTMLElement>('#reel-meter-fill')!;
const reelPercent = document.querySelector<HTMLElement>('#reel-percent')!;
const reelHelper = document.querySelector<HTMLElement>('#reel-helper')!;
const reelResult = document.querySelector<HTMLElement>('#reel-result')!;
const netDebug = document.querySelector<HTMLElement>('#net-debug')!;
const netDebugEnabled = import.meta.env.DEV && new URLSearchParams(location.search).has('netdebug');
if (netDebugEnabled) netDebug.classList.remove('hidden');

const scene = new GameScene(document.querySelector<HTMLElement>('#game')!, document.querySelector<HTMLElement>('#name-labels')!);
const gameCanvas = scene.renderer.domElement;
gameCanvas.tabIndex = 0;
const minimap = new Minimap(
  document.querySelector<HTMLCanvasElement>('#minimap-canvas')!,
  document.querySelector<HTMLCanvasElement>('#expanded-map-canvas')!,
  expandedMap,
);
const photoboothUi = new Photobooth(document.querySelector<HTMLElement>('#photobooth-overlay')!, {
  onExit: exitPhotobooth,
  prepareCapture: () => scene.preparePhotoboothCapture(),
  captureScene: (showName) => {
    scene.render(1 / 60);
    return {
      source: scene.renderer.domElement,
      namePoint: showName ? scene.photoboothNamePoint(selfId) : null,
      room: currentRoom,
      playerName: nameInput.value.trim(),
    };
  },
});
const fishArt = new FishArt(document.querySelector<HTMLCanvasElement>('#catch-fish-canvas')!);
let currentLeaderboard: CatchEntry[] = [];
let inventoryItems: InventoryItem[] = [];
let totalCaught = 0;
let personalBestFish: InventoryItem | null = null;
let collectionBests = new Map<FishSpeciesId, InventoryItem>();
let selectedSpecies: FishSpeciesId | 'all' = 'all';
let pendingReleaseId: string | null = null;
let myHeldFish: HeldFish | null = null;
const catchCache = new Map<string, CatchEntry>();
const bigCatchQueue: BigCatchEvent[] = [];
let activeBigCatch: BigCatchEvent | null = null;
let bigCatchTimer = 0;
const fishViewer = new FishViewer(fishViewerRoot, () => currentLeaderboard);
let network: Network;
let joined = false;
let firstPersonView = false;
let selfId = '';
let currentRoom = '';
let isPhotoboothMode = false;
let previousPhotoboothFacing = 0;
let availableRooms: { room: string; playerCount: number }[] = [];
let roomPollTimer = 0;
let keys = new Set<string>();
let mouseTurnRemaining = 0;
let lastFrame = performance.now();
let lastMinimapRenderAt = 0;
let movementSequence = 0;
let lastMovementSentAt = 0;
let lastMovementHeartbeatAt = 0;
let lastSentMotion: { x: number; z: number; rotY: number; moving: boolean; inPhotobooth: boolean } | null = null;
let lastDebugUpdate = 0;
let toastTimer = 0;
let hitFlashTimer = 0;
let unreadMessages = 0;
let openSidePanel: 'leaderboard' | 'backpack' | null = null;
let backpackPulseTimer = 0;
let currentCatch: CatchEntry | null = null;
let serverClockOffset = 0;
let hasServerClockSample = false;
let currentWeather: WeatherSnapshot | null = null;
let pendingDebugWeather: WeatherType | null = null;
let reelGame: ReelGame | null = null;
let reelHideTimer = 0;
let reelAttempts = 0;
let localReelEnding = false;
let pendingReelSuccess: boolean | null = null;
const forcedDifficulty = (() => {
  const value = Number(new URLSearchParams(location.search).get('reelDifficulty'));
  return Number.isFinite(value) && new URLSearchParams(location.search).has('reelDifficulty') ? Math.max(0, Math.min(1, value)) : null;
})();
const forcedWeather = (() => {
  if (!import.meta.env.DEV) return null;
  const value = new URLSearchParams(location.search).get('weather');
  return isWeatherType(value) ? value : null;
})();
const fishingRadius = FISH_CONFIG.pond.waterRadius + FISH_CONFIG.pond.edgeRange;
const whatsNewItems = [
  { icon: '🎒', title: 'Your Backpack', description: 'Catch records, species collection, filters, sorting, and fish release.' },
  { icon: '🐟', title: 'Hold your catch', description: 'Press F to show a fish in your hands. Bigger catches look bigger, and everyone can see it.' },
  { icon: '💾', title: 'Catches that stay', description: 'Your catch history, personal bests, Backpack fish, and room leaderboards are now saved for your next visit.' },
  { icon: '👑', title: 'Leaderboard crown', description: 'The room’s top fisher wears a crown.' },
  { icon: '🍲', title: 'Cook and share at the campfire', description: 'Choose Cook in your Backpack or press C near the campfire.' },
  { icon: '👁️', title: 'First-person view', description: 'Switch views with V or the view button.' },
  { icon: '🌦️', title: 'Weather', description: 'The pond has moods now. Rain, fog and storms change what’s biting.' },
  { icon: '🗺️', title: 'Island minimap', description: 'Find the pond, campfire, stones, and other fishers at a glance. Press M to expand the map.' },
  { icon: '🪨', title: 'Friendly splash', description: 'Want to keep your friend off the top spot? Toss a stone while they’re fishing!' },
  { icon: '⌨️', title: 'Quick controls', description: 'Press Escape to close the chatbox.' },
];

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function showHitFlash(): void {
  hitFlash.classList.remove('show');
  void hitFlash.offsetWidth;
  hitFlash.classList.add('show');
  window.clearTimeout(hitFlashTimer);
  hitFlashTimer = window.setTimeout(() => hitFlash.classList.remove('show'), 600);
}

function handleStoneHit(playerId: string, fishingCancelled: boolean): void {
  scene.showBonk(playerId);
  if (playerId === selfId) showHitFlash();
  if (!fishingCancelled) return;
  scene.cancelFishing(playerId);
  if (playerId !== selfId) return;
  if (reelGame) {
    reelGame.setHeld(false);
    reelGame = null;
    keys.clear();
  }
  pendingReelSuccess = null;
  localReelEnding = false;
  window.clearTimeout(reelHideTimer);
  reelElement.classList.add('hidden');
  reelElement.classList.remove('is-ending', 'is-success', 'is-escaped', 'is-pulling');
  showToast('A stone hit you. Fishing cancelled.');
}

function updateWeatherBadge(): void {
  if (!currentWeather) return;
  const state = WEATHER_CONFIG.states[currentWeather.type];
  const minutesLeft = Math.max(0, Math.ceil((currentWeather.endsAt - (Date.now() + serverClockOffset)) / 60_000));
  weatherIcon.innerHTML = weatherIconSvg(currentWeather.type);
  weatherName.textContent = state.name;
  weatherBadge.setAttribute('aria-label', `Weather: ${state.name}`);
  const biteRate = Math.round((1 / state.fishing.biteWaitMultiplier - 1) * 100);
  const biteCopy = biteRate > 0 ? `Bites ${biteRate}% faster` : biteRate < 0 ? `Bites ${Math.abs(biteRate)}% slower` : 'Bite pace unchanged';
  weatherHint.textContent = `${state.hint.replace(/\s*🎣/gu, '')} · ${biteCopy} · ${minutesLeft} min left`;
}

function weatherIconSvg(type: WeatherType): string {
  const paths: Record<WeatherType, string> = {
    clear: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    cloudy: '<path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z"/>',
    rain: '<path d="M7 14h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 7a3.5 3.5 0 0 0 1 7Zm1 3-1 2m6-2-1 2m6-2-1 2"/>',
    fog: '<path d="M7 10h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 3a3.5 3.5 0 0 0 1 7Zm-4 4h18m-15 4h12"/>',
    storm: '<path d="M7 13h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 6a3.5 3.5 0 0 0 1 7Zm5 1-2 4h3l-1 4 4-6h-3l1-2"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[type]}</g></svg>`;
}

function applyWeather(weather: WeatherSnapshot, announce: boolean): void {
  currentWeather = weather;
  scene.setWeather(weather);
  updateWeatherBadge();
  if (announce) showToast(WEATHER_CONFIG.states[weather.type].toast);
}

function setMengaiWeather(weather: unknown): boolean {
  if (!import.meta.env.DEV || !isWeatherType(weather)) return false;
  if (joined) network.setDebugWeather(weather);
  else pendingDebugWeather = weather;
  return true;
}

if (import.meta.env.DEV) Object.assign(window, { setMengaiWeather });

function closeWhatsNew(): void {
  whatsNew.classList.add('hidden');
  gameCanvas.focus({ preventScroll: true });
}

function renderWhatsNew(): void {
  whatsNewGrid.replaceChildren();
  whatsNewGrid.classList.toggle('five-columns', whatsNewItems.length >= 10);
  for (const item of whatsNewItems) {
    const card = document.createElement('article');
    card.className = 'whats-new-item';
    const iconTile = document.createElement('span');
    iconTile.className = 'whats-new-icon';
    iconTile.setAttribute('aria-hidden', 'true');
    iconTile.textContent = item.icon;
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.className = 'whats-new-description';
    for (const part of item.description.split(/(Escape|\bF\b|\bC\b|\bV\b|\bM\b)/g)) {
      if (!part) continue;
      if (['Escape', 'F', 'C', 'V', 'M'].includes(part)) {
        const key = document.createElement('kbd');
        key.className = 'whats-new-key';
        key.textContent = part === 'Escape' ? 'Esc' : part;
        if (part === 'Escape') key.setAttribute('aria-label', 'Escape');
        description.append(key);
      } else description.append(document.createTextNode(part));
    }
    card.append(iconTile, title, description);
    whatsNewGrid.append(card);
  }
}

renderWhatsNew();

function drawReel(snapshot = reelGame?.current): void {
  if (!snapshot) return;
  reelZone.style.left = `${snapshot.zoneCenter - snapshot.zoneWidth / 2}%`;
  reelZone.style.width = `${snapshot.zoneWidth}%`;
  reelMarker.style.left = `${snapshot.marker}%`;
  reelMarker.classList.toggle('inside', snapshot.inside);
  reelMeterFill.style.width = `${snapshot.meter * 100}%`;
  const hue = 25 + 118 * snapshot.meter;
  reelMeterFill.style.backgroundColor = `hsl(${hue} 55% 59%)`;
  reelPercent.textContent = `${Math.round(snapshot.meter * 100)}%`;
  reelElement.classList.toggle('is-pulling', snapshot.pulling);
  scene.setLineTaut(selfId, snapshot.inside);
}

function startReelMiniGame(): void {
  if (!joined || reelGame) return;
  window.clearTimeout(reelHideTimer);
  localReelEnding = false;
  reelElement.classList.remove('hidden', 'is-ending', 'is-success', 'is-escaped', 'is-pulling');
  reelResult.textContent = '';
  const easyMock = reelParametersForDifficulty(forcedDifficulty ?? 0, 'common', forcedDifficulty === 1 ? '#d5a633' : '#77b789');
  reelGame = new ReelGame(easyMock);
  reelGame.setHeld(true);
  reelElement.style.setProperty('--reel-rarity-color', easyMock.rarityColor);
  reelHelper.classList.toggle('hidden', reelAttempts >= FISH_CONFIG.reel.helperDisplayCount);
  reelAttempts += 1;
  keys.clear();
  scene.setFishing(selfId, 'fighting');
  fishPrompt.classList.add('hidden');
  drawReel();
  network.startReel();
}

function updateServerReelParams(params: ReelParameters): void {
  if (!reelGame) return;
  const resolved = forcedDifficulty === null ? params : reelParametersForDifficulty(forcedDifficulty, params.rarity, params.rarityColor);
  reelGame.setParameters(resolved);
  reelElement.style.setProperty('--reel-rarity-color', resolved.rarityColor);
  drawReel();
}

function finishReel(success: boolean, notifyServer = true): void {
  if (!reelGame && reelElement.classList.contains('hidden')) return;
  reelGame?.setHeld(false);
  reelGame = null;
  keys.clear();
  scene.setLineTaut(selfId, false);
  reelElement.classList.remove('is-pulling', 'is-success', 'is-escaped');
  reelElement.classList.add('is-ending', success ? 'is-success' : 'is-escaped');
  reelResult.textContent = success ? 'Nice and steady…' : 'It got away…';
  localReelEnding = true;
  pendingReelSuccess = notifyServer ? success : null;
  window.clearTimeout(reelHideTimer);
  reelHideTimer = window.setTimeout(() => {
    reelElement.classList.add('hidden');
    reelElement.classList.remove('is-ending', 'is-success', 'is-escaped');
    localReelEnding = false;
  }, success ? 650 : 1200);
  if (notifyServer) network.endReel(success);
}

function updateCount(): void { playerCount.textContent = String(scene.playerCount()); }

function hasForwardInput(): boolean { return keys.has('w') || keys.has('s'); }

function sendLocalMovement(force = false): void {
  if (!joined || typeof network === 'undefined') return;
  const position = scene.getPosition();
  const rotY = scene.localFacing();
  const moving = !isPhotoboothMode && !reelGame && scene.fishingState() === 'idle' && hasForwardInput();
  const previous = lastSentMotion;
  const changed = !previous || Math.hypot(position.x - previous.x, position.z - previous.z) > 0.002 ||
    Math.abs(Math.atan2(Math.sin(rotY - previous.rotY), Math.cos(rotY - previous.rotY))) > 0.002 || moving !== previous.moving ||
    isPhotoboothMode !== previous.inPhotobooth;
  const now = performance.now();
  const dueToChange = changed && now - lastMovementSentAt >= 50;
  const heartbeat = now - lastMovementHeartbeatAt >= 1000;
  if (!force && !dueToChange && !heartbeat) return;
  movementSequence += 1;
  network.sendMove(movementSequence, position.x, position.z, rotY, moving, Date.now(), isPhotoboothMode);
  lastSentMotion = { x: position.x, z: position.z, rotY, moving, inPhotobooth: isPhotoboothMode };
  lastMovementSentAt = now;
  lastMovementHeartbeatAt = now;
}

function isNearPhotobooth(): boolean {
  const position = scene.getPosition();
  return Math.hypot(position.x - PHOTOBOOTH_CONFIG.position.x, position.z - PHOTOBOOTH_CONFIG.position.z) <= PHOTOBOOTH_CONFIG.interactionRadius;
}

function enterPhotobooth(): void {
  if (!joined || isPhotoboothMode || !isNearPhotobooth() || reelGame || scene.fishingState() !== 'idle') return;
  isPhotoboothMode = true;
  previousPhotoboothFacing = scene.localFacing();
  keys.clear();
  cancelMouseTurn();
  setChatOpen(false);
  setOpenSidePanel(null);
  document.querySelector<HTMLElement>('#app')!.classList.add('photobooth-mode');
  scene.setPhotoboothMode(true);
  scene.setPhotoboothState(selfId, true);
  photoboothUi.open();
  sendLocalMovement(true);
}

function exitPhotobooth(): void {
  if (!isPhotoboothMode) return;
  isPhotoboothMode = false;
  photoboothUi.close();
  const position = scene.getPosition();
  scene.setLocalMotion(position.x, position.z, previousPhotoboothFacing);
  scene.setPhotoboothState(selfId, false);
  scene.setPhotoboothMode(false);
  document.querySelector<HTMLElement>('#app')!.classList.remove('photobooth-mode');
  sendLocalMovement(true);
}

function updateNetDebug(now: number): void {
  if (now - lastDebugUpdate < 200 || typeof network === 'undefined') return;
  lastDebugUpdate = now;
  const diagnostics = network.diagnostics();
  scene.setInterpolationDelay(diagnostics.interpolationDelayMs);
  if (!netDebugEnabled) return;
  const sync = scene.syncDiagnostics();
  const rtt = diagnostics?.rttMs;
  netDebug.textContent = [
    `RTT ${rtt === null || rtt === undefined ? '—' : `${Math.round(rtt)} ms`}`,
    `Jitter ${Math.round(diagnostics?.jitterMs ?? 0)} ms`,
    `Snapshots ${Math.round(diagnostics?.snapshotsPerSecond ?? 0)}/s`,
    `Buffer ${sync.bufferDepth}  interp ${sync.interpolationDelayMs} ms`,
    `Underruns ${sync.underruns}`,
    `Corrections ${sync.corrections}`,
    `Sim ${diagnostics?.simulation.lagMs ?? 0}±${diagnostics?.simulation.jitterMs ?? 0} ms / ${diagnostics?.simulation.lossPercent ?? 0}% loss`,
    `Dropped ${diagnostics?.droppedSimulatedMessages ?? 0}`,
  ].join('\n');
}

function observeServerTime(serverTime: number): void {
  if (hasServerClockSample) return;
  const sample = serverTime - Date.now();
  serverClockOffset = hasServerClockSample ? serverClockOffset + (sample - serverClockOffset) * 0.08 : sample;
  hasServerClockSample = true;
  scene.setServerClockOffset(serverClockOffset);
}

function setConnected(value: boolean): void {
  connectionDot.classList.toggle('offline', !value);
  connectionLabel.textContent = value ? 'Connected' : 'Disconnected';
  document.querySelector<HTMLButtonElement>('#connection-control')!.setAttribute('aria-label', value ? 'Connected' : 'Disconnected');
}

function setViewMode(firstPerson: boolean): void {
  firstPersonView = firstPerson;
  scene.setFirstPersonView(firstPersonView);
  const action = firstPersonView ? 'Switch to third-person view' : 'Switch to first-person view';
  viewToggle.setAttribute('aria-label', `${action} (V)`);
  viewToggle.title = `${action} · V`;
  viewToggle.setAttribute('aria-pressed', String(firstPersonView));
  viewToggle.classList.toggle('active', firstPersonView);
  document.querySelector<SVGElement>('#view-icon')!.innerHTML = firstPersonView
    ? '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>'
    : '<path d="M3 11.5 12 4l9 7.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-8Zm5 9v-6h8v6M9 9h.01M15 9h.01"/>';
}

function renderRoomList(): void {
  roomListElement.replaceChildren();
  if (availableRooms.length === 0) {
    const empty = document.createElement('p'); empty.className = 'rooms-empty';
    empty.textContent = 'No open rooms yet. Create one below.';
    roomListElement.append(empty);
    return;
  }
  for (const room of availableRooms) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'room-option';
    const details = document.createElement('span');
    const title = document.createElement('span'); title.className = 'room-option-title'; title.textContent = `Room ${room.room}`;
    const count = document.createElement('span'); count.className = 'room-option-count'; count.textContent = `${room.playerCount} ${room.playerCount === 1 ? 'player' : 'players'}`;
    details.append(title, document.createElement('br'), count);
    const action = document.createElement('span'); action.className = 'room-option-action'; action.textContent = 'Choose →';
    button.append(details, action);
    button.addEventListener('click', () => selectRoom(room.room));
    roomListElement.append(button);
  }
}

async function refreshRooms(): Promise<void> {
  try {
    const response = await fetch('/api/rooms', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Room list request failed (${response.status})`);
    const payload = await response.json() as { rooms: { room: string; playerCount: number }[] };
    availableRooms = payload.rooms;
    renderRoomList();
  } catch {
    roomListElement.replaceChildren();
    const unavailable = document.createElement('p'); unavailable.className = 'rooms-empty';
    unavailable.textContent = 'Room list unavailable. You can still enter a room number above.';
    roomListElement.append(unavailable);
  }
}

function startRoomPolling(): void {
  if (roomPollTimer) window.clearInterval(roomPollTimer);
  void refreshRooms();
  roomPollTimer = window.setInterval(() => { if (!joined) void refreshRooms(); }, 5000);
}

function selectRoom(room: string): void {
  roomInput.value = room;
  formError.textContent = '';
  if (nameInput.value.trim()) form.requestSubmit();
  else nameInput.focus();
}

function setChatOpen(open: boolean): void {
  if (open && openSidePanel) setOpenSidePanel(null);
  chatPanel.classList.toggle('hidden', !open);
  chatToggle.setAttribute('aria-expanded', String(open));
  if (open) {
    unreadMessages = 0;
    chatUnread.classList.add('hidden');
    chatUnread.textContent = '0';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.focus();
  } else if (chatPanel.contains(document.activeElement)) chatInput.blur();
}

function cacheCatch(entry: CatchEntry): void {
  catchCache.delete(entry.id);
  catchCache.set(entry.id, entry);
  while (catchCache.size > 100) catchCache.delete(catchCache.keys().next().value!);
}

function openFishViewer(entry: CatchEntry): void {
  cacheCatch(entry);
  fishViewer.open(catchCache.get(entry.id)!);
}

scene.setHeldFishClickHandler((playerId, catchId) => {
  const fish = scene.heldFish(playerId);
  if (!fish || fish.catchId !== catchId) return;
  openFishViewer({ id: fish.catchId, playerId, playerName: scene.playerName(playerId), species: fish.species, weightKg: fish.weightKg, rarity: fish.rarity, timestamp: fish.caughtAt });
});

function appendChat(message: { playerId: string; name: string; text: string; at: number; catch?: CatchEntry }): void {
  chatMessages.querySelector('.chat-empty')?.remove();
  const row = document.createElement('article');
  row.className = `chat-message${message.playerId === selfId ? ' mine' : ''}`;
  const meta = document.createElement('div');
  meta.className = 'chat-meta';
  const author = document.createElement('strong');
  author.textContent = message.name;
  const time = document.createElement('time');
  time.dateTime = new Date(message.at).toISOString();
  time.textContent = new Date(message.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  meta.append(author, time);
  const body = document.createElement('p');
  body.textContent = message.text;
  row.append(meta, body);
  if (message.catch) {
    cacheCatch(message.catch);
    const species = speciesConfig(message.catch.species);
    const chip = document.createElement('button');
    chip.type = 'button'; chip.className = 'catch-chip'; chip.style.setProperty('--rarity-color', species.rarityColor);
    const icon = document.createElement('img'); icon.alt = ''; icon.src = fishArt.iconDataUrl(message.catch.species, message.catch.weightKg);
    const label = document.createElement('span'); label.textContent = `${species.name} · ${message.catch.weightKg.toFixed(2)} kg`;
    chip.append(icon, label); chip.addEventListener('click', () => openFishViewer(message.catch!));
    row.append(chip);
  }
  chatMessages.append(row);
  while (chatMessages.children.length > 50) chatMessages.firstElementChild?.remove();
  const open = !chatPanel.classList.contains('hidden');
  if (open) chatMessages.scrollTop = chatMessages.scrollHeight;
  else {
    unreadMessages += 1;
    chatUnread.textContent = unreadMessages > 9 ? '9+' : String(unreadMessages);
    chatUnread.classList.remove('hidden');
  }
}

function speciesConfig(id: FishSpeciesId) { return FISH_CONFIG.species.find((species) => species.id === id)!; }

function itemCatchEntry(item: InventoryItem, catcher = nameInput.value.trim()): CatchEntry {
  return { id: item.catchId, playerId: selfId, playerName: catcher || 'You', species: item.species, weightKg: item.weightKg, rarity: item.rarity, timestamp: item.caughtAt };
}

function timeAgo(timestamp: number): string {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours} hr ago` : `${Math.floor(hours / 24)} days ago`;
}

function renderCollection(): void {
  collectionStrip.replaceChildren();
  for (const species of FISH_CONFIG.species) {
    const best = collectionBests.get(species.id);
    const item = document.createElement('div');
    item.className = `collection-item${best ? '' : ' uncaught'}`;
    const icon = document.createElement('img');
    icon.alt = '';
    icon.src = fishArt.iconDataUrl(species.id, best?.weightKg ?? species.medianKg);
    const name = document.createElement('strong');
    name.textContent = species.name;
    const weight = document.createElement('span');
    weight.textContent = best ? `${best.weightKg.toFixed(2)} kg` : '?';
    item.append(icon, name, weight);
    collectionStrip.append(item);
  }
}

function renderBackpack(): void {
  backpackCount.textContent = inventoryItems.length > 99 ? '99+' : String(inventoryItems.length);
  backpackSummary.textContent = `Backpack · ${inventoryItems.length} ${inventoryItems.length === 1 ? 'fish' : 'fish'}`;
  backpackStats.textContent = `${totalCaught} total fish caught · Personal best ${personalBestFish ? `${personalBestFish.weightKg.toFixed(2)} kg ${speciesConfig(personalBestFish.species).name}` : '—'}`;
  renderCollection();

  backpackFilters.replaceChildren();
  const filters: { id: FishSpeciesId | 'all'; name: string }[] = [
    { id: 'all', name: 'All' },
    ...FISH_CONFIG.species.map((species) => ({ id: species.id, name: species.name })),
  ];
  for (const filter of filters) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `backpack-filter${selectedSpecies === filter.id ? ' active' : ''}`;
    chip.textContent = filter.name;
    chip.addEventListener('click', () => { selectedSpecies = filter.id; renderBackpack(); });
    backpackFilters.append(chip);
  }

  const rarityRank: Record<string, number> = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
  const sorted = inventoryItems.filter((item) => selectedSpecies === 'all' || item.species === selectedSpecies);
  if (backpackSort.value === 'heaviest') sorted.sort((a, b) => b.weightKg - a.weightKg);
  else if (backpackSort.value === 'rarity') sorted.sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity] || b.weightKg - a.weightKg);
  else sorted.sort((a, b) => b.caughtAt - a.caughtAt);

  backpackList.replaceChildren();
  if (inventoryItems.length === 0) {
    const empty = document.createElement('p'); empty.className = 'backpack-empty'; empty.textContent = 'No fish yet. Go cast a line!';
    backpackList.append(empty); return;
  }
  if (sorted.length === 0) {
    const empty = document.createElement('p'); empty.className = 'backpack-empty'; empty.textContent = 'No fish of this kind yet.';
    backpackList.append(empty); return;
  }
  for (const item of sorted) {
    const species = speciesConfig(item.species);
    const row = document.createElement('article');
    row.className = 'backpack-row';
    row.style.setProperty('--rarity-color', species.rarityColor);
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    const icon = document.createElement('img');
    icon.className = 'backpack-row-icon'; icon.alt = ''; icon.src = fishArt.iconDataUrl(item.species, item.weightKg);
    const details = document.createElement('div'); details.className = 'backpack-row-main';
    const title = document.createElement('strong'); title.textContent = species.name;
    const meta = document.createElement('span'); meta.className = 'backpack-row-meta'; meta.textContent = `${item.weightKg.toFixed(2)} kg · ${timeAgo(item.caughtAt)}`;
    const rarity = document.createElement('span'); rarity.className = 'backpack-rarity'; rarity.textContent = item.rarity;
    details.append(title, meta, rarity);
    const actions = document.createElement('div'); actions.className = 'backpack-row-actions';
    const cook = document.createElement('button'); cook.type = 'button'; cook.dataset.action = 'cook'; cook.textContent = 'Cook';
    cook.addEventListener('click', () => network.cookFish(item.catchId));
    const hold = document.createElement('button'); hold.type = 'button'; hold.dataset.action = 'hold';
    hold.textContent = myHeldFish?.catchId === item.catchId ? 'Put away' : 'Hold';
    hold.addEventListener('click', () => {
      if (myHeldFish?.catchId === item.catchId) network.holdFish(null);
      else holdFish(item.catchId);
    });
    const release = document.createElement('button'); release.type = 'button'; release.dataset.action = 'release';
    release.className = 'release-button';
    if (pendingReleaseId === item.catchId) {
      release.textContent = 'Sure?';
      release.addEventListener('click', () => { network.releaseFish(item.catchId); pendingReleaseId = null; });
      const keep = document.createElement('button'); keep.type = 'button'; keep.dataset.action = 'cancel-release'; keep.textContent = 'Keep';
      keep.addEventListener('click', () => { pendingReleaseId = null; renderBackpack(); });
      actions.append(cook, hold, release, keep);
    } else {
      release.textContent = 'Release';
      release.addEventListener('click', () => { pendingReleaseId = item.catchId; renderBackpack(); });
      actions.append(cook, hold, release);
    }
    row.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('button')) return;
      openFishViewer(itemCatchEntry(item));
    });
    row.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault(); openFishViewer(itemCatchEntry(item));
      }
    });
    row.append(icon, details, actions);
    backpackList.append(row);
  }
}

function syncInventory(items: InventoryItem[], caught: number, best: InventoryItem | null, collection: InventoryItem[]): void {
  inventoryItems = [...items].sort((a, b) => b.caughtAt - a.caughtAt);
  totalCaught = caught;
  personalBestFish = best;
  collectionBests = new Map(collection.map((item) => [item.species, item]));
  pendingReleaseId = null;
  renderBackpack();
}

function addInventoryItem(item: InventoryItem): void {
  const isNewCatch = !inventoryItems.some((existing) => existing.catchId === item.catchId);
  if (isNewCatch) {
    inventoryItems.push(item);
    totalCaught += 1;
    if (joined) {
      backpackToggle.classList.remove('pulse');
      void backpackToggle.offsetWidth;
      backpackToggle.classList.add('pulse');
      window.clearTimeout(backpackPulseTimer);
      backpackPulseTimer = window.setTimeout(() => backpackToggle.classList.remove('pulse'), 900);
    }
  }
  if (!personalBestFish || item.weightKg > personalBestFish.weightKg) personalBestFish = item;
  const speciesBest = collectionBests.get(item.species);
  if (!speciesBest || item.weightKg > speciesBest.weightKg) collectionBests.set(item.species, item);
  inventoryItems.sort((a, b) => b.caughtAt - a.caughtAt);
  renderBackpack();
}

function holdFish(catchId: string): void {
  if (scene.carryingStoneId(selfId)) { showToast('Throw the stone first.'); return; }
  network.holdFish(catchId);
}

function setOpenSidePanel(panel: 'leaderboard' | 'backpack' | null): void {
  if (panel && !chatPanel.classList.contains('hidden')) setChatOpen(false);
  openSidePanel = panel;
  const leaderboardOpen = panel === 'leaderboard';
  const backpackOpen = panel === 'backpack';
  leaderboardPanel.classList.toggle('hidden', !leaderboardOpen);
  backpackPanel.classList.toggle('hidden', !backpackOpen);
  leaderboardPanel.setAttribute('aria-hidden', String(!leaderboardOpen));
  backpackPanel.setAttribute('aria-hidden', String(!backpackOpen));
  leaderboardPanel.inert = !leaderboardOpen;
  backpackPanel.inert = !backpackOpen;
  leaderboardToggle.setAttribute('aria-expanded', String(leaderboardOpen));
  backpackToggle.setAttribute('aria-expanded', String(backpackOpen));
  leaderboardToggle.classList.toggle('active', leaderboardOpen);
  backpackToggle.classList.toggle('active', backpackOpen);
}

function setBackpackOpen(open: boolean): void {
  setOpenSidePanel(open ? 'backpack' : null);
}

function toggleExpandedMap(open = expandedMap.classList.contains('hidden')): void {
  if (open) {
    setOpenSidePanel(null);
    setChatOpen(false);
  }
  minimap.toggleExpanded(open);
}

function presentNextBigCatch(): void {
  if (activeBigCatch || bigCatchQueue.length === 0) return;
  const event = bigCatchQueue.shift()!;
  activeBigCatch = event;
  const entry = event.catch;
  cacheCatch(entry);
  const species = speciesConfig(entry.species);
  bigCatchBanner.style.setProperty('--rarity-color', species.rarityColor);
  bigCatchBanner.classList.toggle('spectacular', event.tier === 'spectacular');
  bigCatchBanner.classList.remove('hidden', 'is-leaving');
  document.querySelector('#app')!.classList.add('has-big-catch');
  bigCatchIcon.src = fishArt.iconDataUrl(entry.species, entry.weightKg);
  bigCatchTier.textContent = event.tier === 'spectacular' ? 'SPECTACULAR CATCH' : 'BIG CATCH';
  bigCatchText.textContent = `${entry.playerName} caught a ${entry.weightKg.toFixed(2)} kg ${species.name}!`;
  const duration = event.tier === 'spectacular' ? FISH_CONFIG.bigCatch.spectacularDurationMs : FISH_CONFIG.bigCatch.bannerDurationMs;
  window.clearTimeout(bigCatchTimer);
  bigCatchTimer = window.setTimeout(dismissBigCatch, duration);
}

function dismissBigCatch(): void {
  if (!activeBigCatch) return;
  bigCatchBanner.classList.add('is-leaving');
  window.setTimeout(() => {
    bigCatchBanner.classList.add('hidden');
    bigCatchBanner.classList.remove('is-leaving', 'spectacular');
    activeBigCatch = null;
    document.querySelector('#app')!.classList.toggle('has-big-catch', bigCatchQueue.length > 0);
    presentNextBigCatch();
  }, 240);
}

function enqueueBigCatch(event: BigCatchEvent): void {
  cacheCatch(event.catch);
  if (bigCatchQueue.length >= FISH_CONFIG.bigCatch.queueLimit) bigCatchQueue.shift();
  bigCatchQueue.push(event);
  presentNextBigCatch();
}

function updateLeaderboard(entries: CatchEntry[]): void {
  currentLeaderboard = entries;
  scene.setLeaderboardLeader(entries[0]?.playerName ?? null);
  for (const entry of entries) cacheCatch(entry);
  leaderboardList.replaceChildren();
  if (entries.length === 0) {
    const empty = document.createElement('li'); empty.className = 'leaderboard-empty'; empty.textContent = 'No catches yet, be the first!';
    leaderboardList.append(empty); return;
  }
  for (const [index, entry] of entries.entries()) {
    const species = speciesConfig(entry.species);
    const row = document.createElement('li');
    const medal = index < 3 ? ['gold', 'silver', 'bronze'][index] : '';
    row.className = `leaderboard-entry${medal ? ` podium-${medal}` : ''}${entry.playerName.toLocaleLowerCase() === nameInput.value.trim().toLocaleLowerCase() ? ' own-entry' : ''}`;
    row.style.setProperty('--rarity-color', species.rarityColor);
    const rank = document.createElement('span'); rank.className = 'leaderboard-rank'; rank.textContent = String(index + 1);
    const icon = document.createElement('img'); icon.className = 'leaderboard-fish'; icon.alt = '';
    icon.src = fishArt.iconDataUrl(entry.species, entry.weightKg);
    const details = document.createElement('span'); details.className = 'leaderboard-details';
    const title = document.createElement('strong'); title.textContent = species.name;
    const caption = document.createElement('span'); caption.textContent = `${entry.weightKg.toFixed(2)} kg · ${entry.playerName}`;
    details.append(title, caption);
    const rarity = document.createElement('span'); rarity.className = 'leaderboard-rarity'; rarity.textContent = species.rarity;
    row.tabIndex = 0; row.setAttribute('role', 'button');
    row.addEventListener('click', () => openFishViewer(entry));
    row.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openFishViewer(entry); } });
    row.append(rank, icon, details, rarity); leaderboardList.append(row);
  }
}

function showCatch(result: CatchResult): void {
  currentCatch = result.entry;
  cacheCatch(result.entry);
  const species = speciesConfig(result.entry.species);
  fishArt.show(result.entry.species, result.entry.weightKg);
  catchName.textContent = species.name;
  catchWeight.textContent = `${result.entry.weightKg.toFixed(2)} kg`;
  catchRarity.textContent = species.rarity;
  catchTags.replaceChildren();
  catchPopup.style.setProperty('--rarity-color', species.rarityColor);
  for (const [label, visible] of [['New personal best!', result.flags.newPersonalBest], ['New room record!', result.flags.newRoomRecord]] as const) {
    if (!visible) continue;
    const tag = document.createElement('span'); tag.textContent = label; catchTags.append(tag);
  }
  catchPopup.classList.remove('hidden');
  catchHoldButton.textContent = myHeldFish?.catchId === result.entry.id ? 'Put away (F)' : 'Hold it (F)';
}

catchViewButton.addEventListener('click', () => { if (currentCatch) openFishViewer(currentCatch); });
catchHoldButton.addEventListener('click', () => {
  if (!currentCatch) return;
  if (myHeldFish?.catchId === currentCatch.id) network.holdFish(null);
  else holdFish(currentCatch.id);
});
bigCatchButton.addEventListener('click', () => { if (activeBigCatch) openFishViewer(activeBigCatch.catch); });

function makeCastTarget(): { x: number; z: number } | null {
  const position = scene.getPosition();
  const radius = Math.hypot(position.x, position.z);
  if (radius - FISH_CONFIG.pond.waterRadius > FISH_CONFIG.pond.edgeRange) {
    showToast('Move closer to the pond to fish.');
    return null;
  }
  const angle = Math.atan2(-position.z, -position.x) + (Math.random() - 0.5) * 0.22;
  const targetFraction = FISH_CONFIG.pond.minTargetRadius + Math.random() * (FISH_CONFIG.pond.maxTargetRadius - FISH_CONFIG.pond.minTargetRadius);
  const scatteredRadius = Math.max(FISH_CONFIG.pond.minTargetRadius, Math.min(FISH_CONFIG.pond.maxTargetRadius, targetFraction + (Math.random() - 0.5) * 0.06));
  const targetRadius = FISH_CONFIG.pond.waterRadius * scatteredRadius;
  return { x: Math.cos(angle) * targetRadius, z: Math.sin(angle) * targetRadius };
}

function join(room: string, name: string): void {
  formError.textContent = '';
  joinButton.disabled = true;
  joinButton.innerHTML = 'Joining…';
  network = new Network({
    joined: (message) => {
      observeServerTime(message.serverTime);
      applyWeather(message.weather, false);
      selfId = message.selfId;
      movementSequence = 0; lastSentMotion = null; lastMovementSentAt = 0; lastMovementHeartbeatAt = 0;
      currentRoom = message.room;
      document.querySelector('h1')!.innerHTML = 'Welcome to<br/><span>Mengai</span>';
      document.querySelector('.intro')!.textContent = 'Find a quiet spot by the water and see who else is out fishing.';
      scene.clearPlayers();
      scene.setLocalId(selfId);
      scene.setFirstPersonView(firstPersonView);
      const me = message.players.find((player) => player.id === selfId);
      myHeldFish = me?.holdingFish ?? null;
      if (me) scene.addLocal(me);
      for (const player of message.players) if (player.id !== selfId) scene.upsert(player, message.serverTime);
      scene.setStones(message.stones ?? []);
      scene.setCampfireCooking(message.campfireCooking ?? null);
      roomHud.textContent = `Room ${message.room}`;
      updateLeaderboard(message.leaderboard ?? []);
      chatMessages.replaceChildren();
      const emptyHint = document.createElement('p');
      emptyHint.className = 'chat-empty';
      emptyHint.textContent = 'Say hello to everyone in this room.';
      chatMessages.append(emptyHint);
      unreadMessages = 0;
      chatUnread.classList.add('hidden');
      chatUi.classList.remove('hidden');
      setChatOpen(false);
      leaderboardUi.classList.remove('hidden');
      backpackUi.classList.remove('hidden');
      setOpenSidePanel(null);
      updateCount();
      joined = true;
      const debugWeather = pendingDebugWeather ?? forcedWeather;
      pendingDebugWeather = null;
      if (debugWeather) network.setDebugWeather(debugWeather);
      if (roomPollTimer) window.clearInterval(roomPollTimer);
      roomPollTimer = 0;
      joinScreen.classList.add('hidden');
      hud.classList.remove('hidden');
      setConnected(true);
      joinButton.disabled = false;
      joinButton.innerHTML = 'Join the pond <span aria-hidden="true">→</span>';
      formError.textContent = '';
      const resumeKey = `mengai:resume:${encodeURIComponent(message.room)}:${encodeURIComponent(name.toLocaleLowerCase())}`;
      if (message.resumeToken) localStorage.setItem(resumeKey, message.resumeToken);
    },
    state: (players, serverTime) => {
      observeServerTime(serverTime);
      for (const player of players) if (player.id !== selfId) scene.upsert(player, serverTime);
      updateCount();
    },
    playerJoined: (player, serverTime) => { observeServerTime(serverTime); scene.upsert(player, serverTime); updateCount(); showToast(`${player.name} joined the pond`); },
    playerLeft: (id) => { scene.remove(id); updateCount(); },
    correction: (message) => { if (message.seq >= movementSequence) scene.applyCorrection(message.x, message.z); },
    clockOffset: (offsetMs) => {
      serverClockOffset = offsetMs; hasServerClockSample = true; scene.setServerClockOffset(offsetMs);
    },
    error: (message) => {
      joinButton.disabled = false;
      joinButton.innerHTML = 'Join the pond <span aria-hidden="true">→</span>';
      formError.textContent = message;
      network.close();
    },
    notice: showToast,
    fishCast: (message) => scene.startCast(message.playerId, message),
    fishBite: (message) => scene.showBite(message.playerId),
    fishReel: (message) => scene.startReel(message.playerId, message.startTime, message.duration),
    fishEscaped: (id) => {
      if (id !== selfId) return;
      if (reelGame) finishReel(false, false);
      else if (pendingReelSuccess === true) {
        pendingReelSuccess = null;
        reelElement.classList.remove('is-success');
        reelElement.classList.add('is-escaped', 'is-ending');
        reelResult.textContent = 'It got away…';
        localReelEnding = true;
        window.clearTimeout(reelHideTimer);
        reelHideTimer = window.setTimeout(() => {
          reelElement.classList.add('hidden');
          reelElement.classList.remove('is-ending', 'is-success', 'is-escaped');
          localReelEnding = false;
        }, 1200);
      }
      else if (!localReelEnding) showToast('It got away!');
    },
    reelParams: updateServerReelParams,
    reelState: (id, active) => scene.setReelActive(id, active),
    catchResult: (result) => { pendingReelSuccess = null; showCatch(result); },
    leaderboard: updateLeaderboard,
    inventorySync: syncInventory,
    inventoryAdd: addInventoryItem,
    inventoryRemove: (catchId) => {
      inventoryItems = inventoryItems.filter((item) => item.catchId !== catchId);
      if (pendingReleaseId === catchId) pendingReleaseId = null;
      renderBackpack();
    },
    playerHolding: (playerId, fish) => {
      scene.setHoldingFish(playerId, fish);
      if (playerId === selfId) {
        myHeldFish = fish;
        if (currentCatch) catchHoldButton.textContent = myHeldFish?.catchId === currentCatch.id ? 'Put away (F)' : 'Hold it (F)';
        renderBackpack();
      }
    },
    campfireCooking: (cooking) => scene.setCampfireCooking(cooking),
    campfireCooked: (event) => {
      scene.finishCampfireCooking(event.cooking.cookId);
      const species = speciesConfig(event.cooking.fish.species);
      for (const playerId of event.recipientIds) scene.showEatBubble(playerId, species.name);
    },
    weatherChanged: (weather) => applyWeather(weather, true),
    announcement: showToast,
    chat: (message) => {
      scene.showChatBubble(message.playerId, message.text);
      appendChat(message);
    },
    bigCatch: enqueueBigCatch,
    stonePicked: (stoneId, playerId) => scene.pickStone(stoneId, playerId),
    stoneThrown: (message) => scene.throwStone(message),
    stoneLanded: (message) => scene.landStone(message),
    stoneRespawn: (message) => scene.respawnStone(message.stoneId, message.position),
    stoneHit: handleStoneHit,
    chickenHit: (message) => scene.hitChicken(message),
    disconnected: () => {
      joined = false;
      if (isPhotoboothMode) exitPhotobooth();
      cancelMouseTurn();
      scene.clearPlayers();
      chatUi.classList.add('hidden');
      setChatOpen(false);
      leaderboardUi.classList.add('hidden');
      backpackUi.classList.add('hidden');
      setOpenSidePanel(null);
      minimap.toggleExpanded(false);
      myHeldFish = null;
      catchPopup.classList.add('hidden');
      fishViewer.close();
      bigCatchQueue.length = 0;
      activeBigCatch = null;
      bigCatchBanner.classList.add('hidden');
      document.querySelector('#app')!.classList.remove('has-big-catch');
      reelGame = null;
      pendingReelSuccess = null;
      reelElement.classList.add('hidden');
      reelElement.classList.remove('is-ending', 'is-success', 'is-escaped', 'is-pulling');
      setConnected(false);
      hud.classList.add('hidden');
      joinScreen.classList.remove('hidden');
      startRoomPolling();
      document.querySelector('h1')!.innerHTML = 'Connection<br/><span>lost</span>';
      document.querySelector('.intro')!.textContent = 'The pond connection dropped. Join again to get back to the water.';
      joinButton.innerHTML = 'Rejoin the pond <span aria-hidden="true">→</span>';
      joinButton.disabled = false;
      formError.textContent = 'Disconnected. Your old spot has been released.';
    },
  });
  const resumeKey = `mengai:resume:${encodeURIComponent(room)}:${encodeURIComponent(name.toLocaleLowerCase())}`;
  network.connect(room, name, localStorage.getItem(resumeKey) ?? undefined);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const room = roomInput.value.trim();
  const name = nameInput.value.trim();
  if (!room) { formError.textContent = 'Please enter a room number.'; roomInput.focus(); return; }
  if (name.length < 1 || name.length > 16) { formError.textContent = 'Name must be 1–16 characters.'; nameInput.focus(); return; }
  currentRoom = room;
  join(room, name);
});

refreshRoomsButton.addEventListener('click', () => { void refreshRooms(); });
createRoomButton.addEventListener('click', () => {
  const taken = new Set(availableRooms.map((room) => room.room));
  let code = '';
  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = String(10000 + Math.floor(Math.random() * 90000));
    if (!taken.has(candidate)) { code = candidate; break; }
  }
  roomInput.value = code || String(Date.now()).slice(-6);
  formError.textContent = '';
  if (nameInput.value.trim()) form.requestSubmit();
  else nameInput.focus();
});
startRoomPolling();
window.setInterval(updateWeatherBadge, 1000);

weatherBadge.addEventListener('click', () => {
  const open = weatherControl.classList.toggle('is-open');
  weatherBadge.setAttribute('aria-expanded', String(open));
  if (!open) weatherBadge.blur();
});
document.addEventListener('click', (event) => {
  if (weatherControl.contains(event.target as Node)) return;
  weatherControl.classList.remove('is-open');
  weatherBadge.setAttribute('aria-expanded', 'false');
  if (document.activeElement instanceof HTMLElement && weatherControl.contains(document.activeElement)) document.activeElement.blur();
});

chatToggle.addEventListener('click', () => setChatOpen(chatPanel.classList.contains('hidden')));
chatClose.addEventListener('click', () => setChatOpen(false));
whatsNewClose.addEventListener('click', closeWhatsNew);
whatsNewDismiss.addEventListener('click', closeWhatsNew);
whatsNew.querySelector<HTMLElement>('.whats-new-backdrop')!.addEventListener('click', closeWhatsNew);
whatsNew.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const focusable = [...whatsNew.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])')]
    .filter((element) => element.getClientRects().length > 0);
  if (focusable.length === 0) { event.preventDefault(); return; }
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || !whatsNew.contains(document.activeElement))) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !whatsNew.contains(document.activeElement))) {
    event.preventDefault(); first.focus();
  }
});
leaderboardToggle.addEventListener('click', () => {
  setOpenSidePanel(openSidePanel === 'leaderboard' ? null : 'leaderboard');
});
viewToggle.addEventListener('click', () => setViewMode(!firstPersonView));
photoboothEnter.addEventListener('click', enterPhotobooth);
leaderboardClose.addEventListener('click', () => setOpenSidePanel(null));
backpackToggle.addEventListener('click', () => setBackpackOpen(backpackPanel.classList.contains('hidden')));
backpackClose.addEventListener('click', () => setBackpackOpen(false));
expandedMapButton.addEventListener('click', () => toggleExpandedMap());
expandedMapClose.addEventListener('click', () => toggleExpandedMap(false));
expandedMapBackdrop.addEventListener('click', () => toggleExpandedMap(false));
backpackSort.addEventListener('change', renderBackpack);
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!joined || !text) return;
  network.sendChat(text);
  chatInput.value = '';
  chatInput.focus();
});

function cancelMouseTurn(): void {
  if (document.pointerLockElement === gameCanvas) document.exitPointerLock();
  mouseTurnRemaining = 0;
  gameCanvas.classList.remove('is-turning');
}

gameCanvas.addEventListener('pointerdown', (event) => {
  if (!joined || isPhotoboothMode || reelGame || scene.fishingState() !== 'idle' || event.pointerType !== 'mouse' || event.button !== 0) return;
  if (document.pointerLockElement === gameCanvas) return;
  event.preventDefault();
  try { void Promise.resolve(gameCanvas.requestPointerLock()).catch(() => {}); }
  catch { showToast('Mouse look could not be enabled. Use A/D to turn.'); }
});
gameCanvas.addEventListener('pointermove', (event) => {
  if (document.pointerLockElement !== gameCanvas || !joined || isPhotoboothMode || reelGame || scene.fishingState() !== 'idle') return;
  mouseTurnRemaining = Math.max(-0.5, Math.min(0.5, mouseTurnRemaining - event.movementX * 0.006));
  event.preventDefault();
});
document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === gameCanvas;
  gameCanvas.classList.toggle('is-turning', locked);
  if (!locked) mouseTurnRemaining = 0;
});
document.addEventListener('pointerlockerror', () => showToast('Mouse look could not be enabled. Use A/D to turn.'));

const keyNames: Record<string, string> = { ArrowUp: 'w', ArrowDown: 's', ArrowLeft: 'a', ArrowRight: 'd', ' ': 'space' };
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !whatsNew.classList.contains('hidden')) {
    event.preventDefault();
    closeWhatsNew();
    return;
  }
  if (!whatsNew.classList.contains('hidden')) {
    if (!whatsNew.contains(event.target as Node)) event.preventDefault();
    return;
  }
  if (isPhotoboothMode) {
    photoboothUi.handleKey(event);
    return;
  }
  if (event.key === 'Escape' && !fishViewerRoot.classList.contains('hidden')) {
    fishViewer.close();
    return;
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    if (document.pointerLockElement === gameCanvas) cancelMouseTurn();
    if (!expandedMap.classList.contains('hidden')) toggleExpandedMap(false);
    else if (openSidePanel) setOpenSidePanel(null);
    else if (!chatPanel.classList.contains('hidden') && chatPanel.contains(document.activeElement)) setChatOpen(false);
    else if (!chatPanel.classList.contains('hidden')) setChatOpen(false);
    else if (document.activeElement === chatInput) chatInput.blur();
    return;
  }
  if (reelGame) {
    if (event.code === 'Space') { event.preventDefault(); reelGame.setHeld(true); }
    else if (['Enter', 'w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) || event.key.startsWith('Arrow')) event.preventDefault();
    return;
  }
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
  const key = keyNames[event.key] ?? event.key.toLowerCase();
  if (key === 'p' && joined && !event.repeat) {
    event.preventDefault();
    if (isPhotoboothMode) exitPhotobooth();
    else enterPhotobooth();
    return;
  }
  if (key === 'm' && joined && !event.repeat) {
    event.preventDefault();
    toggleExpandedMap();
    return;
  }
  if (key === 'l' && joined && !event.repeat) {
    event.preventDefault();
    setOpenSidePanel(openSidePanel === 'leaderboard' ? null : 'leaderboard');
    return;
  }
  if (key === 'i' && joined && !event.repeat) {
    event.preventDefault();
    setBackpackOpen(backpackPanel.classList.contains('hidden'));
    return;
  }
  if (key === 'v' && joined && !event.repeat) {
    event.preventDefault();
    setViewMode(!firstPersonView);
    return;
  }
  if (key === 'f' && joined && !event.repeat) {
    event.preventDefault();
    if (myHeldFish) network.holdFish(null);
    else if (inventoryItems.length) holdFish([...inventoryItems].sort((a, b) => b.caughtAt - a.caughtAt)[0].catchId);
    else showToast('No fish to hold yet. Catch one first.');
    return;
  }
  if (key === 'c' && joined && !event.repeat) {
    event.preventDefault();
    const fish = myHeldFish ?? [...inventoryItems].sort((a, b) => b.caughtAt - a.caughtAt)[0];
    if (fish) network.cookFish(fish.catchId);
    else showToast('Catch a fish before cooking one.');
    return;
  }
  if (['w', 'a', 's', 'd'].includes(key)) {
    event.preventDefault();
    if (event.repeat) return;
    const wasMoving = hasForwardInput();
    keys.add(key);
    if (wasMoving !== hasForwardInput() || key === 'a' || key === 'd') sendLocalMovement(true);
    return;
  }
  if (key === 'e' && joined && !event.repeat) {
    event.preventDefault();
    if (scene.fishingState() !== 'idle') return;
    if (scene.carryingStoneId(selfId)) network.throwStone();
    else {
      const stoneId = scene.nearbyStoneId(selfId);
      if (stoneId) {
        if (myHeldFish) network.holdFish(null);
        network.pickStone(stoneId);
      }
    }
    return;
  }
  if (key === 'space' && joined) {
    event.preventDefault();
    if (event.repeat) return;
    const state = scene.fishingState();
    if (state === 'idle') {
      if (scene.carryingStoneId(selfId)) { showToast('Put the stone down first (E to throw).'); return; }
      const target = makeCastTarget();
      if (target) {
        if (myHeldFish) network.holdFish(null);
        network.castFish(target.x, target.z);
      }
    } else if (state === 'bite') startReelMiniGame();
    else if (state === 'casting' || state === 'waiting') network.cancelFishing();
    return;
  }
  if (event.key === 'Enter' && joined && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
    event.preventDefault();
    if (chatPanel.classList.contains('hidden')) setChatOpen(true);
    chatInput.focus();
    return;
  }
  if (key === 'space' || event.key.startsWith('Arrow')) event.preventDefault();
  keys.add(key);
});
window.addEventListener('keyup', (event) => {
  if (isPhotoboothMode) return;
  if (event.code === 'Space') reelGame?.setHeld(false);
  const key = keyNames[event.key] ?? event.key.toLowerCase();
  if (['w', 'a', 's', 'd'].includes(key)) {
    const wasMoving = hasForwardInput();
    keys.delete(key);
    if (wasMoving !== hasForwardInput() || key === 'a' || key === 'd') sendLocalMovement(true);
    return;
  }
  keys.delete(key);
});
window.addEventListener('blur', () => {
  const wasMoving = hasForwardInput();
  cancelMouseTurn();
  keys.clear(); reelGame?.setHeld(false);
  if (wasMoving) sendLocalMovement(true);
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    const wasMoving = hasForwardInput();
    cancelMouseTurn();
    keys.clear(); reelGame?.setHeld(false);
    if (wasMoving) sendLocalMovement(true);
  }
});

function animate(now: number): void {
  requestAnimationFrame(animate);
  const delta = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;
  updateNetDebug(now);
  if (joined && reelGame) {
    const snapshot = reelGame.update(delta);
    drawReel(snapshot);
    if (reelGame.result !== 'active') finishReel(reelGame.result === 'success');
  }
  if (joined) scene.stepCorrection(delta);
  if (joined && !isPhotoboothMode && !reelGame && scene.fishingState() === 'idle') {
    const forward = (keys.has('w') ? 1 : 0) - (keys.has('s') ? 1 : 0);
    const keyboardTurn = (keys.has('a') ? 1 : 0) - (keys.has('d') ? 1 : 0);
    let turn = keyboardTurn;
    if (keyboardTurn === 0 && mouseTurnRemaining !== 0 && delta > 0) {
      const maxTurn = MOVEMENT_RULES.turnSpeedRadians * delta * 1.35;
      const mouseStep = Math.max(-maxTurn, Math.min(maxTurn, mouseTurnRemaining));
      mouseTurnRemaining -= mouseStep;
      turn = mouseStep / (MOVEMENT_RULES.turnSpeedRadians * delta);
    } else if (keyboardTurn !== 0) mouseTurnRemaining = 0;
    const position = scene.getPosition();
    const next = stepMovement({ x: position.x, z: position.z, rotY: scene.localFacing() }, forward, turn, delta);
    scene.setLocalMotion(next.x, next.z, next.rotY);
  }
  if (joined && now - lastMinimapRenderAt >= 66) {
    lastMinimapRenderAt = now;
    minimap.render(now, scene.mapPlayers());
  }
  if (joined) {
    sendLocalMovement(false);
    const distance = Math.hypot(scene.getPosition().x, scene.getPosition().z);
    const fishing = scene.fishingState();
    const nearPhotobooth = !isPhotoboothMode && isNearPhotobooth();
    photoboothPrompt.classList.toggle('hidden', !nearPhotobooth);
    photoboothEnter.disabled = !nearPhotobooth;
    fishPrompt.classList.toggle('hidden', isPhotoboothMode || reelGame !== null || fishing === 'fighting' || distance > fishingRadius);
    fishPrompt.textContent = fishing === 'bite' ? 'A bite! Press Space to reel in' : fishing === 'waiting' ? 'Fishing… Space to stop' : fishing === 'casting' ? 'Casting… Space to reel in' : fishing === 'reeling' ? 'Reeling in…' : 'Space to cast';
  } else {
    photoboothPrompt.classList.add('hidden');
    photoboothEnter.disabled = true;
  }
  catchPopup.classList.toggle('hidden', !fishArt.render(now));
  scene.render(delta);
}

// The same frame loop renders the island before joining and drives gameplay after joining.
whatsNewClose.focus({ preventScroll: true });
requestAnimationFrame(animate);
