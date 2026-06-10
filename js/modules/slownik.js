// ============================================================
// CyberAkademia - modules/slownik.js
// Glossary module with Leitner flashcard system
// ============================================================

import { el } from '../dom.js';
import { getAllTerms } from '../glossary.js';
import { getState, updateFlashcard } from '../store.js';
import { getBox, onCorrect, onWrong, getMasteryPct, getDueTerms } from '../lib/leitner.js';

// ── Flashcard viewer ─────────────────────────────────────

// Fisher–Yates shuffle (uniform, unlike sort(() => Math.random() - 0.5))
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderFlashcards() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Fiszki Leitner - nauka przez powtarzanie')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'System Leitner (spaced repetition): poprawna odpowiedź przesuwa kartę do wyższego koszyka (rzadziej pyta), błędna cofa do koszyka 1. Dotrzyj do koszyka 5 - Mistrz!'
  ));

  const allTerms = getAllTerms();
  const allTermIds = allTerms.map(t => t.term);
  let flashcardState = getState().flashcards || {};

  let queue = [];
  let idx = 0;
  let flipped = false;

  // ── Stats bar (badges refreshed after every answer) ────
  const dueBadge = el('div', { class: 'badge badge-accent' }, '');
  const masteryBadge = el('div', { class: 'badge badge-success' }, '');
  const statsBar = el('div', { style: { display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' } },
    dueBadge, masteryBadge
  );
  section.appendChild(statsBar);

  function refreshStats() {
    const due = getDueTerms(allTermIds, flashcardState);
    dueBadge.textContent = `${due.length} fiszek do przejrzenia`;
    masteryBadge.textContent = `Opanowanie: ${getMasteryPct(flashcardState, allTermIds)}%`;
  }

  // ── Scene (persistent container; rebuilt per session) ──
  const scene = el('div', { class: 'flashcard-scene' });
  section.appendChild(scene);

  // Mutable refs to the current card's parts (recreated by buildScene)
  let cardWrap, front, back, progressEl, leitnerBoxes;

  function updateBoxes(term) {
    const box = getBox(term, flashcardState);
    leitnerBoxes.querySelectorAll('.leitner-box').forEach((b, i) => {
      b.className = `leitner-box ${i + 1 <= box ? 'done' : ''}${i + 1 === box ? ' active' : ''}`;
    });
  }

  function answer(correct) {
    const term = queue[idx];
    flashcardState = correct ? onCorrect(term, flashcardState) : onWrong(term, flashcardState);
    updateFlashcard(term, flashcardState[term]?.box || 1);
    refreshStats();
    idx++;
    loadCard();
  }

  function buildScene() {
    scene.innerHTML = '';
    flipped = false;

    cardWrap = el('div', { class: 'flip-card flashcard-large', onclick: () => {
      if (!flipped) { cardWrap.classList.add('flipped'); flipped = true; }
    }});
    const inner = el('div', { class: 'flip-card-inner' });
    front = el('div', { class: 'flip-card-front' });
    back = el('div', { class: 'flip-card-back' });
    inner.appendChild(front);
    inner.appendChild(back);
    cardWrap.appendChild(inner);

    progressEl = el('div', { class: 'flashcard-progress' }, '');

    const boxesWrap = el('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
      el('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' } }, 'Koszyk:'),
    );
    leitnerBoxes = el('div', { class: 'leitner-boxes' });
    for (let i = 1; i <= 5; i++) {
      leitnerBoxes.appendChild(el('div', { class: 'leitner-box', 'data-box': i }, ''));
    }
    boxesWrap.appendChild(leitnerBoxes);

    const answerBtns = el('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' } },
      el('button', { class: 'btn btn-danger', onclick: () => answer(false) }, 'Nie wiedziałem/am'),
      el('button', { class: 'btn btn-primary', style: { background: 'var(--success)', color: '#fff' }, onclick: () => answer(true) }, 'Wiedziałem/am')
    );

    scene.appendChild(el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '540px', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' } },
      progressEl, boxesWrap
    ));
    scene.appendChild(cardWrap);
    scene.appendChild(el('p', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' } },
      'Kliknij kartę, żeby zobaczyć definicję, potem oceń się:'
    ));
    scene.appendChild(answerBtns);
  }

  function loadCard() {
    if (idx >= queue.length) {
      // Session done - overlay with a working restart
      scene.innerHTML = '';
      scene.appendChild(
        el('div', { class: 'result-overlay' },
          el('div', { class: 'result-title' }, 'Sesja zakończona!'),
          el('p', { style: { color: 'var(--text-muted)', marginBottom: '1rem' } }, `Opanowanie słownika: ${getMasteryPct(flashcardState, allTermIds)}%`),
          el('button', { class: 'btn btn-primary', onclick: startSession }, 'Nowa sesja')
        )
      );
      return;
    }

    flipped = false;
    cardWrap.classList.remove('flipped');
    const term = allTerms.find(t => t.term === queue[idx]);
    if (!term) { idx++; loadCard(); return; }

    progressEl.textContent = `${idx + 1} / ${queue.length}`;
    updateBoxes(term.term);

    front.innerHTML = '';
    back.innerHTML = '';

    front.appendChild(el('h3', { style: { fontSize: '1.2rem', textAlign: 'center' } }, term.term));
    if (term.full) {
      front.appendChild(el('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', textAlign: 'center' } }, term.full));
    }
    front.appendChild(el('p', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' } }, 'Kliknij, aby zobaczyć definicję'));

    back.appendChild(el('h4', { style: { color: 'var(--accent)', marginBottom: '0.5rem', textAlign: 'center' } }, term.term));
    back.appendChild(el('p', { class: 'card-answer', style: { fontSize: '0.88rem' } }, term.short));
  }

  function startSession() {
    flashcardState = getState().flashcards || {};
    let due = getDueTerms(allTermIds, flashcardState);
    if (due.length === 0) due = allTermIds;
    queue = shuffle(due);
    idx = 0;
    refreshStats();
    buildScene();
    loadCard();
  }

  startSession();
  return section;
}

