<script>
	import MapD3 from '$lib/MapD3.svelte';

	import usStatesRaw from '../data/topojson/us-states.topo.json';
	import pointsRaw from '../data/topojson/points.topo.json';
	import pointSingleColorRaw from '../data/style/point-singlecolor.style.json';
	import polygonChoroplethRaw from '../data/style/polygon-choropleth.style.json';

	/** @type {import('topojson-specification').Topology} */
	const usStates = usStatesRaw;
	/** @type {import('topojson-specification').Topology} */
	const points = pointsRaw;
	/** @type {import('$lib/types.js').MapStyleConfig} */
	const pointSingleColor = pointSingleColorRaw;
	/** @type {import('$lib/types.js').MapStyleConfig} */
	const polygonChoropleth = polygonChoroplethRaw;

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
