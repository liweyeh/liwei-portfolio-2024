'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const ThreeScene: React.FC = () => {
	const initialised = useRef<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window !== 'undefined' && !initialised.current) {
			initialised.current = true;
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000,
			);

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

			const geometry = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			const cube = new THREE.Mesh(geometry, material);
			scene.add(cube);

			camera.position.z = 5;
			const gridHelper = new THREE.GridHelper(200, 50);
			scene.add(gridHelper);
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.update();

			const animate = () => {
				requestAnimationFrame(animate);

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				controls.update();

				renderer.render(scene, camera);
			};

			animate();
		}
	}, []);

	return <div ref={containerRef} />;
};
