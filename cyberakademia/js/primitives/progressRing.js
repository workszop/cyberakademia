/**
 * SVG progress ring — factory function
 * Returns a DOM element (not init(container) pattern)
 *
 * pct:   0-100
 * label: text shown below the ring
 * size:  diameter in px (default 80)
 */

export function createProgressRing(pct, label, size = 80) {
  const clampedPct = Math.max(0, Math.min(100, Number(pct) || 0));
  const strokeWidth = Math.max(4, Math.round(size * 0.1));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (clampedPct / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  // ── Wrapper div ───────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'progress-ring-wrapper';
  wrapper.setAttribute('role', 'img');
  wrapper.setAttribute(
    'aria-label',
    `Postęp: ${Math.round(clampedPct)}%${label ? ` — ${label}` : ''}`
  );

  // ── SVG ───────────────────────────────────────────────────
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.style.display = 'block';

  // Track circle (grey)
  const track = document.createElementNS(svgNS, 'circle');
  track.setAttribute('cx', cx);
  track.setAttribute('cy', cy);
  track.setAttribute('r', radius);
  track.setAttribute('fill', 'none');
  track.setAttribute('stroke', 'var(--border, #E6E8EC)');
  track.setAttribute('stroke-width', strokeWidth);
  svg.appendChild(track);

  // Fill circle (accent, animated)
  const fill = document.createElementNS(svgNS, 'circle');
  fill.setAttribute('cx', cx);
  fill.setAttribute('cy', cy);
  fill.setAttribute('r', radius);
  fill.setAttribute('fill', 'none');
  fill.setAttribute('stroke', 'var(--accent, #C41E54)');
  fill.setAttribute('stroke-width', strokeWidth);
  fill.setAttribute('stroke-linecap', 'round');
  // Start from the top (rotate -90deg)
  fill.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
  fill.style.strokeDasharray = `${circumference}`;
  fill.style.strokeDashoffset = `${circumference}`; // start empty
  fill.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  // Colour overrides for common thresholds
  if (clampedPct >= 80) {
    fill.setAttribute('stroke', 'var(--success, #00A37A)');
  } else if (clampedPct >= 50) {
    fill.setAttribute('stroke', 'var(--accent, #C41E54)');
  } else if (clampedPct >= 30) {
    fill.setAttribute('stroke', 'var(--warning, #FFC107)');
  } else {
    fill.setAttribute('stroke', 'var(--danger, #DC2626)');
  }
  svg.appendChild(fill);

  // Percentage text in centre
  const fontSize = Math.max(10, Math.round(size * 0.2));
  const pctText = document.createElementNS(svgNS, 'text');
  pctText.setAttribute('x', cx);
  pctText.setAttribute('y', cy);
  pctText.setAttribute('dominant-baseline', 'central');
  pctText.setAttribute('text-anchor', 'middle');
  pctText.setAttribute('font-size', fontSize);
  pctText.setAttribute('font-weight', '700');
  pctText.setAttribute('font-family', 'var(--font, system-ui)');
  pctText.setAttribute('fill', 'var(--text, #111111)');
  pctText.textContent = `${Math.round(clampedPct)}%`;
  svg.appendChild(pctText);

  wrapper.appendChild(svg);

  // ── Label below ───────────────────────────────────────────
  if (label) {
    const labelEl = document.createElement('div');
    labelEl.className = 'progress-ring-label';
    labelEl.textContent = label;
    wrapper.appendChild(labelEl);
  }

  // ── Animate on mount using IntersectionObserver ───────────
  // Triggers once when the element enters the viewport
  const animate = () => {
    fill.style.strokeDashoffset = `${dashoffset}`;
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(animate);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(wrapper);
  } else {
    // Fallback: animate after a tick
    setTimeout(animate, 50);
  }

  // ── Public API — allow external update ───────────────────
  wrapper.update = (newPct) => {
    const p = Math.max(0, Math.min(100, Number(newPct) || 0));
    const newOffset = circumference - (p / 100) * circumference;
    fill.style.strokeDashoffset = `${newOffset}`;
    pctText.textContent = `${Math.round(p)}%`;
    wrapper.setAttribute('aria-label', `Postęp: ${Math.round(p)}%${label ? ` — ${label}` : ''}`);
  };

  return wrapper;
}
