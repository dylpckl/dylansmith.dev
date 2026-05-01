"use client";

import { useEffect, useState, type RefObject } from "react";

type Dimensions = { width: number; height: number };

export function useDimensions(
  ref: RefObject<HTMLElement | null>,
): Dimensions {
  const [dims, setDims] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const cs = getComputedStyle(el);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const borderX =
        parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
      const borderY =
        parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

      setDims({
        width: el.offsetWidth - padX - borderX,
        height: el.offsetHeight - padY - borderY,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return dims;
}
