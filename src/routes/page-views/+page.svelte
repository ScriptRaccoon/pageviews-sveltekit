<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'
	import DataTable from '$lib/components/DataTable.svelte'
	import TrackToggle from '$lib/components/TrackToggle.svelte'
	import { Eye } from 'lucide-svelte'

	let { data } = $props()
</script>

<header>
	<h1>Page Views</h1>
</header>

{#each data.paths as { path, total, monthly_views } (path)}
	<section>
		<h2 class="path">{path}</h2>

		<div aria-label="{total} views in total" class="total">
			<Eye />
			{total}
		</div>

		<BarChart data_points={monthly_views} />

		<details>
			<summary>Show details</summary>
			<DataTable data_points={monthly_views} labels={['Month', 'Views']} />
		</details>
	</section>
{/each}

<div class="actions">
	<TrackToggle />
</div>

<style>
	section {
		border-bottom: 1px solid #333;
		padding-block: 1rem;
	}

	.path {
		color: var(--accent-color);
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	.total {
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	details {
		margin-top: 1rem;
	}

	summary {
		width: fit-content;
		color: var(--secondary-font-color);
	}

	.actions {
		margin-top: 2rem;
	}
</style>
