// ============================================================
// CyberAkademia - modules/technologia.js
// Module 4: defence in depth, tools by category, Zero Trust, backup 3-2-1
// Reading material only: sections composed from js/sections.js blocks.
// ============================================================

import { el } from '../dom.js';
import { getModule } from '../course.js';
import {
  moduleHeader, moduleFooter, section,
  layerStack, numberedList, compareTable, split, propertyColumns, statStrip,
  flow, chips, callout, facts, sectionDomId, sourceLink,
} from '../sections.js';
import {
  DEFENSE_LAYERS,
  ATTACK_SCENARIOS,
  SOC_TOOLS,
  NETWORK_TOOLS,
  IDENTITY_TOOLS,
  DATA_PROTECTION,
  OFFENSIVE_TESTING,
} from '../content/technologia.js';

// ─── Constants ────────────────────────────────────────────

const MODULE_ID = 'technologia';

// Defence layers from the network edge inwards, backup as the last line.
const LAYER_ORDER = [
  'ngfw', 'waf', 'segmentation', 'iam-layer', 'mfa', 'pam-layer',
  'edr', 'vuln-mgmt-layer', 'siem-layer', 'dlp-layer', 'backup',
];

// Tools that are already described as a layer in 4.1 (tool id → layer id).
const SEE_LAYER = {
  siem: 'siem-layer',
  'edr-tool': 'edr',
  firewall: 'ngfw',
  'waf-tool': 'waf',
  'iam-tool': 'iam-layer',
  'mfa-tool': 'mfa',
  'pam-tool': 'pam-layer',
  'dlp-protection': 'dlp-layer',
  backup321: 'backup',
};

const ZERO_TRUST_PRINCIPLES = [
  { title: 'Weryfikuj jawnie', sub: 'Verify explicitly', text: 'Zawsze uwierzytelniaj i autoryzuj na podstawie wszystkich dostępnych sygnałów: tożsamości, lokalizacji, urządzenia, usługi, danych, anomalii.' },
  { title: 'Minimalne uprawnienia', sub: 'Least privilege', text: 'Przyznawaj minimalny dostęp niezbędny do wykonania zadania. Just-in-Time (JIT) i Just-Enough-Access (JEA).' },
  { title: 'Zakładaj naruszenie', sub: 'Assume breach', text: 'Zakładaj, że naruszenie już nastąpiło. Ograniczaj zasięg szkód (blast radius), segmentuj dostęp, szyfruj cały ruch.' },
];

// ─── Helpers ──────────────────────────────────────────────

const orderedLayers = () => LAYER_ORDER.map(id => DEFENSE_LAYERS.find(l => l.id === id)).filter(Boolean);
const layerById = id => DEFENSE_LAYERS.find(l => l.id === id);
const layerNum = id => LAYER_ORDER.indexOf(id) + 1;
/** Layer rows are addressable like sub-headings: '4.1.3' → #s-4-1-3 */
const layerRef = id => `4.1.${layerNum(id)}`;

/** "MFA – uwierzytelnianie wieloskładnikowe" → "MFA" */
const shortName = layer => layer.name.split(' – ')[0];

function subHeading(num, text) {
  return el('h3', { class: 'sub-h no-terms', id: sectionDomId(num), tabindex: '-1' }, el('span', { class: 'mono' }, num), ' ', text);
}

/** In-page link; the shell scrolls to the target (section, sub-heading or layer row) and focuses it. */
function localLink(id, label) {
  return el('a', { href: `#/technologia?s=${id}`, class: 'local-reference' }, label);
}

function toolHead(name, full) {
  return [el('span', {}, name), full ? el('span', { class: 'cell-sub' }, full) : null];
}

function listText(arr, sep = ', ') {
  return Array.isArray(arr) && arr.length ? arr.join(sep) : '';
}

/** Cross-reference to a 4.1 layer, used instead of repeating its description. */
function seeLayer(toolId) {
  const layerId = SEE_LAYER[toolId];
  if (!layerId) return null;
  return { label: 'Zob. 4.1', value: localLink(layerRef(layerId), `Warstwa ${String(layerNum(layerId)).padStart(2, '0')}: ${layerById(layerId).name}. Co blokuje, a czego nie.`) };
}

