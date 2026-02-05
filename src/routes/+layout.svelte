<script lang="ts">
	import { page } from '$app/state'
	import Nav from '$lib/components/Nav.svelte'
	import './app.css'

	let { data, children } = $props()

	async function send_visit(path: string) {
		if (data.untracked_paths.some((p) => path.startsWith(p))) return

		try {
			await fetch('/api/visit', { method: 'POST', body: JSON.stringify({ path }) })
		} catch (err) {
			console.error(err)
		}
	}

	$effect(() => {
		send_visit(page.url.pathname)
	})
</script>

<svelte:head>
	<title>Page Stats Demo</title>
</svelte:head>

<Nav />

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		max-width: 34rem;
		margin-inline: auto;
		padding-inline: 1rem;
	}
</style>
