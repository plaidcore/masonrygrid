import { useRef, useState } from "react";
import { createMasonry } from "@masonrygrid/core";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Connects a masonry controller to the grid container and mirrors its result in state.
 *
 * @param {import("react").ReactElement[]} childrenList Items already normalized.
 * @param {import("../types").Spacing} spacing
 */
export const useMasonryLayout = (childrenList, spacing) => {
  const [topOffsets, setTopOffsets] = useState(() =>
    Array.from({ length: childrenList.length }, () => 0),
  );
  const [containerHeight, setContainerHeight] = useState(null);

  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useIsomorphicLayoutEffect(() => {
    if (childrenList.length === 0) {
      setContainerHeight(null);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // The core mutates the DOM directly; the state is synced afterwards with the
    // same values so React re-renders write the same `top` instead of overriding it.
    const masonry = createMasonry(container, {
      getItems: () => itemsRef.current,
      onLayout: ({ offsets, containerHeight }) => {
        setContainerHeight(containerHeight);
        setTopOffsets(offsets);
      },
    });

    return masonry.destroy;
  }, [childrenList, spacing]);

  return { containerRef, itemsRef, topOffsets, containerHeight };
};
