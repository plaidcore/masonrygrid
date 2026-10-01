// Types shared with the core, re-exported so users only ever import from `@masonrygrid/react`.

/** @typedef {import("@masonrygrid/core").Breakpoint} Breakpoint */
/** @typedef {import("@masonrygrid/core").ColSpanValue} ColSpanValue */
/** @typedef {import("@masonrygrid/core").ResponsiveColSpan} ResponsiveColSpan */
/** @typedef {import("@masonrygrid/core").ColSpan} ColSpan */
/** @typedef {import("@masonrygrid/core").CssLength} CssLength */
/** @typedef {import("@masonrygrid/core").AxisSpacing} AxisSpacing */
/** @typedef {import("@masonrygrid/core").Spacing} Spacing */

/**
 * @typedef {Object} MasonryGridOwnProps
 * @property {Spacing} [spacing] Space between items. Defaults to `1rem`.
 */

/**
 * @typedef {MasonryGridOwnProps &
 *   Omit<import("react").ComponentPropsWithoutRef<"div">, keyof MasonryGridOwnProps>
 * } MasonryGridProps
 */

/**
 * @typedef {Object} MasonryItemOwnProps
 * @property {ColSpan} [colSpan] Columns the item spans. Defaults to `"auto"`.
 */

/**
 * Props that `MasonryGrid` injects into every item. Don't pass them by hand.
 * @typedef {Object} MasonryItemInjectedProps
 * @property {number} [index]
 * @property {number} [topOffset]
 * @property {import("react").MutableRefObject<Array<HTMLElement | null>>} [items]
 */

/**
 * @typedef {MasonryItemOwnProps &
 *   Omit<import("react").ComponentPropsWithoutRef<"div">, keyof MasonryItemOwnProps>
 * } MasonryItemProps
 */

export {};
