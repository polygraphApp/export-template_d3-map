<script>
	import MapLoader from '$lib/MapLoader.svelte';
</script>

<div class="wrapper">
	<h1>Test gallery</h1>

	<div class="container">
		<div class="item"><MapLoader layers={['polygon-singlecolor']} /></div>
		<div class="item"><MapLoader layers={['polygon-choropleth']} /></div>
		<div class="item"><MapLoader layers={['polygon-singlecolor-canvas']} /></div>
		<div class="item"><MapLoader layers={['polygon-choropleth-canvas']} /></div>

		<div class="item"><MapLoader layers={['linestring-singlecolor']} /></div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	.wrapper {
		margin: 0 auto;
		padding: 20px;
		position: relative;
	}
	.container {
		margin: 0 auto;
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
	}
	.item {
		width: 300px;
		height: 300px;
		border: 1px solid #ccc;
	}
</style>
