"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useDimensions } from "@/lib/useDimensions";
import { cn } from "@/lib/utils";

type FrameProps = {
  /** Section id; also the anchor and the IntersectionObserver key. */
  id: string;
  /** Short label shown in the frame chip, e.g. "Principles". */
  label: string;
  /** Forwarded so the page composer can observe the section. */
  sectionRef?: RefObject<HTMLElement>;
  className?: string;
  children: ReactNode;
};

/**
 * A labeled, bordered region on the workspace canvas. The chip reads the
 * frame's own live size (W × H) so the "design tool" furniture is honest
 * rather than decorative. Replaces VerticalText + SectionLabel on the
 * landing page; the <h2> inside is visually hidden because the chip is
 * the section heading a sighted reader sees.
 */
export function Frame({
  id,
  label,
  sectionRef,
  className,
  children,
}: FrameProps) {
  const localRef = useRef<HTMLElement>(null);
  const ref = sectionRef ?? localRef;
  const { width, height } = useDimensions(ref);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative scroll-mt-16 border border-frame/50 bg-frame-fill px-6 py-10 md:px-10 md:py-12 lg:scroll-mt-10",
        className,
      )}
    >
      <h2 id={`${id}-heading`} className="sr-only">
        {label}
      </h2>

      {/* Label chip, sitting on the top border like a frame name. */}
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-4 flex items-center gap-2 bg-paper px-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent md:left-8"
      >
        {label}
        {width > 0 && (
          <span className="normal-case tracking-[0.04em] text-ink-3">
            {Math.round(width)} × {Math.round(height)}
          </span>
        )}
      </span>

      {/* Corner marks, centered on the border corners. */}
      <Corner className="-left-[3.5px] -top-[3.5px]" />
      <Corner className="-right-[3.5px] -top-[3.5px]" />
      <Corner className="-bottom-[3.5px] -left-[3.5px]" />
      <Corner className="-bottom-[3.5px] -right-[3.5px]" />

      {children}
    </section>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute h-1.5 w-1.5 border border-accent bg-paper",
        className,
      )}
    />
  );
}
