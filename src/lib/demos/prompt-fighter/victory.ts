// How a fight was won, as opposed to who won it.
//
// Everything here is a *label* derived from a finished fight. Classification
// runs after the sim loop, reads only the final state, and never touches
// `winner` or `decision` — so adding a victory type can't change the outcome of
// a fight, and every seed that existed before still resolves identically.
//
// The pressure section below is the one place that reads a mechanic rather than
// inventing one: the sim decides whether a meter capped, this file only decides
// what to call it. Same rule as ever — nothing here can flip a result.
//
// The flavour draws below come from their own RNG stream, seeded off the fight
// seed but separate from it, for the same reason: consuming from the sim's
// stream would shift every subsequent roll and silently rewrite history.

import { makeRng } from './rng'
import { SPIRIT_MIN } from './types'
import type { FlawEffect, Side, SpiritKey, SpiritStats } from './types'

export const VICTORY_TYPES = [
  // Decisive
  'ko',
  'overkill',
  'ring_out',
  'perfect',
  'absorption',
  'self_destruct',
  'double_ko',
  // The opponent never really showed up
  'no_show',
  'disqualification',
  // The fight went the distance
  'decision',
  'attrition',
  'retirement',
  'hunger',
  // Nobody's fault
  'act_of_god',
  'paperwork',
  // Pressure: crowd. Won on presence, in front of witnesses.
  'political',
  'seduction',
  'wedding',
  'filibuster',
  'roast',
  'recruitment',
  'endorsement',
  'litigation',
  'union',
  'sermon',
  'heckle',
  // Pressure: hex. Won on weirdness.
  'enchantment',
  'curse',
  'polymorph',
  'banishment',
  'possession',
  'soul_trade',
  'summoning',
  'time_loop',
  'dream',
  'erasure',
  // Pressure: fate. Won by circumstance, admin, or nobody in particular.
  'nepotism',
  'mistaken_identity',
  'market_crash',
  'existential',
  'forfeit',
  'no_contest',
] as const

export type VictoryType = (typeof VICTORY_TYPES)[number]

/** Short banner text. Kept to two words so it fits the result panel. */
export const VICTORY_LABELS: Record<VictoryType, string> = {
  ko: 'Knockout',
  overkill: 'Overkill',
  ring_out: 'Ring-out',
  perfect: 'Perfect',
  absorption: 'Absorption',
  self_destruct: 'Self-destruct',
  double_ko: 'Double KO',
  no_show: 'No-show',
  disqualification: 'Disqualification',
  decision: 'Decision',
  attrition: 'Attrition',
  retirement: 'Retirement',
  hunger: 'Hunger',
  act_of_god: 'Act of God',
  paperwork: 'Paperwork',
  political: 'Politics',
  seduction: 'Seduction',
  wedding: 'Wedding',
  filibuster: 'Filibuster',
  roast: 'Roast',
  recruitment: 'Recruitment',
  endorsement: 'Endorsement',
  litigation: 'Litigation',
  union: 'Union action',
  sermon: 'Sermon',
  heckle: 'Heckled out',
  enchantment: 'Enchantment',
  curse: 'Curse',
  polymorph: 'Polymorph',
  banishment: 'Banishment',
  possession: 'Possession',
  soul_trade: 'Soul trade',
  summoning: 'Summoning',
  time_loop: 'Time loop',
  dream: 'Dream',
  erasure: 'Erasure',
  nepotism: 'Nepotism',
  mistaken_identity: 'Mistaken identity',
  market_crash: 'Market crash',
  existential: 'Existential',
  forfeit: 'Forfeit',
  no_contest: 'No contest',
}

// ---------------------------------------------------------------------------
// Pressure — the non-physical way to win.
// ---------------------------------------------------------------------------

/**
 * Three meters that fill alongside HP. `cha` works the room, `arc` works the
 * universe, `luk` works the paperwork — and the opponent's `wil` drags on all
 * three at once. Cap a meter and the bout stops there and then, whatever the
 * health bars say.
 */
export const PRESSURE_TRACKS = ['crowd', 'hex', 'fate'] as const

export type PressureTrack = (typeof PRESSURE_TRACKS)[number]

