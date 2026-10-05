"use client";

import { getColSpanClassName, toTop } from "@masonrygrid/core";

/**
 * @param {import("./types").MasonryItemProps & import("./types").MasonryItemInjectedProps} props
 */
const MasonryItem = ({
  children,
  colSpan = "auto",
  className,
  style,
  index,
  topOffset = 0,
  items,
  ...rest
}) => {
  const classNames = [getColSpanClassName(colSpan), className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      {...rest}
      ref={(element) => {
        items.current[index] = element;
      }}
      style={{ ...style, top: toTop(topOffset) }}
      className={classNames}
    >
      {children}
    </div>
  );
};

export default MasonryItem;
