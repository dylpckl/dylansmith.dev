# Workspace landing page — implementation plan

Spec: `docs/superpowers/specs/2026-10-02-workspace-landing-design.md`
Branch: `feat/workspace-landing`. Each task ends in a commit. Verification at the end: `npx tsc --noEmit`, `npm run lint`, `npm run build`, Playwright at 1440 and 400 in both materials.

## Task 1 — Material tokens and provider

- `globals.css`: define RGB-triplet tokens on `:root, [data-material="slate"]` and `[data-material="paper"]`; grid background rules per material; hide the mountain photo in Paper.
- `tailwind.config.js`: extend `colors` with semantic names reading the tokens via `rgb(var(--m-x) / <alpha-value>)`.
- `src/components/ThemeProvider.tsx`: client wrapper around `next-themes` (`attribute="data-material"`, themes slate/paper, default slate, no system).
- `layout.tsx`: wrap children in the provider; move the body background to `bg-paper text-ink`; give the mountain image a class the CSS can hide.
- `src/components/workspace/MaterialToggle.tsx`: segmented Slate/Paper control using `useTheme`, hydration-safe.

Commit: `feat(theme): material tokens and slate/paper provider`.

## Task 2 — Retheme shared primitives

Swap literal `slate-*` / `teal-*` classes for tokens in: `Tag.tsx`, `Button.tsx`, `Tile.tsx`, `BeforeAfterReveal.tsx`, `CountUp.tsx` (if it has color), canvas `Target.tsx` + `style.css` (ruler goes accent), `TechLogo.tsx` (check default color), the four `landing/visuals/*`.

Commit: `refactor(ui): primitives read material tokens`.

## Task 3 — Workspace furniture

- `src/components/workspace/Frame.tsx`: bordered section with corner marks and a label chip `LABEL · W × H` (via `useDimensions`). Accepts `id`, `label`, `sectionRef`, `className`, children. `scroll-mt` for anchor landing.
- `src/components/workspace/Rulers.tsx`: `TopRuler` (sticky, ticks + x labels every 100px from a ResizeObserver on the canvas) and `LeftRuler` (sticky full-height, y labels that translate with scroll). `aria-hidden`, `lg+` only.
- `src/components/workspace/Workspace.tsx`: layout shell that places the rulers and the canvas column.

Commit: `feat(workspace): frames and edge rulers`.

## Task 4 — Sidebar

- Replace `Header.jsx` with `Header.tsx`: desktop panel (wordmark, Sections, Elsewhere, Material); mobile top strip (wordmark, Blog, toggle). Props: `activeSection`, `sections` (so blog pages can pass none and still show Elsewhere).
- Update blog pages' `Header` usage.

Commit: `feat(nav): panel-styled sidebar with material toggle`.

## Task 5 — Sections

- `Hero.tsx`: keep content, drop its own `<section>`/`Canvas` wrapper responsibilities into the Frame (Canvas stays for the Ruler).
- `Principles.tsx`: quote, lead line with the years stat, three rows per spec, tools and skills from the old `Intro`.
- `Work.tsx`: add a link row to each tile; tokens.
- `Writing.tsx`: posts list + "All writing" link.
- `Landing.tsx` (client): refs, observer, `Header` + `Workspace` + four `Frame`s.
- `page.tsx` (server): `getAllPosts()` → `PostSummary[]` → `<Landing>`.
- Delete `Intro.tsx`, `Outcomes.tsx`.

Commit: `feat(landing): workspace frames, principles with receipts, writing list`.

## Task 6 — Blog pages pinned to Slate

- Wrap blog index and post page in `data-material="slate"` with `bg-paper`.

Commit: `chore(blog): pin blog pages to slate until rethemed`.

## Task 7 — Docs and verification

- Update `CLAUDE.md` layout, section flow, conventions (Frame, materials, tokens).
- Run tsc, lint, build. Playwright screenshots. Fix what they show.
- Open PR.
