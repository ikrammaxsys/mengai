import './style.css';
import { Network, type ArenaPartyState, type BigCatchEvent, type CatchEntry, type CatchResult, type CrocodileScore, type FastestSlayerRecord, type HeldFish, type InventoryItem, type PlayerSnapshot } from './network';
import { GameScene } from './scene';
import { FishArt } from './fishModels';
import { FishViewer } from './fishViewer';
import { Minimap } from './minimap';
import { ArenaView } from './arenaView';
import { BowlingNet } from './bowlingNet';
import { BowlingMode } from './bowlingMode';
import { Photobooth, PHOTOBOOTH_CONFIG } from './photobooth';
import { FISH_CONFIG, reelParametersForDifficulty, type FishSpeciesId, type ReelParameters } from '../../shared/fishConfig';
import { ReelGame } from './reelGame';
import { MOVEMENT_RULES, stepMovement } from '../../shared/movement';
import { ARENA_CONFIG, type ArenaSnapshot } from '../../shared/arenaConfig';
import { WORLD_CONFIG } from '../../shared/worldConfig';
import { isWeatherType, WEATHER_CONFIG, type WeatherSnapshot, type WeatherType } from '../../shared/weatherConfig';
import { VoiceClient, type VoiceConnectionStatus } from './voice';
import { MusicManager, type MusicTrackId } from './music';
import { Jukebox } from './jukebox';
import { Theater } from './theater';
import { PLAYER_EMOJIS } from '../../shared/emojiReactions';
import { InputState, type InputAction } from './inputState';
import { TouchControls } from './touchControls';
import {
  fullscreenSupported,
  isCoarsePointer,
  loadMobileSettings,
  PerformanceGovernor,
  saveMobileSettings,
  toggleFullscreen,
  vibrate,
  type MobileSettings,
  type QualityPreference,
} from './mobileSupport';

const mobileSettings: MobileSettings = loadMobileSettings();
const coarsePointer = isCoarsePointer();
let sawFirstTouch = false;

const joinScreen = document.querySelector<HTMLElement>('#join-screen')!;
const appRoot = document.querySelector<HTMLElement>('#app')!;
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
const chickenScoreElement = document.querySelector<HTMLElement>('#chicken-score')!;
const connectionDot = document.querySelector<HTMLElement>('#connection-dot')!;
const connectionLabel = document.querySelector<HTMLElement>('#connection-label')!;
const viewToggle = document.querySelector<HTMLButtonElement>('#view-toggle')!;
const whatsNew = document.querySelector<HTMLElement>('#whats-new')!;
const whatsNewDialog = document.querySelector<HTMLElement>('.whats-new-card')!;
const whatsNewScroll = document.querySelector<HTMLElement>('#whats-new-scroll')!;
const whatsNewHighlights = document.querySelector<HTMLElement>('#whats-new-highlights')!;
const whatsNewAlso = document.querySelector<HTMLElement>('#whats-new-also')!;
const whatsNewDateBadge = document.querySelector<HTMLElement>('#whats-new-date')!;
const whatsNewClose = document.querySelector<HTMLButtonElement>('#whats-new-close')!;
const whatsNewDismiss = document.querySelector<HTMLButtonElement>('#whats-new-dismiss')!;
const whatsNewDontShow = document.querySelector<HTMLInputElement>('#whats-new-dont-show')!;
const whatsNewReopen = document.querySelector<HTMLButtonElement>('#whats-new-reopen')!;
const whatsNewReopenJoin = document.querySelector<HTMLButtonElement>('#whats-new-reopen-join')!;
const toast = document.querySelector<HTMLElement>('#toast')!;
const hitFlash = document.querySelector<HTMLElement>('#hit-flash')!;
const hudMenuToggle = document.querySelector<HTMLButtonElement>('#hud-menu-toggle')!;
const hudDockBackdrop = document.querySelector<HTMLElement>('#hud-dock-backdrop')!;
const settingsToggle = document.querySelector<HTMLButtonElement>('#settings-toggle')!;
const settingsPanel = document.querySelector<HTMLElement>('#settings-panel')!;
const settingsClose = document.querySelector<HTMLButtonElement>('#settings-close')!;
const touchModeSelect = document.querySelector<HTMLSelectElement>('#touch-mode')!;
const touchLeftHandedInput = document.querySelector<HTMLInputElement>('#touch-left-handed')!;
const touchSizeInput = document.querySelector<HTMLInputElement>('#touch-size')!;
const touchSizeValue = document.querySelector<HTMLElement>('#touch-size-value')!;
const touchOpacityInput = document.querySelector<HTMLInputElement>('#touch-opacity')!;
const touchOpacityValue = document.querySelector<HTMLElement>('#touch-opacity-value')!;
const hapticsInput = document.querySelector<HTMLInputElement>('#haptics-enabled')!;
const qualitySelect = document.querySelector<HTMLSelectElement>('#quality-select')!;
const fullscreenToggle = document.querySelector<HTMLButtonElement>('#fullscreen-toggle')!;
const portalPrompt = document.querySelector<HTMLElement>('#portal-prompt')!;
const portalEnterButton = document.querySelector<HTMLButtonElement>('#portal-enter')!;
const portalCancelButton = document.querySelector<HTMLButtonElement>('#portal-cancel')!;
const arenaPartyPanel = document.querySelector<HTMLElement>('#arena-party-panel')!;
const arenaPartyMembers = document.querySelector<HTMLElement>('#arena-party-members')!;
const arenaPartyRoom = document.querySelector<HTMLElement>('#arena-party-room')!;
const arenaPartyStartButton = document.querySelector<HTMLButtonElement>('#arena-party-start')!;
const arenaPartyLeaveButton = document.querySelector<HTMLButtonElement>('#arena-party-leave')!;
const arenaPartyInvites = document.querySelector<HTMLElement>('#arena-party-invites')!;
const arenaPartyInvitesList = document.querySelector<HTMLElement>('#arena-party-invites-list')!;
const arenaOverlay = document.querySelector<HTMLElement>('#arena-overlay')!;
const arenaVictoryPanel = document.querySelector<HTMLElement>('#arena-victory')!;
const arenaDefeatedPanel = document.querySelector<HTMLElement>('#arena-defeated')!;
const bowlingResultsPanel = document.querySelector<HTMLElement>('#bowling-results')!;
const bowlingPrompt = document.querySelector<HTMLElement>('#bowling-prompt')!;
const bowlingPartyPanel = document.querySelector<HTMLElement>('#bowling-party-panel')!;
const photoboothEnter = document.querySelector<HTMLButtonElement>('#photobooth-enter')!;
const photoboothPrompt = document.querySelector<HTMLElement>('#photobooth-prompt')!;
const weatherControl = document.querySelector<HTMLElement>('#weather-control')!;
const weatherBadge = document.querySelector<HTMLButtonElement>('#weather-badge')!;
const weatherIcon = document.querySelector<HTMLElement>('#weather-icon')!;
const weatherName = document.querySelector<HTMLElement>('#weather-name')!;
const weatherHint = document.querySelector<HTMLElement>('#weather-hint')!;
const fishPrompt = document.querySelector<HTMLElement>('#fish-prompt')!;
const jukeboxPrompt = document.querySelector<HTMLElement>('#jukebox-prompt')!;
const shopPrompt = document.querySelector<HTMLElement>('#shop-prompt')!;
const shopModal = document.querySelector<HTMLElement>('#shop-modal')!;
const shopClose = document.querySelector<HTMLButtonElement>('#shop-close')!;
const shopContent = document.querySelector<HTMLElement>('#shop-content')!;
const shopWallet = document.querySelector<HTMLElement>('#shop-wallet')!;
const coinCount = document.querySelector<HTMLElement>('#coin-count')!;
const scrapCount = document.querySelector<HTMLElement>('#scrap-count')!;
const pinnedGoal = document.querySelector<HTMLElement>('#pinned-goal')!;
const chatUi = document.querySelector<HTMLElement>('#chat-ui')!;
const chatToggle = document.querySelector<HTMLButtonElement>('#chat-toggle')!;
const chatPanel = document.querySelector<HTMLElement>('#chat-panel')!;
const chatClose = document.querySelector<HTMLButtonElement>('#chat-close')!;
const chatMessages = document.querySelector<HTMLElement>('#chat-messages')!;
const chatForm = document.querySelector<HTMLFormElement>('#chat-form')!;
const chatInput = document.querySelector<HTMLInputElement>('#chat-input')!;
const chatUnread = document.querySelector<HTMLElement>('#chat-unread')!;
const emojiDock = document.querySelector<HTMLElement>('.emoji-dock')!;
const emojiToggle = document.querySelector<HTMLButtonElement>('#emoji-toggle')!;
const emojiPicker = document.querySelector<HTMLElement>('#emoji-picker')!;
const leaderboardUi = document.querySelector<HTMLElement>('#leaderboard-ui')!;
const leaderboardToggle = document.querySelector<HTMLButtonElement>('#leaderboard-toggle')!;
const leaderboardPanel = document.querySelector<HTMLElement>('#leaderboard-panel')!;
const leaderboardClose = document.querySelector<HTMLButtonElement>('#leaderboard-close')!;
const leaderboardList = document.querySelector<HTMLOListElement>('#leaderboard-list')!;
const crocodileScoreList = document.querySelector<HTMLOListElement>('#crocodile-score-list')!;
const fastestSlayerValue = document.querySelector<HTMLElement>('#fastest-slayer-value')!;
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
const voiceToggle = document.querySelector<HTMLButtonElement>('#voice-toggle')!;
const voiceSettingsToggle = document.querySelector<HTMLButtonElement>('#voice-settings-toggle')!;
const voicePanel = document.querySelector<HTMLElement>('#voice-panel')!;
const voiceSettingsClose = document.querySelector<HTMLButtonElement>('#voice-settings-close')!;
const voiceStatus = document.querySelector<HTMLElement>('#voice-status')!;
const voiceMessage = document.querySelector<HTMLElement>('#voice-message')!;
const voiceAudioUnlock = document.querySelector<HTMLButtonElement>('#voice-audio-unlock')!;
const voicePtt = document.querySelector<HTMLInputElement>('#voice-ptt')!;
const voiceVolume = document.querySelector<HTMLInputElement>('#voice-volume')!;
const voiceVolumeValue = document.querySelector<HTMLElement>('#voice-volume-value')!;
const voicePlayers = document.querySelector<HTMLElement>('#voice-players')!;
const musicControl = document.querySelector<HTMLElement>('#music-control')!;
const musicToggle = document.querySelector<HTMLButtonElement>('#music-toggle')!;
const musicPanel = document.querySelector<HTMLElement>('#music-panel')!;
const musicVolume = document.querySelector<HTMLInputElement>('#music-volume')!;
const musicVolumeValue = document.querySelector<HTMLElement>('#music-volume-value')!;
const musicMute = document.querySelector<HTMLButtonElement>('#music-mute')!;
const netDebugEnabled = import.meta.env.DEV && new URLSearchParams(location.search).has('netdebug');
if (netDebugEnabled) netDebug.classList.remove('hidden');

