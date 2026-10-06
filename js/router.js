// ============================================================
// CyberAkademia - router.js
// Hash router: '#/modul' renders a page, '?s=2.3' scrolls to a section.
// ============================================================

import { el } from './dom.js';
import { enrichGlossaryDom } from './glossary.js';
import { parseHash, getModuleByRoute, START_ROUTE } from './course.js';

const routes = {};
let currentRoute = null;
let hasRendered = false;

/**
 * Register a route.
 * @param {string} hash - e.g. '#/fundamenty'
 * @param {Function} renderFn - returns an HTMLElement
 */
export function register(hash, renderFn) {
  routes[hash] = renderFn;
}

/**
 * Start routing.
 * @param {{ afterRender: Function, onSectionParam: Function }} hooks
 */
export function init({ afterRender, onSectionParam }) {
  function handle() {
    const { route: parsed, params } = parseHash(window.location.hash);
    const route = routes[parsed] ? parsed : START_ROUTE;

    // Same page, only the section changed: scroll, don't re-render
    if (route === currentRoute) {
      onSectionParam(params);
      return;
    }
    currentRoute = route;

    const app = document.getElementById('app');
    if (!app) return;
    app.replaceChildren();
    app.classList.remove('view-in');

    try {
      const page = routes[route]();
      if (page instanceof Node) {
        app.appendChild(page);
        enrichGlossaryDom(app);
      }
    } catch (err) {
      console.error('[router] render error for', route, err);
      app.replaceChildren(el('div', { class: 'callout callout-warn', role: 'alert' },
        el('div', {}, el('b', {}, 'Błąd:'), ` nie można załadować strony (${route}).`, el('p', {}, err.message))));
    }

    afterRender({ route, params, module: getModuleByRoute(route) });
    // Fade in on page changes only; the first view appears at once together
    // with the shell (see the boot gate in index.html)
    if (hasRendered) {
      void app.offsetWidth;
      app.classList.add('view-in');
    }
    hasRendered = true;
  }

  window.addEventListener('hashchange', handle);
  handle();
}