/** Which spirit stat pushes each track. `wil` is on the other side of all of them. */
export const TRACK_SOURCE: Record<PressureTrack, SpiritKey> = {
  crowd: 'cha',
  hex: 'arc',
  fate: 'luk',
}

/** Where a meter caps. 100 so a meter reads straight off as a percentage. */
export const PRESSURE_THRESHOLD = 100

/**
 * Only what you spent *above the floor* pushes. `SPIRIT_MIN` is what a fighter
 * has when the description gave the generator nothing to work with, so a track
 * sitting on the floor is worth exactly nothing — provably, whatever the
 * opponent's `wil` is. That keeps "this fight is purely physical" a property of
 * the numbers rather than a tuning accident.
 */
export function pressurePush(source: number): number {
  return Math.max(0, source - SPIRIT_MIN)
}

/**
 * How hard `wil` leans back, as a fraction of what would otherwise accrue.
 *
 * Deliberately fractional rather than subtractive. Subtracting `wil` from the
 * pusher's stat gave a dead zone with a hard edge: a fight only runs so many
 * beats, so any deficit below a certain size could never cap a meter inside one,
 * which made a large enough `wil` *absolute* immunity and switched the mechanic
 * off for that bout entirely. That turned half the spirit budget into a binary
 * hard counter to a mechanic worth a large slice of outcomes.
 *
 * A fraction can't do that. Resolve slows a meter — a lot, at the ceiling — but
 * it never stops one, so pushing harder always buys something and stacking
 * Resolve has honest diminishing returns instead of a cliff.
 *
 * Raised from 4 alongside the retune below. The two are the same adjustment seen
 * from either end: 4 meant a merely *average* Resolve — the 5 a backfilled row
 * carries, the 4-6 the generator hands anyone whose description isn't about
 * being stubborn — already cut an incoming meter almost in half, which is most
 * of why the mechanic read as dead. Resolve should be something you buy on
 * purpose, not something you get for free by not spending elsewhere. At 5 a
 * middling `wil` still slows a meter by a third and a maximal one still cuts it
 * by nearly two thirds; see scripts/pressure-rates.ts for what that's worth.
 */
export const WIL_SOFTENING = 5

export function wilResistance(wil: number): number {
  return WIL_SOFTENING / (WIL_SOFTENING + Math.max(0, wil - SPIRIT_MIN))
}

/**
 * Points per beat per point of push, per track, before resistance and noise.
 *
 * A fight runs at most `MAX_ACTIONS_PER_SIDE` beats a side and — this is the
 * part the previous numbers got wrong — most end on health well short of that,
 * around eight or nine beats a side. These were sized against the *ceiling*
 * rather than the median, so a meter had roughly half the runway in practice
 * that it was tuned for, and the whole mechanic sat at the bottom of its bar
 * looking decorative: a typical fight peaked somewhere near a quarter and only a
 * near-maximal spirit line against near-zero Resolve ever finished one.
 *
 * Set now so a capped meter is about as common an ending as a knockout across
 * the spreads the generator actually produces — measured, not estimated, over
 * 20k fights a population in scripts/pressure-rates.ts. Crowd/hex/fate together
 * land near 40% of fights against 40% knockouts on lopsided-to-moderate lines,
 * and the run it replaced was 12%. The spread between the three tracks is
 * cosmetic and deliberate: crowd should edge the other two so the most legible
 * ending is also the most frequent one.
 *
 * These are a *ratio* to `PRESSURE_THRESHOLD` and to the median fight length,
 * not absolute numbers. Anything that shortens fights — a damage-curve change, a
 * lower HP floor — shortens the runway too and quietly turns pressure back down.
 * Re-run the harness after touching either.
 */
export const TRACK_RATE: Record<PressureTrack, number> = {
  crowd: 1.95,
  hex: 1.9,
  fate: 1.84,
}

/** Per-beat noise, so two identical stat lines don't cap on the same beat every time. */
export const PRESSURE_JITTER_MIN = 0.8
export const PRESSURE_JITTER_MAX = 1.2

