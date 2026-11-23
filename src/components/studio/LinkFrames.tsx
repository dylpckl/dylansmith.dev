import { FileText } from "lucide-react";

import { Button } from "@/components/Button";
import { SocialLink } from "@/components/SocialLink";
import { TagGroup } from "@/components/Tag";
import { EMAIL, RESUME_PATH } from "@/lib/site";

// Frames with no live demo: a title, one verified line and a way out.
// Copy here is quoted from each project's own public page; don't add claims.

const kicker = "font-mono text-[11px] uppercase tracking-[0.16em] text-accent";
const title =
  "text-4xl font-bold leading-none tracking-tight text-ink lg:text-5xl";
const body = "max-w-[44ch] text-base leading-relaxed text-ink-2 lg:text-lg";
const link =
  "inline-flex w-fit items-center gap-1 rounded-md font-mono text-xs uppercase tracking-widest text-accent transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

/** Four beat arrows, the game's one input. Decorative. */
function BeatArrows() {
  const paths = [
    "M12 20V4M5 11l7-7 7 7",
    "M4 12h16M13 5l7 7-7 7",
    "M12 4v16M5 13l7 7 7-7",
    "M20 12H4M11 5l-7 7 7 7",
  ];
  return (
    <div
      aria-hidden="true"
      className="flex h-40 items-center justify-center gap-5 rounded-lg bg-card ring-1 ring-line/25"
    >
      {paths.map((d, i) => (
        <svg
          key={d}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={
            i === 0 ? "h-12 w-12 text-accent" : "h-12 w-12 text-ink-3"
          }
        >
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}

export function StackUpFrame() {
  return (
    <div className="flex flex-col gap-5">
      <span className={kicker}>Game · nwld.party</span>
      <h3 className={title}>Stack Up</h3>
      <BeatArrows />
      <p className={body}>
        Rope in and breach building after building, one swipe per beat. Stack
        up, kick, flashbang, go, then swipe toward each raider before the
        arrow&rsquo;s outline lands.
      </p>
      <TagGroup tags={["1P", "Demo"]} />
      <a
        href="https://nwld.party/play/stack-up"
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        Play on nwld.party ↗
      </a>
    </div>
  );
}

export function BkdFrame() {
  return (
    <div className="flex flex-col gap-5">
      <span className={kicker}>App</span>
      <h3 className={title}>bkd</h3>
      <p className={body}>Pick the next book together.</p>
      <a
        href="https://bkd-blond.vercel.app"
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        Open bkd ↗
      </a>
    </div>
  );
}

export function ContactFrame() {
  return (
    <div className="flex flex-col gap-6">
      <span className={kicker}>Say hello</span>
      <h3 className={title}>Let&rsquo;s build something.</h3>
      <a
        href={`mailto:${EMAIL}`}
        className="w-fit break-all text-lg text-ink-2 underline decoration-accent underline-offset-4 transition hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {EMAIL}
      </a>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          href={RESUME_PATH}
          target="_blank"
          rel="noreferrer"
          variant="primary"
        >
          <FileText aria-hidden="true" />
          Resume
        </Button>
        <SocialLink site="github" />
        <SocialLink site="linkedin" />
        <SocialLink site="email" />
      </div>
    </div>
  );
}
