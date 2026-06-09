// ============================================================
// CyberAkademia — modules/regulacje.js
// Module 2: RODO/GDPR, NIS2, KSC, DORA
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';
import { icon } from '../icons.js';

const REGULATIONS = [
  {
    id: 'rodo',
    name: 'RODO / GDPR',
    iconName: 'file-text',
    color: '#4F46E5',
    full: 'Rozporządzenie o Ochronie Danych Osobowych',
    since: '25 maja 2018',
    scope: 'Wszystkie organizacje przetwarzające dane osobowe obywateli UE',
    keyReqs: [
      'Podstawa prawna przetwarzania danych (zgoda, umowa, obowiązek prawny...)',
      'Prawa osób: dostęp, sprostowanie, usunięcie, przeniesienie danych',
      'Inspektor Ochrony Danych (DPO) — obowiązkowy w wielu podmiotach',
      'Zgłaszanie naruszeń do UODO w ciągu 72h',
      'Privacy by Design i Privacy by Default',
    ],
    penalties: 'Do 20 mln EUR lub 4% rocznego globalnego obrotu',
    badge: 'dane',
    tip: 'RODO chroni prywatność, NIS2/DORA chronią ciągłość i odporność — to inna oś. Nakładają się przy wyciekach danych osobowych: podwójny obowiązek zgłoszenia (do UODO i do CSIRT). DPO ≠ CISO.',
  },
  {
    id: 'nis2',
    name: 'NIS2',
    iconName: 'layers',
    color: '#0891B2',
    full: 'Dyrektywa o Bezpieczeństwie Sieci i Systemów Informacyjnych 2',
    since: 'Implementacja do 17.10.2024 (PL: KSC 2.0 — 3.04.2026)',
    scope: 'Podmioty kluczowe i ważne w 18 sektorach (energetyka, transport, bankowość, zdrowie, woda, infrastruktura cyfrowa...)',
    keyReqs: [
      'Wdrożenie Systemu Zarządzania Bezpieczeństwem Informacji (SZBI)',
      'Szacowanie ryzyka i zarządzanie nim',
      'Zgłaszanie incydentów: ostrzeżenie 24h, raport 72h, raport końcowy 1 miesiąc',
      'Zarządzanie ryzykiem dostawców (supply chain security)',
      'Odpowiedzialność zarządu — zarząd musi zatwierdzić program bezpieczeństwa',
    ],
    penalties: 'Do 10 mln EUR lub 2% obrotu (kluczowe); 7 mln EUR lub 1,4% (ważne)',
    badge: 'siec',
    tip: '„Czy nas to dotyczy?" jest pierwszym i najważniejszym pytaniem. Decyduje sektor (kody PKD), wielkość i wyjątki. Zakres z ok. 400 do ~30 000 podmiotów w Polsce.',
  },
  {
    id: 'ksc',
    name: 'KSC (Ustawa o KSC)',
    iconName: 'shield',
    color: '#DC2626',
    full: 'Krajowy System Cyberbezpieczeństwa',
    since: 'Nowelizacja KSC 2.0: 3 kwietnia 2026',
    scope: 'Operatorzy usług kluczowych i ważnych w Polsce; dostawcy usług cyfrowych',
    keyReqs: [
      'Wdrożenie SZBI zgodnego z wymogami KSC',
      'Zgłaszanie incydentów do właściwego CSIRT (NASK/GOV/MON)',
      'Regularne audyty bezpieczeństwa (co 2-3 lata)',
      'Zarządzanie ryzykiem w łańcuchu dostaw',
      'Szkolenia i podnoszenie świadomości pracowników',
    ],
    penalties: 'Do 10 mln EUR lub 2% obrotu (za naruszenia jako podmiot kluczowy)',
    badge: 'ksc',
    tip: 'Polska implementuje NIS2 przez KSC 2.0 — wejście w życie: 3.04.2026.',
  },
  {
    id: 'dora',
    name: 'DORA',
    iconName: 'activity',
    color: '#059669',
    full: 'Digital Operational Resilience Act',
    since: '17 stycznia 2025',
    scope: 'Cały sektor finansowy UE: banki, ubezpieczyciele, firmy inwestycyjne, giełdy, dostawcy ICT',
    keyReqs: [
      'Zarządzanie ryzykiem ICT — framework, polityki, procedury',
      'Zarządzanie incydentami ICT — klasyfikacja, zgłaszanie, analiza',
      'Testy odporności cyfrowej — w tym TLPT co 3 lata (największe instytucje)',
      'Zarządzanie ryzykiem zewnętrznych dostawców ICT (umowy, rejestr)',
      'Wymiana informacji o zagrożeniach i podatnościach',
    ],
    penalties: 'Do 1% dziennego obrotu (dla dostawców ICT do 5 mln EUR/rok)',
    badge: 'dora',
    tip: 'NIS2 to szeroka „podłoga" bezpieczeństwa dla całej gospodarki. DORA to wyspecjalizowany, surowszy reżim dla finansów. Tam gdzie oba mogłyby kolidować — DORA jest przepisem szczególnym (lex specialis).',
  },
];

