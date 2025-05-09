import * as topojson from 'topojson-client';
import { geoBounds } from 'd3-geo';
import { rewindFeatureCollection } from '@placemarkio/geojson-rewind';
/**
 *
 * @param {Array<{
 * 	topodata: import('topojson-specification').Topology,
 * 	style: import('../types.js').StyleConfig
 * }>} layers
 * @returns {{bounds: [[number, number], [number, number]], layers: Array<{ geojson: import('geojson').FeatureCollection, style: import('../types.js').StyleConfig }>}}
 * }}
 */
export default function loadLayers(layers) {
	const mapLayers = layers.map(({ topodata, style }) => {
		const topoLayerName = Object.keys(topodata.objects)[0];
		const geojson = topojson.feature(topodata, topodata.objects[topoLayerName]);

		/**
		 * @type {{
		 * 	geojson: import('geojson').FeatureCollection,
		 * 	style: import('../types.js').StyleConfig
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

	return {
		bounds: fullBounds,
		layers: mapLayers
	};
}
