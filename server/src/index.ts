import 'dotenv/config';
import { createServer } from 'node:http';
import type { Socket as NetSocket } from 'node:net';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join, resolve } from 'node:path';
import { WebSocket, WebSocketServer } from 'ws';
import { AccessToken } from 'livekit-server-sdk';
import { BROADCAST_SCOPE, calculateReelParameters, FISH_CONFIG } from '../../shared/fishConfig.js';
import { isSafeMovementPosition, movementViolation, MOVEMENT_RULES, normalizeRotation } from '../../shared/movement.js';
import { RESUME_GRACE_MS, Rooms } from './rooms.js';
import { rollSpecies, rollWeight } from './fishing.js';
import type { CatchEntry, JukeboxTrack, Player, Room } from './types.js';
import { InMemoryInventoryStore, type CatchRecord, type InventoryStore } from './inventory.js';
import { awardChickenScore, chickenSnapshots, hitChickenAt, updateChickenFlock } from './chickens.js';
import { CHICKEN_CONFIG } from '../../shared/chickenConfig.js';
import { JsonGameDataStore, type PersistentGameDataStore } from './persistence.js';
import { WORLD_CONFIG } from '../../shared/worldConfig.js';
import { createWeatherSnapshot, isWeatherType, WEATHER_CONFIG } from '../../shared/weatherConfig.js';
import { ARENA_CONFIG } from '../../shared/arenaConfig.js';
import { addArenaPlayer, arenaSnapshot, arenaStoneAction, createCrocodileArena, moveArenaPlayer, removeArenaPlayer, restartCrocodileArena, updateArena, type ArenaEvent, type ArenaInstance } from './arenas.js';
import { initializeFileLogging } from './logger.js';

await initializeFileLogging();

const PORT = Number(process.env.PORT ?? 3002);
const execFileAsync = promisify(execFile);
const JUKEBOX_CACHE_DIR = resolve(process.cwd(), 'cache');
const JUKEBOX_MUSIC_DIR = join(JUKEBOX_CACHE_DIR, 'music');
const JUKEBOX_THUMB_DIR = join(JUKEBOX_CACHE_DIR, 'thumb');
const configuredCacheLimit = Number(process.env.JUKEBOX_CACHE_MAX_BYTES);
const JUKEBOX_CACHE_MAX_BYTES = Number.isFinite(configuredCacheLimit) && configuredCacheLimit > 0
  ? Math.floor(configuredCacheLimit)
  : 1024 * 1024 * 1024;
const JUKEBOX_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const YT_DLP = process.env.YT_DLP_PATH || 'yt-dlp';
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const YT_DLP_JS_RUNTIME = process.env.YT_DLP_JS_RUNTIME?.trim() || 'deno:/home/ec2-user/.deno/bin/deno';
const YT_DLP_COOKIES_PATH = process.env.YT_DLP_COOKIES_PATH?.trim() || '/opt/mengai-dev/secrets/youtube-cookies.txt';
let audioToolsAvailable = false;
const jukeboxDownloads = new Map<string, Promise<void>>();
const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  const pathname = requestUrl.pathname;
  if (request.method === 'GET' && pathname === '/api/rooms') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ rooms: rooms.list() }));
    return;
  }
  if (request.method === 'GET' && pathname === '/api/jukebox/search') {
    void searchYouTube(request, response, requestUrl);
    return;
  }
  const streamMatch = /^\/api\/jukebox\/stream\/([A-Za-z0-9_-]{11})\.mp3$/.exec(pathname);
  if (request.method === 'GET' && streamMatch) {
    void streamJukeboxAudio(request, response, streamMatch[1]);
    return;
  }
  const thumbMatch = /^\/api\/jukebox\/thumb\/([A-Za-z0-9_-]{11})$/.exec(pathname);
  if (request.method === 'GET' && thumbMatch) {
    void serveJukeboxThumbnail(response, thumbMatch[1]);
    return;
  }
  if (request.method === 'GET' && pathname === '/voice-token') {
    void issueVoiceToken(request, response, requestUrl);
    return;
  }
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not found');
});
const wss = new WebSocketServer({ server, maxPayload: 16 * 1024, perMessageDeflate: false });
const rooms = new Rooms();
const arenaInstances = new Map<string, { roomId: string; arena: ArenaInstance }>();
interface ArenaParty {
  id: string;
  roomId: string;
  leaderId: string;
  memberIds: string[];
  invitedIds: Set<string>;
}
const arenaParties = new Map<string, ArenaParty>();
const playerArenaParties = new Map<string, string>();
const inventoryStore: InventoryStore = new InMemoryInventoryStore();
const persistentData: PersistentGameDataStore = new JsonGameDataStore();
const memberships = new Map<WebSocket, { roomId: string; playerId: string }>();
const aliveSockets = new WeakSet<WebSocket>();
const isDev = process.env.NODE_ENV !== 'production' && process.env.FISH_ROLL_LOG !== '0';
const YOUTUBE_CACHE_MS = 2 * 60_000;
const YOUTUBE_RATE_WINDOW_MS = 60_000;
const YOUTUBE_RATE_LIMIT = 20;
const JUKEBOX_MAX_DURATION_SECONDS = 6 * 60;
const JUKEBOX_MAX_QUEUE_LENGTH = 10;
const youtubeSearchCache = new Map<string, { expiresAt: number; results: YouTubeSearchResult[] }>();
const youtubeVideoCache = new Map<string, { expiresAt: number; result: YouTubeSearchResult }>();
const youtubeRequests = new Map<string, number[]>();

interface YouTubeSearchResult {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  durationSeconds: number;
}

function jukeboxFile(videoId: string): string {
  return join(JUKEBOX_MUSIC_DIR, `${videoId}.mp3`);
}

