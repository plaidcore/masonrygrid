# @masonrygrid/core

The framework-agnostic masonry engine behind the `@masonrygrid` packages. It measures the items, works out where each one should rest, and applies the result to the DOM.

**You probably want [`@masonrygrid/react`](https://www.npmjs.com/package/@masonrygrid/react).** It depends on this package, so installing it brings the core along automatically.

> This package is considered internal while the project is in `0.x`: its API may change between minor versions.

## What it exports

| Export | Description |
| --- | --- |
| `createMasonry(container, options?)` | Lays out the children of `container`, re-runs when the container or any item changes size, and returns `{ update, destroy }`. |
| `getSpacingStyle(spacing)` | Turns a spacing value into the `--spacing-x` and `--spacing-y` CSS variables. |
| `getColSpanClassName(colSpan)` | Turns a `colSpan` value into its CSS class names. |
| `toTop(offset)` | Converts a computed offset into the CSS `top` value that compensates it. |
| `DEFAULT_SPACING` | The default spacing, `1rem` on both axes. |

### `createMasonry` options

| Option | Description |
| --- | --- |
| `getItems` | Returns the elements to lay out. Defaults to the container's children. |
| `onLayout` | Called after every layout pass with `{ offsets, containerHeight }`. |

## License

MIT
