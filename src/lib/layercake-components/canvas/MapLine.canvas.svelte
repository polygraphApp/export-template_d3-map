<!--
  @component
  Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
	import { scaleCanvas } from 'layercake';
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
	const { data, width, height, config, zGet, custom } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

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
	let geoPathFn = $derived(geoPath(projectionFn).context($ctx));

	onMount(() => {
		$effect(() => {
			if ($width && $height) {
				untrack(() => {
					scaleCanvas($ctx, $width, $height);
					$ctx.clearRect(0, 0, $width, $height);
					let stashedAlpha = $ctx.globalAlpha;
					$ctx.globalAlpha = strokeOpacity;
					$data.features.forEach(feature => {
						$ctx.beginPath();
						// Set the context here since setting it in `$: geoPath` is a circular reference
						geoPathFn.context($ctx);
						geoPathFn(feature);

						$ctx.strokeStyle = $config.z ? $zGet(feature.properties) : stroke;

						$ctx.lineWidth = strokeWidth;
						$ctx.stroke();
					});
					$ctx.globalAlpha = stashedAlpha;
				});
			}
		});
	});
</script>
