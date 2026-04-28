# Site-wide UI Refresh — Intake

Page: `src/app/work/design-system/page.tsx`
Status: scaffolded, awaiting content

This case study covers the **site-wide UI refresh** — the project that produced the design system, not a specific feature. The refresh was unveiled at the annual user conference; the design system is the artifact that made it possible.

Fill these in (any depth — sentences or bullets, doesn't matter). I'll polish + wire into the page.

---

## OVERVIEW

### timeline
e.g. "~12 months, June 2024 – {month} 2025, unveiled at the {year} annual user conference"

→ ANSWER:

### tools & methods — token pipeline
The page asks: "Style Dictionary? hand-sync? Figma variables → Tailwind config?"

→ ANSWER (be honest — this is a JD "plus" item; we want to claim only what's true):

### the problem (1-line + 2-4 sentences)
The product needed a refresh, but the org had no system to refresh it *on*. Frame the problem as "why the refresh and the system had to ship together."

→ 1-line:

→ 2-4 sentences (years of UI debt, fragmented patterns, why piecemeal wouldn't scale):

### outcome (with at least one number)
The refresh was unveiled at the annual user conference. Lead with what shipped: surfaces refreshed, components in production, regressions avoided, adoption.

→ ANSWER:

---

## DESIGN PROCESS

### research — discovery
How did you map the existing UI surface area before the refresh? Audit of inconsistencies. Talking to engineers about what they kept rebuilding.

→ ANSWER:

### research — competitive / reference systems
Which design systems did you study (Polaris, Carbon, Material, etc.)? What did you take/leave?

→ ANSWER:

### ui audit — framing
1-2 sentences on what the audit found across the legacy ASP.NET surface — what was driving the need for the refresh.

→ ANSWER:

### ui audit — insight #1 (heading + 2-3 sentences)
e.g. "inconsistent spacing across surfaces"

→ HEADING:
→ 2-3 SENTENCES:

### ui audit — insight #2 (heading + 2-3 sentences)
→ HEADING:
→ 2-3 SENTENCES:

### token architecture
The token layers — primitive → semantic → component. Where the source of truth lives. How tokens flow from Figma to code.

→ ANSWER:

---

## THE SYSTEM

### components
The keystone components that powered the refresh. Variants, states, decisions behind them.

→ ANSWER:

### documented states & a11y
How you documented interaction states + WCAG. (This is the JD's "state modeling, demonstrated in shipped work" requirement — important.)

→ ANSWER:

---

## SYSTEM CONTRIBUTION

### from one-off to reusable
1-2 concrete examples where one-off UI work during the refresh got abstracted into reusable system primitives. Where else are they used now?

→ EXAMPLE 1:
→ EXAMPLE 2:

### adoption
How the system spread beyond the refresh itself. Which teams adopted first, the contribution model, how you kept it the easy + right path.

→ ANSWER:

---

## IMPLEMENTATION

### design intent → production code
The legacy ASP.NET / DevExpress shipping story. Backwards-compatible CSS / JS / C#. How the refresh landed without regressions.

→ ANSWER:

### documentation
The single source of truth. Confluence pages, component docs, API references.

→ ANSWER:

---

## SCREENSHOTS

Drop into: `public/case-studies/design-system/`

Suggested filenames (the page already references these):

- [ ] `hero.png` — opening visual (refreshed surface, before/after split, or component grid)
- [ ] `audit.png` — UI audit findings visualization
- [ ] `tokens.png` — token architecture diagram
- [ ] `components.png` — component grid / library
- [ ] `states.png` — state matrix or annotated component states

Other useful (but not yet referenced):

- [ ] `confluence.png` — documentation source-of-truth shot
- [ ] `before-after.png` — legacy surface vs refreshed surface
- [ ] `conference.png` — anything from the user conference unveiling
- [ ] anything else that helps tell the refresh story

