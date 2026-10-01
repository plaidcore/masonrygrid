/**
 * @typedef {Object} MeasuredItem
 * @property {number} index Position of the item among the container's items.
 * @property {HTMLElement} element
 * @property {number} left
 * @property {number} right
 * @property {number} clientHeight
 * @property {number} naturalTop
 * @property {number} marginTop
 * @property {number} marginBottom
 */

/**
 * @typedef {Object} MasonryLayout
 * @property {number[]} offsets Offset of each item, indexed by its position.
 * @property {number} containerHeight
 */

/**
 * @typedef {Object} MasonryOptions
 * @property {() => Array<HTMLElement | null>} [getItems] Items to lay out. Defaults to the container's children.
 * @property {(layout: MasonryLayout) => void} [onLayout] Called after every layout pass.
 */

/**
 * @typedef {Object} MasonryController
 * @property {() => void} update Recomputes the layout now.
 * @property {() => void} destroy Stops observing size changes.
 */

export {};
