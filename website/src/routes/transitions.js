import { cubicIn, cubicOut } from 'svelte/easing';
import { fade } from 'svelte/transition';

export function slideIn(node, { duration = 300, reverse = false }) {
	return {
		duration,
		css: (t) => {
			const eased = cubicOut(t);
			const translate = (reverse ? (eased - 1) : (1 - eased)) * 100;
			return `transform: translateX(${Math.round(translate)}%);`;
		},
	};
}

export function slideOut(node, { duration = 250, reverse = false }) {
	const faded = fade(node, { duration });

	return {
		duration,
		css: (t, u) => {
			const eased = cubicIn(t);
			const translate = (reverse ? (1 - eased) : (eased - 1)) * 100;

			return `
				${faded.css?.(t, u)};
				position: absolute;
				inset: 0;
				transform: translateX(${Math.round(translate)}%);
			`;
		}
	}
}
