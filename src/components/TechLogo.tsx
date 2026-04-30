"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TechLogoProps = {
  name: string;
  label: string;
  /** Brand color for hover state. Falls back to currentColor if absent. */
  brandColor?: string;
  size?: number;
  className?: string;
};

export function TechLogo({
  name,
  label,
  brandColor,
  size = 24,
  className,
}: TechLogoProps) {
  const url = `/logos/${name}.svg`;
  const style: CSSProperties = {
    width: size,
    height: size,
    maskImage: `url('${url}')`,
    WebkitMaskImage: `url('${url}')`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
  if (brandColor) {
    (style as Record<string, string>)["--brand"] = brandColor;
  }

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={cn(
        "inline-block bg-current transition-colors duration-200",
        brandColor && "hover:bg-[var(--brand)]",
        className,
      )}
      style={style}
    />
  );
}
