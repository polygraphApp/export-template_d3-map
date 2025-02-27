<script>
	import { LayerCake, Svg, Canvas, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold } from 'd3-scale';

	import MapSvg from '$lib/Map.svg.svelte';
	import MapCanvas from '$lib/Map.canvas.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import topodata from './_data/data.topojson.json';
	import style from './_data/data.style.json';

	const { projection: prj, domain, range, key, canvas, svg } = style;

	const topojsonLayerName = Object.keys(topodata.objects)[0];

	const geojson = feature(topodata, topodata.objects[topojsonLayerName]);
	const projection = d3Geo[prj];

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map(d => d.properties);
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		z={key}
		zScale={scaleThreshold()}
		zDomain={domain}
		zRange={range}
		{flatData}
	>
		{#if canvas}
			<Canvas>
				<MapCanvas {projection} />
			</Canvas>
		{/if}

		{#if svg}
			<Svg>
				<MapSvg {projection} />
			</Svg>
		{/if}
	</LayerCake>
</div>

<style>
	/*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>
