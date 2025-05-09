<script>
	import * as topojson from 'topojson-client';
	import { geoBounds } from 'd3-geo';
	import { rewindFeatureCollection } from '@placemarkio/geojson-rewind';

	/**
	 * @type {{
	 * layers: Array<{
	 * 	topodata: import('topojson-specification').Topology,
	 * 	style: import('./types.js').StyleConfig
	 * }>
	 * children: (bounds: [number, number, number, number], layers: Array<{ geojson: import('geojson').FeatureCollection, style: import('./types.js').StyleConfig }>) => any
	 * }}
	 */
	let { layers, children } = $props();

	const mapLayers = layers.map(({ topodata, style }) => {
		const topoLayerName = Object.keys(topodata.objects)[0];
		const geojson = topojson.feature(topodata, topodata.objects[topoLayerName]);

		/**
		 * @type {{
		 * 	geojson: import('geojson').FeatureCollection,
		 * 	style: import('./types.js').StyleConfig
		 * }}
		 */
		return {
			geojson: rewindFeatureCollection(geojson, 'd3'),
			style
		};
	});

	/**
	 * @type {import('geojson').FeatureCollection}
	 */
	const combinedGeoJSON = {
		type: 'FeatureCollection',
		features: mapLayers.flatMap(layer =>
			layer.geojson.type === 'FeatureCollection' ? layer.geojson.features : [layer.geojson]
		)
	};
	const fullBounds = geoBounds(combinedGeoJSON);
</script>

{@render children(fullBounds, mapLayers)}
