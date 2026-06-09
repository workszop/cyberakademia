/**
 * Flashcards with Leitner spaced repetition
 * data: { terms: [{term, full, short, long, category}] }
 * Uses leitner.js for box logic
 *
 * leitner.js API: getBox(term, state), onCorrect(term, state) → newState,
 *                 onWrong(term, state) → newState, getMasteryPct(state, termsList)
 */

import { getBox, onCorrect, onWrong, getMasteryPct } from '../lib/leitner.js';

export function initFlashcards(container, data) {
  if (!container) return;
  container.innerHTML = '';

  if (!data || !data.terms || data.terms.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak fiszek do nauki.';
    container.appendChild(empty);
    return;
  }

  const terms = data.terms;
  let currentIndex = 0;
  let isFlipped = false;

  // Leitner state map: { [term]: { box, lastSeen } }
  // Persisted in sessionStorage so refreshing the page doesn't reset progress
  const STORAGE_KEY = 'ca_leitner_state';
  let leitnerState = {};
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) leitnerState = JSON.parse(saved);
  } catch (e) { /* ignore */ }

  function saveState() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(leitnerState)); }
    catch (e) { /* ignore quota errors */ }
  }

  // ── Wrapper ───────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'flashcards-wrapper';
  container.appendChild(wrapper);

  // ── Mastery progress bar ──────────────────────────────────
  const masterySection = document.createElement('div');
  masterySection.className = 'flashcards-mastery';

  const masteryLabel = document.createElement('div');
  masteryLabel.className = 'flashcards-mastery-label';

  const masteryTrack = document.createElement('div');
  masteryTrack.className = 'flashcards-mastery-track';
  const masteryFill = document.createElement('div');
  masteryFill.className = 'flashcards-mastery-fill';
  masteryTrack.appendChild(masteryFill);

  masterySection.appendChild(masteryLabel);
  masterySection.appendChild(masteryTrack);
  wrapper.appendChild(masterySection);

  // ── Card counter ──────────────────────────────────────────
  const counterEl = document.createElement('div');
  counterEl.className = 'flashcards-counter';
  wrapper.appendChild(counterEl);

  // ── Card area ─────────────────────────────────────────────
  const cardArea = document.createElement('div');
  cardArea.className = 'flashcards-card-area';
  wrapper.appendChild(cardArea);

  const card = document.createElement('div');
  card.className = 'flashcard';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', 'Fiszka. Kliknij aby odwrócić.');
  cardArea.appendChild(card);

  const cardInner = document.createElement('div');
  cardInner.className = 'flashcard-inner';
  card.appendChild(cardInner);

  const frontFace = document.createElement('div');
  frontFace.className = 'flashcard-face flashcard-front';
  cardInner.appendChild(frontFace);

  const backFace = document.createElement('div');
  backFace.className = 'flashcard-face flashcard-back';
  cardInner.appendChild(backFace);

  // Flip button
  const flipBtn = document.createElement('button');
  flipBtn.className = 'flashcards-flip-btn';
  flipBtn.textContent = 'Odwróć kartę';
  cardArea.appendChild(flipBtn);

  // ── Answer buttons (shown only when flipped) ──────────────
  const answerBtns = document.createElement('div');
  answerBtns.className = 'flashcards-answer-btns';
  answerBtns.setAttribute('aria-hidden', 'true');
  cardArea.appendChild(answerBtns);

  const knewBtn = document.createElement('button');
  knewBtn.className = 'flashcards-knew-btn';
  knewBtn.innerHTML = 'Znałem';
  answerBtns.appendChild(knewBtn);

  const didntKnowBtn = document.createElement('button');
  didntKnowBtn.className = 'flashcards-didnt-btn';
  didntKnowBtn.innerHTML = 'Nie znałem';
  answerBtns.appendChild(didntKnowBtn);

  // ── Navigation ────────────────────────────────────────────
  const navRow = document.createElement('div');
  navRow.className = 'flashcards-nav';
  wrapper.appendChild(navRow);

  const prevBtn = document.createElement('button');
  prevBtn.className = 'flashcards-nav-btn';
  prevBtn.textContent = '← Poprzednia';
  navRow.appendChild(prevBtn);

  const navCounter = document.createElement('span');
  navCounter.className = 'flashcards-nav-counter';
  navRow.appendChild(navCounter);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'flashcards-nav-btn';
  nextBtn.textContent = 'Następna →';
  navRow.appendChild(nextBtn);

  // ── Leitner box indicators ────────────────────────────────
  const boxesSection = document.createElement('div');
  boxesSection.className = 'flashcards-boxes';
  wrapper.appendChild(boxesSection);

  const boxesTitle = document.createElement('div');
  boxesTitle.className = 'flashcards-boxes-title';
  boxesTitle.textContent = 'Skrzynki Leitnera';
  boxesSection.appendChild(boxesTitle);

  const boxesRow = document.createElement('div');
  boxesRow.className = 'flashcards-boxes-row';
  boxesSection.appendChild(boxesRow);

  const BOX_LABELS = ['1 — Nowe', '2 — Uczone', '3 — Znane', '4 — Pewne', '5 — Opanowane'];
  const boxEls = BOX_LABELS.map((label, i) => {
    const boxEl = document.createElement('div');
    boxEl.className = 'flashcard-box';
    boxEl.setAttribute('data-box', i + 1);

    const boxNum = document.createElement('div');
    boxNum.className = 'flashcard-box-num';
    boxNum.textContent = i + 1;

    const boxLabel = document.createElement('div');
    boxLabel.className = 'flashcard-box-label';
    boxLabel.textContent = label;

    const boxCount = document.createElement('div');
    boxCount.className = 'flashcard-box-count';
    boxCount.textContent = '0';

    boxEl.appendChild(boxNum);
    boxEl.appendChild(boxLabel);
    boxEl.appendChild(boxCount);
    boxesRow.appendChild(boxEl);
    return { el: boxEl, countEl: boxCount };
  });

  // ── Render helpers ────────────────────────────────────────
  function renderCard() {
    isFlipped = false;
    card.classList.remove('flipped');
    answerBtns.setAttribute('aria-hidden', 'true');
    answerBtns.classList.remove('visible');
    flipBtn.style.display = '';

    const term = terms[currentIndex];

    // Front face
    frontFace.innerHTML = '';
    if (term.category) {
      const cat = document.createElement('div');
      cat.className = 'flashcard-category';
      cat.textContent = term.category;
      frontFace.appendChild(cat);
    }
    const termEl = document.createElement('div');
    termEl.className = 'flashcard-term';
    termEl.textContent = term.term;
    frontFace.appendChild(termEl);

    if (term.short) {
      const shortEl = document.createElement('div');
      shortEl.className = 'flashcard-short';
      shortEl.textContent = term.short;
      frontFace.appendChild(shortEl);
    }

    const frontHint = document.createElement('div');
    frontHint.className = 'flashcard-hint';
    frontHint.textContent = 'Kliknij aby zobaczyć definicję';
    frontFace.appendChild(frontHint);

    // Current box indicator on front
    const currentBox = getBox(term.term, leitnerState);
    const boxBadge = document.createElement('div');
    boxBadge.className = `flashcard-box-badge flashcard-box-badge--${currentBox}`;
    boxBadge.textContent = `Skrzynka ${currentBox}`;
    frontFace.appendChild(boxBadge);

    // Back face
    backFace.innerHTML = '';
    const fullEl = document.createElement('div');
    fullEl.className = 'flashcard-full';
    fullEl.textContent = term.full || term.term;
    backFace.appendChild(fullEl);

    if (term.long) {
      const longEl = document.createElement('div');
      longEl.className = 'flashcard-long';
      longEl.textContent = term.long;
      backFace.appendChild(longEl);
    }

    if (term.category) {
      const catBack = document.createElement('div');
      catBack.className = 'flashcard-category flashcard-category--back';
      catBack.textContent = term.category;
      backFace.appendChild(catBack);
    }

    // Counter
    counterEl.textContent = `${currentIndex + 1} z ${terms.length}`;
    navCounter.textContent = `${currentIndex + 1} / ${terms.length}`;

    // Nav buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === terms.length - 1;

    // Update mastery
    updateMastery();
    updateBoxCounts();
    highlightCurrentBox(currentBox);
  }

  function flip() {
    if (isFlipped) return;
    isFlipped = true;
    card.classList.add('flipped');
    answerBtns.removeAttribute('aria-hidden');
    answerBtns.classList.add('visible');
    flipBtn.style.display = 'none';
  }

  function updateMastery() {
    const pct = getMasteryPct(leitnerState, terms.map((t) => t.term));
    masteryLabel.textContent = `Opanowanie: ${Math.round(pct)}%`;
    masteryFill.style.width = `${pct}%`;
  }

  function updateBoxCounts() {
    // Count how many terms are in each box
    const counts = [0, 0, 0, 0, 0];
    terms.forEach((t) => {
      const b = getBox(t.term, leitnerState);
      counts[b - 1]++;
    });
    boxEls.forEach((boxData, i) => {
      boxData.countEl.textContent = counts[i];
    });
  }

  function highlightCurrentBox(box) {
    boxEls.forEach((boxData, i) => {
      boxData.el.classList.toggle('active', i + 1 === box);
    });
  }

  // ── Event handlers ────────────────────────────────────────
  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  });

  flipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    flip();
  });

  knewBtn.addEventListener('click', () => {
    const term = terms[currentIndex];
    leitnerState = onCorrect(term.term, leitnerState);
    saveState();
    updateMastery();
    updateBoxCounts();
    advanceCard();
  });

  didntKnowBtn.addEventListener('click', () => {
    const term = terms[currentIndex];
    leitnerState = onWrong(term.term, leitnerState);
    saveState();
    updateMastery();
    updateBoxCounts();
    advanceCard();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderCard();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < terms.length - 1) {
      currentIndex++;
      renderCard();
    }
  });

  function advanceCard() {
    if (currentIndex < terms.length - 1) {
      currentIndex++;
    } else {
      // Wrap to first unmastered, or stay on last
      const firstUnmastered = terms.findIndex((t) => getBox(t.term, leitnerState) < 5);
      if (firstUnmastered !== -1) {
        currentIndex = firstUnmastered;
      }
    }
    renderCard();
  }

  // ── Initial render ────────────────────────────────────────
  renderCard();
}
