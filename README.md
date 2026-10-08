# dylansmith.dev

My portfolio — a single landing page: intro, principles, outcomes, case studies,
and side projects with live demos.

## Built with

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Lucide icons ·
deployed on Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build      # stop the dev server first — both write .next
```

## Side-project demos

The Work section ends with three side-project cards, each with a working demo:

- **rarebrew.gg** — a recreation of the app's mobile deck view, driven by a snapshot of one of my decks.
- **prompt fighter** — the game's real fight engine and fighter data, including a replay of building a fighter.
- **crosscheck** — the real crossword solver, with live Datamuse results.

Code copied from those repos lives in `src/lib/demos/<project>/`; each folder's README
says what's in it and how to refresh it. Design decisions are recorded in
`docs/superpowers/specs/2026-10-07-side-project-cards-design.md`.

## Working on this repo

`CLAUDE.md` holds the layout map and the conventions (tags, tiles, logos, the page frame,
side-project card rules) — read it before changing components.
