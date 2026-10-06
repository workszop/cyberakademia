// ============================================================
// CyberAkademia - sections.js
// Section building blocks. Each function returns a DOM element and
// knows nothing about content files or app state; modules compose
// pages from these. Layout/visuals live in css/blocks.css.
// ============================================================

import { el } from './dom.js';
import { icon } from './icons.js';
import { getModule, getNeighbours, LAYERS } from './course.js';
import { MODULE_NOTES, SOURCES } from './editorial.js';

// ─── Helpers ──────────────────────────────────────────────

function para(text, cls) {
  if (!text) return null;
  return typeof text === 'string' ? el('p', { class: cls }, text) : text;
}

let uid = 0;
function nextId(prefix) { uid += 1; return `${prefix}-${uid}`; }

export function sectionDomId(sectionId) {
  return 's-' + String(sectionId).replace(/\./g, '-');
}

// ─── Small pieces ─────────────────────────────────────────

export function eyebrow(text, cls = '') {
  return el('div', { class: `eyebrow ${cls}`.trim() }, text);
}

export function chips(items, cls = '') {
  return el('div', { class: `chips ${cls}`.trim() }, items.map(t => el('span', { class: 'chip' }, t)));
}

/** Plain bullet list. */
export function bullets(items, cls = '') {
  return el('ul', { class: `bullets ${cls}`.trim() }, items.map(t => el('li', {}, t)));
}

/** Highlighted aside: tone = 'note' | 'warn' | 'key'. */
export function callout({ title, text, tone = 'note', iconName = 'info' }) {
  return el('aside', { class: `callout callout-${tone}` },
    el('span', { class: 'callout-icon' }, icon(iconName, 20)),
    el('div', {},
      title ? el('b', {}, title) : null,
      asBlock(text),
    ),
  );
}

/** Paragraph led by a bold label: labelled('Przykład: ', content, 'example'). */
export function labelled(label, content, cls) {
  return el('p', { class: cls }, el('b', {}, label), content);
}

/** A string becomes a paragraph; nodes and arrays pass through to el(). */
function asBlock(content) {
  return typeof content === 'string' ? el('p', {}, content) : content;
}

/** Label: value pairs (definition list). */
export function facts(pairs, cls = '') {
  return el('dl', { class: `facts-dl ${cls}`.trim() },
    pairs.filter(p => p && p.value).flatMap(p => [el('dt', {}, p.label), el('dd', {}, p.value)]),
  );
}

// ─── Module frame ─────────────────────────────────────────

/** Module header: eyebrow, title, lead, meta and reading-progress bar. */
export function moduleHeader(moduleId) {
  const mod = getModule(moduleId);
  const layer = LAYERS[mod.layer];
  const bar = el('div', { class: 'mod-progress-bar', 'data-progress-for': mod.id },
    mod.sections.map(s => el('span', { 'data-seg': s.id, title: `${s.id} ${s.title}` })),
  );
  return el('header', { class: 'mod-head' },
    el('div', { class: 'mod-head-main' },
      eyebrow(`Moduł ${mod.num} · ${layer.name}`, 'layer-text'),
      el('h1', {}, mod.fullTitle),
      el('p', { class: 'lead' }, mod.lead),
      el('div', { class: 'meta-row' },
        el('span', {}, icon('clock', 15), mod.time),
        el('span', {}, icon('list', 15), `${mod.sections.length} sekcji`),
      ),
      el('div', { class: 'mod-progress' },
        bar,
        el('small', { 'data-progress-label': mod.id }, ''),
      ),
    ),
    layerMap(mod),
  );
}

