// ============================================================
// CyberAkademia - modules/fundamenty.js
// Module 1: CIA triad, most common threats, risk management.
// Reading material only: games became examples and tables.
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import {
  moduleHeader, moduleFooter, section, propertyColumns, compareTable,
  numberedList, callout, bullets, eyebrow, labelled,
} from '../sections.js';
import { CIA_TRIAD, CIA_SCENARIOS, RISK_RESPONSES, RISK_SCENARIOS } from '../content/fundamenty.js';
import { THREATS } from '../content/threats.js';

// ─── Constants ────────────────────────────────────────────

const MODULE_ID = 'fundamenty';
const CIA_ORDER = ['C', 'I', 'A'];
const EXAMPLES_PER_PROPERTY = 2;

const INTRO_CIA =
  'Bezpieczeństwo informacji sprowadza się do ochrony trzech właściwości (stąd „triada CIA”). ' +
  'Większość ataków i mechanizmów obrony da się przypisać do jednej z tych trzech kategorii, dlatego triada jest punktem odniesienia dla całej dziedziny.';

const INTRO_THREATS =
  'Trzy właściwości CIA atakuje wciąż ten sam zestaw zagrożeń. ' +
  'Rozwiń wiersz, aby zobaczyć opis zagrożenia, pełny opis skutków i przykład z praktyki.';

const INTRO_RISK =
  'Dojrzałe podejście nie pyta „czy jesteśmy bezpieczni” (odpowiedź zawsze brzmi „nie w 100%”), tylko zarządza ryzykiem. ' +
  'Ryzyka nie da się sprowadzić do zera w całej organizacji: pojedyncze ryzyko można obniżać, przenosić (ubezpieczenie), akceptować albo unikać, rezygnując z działania, które je wywołuje. ' +
  'Dlatego wszystkie nowoczesne regulacje mówią o „zarządzaniu ryzykiem”, a nie o konkretnej liście produktów.';

// ─── Helpers ──────────────────────────────────────────────

const label = text => el('div', { class: 'label' }, text);

/** "Naruszenie = wyciek danych. …" → "Wyciek danych. …" */
function violationText(raw) {
  const t = raw.replace(/^Naruszenie\s*=\s*/, '');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// ─── 1.1 Triada CIA ───────────────────────────────────────

function ciaColumn(key) {
  const p = CIA_TRIAD[key];
  const examples = CIA_SCENARIOS.filter(s => s.answer === key).slice(0, EXAMPLES_PER_PROPERTY);
  return {
    key: p.id,
    title: p.namePL,
    sub: p.name,
    body: [
      el('p', {}, p.description),
      label('Naruszenie'),
      el('p', {}, violationText(p.violationExample)),
      p.questions?.length ? [label('Pytania'), bullets(p.questions)] : null,
      label('Zabezpieczenia'),
      bullets(p.controls),
      examples.length ? label('Przykłady incydentów') : null,
      examples.map(s => el('p', { class: 'example' }, el('b', {}, s.text), ' ', s.explanation)),
    ].flat(2).filter(Boolean),
  };
}

// ─── 1.2 Najczęstsze zagrożenia ───────────────────────────

/** "Dostępność (A) – …; Poufność (C) – …" → one tag per violated property. */
function ciaTags(text) {
  const names = [...text.matchAll(/(Poufność|Integralność|Dostępność) \(([CIA])\)/g)].map(m => `${m[1]} (${m[2]})`);
  return names.length
    ? names.map(n => el('div', {}, el('span', { class: 'cell-tag' }, el('i'), n)))
    : text;
}

/** First sentence goes to the table cell, the rest to the expandable detail. */
function splitFirstSentence(text) {
  const m = text.match(/^(.+?\.)\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ])(.*)$/s);
  return m ? [m[1], m[2]] : [text, ''];
}

function threatRows() {
  return THREATS.map(t => {
    const [effectShort, effectMore] = splitFirstSentence(t.effect);
    return {
      th: t.name,
      cells: [t.entryPoint, effectShort, ciaTags(t.cia), t.defense],
      detail: [
        el('p', {}, t.front),
        effectMore ? labelled('Skutek: ', effectMore) : null,
        labelled('Narusza: ', t.cia),
        el('p', { class: 'example' }, el('b', {}, 'Przykład: '), t.example),
      ].filter(Boolean),
    };
  });
}

// ─── 1.3 Ryzyko ───────────────────────────────────────────

function riskItems() {
  return RISK_RESPONSES.map(r => {
    const cases = RISK_SCENARIOS.filter(s => s.correctResponse === r.id);
    return {
      title: r.name,
      summary: r.description,
      detail: [
        labelled('Kiedy stosować: ', r.whenToUse),
        eyebrow('Przykłady'),
        bullets(r.examples),
        labelled('Koszt: ', r.cost),
        cases.length ? eyebrow('Przykład z praktyki') : null,
        ...cases.map(s => el('p', { class: 'example' }, el('b', {}, s.risk + '. '), s.explanation)),
      ].filter(Boolean),
    };
  });
}

// ─── Render ───────────────────────────────────────────────

export function renderFundamenty() {
  const [s1, s2, s3] = getModule(MODULE_ID).sections;

  return el('div', { class: 'module-page' },
    moduleHeader(MODULE_ID),

    section({ id: s1.id, title: s1.title, intro: INTRO_CIA, block: 'propertyColumns' },
      propertyColumns(CIA_ORDER.map(ciaColumn)),
    ),

    section({ id: s2.id, title: s2.title, intro: INTRO_THREATS, block: 'compareTable', tone: 'tint' },
      compareTable({
        caption: 'Najczęstsze zagrożenia: punkt wejścia, skutek, naruszane właściwości CIA i obrona',
        head: ['Zagrożenie', 'Punkt wejścia', 'Skutek', 'Narusza (CIA)', 'Obrona'],
        rows: threatRows(),
        minWidth: 750,
      }),
    ),

    section({ id: s3.id, title: s3.title, intro: INTRO_RISK, block: 'numberedList' },
      callout({
        tone: 'key',
        iconName: 'bar-chart-2',
        title: 'Ryzyko = prawdopodobieństwo × skutek',
        text: 'Im bardziej prawdopodobne zdarzenie i im dotkliwsze jego skutki, tym wyższe ryzyko. Na tej podstawie wybiera się jedną z czterech odpowiedzi.',
      }),
      numberedList(riskItems()),
    ),

    moduleFooter(MODULE_ID),
  );
}
