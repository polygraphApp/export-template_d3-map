<script>
	import MapSimple from '$lib/map-types/MapSimple.svelte';
	import MapChoropleth from '$lib/map-types/MapChoropleth.svelte';
	import MapDynamicPointChoropleth from '$lib/map-types/MapDynamicPointChoropleth.svelte';
	import MapDynamicPointSimple from '$lib/map-types/MapDynamicPointSimple.svelte';

	import { isChoropleth, isDynamicPoint } from '$lib/modules/typeguards.js';

	/**
	 * The map configuration
	 * @typedef {Object} Props
	 * @property {import('$lib/types.js').MapConfig} config - The map configuration
	 */

	/** @type {Props} */
	let { config } = $props();
</script>

{#each config.layers as { geojson, style }}
	{#if isDynamicPoint(style)}
		{#if isChoropleth(style)}
			<MapDynamicPointChoropleth bounds={config.bounds} {geojson} {style} />
		{:else}
			<MapDynamicPointSimple bounds={config.bounds} {geojson} {style} />
		{/if}
	{:else if isChoropleth(style)}
		<MapChoropleth bounds={config.bounds} {geojson} {style} />
	{:else}
		<MapSimple bounds={config.bounds} {geojson} {style} />
	{/if}
{/each}
