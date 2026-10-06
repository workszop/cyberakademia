// ============================================================
// CyberAkademia - shell.js
// App chrome: sidebar, topbar with breadcrumbs, "Na tej stronie"
// table of contents with scroll-spy, read tracking, shortcuts,
// help overlay and the aria-live announcer.
// ============================================================

import { el } from './dom.js';
import { icon } from './icons.js';
import { GROUPS, LAYERS, getModule, getGroupOf, parseHash } from './course.js';
import {
  subscribe, markRead, isRead, getModuleProgress, getCourseProgress, getNextSection,
} from './store.js';
import { sectionDomId } from './sections.js';
import { pluralPl, SECTION_FORMS } from './text.js';

const MOBILE_LAYOUT = window.matchMedia('(max-width: 768px)');
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

// ─── State ────────────────────────────────────────────────

const shell = {
  page: null,          // current module object (any) or null on Start
  module: null,        // current module with sections (read-tracked) or null
  route: '#/',
  hasRouted: false,
  observers: [],
  reader: null,        // IntersectionObserver for the section-end sentinels
  readingPaused: false,
  resumeTimer: null,
  activeSection: null,
  menuOpen: false,
  helpOpen: false,
  menuTrigger: null,
  helpTrigger: null,
};

// ─── DOM refs ─────────────────────────────────────────────

const refs = {};

// ─── Helpers ──────────────────────────────────────────────

function announce(text) {
  if (!refs.live) return;
  refs.live.textContent = '';
  // New text node on the next frame so screen readers re-announce
  requestAnimationFrame(() => { refs.live.textContent = text; });
}

function sectionsInPage() {
  return [...document.querySelectorAll('#app section[data-section-id]')];
}

/**
 * Scrolls to a section or sub-heading (e.g. '4.2.1') and optionally focuses it.
 * Returns the id of the enclosing numbered section, or null when there is no such target.
 */
function scrollToSection(targetId, { smooth = true, focus = false } = {}) {
  const target = document.getElementById(sectionDomId(targetId));
  if (!target) return null;
  pauseReading();
  target.scrollIntoView({ behavior: smooth && !REDUCED_MOTION.matches ? 'smooth' : 'instant', block: 'start' });
  if (focus) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
  if (shell.module) {
    history.replaceState(null, '', `${shell.module.route}?s=${targetId}`);
  }
  return target.closest('section[data-section-id]')?.dataset.sectionId || null;
}

function scrollToTop() {
  pauseReading();
  window.scrollTo({ top: 0, behavior: REDUCED_MOTION.matches ? 'instant' : 'smooth' });
}

function nextSectionHref() {
  const next = getNextSection();
  return next ? `${next.module.route}?s=${next.section.id}` : '#/slownik';
}

/**
 * Follows an in-app link. Within the current page it scrolls right away (with a
 * normal history entry) instead of waiting for hashchange, which an unchanged
 * hash never fires.
 */
function navigate(href) {
  const target = parseHash(href);
  if (target.route !== shell.route) { location.hash = href; return; }
  if (href !== location.hash) history.pushState(null, '', href);
  onSectionParam(target.params);
}

function statusEl(mod) {
  if (!mod.sections.length) return el('span', { class: 'status none', 'aria-hidden': 'true' });
  const p = getModuleProgress(mod.id);
  if (p.read === p.total) return el('span', { class: 'status done', 'aria-hidden': 'true' }, icon('check', 12));
  if (p.read === 0) return el('span', { class: 'status todo', 'aria-hidden': 'true' });
  return el('span', { class: 'status partial', style: { '--p': String(p.pct) }, 'aria-hidden': 'true' });
}

// ─── Render: sidebar ──────────────────────────────────────

