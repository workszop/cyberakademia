// ============================================================
// CyberAkademia — main.js
// Application entry point — routes, nav, init
// ============================================================

import { init as initRouter, register } from './router.js';
import { initLucide } from './icons.js';
import { initGlossary } from './glossary.js';
import { renderHome } from './modules/home.js';
import { renderFundamenty } from './modules/fundamenty.js';
import { renderRegulacje } from './modules/regulacje.js';
import { renderOrganizacja } from './modules/organizacja.js';
import { renderTechnologia } from './modules/technologia.js';
import { renderSpiecie } from './modules/spiecie.js';
import { renderSlownik } from './modules/slownik.js';
import { renderSciezka } from './modules/sciezka.js';
import { renderFinalBoss } from './modules/finalBoss.js';

// ── Register all routes ──────────────────────────────────

register('#/', renderHome);
register('#/fundamenty', renderFundamenty);
register('#/regulacje', renderRegulacje);
register('#/organizacja', renderOrganizacja);
register('#/technologia', renderTechnologia);
register('#/spiecie', renderSpiecie);
register('#/slownik', renderSlownik);
register('#/sciezka', renderSciezka);
register('#/finalboss', renderFinalBoss);

// ── Mobile nav toggle ─────────────────────────────────────

const toggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Otwórz menu');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#main-nav') && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Keyboard escape closes mobile nav ────────────────────

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
    navLinks.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.focus();
  }
});

// ── Initialise services ───────────────────────────────────

initGlossary();
initRouter();
initLucide();
