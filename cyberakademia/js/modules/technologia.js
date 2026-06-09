// ============================================================
// CyberAkademia — modules/technologia.js
// Module 4: SIEM, EDR, MFA, Zero Trust, technology layers
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';

// ── MFA Simulator ────────────────────────────────────────

function renderMFASim() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '🔑 Symulator MFA')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'MFA (Multi-Factor Authentication) wymaga podania co najmniej dwóch różnych czynników. Przejdź przez symulowany proces logowania.'
  ));

  let step = 0;

  const sim = el('div', { class: 'mfa-sim' });

  // Step indicators
  const stepDots = el('div', { class: 'mfa-step-indicators' });
  ['1', '2', '3'].forEach((s, i) => {
    const dot = el('div', { class: `mfa-step-dot ${i === 0 ? 'active' : ''}`, 'data-step': i }, s);
    stepDots.appendChild(dot);
  });
  sim.appendChild(stepDots);

  const formCard = el('div', { class: 'mfa-form-card' });
  sim.appendChild(formCard);

  const feedbackEl = el('div', {});
  sim.appendChild(feedbackEl);

  function updateDots() {
    stepDots.querySelectorAll('.mfa-step-dot').forEach((d, i) => {
      d.className = `mfa-step-dot ${i < step ? 'done' : i === step ? 'active' : ''}`;
      d.textContent = i < step ? '✓' : String(i + 1);
    });
  }

  function renderStep() {
    formCard.innerHTML = '';
    feedbackEl.innerHTML = '';
    updateDots();

    if (step === 0) {
      formCard.appendChild(el('div', { class: 'mfa-form-title' }, '🔐 Krok 1: Login i hasło'));
      const user = el('input', { class: 'mfa-input', type: 'text', placeholder: 'Login / Email' });
      const pass = el('input', { class: 'mfa-input', type: 'password', placeholder: 'Hasło' });
      const btn = el('button', {
        class: 'btn btn-primary w-full',
        onclick: () => {
          if (!user.value) { feedbackEl.innerHTML = '<div class="alert alert-warning">Podaj login.</div>'; return; }
          step = 1; renderStep();
        }
      }, '➡️ Dalej');
      formCard.appendChild(user);
      formCard.appendChild(pass);
      formCard.appendChild(btn);
      formCard.appendChild(el('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' } },
        'Czynnik 1: Coś co WIESZ (hasło)'
      ));

    } else if (step === 1) {
      formCard.appendChild(el('div', { class: 'mfa-form-title' }, '📱 Krok 2: Kod z aplikacji'));
      formCard.appendChild(el('p', { style: { textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' } },
        'Kod z Google Authenticator / Microsoft Authenticator:'
      ));
      const code = el('input', {
        class: 'mfa-input',
        type: 'text',
        placeholder: '6-cyfrowy kod TOTP',
        maxlength: 6,
        style: { textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.2rem' }
      });
      const btn = el('button', {
        class: 'btn btn-primary w-full',
        onclick: () => {
          if (code.value.length !== 6 || !/^\d+$/.test(code.value)) {
            feedbackEl.innerHTML = '<div class="alert alert-warning">Podaj 6-cyfrowy kod.</div>';
            return;
          }
          step = 2; renderStep();
        }
      }, '✅ Zatwierdź');
      formCard.appendChild(code);
      formCard.appendChild(btn);
      formCard.appendChild(el('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' } },
        'Czynnik 2: Coś co MASZ (telefon z TOTP)'
      ));

    } else {
      formCard.appendChild(el('div', { style: { textAlign: 'center' } },
        el('div', { style: { fontSize: '3rem', marginBottom: '0.75rem' } }, '🎉'),
        el('div', { class: 'result-title' }, 'Zalogowano pomyślnie!'),
        el('p', { style: { marginTop: '0.5rem', color: 'var(--success)' } },
          'MFA chroni konto nawet gdy hasło zostało wykradzione.'
        ),
        el('div', { class: 'alert alert-info', style: { textAlign: 'left', marginTop: '1rem' } },
          el('strong', {}, '💡 Dlaczego MFA działa? '),
          'Atakujący może ukraść Twoje hasło (phishing, data breach), ale bez drugiego czynnika — telefonu z TOTP lub klucza U2F — nie zaloguje się. MFA eliminuje 99% ataków na konta.'
        ),
        el('button', {
          class: 'btn btn-secondary',
          style: { marginTop: '1rem' },
          onclick: () => { step = 0; renderStep(); }
        }, '🔄 Spróbuj ponownie')
      ));
    }
  }

  renderStep();
  section.appendChild(sim);
  return section;
}

