<script lang="ts">
	import { page } from '$app/state'
	import { track_view } from '$lib/client/track'
	import Nav from '$lib/components/Nav.svelte'
	import './app.css'

	let { data, children } = $props()

	$effect(() => {
		track_view(page.url.pathname, data.tracked_paths)
	})
</script>

<svelte:head>
	<title>Page Visits with SvelteKit</title>
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