/** Builds the sidebar once; route and progress changes patch it via syncSidebar(). */
function renderSidebar() {
  const navItem = (mod) => el('a', {
    class: 'nav-item',
    href: mod.route,
    'data-module': mod.id,
    'data-layer': mod.layer,
    'data-total': String(mod.sections.length),
  },
    mod.num
      ? el('span', { class: 'layer-swatch mono' }, String(mod.num))
      : el('span', { class: 'nav-icon' }, icon(mod.icon, 16)),
    el('span', { class: 'nav-text' },
      el('span', { class: 'nav-label' }, mod.title),
      el('span', { class: 'nav-sub' }, mod.sections.length ? '' : LAYERS[mod.layer].question),
    ),
    statusEl(mod),
  );

  const groups = GROUPS.map(g => {
    const items = g.modules.map(getModule).flatMap((m, i) => [
      navItem(m),
      g.relations?.[i] ? el('div', { class: 'rail-rel', 'aria-hidden': 'true' }, `${g.relations[i]} ↓`) : null,
    ]);
    const countable = g.modules.map(getModule).some(m => m.sections.length);
    return el('div', { class: `nav-group${g.relations ? ' layer-rail' : ''}` },
      el('div', { class: 'nav-group-title eyebrow' },
        el('span', {}, g.title),
        countable ? el('span', { 'data-group-count': g.id }) : null),
      items,
    );
  });

  refs.sidebar.replaceChildren(
    el('button', { class: 'sidebar-close icon-btn', type: 'button', 'data-action': 'close-menu' }, 'Zamknij menu', icon('x', 16)),
    el('a', { class: 'brand', href: '#/', 'aria-label': 'CyberAkademia – mapa kursu' },
      el('img', { src: 'assets/quantica-q-mark-pink.png', alt: '', class: 'brand-mark' }),
      el('span', { class: 'brand-name' }, 'CyberAkademia')),
    el('a', { class: 'nav-item nav-start', href: '#/' },
      el('span', { class: 'nav-icon' }, icon('layout-grid', 16)),
      el('span', { class: 'nav-text' }, el('span', { class: 'nav-label' }, 'Start · mapa kursu')),
      el('span', {})),
    el('nav', { class: 'nav-groups', 'aria-label': 'Moduły kursu' }, groups),
    el('div', { class: 'sidebar-foot' },
      el('div', { class: 'overall' }, el('span', {}, 'Przeczytano'), el('strong', { 'data-course-pct': '' })),
      el('div', { class: 'overall-bar', 'aria-hidden': 'true' },
        GROUPS.flatMap(g => g.modules).map(getModule).filter(m => m.sections.length).map(m =>
          el('span', { 'data-layer': m.layer }, el('i', { 'data-bar-module': m.id })))),
      el('button', { class: 'kbd-hint', type: 'button', 'data-action': 'help' },
        'Skróty klawiszowe ', el('kbd', {}, '?')),
    ),
  );
}

/** Updates current page and progress in place, so a focused sidebar link survives. */
function syncSidebar() {
  const current = shell.page?.id || null;
  const setCurrent = (node, on) => on ? node.setAttribute('aria-current', 'page') : node.removeAttribute('aria-current');

  setCurrent(refs.sidebar.querySelector('.nav-start'), shell.route === '#/');
  refs.sidebar.querySelectorAll('.nav-item[data-module]').forEach(a => {
    const mod = getModule(a.dataset.module);
    const p = getModuleProgress(mod.id);
    setCurrent(a, current === mod.id);
    a.dataset.readCount = String(p.read);
    if (mod.sections.length) a.querySelector('.nav-sub').textContent = `${p.read}/${p.total} sekcji`;
    a.querySelector('.status').replaceWith(statusEl(mod));
  });
  GROUPS.forEach(g => {
    const counter = refs.sidebar.querySelector(`[data-group-count="${g.id}"]`);
    if (!counter) return;
    const mods = g.modules.map(getModule).filter(m => m.sections.length);
    counter.textContent = `${mods.filter(m => getModuleProgress(m.id).pct === 100).length}/${mods.length}`;
  });
  refs.sidebar.querySelector('[data-course-pct]').textContent = `${getCourseProgress().pct}%`;
  refs.sidebar.querySelectorAll('[data-bar-module]').forEach(i => {
    i.style.setProperty('--p', String(getModuleProgress(i.dataset.barModule).pct));
  });
}

