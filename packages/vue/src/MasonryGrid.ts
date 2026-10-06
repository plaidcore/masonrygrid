import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  type PropType,
} from "vue";
import {
  DEFAULT_SPACING,
  createMasonry,
  getSpacingStyle,
  type MasonryController,
  type Spacing,
} from "@masonrygrid/core";

/**
 * A masonry grid. Every `MasonryItem` inside it rests on the one above.
 *
 * `class`, `style`, `id` and any other attribute fall through to the root `div`.
 */
export const MasonryGrid = defineComponent({
  name: "MasonryGrid",
  props: {
    /** Space between items. Numbers are pixels, strings any CSS length, or `{ x, y }` per axis. */
    spacing: {
      type: [Number, String, Object] as PropType<Spacing>,
      default: () => DEFAULT_SPACING,
    },
  },
  setup(props, { slots }) {
    const container = ref<HTMLElement | null>(null);
    let masonry: MasonryController | undefined;

    // The core writes `top` and `height` straight to the DOM, and Vue never overrides them:
    // neither is part of what this component renders. Runs on mount and after every update
    // (items added, removed or reordered, or a new spacing), because new items have to be observed.
    const layout = () => {
      masonry?.destroy();
      masonry = undefined;

      const element = container.value;
      if (!element) return;

      if (element.children.length === 0) {
        // Without items there is no layout pass to reset the height of a previous one.
        element.style.height = "";
        return;
      }

      masonry = createMasonry(element);
    };

    onMounted(layout);
    onUpdated(layout);
    onBeforeUnmount(() => masonry?.destroy());

    return () =>
      h(
        "div",
        {
          ref: container,
          class: "grid-container masonry-container",
          style: getSpacingStyle(props.spacing),
        },
        slots.default?.(),
      );
  },
});
