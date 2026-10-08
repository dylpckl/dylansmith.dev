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
npm run build      # NOT while `npm run dev` is running — both write .next and the dev page goes unstyled
```

## Layout

```
src/
  app/
    page.tsx                  # thin composer: section refs + scroll-line scroll-spy, Header + main.main-column + Footer
    layout.tsx
  components/
    landing/                  # one file per landing section
      Hero.tsx
      Intro.tsx               # First Principles + Tools/Languages + Practices
      Outcomes.tsx            # the only bento on the page
      Work.tsx                # case-study tiles (drag reveals), then <SideProjects>
      SideProjects.tsx        # full-width side-project cards, each with a live demo (next/dynamic, ssr:false)
      projects/               # side-project cards — see "Side-project cards" below
        SplitCard.tsx         #   layout shell: copy | demo, stacked below lg; all styling is the caller's
        RarebrewCard.tsx …    #   one *Card.tsx per project (its look + cursor effect) + its *Demo.tsx
        PhoneFrame.tsx        #   device bezel; the screen is its own scroll container
        PixelSprite.tsx       #   prompt-fighter 16×16 sprite → canvas
        fonts.ts              #   next/font instances + system stacks shared by each card and its demo
        useFinePointer.ts     #   gate for cursor effects (hovering mouse, no reduced motion)
      visuals/                # inline graphics (MiniSystemDemo, OneOffConsolidation, ScatteredFiles)
    bento/                    # reusable bento primitives (Tile, Feature, Support, StatTile, BeforeAfterReveal, MiniTokenStrip, StateChips)
    canvas/                   # Canvas + Ruler compound: dimension annotations (guidelines + px brackets) shared via React context
    Tag.tsx                   # Tag + TagGroup — the canonical chip/badge component
    TechLogo.tsx              # mask-based brand SVG with hover-colorize via per-element --brand var
    Header.jsx                # fixed sidebar nav (lg+), width var(--sidebar); tracks activeSection from page.tsx
    Footer.tsx                # full-bleed site footer; inner content uses .main-column
  lib/
    site.ts                   # RESUME_PATH, EMAIL, SECTIONS — shared by Header, Hero, Footer, SocialLink
    demos/<project>/          # vendored code + dated data snapshots the demos run on (each has a README on refreshing)
public/
  case-studies/<slug>/legacy.png + refreshed.png   # before/after pairs
  logos/<simple-icons-name>.svg                    # CC0 brand SVGs
```

Section flow on the landing page: **Hero → Intro → Outcomes → Work** (case-study tiles, then side projects) **→ Footer**.

## Conventions

- **Tags/chips:** always use [`Tag`](src/components/Tag.tsx) (`intent: default|teal|orange`, `size: xs|sm|md`, `variant: solid|tinted`) and `TagGroup` for arrays. Don't add new inline tag styles.
- **Tile:** [`Tile`](src/components/bento/Tile.tsx) takes optional `label`, `labelIcon`, `tags`, plus a discriminated variant (`href`, `onClickModal`, or `decorative`). Header collapses entirely when neither label nor tags are passed. Use `decorative` for non-clickable tiles.
- **Brand logos:** drop SVGs from [simpleicons.org](https://simpleicons.org) (CC0) into `public/logos/` named with the simple-icons slug (e.g. `nextdotjs.svg`). Render via `<TechLogo name="..." label="..." brandColor="#XXXXXX" />`. Default render is monochrome `currentColor`; brand color shows on hover.
- **Section refs:** Intro/Outcomes/Work each take a `sectionRef: RefObject<HTMLDivElement>` prop — page.tsx owns the refs; a scroll listener marks the active section as the last one whose top has passed 30% of the viewport (an IntersectionObserver threshold can't register the very tall Work section). Hero no longer takes a sectionRef (it owns its own measurement via `Canvas`).
- **Dimension annotations:** use `<Canvas>` + `<Ruler>` from `@/components/canvas`. `Canvas` provides the coordinate space guidelines extend across; `Ruler` wraps the annotated element and exposes `Ruler.Guideline` (dashed alignment line, requires `Canvas` ancestor) and `Ruler.Target` (px bracket). Both share dims via React context — no prop drilling.
- **Page frame:** `--sidebar` and `--content` live on `:root` in `globals.css`; `.main-column` centers content in the viewport and clears the fixed sidebar. Use it for anything that must line up with the cards (main, footer).
- **Side-project demos.** `src/lib/demos/<project>/` holds files copied verbatim from that project's repo (only import paths touched) plus a dated data snapshot — prompt-fighter and crosscheck run their real code; rarebrew is a UI recreation over a data snapshot (no vendored code). Refresh by re-copying, not by editing in place. Demos render in the project's own visual language (its tokens, fonts), not the portfolio's.
- **Side-project cards** (rarebrew.gg, prompt fighter, crosscheck). Design record: `docs/superpowers/specs/2026-10-07-side-project-cards-design.md`.
  - Each card dresses in its project's language (rarebrew: dark/gold, Space Grotesk; prompt fighter: arcade cabinet, pixel font, scanlines; crosscheck: newsprint, letter tiles). Don't pull them toward the portfolio's slate/teal.
  - **Cursor effects** are mouse-only (`useFinePointer`), live behind the card content so the demo's opaque panels cover them, and must never re-render the demo: drive them with CSS variables (rarebrew parallax) or memoize the demo element (`useMemo(() => <Demo />, [])`).
  - **Autoplay** runs once when a demo scrolls into view (deal-in + card tour / build a fighter / type a clue), cancels on *any* input inside the demo (pointer, key, wheel, focus), and under `prefers-reduced-motion` the demo just starts in its finished state.
  - **No layout shift.** A demo's height may not change while it runs: reserve space (fixed-height logs and reveal areas, always-rendered meters, Build/Arena share one grid cell).
  - **Data is snapshotted, not fetched** — except crosscheck's Datamuse call, which only fires once the phone is on screen. prompt-fighter players' prompts are private in the app: only the seed-pool prompts I wrote (`seeds.ts`) may appear.
- **BeforeAfterReveal:** the drag handle accepts `initial` (0–100). Vary it across tiles for visual interest (current values: 75/62/32). Pair with `<Image fill object-cover>` inside a fixed-height container.

## Design Requirements

- **This site must be responsive.** All layouts, components, and spacing must work across mobile, tablet, and desktop. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) whenever creating separate elements or adjusting spacing. Never hardcode pixel widths or layouts that break on small screens.

## Things NOT to do

- **Don't recreate `/work/<slug>/page.tsx` case-study pages.** They were deleted on purpose — see `.claude/projects/.../memory/case_studies_deprecated.md` (host-side memory). Tiles in `Work.tsx` are the full presentation; no "Read the case study →" links.
- Don't add inline tag/badge spans — use `Tag`.
- Don't suggest installing `@svgr/webpack` for the brand logos — `TechLogo`'s mask-image trick covers the use case without a build dep.
- **Don't invent facts in copy** — status pills ("Live", "Active"), stats, or claims about a project that aren't verified. They were removed as hallucinations once already.
- Don't put `mix-blend-mode` inside a wrapper that has `opacity`, `z-index`, or `isolate` — the blend isolates against nothing and renders as a flat wash (why the foil sheen and two spotlight attempts failed).

## Visual verification

Playwright MCP tools work against the dev server (must be running on :3000). Repo-root `*.png` files are gitignored (`/*.png`) so screenshots from a verification pass don't pollute the tree.
