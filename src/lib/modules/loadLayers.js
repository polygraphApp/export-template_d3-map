import * as topojson from 'topojson-client';
import { geoBounds } from 'd3-geo';
import { rewindFeatureCollection } from '@placemarkio/geojson-rewind';
/**
 *
 * @param {{
 * 	layers: Array<{
 * 		topodata: import('topojson-specification').Topology,
 * 		style: import('../types.js').MapStyleConfig
 * 	}>,
 * 	name: string?
 * }} config
 * @returns {{name: string?, bounds: [[number, number], [number, number]], layers: Array<{ geojson: import('geojson').FeatureCollection, style: import('../types.js').MapStyleConfig }>}}
 * }}
 */
export default function loadLayers(config) {
	const mapLayers = config.layers.map(({ topodata, style }) => {
		const topoLayerName = Object.keys(topodata.objects)[0];
		const geojson = topojson.feature(topodata, topodata.objects[topoLayerName]);

		/**
		 * @type {{
		 * 	geojson: import('geojson').FeatureCollection,
		 * 	style: import('../types.js').MapStyleConfig
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
		name: config.name,
		bounds: fullBounds,
		layers: mapLayers
	};
}
