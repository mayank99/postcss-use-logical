<script>
	import { enhance } from '$app/forms';
	import { slideIn, slideOut } from './transitions.js';

	/** @type {import('./$types').ActionData}*/
	export let form;

	/** @type {HTMLElement}*/
	let input;

	/** @type {HTMLElement}*/
	let output;

	$: {
		if (form?.error || !form?.output) {
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

{#if !form?.output}
	<form method="POST" use:enhance in:slideIn={{ reverse: true }} out:slideOut>
		<label for="source-input">Input (legacy CSS/SCSS code):</label>
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
		<figure>
			<figcaption><label for="postcss-output">Output:</label></figcaption>
			<textarea
				id="postcss-output"
				readonly
				value={form.output}
				bind:this={output}
			/>
		</figure>

		<a href="/">Start over</a>
	</section>
{/if}

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

		figure {
			display: contents;
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
	}
</style>
