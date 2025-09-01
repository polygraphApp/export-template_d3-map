<!--
  @component
  Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';

	/**
	 * @type {{
	 * data: import('svelte/store').Writable<import('geojson').FeatureCollection<import('geojson').Point|import('geojson').MultiPoint>>
	 * width: import('svelte/store').Writable<number>
	 * height: import('svelte/store').Writable<number>
	 * config: import('svelte/store').Writable<{z?: () => number}>
	 * zGet: import('svelte/store').Writable<(feature: import('geojson').GeoJsonProperties) => number>
	 * custom: import('svelte/store').Writable<Record<string, any>>
	 * }} LayerCakeContext
	 */
	const { data, width, height, zGet, custom, config } = getContext('LayerCake');

	/**
	 * @typedef {import('$lib/types.js').PointConfig} Props
	 */

	/** @type {Props} */
	let {
		projection,
		// @ts-ignore
		fill = '#000',
		stroke = '#fff',
		strokeWidth = 1,
		strokeOpacity = 1,
		radius = 5,
		fixedAspectRatio = undefined
	} = $props();

	/** @type {[number, number]} */
	let fitSizeRange = $derived(fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height]);

	let left = $derived($custom.bounds[0][0]);
	let bottom = $derived($custom.bounds[0][1]);
	let right = $derived($custom.bounds[1][0]);
	let top = $derived($custom.bounds[1][1]);

	/** @type {import('geojson').Geometry} */
	let boundsFeature = $derived({
		type: 'Polygon',
		coordinates: [
			[
				[left, bottom],
				[left, top],
				[right, top],
				[right, bottom],
				[left, bottom]
			]
		]
	});

	let projectionFn = $derived(projection().fitSize(fitSizeRange, boundsFeature));
</script>

{#snippet drawPoint(
	/** @type {import('geojson').Position} */ pointCoords,
	/** @type {import('geojson').Feature<import('geojson').Point|import('geojson').MultiPoint>} */ feature
)}
	{@const coords = projectionFn([pointCoords[0], pointCoords[1]])}
	{#if coords}
		<circle
			class="feature-path"
			fill={$config.z ? $zGet(feature.properties) : fill}
			{stroke}
			stroke-width={strokeWidth}
			stroke-opacity={strokeOpacity}
			cx={coords[0]}
			cy={coords[1]}
			r={radius}
			role="tooltip"
		></circle>
	{/if}
{/snippet}

<g class="map-group" role="tooltip">
	{#each $data.features as feature}
		{#if feature.geometry.type === 'Point'}
			{@render drawPoint(feature.geometry.coordinates, feature)}
		{:else if feature.geometry.type === 'MultiPoint'}
			{#each feature.geometry.coordinates as pointCoords}
				{@render drawPoint(pointCoords, feature)}
			{/each}
		{/if}
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
