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
	const { FIRST_LOOK_AT, CAM_HOUSE_POS } = POS_CONST;
	const onUIClick = async () => {
		if (sceneControls) {
			const { scene, camera, renderer } = sceneControls;
			const indoor = new THREE.Vector3(CAM_HOUSE_POS.x, CAM_HOUSE_POS.y, CAM_HOUSE_POS.z);
			const secondLookAtPos = new THREE.Vector3(
				FIRST_LOOK_AT.x,
				FIRST_LOOK_AT.y + 3,
				FIRST_LOOK_AT.z,
			);
			setIsHidden(true);
			await moveCameraToLookAt(renderer, scene, camera, indoor, secondLookAtPos, 0.01);
		}
	};

	return (
		<>
			{isHidden ? (
				<></>
			) : (
				<div
					className={'fixed flex flex-col w-full h-full justify-center items-center'}
					onClick={onUIClick}
				>
					<div className={`text-black`}>{t`welcome`}</div>
					<div className={`text-black`}>{t`click`}</div>
				</div>
			)}
		</>
	);
};
