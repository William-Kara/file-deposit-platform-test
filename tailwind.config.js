/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		extend: {
			colors: {
				'arena-turquoise': '#31BAA8',
				'arena-blue': '#596AEE',
				'arena-deep-blue': '#141520',
				'arena-yellow': '#FF9C55',
				'arena-grey': '#F1F3FF',
			},
		},
	},
	plugins: [],
};
