'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { moveCameraToLookAt } from '@util';

export const ThreeScene: React.FC = () => {
	const initialised = useRef<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [sceneControls, setSceneControls] = useState<{
		renderer: THREE.WebGLRenderer;
		scene: THREE.Scene;
		camera: THREE.Camera;
	}>();
	const [cube, setCube] = useState<THREE.Mesh>();
	const [secCub, setSecCube] = useState<THREE.Mesh>();

	useEffect(() => {
		if (typeof window !== 'undefined' && !initialised.current) {
			// Prevent re-render
			initialised.current = true;

			// Create scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(0xffaf85);

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
			camera.position.z = 5;

			// Add cube
			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial({ color: 0x6db3c5 });
			const cube1 = new THREE.Mesh(geometry, material);
			cube1.position.x = -2;
			cube1.position.z = -4;
			scene.add(cube1);
			const cube2 = new THREE.Mesh(geometry, material);
			cube2.position.x = 2;
			scene.add(cube2);

			// Render the scene and camera
			const startingPoint = cube1.position.x;
			camera.position.x = startingPoint;
			renderer.render(scene, camera);
			setCube(cube1);
			setSecCube(cube2);
			setSceneControls({ renderer, scene, camera });
		}
	}, []);

	return (
		<div>
			<div ref={containerRef} />
			<button
				onClick={() => {
					if (cube && sceneControls) {
						const { renderer, scene, camera } = sceneControls;
						const destination = new THREE.Vector3(
							cube.position.x,
							cube.position.y,
							cube.position.z + 2,
						);
						moveCameraToLookAt(renderer, scene, camera, destination, cube.position, 0.01);
					}
				}}
			>
				Cube 1
			</button>
			<button
				onClick={() => {
					if (secCub && sceneControls) {
						const { renderer, scene, camera } = sceneControls;
						const destination = new THREE.Vector3(
							secCub.position.x,
							secCub.position.y,
							secCub.position.z + 2,
						);
						moveCameraToLookAt(renderer, scene, camera, destination, secCub.position, 0.01);
					}
				}}
			>
				Cube 2
			</button>
		</div>
	);
};
