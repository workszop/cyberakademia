// ============================================================
// CyberAkademia - modules/integracja.js
// Module 5: how regulations, organisation and technology fit
// together (NIST CSF 2.0, layer map, ransomware case, pitfalls,
// maturity levels). Reading material only.
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import {
  moduleHeader, moduleFooter, section,
  propertyColumns, compareTable, caseStudy, numberedList, process,
  bullets, callout, labelled,
} from '../sections.js';
import { NIST_FUNCTIONS } from '../content/regulacje.js';
import { CONNECTIONS, MORAL, RANSOMWARE_CASE, ANTIPATTERNS, MATURITY_LEVELS } from '../content/spiecie.js';

// ─── Constants ────────────────────────────────────────────

const MODULE_ID = 'integracja';

// Official NIST CSF 2.0 function identifiers.
const NIST_KEYS = { govern: 'GV', identify: 'ID', protect: 'PR', detect: 'DE', respond: 'RS', recover: 'RC' };

const MAX_EXAMPLES = 3;

// ─── Helpers ──────────────────────────────────────────────

function more(...children) {
  return el('details', { class: 'step-more' }, el('summary', {}, 'Więcej'), ...children);
}

// ─── Sections ─────────────────────────────────────────────

function nistSection(meta) {
  const items = NIST_FUNCTIONS.map(f => ({
    key: NIST_KEYS[f.id] || f.name.charAt(0),
    title: f.name,
    body: [
      el('p', {}, f.description),
      bullets(f.examples.slice(0, MAX_EXAMPLES)),
      more(el('p', {}, f.detail)),
    ],
  }));
  return section({
    ...meta,
    intro: 'NIST CSF 2.0 definiuje sześć funkcji zarządzania cyberbezpieczeństwem. Govern (Zarządzaj) doszła w wersji 2.0, pozostałe pięć znano już z wersji 1.1.',
    block: 'propertyColumns',
  }, propertyColumns(items, { cols: 3 }));
}

function connectionsSection(meta) {
  const rows = CONNECTIONS.map(c => ({
    th: c.label,
    cells: [c.regulatory, c.organizational, c.technology, c.example],
    detail: [
      el('p', {}, c.regulatoryDetail),
      labelled('Błędne podejście: ', c.wrongApproach),
    ],
  }));
  return section({
    ...meta,
    intro: 'Dojrzałe bezpieczeństwo wymaga połączenia trzech warstw. Każdy wiersz łączy wymóg regulacyjny (co nakazuje prawo) z tym, co robi organizacja (proces i role), oraz z technologią, która ten proces obsługuje. Rozwiń wiersz, żeby zobaczyć szczegóły przepisów i typowy błąd.',
    block: 'compareTable',
    tone: 'tint',
  },
    compareTable({
      head: ['Obszar', 'Regulacja (co i kto)', 'Organizacja (kto i jak)', 'Technologia (czym)', 'Przykład'],
      rows,
      caption: 'Powiązania: regulacja, organizacja, technologia',
      minWidth: 760,
    }),
    callout({ title: 'Morał', text: MORAL, tone: 'key', iconName: 'key' }),
  );
}

function caseSection(meta) {
  return section({
    ...meta,
    intro: 'Atak ransomware krok po kroku: od pierwszego alertu, przez ocenę szkód, po wnioski. Przy każdym etapie właściwa decyzja i to, czego unikać.',
    block: 'caseStudy',
  }, caseStudy(RANSOMWARE_CASE));
}

function antipatternsSection(meta) {
  const items = ANTIPATTERNS.map(a => ({
    title: a.name,
    summary: a.description,
    detail: [
      labelled('Przykład: ', a.example),
      labelled('Jak naprawić: ', a.fix),
    ],
  }));
  return section({
    ...meta,
    intro: 'Cztery błędy, przez które pieniądze i praca włożone w bezpieczeństwo nie dają ochrony. Przy każdym jest przykład i sposób naprawy.',
    block: 'numberedList',
    tone: 'wash',
  }, numberedList(items));
}

function maturitySection(meta) {
  const steps = MATURITY_LEVELS.map(m => ({
    num: m.level,
    meta: `Poziom ${m.level}`,
    title: m.name,
    text: m.description,
    detail: [
      bullets(m.characteristics),
      labelled('Następny krok: ', m.nextStep),
    ],
  }));
  return section({
    ...meta,
    intro: 'Uproszczona skala czterech poziomów. Pomaga ocenić, gdzie organizacja jest dziś i co zrobić w następnej kolejności.',
    block: 'process',
  }, process(steps, { direction: 'vertical' }));
}

const BUILDERS = {
  '5.1': nistSection,
  '5.2': connectionsSection,
  '5.3': caseSection,
  '5.4': antipatternsSection,
  '5.5': maturitySection,
};

// ─── Render ───────────────────────────────────────────────

export function renderIntegracja() {
  const mod = getModule(MODULE_ID);
  const sections = mod.sections.map(s => BUILDERS[s.id]({ id: s.id, title: s.title }));
  return el('div', { class: 'module-page' }, moduleHeader(MODULE_ID), ...sections, moduleFooter(MODULE_ID));
}
