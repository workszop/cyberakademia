/* global React */
function MetricsBand() {
  const items = [
    { value: '+26.8%', label: 'Avg revenue impact', sub: 'Across forecasting deployments' },
    { value: '320 hrs', label: 'Saved per quarter', sub: 'Operations automation' },
    { value: '92.4%', label: 'Model accuracy', sub: 'In production, post-deployment' },
  ];
  return (
    <section style={{
      background: '#111111',
      color: 'white',
      padding: '96px 56px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle particle wash on right */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(900px 400px at 90% 50%, rgba(255,32,161,0.18), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#FF4D9A', marginBottom: 16,
        }}>Business impact</div>
        <h2 style={{
          fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.015em',
          fontWeight: 700, margin: 0, marginBottom: 56, maxWidth: 700,
        }}>
          AI that drives <span style={{ color: '#FF4D9A' }}>real outcomes.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {items.map((m, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 28 }}>
              <div style={{
                fontSize: 64, fontWeight: 700, letterSpacing: '-0.025em',
                lineHeight: 1, color: '#FF4D9A',
              }}>{m.value}</div>
              <div style={{ marginTop: 16, fontSize: 16, fontWeight: 500 }}>{m.label}</div>
              <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.QLMetricsBand = MetricsBand;
