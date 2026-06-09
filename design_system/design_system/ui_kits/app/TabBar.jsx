/* global React, lucide */
function TabBar({ active = 'Home', onChange = () => {} }) {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons({ nameAttr: 'data-lucide-name' });
  }, [active]);
  const tabs = [
    { id: 'Home', icon: 'home' },
    { id: 'Projects', icon: 'layers' },
    { id: 'Insights', icon: 'bar-chart-3' },
    { id: 'Alerts', icon: 'bell' },
    { id: 'Profile', icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 8px 28px',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'saturate(1.4) blur(20px)',
      WebkitBackdropFilter: 'saturate(1.4) blur(20px)',
      borderTop: '1px solid var(--border-1)',
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          padding: '6px 10px',
          color: active === t.id ? '#C41E54' : 'var(--fg-3)',
        }}>
          <i data-lucide-name={t.icon} style={{ width: 22, height: 22, strokeWidth: active === t.id ? 2 : 1.75 }} />
          <span style={{ fontSize: 10, fontWeight: 500 }}>{t.id}</span>
        </button>
      ))}
    </div>
  );
}

window.TabBar = TabBar;