function renderRegTable() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Przegląd regulacji')
  );

  const intro = el('p', { style: { marginBottom: '0.75rem' } },
    'W Europie nie ma „jednej ustawy o cyberbezpieczeństwie". Jest zestaw aktów, które dotyczą różnych grup podmiotów. Najważniejsze rozróżnienie:'
  );
  section.appendChild(intro);
  const diffNote = el('div', { class: 'alert alert-info', style: { marginBottom: '1.5rem' } },
    el('strong', {}, 'Kluczowa różnica prawna: '),
    'dyrektywa (NIS2) wymaga „przepisania" do prawa krajowego — stąd polska ustawa o KSC. ',
    el('strong', {}, 'Rozporządzenie '),
    '(DORA, RODO) obowiązuje bezpośrednio, identycznie w całej UE, bez ustawy krajowej. ',
    el('br', {}),
    el('em', {}, 'Czy mój podmiot może podlegać kilku naraz? '),
    'Tak. Bank podlega DORA i RODO. Szpital podlega NIS2/KSC i RODO. Regulacje się uzupełniają, nie wykluczają.'
  );
  const fakeSection = section; // reference for append below
  section.appendChild(diffNote);

  const grid = el('div', { class: 'card-grid' });

  REGULATIONS.forEach(reg => {
    const regIconEl = el('div', {});
    regIconEl.appendChild(icon(reg.iconName, 28));
    const card = el('div', { class: 'card' },
      el('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' } },
        regIconEl,
        el('div', {},
          el('h3', { style: { marginBottom: '0.1rem' } }, reg.name),
          el('div', { style: { fontSize: '0.78rem', color: 'var(--text-muted)' } }, reg.full)
        )
      ),
      el('div', { style: { fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '0.35rem' } },
        `Od: ${reg.since}`
      ),
      el('div', { style: { fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' } },
        `Zakres: ${reg.scope}`
      ),
      el('div', { style: { marginBottom: '0.75rem' } },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' } }, 'Kluczowe wymagania'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.8' } },
          ...reg.keyReqs.map(r => el('li', {}, r))
        )
      ),
      el('div', { class: 'alert alert-danger', style: { margin: '0', fontSize: '0.8rem' } },
        el('strong', {}, 'Kary: '), reg.penalties
      ),
      el('div', { class: 'alert alert-info', style: { marginTop: '0.5rem', fontSize: '0.78rem' } },
        el('strong', {}, 'Uwaga: '), reg.tip
      )
    );
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ── Connect game: Regulation → Obligation ───────────────

