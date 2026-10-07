# @masonrygrid/vue

A responsive column masonry layout for Vue. Build flexible grids where items naturally fill the space around them, with responsive independent column control over how much space each item occupies.

## Install

```bash
npm install @masonrygrid/vue
```

Requires Vue 3 or newer.

## Basic Usage

```vue
<script setup>

import { MasonryGrid, MasonryItem } from '@masonrygrid/vue';

const heights = [227, 295, 352, 292, 180, 260];

</script>

<template>

  <MasonryGrid spacing="1rem">

    <MasonryItem
      v-for="(height, index) in heights"
      :key="index"
      :col-span="{ lg: 4 }"
    >

      <div
        class="item"
        :style="{ height: height + 'px', outline: '1px solid black' }"
      ></div>

    </MasonryItem>

  </MasonryGrid>

</template>
```

`class`, `style`, `id`, `data-*`, `aria-*` and event listeners work on both components as on any other element.

## Demo

see: [live playground](https://masonrygrid.vercel.app/)

## `MasonryGrid`

| Prop      | Type                                                                 | Default  | Description                                                                                                        |
| --------- | -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `spacing` | `number \| string \| { x?: number \| string; y?: number \| string }` | `"1rem"` | Space between items. Numbers are pixels, strings can be any CSS length. Use an object to set each axis separately. |

## `MasonryItem`

| Prop      | Type                                              | Default  | Description                                                                                                                                                 |
| --------- | ------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colSpan` | `number \| "auto" \| "fill" \| ResponsiveColSpan` | `"auto"` | Columns the item spans out of 12. `"auto"` sizes it to its content and `"fill"` makes it take the remaining space of the row. In templates, use `col-span`. |

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

```vue
<MasonryItem :col-span="{ xs: 12, md: 6, xl: 3 }">...</MasonryItem>
```

## Things to know

* **Items must be direct children of the grid** in the rendered DOM. `v-for` and `v-if` around them are fine. If a wrapper component adds or removes items on its own, without `MasonryGrid` re-rendering, the grid doesn't notice them.
* **The grid manages `height` and each item's `top`.** Don't set those yourself.
* **The layout is calculated in the browser.** Items are measured and placed after they are mounted, and recalculated whenever the grid or any item changes size (for example, when an image finishes loading). With server rendering, the grid takes its final layout after hydration.

## Styles

The styles are injected into the page when the package is loaded in the browser, so there is nothing to import.

If your app is server-rendered (Nuxt, for example) or has a strict Content Security Policy, import the stylesheet as well:

```js
import "@masonrygrid/vue/style.css";
```

## TypeScript

Types are included. `ColSpan`, `ResponsiveColSpan` and `Spacing` are exported if you need them.

## License

MIT
