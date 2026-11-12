import * as THREE from 'three';

export interface CrocodileModelParts {
  bodyMaterial: THREE.MeshStandardMaterial;
  tail: THREE.Group;
  legs: THREE.Mesh[];
}

export function populateCrocodileModel(group: THREE.Group, tail: THREE.Group): CrocodileModelParts {
  const green = new THREE.MeshStandardMaterial({ color: '#547b45', roughness: 1, flatShading: true });
  const belly = new THREE.MeshStandardMaterial({ color: '#c2aa70', roughness: 1, flatShading: true });
  const darkGreen = new THREE.MeshStandardMaterial({ color: '#385c37', roughness: 1, flatShading: true });
  const armor = new THREE.MeshStandardMaterial({ color: '#596875', metalness: 0.8, roughness: 0.28, flatShading: true });
  const legs: THREE.Mesh[] = [];
  const torso = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.9, 1.45, 3, 1, 2), green);
  torso.position.y = 0.72; group.add(torso);
  const bellyPlate = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.22, 1.15, 3, 1, 2), belly);
  bellyPlate.position.set(0, 0.29, 0.15); group.add(bellyPlate);
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.82, 1.35, 2, 1, 2), green);
  head.position.set(0, 0.82, 1.85); group.add(head);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.44, 1.2, 3, 1, 2), green);
  snout.position.set(0, 0.58, 2.65); group.add(snout);
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 6, 4), new THREE.MeshStandardMaterial({ color: '#efc64d', emissive: '#4d3910', flatShading: true }));
    eye.position.set(side * 0.57, 1.24, 2.02); group.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.065, 5, 4), darkGreen);
    pupil.position.set(side * 0.6, 1.25, 2.14); group.add(pupil);
    for (const z of [-0.48, 1.12]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.38, 0.7), green);
      leg.position.set(side * 1.56, 0.34, z); leg.castShadow = true; group.add(leg); legs.push(leg);
    }
  }
  for (let index = 0; index < 3; index++) {
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.14, 1.05), armor);
    plate.position.set(0, 1.2 + index * 0.04, -0.85 + index * 0.72);
    plate.rotation.x = -0.16;
    group.add(plate);
  }
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 0.18, 8), armor);
    shoulder.rotation.z = Math.PI / 2;
    shoulder.position.set(side * 1.55, 0.95, 0.05);
    group.add(shoulder);
  }
  tail.position.set(0, 0.64, -1.85);
  const tailMesh = new THREE.Mesh(new THREE.ConeGeometry(0.73, 3.0, 5), green);
  tailMesh.rotation.x = -Math.PI / 2; tailMesh.position.z = -1.25; tail.add(tailMesh);
  group.add(tail);
  for (let index = 0; index < 5; index++) {
    const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.105, 0.25, 4), belly);
    tooth.rotation.x = Math.PI; tooth.position.set(-0.52 + index * 0.26, 0.35, 2.7); group.add(tooth);
  }
  group.traverse((part) => { if (part instanceof THREE.Mesh) part.castShadow = true; });
  return { bodyMaterial: green, tail, legs };
}

export function animateCrocodileWalk(legs: THREE.Mesh[], time: number, walking: boolean): void {
  for (let index = 0; index < legs.length; index++) {
    legs[index].rotation.x = walking ? Math.sin(time * 0.014 + (index % 2) * Math.PI) * 0.28 : 0;
  }
}
