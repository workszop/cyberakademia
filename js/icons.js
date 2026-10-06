// icons.js - Lucide icon factory for CyberAkademia
// Lucide loaded via CDN as window.lucide (UMD build)
// Usage: icon('shield', 20) → SVG element with stroke style

const SVG_NS = 'http://www.w3.org/2000/svg';

export function icon(name, size = 18) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.display = 'inline-block';
  svg.style.verticalAlign = 'middle';
  svg.style.flexShrink = '0';

  (iconNodes(name) || []).forEach(([tag, attrs]) => {
    const child = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => child.setAttribute(k, v));
    svg.appendChild(child);
  });
  return svg;
}

/** Child nodes [[tag, attrs], …] from Lucide, or the bundled copy when the CDN fails. */
function iconNodes(name) {
  const def = window.lucide?.[toPascalCase(name)];
  // Lucide UMD exports either ['svg', attrs, children] or the bare children array
  if (Array.isArray(def)) return def[0] === 'svg' ? def[2] : def;
  return FALLBACK_ICONS[name];
}

function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

// Every icon the app uses (incl. module icons in course.js), copied from lucide@0.468.0 (same version as index.html),
// so the UI keeps its icons when the CDN is blocked or offline
const FALLBACK_ICONS = {
  'alert-triangle': [['path',{d:'m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'}],['path',{d:'M12 9v4'}],['path',{d:'M12 17h.01'}]],
  'arrow-down': [['path',{d:'M12 5v14'}],['path',{d:'m19 12-7 7-7-7'}]],
  'arrow-right': [['path',{d:'M5 12h14'}],['path',{d:'m12 5 7 7-7 7'}]],
  'bar-chart-2': [['line',{x1:'18',x2:'18',y1:'20',y2:'10'}],['line',{x1:'12',x2:'12',y1:'20',y2:'4'}],['line',{x1:'6',x2:'6',y1:'20',y2:'14'}]],
  'book-open': [['path',{d:'M12 7v14'}],['path',{d:'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'}]],
  'building-2': [['path',{d:'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z'}],['path',{d:'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2'}],['path',{d:'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2'}],['path',{d:'M10 6h4'}],['path',{d:'M10 10h4'}],['path',{d:'M10 14h4'}],['path',{d:'M10 18h4'}]],
  'check': [['path',{d:'M20 6 9 17l-5-5'}]],
  'check-circle': [['path',{d:'M21.801 10A10 10 0 1 1 17 3.335'}],['path',{d:'m9 11 3 3L22 4'}]],
  'chevron-down': [['path',{d:'m6 9 6 6 6-6'}]],
  'chevron-right': [['path',{d:'m9 18 6-6-6-6'}]],
  'clipboard-list': [['rect',{width:'8',height:'4',x:'8',y:'2',rx:'1',ry:'1'}],['path',{d:'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'}],['path',{d:'M12 11h4'}],['path',{d:'M12 16h4'}],['path',{d:'M8 11h.01'}],['path',{d:'M8 16h.01'}]],
  'clock': [['circle',{cx:'12',cy:'12',r:'10'}],['polyline',{points:'12 6 12 12 16 14'}]],
  'cpu': [['rect',{width:'16',height:'16',x:'4',y:'4',rx:'2'}],['rect',{width:'6',height:'6',x:'9',y:'9',rx:'1'}],['path',{d:'M15 2v2'}],['path',{d:'M15 20v2'}],['path',{d:'M2 15h2'}],['path',{d:'M2 9h2'}],['path',{d:'M20 15h2'}],['path',{d:'M20 9h2'}],['path',{d:'M9 2v2'}],['path',{d:'M9 20v2'}]],
  'eye': [['path',{d:'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0'}],['circle',{cx:'12',cy:'12',r:'3'}]],
  'file-text': [['path',{d:'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'}],['path',{d:'M14 2v4a2 2 0 0 0 2 2h4'}],['path',{d:'M10 9H8'}],['path',{d:'M16 13H8'}],['path',{d:'M16 17H8'}]],
  'info': [['circle',{cx:'12',cy:'12',r:'10'}],['path',{d:'M12 16v-4'}],['path',{d:'M12 8h.01'}]],
  'key': [['path',{d:'m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4'}],['path',{d:'m21 2-9.6 9.6'}],['circle',{cx:'7.5',cy:'15.5',r:'5.5'}]],
  'keyboard': [['path',{d:'M10 8h.01'}],['path',{d:'M12 12h.01'}],['path',{d:'M14 8h.01'}],['path',{d:'M16 12h.01'}],['path',{d:'M18 8h.01'}],['path',{d:'M6 8h.01'}],['path',{d:'M7 16h10'}],['path',{d:'M8 12h.01'}],['rect',{width:'20',height:'16',x:'2',y:'4',rx:'2'}]],
  'layers': [['path',{d:'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z'}],['path',{d:'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12'}],['path',{d:'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'}]],
  'layout-grid': [['rect',{width:'7',height:'7',x:'3',y:'3',rx:'1'}],['rect',{width:'7',height:'7',x:'14',y:'3',rx:'1'}],['rect',{width:'7',height:'7',x:'14',y:'14',rx:'1'}],['rect',{width:'7',height:'7',x:'3',y:'14',rx:'1'}]],
  'list': [['path',{d:'M3 12h.01'}],['path',{d:'M3 18h.01'}],['path',{d:'M3 6h.01'}],['path',{d:'M8 12h13'}],['path',{d:'M8 18h13'}],['path',{d:'M8 6h13'}]],
  'map': [['path',{d:'M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z'}],['path',{d:'M15 5.764v15'}],['path',{d:'M9 3.236v15'}]],
  'menu': [['line',{x1:'4',x2:'20',y1:'12',y2:'12'}],['line',{x1:'4',x2:'20',y1:'6',y2:'6'}],['line',{x1:'4',x2:'20',y1:'18',y2:'18'}]],
  'plus': [['path',{d:'M5 12h14'}],['path',{d:'M12 5v14'}]],
  'search': [['circle',{cx:'11',cy:'11',r:'8'}],['path',{d:'m21 21-4.3-4.3'}]],
  'shield': [['path',{d:'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'}]],
  'x': [['path',{d:'M18 6 6 18'}],['path',{d:'m6 6 12 12'}]],
};
