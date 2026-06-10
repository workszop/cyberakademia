// ============================================================
// CyberAkademia — store.js
// localStorage-backed state store with pub/sub
// ============================================================

const KEY = 'cyberakademia_v1';

const DEFAULT = {
  completed: {},     // moduleId → true
  scores: {},        // moduleId → { score, total, pct }
  badges: [],        // array of earned badge ids
  flashcards: {},    // term → { box, lastSeen }
  lastVisited: null, // last visited route hash
};

// Deep-merge saved data over defaults so new keys appear automatically
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      ...DEFAULT,
      ...saved,
      completed: { ...DEFAULT.completed, ...(saved.completed || {}) },
      scores: { ...DEFAULT.scores, ...(saved.scores || {}) },
      badges: Array.isArray(saved.badges) ? [...saved.badges] : [],
      flashcards: { ...DEFAULT.flashcards, ...(saved.flashcards || {}) },
    };
  } catch {
    return { ...DEFAULT };
  }
}

let state = loadState();

// Modules that can actually be "completed" (call completeModule).
// Słownik and Ścieżka are reference views, not completable — so they
// must NOT count toward the progress denominator.
export const COMPLETABLE_MODULES = [
  'fundamenty', 'regulacje', 'organizacja', 'technologia', 'spiecie', 'finalboss',
];

// ── Internal helpers ─────────────────────────────────────

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[store] Could not save state:', e);
  }
}

// ── Public API ───────────────────────────────────────────

/**
 * Returns a shallow copy of the current state.
 */
export function getState() {
  return {
    ...state,
    completed: { ...state.completed },
    scores: { ...state.scores },
    badges: [...state.badges],
    flashcards: { ...state.flashcards },
  };
}

/**
 * Mark a module as completed with an optional score.
 * @param {string} moduleId
 * @param {number} score  - number of correct answers
 * @param {number} total  - total questions
 */
export function completeModule(moduleId, score = 0, total = 0) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 100;
  state.completed[moduleId] = true;
  state.scores[moduleId] = { score, total, pct };
  save();
}

/**
 * Earn a badge. No-op if already earned.
 * @param {string} badgeId
 */
export function earnBadge(badgeId) {
  if (state.badges.includes(badgeId)) return;
  state.badges = [...state.badges, badgeId];
  save();
}

/**
 * Update Leitner box for a flashcard term.
 * @param {string} term
 * @param {number} box  - 1..5
 */
export function updateFlashcard(term, box) {
  state.flashcards = {
    ...state.flashcards,
    [term]: { box: Math.max(1, Math.min(5, box)), lastSeen: Date.now() },
  };
  save();
}

/**
 * Record the last visited route.
 * @param {string} hash
 */
export function setLastVisited(hash) {
  state.lastVisited = hash;
  save();
}

/**
 * Reset all progress.
 */
export function resetProgress() {
  state = {
    ...DEFAULT,
    completed: {},
    scores: {},
    badges: [],
    flashcards: {},
  };
  save();
}

/**
 * Returns overall progress summary.
 * @returns {{ totalModules: number, completed: number, pct: number }}
 */
export function getProgress() {
  const totalModules = COMPLETABLE_MODULES.length;
  const completed = COMPLETABLE_MODULES.filter(id => state.completed[id]).length;
  const pct = Math.round((completed / totalModules) * 100);
  return { totalModules, completed, pct };
}

/**
 * Returns whether a specific module is completed.
 * @param {string} moduleId
 */
export function isCompleted(moduleId) {
  return !!state.completed[moduleId];
}

/**
 * Returns the best score for a module, or null.
 * @param {string} moduleId
 */
export function getScore(moduleId) {
  return state.scores[moduleId] || null;
}
