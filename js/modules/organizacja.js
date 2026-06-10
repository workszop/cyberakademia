// ============================================================
// CyberAkademia - modules/organizacja.js
// Module 3: SOC, CISO, security teams and structures
// Data sourced from js/content/organizacja.js
// ============================================================

import { el } from '../dom.js';
import { completeModule, earnBadge } from '../store.js';
import { fullBurst } from '../confetti.js';
import { initQuiz } from '../primitives/quiz.js';
import { initExpandable } from '../primitives/expandable.js';
import { icon } from '../icons.js';
import {
  ROLES,
  SOC_COMPONENTS,
  SOC_MODELS,
  IR_PHASES,
  PROCESSES,
  GOVERNANCE_FRAMEWORKS,
  ORG_QUIZ,
} from '../content/organizacja.js';

// ── Security team roles ──────────────────────────────────

// Map content ROLES (id) → a Lucide wireframe icon from the allowed set:
// user-check, eye, activity, alert-triangle, file-text, target, users, settings, building-2
const ROLE_ICONS = {
  zarzad: 'building-2',
  ciso: 'user-check',
  'cso-cio-cto': 'settings',
  dpo: 'file-text',
  analitycy: 'eye',
};

function renderRoles() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Kluczowe role w cyberbezpieczeństwie')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' } },
    'Cyberbezpieczeństwo to nie zadanie jednej osoby - to podział ról i odpowiedzialności od zarządu po analityków SOC. ' +
    'Kto raportuje do kogo i kto za co odpowiada decyduje o tym, czy organizacja reaguje sprawnie, czy w chaosie.'
  ));

  const grid = el('div', { class: 'card-grid' });
  ROLES.forEach(r => {
    const iconEl = el('div', { style: { marginBottom: '0.5rem' } });
    iconEl.appendChild(icon(ROLE_ICONS[r.id] || 'users', 24));

    const card = el('div', { class: 'card' },
      iconEl,
      el('h3', {}, r.name),
      el('p', { style: { fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '0.5rem' } },
        r.reports_to ? `Raportuje do: ${r.reports_to}` : 'Najwyższy szczebel nadzoru'
      ),
      el('p', {}, r.responsibility)
    );

    if (r.trap) {
      card.appendChild(el('div', { class: 'alert alert-warning', style: { marginTop: '0.75rem', marginBottom: '0', fontSize: '0.8rem' } },
        el('strong', {}, 'Pułapka: '), r.trap
      ));
    }

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ── SOC Builder ──────────────────────────────────────────

const SOC_ZONES = [
  { id: 'people', label: 'Ludzie', desc: 'Upuść tu role SOC' },
  { id: 'processes', label: 'Procesy', desc: 'Upuść tu procesy' },
  { id: 'technology', label: 'Technologia', desc: 'Upuść tu narzędzia' },
];

// Flatten SOC_COMPONENTS into draggable pieces tagged with their category (zone id)
function buildSOCPieces() {
  const pieces = [];
  SOC_ZONES.forEach(zone => {
    (SOC_COMPONENTS[zone.id] || []).forEach(comp => {
      pieces.push({ id: comp.id, label: comp.name, category: zone.id });
    });
  });
  return pieces;
}

function renderSOCBuilder() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Zbuduj swój SOC')
  );

  section.appendChild(el('p', { style: { marginBottom: '0.75rem' } },
    'SOC to centrum operacji bezpieczeństwa - zespół (i jego narzędzia oraz procesy), którego zadaniem jest ' +
    'całodobowe monitorowanie, wykrywanie, analiza i reagowanie na zagrożenia. ' +
    'Najprostsza analogia: to „centrum monitoringu lub dyspozytornia 112” dla infrastruktury cyfrowej firmy - ' +
    'ktoś patrzy na ekrany 24/7, a gdy zapali się alarm, uruchamia procedurę.'
  ));
  section.appendChild(el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' } },
    'SOC nie jest produktem, który się kupuje - to zestawienie trzech filarów: Ludzie, Procesy i Technologia. Przeciągnij elementy do właściwych stref.'
  ));

  const SOC_PIECES = buildSOCPieces();
  const placed = {}; // pieceId → zoneId

  const zonesEl = el('div', { class: 'soc-zones' });
  const zoneEls = {};
  const pieceEls = {};

  const statusEl = el('div', { class: 'badge badge-accent', style: { marginBottom: '1rem' } }, `Umieszczono: 0 / ${SOC_PIECES.length}`);

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
        // Wrong zone - shake
        zoneEl.style.borderColor = 'var(--danger)';
        setTimeout(() => zoneEl.style.borderColor = '', 600);
        return;
      }
      if (placed[pieceId]) return; // already placed
      placed[pieceId] = zone.id;
      pieceEls[pieceId]?.classList.add('soc-piece-placed');
      const placedEl = el('div', { style: { fontSize: '0.8rem', padding: '0.35rem 0.6rem', background: 'rgba(16,185,129,0.1)', border: '1px solid var(--success)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem' } },
        piece.label
      );
      // Remove desc placeholder on first item
      if (zoneEl.contains(desc)) zoneEl.removeChild(desc);
      zoneEl.appendChild(placedEl);

      const total = SOC_PIECES.length;
      const done = Object.keys(placed).length;
      statusEl.textContent = `Umieszczono: ${done} / ${total}`;
      if (done === total) {
        statusEl.className = 'badge badge-success';
        statusEl.textContent = 'SOC zbudowany!';
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
    }, piece.label);
    p.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', piece.id);
      p.classList.add('dragging');
    });
    p.addEventListener('dragend', () => p.classList.remove('dragging'));
    pieceEls[piece.id] = p;
    pool.appendChild(p);
  });

  section.appendChild(statusEl);
  section.appendChild(pool);
  section.appendChild(zonesEl);
  return section;
}

