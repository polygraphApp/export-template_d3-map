<script>
	import LayeredMap from '$lib/LayeredMap.svelte';
	import layers from './map-layers.js';
</script>

<LayeredMap {layers} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
