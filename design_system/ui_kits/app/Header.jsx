/* global React */
function AppHeader() {
  return (
    <div style={{ padding: '64px 20px 12px' }}>
      <div style={{ fontSize: 13, color: 'var(--fg-3)', fontWeight: 500 }}>Overview</div>
      <div style={{ marginTop: 6, fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>
        Hello, Alex.
      </div>
      <div style={{ marginTop: 4, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.5 }}>
        Here's your AI performance summary.
      </div>
    </div>
  );
}

function Sparkline({ values, color = '#C41E54', height = 44 }) {
  const max = Math.max(...values), min = Math.min(...values);
  const w = 200, h = height;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const fillD = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#spark-fill)" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill={color} />
    </svg>
  );
}

function MetricCard() {
  const data = [70, 74, 72, 78, 82, 80, 85, 84, 88, 90, 89, 92.4];
  return (
    <div style={{
      margin: '0 16px',
      background: 'white',
      border: '1px solid var(--border-1)',
      borderRadius: 18,
      padding: 18,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', fontWeight: 500 }}>Model accuracy</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--status-success)' }}>+5.6%</div>
      </div>
      <div style={{
        marginTop: 4, fontSize: 40, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-1)',
      }}>
        92.4<span style={{ fontSize: 24, color: 'var(--quantica-pink)' }}>%</span>
      </div>
      <div style={{ marginTop: 6 }}>
        <Sparkline values={data} />
      </div>
    </div>
  );
}

window.AppHeader = AppHeader;
window.MetricCard = MetricCard;
window.Sparkline = Sparkline;
