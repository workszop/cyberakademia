// ============================================================
// CyberAkademia — dom.js
// Tiny DOM helpers — no framework
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
      Object.assign(node.style, val);
      continue;
    }

    // className alias
    if (key === 'class') {
      node.className = val;
      continue;
    }

    // innerHTML (escape hatch — use sparingly)
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

  for (const child of children) {
    if (child === null || child === undefined) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      node.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      node.appendChild(child);
    } else if (Array.isArray(child)) {
      // Support nested arrays of children
      for (const c of child) {
        if (c === null || c === undefined) continue;
        if (typeof c === 'string' || typeof c === 'number') {
          node.appendChild(document.createTextNode(String(c)));
        } else if (c instanceof Node) {
          node.appendChild(c);
        }
      }
    }
  }

  return node;
}
