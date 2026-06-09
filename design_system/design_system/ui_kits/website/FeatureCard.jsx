/* global React, lucide */
function FeatureCard({ icon, eyebrow, title, body }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons({ nameAttr: 'data-lucide-name' });
  }, []);
  return (
    <article style={{
      background: 'white',
      border: '1px solid var(--border-1)',
      borderRadius: 16,
      padding: 28,
      display: 'flex', flexDirection: 'column', gap: 14,
      transition: 'box-shadow 240ms, transform 240ms',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: '#FFE6F1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#C41E54',
      }} ref={ref}>
        <i data-lucide-name={icon} style={{ width: 22, height: 22, strokeWidth: 1.75 }} />
      </div>
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#C41E54',
      }}>{eyebrow}</div>
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)' }}>
        {body}
      </p>
    </article>
  );
}

function FeatureTriad() {
  return (
    <section style={{ padding: '96px 56px', background: 'var(--bg-1)' }}>
      <div style={{ maxWidth: 760, marginBottom: 56 }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#C41E54', marginBottom: 16,
        }}>What we do</div>
        <h2 style={{
          fontSize: 48, lineHeight: 1.1, letterSpacing: '-0.015em',
          fontWeight: 700, margin: 0,
        }}>Build Smarter. <span style={{ color: '#C41E54' }}>Scale Faster.</span></h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg-2)', marginTop: 18, maxWidth: 600 }}>
          Quantica Lab partners with companies to design, build, and deploy AI
          solutions that drive growth, efficiency, and resilience.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <FeatureCard icon="cpu" eyebrow="AI Products"
          title="Forecasting & decision systems"
          body="Production-grade AI that ships into your ops stack — demand forecasts, dynamic pricing, risk scoring." />
        <FeatureCard icon="lightbulb" eyebrow="Advisory"
          title="Strategic AI roadmaps"
          body="Deep-domain advisors help you choose where AI creates measurable leverage, and where it doesn't." />
        <FeatureCard icon="zap" eyebrow="Implementation"
          title="From pilot to production"
          body="We don't stop at the model. We deliver MLOps, monitoring, and the org change to make it stick." />
      </div>
    </section>
  );
}

window.QLFeatureCard = FeatureCard;
window.QLFeatureTriad = FeatureTriad;
