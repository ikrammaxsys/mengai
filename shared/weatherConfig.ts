import type { FishSpeciesId } from './fishConfig.js';

export const WEATHER_TYPES = ['clear', 'cloudy', 'rain', 'fog', 'storm'] as const;
export type WeatherType = (typeof WEATHER_TYPES)[number];

export interface WeatherSnapshot {
  type: WeatherType;
  startedAt: number;
  endsAt: number;
  next: WeatherType;
}

export const WEATHER_CONFIG = {
  durationMinMs: 2 * 60 * 1000,
  durationMaxMs: 4 * 60 * 1000,
  blendDurationMs: 5000,
  transitions: {
    clear: { clear: 3, cloudy: 7, rain: 0, fog: 1, storm: 0 },
    cloudy: { clear: 5, cloudy: 1, rain: 6, fog: 2, storm: 0 },
    rain: { clear: 1, cloudy: 5, rain: 1, fog: 3, storm: 3 },
    fog: { clear: 5, cloudy: 4, rain: 1, fog: 1, storm: 0 },
    storm: { clear: 0, cloudy: 3, rain: 7, fog: 1, storm: 0 },
  } satisfies Record<WeatherType, Record<WeatherType, number>>,
  effects: {
    maxRainParticles: 360,
    rainFallSpeed: 23,
    rainSpread: 18,
    rainHeight: 22,
    rippleCount: 12,
    rippleLifetimeMs: 1100,
    lightningCycleMs: 17_000,
    lightningFlashMs: 280,
    lightningMaxIntensity: 2.6,
  },
  states: {
    clear: {
      name: 'Clear', emoji: '☀️', toast: 'The skies are clearing ☀️', hint: 'Common fish are biting 🎣',
      visuals: {
        skyColor: '#c6e5df', ambientSkyColor: '#f4fff4', ambientGroundColor: '#8aa69a', ambientIntensity: 2.15,
        directionalColor: '#fff6d9', directionalIntensity: 3.3, fogDensity: 0.009, waterTint: '#5bb7c1',
        cloudOpacity: 0, rainIntensity: 0, waterChop: 0, shadowRadius: 3,
      },
      fishing: {
        speciesAffinity: { bluegill: 1.2, 'rainbow-trout': 1, 'largemouth-bass': 0.9, 'common-carp': 0.85, 'golden-koi': 0.8, todak: 0.7, buntal: 1, pari: 0.65 },
        biteWaitMultiplier: 1.08, reelGreenWidthMultiplier: 1,
      },
    },
    cloudy: {
      name: 'Cloudy', emoji: '☁️', toast: 'Clouds are gathering ☁️', hint: 'A little variety is biting 🎣',
      visuals: {
        skyColor: '#b7c9c8', ambientSkyColor: '#e0e8e4', ambientGroundColor: '#7e918f', ambientIntensity: 1.9,
        directionalColor: '#d8dfdc', directionalIntensity: 2.15, fogDensity: 0.012, waterTint: '#579eaa',
        cloudOpacity: 0.82, rainIntensity: 0, waterChop: 0.002, shadowRadius: 5,
      },
      fishing: {
        speciesAffinity: { bluegill: 1, 'rainbow-trout': 1.08, 'largemouth-bass': 1.08, 'common-carp': 1, 'golden-koi': 1, todak: 0.95, buntal: 1.05, pari: 0.9 },
        biteWaitMultiplier: 1, reelGreenWidthMultiplier: 1,
      },
    },
    rain: {
      name: 'Rain', emoji: '🌧️', toast: 'It’s starting to rain 🌧️', hint: 'Rare fish are biting 🎣',
      visuals: {
        skyColor: '#91a9ae', ambientSkyColor: '#c4d2d2', ambientGroundColor: '#627b7d', ambientIntensity: 1.65,
        directionalColor: '#b7c8ca', directionalIntensity: 1.65, fogDensity: 0.015, waterTint: '#448c9b',
        cloudOpacity: 0.88, rainIntensity: 0.68, waterChop: 0.012, shadowRadius: 7,
      },
      fishing: {
        speciesAffinity: { bluegill: 0.9, 'rainbow-trout': 1.1, 'largemouth-bass': 1.25, 'common-carp': 1.35, 'golden-koi': 1.3, todak: 1.25, buntal: 1.2, pari: 1.3 },
        biteWaitMultiplier: 0.9, reelGreenWidthMultiplier: 1,
      },
    },
    fog: {
      name: 'Fog', emoji: '🌫️', toast: 'A gentle fog is rolling in 🌫️', hint: 'Trout like the mist 🎣',
      visuals: {
        skyColor: '#b8c8c3', ambientSkyColor: '#dce5df', ambientGroundColor: '#87958b', ambientIntensity: 1.8,
        directionalColor: '#d2d9d2', directionalIntensity: 1.4, fogDensity: 0.023, waterTint: '#65979a',
        cloudOpacity: 0.25, rainIntensity: 0, waterChop: 0.001, shadowRadius: 6,
      },
      fishing: {
        speciesAffinity: { bluegill: 0.95, 'rainbow-trout': 1.2, 'largemouth-bass': 1.12, 'common-carp': 1.05, 'golden-koi': 1, todak: 1.05, buntal: 0.95, pari: 1 },
        biteWaitMultiplier: 1.12, reelGreenWidthMultiplier: 1,
      },
    },
    storm: {
      name: 'Storm', emoji: '⛈️', toast: 'A storm is rolling in ⛈️', hint: 'Rare fish love a storm 🎣',
      visuals: {
        skyColor: '#536d78', ambientSkyColor: '#9aabb2', ambientGroundColor: '#43535b', ambientIntensity: 1.4,
        directionalColor: '#aabac6', directionalIntensity: 1.1, fogDensity: 0.02, waterTint: '#326d80',
        cloudOpacity: 1, rainIntensity: 1, waterChop: 0.035, shadowRadius: 9,
      },
      fishing: {
        speciesAffinity: { bluegill: 0.82, 'rainbow-trout': 1.08, 'largemouth-bass': 1.35, 'common-carp': 1.48, 'golden-koi': 1.42, todak: 1.5, buntal: 1.25, pari: 1.45 },
        biteWaitMultiplier: 0.86, reelGreenWidthMultiplier: 0.92,
      },
    },
  } satisfies Record<WeatherType, {
    name: string;
    emoji: string;
    toast: string;
    hint: string;
    visuals: {
      skyColor: string;
      ambientSkyColor: string;
      ambientGroundColor: string;
      ambientIntensity: number;
      directionalColor: string;
      directionalIntensity: number;
      fogDensity: number;
      waterTint: string;
      cloudOpacity: number;
      rainIntensity: number;
      waterChop: number;
      shadowRadius: number;
    };
    fishing: {
      speciesAffinity: Record<FishSpeciesId, number>;
      biteWaitMultiplier: number;
      reelGreenWidthMultiplier: number;
    };
  }>,
} as const;

export function isWeatherType(value: unknown): value is WeatherType {
  return typeof value === 'string' && WEATHER_TYPES.includes(value as WeatherType);
}

export function chooseNextWeather(current: WeatherType, random: () => number = Math.random): WeatherType {
  const weights = WEATHER_CONFIG.transitions[current];
  const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  let choice = random() * total;
  for (const type of WEATHER_TYPES) {
    choice -= weights[type];
    if (choice < 0) return type;
  }
  return WEATHER_TYPES[0];
}

export function randomWeatherDuration(random: () => number = Math.random): number {
  const range = WEATHER_CONFIG.durationMaxMs - WEATHER_CONFIG.durationMinMs;
  return WEATHER_CONFIG.durationMinMs + Math.floor(random() * range);
}

export function createWeatherSnapshot(type: WeatherType, startedAt: number, random: () => number = Math.random): WeatherSnapshot {
  return {
    type,
    startedAt,
    endsAt: startedAt + randomWeatherDuration(random),
    next: chooseNextWeather(type, random),
  };
}
