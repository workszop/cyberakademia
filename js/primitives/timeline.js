/**
 * Timeline - vertical timeline of events
 * data: { events: [{date, label, description, regulation, important}] }
 * Clicking an event expands its description
 */

export function initTimeline(container, events) {
  if (!container) return;
  container.innerHTML = '';

  // Support both { events: [...] } and plain array
  const eventList = Array.isArray(events)
    ? events
    : events && Array.isArray(events.events)
      ? events.events
      : [];

  if (eventList.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak wydarzeń na osi czasu.';
    container.appendChild(empty);
    return;
  }

  const timeline = document.createElement('div');
  timeline.className = 'timeline';
  container.appendChild(timeline);

  // Track currently expanded item
  let expandedItem = null;

  eventList.forEach((event, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    if (event.important) item.classList.add('timeline-item--important');
    item.style.setProperty('--item-index', index);

    // ── Left: date ────────────────────────────────────────
    const dateEl = document.createElement('div');
    dateEl.className = 'timeline-date';
    dateEl.textContent = event.date || '';

    // ── Center: dot & line ────────────────────────────────
    const spine = document.createElement('div');
    spine.className = 'timeline-spine';

    const dot = document.createElement('div');
    dot.className = 'timeline-dot';
    if (event.important) dot.classList.add('timeline-dot--important');
    spine.appendChild(dot);

    // ── Right: content ────────────────────────────────────
    const content = document.createElement('div');
    content.className = 'timeline-content';

    const trigger = document.createElement('button');
    trigger.className = 'timeline-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', `timeline-desc-${index}`);

    const labelRow = document.createElement('div');
    labelRow.className = 'timeline-label-row';

    const labelEl = document.createElement('span');
    labelEl.className = 'timeline-label';
    labelEl.textContent = event.label || '';
    labelRow.appendChild(labelEl);

    if (event.regulation) {
      const badge = document.createElement('span');
      badge.className = 'timeline-regulation-badge';
      badge.textContent = event.regulation;
      labelRow.appendChild(badge);
    }

    if (event.important) {
      const importantBadge = document.createElement('span');
      importantBadge.className = 'timeline-important-badge';
      importantBadge.textContent = 'Kluczowe';
      labelRow.appendChild(importantBadge);
    }

    const chevron = document.createElement('span');
    chevron.className = 'timeline-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '›';
    labelRow.appendChild(chevron);

    trigger.appendChild(labelRow);

    // Description panel (hidden by default)
    const descPanel = document.createElement('div');
    descPanel.className = 'timeline-description';
    descPanel.id = `timeline-desc-${index}`;
    descPanel.setAttribute('role', 'region');
    descPanel.setAttribute('aria-label', `Opis: ${event.label || ''}`);

    if (event.description) {
      const descText = document.createElement('p');
      descText.textContent = event.description;
      descPanel.appendChild(descText);
    }

    // Toggle on click
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('expanded');

      // Close currently expanded
      if (expandedItem && expandedItem !== item) {
        expandedItem.classList.remove('expanded');
        const prevTrigger = expandedItem.querySelector('.timeline-trigger');
        if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');
      }

      if (isOpen) {
        item.classList.remove('expanded');
        trigger.setAttribute('aria-expanded', 'false');
        expandedItem = null;
      } else {
        item.classList.add('expanded');
        trigger.setAttribute('aria-expanded', 'true');
        expandedItem = item;
      }
    });

    // Keyboard support
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });

    content.appendChild(trigger);
    content.appendChild(descPanel);

    item.appendChild(dateEl);
    item.appendChild(spine);
    item.appendChild(content);
    timeline.appendChild(item);
  });
}
