'use client';
import React, { createContext, useState } from 'react';
import * as THREE from 'three';

export interface AnimationContextState {
	sceneControls?: {
		renderer: THREE.WebGLRenderer;
		scene: THREE.Scene;
		camera: THREE.Camera;
	};
	setSceneControls: React.Dispatch<
		React.SetStateAction<
			| {
					renderer: THREE.WebGLRenderer;
					scene: THREE.Scene;
					camera: THREE.Camera;
			  }
			| undefined
		>
	>;
	cube?: THREE.Mesh;
	setCube: React.Dispatch<React.SetStateAction<THREE.Mesh | undefined>>;
}

const contextDefaultValues: AnimationContextState = {
	sceneControls: undefined,
	setSceneControls: () => {},
	cube: undefined,
	setCube: () => {},
};

export const AnimationContext = createContext<AnimationContextState>(contextDefaultValues);

export const AnimationContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [sceneControls, setSceneControls] = useState<{
		renderer: THREE.WebGLRenderer;
		scene: THREE.Scene;
		camera: THREE.Camera;
	}>();
	const [cube, setCube] = useState<THREE.Mesh>();

	return (
		<AnimationContext.Provider
			value={{
				sceneControls,
				setSceneControls,
				cube,
				setCube,
			}}
		>
			{children}
		</AnimationContext.Provider>
	);
};
