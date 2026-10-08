/**
 * Pattern parser + matcher. Pure; unit-tested in test/pattern.test.ts.
 * Grammar is documented on SolveRequest in contract.ts.
 */

export interface Constraint {
  pattern?: string;
  length?: number;
  letters?: string;
}

export interface ParseResult extends Constraint {
  error?: string;
}

const UNKNOWN = /[?_.\-*]/g;
const STRIP = /[\s'’"“”,()]/g;

/**
 * Letters only ("sc") → soft letters constraint.
 * Any unknown marker ("sc_d.", "?i??") → positional pattern.
 * Digits only ("5") → length.
 */
export function parsePattern(raw: string): ParseResult {
  const s = raw.trim();
  if (!s) return {};
  if (/^\d+$/.test(s)) {
    const n = Number(s);
    if (n < 1 || n > 30) return { error: 'Length must be between 1 and 30' };
    return { length: n };
  }
  const stripped = s.replace(STRIP, '');
  const positional = UNKNOWN.test(stripped);
  UNKNOWN.lastIndex = 0;
  const cleaned = stripped.toUpperCase().replace(UNKNOWN, '?');
  const bad = cleaned.match(/[^A-Z?]/);
  if (bad) return { error: `Can't use "${bad[0]}" here` };
  if (!cleaned) return {};
  if (cleaned.length > 30) return { error: 'Too long' };
  if (!positional) return { letters: [...new Set(cleaned)].join('') };
  return { pattern: cleaned, length: cleaned.length };
}

/** Distinct letters of `letters` that appear in the grid-form answer. */
export function letterHits(grid: string, letters?: string): number | undefined {
  if (!letters) return undefined;
  let n = 0;
  for (const ch of letters) if (grid.includes(ch)) n++;
  return n;
}

/** Grid form: A–Z only. "rip current" → "RIPCURRENT". */
export function toGrid(display: string): string {
  return display.toUpperCase().replace(/[^A-Z]/g, '');
}

/** null when unconstrained, otherwise whether the grid-form answer fits. */
export function fits(grid: string, c: Constraint): boolean | null {
  if (!c.pattern && !c.length) return null;
  if (c.length && grid.length !== c.length) return false;
  if (!c.pattern) return true;
  for (let i = 0; i < c.pattern.length; i++) {
    const ch = c.pattern[i];
    if (ch !== '?' && ch !== grid[i]) return false;
  }
  return true;
}

/** Datamuse `sp` form: lowercase, `?` per unknown. Length-only → "?????". */
export function toDatamuseSp(c: Constraint): string | undefined {
  if (c.pattern) return c.pattern.toLowerCase();
  if (c.length) return '?'.repeat(c.length);
  return undefined;
}