// ── Backup 3-2-1 ─────────────────────────────────────────

function renderBackup321() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '💾 Zasada 3-2-1 Backup')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Kopie zapasowe i ich regularne testowanie odtwarzania — najlepsza obrona przed ransomware. ' +
    'Zasada 3-2-1: 3 kopie, 2 nośniki, 1 poza siedzibą. ' +
    'Z backupem firma wstaje po ataku. Bez backupu — płaci okup.'
  ));

  const viz = el('div', { class: 'backup-321' },
    el('div', { class: 'backup-321-item' },
      el('div', { class: 'backup-321-count' }, '3'),
      el('div', { class: 'backup-321-icons' }, '📁', '📁', '📁'),
      el('div', { class: 'backup-321-label' }, '3 kopie danych')
    ),
    el('div', { class: 'backup-321-arrow' }, '→'),
    el('div', { class: 'backup-321-item' },
      el('div', { class: 'backup-321-count' }, '2'),
      el('div', { class: 'backup-321-icons' }, '💿', '☁️'),
      el('div', { class: 'backup-321-label' }, '2 różne nośniki (dysk + chmura)')
    ),
    el('div', { class: 'backup-321-arrow' }, '→'),
    el('div', { class: 'backup-321-item' },
      el('div', { class: 'backup-321-count' }, '1'),
      el('div', { class: 'backup-321-icons' }, '🏢'),
      el('div', { class: 'backup-321-label' }, '1 kopia offline lub poza siedzibą')
    )
  );

  section.appendChild(viz);

  section.appendChild(el('div', { class: 'alert alert-danger' },
    el('strong', {}, '⚠️ Krytyczne: '),
    'Backup, który nie był testowany, NIE ISTNIEJE. Regularnie testuj odtwarzanie danych!'
  ));

  section.appendChild(el('div', { class: 'alert alert-info', style: { marginTop: '0.5rem' } },
    el('strong', {}, '💡 Rozszerzenie — 3-2-1-1-0: '),
    '3 kopie, 2 nośniki, 1 poza siedzibą, 1 offline/immutable (niezmienialny), 0 błędów przy testach odtwarzania.'
  ));

  return section;
}

// ── Zero Trust viz ───────────────────────────────────────