// ─── Render: topbar ───────────────────────────────────────

function renderTopbar() {
  const mod = shell.page;
  const group = mod ? getGroupOf(mod.id) : null;
  const crumbs = el('nav', { class: 'crumbs', 'aria-label': 'Okruszki' },
    el('a', { href: '#/' }, 'CyberAkademia'),
    el('span', { class: 'crumb-separator' }, icon('chevron-right', 14)),
    mod
      ? [el('span', { class: 'hide-m' }, group.title), el('span', { class: 'hide-m' }, icon('chevron-right', 14)), el('b', {}, mod.title)]
      : el('b', {}, 'Mapa kursu'),
  );
  const layer = mod ? LAYERS[mod.layer] : null;
  refs.topbar.replaceChildren(...[
    el('button', { class: 'menu-btn', type: 'button', 'data-action': 'menu', 'aria-label': 'Otwórz menu', 'aria-controls': 'sidebar', 'aria-expanded': 'false' }, icon('menu', 20)),
    crumbs,
    layer ? el('span', { class: 'layer-badge', 'data-layer': layer.id }, el('i', {}), layer.name) : null,
    el('div', { class: 'topbar-right' },
      el('a', { class: 'icon-btn', href: nextSectionHref(), 'data-action': 'next', 'aria-label': 'Następny krok w kursie' }, icon('arrow-right', 16), el('span', { class: 'lbl' }, 'Następny krok')),
      el('button', { class: 'icon-btn', type: 'button', 'data-action': 'help', 'aria-label': 'Skróty klawiszowe' }, icon('keyboard', 16)),
    ),
  ].filter(Boolean));
}

// ─── Render: table of contents ────────────────────────────

function renderToc() {
  const mod = shell.module;
  if (!mod || !mod.sections.length) {
    refs.toc.replaceChildren();
    refs.toc.hidden = true;
    return;
  }
  refs.toc.hidden = false;
  refs.toc.replaceChildren(
    el('div', { class: 'eyebrow toc-title' }, 'Na tej stronie'),
    el('ol', {},
      mod.sections.map(s => el('li', {},
        el('a', {
          href: `${mod.route}?s=${s.id}`,
          'data-toc': s.id,
          class: isRead(mod.id, s.id) ? 'visited' : '',
        },
          el('span', { class: 'mono' }, s.id),
          el('span', { class: 'toc-label' }, s.title),
          el('span', { class: 'toc-check', 'aria-hidden': 'true' }, icon('check', 13)),
        ),
      )),
    ),
    el('div', { class: 'toc-foot' },
      el('span', {}, el('kbd', {}, 'J'), ' / ', el('kbd', {}, 'K'), ' następna / poprzednia'),
    ),
  );
}

// ─── Progress refresh (store → DOM) ───────────────────────

function refreshProgress() {
  const mod = shell.module;
  if (mod) {
    sectionsInPage().forEach(s => {
      s.dataset.read = String(isRead(mod.id, s.dataset.sectionId));
    });
    document.querySelectorAll(`[data-progress-for="${mod.id}"] [data-seg]`).forEach(seg => {
      seg.classList.toggle('v', isRead(mod.id, seg.dataset.seg));
    });
    const p = getModuleProgress(mod.id);
    document.querySelectorAll(`[data-progress-label="${mod.id}"]`).forEach(l => {
      l.textContent = p.read === p.total
        ? `Przeczytane: wszystkie ${pluralPl(p.total, SECTION_FORMS)}`
        : `Przeczytane: ${p.read} z ${p.total} sekcji`;
    });
    refs.toc.querySelectorAll('[data-toc]').forEach(a => {
      a.classList.toggle('visited', isRead(mod.id, a.dataset.toc));
    });
  }
  syncSidebar();
  const next = refs.topbar.querySelector('[data-action="next"]');
  if (next) next.href = nextSectionHref();
}

