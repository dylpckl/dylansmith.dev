Vendored from github.com/dylpckl/crosscheck so the portfolio demo runs the app's real logic.

- `pattern.ts`, `rank.ts`, `contract.ts` — copied from `src/`.
- `crosswordese.ts` (corpus, from `src/data/`) and `findClued.ts` (from `src/providers/crosswordese.ts`).
- `datamuse.ts` — `src/providers/datamuse.ts` with the fetch wrapper removed; the demo does its own fetch.

The 1.4MB clue bank is deliberately left out. Keep in sync by re-copying; don't edit in
place beyond import paths.
