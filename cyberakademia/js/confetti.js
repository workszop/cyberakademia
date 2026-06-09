// ============================================================
// CyberAkademia — confetti.js
// Canvas-based confetti burst animations
// ============================================================

const COLORS = [
  '#00d4ff', // accent cyan
  '#7c3aed', // purple
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#ffffff', // white
  '#a78bfa', // light purple
  '#34d399', // light green
];

let canvas = null;
let ctx = null;
let particles = [];
let animationId = null;

function getCanvas() {
  if (!canvas) {
    canvas = document.getElementById('confetti-canvas');
    if (!canvas) return null;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }
  return canvas;
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle(x, y) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const angle = (Math.random() * Math.PI * 2);
  const speed = 4 + Math.random() * 8;
  const size = 4 + Math.random() * 7;
  const shape = Math.random() < 0.6 ? 'rect' : 'circle';
  const tilt = Math.random() * Math.PI * 2;
  const tiltSpeed = (Math.random() - 0.5) * 0.15;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - (Math.random() * 6), // bias upward
    ax: 0,
    ay: 0.28 + Math.random() * 0.12, // gravity
    color,
    size,
    shape,
    tilt,
    tiltSpeed,
    alpha: 1,
    decay: 0.013 + Math.random() * 0.01,
  };
}

function updateParticle(p) {
  p.vx += p.ax;
  p.vy += p.ay;
  p.vx *= 0.99; // air drag
  p.x += p.vx;
  p.y += p.vy;
  p.tilt += p.tiltSpeed;
  p.alpha = Math.max(0, p.alpha - p.decay);
}

function drawParticle(p) {
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.fillStyle = p.color;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.tilt);

  if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
  }

  ctx.restore();
}

function loop() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  particles = particles.filter(p => p.alpha > 0.01);

  for (const p of particles) {
    updateParticle(p);
    drawParticle(p);
  }

  if (particles.length > 0) {
    animationId = requestAnimationFrame(loop);
  } else {
    // All done — clear canvas and reset
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animationId = null;
  }
}

function startLoop() {
  if (animationId) return; // already running
  animationId = requestAnimationFrame(loop);
}

/**
 * Fire a confetti burst at given screen coordinates.
 * @param {number} x - screen X
 * @param {number} y - screen Y
 * @param {number} count - number of particles (default 60)
 */
export function burst(x, y, count = 60) {
  if (!getCanvas()) return;
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(x, y));
  }
  startLoop();
}

/**
 * Fire a full confetti burst from the top-centre of the screen.
 * @param {number} count - number of particles (default 120)
 */
export function fullBurst(count = 120) {
  if (!getCanvas()) return;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.15;

  for (let i = 0; i < count; i++) {
    const p = createParticle(
      cx + (Math.random() - 0.5) * 200,
      cy,
    );
    // Fan downward with wide spread
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
    const speed = 5 + Math.random() * 10;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
    particles.push(p);
  }

  startLoop();
}
