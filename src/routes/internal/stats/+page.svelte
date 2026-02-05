<script lang="ts">
	let { data } = $props()
</script>

<header>
	<h1>Page Stats</h1>
</header>

<pre>{JSON.stringify(data, null, 4)}</pre>
