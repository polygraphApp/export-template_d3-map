<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold } from 'd3-scale';

	import MapSvg from './layercake-components/Map.svg.svelte';
	import MapCanvas from './layercake-components/Map.canvas.svelte';

	let { geojson, style, bounds } = $props();

	const { projection: prj, fill, outline, domain, range, key, canvas, svg } = style;

	const projection = d3Geo[prj];

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map(d => d.properties);
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		z={key}
		zScale={domain && range ? scaleThreshold() : undefined}
		zDomain={domain}
		zRange={range}
		{flatData}
		custom={{ bounds }}
		debug
	>
		{#if canvas}
			<Canvas>
				<MapCanvas {projection} {fill} stroke={outline} />
			</Canvas>
		{/if}

		{#if svg}
			<Svg>
				<MapSvg {projection} {fill} stroke={outline} />
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