async function streamJukeboxAudio(request: import('node:http').IncomingMessage, response: import('node:http').ServerResponse, videoId: string): Promise<void> {
  try {
    const filePath = jukeboxFile(videoId);
    const file = await stat(filePath);
    const range = request.headers.range;
    const commonHeaders = {
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=86400',
    };
    if (!range) {
      response.writeHead(200, { ...commonHeaders, 'Content-Length': file.size });
      createReadStream(filePath).pipe(response);
      return;
    }
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match || (!match[1] && !match[2])) {
      response.writeHead(416, { ...commonHeaders, 'Content-Range': `bytes */${file.size}` });
      response.end();
      return;
    }
    let start = match[1] ? Number(match[1]) : Math.max(0, file.size - Number(match[2]));
    let end = match[2] && match[1] ? Number(match[2]) : file.size - 1;
    if (!match[1]) end = file.size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= file.size || end < start) {
      response.writeHead(416, { ...commonHeaders, 'Content-Range': `bytes */${file.size}` });
      response.end();
      return;
    }
    end = Math.min(end, file.size - 1);
    response.writeHead(206, {
      ...commonHeaders,
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${file.size}`,
    });
    createReadStream(filePath, { start, end }).pipe(response);
  } catch {
    if (!response.headersSent) {
      response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify({ error: 'Audio is not ready.' }));
    } else response.destroy();
  }
}

async function serveJukeboxThumbnail(response: import('node:http').ServerResponse, videoId: string): Promise<void> {
  const extensions = ['jpg', 'png', 'webp'] as const;
  try {
    await mkdir(JUKEBOX_THUMB_DIR, { recursive: true });
    let cachedPath = '';
    for (const extension of extensions) {
      const candidate = join(JUKEBOX_THUMB_DIR, `${videoId}.${extension}`);
      try { await stat(candidate); cachedPath = candidate; break; } catch { /* try the next cached representation */ }
    }
    if (!cachedPath) {
      const upstream = await fetch(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, {
        redirect: 'error',
        signal: AbortSignal.timeout(10_000),
      });
      if (!upstream.ok) throw new Error(`thumbnail status ${upstream.status}`);
      const mimeType = (upstream.headers.get('content-type') ?? '').split(';')[0].toLowerCase();
      const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : mimeType === 'image/jpeg' ? 'jpg' : '';
      if (!extension) throw new Error('unsupported thumbnail content type');
      const bytes = Buffer.from(await upstream.arrayBuffer());
      if (!bytes.length || bytes.length > 5 * 1024 * 1024) throw new Error('thumbnail size is invalid');
      cachedPath = join(JUKEBOX_THUMB_DIR, `${videoId}.${extension}`);
      const temporaryPath = `${cachedPath}.${randomUUID()}.tmp`;
      await writeFile(temporaryPath, bytes, { flag: 'wx' });
      await rename(temporaryPath, cachedPath);
    }
    const file = await stat(cachedPath);
    const mimeType = cachedPath.endsWith('.png') ? 'image/png' : cachedPath.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
    response.writeHead(200, { 'Content-Type': mimeType, 'Content-Length': file.size, 'Cache-Control': 'public, max-age=86400' });
    createReadStream(cachedPath).pipe(response);
  } catch (error) {
    console.warn(`[jukebox] thumbnail unavailable for ${videoId}:`, error instanceof Error ? error.message : error);
    if (!response.headersSent) {
      response.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end('Thumbnail unavailable');
    } else response.destroy();
  }
}

async function ensureJukeboxAudio(videoId: string): Promise<void> {
  const outputPath = jukeboxFile(videoId);
  await mkdir(JUKEBOX_MUSIC_DIR, { recursive: true });
  try {
    const existing = await stat(outputPath);
    if (existing.isFile() && existing.size > 0) return;
  } catch { /* download missing cache entry */ }
  if (!audioToolsAvailable) throw new Error('Server audio tools are unavailable.');
  await rm(outputPath, { force: true });
  const temporaryPrefix = join(JUKEBOX_MUSIC_DIR, `${videoId}.${randomUUID()}`);
  const outputTemplate = `${temporaryPrefix}.%(ext)s`;
  const args = [
    '--no-playlist', '--no-progress', '--no-mtime', '--quiet', '-x', '--audio-format', 'mp3',
    '--js-runtimes', YT_DLP_JS_RUNTIME,
    '--cookies', resolve(YT_DLP_COOKIES_PATH),
    ...(process.env.FFMPEG_PATH ? ['--ffmpeg-location', FFMPEG] : []),
    '-o', outputTemplate, `https://www.youtube.com/watch?v=${videoId}`,
  ];
  try {
    await execFileAsync(YT_DLP, args, { timeout: 10 * 60 * 1000, maxBuffer: 2 * 1024 * 1024, windowsHide: true });
    const temporaryMp3 = `${temporaryPrefix}.mp3`;
    const downloaded = await stat(temporaryMp3);
    if (!downloaded.isFile() || downloaded.size === 0) throw new Error('yt-dlp did not produce an MP3 file.');
    await rename(temporaryMp3, outputPath);
  } catch (error) {
    const temporaryStem = `${videoId}.`;
    const partials = await readdir(JUKEBOX_MUSIC_DIR, { withFileTypes: true });
    await Promise.all(partials
      .filter((entry) => entry.isFile() && entry.name.startsWith(temporaryStem) && entry.name !== `${videoId}.mp3`)
      .map((entry) => rm(join(JUKEBOX_MUSIC_DIR, entry.name), { force: true })));
    await rm(outputPath, { force: true });
    throw error;
  }
}

function notifyJukeboxRequester(room: Room, track: JukeboxTrack, message: string): void {
  const requester = room.players.get(track.requesterId);
  if (requester) send(requester.socket, { type: 'jukebox:error', message });
}

function logJukeboxPreparationError(videoId: string, error: unknown): void {
  if (!(error instanceof Error)) {
    console.error(`[jukebox] audio preparation failed for ${videoId}:`, error);
    return;
  }
  const processError = error as Error & { code?: string | number; signal?: string; stderr?: string; stdout?: string };
  const stderr = processError.stderr?.trim();
  const stdout = processError.stdout?.trim();
  console.error(`[jukebox] audio preparation failed for ${videoId}:`, {
    message: processError.message,
    code: processError.code,
    signal: processError.signal,
    ...(stderr ? { stderr: stderr.slice(-8000) } : {}),
    ...(stdout ? { stdout: stdout.slice(-2000) } : {}),
  });
}

