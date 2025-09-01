<!--
  @component
  Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { geoPath } from 'd3-geo';

	/**
	 * @type {{
	 * data: import('svelte/store').Writable<import('geojson').FeatureCollection<import('geojson').LineString|import('geojson').MultiLineString>>
	 * width: import('svelte/store').Writable<number>
	 * height: import('svelte/store').Writable<number>
	 * config: import('svelte/store').Writable<{z?: () => number}>
	 * zGet: import('svelte/store').Writable<(feature: import('geojson').GeoJsonProperties) => number>
	 * custom: import('svelte/store').Writable<Record<string, any>>
	 * }} LayerCakeContext
	 */
	const { data, width, height, zGet, custom, config } = getContext('LayerCake');

	/**
	 * @typedef {import('$lib/types.js').LineConfig} Props
	 */

	/** @type {Props} */
	let {
		projection,
		// @ts-ignore
		stroke = '#fff',
		strokeWidth = 0.5,
		strokeOpacity = 1,
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
			fill="none"
			stroke={$config.z ? $zGet(feature.properties) : stroke}
			stroke-width={strokeWidth}
			stroke-opacity={strokeOpacity}
			d={geoPathFn(feature)}
			role="tooltip"
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
