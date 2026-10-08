import type { Answer, SolveRequest } from './contract';
import { CROSSWORDESE } from './crosswordese';
import { rankAnswers } from './rank';

export const NAME = 'Crosswordese';

/**
 * Filler that carries no clue meaning. Kept short on purpose: a crossword
 * clue is already terse, so stripping too much leaves nothing to match on.
 */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'of', 'in', 'on', 'for', 'to', 'at', 'by', 'with', 'and',
  'or', 'is', 'it', 'its', 'as', 'from', 'that', 'this', 'be', 'was', 'were',
  'so', 'e', 'g', 'eg', 'ie',
]);

/**
 * Lowercase, split on anything that isn't a letter or digit, drop filler, and
 * fold a trailing plural `s`. Both the query and the stored clues go through
 * this, so "Greek letters" and "greek letter" reduce to the same token.
 */
export function tokenize(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!raw || STOPWORDS.has(raw)) continue;
    const word = raw.length > 3 && raw.endsWith('s') && !raw.endsWith('ss') ? raw.slice(0, -1) : raw;
    if (!out.includes(word)) out.push(word);
  }
  return out;
}

/**
 * How well one stored clue answers the query, or null for no match.
 *
 * The rule is deliberately strict: every content word of the query must
 * appear in the clue. "old coin" matches "old french coin"; "coin" alone
 * does not match "old coin", because a setter writing "coin" did not ask
 * for an old one. Precision is then how much of the clue the query used up,
 * so an exact phrase beats a clue with extra words in it.
 *
 * Returning null rather than a weak score matters — a crossword helper that
 * pads the grid with near-misses is worse than one that says nothing.
 */
export function clueScore(queryTokens: string[], clue: string): number | null {
  if (queryTokens.length === 0) return null;
  const clueTokens = tokenize(clue);
  if (clueTokens.length === 0) return null;
  for (const q of queryTokens) if (!clueTokens.includes(q)) return null;
  return queryTokens.length / clueTokens.length;
}

/**
 * Score floor for a stock-clue hit. A match here is direct evidence about
 * crossword convention, which is better evidence than Datamuse's semantic
 * nearness, so even a loose match lands mid-table rather than at the bottom
 * — and an exact phrase reaches 1, tying Datamuse's best, where the ranker's
 * shorter-answer tiebreak puts the three-letter fill on top.
 */
const FLOOR = 0.6;

/**
 * Pure lookup over the bundled corpus. Deliberately not an AnswerProvider:
 * it is local and synchronous, so the orchestrator can paint its results
 * before the network providers have even been called.
 */
export function findClued(req: SolveRequest): Answer[] {
  const queryTokens = tokenize(req.query);
  const hits: Answer[] = [];
  for (const entry of CROSSWORDESE) {
    let best: number | null = null;
    for (const clue of entry.c) {
      const s = clueScore(queryTokens, clue);
      if (s !== null && (best === null || s > best)) best = s;
    }
    if (best === null) continue;
    hits.push({
      answer: entry.a,
      display: entry.a.toLowerCase(),
      length: entry.a.length,
      score: FLOOR + (1 - FLOOR) * best,
      // An exact stock clue is evidence of the same kind as a clue-bank hit:
      // this phrasing is the one setters use for this answer. A partial match
      // is not, so it competes on score alone against Datamuse — otherwise
      // every loose hit would outrank a good association.
      priority: best === 1 ? 1 : 0,
      fitsPattern: null,
      gloss: entry.g,
      source: 'crosswordese',
    });
  }
  return rankAnswers(hits, req);
}
