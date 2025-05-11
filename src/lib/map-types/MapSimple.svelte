<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';

	import MapPolygonSvg from '$lib/layercake-components/MapPolygon.svg.svelte';
	// import MapLineSvg from '$lib/layercake-components/MapLine.svg.svelte';
	// import MapPointSvg from '$lib/layercake-components/MapPoint.svg.svelte';

	/** @type {{
    geojson: import('geojson').FeatureCollection,
    style: import('../types.js').StyleConfig,
		bounds: [[number, number], [number, number]]
  }} */
	let { geojson, style, bounds } = $props();

	let { paint } = $derived(style);

	/** @type {() => import('d3-geo').GeoProjection} */
	// @ts-ignore
	const projection = d3Geo[style.projection];

	/**
	 * Create a flat array of objects that LayerCake can use to measure
	 * extents for the color scale
	 */
	const flatData = geojson.features
		.map(d => d.properties)
		.filter(properties => properties !== null);
</script>

<LayerCake position="absolute" data={geojson} {flatData} custom={{ bounds }} debug>
	{#if style.renderer === 'svg'}
		<Svg>
			{#if style.type === 'polygon'}
				<MapPolygonSvg
					{projection}
					fill={paint.fill}
					stroke={paint.stroke}
					strokeOpacity={paint.strokeOpacity}
					strokeWidth={paint.strokeWidth}
					fillOpacity={paint.fillOpacity}
				/>
			{:else if style.type === 'line'}
				<!-- <MapLineSvg {projection} /> -->
			{:else if style.type === 'point'}
				<!-- <MapPointSvg {projection} {paint} /> -->
			{/if}
		</Svg>
	{:else if style.renderer === 'canvas'}
		<!-- <Canvas>
			<MapCanvas type={style.type} {projection} {paint} />
		</Canvas> -->
	{/if}
</LayerCake>
