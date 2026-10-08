/**
 * Crosscheck — data model contract.
 *
 * This file is the single source of truth for the shapes that flow between
 * the UI, the provider adapters, the cache, and (later) the optional Claude
 * proxy. Every provider normalizes its raw API response into these types;
 * the UI never sees a raw upstream payload.
 *
 * Rules:
 *  - `Answer.answer` is always grid form: A–Z only, uppercase, no spaces.
 *  - `SolveRequest.pattern` is always normalized: uppercase letters + `?`.
 *  - Partial failure is normal. A SolveResult can have answers but no
 *    definition, or vice versa. Errors are collected, never thrown past
 *    the orchestrator.
 */

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

/** What the user typed, after normalization. */
export interface SolveRequest {
  /** Trimmed, whitespace-collapsed user input. 1–120 chars. */
  query: string;
  /**
   * Optional answer shape. Normalized to uppercase A–Z and `?` for unknown
   * letters, e.g. "SC?D?". Spaces are never present here (grid form).
   * Omitted when the user gave no constraint.
   */
  pattern?: string;
  /**
   * Required answer length in letters. Derived from `pattern.length` when a
   * pattern is present, or set directly when the user typed only a number
   * (e.g. "5"). Omitted when unconstrained.
   */
  length?: number;
  /**
   * Letters the user already has, any order, deduped and uppercase: "SC".
   * A soft constraint: answers are ranked by how many of these they contain
   * and matching tiles are highlighted, nothing is filtered out. Applied
   * client-side only, so it never changes what is fetched or cached.
   */
  letters?: string;
}

/**
 * Pattern input grammar (what the parser accepts before normalization):
 *   - Letters only:   "sc"                     → letters="SC" (soft, any order)
 *   - Any of `?` `_` `.` `-` `*` present       → positional pattern, e.g.
 *                                                "sc_d." → pattern="SC?D?"
 *   - Digits only:    "10"                     → length=10
 *   - Spaces / punctuation                     → stripped (multi-word answers
 *                                                are matched letters-only)
 * Anything else is a validation error, not a silent drop.
 */

// ---------------------------------------------------------------------------
// Answers (the crossword side)
// ---------------------------------------------------------------------------

export type AnswerSource = 'datamuse' | 'crosswordese' | 'cluebank' | 'claude';

export interface Answer {
  /** Grid form: "RIPCURRENT". Used for pattern matching, dedupe, and tiles. */
  answer: string;
  /** Human form as the provider gave it: "rip current". */
  display: string;
  /** `answer.length` — cached for sorting and the length badge. */
  length: number;
  /**
   * Relevance relative to the best answer in this result: 1 for the top
   * answer, lower for the rest. Not a probability and not comparable across
   * queries. Datamuse returns an unscaled integer `score` whose only meaning
   * is ordering within one response; this is that score divided by the
   * highest score in the response. Claude answers set this themselves.
   */
  score: number;
  /** The provider's raw score, for display. Datamuse: the unscaled integer. */
  rawScore?: number;
  /**
   * Tier of evidence, sorted before `score` and defaulting to 0. It exists
   * because `score` is only comparable within one provider: Datamuse's best
   * association always normalizes to 1, which says nothing about whether it
   * beats an answer a published puzzle actually used for this exact clue.
   * Raise it only for evidence of that kind — the clue bank sets 1.
   */
  priority?: number;
  /**
   * true  → matches `SolveRequest.pattern`/`length`
   * false → does not match (UI dims it, sorts it last)
   * null  → request had no constraint
   */
  fitsPattern: boolean | null;
  /**
   * How many of `SolveRequest.letters` this answer contains (distinct letters).
   * Undefined when no letters were given.
   */
  letterHits?: number;
  /**
   * One-line "why": a short definition (Datamuse), the stock gloss for a
   * conventional answer (Crosswordese), or reasoning (Claude).
   */
  gloss?: string;
  /** Datamuse tags: "n", "v", "adj", "adv", "prop" (proper noun). */
  partOfSpeech?: string[];
  source: AnswerSource;
}

// ---------------------------------------------------------------------------
// Definition (the dictionary side)
// ---------------------------------------------------------------------------

export type DefinitionSource = 'dictionaryapi' | 'wiktionary' | 'datamuse';

export interface Sense {
  partOfSpeech?: string;
  /** Plain text. HTML from Wiktionary is stripped before it lands here. */
  definition: string;
  example?: string;
  synonyms?: string[];
}

