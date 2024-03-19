import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { AnimationContext } from '@context';
import { CUSTOM_COLORS } from '../../tailwind.config';
import { addGridHelper, addOrbitControl } from '@util';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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

			// Add cube
			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial({ color: CUSTOM_COLORS.gamboge });
			const cube1 = new THREE.Mesh(geometry, material);
			const cube2 = new THREE.Mesh(geometry, material);
			cube1.position.set(char.x, char.y, char.z);
			cube2.position.set(project.x, project.y, project.z);
			scene.add(cube1);
			scene.add(cube2);

			// Render the scene and camera
			const startingPoint = cube1.position.x;
			camera.position.x = startingPoint;
			addGridHelper(scene);
			const loader = new GLTFLoader();
			loader.load(
				// resource URL
				'models/house.glb',
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

			addOrbitControl(scene, camera, renderer);

			// renderer.render(scene, camera);
			setSceneControls({ renderer, scene, camera });
		}
	}, [setSceneControls]);

	return <div ref={containerRef} />;
};
