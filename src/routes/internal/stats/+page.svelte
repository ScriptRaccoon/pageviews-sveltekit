<script lang="ts">
	let { data } = $props()
</script>

<header>
	<h1>Page Stats</h1>
</header>

<main>
	<section>
		<h2>Total Visits</h2>

		{#each data.stats.visits_total as { path, total_visits }}
			<h3 class="path">{path}</h3>
			<div>{total_visits}</div>
		{/each}
	</section>

	<section>
		<h2>Monthly Visits</h2>

		{#each data.stats.visits_monthly as [path, monthly_visits]}
			<h3 class="path">{path}</h3>

			{#each monthly_visits as [month, visits]}
				<div>
					<strong>{month}</strong>: {visits}
				</div>
			{/each}
		{/each}
	</section>
</main>

<style>
	.path {
		color: yellow;
	}
</style>
