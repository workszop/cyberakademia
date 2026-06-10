// ============================================================
// CyberAkademia - modules/technologia.js
// Module 4: SIEM, EDR, MFA, Zero Trust, technology layers
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';
import { initExpandable } from '../primitives/expandable.js';
import { icon } from '../icons.js';
import {
  SOC_TOOLS,
  NETWORK_TOOLS,
  IDENTITY_TOOLS,
  DATA_PROTECTION,
  OFFENSIVE_TESTING,
  DEFENSE_LAYERS,
  TECH_QUIZ,
} from '../content/technologia.js';

// ── MFA Simulator ────────────────────────────────────────

function renderMFASim() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Symulator MFA')
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
      formCard.appendChild(el('div', { class: 'mfa-form-title' }, 'Krok 1: Login i hasło'));
      const user = el('input', { class: 'mfa-input', type: 'text', placeholder: 'Login / Email' });
      const pass = el('input', { class: 'mfa-input', type: 'password', placeholder: 'Hasło' });
      const btn = el('button', {
        class: 'btn btn-primary w-full',
        onclick: () => {
          if (!user.value) { feedbackEl.innerHTML = '<div class="alert alert-warning">Podaj login.</div>'; return; }
          step = 1; renderStep();
        }
      }, 'Dalej');
      formCard.appendChild(user);
      formCard.appendChild(pass);
      formCard.appendChild(btn);
      formCard.appendChild(el('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' } },
        'Czynnik 1: Coś co WIESZ (hasło)'
      ));

    } else if (step === 1) {
      formCard.appendChild(el('div', { class: 'mfa-form-title' }, 'Krok 2: Kod z aplikacji'));
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
      }, 'Zatwierdź');
      formCard.appendChild(code);
      formCard.appendChild(btn);
      formCard.appendChild(el('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' } },
        'Czynnik 2: Coś co MASZ (telefon z TOTP)'
      ));

    } else {
      formCard.appendChild(el('div', { style: { textAlign: 'center' } },
        el('div', { class: 'result-title' }, 'Zalogowano pomyślnie!'),
        el('p', { style: { marginTop: '0.5rem', color: 'var(--success)' } },
          'MFA chroni konto nawet gdy hasło zostało wykradzione.'
        ),
        el('div', { class: 'alert alert-info', style: { textAlign: 'left', marginTop: '1rem' } },
          el('strong', {}, 'Dlaczego MFA działa? '),
          'Atakujący może ukraść Twoje hasło (phishing, wyciek danych), ale bez drugiego czynnika – telefonu z TOTP lub klucza U2F – nie zaloguje się. MFA znacząco ogranicza skuteczność ataków na konta.'
        ),
        el('button', {
          class: 'btn btn-secondary',
          style: { marginTop: '1rem' },
          onclick: () => { step = 0; renderStep(); }
        }, 'Spróbuj ponownie')
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
    el('div', { class: 'section-title' }, 'Zasada 3-2-1 kopii zapasowych')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Kopie zapasowe i ich regularne testowanie odtwarzania – najlepsza obrona przed ransomware. ' +
    'Zasada 3-2-1: 3 kopie, 2 nośniki, 1 poza siedzibą. ' +
    'Z kopią zapasową firma wstaje po ataku. Bez kopii zapasowej – płaci okup.'
  ));

  const viz = el('div', { class: 'backup-321' },
    el('div', { class: 'backup-321-item' },
      el('div', { class: 'backup-321-count' }, '3'),
      el('div', { class: 'backup-321-label' }, '3 kopie danych')
    ),
    el('div', { class: 'backup-321-arrow' }, '→'),
    el('div', { class: 'backup-321-item' },
      el('div', { class: 'backup-321-count' }, '2'),
      el('div', { class: 'backup-321-label' }, '2 różne nośniki (dysk + chmura)')
    ),
    el('div', { class: 'backup-321-arrow' }, '→'),
    el('div', { class: 'backup-321-item' },
      el('div', { class: 'backup-321-count' }, '1'),
      el('div', { class: 'backup-321-label' }, '1 kopia offline lub poza siedzibą')
    )
  );

  section.appendChild(viz);

  section.appendChild(el('div', { class: 'alert alert-danger' },
    el('strong', {}, 'Krytyczne: '),
    'Kopia zapasowa, która nie była testowana, NIE ISTNIEJE. Regularnie testuj odtwarzanie danych!'
  ));

  section.appendChild(el('div', { class: 'alert alert-info', style: { marginTop: '0.5rem' } },
    el('strong', {}, 'Rozszerzenie - 3-2-1-1-0: '),
    '3 kopie, 2 nośniki, 1 poza siedzibą, 1 offline/immutable (niezmienialny), 0 błędów przy testach odtwarzania.'
  ));

  return section;
}

