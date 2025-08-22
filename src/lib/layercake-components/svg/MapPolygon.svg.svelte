<!--
  @component
  Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { geoPath } from 'd3-geo';

	const { data, width, height, zGet, custom, config } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {() => import('d3-geo').GeoProjection} projection - A function that returns a D3 GeoProjection.
	 * @property {string} [fill='#fff'] - The fill color of the shape.
	 * @property {string} [stroke='#000'] - The stroke color of the shape.
	 * @property {number} [strokeWidth=0.5] - The width of the stroke.
	 * @property {number} [strokeOpacity=1] - The stroke opacity of the shape.
	 * @property {number} [fillOpacity=1] - The fill opacity of the shape.
	 * @property {number} [fixedAspectRatio=undefined] - A fixed aspect ratio for the shape.
	 */
	/** @type {Props} */
	let {
		projection,
		fill = '#fff',
		stroke = '#000',
		strokeWidth = 0.5,
		fillOpacity = 1,
		fixedAspectRatio = undefined
	} = $props();

	/** @type {[number, number]} */
	let fitSizeRange = $derived(fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height]);

	/** @type {import('geojson').Geometry} */
	let boundsFeature = $derived({
		type: 'Polygon',
		coordinates: [
			[
				[$custom.bounds[0][0], $custom.bounds[0][1]],
				[$custom.bounds[0][0], $custom.bounds[1][1]],
				[$custom.bounds[1][0], $custom.bounds[1][1]],
				[$custom.bounds[1][0], $custom.bounds[0][1]],
				[$custom.bounds[0][0], $custom.bounds[0][1]]
			]
		]
	});

	let projectionFn = $derived(projection().fitSize(fitSizeRange, boundsFeature));
	let geoPathFn = $derived(geoPath(projectionFn));
</script>

<g class="map-group" role="tooltip">
	{#each $data.features as feature}
		<path
			class="feature-path"
			fill={$config.z ? $zGet(feature.properties) : fill}
			fill-opacity={fillOpacity}
			{stroke}
			stroke-width={strokeWidth}
			d={geoPathFn(feature)}
			role="tooltip"
			onmouseenter={() => console.log(feature.properties)}
		></path>
	{/each}
</g>

<style>
	/* .feature-path {
    stroke: #333;
    stroke-width: 0.5px;
  } */
	.feature-path:hover {
		stroke: #000;
		stroke-width: 2px;
	}
	/**
   * Disable the outline on feature click.
   * Depending on map funtionality and accessiblity issues,
   * you may not want this rule. Read more:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
   * https://github.com/mhkeller/layercake/issues/63
   */
	.feature-path:focus {
		outline: none;
	}
</style>
