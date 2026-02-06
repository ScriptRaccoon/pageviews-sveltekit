<script lang="ts">
	import { browser } from '$app/environment'
	import { NOTRACK_STORAGE_KEY } from '$lib/client/track'
	import BarChart from '$lib/components/BarChart.svelte'

	let { data } = $props()

	let device_is_tracked = $state(false)

	if (browser) {
		device_is_tracked = !window.localStorage.getItem(NOTRACK_STORAGE_KEY)
	}

	function track_device() {
		if (!browser) return
		device_is_tracked = true
		window.localStorage.removeItem(NOTRACK_STORAGE_KEY)
	}

	function untrack_devicee() {
		if (!browser) return
		device_is_tracked = false
		window.localStorage.setItem(NOTRACK_STORAGE_KEY, '1')
	}
</script>

<header>
	<h1>Page Stats</h1>
</header>

{#each data.paths as { path, total, monthly } (path)}
	<section>
		<h2 class="path">{path}</h2>

		<p class="total-para"><span class="total">{total}</span> total visits</p>

		<BarChart data={monthly} />
	</section>
{/each}

<div class="actions">
	{#if device_is_tracked}
		<button class="button" onclick={untrack_devicee}>Do not track this device</button>
	{:else}
		<button class="button" onclick={track_device}>Track this device</button>
	{/if}
</div>

<style>
	.path {
		color: var(--accent-color);
	}

	section {
		border-bottom: 1px solid #333;
		padding-block: 1rem;
	}

	.total {
		font-size: 1.5rem;
		color: var(--bar-color);
	}

	.total-para {
		margin-bottom: 2rem;
	}

	.actions {
		margin-top: 2rem;
	}
</style>
