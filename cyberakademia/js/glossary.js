// ============================================================
// CyberAkademia — glossary.js
// Global hover tooltips for data-term elements + text enrichment
// ============================================================

import { GLOSSARY } from './content/glossary.js';

/**
 * Initialise global glossary tooltip behavior.
 * Attaches listeners to the document (delegation) so they work
 * for dynamically-rendered content too.
 */
export function initGlossary() {
  const tip = document.getElementById('tooltip');
  if (!tip) return;

  let activeTarget = null;

  function showTip(e) {
    const target = e.target.closest('[data-term]');
    if (!target) return;

    const term = target.dataset.term;
    const entry = GLOSSARY[term];
    if (!entry) return;

    activeTarget = target;
    tip.innerHTML = `<strong>${term}</strong> — ${entry.short}`;
    tip.setAttribute('aria-hidden', 'false');
    tip.classList.add('visible');
    positionTip(e);
  }

  function hideTip() {
    tip.classList.remove('visible');
    tip.setAttribute('aria-hidden', 'true');
    activeTarget = null;
  }

  function positionTip(e) {
    const margin = 14;
    const tipWidth = 280;
    let left = e.clientX + margin;
    let top = e.clientY + margin;

    // Keep tooltip inside viewport
    if (left + tipWidth > window.innerWidth) {
      left = e.clientX - tipWidth - margin;
    }
    if (top + 80 > window.innerHeight) {
      top = e.clientY - 80;
    }

    tip.style.left = Math.max(8, left) + 'px';
    tip.style.top  = Math.max(8, top)  + 'px';
  }

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('[data-term]')) {
      showTip(e);
    } else {
      hideTip();
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (activeTarget) positionTip(e);
  });

  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget?.closest('[data-term]')) {
      hideTip();
    }
  });

  // Hide on scroll
  document.addEventListener('scroll', hideTip, { passive: true });
}

/**
 * Enriches an HTML string by wrapping known glossary terms in
 * <span class="term" data-term="…"> elements.
 *
 * Only wraps the first occurrence per term, skips terms already
 * wrapped, and avoids double-wrapping inside existing data-term spans.
 *
 * @param {string} html - Input HTML string
 * @returns {string} - Enriched HTML string
 */
export function enrichText(html) {
  // Sort terms longest-first to avoid partial-match issues
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

  let result = html;

  for (const term of terms) {
    // Don't double-wrap already-wrapped terms
    if (result.includes(`data-term="${term}"`)) continue;

    // Escape for regex
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match the term only when surrounded by word boundaries / non-alpha
    // and not inside an HTML attribute (simple heuristic: not inside < … >)
    const re = new RegExp(
      `(?<![a-zA-Z0-9_-])(?<!data-term="[^"]*)(${escaped})(?![a-zA-Z0-9_-])`,
      'g'
    );

    let replaced = false;
    result = result.replace(re, (match, p1, offset) => {
      // Skip if inside an HTML tag attribute
      const before = result.slice(0, offset);
      const openTags = (before.match(/</g) || []).length;
      const closeTags = (before.match(/>/g) || []).length;
      if (openTags > closeTags) return match; // inside a tag

      // Only replace first occurrence
      if (replaced) return match;
      replaced = true;

      return `<span class="term" data-term="${term}">${p1}</span>`;
    });
  }

  return result;
}

/**
 * Returns the glossary entry for a term, or null.
 * @param {string} term
 * @returns {{ full: string, short: string, long?: string } | null}
 */
export function lookupTerm(term) {
  return GLOSSARY[term] || null;
}

/**
 * Returns all glossary entries as a sorted array.
 * @returns {{ term: string, full: string, short: string, long?: string }[]}
 */
export function getAllTerms() {
  return Object.entries(GLOSSARY)
    .map(([term, entry]) => ({ term, ...entry }))
    .sort((a, b) => a.term.localeCompare(b.term));
}
