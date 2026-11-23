"use client";

import Link from "next/link";
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { MaterialToggle } from "@/components/workspace/MaterialToggle";
import { RESUME_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

import { FRAMES, ROWS, type FrameDef } from "./frames";

// Canvas spacing, in world px.
const COL_GAP = 140;
const ROW_GAP = 300;
const ROW_LABEL_OFFSET = 190;
const FALLBACK_H = 600;

const MIN_Z = 0.1;
const MAX_Z = 2;
/** Focusing a frame never zooms out past this just to fit its height. */
const READABLE_Z = 0.75;

const DESKTOP = "(min-width: 1024px)";

type Cam = { x: number; y: number; z: number };
type Box = { x: number; y: number; w: number; h: number };
type Size = { w: number; h: number };

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/** Nearest ancestor inside `stop` that can still scroll by (dx, dy). */
function scrollableWithin(target: EventTarget | null, stop: Element, dx: number, dy: number) {
  let el = target instanceof Element ? target : null;
  while (el && el !== stop) {
    const cs = getComputedStyle(el);
    const canY =
      /(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1;
    const canX =
      /(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1;
    if (canY && Math.abs(dy) >= Math.abs(dx)) {
      const atTop = el.scrollTop <= 0;
      const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (!((dy < 0 && atTop) || (dy > 0 && atEnd))) return el;
    }
    if (canX && Math.abs(dx) > Math.abs(dy)) return el;
    el = el.parentElement;
  }
  return null;
}

const ELSEWHERE = [
  { label: "Blog", href: "/blog", mark: "" },
  { label: "Resume", href: RESUME_PATH, mark: "↓", external: true },
  { label: "GitHub", href: "https://github.com/dylpckl", mark: "↗", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dylanjbsmith/",
    mark: "↗",
    external: true,
  },
];

const groupLabel =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-panel-ink-3";
const toolBtn =
  "inline-flex h-8 min-w-8 items-center justify-center rounded px-2 font-mono text-[11px] uppercase tracking-widest text-panel-ink-2 transition-colors hover:bg-panel-accent/15 hover:text-panel-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent";

/**
 * The landing page as a design file. One DOM serves both layouts:
 *
 * - lg and up: a pannable, zoomable canvas. Frames are absolutely placed in
 *   world space and a camera transform moves the world. Clicking a frame (or
 *   its layer) flies the camera to it; only the selected frame takes input,
 *   so dragging the canvas never fights with a live demo.
 * - below lg: the same frames in one column with native scrolling, a sticky
 *   top bar and a layer strip pinned to the bottom.
 *
 * Positions reach the DOM as CSS variables consumed by lg: utilities, so the
 * server render and the phone layout need no JavaScript to look right.
 */
export function Studio() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [sel, setSel] = useState(FRAMES[0].id);
  const [cam, setCam] = useState<Cam>({ x: 0, y: 0, z: 1 });
  const [sizes, setSizes] = useState<Record<string, Size>>({});
  const [vp, setVp] = useState<Size>({ w: 0, h: 0 });
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [ready, setReady] = useState(false);

  const viewportRef = useRef<HTMLElement>(null);
  const frameEls = useRef<Record<string, HTMLElement | null>>({});
  const chipEls = useRef<Record<string, HTMLAnchorElement | null>>({});
  /** True while the camera should stay locked on the selected frame. */
  const following = useRef(true);
  const reduceMotion = useRef(false);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number; moved: boolean } | null>(null);

  // Latest values for listeners registered once.
  const live = useRef({ cam, vp, sel, isDesktop });
  live.current = { cam, vp, sel, isDesktop };

  /* ---------------------------------------------------------------- */
  /* Environment                                                       */
  /* ---------------------------------------------------------------- */

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsDesktop(mq.matches);
      reduceMotion.current = rm.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);

    const fromHash = decodeURIComponent(window.location.hash.slice(1));
    if (FRAMES.some((f) => f.id === fromHash)) setSel(fromHash);

    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  // Frame heights (widths are ours) and the viewport size.
  useIsoLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      setSizes((prev) => {
        let next = prev;
        for (const f of FRAMES) {
          const el = frameEls.current[f.id];
          if (!el) continue;
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          if (prev[f.id]?.w !== w || prev[f.id]?.h !== h) {
            if (next === prev) next = { ...prev };
            next[f.id] = { w, h };
          }
        }
        return next;
      });
      const v = viewportRef.current;
      if (v) {
        setVp((p) =>
          p.w === v.clientWidth && p.h === v.clientHeight
            ? p
            : { w: v.clientWidth, h: v.clientHeight },
        );
      }
    });
    for (const f of FRAMES) {
      const el = frameEls.current[f.id];
      if (el) ro.observe(el);
    }
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [isDesktop]);

  /* ---------------------------------------------------------------- */
  /* Layout: rows of frames, left to right                             */
  /* ---------------------------------------------------------------- */

  const layout = useMemo(() => {
    const boxes: Record<string, Box> = {};
    const labels: Record<string, { x: number; y: number }> = {};
    let y = 0;
    let maxW = 0;
    for (const row of ROWS) {
      let x = 0;
      let rowH = 0;
      labels[row.id] = { x: 0, y: y - ROW_LABEL_OFFSET };
      for (const f of row.frames) {
        const h = sizes[f.id]?.h || FALLBACK_H;
        boxes[f.id] = { x, y, w: f.w, h };
        x += f.w + COL_GAP;
        rowH = Math.max(rowH, h);
      }
      maxW = Math.max(maxW, x - COL_GAP);
      y += rowH + ROW_GAP;
    }
    return {
      boxes,
      labels,
      bounds: { x: 0, y: -ROW_LABEL_OFFSET, w: maxW, h: y - ROW_GAP + ROW_LABEL_OFFSET },
    };
  }, [sizes]);

  /* ---------------------------------------------------------------- */
  /* Camera                                                            */
  /* ---------------------------------------------------------------- */

  const camFor = useCallback(
    (id: string): Cam | null => {
      const b = layout.boxes[id];
      if (!b || !vp.w || !vp.h) return null;
      const padX = 120;
      const padY = 150;
      const zW = (vp.w - padX) / b.w;
      const zH = (vp.h - padY) / b.h;
      const z = clamp(Math.min(1, zW, Math.max(zH, READABLE_Z)), MIN_Z, 1);
      // Taller than the viewport at this zoom: pin its top, scroll for the rest.
      const tall = b.h * z > vp.h - padY;
      return {
        x: b.x + b.w / 2,
        y: tall ? b.y + (vp.h / 2 - 90) / z : b.y + b.h / 2,
        z,
      };
    },
    [layout, vp],
  );

  const focus = useCallback(
    (id: string, opts: { animate?: boolean; hash?: boolean } = {}) => {
      setSel(id);
      following.current = true;
      const next = camFor(id);
      if (next) {
        setAnimate((opts.animate ?? true) && !reduceMotion.current);
        setCam(next);
      }
      if (opts.hash ?? true) {
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [camFor],
  );

  // Keep the camera on the selected frame while the layout settles (fonts,
  // images, demo chunks) and when the window resizes, until the user pans.
  useIsoLayoutEffect(() => {
    if (!isDesktop || !following.current) return;
    const measured = FRAMES.every((f) => sizes[f.id]);
    const next = camFor(sel);
    if (!next || !measured) return;
    setAnimate(false);
    setCam(next);
    setReady(true);
  }, [isDesktop, sel, camFor, sizes]);

  const manual = useCallback((next: Cam) => {
    following.current = false;
    setAnimate(false);
    setCam(next);
  }, []);

  const zoomBy = useCallback(
    (k: number, at?: { x: number; y: number }) => {
      const { cam: c, vp: v } = live.current;
      const z = clamp(c.z * k, MIN_Z, MAX_Z);
      // Keep the world point under `at` (viewport px from center) in place.
      const ox = at ? at.x - v.w / 2 : 0;
      const oy = at ? at.y - v.h / 2 : 0;
      manual({
        x: c.x + ox / c.z - ox / z,
        y: c.y + oy / c.z - oy / z,
        z,
      });
    },
    [manual],
  );

  const fitAll = useCallback(() => {
    const { bounds } = layout;
    if (!vp.w || !vp.h) return;
    following.current = false;
    setAnimate(!reduceMotion.current);
    setCam({
      x: bounds.x + bounds.w / 2,
      y: bounds.y + bounds.h / 2,
      z: clamp(Math.min((vp.w - 80) / bounds.w, (vp.h - 80) / bounds.h), MIN_Z, 1),
    });
  }, [layout, vp]);

  const step = useCallback(
    (d: number) => {
      const i = FRAMES.findIndex((f) => f.id === sel);
      focus(FRAMES[(i + d + FRAMES.length) % FRAMES.length].id);
    },
    [sel, focus],
  );

  /* ---------------------------------------------------------------- */
  /* Canvas input (desktop)                                            */
  /* ---------------------------------------------------------------- */

  // Wheel pans; ctrl/cmd + wheel (and trackpad pinch) zooms at the cursor.
  // Registered by hand because it must be non-passive to preventDefault.
  useEffect(() => {
    const v = viewportRef.current;
    if (!v || !isDesktop) return;
    const onWheel = (e: WheelEvent) => {
      const { cam: c, sel: s } = live.current;
      const selEl = frameEls.current[s];
      // Let a scroll container inside the selected frame (the phone screens)
      // take the wheel until it runs out of scroll.
      if (
        !e.ctrlKey &&
        !e.metaKey &&
        selEl &&
        e.target instanceof Node &&
        selEl.contains(e.target) &&
        scrollableWithin(e.target, selEl, e.deltaX, e.deltaY)
      ) {
        return;
      }
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const r = v.getBoundingClientRect();
        zoomBy(Math.exp(-e.deltaY * 0.01), {
          x: e.clientX - r.left,
          y: e.clientY - r.top,
        });
      } else {
        const unit = e.deltaMode === 1 ? 16 : 1;
        manual({
          x: c.x + (e.deltaX * unit) / c.z,
          y: c.y + (e.deltaY * unit) / c.z,
          z: c.z,
        });
      }
    };
    // Anchor jumps and keyboard focus can scroll an overflow:hidden box.
    const onScroll = () => {
      if (v.scrollTop || v.scrollLeft) v.scrollTo(0, 0);
    };
    v.addEventListener("wheel", onWheel, { passive: false });
    v.addEventListener("scroll", onScroll);
    return () => {
      v.removeEventListener("wheel", onWheel);
      v.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop, manual, zoomBy]);

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (!isDesktop || e.button !== 0) return;
    // The selected frame is live: its content owns the pointer.
    const selEl = frameEls.current[sel];
    if (selEl && e.target instanceof Node && selEl.contains(e.target)) return;
    drag.current = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, moved: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      d.moved = true;
      // Capturing only once the pointer has travelled keeps plain clicks on
      // frames working, and swallows the click that ends a drag.
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    manual({ x: d.cx - dx / cam.z, y: d.cy - dy / cam.z, z: cam.z });
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
  };

  /* ---------------------------------------------------------------- */
  /* Column mode (below lg): scroll-spy drives the selection           */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (isDesktop) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSel(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -72% 0px", threshold: 0 },
    );
    for (const f of FRAMES) {
      const el = frameEls.current[f.id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop) return;
    chipEls.current[sel]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [sel, isDesktop]);

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  const selected = FRAMES.find((f) => f.id === sel) ?? FRAMES[0];
  const selBox = layout.boxes[selected.id];

  const worldStyle = {
    "--cam": `scale(${cam.z}) translate(${-cam.x}px, ${-cam.y}px)`,
    transition:
      animate && !dragging
        ? "transform 650ms cubic-bezier(0.3, 0.8, 0.2, 1)"
        : "none",
  } as CSSProperties;

  // Coarser dots when zoomed far out, so the grid never turns to noise.
  const cell = (cam.z < 0.35 ? 96 : 24) * cam.z;
  const gridStyle = {
    "--gs": `${cell}px`,
    "--gx": `${vp.w / 2 - cam.x * cam.z}px`,
    "--gy": `${vp.h / 2 - cam.y * cam.z}px`,
  } as CSSProperties;

  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden"
    >
      <div className="ws-grid lg:hidden" aria-hidden="true" />
      <div className="ws-veil" aria-hidden="true" />

      {/* Toolbar */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-line/20 bg-panel/90 px-3 py-2 backdrop-blur lg:static lg:px-4">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-panel-ink focus:outline-none focus-visible:text-panel-accent"
        >
          Dylan Smith
        </Link>
        <span className="hidden min-w-0 truncate font-mono text-[11px] text-panel-ink-3 sm:inline">
          Drafts / <span className="text-panel-ink-2">dylansmith.dev</span>
        </span>

        <div className="ml-auto flex items-center gap-3">
          <div
            role="group"
            aria-label="Canvas view"
            className="hidden items-center rounded border border-panel-ink-3/40 lg:flex"
          >
            <button type="button" className={toolBtn} onClick={() => step(-1)}>
              Prev
            </button>
            <button type="button" className={toolBtn} onClick={() => step(1)}>
              Next
            </button>
            <span className="h-4 w-px bg-panel-ink-3/40" aria-hidden="true" />
            <button
              type="button"
              className={toolBtn}
              aria-label="Zoom out"
              onClick={() => zoomBy(0.8)}
            >
              −
            </button>
            <span className="w-11 text-center font-mono text-[11px] text-panel-ink-2">
              {Math.round(cam.z * 100)}%
            </span>
            <button
              type="button"
              className={toolBtn}
              aria-label="Zoom in"
              onClick={() => zoomBy(1.25)}
            >
              +
            </button>
            <span className="h-4 w-px bg-panel-ink-3/40" aria-hidden="true" />
            <button type="button" className={toolBtn} onClick={fitAll}>
              Fit all
            </button>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-panel-ink-2 hover:text-panel-accent focus:outline-none focus-visible:text-panel-accent lg:hidden"
          >
            Blog
          </Link>
          <MaterialToggle className="w-auto" />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Layers */}
        <aside className="hidden w-52 shrink-0 flex-col gap-6 overflow-y-auto border-r border-line/20 bg-panel/90 px-3 py-5 backdrop-blur-sm lg:flex xl:w-56">
          <nav aria-label="Layers" className="flex flex-col gap-4">
            {ROWS.map((row) => (
              <div key={row.id}>
                <div className={cn(groupLabel, "mb-1 px-2")}>{row.label}</div>
                <ul>
                  {row.frames.map((f) => (
                    <li key={f.id}>
                      <a
                        href={`#${f.id}`}
                        aria-current={sel === f.id ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          focus(f.id);
                        }}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded px-2 py-1.5 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent",
                          sel === f.id
                            ? "bg-panel-accent/15 text-panel-accent"
                            : "text-panel-ink-2 hover:text-panel-accent",
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <FrameIcon />
                          <span className="truncate">{f.label}</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-panel-ink-3">
                          {f.kind}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <nav aria-label="Elsewhere" className="mt-auto">
            <div className={cn(groupLabel, "mb-1 px-2")}>Elsewhere</div>
            <ul>
              {ELSEWHERE.map((e) => {
                const cls =
                  "flex items-center justify-between gap-3 rounded px-2 py-1 font-mono text-xs text-panel-ink-2 transition-colors hover:text-panel-accent focus:outline-none focus-visible:text-panel-accent";
                return (
                  <li key={e.label}>
                    {e.external ? (
                      <a href={e.href} target="_blank" rel="noreferrer" className={cls}>
                        {e.label}
                        <span aria-hidden="true" className="text-panel-ink-3">
                          {e.mark}
                        </span>
                      </a>
                    ) : (
                      <Link href={e.href} className={cls}>
                        {e.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Canvas */}
        <main
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn(
            "relative min-w-0 flex-1 lg:touch-none lg:select-none lg:overflow-hidden",
            dragging ? "lg:cursor-grabbing" : "lg:cursor-grab",
          )}
        >
          <div className="studio-grid hidden lg:block" style={gridStyle} aria-hidden="true" />

          <div
            style={worldStyle}
            className={cn(
              "flex flex-col gap-14 px-4 pb-44 pt-10 sm:px-6",
              "lg:absolute lg:left-1/2 lg:top-1/2 lg:block lg:h-0 lg:w-0 lg:origin-top-left lg:p-0 lg:[transform:var(--cam)]",
              // Hold the first paint until frames are measured and placed.
              isDesktop && !ready && "lg:invisible",
            )}
          >
            {ROWS.map((row) => (
              <Fragment key={row.id}>
                <h2
                  style={
                    {
                      "--x": `${layout.labels[row.id].x}px`,
                      "--y": `${layout.labels[row.id].y}px`,
                    } as CSSProperties
                  }
                  className="-mb-6 mt-4 text-4xl font-bold tracking-tight text-ink/20 first:mt-0 lg:pointer-events-none lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:m-0 lg:whitespace-nowrap lg:text-[120px] lg:leading-none lg:text-ink/10"
                >
                  {row.label}
                </h2>
                {row.frames.map((f) => (
                  <CanvasFrame
                    key={f.id}
                    frame={f}
                    box={layout.boxes[f.id]}
                    selected={sel === f.id}
                    desktop={isDesktop}
                    onFocus={focus}
                    register={(el) => {
                      frameEls.current[f.id] = el;
                    }}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </main>

        {/* Properties */}
        <aside
          aria-label="Properties"
          className="hidden w-60 shrink-0 flex-col gap-5 overflow-y-auto border-l border-line/20 bg-panel/90 px-4 py-5 backdrop-blur-sm xl:flex"
        >
          <div className={groupLabel}>Design</div>
          <dl aria-live="polite" className="font-mono text-xs">
            {[
              ["Layer", selected.label],
              ["Kind", selected.kind],
              ["Source", selected.source],
              ["X", selBox ? Math.round(selBox.x) : "–"],
              ["Y", selBox ? Math.round(selBox.y) : "–"],
              ["W", selBox ? Math.round(selBox.w) : "–"],
              ["H", selBox ? Math.round(selBox.h) : "–"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-3 border-b border-panel-ink-3/20 py-1.5"
              >
                <dt className="text-panel-ink-3">{k}</dt>
                <dd className="truncate text-right text-panel-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className={groupLabel}>Content</div>
          <p className="text-sm leading-relaxed text-panel-ink-2">{selected.blurb}</p>
          <ul className="flex flex-col gap-1">
            {selected.links.map((l) => {
              const cls =
                "inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-panel-accent hover:text-panel-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent";
              const external = !l.href.startsWith("/");
              return (
                <li key={l.href}>
                  {external ? (
                    <a
                      href={l.href}
                      target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className={cls}
                    >
                      {l.label} ↗
                    </a>
                  ) : (
                    <Link href={l.href} className={cls}>
                      {l.label} →
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={cn(groupLabel, "mt-auto")}>Canvas</div>
          <p className="font-mono text-[11px] leading-relaxed text-panel-ink-3">
            Click a frame to go to it. Drag or scroll to pan. Ctrl or ⌘ + scroll
            to zoom.
          </p>
        </aside>
      </div>

      {/* Status bar (desktop) */}
      <footer className="hidden items-center justify-between gap-4 border-t border-line/20 bg-panel/90 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-panel-ink-3 lg:flex">
        <span>
          {FRAMES.length} frames · {selected.label}
        </span>
        <span>
          x {Math.round(cam.x)} · y {Math.round(cam.y)} · {Math.round(cam.z * 100)}%
        </span>
      </footer>

      {/* Layer strip (below lg) */}
      <nav
        aria-label="Layers"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/20 bg-panel/95 backdrop-blur lg:hidden"
      >
        <div className="flex items-center gap-2 px-4 pt-2 font-mono text-xs">
          <span className="text-panel-accent">
            <FrameIcon />
          </span>
          <span className="min-w-0 flex-1 truncate font-semibold text-panel-ink">
            {selected.label}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-panel-ink-3">
            {selected.kind} · {selected.source}
          </span>
        </div>
        <ul className="flex gap-2 overflow-x-auto px-4 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FRAMES.map((f) => (
            <li key={f.id} className="shrink-0">
              <a
                ref={(el) => {
                  chipEls.current[f.id] = el;
                }}
                href={`#${f.id}`}
                aria-current={sel === f.id ? "true" : undefined}
                className={cn(
                  "inline-flex h-10 items-center whitespace-nowrap rounded border px-3 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent",
                  sel === f.id
                    ? "border-panel-accent bg-panel-accent/15 text-panel-accent"
                    : "border-panel-ink-3/40 text-panel-ink-2",
                )}
              >
                {f.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function FrameIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d="M4 1v12M10 1v12M1 4h12M1 10h12" />
    </svg>
  );
}

function CanvasFrame({
  frame: f,
  box,
  selected,
  desktop,
  onFocus,
  register,
}: {
  frame: FrameDef;
  box: Box;
  selected: boolean;
  desktop: boolean;
  onFocus: (id: string) => void;
  register: (el: HTMLElement | null) => void;
}) {
  // On the canvas only the selected frame is live. `inert` also takes the
  // others out of the tab order, so the layers panel is the way around.
  const dormant = desktop && !selected;
  const inert = dormant ? { inert: "" } : {};

  return (
    <section
      ref={register}
      id={f.id}
      aria-labelledby={`${f.id}-heading`}
      style={
        {
          "--x": `${box.x}px`,
          "--y": `${box.y}px`,
          "--w": `${box.w}px`,
        } as CSSProperties
      }
      className="relative scroll-mt-20 lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[var(--w)] lg:cursor-auto lg:select-text"
    >
      <h3
        id={`${f.id}-heading`}
        className={cn(
          "absolute -top-6 left-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] lg:-top-7 lg:text-xs",
          selected ? "text-accent" : "text-ink-3",
        )}
      >
        {f.label}
        <span className="hidden normal-case tracking-[0.04em] text-ink-3 lg:inline">
          {Math.round(box.w)} × {Math.round(box.h)}
        </span>
      </h3>

      <div
        {...inert}
        className={cn(
          "border bg-frame-fill transition-colors",
          selected ? "border-accent" : "border-frame/50",
          !f.bare && "px-6 py-10 md:px-10 md:py-12",
        )}
      >
        {f.content}
      </div>

      {selected && (
        <>
          <Corner className="-left-[3.5px] -top-[3.5px]" />
          <Corner className="-right-[3.5px] -top-[3.5px]" />
          <Corner className="-bottom-[3.5px] -left-[3.5px]" />
          <Corner className="-bottom-[3.5px] -right-[3.5px]" />
        </>
      )}

      {dormant && (
        <button
          type="button"
          aria-label={`Go to ${f.label}`}
          onClick={() => onFocus(f.id)}
          className="absolute inset-0 z-20 cursor-pointer ring-accent/60 transition-shadow hover:ring-2 focus:outline-none focus-visible:ring-2"
        />
      )}
    </section>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute z-10 h-1.5 w-1.5 border border-accent bg-paper",
        className,
      )}
    />
  );
}
