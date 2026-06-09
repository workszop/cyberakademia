// ============================================================
// CyberAkademia — modules/organizacja.js
// Module 3: SOC, CISO, security teams and structures
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';

// ── SOC Builder ──────────────────────────────────────────

const SOC_PIECES = [
  { id: 'analityk-l1', label: 'Analityk SOC L1', category: 'Ludzie', icon: '👤' },
  { id: 'analityk-l2', label: 'Analityk SOC L2', category: 'Ludzie', icon: '👤' },
  { id: 'threat-hunter', label: 'Threat Hunter', category: 'Ludzie', icon: '🕵️' },
  { id: 'ir-spec', label: 'Specjalista IR', category: 'Ludzie', icon: '🚒' },
  { id: 'siem', label: 'SIEM', category: 'Technologia', icon: '🖥️' },
  { id: 'edr', label: 'EDR', category: 'Technologia', icon: '🛡️' },
  { id: 'soar', label: 'SOAR', category: 'Technologia', icon: '⚙️' },
  { id: 'ticketing', label: 'System ticketów', category: 'Technologia', icon: '🎫' },
  { id: 'playbook', label: 'Playbooki IR', category: 'Procesy', icon: '📋' },
  { id: 'sla', label: 'SLA / metryki', category: 'Procesy', icon: '📊' },
  { id: 'escalation', label: 'Eskalacja alertów', category: 'Procesy', icon: '📢' },
  { id: 'postmortem', label: 'Post-mortem', category: 'Procesy', icon: '🔍' },
];

const SOC_ZONES = [
  { id: 'Ludzie', label: '👥 Ludzie', desc: 'Upuść tu role SOC' },
  { id: 'Procesy', label: '📋 Procesy', desc: 'Upuść tu procesy' },
  { id: 'Technologia', label: '⚙️ Technologia', desc: 'Upuść tu narzędzia' },
];

function renderSOCBuilder() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '🏗️ Zbuduj swój SOC')
  );

  section.appendChild(el('p', { style: { marginBottom: '0.75rem' } },
    'SOC to centrum operacji bezpieczeństwa — zespół (i jego narzędzia oraz procesy), którego zadaniem jest ' +
    'całodobowe monitorowanie, wykrywanie, analiza i reagowanie na zagrożenia. ' +
    'Najprostsza analogia: to „centrum monitoringu lub dyspozytornia 112" dla infrastruktury cyfrowej firmy — ' +
    'ktoś patrzy na ekrany 24/7, a gdy zapali się alarm, uruchamia procedurę.'
  ));
  section.appendChild(el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' } },
    'SOC nie jest produktem, który się kupuje — to zestawienie trzech elementów. Przeciągnij elementy do właściwych stref.'
  ));

  const placed = {}; // pieceId → zoneId

  const zonesEl = el('div', { class: 'soc-zones' });
  const zoneEls = {};
  const pieceEls = {};

  SOC_ZONES.forEach(zone => {
    const zoneEl = el('div', { class: 'soc-zone', 'data-zone': zone.id },
      el('div', { class: 'soc-zone-title' }, zone.label),
    );
    const desc = el('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem' } }, zone.desc);
    zoneEl.appendChild(desc);
    zoneEls[zone.id] = zoneEl;
    zonesEl.appendChild(zoneEl);

    zoneEl.addEventListener('dragover', e => { e.preventDefault(); zoneEl.classList.add('over'); });
    zoneEl.addEventListener('dragleave', () => zoneEl.classList.remove('over'));
    zoneEl.addEventListener('drop', e => {
      e.preventDefault();
      zoneEl.classList.remove('over');
      const pieceId = e.dataTransfer.getData('text/plain');
      const piece = SOC_PIECES.find(p => p.id === pieceId);
      if (!piece || piece.category !== zone.id) {
        // Wrong zone — shake
        zoneEl.style.borderColor = 'var(--danger)';
        setTimeout(() => zoneEl.style.borderColor = '', 600);
        return;
      }
      placed[pieceId] = zone.id;
      pieceEls[pieceId]?.classList.add('soc-piece-placed');
      const placedEl = el('div', { style: { fontSize: '0.8rem', padding: '0.35rem 0.6rem', background: 'rgba(16,185,129,0.1)', border: '1px solid var(--success)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem' } },
        piece.icon, piece.label
      );
      // Remove desc placeholder on first item
      if (zoneEl.contains(desc)) zoneEl.removeChild(desc);
      zoneEl.appendChild(placedEl);

      const total = SOC_PIECES.length;
      const done = Object.keys(placed).length;
      statusEl.textContent = `Umieszczono: ${done} / ${total}`;
      if (done === total) {
        statusEl.className = 'badge badge-success';
        statusEl.textContent = '🎉 SOC zbudowany!';
      }
    });
  });

  // Pool
  const pool = el('div', { class: 'soc-pieces-pool', style: { marginTop: '1.5rem', marginBottom: '0.5rem' } });
  SOC_PIECES.forEach(piece => {
    const p = el('div', {
      class: 'soc-piece',
      draggable: true,
      'data-id': piece.id,
    }, piece.icon, ' ', piece.label);
    p.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', piece.id);
      p.classList.add('dragging');
    });
    p.addEventListener('dragend', () => p.classList.remove('dragging'));
    pieceEls[piece.id] = p;
    pool.appendChild(p);
  });

  const statusEl = el('div', { class: 'badge badge-accent', style: { marginBottom: '1rem' } }, `Umieszczono: 0 / ${SOC_PIECES.length}`);

  section.appendChild(statusEl);
  section.appendChild(pool);
  section.appendChild(zonesEl);
  return section;
}

