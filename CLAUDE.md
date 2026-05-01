# dylansmith.dev

Personal portfolio site. Single-page landing — no separate case-study pages.

## Stack

- Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- Lucide for UI icons; brand logos served as SVGs from `public/logos/`
- Playwright MCP for visual verification during dev

## Commands

```bash
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit   # typecheck only (skip the next/types/* errors after deletes)
npm run build
```

## Layout

```
src/
  app/
    page.tsx                  # thin composer: refs + IntersectionObserver, ~50 lines
    layout.tsx
  components/
    landing/                  # one file per landing section
      Hero.tsx
      Intro.tsx               # First Principles + Tools/Languages + Practices
      Outcomes.tsx            # the only bento on the page
      Work.tsx                # case-study tiles (drag reveals)
      visuals/                # inline graphics (MiniSystemDemo, OneOffConsolidation, ManaCurve, ScatteredFiles)
    bento/                    # reusable bento primitives (Tile, Feature, Support, StatTile, BeforeAfterReveal, MiniTokenStrip, StateChips)
    Tag.tsx                   # Tag + TagGroup — the canonical chip/badge component
    TechLogo.tsx              # mask-based brand SVG with hover-colorize via per-element --brand var
    Header.jsx                # sticky sidebar nav; tracks activeSection from page.tsx
public/
  case-studies/<slug>/legacy.png + refreshed.png   # before/after pairs
  logos/<simple-icons-name>.svg                    # CC0 brand SVGs
```

Section flow on the landing page: **Hero → Intro → Outcomes → Work**.

## Conventions

- **Tags/chips:** always use [`Tag`](src/components/Tag.tsx) (`intent: default|teal|orange`, `size: xs|sm|md`, `variant: solid|tinted`) and `TagGroup` for arrays. Don't add new inline tag styles.
- **Tile:** [`Tile`](src/components/bento/Tile.tsx) takes optional `label`, `labelIcon`, `tags`, plus a discriminated variant (`href`, `onClickModal`, or `decorative`). Header collapses entirely when neither label nor tags are passed. Use `decorative` for non-clickable tiles.
- **Brand logos:** drop SVGs from [simpleicons.org](https://simpleicons.org) (CC0) into `public/logos/` named with the simple-icons slug (e.g. `nextdotjs.svg`). Render via `<TechLogo name="..." label="..." brandColor="#XXXXXX" />`. Default render is monochrome `currentColor`; brand color shows on hover.
- **Section refs:** each landing section component takes a `sectionRef: RefObject<HTMLDivElement>` prop — page.tsx owns the refs and forwards them so the `IntersectionObserver` can highlight the sidebar nav.
- **BeforeAfterReveal:** the drag handle accepts `initial` (0–100). Vary it across tiles for visual interest (current values: 75/62/32). Pair with `<Image fill object-cover>` inside a fixed-height container.

## Things NOT to do

- **Don't recreate `/work/<slug>/page.tsx` case-study pages.** They were deleted on purpose — see `.claude/projects/.../memory/case_studies_deprecated.md` (host-side memory). Tiles in `Work.tsx` are the full presentation; no "Read the case study →" links.
- Don't add inline tag/badge spans — use `Tag`.
- Don't suggest installing `@svgr/webpack` for the brand logos — `TechLogo`'s mask-image trick covers the use case without a build dep.

## Visual verification

Playwright MCP tools work against the dev server (must be running on :3000). Repo-root `*.png` files are gitignored (`/*.png`) so screenshots from a verification pass don't pollute the tree.
