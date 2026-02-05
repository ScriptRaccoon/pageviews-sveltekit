<script lang="ts">
	let { data } = $props()
</script>

<header>
	<h1>Page Stats</h1>
</header>

{#each data.paths as { path, total, monthly } (path)}
	<h2>Path: {path}</h2>

	<p>Total visits: {total}</p>

	<p>Monthly visits:</p>

	{#each Object.entries(monthly) as [month, visits]}
		<div><strong>{month}:</strong> {visits}</div>
	{/each}
{/each}
