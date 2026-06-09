// ============================================================
// CyberAkademia — modules/finalBoss.js
// Final comprehensive exam across all modules
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge, getState } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';

// ── All questions from all modules ───────────────────────

const ALL_QUESTIONS = [
  // Fundamenty
  {
    question: 'Atak DDoS powoduje niedostępność serwisu. Którą właściwość CIA narusza?',
    options: ['Poufność (C)', 'Integralność (I)', 'Dostępność (A)', 'Wszystkie trzy'],
    correct: 2,
    explanation: 'DDoS narusza przede wszystkim Dostępność (A) — system jest niedostępny dla uprawnionych użytkowników.'
  },
  {
    question: 'Pracownik sprzedał dane klientów konkurencji. Które CIA jest naruszone PRZEDE WSZYSTKIM?',
    options: ['Dostępność (A)', 'Poufność (C)', 'Integralność (I)', 'Żadne'],
    correct: 1,
    explanation: 'Sprzedaż danych klientów to klasyczne naruszenie Poufności (C) — dane trafiły do nieuprawnionych podmiotów.'
  },
  {
    question: 'Firma wdraża MFA zamiast polegać tylko na hasłach. To jest przykład jakiej odpowiedzi na ryzyko?',
    options: ['Unikaj (Avoid)', 'Akceptuj (Accept)', 'Obniżaj (Mitigate)', 'Przenoś (Transfer)'],
    correct: 2,
    explanation: 'Wdrożenie kontroli (MFA) bezpośrednio redukuje ryzyko przejęcia kont — to klasyczna mitygacja ryzyka.'
  },
  // Regulacje
  {
    question: 'W jakim czasie RODO wymaga zgłoszenia naruszenia danych osobowych do UODO?',
    options: ['24 godziny', '48 godzin', '72 godziny', '7 dni'],
    correct: 2,
    explanation: 'RODO art. 33: zgłoszenie do organu nadzorczego (UODO) bez zbędnej zwłoki, nie później niż 72h od stwierdzenia naruszenia.'
  },
  {
    question: 'Która regulacja dotyczy wyłącznie sektora finansowego UE?',
    options: ['RODO', 'NIS2', 'DORA', 'ISO 27001'],
    correct: 2,
    explanation: 'DORA (Digital Operational Resilience Act) dotyczy wyłącznie sektora finansowego: banki, ubezpieczyciele, giełdy, dostawcy ICT dla finansów.'
  },
  {
    question: 'Czym jest DPO w kontekście RODO?',
    options: ['Chief Information Security Officer', 'Inspektor Ochrony Danych — funkcja doradcza ds. zgodności z RODO', 'Dyrektor IT', 'Audytor zewnętrzny'],
    correct: 1,
    explanation: 'DPO (Data Protection Officer / IOD) to niezależna funkcja doradcza wymagana przez RODO. Różni się od CISO — DPO skupia się wyłącznie na ochronie danych osobowych.'
  },
  // Organizacja
  {
    question: 'SOC opiera się na trzech filarach. Które to?',
    options: ['Firewall, SIEM, Antywirus', 'Ludzie, Procesy, Technologia', 'Detekcja, Reakcja, Odtwarzanie', 'Zarząd, CISO, DPO'],
    correct: 1,
    explanation: 'SOC trójfilar: Ludzie (analitycy, role), Procesy (playbooki, SLA, eskalacja) i Technologia (SIEM, EDR, SOAR). Brak jednego filaru osłabia cały SOC.'
  },
  {
    question: 'Jaka jest główna zaleta modelu MSSP dla małej firmy?',
    options: ['Pełna kontrola nad danymi', 'Dostęp do ekspertów bez budowania własnego SOC', 'Darmowa usługa', 'Brak ryzyka wycieku danych'],
    correct: 1,
    explanation: 'MSSP daje dostęp do ekspertów bezpieczeństwa i monitoring 24/7 bez ogromnych kosztów budowania własnego SOC od zera.'
  },
  // Technologia
  {
    question: 'Co oznacza zasada "3-2-1" w strategii backupu?',
    options: ['3 serwery, 2 lokalizacje, 1 admin', '3 kopie danych, 2 różne nośniki, 1 kopia poza siedzibą', '3 backupy dziennie, 2 tygodniowo, 1 miesięcznie', '3 wersje, 2 formaty, 1 archiwum'],
    correct: 1,
    explanation: 'Zasada 3-2-1: 3 kopie, 2 nośniki (np. dysk + chmura), 1 offline lub poza lokalizacją. Chroni przed ransomware i katastrofami.'
  },
  {
    question: 'Jaka jest fundamentalna zasada Zero Trust?',
    options: ['Ufaj sieci wewnętrznej', '"Never trust, always verify" — weryfikuj każdy dostęp', 'Blokuj cały ruch zewnętrzny', 'Używaj tylko VPN'],
    correct: 1,
    explanation: 'Zero Trust: "Never trust, always verify" + Least Privilege + Assume Breach. Zakładaj naruszenie i weryfikuj każdy dostęp.'
  },
  {
    question: 'Do czego służy SOAR w SOC?',
    options: ['Do skanowania podatności', 'Automatyzacji reagowania na incydenty', 'Zarządzania certyfikatami', 'Backupu danych'],
    correct: 1,
    explanation: 'SOAR automatyzuje powtarzalne zadania IR — playbooki reagowania uruchamiane automatycznie po wykryciu zagrożenia przez SIEM.'
  },
  // Spięcie
  {
    question: 'Która nowa funkcja pojawiła się w NIST CSF 2.0?',
    options: ['DETECT', 'GOVERN', 'RESPOND', 'RECOVER'],
    correct: 1,
    explanation: 'NIST CSF 2.0 (2024) dodał funkcję GOVERN skupioną na zaangażowaniu zarządu i ustanowieniu strategii zarządzania ryzykiem cyberbezpieczeństwa.'
  },
  {
    question: 'Jaka jest prawidłowa kolejność faz reagowania na incydent (IR)?',
    options: ['Eradykacja → Identyfikacja → Izolacja', 'Przygotowanie → Identyfikacja → Izolacja → Eradykacja → Odtworzenie → Nauki', 'Wykrycie → Eradykacja → Nauki', 'Izolacja → Przygotowanie → Odtworzenie'],
    correct: 1,
    explanation: 'Standardowy cykl IR: Przygotowanie → Identyfikacja → Izolacja → Eradykacja → Odtworzenie → Nauki (lessons learned).'
  },
  {
    question: 'Co NALEŻY zrobić PRZED odtworzeniem systemów po ataku ransomware?',
    options: ['Zapłacić okup', 'Eradykować malware i potwierdzić czystość środowiska', 'Natychmiast przywrócić backup', 'Poinformować media'],
    correct: 1,
    explanation: 'Bez eradykacji malware odtworzone systemy zostaną ponownie zainfekowane. Najpierw eradykacja, potem odtworzenie z czystego backupu.'
  },
  // Zagrożenia i narzędzia
  {
    question: 'Który wektor ataku jest odpowiedzialny za ok. 90% ataków ransomware?',
    options: ['Ataki DDoS', 'Phishing email', 'Ataki fizyczne', 'Podatności zero-day'],
    correct: 1,
    explanation: 'Phishing email to najczęstszy wektor wejścia dla ransomware. Złośliwy załącznik lub link w emailu prowadzi do infekcji.'
  },
  {
    question: 'Czym jest APT (Advanced Persistent Threat)?',
    options: ['Automatyczny test penetracyjny', 'Długotrwały, ukryty atak celowany — często sponsorowany przez państwo', 'Rodzaj firewalla', 'Protokół uwierzytelniania'],
    correct: 1,
    explanation: 'APT to zaawansowany, długotrwały atak celowany. Atakujący przez miesiące ukrywa się w sieci ofiary, eksfiltrując dane lub przygotowując sabotaż.'
  },
  {
    question: 'Co to jest SIEM?',
    options: ['Rodzaj firewalla', 'System zbierający logi i korelujący zdarzenia bezpieczeństwa z całej infrastruktury', 'Aplikacja do backupu', 'Protokół sieciowy'],
    correct: 1,
    explanation: 'SIEM (Security Information and Event Management) to mózg SOC — zbiera logi ze wszystkich systemów, koreluje zdarzenia i generuje alerty o zagrożeniach.'
  },
  {
    question: 'Zasada Least Privilege w Zero Trust oznacza:',
    options: ['Blokowanie wszystkich zewnętrznych połączeń', 'Przyznanie minimalnego dostępu niezbędnego do wykonania zadania', 'Usunięcie wszystkich kont administratorów', 'Szyfrowanie wszystkich danych'],
    correct: 1,
    explanation: 'Least Privilege: każdy użytkownik i system ma tylko tyle uprawnień ile potrzebuje do swojej pracy. Minimalizuje "promień wybuchu" przy naruszeniu.'
  },
  {
    question: 'Inspektor Ochrony Danych (DPO) jest wymagany przez:',
    options: ['NIS2', 'RODO (GDPR)', 'DORA', 'ISO 27001'],
    correct: 1,
    explanation: 'DPO jest wymagany przez RODO (art. 37-39) dla organów publicznych, podmiotów przetwarzających dane na dużą skalę lub przetwarzających szczególne kategorie danych.'
  },
  {
    question: 'Co to jest EDR?',
    options: ['Protokół routingu', 'System wykrywania i reagowania na zagrożenia na urządzeniach końcowych', 'Narzędzie do backupu', 'Standard kryptograficzny'],
    correct: 1,
    explanation: 'EDR (Endpoint Detection and Response) monitoruje zachowanie procesów na stacjach roboczych, wykrywa anomalie i umożliwia izolację zainfekowanych urządzeń.'
  },
];

