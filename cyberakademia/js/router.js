// ============================================================
// CyberAkademia — router.js
// Simple hash-based client-side router
// ============================================================

import { setLastVisited } from './store.js';
import { enrichGlossaryDom } from './glossary.js';

const routes = {};

/**
 * Register a route.
 * @param {string} hash - e.g. '#/fundamenty'
 * @param {Function} renderFn - Returns an HTMLElement or undefined
 */
export function register(hash, renderFn) {
  routes[hash] = renderFn;
}

/**
 * Initialise the router — binds hashchange and handles the initial URL.
 */
export function init() {
  function handle() {
    const hash = window.location.hash || '#/';

    // Keep last visited
    setLastVisited(hash);

    // Update nav active states
    document.querySelectorAll('nav a[href]').forEach(a => {
      const href = a.getAttribute('href');
      const isActive = href === hash || (href === '#/' && hash === '#/');
      a.classList.toggle('active', isActive);
    });

    // Find matching route (exact match, then wildcard fallback)
    const renderFn = routes[hash] || routes['#/'];

    if (!renderFn) {
      console.warn('[router] No route registered for', hash);
      return;
    }

    const app = document.getElementById('app');
    if (!app) return;

    // Clear the container
    app.innerHTML = '';

    // Temporarily hide during transition to avoid flash
    app.style.opacity = '0';

    // Render new content
    try {
      const fragment = renderFn();
      if (fragment instanceof Node) {
        app.appendChild(fragment);
        // Wrap glossary acronyms so hover tooltips work
        enrichGlossaryDom(app);
      }
    } catch (err) {
      console.error('[router] render error for', hash, err);
      app.innerHTML = `<div class="alert alert-danger">
        <strong>Błąd:</strong> Nie można załadować modułu (${hash}).
        <br><small>${err.message}</small>
      </div>`;
    } finally {
      // Always restore visibility, even after a render error
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => {
        app.style.transition = 'opacity 0.2s ease';
        app.style.opacity = '1';
      });
    }
  }

  window.addEventListener('hashchange', handle);
  handle(); // Handle the initial page load
}
