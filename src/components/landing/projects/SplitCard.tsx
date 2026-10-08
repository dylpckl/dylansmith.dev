import type { CSSProperties, PointerEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SplitCardProps = {
  className?: string;
  style?: CSSProperties;
  /** Decorative layers behind the whole card. */
  background?: ReactNode;
  /** Decorative layers over the whole card (pointer-events off). */
  overlay?: ReactNode;
  /** Full-width band above both columns. */
  masthead?: ReactNode;
  copy: ReactNode;
  copyClassName?: string;
  demo: ReactNode;
  figureClassName?: string;
  /** Decorative layers behind the demo only. */
  figureBackground?: ReactNode;
  caption: string;
  captionClassName?: string;
  dotClassName?: string;
  /** Demo on the left at lg — alternate down the page. */
  flip?: boolean;
  /** Cursor effects hook in here; see useFinePointer. */
  onPointerMove?: PointerEventHandler<HTMLElement>;
  onPointerLeave?: PointerEventHandler<HTMLElement>;
};

/**
 * The layout every side-project card shares: copy on one side, a live demo on
 * the other, stacked below lg. All styling is the caller's — each card dresses
 * itself in its project's visual language.
 */
export function SplitCard({
  className,
  style,
  background,
  overlay,
  masthead,
  copy,
  copyClassName,
  demo,
  figureClassName,
  figureBackground,
  caption,
  captionClassName,
  dotClassName,
  flip = false,
  onPointerMove,
  onPointerLeave,
}: SplitCardProps) {
  return (
    <article
      className={cn("relative isolate overflow-hidden", className)}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {background && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {background}
        </div>
      )}
      {masthead}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className={cn("relative flex flex-col gap-5 p-6 md:p-8 lg:p-10", flip && "lg:order-2", copyClassName)}>
          {copy}
        </div>
        <figure
          className={cn(
            "relative isolate flex flex-col items-center justify-center gap-4 overflow-hidden px-3 py-8 sm:px-8 lg:py-10",
            flip && "lg:order-1",
            figureClassName,
          )}
        >
          {figureBackground && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              {figureBackground}
            </div>
          )}
          <div className="relative w-full">{demo}</div>
          <figcaption
            className={cn(
              "relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest",
              captionClassName,
            )}
          >
            <span className={cn("h-1.5 w-1.5 animate-pulse rounded-full", dotClassName)} aria-hidden="true" />
            {caption}
          </figcaption>
        </figure>
      </div>
      {overlay && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          {overlay}
        </div>
      )}
    </article>
  );
}