/** "Gdzie jestem" box: the three layers with the current one highlighted. */
function layerMap(mod) {
  const rows = [
    { layer: 'reg', label: 'Regulacje', rel: 'wymusza' },
    { layer: 'org', label: 'Organizacja', rel: 'sięga po' },
    { layer: 'tech', label: 'Technologia' },
  ];
  return el('div', { class: 'where', 'aria-label': 'Miejsce modułu w kursie' },
    eyebrow('Gdzie jestem'),
    rows.flatMap(r => [
      el('div', { class: `where-row${mod.layer === r.layer ? ' here' : ''}`, 'data-layer': r.layer },
        el('i', {}), r.label),
      r.rel ? el('div', { class: 'where-rel' }, el('span', { class: 'arr' }), ' ', r.rel) : null,
    ]),
    mod.layer === 'base' || mod.layer === 'synth'
      ? el('p', { class: 'where-note' }, mod.layer === 'base' ? 'Ten moduł jest podstawą dla wszystkich trzech warstw.' : 'Ten moduł łączy wszystkie trzy warstwy.')
      : null,
  );
}

/**
 * Numbered section. block = data-block type for the DOM contract.
 * Ends with a sentinel the shell observes to mark the section as read.
 */
export function section({ id, title, intro, block, tone = '' }, ...children) {
  return el('section', {
    class: `sec${tone ? ' sec-' + tone : ''}`,
    id: sectionDomId(id),
    'data-section-id': id,
    'data-block': block,
    'data-read': 'false',
    'aria-labelledby': sectionDomId(id) + '-h',
  },
    el('div', { class: 'sec-num no-terms', 'aria-hidden': 'true' }, id),
    el('div', { class: 'sec-body' },
      el('h2', { id: sectionDomId(id) + '-h' }, title),
      para(intro, 'intro'),
      ...children.flat(),
      el('div', { class: 'sec-end', 'data-sentinel': id, 'aria-hidden': 'true' }),
    ),
  );
}

/** Previous / next module links in their layer colours. */
export function moduleFooter(moduleId) {
  const { prev, next } = getNeighbours(moduleId);
  const link = (mod, dir) => mod
    ? el('a', { class: `mf-link mf-${dir}`, href: mod.route, 'data-layer': mod.layer },
        eyebrow(dir === 'prev' ? '← Poprzedni moduł' : 'Następny moduł →'),
        el('b', {}, `${mod.num}. ${mod.title}`),
        el('span', {}, mod.desc))
    : el('a', { class: `mf-link mf-${dir}`, href: dir === 'prev' ? '#/' : '#/slownik', 'data-layer': dir === 'prev' ? 'base' : 'ref' },
        eyebrow(dir === 'prev' ? '← Start' : 'Materiały →'),
        el('b', {}, dir === 'prev' ? 'Mapa kursu' : 'Słownik'),
        el('span', {}, dir === 'prev' ? 'Wróć do przeglądu warstw.' : 'Wszystkie skróty i pojęcia w jednym miejscu.'));
  const notes = MODULE_NOTES[moduleId];
  return el('div', { class: 'module-close' },
    notes ? [
      el('aside', { class: 'module-takeaways', 'data-module-takeaways': moduleId, 'aria-labelledby': `${moduleId}-takeaways` },
        el('h2', { id: `${moduleId}-takeaways` }, 'Co to oznacza dla organizacji'),
        bullets(notes.takeaways),
      ),
      el('details', { class: 'module-sources', 'data-module-sources': moduleId },
        el('summary', {}, 'Źródła i zakres opracowania'),
        el('p', {}, 'Materiał edukacyjny na podstawie przewodnika z 9.06.2026. Wymagania prawne zależą od zakresu przepisów; zalecenia wdrożeniowe i scenariusze są praktyką lub przykładami, nie dodatkowymi obowiązkami.'),
        el('p', {}, notes.checked || 'Ten moduł nie ma odrębnej, pełnej weryfikacji aktualności.'),
        bullets(notes.sources.map(key => sourceLink(key))),
      ),
    ] : null,
    el('nav', { class: 'mod-foot', 'aria-label': 'Sąsiednie moduły' }, link(prev, 'prev'), link(next, 'next')),
  );
}

