/**
 * @type {import('postcss').Plugin}
 */
export default {
	postcssPlugin: 'postcss-use-logical',
	Declaration(declaration, { list }) {
		// skip if dir is specified
		if ((() => {
			let _skip = false;
			const skipDirSelectors = (p) => {
				if (p.selector?.includes('[dir=') || p.selector?.includes(':dir(')) _skip = true;
				if (p.parent) skipDirSelectors(p.parent);
			}
			skipDirSelectors(declaration.parent);
			return _skip;
		})()) return;

		// do the 1:1 find-and-replace for simple properties
		if (Object.keys(easyPhysicalProps).includes(declaration.prop)) {
			declaration.prop = easyPhysicalProps[declaration.prop];
		}

		// clone with fallback for ones that don't have great support
		if (Object.keys(withFallbacks).includes(declaration.prop)) {
			declaration.cloneBefore({ prop: withFallbacks[declaration.prop] })
		}

		// convert the more difficult shorthands that can have 2-4 values
		if (Object.keys(shorthands).includes(declaration.prop)) {
			const _list = list.space(declaration.value);
			if (_list.length !== 1) {
				_list.forEach((value, index) => {
					declaration.cloneBefore({ prop: shorthands[declaration.prop][_list.length][index], value });
				})
				declaration.remove();
			}
		}

		// this one is weird, it's supported since Chrome v1!
		if (declaration.prop === 'text-align') {
			declaration.value = declaration.value.replace('left', 'start').replace('right', 'end');
		}
	},
}

export const postcss = true;

const easyPhysicalProps = {
	top: 'inset-block-start',
	bottom: 'inset-block-end',
	left: 'inset-inline-end',
	right: 'inset-inline-end',
	'margin-top': 'margin-block-start',
	'margin-bottom': 'margin-block-end',
	'margin-left': 'margin-inline-start',
	'margin-right': 'margin-inline-end',
	'padding-top': 'padding-block-start',
	'padding-bottom': 'padding-block-end',
	'padding-left': 'padding-inline-start',
	'padding-right': 'padding-inline-end',
	width: 'inline-size',
	'min-width': 'min-inline-size',
	'max-width': 'max-inline-size',
	height: 'block-size',
	'min-height': 'min-block-size',
	'max-height': 'max-block-size',
	'overscroll-behavior-x': 'overscroll-behavior-inline',
	'overscroll-behavior-y': 'overscroll-behavior-block',
	'border-top': 'border-block-start',
	'border-top-color': 'border-block-start-color',
	'border-top-style': 'border-block-start-style',
	'border-top-width': 'border-block-start-width',
	'border-bottom': 'border-block-end',
	'border-bottom-color': 'border-block-end-color',
	'border-bottom-style': 'border-block-end-style',
	'border-bottom-width': 'border-block-end-width',
	'border-left': 'border-inline-start',
	'border-left-color': 'border-inline-start-color',
	'border-left-style': 'border-inline-start-style',
	'border-left-width': 'border-inline-start-width',
	'border-right': 'border-inline-end',
	'border-right-color': 'border-inline-end-color',
	'border-right-style': 'border-inline-end-style',
	'border-right-width': 'border-inline-end-width',
	'border-top-left-radius': 'border-start-start-radius',
	'border-top-right-radius': 'border-start-end-radius',
	'border-bottom-left-radius': 'border-end-start-radius',
	'border-bottom-right-radius': 'border-end-end-radius',
	'contain-intrinsic-width': 'contain-intrinsic-inline-size',
	'contain-intrinsic-height': 'contain-intrinsic-block-size',
};

// these ones don't have great support so need fallback
const withFallbacks = {
	'overflow-x': 'overflow-inline',
	'overflow-y': 'overflow-block',
};

// this could probably be automated, but there are subtle differences so i just wrote it by hand 🤷
const shorthands = {
	'margin': {
		4: ['margin-block-start', 'margin-inline-end', 'margin-block-end', 'margin-inline-start'],
		3: ['margin-block-start', 'margin-inline', 'margin-block-end'],
		2: ['margin-block', 'margin-inline']
	},
	'padding': {
		4: ['padding-block-start', 'padding-inline-end', 'padding-block-end', 'padding-inline-start'],
		3: ['padding-block-start', 'padding-inline', 'padding-block-end'],
		2: ['padding-block', 'padding-inline']
	},
	'inset': {
		4: ['inset-block-start', 'inset-inline-end', 'inset-block-end', 'inset-inline-start'],
		3: ['inset-block-start', 'inset-inline', 'inset-block-end'],
		2: ['inset-block', 'inset-inline']
	},
	'border-color': {
		4: ['border-block-start-color', 'border-inline-end-color', 'border-block-end-color', 'border-inline-start-color'],
		3: ['border-block-start-color', 'border-inline-color', 'border-block-end-color'],
		2: ['border-block-color', 'border-inline-color']
	},
	'border-style': {
		4: ['border-block-start-style', 'border-inline-end-style', 'border-block-end-style', 'border-inline-start-style'],
		3: ['border-block-start-style', 'border-inline-style', 'border-block-end-style'],
		2: ['border-block-style', 'border-inline-style']
	},
	'border-width': {
		4: ['border-block-start-width', 'border-inline-end-width', 'border-block-end-width', 'border-inline-start-width'],
		3: ['border-block-start-width', 'border-inline-width', 'border-block-end-width'],
		2: ['border-block-width', 'border-inline-width']
	},
}
