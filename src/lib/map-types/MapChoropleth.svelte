<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold } from 'd3-scale';

	import MapPolygonSvg from '$lib/layercake-components/svg/MapPolygon.svg.svelte';
	import MapLineSvg from '$lib/layercake-components/svg/MapLine.svg.svelte';
	// import MapPointSvg from '$lib/layercake-components/svg/MapPoint.svg.svelte';

	import MapPolygonCanvas from '$lib/layercake-components/canvas/MapPolygon.canvas.svelte';

	/** @typedef {Object} Props
	 * @property {import('geojson').FeatureCollection} geojson
	 * @property {import('$lib/types.js').ChoroplethPolygonConfig | import('$lib/types.js').ChoroplethLineConfig | import('$lib/types.js').ChoroplethPointConfig} style
	 * @property {[[number, number], [number, number]]} bounds
	 */

	/** @type {Props} */
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
	flatData={geojson.features.map(d => d.properties).filter(d => d !== null && d !== undefined)}
	custom={{ bounds }}
>
	{#if style.renderer === 'svg'}
		<Svg>
			{#if style.type === 'polygon'}
				<MapPolygonSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if style.type === 'line'}
				<MapLineSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if style.type === 'point'}
				<!-- <MapPointSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} /> -->
			{/if}
		</Svg>
	{:else if style.renderer === 'canvas'}
		<Canvas>
			<MapPolygonCanvas {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
		</Canvas>
	{/if}
</LayerCake>
