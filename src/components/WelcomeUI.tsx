import React, { useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AnimationContext } from '@context';
import { moveCameraToLookAt } from '@util';
import * as THREE from 'three';

export const WelcomeUI = () => {
	const [isHidden, setIsHidden] = useState<boolean>(false);
	const { t } = useTranslation('welcomeUI');
	const { sceneControls, cube } = useContext(AnimationContext);

	return (
		<>
			{isHidden ? (
				<></>
			) : (
				<div
					className={'fixed flex flex-col w-full h-full justify-center items-center'}
					onClick={() => {
						if (sceneControls && cube) {
							const { scene, camera, renderer } = sceneControls;
							const destination = new THREE.Vector3();
							destination.setFromMatrixPosition(cube.matrixWorld);
							destination.z += 2;
							moveCameraToLookAt(renderer, scene, camera, destination, cube.position, 0.01);
							setIsHidden(true);
						}
					}}
				>
					<div className={`text-black`}>{t`welcome`}</div>
					<div className={`text-black`}>{t`click`}</div>
				</div>
			)}
		</>
	);
};
