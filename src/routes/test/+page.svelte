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
		<div class="item"><MapLoader layers={['linesegments-singlecolor']} /></div>
		<div class="item"><MapLoader layers={['linesegments-choropleth']} /></div>
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
		border-radius: 5px;
	}
	.item :global(.chart-container):before {
		content: attr(data-label);
		position: absolute;

		top: 0;
		left: 0;
		padding: 5px;
		color: #000;
		background-color: rgba(0, 0, 0, 0.25);
		border-bottom-right-radius: 5px;
	}
</style>
