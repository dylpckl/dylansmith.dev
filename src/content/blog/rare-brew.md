---
slug: rare-brew
title: "rare-brew, in cuts"
summary: "A handful of features and design decisions from a touch-first Magic: The Gathering deck builder."
publishedAt: 2026-05-18
heroEyebrow: "Project notes"
tags: [mobile, next.js, supabase, mtg, pwa]
sections:
  - id: stacked-list-view
    title: "Stacked-list view replaced a too-clever grid"
    category: "Mobile UX"
    accent: teal
    screenshot: /blog/rare-brew/stacked-list-view.png
    tags: [mobile, list-ux]
  - id: auto-hide-chrome
    title: "Auto-hide chrome, borrowed from YouTube"
    category: "Mobile UX"
    accent: teal
    screenshot: /blog/rare-brew/auto-hide-chrome.png
    tags: [scroll, mobile]
  - id: insights-bento-drill-in
    title: "Insights bento with drill-in overlays"
    category: "Interaction pattern"
    accent: orange
    screenshot: /blog/rare-brew/insights-bento.png
    tags: [bento, data-viz]
  - id: two-shells-same-data
    title: "Two shells, same data"
    category: "Architecture"
    accent: slate
    screenshot: /blog/rare-brew/two-shells.png
    tags: [responsive, architecture]
  - id: commander-rules-done-right
    title: "Commander rules done right"
    category: "Domain modeling"
    accent: orange
    screenshot: /blog/rare-brew/commander-rules.png
    tags: [mtg, domain]
  - id: bulk-migration
    title: "Bulk migration from Moxfield and Archidekt"
    category: "Data import"
    accent: teal
    screenshot: /blog/rare-brew/bulk-migration.png
    tags: [import, desktop]
  - id: boards-as-bottom-nav
    title: "Boards as bottom nav"
    category: "Mobile UX"
    accent: teal
    screenshot: /blog/rare-brew/boards-as-bottom-nav.png
    tags: [navigation, mobile]
  - id: control-bar-redesign
    title: "The four-control build bar"
    category: "Mobile UX"
    accent: orange
    screenshot: /blog/rare-brew/control-bar.png
    tags: [controls, mobile]
---

Rare-brew started as a selfish project. I wanted to build a Magic deck on my phone, on the bus, without fighting a desktop layout shoved into a small viewport. What follows isn't a postmortem or a roadmap — it's a few specific decisions worth writing down, mostly so I remember why I made them.

## Stacked-list view replaced a too-clever grid

The first cut of the mobile build screen was a tight grid of card thumbnails. It looked great in mockups and felt terrible on a phone. The grid forced two-finger zooming to read mana costs, and tapping a card to swap-in a different one took at least three interactions.

The stacked-list view collapsed all of that. One card per row, full name, mana cost, type line, all readable at arm's length. A long-press opens swap actions. Boring on paper — but it's the only mobile build view I'd actually use myself. The grid stuck around as an option, but the default switched to the list within a week.

## Auto-hide chrome, borrowed from YouTube

The header and bottom nav slide out of the way when you scroll down, and snap back in when you reverse. This is a YouTube pattern (and Twitter, and many others) — but most deck builders don't bother, and on a 6-inch screen the difference is real estate you can actually feel.

It's also surprisingly fiddly to get right. The trigger isn't "scroll position" — it's "scroll velocity and direction" — and it has to gracefully handle bouncing at the top, overscroll at the bottom, and a user who flicks-and-stops mid-list. About two days of work to get the feel right, and now it's the kind of thing I forget is even there.

## Insights bento with drill-in overlays

The deck insights view is a bento dashboard: mana curve, color identity, type breakdown, EDHREC overlap, all visible at once. Each tile is tappable — but instead of *navigating* to a detail page, the tile expands into a full-bleed overlay over the bento. You glance, drill in, dismiss, glance again.

This came from realizing I never actually wanted to *leave* the build view to check stats. The detail-page pattern that desktop dashboards use breaks the mental thread. Overlay-on-top keeps the deck I'm editing one tap away.

## Two shells, same data

Desktop and mobile share a database, a query layer, and a card model. They do *not* share a shell. Mobile gets a single stacked list with focused gestures; desktop gets a multi-column canvas where each column has its own sort, filter, and drag-to-reorder.

The temptation in a responsive app is to make one layout collapse gracefully to the other. I tried that for about a week before admitting that a phone and a 27" monitor are not the same device with different breakpoints — they're different *categories* of use. The desktop canvas is for arranging, comparing, sorting. The mobile shell is for editing one card at a time on a bus.

## Commander rules done right

Magic's Commander format has rules most builders model approximately. Partner pairs let you have two commanders with combined color identity. Companions sit outside the deck but their build-restriction has to validate the deck. Basic-land quantities need FAB-style increment controls because they're the most-edited cards in any deck.

These are not glamorous features. But the bar for "this app actually understands Commander" is that *all* of these work, and most apps cut one. I spent a week on this and would do it again — it's the difference between a deck builder and a card-list editor.

## Bulk migration from Moxfield and Archidekt

The first feature that felt like a product, not a toy. Paste a CSV from your existing collection, get a working deck on the other side. Normalization is harder than it sounds — different sources spell card names differently, encode quantities differently, treat tokens differently — but once it works, switching to rare-brew stops feeling like a chore.

The desktop-only restriction was deliberate. You don't bulk-import a 100-card collection on your phone; you do it once at a laptop and never again.

## Boards as bottom nav

Most deck builders treat sideboard / maybeboard / considering / etc. as a sub-tab inside the main deck view. I flipped that: each board is a top-level destination, switched via a bottom nav. Build, sideboard, maybe, archived — same gesture, same hit target, no nested navigation.

The unlock is that switching boards feels like switching apps rather than poking around inside one. Once you've used it for an hour the nested-tab version feels claustrophobic.

## The four-control build bar

The mobile build screen has exactly four primary controls at the bottom: add card, search, sort, more. Anything beyond those four lives in `more`, and most users never need to open it.

Earlier versions tried to surface six, then eight, then a configurable bar. They all felt cluttered. The four-control split came from watching myself and a friend actually use the app — the same four operations cover ~95% of build-screen actions. The rest is fine being one tap deeper.

---

Future cuts: shareable decks, EDHREC-driven suggestions in the build view, accessibility audit. Those aren't built yet, so they're not here.
