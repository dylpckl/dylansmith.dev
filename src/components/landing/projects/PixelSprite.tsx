"use client";

import { useEffect, useRef } from "react";
import { SPRITE_SIZE } from "@/lib/demos/prompt-fighter/types";
import type { Sprite } from "@/lib/demos/prompt-fighter/types";
import { cn } from "@/lib/utils";

/** A prompt-fighter sprite: 16×16 palette indices drawn to a canvas, scaled up pixelated. */
export function PixelSprite({
  sprite,
  flip,
  rows = SPRITE_SIZE,
  className,
}: {
  sprite: Sprite;
  flip?: boolean;
  /** Draw only the first N rows, for a top-down "drawing in" reveal. */
  rows?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    for (let y = 0; y < Math.min(rows, SPRITE_SIZE); y++) {
      const row = sprite.rows[y] ?? "";
      for (let x = 0; x < SPRITE_SIZE; x++) {
        const i = Number(row[x] ?? "0");
        if (!i) continue;
        ctx.fillStyle = sprite.palette[i] ?? "#ff00ff";
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [sprite, rows]);
  return (
    <canvas
      ref={ref}
      width={SPRITE_SIZE}
      height={SPRITE_SIZE}
      className={cn("block", className)}
      style={{ imageRendering: "pixelated", transform: flip ? "scaleX(-1)" : undefined }}
    />
  );
}