const scene = new GameScene(document.querySelector<HTMLElement>('#game')!, document.querySelector<HTMLElement>('#name-labels')!);
for (const emoji of PLAYER_EMOJIS) {
  const button = document.createElement('button');
  button.className = 'emoji-reaction';
  button.type = 'button';
  button.dataset.emoji = emoji;
  button.textContent = emoji;
  button.setAttribute('aria-label', `Send ${emoji} reaction`);
  emojiPicker.appendChild(button);
}
const music = new MusicManager();
const speakingPlayers = new Set<string>();
const input = new InputState();
const keys = input.keys;
let touchUiActive = false;
let touchDeviceLayout = false;
const touchControls = new TouchControls(appRoot, input, {
  onPress: (action) => handleTouchActionPress(action),
  onRelease: (action) => handleTouchActionRelease(action),
});
let network: Network;
const theater = new Theater(appRoot, {
  start: (mode) => network.startTheater(mode),
  stop: () => network.stopTheater(),
  page: (page) => network.setTheaterPage(page),
  freeBrowse: (enabled) => network.setTheaterFreeBrowse(enabled),
  setPdf: (url) => network.setTheaterPdf(url),
  signal: (targetId, type, payload) => network.theaterSignal(targetId, type, payload),
  upload: (room, token, file) => network.uploadTheaterPdf(room, token, file),
  display: (video, canvas, refreshCanvas) => scene.setTheaterDisplay(video, canvas, refreshCanvas),
  focus: (focused) => {
    scene.setTheaterFocus(focused);
    appRoot.classList.toggle('theater-focused', focused);
    if (focused) { keys.clear(); cancelMouseTurn(); sendLocalMovement(true); }
  },
  presenter: (name) => scene.setTheaterPresenter(name),
});
scene.setTheaterVisibilityHandler((visible) => theater.setDisplayVisible(visible));
const seatPrompt = document.createElement('button');
seatPrompt.type = 'button';
seatPrompt.className = 'seat-proximity-prompt hidden';
seatPrompt.innerHTML = '<kbd>E</kbd><span>Press E to sit</span>';
appRoot.append(seatPrompt);
seatPrompt.addEventListener('click', () => interactWithSeat());
const ferrisPrompt = document.createElement('button');
ferrisPrompt.type = 'button';
ferrisPrompt.className = 'seat-proximity-prompt ferris-proximity-prompt hidden';
ferrisPrompt.innerHTML = '<kbd>E</kbd><span>Press E to board Ferris Wheel</span>';
appRoot.append(ferrisPrompt);
ferrisPrompt.addEventListener('click', () => interactWithFerris());
const jukebox = new Jukebox(document.querySelector<HTMLElement>('#jukebox-root')!, {
  pauseMovement: () => {
    keys.clear();
    cancelMouseTurn();
    sendLocalMovement(true);
  },
  enqueue: (videoId) => network.enqueueJukebox(videoId),
  enqueueLibrary: (libraryId) => network.enqueueJukeboxLibrary(libraryId),
  skip: () => network.skipJukebox(),
  ended: (videoId) => network.jukeboxEnded(videoId),
  failed: (videoId) => network.jukeboxFailed(videoId),
  toast: showToast,
});
let lastMusicDuck = false;
function syncMusicDuck(): void {
  const shouldDuck = speakingPlayers.size > 0 || jukebox.isAudible;
  if (lastMusicDuck === shouldDuck) return;
  lastMusicDuck = shouldDuck;
  music.duck(shouldDuck);
}
musicVolume.value = String(music.currentVolume);
musicVolumeValue.textContent = `${Math.round(music.currentVolume * 100)}%`;
musicMute.textContent = music.isMuted ? 'Unmute music' : 'Mute music';
musicMute.setAttribute('aria-pressed', String(music.isMuted));
let voice: VoiceClient;
voice = new VoiceClient({
  status: (status, message) => {
    const labels: Record<VoiceConnectionStatus, string> = { off: 'Off', connecting: 'Connecting…', connected: 'Connected', failed: 'Connection failed' };
    voiceStatus.textContent = labels[status];
    voiceMessage.textContent = message ?? (status === 'failed' ? 'Check your connection and try again.' : 'Enable your mic to talk with nearby players.');
    if (message) showToast(message);
    updateVoiceButton();
  },
  microphone: () => updateVoiceButton(),
  playbackBlocked: (blocked) => {
    voiceAudioUnlock.classList.toggle('hidden', !blocked);
    if (blocked) {
      voiceMessage.textContent = 'Your browser blocked voice playback. Click below to enable it.';
      setVoicePanel(true);
    } else if (voiceMessage.textContent === 'Your browser blocked voice playback. Click below to enable it.') {
      voiceMessage.textContent = 'Voice playback is enabled.';
    }
  },
  speaking: (playerId, speaking) => {
    scene.setVoiceSpeaking(playerId, speaking);
    if (speaking) speakingPlayers.add(playerId);
    else speakingPlayers.delete(playerId);
    syncMusicDuck();
    if (playerId === selfId && joined && typeof network !== 'undefined') network.sendSpeaking(speaking);
  },
  mutedPlayersChanged: renderVoicePlayers,
});
voiceVolume.value = String(voice.volume);
voiceVolumeValue.textContent = `${Math.round(voice.volume * 100)}%`;
voicePtt.checked = voice.isPushToTalk;
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
let currentCrocodileScores: CrocodileScore[] = [];
let inventoryItems: InventoryItem[] = [];
let shopData: any = null;
let shopConfig: any = null;
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
let joined = false;
let reconnectTimer = 0;
let reconnectDeadline = 0;
let reconnectAttempt = 0;
let reconnecting = false;
let arenaMode = false;
let portalPromptDismissedUntilExit = false;
let lastArenaMoveAt = 0;
let lastFerrisRiding = false;
let firstPersonView = false;
let selfId = '';
let currentRoom = '';
let currentArenaParty: ArenaPartyState | null = null;
const incomingArenaInvites = new Map<string, { partyId: string; leaderId: string; leaderName: string }>();
const roomPlayers = new Map<string, PlayerSnapshot>();
const arenaView = new ArenaView(arenaOverlay, {
  leave: () => network.leaveArena(),
  restart: () => network.restartArena(),
});
let bowlingNet: BowlingNet | null = null;
const bowlingMode = new BowlingMode({
  getNetwork: () => bowlingNet,
  getWorldPosition: () => scene.getPosition(),
  showToast,
  onExit: () => {
    appRoot.classList.remove('in-bowling');
    theater.setOccluded(false);
  },
  onCallout: (callout) => {
    if (callout === 'strike') vibrate([45, 35, 90], mobileSettings.haptics);
    else if (callout === 'spare') vibrate(35, mobileSettings.haptics);
  },
});
let voiceResumeToken = '';
let isPhotoboothMode = false;
let previousPhotoboothFacing = 0;
let availableRooms: { room: string; playerCount: number }[] = [];
let roomPollTimer = 0;
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
type WhatsNewItem = { tier: 'highlight' | 'also'; icon: string; title: string; description: string; tone?: 'arena' | 'voice' | 'backpack' | 'jukebox' | 'catch' | 'progress' | 'theater' };
const whatsNewVersion = '1.2.2'; // Bump when shipping a new What's New update.
const whatsNewReleaseDate = 'Nov 2026';
const whatsNewSeenKey = 'mengai:whats-new:last-seen-version';
let whatsNewReturnFocus: HTMLElement | null = null;
const whatsNewItems: WhatsNewItem[] = [
  { tier: 'highlight', icon: '🎳', title: 'Bowling at Mengai Lanes', description: 'Play solo or invite up to three players from your room for a five-row game.' },
  { tier: 'highlight', tone: 'theater', icon: '📺', title: 'Share the screen at Theater', description: 'Present your screen to the whole room and watch together.' },
  { tier: 'highlight', tone: 'arena', icon: '🐊', title: 'Upgraded Crocodile', description: 'The arena boss is tougher, faster, and more dangerous than before.' },
  { tier: 'highlight', tone: 'catch', icon: '🐠', title: 'New fish species', description: 'Discover the massive Ikan Bulan and legendary Ikan Naga.' },
  { tier: 'also', icon: '🎙️', title: 'Proximity voice', description: 'Talk with nearby fishers as you explore.' },
  { tier: 'also', icon: '🎵', title: 'Shared jukebox', description: 'Search songs and play them together around the island.' },
  { tier: 'also', icon: '✨', title: 'Smoother pond UX', description: 'Clearer prompts, stronger focus states, and easier keyboard controls.' },
  { tier: 'also', icon: '🎒', title: 'Your Backpack', description: 'Browse, sort, and release your catches.' },
  { tier: 'also', icon: '🐟', title: 'Hold your catch', description: 'Show off your catch; heavier fish look bigger.' },
  { tier: 'also', icon: '💾', title: 'Progress that saves', description: 'Catch records save; crowns mark the room leader.' },
  { tier: 'also', icon: '🍲', title: 'Campfire cooking', description: 'Share a warm meal by the fire.' },
  { tier: 'also', icon: '🌦️', title: 'Living weather', description: 'Rain and storms change fishing.' },
  { tier: 'also', icon: '🗺️', title: 'Island map', description: 'Find fishers, stones, and campfire.' },
  { tier: 'also', icon: '🪨', title: 'Stones & chickens', description: 'Toss stones at fishers or roaming chickens.' },
];

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function isNearJukebox(): boolean {
  const position = scene.getPosition();
  return Math.hypot(position.x - WORLD_CONFIG.jukebox.x, position.z - WORLD_CONFIG.jukebox.z) <= WORLD_CONFIG.jukebox.interactionRadius;
}

function openJukebox(): void {
  if (!joined || !isNearJukebox()) return;
  jukebox.open();
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
  if (playerId === selfId) {
    showHitFlash();
    vibrate(50, mobileSettings.haptics);
  }
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
  if (joined) void music.crossfadeTo(musicTrackForWeather(weather.type), 2500);
  updateWeatherBadge();
  if (announce) showToast(WEATHER_CONFIG.states[weather.type].toast);
}

function musicTrackForWeather(type: WeatherType): MusicTrackId {
  return type === 'rain' || type === 'storm' ? 'rain' : 'day';
}

function setMengaiWeather(weather: unknown): boolean {
  if (!import.meta.env.DEV || !isWeatherType(weather)) return false;
  if (joined) network.setDebugWeather(weather);
  else pendingDebugWeather = weather;
  return true;
}

if (import.meta.env.DEV) Object.assign(window, { setMengaiWeather });

function closeWhatsNew(): void {
  if (whatsNew.classList.contains('hidden')) return;
  if (whatsNewDontShow.checked) localStorage.setItem(whatsNewSeenKey, whatsNewVersion);
  else localStorage.removeItem(whatsNewSeenKey);
  whatsNew.classList.add('hidden');
  whatsNew.setAttribute('aria-hidden', 'true');
  const returnFocus = whatsNewReturnFocus;
  whatsNewReturnFocus = null;
  const target = returnFocus?.isConnected && returnFocus !== document.body && returnFocus !== document.documentElement && !whatsNew.contains(returnFocus)
    ? returnFocus
    : !joinScreen.classList.contains('hidden') ? joinButton : gameCanvas;
  target.focus({ preventScroll: true });
}

function openWhatsNew(): void {
  if (!whatsNew.classList.contains('hidden')) return;
  whatsNewReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  whatsNewDontShow.checked = true;
  whatsNew.classList.remove('hidden');
  whatsNew.setAttribute('aria-hidden', 'false');
  updateWhatsNewScrollState();
  requestAnimationFrame(() => whatsNewDismiss.focus({ preventScroll: true }));
}

function createWhatsNewCard(item: WhatsNewItem, index: number): HTMLElement {
  const card = document.createElement('article');
  card.setAttribute('role', 'listitem');
  card.className = item.tier === 'highlight'
    ? `whats-new-highlight ${item.tone ?? ''}`
    : 'whats-new-compact';
  if (item.tier === 'highlight') card.style.setProperty('--stagger-delay', `${index * 55}ms`);

  const icon = document.createElement('span');
  icon.className = item.tier === 'highlight' ? 'whats-new-highlight-icon' : 'whats-new-compact-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = item.icon;
  const title = document.createElement(item.tier === 'highlight' ? 'h4' : 'strong');
  title.className = item.tier === 'highlight' ? 'whats-new-highlight-title' : 'whats-new-compact-title';
  title.textContent = item.title;
  const description = document.createElement('p');
  description.className = item.tier === 'highlight' ? 'whats-new-highlight-description' : 'whats-new-compact-description';
  description.textContent = item.description;

  if (item.tier === 'highlight') card.append(icon, title, description);
  else {
    const copy = document.createElement('span');
    copy.className = 'whats-new-compact-copy';
    copy.append(title, description);
    card.append(icon, copy);
  }
  return card;
}

