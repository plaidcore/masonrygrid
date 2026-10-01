import { useEffect, useLayoutEffect } from "react";

/** `useLayoutEffect` in the browser; `useEffect` on the server to avoid the SSR warning. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
