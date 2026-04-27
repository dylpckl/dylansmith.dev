# Design System — Intake

Page: `src/app/work/design-system/page.tsx`
Status: scaffolded, awaiting content

Fill these in (any depth — sentences or bullets, doesn't matter). I'll polish + wire into the page.

---

## OVERVIEW

### timeline
e.g. "~12 months, June 2024 – present"

→ ANSWER:

### tools & methods — token pipeline
The page asks: "Style Dictionary? hand-sync? Figma variables → Tailwind config?"

→ ANSWER (be honest — this is a JD "plus" item; we want to claim only what's true):

### the problem (1-line + 2-4 sentences)
What was fragmented before? What did one-off UI cost the org? Why did this need to exist?

→ 1-line:

→ 2-4 sentences:

### outcome (with at least one number)
What shipped? Adoption %, components count, regressions avoided, time-to-ship reduction.

→ ANSWER:

---

## DESIGN PROCESS

### research — discovery
How did you map the existing UI surface area? Audit of inconsistencies. Talking to engineers about what they kept rebuilding.

→ ANSWER:

### research — competitive / reference systems
Which design systems did you study (Polaris, Carbon, Material, etc.)? What did you take/leave?

→ ANSWER:

### ui audit — framing
1-2 sentences on what you found across the legacy ASP.NET surface.

→ ANSWER:

### ui audit — insight #1 (heading + 2-3 sentences)
e.g. "inconsistent spacing"

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
Walk through the keystone components. Show variants, states, and the decisions behind them.

→ ANSWER:

### documented states & a11y
How you documented interaction states + WCAG. (This is the "state modeling, demonstrated in shipped work" requirement — important.)

→ ANSWER:

---

## SYSTEM CONTRIBUTION

### from one-off to reusable
1-2 concrete examples of feature work that you abstracted into reusable system primitives. Where else are they used now?

→ EXAMPLE 1:
→ EXAMPLE 2:

### adoption
How the system spread. Which teams adopted first, the contribution model, how you kept it the easy + right path.

→ ANSWER:

---

## IMPLEMENTATION

### design intent → production code
The legacy ASP.NET / DevExpress shipping story. Backwards-compatible CSS / JS / C#. How the system landed without regressions.

→ ANSWER:

### documentation
The single source of truth. Confluence pages, component docs, API references.

→ ANSWER:

---

## SCREENSHOTS

Drop into: `public/case-studies/design-system/`

Suggested filenames (the page already references these):

- [ ] `hero.png` — opening visual (full system overview, component grid, or Figma library shot)
- [ ] `audit.png` — UI audit findings visualization
- [ ] `tokens.png` — token architecture diagram
- [ ] `components.png` — component grid / library
- [ ] `states.png` — state matrix or annotated component states

Other useful (but not yet referenced):

- [ ] `confluence.png` — documentation source-of-truth shot
- [ ] `before-after.png` — legacy vs redesigned comparison
- [ ] anything else that helps tell the story