function updateWhatsNewScrollState(): void {
  const canScrollDown = whatsNewScroll.scrollHeight > whatsNewScroll.clientHeight + 2 &&
    whatsNewScroll.scrollTop + whatsNewScroll.clientHeight < whatsNewScroll.scrollHeight - 2;
  whatsNewScroll.classList.toggle('has-more-below', canScrollDown);
}

function trapWhatsNewFocus(event: KeyboardEvent): void {
  const focusable = [...whatsNewDialog.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [href], [tabindex]:not([tabindex="-1"])')]
    .filter((element) => element.getClientRects().length > 0);
  if (!focusable.length) { event.preventDefault(); return; }
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || !whatsNewDialog.contains(document.activeElement))) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !whatsNewDialog.contains(document.activeElement))) {
    event.preventDefault(); first.focus();
  }
}

function renderWhatsNew(): void {
  whatsNewDateBadge.textContent = whatsNewReleaseDate;
  whatsNewHighlights.replaceChildren();
  whatsNewAlso.replaceChildren();
  let highlightIndex = 0;
  for (const item of whatsNewItems) {
    if (item.tier === 'highlight') whatsNewHighlights.append(createWhatsNewCard(item, highlightIndex++));
    else whatsNewAlso.append(createWhatsNewCard(item, 0));
  }
  whatsNewScroll.scrollTop = 0;
  requestAnimationFrame(updateWhatsNewScrollState);
}

renderWhatsNew();
if (localStorage.getItem(whatsNewSeenKey) !== whatsNewVersion) openWhatsNew();

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

function updateChickenScore(score: number): void {
  chickenScoreElement.textContent = String(Math.max(0, Math.floor(score)));
}

function enterCrocodileArena(snapshot: ArenaSnapshot): void {
  arenaMode = true;
  theater.setOccluded(true);
  portalPrompt.classList.add('hidden');
  cancelMouseTurn();
  keys.clear();
  lastArenaMoveAt = 0;
  appRoot.classList.add('in-arena');
  arenaView.enter(snapshot, selfId);
}

function exitCrocodileArena(respawned: boolean): void {
  arenaMode = false;
  theater.setOccluded(false);
  arenaView.close();
  appRoot.classList.remove('in-arena');
  keys.clear();
  portalPromptDismissedUntilExit = true;
  if (respawned) showToast('You have respawned by the portal.');
}

function enterBowlingLane(game: import('../../shared/bowlingConfig').BowlingSnapshot): void {
  arenaMode = false;
  arenaView.close();
  appRoot.classList.remove('in-arena');
  theater.setOccluded(true);
  jukebox.close();
  cancelMouseTurn();
  keys.clear();
  setChatOpen(false);
  setOpenSidePanel(null);
  if (isPhotoboothMode) exitPhotobooth();
  appRoot.classList.add('in-bowling');
  bowlingMode.enter(game, selfId);
}

function syncRoomPlayerRoster(players: PlayerSnapshot[]): void {
  const nextIds = new Set(players.map((player) => player.id));
  let rosterChanged = nextIds.size !== roomPlayers.size;
  for (const player of players) {
    const existing = roomPlayers.get(player.id);
    if (!existing || existing.name !== player.name || existing.color !== player.color) rosterChanged = true;
  }
  roomPlayers.clear();
  for (const player of players) roomPlayers.set(player.id, player);
  if (rosterChanged) renderArenaParty();
}

function renderArenaParty(): void {
  const party = currentArenaParty;
  arenaPartyPanel.classList.toggle('hidden', !party);
  if (!party) return;

  arenaPartyMembers.replaceChildren();
  for (const member of party.members) {
    const row = document.createElement('div');
    row.className = 'arena-party-member';
    const name = document.createElement('strong');
    name.textContent = `${member.name}${member.playerId === selfId ? ' · You' : ''}`;
    const role = document.createElement('span');
    role.className = 'arena-party-role';
    role.textContent = member.playerId === party.leaderId ? 'Leader' : 'Joined';
    row.append(name, role);
    arenaPartyMembers.append(row);
  }
  for (const invited of party.invited) {
    const row = document.createElement('div');
    row.className = 'arena-party-member';
    const name = document.createElement('strong');
    name.textContent = invited.name;
    const role = document.createElement('span');
    role.className = 'arena-party-role';
    role.textContent = 'Invite pending';
    row.append(name, role);
    arenaPartyMembers.append(row);
  }

  arenaPartyRoom.replaceChildren();
  const memberIds = new Set([...party.members.map((member) => member.playerId), ...party.invited.map((member) => member.playerId)]);
  const available = [...roomPlayers.values()].filter((player) => player.id !== selfId && !memberIds.has(player.id));
  if (available.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'arena-party-empty';
    empty.textContent = 'No other players are currently in the room.';
    arenaPartyRoom.append(empty);
  }
  for (const player of available) {
    const row = document.createElement('div');
    row.className = 'arena-party-player';
    const name = document.createElement('span');
    name.textContent = player.name;
    const invite = document.createElement('button');
    invite.type = 'button';
    invite.textContent = 'Invite';
    invite.disabled = party.leaderId !== selfId;
    invite.addEventListener('click', () => network.inviteArenaPartyPlayer(player.id));
    row.append(name, invite);
    arenaPartyRoom.append(row);
  }

  const isLeader = party.leaderId === selfId;
  arenaPartyStartButton.disabled = !isLeader;
  arenaPartyStartButton.textContent = isLeader
    ? party.members.length > 1 ? 'Start together' : 'Start solo'
    : 'Waiting for leader';
  arenaPartyLeaveButton.textContent = isLeader ? 'Cancel party' : 'Leave party';
}

function renderArenaInvites(): void {
  arenaPartyInvitesList.replaceChildren();
  arenaPartyInvites.classList.toggle('hidden', incomingArenaInvites.size === 0);
  for (const invitation of incomingArenaInvites.values()) {
    const row = document.createElement('div');
    row.className = 'arena-party-invite';
    const name = document.createElement('span');
    name.textContent = `${invitation.leaderName} invited you`;
    const actions = document.createElement('div');
    const accept = document.createElement('button');
    accept.type = 'button';
    accept.textContent = 'Join';
    accept.addEventListener('click', () => {
      incomingArenaInvites.delete(invitation.partyId);
      renderArenaInvites();
      network.respondArenaPartyInvite(invitation.partyId, true);
    });
    const decline = document.createElement('button');
    decline.type = 'button';
    decline.textContent = 'No thanks';
    decline.addEventListener('click', () => {
      incomingArenaInvites.delete(invitation.partyId);
      renderArenaInvites();
      network.respondArenaPartyInvite(invitation.partyId, false);
    });
    actions.append(accept, decline);
    row.append(name, actions);
    arenaPartyInvitesList.append(row);
  }
}

function updateArenaPartyState(party: ArenaPartyState): void {
  currentArenaParty = party;
  incomingArenaInvites.delete(party.partyId);
  renderArenaInvites();
  portalPrompt.classList.add('hidden');
  renderArenaParty();
}

function closeArenaParty(partyId: string, reason: string): void {
  incomingArenaInvites.delete(partyId);
  if (currentArenaParty?.partyId === partyId) {
    currentArenaParty = null;
    renderArenaParty();
    if (reason === 'cancelled') showToast('The arena party was cancelled.');
    else if (reason === 'left') showToast('You left the arena party.');
  }
  renderArenaInvites();
}

function requestPortalEntry(): void {
  if (!joined || arenaMode) return;
  portalPromptDismissedUntilExit = true;
  portalPrompt.classList.add('hidden');
  network.createArenaParty();
}

function updatePortalPrompt(): void {
  if (!joined || arenaMode) {
    portalPrompt.classList.add('hidden');
    return;
  }
  const position = scene.getPosition();
  const distance = Math.hypot(position.x - WORLD_CONFIG.crocodilePortal.x, position.z - WORLD_CONFIG.crocodilePortal.z);
  if (distance > WORLD_CONFIG.crocodilePortal.useRadius) {
    portalPromptDismissedUntilExit = false;
    portalPrompt.classList.add('hidden');
  } else portalPrompt.classList.toggle('hidden', portalPromptDismissedUntilExit);
}

function hasForwardInput(): boolean { return input.hasForwardInput; }

/**
 * Contextual "primary" action, shared by the touch button and mirroring the
 * keyboard E shortcut: stones, seats, Ferris wheel, theater and arena portal.
 */
function performPrimaryAction(): void {
  if (!joined || isPhotoboothMode || jukebox.isOpen) return;
  if (reelGame) { reelGame.setHeld(true); return; }
  if (bowlingMode.isActive) { bowlingMode.beginTouchCharge(); return; }
  if (arenaMode) {
    if (arenaView.isNearExit()) network.leaveArena();
    else network.arenaStoneAction();
    return;
  }
  if (scene.fishingState() !== 'idle') return;
  if (scene.carryingStoneId(selfId)) { network.throwStone(); return; }
  const stoneId = scene.nearbyStoneId(selfId);
  if (stoneId) {
    if (myHeldFish) network.holdFish(null);
    network.pickStone(stoneId);
    return;
  }
  if (scene.seatedSeatId) { standFromSeat(); return; }
  const seatId = scene.nearbySeatId();
  if (seatId && !scene.isSeatOccupied(seatId)) { network.sitAtSeat(seatId); return; }
  if (isNearFerris() && scene.ferrisBoardingReady) { network.boardFerrisWheel(); return; }
  if (isNearJukebox()) { openJukebox(); return; }
  if (isNearShop()) { openShop(); return; }
  if (isNearPhotobooth()) { enterPhotobooth(); return; }
  if (theater.isNearby) { theater.openMenu(); return; }
  if (!portalPrompt.classList.contains('hidden')) requestPortalEntry();
}

/** Secondary action: fishing cast/reel or the reel mini-game hold. */
function performSecondaryAction(): void {
  if (!joined || isPhotoboothMode || jukebox.isOpen) return;
  if (reelGame) { reelGame.setHeld(true); return; }
  if (arenaMode || bowlingMode.isActive) return;
  const state = scene.fishingState();
  if (state === 'idle') {
    if (scene.carryingStoneId(selfId)) { showToast('Put the stone down first (Throw).'); return; }
    const target = makeCastTarget();
    if (target) {
      if (myHeldFish) network.holdFish(null);
      network.castFish(target.x, target.z);
    }
    return;
  }
  if (state === 'bite') { startReelMiniGame(); return; }
  if (state === 'casting' || state === 'waiting') network.cancelFishing();
}

function handleTouchActionPress(action: InputAction): void {
  input.press(action);
  if (action === 'primary') performPrimaryAction();
  else performSecondaryAction();
}

function handleTouchActionRelease(action: InputAction): void {
  input.release(action);
  if (action === 'primary') {
    if (reelGame) reelGame.setHeld(false);
    if (bowlingMode.isActive) bowlingMode.endTouchCharge();
    return;
  }
  if (reelGame) reelGame.setHeld(false);
}

type TouchUiMode = 'world' | 'arena' | 'bowling';
let isPageHidden = false;
let lastTouchLabelSync = 0;
let qualityPreference: QualityPreference = mobileSettings.quality;

function touchControlMode(): TouchUiMode {
  if (arenaMode) return 'arena';
  if (bowlingMode.isActive) return 'bowling';
  return 'world';
}

