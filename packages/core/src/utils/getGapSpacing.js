import { DEFAULT_SPACING } from "../constants";

/** @param {number | string} value */
const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : value;

/**
 * Turns the `spacing` prop into the `--spacing-x` and `--spacing-y` CSS variables.
 * @param {import("./types").Spacing} spacing
 */
export const getSpacingStyle = (spacing) => {
  const isAxisObject = typeof spacing === "object" && spacing !== null;

  const { x = DEFAULT_SPACING.x, y = DEFAULT_SPACING.y } = isAxisObject
    ? spacing
    : { x: spacing, y: spacing };

  return {
    "--spacing-x": toCssLength(x ?? DEFAULT_SPACING.x),
    "--spacing-y": toCssLength(y ?? DEFAULT_SPACING.y),
  };
};
