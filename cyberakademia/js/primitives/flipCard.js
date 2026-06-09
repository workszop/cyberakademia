/**
 * FlipCard — renders a grid of flip cards
 * data: array of { front, back, icon?, label? }
 * Clicking a card flips it (adds .flipped class)
 * No onResult — this is an exploration component
 */

export function initFlipCards(container, cards) {
  if (!container) return;
  container.innerHTML = '';

  if (!cards || cards.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak kart do wyświetlenia.';
    container.appendChild(empty);
    return;
  }

  // Hint bar
  const hint = document.createElement('p');
  hint.className = 'flip-cards-hint';
  hint.innerHTML = '<span>🖱️</span> Kliknij kartę, aby ją odwrócić';
  container.appendChild(hint);

  // Grid wrapper
  const grid = document.createElement('div');
  grid.className = 'flip-cards-grid';
  container.appendChild(grid);

  cards.forEach((cardData, index) => {
    // Outer wrapper — perspective is set via CSS on .flip-card
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', `Karta ${index + 1}: ${cardData.label || cardData.front || ''}. Kliknij aby odwrócić.`);

    // Inner — this is what rotates
    const inner = document.createElement('div');
    inner.className = 'flip-card-inner';

    // ── Front face ──────────────────────────────────────────
    const front = document.createElement('div');
    front.className = 'flip-card-front';

    if (cardData.icon) {
      const iconEl = document.createElement('div');
      iconEl.className = 'flip-card-icon';
      iconEl.textContent = cardData.icon;
      front.appendChild(iconEl);
    }

    const frontText = document.createElement('div');
    frontText.className = 'flip-card-front-text';
    frontText.textContent = cardData.label || cardData.front || '';
    front.appendChild(frontText);

    const flipHint = document.createElement('div');
    flipHint.className = 'flip-card-tap-hint';
    flipHint.textContent = 'Kliknij aby odwrócić';
    front.appendChild(flipHint);

    // ── Back face ───────────────────────────────────────────
    const back = document.createElement('div');
    back.className = 'flip-card-back';

    if (cardData.front && cardData.label) {
      // label was used on front; show front as subtitle on back
      const backSubtitle = document.createElement('div');
      backSubtitle.className = 'flip-card-back-subtitle';
      backSubtitle.textContent = cardData.front;
      back.appendChild(backSubtitle);
    }

    const backText = document.createElement('div');
    backText.className = 'flip-card-back-text';
    backText.textContent = cardData.back || '';
    back.appendChild(backText);

    const backFlipHint = document.createElement('div');
    backFlipHint.className = 'flip-card-tap-hint';
    backFlipHint.textContent = 'Kliknij aby odwrócić';
    back.appendChild(backFlipHint);

    // ── Assemble ────────────────────────────────────────────
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    grid.appendChild(card);

    // ── Interaction ─────────────────────────────────────────
    function toggle() {
      const isFlipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(isFlipped));
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