function renderMatchGame() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Gra — Połącz regulację z obowiązkiem')
  );

  const desc = el('p', { style: { marginBottom: '1.5rem' } },
    'Kliknij regulację, a następnie pasujący do niej obowiązek. Dopasuj wszystkie pary!'
  );
  section.appendChild(desc);

  const pairs = [
    { reg: 'RODO', obligation: 'Zgłoszenie naruszenia danych do UODO w 72h', key: 'rodo1' },
    { reg: 'NIS2', obligation: 'Odpowiedzialność zarządu za zatwierdzenie programu bezpieczeństwa', key: 'nis2-1' },
    { reg: 'DORA', obligation: 'Test odporności TLPT co 3 lata (największe instytucje finansowe)', key: 'dora1' },
    { reg: 'KSC', obligation: 'Zgłaszanie incydentów do CSIRT NASK/GOV/MON', key: 'ksc1' },
    { reg: 'RODO', obligation: 'Wyznaczenie Inspektora Ochrony Danych (DPO)', key: 'rodo2' },
    { reg: 'DORA', obligation: 'Rejestr zewnętrznych dostawców ICT i zarządzanie ich ryzykiem', key: 'dora2' },
  ];

  const shuffledObl = [...pairs].sort(() => Math.random() - 0.5);
  let selectedReg = null;
  let matched = new Set();
  let score = 0;

  const statusEl = el('div', { class: 'badge badge-accent', style: { marginBottom: '1rem' } }, `Dopasowane: 0 / ${pairs.length}`);

  const gameEl = el('div', { class: 'match-game' });

  const leftCol = el('div', {});
  leftCol.appendChild(el('div', { class: 'match-col-title' }, 'Regulacja'));

  const rightCol = el('div', {});
  rightCol.appendChild(el('div', { class: 'match-col-title' }, 'Obowiązek'));

  const regBtns = {};
  const oblBtns = {};

  // Left: unique regulations
  const uniqueRegs = [...new Set(pairs.map(p => p.reg))];
  uniqueRegs.forEach(reg => {
    const btn = el('button', {
      class: 'match-item',
      'data-reg': reg,
      onclick: () => {
        if (btn.classList.contains('matched')) return;
        // Deselect any previous
        Object.values(regBtns).forEach(b => b.classList.remove('selected'));
        selectedReg = reg;
        btn.classList.add('selected');
      }
    }, reg);
    regBtns[reg] = btn;
    leftCol.appendChild(btn);
  });

  // Right: obligations
  shuffledObl.forEach(pair => {
    const btn = el('button', {
      class: 'match-item',
      'data-key': pair.key,
      onclick: () => {
        if (btn.classList.contains('matched')) return;
        if (!selectedReg) return;

        const correct = pair.reg === selectedReg;
        if (correct) {
          btn.classList.add('matched');
          regBtns[selectedReg].classList.remove('selected');
          // Check if all pairs for this reg are matched
          const regPairs = pairs.filter(p => p.reg === selectedReg);
          const regMatched = regPairs.every(p => oblBtns[p.key]?.classList.contains('matched'));
          if (regMatched) {
            regBtns[selectedReg].classList.add('matched');
          }
          score++;
          matched.add(pair.key);
          statusEl.textContent = `Dopasowane: ${score} / ${pairs.length}`;
          if (score === pairs.length) {
            statusEl.className = 'badge badge-success';
            statusEl.textContent = 'Wszystkie dopasowane!';
          }
        } else {
          btn.classList.add('wrong-match');
          setTimeout(() => btn.classList.remove('wrong-match'), 500);
        }
        selectedReg = null;
      }
    }, pair.obligation);
    oblBtns[pair.key] = btn;
    rightCol.appendChild(btn);
  });

  gameEl.appendChild(leftCol);
  gameEl.appendChild(rightCol);

  section.appendChild(statusEl);
  section.appendChild(gameEl);
  return section;
}

// ── DPO vs CISO info ─────────────────────────────────────

function renderDPOvsCISO() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'DPO vs CISO — różne role')
  );

  const grid = el('div', { class: 'card-grid' },
    el('div', { class: 'card', style: { borderColor: 'rgba(124,58,237,0.4)' } },
      el('h3', {}, 'CISO'),
      el('p', { style: { color: 'var(--accent)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.75rem' } }, 'Chief Information Security Officer'),
      el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.9' } },
        el('li', {}, 'Odpowiada za całą strategię cyberbezpieczeństwa IT'),
        el('li', {}, 'Zarządza zespołem SOC, narzędziami, architekturą'),
        el('li', {}, 'Raportuje do zarządu / CEO'),
        el('li', {}, 'Nie jest wymagany przez RODO (ale przez dobrą praktykę)'),
        el('li', {}, 'Zakres: CAŁY świat IT i cyberbezpieczeństwa'),
      )
    ),
    el('div', { class: 'card', style: { borderColor: 'rgba(16,185,129,0.4)' } },
      el('h3', {}, 'DPO'),
      el('p', { style: { color: 'var(--success)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.75rem' } }, 'Data Protection Officer / Inspektor Ochrony Danych'),
      el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.9' } },
        el('li', {}, 'Doradza w kwestii zgodności z RODO'),
        el('li', {}, 'Punkt kontaktowy z UODO'),
        el('li', {}, 'Niezależny — nie może być zdymisjonowany za swoją pracę'),
        el('li', {}, 'Wymagany przez RODO dla wielu organizacji'),
        el('li', {}, 'Zakres: TYLKO ochrona danych osobowych'),
      )
    )
  );

  section.appendChild(el('div', { class: 'alert alert-warning', style: { marginBottom: '1rem' } },
    el('strong', {}, 'Uwaga: '), 'DPO i CISO to różne role. Połączenie ich w jednej osobie jest możliwe, ale rodzi ryzyko konfliktu interesów.'
  ));
  section.appendChild(grid);
  return section;
}

