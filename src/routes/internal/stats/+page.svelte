<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'

	let { data } = $props()
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
</style>
