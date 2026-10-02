import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  NgZone,
  afterNextRender,
  computed,
  contentChildren,
  effect,
  inject,
  input,
} from "@angular/core";
import {
  DEFAULT_SPACING,
  createMasonry,
  getSpacingStyle,
  type MasonryController,
  type Spacing,
} from "@masonrygrid/core";
import { MasonryItem } from "./masonry-item";

/**
 * A masonry grid. Every `<masonry-item>` inside it rests on the one above.
 *
 * ```html
 * <masonry-grid [spacing]="16">
 *   <masonry-item [colSpan]="{ xs: 12, md: 6 }">...</masonry-item>
 * </masonry-grid>
 * ```
 */
@Component({
  selector: "masonry-grid",
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "grid-container masonry-container",
    "[style.--spacing-x]": "spacingX()",
    "[style.--spacing-y]": "spacingY()",
  },
})
export class MasonryGrid {
  /** Space between items. Numbers are pixels, strings any CSS length, or `{ x, y }` per axis. */
  readonly spacing = input<Spacing>(DEFAULT_SPACING);

  private readonly items = contentChildren(MasonryItem);

  protected readonly spacingX = computed(() => getSpacingStyle(this.spacing())["--spacing-x"]);
  protected readonly spacingY = computed(() => getSpacingStyle(this.spacing())["--spacing-y"]);

  private readonly host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);
  private readonly zone = inject(NgZone);

  private masonry?: MasonryController;

  constructor() {
    // Re-run the layout whenever the items or the spacing change. It has to happen after
    // Angular has rendered, because the layout is calculated from the real DOM.
    effect(() => {
      this.items();
      this.spacing();

      afterNextRender(() => this.layout(), { injector: this.injector });
    });

    inject(DestroyRef).onDestroy(() => this.masonry?.destroy());
  }

  private layout(): void {
    this.masonry?.destroy();
    this.masonry = undefined;

    if (this.items().length === 0) {
      this.host.style.height = "0px";
      return;
    }

    // The layout listens to resizes; keep that out of Angular's change detection.
    this.zone.runOutsideAngular(() => {
      this.masonry = createMasonry(this.host, {
        getItems: () => this.items().map((item) => item.element),
      });
    });
  }
}
