"use client";

import { useEffect, useState } from "react";

/**
 * True when cursor effects should run: a real hovering pointer (not touch) and
 * no reduced-motion preference. Re-evaluates if either changes (e.g. a tablet
 * gaining a mouse).
 */
export function useFinePointer(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOk(pointer.matches && !motion.matches);
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  return ok;
}