// ── SOC Models ───────────────────────────────────────────

function renderSOCModels() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Modele SOC')
  );

  const grid = el('div', { class: 'card-grid' });
  SOC_MODELS.forEach(m => {
    const card = el('div', { class: 'card' },
      el('h3', { style: { marginBottom: '1rem' } }, m.name),
      el('div', { style: { marginBottom: '0.75rem' } },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--success)', textTransform: 'uppercase', marginBottom: '0.35rem' } }, 'Zalety'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.8' } },
          ...m.pros.map(p => el('li', {}, p))
        )
      ),
      el('div', { style: { marginBottom: '0.75rem' } },
        el('div', { style: { fontSize: '0.75rem', fontWeight: '700', color: 'var(--danger)', textTransform: 'uppercase', marginBottom: '0.35rem' } }, 'Wady'),
        el('ul', { style: { paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.8' } },
          ...m.cons.map(c => el('li', {}, c))
        )
      ),
      el('div', { class: 'alert alert-info', style: { margin: '0', fontSize: '0.8rem' } },
        el('strong', {}, 'Najlepszy dla: '), m.bestFor
      )
    );

    if (m.relatedConcept) {
      card.appendChild(el('p', { style: { marginTop: '0.6rem', marginBottom: '0', fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' } },
        m.relatedConcept
      ));
    }

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ── Incident Response cycle ──────────────────────────────

function renderIncidentResponse() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Cykl reagowania na incydenty (Incident Response)')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' } },
    'Reagowanie na incydent to nie chaotyczne gaszenie pożaru, lecz ustrukturyzowany proces siedmiu faz - ' +
    'od przygotowania jeszcze przed atakiem, przez powstrzymanie i odtworzenie, aż po wnioski. ' +
    'Każda faza ma swoje działania i wymogi regulacyjne (NIS2/KSC, DORA). Rozwiń fazę, by poznać szczegóły.'
  ));

  const accordion = el('div', {});
  section.appendChild(accordion);

  initExpandable(accordion, IR_PHASES.map(phase => ({
    title: phase.name,
    summary: phase.description,
    detail: phase.regulatoryLink || phase.detail || '',
  })));

  return section;
}

// ── Governance frameworks ────────────────────────────────

function renderGovernance() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Frameworki ładu')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' } },
    'Frameworki ładu (governance) to sprawdzone ramy, które porządkują zarządzanie bezpieczeństwem i pomagają spełnić wymagania NIS2/KSC i DORA. ' +
    'Nie wykluczają się - często łączy się je razem. Rozwiń, by poznać zastosowanie i relację do regulacji.'
  ));

  const accordion = el('div', {});
  section.appendChild(accordion);

  initExpandable(accordion, GOVERNANCE_FRAMEWORKS.map(fw => ({
    title: fw.name,
    summary: fw.useCase,
    detail: `${fw.description} ${fw.relation}`,
  })));

  return section;
}

// ── Key processes ────────────────────────────────────────

function renderProcesses() {
  const section = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Kluczowe procesy bezpieczeństwa')
  );

  section.appendChild(el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' } },
    'Bezpieczeństwo opiera się na powtarzalnych, udokumentowanych procesach - to one zamieniają narzędzia i ludzi w realną zdolność obronną. Rozwiń, by poznać szczegóły.'
  ));

  const accordion = el('div', {});
  section.appendChild(accordion);

  initExpandable(accordion, PROCESSES.map(proc => ({
    title: proc.name,
    summary: proc.description,
    detail: `${proc.fullDescription} ${proc.regulatoryReq || ''}`.trim(),
  })));

  return section;
}

export function renderOrganizacja() {
  const wrap = el('div', { class: 'slide-up' });

  wrap.appendChild(el('div', { class: 'module-header' },
    el('h1', {}, 'Organizacja Cyberbezpieczeństwa'),
    el('p', { class: 'subtitle' }, 'Organizacja to kto i jak to robi - role, zespoły (np. SOC), procesy reagowania na incydenty.'),
    el('div', { class: 'module-meta' },
      el('span', { class: 'badge' }, '~20 min'),
      el('span', { class: 'badge badge-accent' }, 'Moduł 3')
    )
  ));

  wrap.appendChild(renderRoles());
  wrap.appendChild(renderSOCBuilder());
  wrap.appendChild(renderSOCModels());
  wrap.appendChild(renderIncidentResponse());
  wrap.appendChild(renderProcesses());
  wrap.appendChild(renderGovernance());

  const quizSection = el('div', { class: 'section' },
    el('div', { class: 'section-title' }, 'Quiz końcowy')
  );
  const qc = el('div', {});
  quizSection.appendChild(qc);
  let bannerShown = false;
  initQuiz(qc, { questions: ORG_QUIZ }, (score, total) => {
    if (score / total >= 0.7) {
      completeModule('organizacja', score, total);
      earnBadge('organizacja');
      fullBurst();
      if (!bannerShown) {
        bannerShown = true;
        wrap.appendChild(el('div', { class: 'alert alert-success', style: { marginTop: '1rem' } },
          el('strong', {}, 'Moduł zaliczony! '), `Wynik: ${score}/${total}. Odznaka „Organizacja” odblokowana!`
        ));
      }
    }
  });
  wrap.appendChild(quizSection);
  return wrap;
}