// ── Quiz ─────────────────────────────────────────────────

const QUIZ_QUESTIONS = [
  {
    question: 'W jakim czasie należy zgłosić naruszenie danych osobowych do UODO zgodnie z RODO?',
    options: ['24 godziny', '48 godzin', '72 godziny', '7 dni'],
    correct: 2,
    explanation: 'RODO art. 33 wymaga zgłoszenia naruszenia danych osobowych organowi nadzorczemu (UODO) bez zbędnej zwłoki, nie później niż 72h po stwierdzeniu naruszenia.'
  },
  {
    question: 'Które sektory są NOWE w zakresie NIS2 (nieobecne w NIS1)?',
    options: ['Energetyka i transport', 'Produkcja, poczta i zarządzanie odpadami', 'Bankowość i finanse', 'Infrastruktura cyfrowa'],
    correct: 1,
    explanation: 'NIS2 znacząco rozszerzyło zakres o nowe sektory m.in. produkcję, pocztę, zarządzanie odpadami i wiele innych nieobecnych w pierwotnej NIS1.'
  },
  {
    question: 'Czym jest DPO (Inspektor Ochrony Danych)?',
    options: ['Kierownik działu IT odpowiedzialny za bezpieczeństwo', 'Niezależna funkcja doradcza ds. zgodności z RODO', 'Osoba zarządzająca całym SOC', 'Audytor zewnętrzny weryfikujący bezpieczeństwo'],
    correct: 1,
    explanation: 'DPO (IOD) to niezależna funkcja doradcza skupiona wyłącznie na zgodności z RODO — inna niż CISO. Musi być niezależny i chroniony przed dyscyplinarnym zwolnieniem.'
  },
  {
    question: 'Jakie testy odporności wymaga DORA dla największych instytucji finansowych?',
    options: ['Pentest co rok', 'TLPT (Threat-Led Penetration Testing) co 3 lata', 'Skan podatności co kwartał', 'Red team exercise co 5 lat'],
    correct: 1,
    explanation: 'DORA wymaga od największych instytucji finansowych przeprowadzania TLPT (Threat-Led Penetration Testing) co 3 lata według standardu TIBER-EU.'
  },
  {
    question: 'Jakie są maksymalne kary za naruszenie RODO?',
    options: ['Do 1 mln EUR', 'Do 5 mln EUR lub 2% obrotu', 'Do 20 mln EUR lub 4% obrotu', 'Do 50 mln EUR'],
    correct: 2,
    explanation: 'Kary za najpoważniejsze naruszenia RODO (art. 83 ust. 5) wynoszą do 20 mln EUR lub 4% rocznego światowego obrotu — w zależności co jest wyższe.'
  },
];

export function renderRegulacje() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Regulacje Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Regulacje mówią, co trzeba zrobić i kto za to odpowiada — NIS2/KSC, DORA, RODO, normy ISO.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~20 min'),
      el('span', { class: 'badge badge-accent' }, 'Moduł 2')
    )
  ));

  wrap.appendChild(renderRegTable());
  wrap.appendChild(renderMatchGame());
  wrap.appendChild(renderDPOvsCISO());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Quiz końcowy')
  );
  const quizContainer = el('div', {});
  quizSection.appendChild(quizContainer);

  initQuiz(quizContainer, { questions: QUIZ_QUESTIONS }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('regulacje', score, total);
      earnBadge('regulacje');
      fullBurst();
      wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, 'Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka "Regulacje" odblokowana!`
      ));
    }
  });

  wrap.appendChild(quizSection);
  return wrap;
}
