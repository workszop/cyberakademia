// ============================================================
// CyberAkademia — modules/home.js
// Landing page / dashboard
// ============================================================

import { el } from '../dom.js';
import { getProgress, getState, isCompleted } from '../store.js';
import { createProgressRing } from '../primitives/progressRing.js';
import { icon } from '../icons.js';

const MODULES = [
  {
    id: 'fundamenty',
    hash: '#/fundamenty',
    iconName: 'shield',
    title: 'Fundamenty',
    desc: 'Triada CIA, zarządzanie ryzykiem i krajobraz zagrożeń — fundament całej reszty.',
    badge: 'Moduł 1',
    time: '~25 min',
  },
  {
    id: 'regulacje',
    hash: '#/regulacje',
    iconName: 'clipboard-list',
    title: 'Regulacje',
    desc: 'NIS2/KSC, DORA, RODO — co trzeba zrobić i kto za to odpowiada.',
    badge: 'Moduł 2',
    time: '~20 min',
  },
  {
    id: 'organizacja',
    hash: '#/organizacja',
    iconName: 'building-2',
    title: 'Organizacja',
    desc: 'Role, SOC, CSIRT — kto i jak realizuje obowiązki wynikające z regulacji.',
    badge: 'Moduł 3',
    time: '~20 min',
  },
  {
    id: 'technologia',
    hash: '#/technologia',
    iconName: 'cpu',
    title: 'Technologia',
    desc: 'Narzędzia, które wykrywają i blokują ataki — SIEM, EDR, firewall, MFA i inne.',
    badge: 'Moduł 4',
    time: '~30 min',
  },
  {
    id: 'spiecie',
    hash: '#/spiecie',
    iconName: 'layers',
    title: 'Spięcie',
    desc: 'Jak regulacja, organizacja i technologia łączą się w jeden spójny system — tabela spięcia z dokumentu.',
    badge: 'Moduł 5',
    time: '~25 min',
  },
  {
    id: 'slownik',
    hash: '#/slownik',
    iconName: 'book-open',
    title: 'Słownik',
    desc: 'Wszystkie akronimy i pojęcia — fiszki Leitner do nauki spaced repetition.',
    badge: 'Słownik',
    time: 'Zawsze',
  },
  {
    id: 'sciezka',
    hash: '#/sciezka',
    iconName: 'map',
    title: 'Ścieżka',
    desc: 'Twój plan nauki i zdobyte odznaki — wizualizacja postępu.',
    badge: 'Ścieżka',
    time: 'Zawsze',
  },
  {
    id: 'finalboss',
    hash: '#/finalboss',
    iconName: 'target',
    title: 'Final Boss',
    desc: 'Wielki egzamin końcowy ze wszystkich modułów. Czy jesteś gotowy?',
    badge: 'Egzamin',
    time: '~45 min',
  },
];

export function renderHome() {
  const { completed: completedCount, totalModules, pct } = getProgress();
  const state = getState();

  const wrap = el('div', { class: 'fade-in' });

  // ── Hero ─────────────────────────────────────────────────
  const heroIconWrap = el('div', { style: { marginBottom: '0.5rem' } });
  heroIconWrap.appendChild(icon('shield', 48));
  const hero = el('div', { class: 'home-hero' },
    heroIconWrap,
    el('h1', {}, 'CyberAkademia'),
    el('p', {},
      'Cyberbezpieczeństwo w firmie najłatwiej zrozumieć, jeśli rozłożyć je na trzy warstwy: ' +
      'Regulacje mówią co trzeba zrobić i kto za to odpowiada. ' +
      'Organizacja to kto i jak to robi. ' +
      'Technologia to czym się to robi.'
    ),
  );

  // ── Stats ────────────────────────────────────────────────
  const statsRow = el('div', { class: 'home-stats' },
    el('div', { class: 'home-stat' },
      el('span', { class: 'home-stat-value' }, String(completedCount)),
      el('span', { class: 'home-stat-label' }, 'Modułów ukończonych')
    ),
    el('div', { class: 'home-stat' },
      el('span', { class: 'home-stat-value' }, String(totalModules - completedCount)),
      el('span', { class: 'home-stat-label' }, 'Pozostało')
    ),
    el('div', { class: 'home-stat' },
      el('span', { class: 'home-stat-value' }, `${pct}%`),
      el('span', { class: 'home-stat-label' }, 'Ukończono')
    ),
    el('div', { class: 'home-stat' },
      el('span', { class: 'home-stat-value' }, String(state.badges?.length ?? 0)),
      el('span', { class: 'home-stat-label' }, 'Odznak')
    ),
  );

  hero.appendChild(statsRow);

  // Add overall progress ring
  const ringWrap = el('div', { style: { display: 'flex', justifyContent: 'center', marginTop: '1rem' } });
  const ring = createProgressRing(pct, 'Ogólny postęp', 100);
  ringWrap.appendChild(ring);
  hero.appendChild(ringWrap);

  // CTA
  const ctaBtn = el('a', {
    href: completedCount === 0 ? '#/fundamenty' : '#/sciezka',
    class: 'btn btn-primary btn-lg',
    style: { marginTop: '1.5rem', display: 'inline-flex' },
  }, completedCount === 0 ? 'Zacznij naukę' : 'Twoja ścieżka');
  hero.appendChild(ctaBtn);

  wrap.appendChild(hero);

  // ── Module grid ──────────────────────────────────────────
  const gridSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Moduły')
  );

  const grid = el('div', { class: 'card-grid' });

  MODULES.forEach(mod => {
    const done = isCompleted(mod.id);
    const score = state.scores?.[mod.id];

    const cardIconEl = el('div', { class: 'module-card-icon' });
    cardIconEl.appendChild(icon(mod.iconName, 24));

    const card = el('a', {
      href: mod.hash,
      class: `module-card${done ? ' completed' : ''}`,
    },
      cardIconEl,
      el('div', { class: 'module-card-title' }, mod.title),
      el('div', { class: 'module-card-desc' }, mod.desc),
      el('div', { class: 'module-card-meta' },
        el('span', { class: 'badge' }, mod.time),
        done
          ? el('span', { class: 'badge badge-success' }, score ? score.pct + '%' : 'Zaliczone')
          : el('span', { class: 'badge' }, mod.badge)
      )
    );

    grid.appendChild(card);
  });

  gridSection.appendChild(grid);
  wrap.appendChild(gridSection);

  // ── Quick tips ───────────────────────────────────────────
  const tips = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Jak korzystać'),
    el('div', { class: 'card-grid' },
      el('div', { class: 'card' },
        el('div', { class: 'card-title' }, 'Logika jest jednokierunkowa'),
        el('div', { class: 'card-body' }, 'Regulacja wymusza powstanie organizacji, a organizacja sięga po technologię. Prawo nie mówi "kup SIEM" — mówi "musisz wykrywać i zgłaszać incydenty".')
      ),
      el('div', { class: 'card' },
        el('div', { class: 'card-title' }, 'Akronimy z tooltipami'),
        el('div', { class: 'card-body' }, 'Skróty (CIA, SIEM, MFA, DORA…) są podkreślone — najedź myszką, by zobaczyć definicję. W Słowniku znajdziesz fiszki z całym słownikiem pojęć.')
      ),
      el('div', { class: 'card' },
        el('div', { class: 'card-title' }, 'Ćwicz, nie tylko czytaj'),
        el('div', { class: 'card-body' }, 'Każdy moduł ma interakcję — sortowanie scenariuszy, łączenie pojęć, quizy. Wiedza zostaje, gdy się jej użyje.')
      ),
    )
  );
  wrap.appendChild(tips);

  return wrap;
}
