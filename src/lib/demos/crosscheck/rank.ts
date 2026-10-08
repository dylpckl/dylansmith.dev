import type { Answer, SolveRequest } from './contract';
import { fits, letterHits } from './pattern';

/**
 * Re-derive the constraint-dependent fields and order for a set of answers.
 * Pure, so the UI can re-rank instantly when the letters change without a
 * refetch, and the cache can store answers independent of the view.
 */
export function rankAnswers(answers: Answer[], req: SolveRequest): Answer[] {
  return answers
    .map((a) => ({ ...a, fitsPattern: fits(a.answer, req), letterHits: letterHits(a.answer, req.letters) }))
    .sort(
      (a, b) =>
        Number(b.fitsPattern === true) - Number(a.fitsPattern === true) ||
        (b.letterHits ?? 0) - (a.letterHits ?? 0) ||
        (b.priority ?? 0) - (a.priority ?? 0) ||
        b.score - a.score ||
        a.length - b.length,
    );
}

/**
 * Fold several providers' answers into one list: dedupe on grid form, keep
 * the best score, and prefer a stock crossword gloss over a dictionary one
 * when both describe the same answer (for OLEO under "butter substitute",
 * the conventional reading is the useful one).
 */
export function mergeAnswers(answers: Answer[]): Answer[] {
  const seen = new Map<string, Answer>();
  for (const a of answers) {
    const prev = seen.get(a.answer);
    if (!prev) {
      seen.set(a.answer, a);
      continue;
    }
    const clued = prev.source === 'crosswordese' ? prev : a.source === 'crosswordese' ? a : null;
    const winner = a.score > prev.score ? a : prev;
    seen.set(a.answer, {
      ...winner,
      gloss: clued?.gloss ?? winner.gloss ?? prev.gloss ?? a.gloss,
      partOfSpeech: winner.partOfSpeech ?? prev.partOfSpeech ?? a.partOfSpeech,
      // Evidence does not cancel out: an answer both published for this clue
      // and merely associated with it is still published for this clue.
      priority: Math.max(prev.priority ?? 0, a.priority ?? 0),
    });
  }
  return [...seen.values()];
}

/**
 * Trim a ranked list for display without starving rare lengths.
 *
 * A flat "top N" is what hid three-letter fill before: the answers a setter
 * actually wants for short entries score poorly on semantic nearness, so
 * they fell off the end and the length filter had no 3 to offer. So after
 * the top `limit`, keep going far enough down the list to carry a few
 * answers of every length that exists. They stay last in rank order — they
 * are there so the length filter has something to show.
 */
export function capAnswers(ranked: Answer[], limit = 40, floorPerLength = 4): Answer[] {
  const head = ranked.slice(0, limit);
  const counts = new Map<number, number>();
  for (const a of head) counts.set(a.length, (counts.get(a.length) ?? 0) + 1);
  const tail: Answer[] = [];
  for (const a of ranked.slice(limit)) {
    const n = counts.get(a.length) ?? 0;
    if (n >= floorPerLength) continue;
    counts.set(a.length, n + 1);
    tail.push(a);
  }
  return [...head, ...tail];
}
