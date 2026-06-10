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

// Combined word-boundary regex for all glossary terms (longest-first so
// multi-word/keys win over substrings). Lookarounds avoid matching inside
// larger words (e.g. won't match "SOC" inside "SOComething").
const TERM_PATTERN = (() => {
  const escaped = Object.keys(GLOSSARY)
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`(?<![\\w])(${escaped.join('|')})(?![\\w])`, 'g');
})();

/**
 * Walks the DOM under `root` and wraps every glossary term found in a text
 * node with a <span class="term" data-term="…"> so the hover tooltip works.
 * Skips text already inside .term, headings, scripts, styles, SVG.
 *
 * Called by the router after each route mounts (content is rebuilt fresh
 * each navigation, so there is no double-wrapping across renders).
 *
 * @param {HTMLElement} root
 */
export function enrichGlossaryDom(root) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      // Don't enrich inside already-wrapped terms, code, headings, or non-text containers
      if (p.closest('.term, code, pre, script, style, svg, .section-title, h1, h2')) {
        return NodeFilter.FILTER_REJECT;
      }
      TERM_PATTERN.lastIndex = 0;
      return TERM_PATTERN.test(node.nodeValue)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  // Collect first (mutating during walk invalidates the walker)
  const targets = [];
  let node;
  while ((node = walker.nextNode())) targets.push(node);

  targets.forEach((textNode) => {
    const text = textNode.nodeValue;
    const frag = document.createDocumentFragment();
    let last = 0;
    let m;
    TERM_PATTERN.lastIndex = 0;
    while ((m = TERM_PATTERN.exec(text))) {
      if (m.index > last) {
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      }
      const span = document.createElement('span');
      span.className = 'term';
      span.dataset.term = m[1];
      span.textContent = m[1];
      frag.appendChild(span);
      last = m.index + m[1].length;
    }
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    textNode.parentNode.replaceChild(frag, textNode);
  });
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
