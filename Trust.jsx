/* global React, Icon, Badge */

function TrustStrip() {
  const items = [
    { icon: 'shield-check', label: 'Approbierte Fachärzt:innen' },
    { icon: 'lock',         label: 'DSGVO-konform · Server in Deutschland' },
    { icon: 'clock',        label: 'Anruf in wenigen Minuten' },
  ];
  return (
    <section className="section-bg-alt" style={{ padding: '32px 0', borderTop: '1px solid var(--bd-line-2)', borderBottom: '1px solid var(--bd-line-2)' }}>
      <div className="container trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {items.map(it => (
          <div key={it.label} className="row-tight" style={{ gap: 12 }}>
            <Icon name={it.icon} size={20} style={{ color: 'var(--bd-blue-700)' }} />
            <span style={{ fontSize: 14, color: 'var(--fg-2)' }}>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { TrustStrip });
