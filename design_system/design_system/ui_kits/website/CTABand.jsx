/* global React */
function CTABand() {
  return (
    <section style={{
      background: '#C41E54',
      color: 'white',
      padding: '96px 56px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(700px 400px at 95% 50%, rgba(255,255,255,0.18), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative', maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48,
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{
            fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 16,
          }}>Ready to start</div>
          <h2 style={{
            fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.02em',
            fontWeight: 700, margin: 0,
          }}>
            From data to decisions.<br/>Faster.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 20, color: 'rgba(255,255,255,0.85)', maxWidth: 540 }}>
            Talk to our advisory team about where AI creates measurable leverage in your business.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
          <button style={{
            fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
            padding: '16px 32px', borderRadius: 999,
            background: 'white', color: '#C41E54', border: 'none', cursor: 'pointer',
          }}>Book a session</button>
          <button style={{
            fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
            padding: '16px 32px', borderRadius: 999,
            background: 'transparent', color: 'white',
            border: '1.5px solid rgba(255,255,255,0.6)', cursor: 'pointer',
          }}>Read case studies</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: 'Products', links: ['Forecasting', 'Decisioning', 'Risk', 'Automation'] },
    { title: 'Solutions', links: ['Retail', 'Financial services', 'Industrial', 'Health'] },
    { title: 'Company', links: ['About', 'Insights', 'Careers', 'Contact'] },
  ];
  return (
    <footer style={{
      background: '#111111', color: 'white', padding: '64px 56px',
      display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <img src="quantica-logo-white.png" alt="Quantica Lab" style={{ height: 40, width: 'auto', display: 'block' }} />
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 320 }}>
          AI products. Advisory. Business impact.
        </p>
        <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>
          quanticalab.ai
        </div>
      </div>
      {cols.map(c => (
        <div key={c.title}>
          <div style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#FF4D9A', marginBottom: 16,
          }}>{c.title}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {c.links.map(l => (
              <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textDecoration: 'none' }}>{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}

window.QLCTABand = CTABand;
window.QLFooter = Footer;
