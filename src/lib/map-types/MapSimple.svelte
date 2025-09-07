<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';

	import MapPolygonSvg from '$lib/components/svg/MapPolygon.svg.svelte';
	import MapLineSvg from '$lib/components/svg/MapLine.svg.svelte';
	import MapPointSvg from '$lib/components/svg/MapPoint.svg.svelte';

	import MapPolygonCanvas from '$lib/components/canvas/MapPolygon.canvas.svelte';
	import MapLineCanvas from '$lib/components/canvas/MapLine.canvas.svelte';
	import MapPointCanvas from '$lib/components/canvas/MapPoint.canvas.svelte';

	import { isPolygonType, isLineType, isPointType } from '$lib/modules/typeguards.js';

	/**
	 * @typedef {Object} Props
	 * @property {import('geojson').FeatureCollection} geojson
	 * @property {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
	 * @property {[[number, number], [number, number]]} bounds
	 */

	/** @type {Props} */
	let { geojson, style, bounds } = $props();

	/** @type {() => import('d3-geo').GeoProjection} */
	// @ts-ignore
	const projection = d3Geo[style.projection];
</script>

<LayerCake
	position="absolute"
	data={geojson}
	flatData={geojson.features
		.map(d => d.properties)
		.filter(d => d !== null && typeof d !== 'undefined')}
	custom={{ bounds }}
	pointerEvents={style.renderer !== 'canvas'}
	debug
>
	{#if style.renderer === 'svg'}
		<Svg>
			{#if isPolygonType(style)}
				<MapPolygonSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if isLineType(style)}
				<MapLineSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if isPointType(style)}
				<MapPointSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{/if}
		</Svg>
	{:else if style.renderer === 'canvas'}
		<Canvas>
			{#if isPolygonType(style)}
				<MapPolygonCanvas {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if isLineType(style)}
				<MapLineCanvas {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{:else if isPointType(style)}
				<MapPointCanvas {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
			{/if}
		</Canvas>
	{/if}
</LayerCake>
