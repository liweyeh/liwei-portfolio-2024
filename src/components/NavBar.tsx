import React, { useState } from 'react';

export const NavBar = () => {
	const [showDrawer, setShowDrawer] = useState(false);
	return (
		<>
			<div
				className="fixed top-3 right-5 flex gap-4 z-10"
				onClick={e => {
					e.stopPropagation();
				}}
			>
				<button
					className="bg-background.info w-10 h-10 rounded-full"
					onClick={() => {
						setShowDrawer(true);
					}}
				>
					i
				</button>
			</div>
			<div
				className={`fixed top-0 right-0 z-20 h-screen w-screen ${showDrawer ? 'flex' : 'hidden'}`}
			>
				<div
					className="bg-black w-full opacity-30 "
					onClick={() => {
						setShowDrawer(false);
					}}
				/>
				<div
					className={`fixed top-0 right-0 bg-background_info z-30 h-screen w-1/5 translate-x-${showDrawer ? '0' : 'full'}`}
				>
					content
				</div>
			</div>
		</>
	);
};
