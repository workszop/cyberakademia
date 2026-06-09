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
const listeners = {}; // event → Set<fn>

// ── Internal helpers ─────────────────────────────────────

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[store] Could not save state:', e);
  }
}

function emit(event, data) {
  const fns = listeners[event];
  if (!fns) return;
  fns.forEach(fn => {
    try { fn(data); } catch (e) { console.error('[store] listener error', e); }
  });
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
  emit('progress', { moduleId, score, total, pct });
}

/**
 * Earn a badge. No-op if already earned.
 * @param {string} badgeId
 */
export function earnBadge(badgeId) {
  if (state.badges.includes(badgeId)) return;
  state.badges = [...state.badges, badgeId];
  save();
  emit('badge', { badgeId });
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
  emit('flashcard', { term, box });
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
  state = { ...DEFAULT };
  save();
  emit('progress', null);
  emit('badge', null);
}

/**
 * Returns overall progress summary.
 * @returns {{ totalModules: number, completed: number, pct: number }}
 */
export function getProgress() {
  const totalModules = 9;
  const completed = Object.keys(state.completed).filter(k => state.completed[k]).length;
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

/**
 * Subscribe to a store event.
 * Events: 'progress', 'badge', 'flashcard'
 * @param {string} event
 * @param {Function} fn
 */
export function on(event, fn) {
  if (!listeners[event]) listeners[event] = new Set();
  listeners[event].add(fn);
}

/**
 * Unsubscribe from a store event.
 * @param {string} event
 * @param {Function} fn
 */
export function off(event, fn) {
  listeners[event]?.delete(fn);
}
