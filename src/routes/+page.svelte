<script>
	import MapLoader from '$lib/MapLoader.svelte';
	import layers from './map-layers.js';
</script>

<MapLoader {layers} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
