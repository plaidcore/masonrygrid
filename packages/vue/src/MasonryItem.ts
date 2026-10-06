import { defineComponent, h, type PropType } from "vue";
import { getColSpanClassName, type ColSpan } from "@masonrygrid/core";

/**
 * A grid item. Must be a direct child of `MasonryGrid`.
 *
 * `class`, `style`, `id` and any other attribute fall through to the root `div`.
 */
export const MasonryItem = defineComponent({
  name: "MasonryItem",
  props: {
    /** Columns the item spans out of 12. A number, `"auto"`, `"fill"` or a value per breakpoint. */
    colSpan: {
      type: [Number, String, Object] as PropType<ColSpan>,
      default: "auto",
    },
  },
  setup(props, { slots }) {
    return () => h("div", { class: getColSpanClassName(props.colSpan) }, slots.default?.());
  },
});
