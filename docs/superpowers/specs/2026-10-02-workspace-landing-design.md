# Workspace landing page — design spec

**Date:** 2026-10-02
**Status:** approved in brainstorm (Slate default, squared frames); revised 2026-10-03: Outcomes back to its own frame, solid Paper fills

## Goal

Make the landing page communicate three things a skimmer gets in 90 seconds and a senior peer can click into: core principles, accomplishments as receipts for those principles, and real links to the work and the writing. The visual concept is "the site as a workspace": a design tool's furniture (grid, edge rulers, labeled frames, a panel-styled nav) without any tool chrome. It stays a page you scroll.

Two audiences: hiring managers (landing page, snappy and visual) and senior peers (blog, one click away).

## Decisions already made

- **Furniture only.** No pan/zoom, no select-to-inspect. Normal vertical scroll.
- **Two materials, one layout.** Slate (dark, default) is the current sleek look. Paper (light) is a notebook: warm paper, graph grid, ink. Same components, swapped tokens.
- **The teal Ruler stays** and is promoted from one-off to signature: frames, section labels, and the existing `Canvas`/`Ruler` annotations all use the accent token.
- **Frames squared up.** No horizontal stagger.
- **Outcomes stays its own frame.** Folding it into Principles was tried and rejected as too crowded; Principles is three short cards with a proof link each.
- **Sidebar is the existing nav** (sections, blog, resume, socials) restyled as a tool panel, plus one addition: the material toggle.
- **Only rare-brew is writable.** Day-job tiles get live-product links, not posts. Proof links on principles point into rare-brew post sections.

## Page structure