function beginJukeboxDownload(track: JukeboxTrack): void {
  if (jukeboxDownloads.has(track.videoId)) return;
  const job = ensureJukeboxAudio(track.videoId)
    .then(() => {
      for (const room of rooms.all()) {
        let changed = false;
        if (room.jukebox.current?.videoId === track.videoId && room.jukebox.current.status === 'downloading') {
          room.jukebox.current.status = 'ready';
          broadcast(room, jukeboxState(room));
          room.jukebox.current.status = 'playing';
          room.jukebox.current.startedAt = Date.now();
          changed = true;
        }
        for (const queued of room.jukebox.queue) {
          if (queued.videoId !== track.videoId || queued.status !== 'downloading') continue;
          queued.status = 'ready';
          changed = true;
        }
        if (changed) broadcast(room, jukeboxState(room));
      }
    })
    .catch((error: unknown) => {
      logJukeboxPreparationError(track.videoId, error);
      for (const room of rooms.all()) {
        const failedTracks: JukeboxTrack[] = [];
        if (room.jukebox.current?.videoId === track.videoId && room.jukebox.current.status === 'downloading') {
          room.jukebox.current.status = 'failed';
          failedTracks.push(room.jukebox.current);
        }
        for (const queued of room.jukebox.queue) {
          if (queued.videoId !== track.videoId || queued.status !== 'downloading') continue;
          queued.status = 'failed';
          failedTracks.push(queued);
        }
        if (!failedTracks.length) continue;
        for (const failedTrack of failedTracks) {
          notifyJukeboxRequester(room, failedTrack, `“${failedTrack.title}” is unavailable or could not be prepared. Skipping it.`);
        }
        broadcast(room, jukeboxState(room));
        setTimeout(() => {
          if (room.jukebox.current?.videoId === track.videoId && room.jukebox.current.status === 'failed') advanceJukebox(room);
          room.jukebox.queue = room.jukebox.queue.filter((entry) => !(entry.videoId === track.videoId && entry.status === 'failed'));
          broadcast(room, jukeboxState(room));
        }, 1200);
      }
    })
    .finally(() => jukeboxDownloads.delete(track.videoId));
  jukeboxDownloads.set(track.videoId, job);
}

async function cleanupJukeboxCache(): Promise<void> {
  await Promise.all([mkdir(JUKEBOX_MUSIC_DIR, { recursive: true }), mkdir(JUKEBOX_THUMB_DIR, { recursive: true })]);
  const protectedIds = new Set(jukeboxDownloads.keys());
  for (const room of rooms.all()) {
    if (room.jukebox.current) protectedIds.add(room.jukebox.current.videoId);
    for (const track of room.jukebox.queue) protectedIds.add(track.videoId);
  }
  const entries: { path: string; size: number; modifiedAt: number; videoId: string }[] = [];
  for (const directory of [JUKEBOX_MUSIC_DIR, JUKEBOX_THUMB_DIR]) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      const filePath = join(directory, entry.name);
      const file = await stat(filePath);
      const videoId = /^[A-Za-z0-9_-]{11}/.exec(entry.name)?.[0] ?? '';
      entries.push({ path: filePath, size: file.size, modifiedAt: file.mtimeMs, videoId });
    }
  }
  const now = Date.now();
  for (const entry of entries) {
    if (now - entry.modifiedAt <= JUKEBOX_CACHE_MAX_AGE_MS || protectedIds.has(entry.videoId)) continue;
    await rm(entry.path, { force: true });
    entry.size = 0;
  }
  let totalBytes = entries.reduce((total, entry) => total + entry.size, 0);
  for (const entry of entries.filter((candidate) => candidate.size > 0).sort((a, b) => a.modifiedAt - b.modifiedAt)) {
    if (totalBytes <= JUKEBOX_CACHE_MAX_BYTES) break;
    if (protectedIds.has(entry.videoId)) continue;
    await rm(entry.path, { force: true });
    totalBytes -= entry.size;
  }
}

function safeText(value: unknown, maxLength: number): string {
  return typeof value === 'string'
    ? value.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLength)
    : '';
}

function durationSeconds(isoDuration: unknown): number {
  if (typeof isoDuration !== 'string') return 0;
  const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(isoDuration);
  if (!match) return 0;
  return Number(match[1] ?? 0) * 86400 + Number(match[2] ?? 0) * 3600 + Number(match[3] ?? 0) * 60 + Number(match[4] ?? 0);
}

