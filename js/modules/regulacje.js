// ============================================================
// CyberAkademia - modules/regulacje.js
// Module 2: NIS2/KSC, DORA, RODO, ISO/IEC 27001 (reading material)
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import {
  moduleHeader, moduleFooter, section,
  split, flow, callout, bullets, eyebrow,
  compareTable, numberedList, timeline, temple, sourceLink,
} from '../sections.js';
import {
  REGULATIONS,
  TIMELINE_EVENTS,
  DORA_PILLARS,
  OBLIGATIONS_NIS2,
} from '../content/regulacje.js';

// ─── Constants ────────────────────────────────────────────

const MODULE_ID = 'regulacje';

const INTROS = {
  '2.1': 'W Europie nie ma jednej, uniwersalnej ustawy o cyberbezpieczeństwie. Istnieje zestaw aktów prawnych, które dotyczą różnych grup podmiotów. Najważniejsze rozróżnienie dotyczy formy prawnej.',
  '2.2': 'Cztery akty obok siebie: kogo obejmują, w jakiej formie obowiązują, od kiedy, jak zgłasza się incydenty i jakie grożą kary. Pod tabelą rozwiniesz opis i kluczowe fakty każdej regulacji.',
  '2.3': 'Od pierwszej dyrektywy NIS z 2016 roku po stopniowe wejście w życie KSC 2.0 w Polsce. Kliknij wydarzenie, aby poznać szczegóły.',
  '2.4': 'Cztery główne grupy obowiązków podmiotów kluczowych i ważnych. Kliknij, aby rozwinąć szczegóły.',
  '2.5': 'DORA porządkuje wymagania dotyczące odporności cyfrowej sektora finansowego w pięciu filarach. Kliknij filar, aby zobaczyć szczegóły.',
  '2.6': 'Obie role dotyczą bezpieczeństwa informacji, ale mają inny zakres, inną podstawę i inną pozycję w organizacji.',
};

// ─── Helpers ──────────────────────────────────────────────

const regName = id => REGULATIONS.find(r => r.id === id)?.name || '';

function regHead(reg) {
  return el('div', {},
    el('span', { class: 'cell-tag', style: { '--tc': reg.color } }, el('i'), reg.name),
    el('span', { class: 'cell-sub' }, reg.type),
  );
}

function sinceCell(c) {
  return [el('b', {}, c.since), c.sinceNote ? el('span', { class: 'muted-block' }, c.sinceNote) : null];
}

function incidentCell(c) {
  if (!c.incident) return el('span', { class: 'muted' }, 'nie dotyczy – to norma, nie przepis');
  return [
    c.incident,
    c.times.length ? el('div', { class: 'times' }, c.times.map(t => el('span', {}, t))) : null,
    c.incidentNote ? el('span', { class: 'muted-block' }, c.incidentNote) : null,
  ];
}

// ─── Sections ─────────────────────────────────────────────

function secDirective(s) {
  return section({ ...s, block: 'split' },
    split({
      variant: 'fork',
      root: 'Akt prawny UE',
      left: {
        eyebrow: 'Dyrektywa',
        title: 'NIS2',
        sub: 'Wymaga implementacji do prawa krajowego',
        body: [
          el('p', {}, 'Dyrektywa wyznacza cele, ale każdy kraj musi ją wdrożyć do prawa krajowego. Polska wdraża NIS2 przez nowelizację ustawy o KSC.'),
          flow(['Dyrektywa NIS2', 'Ustawa o KSC', 'Organizacja']),
        ],
      },
      right: {
        eyebrow: 'Rozporządzenie',
        title: 'DORA i RODO',
        sub: 'Obowiązuje bezpośrednio w całej UE',
        body: [
          el('p', {}, 'Rozporządzenie ma bezpośredni skutek prawny we wszystkich krajach UE, identycznie i bez ustawy krajowej. RODO uzupełnia krajowa ustawa o ochronie danych osobowych.'),
          flow(['Rozporządzenie DORA / RODO', 'Organizacja']),
        ],
      },
    }),
    callout({
      tone: 'key',
      iconName: 'layers',
      title: 'Czy jedna organizacja może podlegać kilku regulacjom jednocześnie?',
      text: 'Tak. Bank podlega DORA i RODO. Szpital podlega NIS2/KSC i RODO. Regulacje się uzupełniają, nie wykluczają. Tam, gdzie DORA i NIS2 mogłyby się nakładać, DORA działa jako przepis szczególny (lex specialis).',
    }),
  );
}

