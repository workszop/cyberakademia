// ============================================================
// CyberAkademia - modules/plan.js
// Module 6: implementation plan - seven steps "od czego zacząć"
// and the priority map (quick wins vs. long-term actions).
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import { moduleHeader, moduleFooter, section, process, compareTable, chips, bullets } from '../sections.js';
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
      s.regulatoryLink ? el('p', {}, el('b', {}, 'Regulacje: '), s.regulatoryLink) : null,
    ].flat().filter(Boolean),
  };
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
