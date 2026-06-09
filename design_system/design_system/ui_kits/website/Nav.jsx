/* global React */
const { useState } = React;

function Logo({ variant = 'color', height = 38 }) {
  const src = variant === 'white' ? 'quantica-logo-white.png' : 'quantica-logo-color.png';
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={src} alt="Quantica Lab" style={{ height, width: 'auto', display: 'block' }} />
    </div>
  );
}

function Nav({ active = 'Solutions', onNavigate = () => {} }) {
  const links = ['Solutions', 'Products', 'Advisory', 'Insights'];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', gap: 40,
      padding: '20px 56px',
      borderBottom: '1px solid var(--border-1)',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'saturate(1.4) blur(12px)',
      WebkitBackdropFilter: 'saturate(1.4) blur(12px)',
    }}>
      <Logo />
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1, marginLeft: 24 }}>
        {links.map(l => (
          <a key={l} href="#" onClick={(e) => { e.preventDefault(); onNavigate(l); }}
             style={{
               fontSize: 14, color: active === l ? '#C41E54' : 'var(--fg-2)',
               textDecoration: 'none', fontWeight: active === l ? 500 : 400,
               borderBottom: active === l ? '2px solid #C41E54' : '2px solid transparent',
               padding: '6px 0', transition: 'color 200ms',
             }}>
            {l}
          </a>
        ))}
      </div>
      <button style={{
        fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
        padding: '11px 22px', borderRadius: 999,
        background: '#C41E54', color: 'white', border: 'none', cursor: 'pointer',
        boxShadow: 'var(--shadow-pink-soft)',
      }}>Contact</button>
    </nav>
  );
}

window.QLNav = Nav;
window.QLLogo = Logo;
