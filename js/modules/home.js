// ============================================================
// CyberAkademia - modules/home.js
// Start: the course as a map of three layers + "Następny krok"
// ============================================================

import { el } from '../dom.js';
import { icon } from '../icons.js';
import { getModule, COURSE_MODULES, LAYERS } from '../course.js';
import { getModuleProgress, getCourseProgress, getNextSection, isRead } from '../store.js';
import { eyebrow, chips } from '../sections.js';

// ─── Helpers ──────────────────────────────────────────────

function progressLine(mod) {
  const p = getModuleProgress(mod.id);
  const label = p.read === 0 ? 'Nieprzeczytany'
    : p.read === p.total ? 'Przeczytany'
    : `${p.read} z ${p.total} sekcji`;
  return el('div', { class: 'st-meta' },
    el('span', { class: 'mono' }, `Moduł ${mod.num} · ${mod.time}`),
    el('span', { class: 'mini', 'aria-hidden': 'true' }, el('i', { style: { '--p': String(p.pct) } })),
    el('span', { class: 'go' }, label, icon('arrow-right', 14)),
  );
}

// ─── Render: blocks ───────────────────────────────────────

function stratum(mod, { label } = {}) {
  const layer = LAYERS[mod.layer];
  return el('a', { class: 'stratum', href: mod.route, 'data-layer': mod.layer, 'data-module': mod.id },
    el('div', { class: 'st-label' },
      el('span', { class: 'eyebrow' }, label || layer.name),
      el('strong', {}, mod.title),
      el('span', { class: 'q' }, layer.question),
    ),
    el('div', { class: 'st-body' },
      el('p', {}, mod.desc),
      chips(mod.concepts),
    ),
    progressLine(mod),
  );
}

function connector(rel, note) {
  return el('div', { class: 'connector', 'aria-hidden': 'true' },
    el('span', { class: 'rel' }, icon('arrow-down', 16), rel),
    note ? el('span', { class: 'note' }, note) : null,
  );
}

function progressStrip() {
  const c = getCourseProgress();
  return el('div', { class: 'progress-strip' },
    el('div', { class: 'ps-nums' },
      el('div', { class: 'ps-num' }, el('strong', {}, `${c.pct}%`), el('span', {}, 'kursu przeczytane')),
      el('div', { class: 'ps-num' }, el('strong', {}, `${c.read}/${c.total}`), el('span', {}, 'sekcji')),
      el('div', { class: 'ps-num' }, el('strong', {}, `${c.modulesDone}/${c.modulesTotal}`), el('span', {}, 'modułów w całości')),
    ),
    el('div', { class: 'ps-bar', 'aria-hidden': 'true' },
      COURSE_MODULES.map(m => el('span', { class: 'ps-seg', 'data-layer': m.layer, title: m.title },
        el('i', { style: { '--p': String(getModuleProgress(m.id).pct) } })))),
    el('div', { class: 'ps-labels', 'aria-hidden': 'true' }, COURSE_MODULES.map(m => el('span', {}, m.title))),
  );
}

function nextPanel() {
  const next = getNextSection();
  if (!next) {
    return el('div', { class: 'next-panel', 'data-next-section': 'done' },
      eyebrow('Lektura ukończona'),
      el('h3', {}, 'Przeczytano wszystkie sekcje'),
      el('p', {}, 'Wracaj do modułów, kiedy chcesz, a skróty i pojęcia znajdziesz w Słowniku.'),
      el('a', { class: 'btn', href: '#/slownik' }, 'Otwórz Słownik', icon('arrow-right', 16)),
    );
  }
  const { module: mod, section: sec } = next;
  return el('div', { class: 'next-panel', 'data-layer': mod.layer, 'data-next-section': `${mod.id}:${sec.id}` },
    eyebrow('Następny krok'),
    el('h3', {}, `${mod.title} · ${sec.id}`, el('br'), sec.title),
    el('p', {}, `Moduł ${mod.num} z ${COURSE_MODULES.length} · ${mod.time}`),
    el('ol', { class: 'next-list' },
      mod.sections.map(s => el('li', { class: s.id === sec.id ? 'is-next' : '' },
        el('span', { class: 'mono' }, s.id),
        el('span', {}, s.title),
        isRead(mod.id, s.id) ? icon('check', 14) : el('span'),
      ))),
    el('a', { class: 'btn', href: `${mod.route}?s=${sec.id}` }, sec.id === mod.sections[0].id ? 'Zacznij' : 'Czytaj dalej', icon('arrow-right', 16)),
  );
}

