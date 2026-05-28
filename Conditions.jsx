/* global React, Icon, Button */

function Conditions({ onBook }) {
  const isMobile = useIsMobile();
  const items = [
    { icon: 'droplet',     title: 'Trockene Augen',         body: 'Brennen, Juckreiz, Fremdkörpergefühl — Beratung und Therapie.', price: '25,47 €' },
    { icon: 'glasses',     title: 'Sehverschlechterung',    body: 'Unscharfes Sehen, Doppelbilder oder neue Symptome.',           price: '25,47 €' },
    { icon: 'file-text',   title: 'Rezeptverlängerung',     body: 'Brillen- oder Kontaktlinsen-Rezept ohne Praxisbesuch.',         price: '25,47 €' },
    { icon: 'eye',         title: 'Bindehautentzündung',    body: 'Rote, juckende Augen — schnelle Einschätzung und Therapie.',    price: '25,47 €' },
    { icon: 'shield-alert',title: 'Zweitmeinung',           body: 'Fachärztliche Einschätzung zu einem bestehenden Befund.',       price: '25,47 €' },
    { icon: 'baby',        title: 'Kinder-Augenheilkunde',  body: 'Beratung zu Sehschwäche, Schielen, Vorsorge.',                  price: '25,47 €' },
  ];
  return (
    <section id="sprechstunde" className="section">
      <div className="container">
        <div className="spread" style={{ marginBottom: 48, alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 24 : 48, flexDirection: isMobile ? 'column' : 'row' }}>
          <div className="section-head">
            <span className="eyebrow">Sprechstunde</span>
            <h2>Wobei wir Ihnen helfen können.</h2>
            <p>Die häufigsten Anliegen unserer Patient:innen. Sie sind sich unsicher? Schildern Sie einfach Ihre Symptome — wir leiten Sie weiter.</p>
          </div>
          <Button variant="ghost" iconRight="arrow-right">Alle Leistungen</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {items.map(it => (
            <a key={it.title} href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" className="card card-interactive" style={{ display: 'block', textDecoration: 'none', color: 'inherit',
              textAlign: 'left', cursor: 'pointer', border: '1px solid var(--bd-line)'
            }}>
              <div className="spread" style={{ alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{
                  width: 40, height: 40, borderRadius: 'var(--r-md)',
                  background: 'var(--bd-sage-50)', color: 'var(--bd-sage-700)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon name={it.icon} size={20} />
                </span>
                <span className="meta" style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>{it.price}</span>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: 20 }}>{it.title}</h3>
              <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 14.5, lineHeight: 1.55 }}>{it.body}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

Object.assign(window, { Conditions });
