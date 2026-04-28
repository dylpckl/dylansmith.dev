# Bento Landing for dylansmith.dev — Design Spec

**Date:** 2026-04-27
**Author:** Dylan Smith (with Claude)
**Status:** Approved, ready for implementation plan
**Branch:** create new branch `feat/bento-landing` off `main`. Current branch `case-study/bank-rec` is unrelated work and will not be touched. PR #14's branch (`claude/update-website-ux-role-8R5rD`) retains the `/v2`, `/v3`, and case-study scaffold history if anything is needed back later.

## Context & Motivation

Dylan is applying tonight to **Senior UX Design Engineer, Design Systems** at Greenhouse (job 7793473). The JD emphasizes shipped design systems, React/TS, design tokens, WCAG accessibility, documentation-first mindset, AI tooling (Claude/MCP), and converting one-off UI work into reusable system capabilities — all of which align with Dylan's resume.

The current `dylansmith.dev` landing has a 3-section sidebar layout (intro / design / develop) that buries proof. The new landing replaces it with a **bento grid** that reads as both portfolio and design artifact in one glance. The bento itself becomes the demonstration of "production-grade components and patterns" the JD asks for.

A previous Claude Code Mobile session (PR #14, branch `claude/update-website-ux-role-8R5rD`) produced two preview routes (`/v2`, `/v3`) and three case-study scaffolds. We are absorbing the useful parts of `/v3` (tile primitives, popover, content angles) and discarding the rest.

## Goals

1. Replace `/` with a hero + bento grid that demonstrates systems thinking through layout, content, and interaction.
2. Surface JD-aligned proof: design systems shipped, %-impact stats, AI tooling, documentation-first, cross-functional co-ownership.
3. Ship a single interactive moment (drag-to-reveal before/after slider) that signals "design engineer who cares about craft" without overbuilding.
4. Keep `/work/bank-rec` reachable from the bento as a deeper case study.
5. Done tonight (2026-04-27 evening) so Dylan can apply.

## Non-Goals

- Light-theme reskin (dark slate stays).
- New case study pages (modals carry the story).
- `/resume` HTML page (existing PDF link in header is sufficient).
- Side project tiles in the bento (rarebrew, steamparty, encounter+ remain at `/work`).
- Cover letter (dropped — not required by JD).
- SEO/OG image refresh (not in scope tonight; can follow up).

## Information Architecture

| Route | Purpose | Status |
|---|---|---|
| `/` | New bento landing | **REWRITE** |
| `/work` | Index of all work | keep as-is |
| `/work/bank-rec` | Real case study (predates PR #14) | keep as-is |
| `/work/design-system` | PR #14 scaffold | **DELETE** |
| `/work/ai-tooling` | PR #14 scaffold | **DELETE** |
| `/work/rapidpay` | PR #14 scaffold | **DELETE** |
| `/v2` | PR #14 preview | **DELETE** |
| `/v3` | PR #14 preview (tile primitives migrate to real page) | **DELETE** |
| `/Dylan-Smith-Resume.pdf` | Resume PDF | **REPLACE FILE CONTENTS (manual)** |

## Hero (`#intro`)

Stacked layout, full-width inside `max-w-screen-2xl`. Inherits dark slate theme + dotted radial background from current site.

- **Eyebrow:** mono caps, `text-teal-300` — `Dylan Smith — UX Engineer`
- **Headline:** keep existing animated tagline pattern: "Designing `[pixel-perfect]` interfaces by day & developing them by night." `MeasuredDiv` flourish on "pixel-perfect" stays — it's a UX-engineer signal.
- **Lead-in:** "Leading design for [SmartAdvocate](https://www.smartadvocate.com/)." (fixes existing `https://https://` typo — same fix already in PR #14).
- **Atomic Habits quote** (mono, with quote-mark icons):
  > "You don't rise to the level of your goals, you fall to the level of your systems."
  > — JAMES CLEAR · ATOMIC HABITS
- **Contact row:** GitHub · LinkedIn · Email (`SocialLink` already exists for github/linkedin; add an `email` variant pointing to `mailto:dylanjbsmith@gmail.com`).

## Bento (`#work`)

CSS Grid: 12 columns, `auto-rows-[minmax(140px,auto)]`, `gap-4`. Mobile (< md) collapses to 1 column. Tablet (md) uses 6 cols. Desktop (lg+) uses 12 cols.

### Tile inventory (11 tiles)

| # | Label | Headline | Lg Span | Md Span | Action | Visual element |
|---|---|---|---|---|---|---|
| 1 | DESIGN SYSTEMS | **2** — shipped from zero, solo bridge between design & eng at two orgs | col-8 row-2 | col-12 | Modal | Big "2" stat + caption only (mini-demos live in tiles 3/4/5) |
| 2 | TRACK RECORD | **First-of-its-kind** — both shipped systems were org-firsts | col-4 row-2 | col-12 | Modal | — |
| 3 | TOKENS | Color, type, spacing, elevation | col-4 | col-6 | none | 6 color dots |
| 4 | STATES | Documented variants for every state | col-4 | col-6 | none | default / hover / focus chips |
| 5 | A11Y | WCAG AA · contrast · focus · keyboard | col-4 | col-12 | none | "WCAG AA" badge |
| 6 | SMARTADVOCATE | **60%** faster migration delivery | col-4 | col-6 | Modal | — |
| 7 | MDS | **50%** faster feature time-to-ship | col-4 | col-6 | Modal | — |
| 8 | CROSS-FUNCTIONAL | Co-owning decisions across design, eng, product | col-4 | col-12 | Modal | — |
| 9 | AI WORKFLOW | **Claude Code · MCP** — agents/skills adopted across team | col-5 | col-12 | Modal | — |
| 10 | SYSTEMS THINKING | **One-off → reusable** | col-7 row-2 | col-12 | Modal | Before/after drag-reveal slider (script files → starter-kit) |
| 11 | BANK REC | Case study — Bank Reconciliation | col-5 | col-12 | Link → `/work/bank-rec` | thumbnail (use existing `/public/case-studies/bank-rec/spire.png`) |

### Tile interactions

- **Modal tiles:** click anywhere on the tile opens a `Modal` with the tile's `{title, body}`. Hover state: ring shifts to `teal-300/50`, subtle bg lift. Cursor pointer. Tile is rendered as a `<button>` for keyboard a11y; Enter/Space to activate.
- **Decorative tiles** (3, 4, 5): no hover lift, no cursor change. They're context, not destinations. Rendered as `<div>`.
- **Link tile** (11): rendered as `<Link>` with same hover treatment as modal tiles, plus an `ArrowUpRight` icon.

## Modal content (first draft)

Defined as a plain object map at the top of `src/app/page.tsx`. Each body is 2-3 short paragraphs (~80-120 words). Dylan tunes voice during build.

```ts
const MODAL_CONTENT: Record<string, { title: string; body: ReactNode }> = {
  designSystems: {
    title: "Design Systems — shipped from zero",
    body: /* MDS (atomic, 1k+ daily users) + SmartAdvocate (token architecture, ASP.NET / DevExpress, no regressions). Both first-of-kind at their orgs. */,
  },
  trackRecord: {
    title: "First-of-its-kind, twice",
    body: /* Neither org had a design system before; brought both from zero into production. */,
  },
  smartAdvocate: {
    title: "60% faster migration delivery",
    body: /* Treated each engagement as infrastructure work: starter-kit monorepo, Python CLI, shared tooling. Across 12+ concurrent migrations, average turnaround down 60%. */,
  },
  mds: {
    title: "50% faster feature time-to-ship",
    body: /* Overhauled the design→eng handoff process in partnership with PMs. Tokens as shared source of truth between Figma and code. */,
  },
  crossFunctional: {
    title: "Co-owning decisions",
    body: /* Solo bridge between design and engineering — the JD calls this "co-owning." Examples: tokens conversation w/ eng, partnering with PMs on handoff, user research findings driving redesign. */,
  },
  aiWorkflow: {
    title: "Claude Code · MCP",
    body: /* Built a suite of skills, agents, and MCP-driven workflows for code-ready output. Adopted across the team for both design system implementation and migration delivery. */,
  },
  systemsThinking: {
    title: "One-off → reusable",
    body: /* Every project ships team-wide tooling, not throwaway scripts. Starter-kit monorepos, Python CLIs, agentic workflows — adopted as team standards. */,
  },
};
```

## Components

New folder: `src/components/bento/`

### `Tile.tsx`
Base primitive (extracted/adapted from `/v3` page's local `Tile`). Props:

```ts
type TileProps = {
  label: string;
  labelIcon?: LucideIcon;
  className?: string;
  children: ReactNode;
} & (
  | { onClickModal: () => void; href?: never; decorative?: never }
  | { href: string; external?: boolean; onClickModal?: never; decorative?: never }
  | { decorative: true; onClickModal?: never; href?: never }
);
```

Renders as `<button>`, `<Link>`, or `<div>` based on the discriminator. Mono uppercase label slot at top with optional icon. Standardized padding, rounded-2xl, ring-1 ring-slate-700, bg-slate-800/60. Hover ring shifts teal-300/50 (only on interactive variants).

### `StatTile.tsx`
Wraps `Tile`. Big-number tile with caption.

### `CategoryTile.tsx`
Wraps `Tile`. Headline + supporting text + optional visual slot.

### `BeforeAfterReveal.tsx`
Drag-handle reveal slider. Two stacked layers (before, after). Vertical handle (slate-700 with teal-300 grip dots) drives a `clip-path: inset(0 calc(100% - X) 0 0)` on the top layer.

- Pointer events: `onPointerDown` on handle → set capture → `onPointerMove` updates handle x (clamped 0–100%) → `onPointerUp` releases capture. Single handler covers mouse + touch + pen.
- Keyboard a11y: handle is `<button role="slider" aria-valuemin=0 aria-valuemax=100 aria-valuenow={x} tabIndex=0>`. ←/→ moves 5%; Home/End to extremes.
- `prefers-reduced-motion`: no animated transition on handle drop.
- Used once: tile 10 (Systems Thinking — script files BEFORE → starter-kit AFTER). Single interactive moment keeps it special; the rest of the bento stays calm and scannable.

### `Modal.tsx`
Extracted from `/v3` `Popover`. Adds a11y:
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at title.
- Focus trap inside modal (first focusable on open, restore on close).
- ESC closes; click-outside closes.
- Body scroll locked while open.

### `MiniTokenStrip.tsx`
6 small color dots with optional labels under (slate, teal, orange, etc.). Used in tile 3.

### `StateChips.tsx`
Pill row showing default / hover / focus states with realistic styling. Used in tile 4.

### Reusing existing components
- `Header.jsx` — keep, but update its `links` array to `["intro", "work"]`.
- `SocialLink.tsx` — extend with an `email` variant.
- `MeasuredDiv` — keep usage on "pixel-perfect" word.
- `cn` utility from `@/lib/utils`.

## Files to create / modify / delete

### Create
- `src/components/bento/Tile.tsx`
- `src/components/bento/StatTile.tsx`
- `src/components/bento/CategoryTile.tsx`
- `src/components/bento/BeforeAfterReveal.tsx`
- `src/components/bento/Modal.tsx`
- `src/components/bento/MiniTokenStrip.tsx`
- `src/components/bento/StateChips.tsx`

### Modify
- `src/app/page.tsx` — full rewrite (bento landing).
- `src/components/Header.jsx` — update `links` array to `["intro", "work"]`; verify resume link path.
- `src/components/SocialLink.tsx` — add `email` site variant.

### Delete
- `src/app/v2/page.tsx` and folder
- `src/app/v3/page.tsx` and folder
- `src/app/work/design-system/page.tsx` and folder
- `src/app/work/ai-tooling/page.tsx` and folder
- `src/app/work/rapidpay/page.tsx` and folder
- `content/case-studies/design-system.md` (if present from PR #14)
- `content/case-studies/ai-tooling.md` (if present from PR #14)
- `content/case-studies/rapidpay.md` (if present from PR #14)

### Manual step (Dylan)
- Export new resume `.docx` to PDF; replace `public/Dylan-Smith-Resume.pdf` with new file (keep filename — three places link to it).

## Testing & verification

- **Visual**: `next dev`, browser-test golden path: hero loads, all 11 tiles render, modals open/close on click and ESC, drag slider works on tiles 1 and 10, bank-rec link navigates to `/work/bank-rec`.
- **Responsive**: verify md and lg breakpoints in browser; mobile = single column.
- **Keyboard a11y**: tab through tiles, Enter opens modal, ESC closes, focus returns to triggering tile. Slider responds to ←/→.
- **Reduced motion**: emulate via DevTools, confirm slider has no transition.
- **Build**: `next build` clean (no TS errors, no broken links).

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Drag interaction edge cases at 11pm | Single-purpose component; pointer events (not separate mouse/touch); keyboard fallback ships day one. |
| Modal copy quality | Spec ships first-draft copy stubs; Dylan tunes voice during build. |
| Mobile bento layout breaks | Defined md/lg spans in inventory table; verify in browser before declaring done. |
| Resume PDF mismatch with new resume | Spec calls out manual step; do not declare done without it. |
| Deleting `/v2`, `/v3`, scaffold case studies removes work that might be useful | Branch `claude/update-website-ux-role-8R5rD` retains the history if anything is needed back. |

## Out of scope (tonight)

- `/resume` HTML page
- New OG image / SEO refresh
- Side project tiles in bento
- Light-theme reskin
- Cover letter
- New case study pages (design-system, ai-tooling, rapidpay)
