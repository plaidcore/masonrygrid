import { Children, cloneElement, isValidElement, useMemo } from "react";
import { DEFAULT_SPACING, getSpacingStyle } from "@masonrygrid/core";
import { useMasonryLayout } from "./hooks/useMasonryLayout";
import MasonryItem from "./MasonryItem";

/**
 * @param {import("./types").MasonryGridProps} props
 */
const MasonryGrid = ({
   children,
   style,
   className,
   spacing = DEFAULT_SPACING,
   ...rest
}) => {
   // Drops `false`, `null`, strings... so `{cond && <MasonryGrid.Item />}` is safe.
   const validChildren = useMemo(
      () => Children.toArray(children).filter(isValidElement),
      [children],
   );

   const { containerRef, itemsRef, topOffsets, containerHeight } = useMasonryLayout(
      validChildren,
      spacing,
   );

   const height = Number.isFinite(containerHeight) ? Math.max(0, containerHeight) : 0;
   const classNames = ["grid-container", "masonry-container", className]
      .filter(Boolean)
      .join(" ");

   return (
      <div
         {...rest}
         ref={containerRef}
         style={{ ...style, ...getSpacingStyle(spacing), height: `${height}px` }}
         className={classNames}
      >
         {validChildren.map((child, index) =>
            cloneElement(child, {
               items: itemsRef,
               index,
               topOffset: topOffsets[index] || 0,
            }),
         )}
      </div>
   );
};

MasonryGrid.Item = MasonryItem;

export default MasonryGrid;
