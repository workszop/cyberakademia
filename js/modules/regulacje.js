// ============================================================
// CyberAkademia - modules/regulacje.js
// Module 2: RODO/GDPR, NIS2, KSC, DORA
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';
import { initTimeline } from '../primitives/timeline.js';
import { initExpandable } from '../primitives/expandable.js';
import {
  REGULATIONS,
  TIMELINE_EVENTS,
  DORA_PILLARS,
  OBLIGATIONS_NIS2,
  REGULATION_QUIZ,
} from '../content/regulacje.js';

// ── Overview: regulation cards (single source of truth) ──

function renderRegTable() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Przegląd regulacji')
  );

  const intro = el('p', { style: { marginBottom: '0.75rem' } },
    'W Europie nie ma jednej, uniwersalnej ustawy o cyberbezpieczeństwie. Istnieje zestaw aktów prawnych, które dotyczą różnych grup podmiotów. Najważniejsze rozróżnienie:'
  );
  section.appendChild(intro);

  const diffNote = el('div', { class: 'alert alert-info', style: { marginBottom: '1.5rem' } },
    el('strong', {}, 'Kluczowa różnica prawna: '),
    'dyrektywa, taka jak NIS2, wymaga implementacji do prawa krajowego – stąd polska ustawa o KSC. ',
    el('strong', {}, 'Rozporządzenia, takie jak DORA i RODO, '),
    'obowiązują bezpośrednio, identycznie w całej UE, bez ustawy krajowej. ',
    el('br', {}),
    el('em', {}, 'Czy jedna organizacja może podlegać kilku regulacjom jednocześnie? '),
    'Tak. Bank podlega DORA i RODO. Szpital podlega NIS2/KSC i RODO. Regulacje się uzupełniają, nie wykluczają. Tam, gdzie DORA i NIS2 mogłyby się nakładać, DORA działa jako przepis szczególny (lex specialis).'
  );
  section.appendChild(diffNote);

  const grid = el('div', { class: 'card-grid' });

  REGULATIONS.forEach(reg => {
    const card = el('div', { class: 'card', style: { borderTop: `3px solid ${reg.color}` } },
      el('div', { style: { marginBottom: '0.75rem' } },
        el('h3', { style: { marginBottom: '0.1rem' } }, reg.name),
        el('div', { style: { fontSize: '0.78rem', color: 'var(--text-muted)' } }, reg.legalForm)
      ),
      el('div', { style: { fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' } },
        el('strong', { style: { color: 'var(--text-dim)' } }, 'Zakres: '), reg.scope
      ),
      el('div', { style: { fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' } },
        el('strong', { style: { color: 'var(--text-dim)' } }, 'Czego dotyczy: '), reg.topic
      ),
      el('p', { style: { fontSize: '0.85rem', marginBottom: '0.75rem' } }, reg.description),
      el('div', {},
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' } }, 'Kluczowe fakty'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.7' } },
          ...reg.keyFacts.map(f => el('li', {}, f))
        )
      )
    );
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ── Regulation timeline ──────────────────────────────────

function renderTimeline() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Oś czasu regulacji')
  );

  const desc = el('p', { style: { marginBottom: '1.5rem' } },
    'Od pierwszej dyrektywy NIS z 2016 roku po stopniowe wejście w życie KSC 2.0 w Polsce. Kliknij wydarzenie, aby poznać szczegóły.'
  );
  section.appendChild(desc);

  const container = el('div', {});
  section.appendChild(container);
  initTimeline(container, TIMELINE_EVENTS);
  return section;
}

// ── NIS2 obligations ─────────────────────────────────────

function renderNIS2Obligations() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'NIS2 / KSC – kluczowe obowiązki')
  );

  const desc = el('p', { style: { marginBottom: '1.5rem' } },
    'Cztery główne grupy obowiązków podmiotów kluczowych i ważnych. Kliknij, aby rozwinąć szczegóły.'
  );
  section.appendChild(desc);

  const container = el('div', {});
  section.appendChild(container);
  initExpandable(container, OBLIGATIONS_NIS2.map(o => ({
    title: o.name,
    summary: o.description,
    detail: o.detail,
  })));
  return section;
}

// ── DORA pillars ─────────────────────────────────────────

function renderDORAPillars() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'DORA - 5 filarów')
  );

  const desc = el('p', { style: { marginBottom: '1.5rem' } },
    'DORA porządkuje wymagania dotyczące odporności cyfrowej sektora finansowego w pięciu filarach. Kliknij, aby rozwinąć szczegóły.'
  );
  section.appendChild(desc);

  const container = el('div', {});
  section.appendChild(container);
  initExpandable(container, DORA_PILLARS.map(p => ({
    title: p.name,
    summary: p.description,
    detail: p.detail,
  })));
  return section;
}

// ── Connect game: Regulation → Obligation ───────────────

function renderMatchGame() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Gra - Połącz regulację z obowiązkiem')
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
    el('div', { class: 'section-title' }, 'DPO vs CISO - różne role')
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
        el('li', {}, 'Niezależny - nie może być zdymisjonowany za swoją pracę'),
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

// ── Render ───────────────────────────────────────────────

export function renderRegulacje() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Regulacje Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Regulacje mówią, co trzeba zrobić i kto za to odpowiada - NIS2/KSC, DORA, RODO, normy ISO.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~20 min'),
      el('span', { class: 'badge badge-accent' }, 'Moduł 2')
    )
  ));

  wrap.appendChild(renderRegTable());
  wrap.appendChild(renderTimeline());
  wrap.appendChild(renderNIS2Obligations());
  wrap.appendChild(renderDORAPillars());
  wrap.appendChild(renderMatchGame());
  wrap.appendChild(renderDPOvsCISO());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Quiz końcowy')
  );
  const quizContainer = el('div', {});
  quizSection.appendChild(quizContainer);

  initQuiz(quizContainer, { questions: REGULATION_QUIZ }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('regulacje', score, total);
      earnBadge('regulacje');
      fullBurst();
      wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
        el('strong', {}, 'Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka „Regulacje” odblokowana!`
      ));
    }
  });

  wrap.appendChild(quizSection);
  return wrap;
}
