"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export const MATERIALS = ["slate", "paper"] as const;
export type Material = (typeof MATERIALS)[number];

/**
 * Writes `data-material="slate|paper"` on <html>. Slate is the default and
 * there is no system preference: the material is a design choice, not a
 * dark-mode toggle. Persisted under the `material` key in localStorage.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-material"
      themes={[...MATERIALS]}
      defaultTheme="slate"
      enableSystem={false}
      storageKey="material"
    >
      {children}
    </NextThemesProvider>
  );
}
