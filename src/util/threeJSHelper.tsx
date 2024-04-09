import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Camera Helpers
export const moveCameraToLookAt = async (
	renderer: THREE.WebGLRenderer,
	scene: THREE.Scene,
	camera: THREE.Camera,
	cameraDestination: THREE.Vector3,
	target: THREE.Vector3,
	speed: number,
) => {
	const startingPoint = camera.position;
	const endingPoint = cameraDestination;
	let progress = 0;
	const camPromise = new Promise((resolve, reject) => {
		const animate = () => {
			progress += speed;
			const { x, y, z } = startingPoint.lerp(endingPoint, progress);
			camera.position.set(x, y, z);
			camera.lookAt(target);
			renderer.render(scene, camera);
			if (progress >= 0 && progress < 1) {
				requestAnimationFrame(animate);
			} else {
				resolve('reach destination');
			}
		};
		animate();
	});

	return camPromise;
};

// Dev Helpers
export const addGridHelper = (scene: THREE.Scene) => {
	const gridHelper = new THREE.GridHelper(200, 50);
	scene.add(gridHelper);
};

export const addCameraHelper = (camera: THREE.Camera, scene: THREE.Scene) => {
	const helper = new THREE.CameraHelper(camera);
	scene.add(helper);
};

export const addOrbitControl = (
	scene: THREE.Scene,
	camera: THREE.Camera,
	renderer: THREE.WebGLRenderer,
) => {
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	const animate = () => {
		requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	};
	animate();
};
