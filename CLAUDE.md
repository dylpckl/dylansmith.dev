# dylansmith.dev

Personal portfolio site. Single-page landing for case studies, plus a `/blog/[slug]` devlog format for long-form project timelines.

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
    sitemap.ts                # XML sitemap (root + /blog + each post)
    blog/
      page.tsx                # /blog index — lists all posts
      [slug]/
        page.tsx              # /blog/[slug] — single post
        opengraph-image.tsx   # auto-generated OG image (Next ImageResponse)
  components/
    landing/                  # one file per landing section
      Hero.tsx
      Intro.tsx               # First Principles + Tools/Languages + Practices
      Outcomes.tsx            # the only bento on the page
      Work.tsx                # case-study tiles (drag reveals)
      visuals/                # inline graphics (MiniSystemDemo, OneOffConsolidation, ManaCurve, ScatteredFiles)
    bento/                    # reusable bento primitives (Tile, Feature, Support, StatTile, BeforeAfterReveal, MiniTokenStrip, StateChips)
    blog/                     # BlogHero, SectionCard, PostCard
    canvas/                   # Canvas + Ruler compound: dimension annotations (guidelines + px brackets) shared via React context
    Tag.tsx                   # Tag + TagGroup — the canonical chip/badge component
    TechLogo.tsx              # mask-based brand SVG with hover-colorize via per-element --brand var
    Header.jsx                # sticky sidebar nav; tracks activeSection from page.tsx
  content/
    blog/<slug>.md            # one MD file per post — frontmatter + prose
  lib/
    blog/                     # types, post loader (gray-matter), body parser
public/
  case-studies/<slug>/legacy.png + refreshed.png   # before/after pairs
  blog/<slug>/<section-id>.png                     # per-section screenshots
  logos/<simple-icons-name>.svg                    # CC0 brand SVGs
```

Section flow on the landing page: **Hero → Intro → Outcomes → Work**.

## Conventions

- **Tags/chips:** always use [`Tag`](src/components/Tag.tsx) (`intent: default|teal|orange`, `size: xs|sm|md`, `variant: solid|tinted`) and `TagGroup` for arrays. Don't add new inline tag styles.
- **Tile:** [`Tile`](src/components/bento/Tile.tsx) takes optional `label`, `labelIcon`, `tags`, plus a discriminated variant (`href`, `onClickModal`, or `decorative`). Header collapses entirely when neither label nor tags are passed. Use `decorative` for non-clickable tiles.
- **Brand logos:** drop SVGs from [simpleicons.org](https://simpleicons.org) (CC0) into `public/logos/` named with the simple-icons slug (e.g. `nextdotjs.svg`). Render via `<TechLogo name="..." label="..." brandColor="#XXXXXX" />`. Default render is monochrome `currentColor`; brand color shows on hover.
- **Section refs:** Intro/Outcomes/Work each take a `sectionRef: RefObject<HTMLDivElement>` prop — page.tsx owns the refs and forwards them so the `IntersectionObserver` can highlight the sidebar nav. Hero no longer takes a sectionRef (it owns its own measurement via `Canvas`).
- **Dimension annotations:** use `<Canvas>` + `<Ruler>` from `@/components/canvas`. `Canvas` provides the coordinate space guidelines extend across; `Ruler` wraps the annotated element and exposes `Ruler.Guideline` (dashed alignment line, requires `Canvas` ancestor) and `Ruler.Target` (px bracket). Both share dims via React context — no prop drilling.
- **BeforeAfterReveal:** the drag handle accepts `initial` (0–100). Vary it across tiles for visual interest (current values: 75/62/32). Pair with `<Image fill object-cover>` inside a fixed-height container.

## Design Requirements

- **This site must be responsive.** All layouts, components, and spacing must work across mobile, tablet, and desktop. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) whenever creating separate elements or adjusting spacing. Never hardcode pixel widths or layouts that break on small screens.

## Blog (`/blog/[slug]`)

Feature-focused project writeups. Each post is a handful of specific features and design decisions — not a timeline, not a postmortem. Distinct from the `Work.tsx` case-study tiles: tiles are the curated marketing presentation; blog posts go deep on individual cuts.

- **One post per project.** Lives at `src/content/blog/<slug>.md`. Frontmatter holds structured data (sections, hero stats, tags); body is prose with `## headings` matching `sections[].id` (slugified).
- **Sections, not chapters.** Each `section` has a `category` (e.g., "Mobile UX", "Architecture", "Domain modeling"), a `title`, and prose. They're not chronological — order them however reads best.
- **No git artifacts in served HTML.** Posts never render raw SHAs, real commit dates, or branch names. When a target repo is private, those live only in `.blog-data/<slug>.private.json` (gitignored, never imported by the Next app). The boundary is physical: the loader at `src/lib/blog/posts.ts` has no code path that reads `.blog-data/`.
- **Voice:** first-person Dylan. Personal, opinionated, no marketing puff.
- **Adding a new post:** drop a `.md` file into `src/content/blog/`, screenshots into `public/blog/<slug>/<section-id>.png`. Loader handles the rest — sitemap, OG image, route params all derive from the file's presence. Screenshots that don't exist on disk are silently dropped from the rendered section (no broken images).
- **Extraction skills (planned):** `/blog-draft` (proposes section titles + drafts prose from a target repo) and `/blog-capture` (captures screenshots from prior commits). Both are Claude Code skills, not npm scripts.

## Things NOT to do

- **Don't recreate `/work/<slug>/page.tsx` case-study pages.** They were deleted on purpose — see `.claude/projects/.../memory/case_studies_deprecated.md`. Tiles in `Work.tsx` are the full marketing presentation. The blog (`/blog/<slug>`) is a different artifact — feature-focused project notes, not a curated case study — and is the right place to link out to.
- Don't add inline tag/badge spans — use `Tag`.
- Don't suggest installing `@svgr/webpack` for the brand logos — `TechLogo`'s mask-image trick covers the use case without a build dep.
- Don't put SHAs, real commit dates, or branch names in any file under `src/content/blog/` or `src/lib/blog/` — those ride along into the static HTML and leak private-repo metadata.

## Visual verification

Playwright MCP tools work against the dev server (must be running on :3000). Repo-root `*.png` files are gitignored (`/*.png`) so screenshots from a verification pass don't pollute the tree.