// ─── Observers: scroll-spy + read tracking ────────────────

function disconnectObservers() {
  shell.observers.forEach(o => o.disconnect());
  shell.observers = [];
  shell.reader = null;
}

/** Keeps the active chip visible in the horizontal (narrow) TOC without scrolling the page. */
function revealTocChip(chip) {
  const bar = refs.toc;
  if (bar.scrollWidth <= bar.clientWidth) return;
  const c = chip.getBoundingClientRect();
  const b = bar.getBoundingClientRect();
  if (c.left < b.left) bar.scrollLeft += c.left - b.left;
  else if (c.right > b.right) bar.scrollLeft += c.right - b.right;
}

function setActive(sectionId) {
  if (shell.activeSection === sectionId) return;
  shell.activeSection = sectionId;
  refs.toc.dataset.activeSection = sectionId || '';
  refs.toc.querySelectorAll('[data-toc]').forEach(a => {
    const on = a.dataset.toc === sectionId;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    if (on) revealTocChip(a);
  });
}

// Programmatic scrolls (TOC, J/K, links) sweep past the ends of the sections in
// between; those must not count as read. Reading resumes when the scroll ends.
function pauseReading() {
  shell.readingPaused = true;
  clearTimeout(shell.resumeTimer);
  document.removeEventListener('scrollend', resumeReading);
  document.addEventListener('scrollend', resumeReading, { once: true });
  // Fallback for browsers without 'scrollend' and for scrolls that do not move
  shell.resumeTimer = setTimeout(resumeReading, 1500);
}

function resumeReading() {
  if (!shell.readingPaused) return;
  shell.readingPaused = false;
  clearTimeout(shell.resumeTimer);
  document.removeEventListener('scrollend', resumeReading);
  observeSentinels();
}

/** (Re)observes unread sentinels; observing reports the ones already on screen. */
function observeSentinels() {
  const mod = shell.module;
  if (!shell.reader || !mod) return;
  document.querySelectorAll('#app [data-sentinel]').forEach(s => {
    shell.reader.unobserve(s);
    if (!isRead(mod.id, s.dataset.sentinel)) shell.reader.observe(s);
  });
}

function observeSections() {
  disconnectObservers();
  const mod = shell.module;
  if (!mod || !mod.sections.length || !('IntersectionObserver' in window)) return;

  const sections = sectionsInPage();
  const visible = new Map();
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => visible.set(e.target.dataset.sectionId, e.isIntersecting));
    const firstVisible = sections.find(s => visible.get(s.dataset.sectionId));
    if (firstVisible) setActive(firstVisible.dataset.sectionId);
  }, { rootMargin: '-20% 0px -55% 0px' });
  sections.forEach(s => spy.observe(s));

  // A section counts as read when its end passes the middle of the viewport. The top
  // band is excluded: after a jump, the previous section's end sits just above the target.
  const reader = new IntersectionObserver(entries => {
    if (shell.readingPaused) return;
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.dataset.sentinel;
      if (markRead(mod.id, id)) {
        const s = mod.sections.find(x => x.id === id);
        announce(`Przeczytano sekcję ${id} ${s ? s.title : ''}`);
      }
      reader.unobserve(e.target);
    });
  }, { rootMargin: '-15% 0px -8% 0px' });

  shell.reader = reader;
  shell.observers.push(spy, reader);
  observeSentinels();
}

// ─── Menu / help overlays ─────────────────────────────────

function focusableIn(root) {
  return [...root.querySelectorAll('a[href], button, input, select, textarea, [tabindex="0"]')]
    .filter(n => !n.disabled && !n.closest('[inert], [hidden]') && n.getClientRects().length);
}

function restoreFocus(trigger, fallback) {
  const target = trigger?.isConnected && !trigger.closest('[inert], [hidden]') ? trigger : fallback;
  target?.focus();
}

