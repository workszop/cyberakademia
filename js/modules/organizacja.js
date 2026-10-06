// ============================================================
// CyberAkademia - modules/organizacja.js
// Module 3: roles, SOC, incident response, governance, processes.
// Reading material only; data sourced from js/content/organizacja.js
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import {
  moduleHeader, moduleFooter, section, eyebrow, bullets, callout,
  compareTable, process, numberedList, hierarchy, labelled,
} from '../sections.js';
import {
  ROLES,
  SOC_COMPONENTS,
  SOC_MODELS,
  IR_PHASES,
  PROCESSES,
  GOVERNANCE_FRAMEWORKS,
} from '../content/organizacja.js';

// ─── Constants ────────────────────────────────────────────

const MODULE_ID = 'organizacja';

// Tiers of the role hierarchy, derived from ROLES[].reports_to
const ROLE_TIERS = [
  { title: 'Nadzór', ids: ['zarzad'] },
  { title: 'Raportują do zarządu', ids: ['ciso', 'cso-cio-cto', 'dpo'] },
  { title: 'Raportują do CISO', ids: ['analitycy'] },
];

// Groups of SOC components (the zones of the former "Zbuduj swój SOC")
const SOC_GROUPS = [
  { id: 'people', label: 'Ludzie' },
  { id: 'processes', label: 'Procesy' },
  { id: 'technology', label: 'Technologia' },
];

const INTROS = {
  '3.1': 'Za cyberbezpieczeństwo odpowiada wiele osób, od zarządu po analityków SOC. To, kto komu raportuje i kto za co odpowiada, decyduje, czy organizacja reaguje sprawnie, czy w chaosie.',
  '3.2': 'SOC (centrum operacji bezpieczeństwa) to zespół wraz z narzędziami i procesami, który przez całą dobę monitoruje i analizuje zagrożenia, wykrywa je i na nie reaguje. Składa się z trzech filarów: ludzi, procesów i technologii. Nie da się go po prostu kupić.',
  '3.3': 'SOC można zbudować we własnym zakresie, zlecić zewnętrznemu dostawcy albo połączyć oba podejścia. Wybór zależy od budżetu, wymagań regulacyjnych i tego, jak dużą kontrolę nad danymi organizacja chce zachować.',
  '3.4': 'Reagowanie na incydent to uporządkowany proces w siedmiu fazach: od przygotowania jeszcze przed atakiem, przez powstrzymanie i odtworzenie, aż po wnioski. Każda faza ma swoje działania i wymogi regulacyjne (NIS2/KSC, DORA).',
  '3.5': 'Ramy ładu (governance) to sprawdzone wzorce, które porządkują zarządzanie bezpieczeństwem i pomagają spełnić wymagania NIS2/KSC i DORA. Nie wykluczają się i często stosuje się je razem.',
  '3.6': 'Bezpieczeństwo opiera się na powtarzalnych, udokumentowanych procesach. Dopiero one sprawiają, że narzędzia i ludzie tworzą sprawną obronę.',
};

// ─── Render: sections ─────────────────────────────────────

function renderRoles(s) {
  const levels = ROLE_TIERS.map(tier => ({
    title: tier.title,
    items: tier.ids
      .map(id => ROLES.find(r => r.id === id))
      .filter(Boolean)
      .map(r => ({
        title: r.name,
        text: r.responsibility,
        detail: [
          r.reports_to ? labelled('Raportuje do: ', r.reports_to) : null,
          bullets(r.keyActions),
          r.trap ? callout({ title: 'Pułapka', text: r.trap, tone: 'warn', iconName: 'alert-triangle' }) : null,
        ].filter(Boolean),
      })),
  }));
  return section({ ...s, intro: INTROS[s.id], block: 'hierarchy' }, hierarchy(levels));
}

function renderSocComponents(s) {
  const groups = SOC_GROUPS.flatMap(g => [
    el('h3', { class: 'sub-h' }, g.label),
    numberedList((SOC_COMPONENTS[g.id] || []).map(c => ({
      title: c.name,
      summary: c.description,
      detail: c.detail,
    }))),
  ]);
  return section({ ...s, intro: INTROS[s.id], block: 'numberedList', tone: 'tint' },
    callout({
      title: 'Analogia',
      text: 'SOC to „centrum monitoringu albo dyspozytornia 112” dla infrastruktury cyfrowej firmy. Ktoś patrzy na ekrany 24/7, a gdy zapali się alarm, uruchamia procedurę.',
      iconName: 'eye',
    }),
    groups,
  );
}

function renderSocModels(s) {
  const table = compareTable({
    caption: 'Porównanie modeli SOC',
    head: ['Model', 'Zalety', 'Wady', 'Dla kogo'],
    rows: SOC_MODELS.map(m => ({
      th: el('b', {}, m.name),
      cells: [bullets(m.pros), bullets(m.cons), m.bestFor],
      detail: m.relatedConcept ? labelled('Warto wiedzieć: ', m.relatedConcept) : null,
    })),
  });
  return section({ ...s, intro: INTROS[s.id], block: 'compareTable' }, table);
}

function renderIrCycle(s) {
  const steps = IR_PHASES.map((p, i) => ({
    num: i + 1,
    title: p.name,
    text: p.description,
    detail: [
      el('p', {}, p.detail),
      p.regulatoryLink ? labelled('Wymóg: ', p.regulatoryLink) : null,
    ].filter(Boolean),
  }));
  return section({ ...s, intro: INTROS[s.id], block: 'process' }, process(steps, { direction: 'horizontal' }));
}

function renderGovernance(s) {
  const table = compareTable({
    caption: 'Porównanie ram ładu',
    head: ['Rama', 'Opis', 'Kiedy użyć', 'Mocne strony'],
    rows: GOVERNANCE_FRAMEWORKS.map(fw => ({
      th: el('b', {}, fw.name),
      cells: [fw.description, fw.useCase, bullets(fw.strengths)],
      detail: fw.relation ? labelled('Relacja do regulacji i innych ram: ', fw.relation) : null,
    })),
  });
  return section({ ...s, intro: INTROS[s.id], block: 'compareTable', tone: 'wash' }, table);
}

function renderProcesses(s) {
  const items = PROCESSES.map(p => ({
    title: p.name,
    summary: p.description,
    detail: [
      el('p', {}, p.fullDescription),
      p.regulatoryReq ? labelled('Wymóg regulacyjny: ', p.regulatoryReq) : null,
      p.keyMetrics?.length ? el('div', {}, eyebrow('Mierniki'), bullets(p.keyMetrics)) : null,
    ].filter(Boolean),
  }));
  return section({ ...s, intro: INTROS[s.id], block: 'numberedList' }, numberedList(items));
}

const RENDERERS = {
  '3.1': renderRoles,
  '3.2': renderSocComponents,
  '3.3': renderSocModels,
  '3.4': renderIrCycle,
  '3.5': renderGovernance,
  '3.6': renderProcesses,
};

// ─── Render: page ─────────────────────────────────────────

export function renderOrganizacja() {
  const mod = getModule(MODULE_ID);
  const sections = mod.sections.map(s => RENDERERS[s.id]({ id: s.id, title: s.title }));
  return el('div', { class: 'module-page' }, moduleHeader(MODULE_ID), ...sections, moduleFooter(MODULE_ID));
}