Five frames, in order. Each frame is a labeled, bordered region on the canvas with corner marks and a mono label (`NAME · W × H`, measured live from the frame's own box).

| Frame id | Label | Content |
|---|---|---|
| `intro` | Intro | Current Hero: name, tagline with the measured `pixel-perfect`, "Leading design at SmartAdvocate", mobile-only resume/social buttons. |
| `principles` | Principles | James Clear quote. Three principle cards: icon, title, claim, proof link. Tools logo row and skills tags below. |
| `outcomes` | Outcomes | The stats bento as before: two Features with graphics, two StatTiles. |
| `work` | Work | Four tiles as today. Every tile has a link row: day-job tiles link to the live product; rarebrew links to notes and the live site. No tile is dead. |
| `writing` | Writing | List of blog posts from the loader: title, category of the first section, summary. Link to `/blog`. |

### Principle cards (content)

| Principle | Claim | Proof link |
|---|---|---|
| The details matter | Small details compound over large surfaces to make a big difference. | `/blog/rare-brew#section-control-bar-redesign` ("The four-control build bar") |
| Solutions over tools | Work backwards from the blue-sky result. Systems support the solution, not the other way around. | `/blog/rare-brew#section-stacked-list-view` ("Stacked list replaced a too-clever grid") |
| Be kind to your future self | Document the why and leave clever breadcrumbs. | `/blog/rare-brew#section-two-shells-same-data` ("Two shells, same data") |

Stats and graphics live in the Outcomes frame, unchanged from before.

### Sidebar (desktop, `lg+`)

Sticky left column, panel-styled: mono labels, grouped lists, accent-colored active row with a `▸` marker.

1. Wordmark: "Dylan Smith" (links home).
2. **Sections:** Intro, Principles, Outcomes, Work, Writing. Active state from the existing IntersectionObserver.
3. **Elsewhere:** Blog, Resume ↓, GitHub ↗, LinkedIn ↗.
4. **Material:** Slate / Paper segmented toggle.

### Mobile (`< lg`)

"Preview mode." Rulers hidden. Frames go full width with their labels. A sticky top strip holds the wordmark, a Blog link, and the material toggle. Hero keeps its resume/social buttons. No bottom nav.

## Workspace furniture

- **Grid.** Fixed background layer. Slate: the current dot grid. Paper: graph-paper lines. Driven by material tokens.
- **Rulers (`lg+`).** A top ruler spanning the canvas, sticky to the viewport top, with ticks and x-coordinate labels every 100px measured from the canvas left edge. A left ruler, sticky, full viewport height, with y-coordinate labels that track document scroll (transform on a label track, passive scroll listener, rAF-throttled). Pure decoration, `aria-hidden`.
- **Frames.** `<Frame id label sectionRef>`: bordered section, corner marks, label chip reading `LABEL · W × H` from `useDimensions`. Replaces `VerticalText` + `SectionLabel` on the landing page.
- **Mountain photo.** Stays in Slate behind everything as today. Hidden in Paper.

## Materials (theming)

- `next-themes` (already a dependency) with `attribute="data-material"`, `themes={["slate","paper"]}`, `defaultTheme="slate"`, `enableSystem={false}`. Persists to localStorage.
- Tokens are CSS custom properties as RGB triplets on `:root, [data-material="slate"]` and overridden on `[data-material="paper"]`. Tailwind exposes them as semantic colors with alpha support: `paper`, `ink`, `ink-2`, `ink-3`, `ink-4`, `line`, `frame`, `accent`, `accent-ink` (text on an accent fill), `panel`, `surface`, `surface-2`, `grid`, `ruler`, `lav`.
- Landing components and shared primitives (Header, Tile, Tag, Button, SocialLink, BeforeAfterReveal, Canvas/Ruler, CountUp, the visuals) move from literal `slate-*`/`teal-*` classes to the semantic tokens.
- **Fills** (`card`, `card-strong`, `frame-fill`) are full CSS colors, not triplets: translucent over the photo in Slate, solid in Paper, because translucent surfaces over graph paper were hard to read.
- **Blog pages stay Slate for now.** Their page wrapper sets `data-material="slate"` so the global toggle can't half-theme them. Retheming the blog for Paper is a follow-up.

### Token values

| Token | Slate | Paper |
|---|---|---|
| paper (page) | `#0f172a` | `#f4f0e6` |
| ink | `#f1f5f9` | `#1c1a17` |
| ink-2 | `#cbd5e1` | `#33302b` |
| ink-3 | `#94a3b8` | `#6b6761` |
| ink-4 | `#64748b` | `#938e85` |
| line | `#94a3b8` @ low alpha | `#1c1a17` @ low alpha |
| frame | `#94a3b8` | `#1c1a17` |
| accent | `#5eead4` | `#0f8f82` |
| accent-ink | `#134e4a` | `#f4f0e6` |
| panel | `#0b1324` | `#ece7db` |
| surface | `#1e293b` | `#ffffff` |
| surface-2 | `#334155` | `#e9e4d8` |
| grid | `#334155` | `#466eaa` (used at low alpha) |
| ruler | `#64748b` | `#6b6761` |
| lav | `#c4b5fd` | `#7c6fcd` |

## Data flow

`src/app/page.tsx` becomes a server component that loads posts with `getAllPosts()` and renders `<Landing posts={…} />`. `Landing` (client) owns the five section refs and the IntersectionObserver, and renders `Header`, `Workspace`, and the five frames. The Writing frame receives a trimmed `PostSummary[]` (slug, title, summary, category).

## Files

New: `src/components/workspace/{Workspace,Frame,Rulers,MaterialToggle}.tsx`, `src/components/landing/{Landing,Principles,Writing}.tsx`, `src/components/ThemeProvider.tsx`.
Changed: `page.tsx`, `layout.tsx`, `globals.css`, `tailwind.config.js`, `Header.jsx` (becomes `Header.tsx`), `Hero.tsx`, `Work.tsx`, `Tile.tsx`, `Tag.tsx`, `Button.tsx`, `BeforeAfterReveal.tsx`, canvas `Target.tsx` + `style.css`, blog page wrappers, `CLAUDE.md`.
Removed from the landing: `Intro.tsx` (split into `Principles.tsx` and the Hero). `Outcomes.tsx` drops its section wrapper and keeps its bento.

## Out of scope

Blog retheme for Paper. Bottom nav on mobile. Any new blog posts or screenshots. Deleting orphan components (`Feature`, `StatTile`, `VerticalText`, `SectionLabel`) that lose their last landing-page caller.

## Verification

`npx tsc --noEmit`, `npm run lint`, `npm run build`. Playwright screenshots of `/` at 1440 and 400 wide in both materials, plus `/blog/rare-brew` in Paper to confirm it stays Slate.
