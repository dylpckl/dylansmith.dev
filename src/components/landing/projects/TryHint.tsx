import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

type TryHintProps = {
  show: boolean;
  label: string;
  /** Ring + label fill, in the demo's own accent. */
  color: string;
  /** Label text color on that fill. */
  ink: string;
  placement?: "top" | "bottom" | "center";
  /** Match the target's corner radius so the ring hugs it. */
  radius?: number;
  className?: string;
};

/**
 * "This is interactive": a breathing ring around the demo's main control plus
 * a small bobbing label. Purely decorative — drop it inside a `relative`
 * wrapper around the target; the demo hides it after the first interaction.
 */
export function TryHint({ show, label, color, ink, placement = "top", radius = 8, className }: TryHintProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 motion-reduce:hidden",
        show ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <span
        className="absolute -inset-1 animate-hintRing border-2"
        style={{ borderColor: color, borderRadius: radius + 4 }}
      />
      <span
        className={cn(
          "absolute left-1/2 inline-flex animate-hintBob items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-lg",
          placement === "top" ? "-top-7" : placement === "bottom" ? "-bottom-7" : "top-1/2 -mt-2.5",
        )}
        style={{ background: color, color: ink }}
      >
        <MousePointerClick className="h-3 w-3" />
        {label}
      </span>
    </span>
  );
}
