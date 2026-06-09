/**
 * Risk matrix 5×5 with sliders
 * Exploration/demonstration tool — no onResult
 *
 * Axes:
 *   Prawdopodobieństwo (probability) 1-5, rows bottom→top
 *   Skutek (impact) 1-5, columns left→right
 *
 * Risk score = probability × impact
 *   1-4:   green  (niskie)
 *   5-9:   yellow (średnie)
 *   10-14: orange (wysokie)
 *   15-19: red    (bardzo wysokie)
 *   20-25: dark red (krytyczne)
 */

export function initRiskMatrix(container) {
  if (!container) return;
  container.innerHTML = '';

  // ── Column / row labels ───────────────────────────────────
  const IMPACT_LABELS = [
    'Minimalne',
    'Niskie',
    'Umiarkowane',
    'Poważne',
    'Katastrofalne',
  ];

  const PROB_LABELS = [
    'Bardzo niskie',
    'Niskie',
    'Średnie',
    'Wysokie',
    'Bardzo wysokie',
  ];

  const RISK_RESPONSES = {
    low: {
      label: 'Niskie',
      color: '#10b981',
      action: 'Akceptacja ryzyka — monitorowanie.',
    },
    medium: {
      label: 'Średnie',
      color: '#f59e0b',
      action: 'Monitorowanie i planowanie działań zapobiegawczych.',
    },
    high: {
      label: 'Wysokie',
      color: '#f97316',
      action: 'Podjęcie działań naprawczych w najbliższym czasie.',
    },
    critical: {
      label: 'Bardzo wysokie',
      color: '#ef4444',
      action: 'Natychmiastowe działanie — eskalacja do kierownictwa.',
    },
    extreme: {
      label: 'Krytyczne',
      color: '#7f1d1d',
      action: 'PILNE: Zatrzymaj działanie, natychmiast zaangażuj zarząd.',
    },
  };

  function getRiskLevel(score) {
    if (score <= 4) return 'low';
    if (score <= 9) return 'medium';
    if (score <= 14) return 'high';
    if (score <= 19) return 'critical';
    return 'extreme';
  }

  function getCellColor(score) {
    const map = {
      low: '#064e3b',
      medium: '#78350f',
      high: '#7c2d12',
      critical: '#7f1d1d',
      extreme: '#450a0a',
    };
    return map[getRiskLevel(score)] || '#111827';
  }

  function getCellBorderColor(score) {
    const map = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#f97316',
      critical: '#ef4444',
      extreme: '#dc2626',
    };
    return map[getRiskLevel(score)] || '#1e2d47';
  }

  // State
  let prob = 3;
  let impact = 3;

  // ── Wrapper ───────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'risk-matrix-wrapper';
  container.appendChild(wrapper);

  // ── Sliders section ───────────────────────────────────────
  const slidersSection = document.createElement('div');
  slidersSection.className = 'risk-sliders';
  wrapper.appendChild(slidersSection);

  function createSlider(labelText, min, max, value, onInput) {
    const group = document.createElement('div');
    group.className = 'risk-slider-group';

    const labelEl = document.createElement('label');
    labelEl.className = 'risk-slider-label';

    const labelName = document.createElement('span');
    labelName.className = 'risk-slider-name';
    labelName.textContent = labelText;

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'risk-slider-value';
    valueDisplay.textContent = value;

    labelEl.appendChild(labelName);
    labelEl.appendChild(valueDisplay);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.className = 'risk-slider';
    slider.setAttribute('aria-label', labelText);

    slider.addEventListener('input', () => {
      valueDisplay.textContent = slider.value;
      onInput(Number(slider.value));
    });

    group.appendChild(labelEl);
    group.appendChild(slider);

    return { el: group, slider, valueDisplay };
  }

  const probSlider = createSlider('Prawdopodobieństwo', 1, 5, prob, (v) => {
    prob = v;
    updateMatrix();
    updateInfo();
  });

  const impactSlider = createSlider('Skutek (wpływ)', 1, 5, impact, (v) => {
    impact = v;
    updateMatrix();
    updateInfo();
  });

  slidersSection.appendChild(probSlider.el);
  slidersSection.appendChild(impactSlider.el);

  // ── Matrix grid ───────────────────────────────────────────
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'risk-matrix-container';
  wrapper.appendChild(matrixContainer);

  // Y-axis label
  const yAxisLabel = document.createElement('div');
  yAxisLabel.className = 'risk-axis-label risk-axis-label--y';
  yAxisLabel.textContent = 'Prawdopodobieństwo';
  matrixContainer.appendChild(yAxisLabel);

  const matrixRight = document.createElement('div');
  matrixRight.className = 'risk-matrix-right';
  matrixContainer.appendChild(matrixRight);

  // Row labels (probability) — 5 to 1, top to bottom
  const rowLabels = document.createElement('div');
  rowLabels.className = 'risk-row-labels';
  for (let p = 5; p >= 1; p--) {
    const lbl = document.createElement('div');
    lbl.className = 'risk-row-label';
    lbl.setAttribute('data-prob', p);
    lbl.textContent = `${p} — ${PROB_LABELS[p - 1]}`;
    rowLabels.appendChild(lbl);
  }
  matrixRight.appendChild(rowLabels);

  // Grid + column headers wrapper
  const gridWrapper = document.createElement('div');
  gridWrapper.className = 'risk-grid-wrapper';
  matrixRight.appendChild(gridWrapper);

  // Grid itself
  const grid = document.createElement('div');
  grid.className = 'risk-grid';
  // 5 rows × 5 cols
  grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
  grid.style.gridTemplateRows = 'repeat(5, 1fr)';

  const cellEls = {}; // "p-i" → element

  for (let p = 5; p >= 1; p--) {
    for (let i = 1; i <= 5; i++) {
      const score = p * i;
      const cell = document.createElement('div');
      cell.className = 'risk-cell';
      cell.setAttribute('data-prob', p);
      cell.setAttribute('data-impact', i);
      cell.setAttribute('title', `P:${p} × S:${i} = ${score}`);
      cell.style.backgroundColor = getCellColor(score);
      cell.style.borderColor = 'var(--border, #1e2d47)';

      const scoreEl = document.createElement('span');
      scoreEl.className = 'risk-cell-score';
      scoreEl.textContent = score;
      cell.appendChild(scoreEl);

      cellEls[`${p}-${i}`] = cell;
      grid.appendChild(cell);
    }
  }

  gridWrapper.appendChild(grid);

  // Column labels (impact) — 1 to 5
  const colLabels = document.createElement('div');
  colLabels.className = 'risk-col-labels';
  for (let i = 1; i <= 5; i++) {
    const lbl = document.createElement('div');
    lbl.className = 'risk-col-label';
    lbl.setAttribute('data-impact', i);
    lbl.innerHTML = `<span class="risk-col-num">${i}</span><span class="risk-col-name">${IMPACT_LABELS[i - 1]}</span>`;
    colLabels.appendChild(lbl);
  }
  matrixRight.appendChild(colLabels);

  // X-axis label
  const xAxisLabel = document.createElement('div');
  xAxisLabel.className = 'risk-axis-label risk-axis-label--x';
  xAxisLabel.textContent = 'Skutek (wpływ)';
  matrixRight.appendChild(xAxisLabel);

  // ── Info panel ────────────────────────────────────────────
  const infoPanel = document.createElement('div');
  infoPanel.className = 'risk-info-panel';
  wrapper.appendChild(infoPanel);

  const infoScore = document.createElement('div');
  infoScore.className = 'risk-info-score';

  const infoLevel = document.createElement('div');
  infoLevel.className = 'risk-info-level';

  const infoAction = document.createElement('div');
  infoAction.className = 'risk-info-action';

  infoPanel.appendChild(infoScore);
  infoPanel.appendChild(infoLevel);
  infoPanel.appendChild(infoAction);

  // ── Update functions ──────────────────────────────────────
  function updateMatrix() {
    const currentScore = prob * impact;

    Object.entries(cellEls).forEach(([key, cell]) => {
      const [p, i] = key.split('-').map(Number);
      const score = p * i;
      cell.style.backgroundColor = getCellColor(score);
      cell.style.border = '1px solid var(--border, #1e2d47)';
      cell.style.boxShadow = 'none';
      cell.style.transform = 'scale(1)';
      cell.style.zIndex = '0';
      cell.classList.remove('active');
    });

    // Highlight current cell
    const activeKey = `${prob}-${impact}`;
    const activeCell = cellEls[activeKey];
    if (activeCell) {
      const level = getRiskLevel(currentScore);
      const borderColor = getCellBorderColor(currentScore);
      activeCell.style.border = `2px solid ${borderColor}`;
      activeCell.style.boxShadow = `0 0 16px ${borderColor}88, inset 0 0 8px ${borderColor}33`;
      activeCell.style.transform = 'scale(1.12)';
      activeCell.style.zIndex = '10';
      activeCell.classList.add('active');
    }

    // Highlight row/col labels
    document.querySelectorAll('.risk-row-label').forEach((lbl) => {
      lbl.classList.toggle('active', Number(lbl.getAttribute('data-prob')) === prob);
    });
    document.querySelectorAll('.risk-col-label').forEach((lbl) => {
      lbl.classList.toggle('active', Number(lbl.getAttribute('data-impact')) === impact);
    });
  }

  function updateInfo() {
    const score = prob * impact;
    const level = getRiskLevel(score);
    const response = RISK_RESPONSES[level];

    infoScore.innerHTML = `Wynik ryzyka: <strong style="color:${response.color}">${score}</strong> / 25`;
    infoLevel.innerHTML = `Poziom: <span class="risk-level-badge" style="background:${response.color}20; color:${response.color}; border-color:${response.color}40">${response.label}</span>`;
    infoAction.innerHTML = `<strong>Rekomendowana reakcja:</strong> ${response.action}`;
    infoPanel.style.borderColor = response.color + '50';
  }

  // ── Legend ────────────────────────────────────────────────
  const legend = document.createElement('div');
  legend.className = 'risk-legend';
  wrapper.appendChild(legend);

  const legendTitle = document.createElement('div');
  legendTitle.className = 'risk-legend-title';
  legendTitle.textContent = 'Legenda';
  legend.appendChild(legendTitle);

  const legendItems = document.createElement('div');
  legendItems.className = 'risk-legend-items';
  legend.appendChild(legendItems);

  Object.entries(RISK_RESPONSES).forEach(([key, { label, color }]) => {
    const item = document.createElement('div');
    item.className = 'risk-legend-item';

    const swatch = document.createElement('span');
    swatch.className = 'risk-legend-swatch';
    swatch.style.backgroundColor = color;

    const text = document.createElement('span');
    text.textContent = label;

    item.appendChild(swatch);
    item.appendChild(text);
    legendItems.appendChild(item);
  });

  // ── Initial render ────────────────────────────────────────
  updateMatrix();
  updateInfo();
}
