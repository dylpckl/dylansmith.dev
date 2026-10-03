"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MATERIALS, type Material } from "@/components/ThemeProvider";

const LABELS: Record<Material, string> = {
  slate: "Slate",
  paper: "Paper",
};

type Props = {
  className?: string;
};

/**
 * Segmented Slate/Paper control. Renders a neutral placeholder until mounted
 * so the server and the first client paint agree.
 */
export function MaterialToggle({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current: Material = mounted && theme === "paper" ? "paper" : "slate";

  return (
    <div
      role="group"
      aria-label="Material"
      className={cn(
        "inline-flex w-full overflow-hidden rounded border border-line/30 font-mono text-[10px] uppercase tracking-widest",
        className,
      )}
    >
      {MATERIALS.map((m) => {
        const active = mounted && current === m;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={active}
            onClick={() => setTheme(m)}
            className={cn(
              "flex-1 px-2 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active
                ? "bg-accent/15 text-accent"
                : "text-ink-3 hover:text-ink",
            )}
          >
            {LABELS[m]}
          </button>
        );
      })}
    </div>
  );
}
