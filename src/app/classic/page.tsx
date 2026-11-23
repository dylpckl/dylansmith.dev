import type { Metadata } from "next";

import { Landing } from "@/components/landing/Landing";

// The scrolling landing page that the canvas (Studio) replaced. Kept so the
// two can be compared side by side; delete this route once the canvas ships.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Classic() {
  return <Landing />;
}
