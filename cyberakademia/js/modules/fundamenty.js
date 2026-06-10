// ============================================================
// CyberAkademia — modules/fundamenty.js
// Module 1: CIA triad, risk management, intro concepts
// ============================================================

import { el } from '../dom.js';
import { CIA_TRIAD, CIA_SCENARIOS, RISK_RESPONSES, RISK_SCENARIOS } from '../content/fundamenty.js';
import { THREATS } from '../content/threats.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';
import { initSortIntoBuckets } from '../primitives/sortIntoBuckets.js';
import { initExpandable } from '../primitives/expandable.js';
import { icon } from '../icons.js';

// ── CIA Triangle SVG ─────────────────────────────────────

function renderCIATriangle() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Triada CIA')
  );

  const intro = el('p', { style: { marginBottom: '1.5rem' } },
    'Bezpieczeństwo informacji sprowadza się do ochrony trzech właściwości (stąd „triada CIA"). ' +
    'Każdy atak i każdy mechanizm obrony da się przypisać do jednej z trzech kategorii — to uniwersalny „układ współrzędnych" całej dziedziny.'
  );
  section.appendChild(intro);

  // Three CIA cards
  const grid = el('div', { class: 'card-grid' });

  const CIA_ICON_MAP = { C: 'lock', I: 'check-circle', A: 'zap' };

  Object.values(CIA_TRIAD).forEach(entry => {
    const iconEl = el('div', { style: { marginBottom: '0.5rem' } });
    iconEl.appendChild(icon(CIA_ICON_MAP[entry.id] || 'shield', 24));
    const card = el('div', { class: 'card' },
      iconEl,
      el('h3', {}, `${entry.id} — ${entry.namePL}`),
      el('p', { style: { fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem' } }, entry.name),
      el('p', { style: { marginTop: '0.5rem', fontSize: '1rem', lineHeight: '1.5' } }, entry.description),
      el('p', { style: { marginTop: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' } }, entry.violationExample),
      el('div', { style: { marginTop: '1rem' } },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' } }, 'Przykładowe kontrole'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.7' } },
          ...entry.controls.map(c => el('li', {}, c))
        )
      )
    );
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ── CIA Sorting Game (sortIntoBuckets) ───────────────────

function renderCIASortingGame() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Gra — Przyporządkuj incydent')
  );

  const desc = el('p', { style: { marginBottom: '1.5rem' } },
    'Przeczytaj opis incydentu i wrzuć go do właściwego koszyka — które z właściwości CIA zostało naruszone? ' +
    'Przeciągnij element do kategorii Poufność, Integralność lub Dostępność, albo kliknij element i wybierz kategorię.'
  );
  section.appendChild(desc);

  const gameEl = el('div', {});
  section.appendChild(gameEl);

  const buckets = [
    { id: 'C', label: 'Poufność', color: CIA_TRIAD.C.color },
    { id: 'I', label: 'Integralność', color: CIA_TRIAD.I.color },
    { id: 'A', label: 'Dostępność', color: CIA_TRIAD.A.color },
  ];

  const items = CIA_SCENARIOS.map((scenario, index) => ({
    id: index,
    text: scenario.text,
    answer: scenario.answer,
    explanation: scenario.explanation,
  }));

  // Practice exercise — result does not gate module completion.
  initSortIntoBuckets(gameEl, { buckets, items });

  return section;
}

// ── Krajobraz zagrożeń (expandable) ──────────────────────

function renderThreatLandscape() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Krajobraz zagrożeń')
  );

  const intro = el('p', { style: { marginBottom: '1.5rem' } },
    'Te same trzy właściwości CIA są atakowane przez powtarzalny zestaw zagrożeń. ' +
    'Rozwiń każdą kartę, aby zobaczyć punkt wejścia, skutek, naruszane właściwości CIA, obronę i realny przykład.'
  );
  section.appendChild(intro);

  const listEl = el('div', {});
  section.appendChild(listEl);

  const threatItems = THREATS.map(t => ({
    title: t.name,
    summary: t.front,
    detail:
      `Punkt wejścia: ${t.entryPoint} ` +
      `Skutek: ${t.effect} ` +
      `Narusza: ${t.cia} ` +
      `Obrona: ${t.defense} ` +
      `Przykład: ${t.example}`,
  }));

  initExpandable(listEl, threatItems);

  return section;
}

// ── Risk responses ───────────────────────────────────────

function renderRiskResponses() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Ryzyko zamiast "czy jesteśmy bezpieczni"')
  );

  const intro = el('p', { style: { marginBottom: '1.5rem' } },
    'Dojrzałe podejście nie pyta „czy jesteśmy bezpieczni" (odpowiedź zawsze brzmi „nie w 100%"), tylko ' +
    'zarządza ryzykiem: ryzyko = prawdopodobieństwo zdarzenia × jego skutek. ' +
    'Nie da się wyeliminować ryzyka, można je tylko ' +
    'obniżać, przenosić (ubezpieczenie), akceptować albo unikać. ' +
    'To dlatego wszystkie nowoczesne regulacje mówią o „zarządzaniu ryzykiem", a nie o konkretnej liście produktów.'
  );
  section.appendChild(intro);

  const grid = el('div', { class: 'card-grid' });
  RISK_RESPONSES.forEach(r => {
    const card = el('div', { class: 'card' },
      el('h3', {}, r.name),
      el('p', {}, r.description),
      el('div', { style: { marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' } },
        el('strong', { style: { color: 'var(--accent)' } }, 'Kiedy stosować: '),
        r.whenToUse
      ),
      el('div', { style: { marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' } },
        el('strong', { style: { color: 'var(--warning)' } }, 'Koszt: '),
        r.cost
      )
    );
    grid.appendChild(card);
  });
  section.appendChild(grid);
  return section;
}

// ── Risk response matching game ──────────────────────────

function renderRiskGame() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Gra — Dobierz odpowiedź na ryzyko')
  );

  const desc = el('p', { style: { marginBottom: '1.5rem' } },
    'Dla każdego ryzyka wybierz właściwą strategię odpowiedzi: Obniżaj / Przenoś / Akceptuj / Unikaj.'
  );
  section.appendChild(desc);

  const scenarios = [...RISK_SCENARIOS];
  let current = 0;
  let score = 0;

  const scoreEl = el('div', { class: 'badge badge-accent', style: { marginBottom: '1rem' } }, `Wynik: 0 / ${scenarios.length}`);
  const cardEl = el('div', { class: 'card', style: { maxWidth: '640px', margin: '0 auto' } });

  function render(i) {
    if (i >= scenarios.length) {
      const pct = Math.round((score / scenarios.length) * 100);
      cardEl.innerHTML = '';
      cardEl.appendChild(
        el('div', { class: 'result-overlay' },
          el('div', { class: 'result-title' }, `${score} / ${scenarios.length} (${pct}%)`),
          el('div', { class: 'result-subtitle', style: { marginBottom: '1rem' } }, pct >= 70 ? 'Rozumiesz 4T!' : 'Powtórz strategie i spróbuj ponownie.'),
          el('button', { class: 'btn btn-primary', onclick: () => { current = 0; score = 0; scoreEl.textContent = `Wynik: 0 / ${scenarios.length}`; render(0); } }, 'Ponów')
        )
      );
      return;
    }

    const s = scenarios[i];
    cardEl.innerHTML = '';

    const question = el('div', {},
      el('p', { style: { fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6', padding: '0.75rem', background: 'rgba(0,212,255,0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' } }, s.risk),
      el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' } },
        ...RISK_RESPONSES.map(r => {
          const btn = el('button', {
            class: 'btn btn-ghost',
            onclick: () => {
              const correct = s.correctResponse === r.id;
              if (correct) score++;
              current++;
              scoreEl.textContent = `Wynik: ${score} / ${scenarios.length}`;

              cardEl.innerHTML = '';
              cardEl.appendChild(
                el('div', { class: `alert ${correct ? 'alert-success' : 'alert-warning'}` },
                  el('strong', {}, correct ? 'Dobrze! ' : `Lepiej: "${RISK_RESPONSES.find(r2 => r2.id === s.correctResponse).name}". `),
                  s.explanation
                )
              );
              const nextBtn = el('button', {
                class: 'btn btn-primary',
                style: { marginTop: '1rem' },
                onclick: () => render(current)
              }, current >= scenarios.length ? 'Wyniki' : 'Dalej');
              cardEl.appendChild(nextBtn);
            }
          }, r.name);
          return btn;
        })
      )
    );
    cardEl.appendChild(question);
  }

  render(0);
  section.appendChild(scoreEl);
  section.appendChild(cardEl);
  return section;
}

// ── Knowledge quiz ───────────────────────────────────────

const QUIZ_QUESTIONS = [
  {
    question: 'Co narusza "Poufność" (C) w triadzie CIA?',
    options: ['Atak DDoS uniemożliwiający dostęp do serwisu', 'Haker wykradł bazę danych klientów', 'Zmiana danych w systemie przez hakera', 'Awaria serwera powodująca przestój'],
    correct: 1,
    explanation: 'Poufność (Confidentiality) jest naruszona gdy nieautoryzowana osoba uzyskuje dostęp do danych. Wykradzenie bazy danych to klasyczne naruszenie C.'
  },
  {
    question: 'Która odpowiedź na ryzyko polega na przeniesieniu finansowych skutków na ubezpieczyciela?',
    options: ['Obniżaj (Mitigate)', 'Przenoś (Transfer)', 'Akceptuj (Accept)', 'Unikaj (Avoid)'],
    correct: 1,
    explanation: 'Transfer ryzyka przenosi finansowe konsekwencje na zewnętrzny podmiot — najczęściej przez ubezpieczenie cybernetyczne lub klauzule umowne.'
  },
  {
    question: 'Atak ransomware szyfruje dane i uniemożliwia pracę. Które właściwości CIA narusza PRZEDE WSZYSTKIM?',
    options: ['Tylko Poufność (C)', 'Poufność i Integralność (C+I)', 'Przede wszystkim Dostępność (A)', 'Tylko Integralność (I)'],
    correct: 2,
    explanation: 'Ransomware narusza przede wszystkim Dostępność (A) — dane są zaszyfrowane i niedostępne. Nowoczesny ransomware (double extortion) narusza też C przez wcześniejszą eksfiltrację, ale pierwszorzędnie to A.'
  },
  {
    question: 'Firma akceptuje ryzyko przestarzałego systemu legacy. Co jest WYMAGANE przy akceptacji ryzyka?',
    options: ['Natychmiastowe wyłączenie systemu', 'Świadoma decyzja zarządu i dokumentacja', 'Przeniesienie systemu do chmury', 'Żadnych działań — ignorujemy problem'],
    correct: 1,
    explanation: 'Akceptacja ryzyka ≠ ignorowanie. Wymaga formalnej, świadomej decyzji zarządu z dokumentacją. "Nie wiedzieliśmy" to brak zarządzania ryzykiem, nie akceptacja.'
  },
  {
    question: 'Pracownik przypadkowo usunął produkcyjną bazę danych. Które właściwości CIA są naruszone?',
    options: ['Tylko Poufność (C)', 'Integralność i Dostępność (I+A)', 'Tylko Dostępność (A)', 'Żadne — to był błąd, nie atak'],
    correct: 1,
    explanation: 'Naruszono Dostępność (A) — danych nie ma, i Integralność (I) — dane bezpowrotnie utracone. CIA nie dotyczy tylko ataków — obejmuje wszystkie incydenty, w tym błędy ludzkie.'
  },
];

function renderQuiz(onPass) {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Quiz końcowy')
  );

  const container = el('div', {});
  section.appendChild(container);

  initQuiz(container, { questions: QUIZ_QUESTIONS }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('fundamenty', score, total);
      earnBadge('fundamenty');
      fullBurst();
      onPass?.(score, total);
    }
  });

  return section;
}

// ── Main render ──────────────────────────────────────────

export function renderFundamenty() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Fundamenty Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Zanim przejdziemy do skrótów — trzy pojęcia, które są fundamentem całej reszty.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~25 min'),
      el('span', { class: 'badge badge-accent' }, 'Moduł 1')
    )
  ));

  wrap.appendChild(renderCIATriangle());
  wrap.appendChild(renderCIASortingGame());
  wrap.appendChild(renderThreatLandscape());
  wrap.appendChild(renderRiskResponses());
  wrap.appendChild(renderRiskGame());

  let passed = false;
  wrap.appendChild(renderQuiz((score, total) => {
    if (!passed) {
      passed = true;
      const banner = el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, 'Moduł zaliczony! '),
        `Wynik: ${score}/${total}. Odznaka "Fundamenty" odblokowana!`
      );
      wrap.appendChild(banner);
    }
  }));

  return wrap;
}
