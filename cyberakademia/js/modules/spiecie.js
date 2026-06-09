// ============================================================
// CyberAkademia — modules/spiecie.js
// Module 5: Incident response, NIST CSF, putting it all together
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';

// ── NIST CSF Wheel ───────────────────────────────────────

const NIST_SEGMENTS = [
  {
    id: 'govern',
    label: 'GOVERN',
    name: 'Zarządzaj',
    icon: null,
    desc: 'Nowa funkcja w CSF 2.0. Ustanowienie kontekstu, priorytetów i zarządzanie ryzykiem cyberbezpieczeństwa na poziomie organizacyjnym. Zaangażowanie zarządu.',
    color: '#7c3aed',
    examples: ['Polityka bezpieczeństwa', 'Strategia zarządzania ryzykiem', 'Role i odpowiedzialności', 'Nadzór zarządu'],
  },
  {
    id: 'identify',
    label: 'IDENTIFY',
    name: 'Identyfikuj',
    icon: null,
    desc: 'Zrozum kontekst biznesowy, zasoby i ryzyka. Inwentaryzacja aktywów, ocena ryzyka, identyfikacja luk w ochronie.',
    color: '#4F46E5',
    examples: ['Inwentaryzacja aktywów', 'Ocena ryzyka', 'Mapowanie zależności', 'Identyfikacja luk'],
  },
  {
    id: 'protect',
    label: 'PROTECT',
    name: 'Chroń',
    icon: null,
    desc: 'Wdrożenie zabezpieczeń technicznych i organizacyjnych. Kontrola dostępu, szkolenia, szyfrowanie, backup.',
    color: '#0891B2',
    examples: ['Kontrola dostępu (IAM/MFA)', 'Szkolenia pracowników', 'Szyfrowanie danych', 'Backup 3-2-1'],
  },
  {
    id: 'detect',
    label: 'DETECT',
    name: 'Wykrywaj',
    icon: null,
    desc: 'Ciągłe monitorowanie i wykrywanie anomalii. SIEM, EDR, IDS/IPS, logi, monitoring sieci.',
    color: '#059669',
    examples: ['SIEM z alertami', 'EDR na endpointach', 'IDS/IPS sieciowe', 'Monitoring behawioralny'],
  },
  {
    id: 'respond',
    label: 'RESPOND',
    name: 'Reaguj',
    icon: null,
    desc: 'Działania po wykryciu incydentu. Playbooki, izolacja, komunikacja, eradykacja zagrożenia.',
    color: '#D97706',
    examples: ['Playbooki IR', 'Izolacja systemów', 'Komunikacja kryzysowa', 'Eradykacja zagrożenia'],
  },
  {
    id: 'recover',
    label: 'RECOVER',
    name: 'Odtwarzaj',
    icon: null,
    desc: 'Przywrócenie normalnego działania po incydencie. Odtworzenie z backupu, analiza post-mortem, ulepszenia.',
    color: '#DC2626',
    examples: ['Odtworzenie z backupu', 'Test odtworzenia', 'Post-mortem', 'Wdrożenie ulepszeń'],
  },
];

function renderNISTWheel() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'NIST Cybersecurity Framework 2.0')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'NIST CSF 2.0 definiuje 6 funkcji zarządzania cyberbezpieczeństwem. Kliknij segment, aby dowiedzieć się więcej.'
  ));

  const wheel = el('div', { class: 'nist-wheel' });
  const detailEl = el('div', {});

  NIST_SEGMENTS.forEach(seg => {
    const segEl = el('div', {
      class: 'nist-segment',
      onclick: () => {
        wheel.querySelectorAll('.nist-segment').forEach(s => s.classList.remove('active'));
        segEl.classList.add('active');
        detailEl.innerHTML = '';
        detailEl.appendChild(
          el('div', { class: 'card', style: { borderColor: seg.color, animation: 'fadeIn 0.25s ease' } },
            el('div', { style: { marginBottom: '0.75rem' } },
              el('h3', { style: { color: seg.color } }, `${seg.label} — ${seg.name}`),
            ),
            el('p', { style: { marginBottom: '0.75rem' } }, seg.desc),
            el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' } },
              ...seg.examples.map(ex => el('span', { class: 'badge badge-accent' }, ex))
            )
          )
        );
      }
    },
      el('div', { class: 'seg-label', style: { color: seg.color } }, seg.label),
      el('div', { class: 'seg-name' }, seg.name)
    );
    wheel.appendChild(segEl);
  });

  section.appendChild(wheel);
  section.appendChild(el('div', { style: { marginTop: '1.5rem' } }, detailEl));
  return section;
}

