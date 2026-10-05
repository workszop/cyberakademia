// ============================================================
// CyberAkademia - router.js
// Hash router: '#/modul' renders a page, '?s=2.3' scrolls to a section.
// ============================================================

import { setLastVisited } from './store.js';
import { enrichGlossaryDom } from './glossary.js';
import { parseHash, getModuleByRoute, START_ROUTE } from './course.js';

const routes = {};
let currentRoute = null;

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
    setLastVisited(route);

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
      app.innerHTML = `<div class="callout callout-warn" role="alert"><div><b>Błąd:</b> nie można załadować strony (${route}).<p>${err.message}</p></div></div>`;
    }

    afterRender({ route, params, module: getModuleByRoute(route) });
    // Restart the fade-in on every page change
    void app.offsetWidth;
    app.classList.add('view-in');
  }

  window.addEventListener('hashchange', handle);
  handle();
}
