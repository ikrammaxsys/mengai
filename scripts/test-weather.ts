import assert from 'node:assert/strict';
import { calculateReelParameters, FISH_CONFIG } from '../shared/fishConfig.js';
import { getWeightedTable } from '../server/src/fishing.js';
import { Rooms } from '../server/src/rooms.js';
import { chooseNextWeather, createWeatherSnapshot, WEATHER_CONFIG, WEATHER_TYPES } from '../shared/weatherConfig.js';

const noCatchState = { pityMisses: 0, lastSpecies: null } as const;

assert.equal(createWeatherSnapshot('clear', 1000, () => 0).endsAt, 1000 + WEATHER_CONFIG.durationMinMs);
assert.equal(chooseNextWeather('clear', () => 0.999), 'fog');
for (const weather of WEATHER_TYPES) {
  const weights = WEATHER_CONFIG.transitions[weather];
  assert.ok(Object.values(weights).some((weight) => weight > 0), `${weather} needs at least one possible transition`);
}
assert.equal(WEATHER_CONFIG.transitions.clear.storm, 0, 'clear weather must never jump directly to a storm');
assert.equal(WEATHER_CONFIG.transitions.cloudy.storm, 0, 'cloudy weather should progress through rain before a storm');

const clearOdds = getWeightedTable(FISH_CONFIG.pond.waterRadius * 0.5, noCatchState, false, 'clear');
const stormOdds = getWeightedTable(FISH_CONFIG.pond.waterRadius * 0.5, noCatchState, false, 'storm');
const commonRareRatio = (odds: typeof clearOdds) => odds['largemouth-bass'] / odds.bluegill;
assert.ok(commonRareRatio(stormOdds) > commonRareRatio(clearOdds), 'storm affinity should favor rare fish over common fish');
assert.ok(calculateReelParameters('largemouth-bass', 1.2, 'storm').greenWidth < calculateReelParameters('largemouth-bass', 1.2, 'clear').greenWidth,
  'storm should slightly narrow the reel zone');
assert.ok(WEATHER_CONFIG.states.rain.fishing.biteWaitMultiplier < 1);
assert.ok(WEATHER_CONFIG.states.clear.fishing.biteWaitMultiplier > 1);

const rooms = new Rooms();
const created = rooms.createPlayer('weather-reset-test', 'First fisher', {} as never);
if (typeof created === 'string') throw new Error(created);
created.room.leaderboard.push({ id: 'old-catch', playerId: created.player.id, playerName: 'First fisher', species: 'bluegill', weightKg: 0.2, rarity: 'common', timestamp: Date.now() });
created.room.weather = createWeatherSnapshot('storm', Date.now() - WEATHER_CONFIG.durationMinMs, () => 0);
rooms.removePlayer('weather-reset-test', created.player.id);
assert.equal(rooms.getRoom('weather-reset-test'), created.room, 'room state can remain cached for its leaderboard');
const rejoined = rooms.createPlayer('weather-reset-test', 'Second fisher', {} as never);
if (typeof rejoined === 'string') throw new Error(rejoined);
assert.equal(rejoined.room.weather.type, 'clear', 'weather should reset after the room empties');
assert.ok(rejoined.room.weather.endsAt > Date.now(), 'an empty room should restart its weather duration on re-entry');

console.log('Weather checks passed: duration bounds, natural transitions, per-weather catch odds, bite timing, and storm reel modifier.');