async function youtubeApi(path: string, params: URLSearchParams): Promise<Record<string, unknown>> {
  const apiKeys = (process.env.YOUTUBE_API_KEYS || process.env.YOUTUBE_API_KEY || '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);
  if (!apiKeys.length) throw new Error('YouTube search is not configured. Set YOUTUBE_API_KEYS on the server.');

  for (let index = 0; index < apiKeys.length; index++) {
    params.set('key', apiKeys[index]);
    const response = await fetch(`https://www.googleapis.com/youtube/v3/${path}?${params.toString()}`, { signal: AbortSignal.timeout(8000) });
    if (response.ok) return await response.json() as Record<string, unknown>;
    if (index < apiKeys.length - 1) {
      console.warn(`[jukebox] YouTube API key ${index + 1} failed (${response.status}); trying the next key.`);
      continue;
    }
    if (response.status === 403 || response.status === 429) throw new Error('YouTube search is temporarily unavailable. Please try again later.');
    throw new Error('YouTube search could not be completed. Please try again.');
  }
  throw new Error('YouTube search is temporarily unavailable. Please try again later.');
}

async function searchYouTube(request: import('node:http').IncomingMessage, response: import('node:http').ServerResponse, url: URL): Promise<void> {
  const rawQuery = url.searchParams.get('q') ?? '';
  const query = safeText(rawQuery, 80);
  const fail = (status: number, message: string) => {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ error: message }));
  };
  if (!query || query.length < 2 || rawQuery.length > 80 || /[\u0000-\u001f\u007f]/.test(rawQuery)) {
    fail(400, 'Enter 2–80 valid characters to search.');
    return;
  }
  const now = Date.now();
  for (const [key, entry] of youtubeSearchCache) if (entry.expiresAt <= now) youtubeSearchCache.delete(key);
  for (const [videoId, entry] of youtubeVideoCache) if (entry.expiresAt <= now) youtubeVideoCache.delete(videoId);
  for (const [ip, timestamps] of youtubeRequests) {
    const active = timestamps.filter((timestamp) => now - timestamp < YOUTUBE_RATE_WINDOW_MS);
    if (active.length) youtubeRequests.set(ip, active);
    else youtubeRequests.delete(ip);
  }
  const ip = request.socket.remoteAddress ?? 'unknown';
  const timestamps = youtubeRequests.get(ip) ?? [];
  if (timestamps.length >= YOUTUBE_RATE_LIMIT) {
    fail(429, 'Too many searches. Please wait a moment and try again.');
    return;
  }
  timestamps.push(now);
  youtubeRequests.set(ip, timestamps);
  const cacheKey = query.toLocaleLowerCase();
  const cached = youtubeSearchCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ results: cached.results }));
    return;
  }

  try {
    const searchParams = new URLSearchParams({ part: 'snippet', type: 'video', maxResults: '10', videoEmbeddable: 'true', q: query });
    const searchPayload = await youtubeApi('search', searchParams);
    const searchItems = Array.isArray(searchPayload.items) ? searchPayload.items as Record<string, unknown>[] : [];
    const ids = searchItems.flatMap((item) => {
      const id = item.id as Record<string, unknown> | undefined;
      return typeof id?.videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id.videoId) ? [id.videoId] : [];
    });
    if (!ids.length) {
      youtubeSearchCache.set(cacheKey, { expiresAt: now + YOUTUBE_CACHE_MS, results: [] });
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify({ results: [] }));
      return;
    }
    const detailsPayload = await youtubeApi('videos', new URLSearchParams({ part: 'contentDetails,status', id: ids.join(',') }));
    const detailItems = Array.isArray(detailsPayload.items) ? detailsPayload.items as Record<string, unknown>[] : [];
    const details = new Map(detailItems.map((item) => [String(item.id ?? ''), item]));
    const results: YouTubeSearchResult[] = [];
    for (const item of searchItems) {
      const id = item.id as Record<string, unknown> | undefined;
      const videoId = typeof id?.videoId === 'string' ? id.videoId : '';
      const detail = details.get(videoId);
      if (!detail) continue;
      const status = detail.status as Record<string, unknown> | undefined;
      const contentDetails = detail.contentDetails as Record<string, unknown> | undefined;
      if (status?.embeddable !== true) continue;
      const seconds = durationSeconds(contentDetails?.duration);
      if (!seconds) continue;
      const snippet = item.snippet as Record<string, unknown> | undefined;
        const result: YouTubeSearchResult = {
        videoId,
        title: safeText(snippet?.title, 160),
        channel: safeText(snippet?.channelTitle, 100),
        thumbnail: `/api/jukebox/thumb/${videoId}`,
        durationSeconds: seconds,
      };
      results.push(result);
      youtubeVideoCache.set(videoId, { expiresAt: now + YOUTUBE_CACHE_MS, result });
    }
    youtubeSearchCache.set(cacheKey, { expiresAt: now + YOUTUBE_CACHE_MS, results });
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ results }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'YouTube search could not be completed. Please try again.';
    const status = message.includes('not configured') ? 503 : 502;
    if (status === 502) console.error('[jukebox] YouTube search failed:', error);
    fail(status, message);
  }
}

function jukeboxState(room: Room): object {
  return { type: 'jukebox:state', current: room.jukebox.current, queue: room.jukebox.queue, skipVotes: room.jukebox.skipVotes.size };
}

function advanceJukebox(room: Room, now = Date.now()): void {
  let next = room.jukebox.queue.shift();
  while (next?.status === 'failed') next = room.jukebox.queue.shift();
  room.jukebox.skipVotes.clear();
  if (next?.status === 'ready') room.jukebox.current = { ...next, status: 'playing', startedAt: now };
  else room.jukebox.current = next ? { ...next, status: 'downloading', startedAt: null } : null;
  broadcast(room, jukeboxState(room));
}

function safeEqual(left: string, right: string): boolean {
  const leftBytes = Buffer.from(left);
  const rightBytes = Buffer.from(right);
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes);
}

function liveKitRoomName(gameRoomId: string): string {
  const digest = createHash('sha256').update(gameRoomId).digest('hex').slice(0, 32);
  return `game-room-${digest}`;
}

async function issueVoiceToken(request: import('node:http').IncomingMessage, response: import('node:http').ServerResponse, url: URL): Promise<void> {
  const roomId = url.searchParams.get('room')?.trim() ?? '';
  const playerId = url.searchParams.get('playerId') ?? '';
  const authorization = request.headers.authorization ?? '';
  const resumeToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const player = roomId && resumeToken ? rooms.findPlayerByResumeToken(roomId, resumeToken) : undefined;
  if (!player || !playerId || !safeEqual(player.id, playerId)) {
    response.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ error: 'Join the game room before requesting voice access.' }));
    return;
  }

  const liveKitUrl = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  if (!liveKitUrl || !apiKey || !apiSecret) {
    response.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ error: 'Voice chat is not configured on this server.' }));
    return;
  }

  try {
    const roomName = liveKitRoomName(roomId);
    const accessToken = new AccessToken(apiKey, apiSecret, { identity: player.id, name: player.name, ttl: '10m' });
    accessToken.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    const token = await accessToken.toJwt();
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ token, url: liveKitUrl, room: roomName, expiresInSeconds: 600 }));
  } catch (error) {
    console.error('[voice] Failed to issue LiveKit token:', error);
    response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ error: 'Could not prepare voice chat. Please try again.' }));
  }
}

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
    chickens: chickenSnapshots(room.chickens),
    crocodileScores: [...room.crocodileScores.values()].sort((a, b) => b.count - a.count),
    resumeToken: player.resumeToken,
  };
}

function sendArenaSnapshot(player: Player, arena: ArenaInstance, now = Date.now()): void {
  send(player.socket, { type: 'arenaState', arena: arenaSnapshot(arena, now) });
}

