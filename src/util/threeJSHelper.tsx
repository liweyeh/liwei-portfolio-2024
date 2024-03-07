import * as THREE from 'three';

export const addGridHelper = (scene: THREE.Scene) => {
	const gridHelper = new THREE.GridHelper(200, 50);
	scene.add(gridHelper);
};

export const addCameraHelper = (camera: THREE.Camera, scene: THREE.Scene) => {
	const helper = new THREE.CameraHelper(camera);
	scene.add(helper);
};
