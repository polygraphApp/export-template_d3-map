<!--
  @component
  Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { geoPath } from 'd3-geo';
	import { feature } from 'topojson-client';

	const { data, width, height, zGet, custom } = getContext('LayerCake');

	/** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Number|undefined} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here. */
	export let fixedAspectRatio = undefined;

	/** @type {String|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set. */
	export let fill = undefined;

	/** @type {String} [stroke='#333'] - The shape's stroke color. */
	export let stroke = '#333';

	/** @type {Number} [strokeWidth=0.5] - The shape's stroke width. */
	export let strokeWidth = 0.5;

	/** @type {Array<Object>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data.features` if left unset. */
	export let features = undefined;

	$: fitSizeRange = fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height];
	$: left = $custom.bounds[0][0];
	$: bottom = $custom.bounds[0][1];
	$: right = $custom.bounds[1][0];
	$: top = $custom.bounds[1][1];

	$: projectionFn = projection().fitSize(fitSizeRange, {
		type: 'Polygon',
		coordinates: [
			[
				[left, bottom],
				[right, bottom],
				[right, top],
				[left, top],
				[left, bottom]
			]
		]
	});

	$: geoPathFn = geoPath(projectionFn);
</script>

<g class="map-group" role="tooltip">
	{#each features || $data.features as feature}
		<!-- svelte-ignore a11y_mouse_events_have_key_events -->
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