function syncOverlays() {
  const menuOpen = shell.menuOpen && MOBILE_LAYOUT.matches;
  refs.sidebar.classList.toggle('open', menuOpen);
  refs.help.classList.toggle('show', shell.helpOpen);
  refs.help.hidden = !shell.helpOpen;
  refs.help.inert = !shell.helpOpen;
  refs.help.setAttribute('aria-hidden', String(!shell.helpOpen));
  refs.app.inert = shell.helpOpen;
  refs.main.inert = menuOpen;
  refs.skip.inert = menuOpen || shell.helpOpen;
  refs.sidebar.inert = MOBILE_LAYOUT.matches && !menuOpen;
  if (MOBILE_LAYOUT.matches) refs.sidebar.setAttribute('aria-hidden', String(!menuOpen));
  else refs.sidebar.removeAttribute('aria-hidden');
  if (menuOpen) {
    refs.sidebar.setAttribute('role', 'dialog');
    refs.sidebar.setAttribute('aria-modal', 'true');
  } else {
    refs.sidebar.removeAttribute('role');
    refs.sidebar.removeAttribute('aria-modal');
  }
  refs.scrim.classList.toggle('show', menuOpen || shell.helpOpen);
  document.body.classList.toggle('modal-open', menuOpen || shell.helpOpen);
  const btn = refs.topbar.querySelector('[data-action="menu"]');
  if (btn) {
    btn.setAttribute('aria-expanded', String(menuOpen));
    btn.setAttribute('aria-label', menuOpen ? 'Zamknij menu' : 'Otwórz menu');
  }
}

function setMenu(open) {
  open = open && MOBILE_LAYOUT.matches && !shell.helpOpen;
  const wasOpen = shell.menuOpen;
  if (open && !wasOpen) shell.menuTrigger = document.activeElement;
  shell.menuOpen = open;
  syncOverlays();
  if (open && !wasOpen) focusableIn(refs.sidebar)[0]?.focus();
  if (!open && wasOpen) restoreFocus(shell.menuTrigger, refs.topbar.querySelector('[data-action="menu"]'));
}

function setHelp(open) {
  const wasOpen = shell.helpOpen;
  if (open && !wasOpen) {
    shell.helpTrigger = document.activeElement;
    setMenu(false);
  }
  shell.helpOpen = open;
  syncOverlays();
  if (open && !wasOpen) focusableIn(refs.help)[0]?.focus();
  if (!open && wasOpen) restoreFocus(shell.helpTrigger, refs.topbar.querySelector('[data-action="help"]'));
}

function renderHelp() {
  const row = (keys, text) => [el('dt', {}, ...keys.map(k => el('kbd', {}, k))), el('dd', {}, text)];
  refs.help.replaceChildren(
    el('h2', { id: 'help-title' }, 'Skróty klawiszowe'),
    el('dl', {},
      row(['J'], 'następna sekcja'),
      row(['K'], 'poprzednia sekcja'),
      row(['N'], 'następny krok w kursie'),
      row(['M'], 'menu modułów'),
      row(['←', '→'], 'oś czasu: poprzednie / następne zdarzenie'),
      row(['?'], 'ta pomoc'),
      row(['Esc'], 'zamknij'),
    ),
    el('button', { class: 'btn', type: 'button', 'data-action': 'close-help' }, 'Zamknij'),
  );
}

function stepSection(dir) {
  const secs = sectionsInPage();
  if (!secs.length) return;
  const i = secs.findIndex(s => s.dataset.sectionId === shell.activeSection);
  const j = i === -1 ? 0 : Math.max(0, Math.min(secs.length - 1, i + dir));
  const id = secs[j].dataset.sectionId;
  scrollToSection(id);
  setActive(id);
  announce(`Sekcja ${id}`);
}

// ─── Listeners ────────────────────────────────────────────