function secCompare(s) {
  const row = (th, fn) => ({ th, cells: REGULATIONS.map(fn) });
  const sourced = (r, field, content) => [...(Array.isArray(content) ? content : [content]), el('span', { class: 'cell-source' },
    sourceLink(r.id === 'nis2' ? (field === 'since' ? 'ksc' : 'kscAct')
      : r.id === 'dora' ? (field === 'since' ? 'dora' : field === 'incident' ? 'doraReporting' : 'doraFines')
        : r.id === 'rodo' ? (field === 'fines' ? 'rodoAct' : 'rodo') : 'iso'),
    r.id === 'dora' && field === 'fines' ? [' · ', sourceLink('dora', 'Dostawcy ICT: art. 35 DORA')] : null)];
  return section({ ...s, block: 'compareTable', tone: 'tint' },
    compareTable({
      caption: 'Porównanie regulacji',
      minWidth: 760,
      mobileMode: 'columns',
      head: ['Cecha', ...REGULATIONS.map(regHead)],
      rows: [
        row('Zakres', r => r.scope),
        row('Czego dotyczy', r => r.topic),
        row('Forma prawna', r => r.legalForm),
        row('Od kiedy', r => sourced(r, 'since', sinceCell(r.compare))),
        row('Zgłaszanie incydentów', r => sourced(r, 'incident', incidentCell(r.compare))),
        row('Kary', r => sourced(r, 'fines', r.compare.fines || el('span', { class: 'muted' }, 'brak – norma dobrowolna'))),
      ],
    }),
    eyebrow('Kluczowe fakty'),
    numberedList(REGULATIONS.map(r => ({
      title: r.name,
      summary: r.description,
      meta: r.type,
      detail: [bullets(r.keyFacts), sourceLink(r.id === 'nis2' ? 'kscAct' : r.id === 'dora' ? 'dora' : r.id === 'rodo' ? 'rodoAct' : 'iso')],
    })), { cols: 2 }),
  );
}

function secTimeline(s) {
  return section({ ...s, block: 'timeline' },
    timeline(TIMELINE_EVENTS.map(ev => ({
      date: ev.date,
      label: ev.label,
      description: ev.description,
      tag: regName(ev.regulation),
      important: ev.important,
      source: ev.regulation === 'nis2' ? (ev.date >= '2026' ? 'ksc' : 'nis2') : ev.regulation === 'dora' ? 'dora' : 'rodoAct',
    }))),
  );
}

function secObligations(s) {
  return section({ ...s, block: 'numberedList', tone: 'tint' },
    numberedList(OBLIGATIONS_NIS2.map(o => ({
      title: o.name,
      summary: o.description,
      detail: o.detail,
    })), { cols: 2 }),
  );
}

function secDoraPillars(s) {
  return section({ ...s, block: 'temple' },
    temple({
      roof: 'DORA – operacyjna odporność cyfrowa',
      roofSub: 'Rozporządzenie UE 2022/2554 · sektor finansowy i jego kluczowi dostawcy ICT',
      pillars: DORA_PILLARS.map(p => ({ title: p.name, text: p.description, detail: p.detail })),
      base: 'Stosowane od 17 stycznia 2025 roku',
    }),
  );
}

function secDpoCiso(s) {
  return section({ ...s, block: 'split', tone: 'wash' },
    split({
      variant: 'versus',
      left: {
        eyebrow: 'Chief Information Security Officer',
        title: 'CISO',
        sub: 'Cała strategia cyberbezpieczeństwa',
        body: el('ul', {},
          el('li', {}, 'Odpowiada za całą strategię cyberbezpieczeństwa IT'),
          el('li', {}, 'Zarządza zespołem SOC, narzędziami, architekturą'),
          el('li', {}, 'Raportuje do zarządu / CEO'),
          el('li', {}, 'RODO go nie wymaga, ale zaleca go dobra praktyka'),
          el('li', {}, 'Zakres: cały świat IT i cyberbezpieczeństwa'),
        ),
      },
      right: {
        eyebrow: 'Data Protection Officer',
        title: 'DPO',
        sub: 'Inspektor Ochrony Danych (IOD)',
        body: el('ul', {},
          el('li', {}, 'Doradza w kwestii zgodności z RODO'),
          el('li', {}, 'Punkt kontaktowy z UODO'),
          el('li', {}, 'Niezależny: nie można go odwołać za wykonywanie zadań'),
          el('li', {}, 'Wymagany przez RODO dla wielu organizacji'),
          el('li', {}, 'Zakres: wyłącznie ochrona danych osobowych'),
        ),
      },
    }),
    callout({
      tone: 'warn',
      iconName: 'alert-triangle',
      title: 'Pułapka: CISO i DPO w jednej osobie',
      text: 'DPO i CISO to różne role. Połączenie ich w jednej osobie jest możliwe, ale rodzi ryzyko konfliktu interesów.',
    }),
  );
}

const BUILDERS = {
  '2.1': secDirective,
  '2.2': secCompare,
  '2.3': secTimeline,
  '2.4': secObligations,
  '2.5': secDoraPillars,
  '2.6': secDpoCiso,
};

// ─── Render ───────────────────────────────────────────────

export function renderRegulacje() {
  const mod = getModule(MODULE_ID);
  const sections = mod.sections.map(s => BUILDERS[s.id]({ id: s.id, title: s.title, intro: INTROS[s.id] }));
  return el('div', { class: 'module-page' }, moduleHeader(MODULE_ID), ...sections, moduleFooter(MODULE_ID));
}
