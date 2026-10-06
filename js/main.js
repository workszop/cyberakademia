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

// ─── Reveal ───────────────────────────────────────────────

// The first view is in the DOM. Lift the boot gate from index.html once the
// brand fonts are ready (so text never paints invisible or in a fallback face),
// but never wait longer than FONT_WAIT_MS.
const FONT_WAIT_MS = 1500;
const BRAND_FONTS = ['400 1em Satoshi', '500 1em Satoshi', '700 1em Satoshi', '400 1em "Geist Mono"'];

function reveal() {
  document.documentElement.classList.add('app-ready');
}

const fontsReady = document.fonts
  ? Promise.all(BRAND_FONTS.map(f => document.fonts.load(f).catch(() => null)))
  : Promise.resolve();
Promise.race([fontsReady, new Promise(r => setTimeout(r, FONT_WAIT_MS))]).then(reveal);
