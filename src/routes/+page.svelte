<script>
	import MapD3 from '$lib/MapD3.svelte';

	/** @typedef {import('topojson-specification').Topology} */
	import usStates from '../data/topojson/us-states.json';
	/** @typedef {import('topojson-specification').Topology} */
	import points from '../data/topojson/points.json';

	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import pointSingleColor from '../data/style/point-singlecolor.style.json';
	/** @typedef {import('$lib/types.js').MapStyleConfig} */
	import polygonChoropleth from '../data/style/polygon-choropleth.style.json';

	import loadConfig from '$lib/modules/loadConfig.js';

	const config = loadConfig({
		name: 'Multilayer',
		layers: [
			{ topodata: usStates, style: polygonChoropleth },
			{ topodata: points, style: { ...pointSingleColor, renderer: 'canvas' } }
		]
	});
</script>

<MapD3 {config} />
