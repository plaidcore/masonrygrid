import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
} from "@angular/core";
import { getColSpanClassName, type ColSpan } from "@masonrygrid/core";

/**
 * A grid item. Must be a direct child of `<masonry-grid>`.
 *
 * ```html
 * <masonry-item [colSpan]="{ xs: 12, md: 6 }">...</masonry-item>
 * ```
 */
@Component({
  selector: "masonry-item",
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "colSpanClass()",
  },
})
export class MasonryItem {
  /** Columns the item spans out of 12. A number, `"auto"`, `"fill"` or a value per breakpoint. */
  readonly colSpan = input<ColSpan>("auto");

  /** @internal Read by `MasonryGrid` to measure and position the item. */
  readonly element: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly colSpanClass = computed(() => getColSpanClassName(this.colSpan()));
}
