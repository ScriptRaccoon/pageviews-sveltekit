<script lang="ts">
	const SLUGS = ['banana', 'almond', 'strawberry', 'avocado', 'wheet', 'cabbage']
</script>

<header>
	<h1>Blog</h1>
</header>

<ol>
	{#each SLUGS as slug}
		<li>
			<a href="/blog/{slug}">{slug}</a>
		</li>
	{/each}
</ol>

<style>
	ol {
		padding-left: 2rem;
	}

	li {
		font-size: 1.25rem;
		margin-block: 0.5rem;
	}
</style>
