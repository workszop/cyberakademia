// ============================================================
// CyberAkademia - store.js
// Reading progress (localStorage) with pub/sub.
// A section counts as read once the reader scrolls to its end.
// ============================================================

import { COURSE_MODULES, getModule } from './course.js';

const KEY = 'cyberakademia_v2';
const OLD_KEYS = ['cyberakademia_v1'];

// ─── Persistence ──────────────────────────────────────────

function storage() {
  try { return window.localStorage; } catch { return null; }
}

/** Keeps only section ids that exist in the course. */
function sanitize(read) {
  const clean = {};
  if (!read || typeof read !== 'object') return clean;
  COURSE_MODULES.forEach(m => {
    const ids = Array.isArray(read[m.id]) ? read[m.id] : [];
    const valid = m.sections.map(s => s.id).filter(id => ids.includes(id));
    if (valid.length) clean[m.id] = valid;
  });
  return clean;
}

/** Read sections as saved in localStorage (possibly by another tab). */
function loadRead(ls = storage()) {
  if (!ls) return {};
  try {
    return sanitize(JSON.parse(ls.getItem(KEY) || '{}').read);
  } catch {
    return {};
  }
}

/** Union of two read maps; progress only grows, so nothing is ever dropped. */
function mergeRead(a, b) {
  return sanitize(Object.fromEntries(COURSE_MODULES.map(m => [m.id, [...(a[m.id] || []), ...(b[m.id] || [])]])));
}

function save() {
  const ls = storage();
  if (!ls) return;
  // Merge first so this tab never overwrites sections another tab marked read
  state.read = mergeRead(loadRead(ls), state.read);
  try { ls.setItem(KEY, JSON.stringify(state)); } catch { /* quota / private mode */ }
}

function init() {
  const ls = storage();
  try { OLD_KEYS.forEach(k => ls?.removeItem(k)); } catch { /* blocked storage */ }
  return { read: loadRead(ls) };
}

let state = init();
const listeners = new Set();

// Another tab saved progress: pick it up
window.addEventListener?.('storage', e => {
  if (e.key !== KEY) return;
  state.read = mergeRead(state.read, loadRead());
  notify();
});

function notify() {
  listeners.forEach(fn => { try { fn(); } catch (e) { console.error('[store]', e); } });
}

// ─── Public API ───────────────────────────────────────────

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isRead(moduleId, sectionId) {
  return (state.read[moduleId] || []).includes(sectionId);
}

/** Marks a section as read. Returns true when it was newly marked. */
export function markRead(moduleId, sectionId) {
  const mod = getModule(moduleId);
  if (!mod || !mod.sections.some(s => s.id === sectionId)) return false;
  if (isRead(moduleId, sectionId)) return false;
  state.read = { ...state.read, [moduleId]: [...(state.read[moduleId] || []), sectionId] };
  save();
  notify();
  return true;
}

/** @returns {{ read: number, total: number, pct: number }} */
export function getModuleProgress(moduleId) {
  const mod = getModule(moduleId);
  const total = mod ? mod.sections.length : 0;
  const read = (state.read[moduleId] || []).length;
  return { read, total, pct: total ? Math.round((read / total) * 100) : 0 };
}

/** @returns {{ read: number, total: number, pct: number, modulesDone: number, modulesTotal: number }} */
export function getCourseProgress() {
  let read = 0, total = 0, modulesDone = 0;
  COURSE_MODULES.forEach(m => {
    const p = getModuleProgress(m.id);
    read += p.read;
    total += p.total;
    if (p.total && p.read === p.total) modulesDone++;
  });
  return {
    read, total,
    pct: total ? Math.round((read / total) * 100) : 0,
    modulesDone, modulesTotal: COURSE_MODULES.length,
  };
}

/** First unread section in course order, or null when everything is read. */
export function getNextSection() {
  for (const m of COURSE_MODULES) {
    const s = m.sections.find(sec => !isRead(m.id, sec.id));
    if (s) return { module: m, section: s };
  }
  return null;
}
