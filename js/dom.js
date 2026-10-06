// ============================================================
// CyberAkademia - dom.js
// Tiny DOM helpers - no framework
// ============================================================

/**
 * Creates a DOM element with properties and children.
 * @param {string} tag - HTML tag name
 * @param {Object} props - Properties: class, id, data-*, 'on*' listeners, style object, or any attribute
 * @param {...(Node|string)} children - Child nodes or strings
 * @returns {HTMLElement}
 */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, val] of Object.entries(props)) {
    if (val === null || val === undefined) continue;

    // Event listeners
    if (key.startsWith('on') && typeof val === 'function') {
      const eventName = key.slice(2).toLowerCase();
      node.addEventListener(eventName, val);
      continue;
    }

    // Style object
    if (key === 'style' && typeof val === 'object') {
      for (const [prop, v] of Object.entries(val)) {
        // Custom properties (--foo) need setProperty; Object.assign ignores them
        if (prop.startsWith('--')) node.style.setProperty(prop, v);
        else node.style[prop] = v;
      }
      continue;
    }

    // className alias
    if (key === 'class') {
      node.className = val;
      continue;
    }

    // innerHTML (escape hatch - use sparingly)
    if (key === 'html') {
      node.innerHTML = val;
      continue;
    }

    // data-* attributes
    if (key.startsWith('data-')) {
      node.setAttribute(key, val);
      continue;
    }

    // Boolean attributes
    if (typeof val === 'boolean') {
      if (val) node.setAttribute(key, '');
      else node.removeAttribute(key);
      continue;
    }

    // aria-* and role
    if (key.startsWith('aria-') || key === 'role') {
      node.setAttribute(key, val);
      continue;
    }

    // Standard IDL properties (id, type, value, href, src, alt, placeholder…)
    if (key in node) {
      node[key] = val;
    } else {
      node.setAttribute(key, val);
    }
  }

  appendChildren(node, children);
  return node;
}

/** Appends strings, numbers, nodes and (nested) arrays of them; skips null/undefined. */
function appendChildren(node, children) {
  for (const child of children) {
    if (child === null || child === undefined) continue;
    if (Array.isArray(child)) appendChildren(node, child);
    else if (child instanceof Node) node.appendChild(child);
    else if (typeof child === 'string' || typeof child === 'number') node.appendChild(document.createTextNode(String(child)));
  }
}
