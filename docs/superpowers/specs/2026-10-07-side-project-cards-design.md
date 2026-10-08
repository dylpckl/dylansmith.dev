# Side-project cards — design record

**Date:** 2026-10-07 · **PR:** #31 (`feat/side-project-demos`, branched from `main`)

## Goal

Link to real projects and show that I'm actively building. Each project gets a
full-width card in the Work section with a working demo of the project, not a
screenshot.

## What shipped

Three cards below the case-study tiles, in this order:

| Card | Look | Demo | Cursor effect | Autoplay on scroll-in |
|---|---|---|---|---|
| **rarebrew.gg** | Dark `#121212`, gold `#E0A83C`, Space Grotesk / DM Sans. Commander art bleeds out of the copy column; five deck cards fan out behind the phone. | Recreated mobile deck view (stacked-deck rows, type tabs with scroll-spy, expand-in-place, DFC flip, insights sheet with drag-to-dismiss). | Parallax: art drifts against the cursor, fan opens and leans toward it. | Stack deals in, then a tour taps four cards open in turn (tap ripple, ~2.4s hold, Sygg auto-flips), then collapses. |
| **prompt fighter** | Arcade cabinet: stepped bezel, red border, scanlines, Press Start 2P title, 16px graph-paper grid, roster strip, hi-score line. | **Build** (seed prompts type in → Generate → the fighter Claude made draws in) and **Arena** (the real seeded sim; Replay seed reproduces a fight). | Pixel trail: grid cells light red under the cursor and fade. | Prompts type, Generate fires, fighter reveals. |
| **crosscheck** | Newsprint: CROSSCHECK spelled in letter tiles over a double rule, column rule, serif notes; crossword grid behind the phone. | The real solver: pattern parser + ranker + crosswordese corpus locally, Datamuse live. | Active crossword cell + row on the grid. | Clue types into the field, answer tiles flip in. |

Each card ends in a large CTA to the live project.

## Decisions

- **Real code, in the project's own clothes.** prompt-fighter and crosscheck
  vendor their actual logic into `src/lib/demos/<project>/` (verbatim, import
  paths only). rarebrew's value is its mobile UI, so it's a recreation driven
  by a data snapshot. Copy says so — no claim that every demo runs project code.
- **Directions were picked on a canvas.** Three directions per card were
  mocked; the chosen mixes were rarebrew art-bleed + card-fan, prompt fighter
  cabinet + pixel-grid, crosscheck newsprint + grid-motif.
- **Snapshots over live calls.** Card data, fighters and deck are static so the
  demos never depend on a backend being awake. Only crosscheck hits a network
  API (Datamuse, keyless, browser-direct), and only once visible.
- **Prompt privacy.** prompt-fighter never shows another player's prompts, so
  the builder only replays the 12 seed fighters whose prompts I wrote.
- **Light Party is trimmed to 100.** The live build is 103; three basic Plains
  were dropped so the demo shows a legal deck (noted in `deck.ts`).
- **Show, don't badge.** "Tap a card"-style hint chips were tried and replaced
  by autoplay — the demo performing an interaction reads as interactive
  without UI chrome.
- **No invented status.** "Live" / "Active" pills and rarebrew mana pips were
  removed: they were claims, not facts.

## Tried and dropped

- **Foil sheen on rarebrew** — first over the whole demo side (washed the
  phone), then on the fan only; rejected both times.
- **Gold spotlight on rarebrew** — two builds rendered invisibly or barely:
  `background-attachment: fixed` across two stacking contexts, then a
  `mix-blend-mode` inside a z-indexed overlay (isolated, so no blend).
  Replaced by parallax, which uses plain transforms.
- **Small "side project" cards in a grid** — the first pass; replaced with
  full-width cards so the demos have room.

## Constraints the cards must keep

- No layout shift while a demo runs (fixed-height reveal/log areas, meters
  always rendered, Build/Arena share one grid cell).
- Cursor effects: mouse-only, behind content, no demo re-renders.
- Autoplay: once, cancels on any input, final state under reduced motion.
- Responsive to 320px (titles and tile mastheads flex; no horizontal scroll).

## Known risks

- The hosted prompt fighter app runs on a free-tier Supabase project, which
  pauses after about a week without traffic; the "Play prompt fighter" CTA then
  lands on a broken app. Visits keep it awake; restoring it is one click in the
  Supabase dashboard.
- Scryfall images are hotlinked from `cards.scryfall.io`, as rarebrew does.
