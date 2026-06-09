/**
 * SortIntoBuckets — drag-and-drop (with click fallback) categorization game
 * data: { buckets: [{id, label, color}], items: [{id, text, answer, explanation}] }
 * onResult(correct, total) called when all items placed
 */

export function initSortIntoBuckets(container, data, onResult) {
  if (!container) return;
  container.innerHTML = '';

  if (!data || !data.buckets || !data.items || data.items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak danych do gry.';
    container.appendChild(empty);
    return;
  }

  const { buckets, items } = data;
  let selectedItem = null; // for click-to-place fallback
  let placed = 0;
  let correct = 0;
  const total = items.length;

  // ── Score bar ────────────────────────────────────────────
  const scoreBar = document.createElement('div');
  scoreBar.className = 'sib-score-bar';
  const scoreLabel = document.createElement('span');
  scoreLabel.className = 'sib-score-label';
  scoreLabel.textContent = `Umieszczono: 0 / ${total}`;
  scoreBar.appendChild(scoreLabel);
  container.appendChild(scoreBar);

  // ── Instructions ─────────────────────────────────────────
  const instructions = document.createElement('p');
  instructions.className = 'sib-instructions text-muted';
  instructions.textContent = 'Przeciągnij elementy do odpowiednich kategorii lub kliknij element, a następnie kliknij kategorię.';
  container.appendChild(instructions);

  // ── Items area ───────────────────────────────────────────
  const itemsArea = document.createElement('div');
  itemsArea.className = 'sib-items-area';
  container.appendChild(itemsArea);

  // Shuffle items for display
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  const itemEls = {}; // id → element

  shuffled.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'sib-item';
    el.textContent = item.text;
    el.setAttribute('draggable', 'true');
    el.setAttribute('data-id', item.id);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Element: ${item.text}. Przeciągnij lub kliknij aby wybrać.`);

    // Drag start
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => el.classList.add('dragging'), 0);
      clearSelection();
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
    });

    // Click to select (mobile / keyboard fallback)
    el.addEventListener('click', () => {
      if (el.classList.contains('placed')) return;
      if (selectedItem === el) {
        clearSelection();
      } else {
        clearSelection();
        selectedItem = el;
        el.classList.add('selected');
      }
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });

    itemEls[item.id] = el;
    itemsArea.appendChild(el);
  });

  // ── Buckets area ─────────────────────────────────────────
  const bucketsArea = document.createElement('div');
  bucketsArea.className = 'sib-buckets-area';
  container.appendChild(bucketsArea);

  buckets.forEach((bucket) => {
    const bucketEl = document.createElement('div');
    bucketEl.className = 'sib-bucket';
    if (bucket.color) {
      bucketEl.style.setProperty('--bucket-color', bucket.color);
    }
    bucketEl.setAttribute('data-bucket-id', bucket.id);
    bucketEl.setAttribute('role', 'region');
    bucketEl.setAttribute('aria-label', `Kategoria: ${bucket.label}`);

    const bucketLabel = document.createElement('div');
    bucketLabel.className = 'sib-bucket-label';
    bucketLabel.textContent = bucket.label;
    bucketEl.appendChild(bucketLabel);

    const bucketSlots = document.createElement('div');
    bucketSlots.className = 'sib-bucket-slots';
    bucketEl.appendChild(bucketSlots);

    // ── Drag over / drop ──────────────────────────────────
    bucketEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      bucketEl.classList.add('drag-over');
    });

    bucketEl.addEventListener('dragleave', (e) => {
      if (!bucketEl.contains(e.relatedTarget)) {
        bucketEl.classList.remove('drag-over');
      }
    });

    bucketEl.addEventListener('drop', (e) => {
      e.preventDefault();
      bucketEl.classList.remove('drag-over');
      const itemId = e.dataTransfer.getData('text/plain');
      placeItem(itemId, bucket.id, bucketSlots);
    });

    // ── Click to place ────────────────────────────────────
    bucketEl.addEventListener('click', () => {
      if (selectedItem) {
        const itemId = selectedItem.getAttribute('data-id');
        placeItem(itemId, bucket.id, bucketSlots);
      }
    });

    bucketsArea.appendChild(bucketEl);
  });

  // ── Place logic ───────────────────────────────────────────
  function placeItem(itemId, bucketId, slotsEl) {
    const itemData = items.find((i) => String(i.id) === String(itemId));
    const itemEl = itemEls[itemId];
    if (!itemData || !itemEl) return;
    if (itemEl.classList.contains('placed')) return;

    clearSelection();

    const isCorrect = String(itemData.answer) === String(bucketId);
    if (isCorrect) correct++;
    placed++;

    // Move element visually into bucket slot
    itemEl.classList.add('placed', isCorrect ? 'correct' : 'incorrect');
    itemEl.removeAttribute('draggable');
    itemEl.setAttribute('tabindex', '-1');

    // Add result icon
    const icon = document.createElement('span');
    icon.className = 'sib-result-icon';
    icon.textContent = isCorrect ? '✅' : '❌';
    icon.setAttribute('aria-label', isCorrect ? 'Poprawnie' : 'Niepoprawnie');
    itemEl.appendChild(icon);

    // Explanation tooltip
    if (itemData.explanation) {
      const tip = document.createElement('div');
      tip.className = 'sib-explanation';
      tip.textContent = itemData.explanation;
      itemEl.appendChild(tip);

      itemEl.addEventListener('mouseenter', () => tip.classList.add('visible'));
      itemEl.addEventListener('mouseleave', () => tip.classList.remove('visible'));
      itemEl.addEventListener('focus', () => tip.classList.add('visible'));
      itemEl.addEventListener('blur', () => tip.classList.remove('visible'));
    }

    slotsEl.appendChild(itemEl);

    // Update score bar
    scoreLabel.textContent = `Umieszczono: ${placed} / ${total}`;

    // Completion
    if (placed === total) {
      showSummary();
      if (typeof onResult === 'function') onResult(correct, total);
    }
  }

  function clearSelection() {
    if (selectedItem) {
      selectedItem.classList.remove('selected');
      selectedItem = null;
    }
  }

  // ── Summary panel ─────────────────────────────────────────
  function showSummary() {
    const summary = document.createElement('div');
    summary.className = 'sib-summary slide-up';
    const pct = Math.round((correct / total) * 100);
    const grade = pct >= 80 ? '🏆 Świetnie!' : pct >= 60 ? '👍 Dobrze' : '📚 Ćwicz dalej';
    summary.innerHTML = `
      <div class="sib-summary-grade">${grade}</div>
      <div class="sib-summary-score">${correct} / ${total} poprawnych (${pct}%)</div>
    `;
    container.appendChild(summary);
    summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