// ── Zero Trust viz ───────────────────────────────────────

function renderZeroTrust() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Zero Trust - podejście, nie produkt')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Nie „filozofia produktu”, tylko podejście: „nigdy nie ufaj, zawsze weryfikuj”. ' +
    'Zakłada, że żaden użytkownik ani urządzenie nie jest zaufane domyślnie, nawet wewnątrz sieci. ' +
    'Stopniowo zastępuje stary model „twardej skorupy, miękkiego środka” - w którym po przebiciu perimetru atakujący ma swobodę wewnątrz.'
  ));

  const viz = el('div', { class: 'zero-trust-viz' },
    el('div', { class: 'zt-model old-model' },
      el('div', { class: 'zt-model-title' }, 'Stary model (Castle & Moat)'),
      el('div', { class: 'zt-icon-scene' },
        el('div', { style: { fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem' } }, 'Twardy perimeter, miękkie centrum')
      ),
      el('div', { class: 'zt-description' }, 'Zaufaj wszystkiemu w sieci wewnętrznej. Duży, twardy „perimeter” (firewall). Gdy napastnik przejdzie przez bramę - ma dostęp do wszystkiego.')
    ),
    el('div', { class: 'zt-model new-model' },
      el('div', { class: 'zt-model-title' }, 'Zero Trust'),
      el('div', { class: 'zt-icon-scene' },
        el('div', { style: { fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem' } }, 'Każdy zasób weryfikowany z osobna')
      ),
      el('div', { class: 'zt-description' }, 'Każdy zasób ma własny zamek. Weryfikuj tożsamość przy każdym dostępie. Least privilege + mikrosegmentacja. Nawet admin musi się uwierzytelnić.')
    )
  );

  section.appendChild(viz);

  const principles = [
    { label: 'Verify Explicitly', desc: 'Zawsze uwierzytelniaj i autoryzuj w oparciu o wszystkie dostępne sygnały: tożsamość, lokalizacja, urządzenie, usługa, dane, anomalie.' },
    { label: 'Least Privilege', desc: 'Przyznawaj minimalny dostęp niezbędny do wykonania zadania. Just-in-Time (JIT) i Just-Enough-Access (JEA).' },
    { label: 'Assume Breach', desc: 'Zakładaj, że naruszenie już nastąpiło. Minimalizuj promień wybuchu, segmentuj dostęp, szyfruj cały ruch.' },
  ];

  const grid = el('div', { class: 'card-grid', style: { marginTop: '1.5rem' } });
  principles.forEach(p => {
    grid.appendChild(el('div', { class: 'card' },
      el('h3', {}, p.label),
      el('p', {}, p.desc)
    ));
  });
  section.appendChild(grid);
  return section;
}

// ── Tool families (z content/technologia.js) ─────────────

// Buduje pojedynczą rodzinę narzędzi jako accordion (initExpandable).
// Mapuje pola z content: name → title, full → summary, opis/szczegóły → detail.
function renderToolFamily(title, intro, tools, buildDetail) {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, title)
  );

  if (intro) {
    section.appendChild(el('p', { style: { marginBottom: '1.5rem' } }, intro));
  }

  const items = tools.map(t => ({
    title: t.full ? `${t.name} - ${t.full}` : t.name,
    summary: t.description || '',
    detail: buildDetail(t),
  }));

  const acc = el('div', {});
  section.appendChild(acc);
  initExpandable(acc, items);
  return section;
}

// Składa czytelny tekst szczegółów z dostępnych pól danej rodziny.
function joinDetail(parts) {
  return parts.filter(Boolean).join('\n\n');
}

function renderSocTools() {
  return renderToolFamily(
    'Centrum operacji bezpieczeństwa (SOC)',
    'Narzędzia SOC wykrywają i obsługują incydenty. Sercem jest SIEM - centrala monitoringu, ' +
    'do której spływają logi i zdarzenia z całej infrastruktury, jak obrazy z wszystkich kamer i czujników w budynku, ' +
    'a SOAR automatyzuje reagowanie. Warstwy detekcji różnią się zasięgiem: EDR widzi endpoint, ' +
    'NDR - ruch w sieci, XDR łączy oba obrazy, a MDR oddaje całość w ręce zewnętrznego zespołu.',
    SOC_TOOLS,
    (t) => joinDetail([
      t.analogy && `Analogia: ${t.analogy}`,
      t.howItWorks && `Jak działa: ${t.howItWorks}`,
      Array.isArray(t.examples) && t.examples.length && `Przykłady: ${t.examples.join(', ')}.`,
      Array.isArray(t.pros) && t.pros.length && `Zalety: ${t.pros.join('; ')}.`,
      Array.isArray(t.cons) && t.cons.length && `Ograniczenia: ${t.cons.join('; ')}.`,
    ])
  );
}

function renderNetworkTools() {
  return renderToolFamily(
    'Narzędzia sieciowe',
    'Kontrolują ruch wchodzący, wychodzący i przemieszczający się wewnątrz sieci - od bramy (NGFW) ' +
    'przez wykrywanie i blokowanie włamań (IDS/IPS), po ochronę aplikacji webowych (WAF) i bezpieczny dostęp zdalny (VPN/ZTNA).',
    NETWORK_TOOLS,
    (t) => joinDetail([
      t.detail,
      Array.isArray(t.examples) && t.examples.length && `Przykłady: ${t.examples.join(', ')}.`,
      Array.isArray(t.useCases) && t.useCases.length && `Zastosowania: ${t.useCases.join('; ')}.`,
    ])
  );
}

function renderIdentityTools() {
  return renderToolFamily(
    'Tożsamość i dostęp',
    'W modelu Zero Trust granicą bezpieczeństwa nie jest już sieć, lecz tożsamość. ' +
    'IAM porządkuje „kto, do czego, kiedy i jak”, MFA dokłada drugi czynnik, a PAM pilnuje kont uprzywilejowanych - „kluczy do królestwa”.',
    IDENTITY_TOOLS,
    (t) => joinDetail([
      t.detail,
      t.zeroTrustRelation && `Rola w Zero Trust: ${t.zeroTrustRelation}`,
      Array.isArray(t.pillars) && t.pillars.length && `Filary: ${t.pillars.join('; ')}.`,
      Array.isArray(t.examples) && t.examples.length && `Przykłady: ${t.examples.join(', ')}.`,
    ])
  );
}

function renderDataProtectionTools() {
  return renderToolFamily(
    'Ochrona danych',
    'Poufność, integralność i dostępność danych: szyfrowanie (w spoczynku i w tranzycie), ' +
    'kopie zapasowe według zasady 3-2-1 oraz DLP zapobiegające wyciekom.',
    DATA_PROTECTION,
    (t) => {
      const parts = [t.description];
      if (Array.isArray(t.types)) {
        t.types.forEach(ty => {
          parts.push(`${ty.name}: ${ty.description} ${ty.standards || ''} ${ty.regulatoryReq || ''}`.trim());
        });
      }
      if (Array.isArray(t.rules)) {
        parts.push(t.rules.map(r => `${r.rule} - ${r.explanation}`).join(' '));
      }
      if (Array.isArray(t.extensions)) {
        parts.push(t.extensions.map(e => `${e.name}: ${e.description}`).join(' '));
      }
      if (t.rtoRpo) {
        parts.push(`${t.rtoRpo.rto} ${t.rtoRpo.rpo}`);
      }
      if (Array.isArray(t.channels)) {
        parts.push(`Kanały: ${t.channels.join('; ')}.`);
      }
      if (t.prerequisites) parts.push(t.prerequisites);
      if (t.regulatoryLink) parts.push(t.regulatoryLink);
      return joinDetail(parts);
    }
  );
}

function renderOffensiveTesting() {
  return renderToolFamily(
    'Testowanie ofensywne',
    'Najlepszy sposób, by sprawdzić obronę, to ją zaatakować w kontrolowanych warunkach: ' +
    'od testu penetracyjnego, przez ćwiczenia Red/Blue Team, po regulacyjne TLPT wymagane przez DORA.',
    OFFENSIVE_TESTING,
    (t) => {
      const parts = [t.detail];
      if (Array.isArray(t.types)) {
        parts.push(t.types.map(ty => `${ty.name}: ${ty.description}`).join(' '));
      }
      if (t.scope) parts.push(`Zakres: ${t.scope}`);
      if (t.frequency) parts.push(`Częstotliwość: ${t.frequency}`);
      if (t.vspentest) parts.push(t.vspentest);
      if (t.purpleTeam) parts.push(t.purpleTeam);
      if (t.tiber) parts.push(t.tiber);
      if (t.regulatoryLink) parts.push(t.regulatoryLink);
      return joinDetail(parts);
    }
  );
}

// ── Obrona warstwowa (defense in depth) ──────────────────

// Mapuje warstwy z DEFENSE_LAYERS na ikony z naszego zestawu (bez emoji).
const LAYER_ICONS = {
  mfa: 'lock',
  backup: 'database',
  edr: 'shield',
  ngfw: 'wifi-off',
  waf: 'server',
  'iam-layer': 'key',
  'pam-layer': 'key',
  'siem-layer': 'eye',
  'dlp-layer': 'activity',
  segmentation: 'layers',
  'vuln-mgmt-layer': 'zap',
};

function renderDefenseInDepth() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Obrona warstwowa (defense in depth)')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem' } },
    'Nie ma magicznego pudełka - jest wiele warstw, z których każda łapie to, co przepuści poprzednia. ' +
    'Żadna pojedyncza kontrola nie zatrzyma każdego ataku, ale ułożone jedna za drugą znacząco podnoszą koszt i ryzyko dla atakującego. ' +
    'Każda warstwa coś blokuje - i czegoś nie blokuje, dlatego dopiero razem tworzą głęboką obronę.'
  ));

  const list = el('div', { class: 'card-grid', style: { gridTemplateColumns: '1fr' } });

  DEFENSE_LAYERS.forEach((layer, idx) => {
    const iconName = LAYER_ICONS[layer.id] || 'shield';

    const head = el('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' } });
    const num = el('div', {
      style: {
        flexShrink: '0', width: '1.75rem', height: '1.75rem', borderRadius: '50%',
        background: 'var(--accent)', color: '#fff', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '600',
      }
    }, String(idx + 1));
    head.appendChild(num);

    const iconWrap = el('div', { style: { flexShrink: '0', color: 'var(--accent)' } });
    iconWrap.appendChild(icon(iconName, 22));
    head.appendChild(iconWrap);

    head.appendChild(el('h3', { style: { margin: '0' } }, layer.name));

    const card = el('div', { class: 'card' }, head);

    card.appendChild(el('p', { style: { fontSize: '0.9rem', marginBottom: '0.6rem' } }, layer.description));

    if (Array.isArray(layer.blocks) && layer.blocks.length) {
      card.appendChild(el('div', { style: { fontSize: '0.8rem', color: 'var(--success)', marginBottom: '0.25rem' } },
        el('strong', {}, 'Blokuje: '), layer.blocks.join(', ')
      ));
    }
    if (Array.isArray(layer.doesNotBlock) && layer.doesNotBlock.length) {
      card.appendChild(el('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } },
        el('strong', {}, 'Nie blokuje: '), layer.doesNotBlock.join('; ')
      ));
    }

    list.appendChild(card);
  });

  section.appendChild(list);

  section.appendChild(el('div', { class: 'alert alert-info', style: { marginTop: '1rem' } },
    el('strong', {}, 'Zasada porządkująca: '),
    'Trzymanie obrony warstwowej w głowie chroni przed kupowaniem narzędzi „bo modne” - każda warstwa ' +
    'powinna odpowiadać konkretnemu ryzyku i obowiązkowi, a luki jednej warstwy domyka kolejna.'
  ));

  return section;
}

export function renderTechnologia() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Technologia Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Technologia to czym się to robi – narzędzia (SIEM, EDR, zapory sieciowe), które wykrywają, ograniczają lub blokują ataki.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~30 min'),
      el('span', { class: 'badge badge-accent' }, 'Moduł 4')
    )
  ));

  wrap.appendChild(renderDefenseInDepth());
  wrap.appendChild(renderSocTools());
  wrap.appendChild(renderNetworkTools());
  wrap.appendChild(renderIdentityTools());
  wrap.appendChild(renderDataProtectionTools());
  wrap.appendChild(renderOffensiveTesting());
  wrap.appendChild(renderMFASim());
  wrap.appendChild(renderBackup321());
  wrap.appendChild(renderZeroTrust());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Quiz końcowy')
  );
  const qc = el('div', {});
  quizSection.appendChild(qc);
  initQuiz(qc, { questions: TECH_QUIZ }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('technologia', score, total);
      earnBadge('technologia');
      fullBurst();
      wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, 'Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka „Technologia” odblokowana!`
      ));
    }
  });
  wrap.appendChild(quizSection);
  return wrap;
}
