# @masonrygrid/react

A responsive column masonry layout for React. Build flexible grids where items naturally fill the space around them, with responsive independent column control over how much space each item occupies.

## Install

```bash
npm install @masonrygrid/react
```

Requires React 18 or newer.

## Basic usage

**Live playground:** https://masonrygrid.vercel.app/

```jsx
import { MasonryGrid } from '@masonrygrid/react';

const heights = [227, 295, 352, 292, 180, 260];

const Demo = () => {
  return (
    <MasonryGrid spacing="1rem">
      {heights.map((height, index) => (
        <MasonryGrid.Item key={index} colSpan={{ lg: 4 }}>
          <div style={{ height, outline: "1px solid black" }} className="item"></div>
        </MasonryGrid.Item>
      ))}
    </MasonryGrid>
  );
};
```

`MasonryItem` is also available as a named export if you prefer it over `MasonryGrid.Item`.

## `MasonryGrid`

| Prop      | Type                                                                 | Default  | Description                                                                                                        |
| --------- | -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `spacing` | `number \| string \| { x?: number \| string; y?: number \| string }` | `"1rem"` | Space between items. Numbers are pixels, strings can be any CSS length. Use an object to set each axis separately. |

It also accepts every attribute of a `div` (`className`, `style`, `id`, `data-*`, `aria-*`, event handlers...).

## `MasonryGrid.Item`

| Prop      | Type                                              | Default  | Description                                                                                                                   |
| --------- | ------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `colSpan` | `number \| "auto" \| "fill" \| ResponsiveColSpan` | `"auto"` | Columns the item spans out of 12. `"auto"` sizes it to its content and `"fill"` makes it take the remaining space of the row. |

It also accepts every attribute of a `div`.

### Responsive `colSpan`

Pass an object to change the span per breakpoint. Each value applies from that screen width upwards (`min-width`):

| Key   | From   |
| ----- | ------ |
| `xs`  | 320px  |
| `sm`  | 576px  |
| `md`  | 768px  |
| `lg`  | 992px  |
| `xl`  | 1200px |
| `xxl` | 1400px |

```jsx
<MasonryGrid.Item colSpan={{ xs: 12, md: 6, xl: 3 }}>...</MasonryGrid.Item>
```

## Things to know

* **Items must be direct children** of `MasonryGrid`. Conditional rendering such as `{show && <MasonryGrid.Item />}` works; wrapping items in a fragment does not.
* **The layout is calculated in the browser.** Items are measured and placed after the first render, and recalculated whenever the grid or any item changes size (for example, when an image finishes loading). With server rendering, the grid takes its final layout after hydration.
* **Don't pass `index`, `topOffset` or `items` to `MasonryGrid.Item`.** They are injected by `MasonryGrid`.

## Styles

The styles are injected into the page when the package is loaded in the browser, so there is nothing to import.

If your app is server-rendered or has a strict Content Security Policy, import the stylesheet as well:

```js
import "@masonrygrid/react/style.css";
```

## TypeScript

Types are included. The props of both components extend the attributes of a `div`, and `ColSpan`, `ResponsiveColSpan` and `Spacing` are exported if you need them.

## License

MIT

```
```
