<script>
	import './styles.css';
</script>

<header>
	<h1>postcss-use-logical</h1>

	<a href="https://www.github.com/mayank99/postcss-use-logical">
		<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
			/></svg
		> GitHub
	</a>

	<p>
		Automatically convert the physical CSS properties to their logical
		equivalents.
	</p>
</header>

<main>
	<h2>Demo</h2>
	<slot />
</main>

<style>
	@layer layouts {
		:global(html) {
			background-color: var(--bg);
			color: var(--fg);
			accent-color: var(--fg);
		}

		:global(body) {
			padding-inline: 1rem;
			padding-block: 2rem;
			max-inline-size: min(100vi, 65rem);
			margin-inline: auto;
			display: grid;
			grid-template-rows: auto 1fr;
			overflow: auto;
			min-block-size: 100dvb;
			gap: 1rem;
			font-size: 1.2rem;
		}

		main {
			padding-block-end: 2rem;
		}
	}

	h1 {
		font-style: italic;
		display: inline-block;
	}

	a {
		display: inline-flex;
		align-items: center;
		margin-inline-start: auto;
		gap: 4px;
	}

	header {
		display: grid;
		align-items: baseline;
		grid-template-columns: 1fr auto;
		gap: 8px;
	}

	p {
		grid-column: 1 / -1;
	}
</style>
