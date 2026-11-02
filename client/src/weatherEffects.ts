import * as THREE from 'three';
import { WEATHER_CONFIG, type WeatherSnapshot, type WeatherType } from '../../shared/weatherConfig';

interface VisualState {
  skyColor: THREE.Color;
  ambientSkyColor: THREE.Color;
  ambientGroundColor: THREE.Color;
  ambientIntensity: number;
  directionalColor: THREE.Color;
  directionalIntensity: number;
  fogDensity: number;
  waterTint: THREE.Color;
  cloudOpacity: number;
  rainIntensity: number;
  waterChop: number;
  shadowRadius: number;
}

interface CloudDrifter {
  group: THREE.Group;
  x: number;
  z: number;
  phase: number;
}

function makeVisualState(type: WeatherType): VisualState {
  const visual = WEATHER_CONFIG.states[type].visuals;
  return {
    skyColor: new THREE.Color(visual.skyColor),
    ambientSkyColor: new THREE.Color(visual.ambientSkyColor),
    ambientGroundColor: new THREE.Color(visual.ambientGroundColor),
    ambientIntensity: visual.ambientIntensity,
    directionalColor: new THREE.Color(visual.directionalColor),
    directionalIntensity: visual.directionalIntensity,
    fogDensity: visual.fogDensity,
    waterTint: new THREE.Color(visual.waterTint),
    cloudOpacity: visual.cloudOpacity,
    rainIntensity: visual.rainIntensity,
    waterChop: visual.waterChop,
    shadowRadius: visual.shadowRadius,
  };
}

function cloneVisualState(source: VisualState): VisualState {
  return {
    skyColor: source.skyColor.clone(),
    ambientSkyColor: source.ambientSkyColor.clone(),
    ambientGroundColor: source.ambientGroundColor.clone(),
    ambientIntensity: source.ambientIntensity,
    directionalColor: source.directionalColor.clone(),
    directionalIntensity: source.directionalIntensity,
    fogDensity: source.fogDensity,
    waterTint: source.waterTint.clone(),
    cloudOpacity: source.cloudOpacity,
    rainIntensity: source.rainIntensity,
    waterChop: source.waterChop,
    shadowRadius: source.shadowRadius,
  };
}

export class WeatherEffects {
  private readonly rain: THREE.InstancedMesh;
  private readonly rainSeeds: { x: number; z: number; phase: number }[];
  private readonly rainTransform = new THREE.Object3D();
  private readonly ripples: { mesh: THREE.Mesh; material: THREE.MeshBasicMaterial; x: number; z: number; phase: number }[];
  private readonly waterPositions: Float32Array;
  private readonly cloudDrifters: CloudDrifter[] = [];
  private readonly cloudMaterial: THREE.MeshStandardMaterial;
  private readonly ambientLight: THREE.HemisphereLight;
  private readonly directionalLight: THREE.DirectionalLight;
  private readonly waterGeometry: THREE.BufferGeometry;
  private readonly waterMaterial: THREE.MeshStandardMaterial;
  private readonly scene: THREE.Scene;
  private readonly current: VisualState;
  private from: VisualState;
  private readonly to: VisualState;
  private weatherType: WeatherType = 'clear';
  private weatherStartedAt = 0;
  private transitionStartedAt = 0;

