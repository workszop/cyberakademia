// ============================================================
// CyberAkademia - modules/sciezka.js
// Learning path - visual progress and earned badges
// ============================================================

import { el } from '../dom.js';
import { getState, getProgress, isCompleted, getScore, resetProgress, COMPLETABLE_MODULES } from '../store.js';
import { createProgressRing } from '../primitives/progressRing.js';
import { initExpandable } from '../primitives/expandable.js';
import { STEPS } from '../content/sciezka.js';

const PATH_STEPS = [
  {
    id: 'fundamenty',
    hash: '#/fundamenty',
    icon: 'shield',
    title: 'Fundamenty',
    desc: 'Triada CIA i zarządzanie ryzykiem',
    badge: 'Fundamenty',
    order: 1,
  },
  {
    id: 'regulacje',
    hash: '#/regulacje',
    icon: 'clipboard-list',
    title: 'Regulacje',
    desc: 'RODO, NIS2, KSC, DORA',
    badge: 'Regulacje',
    order: 2,
  },
  {
    id: 'organizacja',
    hash: '#/organizacja',
    icon: 'building-2',
    title: 'Organizacja',
    desc: 'SOC, CISO, role i struktury',
    badge: 'Organizacja',
    order: 3,
  },
  {
    id: 'technologia',
    hash: '#/technologia',
    icon: 'cpu',
    title: 'Technologia',
    desc: 'SIEM, EDR, MFA, Zero Trust',
    badge: 'Technologia',
    order: 4,
  },
  {
    id: 'spiecie',
    hash: '#/spiecie',
    icon: 'layers',
    title: 'Integracja',
    desc: 'NIST CSF i reagowanie na incydenty',
    badge: 'Integracja',
    order: 5,
  },
  {
    id: 'slownik',
    hash: '#/slownik',
    icon: 'book-open',
    title: 'Słownik',
    desc: 'Fiszki Leitnera – mistrzowskie opanowanie terminologii',
    badge: 'Słownik',
    order: 6,
  },
  {
    id: 'finalboss',
    hash: '#/finalboss',
    icon: 'target',
    title: 'Final Boss',
    desc: 'Egzamin końcowy - potwierdź swoją wiedzę',
    badge: 'Mistrz CyberAkademii',
    order: 7,
  },
];

