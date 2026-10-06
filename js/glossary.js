// ============================================================
// CyberAkademia - glossary.js
// Accessible glossary definitions + text enrichment
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
  let pinned = false;
  let hideTimer;
  tip.hidden = true;

  function showTip(target) {
    if (!target || target.closest('[inert]')) return;
    const term = target.dataset.term;
    const entry = GLOSSARY[term];
    if (!entry) return;
    clearTimeout(hideTimer);
    if (activeTarget !== target) {
      hideTip();
      pinned = false;
    }
    activeTarget = target;
    const title = document.createElement('strong');
    title.textContent = term;
    tip.replaceChildren(title, document.createTextNode(`: ${entry.short}`));
    tip.hidden = false;
    tip.setAttribute('aria-hidden', 'false');
    tip.classList.add('visible');
    target.setAttribute('aria-describedby', tip.id);
    target.setAttribute('aria-expanded', 'true');
    positionTip();
  }

  function hideTip() {
    clearTimeout(hideTimer);
    activeTarget?.removeAttribute('aria-describedby');
    activeTarget?.setAttribute('aria-expanded', 'false');
    tip.classList.remove('visible');
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
    activeTarget = null;
    pinned = false;
  }

  function positionTip() {
    if (!activeTarget) return;
    const viewport = window.visualViewport;
    const minX = (viewport?.offsetLeft || 0) + 8;
    const minY = (viewport?.offsetTop || 0) + 8;
    const maxX = minX + (viewport?.width || innerWidth) - 16;
    const maxY = minY + (viewport?.height || innerHeight) - 16;
    tip.style.maxWidth = `${Math.min(320, maxX - minX)}px`;
    tip.style.maxHeight = `${maxY - minY}px`;
    const anchor = activeTarget.getBoundingClientRect();
    const box = tip.getBoundingClientRect();
    const top = anchor.bottom + 8 + box.height <= maxY ? anchor.bottom + 8 : anchor.top - box.height - 8;
    tip.style.left = `${Math.max(minX, Math.min(anchor.left, maxX - box.width))}px`;
    tip.style.top = `${Math.max(minY, Math.min(top, maxY - box.height))}px`;
  }

  function deferHide() {
    if (pinned || activeTarget === document.activeElement) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideTip, 180);
  }

  document.addEventListener('mouseover', e => {
    const target = e.target.closest('[data-term]');
    if (target) showTip(target);
    else if (tip.contains(e.target)) clearTimeout(hideTimer);
  });
  document.addEventListener('mouseout', e => {
    if (activeTarget?.contains(e.relatedTarget) || (e.relatedTarget && tip.contains(e.relatedTarget))) return;
    if (activeTarget?.contains(e.target) || tip.contains(e.target)) deferHide();
  });
  document.addEventListener('focusin', e => {
    const target = e.target.closest('[data-term]');
    if (target) showTip(target);
    else hideTip();
  });
  document.addEventListener('focusout', e => {
    if (e.target === activeTarget && !tip.contains(e.relatedTarget)) hideTip();
  });
  function toggleTip(target) {
    if (target === activeTarget && pinned) hideTip();
    else { showTip(target); pinned = true; }
  }
  document.addEventListener('click', e => {
    const target = e.target.closest('[data-term]');
    if (target) toggleTip(target);
    else if (!tip.contains(e.target)) hideTip();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeTarget) {
      hideTip();
      e.preventDefault();
      e.stopImmediatePropagation();
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-term]')) {
      e.preventDefault();
      toggleTip(e.target);
    }
  });
  window.addEventListener('hashchange', hideTip);
  window.addEventListener('resize', hideTip);
  document.addEventListener('scroll', e => { if (!tip.contains(e.target)) hideTip(); }, { passive: true, capture: true });
  window.visualViewport?.addEventListener('resize', hideTip);
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
 * node with a keyboard-accessible definition trigger.
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
      if (p.closest('.term, code, pre, script, style, svg, h1, h2, .no-terms, .eyebrow, .chip, a, button, summary, input, textarea, select, [contenteditable], [role="button"], [role="link"]')) {
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
      span.tabIndex = 0;
      span.setAttribute('role', 'button');
      span.setAttribute('aria-label', `Wyjaśnienie pojęcia: ${m[1]}`);
      span.setAttribute('aria-expanded', 'false');
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
