<script>
	import * as topojson from 'topojson-client';
	import { geoBounds } from 'd3-geo';

	import Map from '$lib/Map.svelte';

	import loadFiles from '$lib/modules/loadFiles.js';

	let { layers } = $props();

	async function loadData() {
		const paths = {
			topo: layers.map((/** @type {string} layer */ layer) => `/topojson/${layer}.topojson`),
			style: layers.map((/** @type {string} layer */ layer) => `/style/${layer}.style.json`)
		};

		// Load all data in parallel
		const [topodatas, styledatas] = await Promise.all([
			loadFiles(paths.topo),
			loadFiles(paths.style)
		]);

		/**
		 * Convert topojson to geojson and combine with style data
		 */
		const mapLayers = topodatas.map((topodata, i) => {
			const topoLayerName = Object.keys(topodata.objects)[0];
			return {
				geojson: topojson.feature(topodata, topodata.objects[topoLayerName]),
				style: styledatas[i]
			};
		});

		const combinedGeoJSON = {
			type: 'FeatureCollection',
			features: mapLayers.flatMap(layer =>
				layer.geojson.type === 'FeatureCollection' ? layer.geojson.features : [layer.geojson]
			)
		};

		// Calculate bounds once on the combined data
		const fullBounds = geoBounds(combinedGeoJSON);

		return {
			layers: mapLayers,
			bounds: fullBounds
		};
	}
</script>

{#await loadData()}
	<p>Loading...</p>
{:then result}
	{#each result.layers as { geojson, style }}
		<Map {geojson} {style} bounds={result.bounds} />
	{/each}
{:catch error}
	<p>Error loading data: {error.message}</p>
{/await}