function prosCons(t) {
  return [
    { label: 'Zalety', value: listText(t.pros, '; ') },
    { label: 'Ograniczenia', value: listText(t.cons, '; ') },
  ];
}

// ─── Render: 4.1 ──────────────────────────────────────────

function renderLayers(meta) {
  const scenarios = ATTACK_SCENARIOS.map(sc => ({
    title: sc.name,
    summary: sc.description,
    detail: [
      flow(sc.attackChain),
      el('div', {},
        el('p', {}, el('b', {}, 'Zatrzymują lub ograniczają:')),
        chips(sc.blockedBy.map(id => layerById(id)).filter(Boolean).map(shortName)),
      ),
      el('p', {}, sc.explanation),
    ],
  }));

  return section({
    id: meta.id,
    title: meta.title,
    block: 'layerStack',
    intro: 'Żadna pojedyncza kontrola nie zatrzyma każdego ataku, ale kilka ułożonych jedna za drugą wyraźnie podnosi koszt i ryzyko dla atakującego. Warstwy poniżej idą od brzegu sieci do samych danych. Każda coś blokuje, a czegoś nie, więc głęboką obronę tworzą dopiero razem.',
  },
    layerStack(orderedLayers().map(l => ({
      id: sectionDomId(layerRef(l.id)),
      title: l.name,
      category: l.category,
      text: l.description,
      detail: l.detail,
      blocks: l.blocks,
      notBlocks: l.doesNotBlock,
    }))),
    callout({
      title: 'Zasada porządkująca',
      text: 'Myślenie warstwami chroni przed kupowaniem narzędzi „bo modne”. Każda warstwa powinna odpowiadać konkretnemu ryzyku i obowiązkowi, a luki jednej warstwy domyka kolejna.',
      iconName: 'layers',
    }),
    el('h3', { class: 'sub-h' }, 'Jak warstwy zatrzymują ataki'),
    el('p', { class: 'intro' }, 'Cztery typowe ataki rozpisane na etapy. Rozwiń przykład, żeby zobaczyć łańcuch ataku i warstwy, które go przerywają.'),
    numberedList(scenarios),
  );
}

// ─── Render: 4.2 ──────────────────────────────────────────

function socTable() {
  return compareTable({
    caption: 'Narzędzia centrum operacji bezpieczeństwa',
    head: ['Narzędzie', 'Do czego służy', 'Przykłady'],
    rows: SOC_TOOLS.map(t => ({
      th: toolHead(t.name, t.full),
      cells: [t.description, listText(t.examples)],
      detail: facts([
        { label: 'Analogia', value: t.analogy },
        SEE_LAYER[t.id] ? seeLayer(t.id) : { label: 'Jak działa', value: t.howItWorks },
        ...prosCons(t),
      ]),
    })),
  });
}

function networkTable() {
  return compareTable({
    caption: 'Narzędzia sieciowe',
    head: ['Narzędzie', 'Do czego służy', 'Przykłady'],
    rows: NETWORK_TOOLS.map(t => ({
      th: toolHead(t.name, t.full),
      cells: [t.description, listText(t.examples)],
      detail: facts([
        SEE_LAYER[t.id] ? seeLayer(t.id) : { label: 'Jak działa', value: t.detail },
        { label: 'Zastosowania', value: listText(t.useCases, '; ') },
      ]),
    })),
  });
}