// ── Term list / search ───────────────────────────────────

function renderTermList() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Pełny słownik')
  );

  const terms = getAllTerms();

  // Search box
  const searchInput = el('input', {
    type: 'search',
    placeholder: 'Szukaj akronimu lub pojęcia...',
    style: {
      width: '100%',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '0.65rem 1rem',
      color: 'var(--text)',
      fontSize: '0.9rem',
      marginBottom: '1.5rem',
    }
  });

  const list = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' } });

  function renderList(filter) {
    list.innerHTML = '';
    const filtered = filter
      ? terms.filter(t => t.term.toLowerCase().includes(filter) || t.short.toLowerCase().includes(filter))
      : terms;

    if (filtered.length === 0) {
      list.appendChild(el('p', { class: 'text-muted text-center' }, 'Brak wyników dla podanej frazy.'));
      return;
    }

    filtered.forEach(t => {
      const item = el('div', { class: 'expandable' });
      const trigger = el('button', { class: 'expandable-trigger', onclick: () => {
        item.classList.toggle('open');
      }},
        el('span', {}, `${t.term}${t.full ? ` - ${t.full}` : ''}`),
        el('span', { class: 'chevron' })
      );
      const content = el('div', { class: 'expandable-content' },
        el('div', { class: 'expandable-content-inner' },
          el('p', { style: { marginBottom: t.long ? '0.75rem' : '0' } }, t.short),
          t.long ? el('p', { style: { fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' } }, t.long) : null
        )
      );
      item.appendChild(trigger);
      item.appendChild(content);
      list.appendChild(item);
    });
  }

  renderList('');

  searchInput.addEventListener('input', () => {
    renderList(searchInput.value.trim().toLowerCase());
  });

  section.appendChild(searchInput);
  section.appendChild(list);
  return section;
}

// ── Main render ──────────────────────────────────────────

export function renderSlownik() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Słownik Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Wszystkie akronimy i pojęcia w jednym miejscu. Fiszki Leitner do efektywnej nauki.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, `${getAllTerms().length} terminów`),
      el('span', { class: 'badge badge-accent' }, 'Spaced Repetition')
    )
  ));

  wrap.appendChild(renderFlashcards());
  wrap.appendChild(renderTermList());

  return wrap;
}
