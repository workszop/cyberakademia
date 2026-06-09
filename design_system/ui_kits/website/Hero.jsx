/* global React */
const { useEffect, useRef } = React;

function ParticleWave({ height = 480 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = c.getBoundingClientRect();
      c.width = r.width * dpr; c.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    let t = 0;
    function draw() {
      const r = c.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      const cols = 110, rows = 30;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const tt = i / cols;
          // density falls off toward left; concentrated on right
          const density = 0.35 + 0.65 * tt;
          if (Math.random() > density) continue;
          const phase = i * 0.16 + j * 0.10 + t * 0.012;
          const wave = Math.sin(phase) * 18 + Math.sin(phase * 0.55 + t * 0.008) * 22;
          const x = tt * r.width;
          const y = (j / (rows - 1)) * r.height + wave;
          const size = 0.6 + tt * 1.8;
          const a = 0.12 + tt * 0.75;
          ctx.fillStyle = `hsla(${330 + Math.sin(phase) * 6}, 100%, ${42 + tt * 8}%, ${a})`;
          ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
        }
      }
      t += 1;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height }} />;
}

function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: '96px 56px 120px',
      minHeight: 480,
      overflow: 'hidden',
    }}>
      <ParticleWave height={480} />
      <div style={{ position: 'relative', maxWidth: 720 }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#C41E54', marginBottom: 20,
        }}>Futuristic · Strategic · Intelligent</div>
        <h1 style={{
          fontSize: 72, lineHeight: 1.02, fontWeight: 700,
          letterSpacing: '-0.025em', margin: 0, color: '#111111',
        }}>
          AI solutions that<br/>
          move your business <span style={{ color: '#C41E54' }}>forward.</span>
        </h1>
        <p style={{
          fontSize: 18, lineHeight: 1.6, color: 'var(--fg-2)',
          marginTop: 24, maxWidth: 540,
        }}>
          Products for today. Strategy for tomorrow. Built for impact.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          <button style={{
            fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
            padding: '14px 28px', borderRadius: 999,
            background: '#C41E54', color: 'white', border: 'none', cursor: 'pointer',
            boxShadow: 'var(--shadow-pink)',
          }}>Explore Solutions</button>
          <button style={{
            fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
            padding: '14px 28px', borderRadius: 999,
            background: 'transparent', color: '#C41E54',
            border: '1.5px solid #C41E54', cursor: 'pointer',
          }}>Talk to advisory</button>
        </div>
      </div>
    </section>
  );
}

window.QLHero = Hero;
window.QLParticleWave = ParticleWave;