function identityTable() {
  return compareTable({
    caption: 'Narzędzia tożsamości i dostępu',
    head: ['Narzędzie', 'Do czego służy', 'Przykłady'],
    rows: IDENTITY_TOOLS.map(t => {
      let pairs;
      if (t.id === 'zero-trust') {
        pairs = [
          { label: 'Filary', value: listText(t.pillars, '; ') },
          { label: 'Zob. 4.3', value: localLink('4.3', 'Stary model a Zero Trust i trzy zasady podejścia.') },
        ];
      } else if (t.id === 'pam-tool') {
        // Vault, JIT and session recording are in 4.1 – keep only what 4.1 lacks.
        pairs = [
          { label: 'Ponadto', value: 'Zasada czterech oczu przy krytycznych operacjach (multi-party approval) i automatyczne wykrywanie kont uprzywilejowanych (discovery).' },
          { label: 'Rola w Zero Trust', value: t.zeroTrustRelation },
          seeLayer(t.id),
        ];
      } else {
        // IAM and MFA: their own detail (lifecycle, factor types) is not repeated in 4.1.
        pairs = [
          { label: 'Jak działa', value: t.detail },
          { label: 'Rola w Zero Trust', value: t.zeroTrustRelation },
          seeLayer(t.id),
        ];
      }
      return {
        th: toolHead(t.name, t.full),
        cells: [t.description, listText(t.examples)],
        detail: facts(pairs),
      };
    }),
  });
}

function dataTable() {
  const [encryption, backup, dlp] = ['encryption', 'backup321', 'dlp-protection'].map(id => DATA_PROTECTION.find(t => t.id === id));
  return compareTable({
    caption: 'Ochrona danych',
    head: ['Obszar', 'Do czego służy', 'Najważniejsze'],
    rows: [
      {
        th: toolHead(encryption.name),
        cells: [
          'Chroni dane przechowywane (w spoczynku) i przesyłane przez sieć (w tranzycie).',
          'AES-256 w spoczynku, co najmniej TLS 1.2/1.3 w tranzycie.',
        ],
        detail: facts(encryption.types.map(ty => ({
          label: ty.name,
          value: `${ty.description} ${ty.standards} ${ty.regulatoryReq}`,
        }))),
      },
      {
        th: toolHead(backup.name),
        cells: [backup.description, '3 kopie, 2 nośniki, 1 kopia poza siedzibą; offline lub niezmienialność jako osobne zabezpieczenie; testy odtwarzania.'],
        detail: facts([
          { label: 'Zob. 4.4', value: localLink('4.4', 'Zasada 3-2-1, rozszerzenie 3-2-1-1-0 oraz RPO i RTO.') },
          seeLayer(backup.id),
        ]),
      },
      {
        th: toolHead(dlp.name),
        cells: [dlp.description, dlp.prerequisites],
        detail: facts([
          { label: 'Kanały', value: listText(dlp.channels, '; ') },
          { label: 'Regulacje', value: dlp.regulatoryLink },
          seeLayer(dlp.id),
        ]),
      },
    ],
  });
}

function offensiveTable() {
  const byId = id => OFFENSIVE_TESTING.find(t => t.id === id);
  const pentest = byId('pentest');
  const red = byId('red-team');
  const blue = byId('blue-team');
  const tlpt = byId('tlpt');
  return compareTable({
    caption: 'Testowanie ofensywne',
    head: ['Forma', 'Na czym polega', 'Najważniejsze'],
    rows: [
      {
        th: toolHead(pentest.name),
        cells: [pentest.description, 'Black box, white box albo grey box; zakres określa umowa.'],
        detail: facts([
          ...pentest.types.map(ty => ({ label: ty.name, value: ty.description })),
          { label: 'Zakres', value: pentest.scope },
          { label: 'Częstotliwość', value: pentest.frequency },
          { label: 'Regulacje', value: pentest.regulatoryLink },
        ]),
      },
      {
        th: toolHead(red.name),
        cells: [red.description, red.vspentest],
        detail: facts([
          { label: 'Jak działa', value: red.detail },
          { label: 'Regulacje', value: red.regulatoryLink },
        ]),
      },
      {
        th: toolHead(blue.name),
        cells: [blue.description, 'Metryki: MTTD (czas wykrycia) i MTTC (czas opanowania).'],
        detail: facts([
          { label: 'Jak działa', value: blue.detail },
          { label: 'Purple team', value: blue.purpleTeam },
        ]),
      },
      {
        th: toolHead(tlpt.name, tlpt.full),
        cells: [tlpt.description, 'DORA: co 3 lata dla instytucji istotnych, metodyka TIBER-EU.'],
        detail: facts([
          { label: 'Jak działa', value: tlpt.detail },
          { label: 'TIBER-EU', value: tlpt.tiber },
          { label: 'Regulacje', value: tlpt.regulatoryLink },
        ]),
      },
    ],
  });
}

