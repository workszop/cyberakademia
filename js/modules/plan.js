// ============================================================
// CyberAkademia - modules/plan.js
// Module 6: implementation plan - seven steps "od czego zacząć"
// and the priority map (quick wins vs. long-term actions).
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import { moduleHeader, moduleFooter, section, process, compareTable, chips, bullets, sourceLink } from '../sections.js';
import { STEPS, PRIORITY_MAP } from '../content/sciezka.js';

// ─── Constants ────────────────────────────────────────────

const MODULE_ID = 'plan';

const INTRO_STEPS =
  'Praktyczny załącznik z przewodnika pokazuje, jak organizacja powinna wdrażać cyberbezpieczeństwo krok po kroku, we właściwej kolejności: od diagnozy regulacyjnej po ciągłe doskonalenie.';

const INTRO_PRIORITIES =
  'Część działań daje efekt po kilku dniach lub tygodniach i niewiele kosztuje. Inne to projekty na miesiące albo lata. ' +
  'Pierwsze warto zrobić od razu, drugie zaplanować z budżetem i harmonogramem.';

const PRIORITY_HEAD = ['Działanie', 'Wysiłek', 'Efekt', 'Koszt', 'Czas'];

// ─── Helpers ──────────────────────────────────────────────

const label = text => el('div', { class: 'eyebrow' }, text);

// ─── 6.1 Od czego zacząć ──────────────────────────────────

function stepItem(s) {
  return {
    num: s.n,
    title: s.name,
    text: el('div', { class: 'step-text' },
      el('p', {}, s.description),
      el('p', { class: 'example' }, el('b', {}, 'Efekt: '), s.output),
    ),
    detail: [
      el('p', {}, s.detail),
      s.tools?.length ? [label('Narzędzia'), chips(s.tools)] : null,
      s.keyQuestions?.length ? [label('Pytania kontrolne'), bullets(s.keyQuestions)] : null,
      s.regulatoryLink ? el('p', {}, el('b', {}, 'Regulacje: '), s.regulatoryLink, ' ', sourceLink('ksc', 'Harmonogram KSC'), ' · ', el('a', { href: '#/regulacje?s=2.2' }, 'Porównanie i źródła przepisów')) : null,
    ].flat().filter(Boolean),
  };
}

function worksheet() {
  const status = el('p', { class: 'worksheet-status', role: 'status', 'aria-live': 'polite' }, 'Wpisy nie są zapisywane. Wydrukuj lub zapisz jako PDF przed opuszczeniem strony.');
  const field = (step, key, title) => {
    const id = `worksheet-${step.n}-${key}`;
    const mirror = el('div', { class: 'worksheet-print-value', 'aria-hidden': 'true' });
    const input = el('textarea', { id, rows: key === 'owner' || key === 'deadline' ? 1 : 3, 'data-worksheet-field': key });
    input.addEventListener('input', () => {
      mirror.textContent = input.value;
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
      status.textContent = 'Wpis zmieniony tylko na tej stronie. Wydrukuj przed jej opuszczeniem.';
    });
    return el('div', { class: `worksheet-field worksheet-${key}` }, el('label', { for: id }, title), input, mirror);
  };
  return el('section', { class: 'implementation-worksheet', 'data-worksheet': '7-steps', 'aria-labelledby': 'worksheet-title' },
    el('div', { class: 'worksheet-head' },
      el('h3', { id: 'worksheet-title' }, 'Arkusz wdrożenia: 7 kroków'),
      el('button', { class: 'btn worksheet-print', type: 'button', 'data-action': 'print-worksheet', onclick: () => window.print() }, 'Drukuj arkusz'),
    ),
    el('p', {}, 'Zalecana praktyka. Wpisz działania dla swojej organizacji; terminy prawne ustal według jej statusu. Możesz też wydrukować pusty arkusz.'),
    status,
    el('ol', { class: 'worksheet-steps' }, STEPS.map(s => el('li', { 'data-worksheet-step': s.n },
      el('h4', {}, `${s.n}. ${s.name}`),
      el('p', { class: 'worksheet-outcome' }, 'Oczekiwany efekt: ', s.output),
      el('div', { class: 'worksheet-fields' }, field(s, 'action', 'Działanie'), field(s, 'owner', 'Właściciel'), field(s, 'deadline', 'Termin'), field(s, 'evidence', 'Dowód wykonania')),
    ))),
  );
}

// ─── 6.2 Priorytety ───────────────────────────────────────

function priorityTable(items, caption) {
  return compareTable({
    caption,
    head: PRIORITY_HEAD,
    rows: items.map(p => ({ th: p.action, cells: [p.effort, p.impact, p.cost, p.timeToComplete] })),
    minWidth: 750,
  });
}

// ─── Render ───────────────────────────────────────────────

export function renderPlan() {
  const [s1, s2] = getModule(MODULE_ID).sections;

  return el('div', { class: 'module-page' },
    moduleHeader(MODULE_ID),

    section({ id: s1.id, title: s1.title, intro: INTRO_STEPS, block: 'process' },
      process(STEPS.map(stepItem), { direction: 'vertical' }),
      worksheet(),
    ),

    section({ id: s2.id, title: s2.title, intro: INTRO_PRIORITIES, block: 'compareTable', tone: 'tint' },
      el('h3', { class: 'sub-h' }, 'Szybkie efekty'),
      priorityTable(PRIORITY_MAP.quickWins, 'Szybkie efekty: wysiłek, efekt, koszt i czas'),
      el('h3', { class: 'sub-h' }, 'Działania długoterminowe'),
      priorityTable(PRIORITY_MAP.longTerm, 'Działania długoterminowe: wysiłek, efekt, koszt i czas'),
    ),

    moduleFooter(MODULE_ID),
  );
}