function broadcastArenaSnapshot(room: Room, arena: ArenaInstance, now = Date.now()): void {
  const snapshot = arenaSnapshot(arena, now);
  for (const participant of arena.players) {
    const player = room.players.get(participant.playerId);
    if (player?.disconnectedAt === null) send(player.socket, { type: 'arenaState', arena: snapshot });
  }
}

function arenaPartyState(room: Room, party: ArenaParty): object {
  const members = party.memberIds.map((id) => room.players.get(id)).filter((player): player is Player => Boolean(player));
  const invited = [...party.invitedIds].map((id) => room.players.get(id)).filter((player): player is Player => Boolean(player));
  return {
    type: 'arenaPartyState',
    partyId: party.id,
    leaderId: party.leaderId,
    members: members.map(({ id, name, color }) => ({ playerId: id, name, color })),
    invited: invited.map(({ id, name }) => ({ playerId: id, name })),
  };
}

function broadcastArenaParty(room: Room, party: ArenaParty): void {
  const message = arenaPartyState(room, party);
  for (const id of party.memberIds) {
    const player = room.players.get(id);
    if (player?.disconnectedAt === null) send(player.socket, message);
  }
}

function closeArenaParty(room: Room, party: ArenaParty, reason: string): void {
  const recipients = new Set([...party.memberIds, ...party.invitedIds]);
  for (const playerId of party.memberIds) playerArenaParties.delete(playerId);
  arenaParties.delete(party.id);
  for (const playerId of recipients) {
    const player = room.players.get(playerId);
    if (player?.disconnectedAt === null) send(player.socket, { type: 'arenaPartyClosed', partyId: party.id, reason });
  }
}

function removeArenaPartyMember(room: Room, party: ArenaParty, playerId: string): void {
  party.memberIds = party.memberIds.filter((id) => id !== playerId);
  playerArenaParties.delete(playerId);
  if (party.memberIds.length === 0) {
    closeArenaParty(room, party, 'empty');
    return;
  }
  if (party.leaderId === playerId) party.leaderId = party.memberIds[0];
  broadcastArenaParty(room, party);
}

function clearArenaInvites(room: Room, playerId: string): void {
  for (const party of arenaParties.values()) {
    if (!party.invitedIds.delete(playerId)) continue;
    broadcastArenaParty(room, party);
  }
}

function dropPlayerStone(room: Room, player: Player): void {
  if (!player.carryingStoneId) return;
  const stone = room.stones.get(player.carryingStoneId);
  if (stone) {
    stone.state = 'ground'; stone.x = player.x; stone.z = player.z; stone.carriedBy = null; stone.flight = null; stone.chickenHitId = null;
    broadcast(room, { type: 'stone_landed', stoneId: stone.id, position: { x: stone.x, z: stone.z }, water: false, hitPlayerId: null });
  }
  player.carryingStoneId = null;
}

function startArenaParty(room: Room, party: ArenaParty, now: number): ArenaInstance | null {
  const members = party.memberIds.map((id) => room.players.get(id));
  if (members.some((player) => !player || player.disconnectedAt !== null || player.arenaInstanceId || player.inPhotobooth || player.fishing !== 'idle')) return null;
  const leader = room.players.get(party.leaderId);
  if (!leader || Math.hypot(leader.x - WORLD_CONFIG.crocodilePortal.x, leader.z - WORLD_CONFIG.crocodilePortal.z) > WORLD_CONFIG.crocodilePortal.useRadius) return null;
  const readyMembers = members as Player[];
  const arena = createCrocodileArena(readyMembers[0], now);
  for (const member of readyMembers.slice(1)) addArenaPlayer(arena, member, now);
  arenaInstances.set(arena.id, { roomId: room.id, arena });
  const snapshot = arenaSnapshot(arena, now);
  for (const member of readyMembers) {
    dropPlayerStone(room, member);
    member.arenaInstanceId = arena.id;
    broadcast(room, { type: 'player_left', playerId: member.id });
  }
  closeArenaParty(room, party, 'started');
  for (const member of readyMembers) send(member.socket, { type: 'portalEnter', arena: snapshot });
  return arena;
}

function detachArenaPlayer(room: Room, player: Player, arena: ArenaInstance): void {
  removeArenaPlayer(arena, player.id);
  player.arenaInstanceId = null;
  if (arena.players.length === 0) arenaInstances.delete(arena.id);
  else broadcastArenaSnapshot(room, arena);
}

function leaveArena(room: Room, player: Player, now: number, respawned = false): void {
  const reference = player.arenaInstanceId ? arenaInstances.get(player.arenaInstanceId) : undefined;
  if (reference) detachArenaPlayer(room, player, reference.arena);
  player.x = WORLD_CONFIG.crocodilePortal.x;
  player.z = WORLD_CONFIG.crocodilePortal.z;
  player.facing = 0;
  player.moving = false;
  player.velocityX = 0;
  player.velocityZ = 0;
  const returned = rooms.snapshot(room).find((entry) => entry.id === player.id);
  if (returned) broadcast(room, { type: 'player_joined', player: returned, serverTime: now });
  send(player.socket, { type: 'portalExit', respawned, serverTime: now });
}