// ── IR Cycle ─────────────────────────────────────────────

const IR_PHASES = [
  { label: 'Przygotowanie', desc: 'Playbooki, szkolenia, narzędzia, plan komunikacji — zanim incydent nastąpi.' },
  { label: 'Identyfikacja', desc: 'Wykrycie i potwierdzenie incydentu. Czy to prawdziwy alarm, czy fałszywy pozytyw?' },
  { label: 'Izolacja', desc: 'Zawieranie incydentu. Izolacja zainfekowanych systemów, ograniczenie "promienia wybuchu".' },
  { label: 'Eradykacja', desc: 'Usunięcie przyczyny ataku — złośliwego oprogramowania, tylnych furtek, skompromitowanych kont.' },
  { label: 'Odtworzenie', desc: 'Przywrócenie systemów z backupu lub czystych obrazów. Weryfikacja integralności.' },
  { label: 'Nauki', desc: 'Post-mortem: co się stało, jak szybko wykryto, co można poprawić. Timeline incydentu.' },
];

function renderIRCycle() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Cykl reagowania na incydenty')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Każdy incydent cyberbezpieczeństwa wymaga ustrukturyzowanego reagowania. Znajomość cyklu IR jest kluczowa dla każdej organizacji.'
  ));

  const cycle = el('div', { class: 'ir-cycle' });
  const detailEl = el('div', {});

  IR_PHASES.forEach((phase, i) => {
    const seg = el('div', {
      class: 'ir-segment',
      onclick: () => {
        cycle.querySelectorAll('.ir-segment').forEach(s => s.classList.remove('active'));
        seg.classList.add('active');
        detailEl.innerHTML = '';
        detailEl.appendChild(
          el('div', { class: 'alert alert-info', style: { animation: 'fadeIn 0.2s ease' } },
            el('strong', {}, `Faza ${i + 1}: ${phase.label} — `),
            phase.desc
          )
        );
      }
    },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '600' } }, phase.label)
    );
    cycle.appendChild(seg);
  });

  section.appendChild(cycle);
  section.appendChild(el('div', { style: { marginTop: '1rem' } }, detailEl));
  return section;
}

// ── Incident scenario ────────────────────────────────────