function touchControlLabels(mode: TouchUiMode): { primary: string; secondary: string } {
  if (mode === 'bowling') return { primary: bowlingMode.isCharging ? 'Release' : 'Throw', secondary: '' };
  if (mode === 'arena') return { primary: arenaView.isNearExit() ? 'Leave' : 'Stone', secondary: '' };
  if (reelGame) return { primary: 'Reel', secondary: 'Lift' };
  const fishing = scene.fishingState();
  const secondary = fishing === 'bite' ? 'Reel' : fishing === 'casting' || fishing === 'waiting' ? 'Stop' : 'Cast';
  let primary = 'Interact';
  if (fishing === 'idle') {
    if (scene.carryingStoneId(selfId)) primary = 'Throw';
    else if (scene.nearbyStoneId(selfId)) primary = 'Pick up';
    else if (scene.seatedSeatId) primary = 'Stand';
    else if (scene.nearbySeatId()) primary = 'Sit';
    else if (isNearFerris() && scene.ferrisBoardingReady) primary = 'Board';
    else if (isNearJukebox()) primary = 'Jukebox';
    else if (isNearShop()) primary = 'Shop';
    else if (isNearPhotobooth()) primary = 'Photo';
    else if (theater.isNearby) primary = 'Theater';
  }
  return { primary, secondary };
}

function setTouchDockOpen(open: boolean): void {
  hud.classList.toggle('dock-open', open);
  hudDockBackdrop.classList.toggle('hidden', !open);
  hudMenuToggle.setAttribute('aria-expanded', String(open));
  if (open) {
    touchControls.releaseMovement();
    setSettingsOpen(false);
  }
}

