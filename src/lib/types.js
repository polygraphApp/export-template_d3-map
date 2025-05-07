/**
 * @typedef {Object} StyleConfig
 * @property {'polygon'|'line'|'point'} type - The type of map feature to render.
 * @property {keyof typeof import('d3-geo')} projection - The D3 projection to use (e.g., 'geoMercator', 'geoAlbersUsa').
 * @property {'canvas'|'svg'} renderer - The renderer to use for the map.
 * @property {SimplePolygon|ChoroplethPolygon|SimpleLine|ChoroplethLine|SimplePoint|ChoropolethPoint|SimpleDynamicPoint|ChoroplethDynamicPoint} paint
 */

/**
 * @typedef {Object} SimplePolygon
 * @property {string} fill - For single-color maps, the fill color
 * @property {string} [stroke='#000'] - The stroke color for the map features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the map features.
 */

/**
 * @typedef {Object} ChoroplethPolygon
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {any[]} fillDomain - The domain for the color scale.
 * @property {any[]} fillRange - The range for the color scale.
 * @property {string} [stroke='#000'] - The stroke color for the map features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the map features.
 */

/**
 * @typedef {Object} SimpleLine
 * @property {string} [stroke='#000'] - The stroke color for the map features.
 * @property {number} [strokeWidth=2] - The width of the stroke for the map features.
 */

/**
 * @typedef {Object} ChoroplethLine
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {any[]} fillDomain - The domain for the color scale.
 * @property {any[]} fillRange - The range for the color scale.
 * @property {number} [strokeWidth=2] - The width of the stroke for the map features.
 */

/**
 * @typedef {Object} SimplePoint
 * @property {string} fill - The fill color for the point features.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {number} [radius=5] - The radius for circle features.
 */

/**
 * @typedef {Object} ChoroplethPoint
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {any[]} fillDomain - The domain for the color scale.
 * @property {any[]} fillRange - The range for the color scale.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {number} [radius=5] - The radius for circle features.
 */

/**
 * @typedef {Object} SimpleDynamicPoint - a point with dynamic radius
 * @property {string} fill - The fill color for the point features.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {string} radiusKey - The key to use for the radius of the point features.
 * @property {any[]} radiusDomain - The domain for the color scale.
 * @property {any[]} radiusRange - The range for the color scale.
 */
/**
 * @typedef {Object} ChoroplethDynamicPoint - a point with dynamic radius
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {any[]} fillDomain - The domain for the color scale.
 * @property {any[]} fillRange - The range for the color scale.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {number} radiusKey - The key to use for the radius of the point features.
 * @property {any[]} radiusDomain - The domain for the color scale.
 * @property {any[]} radiusRange - The range for the color scale.
 */

export {};
