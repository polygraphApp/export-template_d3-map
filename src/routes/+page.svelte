<script>
	import MapSimple from '$lib/map-types/MapSimple.svelte';
	import MapChoropleth from '$lib/map-types/MapChoropleth.svelte';
	import MapDynamicPointChoropleth from '$lib/map-types/MapDynamicPointChoropleth.svelte';
	import MapDynamicPointSimple from '$lib/map-types/MapDynamicPointSimple.svelte';

	import loadLayers from '$lib/modules/loadLayers.js';
	import { isChoropleth, isDynamicPoint } from '$lib/modules/typeguards.js';

	/** @typedef {import('topojson-specification').Topology} */
	import usStates from './_data/topojson/us-states.json';
	/** @typedef {import('topojson-specification').Topology} */
	import lineSegments from './_data/topojson/line-segments.json';
	/** @typedef {import('topojson-specification').Topology} */
	import points from './_data/topojson/points.json';

	/** @typedef {import('topojson-specification').Topology} */
	import multiPolygons from './_data/topojson/multipolygons.json';
	/** @typedef {import('topojson-specification').Topology} */
	import multiPoints from './_data/topojson/multipoints.json';
	/** @typedef {import('topojson-specification').Topology} */
	import multilines from './_data/topojson/multilinestrings.json';

	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonSingleColor from './_data/style/polygon-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonChoropleth from './_data/style/polygon-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonCategorical from './_data/style/polygon-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import lineSingleColor from './_data/style/linesegments-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import lineChoropleth from './_data/style/linesegments-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import lineCategorical from './_data/style/linesegments-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import pointSingleColor from './_data/style/point-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import pointChoropleth from './_data/style/point-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import pointCategorical from './_data/style/point-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import dynamicPointSingleColor from './_data/style/dynamic-point-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import dynamicPointChoropleth from './_data/style/dynamic-point-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import dynamicPointCategorical from './_data/style/dynamic-point-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import multipolygonChoropleth from './_data/style/multipolygon-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import multipolygonCategorical from './_data/style/multipolygon-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import multipointChoropleth from './_data/style/multipoint-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import multipointCategorical from './_data/style/multipoint-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import dynamicMultipointSingleColor from './_data/style/dynamic-multipoint-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import dynamicMultipointChoropleth from './_data/style/dynamic-multipoint-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import dynamicMultipointCategorical from './_data/style/dynamic-multipoint-categorical.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import multilineChoropleth from './_data/style/multilinestrings-choropleth.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import multilineCategorical from './_data/style/multilinestrings-categorical.style.json';

	const allMapExamples = [
		// Polygons
		{ name: 'Single color polygon', layers: [{ topodata: usStates, style: polygonSingleColor }] },
		{ name: 'Choropleth polygon', layers: [{ topodata: usStates, style: polygonChoropleth }] },
		{ name: 'Categorical polygon', layers: [{ topodata: usStates, style: polygonCategorical }] },
		{
			name: 'Single color polygon (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth polygon (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonChoropleth, renderer: 'canvas' } }]
		},
		{
			name: 'Categorical polygon (Canvas)',
			layers: [{ topodata: usStates, style: { ...polygonCategorical, renderer: 'canvas' } }]
		},
		// Lines
		{ name: 'Single color line', layers: [{ topodata: lineSegments, style: lineSingleColor }] },
		{ name: 'Choropleth line', layers: [{ topodata: lineSegments, style: lineChoropleth }] },
		{ name: 'Categorical line', layers: [{ topodata: lineSegments, style: lineCategorical }] },

		{
			name: 'Single color line (Canvas)',
			layers: [{ topodata: lineSegments, style: { ...lineSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth line (Canvas)',
			layers: [{ topodata: lineSegments, style: { ...lineChoropleth, renderer: 'canvas' } }]
		},
		{
			name: 'Categorical line (Canvas)',
			layers: [{ topodata: lineSegments, style: { ...lineCategorical, renderer: 'canvas' } }]
		},
		// Points
		{ name: 'Single color point', layers: [{ topodata: points, style: pointSingleColor }] },
		{ name: 'Choropleth point', layers: [{ topodata: points, style: pointChoropleth }] },
		{ name: 'Categorical point', layers: [{ topodata: points, style: pointCategorical }] },
		{
			name: 'Single color point (Canvas)',
			layers: [{ topodata: points, style: { ...pointSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth point (Canvas)',
			layers: [{ topodata: points, style: { ...pointChoropleth, renderer: 'canvas' } }]
		},
		{
			name: 'Categorical point (Canvas)',
			layers: [{ topodata: points, style: { ...pointCategorical, renderer: 'canvas' } }]
		},
		// Dynamic points
		{
			name: 'Single color dynamic point',
			layers: [{ topodata: points, style: dynamicPointSingleColor }]
		},
		{
			name: 'Choropleth dynamic point',
			layers: [{ topodata: points, style: dynamicPointChoropleth }]
		},
		{
			name: 'Categorical dynamic point',
			layers: [{ topodata: points, style: dynamicPointCategorical }]
		},
		{
			name: 'Single color dynamic point (canvas)',
			layers: [{ topodata: points, style: { ...dynamicPointSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth dynamic point (canvas)',
			layers: [{ topodata: points, style: { ...dynamicPointChoropleth, renderer: 'canvas' } }]
		},
		{
			name: 'Categorical dynamic point (canvas)',
			layers: [{ topodata: points, style: { ...dynamicPointCategorical, renderer: 'canvas' } }]
		},

		// Multigeometry examples
		{
			name: 'Single color multipolygon',
			layers: [{ topodata: multiPolygons, style: polygonSingleColor }]
		},
		{
			name: 'Choropleth multipolygon',
			layers: [{ topodata: multiPolygons, style: multipolygonChoropleth }]
		},
		{
			name: 'Categorical multipolygon',
			layers: [{ topodata: multiPolygons, style: multipolygonCategorical }]
		},
		{
			name: 'Single color multipolygon (canvas)',
			layers: [{ topodata: multiPolygons, style: { ...polygonSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth multipolygon (canvas)',
			layers: [
				{ topodata: multiPolygons, style: { ...multipolygonChoropleth, renderer: 'canvas' } }
			]
		},
		{
			name: 'Categorical multipolygon (canvas)',
			layers: [
				{ topodata: multiPolygons, style: { ...multipolygonCategorical, renderer: 'canvas' } }
			]
		},

		// Multipoint
		{
			name: 'Single color multipoint',
			layers: [{ topodata: multiPoints, style: pointSingleColor }]
		},
		{
			name: 'Choropleth multipoint',
			layers: [{ topodata: multiPoints, style: multipointChoropleth }]
		},
		{
			name: 'Categorical multipoint',
			layers: [{ topodata: multiPoints, style: multipointCategorical }]
		},
		{
			name: 'Single color multipoint (canvas)',
			layers: [{ topodata: multiPoints, style: { ...pointSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth multipoint (canvas)',
			layers: [{ topodata: multiPoints, style: { ...multipointChoropleth, renderer: 'canvas' } }]
		},
		{
			name: 'Categorical multipoint (canvas)',
			layers: [{ topodata: multiPoints, style: { ...multipointCategorical, renderer: 'canvas' } }]
		},
		// Dynamic multipoint
		{
			name: 'Single color dynamic multipoint',
			layers: [{ topodata: multiPoints, style: dynamicMultipointSingleColor }]
		},
		{
			name: 'Choropleth dynamic multipoint',
			layers: [{ topodata: multiPoints, style: dynamicMultipointChoropleth }]
		},
		{
			name: 'Categorical dynamic multipoint',
			layers: [{ topodata: multiPoints, style: dynamicMultipointCategorical }]
		},

		// Multiline
		{
			name: 'Single color multiline',
			layers: [{ topodata: multilines, style: lineSingleColor }]
		},
		{
			name: 'Choropleth multiline',
			layers: [{ topodata: multilines, style: multilineChoropleth }]
		},
		{
			name: 'Categorical multiline',
			layers: [{ topodata: multilines, style: multilineCategorical }]
		},
		{
			name: 'Single color multiline (canvas)',
			layers: [{ topodata: multilines, style: { ...lineSingleColor, renderer: 'canvas' } }]
		},
		{
			name: 'Choropleth multiline (canvas)',
			layers: [{ topodata: multilines, style: { ...multilineChoropleth, renderer: 'canvas' } }]
		},
		{
			name: 'Categorical multiline (canvas)',
			layers: [{ topodata: multilines, style: { ...multilineCategorical, renderer: 'canvas' } }]
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
					{#if isDynamicPoint(style)}
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
		width: 32%;
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
