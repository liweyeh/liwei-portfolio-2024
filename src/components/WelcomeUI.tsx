import React, { useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AnimationContext } from '@context';
import { moveCameraToLookAt } from '@util';
import { POS_CONST } from '@constant';
import * as THREE from 'three';

export const WelcomeUI = () => {
	const [isHidden, setIsHidden] = useState<boolean>(false);
	const { t } = useTranslation('welcomeUI');
	const { sceneControls } = useContext(AnimationContext);
	const { camera_enter } = POS_CONST;

	return (
		<>
			{isHidden ? (
				<></>
			) : (
				<div
					className={'fixed flex flex-col w-full h-full justify-center items-center'}
					onClick={() => {
						if (sceneControls) {
							const { scene, camera, renderer } = sceneControls;
							const destination = new THREE.Vector3(camera_enter.x, camera_enter.y, camera_enter.z);
							const lookAtPos = new THREE.Vector3(
								camera_enter.x,
								camera_enter.y,
								camera_enter.z - 10,
							);
							// moveCameraToLookAt(renderer, scene, camera, destination, lookAtPos, 0.01);
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
