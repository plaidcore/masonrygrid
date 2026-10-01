import { GAP_TOLERANCE, ROW_TOLERANCE } from "../constants";

/**
 * Groups the items into rows by their natural position (the one the grid would give without masonry).
 * @param {import("./types").MeasuredItem[]} items
 * @returns {import("./types").MeasuredItem[][]}
 */
const groupIntoRows = (items) => {
  const rows = [];
  let currentRow = [];
  let rowTop = null;

  items.forEach((item) => {
    if (rowTop !== null && Math.abs(item.naturalTop - rowTop) > ROW_TOLERANCE) {
      rows.push(currentRow);
      currentRow = [];
      rowTop = null;
    }

    if (currentRow.length === 0) rowTop = item.naturalTop;

    currentRow.push(item);
  });

  if (currentRow.length) rows.push(currentRow);

  return rows;
};

/** Position (in reading order) of the first item of each row. */
const getRowStartPositions = (rows) => {
  const starts = [];
  let acc = 0;

  rows.forEach((row) => {
    starts.push(acc);
    acc += row.length;
  });

  return starts;
};

/**
 * Finds, in the row above, the item `item` should rest on: the lowest one among
 * those overlapping horizontally or, if none overlaps, the nearest one.
 */
const findItemAbove = ({ rowAbove, rowAboveStart, item, finalTops, columnGap }) => {
  if (!rowAbove?.length) return null;

  let nearest = { idx: -1, overlap: -Infinity };
  let deepest = { idx: -1, bottom: -Infinity };

  rowAbove.forEach((candidate, idx) => {
    const overlap =
      Math.min(candidate.right, item.right) - Math.max(candidate.left, item.left);

    if (overlap > nearest.overlap) nearest = { idx, overlap };

    if (overlap > -columnGap + GAP_TOLERANCE) {
      const top = finalTops[rowAboveStart + idx] ?? candidate.naturalTop;
      const bottom = top + candidate.clientHeight;

      if (bottom > deepest.bottom) deepest = { idx, bottom };
    }
  });

  const chosenIdx = deepest.idx !== -1 ? deepest.idx : nearest.idx;

  if (chosenIdx === -1) return null;

  return {
    position: rowAboveStart + chosenIdx,
    item: rowAbove[chosenIdx],
  };
};

/**
 * Computes the offset each item needs to rest on the one above it.
 * Pure function: it never touches the DOM, it only works with the measurements it receives.
 *
 * @param {import("./types").MeasuredItem[]} items
 * @param {{ rowGap: number, columnGap: number }} gaps
 * @returns {import("./types").MasonryLayout}
 */
export const getMeasuredLayout = (items, { rowGap, columnGap }) => {
  const rows = groupIntoRows(items);
  const rowStarts = getRowStartPositions(rows);

  const offsets = [];
  const finalTops = [];
  let maxBottom = 0;
  let position = 0;

  rows.forEach((row, rowIdx) => {
    row.forEach((item) => {
      const above = findItemAbove({
        rowAbove: rows[rowIdx - 1],
        rowAboveStart: rowStarts[rowIdx - 1],
        item,
        finalTops,
        columnGap,
      });

      let finalTop = item.naturalTop;

      if (above) {
        const gap = rowGap + item.marginTop + above.item.marginBottom;
        const aboveTop = finalTops[above.position] ?? above.item.naturalTop;

        finalTop = aboveTop + above.item.clientHeight + gap;
      }

      finalTops[position] = finalTop;
      offsets[item.index] = item.naturalTop - finalTop;
      maxBottom = Math.max(maxBottom, finalTop + item.clientHeight);

      position++;
    });
  });

  const baseOffset = Math.min(...rows[0].map((item) => item.naturalTop));

  return {
    offsets,
    containerHeight: Math.max(0, maxBottom - baseOffset),
  };
};
