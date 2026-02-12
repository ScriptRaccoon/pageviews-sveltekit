<script lang="ts">
	type Props = {
		data_points: [string, number][]
	}

	let { data_points }: Props = $props()

	let max_value = $derived(Math.max(...data_points.map((x) => x[1])))
</script>

<div class="chart">
	{#each data_points as [label, value]}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="bar" style:--value={value} style:--max-value={max_value} tabindex="0">
			<span class="value">{value}</span>
			<span class="label">{label}</span>
		</div>
	{/each}
</div>

<style>
	.chart {
		display: flex;
		gap: 3px;
		align-items: end;
		height: 5rem;
	}

	.bar {
		width: 1rem;
		height: calc(100% * var(--value) / var(--max-value));
		background-color: var(--bar-color);
		position: relative;
		font-family: monospace;
		font-size: 0.875rem;
		text-wrap: nowrap;
	}

	.value {
		position: absolute;
		bottom: 100%;
		opacity: 0;
	}

	.label {
		position: absolute;
		top: 100%;
		opacity: 0;
	}

	.bar:hover,
	.bar:focus-visible {
		outline: none;
		background-color: var(--accent-color);

		.label,
		.value {
			opacity: 1;
		}
	}
</style>