/**
 * How receptive the room is *tonight*, drawn once per fight and applied to every
 * meter on both sides. Per-beat jitter averages out over a bout and leaves each
 * pair of spirit lines with a near-deterministic verdict; one fight-long draw is
 * what turns "caps / never caps" into a probability. It is also what stops a
 * maximal Resolve build from being arithmetically untouchable: on a hot night a
 * committed pusher can still get there.
 *
 * The exponent is what controls the *shape* of stat-dependence, and it turned
 * out to matter more than the rates. Squared, the draw bunched hard at the quiet
 * end, so nearly every fight got close to the same cool night and the verdict
 * for a given pair of spirit lines was very nearly deterministic — which meant
 * capping a meter behaved like a threshold rather than a probability. That is
 * what produced the cliff the retune was chasing: measured across random
 * opponents, Presence 8 capped something 15% of the time and Presence 6 capped
 * 2.8%, so anything short of all-in was effectively playing a different game.
 *
 * At 1.35 the draw still leans quiet — the median night is a little under 1.2,
 * so a fighter who didn't buy in still doesn't cap anything — but there is
 * enough spread left that one point of a spirit stat moves a *rate* instead of
 * flipping a switch. Same measurement, same opponents, now 39% and 13%: a real
 * gap that rewards commitment, on a slope rather than a step.
 */
export const PRESSURE_MOOD_MIN = 0.7
export const PRESSURE_MOOD_MAX = 2.0
export const PRESSURE_MOOD_CURVE = 1.35

export function pressureMood(roll: number): number {
  return (
    PRESSURE_MOOD_MIN + (PRESSURE_MOOD_MAX - PRESSURE_MOOD_MIN) * Math.pow(roll, PRESSURE_MOOD_CURVE)
  )
}

/** Salt for the jitter stream. The sim's own rng never sees a pressure draw. */
export const PRESSURE_SALT = 0x9e3779b9

/** Salt for the pool draw. Separate again, for the same reason. */
export const PRESSURE_FLAVOUR_SALT = 0x2545f491

/** What capping each track can be reported as. */
export const PRESSURE_POOLS: Record<PressureTrack, readonly VictoryType[]> = {
  crowd: [
    'political',
    'seduction',
    'wedding',
    'filibuster',
    'roast',
    'recruitment',
    'endorsement',
    'litigation',
    'union',
    'sermon',
    'heckle',
  ],
  hex: [
    'enchantment',
    'curse',
    'polymorph',
    'banishment',
    'possession',
    'soul_trade',
    'summoning',
    'time_loop',
    'dream',
    'erasure',
  ],
  fate: ['nepotism', 'mistaken_identity', 'market_crash', 'existential', 'forfeit', 'no_contest'],
}

/** Both sides this charming and it stops being a fight on its own. */
export const WEDDING_CHA = 8

/**
 * Which flavour a capped track reads as. Own stream again, one draw, always —
 * and the loser's profile rotates the pool, so two fighters who cap the same
 * track on the same seed still don't go out the same way.
 */
export function classifyPressure(
  track: PressureTrack,
  seed: number,
  winner: SpiritStats,
  loser: SpiritStats,
): VictoryType {
  const flavour = makeRng((seed ^ PRESSURE_FLAVOUR_SALT) >>> 0)
  const roll = flavour()

  // Nobody was ever going to lose this one.
  if (track === 'crowd' && winner.cha >= WEDDING_CHA && loser.cha >= WEDDING_CHA) return 'wedding'

  const pool = PRESSURE_POOLS[track]
  const shift = winner.cha * 3 + winner.wil * 5 + winner.arc * 7 + winner.luk * 11 + loser.wil * 13
  return pool[(Math.floor(roll * pool.length) + shift) % pool.length]
}

/** The slice of a fighter's fight-long tally that classification cares about. */
export interface VictorySideView {
  hp: number
  maxHp: number
  /** Damage dealt to the opponent. Excludes self-harm. */
  damageDealt: number
  /** Damage taken *from the opponent*. Excludes self-harm, so `perfect` means untouched. */
  damageTaken: number
  /** Of `damageDealt`, how much came from drain moves. */
  drainDealt: number
  /** Health lost to overheat and stamina. */
  selfHarm: number
  landed: number
  missed: number
  actions: number
  atk: number
  def: number
  flaw: FlawEffect
  /** The spirit four, for reading a pressure win. */
  spirit: SpiritStats
}

