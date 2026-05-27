/* global React, Icon, Badge */

function Doctors() {
  const docs = [
    { name: 'Dr. med. Lena Vogt',     role: 'Fachärztin für Augenheilkunde',  focus: 'Trockene Augen, Glaukom', initials: 'LV', tone: 'sage' },
    { name: 'Dr. med. Jonas Albrecht',role: 'Facharzt für Augenheilkunde',    focus: 'Kontaktlinsen, Refraktion', initials: 'JA', tone: 'blue' },
    { name: 'Dr. med. Mira Hofer',    role: 'Fachärztin für Augenheilkunde',  focus: 'Pädiatrische Augenheilkunde', initials: 'MH', tone: 'clay' },
    { name: 'Dr. med. Yusuf Demir',   role: 'Facharzt für Augenheilkunde',    focus: 'Netzhaut, OP-Nachsorge', initials: 'YD', tone: 'blue' },
  ];
  const toneBg  = { sage: 'var(--bd-sage-100)',  blue: 'var(--bd-blue-100)',  clay: 'var(--bd-clay-100)' };
  const toneFg  = { sage: 'var(--bd-sage-700)',  blue: 'var(--bd-blue-800)',  clay: 'var(--bd-clay-700)' };
  return (
    <section id="team" className="section section-bg-alt">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 48 }}>
          <span className="eyebrow">Unser Team</span>
          <h2>Approbierte Augenärzt:innen,<br/><span className="serif-italic" style={{ color: 'var(--bd-sage-700)' }}>die zuhören.</span></h2>
          <p>Alle behandelnden Ärzt:innen sind in Deutschland approbiert und mehrfach fachlich geprüft. Sie wählen Ihre:n Ärzt:in selbst aus.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {docs.map(d => (
            <div key={d.name} className="card" style={{ padding: 20, borderColor: 'var(--bd-line)' }}>
              <div style={{
                width: '100%', aspectRatio: '1/1', borderRadius: 'var(--r-md)',
                background: toneBg[d.tone], color: toneFg[d.tone],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-serif)', fontSize: 56, letterSpacing: '-0.02em',
                marginBottom: 16
              }}>{d.initials}</div>
              <h3 style={{ margin: '0 0 4px', fontSize: 17, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{d.name}</h3>
              <div className="meta" style={{ marginBottom: 10 }}>{d.role}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {d.focus.split(', ').map(f => (
                  <span key={f} className="badge badge-line" style={{ fontSize: 11.5, padding: '4px 8px' }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Doctors });
