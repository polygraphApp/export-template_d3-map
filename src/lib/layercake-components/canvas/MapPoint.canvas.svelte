<!--
  @component
  Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
	import { scaleCanvas } from 'layercake';

	/**
	 * @type {{
	 * data: import('svelte/store').Writable<import('geojson').FeatureCollection<import('geojson').Point|import('geojson').MultiPoint>>
	 * width: import('svelte/store').Writable<number>
	 * height: import('svelte/store').Writable<number>
	 * config: import('svelte/store').Writable<{z?: () => number | string, r?: () => number | string}>
	 * zGet: import('svelte/store').Writable<(feature: import('geojson').GeoJsonProperties) => number>
	 * custom: import('svelte/store').Writable<Record<string, any>>
	 * }} LayerCakeContext
	 */
	const { data, width, height, config, zGet, custom } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {import('$lib/types.js').PointConfig} Props
	 */

	/** @type {Props} */
	let {
		projection,
		// @ts-ignore
		fill = '#000',
		stroke = '#fff',
		strokeWidth = 0.5,
		fillOpacity = 1,
		radius = 5,
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

	/**
	 * Helper function to draw a single point
	 * @param {import('geojson').Position} pointCoords - The coordinates of the point
	 * @param {import('geojson').Feature} feature - The feature for styling
	 */
	function drawPoint(pointCoords, feature) {
		$ctx.beginPath();
		const coordinates = projectionFn([pointCoords[0], pointCoords[1]]);
		if (coordinates === null) return;

		$ctx.arc(coordinates[0], coordinates[1], radius, 0, 2 * Math.PI, false);
		$ctx.fillStyle = $config.z ? $zGet(feature.properties) : fill;
		$ctx.fill();
		$ctx.lineWidth = strokeWidth;
		$ctx.strokeStyle = stroke;
		$ctx.stroke();
	}

	onMount(() => {
		$effect(() => {
			if ($width && $height) {
				untrack(() => {
					scaleCanvas($ctx, $width, $height);
					$ctx.clearRect(0, 0, $width, $height);
					let stashedAlpha = $ctx.globalAlpha;
					$ctx.globalAlpha = fillOpacity;

					$data.features.forEach(feature => {
						const geometry = feature.geometry;

						if (geometry.type === 'Point') {
							drawPoint(geometry.coordinates, feature);
						} else if (geometry.type === 'MultiPoint') {
							geometry.coordinates.forEach(pointCoords => {
								drawPoint(pointCoords, feature);
							});
						}
					});
					$ctx.globalAlpha = stashedAlpha;
				});
			}
		});
	});
</script>