function bindListeners() {
  document.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'menu') setMenu(!shell.menuOpen);
    if (action === 'close-menu') setMenu(false);
    if (action === 'help') { e.preventDefault(); setHelp(true); }
    if (action === 'close-help') setHelp(false);

    const tocLink = e.target.closest('[data-toc]');
    const link = e.target.closest('a[href^="#/"]');
    if (e.target.closest('.skip-link')) {
      // Focus the content without putting '#app' in the URL
      e.preventDefault();
      refs.content.focus();
    } else if (tocLink) {
      e.preventDefault();
      const sec = scrollToSection(tocLink.dataset.toc);
      if (sec) setActive(sec);
    } else if (link && !e.defaultPrevented && !(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
      && parseHash(link.getAttribute('href')).route === shell.route) {
      e.preventDefault();
      navigate(link.getAttribute('href'));
    }
    // Close the mobile menu after choosing a module
    if (e.target.closest('.sidebar a')) setMenu(false);
  });

  refs.scrim.addEventListener('click', () => { setMenu(false); setHelp(false); });

  document.addEventListener('keydown', e => {
    const modal = shell.helpOpen ? refs.help : shell.menuOpen ? refs.sidebar : null;
    if (modal) {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (shell.helpOpen) setHelp(false); else setMenu(false);
      } else if (e.key === 'Tab') {
        const targets = focusableIn(modal);
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (!first) { e.preventDefault(); return; }
        if (!modal.contains(document.activeElement) || (e.shiftKey && document.activeElement === first)) {
          e.preventDefault(); (e.shiftKey ? last : first).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
      return;
    }
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }
    switch (e.key) {
      case 'j': case 'J': stepSection(1); break;
      case 'k': case 'K': stepSection(-1); break;
      case 'n': case 'N': navigate(nextSectionHref()); break;
      case 'm': case 'M': setMenu(!shell.menuOpen); break;
      case '?': setHelp(true); break;
      default: return;
    }
  });

  subscribe(refreshProgress);
  MOBILE_LAYOUT.addEventListener('change', () => {
    if (!MOBILE_LAYOUT.matches) setMenu(false);
    else {
      const sidebarFocused = refs.sidebar.contains(document.activeElement);
      syncOverlays();
      if (sidebarFocused) refs.topbar.querySelector('[data-action="menu"]')?.focus();
    }
  });
}

// ─── Init / route hooks ───────────────────────────────────

export function initShell() {
  refs.sidebar = document.getElementById('sidebar');
  refs.topbar = document.getElementById('topbar');
  refs.toc = document.getElementById('toc');
  refs.scrim = document.getElementById('scrim');
  refs.help = document.getElementById('help');
  refs.live = document.getElementById('live');
  refs.content = document.getElementById('app');
  refs.app = document.querySelector('.app');
  refs.main = document.querySelector('.main');
  refs.skip = document.querySelector('.skip-link');
  renderHelp();
  renderSidebar();
  syncOverlays();
  bindListeners();
}

/** Called by the router after a page has been rendered into #app. */
export function onRoute({ route, params, module }) {
  setHelp(false);
  // The focused element (a link in the old page or the topbar) is gone after a page change
  const focusLost = shell.hasRouted && (!document.activeElement || document.activeElement === document.body);
  shell.hasRouted = true;
  shell.route = route;
  shell.page = module || null;
  shell.module = module && module.sections.length ? module : null;
  shell.activeSection = null;
  document.body.dataset.route = module ? module.id : 'start';
  document.body.dataset.layer = module ? module.layer : 'base';
  renderTopbar();
  renderToc();
  refreshProgress();
  setMenu(false);
  observeSections();

  const sec = params.s ? scrollToSection(params.s, { smooth: false, focus: focusLost }) : null;
  if (sec) setActive(sec);
  else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focusLost) refs.content.focus({ preventScroll: true });
  }

  announce(module ? module.fullTitle : 'Mapa kursu');
}

/** Same page, different or repeated ?s= parameter: go to that section, or to the top. */
export function onSectionParam(params) {
  if (!params.s) { scrollToTop(); return; }
  const sec = scrollToSection(params.s, { focus: true });
  if (sec) {
    setActive(sec);
    announce(`Sekcja ${params.s}`);
  }
}
