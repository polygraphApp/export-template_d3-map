<!--
  @component
  Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
	import { scaleCanvas } from 'layercake';

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
						const coordinates = projectionFn(feature.geometry.coordinates);
						if (coordinates === null) return;

						$ctx.arc(coordinates[0], coordinates[1], radius, 0, 2 * Math.PI, false);
						$ctx.fillStyle = $config.z ? $zGet(feature.properties) : fill;
						$ctx.fill();
						$ctx.lineWidth = strokeWidth;
						$ctx.strokeStyle = stroke;
						$ctx.stroke();
					});
					$ctx.globalAlpha = stashedAlpha;
				});
			}
		});
	});
</script>
