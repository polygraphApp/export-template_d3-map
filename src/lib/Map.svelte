<script>
	import { LayerCake, Svg, Canvas } from 'layercake';
	import * as d3Geo from 'd3-geo';
	import { scaleThreshold } from 'd3-scale';

	import MapSvg from './layercake-components/Map.svg.svelte';
	import MapCanvas from './layercake-components/Map.canvas.svelte';

	/**
	 * @typedef {Object} StyleConfig
	 * @property {keyof typeof import('d3-geo')} projection - The D3 projection to use (e.g., 'geoMercator', 'geoAlbersUsa').
	 * @property {string} [fill] - For single-color maps, the fill color
	 * @property {string} [stroke] - The stroke color for the map features.
	 * @property {number} [strokeWidth] - The width of the stroke for the map features.
	 * @property {string} [key] - For choropleth maps, the field to color by
	 * @property {any[]} [domain] - The domain for the color scale.
	 * @property {any[]} [range] - The range for the color scale.
	 * @property {boolean} [canvas] - Whether to render the map on a canvas.
	 * @property {boolean} [svg] - Whether to render the map as SVG.
	 */

	/** @type {{
    geojson: import('geojson').FeatureCollection,
    style: StyleConfig,
		bounds: any[][]
  }} */
	let { geojson, style, bounds } = $props();

	const { fill, stroke, strokeWidth, domain, range } = style;

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
	z={style.key}
	zScale={domain && range ? scaleThreshold() : undefined}
	zDomain={domain}
	zRange={range}
	{flatData}
	custom={{ bounds }}
	debug
>
	{#if style.canvas}
		<Canvas>
			<MapCanvas {projection} {fill} {stroke} {strokeWidth} />
		</Canvas>
	{/if}

	{#if style.svg}
		<Svg>
			<MapSvg {projection} {fill} {stroke} {strokeWidth} />
		</Svg>
	{/if}
</LayerCake>
