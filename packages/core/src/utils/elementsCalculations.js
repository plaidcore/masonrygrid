/** @param {string} value */
const toPx = (value) => parseFloat(value) || 0;

/**
 * Reads the measurements of every item from the DOM. Reads only, never writes.
 * `naturalTop` is the position the item would have without the `top` applied by the masonry.
 *
 * @param {ArrayLike<HTMLElement | null>} elements
 * @returns {import("./types").MeasuredItem[]}
 */
export const getPreviousElementsPosition = (elements) => {
  const measured = [];

  Array.prototype.forEach.call(elements, (element, index) => {
    if (!element) return;

    const { left, width } = element.getBoundingClientRect();
    const { marginTop, marginBottom } = getComputedStyle(element);
    const appliedShift = toPx(element.style.top);

    measured.push({
      index,
      element,
      left,
      right: left + width,
      clientHeight: element.clientHeight,
      naturalTop: element.offsetTop - appliedShift,
      marginTop: toPx(marginTop),
      marginBottom: toPx(marginBottom),
    });
  });

  return measured;
};

/** @param {HTMLElement} container */
export const measureGaps = (container) => {
  const { rowGap, columnGap } = getComputedStyle(container);

  return { rowGap: toPx(rowGap), columnGap: toPx(columnGap) };
};
