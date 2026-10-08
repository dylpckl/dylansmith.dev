import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  children: ReactNode;
  /** Screen background — shows behind the status bar and any overscroll. */
  screen: string;
  /** Status bar glyph color; match it to the app's chrome. */
  ink?: string;
  /** Accent for the hover glow — the project's own color. */
  glow?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * A device bezel for app demos. The screen is its own scroll container, so a
 * demo's sticky headers and fixed bottom bars pin to the phone, not the page.
 * Width caps at 340px and shrinks with its column on small screens.
 */
export function PhoneFrame({
  children,
  screen,
  ink = "#111",
  glow = "rgb(var(--m-accent))",
  className,
  style,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        // Hover rings the device in the project's color: the "this is live,
        // go ahead" cue. Glow only, no movement, so the target doesn't shift
        // out from under the cursor.
        "relative mx-auto w-full max-w-[340px] rounded-[2.75rem] bg-slate-950 p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-slate-700 transition-shadow duration-300 ease-out hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85),0_0_0_2px_var(--glow),0_0_48px_-8px_var(--glow)]",
        className,
      )}
      style={{ ["--glow" as string]: glow, ...style }}
    >
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-slate-700" />
      <span aria-hidden="true" className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-slate-700" />
      <span aria-hidden="true" className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-slate-700" />

      <div
        className="relative isolate flex h-[620px] flex-col overflow-hidden rounded-[2.2rem] sm:h-[680px]"
        style={{ background: screen }}
      >
        <div
          aria-hidden="true"
          className="relative z-30 flex h-9 shrink-0 items-center justify-between px-7 text-[12px] font-semibold"
          style={{ color: ink, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}
        >
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
              <rect x="0" y="6" width="3" height="4" rx="1" />
              <rect x="4.3" y="4" width="3" height="6" rx="1" />
              <rect x="8.6" y="2" width="3" height="8" rx="1" />
              <rect x="13" y="0" width="3" height="10" rx="1" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="currentColor" opacity="0.4" />
              <rect x="2" y="2" width="13" height="7" rx="1.5" fill="currentColor" />
              <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.4" />
            </svg>
          </span>
        </div>
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[6px] left-1/2 z-[500] h-[4px] w-[110px] -translate-x-1/2 rounded-full opacity-60"
          style={{ background: ink }}
        />
      </div>
    </div>
  );
}
