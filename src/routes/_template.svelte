<script>
	import MapD3 from '$lib/MapD3.svelte';
	import loadConfig from '$lib/modules/loadConfig.js';

	/** imports **/

	const config = loadConfig(/** layers **/);
</script>

<MapD3 {config} />