// ─── Render: page ─────────────────────────────────────────

export function renderHome() {
  const fund = getModule('fundamenty');
  const integracja = getModule('integracja');
  const plan = getModule('plan');
  const slownik = getModule('slownik');

  const head = el('header', { class: 'start-head' },
    el('div', {},
      eyebrow('Kurs · cyberbezpieczeństwo w organizacji'),
      el('h1', {}, 'Cyberbezpieczeństwo ', el('em', {}, 'w trzech warstwach')),
      el('p', { class: 'lead' },
        'Najłatwiej je zrozumieć, gdy rozłożymy je na trzy warstwy: ',
        el('b', { class: 't-reg' }, 'regulacje'), ' określają, co trzeba zrobić i kto za to odpowiada; ',
        el('b', { class: 't-org' }, 'organizacja'), ' pokazuje, kto i jak realizuje te obowiązki; ',
        el('b', { class: 't-tech' }, 'technologia'), ' wskazuje, jakimi narzędziami można to osiągnąć.'),
    ),
    progressStrip(),
  );

  const map = el('section', { class: 'map', 'aria-labelledby': 'map-h' },
    el('div', { class: 'map-head' },
      el('h2', { id: 'map-h' }, 'Mapa kursu'),
      el('p', {}, 'Kliknij warstwę, aby przejść do modułu. Strzałki pokazują kierunek zależności.'),
    ),
    stratum(fund, { label: 'Podstawy' }),
    connector('na tym stoją trzy warstwy'),
    el('div', { class: 'strata' },
      stratum(getModule('regulacje'), { label: 'Warstwa 1' }),
      connector('wymusza', 'Prawo nie mówi: „kup SIEM”. Mówi raczej: „musisz wykrywać i zgłaszać incydenty”.'),
      stratum(getModule('organizacja'), { label: 'Warstwa 2' }),
      connector('sięga po', 'Dopiero zespół i procesy decydują, jakie narzędzia są potrzebne.'),
      stratum(getModule('technologia'), { label: 'Warstwa 3' }),
    ),
    connector('razem tworzą system'),
    el('div', { class: 'synth-row' },
      stratum(integracja, { label: 'Synteza' }),
      stratum(plan, { label: 'Synteza' }),
    ),
    el('a', { class: 'ref-tile', href: slownik.route, 'data-layer': 'ref' },
      icon('book-open', 20),
      el('span', {}, el('b', {}, 'Słownik'), el('span', {}, slownik.desc)),
      icon('arrow-right', 16),
    ),
  );

  const side = el('aside', { class: 'side' },
    nextPanel(),
    el('div', { class: 'howto' },
      el('h3', {}, 'Jak korzystać'),
      el('ol', {},
        el('li', {}, el('span', { class: 'mono' }, '01'),
          el('div', {}, el('b', {}, 'Czytaj w kolejności warstw'),
            el('span', {}, 'Regulacja wymusza powstanie organizacji, a organizacja sięga po technologię. Sekcja zalicza się sama, gdy dojdziesz do jej końca.'))),
        el('li', {}, el('span', { class: 'mono' }, '02'),
          el('div', {}, el('b', {}, 'Skróty z podpowiedziami'),
            el('span', {}, 'Podkreślone skróty (CIA, SIEM, MFA, DORA…) pokazują definicję po najechaniu kursorem.'))),
        el('li', {}, el('span', { class: 'mono' }, '03'),
          el('div', {}, el('b', {}, 'Klawiatura'),
            el('span', {}, 'J i K przechodzą między sekcjami, N otwiera następny krok, ? pokazuje wszystkie skróty.'))),
      ),
    ),
  );

  return el('div', { class: 'start' }, head, el('div', { class: 'start-body' }, map, side));
}
