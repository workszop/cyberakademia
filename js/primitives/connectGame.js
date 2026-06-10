/**
 * ConnectGame — link regulation→organization→technology triples
 * data: { connections: [{id, regulatory, organizational, technology}] }
 * onResult(correct, total)
 *
 * UI: Three columns. Items in each column shown as clickable cards.
 * User selects one from each column; when a valid triple is selected → highlight green, remove from pool
 * Wrong combo → flash red, deselect
 */

export function initConnectGame(container, data, onResult) {
  if (!container) return;
  container.innerHTML = '';

  if (!data || !data.connections || data.connections.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak danych do połączeń.';
    container.appendChild(empty);
    return;
  }

  const connections = data.connections;
  const total = connections.length;
  let matched = 0;
  let locked = false;

  // Selection state
  let selectedReg = null;  // { el, id }
  let selectedOrg = null;  // { el, id }
  let selectedTech = null; // { el, id }

  // ── Score bar ────────────────────────────────────────────
  const scoreBar = document.createElement('div');
  scoreBar.className = 'connect-score-bar';
  const scoreLabel = document.createElement('span');
  scoreLabel.className = 'connect-score-label';
  scoreLabel.textContent = `Połączono: 0 / ${total}`;
  scoreBar.appendChild(scoreLabel);
  container.appendChild(scoreBar);

  // ── Instructions ─────────────────────────────────────────
  const instructions = document.createElement('p');
  instructions.className = 'connect-instructions text-muted';
  instructions.textContent =
    'Wybierz po jednej karcie z każdej kolumny, które tworzą pasujący zestaw, a następnie kliknij "Połącz".';
  container.appendChild(instructions);

  // ── Columns grid ─────────────────────────────────────────
  const grid = document.createElement('div');
  grid.className = 'connect-grid';
  container.appendChild(grid);

  const columnDefs = [
    { key: 'regulatory',    title: 'Wymóg regulacyjny',       cls: 'connect-col--reg' },
    { key: 'organizational', title: 'Co robi organizacja',    cls: 'connect-col--org' },
    { key: 'technology',    title: 'Technologia',             cls: 'connect-col--tech' },
  ];

  // Maps from id → element for each column
  const elMaps = { regulatory: {}, organizational: {}, technology: {} };

  columnDefs.forEach(({ key, title, cls }) => {
    const col = document.createElement('div');
    col.className = `connect-column ${cls}`;
    col.setAttribute('data-col', key);

    const colTitle = document.createElement('div');
    colTitle.className = 'connect-col-title';
    colTitle.textContent = title;
    col.appendChild(colTitle);

    // Shuffle items in column
    const shuffled = [...connections].sort(() => Math.random() - 0.5);

    shuffled.forEach((conn) => {
      const card = document.createElement('button');
      card.className = 'connect-card';
      card.setAttribute('data-id', conn.id);
      card.setAttribute('data-col', key);
      card.textContent = conn[key];
      card.setAttribute('aria-label', `${title}: ${conn[key]}`);

      card.addEventListener('click', () => {
        if (locked) return;
        if (card.classList.contains('matched')) return;

        handleCardClick(key, conn.id, card);
      });

      elMaps[key][conn.id] = card;
      col.appendChild(card);
    });

    grid.appendChild(col);
  });

  // ── Action button ─────────────────────────────────────────
  const actionRow = document.createElement('div');
  actionRow.className = 'connect-action-row';
  container.appendChild(actionRow);

  const connectBtn = document.createElement('button');
  connectBtn.className = 'connect-btn btn-primary';
  connectBtn.textContent = 'Połącz';
  connectBtn.disabled = true;
  connectBtn.addEventListener('click', () => {
    if (!selectedReg || !selectedOrg || !selectedTech) return;
    tryConnect();
  });
  actionRow.appendChild(connectBtn);

  // Selection status indicators
  const selStatus = document.createElement('div');
  selStatus.className = 'connect-sel-status';
  actionRow.appendChild(selStatus);

  // ── Card click handler ────────────────────────────────────
  function handleCardClick(colKey, id, cardEl) {
    const getSelected = () => {
      if (colKey === 'regulatory') return selectedReg;
      if (colKey === 'organizational') return selectedOrg;
      return selectedTech;
    };
    const setSelected = (val) => {
      if (colKey === 'regulatory') selectedReg = val;
      else if (colKey === 'organizational') selectedOrg = val;
      else selectedTech = val;
    };

    const current = getSelected();

    // Toggle off if same card
    if (current && current.el === cardEl) {
      cardEl.classList.remove('selected');
      setSelected(null);
    } else {
      // Deselect previous in same column
      if (current) current.el.classList.remove('selected');
      cardEl.classList.add('selected');
      setSelected({ el: cardEl, id });
    }

    updateActionState();
  }

  function updateActionState() {
    const allSelected = selectedReg && selectedOrg && selectedTech;
    connectBtn.disabled = !allSelected;
    connectBtn.classList.toggle('ready', Boolean(allSelected));

    selStatus.innerHTML = '';
    [
      { label: 'Regulacja', sel: selectedReg },
      { label: 'Organizacja', sel: selectedOrg },
      { label: 'Technologia', sel: selectedTech },
    ].forEach(({ label, sel }) => {
      const dot = document.createElement('span');
      dot.className = `connect-sel-dot ${sel ? 'connect-sel-dot--active' : ''}`;
      dot.setAttribute('title', sel ? `${label}: wybrano` : `${label}: nie wybrano`);
      selStatus.appendChild(dot);
    });
  }

  // ── Try connect ───────────────────────────────────────────
  function tryConnect() {
    if (!selectedReg || !selectedOrg || !selectedTech) return;
    locked = true;

    const regId = selectedReg.id;
    const orgId = selectedOrg.id;
    const techId = selectedTech.id;

    // All three must belong to the same connection
    const isCorrect =
      String(regId) === String(orgId) &&
      String(orgId) === String(techId);

    if (isCorrect) {
      // Mark all three matched
      [selectedReg.el, selectedOrg.el, selectedTech.el].forEach((el) => {
        el.classList.remove('selected');
        el.classList.add('matched', 'correct');
        el.disabled = true;
        const icon = document.createElement('span');
        icon.className = 'connect-match-icon';
        icon.textContent = '✓';
        el.appendChild(icon);
      });

      matched++;
      scoreLabel.textContent = `Połączono: ${matched} / ${total}`;
      selectedReg = null;
      selectedOrg = null;
      selectedTech = null;

      locked = false;
      updateActionState();

      if (matched === total) {
        showSummary();
        if (typeof onResult === 'function') onResult(matched, total);
      }
    } else {
      // Flash wrong on all three selected
      [selectedReg.el, selectedOrg.el, selectedTech.el].forEach((el) => {
        el.classList.add('wrong');
      });

      setTimeout(() => {
        [selectedReg, selectedOrg, selectedTech].forEach((sel) => {
          if (sel) {
            sel.el.classList.remove('selected', 'wrong');
          }
        });
        selectedReg = null;
        selectedOrg = null;
        selectedTech = null;

        locked = false;
        updateActionState();
      }, 900);
    }
  }

  // ── Summary ───────────────────────────────────────────────
  function showSummary() {
    const summary = document.createElement('div');
    summary.className = 'connect-summary slide-up';
    summary.innerHTML = `
      <div class="connect-summary-grade">Wszystkie połączenia odkryte!</div>
      <div class="connect-summary-score">${matched} / ${total} zestawów poprawnie</div>
    `;
    container.appendChild(summary);
    summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Init state
  updateActionState();
}