function renderZeroTrust() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '🔒 Zero Trust — podejście, nie produkt')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Nie „filozofia produktu", tylko podejście: „nigdy nie ufaj, zawsze weryfikuj". ' +
    'Zakłada, że żaden użytkownik ani urządzenie nie jest zaufane domyślnie, nawet wewnątrz sieci. ' +
    'Stopniowo zastępuje stary model „twardej skorupy, miękkiego środka" — w którym po przebiciu perimetru atakujący ma swobodę wewnątrz.'
  ));

  const viz = el('div', { class: 'zero-trust-viz' },
    el('div', { class: 'zt-model old-model' },
      el('div', { class: 'zt-model-title' }, '❌ Stary model (Castle & Moat)'),
      el('div', { class: 'zt-icon-scene' },
        el('div', { style: { fontSize: '3rem' } }, '🏰'),
        el('div', { style: { fontSize: '1rem', color: 'var(--success)', marginTop: '0.25rem' } }, '— fosa —'),
        el('div', { style: { fontSize: '1.5rem' } }, '🛡️')
      ),
      el('div', { class: 'zt-description' }, 'Zaufaj wszystkiemu w sieci wewnętrznej. Duży, twardy "perimeter" (firewall). Gdy napastnik przejdzie przez bramę — ma dostęp do wszystkiego.')
    ),
    el('div', { class: 'zt-model new-model' },
      el('div', { class: 'zt-model-title' }, '✅ Zero Trust'),
      el('div', { class: 'zt-icon-scene' },
        el('div', { style: { display: 'flex', gap: '0.5rem', fontSize: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' } },
          '🔐', '🔐', '🔐', '🔐', '🔐', '🔐'
        )
      ),
      el('div', { class: 'zt-description' }, 'Każdy zasób ma własny zamek. Weryfikuj tożsamość przy każdym dostępie. Least privilege + mikrosegmentacja. Nawet admin musi się uwierzytelnić.')
    )
  );

  section.appendChild(viz);

  const principles = [
    { icon: '✅', label: 'Verify Explicitly', desc: 'Zawsze uwierzytelniaj i autoryzuj w oparciu o wszystkie dostępne sygnały: tożsamość, lokalizacja, urządzenie, usługa, dane, anomalie.' },
    { icon: '🔑', label: 'Least Privilege', desc: 'Przyznawaj minimalny dostęp niezbędny do wykonania zadania. Just-in-Time (JIT) i Just-Enough-Access (JEA).' },
    { icon: '💥', label: 'Assume Breach', desc: 'Zakładaj, że naruszenie już nastąpiło. Minimalizuj promień wybuchu, segmentuj dostęp, szyfruj cały ruch.' },
  ];

  const grid = el('div', { class: 'card-grid', style: { marginTop: '1.5rem' } });
  principles.forEach(p => {
    grid.appendChild(el('div', { class: 'card' },
      el('div', { style: { fontSize: '1.5rem', marginBottom: '0.5rem' } }, p.icon),
      el('h3', {}, p.label),
      el('p', {}, p.desc)
    ));
  });
  section.appendChild(grid);
  return section;
}

// ── Key tools overview ───────────────────────────────────

function renderToolsOverview() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '🛠️ Kluczowe narzędzia bezpieczeństwa')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Tu pojawiają się narzędzia. Najważniejsza zasada porządkująca to obrona warstwowa (defense in depth): ' +
    'nie ma jednego „magicznego pudełka" — jest wiele warstw, z których każda łapie to, co przepuści poprzednia. ' +
    'Trzymanie tej zasady w głowie chroni przed kupowaniem narzędzi bez zrozumienia, jakiemu obowiązkowi i jakiemu ryzyku mają służyć.'
  ));

  const tools = [
    { icon: '🖥️', name: 'SIEM', full: 'Security Information and Event Management', desc: 'Mózg SOC. Zbiera logi i zdarzenia z całej infrastruktury (serwery, sieć, aplikacje), koreluje je i generuje alarmy. Analogia: centrala, do której spływają wszystkie kamery i czujniki, i która zapala alarm, gdy coś nie pasuje. Przykłady: Splunk, Microsoft Sentinel, Elastic.' },
    { icon: '🛡️', name: 'EDR', full: 'Endpoint Detection and Response', desc: 'Następca antywirusa. Monitoruje zachowanie procesów na urządzeniach końcowych.' },
    { icon: '⚡', name: 'SOAR', full: 'Security Orchestration, Automation and Response', desc: 'Automatyzuje reagowanie — gdy SIEM wykryje phishing, SOAR automatycznie izoluje zagrożenie.' },
    { icon: '🔍', name: 'XDR', full: 'Extended Detection and Response', desc: 'Integruje endpoint, sieć, email i chmurę. Pełniejszy obraz zagrożeń niż sam EDR.' },
    { icon: '🌐', name: 'WAF', full: 'Web Application Firewall', desc: 'Chroni aplikacje webowe przed SQL injection, XSS, CSRF i innymi atakami HTTP.' },
    { icon: '🔑', name: 'PAM', full: 'Privileged Access Management', desc: 'Specjalna kontrola kont administratorów — sejf na hasła, nagrywanie sesji, rotacja haseł.' },
    { icon: '🏢', name: 'IAM', full: 'Identity and Access Management', desc: 'Zarządzanie tożsamościami i dostępem. Kto, do czego, kiedy i jak. Fundament Zero Trust.' },
    { icon: '📊', name: 'DLP', full: 'Data Loss Prevention', desc: 'Monitoruje i blokuje wyciek wrażliwych danych — przez email, USB, chmurę.' },
    { icon: '🔒', name: 'MFA', full: 'Multi-Factor Authentication', desc: 'Hasło to za mało. MFA wymaga drugiego czynnika. Eliminuje 99% ataków na konta.' },
  ];

  const grid = el('div', { class: 'card-grid' });
  tools.forEach(t => {
    grid.appendChild(el('div', { class: 'card' },
      el('div', { style: { fontSize: '1.6rem', marginBottom: '0.5rem' } }, t.icon),
      el('h3', {}, t.name),
      el('div', { style: { fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.4rem' } }, t.full),
      el('p', { style: { fontSize: '0.85rem' } }, t.desc)
    ));
  });

  section.appendChild(grid);
  return section;
}

const QUIZ_QUESTIONS = [
  {
    question: 'Co oznacza zasada "3-2-1" w strategii backupu?',
    options: ['3 serwery, 2 lokalizacje, 1 admin', '3 kopie danych, 2 różne nośniki, 1 kopia poza siedzibą', '3 backupy dziennie, 2 tygodniowo, 1 miesięcznie', '3 wersje pliku, 2 formaty, 1 archiwum'],
    correct: 1,
    explanation: 'Zasada 3-2-1: 3 kopie danych, na 2 różnych nośnikach (np. dysk + chmura), 1 kopia offline lub poza siedzibą. Chroni przed ransomware i katastrofami fizycznymi.'
  },
  {
    question: 'Jaka jest fundamentalna zasada Zero Trust?',
    options: ['Ufaj sieci wewnętrznej', '"Never trust, always verify" — weryfikuj każdy dostęp', 'Blokuj cały ruch zewnętrzny', 'Tylko VPN dla zdalnych użytkowników'],
    correct: 1,
    explanation: 'Zero Trust: "Never trust, always verify" + Least Privilege + Assume Breach. Zakłada, że sieć jest już skompromitowana i weryfikuje każdy dostęp z osobna.'
  },
  {
    question: 'Czym różni się EDR od klasycznego antywirusa?',
    options: ['EDR jest tylko dla laptopów', 'EDR monitoruje zachowanie procesów i umożliwia izolację urządzeń', 'Antywirus jest skuteczniejszy', 'Nie ma różnicy — to to samo narzędzie'],
    correct: 1,
    explanation: 'Klasyczny AV szuka znanych sygnatur. EDR monitoruje zachowanie procesów w czasie rzeczywistym, wykrywa anomalie i umożliwia izolację urządzenia oraz zebranie dowodów.'
  },
  {
    question: 'Które czynniki składają się na MFA?',
    options: ['Tylko hasło i PIN', 'Coś co wiesz + coś co masz + coś czym jesteś', 'Login i email weryfikacyjny', 'VPN i hasło'],
    correct: 1,
    explanation: 'MFA wymaga co najmniej 2 różnych kategorii czynników: Wiedza (hasło, PIN), Posiadanie (telefon, token), Biometria (odcisk palca, twarz). Dwa hasła to NIE MFA.'
  },
  {
    question: 'Do czego służy SOAR?',
    options: ['Skanowania podatności w sieci', 'Automatyzacji reagowania na incydenty i orkiestracji narzędzi', 'Zarządzania tożsamościami', 'Backupu danych'],
    correct: 1,
    explanation: 'SOAR automatyzuje powtarzalne zadania IR — gdy SIEM wykryje zagrożenie, SOAR może automatycznie zablokować IP, poddać kwarantannie endpoint i powiadomić analityka.'
  },
];

export function renderTechnologia() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, '⚙️ Technologia Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Technologia to czym się to robi — narzędzia (SIEM, EDR, firewalle), które wykrywają i blokują ataki.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '⏱ ~30 min'),
      el('span', { class: 'badge badge-accent' }, '🎯 Moduł 4')
    )
  ));

  wrap.appendChild(renderToolsOverview());
  wrap.appendChild(renderMFASim());
  wrap.appendChild(renderBackup321());
  wrap.appendChild(renderZeroTrust());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '📝 Quiz końcowy')
  );
  const qc = el('div', {});
  quizSection.appendChild(qc);
  initQuiz(qc, { questions: QUIZ_QUESTIONS }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('technologia', score, total);
      earnBadge('technologia');
      fullBurst();
      wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, '🎉 Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka "Technologia" odblokowana!`
      ));
    }
  });
  wrap.appendChild(quizSection);
  return wrap;
}