function publishArenaEvents(room: Room, arena: ArenaInstance, events: ArenaEvent[], now: number): void {
  const participants = arena.players.map((participant) => room.players.get(participant.playerId))
    .filter((player): player is Player => Boolean(player && player.disconnectedAt === null));
  for (const event of events) {
    if (event.type === 'monsterDied') {
      for (const owner of participants) {
        owner.crocodilesSlain += 1;
        const score = { playerId: owner.id, playerName: owner.name, count: owner.crocodilesSlain };
        room.crocodileScores.set(owner.id, score);
        broadcast(room, { type: 'crocodile_score', ...score });
      }
      for (const participant of participants) send(participant.socket, event);
    } else for (const participant of participants) send(participant.socket, event);
  }
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
      room.jukebox.emptySince = null;
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
      send(socket, jukeboxState(room));
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

    if (message.type === 'arenaPartyCreate') {
      if (player.arenaInstanceId || player.inPhotobooth || player.fishing !== 'idle') {
        send(socket, { type: 'notice', message: 'Finish your current activity before forming an arena party.' });
        return;
      }
      const portalDistance = Math.hypot(player.x - WORLD_CONFIG.crocodilePortal.x, player.z - WORLD_CONFIG.crocodilePortal.z);
      if (portalDistance > WORLD_CONFIG.crocodilePortal.useRadius) {
        send(socket, { type: 'notice', message: 'Walk closer to the portal to start an arena party.' });
        return;
      }
      const existingPartyId = playerArenaParties.get(player.id);
      const existingParty = existingPartyId ? arenaParties.get(existingPartyId) : undefined;
      if (existingParty) {
        send(socket, arenaPartyState(room, existingParty));
        return;
      }
      clearArenaInvites(room, player.id);
      const party: ArenaParty = { id: randomUUID(), roomId: room.id, leaderId: player.id, memberIds: [player.id], invitedIds: new Set() };
      arenaParties.set(party.id, party);
      playerArenaParties.set(player.id, party.id);
      send(socket, arenaPartyState(room, party));
      return;
    }

    if (message.type === 'arenaPartyInvite') {
      const partyId = playerArenaParties.get(player.id);
      const party = partyId ? arenaParties.get(partyId) : undefined;
      const targetId = typeof message.playerId === 'string' ? message.playerId : '';
      const target = room.players.get(targetId);
      if (!party || party.leaderId !== player.id) {
        send(socket, { type: 'notice', message: 'Only the party leader can invite players.' });
        return;
      }
      if (!target || targetId === player.id || target.disconnectedAt !== null || target.arenaInstanceId || playerArenaParties.has(targetId)) {
        send(socket, { type: 'notice', message: 'That player is unavailable to join this party.' });
        return;
      }
      if (!party.invitedIds.has(targetId)) {
        party.invitedIds.add(targetId);
        send(target.socket, { type: 'arenaPartyInvite', partyId: party.id, leaderId: player.id, leaderName: player.name });
        broadcastArenaParty(room, party);
      }
      return;
    }

    if (message.type === 'arenaPartyRespond') {
      const partyId = typeof message.partyId === 'string' ? message.partyId : '';
      const party = arenaParties.get(partyId);
      if (!party || party.roomId !== room.id || !party.invitedIds.has(player.id)) return;
      party.invitedIds.delete(player.id);
      if (message.accept === true && !player.arenaInstanceId && !playerArenaParties.has(player.id) && player.disconnectedAt === null) {
        party.memberIds.push(player.id);
        playerArenaParties.set(player.id, party.id);
        clearArenaInvites(room, player.id);
        broadcastArenaParty(room, party);
      } else {
        send(socket, { type: 'arenaPartyClosed', partyId: party.id, reason: 'declined' });
        broadcastArenaParty(room, party);
      }
      return;
    }

    if (message.type === 'arenaPartyLeave') {
      const partyId = playerArenaParties.get(player.id);
      const party = partyId ? arenaParties.get(partyId) : undefined;
      if (!party) return;
      if (party.leaderId === player.id) closeArenaParty(room, party, 'cancelled');
      else {
        removeArenaPartyMember(room, party, player.id);
        send(socket, { type: 'arenaPartyClosed', partyId: party.id, reason: 'left' });
      }
      return;
    }

    if (message.type === 'arenaPartyStart') {
      const partyId = playerArenaParties.get(player.id);
      const party = partyId ? arenaParties.get(partyId) : undefined;
      if (!party || party.leaderId !== player.id) {
        send(socket, { type: 'notice', message: 'Only the party leader can start the arena.' });
        return;
      }
      if (!startArenaParty(room, party, Date.now())) {
        send(socket, { type: 'notice', message: 'The leader must be at the portal and every party member must be available.' });
      }
      return;
    }

    if (message.type === 'portalEnter') {
      send(socket, { type: 'notice', message: 'Create a party at the portal, invite your room, then start the fight together.' });
      return;
    }

    if (message.type === 'arenaMove') {
      const reference = player.arenaInstanceId ? arenaInstances.get(player.arenaInstanceId) : undefined;
      if (!reference) return;
      const accepted = moveArenaPlayer(reference.arena, player.id, Number(message.x), Number(message.z), Number(message.facing), Date.now());
      if (!accepted) sendArenaSnapshot(player, reference.arena);
      return;
    }

    if (message.type === 'arenaStoneAction') {
      const reference = player.arenaInstanceId ? arenaInstances.get(player.arenaInstanceId) : undefined;
      if (!reference) return;
      const result = arenaStoneAction(reference.arena, player.id, Date.now());
      if (result === 'empty') send(socket, { type: 'notice', message: 'Get a stone from the pile before throwing.' });
      else if (result === 'full') send(socket, { type: 'notice', message: 'You can carry up to five stones.' });
      sendArenaSnapshot(player, reference.arena);
      return;
    }

    if (message.type === 'arenaLeave') {
      const reference = player.arenaInstanceId ? arenaInstances.get(player.arenaInstanceId) : undefined;
      if (!reference) return;
      const participant = reference.arena.players.find((entry) => entry.playerId === player.id);
      const atExit = participant && Math.hypot(participant.x - ARENA_CONFIG.exitPortal.x, participant.z - ARENA_CONFIG.exitPortal.z) <= ARENA_CONFIG.exitPortal.useRadius;
      if (reference.arena.state !== 'victory' && !atExit) {
        send(socket, { type: 'notice', message: 'Walk to the exit portal to leave the arena.' });
        return;
      }
      leaveArena(room, player, Date.now());
      return;
    }

    if (message.type === 'arenaRestart') {
      const reference = player.arenaInstanceId ? arenaInstances.get(player.arenaInstanceId) : undefined;
      if (!reference || reference.arena.state !== 'victory') return;
      const now = Date.now();
      restartCrocodileArena(reference.arena, now);
      const snapshot = arenaSnapshot(reference.arena, now);
      for (const participant of reference.arena.players) {
        const member = room.players.get(participant.playerId);
        if (member?.disconnectedAt === null) send(member.socket, { type: 'portalEnter', arena: snapshot });
      }
      return;
    }

    if (player.arenaInstanceId && message.type !== 'chat') return;

    if (message.type === 'jukebox:enqueue') {
      const videoId = typeof message.videoId === 'string' ? message.videoId : '';
      if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
        send(socket, { type: 'jukebox:error', message: 'That song could not be added. Search for it again and try once more.' });
        return;
      }
      if (Math.hypot(player.x - WORLD_CONFIG.jukebox.x, player.z - WORLD_CONFIG.jukebox.z) > WORLD_CONFIG.jukebox.interactionRadius + 1) {
        send(socket, { type: 'jukebox:error', message: 'Walk closer to the jukebox to add a song.' });
        return;
      }
      const searchResult = youtubeVideoCache.get(videoId);
      if (!searchResult || searchResult.expiresAt <= Date.now()) {
        send(socket, { type: 'jukebox:error', message: 'That search result has expired. Please search again.' });
        return;
      }
      if (searchResult.result.durationSeconds > JUKEBOX_MAX_DURATION_SECONDS) {
        send(socket, { type: 'jukebox:error', message: 'Songs must be 6 minutes or shorter.' });
        return;
      }
      if (room.jukebox.queue.length >= JUKEBOX_MAX_QUEUE_LENGTH) {
        send(socket, { type: 'jukebox:error', message: 'The queue is full. Try again after a song finishes.' });
        return;
      }
      const track: JukeboxTrack = { ...searchResult.result, requesterId: player.id, requestedBy: player.name, status: 'downloading' };
      room.jukebox.queue.push(track);
      if (!room.jukebox.current) advanceJukebox(room);
      else broadcast(room, jukeboxState(room));
      beginJukeboxDownload(track);
      return;
    }

    if (message.type === 'jukebox:skip') {
      if (!room.jukebox.current) return;
      if (room.jukebox.current.requesterId === player.id) {
        advanceJukebox(room);
        return;
      }
      room.jukebox.skipVotes.add(player.id);
      if (room.jukebox.skipVotes.size >= 2) advanceJukebox(room);
      else broadcast(room, jukeboxState(room));
      return;
    }

    if (message.type === 'jukebox:ended' || message.type === 'jukebox:failed') {
      const videoId = typeof message.videoId === 'string' ? message.videoId : '';
      const current = room.jukebox.current;
      if (!current || current.videoId !== videoId) return;
      if (message.type === 'jukebox:ended' && (current.startedAt === null || Date.now() < current.startedAt + current.durationSeconds * 1000 - 3000)) return;
      if (message.type === 'jukebox:failed') {
        send(socket, { type: 'jukebox:error', message: `“${current.title}” could not be played. Skipping to the next song.` });
        broadcast(room, { type: 'jukebox:error', message: `“${current.title}” could not be played. Skipping to the next song.` }, socket);
      }
      advanceJukebox(room);
      return;
    }

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
      const wasPhotobooth = player.inPhotobooth;
      const reportedRtt = Number(message.rttMs);
      if (Number.isFinite(reportedRtt)) player.latencyRttMs = Math.max(0, Math.min(500, reportedRtt));
      if (typeof message.inPhotobooth === 'boolean') {
        player.inPhotobooth = message.inPhotobooth && player.fishing === 'idle';
      }
      if (wasPhotobooth && !player.inPhotobooth) {
        const facing = Number(message.rotY);
        if (Number.isFinite(facing)) player.facing = normalizeRotation(facing);
        player.moving = false; player.velocityX = 0; player.velocityZ = 0;
        player.lastMoveAt = Date.now();
        return;
      }
      if (player.inPhotobooth) {
        const facing = Number(message.rotY);
        if (Number.isFinite(facing)) player.facing = normalizeRotation(facing);
        player.moving = false; player.velocityX = 0; player.velocityZ = 0;
        player.lastMoveAt = Date.now();
        return;
      }
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

    if (message.type === 'speaking') {
      const speaking = message.speaking === true;
      if (player.speaking === speaking) return;
      player.speaking = speaking;
      broadcast(room, { type: 'speaking', playerId: player.id, speaking }, socket);
      return;
    }

    if (player.inPhotobooth) return;

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
      stone.chickenHitId = null;
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
      stone.chickenHitId = null;
      stone.flight = { start, end: { x: endX, y: 0.2, z: endZ }, startTime: now, flightMs, targetId, throwerId: player.id, waterLanding };
      stone.respawnAt = null;
      player.carryingStoneId = null;
      player.lastStoneThrowAt = now;
      broadcast(room, { type: 'stone_thrown', stoneId: stone.id, fromId: player.id, targetId, throwerId: player.id, start: stone.flight.start, end: stone.flight.end, startTime: now, flightMs });
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
    if (departing && existingRoom) {
      const partyId = playerArenaParties.get(departing.id);
      const party = partyId ? arenaParties.get(partyId) : undefined;
      if (party) removeArenaPartyMember(existingRoom, party, departing.id);
      clearArenaInvites(existingRoom, departing.id);
    }
    if (departing?.arenaInstanceId) {
      const reference = arenaInstances.get(departing.arenaInstanceId);
      if (reference && existingRoom && departing) detachArenaPlayer(existingRoom, departing, reference.arena);
    }
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
      departing.inPhotobooth = false;
      if (departing.speaking && existingRoom) {
        departing.speaking = false;
        broadcast(existingRoom, { type: 'speaking', playerId: departing.id, speaking: false }, socket);
      }
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
      if (stone.state === 'flying' && stone.flight && stone.chickenHitId === null) {
        const flight = stone.flight;
        const progress = Math.max(0, Math.min(1, (now - flight.startTime) / flight.flightMs));
        const eased = 1 - (1 - progress) * (1 - progress);
        const stoneX = flight.start.x + (flight.end.x - flight.start.x) * eased;
        const stoneZ = flight.start.z + (flight.end.z - flight.start.z) * eased;
        const thrower = room.players.get(flight.throwerId);
        const chickenHit = hitChickenAt(room.chickens, stoneX, stoneZ, now);
        if (chickenHit) {
          stone.chickenHitId = chickenHit.id;
          const newScore = thrower ? awardChickenScore(thrower) : 0;
          broadcast(room, {
            type: 'chicken_hit',
            chickenId: chickenHit.id,
            playerId: flight.throwerId,
            newScore,
            startTime: now,
          });
        }
      }
      if (stone.state === 'flying' && stone.flight && now >= stone.flight.startTime + stone.flight.flightMs) {
        const flight = stone.flight;
        const hit = !flight.waterLanding && flight.targetId ? room.players.get(flight.targetId) : undefined;
        const hitPlayerId = hit && hit.disconnectedAt === null && Math.hypot(hit.x - flight.end.x, hit.z - flight.end.z) <= FISH_CONFIG.stones.hitRadius ? hit.id : null;
        stone.x = flight.end.x; stone.z = flight.end.z; stone.flight = null;
        if (flight.waterLanding) {
          stone.state = 'respawning';
          stone.respawnAt = now + FISH_CONFIG.stones.respawnDelayMs;
        } else {
          stone.state = 'ground';
          stone.respawnAt = null;
        }
        broadcast(room, { type: 'stone_landed', stoneId: stone.id, position: { x: stone.x, z: stone.z }, water: flight.waterLanding, hitPlayerId });
        if (hitPlayerId) {
          const hitPlayer = room.players.get(hitPlayerId)!;
          const fishingCancelled = hitPlayer.fishing !== 'idle';
          if (fishingCancelled) {
            if (hitPlayer.fishing === 'fighting') broadcast(room, { type: 'reel_state', playerId: hitPlayer.id, active: false });
            clearFishing(hitPlayer);
          }
          broadcast(room, { type: 'stone_hit', playerId: hitPlayerId, stoneId: stone.id, fishingCancelled });
        }
      } else if (stone.state === 'respawning' && stone.respawnAt !== null && now >= stone.respawnAt) {
        stone.state = 'ground'; stone.x = stone.originX; stone.z = stone.originZ; stone.chickenHitId = null; stone.respawnAt = null;
        broadcast(room, { type: 'stone_respawn', stoneId: stone.id, position: { x: stone.x, z: stone.z } });
      }
    }
    if ((changed || room.players.size) && room.players.size) broadcast(room, { type: 'state', players: rooms.snapshot(room, false, false), serverTime: now });
  }
}, 50);