  constructor(
    scene: THREE.Scene,
    ambientLight: THREE.HemisphereLight,
    directionalLight: THREE.DirectionalLight,
    waterGeometry: THREE.BufferGeometry,
    waterMaterial: THREE.MeshStandardMaterial,
  ) {
    this.scene = scene;
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.waterGeometry = waterGeometry;
    this.waterMaterial = waterMaterial;
    this.current = makeVisualState('clear');
    this.from = cloneVisualState(this.current);
    this.to = makeVisualState('clear');
    this.waterPositions = Float32Array.from(waterGeometry.attributes.position.array as ArrayLike<number>);

    this.scene.fog = new THREE.FogExp2(this.current.skyColor, this.current.fogDensity);

    const rainMaterial = new THREE.MeshBasicMaterial({ color: '#d9eff4', transparent: true, opacity: 0.76, depthWrite: false });
    this.rain = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.42, 3),
      rainMaterial,
      WEATHER_CONFIG.effects.maxRainParticles,
    );
    this.rain.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.rain.frustumCulled = false;
    this.rain.renderOrder = 3;
    this.scene.add(this.rain);
    this.rainSeeds = Array.from({ length: WEATHER_CONFIG.effects.maxRainParticles }, () => ({
      x: Math.random(), z: Math.random(), phase: Math.random() * WEATHER_CONFIG.effects.rainHeight,
    }));

    const rippleGeometry = new THREE.TorusGeometry(1, 0.025, 3, 12);
    this.ripples = Array.from({ length: WEATHER_CONFIG.effects.rippleCount }, (_, index) => {
      const material = new THREE.MeshBasicMaterial({ color: '#e0fbff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(rippleGeometry, material);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = 0.255;
      mesh.visible = false;
      this.scene.add(mesh);
      const angle = index * 2.399963229728653;
      const radius = 0.55 + (index % 4) * 0.72;
      return { mesh, material, x: Math.cos(angle) * radius, z: Math.sin(angle) * radius, phase: index / WEATHER_CONFIG.effects.rippleCount };
    });

    this.cloudMaterial = new THREE.MeshStandardMaterial({ color: '#d7dfdb', roughness: 1, flatShading: true, transparent: true, opacity: 0 });
    const cloudShape = new THREE.DodecahedronGeometry(1, 0);
    const clouds = new THREE.Group();
    const cloudPositions: [number, number, number, number][] = [
      [-17, 10, -11, 2.8], [-8, 12, -20, 3.4], [7, 9, -18, 2.6], [19, 11, -5, 3.2], [12, 13, 14, 3.6],
    ];
    for (const [index, [x, y, z, scale]] of cloudPositions.entries()) {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      for (let part = 0; part < 4; part++) {
        const puff = new THREE.Mesh(cloudShape, this.cloudMaterial);
        puff.position.set((part - 1.5) * scale * 0.42, (part % 2) * scale * 0.12, Math.sin(part * 2.2) * scale * 0.14);
        puff.scale.set(scale * (0.48 + (part % 3) * 0.12), scale * (0.28 + (part % 2) * 0.08), scale * 0.32);
        puff.castShadow = false;
        group.add(puff);
      }
      clouds.add(group);
      this.cloudDrifters.push({ group, x, z, phase: index * 1.7 });
    }
    this.scene.add(clouds);
  }

  setWeather(weather: WeatherSnapshot, serverNow: number): void {
    this.update(serverNow, null);
    this.weatherType = weather.type;
    this.weatherStartedAt = weather.startedAt;
    this.transitionStartedAt = weather.startedAt;
    this.from = cloneVisualState(this.current);
    const target = makeVisualState(weather.type);
    Object.assign(this.to, target);
  }

  update(serverNow: number, camera: THREE.Camera | null): void {
    const progress = Math.max(0, Math.min(1, (serverNow - this.transitionStartedAt) / WEATHER_CONFIG.blendDurationMs));
    const t = progress * progress * (3 - 2 * progress);
    this.current.skyColor.copy(this.from.skyColor).lerp(this.to.skyColor, t);
    this.current.ambientSkyColor.copy(this.from.ambientSkyColor).lerp(this.to.ambientSkyColor, t);
    this.current.ambientGroundColor.copy(this.from.ambientGroundColor).lerp(this.to.ambientGroundColor, t);
    this.current.ambientIntensity = THREE.MathUtils.lerp(this.from.ambientIntensity, this.to.ambientIntensity, t);
    this.current.directionalColor.copy(this.from.directionalColor).lerp(this.to.directionalColor, t);
    this.current.directionalIntensity = THREE.MathUtils.lerp(this.from.directionalIntensity, this.to.directionalIntensity, t);
    this.current.fogDensity = THREE.MathUtils.lerp(this.from.fogDensity, this.to.fogDensity, t);
    this.current.waterTint.copy(this.from.waterTint).lerp(this.to.waterTint, t);
    this.current.cloudOpacity = THREE.MathUtils.lerp(this.from.cloudOpacity, this.to.cloudOpacity, t);
    this.current.rainIntensity = THREE.MathUtils.lerp(this.from.rainIntensity, this.to.rainIntensity, t);
    this.current.waterChop = THREE.MathUtils.lerp(this.from.waterChop, this.to.waterChop, t);
    this.current.shadowRadius = THREE.MathUtils.lerp(this.from.shadowRadius, this.to.shadowRadius, t);

    const fog = this.scene.fog;
    if (fog instanceof THREE.FogExp2) {
      fog.color.copy(this.current.skyColor);
      fog.density = this.current.fogDensity;
    }
    if (this.scene.background instanceof THREE.Color) this.scene.background.copy(this.current.skyColor);
    const lightning = this.lightningIntensity(serverNow);
    this.ambientLight.color.copy(this.current.ambientSkyColor);
    this.ambientLight.groundColor.copy(this.current.ambientGroundColor);
    this.ambientLight.intensity = this.current.ambientIntensity + lightning * 0.8;
    this.directionalLight.color.copy(this.current.directionalColor);
    this.directionalLight.intensity = this.current.directionalIntensity + lightning;
    this.directionalLight.shadow.radius = this.current.shadowRadius;
    this.waterMaterial.color.copy(this.current.waterTint);
    this.updateWaterChop(serverNow);
    this.updateRain(serverNow, camera);
    this.updateRipples(serverNow);
    this.updateClouds(serverNow);
  }

  private updateWaterChop(serverNow: number): void {
    const position = this.waterGeometry.attributes.position as THREE.BufferAttribute;
    const amplitude = this.current.waterChop;
    const time = serverNow * 0.001;
    for (let index = 0; index < position.count; index++) {
      const offset = index * 3;
      const x = this.waterPositions[offset];
      const z = this.waterPositions[offset + 1];
      const originalY = this.waterPositions[offset + 2];
      position.setZ(index, originalY + amplitude * Math.sin(time * 2.8 + x * 1.8 + z * 1.4));
    }
    position.needsUpdate = true;
    if (amplitude > 0.001) this.waterGeometry.computeVertexNormals();
  }

  private updateRain(serverNow: number, camera: THREE.Camera | null): void {
    const intensity = this.current.rainIntensity;
    const count = Math.round(this.rainSeeds.length * intensity);
    this.rain.count = count;
    (this.rain.material as THREE.MeshBasicMaterial).opacity = 0.76 * intensity;
    this.rain.visible = count > 0;
    if (!camera || count === 0) return;
    const position = camera.position;
    const { rainSpread, rainHeight, rainFallSpeed } = WEATHER_CONFIG.effects;
    const seconds = serverNow / 1000;
    for (let index = 0; index < count; index++) {
      const seed = this.rainSeeds[index];
      const falling = (seconds * rainFallSpeed + seed.phase) % rainHeight;
      this.rainTransform.position.set(
        position.x + (seed.x - 0.5) * rainSpread,
        position.y + 4 - falling,
        position.z + (seed.z - 0.5) * rainSpread,
      );
      this.rainTransform.rotation.set(0.08, 0, 0.12);
      this.rainTransform.scale.set(1, 1, 1);
      this.rainTransform.updateMatrix();
      this.rain.setMatrixAt(index, this.rainTransform.matrix);
    }
    this.rain.instanceMatrix.needsUpdate = true;
  }

  private updateRipples(serverNow: number): void {
    const intensity = this.current.rainIntensity;
    for (const ripple of this.ripples) {
      const phase = (serverNow / WEATHER_CONFIG.effects.rippleLifetimeMs + ripple.phase) % 1;
      const active = intensity > 0.025 && phase < 0.94;
      ripple.mesh.visible = active;
      if (!active) continue;
      ripple.mesh.position.x = ripple.x;
      ripple.mesh.position.z = ripple.z;
      ripple.mesh.scale.setScalar(0.06 + phase * 0.42);
      ripple.material.opacity = (1 - phase) * intensity * 0.48;
    }
  }

  private updateClouds(serverNow: number): void {
    this.cloudMaterial.opacity = this.current.cloudOpacity;
    for (const cloud of this.cloudDrifters) {
      cloud.group.visible = this.current.cloudOpacity > 0.01;
      const seconds = serverNow / 1000;
      cloud.group.position.x = cloud.x + Math.sin(seconds * 0.025 + cloud.phase) * 1.1;
      cloud.group.position.z = cloud.z + Math.cos(seconds * 0.018 + cloud.phase) * 0.6;
      cloud.group.rotation.y = Math.sin(seconds * 0.01 + cloud.phase) * 0.035;
    }
  }

  private lightningIntensity(serverNow: number): number {
    if (this.weatherType !== 'storm') return 0;
    const { lightningCycleMs, lightningFlashMs, lightningMaxIntensity } = WEATHER_CONFIG.effects;
    const elapsed = Math.max(0, serverNow - this.weatherStartedAt);
    const cycle = Math.floor(elapsed / lightningCycleMs);
    const normalized = Math.abs(Math.sin((this.weatherStartedAt + cycle * 12345.678) * 0.00017));
    const strikeAt = cycle * lightningCycleMs + lightningCycleMs * (0.18 + normalized * 0.62);
    const sinceStrike = elapsed - strikeAt;
    if (sinceStrike < 0 || sinceStrike > lightningFlashMs) return 0;
    return Math.sin(Math.PI * sinceStrike / lightningFlashMs) * lightningMaxIntensity;
  }
}
