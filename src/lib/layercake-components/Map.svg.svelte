<!--
  @component
  Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { geoPath } from 'd3-geo';

	const { data, width, height, zGet, custom } = getContext('LayerCake');

	/**
	 * @type {{
	 *  type: 'polygon' | 'line' | 'point',
	 *  projection: () => import('d3-geo').GeoProjection,
	 *  paint: import('../types.js').SimplePolygon | import('../types.js').ChoroplethPolygon | import('../types.js').SimpleLine | import('../types.js').ChoroplethLine | import('../types.js').SimplePoint | import('../types.js').ChoroplethPoint | import('../types.js').SimpleDynamicPoint | import('../types.js').ChoroplethDynamicPoint,
	 *  fixedAspectRatio?: number
	 * }}
	 */
	let { type, projection, paint, fixedAspectRatio = undefined } = $props();

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
	let geoPathFn = $derived(geoPath(projectionFn));
</script>

<g class="map-group" role="tooltip">
	<!-- Polygons -->
	{#if type === 'polygon'}
		{#each $data.features as feature}
			<path
				class="feature-path"
				fill={fill || $zGet(feature.properties)}
				{stroke}
				stroke-width={strokeWidth}
				d={geoPathFn(feature)}
				role="tooltip"
				onmouseenter={() => console.log(feature.properties)}
			></path>
		{/each}
		<!-- Lines -->
	{:else if type === 'line'}
		{#each $data.features as feature}
			<path
				class="feature-path"
				fill="none"
				stroke={fill || $zGet(feature.properties)}
				stroke-width={strokeWidth}
				d={geoPathFn(feature)}
				role="tooltip"
			></path>
		{/each}
		<!-- Points -->
	{:else if type === 'point'}
		{#each $data.features as feature}
			<circle
				class="feature-path"
				fill={fill || $zGet(feature.properties)}
				{stroke}
				stroke-width={strokeWidth}
				cx={geoPathFn.centroid(feature)[0]}
				cy={geoPathFn.centroid(feature)[1]}
				r={radius}
				role="tooltip"
			></circle>
		{/each}
	{/if}
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