function renderTools(meta) {
  const intro = text => el('p', { class: 'intro' }, text);
  return section({
    id: meta.id,
    title: meta.title,
    block: 'compareTable',
    tone: 'tint',
    intro: 'Pięć grup narzędzi: centrum operacji, sieć, tożsamość, ochrona danych i testy ofensywne. Rozwiń wiersz, żeby zobaczyć, jak narzędzie działa, jego zalety i ograniczenia. Narzędzia opisane już jako warstwy w 4.1 mają w szczegółach odsyłacz zamiast powtórzenia.',
  },
    el('nav', { class: 'tool-nav', 'data-tool-nav': '', 'aria-label': 'Kategorie narzędzi' },
      ['SOC', 'Sieć', 'Tożsamość i dostęp', 'Ochrona danych', 'Testowanie ofensywne'].map((name, i) => localLink(`4.2.${i + 1}`, name))),
    subHeading('4.2.1', 'Centrum operacji bezpieczeństwa (SOC)'),
    intro('Narzędzia SOC wykrywają i obsługują incydenty. Sercem jest SIEM: centrala monitoringu, do której spływają logi i zdarzenia z całej infrastruktury, jak obraz ze wszystkich kamer i czujników w budynku. SOAR automatyzuje reagowanie. Warstwy detekcji różnią się zasięgiem: EDR widzi endpoint, NDR ruch w sieci, XDR łączy oba obrazy, a MDR oddaje całość w ręce zewnętrznego zespołu.'),
    socTable(),
    subHeading('4.2.2', 'Narzędzia sieciowe'),
    intro('Kontrolują ruch wchodzący do sieci, wychodzący z niej i krążący wewnątrz: od bramy (NGFW), przez wykrywanie i blokowanie włamań (IDS/IPS), po ochronę aplikacji webowych (WAF) i bezpieczny dostęp zdalny (VPN/ZTNA).'),
    networkTable(),
    subHeading('4.2.3', 'Tożsamość i dostęp'),
    intro('W modelu Zero Trust granicą bezpieczeństwa nie jest już sieć, lecz tożsamość. IAM porządkuje „kto, do czego, kiedy i jak”, MFA dokłada drugi czynnik, a PAM pilnuje kont uprzywilejowanych, czyli „kluczy do królestwa”.'),
    identityTable(),
    subHeading('4.2.4', 'Ochrona danych'),
    intro('Poufność, integralność i dostępność danych: szyfrowanie (w spoczynku i w tranzycie), kopie zapasowe według zasady 3-2-1 oraz DLP zapobiegające wyciekom.'),
    dataTable(),
    subHeading('4.2.5', 'Testowanie ofensywne'),
    intro('Najlepszy sposób, by sprawdzić obronę, to ją zaatakować w kontrolowanych warunkach: od testu penetracyjnego, przez ćwiczenia Red/Blue Team, po regulacyjne TLPT wymagane przez DORA.'),
    offensiveTable(),
  );
}

// ─── Render: 4.3 ──────────────────────────────────────────

