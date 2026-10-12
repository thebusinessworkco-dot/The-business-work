import { AssistantEntry, buildAssistantKnowledge } from "./knowledge";

export const FALLBACK_ANSWER =
  "I don't have that information here. You can send us an enquiry and the team will reply.";

export const DEFAULT_SUGGESTIONS = [
  "Our 4 services",
  "How a project works",
  "Pricing and costs",
];

export interface MatchResult {
  matched: boolean;
  entry: AssistantEntry | null;
  answer: string;
  followUps?: string[];
  suggestions?: string[]; // 3 closest entry titles when not matched
  score: number;
}

/**
 * Strips punctuation, collapses spaces, and lowercases text.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Light stemming for English plurals and progressive -ing.
 */
export function stemToken(token: string): string {
  if (token.length <= 3) return token;

  if (token.endsWith("ies") && token.length > 4) {
    return token.slice(0, -3) + "y";
  }
  if (token.endsWith("es") && token.length > 4) {
    return token.slice(0, -2);
  }
  if (token.endsWith("ing") && token.length > 5) {
    return token.slice(0, -3);
  }
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 3) {
    return token.slice(0, -1);
  }
  return token;
}

/**
 * Fast Levenshtein distance for typo tolerance.
 */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val =
        a[i - 1] === b[j - 1]
          ? row[j - 1]
          : Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }

  return row[b.length];
}

/**
 * Scores an entry against a normalized query string and its tokens.
 */
export function scoreEntry(
  entry: AssistantEntry,
  normQuery: string,
  queryTokens: string[],
  stemmedQueryTokens: string[]
): number {
  if (!normQuery) return 0;

  let score = 0;
  const normTitle = normalizeText(entry.title);

  // 1. Title match (highest weight)
  if (normTitle === normQuery) {
    score += 40;
  } else if (normQuery.includes(normTitle)) {
    score += 25;
  } else if (normTitle.includes(normQuery) && normQuery.length >= 4) {
    score += 20;
  }

  // 2. Keyword matches
  for (const rawKw of entry.keywords) {
    const kw = normalizeText(rawKw);
    if (!kw) continue;

    const isMultiWord = kw.includes(" ");

    if (isMultiWord) {
      // Multi-word phrase matches weigh more
      if (normQuery === kw) {
        score += 30;
      } else if (normQuery.includes(kw)) {
        score += 20;
      } else {
        // Check if all phrase tokens are present in query
        const kwParts = kw.split(" ");
        const allPresent = kwParts.every(
          (part) =>
            queryTokens.includes(part) ||
            stemmedQueryTokens.includes(stemToken(part))
        );
        if (allPresent) {
          score += 15;
        }
      }
    } else {
      // Single-word keyword matching
      const stemmedKw = stemToken(kw);

      if (queryTokens.includes(kw)) {
        score += 10;
      } else if (stemmedQueryTokens.includes(stemmedKw)) {
        score += 8;
      } else {
        // Typo tolerance:
        // For length <= 5, allow omission (e.g. "prce" -> "price", "clnic" -> "clinic") or transposition.
        // Avoid arbitrary substitutions on short words (e.g. "prime" vs "price").
        if (kw.length >= 4) {
          for (const qToken of queryTokens) {
            if (qToken.length >= 3) {
              const dist = levenshtein(qToken, kw);
              if (kw.length <= 5) {
                // Allow only single deletion/insertion or length difference of 1 where chars are subset
                if (dist === 1) {
                  const isOmission =
                    kw.length === qToken.length + 1 &&
                    qToken.split("").every((c) => kw.includes(c));
                  const isAddition =
                    qToken.length === kw.length + 1 &&
                    kw.split("").every((c) => qToken.includes(c));
                  const isAdjacentSwap =
                    qToken.length === kw.length &&
                    qToken.split("").sort().join("") ===
                      kw.split("").sort().join("");

                  if (isOmission || isAddition || isAdjacentSwap) {
                    score += 8;
                    break;
                  }
                }
              } else {
                // For words >= 6 chars (like "whatsapp", "automation", "workflow")
                const maxDistance = kw.length > 7 ? 2 : 1;
                if (dist <= maxDistance) {
                  score += 8;
                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  return score;
}

/**
 * Matches a user query against the knowledge base.
 * Deterministic, pure function, no dependencies.
 */
export function matchQuery(
  rawInput: string,
  entries: AssistantEntry[] = buildAssistantKnowledge()
): MatchResult {
  // Cap at 200 chars
  const capped = (rawInput || "").slice(0, 200);
  const normQuery = normalizeText(capped);

  if (!normQuery) {
    return {
      matched: false,
      entry: null,
      answer: FALLBACK_ANSWER,
      suggestions: DEFAULT_SUGGESTIONS,
      score: 0,
    };
  }

  const queryTokens = normQuery.split(" ").filter(Boolean);
  const stemmedQueryTokens = queryTokens.map(stemToken);

  // Score all entries
  const scored = entries.map((entry) => ({
    entry,
    score: scoreEntry(entry, normQuery, queryTokens, stemmedQueryTokens),
  }));

  // Sort deterministically: highest score first, then by entry.id ascending
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entry.id.localeCompare(b.entry.id);
  });

  const best = scored[0];
  const MATCH_THRESHOLD = 8;

  if (best && best.score >= MATCH_THRESHOLD) {
    return {
      matched: true,
      entry: best.entry,
      answer: best.entry.answer,
      followUps: best.entry.followUps,
      score: best.score,
    };
  }

  // Generate 3 "did you mean" suggestion titles
  // Use top scoring candidate titles if any scored > 0, otherwise fill with defaults
  const suggestions: string[] = [];
  for (const s of scored) {
    if (s.score > 0 && !suggestions.includes(s.entry.title)) {
      suggestions.push(s.entry.title);
    }
    if (suggestions.length === 3) break;
  }

  for (const def of DEFAULT_SUGGESTIONS) {
    if (suggestions.length < 3 && !suggestions.includes(def)) {
      suggestions.push(def);
    }
  }

  return {
    matched: false,
    entry: null,
    answer: FALLBACK_ANSWER,
    suggestions,
    score: best ? best.score : 0,
  };
}
