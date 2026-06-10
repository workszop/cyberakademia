/**
 * Expandable accordion cards
 * data: { items: [{title, summary, detail, icon?, highlight?}] }
 * highlight: true → renders with warning/accent border (for "naprawdę nowe" items)
 * Only one item open at a time (accordion behaviour)
 */

export function initExpandable(container, items) {
  if (!container) return;
  container.innerHTML = '';

  // Support both { items: [...] } and plain array
  const itemList = Array.isArray(items)
    ? items
    : items && Array.isArray(items.items)
      ? items.items
      : [];

  if (itemList.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak elementów do wyświetlenia.';
    container.appendChild(empty);
    return;
  }

  const accordion = document.createElement('div');
  accordion.className = 'expandable-list';
  accordion.setAttribute('role', 'list');
  container.appendChild(accordion);

  let openItem = null; // currently open expandable element

  itemList.forEach((item, index) => {
    const expandable = document.createElement('div');
    expandable.className = 'expandable';
    if (item.highlight) expandable.classList.add('expandable--highlight');
    expandable.setAttribute('role', 'listitem');

    // ── Trigger button ────────────────────────────────────
    const trigger = document.createElement('button');
    trigger.className = 'expandable-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', `expandable-content-${index}`);
    trigger.setAttribute('id', `expandable-trigger-${index}`);

    // Icon
    if (item.icon) {
      const iconEl = document.createElement('span');
      iconEl.className = 'expandable-icon';
      iconEl.setAttribute('aria-hidden', 'true');
      iconEl.textContent = item.icon;
      trigger.appendChild(iconEl);
    }

    // Text group
    const textGroup = document.createElement('div');
    textGroup.className = 'expandable-text-group';

    const titleEl = document.createElement('div');
    titleEl.className = 'expandable-title';
    titleEl.textContent = item.title || '';
    textGroup.appendChild(titleEl);

    if (item.summary) {
      const summaryEl = document.createElement('div');
      summaryEl.className = 'expandable-summary';
      summaryEl.textContent = item.summary;
      textGroup.appendChild(summaryEl);
    }

    trigger.appendChild(textGroup);

    // Badges
    const badgeRow = document.createElement('div');
    badgeRow.className = 'expandable-badge-row';

    if (item.highlight) {
      const newBadge = document.createElement('span');
      newBadge.className = 'expandable-badge expandable-badge--new';
      newBadge.textContent = 'Nowe';
      badgeRow.appendChild(newBadge);
    }

    // Chevron
    const chevron = document.createElement('span');
    chevron.className = 'expandable-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.innerHTML = '&#8250;'; // ›
    badgeRow.appendChild(chevron);

    trigger.appendChild(badgeRow);

    // ── Content panel ─────────────────────────────────────
    const content = document.createElement('div');
    content.className = 'expandable-content';
    content.setAttribute('id', `expandable-content-${index}`);
    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', `expandable-trigger-${index}`);

    const detailEl = document.createElement('div');
    detailEl.className = 'expandable-detail';
    // Support HTML or plain text - plain text only for security
    detailEl.textContent = item.detail || '';
    content.appendChild(detailEl);

    // ── Toggle logic ──────────────────────────────────────
    trigger.addEventListener('click', () => {
      const isOpen = expandable.classList.contains('open');

      // Close the currently open item (accordion behaviour)
      if (openItem && openItem !== expandable) {
        openItem.classList.remove('open');
        const prevTrigger = openItem.querySelector('.expandable-trigger');
        if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');
      }

      if (isOpen) {
        expandable.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        openItem = null;
      } else {
        expandable.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        openItem = expandable;
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
      // Arrow key navigation between items
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const allTriggers = accordion.querySelectorAll('.expandable-trigger');
        const idx = Array.from(allTriggers).indexOf(trigger);
        if (idx < allTriggers.length - 1) {
          allTriggers[idx + 1].focus();
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const allTriggers = accordion.querySelectorAll('.expandable-trigger');
        const idx = Array.from(allTriggers).indexOf(trigger);
        if (idx > 0) {
          allTriggers[idx - 1].focus();
        }
      }
    });

    expandable.appendChild(trigger);
    expandable.appendChild(content);
    accordion.appendChild(expandable);
  });
}