function setSettingsOpen(open: boolean): void {
  settingsPanel.classList.toggle('hidden', !open);
  settingsToggle.setAttribute('aria-expanded', String(open));
  settingsToggle.classList.toggle('active', open);
  appRoot.classList.toggle('settings-open', open);
  if (open) {
    touchControls.releaseMovement();
    hud.classList.remove('dock-open');
    hudDockBackdrop.classList.add('hidden');
    hudMenuToggle.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Touch UI is shown for coarse pointers, hybrid devices after the first touch,
 * or when the player forces it on in Settings. It hides itself for full-screen
 * modals so the buttons never sit on top of a dialog.
 */
function syncTouchUi(): void {
  const supported = mobileSettings.touchMode === 'on'
    || (mobileSettings.touchMode === 'auto' && (coarsePointer || sawFirstTouch));
  if (supported !== touchDeviceLayout) {
    touchDeviceLayout = supported;
    appRoot.classList.toggle('touch-device', supported);
  }
  const blocked = isPhotoboothMode || jukebox.isOpen || theater.isFocused || theater.isMenuOpen
    || !joinScreen.classList.contains('hidden')
    || !fishViewerRoot.classList.contains('hidden')
    || !expandedMap.classList.contains('hidden')
    || !whatsNew.classList.contains('hidden')
    || !leaderboardPanel.classList.contains('hidden')
    || !backpackPanel.classList.contains('hidden')
    || !chatPanel.classList.contains('hidden')
    || !voicePanel.classList.contains('hidden')
    || !settingsPanel.classList.contains('hidden')
    || !arenaVictoryPanel.classList.contains('hidden')
    || !arenaDefeatedPanel.classList.contains('hidden')
    || !bowlingResultsPanel.classList.contains('hidden');
  const active = joined && !isPageHidden && supported && !blocked;
  if (active !== touchUiActive) {
    touchUiActive = active;
    appRoot.classList.toggle('touch-ui-active', active);
    touchControls.setVisible(active);
    if (!active) setTouchDockOpen(false);
  }
  if (!active) return;
  const mode = touchControlMode();
  touchControls.setCharge(bowlingMode.chargePower, mode === 'bowling' && bowlingMode.isCharging);
  // Contextual labels depend on nearby objects; refresh them a few times a
  // second instead of every frame.
  const now = performance.now();
  if (now - lastTouchLabelSync < 120) return;
  lastTouchLabelSync = now;
  touchControls.setMode(mode);
  const labels = touchControlLabels(mode);
  touchControls.setLabels(labels.primary, labels.secondary);
}

function applyQualityPreference(): void {
  if (qualityPreference === 'auto') scene.setQuality(coarsePointer ? 'medium' : 'high');
  else scene.setQuality(qualityPreference);
}

const performanceGovernor = new PerformanceGovernor(() => {
  if (qualityPreference !== 'auto' || scene.quality === 'low') return;
  scene.setQuality('low');
  showToast('Graphics lowered to keep the game smooth.');
});

function applyTouchSettings(): void {
  touchControls.setSettings({
    scale: mobileSettings.controlScale,
    opacity: mobileSettings.controlOpacity,
    leftHanded: mobileSettings.leftHanded,
  });
  saveMobileSettings(mobileSettings);
}

touchModeSelect.value = mobileSettings.touchMode;
touchLeftHandedInput.checked = mobileSettings.leftHanded;
touchSizeInput.value = String(Math.round(mobileSettings.controlScale * 100));
touchSizeValue.textContent = `${touchSizeInput.value}%`;
touchOpacityInput.value = String(Math.round(mobileSettings.controlOpacity * 100));
touchOpacityValue.textContent = `${touchOpacityInput.value}%`;
hapticsInput.checked = mobileSettings.haptics;
qualitySelect.value = mobileSettings.quality;
applyTouchSettings();
applyQualityPreference();

touchModeSelect.addEventListener('change', () => {
  const value = touchModeSelect.value;
  mobileSettings.touchMode = value === 'on' || value === 'off' ? value : 'auto';
  saveMobileSettings(mobileSettings);
  syncTouchUi();
});
touchLeftHandedInput.addEventListener('change', () => {
  mobileSettings.leftHanded = touchLeftHandedInput.checked;
  applyTouchSettings();
});
touchSizeInput.addEventListener('input', () => {
  mobileSettings.controlScale = Math.max(0.75, Math.min(1.4, Number(touchSizeInput.value) / 100));
  touchSizeValue.textContent = `${touchSizeInput.value}%`;
  applyTouchSettings();
});
touchOpacityInput.addEventListener('input', () => {
  mobileSettings.controlOpacity = Math.max(0.3, Math.min(1, Number(touchOpacityInput.value) / 100));
  touchOpacityValue.textContent = `${touchOpacityInput.value}%`;
  applyTouchSettings();
});
hapticsInput.addEventListener('change', () => {
  mobileSettings.haptics = hapticsInput.checked;
  saveMobileSettings(mobileSettings);
  if (mobileSettings.haptics) vibrate(25, true);
});
qualitySelect.addEventListener('change', () => {
  const value = qualitySelect.value;
  qualityPreference = value === 'high' || value === 'medium' || value === 'low' ? value : 'auto';
  mobileSettings.quality = qualityPreference;
  performanceGovernor.reset();
  applyQualityPreference();
  saveMobileSettings(mobileSettings);
});
if (!fullscreenSupported()) {
  fullscreenToggle.classList.add('hidden');
} else {
  fullscreenToggle.addEventListener('click', () => {
    void toggleFullscreen().then((active) => {
      fullscreenToggle.textContent = active ? 'Exit fullscreen' : 'Enter fullscreen';
    });
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreenToggle.textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen';
  });
}

function sendLocalMovement(force = false): void {
  if (!joined || typeof network === 'undefined') return;
  const position = scene.getPosition();
  const rotY = scene.localFacing();
  const moving = !isPhotoboothMode && !jukebox.isOpen && !reelGame && scene.fishingState() === 'idle' && hasForwardInput();
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

function standFromSeat(): void {
  if (!scene.seatedSeatId) return;
  network.standFromSeat();
  scene.setLocalSeat(null);
  theater.setSeated(false);
  sendLocalMovement(true);
}

function interactWithSeat(): void {
  if (!joined) return;
  if (scene.seatedSeatId) { standFromSeat(); return; }
  const seatId = scene.nearbySeatId();
  if (seatId && !scene.isSeatOccupied(seatId)) network.sitAtSeat(seatId);
}

function interactWithFerris(): void {
  if (!joined) return;
  if (scene.isFerrisRiding) network.requestFerrisExit();
  else if (isNearFerris() && scene.ferrisBoardingReady) network.boardFerrisWheel();
}

function isNearFerris(): boolean {
  const wheel = WORLD_CONFIG.playground.wheel;
  const position = scene.getPosition();
  return Math.hypot(position.x - wheel.boardingSpot.x, position.z - wheel.boardingSpot.z) <= wheel.queueRadius;
}

function playFerrisDing(starting: boolean): void {
  try {
    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const now = audio.currentTime;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(starting ? 659.25 : 523.25, now);
    oscillator.frequency.exponentialRampToValueAtTime(starting ? 880 : 392, now + 0.22);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    oscillator.connect(gain); gain.connect(audio.destination);
    oscillator.start(now); oscillator.stop(now + 0.34);
    window.setTimeout(() => { void audio.close(); }, 500);
  } catch { /* Audio may not be available in this browser. */ }
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
  connectionDot.classList.toggle('reconnecting', !value && reconnecting);
  connectionLabel.textContent = value ? 'Connected' : 'Disconnected';
  document.querySelector<HTMLButtonElement>('#connection-control')!.setAttribute('aria-label', value ? 'Connected' : 'Disconnected');
}

function scheduleReconnect(): void {
  window.clearTimeout(reconnectTimer);
  if (!reconnecting) return;
  const remainingMs = reconnectDeadline - Date.now();
  if (remainingMs <= 0) {
    reconnecting = false;
    setConnected(false);
    joinScreen.classList.remove('hidden');
    hud.classList.add('hidden');
    formError.textContent = 'Could not reconnect within 20 seconds. Please join again.';
    joinButton.disabled = false;
    joinButton.innerHTML = 'Rejoin the pond <span aria-hidden="true">→</span>';
    return;
  }
  const delayMs = Math.min(2000 + reconnectAttempt * 500, remainingMs);
  reconnectTimer = window.setTimeout(() => {
    if (!reconnecting) return;
    reconnectAttempt += 1;
    connectionLabel.textContent = `Reconnecting… (${Math.ceil((reconnectDeadline - Date.now()) / 1000)}s)`;
    join(currentRoom, nameInput.value.trim(), true);
  }, delayMs);
}

function updateVoiceButton(): void {
  const active = voice.isEnabled;
  const transmitting = voice.isMicrophoneEnabled;
  let label: string;
  if (voice.connectionStatus === 'connecting') label = 'Voice connecting';
  else if (voice.connectionStatus === 'failed') label = 'Retry voice chat';
  else if (!active) label = 'Enable voice chat';
  else if (voice.isPushToTalk) label = transmitting ? 'Voice on · release V to mute' : 'Voice ready · hold V to talk';
  else label = transmitting ? 'Microphone on · click to mute' : 'Microphone off · click to unmute';
  voiceToggle.setAttribute('aria-label', label);
  voiceToggle.title = label;
  voiceToggle.dataset.status = voice.connectionStatus;
  voiceToggle.setAttribute('aria-pressed', String(transmitting));
  voiceToggle.classList.toggle('active', transmitting || (active && voice.isPushToTalk));
  voiceToggle.classList.toggle('voice-muted', active && !transmitting && !voice.isPushToTalk);
  const tooltip = voiceToggle.querySelector<HTMLElement>('.dock-tooltip');
  if (tooltip) tooltip.textContent = voice.isPushToTalk ? (transmitting ? 'Talking · V' : 'Hold to talk · V') : (transmitting ? 'Mic on' : active ? 'Mic off' : 'Enable voice');
}

function renderVoicePlayers(): void {
  voicePlayers.replaceChildren();
  const others = scene.mapPlayers().filter((player) => player.id !== selfId);
  if (!others.length) {
    const empty = document.createElement('span');
    empty.className = 'voice-empty';
    empty.textContent = joined ? 'No other players in this room yet.' : 'Join the pond to see players.';
    voicePlayers.append(empty);
    return;
  }
  for (const player of others) {
    const row = document.createElement('div');
    row.className = 'voice-player-row';
    const name = document.createElement('span');
    name.textContent = player.name;
    const label = document.createElement('label');
    const mute = document.createElement('input');
    mute.type = 'checkbox';
    mute.checked = voice.isPlayerMuted(player.id);
    mute.setAttribute('aria-label', `Mute ${player.name}`);
    mute.addEventListener('change', () => voice.setPlayerMuted(player.id, mute.checked));
    label.append(mute, document.createTextNode('Mute'));
    row.append(name, label);
    voicePlayers.append(row);
  }
}

function setVoicePanel(open: boolean): void {
  voicePanel.classList.toggle('hidden', !open);
  voiceSettingsToggle.classList.toggle('active', open);
  voiceSettingsToggle.setAttribute('aria-expanded', String(open));
  if (open) renderVoicePlayers();
}

function setMusicPanel(open: boolean): void {
  musicPanel.classList.toggle('hidden', !open);
  musicToggle.classList.toggle('active', open);
  musicToggle.setAttribute('aria-expanded', String(open));
}

function updateMusicControls(): void {
  musicVolume.value = String(music.currentVolume);
  musicVolumeValue.textContent = `${Math.round(music.currentVolume * 100)}%`;
  musicMute.textContent = music.isMuted ? 'Unmute music' : 'Mute music';
  musicMute.setAttribute('aria-pressed', String(music.isMuted));
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

function setEmojiPickerOpen(open: boolean): void {
  emojiPicker.classList.toggle('hidden', !open);
  emojiToggle.setAttribute('aria-expanded', String(open));
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
  return { id: item.catchId, playerId: selfId, playerName: catcher || 'You', species: item.species, weightKg: item.weightKg, rarity: item.rarity, timestamp: item.caughtAt, kind: item.kind };
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
  for (const species of FISH_CONFIG.species.filter((entry) => entry.id !== 'kasut-lama')) {
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
  const fishCount = inventoryItems.filter((item) => item.kind !== 'junk').length;
  const junkCount = inventoryItems.length - fishCount;
  backpackSummary.textContent = `Backpack · ${fishCount} ${fishCount === 1 ? 'fish' : 'fish'}${junkCount ? ` · ${junkCount} junk` : ''}`;
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
  const matchesFilter = (item: InventoryItem) => selectedSpecies === 'all' || item.species === selectedSpecies;
  const sorted = inventoryItems.filter((item) => item.kind !== 'junk' && matchesFilter(item));
  const junkItems = inventoryItems.filter((item) => item.kind === 'junk' && matchesFilter(item));
  const sortItems = (items: InventoryItem[]) => {
    if (backpackSort.value === 'heaviest') items.sort((a, b) => b.weightKg - a.weightKg);
    else if (backpackSort.value === 'rarity') items.sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity] || b.weightKg - a.weightKg);
    else items.sort((a, b) => b.caughtAt - a.caughtAt);
  };
  sortItems(sorted);
  sortItems(junkItems);

  backpackList.replaceChildren();
  if (inventoryItems.length === 0) {
    const empty = document.createElement('p'); empty.className = 'backpack-empty'; empty.textContent = 'No fish yet. Go cast a line!';
    backpackList.append(empty); return;
  }
  if (sorted.length === 0 && junkItems.length === 0) {
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
  if (junkItems.length) {
    const section = document.createElement('h3');
    section.className = 'backpack-section-title';
    section.textContent = 'Junk';
    backpackList.append(section);
    for (const item of junkItems) {
      const species = speciesConfig(item.species);
      const row = document.createElement('article');
      row.className = 'backpack-row junk-row';
      row.style.setProperty('--rarity-color', species.rarityColor);
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      const icon = document.createElement('img');
      icon.className = 'backpack-row-icon'; icon.alt = ''; icon.src = fishArt.iconDataUrl(item.species, item.weightKg);
      const details = document.createElement('div'); details.className = 'backpack-row-main';
      const title = document.createElement('strong'); title.textContent = species.name;
      const meta = document.createElement('span'); meta.className = 'backpack-row-meta'; meta.textContent = `${item.weightKg.toFixed(2)} kg · ${timeAgo(item.caughtAt)}`;
      const rarity = document.createElement('span'); rarity.className = 'backpack-rarity'; rarity.textContent = 'junk';
      details.append(title, meta, rarity);
      const actions = document.createElement('div'); actions.className = 'backpack-row-actions';
      const hold = document.createElement('button'); hold.type = 'button'; hold.dataset.action = 'hold';
      hold.textContent = myHeldFish?.catchId === item.catchId ? 'Put away' : 'Hold';
      hold.addEventListener('click', () => {
        if (myHeldFish?.catchId === item.catchId) network.holdFish(null);
        else holdFish(item.catchId);
      });
      const release = document.createElement('button'); release.type = 'button'; release.dataset.action = 'release'; release.className = 'release-button';
      if (pendingReleaseId === item.catchId) {
        release.textContent = 'Sure?';
        release.addEventListener('click', () => { network.releaseFish(item.catchId); pendingReleaseId = null; });
        const keep = document.createElement('button'); keep.type = 'button'; keep.dataset.action = 'cancel-release'; keep.textContent = 'Keep';
        keep.addEventListener('click', () => { pendingReleaseId = null; renderBackpack(); });
        actions.append(hold, release, keep);
      } else {
        release.textContent = 'Release';
        release.addEventListener('click', () => { pendingReleaseId = item.catchId; renderBackpack(); });
        actions.append(hold, release);
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
    if (item.kind !== 'junk') totalCaught += 1;
    if (joined) {
      backpackToggle.classList.remove('pulse');
      void backpackToggle.offsetWidth;
      backpackToggle.classList.add('pulse');
      window.clearTimeout(backpackPulseTimer);
      backpackPulseTimer = window.setTimeout(() => backpackToggle.classList.remove('pulse'), 900);
    }
  }
  if (item.kind !== 'junk') {
    if (!personalBestFish || item.weightKg > personalBestFish.weightKg) personalBestFish = item;
    const speciesBest = collectionBests.get(item.species);
    if (!speciesBest || item.weightKg > speciesBest.weightKg) collectionBests.set(item.species, item);
  }
  inventoryItems.sort((a, b) => b.caughtAt - a.caughtAt);
  renderBackpack();
}

let shopTab: 'sell' | 'shop' | 'wardrobe' = 'sell';

function isNearShop(): boolean {
  const stall = shopConfig?.stall ?? { x: -7.5, z: -10.5, interactionRadius: 3.2 };
  const position = scene.getPosition();
  return Math.hypot(position.x - stall.x, position.z - stall.z) <= stall.interactionRadius;
}

function openShop(): void {
  if (!joined || !isNearShop()) return;
  shopModal.classList.remove('hidden');
  network.openShop();
}

function closeShop(): void {
  shopModal.classList.add('hidden');
}

shopClose.addEventListener('click', closeShop);
document.querySelector('.shop-backdrop')?.addEventListener('click', closeShop);
document.querySelectorAll<HTMLButtonElement>('.shop-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    shopTab = button.dataset.tab as typeof shopTab;
    document.querySelectorAll('.shop-tabs button').forEach((entry) => entry.classList.toggle('active', entry === button));
    renderShop();
  });
});

function updateEconomyHud(): void {
  const coins = shopData?.coins ?? 0;
  const scrap = shopData?.scrap ?? 0;
  coinCount.textContent = String(coins);
  scrapCount.textContent = String(scrap);
  shopWallet.textContent = `${coins} coins · ${scrap} scrap`;
  if (shopData?.pinnedItem && shopConfig) {
    const item = shopConfig.items.find((entry: any) => entry.id === shopData.pinnedItem);
    if (item) {
      pinnedGoal.classList.remove('hidden');
      pinnedGoal.textContent = `Goal: ${item.name} · ${coins}/${item.price}`;
    }
  } else pinnedGoal.classList.add('hidden');
}

function showCoinFloat(amount: number): void {
  if (!amount) return;
  const bubble = document.createElement('div');
  bubble.className = 'coin-float';
  bubble.textContent = `+${amount} 🪙`;
  document.body.append(bubble);
  window.setTimeout(() => bubble.remove(), 1200);
}

function shopFishPrice(item: InventoryItem): number {
  if (item.kind === 'junk') return 0;
  const species = FISH_CONFIG.species.find((entry) => entry.id === item.species);
  if (!species) return 0;
  const base = shopConfig?.baseValues?.[species.id] ?? 0;
  const position = (item.weightKg - species.minKg) / Math.max(0.0001, species.maxKg - species.minKg);
  const factor = (shopConfig?.weightFactor?.baseline ?? 0.7) + (shopConfig?.weightFactor?.weightRange ?? 0.6) * Math.max(0, Math.min(1, position));
  return Math.max(1, Math.round(base * factor));
}

function renderShop(): void {
  updateEconomyHud();
  if (!shopData) return;
  shopContent.replaceChildren();
  if (shopTab === 'sell') {
    const count = shopData.dailySold?.count ?? 0;
    const fullLeft = Math.max(0, 20 - count);
    const header = document.createElement('p');
    header.className = 'shop-daily';
    header.textContent = `Full price: ${fullLeft} left today · 50% for 21–40 · 25% after 40`;
    shopContent.append(header);
    const bySpecies = new Map<string, InventoryItem[]>();
    for (const item of inventoryItems) {
      const list = bySpecies.get(item.species) ?? [];
      list.push(item);
      bySpecies.set(item.species, list);
    }
    for (const [speciesId, items] of bySpecies) {
      const species = FISH_CONFIG.species.find((entry) => entry.id === speciesId);
      if (!species) continue;
      const row = document.createElement('div');
      row.className = 'shop-row';
      const name = document.createElement('div');
      name.innerHTML = `<strong>${species.name}</strong><br><span class="shop-daily">${items.length} owned · ${species.kind === 'junk' ? '1 scrap each' : `${shopFishPrice(items[0])} coin est.`}</span>`;
      const actions = document.createElement('div');
      actions.className = 'shop-row-actions';
      if (species.kind !== 'junk') {
        const sellOne = document.createElement('button');
        sellOne.type = 'button';
        sellOne.textContent = 'Sell one';
        sellOne.addEventListener('click', () => {
          if (items.length <= 1) { showToast('Keep one specimen for the aquarium.'); return; }
          const estimated = shopFishPrice(items[0]);
          if (estimated >= (shopConfig?.confirmThresholdCoins ?? 100) && !window.confirm(`Sell this ${species.name} for about ${estimated} coins?`)) return;
          network.sellFish(speciesId, 1);
        });
        actions.append(sellOne);
        if (items.length > 1) {
          const sellAll = document.createElement('button');
          sellAll.type = 'button';
          sellAll.textContent = 'Sell all';
          sellAll.addEventListener('click', () => {
            if (!window.confirm(`Sell all ${species.name} copies except the protected aquarium specimen?`)) return;
            network.sellFish(speciesId, 'all');
          });
          actions.append(sellAll);
        }
      } else {
        const sellAll = document.createElement('button');
        sellAll.type = 'button';
        sellAll.textContent = 'Turn in scrap';
        sellAll.addEventListener('click', () => network.sellFish(speciesId, 'all'));
        actions.append(sellAll);
      }
      row.append(name, actions);
      shopContent.append(row);
    }
  } else if (shopTab === 'shop') {
    for (const item of (shopConfig?.items ?? [])) {
      const owned = shopData.ownedItems.includes(item.id);
      const card = document.createElement('article');
      card.className = `shop-item${owned ? '' : ''}`;
      const detail = document.createElement('div');
      detail.innerHTML = `<strong>${item.name}</strong><br><span class="shop-daily">${item.price} coins${item.scrap ? ` · ${item.scrap} scrap` : ''}</span>`;
      if (item.requiredFish) detail.insertAdjacentHTML('beforeend', `<br><span class="shop-lock">Requires one extra ${item.requiredFish.species === 'golden-koi' ? 'Koi Emas' : item.requiredFish.species}</span>`);
      const controls = document.createElement('div');
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.textContent = shopData.pinnedItem === item.id ? 'Unpin' : 'Pin goal';
      pin.addEventListener('click', () => network.pinShopItem(shopData.pinnedItem === item.id ? null : item.id));
      controls.append(pin);
      if (!owned) {
        const buy = document.createElement('button');
        buy.type = 'button';
        buy.textContent = 'Buy';
        buy.addEventListener('click', () => network.buyShopItem(item.id));
        controls.append(buy);
      } else {
        const ownedText = document.createElement('span');
        ownedText.className = 'shop-lock';
        ownedText.textContent = 'Owned';
        controls.append(ownedText);
      }
      card.append(detail, controls);
      shopContent.append(card);
    }
  } else {
    for (const item of (shopConfig?.items ?? []).filter((entry: any) => shopData.ownedItems.includes(entry.id))) {
      const row = document.createElement('div');
      row.className = 'shop-row';
      const name = document.createElement('strong');
      name.textContent = item.name;
      const equip = document.createElement('button');
      equip.type = 'button';
      equip.textContent = shopData.equipped[item.slot] === item.id ? 'Unequip' : 'Equip';
      equip.addEventListener('click', () => network.equipShopItem(item.slot, shopData.equipped[item.slot] === item.id ? null : item.id));
      row.append(name, equip);
      shopContent.append(row);
    }
  }
  updateEconomyHud();
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

function updateCrocodileScores(scores: CrocodileScore[]): void {
  const normalized = [...scores].filter((score) => score.count > 0).sort((a, b) => b.count - a.count || a.playerName.localeCompare(b.playerName));
  for (const score of normalized) scene.setCrocodileSlainCount(score.playerId, score.count);
  if (JSON.stringify(normalized) === JSON.stringify(currentCrocodileScores)) return;
  currentCrocodileScores = normalized;
  crocodileScoreList.replaceChildren();
  if (normalized.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'crocodile-score-empty';
    empty.textContent = 'No crocodiles slain yet.';
    crocodileScoreList.append(empty);
    return;
  }
  for (const [index, score] of normalized.slice(0, 10).entries()) {
    const row = document.createElement('li');
    const rank = document.createElement('span'); rank.textContent = `${index + 1}.`;
    const player = document.createElement('strong'); player.textContent = score.playerName;
    const count = document.createElement('span'); count.textContent = String(score.count);
    row.append(rank, player, count);
    crocodileScoreList.append(row);
  }
}

function updateFastestSlayer(record: FastestSlayerRecord | null): void {
  scene.setFastestSlayer(record?.playerId ?? null);
  arenaView.setFastestSlayer(record?.playerId ?? null);
  if (!record) {
    fastestSlayerValue.textContent = 'No record yet';
    return;
  }
  const seconds = Math.floor(Math.max(0, record.timeMs) / 1000);
  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  fastestSlayerValue.textContent = `${record.name} · ${time}`;
}

function showCatch(result: CatchResult): void {
  currentCatch = result.entry;
  cacheCatch(result.entry);
  const species = speciesConfig(result.entry.species);
  fishArt.show(result.entry.species, result.entry.weightKg);
  catchName.textContent = result.message ?? species.name;
  catchWeight.textContent = `${result.entry.weightKg.toFixed(2)} kg`;
  catchRarity.textContent = result.entry.kind === 'junk' ? 'junk' : species.rarity;
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

function join(room: string, name: string, isReconnectAttempt = false): void {
  if (!isReconnectAttempt) {
    reconnecting = false;
    window.clearTimeout(reconnectTimer);
    formError.textContent = '';
  }
  joinButton.disabled = true;
  joinButton.innerHTML = isReconnectAttempt ? 'Reconnecting…' : 'Joining…';
  network = new Network({
    joined: (message) => {
      reconnecting = false;
      window.clearTimeout(reconnectTimer);
      observeServerTime(message.serverTime);
      scene.setFerrisWheelStartedAt(message.ferrisWheelStartedAt);
      arenaMode = false;
      appRoot.classList.remove('in-arena');
      arenaView.close();
      if (bowlingMode.isActive) bowlingMode.handleExit('reconnect');
      appRoot.classList.remove('in-bowling');
      currentArenaParty = null;
      incomingArenaInvites.clear();
      renderArenaParty();
      renderArenaInvites();
      portalPromptDismissedUntilExit = false;
      applyWeather(message.weather, false);
      selfId = message.selfId;
      shopData = message.shop ?? null;
      shopConfig = message.shopConfig ?? null;
      updateEconomyHud();
      voiceResumeToken = message.resumeToken;
      theater.setSession(selfId, message.room, message.resumeToken);
      theater.setOccluded(false);
      theater.applyState(message.theater);
      jukebox.setClockOffset(serverClockOffset);
      movementSequence = 0; lastSentMotion = null; lastMovementSentAt = 0; lastMovementHeartbeatAt = 0;
      currentRoom = message.room;
      voice.setSession(message.room, selfId, message.resumeToken);
      document.querySelector('h1')!.innerHTML = 'Welcome to<br/><span>Mengai</span>';
      document.querySelector('.intro')!.textContent = 'Find a quiet spot by the water and see who else is out fishing.';
      scene.clearPlayers();
      seatPrompt.classList.add('hidden');
      scene.setLocalId(selfId);
      scene.setFirstPersonView(firstPersonView);
      syncRoomPlayerRoster(message.players);
      bowlingNet = new BowlingNet(network);
      bowlingMode.setNetwork(bowlingNet);
      bowlingMode.setSelfId(selfId);
      bowlingMode.setRoomPlayers(message.players);
      bowlingMode.setBestSoloScore(message.bowlingBestScore);
      bowlingMode.clearSocial();
      const me = message.players.find((player) => player.id === selfId);
      myHeldFish = me?.holdingFish ?? null;
      updateChickenScore(me?.chickenScore ?? 0);
      if (me) scene.addLocal(me);
      for (const player of message.players) if (player.id !== selfId) scene.upsert(player, message.serverTime);
      scene.setSeatOccupancy(message.seatOccupancy ?? {});
      theater.setSeated(Boolean(scene.seatedSeatId));
      scene.setStones(message.stones ?? []);
      scene.setChickens(message.chickens ?? [], message.serverTime);
      scene.setCampfireCooking(message.campfireCooking ?? null);
      roomHud.textContent = `Room ${message.room}`;
      updateLeaderboard(message.leaderboard ?? []);
      updateCrocodileScores(message.crocodileScores ?? []);
      updateFastestSlayer(message.fastestSlayer ?? null);
      chatMessages.replaceChildren();
      const emptyHint = document.createElement('p');
      emptyHint.className = 'chat-empty';
      emptyHint.textContent = 'Say hello to everyone in this room.';
      chatMessages.append(emptyHint);
      unreadMessages = 0;
      chatUnread.classList.add('hidden');
      chatUi.classList.remove('hidden');
      setChatOpen(false);
      setEmojiPickerOpen(false);
      leaderboardUi.classList.remove('hidden');
      backpackUi.classList.remove('hidden');
      setOpenSidePanel(null);
      updateCount();
      renderVoicePlayers();
      joined = true;
      void music.play(currentWeather ? musicTrackForWeather(currentWeather.type) : 'day');
      const debugWeather = pendingDebugWeather ?? forcedWeather;
      pendingDebugWeather = null;
      if (debugWeather) network.setDebugWeather(debugWeather);
      if (roomPollTimer) window.clearInterval(roomPollTimer);
      roomPollTimer = 0;
      joinScreen.classList.add('hidden');
      hud.classList.remove('hidden');
      setConnected(true);
      syncTouchUi();
      updateVoiceButton();
      joinButton.disabled = false;
      joinButton.innerHTML = 'Join the pond <span aria-hidden="true">→</span>';
      formError.textContent = '';
      const resumeKey = `mengai:resume:${encodeURIComponent(message.room)}:${encodeURIComponent(name.toLocaleLowerCase())}`;
      if (message.resumeToken) localStorage.setItem(resumeKey, message.resumeToken);
    },
    state: (players, serverTime) => {
      observeServerTime(serverTime);
      syncRoomPlayerRoster(players);
      bowlingMode.setRoomPlayers(players);
      for (const player of players) scene.upsert(player, serverTime);
      const me = players.find((player) => player.id === selfId);
      if (me) updateChickenScore(me.chickenScore);
      updateCount();
    },
    speaking: (playerId, speaking) => scene.setVoiceSpeaking(playerId, speaking),
    playerJoined: (player, serverTime) => { observeServerTime(serverTime); roomPlayers.set(player.id, player); scene.upsert(player, serverTime); updateCount(); renderArenaParty(); renderVoicePlayers(); bowlingMode.setRoomPlayers([...roomPlayers.values()]); showToast(`${player.name} joined the pond`); },
    playerLeft: (id) => {
      theater.playerLeft(id);
      voice.removeGamePlayer(id);
      speakingPlayers.delete(id);
      syncMusicDuck();
      roomPlayers.delete(id);
      scene.remove(id); updateCount(); renderArenaParty(); renderVoicePlayers(); bowlingMode.setRoomPlayers([...roomPlayers.values()]);
    },
    correction: (message) => { if (message.seq >= movementSequence) scene.applyCorrection(message.x, message.z); },
    clockOffset: (offsetMs) => {
      serverClockOffset = offsetMs; hasServerClockSample = true; scene.setServerClockOffset(offsetMs); jukebox.setClockOffset(offsetMs);
    },
    error: (message) => {
      if (reconnecting) {
        network.close();
        scheduleReconnect();
        return;
      }
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
    catchResult: (result) => { pendingReelSuccess = null; scene.petHop(result.entry.playerId); showCatch(result); },
    leaderboard: updateLeaderboard,
    crocodileScore: (score) => updateCrocodileScores([...currentCrocodileScores.filter((entry) => entry.playerId !== score.playerId), score]),
    fastestSlayer: updateFastestSlayer,
    inventorySync: syncInventory,
    inventoryAdd: addInventoryItem,
    shopState: (message) => {
      shopData = message.shop;
      shopConfig = message.config;
      inventoryItems = message.items ?? inventoryItems;
      renderShop();
    },
    shopSale: (message) => {
      shopData = message.shop;
      inventoryItems = message.items ?? inventoryItems;
      renderShop();
      renderBackpack();
      showCoinFloat(message.result.gained ?? 0);
    },
    shopPurchase: (message) => {
      shopData = message.shop;
      inventoryItems = message.items ?? inventoryItems;
      renderShop();
      renderBackpack();
    },
    shopEquip: (shop) => { shopData = shop; renderShop(); },
    shopChair: (message) => { shopData = message.shop; renderShop(); },
    shopError: showToast,
    equipmentChanged: (playerId, equipped, chairSeated) => {
      const player = roomPlayers.get(playerId);
      if (player) { player.equipped = equipped; player.chairSeated = chairSeated; scene.upsert(player); }
    },
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
    theaterState: (state) => theater.applyState(state),
    theaterSignal: (signal) => theater.handleSignal(signal),
    theaterError: (message) => theater.handleError(message),
    seatState: (occupancy) => {
      scene.setSeatOccupancy(occupancy);
      theater.setSeated(Boolean(scene.seatedSeatId));
    },
    jukeboxState: (current, queue, skipVotes) => {
      jukebox.setState(current, queue, skipVotes);
      scene.setJukeboxPlaying(current?.status === 'playing');
      syncMusicDuck();
    },
    jukeboxError: (message) => jukebox.showError(message),
    announcement: showToast,
    chat: (message) => {
      scene.showChatBubble(message.playerId, message.text);
      appendChat(message);
    },
    playerEmoji: (playerId, emoji) => scene.showEmojiPopup(playerId, emoji),
    bigCatch: enqueueBigCatch,
    stonePicked: (stoneId, playerId) => scene.pickStone(stoneId, playerId),
    stoneThrown: (message) => scene.throwStone(message),
    stoneLanded: (message) => scene.landStone(message),
    stoneRespawn: (message) => scene.respawnStone(message.stoneId, message.position),
    stoneHit: handleStoneHit,
    chickenHit: (message) => {
      scene.hitChicken(message);
      if (message.playerId === selfId) updateChickenScore(message.newScore);
    },
    chickenState: (chickens, serverTime) => scene.setChickens(chickens, serverTime),
    portalEntered: (arena) => enterCrocodileArena(arena),
    arenaState: (arena) => arenaView.receive(arena),
    arenaPartyState: updateArenaPartyState,
    arenaPartyInvite: (invitation) => {
      incomingArenaInvites.set(invitation.partyId, invitation);
      renderArenaInvites();
    },
    arenaPartyClosed: (message) => closeArenaParty(message.partyId, message.reason),
    monsterHit: (message) => arenaView.monsterHit(message),
    playerDamaged: (message) => arenaView.playerDamaged(message),
    monsterDied: () => arenaView.monsterDied(),
    playerDied: () => arenaView.playerDied(),
    portalExited: (respawned) => exitCrocodileArena(respawned),
    bowlingEntered: (game) => enterBowlingLane(game),
    bowlingState: (game) => bowlingMode.receive(game),
    bowlingPartyState: (party) => bowlingMode.handlePartyState(party),
    bowlingPartyInvite: (invitation) => bowlingMode.handlePartyInvite(invitation),
    bowlingPartyClosed: (message) => bowlingMode.handlePartyClosed(message.partyId, message.reason),
    bowlingExited: (message) => {
      if (message.position) scene.setLocalMotion(message.position.x, message.position.z, message.position.facing);
      bowlingMode.handleExit(message.reason);
    },
    bowlingReward: (reward) => bowlingMode.showReward(reward),
    disconnected: (details) => {
      if (reconnecting) {
        scheduleReconnect();
        return;
      }
      joined = false;
      theater.reset();
      roomPlayers.clear();
      if (bowlingMode.isActive) bowlingMode.handleExit('disconnected');
      bowlingNet = null;
      bowlingMode.setNetwork(null);
      bowlingMode.clearSocial();
      appRoot.classList.remove('in-bowling');
      currentArenaParty = null;
      incomingArenaInvites.clear();
      renderArenaParty();
      renderArenaInvites();
      jukebox.close();
      speakingPlayers.clear();
      jukebox.setState(null, []);
      scene.setJukeboxPlaying(false);
      syncMusicDuck();
      music.fadeOut(2000);
      voiceResumeToken = '';
      void voice.disconnect();
      if (isPhotoboothMode) exitPhotobooth();
      cancelMouseTurn();
      scene.clearPlayers();
      seatPrompt.classList.add('hidden');
      chatUi.classList.add('hidden');
      setChatOpen(false);
      setEmojiPickerOpen(false);
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
      reconnecting = true;
      reconnectAttempt = 0;
      reconnectDeadline = Date.now() + 10_000;
      connectionLabel.textContent = 'Reconnecting…';
      connectionDot.classList.add('reconnecting');
      showToast('Connection lost. Reconnecting…');
      scheduleReconnect();
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
  music.unlock();
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
  const target = event.target as Node;
  if (!weatherControl.contains(target)) {
    weatherControl.classList.remove('is-open');
    weatherBadge.setAttribute('aria-expanded', 'false');
    if (document.activeElement instanceof HTMLElement && weatherControl.contains(document.activeElement)) document.activeElement.blur();
  }
  if (!musicControl.contains(target)) setMusicPanel(false);
  if (!emojiDock.contains(target) && !emojiPicker.classList.contains('hidden')) setEmojiPickerOpen(false);
});

chatToggle.addEventListener('click', () => setChatOpen(chatPanel.classList.contains('hidden')));
chatClose.addEventListener('click', () => setChatOpen(false));
emojiToggle.addEventListener('click', () => setEmojiPickerOpen(emojiPicker.classList.contains('hidden')));
emojiPicker.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-emoji]');
  const emoji = button?.dataset.emoji;
  if (!joined || !emoji) return;
  network.sendPlayerEmoji(emoji);
});
whatsNewClose.addEventListener('click', closeWhatsNew);
whatsNewDismiss.addEventListener('click', closeWhatsNew);
whatsNew.querySelector<HTMLElement>('.whats-new-backdrop')!.addEventListener('click', closeWhatsNew);
whatsNewReopen.addEventListener('click', openWhatsNew);
whatsNewReopenJoin.addEventListener('click', openWhatsNew);
whatsNewScroll.addEventListener('scroll', updateWhatsNewScrollState, { passive: true });
window.addEventListener('resize', updateWhatsNewScrollState);
leaderboardToggle.addEventListener('click', () => {
  setOpenSidePanel(openSidePanel === 'leaderboard' ? null : 'leaderboard');
});
viewToggle.addEventListener('click', () => setViewMode(!firstPersonView));
hudMenuToggle.addEventListener('click', () => setTouchDockOpen(!hud.classList.contains('dock-open')));
hudDockBackdrop.addEventListener('click', () => setTouchDockOpen(false));
settingsToggle.addEventListener('click', () => setSettingsOpen(settingsPanel.classList.contains('hidden')));
settingsClose.addEventListener('click', () => setSettingsOpen(false));
window.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'touch' || sawFirstTouch) return;
  sawFirstTouch = true;
  syncTouchUi();
}, { capture: true, passive: true });
window.addEventListener('arena:crocodile-skill', (event) => {
  const detail = (event as CustomEvent<{ skill: string; phase: string }>).detail;
  if (!arenaMode || !detail) return;
  if (detail.phase === 'windup' || detail.phase === 'telegraph') vibrate(18, mobileSettings.haptics);
  else if (detail.phase === 'charge') vibrate([40, 30, 40], mobileSettings.haptics);
});
window.addEventListener('orientationchange', () => {
  touchControls.reset();
  lastFrame = performance.now();
});
voiceToggle.addEventListener('click', () => {
  if (!voice.isEnabled) void voice.enable(currentRoom, selfId, voiceResumeToken);
  else if (voice.isPushToTalk) void voice.disconnect();
  else void voice.toggleMicrophone();
});
voiceSettingsToggle.addEventListener('click', () => setVoicePanel(voicePanel.classList.contains('hidden')));
voiceSettingsClose.addEventListener('click', () => setVoicePanel(false));
voiceAudioUnlock.addEventListener('click', () => { void voice.resumeAudioPlayback(); });
musicToggle.addEventListener('click', () => setMusicPanel(musicPanel.classList.contains('hidden')));
musicVolume.addEventListener('input', () => {
  music.setVolume(Number(musicVolume.value));
  updateMusicControls();
});
musicMute.addEventListener('click', () => {
  music.mute(!music.isMuted);
  updateMusicControls();
});
voicePtt.addEventListener('change', () => { void voice.setPushToTalk(voicePtt.checked); updateVoiceButton(); });
voiceVolume.addEventListener('input', () => {
  const value = Number(voiceVolume.value);
  voice.setMasterVolume(value);
  voiceVolumeValue.textContent = `${Math.round(value * 100)}%`;
});
photoboothEnter.addEventListener('click', enterPhotobooth);
portalEnterButton.addEventListener('click', requestPortalEntry);
arenaPartyStartButton.addEventListener('click', () => network.startArenaParty());
arenaPartyLeaveButton.addEventListener('click', () => network.leaveArenaParty());
portalCancelButton.addEventListener('click', () => {
  portalPromptDismissedUntilExit = true;
  portalPrompt.classList.add('hidden');
});
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
  if (!joined || theater.isFocused || theater.isMenuOpen || isPhotoboothMode || reelGame || scene.fishingState() !== 'idle' || event.pointerType !== 'mouse' || event.button !== 0) return;
  if (document.pointerLockElement === gameCanvas) return;
  event.preventDefault();
  try { void Promise.resolve(gameCanvas.requestPointerLock()).catch(() => {}); }
  catch { showToast('Mouse look could not be enabled. Use A/D to turn.'); }
});
gameCanvas.addEventListener('pointermove', (event) => {
  if (!joined) return;
  if (theater.isFocused) {
    scene.setTheaterParallax((event.clientX / innerWidth - 0.5) * 2, (event.clientY / innerHeight - 0.5) * 2);
    return;
  }
  if (document.pointerLockElement !== gameCanvas || isPhotoboothMode || reelGame || scene.fishingState() !== 'idle') return;
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
  if (!whatsNew.classList.contains('hidden')) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeWhatsNew();
    } else if (event.key === 'Tab') trapWhatsNewFocus(event);
    else if (!whatsNew.contains(event.target as Node)) {
      event.preventDefault();
      whatsNewDismiss.focus({ preventScroll: true });
    }
    return;
  }
  if (isPhotoboothMode) {
    photoboothUi.handleKey(event);
    return;
  }
  if (jukebox.isOpen) {
    if (event.key === 'Escape') {
      event.preventDefault();
      jukebox.close();
      sendLocalMovement(true);
    }
    return;
  }
  if (bowlingMode.handleKeyDown(event)) return;
  if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof HTMLButtonElement) return;
  if (event.key === 'Escape' && !bowlingMode.isActive && !bowlingPartyPanel.classList.contains('hidden')) {
    event.preventDefault();
    network.leaveBowlingParty();
    return;
  }
  if (event.key === 'Escape' && !bowlingMode.isActive && !bowlingPrompt.classList.contains('hidden')) {
    event.preventDefault();
    bowlingMode.dismissPrompt();
    return;
  }
  if (event.key === 'Enter' && !bowlingMode.isActive && !bowlingPrompt.classList.contains('hidden') && !(event.target instanceof HTMLButtonElement)) {
    event.preventDefault();
    document.querySelector<HTMLButtonElement>('#bowling-solo')?.focus();
    return;
  }
  if (event.key === 'Escape' && !fishViewerRoot.classList.contains('hidden')) {
    fishViewer.close();
    return;
  }
  if (event.key === 'Escape' && !arenaMode && !arenaPartyPanel.classList.contains('hidden')) {
    event.preventDefault();
    network.leaveArenaParty();
    return;
  }
  if (event.key === 'Escape' && !arenaMode && !portalPrompt.classList.contains('hidden')) {
    event.preventDefault();
    portalPromptDismissedUntilExit = true;
    portalPrompt.classList.add('hidden');
    return;
  }
  if (event.key === 'Escape') {
    if (!settingsPanel.classList.contains('hidden')) { event.preventDefault(); setSettingsOpen(false); return; }
    if (hud.classList.contains('dock-open')) { event.preventDefault(); setTouchDockOpen(false); return; }
    event.preventDefault();
    if (arenaMode) return;
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
  if (scene.isFerrisRiding && key === 'e' && !event.repeat) {
    event.preventDefault();
    network.requestFerrisExit();
    return;
  }
  if (scene.isFerrisRiding && ['w', 'a', 's', 'd'].includes(key)) {
    event.preventDefault();
    keys.clear();
    network.requestFerrisExit(true);
    return;
  }
  if (scene.seatedSeatId && ['w', 'a', 's', 'd'].includes(key)) {
    event.preventDefault();
    if (event.repeat) return;
    if (theater.isFocused) theater.toggleFocusFromKeyboard();
    standFromSeat();
    keys.add(key);
    return;
  }
  if (key === 'f' && joined && !event.repeat && theater.canFocus) {
    event.preventDefault();
    theater.toggleFocusFromKeyboard();
    return;
  }
  if (key === 'e' && joined && !event.repeat && scene.seatedSeatId) {
    event.preventDefault();
    interactWithSeat();
    return;
  }
  if (theater.isMenuOpen || theater.isFocused) return;
  if (key === 'j' && joined && !event.repeat && isNearJukebox()) {
    event.preventDefault();
    openJukebox();
    return;
  }
  if (key === 'e' && joined && !event.repeat && isNearShop()) {
    event.preventDefault();
    openShop();
    return;
  }
  if (key === 't' && joined && !event.repeat && theater.isNearby) {
    event.preventDefault();
    theater.openMenu();
    return;
  }
  if (key === 'v' && joined && voice.isPushToTalk) {
    event.preventDefault();
    if (!event.repeat) void voice.setPushToTalkHeld(true);
    return;
  }
  if (key === 'e' && joined && !event.repeat && (scene.seatedSeatId || scene.nearbySeatId())) {
    event.preventDefault();
    interactWithSeat();
    return;
  }
  if (key === 'e' && joined && !event.repeat && isNearFerris() && scene.ferrisBoardingReady) {
    event.preventDefault();
    interactWithFerris();
    return;
  }
  if (key === 'e' && joined && !event.repeat && theater.isNearby) {
    event.preventDefault();
    theater.openMenu();
    return;
  }
  if (!arenaMode && event.key === 'Enter' && !portalPrompt.classList.contains('hidden') && !(event.target instanceof HTMLButtonElement)) {
    event.preventDefault();
    requestPortalEntry();
    return;
  }
  if (arenaMode) {
    if (key === 'e' && joined && !event.repeat) {
      event.preventDefault();
      network.arenaStoneAction();
      return;
    }
    if (event.key === 'Enter' && !(event.target instanceof HTMLButtonElement)) {
      event.preventDefault();
      if (arenaView.isNearExit()) network.leaveArena();
      return;
    }
    if (['w', 'a', 's', 'd'].includes(key)) {
      event.preventDefault();
      if (!event.repeat) keys.add(key);
      return;
    }
    if (event.key === ' ' || event.key.startsWith('Arrow')) event.preventDefault();
    return;
  }
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
  if (jukebox.isOpen) return;
  if (bowlingMode.handleKeyUp(event)) return;
  if (event.key.toLowerCase() === 'v' && voice.isPushToTalk) void voice.setPushToTalkHeld(false);
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
  if (voice.isPushToTalk) void voice.setPushToTalkHeld(false);
  bowlingMode.handleBlur();
  const wasMoving = hasForwardInput();
  cancelMouseTurn();
  touchControls.reset();
  input.clear(); reelGame?.setHeld(false);
  if (wasMoving) sendLocalMovement(true);
  syncTouchUi();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    isPageHidden = true;
    bowlingMode.handleBlur();
    const wasMoving = hasForwardInput();
    cancelMouseTurn();
    touchControls.reset();
    input.clear(); reelGame?.setHeld(false);
    if (wasMoving) sendLocalMovement(true);
    setTouchDockOpen(false);
    setSettingsOpen(false);
  } else {
    // Returning from the background: drop the stale delta so nothing "teleports".
    isPageHidden = false;
    lastFrame = performance.now();
    performanceGovernor.reset();
    requestAnimationFrame(() => { lastFrame = performance.now(); });
  }
  syncTouchUi();
});