export function sourceLink(key, label) {
  const source = SOURCES[key];
  return el('a', { href: source.url, class: 'source-link', target: '_blank', rel: 'noopener noreferrer' }, label || source.label);
}

// ─── Blocks ───────────────────────────────────────────────

/**
 * Comparison table.
 * head: array of header cells (string | Node); first is the corner cell.
 * rows: [{ th, cells: [...], detail?: Node }] - detail makes the row expandable.
 */
export function compareTable({ head, rows, caption, minWidth = 720, cls = '', mobileMode = 'rows' }) {
  const table = el('table', { class: `cmp ${cls}`.trim(), style: { minWidth: minWidth + 'px' } },
    caption ? el('caption', { class: 'sr-only' }, caption) : null,
    el('thead', {}, el('tr', {}, head.map((h, i) => el('th', { scope: 'col', class: i === 0 ? 'corner' : '' }, h)))),
  );
  const tbody = el('tbody');
  rows.forEach(r => {
    const tr = el('tr', {});
    let toggle = null;
    if (r.detail) {
      const detailId = nextId('row');
      toggle = el('button', { class: 'row-toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': detailId },
        icon('chevron-down', 14), el('span', { class: 'sr-only' }, 'Pokaż szczegóły'));
      const detailRow = el('tr', { class: 'row-detail', id: detailId, hidden: true },
        el('td', { colspan: String(head.length) }, el('div', { class: 'row-detail-body' }, r.detail)));
      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        detailRow.hidden = !open;
        tr.classList.toggle('open', open);
      });
      tbody.appendChild(tr);
      tbody.appendChild(detailRow);
    } else {
      tbody.appendChild(tr);
    }
    tr.appendChild(el('th', { scope: 'row' }, el('div', { class: 'row-head' }, toggle, el('div', {}, r.th))));
    r.cells.forEach((c, i) => tr.appendChild(el('td', { 'data-label': typeof head[i + 1] === 'string' ? head[i + 1] : head[i + 1].textContent }, c)));
  });
  table.appendChild(tbody);
  const mobile = mobileMode === 'columns' && !rows.some(r => r.detail)
    ? el('div', { class: 'cmp-mobile', 'data-comparison-mobile': 'columns' }, head.slice(1).map((h, i) =>
      el('article', { 'data-comparison-column': i },
        el('h3', {}, typeof h === 'string' ? h : h.cloneNode(true)),
        el('dl', {}, rows.flatMap((r, j) => [
          el('dt', {}, typeof r.th === 'string' ? r.th : tbody.children[j].querySelector('th').textContent),
          el('dd', {}, [...tbody.children[j].querySelectorAll('td')[i].childNodes].map(n => n.cloneNode(true))),
        ])),
      ),
    )) : null;
  const resolvedMode = mobile ? 'columns' : mobileMode === 'columns' ? 'rows' : mobileMode;
  return el('div', { class: `table-block table-mobile-${resolvedMode}`, 'data-comparison-mode': resolvedMode },
    el('div', { class: 'scroll-hint', 'aria-hidden': 'true' }, 'Przesuń tabelę w bok →'),
    el('div', { class: 'table-wrap' }, table),
    mobile,
  );
}

/**
 * Two sides compared. variant: 'fork' (common root, two branches) | 'versus'.
 * left/right: { eyebrow, title, sub, body: Node|string|array, tone }
 */
