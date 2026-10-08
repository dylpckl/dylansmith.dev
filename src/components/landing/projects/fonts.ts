import { DM_Sans, Press_Start_2P, Space_Grotesk } from "next/font/google";

// Each side-project card speaks in its project's own type. Declared once here
// so the card and its demo share one font instance.
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });
export const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
export const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap" });
