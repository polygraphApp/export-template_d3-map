<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	// import { scaleThreshold } from 'd3-scale';

	// import MapSvg from '../layercake-components/Map.svg.svelte';
	// import MapCanvas from '../layercake-components/Map.canvas.svelte';

	/** @typedef {Object} Props
	 * @property {import('geojson').FeatureCollection} geojson
	 * @property {import('$lib/types.js').MapStyleConfig} style
	 * @property {any[][]} bounds
	 */

	/** @type {Props} */
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
			<!-- <MapSvg type={style.type} {projection} {paint} /> -->
		</Svg>
	{:else if style.renderer === 'canvas'}
		<!-- <Canvas>
			<MapCanvas type={style.type} {projection} {paint} />
		</Canvas> -->
	{/if}
</LayerCake>