export function renderSciezka() {
  const wrap = el('div', { class: 'slide-up' });
  const { completed: completedCount, totalModules, pct } = getProgress();
  const state = getState();

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Twoja Ścieżka Nauki'),
    el('p', { class: 'subtitle' }, 'Wizualizacja postępu, zdobyte odznaki i kolejne kroki.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge badge-success' }, `${completedCount} / ${totalModules} modułów`),
      el('span', { class: 'badge badge-accent' }, `${pct}% ukończone`)
    )
  ));

  // ── Overall progress ──────────────────────────────────

  const overallSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Ogólny postęp')
  );

  const progressGrid = el('div', { class: 'module-progress' });

  // Progress rings only for completable modules (source of truth: store).
  COMPLETABLE_MODULES.forEach(id => {
    const step = PATH_STEPS.find(s => s.id === id);
    const label = step ? step.title : id;
    const done = isCompleted(id);
    const score = getScore(id);
    const ringPct = done ? (score?.pct || 100) : 0;
    const ring = createProgressRing(ringPct, label, 72);
    if (done) {
      ring.querySelector('circle:last-of-type')?.setAttribute('stroke', 'var(--success)');
    }
    progressGrid.appendChild(ring);
  });

  overallSection.appendChild(progressGrid);

  // Overall big ring
  const bigRingWrap = el('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.5rem 0' } });
  const bigRing = createProgressRing(pct, 'Ukończono', 120);
  bigRingWrap.appendChild(bigRing);
  bigRingWrap.appendChild(el('p', { style: { color: 'var(--text-muted)', fontSize: '0.85rem' } },
    `${completedCount} z ${totalModules} modułów ukończonych`
  ));
  overallSection.appendChild(bigRingWrap);
  wrap.appendChild(overallSection);

  // ── Path visualization ────────────────────────────────

  const pathSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Ścieżka modułów')
  );

  const path = el('div', { class: 'sciezka-path' });

  PATH_STEPS.forEach((step, i) => {
    const done = isCompleted(step.id);
    const score = getScore(step.id);
    // A step is "active" if it's the next one after all completed ones
    const prevDone = i === 0 || isCompleted(PATH_STEPS[i - 1].id);
    const isActive = !done && prevDone;

    const stepEl = el('div', { class: `sciezka-step${done ? ' completed' : isActive ? ' active' : ''}` },
      el('div', { class: 'sciezka-node' }, done ? '✓' : String(step.order)),
      el('div', { class: 'sciezka-content' },
        el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' } },
          el('div', {},
            el('h3', { style: { fontSize: '1rem', marginBottom: '0.2rem' } }, `${step.order}. ${step.title}`),
            el('p', { style: { fontSize: '0.82rem', color: 'var(--text-muted)' } }, step.desc)
          ),
          el('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' } },
            done
              ? el('span', { class: 'badge badge-success' }, `${score?.pct || 100}%`)
              : isActive
              ? el('a', { href: step.hash, class: 'btn btn-primary btn-sm' }, 'Zacznij')
              : el('span', { class: 'badge', style: { opacity: '0.5' } }, 'Zablokowane'),
            done
              ? el('span', { class: 'badge badge-purple' }, step.badge)
              : null
          )
        )
      )
    );
    path.appendChild(stepEl);
  });

  pathSection.appendChild(path);
  wrap.appendChild(pathSection);

  // ── Earned badges ─────────────────────────────────────

  const badgeSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Zdobyte odznaki')
  );

  const earnedBadges = state.badges || [];

  if (earnedBadges.length === 0) {
    badgeSection.appendChild(el('p', { class: 'text-muted' },
      'Nie masz jeszcze żadnych odznak. Ukończ moduły, żeby je zdobyć!'
    ));
  } else {
    const badgeGrid = el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '1rem' } });
    earnedBadges.forEach(badgeId => {
      const step = PATH_STEPS.find(s => s.id === badgeId);
      const label = step ? step.badge : badgeId;
      badgeGrid.appendChild(
        el('div', {
          class: 'badge badge-purple badge-earned',
          style: { fontSize: '0.9rem', padding: '0.5rem 1rem' }
        }, label)
      );
    });
    badgeSection.appendChild(badgeGrid);
  }

  wrap.appendChild(badgeSection);

  // ── Score summary ─────────────────────────────────────

  if (completedCount > 0) {
    const scoreSection = el('div', { class: 'section' },
      el('div', { class: 'section-title' }, 'Wyniki quizów')
    );

    const scoreGrid = el('div', { class: 'card-grid' });

    PATH_STEPS.forEach(step => {
      const score = getScore(step.id);
      if (!score) return;
      scoreGrid.appendChild(
        el('div', { class: 'card' },
          el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' } },
            el('h4', {}, step.title),
            el('span', { class: `badge ${score.pct >= 70 ? 'badge-success' : 'badge-warning'}` }, `${score.pct}%`)
          ),
          el('div', { class: 'score-bar' },
            el('div', { class: 'score-bar__track' },
              el('div', { class: 'score-bar__fill', style: { width: `${score.pct}%` } })
            ),
            el('div', { class: 'score-bar__label' }, `${score.score}/${score.total}`)
          )
        )
      );
    });

    scoreSection.appendChild(scoreGrid);
    wrap.appendChild(scoreSection);
  }

  // ── Ścieżka wdrożenia - od czego zacząć ───────────────

  const wdrozenieSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Ścieżka wdrożenia - od czego zacząć'),
    el('p', { style: { color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' } },
      'Praktyczny załącznik z przewodnika: jak organizacja powinna wdrażać cyberbezpieczeństwo krok po kroku, we właściwej kolejności - od diagnozy regulacyjnej po ciągłe doskonalenie.'
    )
  );

  const wdrozenieContainer = el('div', {});
  wdrozenieSection.appendChild(wdrozenieContainer);

  initExpandable(wdrozenieContainer, STEPS.map(step => ({
    title: `${step.n}. ${step.name}`,
    summary: step.description,
    detail: step.detail + (step.tools?.length ? ` Narzędzia/pomoce: ${step.tools.join(', ')}` : ''),
  })));

  wrap.appendChild(wdrozenieSection);

  // ── Reset button ──────────────────────────────────────

  const resetSection = el('div', { class: 'section', style: { borderTop: '1px solid var(--border)', paddingTop: '2rem', marginTop: '1rem' } });
  resetSection.appendChild(el('p', { style: { color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' } },
    'Zresetuj postęp jeśli chcesz zacząć od nowa. Tej operacji nie można cofnąć.'
  ));
  const resetBtn = el('button', {
    class: 'btn btn-danger btn-sm',
    onclick: () => {
      if (confirm('Na pewno zresetować cały postęp? Tej operacji nie można cofnąć.')) {
        resetProgress();
        window.location.hash = '#/';
      }
    }
  }, 'Resetuj postęp');
  resetSection.appendChild(resetBtn);
  wrap.appendChild(resetSection);

  return wrap;
}
