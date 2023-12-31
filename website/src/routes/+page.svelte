<script>
	import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';
	import { slideIn, slideOut } from './transitions.js';

	/** @type {import('./$types').ActionData}*/
	export let form;

	/** @type {HTMLElement}*/
	let input;

	/** @type {HTMLElement}*/
	let output;

	afterNavigate(({ type }) => {
		if (type !== 'enter') {
			input?.focus();
		}
	});

	$: {
		if (form?.error) {
			input?.focus();
		}
		if (form?.output) {
			output?.focus();
		}
	}
</script>

<svelte:head>
	<title>postcss-use-logical</title>
	<meta
		name="description"
		content="auto convert physical CSS properties to logical"
	/>
</svelte:head>

<div>
	{#if !form?.output}
		<form method="POST" use:enhance in:slideIn={{ reverse: true }} out:slideOut>
			<label for="source-input"
				>Input (CSS/SCSS code containing physical properties):</label
			>
			<textarea
				name="source"
				id="source-input"
				required
				value={`${form?.source ?? ''}`}
				aria-describedby={form?.error ? 'error' : null}
				bind:this={input}
			/>

			{#if form?.error}
				<p id="error">
					Unable to process input. {form.error}
				</p>
			{/if}

			<button>Convert</button>
		</form>
	{/if}

	{#if form?.output}
		<section in:slideIn out:slideOut={{ reverse: true }}>
			<label for="postcss-output">Output (containing logical properties):</label
			>
			<textarea
				id="postcss-output"
				readonly
				value={form.output}
				bind:this={output}
			/>

			<a href="/">Start over</a>
		</section>
	{/if}
</div>

<style>
	@layer reset {
		button,
		a {
			all: unset;
			font: inherit;
		}
	}

	@layer routes {
		form,
		section {
			display: flex;
			flex-direction: column;
			margin-inline: auto;
			gap: 16px;
			block-size: 100%;
			transition: transform;
		}

		textarea {
			flex: 1;
			font-family: ui-monospace, monospace;
			overflow: auto;
			white-space: pre;
			scroll-padding: 12px;
			background-color: var(--bg);
			border-color: white;
		}

		textarea,
		button,
		a {
			padding: 12px;
			border-radius: 8px;
		}

		textarea {
			font-size: 1rem;
			tab-size: 2;
		}

		:is(button, a) {
			cursor: pointer;
			place-self: start;
			display: inline-grid;
			padding-inline: 32px;
			border: 1px solid transparent;
			color: var(--bg);
			background-color: var(--fg);
			font-weight: 600;
			font-size: 1.5rem;
		}

		/* for animation */
		div {
			block-size: 100%;
			position: relative;
			overflow-x: clip;
			margin-inline: -6px;
			padding-inline: 6px;
		}
	}
</style>
