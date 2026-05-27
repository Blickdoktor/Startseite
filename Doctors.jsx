/* global React, Icon, Badge */

function Doctors() {
  const docs = [
    {
      name: 'Dr. med. Evrim Oehmichen',
      role: 'Fachärztin für Augenheilkunde',
      credentials: 'FEBO — Fellow of European Board of Ophthalmology',
      img: 'https://static.wixstatic.com/media/4b69d1_1b75da51fa70446c8c054b3b46e910e4~mv2.jpg/v1/crop/x_0,y_0,w_591,h_860/fill/w_296,h_431,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/B379%20Tasci%204x6cm.jpg',
      href: '/Startseite/aerzte/dr-evrim-oehmichen/',
      tone: 'sage',
    },
    {
      name: 'Dr. med. Vincent Oehmichen',
      role: 'Facharzt für Augenheilkunde',
      credentials: null,
      img: null,
      href: '/Startseite/aerzte/dr-vincent-oehmichen/',
      tone: 'blue',
      initials: 'VO',
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
          <p>Alle behandelnden Ärzt:innen sind in Deutschland approbiert und mehrfach fachlich geprüft.</p>
        </div>
        <div className="doctors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 720 }}>
          {docs.map(d => (
            <a
              key={d.name}
              href={d.href}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card card-interactive" style={{ padding: 0, overflow: 'hidden', borderColor: 'var(--bd-line)' }}>
                {/* Photo or monogram */}
                <div style={{
                  width: '100%', aspectRatio: '3/4',
                  background: toneBg[d.tone],
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  {d.img ? (
                    <img
                      src={d.img}
                      alt={d.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-serif)', fontSize: 72, letterSpacing: '-0.02em',
                      color: toneFg[d.tone]
                    }}>{d.initials}</div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: '20px 24px' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: 18, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{d.name}</h3>
                  <div className="meta" style={{ marginBottom: d.credentials ? 6 : 0 }}>{d.role}</div>
                  {d.credentials && (
                    <div style={{ fontSize: 12.5, color: 'var(--fg-3)', lineHeight: 1.4 }}>{d.credentials}</div>
                  )}
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
