<script>
	import MapSimple from '$lib/map-types/MapSimple.svelte';
	import MapChoropleth from '$lib/map-types/MapChoropleth.svelte';
	import MapDynamicPointChoropleth from '$lib/map-types/MapDynamicPointChoropleth.svelte';
	import MapDynamicPointSimple from '$lib/map-types/MapDynamicPointSimple.svelte';

	import loadLayers from '$lib/modules/loadLayers.js';

	/** @typedef {import('topojson-specification').Topology} */
	import usStates from './_data/topojson/us-states.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonSingleColor from './_data/style/polygon-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonChoropleth from './_data/style/polygon-choropleth.style.json';

	const allMapExamples = [
		{ name: 'Single Color', layers: [{ topodata: usStates, style: polygonSingleColor }] },
		{ name: 'Choropleth', layers: [{ topodata: usStates, style: polygonChoropleth }] },
		{
			name: 'Single Color (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonChoropleth, renderer: 'canvas' } }]
		}

		// @ts-ignore
	].map(loadLayers);
</script>

<div class="wrapper">
	<h1>Gallery</h1>

	<div class="container">
		{#each allMapExamples as example}
			<div class="item" data-label={example.name}>
				{#each example.layers as { geojson, style }}
					{#if style.type === 'point' && 'radiusKey' in style.paint}
						{#if 'fillKey' in style.paint}
							<MapDynamicPointChoropleth bounds={example.bounds} {geojson} {style} />
						{:else}
							<MapDynamicPointSimple bounds={example.bounds} {geojson} {style} />
						{/if}
					{:else if 'fillKey' in style.paint}
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
		width: 23%;
		height: 300px;
		border: 1px solid #ccc;
		border-radius: 5px;
		position: relative;
	}
	.item:before {
		content: attr(data-label);
		position: absolute;

		top: 0;
		left: 0;
		padding: 5px;
		border-bottom: 1px solid #ccc;
		border-right: 1px solid #ccc;
		color: #666;

		border-bottom-right-radius: 5px;
	}
</style>
