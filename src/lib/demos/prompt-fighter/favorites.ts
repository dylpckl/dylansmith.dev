/**
 * What being somebody's favorite is worth in the ring.
 *
 * Every player gets exactly one favorite (see `supabase/migrations/0005`), and a
 * fighter's count feeds one thing: the `crowd` pressure track. That is the
 * narrow choice, not an arbitrary one. Crowd is already the meter driven by
 * Presence — the room, the cards, the judges — so a fan base pushing it is the
 * same mechanic with more people behind it. Favorites deliberately do *not*
 * touch `hex` or `fate` (nobody's supporters make you better at curses or at
 * paperwork) and deliberately do not touch anything physical: the body budget
 * has been frozen since 0001 and popularity is not a reason to thaw it.
 *
 * The two properties that keep this from being pay-to-win:
 *
 *  - It multiplies a *push*, so it cannot start one. `pressurePush` returns zero
 *    for a fighter sitting on the Presence floor, and any multiple of zero is
 *    zero. A hundred favorites on a fighter with nothing to say is worth exactly
 *    nothing, provably. Favorites amplify a build; they are not a build.
 *
 *  - It is asymptotic, not linear and not stepped. Same reasoning as
 *    `wilResistance` in victory.ts: a fraction that saturates gives honest
 *    diminishing returns and can never cross its ceiling, so no amount of
 *    farming — and the cap on farming is best-effort, see the migration — buys
 *    more than `FAVORITE_CEILING`. The first favorite is worth more than the
 *    fiftieth, which is also the right shape socially.
 */

/**
 * The most the crowd can ever be worth, as a multiple of the meter's normal
 * rate. Approached, never reached.
 *
 * 1.5 sounds enormous next to `TRACK_RATE.crowd` and isn't, because it is the
 * limit of a curve nobody reaches: it takes `FAVORITE_HALF` favorites to get
 * halfway there. At the counts a real fighter sees — a handful — this is a few
 * percent, and a fighter would need a following in the hundreds before the
 * ceiling is even close.
 */
export const FAVORITE_CEILING = 1.5

/**
 * Favorites for half the maximum boost. This is the whole tuning dial: raising
 * it flattens the curve, lowering it front-loads it.
 *
 * At 12, one favorite is worth ~4% on the crowd meter and five are worth ~15%.
 * That is meant to read as "the room is a bit louder for this one", not as a
 * stat line — a popular fighter who did not buy Presence still cannot cap
 * anything, and a committed one who nobody has heard of still can.
 */
export const FAVORITE_HALF = 12

/**
 * Crowd-meter multiplier for a fighter with `favorites` favorites.
 *
 * Returns exactly 1 for zero favorites, so every fight that predates this
 * feature resolves identically — the multiplication is a no-op, not a rounding
 * difference. Junk input (negative, NaN, a missing column on an old row) reads
 * as no support rather than throwing, on the same principle as `spiritOf`.
 */
export function crowdSupport(favorites: number | undefined | null): number {
  if (!Number.isFinite(favorites as number)) return 1
  const n = Math.max(0, favorites as number)
  return 1 + (FAVORITE_CEILING - 1) * (n / (n + FAVORITE_HALF))
}

/** The boost as a percentage, for the UI. `0` when nobody has favorited. */
export function crowdSupportPercent(favorites: number | undefined | null): number {
  return Math.round((crowdSupport(favorites) - 1) * 100)
}
