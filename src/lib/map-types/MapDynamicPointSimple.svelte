<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';

	import MapPointSvg from '$lib/layercake-components/svg/MapPoint.svg.svelte';
	import MapPointCanvas from '$lib/layercake-components/canvas/MapPoint.canvas.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('geojson').FeatureCollection} geojson
	 * @property {import('$lib/types.js').SimpleDynamicPointConfig} style
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
	r={style.paint.radiusKey}
	rDomain={style.paint.radiusDomain}
	rRange={style.paint.radiusRange}
	data={geojson}
	flatData={geojson.features.map(d => d.properties).filter(properties => properties !== null)}
	custom={{ bounds }}
	debug
>
	{#if style.renderer === 'svg'}
		<Svg>
			<MapPointSvg {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
		</Svg>
	{:else if style.renderer === 'canvas'}
		<Canvas>
			<MapPointCanvas {projection} fixedAspectRatio={style.fixedAspectRatio} {...style.paint} />
		</Canvas>
	{/if}
</LayerCake>
