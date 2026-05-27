/* global React, Icon, Button */

function Conditions({ onBook }) {
  const isMobile = useIsMobile();
  const items = [
    { icon: 'droplet',     title: 'Trockene Augen',         body: 'Brennen, Juckreiz, Fremdkörpergefühl — Beratung und Therapie.', price: 'ab 39 €' },
    { icon: 'glasses',     title: 'Sehverschlechterung',    body: 'Unscharfes Sehen, Doppelbilder oder neue Symptome.',           price: 'ab 49 €' },
    { icon: 'file-text',   title: 'Rezeptverlängerung',     body: 'Brillen- oder Kontaktlinsen-Rezept ohne Praxisbesuch.',         price: 'ab 29 €' },
    { icon: 'eye',         title: 'Bindehautentzündung',    body: 'Rote, juckende Augen — schnelle Einschätzung und Therapie.',    price: 'ab 39 €' },
    { icon: 'shield-alert',title: 'Zweitmeinung',           body: 'Fachärztliche Einschätzung zu einem bestehenden Befund.',       price: 'ab 89 €' },
    { icon: 'baby',        title: 'Kinder-Augenheilkunde',  body: 'Beratung zu Sehschwäche, Schielen, Vorsorge.',                  price: 'ab 49 €' },
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
            <button key={it.title} onClick={onBook} className="card card-interactive" style={{
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
            </button>
          ))}
        </div>
        <EmergencyNotice />
      </div>
    </section>
  );
}

function EmergencyNotice() {
  return (
    <div style={{
      marginTop: 32,
      display: 'flex', gap: 16, padding: '18px 22px',
      background: 'var(--bd-warning-bg)',
      border: '1px solid var(--bd-warning-border, transparent)',
      borderRadius: 'var(--r-lg)', alignItems: 'flex-start'
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: 999, flex: 'none',
        background: 'rgba(255,255,255,0.6)', color: 'var(--bd-warning)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon name="alert-triangle" size={18} />
      </span>
      <div className="stack-2" style={{ flex: 1 }}>
        <strong style={{ fontSize: 15.5, color: 'var(--bd-warning)', fontWeight: 600 }}>
          Notfall? Wir sind keine Notfallpraxis.
        </strong>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--bd-warning)', lineHeight: 1.55, maxWidth: 720 }}>
          Bei akutem Sehverlust, starken Schmerzen oder einer Verletzung wenden Sie sich bitte
          sofort an die <strong>112</strong> oder die nächste Augenklinik.
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { Conditions });