export function split({ left, right, root, variant = 'fork', midLabel = 'a' }) {
  const side = (s, cls) => el('div', { class: `split-side ${cls} ${s.tone ? 'tone-' + s.tone : ''}`.trim() },
    s.eyebrow ? eyebrow(s.eyebrow) : null,
    el('h3', {}, s.title),
    s.sub ? el('div', { class: 'split-sub' }, s.sub) : null,
    asBlock(s.body),
  );
  if (variant === 'versus') {
    return el('div', { class: 'split split-versus' },
      side(left, 'left'),
      el('div', { class: 'vs-mid', 'aria-hidden': 'true' }, el('span', {}, midLabel)),
      side(right, 'right'),
    );
  }
  return el('div', { class: 'split split-fork' },
    root ? el('div', { class: 'fork-root' }, root) : null,
    side(left, 'left'),
    side(right, 'right'),
  );
}

/** Flow of nodes with arrows: ['Dyrektywa', 'Ustawa krajowa', 'Firma']. */
export function flow(nodes) {
  return el('div', { class: 'flow' },
    nodes.flatMap((n, i) => [i ? icon('arrow-right', 16) : null, el('span', { class: 'node' }, n)]),
  );
}

/**
 * Columns of properties with a coloured top rule.
 * items: [{ key, title, sub, body: Node|array }], cols default = items.length
 */
export function propertyColumns(items, { cols } = {}) {
  return el('div', { class: 'prop-cols', style: { '--cols': String(cols || items.length) } },
    items.map((it, i) => el('article', { class: 'prop-col', style: { '--i': String(i) } },
      el('div', { class: 'prop-key no-terms' }, it.key),
      el('h3', {}, it.title),
      it.sub ? el('div', { class: 'prop-sub' }, it.sub) : null,
      it.body,
    )),
  );
}

/**
 * Process steps. direction 'horizontal' (strip with connectors) | 'vertical' (rail).
 * steps: [{ num, title, text, meta, detail: Node|string }]
 */
export function process(steps, { direction = 'horizontal' } = {}) {
  return el('ol', { class: `process process-${direction}` },
    steps.map((s, i) => {
      const body = el('div', { class: 'step-body' },
        s.meta ? el('div', { class: 'step-meta' }, s.meta) : null,
        el('h3', {}, s.title),
        para(s.text, 'step-text'),
      );
      if (s.detail) {
        body.appendChild(el('details', { class: 'step-more' },
          el('summary', {}, 'Więcej'),
          asBlock(s.detail)));
      }
      return el('li', { class: 'step' },
        el('span', { class: 'step-num no-terms' }, String(s.num ?? i + 1)),
        body,
      );
    }),
  );
}

/**
 * Horizontal timeline in event order with a "today" marker.
 * events: [{ date: 'YYYY-MM-DD', label, description, tag, important }]
 */
