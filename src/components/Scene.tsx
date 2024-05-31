'use client';
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

			// Create renderer
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			containerRef.current?.appendChild(renderer.domElement);

			// Create camera
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000,
			);
			const { CAM_START_POS, HOUSE_CENTER } = POS_CONST;
			camera.position.set(CAM_START_POS.x, CAM_START_POS.y, CAM_START_POS.z);

			// Create lighting
			const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
			scene.add(light);

			// Render the model
			const loader = new GLTFLoader();
			loader.load('/models/house.glb', function (gltf) {
				const house = new THREE.Vector3(HOUSE_CENTER.x, HOUSE_CENTER.y, HOUSE_CENTER.z);
				scene.add(gltf.scene);
				camera.lookAt(house);
				renderer.render(scene, camera);
			});

			// addOrbitControl(scene, camera, renderer);

			setSceneControls({ renderer, scene, camera });
		}
	}, [setSceneControls]);

	return <div ref={containerRef} />;
};
