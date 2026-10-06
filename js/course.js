// ============================================================
// CyberAkademia - course.js
// Single source of truth for course structure: modules, groups,
// layers, section lists. Used by the shell, Start, footers and store.
// ============================================================

// ─── Layers ───────────────────────────────────────────────

export const LAYERS = {
  base:  { id: 'base',  name: 'Podstawy',     question: 'Na czym to stoi?' },
  reg:   { id: 'reg',   name: 'Regulacje',    question: 'Co trzeba zrobić i kto odpowiada?' },
  org:   { id: 'org',   name: 'Organizacja',  question: 'Kto i jak to realizuje?' },
  tech:  { id: 'tech',  name: 'Technologia',  question: 'Jakimi narzędziami?' },
  synth: { id: 'synth', name: 'Synteza',      question: 'Jak to się łączy?' },
  ref:   { id: 'ref',   name: 'Materiały',    question: 'Pojęcia i skróty' },
};

// ─── Modules ──────────────────────────────────────────────

const MODULES = [
  {
    id: 'fundamenty',
    num: 1,
    route: '#/fundamenty',
    title: 'Fundamenty',
    fullTitle: 'Fundamenty cyberbezpieczeństwa',
    layer: 'base',
    icon: 'shield',
    time: '~15 min',
    lead: 'Zanim przejdziemy do skrótów: trzy pojęcia, na których opiera się cała reszta.',
    desc: 'Triada CIA, najczęstsze zagrożenia i zarządzanie ryzykiem.',
    concepts: ['Triada CIA', 'Ransomware', 'Phishing', 'Ryzyko'],
    sections: [
      { id: '1.1', title: 'Triada CIA' },
      { id: '1.2', title: 'Najczęstsze zagrożenia' },
      { id: '1.3', title: 'Ryzyko zamiast „czy jesteśmy bezpieczni”' },
    ],
  },
  {
    id: 'regulacje',
    num: 2,
    route: '#/regulacje',
    title: 'Regulacje',
    fullTitle: 'Regulacje cyberbezpieczeństwa',
    layer: 'reg',
    icon: 'clipboard-list',
    time: '~20 min',
    lead: 'Regulacje mówią, co trzeba zrobić i kto za to odpowiada: NIS2/KSC, DORA, RODO, normy ISO.',
    desc: 'NIS2/KSC, DORA i RODO: co trzeba zrobić i kto za to odpowiada.',
    concepts: ['NIS2 / KSC', 'DORA', 'RODO', 'ISO/IEC 27001', 'DPO a CISO'],
    sections: [
      { id: '2.1', title: 'Dyrektywa czy rozporządzenie' },
      { id: '2.2', title: 'Porównanie regulacji' },
      { id: '2.3', title: 'Oś czasu' },
      { id: '2.4', title: 'Obowiązki NIS2/KSC' },
      { id: '2.5', title: 'DORA: pięć filarów' },
      { id: '2.6', title: 'DPO a CISO' },
    ],
  },
  {
    id: 'organizacja',
    num: 3,
    route: '#/organizacja',
    title: 'Organizacja',
    fullTitle: 'Organizacja cyberbezpieczeństwa',
    layer: 'org',
    icon: 'building-2',
    time: '~20 min',
    lead: 'Organizacja określa, kto i jak to robi: role, zespoły (np. SOC) i procesy reagowania na incydenty.',
    desc: 'Role, SOC i CSIRT: kto i jak wykonuje obowiązki wynikające z regulacji.',
    concepts: ['Role', 'SOC', 'CSIRT', 'Reagowanie na incydenty', 'Ramy ładu'],
    sections: [
      { id: '3.1', title: 'Role w cyberbezpieczeństwie' },
      { id: '3.2', title: 'Z czego składa się SOC' },
      { id: '3.3', title: 'Modele SOC' },
      { id: '3.4', title: 'Cykl reagowania na incydenty' },
      { id: '3.5', title: 'Ramy ładu' },
      { id: '3.6', title: 'Procesy bezpieczeństwa' },
    ],
  },
  {
    id: 'technologia',
    num: 4,
    route: '#/technologia',
    title: 'Technologia',
    fullTitle: 'Technologia cyberbezpieczeństwa',
    layer: 'tech',
    icon: 'cpu',
    time: '~25 min',
    lead: 'Technologia mówi, czym się to robi: narzędzia, które wykrywają, ograniczają lub blokują ataki.',
    desc: 'Narzędzia, które wykrywają i blokują ataki: SIEM, EDR, zapory sieciowe, MFA i inne.',
    concepts: ['Obrona warstwowa', 'SIEM', 'EDR', 'MFA', 'Zero Trust', 'Backup 3-2-1'],
    sections: [
      { id: '4.1', title: 'Obrona warstwowa' },
      { id: '4.2', title: 'Narzędzia według kategorii' },
      { id: '4.3', title: 'Zero Trust' },
      { id: '4.4', title: 'Kopie zapasowe 3-2-1' },
    ],
  },
  {
    id: 'integracja',
    num: 5,
    route: '#/integracja',
    title: 'Integracja',
    fullTitle: 'Integracja obrony',
    layer: 'synth',
    icon: 'layers',
    time: '~20 min',
    lead: 'Jak regulacje, organizacja i technologia łączą się w całość: wymóg regulacyjny, potem proces i ludzie, na końcu narzędzie.',
    desc: 'Jak trzy warstwy łączą się w jeden system: NIST CSF, tabela powiązań, studium przypadku.',
    concepts: ['NIST CSF 2.0', 'Tabela powiązań', 'Studium: ransomware', 'Dojrzałość'],
    sections: [
      { id: '5.1', title: 'NIST CSF 2.0' },
      { id: '5.2', title: 'Jak warstwy się łączą' },
      { id: '5.3', title: 'Studium przypadku: ransomware' },
      { id: '5.4', title: 'Typowe błędy' },
      { id: '5.5', title: 'Poziomy dojrzałości' },
    ],
  },
  {
    id: 'plan',
    num: 6,
    route: '#/plan',
    title: 'Plan wdrożenia',
    fullTitle: 'Plan wdrożenia',
    layer: 'synth',
    icon: 'map',
    time: '~10 min',
    lead: 'Od czego zacząć w organizacji: siedem kroków i priorytety, które dają najszybszy efekt.',
    desc: 'Siedem kroków „od czego zacząć” i mapa priorytetów.',
    concepts: ['7 kroków', 'Szybkie efekty', 'Działania długoterminowe'],
    sections: [
      { id: '6.1', title: 'Od czego zacząć' },
      { id: '6.2', title: 'Priorytety' },
    ],
  },
  {
    id: 'slownik',
    num: null,
    route: '#/slownik',
    title: 'Słownik',
    fullTitle: 'Słownik cyberbezpieczeństwa',
    layer: 'ref',
    icon: 'book-open',
    time: null,
    lead: 'Wszystkie skróty i pojęcia z kursu w jednym miejscu.',
    desc: 'Skróty i pojęcia od A do Z z filtrem.',
    concepts: [],
    sections: [],
  },
];

