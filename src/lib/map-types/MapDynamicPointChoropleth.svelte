<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold, scaleOrdinal } from 'd3-scale';

	import MapPointSvg from '$lib/components/svg/MapPoint.svg.svelte';
	import MapPointCanvas from '$lib/components/canvas/MapPoint.canvas.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('geojson').FeatureCollection} geojson
	 * @property {import('$lib/types.js').ChoroplethDynamicPointConfig} style
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
	z={style.paint.fillKey}
	zScale={style.paint.type === 'continuous' ? scaleThreshold() : scaleOrdinal()}
	zDomain={style.paint.fillDomain}
	zRange={style.paint.fillRange}
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
