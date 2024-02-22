import type { Config } from 'tailwindcss';

const customColors = {
	tangerine: '#FFAF85',
	moonstone: '#6DB3C5',
	flax: 'FFEE93',
	celadon: 'ADF7B6',
	chiffon: 'FCF5C7',
	sky_blue: '#8AC2D0',
};

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'background.primary': customColors.tangerine,
				'background.info': customColors.chiffon,
				'background.accent': customColors.celadon,
				'text.primary': customColors.moonstone,
				'text.subtitle': customColors.sky_blue,
			},
		},
	},
	plugins: [],
};
export default config;
