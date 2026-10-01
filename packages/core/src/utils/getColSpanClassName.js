/** @param {import("./types").ResponsiveColSpan} colSpan */
const getResponsiveColClass = (colSpan) =>
  Object.entries(colSpan)
    .map(([breakpoint, value]) => `col-${breakpoint}-${value}`)
    .join(" ");

/**
 * Returns the CSS class(es) for a `colSpan`:
 * `3` → `col-3`, `{ xs: 12, md: 6 }` → `col-xs-12 col-md-6`.
 * @param {import("./types").ColSpan} colSpan
 */
export const getColSpanClassName = (colSpan) =>
  typeof colSpan === "object" && colSpan !== null
    ? getResponsiveColClass(colSpan)
    : `col-${colSpan}`;
