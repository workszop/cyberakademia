/**
 * MatchGame — two-column click-to-match
 * data: { pairs: [{left, right, id}] } — shuffled automatically
 * onResult(correct, total)
 */

export function initMatchGame(container, data, onResult) {
  if (!container) return;
  container.innerHTML = '';

  if (!data || !data.pairs || data.pairs.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak par do dopasowania.';
    container.appendChild(empty);
    return;
  }

  const pairs = data.pairs;
  const total = pairs.length;
  let matched = 0;
  let selectedLeft = null;  // { el, id }
  let selectedRight = null; // { el, id }
  let locked = false;       // prevent clicks during wrong-flash animation

  // ── Score bar ────────────────────────────────────────────
  const scoreBar = document.createElement('div');
  scoreBar.className = 'match-score-bar';
  const scoreLabel = document.createElement('span');
  scoreLabel.className = 'match-score-label';
  scoreLabel.textContent = `Dopasowano: 0 / ${total}`;
  scoreBar.appendChild(scoreLabel);
  container.appendChild(scoreBar);

  // ── Instructions ─────────────────────────────────────────
  const instructions = document.createElement('p');
  instructions.className = 'match-instructions text-muted';
  instructions.textContent = 'Kliknij element z lewej kolumny, a następnie dopasuj go z prawej kolumny.';
  container.appendChild(instructions);

  // ── Game grid ─────────────────────────────────────────────
  const grid = document.createElement('div');
  grid.className = 'match-grid';
  container.appendChild(grid);

  // Left column
  const leftCol = document.createElement('div');
  leftCol.className = 'match-column match-column--left';
  const leftTitle = document.createElement('div');
  leftTitle.className = 'match-column-title';
  leftTitle.textContent = 'Pojęcia';
  leftCol.appendChild(leftTitle);

  // Right column
  const rightCol = document.createElement('div');
  rightCol.className = 'match-column match-column--right';
  const rightTitle = document.createElement('div');
  rightTitle.className = 'match-column-title';
  rightTitle.textContent = 'Definicje';
  rightCol.appendChild(rightTitle);

  grid.appendChild(leftCol);
  grid.appendChild(rightCol);

  // Shuffle both columns independently
  const leftItems = [...pairs].sort(() => Math.random() - 0.5);
  const rightItems = [...pairs].sort(() => Math.random() - 0.5);

  // ── Render left cards ─────────────────────────────────────
  leftItems.forEach((pair) => {
    const card = document.createElement('button');
    card.className = 'match-card match-card--left';
    card.setAttribute('data-id', pair.id);
    card.textContent = pair.left;
    card.setAttribute('aria-label', `Pojęcie: ${pair.left}`);

    card.addEventListener('click', () => {
      if (locked) return;
      if (card.classList.contains('matched')) return;

      // Deselect if already selected
      if (selectedLeft && selectedLeft.el === card) {
        card.classList.remove('selected');
        selectedLeft = null;
        return;
      }

      // Clear previous left selection
      if (selectedLeft) {
        selectedLeft.el.classList.remove('selected');
      }

      selectedLeft = { el: card, id: pair.id };
      card.classList.add('selected');

      // Try match if right already selected
      if (selectedRight) tryMatch();
    });

    leftCol.appendChild(card);
  });

  // ── Render right cards ────────────────────────────────────
  rightItems.forEach((pair) => {
    const card = document.createElement('button');
    card.className = 'match-card match-card--right';
    card.setAttribute('data-id', pair.id);
    card.textContent = pair.right;
    card.setAttribute('aria-label', `Definicja: ${pair.right}`);

    card.addEventListener('click', () => {
      if (locked) return;
      if (card.classList.contains('matched')) return;

      // Deselect if already selected
      if (selectedRight && selectedRight.el === card) {
        card.classList.remove('selected');
        selectedRight = null;
        return;
      }

      // Clear previous right selection
      if (selectedRight) {
        selectedRight.el.classList.remove('selected');
      }

      selectedRight = { el: card, id: pair.id };
      card.classList.add('selected');

      // Try match if left already selected
      if (selectedLeft) tryMatch();
    });

    rightCol.appendChild(card);
  });

  // ── Match logic ───────────────────────────────────────────
  function tryMatch() {
    if (!selectedLeft || !selectedRight) return;
    locked = true;

    const isCorrect = String(selectedLeft.id) === String(selectedRight.id);

    if (isCorrect) {
      // Mark both correct
      selectedLeft.el.classList.remove('selected');
      selectedRight.el.classList.remove('selected');
      selectedLeft.el.classList.add('matched', 'correct');
      selectedRight.el.classList.add('matched', 'correct');

      // Add checkmark
      appendIcon(selectedLeft.el, '✓');
      appendIcon(selectedRight.el, '✓');

      matched++;
      scoreLabel.textContent = `Dopasowano: ${matched} / ${total}`;

      selectedLeft = null;
      selectedRight = null;
      locked = false;

      if (matched === total) {
        showSummary();
        if (typeof onResult === 'function') onResult(matched, total);
      }
    } else {
      // Flash wrong
      selectedLeft.el.classList.add('wrong');
      selectedRight.el.classList.add('wrong');

      setTimeout(() => {
        if (selectedLeft) {
          selectedLeft.el.classList.remove('selected', 'wrong');
        }
        if (selectedRight) {
          selectedRight.el.classList.remove('selected', 'wrong');
        }
        selectedLeft = null;
        selectedRight = null;
        locked = false;
      }, 800);
    }
  }

  function appendIcon(el, icon) {
    const span = document.createElement('span');
    span.className = 'match-icon';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = icon;
    el.appendChild(span);
  }

  // ── Summary panel ─────────────────────────────────────────
  function showSummary() {
    const summary = document.createElement('div');
    summary.className = 'match-summary slide-up';
    summary.innerHTML = `
      <div class="match-summary-grade">Wszystkie pary dopasowane!</div>
      <div class="match-summary-score">${matched} / ${total} par poprawnie</div>
    `;
    container.appendChild(summary);
    summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