export function timeline(events, { today = new Date() } = {}) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const pad = n => String(n).padStart(2, '0');
  const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const detail = el('div', { class: 'tl-detail', 'aria-live': 'polite' });
  const track = el('div', { class: 'tl-track', role: 'group', 'aria-label': 'Oś czasu – wybierz zdarzenie' });
  const nodes = [];
  let todayPlaced = false;
  let prevYear = null;

  function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${Number(d)}.${m}.${y}`;
  }

  function select(i) {
    nodes.forEach((n, j) => n.setAttribute('aria-pressed', String(i === j)));
    const ev = sorted[i];
    detail.replaceChildren(
      el('div', { class: 'tl-detail-date mono' }, formatDate(ev.date), ev.tag ? el('small', {}, ev.tag) : null),
      el('div', {}, el('b', {}, ev.label), el('p', {}, ev.description)),
      ev.source ? sourceLink(ev.source) : null,
    );
  }

  const todayMarker = () => el('div', { class: 'tl-today', 'aria-hidden': 'true' },
    el('span', { class: 'flag' }, 'dziś'), el('span', { class: 'stick' }), el('span', { class: 'tdate' }, formatDate(todayIso)));

  sorted.forEach((ev, i) => {
    if (!todayPlaced && ev.date > todayIso) { track.appendChild(todayMarker()); todayPlaced = true; }
    const year = ev.date.slice(0, 4);
    const past = ev.date <= todayIso;
    const btn = el('button', {
      type: 'button',
      class: `tl-node${past ? ' past' : ''}${ev.important ? ' key' : ''}`,
      'aria-pressed': 'false',
      'data-date': ev.date,
    },
      el('span', { class: 'tl-year no-terms' }, year !== prevYear ? year : ''),
      el('span', { class: 'tl-dot' }),
      el('span', { class: 'tl-label' }, ev.label),
    );
    prevYear = year;
    btn.addEventListener('click', () => select(i));
    btn.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        const j = Math.max(0, Math.min(sorted.length - 1, i + (e.key === 'ArrowRight' ? 1 : -1)));
        nodes[j].focus();
        select(j);
      }
    });
    nodes.push(btn);
    track.appendChild(btn);
  });
  if (!todayPlaced) track.appendChild(todayMarker());

  // Start on the first future event (or the last one) and centre it once mounted
  const firstFuture = sorted.findIndex(ev => ev.date > todayIso);
  const startIndex = firstFuture === -1 ? sorted.length - 1 : firstFuture;
  select(startIndex);
  const wrap = el('div', { class: 'tl-wrap' }, track);
  const centre = (tries = 0) => {
    if (!wrap.isConnected) { if (tries < 20) requestAnimationFrame(() => centre(tries + 1)); return; }
    const node = nodes[startIndex];
    wrap.scrollLeft = node.offsetLeft - wrap.clientWidth / 2 + node.offsetWidth / 2;
  };
  requestAnimationFrame(() => centre());

  return el('div', { class: 'timeline' },
    el('div', { class: 'tl-legend', 'aria-hidden': 'true' },
      el('span', {}, el('i', { class: 'full' }), 'minęło'),
      el('span', {}, el('i', { class: 'hollow' }), 'przed nami'),
      el('span', {}, el('i', { class: 'ring' }), 'kluczowa data'),
    ),
    el('div', { class: 'scroll-hint', 'aria-hidden': 'true' }, 'Przesuń oś w bok →'),
    wrap,
    detail,
  );
}

/**
 * Numbered list of expandable items (2 columns on desktop, 1 on mobile).
 * items: [{ title, summary, detail: Node|string|array, meta }]
 */
export function numberedList(items) {
  return el('div', { class: 'num-list' },
    items.map((it, i) => {
      const head = el('summary', {},
        el('span', { class: 'nl-num mono no-terms' }, String(i + 1).padStart(2, '0')),
        el('span', { class: 'nl-head' },
          el('b', {}, it.title),
          it.summary ? el('span', { class: 'nl-sum' }, it.summary) : null,
          it.meta ? el('span', { class: 'nl-meta' }, it.meta) : null,
        ),
        it.detail ? icon('plus', 18) : null,
      );
      if (!it.detail) return el('div', { class: 'nl-item static' }, [...head.childNodes]);
      return el('details', { class: 'nl-item' }, head,
        el('div', { class: 'nl-detail' }, asBlock(it.detail)));
    }),
  );
}

/** Big numbers. stats: [{ value, label, sub }] */
export function statStrip(stats) {
  return el('div', { class: 'stat-strip', style: { '--cols': String(stats.length) } },
    stats.map(s => el('div', { class: 'stat' },
      el('strong', { class: 'no-terms' }, s.value),
      el('span', { class: 'stat-label' }, s.label),
      s.sub ? el('span', { class: 'stat-sub' }, s.sub) : null,
    )),
  );
}

/**
 * Case study told stage by stage.
 * stages: [{ title, situation, decision, explanation, avoid }]
 */
export function caseStudy({ title, intro, stages }) {
  return el('div', { class: 'case' },
    el('div', { class: 'case-head' }, icon('file-text', 20), el('div', {}, el('b', {}, title), para(intro))),
    el('ol', { class: 'case-stages' },
      stages.map((s, i) => el('li', { class: 'case-stage' },
        el('span', { class: 'case-num mono no-terms' }, `Etap ${i + 1}`),
        el('div', { class: 'case-body' },
          el('h3', {}, s.title),
          el('p', { class: 'case-situation' }, s.situation),
          el('div', { class: 'case-decision' }, icon('check-circle', 16), el('div', {}, el('b', {}, 'Właściwa decyzja: '), s.decision)),
          s.explanation ? el('p', { class: 'case-expl' }, s.explanation) : null,
          s.avoid ? labelled('Czego unikać: ', s.avoid, 'case-avoid') : null,
        ),
      )),
    ),
  );
}

/**
 * Defence layers stacked from the outside in.
 * layers: [{ title, category, text, blocks: [], notBlocks: [], detail }]
 */
export function layerStack(layers) {
  return el('ol', { class: 'layer-stack' },
    layers.map((l, i) => el('li', { class: 'ls-row', id: l.id, style: { '--depth': String(i) } },
      el('span', { class: 'ls-num mono no-terms' }, String(i + 1).padStart(2, '0')),
      el('div', { class: 'ls-main' },
        el('div', { class: 'ls-title' }, el('b', {}, l.title), l.category ? el('span', { class: 'ls-cat' }, l.category) : null),
        para(l.text, 'ls-text'),
        l.detail ? el('details', { class: 'step-more' }, el('summary', {}, 'Więcej'), el('p', {}, l.detail)) : null,
      ),
      el('div', { class: 'ls-tags' },
        l.blocks?.length ? el('div', { class: 'ls-tag-row ok' }, el('span', { class: 'ls-tag-label' }, 'Blokuje'), chips(l.blocks)) : null,
        l.notBlocks?.length ? el('div', { class: 'ls-tag-row no' }, el('span', { class: 'ls-tag-label' }, 'Nie blokuje'), chips(l.notBlocks)) : null,
      ),
    )),
  );
}

/**
 * Tiers from top to bottom (e.g. zarząd → CISO → zespoły).
 * levels: [{ title, items: [{ title, text, detail }] }]
 */
export function hierarchy(levels) {
  return el('div', { class: 'hierarchy' },
    levels.map((lv, i) => el('div', { class: 'tier', style: { '--tier': String(i) } },
      el('div', { class: 'tier-label' }, eyebrow(`Poziom ${i + 1}`), el('b', {}, lv.title)),
      el('div', { class: 'tier-items' },
        lv.items.map(it => el('details', { class: 'tier-item' },
          el('summary', {}, el('b', {}, it.title), it.text ? el('span', {}, it.text) : null, icon('plus', 16)),
          el('div', { class: 'tier-detail' }, asBlock(it.detail)),
        )),
      ),
    )),
  );
}

/**
 * Temple: roof, pillars, base. Clicking a pillar shows its detail.
 * pillars: [{ title, text, detail }]
 */
export function temple({ roof, roofSub, pillars, base }) {
  const detail = el('div', { class: 'pillar-detail', 'aria-live': 'polite' });
  const buttons = [];
  function select(i) {
    buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    detail.replaceChildren(el('b', {}, `Filar ${i + 1}: ${pillars[i].title}. `), pillars[i].detail);
  }
  pillars.forEach((p, i) => {
    const b = el('button', { type: 'button', class: 'pillar', 'aria-pressed': 'false' },
      el('span', { class: 'mono no-terms' }, `Filar ${i + 1}`),
      el('b', {}, p.title),
      el('span', {}, p.text),
    );
    b.addEventListener('click', () => select(i));
    buttons.push(b);
  });
  select(0);
  return el('div', { class: 'temple' },
    el('div', { class: 'temple-roof' }, roof, roofSub ? el('small', {}, roofSub) : null),
    el('div', { class: 'pillars', style: { '--cols': String(pillars.length) } }, buttons),
    el('div', { class: 'temple-base' }, base || ''),
    detail,
  );
}
