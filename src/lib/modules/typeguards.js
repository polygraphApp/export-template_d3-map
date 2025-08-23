/**
 * Typeguard for SimplePolygonConfig
 * @param {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
 * @returns {style is import('$lib/types.js').SimplePolygonConfig}
 */
export function isPolygonType(style) {
	return style.type === 'polygon';
}

/**
 * Typeguard for SimpleLineConfig
 * @param {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
 * @returns {style is import('$lib/types.js').SimpleLineConfig}
 */
export function isLineType(style) {
	return style.type === 'line';
}

/**
 * Typeguard for SimplePointConfig
 * @param {import('$lib/types.js').SimplePolygonConfig | import('$lib/types.js').SimpleLineConfig | import('$lib/types.js').SimplePointConfig} style
 * @returns {style is import('$lib/types.js').SimplePointConfig}
 */
export function isPointType(style) {
	return style.type === 'point';
}

/**
 * Typeguard for testing Simple vs Choropleth style configs
 * @param {import('$lib/types.js').MapStyleConfig} style
 * @returns {style is import('$lib/types.js').ChoroplethPolygonConfig | import('$lib/types.js').ChoroplethLineConfig | import('$lib/types.js').ChoroplethPointConfig | import('$lib/types.js').ChoroplethDynamicPointConfig}
 */
export function isChoropleth(style) {
	return (
		style.paint &&
		'fillKey' in style.paint &&
		'fillDomain' in style.paint &&
		'fillRange' in style.paint
	);
}