// ─── Groups (sidebar order) ───────────────────────────────

export const GROUPS = [
  { id: 'podstawy',  title: 'Podstawy',     modules: ['fundamenty'] },
  { id: 'warstwy',   title: 'Trzy warstwy', modules: ['regulacje', 'organizacja', 'technologia'], relations: ['wymusza', 'sięga po'] },
  { id: 'synteza',   title: 'Synteza',      modules: ['integracja', 'plan'] },
  { id: 'materialy', title: 'Materiały',    modules: ['slownik'] },
];

// ─── Routes ───────────────────────────────────────────────

export const START_ROUTE = '#/';

const ROUTE_ALIASES = {
  '#/spiecie': '#/integracja',
  '#/sciezka': '#/plan',
};

// Modules that count toward reading progress (have sections).
export const COURSE_MODULES = MODULES.filter(m => m.sections.length > 0);

// ─── Lookups ──────────────────────────────────────────────

export function getModule(id) {
  return MODULES.find(m => m.id === id) || null;
}

export function getModuleByRoute(route) {
  return MODULES.find(m => m.route === route) || null;
}

export function getGroupOf(moduleId) {
  return GROUPS.find(g => g.modules.includes(moduleId)) || null;
}

/** Previous / next module in course order (Słownik excluded). */
export function getNeighbours(moduleId) {
  const i = COURSE_MODULES.findIndex(m => m.id === moduleId);
  if (i === -1) return { prev: null, next: null };
  return { prev: COURSE_MODULES[i - 1] || null, next: COURSE_MODULES[i + 1] || null };
}

/** Normalises a hash like '#/regulacje?s=2.3' → { route, params }. */
export function parseHash(hash) {
  const raw = hash && hash.startsWith('#/') ? hash : START_ROUTE;
  const [path, query = ''] = raw.split('?');
  const route = ROUTE_ALIASES[path] || path;
  const params = Object.fromEntries(new URLSearchParams(query));
  return { route, params };
}