function animate(now: number): void {
  requestAnimationFrame(animate);
  if (isPageHidden) {
    lastFrame = now;
    return;
  }
  const delta = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;
  performanceGovernor.frame(delta);
  const look = input.consumeLook();
  if (look.x !== 0 && !input.hasMovementInput && !isPhotoboothMode && !reelGame && scene.fishingState() === 'idle') {
    // Touch drag is converted into the same "remaining turn" budget as mouse look,
    // which keeps rotation inside the server's per-tick validation window.
    mouseTurnRemaining = Math.max(-1.2, Math.min(1.2, mouseTurnRemaining - look.x * 0.02));
  }
  const inBowling = bowlingMode.isActive;
  const ferrisRiding = scene.isFerrisRiding;
  if (ferrisRiding !== lastFerrisRiding) {
    playFerrisDing(ferrisRiding);
    if (ferrisRiding && localStorage.getItem('mengai:ferris-first-ride') !== 'true') {
      localStorage.setItem('mengai:ferris-first-ride', 'true');
      showToast('Penumpang Roda Besar');
    }
    lastFerrisRiding = ferrisRiding;
  }
  updateNetDebug(now);
  if (joined && reelGame) {
    const snapshot = reelGame.update(delta);
    drawReel(snapshot);
    if (reelGame.result !== 'active') finishReel(reelGame.result === 'success');
  }
  if (joined && !arenaMode && !inBowling) scene.stepCorrection(delta);
  if (joined && arenaMode && !reelGame) {
    const forward = input.forward;
    const stickTurn = input.turn;
    let turn = stickTurn;
    if (stickTurn === 0 && mouseTurnRemaining !== 0 && delta > 0) {
      const maxTurn = ARENA_CONFIG.playerTurnRate * delta * 1.35;
      const lookStep = Math.max(-maxTurn, Math.min(maxTurn, mouseTurnRemaining));
      mouseTurnRemaining -= lookStep;
      turn = lookStep / (ARENA_CONFIG.playerTurnRate * delta);
    } else if (stickTurn !== 0) mouseTurnRemaining = 0;
    const pose = arenaView.move(forward, turn, delta);
    if (pose && now - lastArenaMoveAt >= 50) {
      network.moveArena(pose.x, pose.z, pose.facing);
      lastArenaMoveAt = now;
    }
  }
  if (joined && !arenaMode && !inBowling && !theater.isFocused && !isPhotoboothMode && !jukebox.isOpen && !reelGame && !scene.seatedSeatId && !scene.isFerrisRiding && scene.fishingState() === 'idle') {
    const forward = input.forward;
    const stickTurn = input.turn;
    let turn = stickTurn;
    if (stickTurn === 0 && mouseTurnRemaining !== 0 && delta > 0) {
      const maxTurn = MOVEMENT_RULES.turnSpeedRadians * delta * 1.35;
      const mouseStep = Math.max(-maxTurn, Math.min(maxTurn, mouseTurnRemaining));
      mouseTurnRemaining -= mouseStep;
      turn = mouseStep / (MOVEMENT_RULES.turnSpeedRadians * delta);
    } else if (stickTurn !== 0) mouseTurnRemaining = 0;
    const position = scene.getPosition();
    const next = stepMovement({ x: position.x, z: position.z, rotY: scene.localFacing() }, forward, turn, delta);
    scene.setLocalMotion(next.x, next.z, next.rotY);
  }
  if (joined && !arenaMode && !inBowling && now - lastMinimapRenderAt >= 66) {
    lastMinimapRenderAt = now;
    minimap.render(now, scene.mapPlayers());
  }
  if (joined) {
    voice.updateSpatialAudio(scene.mapPlayers(), selfId, now);
    if (arenaMode || inBowling) {
      theater.setNearby(false);
      seatPrompt.classList.add('hidden');
      photoboothPrompt.classList.add('hidden');
      jukeboxPrompt.classList.add('hidden');
      fishPrompt.classList.add('hidden');
      portalPrompt.classList.add('hidden');
    } else {
      sendLocalMovement(false);
      const distance = Math.hypot(scene.getPosition().x, scene.getPosition().z);
      const theaterDistance = Math.hypot(scene.getPosition().x - WORLD_CONFIG.theater.x, scene.getPosition().z - WORLD_CONFIG.theater.z);
      theater.setNearby(!isPhotoboothMode && theaterDistance <= WORLD_CONFIG.theater.interactionRadius);
      const nearbySeat = !isPhotoboothMode && scene.nearbySeatId();
      const seatPromptVisible = Boolean(scene.seatedSeatId || nearbySeat);
      seatPrompt.classList.toggle('hidden', !seatPromptVisible || theater.isFocused || theater.isMenuOpen);
      const seatLabel = seatPrompt.querySelector('span');
      if (seatLabel) seatLabel.textContent = scene.seatedSeatId
        ? (touchUiActive ? 'Stand up' : 'Press E to stand')
        : (touchUiActive ? 'Sit here' : 'Press E to sit');
      seatPrompt.disabled = false;
      const wheel = WORLD_CONFIG.playground.wheel;
      const nearFerris = scene.isFerrisRiding || isNearFerris();
      ferrisPrompt.classList.toggle('hidden', !nearFerris || theater.isFocused || theater.isMenuOpen || isPhotoboothMode);
      const ferrisLabel = ferrisPrompt.querySelector('span');
      if (ferrisLabel) ferrisLabel.textContent = scene.isFerrisRiding
        ? scene.ferrisExitQueued
          ? (touchUiActive ? 'Leave queued · exit at the bottom' : 'Exit queued · Press E to leave at the bottom')
          : (touchUiActive ? 'Get off at the bottom' : 'Press E to get off at the bottom')
        : scene.ferrisBoardingReady
          ? (touchUiActive ? 'Board Ferris Wheel' : 'Press E to board Ferris Wheel')
          : 'Waiting for a free gondola';
      ferrisPrompt.disabled = !scene.isFerrisRiding && !scene.ferrisBoardingReady;
      const fishing = scene.fishingState();
      const nearPhotobooth = !isPhotoboothMode && isNearPhotobooth();
      photoboothPrompt.classList.toggle('hidden', !nearPhotobooth);
      photoboothEnter.disabled = !nearPhotobooth;
      const nearJukebox = !isPhotoboothMode && !jukebox.isOpen && isNearJukebox();
      jukeboxPrompt.classList.toggle('hidden', !nearJukebox);
      shopPrompt.classList.toggle('hidden', !isNearShop() || shopModal.classList.contains('hidden') === false);
      const position = scene.getPosition();
      jukebox.setDistance(Math.hypot(position.x - WORLD_CONFIG.jukebox.x, position.z - WORLD_CONFIG.jukebox.z));
      syncMusicDuck();
      fishPrompt.classList.toggle('hidden', isPhotoboothMode || reelGame !== null || fishing === 'fighting' || distance > fishingRadius);
      fishPrompt.textContent = touchUiActive
        ? fishing === 'bite' ? 'A bite! Tap Reel' : fishing === 'waiting' ? 'Fishing… Tap Stop' : fishing === 'casting' ? 'Casting… Tap Reel' : fishing === 'reeling' ? 'Reeling in…' : 'Tap Cast'
        : fishing === 'bite' ? 'A bite! Press Space to reel in' : fishing === 'waiting' ? 'Fishing… Space to stop' : fishing === 'casting' ? 'Casting… Space to reel in' : fishing === 'reeling' ? 'Reeling in…' : 'Space to cast';
      updatePortalPrompt();
      bowlingMode.updateProximity(scene.getPosition(), !isPhotoboothMode && !reelGame && fishing === 'idle' && !jukebox.isOpen && !theater.isFocused && !theater.isMenuOpen);
    }
  } else {
    theater.setNearby(false);
    photoboothPrompt.classList.add('hidden');
    jukeboxPrompt.classList.add('hidden');
    ferrisPrompt.classList.add('hidden');
    photoboothEnter.disabled = true;
    portalPrompt.classList.add('hidden');
    bowlingMode.updateProximity(scene.getPosition(), false);
  }
  catchPopup.classList.toggle('hidden', !fishArt.render(now));
  scene.setLocalDanceBlocked(arenaMode || inBowling || isPhotoboothMode || theater.isFocused || theater.isMenuOpen || jukebox.isOpen || reelGame !== null
    || !chatPanel.classList.contains('hidden') || !backpackPanel.classList.contains('hidden') || !leaderboardPanel.classList.contains('hidden')
    || !fishViewerRoot.classList.contains('hidden') || !catchPopup.classList.contains('hidden') || !expandedMap.classList.contains('hidden')
    || !voicePanel.classList.contains('hidden') || !musicPanel.classList.contains('hidden') || !arenaPartyPanel.classList.contains('hidden')
    || !whatsNew.classList.contains('hidden'));
  if (inBowling) bowlingMode.render(Date.now() + serverClockOffset, delta);
  else if (arenaMode) arenaView.render(Date.now() + serverClockOffset, delta);
  else scene.render(delta);
  syncTouchUi();
  input.endFrame();
}

// The same frame loop renders the island before joining and drives gameplay after joining.
requestAnimationFrame(animate);
window.addEventListener('pagehide', () => { music.fadeOut(250); void voice.disconnect(); });
