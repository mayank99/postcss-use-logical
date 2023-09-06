import { fail, type Actions } from '@sveltejs/kit';
import postcss from 'postcss';
import postcssUseLogical from 'postcss-use-logical';
import { parse as parser } from 'postcss-scss';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const { source } = Object.fromEntries(data);

		try {
			const output =
				(await
					postcss([postcssUseLogical]).process(source, { parser })
				).css;

			return { output }
		} catch (error: any) {
			if ('name' in error) {
				return fail(500, { source, error: `${error.name}: ${error.reason}` });
			} else {
				return fail(500, { source, error: 'idk' });
			}
		}
	}
};
