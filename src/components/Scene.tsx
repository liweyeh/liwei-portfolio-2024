import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { AnimationContext } from '@context';
import { CUSTOM_COLORS } from '../../tailwind.config';
import { addGridHelper, addOrbitControl } from '@util';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import { POS_CONST } from '@constant';

export const Scene: React.FC = () => {
	const { setSceneControls } = useContext(AnimationContext);
	const initialised = useRef<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window !== 'undefined' && !initialised.current) {
			// Prevent re-render
			initialised.current = true;

			// Create scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(CUSTOM_COLORS.auburn);

			// Create camera
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000,
			);
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			containerRef.current?.appendChild(renderer.domElement);
			const { camera_starting, char, project } = POS_CONST;
			camera.position.set(camera_starting.x, camera_starting.y, camera_starting.z);

			// Render the scene and camera
			addGridHelper(scene);
			const loader = new GLTFLoader();
			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
			loader.setDRACOLoader(dracoLoader);
			loader.load(
				// resource URL
				'/models/house.glb',
				// called when the resource is loaded
				function (gltf) {
					scene.add(gltf.scene);

					gltf.animations; // Array<THREE.AnimationClip>
					gltf.scene; // THREE.Group
					gltf.scenes; // Array<THREE.Group>
					gltf.cameras; // Array<THREE.Camera>
					gltf.asset; // Object
				},
			);

			const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
			scene.add(light);

			addOrbitControl(scene, camera, renderer);

			// renderer.render(scene, camera);
			setSceneControls({ renderer, scene, camera });
		}
	}, [setSceneControls]);

	return <div ref={containerRef} />;
};