function renderIncidentScenario() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Symulator incydentu: Ransomware')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Jesteś analitykiem SOC. Właśnie trafiło do Ciebie powiadomienie. Podejmuj decyzje!'
  ));

  const SCENARIO = [
    {
      q: 'ALERT: Serwer plików w siedzibie wykazuje masowe odczyty i zapisy. EDR wykrył podejrzany proces "encrypt.exe". Co robisz?',
      choices: [
        { text: 'Izoluję serwer od sieci natychmiast', outcome: 'Dobra decyzja! Izolacja ogranicza propagację ransomware na inne systemy.', good: true },
        { text: 'Czekam i obserwuję jeszcze 30 minut', outcome: 'Błąd! Każda minuta to kolejne zaszyfrowane pliki. Ransomware rozprzestrzenia się w całej sieci.', good: false },
        { text: 'Restartuję serwer', outcome: 'Błąd! Restart może utrudnić analizę śledczą. Należy izolować, nie restartować.', good: false },
      ]
    },
    {
      q: 'Serwer izolowany. Okazuje się, że ransomware zaszyfrował 80% plików. Backup jest na tape (offline). Co jest PRIORYTETEM?',
      choices: [
        { text: 'Natychmiast płacę okup — szybciej odtworzę dane', outcome: 'Błąd! Płacenie okupu nie gwarantuje odtworzenia danych, finansuje przestępców i narusza regulacje w niektórych jurysdykcjach.', good: false },
        { text: 'Dokumentuję incydent i sprawdzam zakres przed odtworzeniem', outcome: 'Dobra decyzja! Analiza zakresu jest konieczna — dowiedz się ile systemów jest zainfekowanych zanim zaczniesz odtwarzanie.', good: true },
        { text: 'Od razu odtwarzam z backupu', outcome: 'Ryzykowne! Bez eradykacji złośliwego oprogramowania, odtworzone systemy mogą zostać ponownie zainfekowane.', good: false },
      ]
    },
    {
      q: 'Analiza pokazuje, że ransomware dostał się przez email phishingowy do pracownika HR. Jakie działania prewencyjne teraz wdrożysz?',
      choices: [
        { text: 'MFA na wszystkich kontach + szkolenie antyphishingowe', outcome: 'Doskonale! MFA i świadomość pracowników to dwie najskuteczniejsze kontrole przeciw phishingowi.', good: true },
        { text: 'Zablokuję internet dla działu HR', outcome: 'Nieproporcjonalne i nieskuteczne. Blokada internetu uniemożliwi pracę i nie rozwiąże problemu braku świadomości.', good: false },
        { text: 'Wyślę email z przypomnieniem o zasadach bezpieczeństwa', outcome: 'Zbyt słaba odpowiedź! Jeden email nie wystarczy — potrzebne są szkolenia praktyczne i testy phishingowe.', good: false },
      ]
    },
  ];

  let step = 0;
  let goodChoices = 0;

  const cardEl = el('div', { class: 'scenario-tree' });
  const scoreEl = el('div', { class: 'badge badge-accent', style: { marginBottom: '1rem' } }, 'Faza 1/3');

  function render(i) {
    if (i >= SCENARIO.length) {
      cardEl.innerHTML = '';
      cardEl.appendChild(
        el('div', { class: 'result-overlay' },
          el('div', { class: 'result-title' }, `${goodChoices}/3 decyzji było optymalnych`),
          el('p', { style: { color: 'var(--text-muted)', marginBottom: '1.5rem' } },
            goodChoices >= 3
              ? 'Doskonałe reagowanie! Byłeś skuteczny na każdym etapie.'
              : goodChoices >= 2
              ? 'Niezłe! Kilka decyzji wymagało lepszego rozważenia.'
              : 'Warto powtórzyć cykl IR. Każda błędna decyzja kosztuje organizację czas i dane.'
          ),
          el('button', {
            class: 'btn btn-primary',
            onclick: () => { step = 0; goodChoices = 0; scoreEl.textContent = 'Faza 1/3'; render(0); }
          }, 'Spróbuj ponownie')
        )
      );
      return;
    }

    const s = SCENARIO[i];
    cardEl.innerHTML = '';
    scoreEl.textContent = `Faza ${i + 1}/3`;

    const node = el('div', { class: 'decision-node active-node' },
      el('div', { class: 'decision-question' }, s.q),
      el('div', { class: 'decision-choices' },
        ...s.choices.map(c => {
          const btn = el('button', {
            class: 'decision-choice',
            onclick: () => {
              if (c.good) goodChoices++;
              btn.className = `decision-choice ${c.good ? 'chosen-good' : 'chosen-bad'}`;
              node.querySelectorAll('.decision-choice').forEach(b => {
                if (b !== btn) b.disabled = true;
              });
              const outcomeEl = el('div', { class: `decision-outcome ${c.good ? 'good' : 'bad'}` },
                el('strong', {}, c.good ? 'Dobrze! ' : 'Niestety: '), c.outcome
              );
              node.appendChild(outcomeEl);
              const nextBtn = el('button', {
                class: 'btn btn-primary',
                style: { marginTop: '1rem' },
                onclick: () => { step++; render(step); }
              }, step + 1 >= SCENARIO.length ? 'Podsumowanie' : 'Następna faza');
              node.appendChild(nextBtn);
            }
          }, c.text);
          return btn;
        })
      )
    );
    cardEl.appendChild(node);
  }

  render(0);

  section.appendChild(scoreEl);
  section.appendChild(cardEl);
  return section;
}

