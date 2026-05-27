/* global React, Icon, Button */

function Conditions({ onBook }) {
  const items = [
    { icon: 'droplet',     title: 'Trockene Augen',         body: 'Brennen, Juckreiz, Fremdkörpergefühl — Beratung und Therapie.' },
    { icon: 'glasses',     title: 'Sehverschlechterung',    body: 'Unscharfes Sehen, Doppelbilder oder neue Symptome.'           },
    { icon: 'file-text',   title: 'Rezeptverlängerung',     body: 'Brillen- oder Kontaktlinsen-Rezept ohne Praxisbesuch.'         },
    { icon: 'eye',         title: 'Bindehautentzündung',    body: 'Rote, juckende Augen — schnelle Einschätzung und Therapie.'    },
    { icon: 'shield-alert',title: 'Zweitmeinung',           body: 'Fachärztliche Einschätzung zu einem bestehenden Befund.'       },
    { icon: 'baby',        title: 'Kinder-Augenheilkunde',  body: 'Beratung zu Sehschwäche, Schielen, Vorsorge.'                  },
  ];
  return (
    <section id="sprechstunde" className="section">
      <div className="container">
        <div className="spread" style={{ marginBottom: 48, alignItems: 'flex-end', gap: 48 }}>
          <div className="section-head">
            <span className="eyebrow">Sprechstunde</span>
            <h2>Wobei wir Ihnen helfen können.</h2>
            <p>Die häufigsten Anliegen unserer Patient:innen. Sie sind sich unsicher? Schildern Sie einfach Ihre Symptome — wir leiten Sie weiter.</p>
          </div>
          <Button variant="ghost" as="a" href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" iconRight="arrow-right">Termin buchen</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="conditions-grid">
          {items.map(it => (
            <a key={it.title} href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener"
               className="card card-interactive"
               style={{ textAlign: 'left', border: '1px solid var(--bd-line)', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  width: 40, height: 40, borderRadius: 'var(--r-md)',
                  background: 'var(--bd-sage-50)', color: 'var(--bd-sage-700)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon name={it.icon} size={20} />
                </span>
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