// ── SOC Models ───────────────────────────────────────────

function renderSOCModels() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '🏢 Modele SOC')
  );

  const models = [
    {
      id: 'inhouse',
      label: '🏠 In-house',
      pros: ['Pełna kontrola nad danymi', 'Głęboka znajomość infrastruktury', 'Krótszy czas reakcji', 'Brak ryzyka udostępnienia danych dostawcy'],
      cons: ['Bardzo wysokie koszty (zespół 24/7)', 'Trudno znaleźć ekspertów', 'Ryzyko "wypalenia" zespołu', 'Wolne skalowanie'],
      best: 'Duże organizacje z wysokimi wymaganiami regulacyjnymi',
    },
    {
      id: 'mssp',
      label: '🤝 MSSP (Outsourcing)',
      pros: ['Niższy koszt wejścia', 'Dostęp do ekspertów i zaawansowanych narzędzi', 'Szybkie wdrożenie', 'Skalowanie na żądanie'],
      cons: ['Mniejsza kontrola', 'Dane przetwarzane poza organizacją', 'Zależność od dostawcy', 'Mniejsza znajomość Twojej infrastruktury'],
      best: 'MŚP bez zasobów na własny SOC',
    },
    {
      id: 'hybrid',
      label: '⚡ Hybrydowy',
      pros: ['Kontrola wrażliwych danych in-house', 'Wsparcie MSSP 24/7 gdy brak zasobów', 'Elastyczność', 'Optymalny koszt'],
      cons: ['Złożoność zarządzania', 'Konieczność jasnych umów SLA', 'Ryzyko "szarej strefy" odpowiedzialności'],
      best: 'Organizacje średniej wielkości lub wysoko regulowane',
    },
  ];

  const grid = el('div', { class: 'card-grid' });
  models.forEach(m => {
    const card = el('div', { class: 'card' },
      el('h3', { style: { marginBottom: '1rem' } }, m.label),
      el('div', { style: { marginBottom: '0.75rem' } },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--success)', textTransform: 'uppercase', marginBottom: '0.35rem' } }, '✅ Zalety'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.8' } },
          ...m.pros.map(p => el('li', {}, p))
        )
      ),
      el('div', { style: { marginBottom: '0.75rem' } },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--danger)', textTransform: 'uppercase', marginBottom: '0.35rem' } }, '❌ Wady'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.8' } },
          ...m.cons.map(c => el('li', {}, c))
        )
      ),
      el('div', { class: 'alert alert-info', style: { margin: '0', fontSize: '0.8rem' } },
        el('strong', {}, '🎯 Najlepszy dla: '), m.best
      )
    );
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ── Security team roles ──────────────────────────────────

