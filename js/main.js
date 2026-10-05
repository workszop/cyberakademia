// ============================================================
// CyberAkademia - main.js
// Application entry point: routes, shell, services
// ============================================================

import { init as initRouter, register } from './router.js';
import { initGlossary } from './glossary.js';
import { initShell, onRoute, onSectionParam } from './shell.js';
import { renderHome } from './modules/home.js';
import { renderFundamenty } from './modules/fundamenty.js';
import { renderRegulacje } from './modules/regulacje.js';
import { renderOrganizacja } from './modules/organizacja.js';
import { renderTechnologia } from './modules/technologia.js';
import { renderIntegracja } from './modules/integracja.js';
import { renderPlan } from './modules/plan.js';
import { renderSlownik } from './modules/slownik.js';

// ─── Routes (aliases live in course.js) ───────────────────

register('#/', renderHome);
register('#/fundamenty', renderFundamenty);
register('#/regulacje', renderRegulacje);
register('#/organizacja', renderOrganizacja);
register('#/technologia', renderTechnologia);
register('#/integracja', renderIntegracja);
register('#/plan', renderPlan);
register('#/slownik', renderSlownik);

// ─── Init ─────────────────────────────────────────────────

initGlossary();
initShell();
initRouter({ afterRender: onRoute, onSectionParam });