export interface VictoryInput {
  winner: Side
  decision: boolean
  seed: number
  /** Effect and damage of the fight's final action, for the finisher checks. */
  finalBlow: { actor: Side; effect: string; damage: number } | null
  sides: Record<Side, VictorySideView>
  /** The track the winner capped, or null when HP settled it. */
  pressure: PressureTrack | null
}

const OVERKILL_FRACTION = 0.4
const ABSORPTION_FRACTION = 0.6
const ATTRITION_FRACTION = 0.15
const RING_OUT_GAP = 4
const WILD_MISSES_FOR_DQ = 3
const ACT_OF_GOD_CHANCE = 0.03
const PAPERWORK_CHANCE = 0.08
/**
 * "Wasn't trying" has to be a genuinely rare read, or it eats every decision
 * that happened to be low-scoring. Both bars must be cleared: almost nothing
 * landed, and what did land barely registered.
 */
const LISTLESS_DAMAGE_PER_ACTION = 2
const LISTLESS_MIN_ACTIONS = 6
const LISTLESS_MAX_LANDED = 4

/**
 * First match wins, so the order is specificity-descending: the weird readings
 * get first refusal, and `ko` / `decision` are the fallbacks that always match.
 */
export function classifyVictory(input: VictoryInput): VictoryType {
  const { winner, decision, sides, finalBlow } = input
  const w = sides[winner]
  const l = sides[winner === 'a' ? 'b' : 'a']

  // Own stream, drawn unconditionally so the draw count never depends on a
  // branch. Two numbers, always, whatever the fight did.
  const flavour = makeRng(input.seed ^ 0x5f375a86)
  const chaosRoll = flavour()
  const paperworkRoll = flavour()

  // A capped meter outranks every mechanical read below, act_of_god included:
  // whatever just happened, somebody very much did do it on purpose.
  if (input.pressure) return classifyPressure(input.pressure, input.seed, w.spirit, l.spirit)

  if (chaosRoll < ACT_OF_GOD_CHANCE) return 'act_of_god'

  if (!decision) {
    if (w.hp === 0 && l.hp === 0) return 'double_ko'

    // The sim lets a fighter finish itself with overheat or stamina. When the
    // loser's own action was the last thing to happen, that's what occurred.
    if (l.hp === 0 && finalBlow?.actor !== winner) return 'self_destruct'

    if (l.flaw === 'slow_start' && l.landed === 0) return 'no_show'
    if (l.flaw === 'wild' && l.missed >= WILD_MISSES_FOR_DQ) return 'disqualification'

    if (
      finalBlow?.effect === 'heavy' &&
      w.atk - l.def >= RING_OUT_GAP
    ) {
      return 'ring_out'
    }
    if (finalBlow && finalBlow.damage >= l.maxHp * OVERKILL_FRACTION) return 'overkill'

    if (w.damageDealt > 0 && w.drainDealt >= w.damageDealt * ABSORPTION_FRACTION) {
      return 'absorption'
    }
    if (w.damageTaken === 0) return 'perfect'

    return 'ko'
  }

  if (paperworkRoll < PAPERWORK_CHANCE) return 'paperwork'

  if (w.hp <= w.maxHp * ATTRITION_FRACTION) return 'attrition'
  if (l.flaw === 'stamina' && l.selfHarm > 0) return 'retirement'
  if (
    l.actions >= LISTLESS_MIN_ACTIONS &&
    l.landed <= LISTLESS_MAX_LANDED &&
    l.damageDealt < l.actions * LISTLESS_DAMAGE_PER_ACTION
  ) {
    return 'hunger'
  }

  return 'decision'
}

/**
 * One line for the result panel. Same contract as narrate.ts — the model
 * already did the naming, so stitching those names into a sentence is enough.
 */
