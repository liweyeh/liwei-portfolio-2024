import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { AnimationContext } from '@context';

export const Scene: React.FC = () => {
	const { setSceneControls, setCube } = useContext(AnimationContext);
	const initialised = useRef<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

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
			camera.position.z = 10;

			// Add cube
			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial({ color: 0x6db3c5 });
			const cube1 = new THREE.Mesh(geometry, material);
			scene.add(cube1);

			// Render the scene and camera
			const startingPoint = cube1.position.x;
			camera.position.x = startingPoint;
			renderer.render(scene, camera);
			setSceneControls({ renderer, scene, camera });
			setCube(cube1);
		}
	}, [setSceneControls, setCube]);

	return (
		<div>
			<div ref={containerRef} />
		</div>
	);
};
