import type { Config } from 'tailwindcss';

export const CUSTOM_COLORS = {
	rich_black: '#001219',
	midnight_green: '#005F73',
	dark_cyan: '#0A9396',
	tiffany_blue: '#94D2BD',
	vanilla: '#E9D8A6',
	gamboge: '#EE9B00',
	alloy_orange: '#CA6702',
	rust: '#BB3E03',
	rufous: '#AE2012',
	auburn: '#9B2226',
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
				background_primary: CUSTOM_COLORS.auburn,
				background_info: CUSTOM_COLORS.gamboge,
				background_accent: CUSTOM_COLORS.rust,
				text_primary: CUSTOM_COLORS.midnight_green,
				text_subtitle: CUSTOM_COLORS.dark_cyan,
			},
		},
	},
	plugins: [],
};
export default config;