export function victoryText(type: VictoryType, winner: string, loser: string): string {
  switch (type) {
    case 'ko':
      return `${loser} does not get back up. ${winner} takes it.`
    case 'overkill':
      return `That was more than enough. Somebody check on ${loser}.`
    case 'ring_out':
      return `${winner} launches ${loser} clean off the stage. Row four caught them.`
    case 'perfect':
      return `${loser} never laid a hand on ${winner}. Not once.`
    case 'absorption':
      return `There's noticeably less of ${loser} than there was. ${winner} looks well.`
    case 'self_destruct':
      return `${winner} barely had to move — ${loser} came apart entirely on their own.`
    case 'double_ko':
      return `Both of them go down together. The count gives it to ${winner}.`
    case 'no_show':
      return `${loser} never really turned up. ${winner} wins against a rumour.`
    case 'disqualification':
      return `${loser} hit the referee, the timekeeper, and a support column. Disqualified.`
    case 'decision':
      return `Full distance, no knockdown. The cards go to ${winner}.`
    case 'attrition':
      return `${winner} is standing, technically, and that's the whole requirement.`
    case 'retirement':
      return `${loser} retires mid-bout, citing the knees. ${winner} respects it.`
    case 'hunger':
      return `${loser} ordered food in round three and lost interest. ${winner} advances.`
    case 'act_of_god':
      return `The lighting rig comes down between them. Officials award it to ${winner}.`
    case 'paperwork':
      return `${loser}'s fighting licence lapsed nine days ago. ${winner} wins on the filing.`

    // Crowd
    case 'political':
      return `${winner} has the room, and the room has the judges. ${loser} is outvoted.`
    case 'seduction':
      return `${loser} forgets entirely what this was about. They leave together, coats over shoulders.`
    case 'wedding':
      return `The fight stops; the seating plan starts. ${winner} proposed first and is awarded the bout.`
    case 'filibuster':
      return `${winner} holds the floor for eleven unbroken minutes. The clock runs out on ${loser}.`
    case 'roast':
      return `${winner} says one short thing about ${loser}'s stance. ${loser} leaves.`
    case 'recruitment':
      return `${loser} is now on ${winner}'s side, effective immediately and with real enthusiasm.`
    case 'endorsement':
      return `${loser} signs a sponsorship mid-round and leaves for the shoot. ${winner} waves them off.`
    case 'litigation':
      return `${loser} is served in the ring. The cease-and-desist ends the bout on the spot.`
    case 'union':
      return `${winner} organizes the arena staff. The bout is halted pending negotiation.`
    case 'sermon':
      return `${loser} kneels, converts, and forfeits. ${winner} lets them keep the gear bag.`
    case 'heckle':
      return `The crowd turns on ${loser} in the fourth. They leave in tears, slowly.`

    // Hex
    case 'enchantment':
      return `${winner} points once. ${loser} spends the rest of the round hitting themselves.`
    case 'curse':
      return `The hex lands late, as hexes do. ${loser} drops with health to spare.`
    case 'polymorph':
      return `${loser} is now a goose. The goose does not answer the count.`
    case 'banishment':
      return `${loser} is removed from this plane. The referee counts to ten anyway.`
    case 'possession':
      return `${winner} borrows ${loser}'s body for a moment and forfeits on their behalf.`
    case 'soul_trade':
      return `${winner} bought it during the walkout. ${loser} no longer wishes to fight anyone.`
    case 'summoning':
      return `${winner} calls up something considerably bigger. It handles the rest.`
    case 'time_loop':
      return `${winner} already won this, about four minutes ago. Everyone else catches up.`
    case 'dream':
      return `The whole bout was ${loser}'s. ${winner} wakes them, gently, and it ends.`
    case 'erasure':
      return `${loser} was never entered in this bracket. There is no ${loser}.`

    // Fate
    case 'nepotism':
      return `The promoter is ${winner}'s parent. The decision takes no time at all.`
    case 'mistaken_identity':
      return `The wrong fighter was announced. ${winner} wins on the technicality and says nothing.`
    case 'market_crash':
      return `The arena's sponsor collapses mid-round. ${winner} was short. ${loser} was long.`
    case 'existential':
      return `${loser} works out that none of this matters and sits down. ${winner} remains standing.`
    case 'forfeit':
      return `${loser} simply leaves. No statement, no gear bag, no return.`
    case 'no_contest':
      return `Nobody can explain what happened here. ${winner} is credited with it regardless.`
  }
}
