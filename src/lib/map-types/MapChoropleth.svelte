<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold } from 'd3-scale';

	import MapPolygonSvg from '$lib/layercake-components/svg/MapPolygon.svg.svelte';
	// import MapLineSvg from '$lib/layercake-components/MapLine.svg.svelte';
	// import MapPointSvg from '$lib/layercake-components/MapPoint.svg.svelte';

	/** @type {{
    geojson: import('geojson').FeatureCollection,
    style: import('../types.js').StyleConfig,
		bounds: [[number, number], [number, number]]
  }} */
	let { geojson, style, bounds } = $props();

	/** @type {() => import('d3-geo').GeoProjection} */
	// @ts-ignore
	let projection = $derived(d3Geo[style.projection]);
</script>

<LayerCake
	position="absolute"
	data={geojson}
	z={style.paint.fillKey}
	zScale={scaleThreshold()}
	zDomain={style.paint.fillDomain}
	zRange={style.paint.fillRange}
	flatData={geojson.features.filter(d => d.properties !== null).map(d => d.properties)}
	custom={{ bounds }}
	debug
>
	{#if style.renderer === 'svg'}
		<Svg>
			{#if style.type === 'polygon'}
				<MapPolygonSvg
					{projection}
					stroke={style.paint.stroke}
					strokeOpacity={style.paint.strokeOpacity}
					strokeWidth={style.paint.strokeWidth}
					fillOpacity={style.paint.fillOpacity}
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
