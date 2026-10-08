import { DM_Sans, Press_Start_2P, Space_Grotesk } from "next/font/google";

// Each side-project card speaks in its project's own type. Declared once here
// so the card and its demo share one font instance. `preload: false` — these
// are for cards far below the fold, so they shouldn't compete with the hero.
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], display: "swap", preload: false });
export const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", preload: false });
export const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap", preload: false });

// System stacks the apps themselves use (no webfont to load).
/** crosscheck — src/styles.css */
export const CC_SERIF = 'Georgia, "Times New Roman", serif';
export const CC_SANS = '-apple-system, "SF Pro Text", "Segoe UI", Roboto, system-ui, sans-serif';
export const CC_MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
/** prompt fighter — src/theme.ts */
export const PF_MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
