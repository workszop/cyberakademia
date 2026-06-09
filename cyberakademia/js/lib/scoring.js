// ============================================================
// CyberAkademia — lib/scoring.js
// Quiz scoring utilities
// ============================================================

export const PASS_THRESHOLD = 0.7; // 70% required to pass

/**
 * Calculate a quiz score from an array of answers and questions.
 * @param {(string|number)[]} answers - User's selected answer indices/values
 * @param {{ correct: string|number }[]} questions - Question objects with a `correct` field
 * @returns {{ correct: number, total: number, pct: number }}
 */
export function calcScore(answers, questions) {
  const correct = answers.filter((a, i) => a === questions[i]?.correct).length;
  const total = questions.length;
  const pct = total > 0 ? correct / total : 0;
  return { correct, total, pct };
}

/**
 * Returns true if the percentage meets the passing threshold.
 * @param {number} pct - 0..1
 * @returns {boolean}
 */
export function isPassing(pct) {
  return pct >= PASS_THRESHOLD;
}

/**
 * Returns a grade label and emoji for a given percentage.
 * @param {number} pct - 0..1
 * @returns {{ label: string, emoji: string }}
 */
export function grade(pct) {
  if (pct >= 0.9) return { label: 'Doskonale!',       emoji: '🏆' };
  if (pct >= 0.7) return { label: 'Zaliczone!',        emoji: '✅' };
  if (pct >= 0.5) return { label: 'Prawie!',           emoji: '⚠️' };
  return             { label: 'Spróbuj ponownie',  emoji: '❌' };
}

/**
 * Format a pct (0..1) as a percentage string.
 * @param {number} pct
 * @returns {string} e.g. "75%"
 */
export function fmtPct(pct) {
  return `${Math.round(pct * 100)}%`;
}

/**
 * Returns the XP awarded for a quiz result.
 * Full pass = 100 XP, partial credit scales down.
 * @param {number} correct
 * @param {number} total
 * @returns {number}
 */
export function calcXP(correct, total) {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 0.9) return 100;
  if (pct >= 0.7) return 75;
  if (pct >= 0.5) return 40;
  return 10;
}
