/* global React */
function ProjectRow({ name, status, progress, accent = '#C41E54' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      background: 'white',
      borderRadius: 14,
      border: '1px solid var(--border-1)',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: '#FFE6F1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', color: accent, fontSize: 15, fontWeight: 600,
      }}>{name[0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-1)' }}>{name}</div>
        <div style={{ marginTop: 4, height: 4, background: 'var(--bg-2)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: progress + '%', height: '100%', background: accent, borderRadius: 999 }} />
        </div>
      </div>
      <div style={{
        fontSize: 11, color: accent, fontWeight: 500,
        padding: '4px 10px', borderRadius: 999, background: '#FFE6F1', whiteSpace: 'nowrap',
      }}>{status}</div>
    </div>
  );
}

function ProjectList() {
  return (
    <div style={{ padding: '8px 16px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 4px 12px',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Active projects</div>
        <a href="#" onClick={(e) => e.preventDefault()} style={{
          fontSize: 12, color: 'var(--quantica-pink)', textDecoration: 'none', fontWeight: 500,
        }}>See all</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ProjectRow name="Demand Forecasting" status="In progress" progress={68} />
        <ProjectRow name="Pricing Optimizer" status="Live" progress={100} />
        <ProjectRow name="Risk Scoring" status="Training" progress={42} />
      </div>
    </div>
  );
}

window.ProjectList = ProjectList;
window.ProjectRow = ProjectRow;
