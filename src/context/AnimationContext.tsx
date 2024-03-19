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
}

const contextDefaultValues: AnimationContextState = {
	sceneControls: undefined,
	setSceneControls: () => {},
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

	return (
		<AnimationContext.Provider
			value={{
				sceneControls,
				setSceneControls,
			}}
		>
			{children}
		</AnimationContext.Provider>
	);
};