setInterval(() => {
  const now = Date.now();
  for (const room of rooms.all()) {
    if (!room.players.size) continue;
    updateChickenFlock(room.chickens, now, CHICKEN_CONFIG.snapshotIntervalMs / 1000);
    broadcast(room, { type: 'chicken_state', chickens: chickenSnapshots(room.chickens), serverTime: now });
  }
}, CHICKEN_CONFIG.snapshotIntervalMs);

setInterval(() => {
  const now = Date.now();
  for (const [instanceId, reference] of [...arenaInstances]) {
    const room = rooms.getRoom(reference.roomId);
    if (!room) {
      arenaInstances.delete(instanceId);
      continue;
    }
    for (const participant of [...reference.arena.players]) {
      const member = room.players.get(participant.playerId);
      if (!member || member.disconnectedAt !== null) {
        if (member) detachArenaPlayer(room, member, reference.arena);
        else removeArenaPlayer(reference.arena, participant.playerId);
      }
    }
    if (reference.arena.players.length === 0) {
      arenaInstances.delete(instanceId);
      continue;
    }
    publishArenaEvents(room, reference.arena, updateArena(reference.arena, now), now);
    if (reference.arena.state === 'defeat' && reference.arena.respawnAt !== null && now >= reference.arena.respawnAt) {
      for (const participant of [...reference.arena.players]) {
        const member = room.players.get(participant.playerId);
        if (member) leaveArena(room, member, now, true);
      }
      continue;
    }
    if (now >= reference.arena.nextStateAt) {
      broadcastArenaSnapshot(room, reference.arena, now);
      reference.arena.nextStateAt = now + ARENA_CONFIG.tickIntervalMs;
    }
  }
}, 50);

