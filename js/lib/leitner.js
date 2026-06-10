// ============================================================
// CyberAkademia - lib/leitner.js
// Leitner spaced-repetition system (5 boxes)
//
// Box 1 = new / hard    → review every session
// Box 2                 → review after 1 day
// Box 3                 → review after 3 days
// Box 4                 → review after 7 days
// Box 5 = mastered      → review after 14 days
// ============================================================

const BOX_INTERVALS = [0, 1, 3, 7, 14]; // days per box (index 0 = box 1)

/**
 * Get the current box for a term.
 * @param {string} term
 * @param {Object} state - flashcard state map
 * @returns {number} box 1..5
 */
export function getBox(term, state) {
  return state[term]?.box || 1;
}

/**
 * Move a term up one box (correct answer).
 * Returns new state (does not mutate).
 * @param {string} term
 * @param {Object} state
 * @returns {Object} updated state
 */
export function onCorrect(term, state) {
  const currentBox = state[term]?.box || 1;
  const newBox = Math.min(5, currentBox + 1);
  return {
    ...state,
    [term]: { box: newBox, lastSeen: Date.now() },
  };
}

/**
 * Reset a term back to box 1 (wrong answer).
 * Returns new state (does not mutate).
 * @param {string} term
 * @param {Object} state
 * @returns {Object} updated state
 */
export function onWrong(term, state) {
  return {
    ...state,
    [term]: { box: 1, lastSeen: Date.now() },
  };
}

/**
 * Returns true if this card is due for review based on its box.
 * Internal helper for getDueTerms.
 * @param {string} term
 * @param {Object} state
 * @returns {boolean}
 */
function shouldReview(term, state) {
  const entry = state[term];
  if (!entry) return true; // never seen = always due

  const requiredDays = BOX_INTERVALS[entry.box - 1];
  if (requiredDays === 0) return true; // box 1 = always review

  const daysSince = (Date.now() - entry.lastSeen) / 86400000;
  return daysSince >= requiredDays;
}

/**
 * Get all terms that are currently due for review.
 * @param {string[]} allTerms
 * @param {Object} state
 * @returns {string[]}
 */
export function getDueTerms(allTerms, state) {
  return allTerms.filter(term => shouldReview(term, state));
}

/**
 * Calculate mastery percentage for a set of terms.
 * Mastery = average box / 5, expressed as 0-100%.
 * @param {Object} state
 * @param {string[]} terms
 * @returns {number} 0..100
 */
export function getMasteryPct(state, terms) {
  if (!terms.length) return 0;
  const total = terms.reduce((sum, t) => sum + (state[t]?.box || 1), 0);
  return Math.round((total / (terms.length * 5)) * 100);
}
