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
	 * data: import('svelte/store').Writable<import('geojson').FeatureCollection<import('geojson').Polygon|import('geojson').MultiPolygon>>
	 * width: import('svelte/store').Writable<number>
	 * height: import('svelte/store').Writable<number>
	 * config: import('svelte/store').Writable<{z?: () => number | string}>
	 * zGet: import('svelte/store').Writable<(feature: import('geojson').GeoJsonProperties) => number>
	 * custom: import('svelte/store').Writable<Record<string, any>>
	 * }} LayerCakeContext
	 */
	const { data, width, height, config, zGet, custom } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

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
	let geoPathFn = $derived(geoPath(projectionFn).context($ctx));

	onMount(() => {
		$effect(() => {
			if ($width && $height) {
				untrack(() => {
					scaleCanvas($ctx, $width, $height);
					$ctx.clearRect(0, 0, $width, $height);
					let stashedAlpha = $ctx.globalAlpha;
					$ctx.globalAlpha = fillOpacity;

					$data.features.forEach(feature => {
						$ctx.beginPath();
						geoPathFn(feature);
						$ctx.fillStyle = $config.z ? $zGet(feature.properties) : fill;
						$ctx.fillOpacity = fillOpacity;
						$ctx.fill();
						$ctx.strokeStyle = stroke;
						$ctx.lineWidth = strokeWidth;
						$ctx.stroke();
					});
					$ctx.globalAlpha = stashedAlpha;
				});
			}
		});
	});
</script>
