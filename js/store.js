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

function load() {
  const ls = storage();
  if (!ls) return { read: {} };
  try {
    OLD_KEYS.forEach(k => ls.removeItem(k));
    const saved = JSON.parse(ls.getItem(KEY) || '{}');
    return { read: sanitize(saved.read) };
  } catch {
    return { read: {} };
  }
}

function save() {
  const ls = storage();
  if (!ls) return;
  try { ls.setItem(KEY, JSON.stringify(state)); } catch { /* quota / private mode */ }
}

let state = load();
const listeners = new Set();

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
