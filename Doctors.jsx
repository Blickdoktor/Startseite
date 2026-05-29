/* global React, Icon, Badge */

function Doctors() {
  const docs = [
    {
      name: 'Dr. med. Evrim Oehmichen FEBO',
      role: 'Fachärztin für Augenheilkunde',
      roleExtra: 'Fellow of the European Board of Ophthalmology',
      focus: 'Gründerin von Blickdoktor',
      initials: 'EO',
      tone: 'sage',
      href: '/Startseite/aerzte/dr-evrim-oehmichen/'
    },
    {
      name: 'Vincent Oehmichen FEBO',
      role: 'Augenarzt',
      roleExtra: 'Fellow of the European Board of Ophthalmology',
      focus: 'Augenheilkunde',
      initials: 'VO',
      tone: 'blue',
      href: '/Startseite/aerzte/dr-vincent-oehmichen/'
    },
  ];

  const toneBg = { sage: 'var(--bd-sage-100)', blue: 'var(--bd-blue-100)', clay: 'var(--bd-clay-100)' };
  const toneFg = { sage: 'var(--bd-sage-700)', blue: 'var(--bd-blue-800)', clay: 'var(--bd-clay-700)' };

  return (
    <section id="team" className="section section-bg-alt">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 48 }}>
          <span className="eyebrow">Unser Team</span>
          <h2>Approbierte Augenärzt:innen,<br/><span className="serif-italic" style={{ color: 'var(--bd-sage-700)' }}>die zuhören.</span></h2>
          <p>Alle behandelnden Ärzt:innen sind in Deutschland approbiert und mehrfach fachlich geprüft. Sie wählen Ihre:n Ärzt:in selbst aus.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 640, margin: '0 auto' }}>
          {docs.map(d => (
            <a
              key={d.name}
              href={d.href}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="card" style={{ padding: 20, borderColor: 'var(--bd-line)', height: '100%' }}>
                <div style={{
                  width: '100%', aspectRatio: '1/1', borderRadius: 'var(--r-md)',
                  background: toneBg[d.tone], color: toneFg[d.tone],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-serif)', fontSize: 56, letterSpacing: '-0.02em',
                  marginBottom: 16
                }}>{d.initials}</div>
                <h3 style={{ margin: '0 0 4px', fontSize: 17, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{d.name}</h3>
                <div className="meta" style={{ marginBottom: 4 }}>{d.role}</div>
                <div className="meta" style={{ marginBottom: 10, fontSize: 13 }}>{d.roleExtra}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {d.focus.split(', ').map(f => (
                    <span key={f} className="badge badge-line" style={{ fontSize: 11.5, padding: '4px 8px' }}>{f}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Doctors });
