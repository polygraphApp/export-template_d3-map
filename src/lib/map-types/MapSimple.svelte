<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';

	import MapPolygonSvg from '$lib/layercake-components/svg/MapPolygon.svg.svelte';
	// import MapLineSvg from '$lib/layercake-components/MapLine.svg.svelte';
	// import MapPointSvg from '$lib/layercake-components/MapPoint.svg.svelte';

	import MapPolygonCanvas from '$lib/layercake-components/canvas/MapPolygon.canvas.svelte';

	/** @type {{
		geojson: import('geojson').FeatureCollection,
		style: import('../types.js').SimplePolygonConfig | import('../types.js').SimpleLineConfig | import('../types.js').SimplePointConfig,
		bounds: [[number, number], [number, number]]
	}} */
	let { geojson, style, bounds } = $props();

	/** @type {() => import('d3-geo').GeoProjection} */
	// @ts-ignore
	const projection = d3Geo[style.projection];

	/**
	 * Typeguard for SimplePolygonConfig
	 * @param {import('../types.js').SimplePolygonConfig | import('../types.js').SimpleLineConfig | import('../types.js').SimplePointConfig} style
	 * @returns {style is import('../types.js').SimplePolygonConfig}
	 */
	function isPolygonType(style) {
		return style.type === 'polygon';
	}
</script>

<LayerCake
	position="absolute"
	data={geojson}
	flatData={geojson.features
		.map(d => d.properties)
		.filter(d => d !== null && typeof d !== 'undefined')}
	custom={{ bounds }}
>
	{#if style.renderer === 'svg'}
		<Svg>
			{#if isPolygonType(style)}
				<MapPolygonSvg
					{projection}
					fill={style.paint.fill}
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
		<Canvas>
			{#if isPolygonType(style)}
				<MapPolygonCanvas
					{projection}
					fill={style.paint.fill}
					stroke={style.paint.stroke}
					strokeOpacity={style.paint.strokeOpacity}
					strokeWidth={style.paint.strokeWidth}
					fillOpacity={style.paint.fillOpacity}
				/>
			{/if}
		</Canvas>
	{/if}
</LayerCake>