function renderRoles() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '👥 Kluczowe role w cyberbezpieczeństwie')
  );

  const roles = [
    { icon: '👔', role: 'CISO', full: 'Chief Information Security Officer', desc: 'Odpowiada za całą strategię cyberbezpieczeństwa. Raportuje do zarządu. Tłumaczy ryzyko na język biznesu.' },
    { icon: '🔍', role: 'Analityk SOC L1', full: 'Security Operations Center Analyst', desc: 'Pierwsza linia obrony. Monitoruje alerty SIEM, filtruje fałszywe pozytywy, eskaluje do L2.' },
    { icon: '🕵️', role: 'Threat Hunter', full: 'Threat Intelligence Analyst', desc: 'Proaktywnie poszukuje zagrożeń ukrytych w sieci. Analizuje TTPs i IOC. Nie czeka na alerty.' },
    { icon: '🚒', role: 'Specjalista IR', full: 'Incident Response Specialist', desc: 'Reaguje na potwierdzone incydenty. Prowadzi analizę powłamaniową (forensics). Izoluje systemy.' },
    { icon: '📋', role: 'DPO / IOD', full: 'Data Protection Officer', desc: 'Doradza w kwestii RODO. Punkt kontaktowy z UODO. Niezależny od CISO.' },
    { icon: '⚔️', role: 'Pentester', full: 'Penetration Tester / Red Team', desc: 'Legalnie atakuje systemy organizacji szukając podatności. Myśli jak napastnik.' },
  ];

  const grid = el('div', { class: 'card-grid' });
  roles.forEach(r => {
    grid.appendChild(el('div', { class: 'card' },
      el('div', { style: { fontSize: '1.8rem', marginBottom: '0.5rem' } }, r.icon),
      el('h3', {}, r.role),
      el('p', { style: { fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '0.5rem' } }, r.full),
      el('p', {}, r.desc)
    ));
  });

  section.appendChild(grid);
  return section;
}

const QUIZ_QUESTIONS = [
  {
    question: 'Co to jest SOC?',
    options: ['System operacyjny serwerów', 'Centrum operacji bezpieczeństwa — monitoruje i reaguje na incydenty 24/7', 'Protokół sieciowy', 'Narzędzie do backupu'],
    correct: 1,
    explanation: 'SOC (Security Operations Center) to zespół i infrastruktura odpowiedzialne za ciągłe monitorowanie, wykrywanie zagrożeń i reagowanie na incydenty bezpieczeństwa.'
  },
  {
    question: 'Który model SOC jest zalecany dla MŚP bez własnego team-u bezpieczeństwa?',
    options: ['In-house (własny SOC)', 'MSSP (outsourcing do dostawcy)', 'Brak SOC — to zbędny koszt', 'SOC tylko w modelu chmurowym'],
    correct: 1,
    explanation: 'MSSP (Managed Security Service Provider) umożliwia MŚP dostęp do ekspertów i zaawansowanych narzędzi bez kosztów budowania własnego SOC 24/7.'
  },
  {
    question: 'Czym różni się Threat Hunter od Analityka SOC L1?',
    options: ['Threat Hunter reaguje na alerty SIEM', 'Threat Hunter proaktywnie szuka zagrożeń bez czekania na alerty', 'Threat Hunter zarządza infrastrukturą', 'Nie ma różnicy — to ta sama rola'],
    correct: 1,
    explanation: 'Analityk L1 reaguje na alerty SIEM. Threat Hunter działa proaktywnie — zakłada, że atakujący już jest w sieci i szuka jego śladów bez czekania na alert.'
  },
  {
    question: 'SOC opiera się na trzech filarach. Które to?',
    options: ['Hardware, Software, Network', 'Ludzie, Procesy, Technologia', 'SIEM, EDR, Firewall', 'Detekcja, Reakcja, Odtwarzanie'],
    correct: 1,
    explanation: 'SOC opiera się na triadzie: Ludzie (analitycy, role), Procesy (playbooki, SLA, eskalacja) i Technologia (SIEM, EDR, SOAR). Brak jednego filaru osłabia cały SOC.'
  },
  {
    question: 'Jaka jest kluczowa wada modelu MSSP?',
    options: ['Wysokie koszty wejścia', 'Mniejsza kontrola i dane przetwarzane poza organizacją', 'Brak dostępu do ekspertów', 'Tylko monitoring w godzinach pracy'],
    correct: 1,
    explanation: 'MSSP daje dostęp do ekspertów i oszczędności, ale wymaga przekazania wrażliwych logów/danych zewnętrznemu dostawcy, co rodzi ryzyka prywatności i zależności.'
  },
];

export function renderOrganizacja() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, '🏢 Organizacja Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Organizacja to kto i jak to robi — role, zespoły (np. SOC), procesy reagowania na incydenty.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '⏱ ~20 min'),
      el('span', { class: 'badge badge-accent' }, '🎯 Moduł 3')
    )
  ));

  wrap.appendChild(renderRoles());
  wrap.appendChild(renderSOCBuilder());
  wrap.appendChild(renderSOCModels());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, '📝 Quiz końcowy')
  );
  const qc = el('div', {});
  quizSection.appendChild(qc);
  initQuiz(qc, { questions: QUIZ_QUESTIONS }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('organizacja', score, total);
      earnBadge('organizacja');
      fullBurst();
      wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, '🎉 Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka "Organizacja" odblokowana!`
      ));
    }
  });
  wrap.appendChild(quizSection);
  return wrap;
}
