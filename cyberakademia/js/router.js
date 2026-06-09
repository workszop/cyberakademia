// ============================================================
// CyberAkademia — router.js
// Simple hash-based client-side router
// ============================================================

import { setLastVisited } from './store.js';

const routes = {};
let currentRoute = null;

/**
 * Register a route.
 * @param {string} hash - e.g. '#/fundamenty'
 * @param {Function} renderFn - Returns an HTMLElement or undefined
 */
export function register(hash, renderFn) {
  routes[hash] = renderFn;
}

/**
 * Navigate to a route by updating location.hash.
 * @param {string} hash
 */
export function navigate(hash) {
  window.location.hash = hash;
}

/**
 * Returns the currently active route hash.
 */
export function getCurrentRoute() {
  return currentRoute;
}

/**
 * Initialise the router — binds hashchange and handles the initial URL.
 */
export function init() {
  function handle() {
    const hash = window.location.hash || '#/';
    currentRoute = hash;

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
      }
    } catch (err) {
      console.error('[router] render error for', hash, err);
      app.innerHTML = `<div class="alert alert-danger">
        <strong>Błąd:</strong> Nie można załadować modułu (${hash}).
        <br><small>${err.message}</small>
      </div>`;
    }

    // Scroll to top
    app.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Fade in
    requestAnimationFrame(() => {
      app.style.transition = 'opacity 0.2s ease';
      app.style.opacity = '1';
    });
  }

  window.addEventListener('hashchange', handle);
  handle(); // Handle the initial page load
}