// ── Final Boss render ─────────────────────────────────────

export function renderFinalBoss() {
  const wrap = el('div', { class: 'slide-up' });
  const state = getState();
  const alreadyPassed = state.completed?.finalboss;

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Final Boss — Egzamin Końcowy'),
    el('p', { class: 'subtitle' }, 'Wielki test ze wszystkich modułów CyberAkademii. Wykaż się wiedzą i zdobądź tytuł Mistrza!'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~45 min'),
      el('span', { class: 'badge badge-danger' }, '20 pytań'),
      alreadyPassed ? el('span', { class: 'badge badge-success' }, 'Zaliczone!') : null
    )
  ));

  // ── Boss intro ──────────────────────────────────────

  const arena = el('div', { class: 'final-boss-arena' });

  arena.appendChild(
    el('div', { class: 'final-boss-header' },
      el('div', { class: 'final-boss-title' }, 'Dr. Cyber Villain'),
      el('div', { class: 'boss-phase' }, 'Tryb: Wiedzmistrz Cyberbezpieczeństwa'),
    )
  );

  // Progress bar (health)
  const healthBar = el('div', { class: 'boss-health-bar' });
  const healthFill = el('div', { class: 'boss-health-fill', style: { width: '100%' } });
  healthBar.appendChild(healthFill);
  arena.appendChild(healthBar);

  arena.appendChild(
    el('div', { style: { color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' } },
      'Każda poprawna odpowiedź zadaje cios bossowi. Uzbierasz 70% i wygrywasz!'
    )
  );

  // Quiz container
  const quizContainer = el('div', {});
  arena.appendChild(quizContainer);

  // Shuffle questions
  const questions = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);

  wrap.appendChild(arena);

  // Run quiz using the already-imported initQuiz
  {
    initQuiz(quizContainer, { questions }, (score, total) => {
      const pct = score / total;

      // Animate boss HP bar
      healthFill.style.transition = 'width 0.8s ease, background 0.5s ease';
      healthFill.style.width = `${Math.max(0, 100 - Math.round(pct * 100))}%`;

      if (pct >= 0.7) {
        // Victory!
        completeModule('finalboss', score, total);
        earnBadge('finalboss');
        setTimeout(() => {
          fullBurst();
          setTimeout(fullBurst, 500);
          setTimeout(fullBurst, 1000);
        }, 500);

        wrap.appendChild(
          el('div', { class: 'alert alert-success', style: { marginTop: '2rem', textAlign: 'center', fontSize: '1.1rem' } },
            el('strong', {}, 'BOSS POKONANY! '),
            `Wynik: ${score}/${total} (${Math.round(pct * 100)}%). `,
            el('br'),
            'Gratulacje — jesteś Mistrzem CyberAkademii! Odznaka "Mistrz" odblokowana.'
          )
        );
      } else {
        wrap.appendChild(
          el('div', { class: 'alert alert-warning', style: { marginTop: '2rem', textAlign: 'center' } },
            el('strong', {}, `Wynik: ${score}/${total} (${Math.round(pct * 100)}%) — Potrzebujesz 70%. `),
            'Powtórz moduły i spróbuj ponownie!'
          )
        );
      }
    });
  }

  // ── Tips before starting ──────────────────────────────

  if (!alreadyPassed) {
    const tipsCard = el('div', { class: 'card', style: { marginTop: '1.5rem' } },
      el('h3', { style: { marginBottom: '1rem' } }, 'Wskazówki przed egzaminem'),
      el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.9', fontSize: '0.9rem' } },
        el('li', {}, 'Pytania obejmują wszystkie 5 modułów: Fundamenty, Regulacje, Organizacja, Technologia, Spięcie'),
        el('li', {}, 'Potrzebujesz 70% (14/20) poprawnych odpowiedzi'),
        el('li', {}, 'Możesz próbować wielokrotnie — nie ma limitu podejść'),
        el('li', {}, 'Zapoznaj się ze Słownikiem jeśli masz wątpliwości co do skrótów'),
      )
    );
    wrap.appendChild(tipsCard);
  }

  return wrap;
}