export interface Definition {
  /** The headword the provider actually matched (may differ in case). */
  term: string;
  /** IPA or provider phonetic string, e.g. "/taɪd/". */
  phonetic?: string;
  /** Pronunciation audio, if any. Played on tap; never autoplayed. */
  audioUrl?: string;
  /** Ordered senses. Capped at 6 by the adapter; UI shows 3 + "more". */
  senses: Sense[];
  source: DefinitionSource;
  /** Link to the provider's page for this term, for attribution. */
  sourceUrl?: string;
}

// ---------------------------------------------------------------------------
// Reference / web (the "what is this" side, for phrases and proper nouns)
// ---------------------------------------------------------------------------

export interface Reference {
  title: string;
  /** Plain-text summary, first paragraph. Truncated to ~400 chars by the adapter. */
  extract: string;
  /** Canonical page URL. */
  url: string;
  thumbnailUrl?: string;
  /**
   * 'disambiguation' means the query matched a list page; the UI shows the
   * extract but labels it and offers the search links more prominently.
   */
  kind: 'standard' | 'disambiguation';
  source: 'wikipedia';
}

/** Outbound search links. Always present, never require a network call. */
export interface SearchLink {
  /** Short label: "Google", "DuckDuckGo", "Wordplays", "Wikipedia". */
  label: string;
  url: string;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export type ErrorKind =
  | 'offline'    // navigator.onLine false or fetch failed with no response
  | 'network'    // fetch threw (DNS, CORS, TLS)
  | 'timeout'    // aborted by our own AbortController
  | 'http'       // non-2xx that isn't a clean "not found"
  | 'ratelimit'  // 429
  | 'parse';     // 2xx but the body wasn't the shape we expect

export interface ProviderError {
  provider: string;
  kind: ErrorKind;
  message: string;
  status?: number;
}

// ---------------------------------------------------------------------------
// The one object the UI renders
// ---------------------------------------------------------------------------

export interface SolveResult {
  request: SolveRequest;
  /**
   * Deduped by `answer`, sorted: fitsPattern desc, letterHits desc, score desc, length asc.
   * Capped at 24. Empty array is a valid, renderable result ("no matches").
   */
  answers: Answer[];
  /** null when no provider had a definition (common for multi-word phrases). */
  definition: Definition | null;
  /** null when Wikipedia has no page. */
  reference: Reference | null;
  /** Never empty — built locally from the query. */
  links: SearchLink[];
  /** Partial failures. Empty when everything succeeded. */
  errors: ProviderError[];
  /** Epoch ms when the result was assembled. */
  fetchedAt: number;
  /** true when served from the result cache without hitting the network. */
  fromCache: boolean;
}

// ---------------------------------------------------------------------------
// Provider adapter interface
// ---------------------------------------------------------------------------

/**
 * Every upstream API is wrapped in one of these. The orchestrator runs all
 * providers for a request in parallel with Promise.allSettled, converts
 * rejections into ProviderError entries, and assembles the SolveResult.
 *
 * Adapters must:
 *  - accept the AbortSignal and pass it to fetch
 *  - return `null`/`[]` for a clean "not found" (404 from a dictionary),
 *    and throw a ProviderError-shaped error for everything else
 *  - never throw on a missing optional field in the upstream JSON
 */
export interface Provider<T> {
  name: string;
  fetch(req: SolveRequest, signal: AbortSignal): Promise<T>;
}

export type AnswerProvider = Provider<Answer[]>;
export type DefinitionProvider = Provider<Definition | null>;
export type ReferenceProvider = Provider<Reference | null>;

// ---------------------------------------------------------------------------
// Local persistence (IndexedDB via a tiny key-value wrapper, or localStorage)
// ---------------------------------------------------------------------------

export interface HistoryEntry {
  query: string;
  pattern?: string;
  letters?: string;
  /** Epoch ms of the most recent solve for this query+pattern. */
  at: number;
  /** Top answer at the time, for the history row preview. */
  topAnswer?: string;
}

export interface CacheEntry {
  /** `${query.toLowerCase()}|${pattern ?? ''}|${length ?? ''}` — letters excluded, they're view-time only. */
  key: string;
  result: SolveResult;
  /** Epoch ms. Result cache TTL is 7 days; served stale when offline. */
  expiresAt: number;
}

// ---------------------------------------------------------------------------
// Optional phase-2 backend (Claude proxy). Same shapes, over HTTP.
// ---------------------------------------------------------------------------

/** POST /api/solve — request body. */
export type ProxySolveRequest = SolveRequest;

/** POST /api/solve — response body. Merged into SolveResult.answers with source 'claude'. */
export interface ProxySolveResponse {
  answers: Array<Pick<Answer, 'display' | 'gloss' | 'score'>>;
  /** Server-side model/version tag for debugging. Not shown to users. */
  meta?: { model: string; ms: number };
}
