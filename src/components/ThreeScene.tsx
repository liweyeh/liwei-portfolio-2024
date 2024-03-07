'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { addGridHelper, addCameraHelper } from '@util';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const ThreeScene: React.FC = () => {
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
			camera.position.z = 5;

			// Add cube
			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial({ color: 0x6db3c5 });
			const cube1 = new THREE.Mesh(geometry, material);
			cube1.position.x = -2;
			scene.add(cube1);
			const cube2 = new THREE.Mesh(geometry, material);
			cube2.position.x = 2;
			scene.add(cube2);

			// Render the scene and camera
			const startingPoint = cube1.position.x;
			camera.position.x = startingPoint;
			const totalDistance = cube2.position.x - cube1.position.x;
			let time = 0;
			let isPanningRight = 1;
			const animate = () => {
				if (isPanningRight) {
					time += 0.01;
					if (time >= 1) isPanningRight = 0;
				} else {
					time -= 0.01;
					if (time <= 0) isPanningRight = 1;
				}
				camera.position.x = startingPoint + totalDistance * time;
				camera.lookAt(cube1.position);
				renderer.render(scene, camera);
				requestAnimationFrame(animate);
			};
			animate();
		}
	}, []);

	return <div ref={containerRef} />;
};
