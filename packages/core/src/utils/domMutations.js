/**
 * Turns a computed offset into the CSS `top` value that compensates it.
 * @param {number} offset
 */
export const toTop = (offset) => `${-offset}px`;

/**
 * Writes the layout straight to the DOM, not through React state: `getPreviousElementsPosition`
 * derives each item's natural position from its current `top`, so the DOM must
 * already be up to date for the next measurement, and state would lag a render behind.
 *
 * @param {HTMLElement} container
 * @param {import("./types").MeasuredItem[]} items
 * @param {import("./types").MasonryLayout} layout
 */
export const applyLayout = (container, items, { offsets, containerHeight }) => {
  items.forEach(({ element, index }) => {
    element.style.top = toTop(offsets[index]);
  });

  container.style.height = `${containerHeight}px`;
};
