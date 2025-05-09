<script>
	import MapSimple from '$lib/map-types/MapSimple.svelte';
	import MapChoropleth from '$lib/map-types/MapChoropleth.svelte';
	import MapDynamicPointChoropleth from '$lib/map-types/MapDynamicPointChoropleth.svelte';
	import MapDynamicPointSimple from '$lib/map-types/MapDynamicPointSimple.svelte';

	import loadLayers from '$lib/modules/loadLayers.js';

	/** @typedef {import('topojson-specification').Topology} */
	import usStates from './_data/topojson/us-states.json';
	/** @typedef {import('$lib/types.js').StyleConfig} */
	import polygonSingleColor from './_data/style/polygon-singlecolor.style.json';

	const allMapExamples = [
		[{ topodata: usStates, style: polygonSingleColor }],
		[{ topodata: usStates, style: polygonSingleColor }],
		[{ topodata: usStates, style: polygonSingleColor }]
		// @ts-ignore
	].map(loadLayers);
</script>

<div class="wrapper">
	<h1>Gallery</h1>

	<div class="container">
		{#each allMapExamples as example}
			<div class="item">
				{#each example.layers as { geojson, style }}
					{#if style.type === 'point' && style.paint.radiusKey}
						{#if style.paint.fillKey}
							<MapDynamicPointChoropleth bounds={example.bounds} {geojson} {style} />
						{:else}
							<MapDynamicPointSimple bounds={example.bounds} {geojson} {style} />
						{/if}
					{:else if style.paint.fillKey}
						<MapChoropleth bounds={example.bounds} {geojson} {style} />
					{:else}
						<MapSimple bounds={example.bounds} {geojson} {style} />
					{/if}
				{/each}
			</div>
		{/each}
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
		position: relative;
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
