import type { MoveEffect } from './types'
import type { PressureTrack } from './victory'

interface Beat {
  attacker: string
  defender: string
  move: string
  effect: MoveEffect
  damage: number
  heal: number
  missed: boolean
  lethal: boolean
}

/**
 * Templated narration. The creative work already happened upstream — the model
 * named the fighter and its moves — so stitching those names into a verb is
 * enough to read well, and it costs nothing per fight.
 */
export function narrate(b: Beat): string {
  if (b.missed) {
    return `${b.attacker} winds up ${b.move} — and whiffs.`
  }

  if (b.lethal) {
    return `${b.move} lands clean. ${b.defender} goes down.`
  }

  switch (b.effect) {
    case 'damage':
      return `${b.attacker} connects with ${b.move} for ${b.damage}.`
    case 'heavy':
      return `${b.move} comes down hard — ${b.damage} to ${b.defender}.`
    case 'heal':
      return b.heal > 0
        ? `${b.attacker} steadies with ${b.move}, recovering ${b.heal}.`
        : `${b.attacker} tries ${b.move}, but there's nothing left to mend.`
    case 'guard':
      return `${b.attacker} sets ${b.move}, bracing for the next hit.`
    case 'drain':
      return `${b.move} bites for ${b.damage} and feeds ${b.heal} back to ${b.attacker}.`
    case 'stun':
      return `${b.move} rattles ${b.defender} for ${b.damage}.`
  }
}

export function stunnedText(name: string): string {
  return `${name} is still shaking it off.`
}

export function hesitateText(name: string): string {
  return `${name} is slow off the mark.`
}

/**
 * The beat where a meter caps. Deliberately vague about *what* just happened —
 * victoryText names it a line later, and the gap between the two reads well.
 */
export function pressureText(track: PressureTrack, winner: string, loser: string): string {
  switch (track) {
    case 'crowd':
      return `The room belongs to ${winner} now. ${loser} is talking to nobody.`
    case 'hex':
      return `Something goes quiet and wrong around ${winner}. ${loser} stops being a factor.`
    case 'fate':
      return `The odds, the lighting, and the paperwork all tilt toward ${winner}. ${loser} never had it.`
  }
}

export function selfHarmText(name: string, amount: number, reason: 'overheat' | 'stamina'): string {
  return reason === 'overheat'
    ? `The effort costs ${name} ${amount}.`
    : `${name} is running out of wind — ${amount} lost.`
}
