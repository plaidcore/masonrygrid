# @masonrygrid/angular

A responsive column masonry layout for React. Build flexible grids where items naturally fill the space around them, with responsive independent column control over how much space each item occupies.

## Install

```bash
npm install @masonrygrid/angular
```

Requires Angular 20 or newer.

## Basic usage

Both components are standalone:

```ts
import { Component } from '@angular/core';
import { MasonryGrid, MasonryItem } from '@masonrygrid/angular';

const heights = [227, 295, 352, 292, 180, 260];

@Component({
  selector: 'demo',
  standalone: true,
  imports: [MasonryGrid, MasonryItem],
  template: `
    <masonry-grid [spacing]="{ x: 16, y: 16 }">
      @for (height of heights; track $index) {
        <masonry-item [colSpan]="{ lg: 4 }">
          <div
            class="item"
            style="outline: 1px solid black"
            [style.height.px]="height"
          ></div>
        </masonry-item>
      }
    </masonry-grid>
  ` ,
})
export class Demo {
  heights = heights;
}
```

Attributes such as `id`, `class` or `data-*` work on both elements as on any other element.

## `<masonry-grid>`

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `spacing` | `number \| string \| { x?: number \| string; y?: number \| string }` | `"1rem"` | Space between items. Numbers are pixels, strings can be any CSS length. Use an object to set each axis separately. |

## `<masonry-item>`

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `colSpan` | `number \| "auto" \| "fill" \| ResponsiveColSpan` | `"auto"` | Columns the item spans out of 12. `"auto"` sizes it to its content and `"fill"` makes it take the remaining space of the row. |

### Responsive `colSpan`

Pass an object to change the span per breakpoint. Each value applies from that screen width upwards (`min-width`):

| Key | From |
| --- | --- |
| `xs` | 320px |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1400px |


```html
<masonry-item [colSpan]="{ xs: 12, md: 6, xl: 3 }">...</masonry-item>
```

## Things to know

- **Items must be direct content of `<masonry-grid>`**, in the same template. `@for` and `@if` blocks around them are fine; wrapping them in your own component is not.
- **The layout is calculated in the browser.** Items are measured and placed after the first render, and recalculated whenever the grid or any item changes size (for example, when an image finishes loading). With server rendering, the grid takes its final layout after hydration.

## Styles

The styles are injected into the page when the package is loaded in the browser, so there is nothing to configure.

If your app is server-rendered or has a strict Content Security Policy, add the stylesheet to the `styles` of your `angular.json` as well:

```json
"styles": ["node_modules/@masonrygrid/angular/style.css"]
```

## License

MIT
