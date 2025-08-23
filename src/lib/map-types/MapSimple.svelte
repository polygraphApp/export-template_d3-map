<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';

	import MapPolygonSvg from '$lib/layercake-components/svg/MapPolygon.svg.svelte';
	import MapLineSvg from '$lib/layercake-components/svg/MapLine.svg.svelte';
	// import MapPointSvg from '$lib/layercake-components/MapPoint.svg.svelte';

	import MapPolygonCanvas from '$lib/layercake-components/canvas/MapPolygon.canvas.svelte';

	/** @type {{
		geojson: import('geojson').FeatureCollection,
		style: import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig,
		bounds: [[number, number], [number, number]]
	}} */
	let { geojson, style, bounds } = $props();

	/** @type {() => import('d3-geo').GeoProjection} */
	// @ts-ignore
	const projection = d3Geo[style.projection];

	/**
	 * Typeguard for SimplePolygonConfig
	 * @param {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
	 * @returns {style is import('$lib/types.js').SimplePolygonConfig}
	 */
	function isPolygonType(style) {
		return style.type === 'polygon';
	}

	/**
	 * Typeguard for SimpleLineConfig
	 * @param {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
	 * @returns {style is import('$lib/types.js').SimpleLineConfig}
	 */
	function isLineType(style) {
		return style.type === 'line';
	}

	/**
	 * Typeguard for SimplePointConfig
	 * @param {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
	 * @returns {style is import('$lib/types.js').SimplePointConfig}
	 */
	function isPointType(style) {
		return style.type === 'point';
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
				<MapPolygonSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if isLineType(style)}
				<MapLineSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if isPointType(style)}
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
			{:else if isLineType(style)}
				<!-- <MapLineCanvas {projection} /> -->
			{:else if isPointType(style)}
				<!-- <MapPointCanvas {projection} {paint} /> -->
			{/if}
		</Canvas>
	{/if}
</LayerCake>
