Vendored from github.com/dylpckl/prompt-fighter so the portfolio demo runs the app's real logic.

- `rng.ts`, `favorites.ts`, `narrate.ts`, `victory.ts`, `types.ts`, `sim.ts` — copied from
  `src/lib/engine/`. Keep in sync by re-copying; don't edit in place beyond import paths.
- `roster.ts` — six fighters from the live pool (arena opponents). Name, title, stats,
  moves, flaw, sprite and record only — never prompts.
- `seeds.ts` — the 12 seed-pool fighters (`scripts/seed-pool.ts`) with the prompts I
  wrote and the output Claude generated for them. These are the only prompts that may
  appear in the portfolio: players' prompts are private in the app.

Refresh the snapshots from the prompt-fight Supabase project's `fighters` table
(wake the project first if it's paused).
