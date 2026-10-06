// ============================================================
// CyberAkademia - modules/slownik.js
// Glossary: every acronym and term, A–Z with a live filter
// ============================================================

import { el } from '../dom.js';
import { icon } from '../icons.js';
import { getAllTerms } from '../glossary.js';
import { getModule } from '../course.js';
import { eyebrow } from '../sections.js';
import { pluralPl, TERM_FORMS } from '../text.js';

// ─── Helpers ──────────────────────────────────────────────

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
}

function letterOf(term) {
  return term.charAt(0).toUpperCase();
}

// ─── Render ───────────────────────────────────────────────

function termEntry(t) {
  return el('article', { class: 'term-entry no-terms', id: `t-${t.term}`, 'data-term-entry': t.term },
    el('div', { class: 'te-head' },
      el('h3', { class: 'te-term mono' }, t.term),
      t.full ? el('span', { class: 'te-full' }, t.full) : null,
    ),
    el('p', { class: 'te-short' }, t.short),
    t.long ? el('details', { class: 'te-more' }, el('summary', {}, 'Pełna definicja'), el('p', {}, t.long)) : null,
  );
}

export function renderSlownik() {
  const mod = getModule('slownik');
  const terms = getAllTerms();
  const searchText = new Map(terms.map(t => [t.term, normalize(`${t.term} ${t.full || ''} ${t.short} ${t.long || ''}`)]));
  const letters = [...new Set(terms.map(t => letterOf(t.term)))];

  const count = el('span', { class: 'gl-count', 'aria-live': 'polite' }, pluralPl(terms.length, TERM_FORMS));
  const empty = el('p', { class: 'gl-empty', hidden: true }, 'Brak pojęć pasujących do wpisanej frazy.');

  const groups = letters.map(letter => el('section', { class: 'gl-group', id: `l-${letter}`, 'data-letter': letter },
    el('div', { class: 'gl-letter mono', 'aria-hidden': 'true' }, letter),
    el('div', { class: 'gl-terms' }, terms.filter(t => letterOf(t.term) === letter).map(termEntry)),
  ));

  const input = el('input', {
    type: 'search',
    class: 'gl-input',
    placeholder: 'Filtruj: skrót, nazwa albo słowo z definicji',
    'aria-label': 'Filtruj pojęcia',
  });

  const letterBar = el('nav', { class: 'gl-letters', 'aria-label': 'Litery' },
    letters.map(letter => el('a', { href: `#/slownik`, 'data-jump': letter }, letter)));

  function applyFilter() {
    const q = normalize(input.value.trim());
    let visible = 0;
    groups.forEach(g => {
      let inGroup = 0;
      g.querySelectorAll('[data-term-entry]').forEach(entry => {
        const show = !q || searchText.get(entry.dataset.termEntry).includes(q);
        entry.hidden = !show;
        if (show) inGroup++;
      });
      g.hidden = inGroup === 0;
      visible += inGroup;
    });
    count.textContent = q
      ? `${pluralPl(visible, TERM_FORMS)} z ${terms.length}`
      : pluralPl(terms.length, TERM_FORMS);
    empty.hidden = visible > 0;
  }

  input.addEventListener('input', applyFilter);
  letterBar.addEventListener('click', e => {
    const a = e.target.closest('[data-jump]');
    if (!a) return;
    e.preventDefault();
    document.getElementById(`l-${a.dataset.jump}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  return el('div', { class: 'module-page glossary-page' },
    el('header', { class: 'mod-head gl-head' },
      el('div', { class: 'mod-head-main' },
        eyebrow('Materiały', 'layer-text'),
        el('h1', {}, mod.fullTitle),
        el('p', { class: 'lead' }, mod.lead),
      ),
    ),
    el('div', { class: 'gl-tools' },
      el('label', { class: 'gl-search' }, icon('search', 18), input),
      count,
      letterBar,
    ),
    empty,
    el('div', { class: 'gl-list' }, groups),
  );
}
