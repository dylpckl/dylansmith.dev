"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

const MAJOR = 100; // px between labeled ticks
const RULER = 20; // ruler thickness in px

const tickBackground = (axis: "x" | "y") =>
  axis === "x"
    ? {
        backgroundImage:
          "linear-gradient(90deg, rgb(var(--m-ruler) / 0.9) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--m-ruler) / 0.45) 1px, transparent 1px)",
        backgroundSize: `${MAJOR}px 100%, ${MAJOR / 5}px 5px`,
        backgroundPosition: "0 0, 0 100%",
        backgroundRepeat: "repeat-x, repeat-x",
      }
    : {
        backgroundImage:
          "linear-gradient(rgb(var(--m-ruler) / 0.9) 1px, transparent 1px), linear-gradient(rgb(var(--m-ruler) / 0.45) 1px, transparent 1px)",
        backgroundSize: `100% ${MAJOR}px, 5px ${MAJOR / 5}px`,
        backgroundPosition: "0 0, 100% 0",
        backgroundRepeat: "repeat-y, repeat-y",
      };

const labelClass =
  "absolute select-none font-mono text-[9px] leading-none text-ruler";

type TopRulerProps = {
  /** The canvas column the x-coordinates are measured from. */
  canvasRef: RefObject<HTMLElement>;
};

/**
 * Sticky x-axis ruler across the top of the canvas column. Labels every
 * 100px from the canvas's left edge; re-measured on resize.
 */
export function TopRuler({ canvasRef }: TopRulerProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [canvasRef]);

  const labels = [];
  for (let x = 0; x <= width; x += MAJOR) labels.push(x);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none sticky top-0 z-30 hidden w-full border-b border-line/20 bg-panel/90 backdrop-blur-sm lg:block"
      style={{ height: RULER, ...tickBackground("x") }}
    >
      {labels.map((x) => (
        <span key={x} className={cn(labelClass, "top-1")} style={{ left: x + 3 }}>
          {x}
        </span>
      ))}
    </div>
  );
}

/**
 * Sticky y-axis ruler down the left of the canvas. Labels every 100px of
 * document height and slide with scroll, so the number next to a frame is
 * its real page offset.
 */
export function LeftRuler() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    const measure = () =>
      setDocHeight(document.documentElement.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      track.style.transform = `translateY(${-window.scrollY}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const labels = [];
  for (let y = 0; y <= docHeight; y += MAJOR) labels.push(y);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none sticky top-0 z-30 hidden h-screen shrink-0 overflow-hidden border-r border-line/20 bg-panel/90 backdrop-blur-sm lg:block"
      style={{ width: RULER }}
    >
      <div
        ref={trackRef}
        className="absolute left-0 top-0 w-full will-change-transform"
        style={{ height: docHeight, ...tickBackground("y") }}
      >
        {labels.map((y) => (
          <span
            key={y}
            className={cn(labelClass, "left-[3px]")}
            style={{
              top: y + 3,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RulerCorner() {
  return (
    <div
      aria-hidden="true"
      className="sticky top-0 z-30 hidden shrink-0 border-b border-r border-line/20 bg-panel/90 lg:block"
      style={{ width: RULER, height: RULER }}
    />
  );
}