const QUIZ_QUESTIONS = [
  {
    question: 'Która nowa funkcja pojawiła się w NIST CSF 2.0 (nieobecna w wersji 1.1)?',
    options: ['DETECT', 'GOVERN', 'RESPOND', 'RECOVER'],
    correct: 1,
    explanation: 'NIST CSF 2.0 dodał funkcję GOVERN (Zarządzaj) skupioną na zaangażowaniu zarządu i ustanowieniu kontekstu organizacyjnego. Poprzednie 5 funkcji pozostało bez zmian.'
  },
  {
    question: 'Jaka jest kolejność faz reagowania na incydent (IR)?',
    options: ['Eradykacja → Identyfikacja → Izolacja → Odtworzenie', 'Przygotowanie → Identyfikacja → Izolacja → Eradykacja → Odtworzenie → Nauki', 'Identyfikacja → Izolacja → Nauki → Eradykacja', 'Odtworzenie → Eradykacja → Przygotowanie'],
    correct: 1,
    explanation: 'Standardowy cykl IR: Przygotowanie (zanim nastąpi), Identyfikacja, Izolacja (containment), Eradykacja, Odtworzenie, Nauki (lessons learned). Fazy mogą się nakładać.'
  },
  {
    question: 'Co NALEŻY zrobić PRZED odtworzeniem systemów po ataku ransomware?',
    options: ['Zapłacić okup dla pewności', 'Eradykować złośliwe oprogramowanie i potwierdzić czystość środowiska', 'Natychmiast przywrócić backup bez analizy', 'Poinformować media'],
    correct: 1,
    explanation: 'Bez eradykacji malware, odtworzone systemy zostaną ponownie zainfekowane. Najpierw zawieranie i eradykacja, potem odtworzenie z zweryfikowanych backupów.'
  },
  {
    question: 'Co oznacza IDENTIFY w NIST CSF?',
    options: ['Identyfikacja osób odpowiedzialnych za incydent', 'Zrozumienie aktywów, ryzyk i luk w ochronie', 'Identyfikacja i blokowanie atakujących', 'Nagrywanie sesji administratorów'],
    correct: 1,
    explanation: 'IDENTIFY = zrozum co chronisz. Inwentaryzacja aktywów, ocena ryzyka, mapowanie zależności. "Nie możesz chronić tego, czego nie widzisz."'
  },
  {
    question: 'Jakie narzędzie w SOC odpowiada głównie za funkcję DETECT (Wykrywaj)?',
    options: ['Backup system', 'SIEM z korelacją alertów i EDR', 'System zarządzania dokumentami', 'Firewall zewnętrzny'],
    correct: 1,
    explanation: 'SIEM koreluje zdarzenia z całej infrastruktury i generuje alerty. EDR wykrywa zagrożenia na urządzeniach. Razem realizują funkcję DETECT w NIST CSF.'
  },
];

export function renderSpiecie() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Spięcie — Integracja Obrony'),
    el('p', { class: 'subtitle' }, 'Jak regulacja, organizacja i technologia łączą się w jedno — wymóg regulacyjny → co robi organizacja → czym (technologia). Czytelny morał: technologia bez procesów to wydatek, a nie bezpieczeństwo.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~25 min'),
      el('span', { class: 'badge badge-accent' }, 'Moduł 5')
    )
  ));

  wrap.appendChild(renderNISTWheel());
  wrap.appendChild(renderIRCycle());
  wrap.appendChild(renderIncidentScenario());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Quiz końcowy')
  );
  const qc = el('div', {});
  quizSection.appendChild(qc);
  initQuiz(qc, { questions: QUIZ_QUESTIONS }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('spiecie', score, total);
      earnBadge('spiecie');
      fullBurst();
      wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, 'Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka "Spięcie" odblokowana!`
      ));
    }
  });
  wrap.appendChild(quizSection);
  return wrap;
}