setInterval(() => {
  const now = Date.now();
  for (const room of rooms.all()) {
    if (!room.players.size) continue;
    const current = room.jukebox.current;
    if (current?.status === 'playing' && current.startedAt !== null && now >= current.startedAt + current.durationSeconds * 1000) advanceJukebox(room, now);
  }
  rooms.cleanupEmptyRooms(now);
}, 1000);

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
await mkdir(JUKEBOX_CACHE_DIR, { recursive: true });
const toolChecks = await Promise.allSettled([
  execFileAsync(YT_DLP, ['--version'], { timeout: 5000, windowsHide: true }),
  execFileAsync(FFMPEG, ['-version'], { timeout: 5000, windowsHide: true }),
]);
audioToolsAvailable = toolChecks.every((result) => result.status === 'fulfilled');
if (audioToolsAvailable) {
  const ytDlpVersion = toolChecks[0].status === 'fulfilled' ? toolChecks[0].value.stdout.trim().split(/\r?\n/)[0] : '';
  const ffmpegVersion = toolChecks[1].status === 'fulfilled' ? toolChecks[1].value.stdout.trim().split(/\r?\n/)[0] : '';
  console.log(`[jukebox] yt-dlp ${ytDlpVersion}; ${ffmpegVersion}`);
} else {
  if (toolChecks[0].status === 'rejected') console.warn(`[jukebox] yt-dlp check failed (${YT_DLP}):`, toolChecks[0].reason);
  if (toolChecks[1].status === 'rejected') console.warn(`[jukebox] ffmpeg check failed (${FFMPEG}):`, toolChecks[1].reason);
  console.warn('[jukebox] audio preparation is disabled until both media tools are available.');
}
console.log(`[jukebox] YouTube JS runtime: ${YT_DLP_JS_RUNTIME}; cookies file: ${resolve(YT_DLP_COOKIES_PATH)}`);
await cleanupJukeboxCache();
setInterval(() => { void cleanupJukeboxCache().catch((error) => console.error('[jukebox] cache cleanup failed:', error)); }, 60 * 60 * 1000);
server.listen(PORT, () => console.log(`Mengai server listening on http://localhost:${PORT}`));
