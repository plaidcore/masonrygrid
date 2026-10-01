/**
 * @typedef {"xs" | "sm" | "md" | "lg" | "xl" | "xxl"} Breakpoint
 */

/**
 * @typedef {number | "auto" | "fill"} ColSpanValue
 */

/**
 * @typedef {Partial<Record<Breakpoint, ColSpanValue>>} ResponsiveColSpan
 */

/**
 * Number of columns an item spans: a fixed value or one per breakpoint.
 * @typedef {ColSpanValue | ResponsiveColSpan} ColSpan
 */

export {};