function renderZeroTrust(meta) {
  const zt = IDENTITY_TOOLS.find(t => t.id === 'zero-trust');
  const li = (label, text) => el('li', {}, label ? el('b', {}, label + ' ') : null, text);
  return section({
    id: meta.id,
    title: meta.title,
    block: 'split',
    intro: 'Zero Trust to podejście, nie produkt. Opiera się na zasadzie „nigdy nie ufaj, zawsze weryfikuj”: żaden użytkownik ani urządzenie nie jest domyślnie zaufane, nawet wewnątrz sieci. Stopniowo zastępuje stary model „twardej skorupy, miękkiego środka”, w którym atakujący po przebiciu perymetru ma swobodę wewnątrz.',
  },
    split({
      variant: 'versus',
      left: {
        eyebrow: 'Stary model',
        title: 'Zamek i fosa (castle-and-moat)',
        sub: 'Twardy perymetr, miękki środek',
        tone: 'muted',
        body: el('ul', {},
          li('', zt.oldModel.description),
          li('Słabość:', zt.oldModel.weakness),
        ),
      },
      right: {
        eyebrow: 'Nowy model',
        title: 'Zero Trust',
        sub: 'Każdy zasób weryfikowany z osobna',
        body: el('ul', {},
          li('', zt.newModel.description),
          li('Zysk:', zt.newModel.benefit),
          li('', 'Najmniejsze uprawnienia i mikrosegmentacja. Nawet administrator musi się uwierzytelnić.'),
        ),
      },
    }),
    el('h3', { class: 'sub-h' }, 'Trzy zasady Zero Trust'),
    propertyColumns(ZERO_TRUST_PRINCIPLES.map((p, i) => ({
      key: String(i + 1),
      title: p.title,
      sub: p.sub,
      body: el('p', {}, p.text),
    })), { cols: 3 }),
  );
}

// ─── Render: 4.4 ──────────────────────────────────────────

function renderBackup(meta) {
  const backup = DATA_PROTECTION.find(t => t.id === 'backup321');
  const [r3, r2, r1] = backup.rules;
  const testing = backup.extensions.find(e => e.name === 'Testowanie odtwarzania');
  const ext = backup.extensions.find(e => e.name === '3-2-1-1-0');
  const objective = (abbr, text) => {
    const [head, rest = ''] = text.split(' – ');
    const full = head.replace(abbr, '').trim().replace(/^\(|\)$/g, '');
    return { label: abbr, value: el('span', {}, el('b', {}, full + '. '), rest.charAt(0).toUpperCase() + rest.slice(1)) };
  };
  return section({
    id: meta.id,
    title: meta.title,
    block: 'statStrip',
    intro: 'Sprawdzone kopie zapasowe pomagają odtworzyć dane i ograniczyć przestój po ataku ransomware. Nie zapobiegają wyciekowi danych i nie gwarantują szybkiego wznowienia pracy. Brak kopii nie oznacza, że należy zapłacić okup.',
  },
    statStrip([
      { value: '3', label: 'kopie danych', sub: r3.explanation },
      { value: '2', label: 'różne nośniki', sub: r2.explanation },
      { value: '1', label: 'kopia poza siedzibą', sub: r1.explanation },
    ]),
    el('p', { class: 'source-note' }, 'Zalecana praktyka, nie samodzielny przepis prawa. ', sourceLink('backup')),
    callout({ title: 'Kopia bez testu odtwarzania nie chroni', text: testing.description, tone: 'warn', iconName: 'alert-triangle' }),
    callout({
      title: 'Rozszerzenie 3-2-1-1-0',
      text: `3 kopie, 2 nośniki, 1 poza siedzibą, 1 offline lub immutable (niezmienialna), 0 błędów przy testach odtwarzania. ${ext.description.split('. ').slice(1).join('. ')}`,
    }),
    el('p', { class: 'source-note' }, sourceLink('backupExtension')),
    el('h3', { class: 'sub-h' }, 'RPO i RTO'),
    facts([
      objective('RPO', backup.rtoRpo.rpo),
      objective('RTO', backup.rtoRpo.rto),
    ]),
  );
}

// ─── Page ─────────────────────────────────────────────────

export function renderTechnologia() {
  const mod = getModule(MODULE_ID);
  const renderers = {
    '4.1': renderLayers,
    '4.2': renderTools,
    '4.3': renderZeroTrust,
    '4.4': renderBackup,
  };
  return el('div', { class: 'module-page' },
    moduleHeader(MODULE_ID),
    ...mod.sections.map(s => renderers[s.id](s)),
    moduleFooter(MODULE_ID),
  );
}
