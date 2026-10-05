import { applyLayout } from "./utils/domMutations";
import { getPreviousElementsPosition, measureGaps } from "./utils/elementsCalculations";
import { getMeasuredLayout } from "./utils/getMeasuredLayout";

/**
 * Framework-agnostic masonry controller. Measures the items, computes the layout,
 * applies it to the DOM and re-runs it whenever the container or any item changes size.
 *
 * @param {HTMLElement} container
 * @param {import("./utils/types").MasonryOptions} [options]
 * @returns {import("./utils/types").MasonryController}
 */
export const createMasonry = (
  container,
  { getItems = () => Array.from(container.children), onLayout } = {},
) => {
  const update = () => {
    const items = getPreviousElementsPosition(getItems());
    if (items.length === 0) return;

    const layout = getMeasuredLayout(items, measureGaps(container));

    applyLayout(container, items, layout);
    onLayout?.(layout);
  };

  update();

  const resizeObserver = new ResizeObserver(update);

  resizeObserver.observe(container);
  getItems().forEach((element) => element && resizeObserver.observe(element));

  return { update, destroy: () => resizeObserver.disconnect() };
};
