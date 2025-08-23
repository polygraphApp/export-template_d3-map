<script>
	import MapSimple from '$lib/map-types/MapSimple.svelte';
	import MapChoropleth from '$lib/map-types/MapChoropleth.svelte';
	import MapDynamicPointChoropleth from '$lib/map-types/MapDynamicPointChoropleth.svelte';
	import MapDynamicPointSimple from '$lib/map-types/MapDynamicPointSimple.svelte';

	import loadLayers from '$lib/modules/loadLayers.js';
	import { isChoropleth } from '$lib/modules/typeguards.js';

	/** @typedef {import('topojson-specification').Topology} */
	import usStates from './_data/topojson/us-states.json';
	/** @typedef {import('topojson-specification').Topology} */
	import lineSegments from './_data/topojson/line-segments.json';
	/** @typedef {import('topojson-specification').Topology} */
	import points from './_data/topojson/points.json';

	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonSingleColor from './_data/style/polygon-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonChoropleth from './_data/style/polygon-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import lineSingleColor from './_data/style/linesegments-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import lineChoropleth from './_data/style/linesegments-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import pointSingleColor from './_data/style/point-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import pointChoropleth from './_data/style/point-choropleth.style.json';

	const allMapExamples = [
		// Polygons
		{ name: 'Single color polygon', layers: [{ topodata: usStates, style: polygonSingleColor }] },
		{ name: 'Choropleth polygon', layers: [{ topodata: usStates, style: polygonChoropleth }] },
		{
			name: 'Single color polygon (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth polygon (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonChoropleth, renderer: 'canvas' } }]
		},
		// Lines
		{ name: 'Single color line', layers: [{ topodata: lineSegments, style: lineSingleColor }] },
		{ name: 'Choropleth line', layers: [{ topodata: lineSegments, style: lineChoropleth }] },

		{
			name: 'Single color line (Canvas)',
			layers: [{ topodata: lineSegments, style: { ...lineSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth line (Canvas)',
			layers: [{ topodata: lineSegments, style: { ...lineChoropleth, renderer: 'canvas' } }]
		},
		// Points
		{ name: 'Single color point', layers: [{ topodata: points, style: pointSingleColor }] },
		{ name: 'Choropleth point', layers: [{ topodata: points, style: pointChoropleth }] },
		{
			name: 'Single color point (Canvas)',
			layers: [{ topodata: points, style: { ...pointSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth point (Canvas)',
			layers: [{ topodata: points, style: { ...pointChoropleth, renderer: 'canvas' } }]
		}

		// @ts-ignore
	].map(loadLayers);

	console.log(allMapExamples);
</script>

<div class="wrapper">
	<h1>Gallery</h1>

	<div class="container">
		{#each allMapExamples as example}
			<div class="item" data-label={example.name}>
				{#each example.layers as { geojson, style }}
					{#if style.type === 'point' && style.paint && 'radiusKey' in style.paint}
						{#if isChoropleth(style)}
							<MapDynamicPointChoropleth bounds={example.bounds} {geojson} {style} />
						{:else}
							<MapDynamicPointSimple bounds={example.bounds} {geojson} {style} />
						{/if}
					{:else if isChoropleth(style)}
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
