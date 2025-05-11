<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold } from 'd3-scale';

	// import MapSvg from './layercake-components/Map.svg.svelte';
	// import MapCanvas from './layercake-components/Map.canvas.svelte';

	/** @type {{
    geojson: import('geojson').FeatureCollection,
    style: import('./types.js').StyleConfig,
		bounds: any[][]
  }} */
	let { geojson, style, bounds } = $props();

	let { paint } = $derived(style);

	const projection = d3Geo[style.projection];

	/**
	 * Create a flat array of objects that LayerCake can use to measure
	 * extents for the color scale
	 */
	const flatData = geojson.features
		.map(d => d.properties)
		.filter(properties => properties !== null);
</script>

<LayerCake
	position="absolute"
	data={geojson}
	z={paint.fillKey}
	zScale={paint.fillDomain && paint.fillRange ? scaleThreshold() : undefined}
	zDomain={paint.fillDomain}
	zRange={paint.fillRange}
	r={paint.radiusKey}
	rDomain={paint.radiusDomain}
	rRange={paint.radiusRange}
	{flatData}
	custom={{ bounds }}
	debug
>
	<!-- {#if style.renderer === 'svg'}
		<Svg>
			<MapSvg type={style.type} {projection} {paint} />
		</Svg>
	{:else if style.renderer === 'canvas'}
		<Canvas>
			<MapCanvas type={style.type} {projection} {paint} />
		</Canvas>
	{/if} -->
</LayerCake>
