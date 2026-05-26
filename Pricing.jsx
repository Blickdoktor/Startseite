/* global React, Icon, Button */

function Pricing({ onBook }) {
  const items = [
    { label: 'Rezeptverlängerung',     hint: 'Brille oder Kontaktlinsen',                price: '29 €' },
    { label: 'Trockene Augen',         hint: 'Beratung & Therapieempfehlung',            price: '39 €' },
    { label: 'Bindehautentzündung',    hint: 'Rote, juckende Augen',                     price: '39 €' },
    { label: 'Sehverschlechterung',    hint: 'Unscharfes Sehen, Doppelbilder',           price: '49 €' },
    { label: 'Kinder-Augenheilkunde',  hint: 'Sehschwäche, Schielen, Vorsorge',          price: '49 €' },
    { label: 'Anderes Anliegen',       hint: 'Beratung mit Fachärztin',                  price: '49 €' },
    { label: 'Zweitmeinung',           hint: 'Beurteilung eines bestehenden Befundes',   price: '89 €', strong: true },
  ];
  return (
    <section id="preise" className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'flex-start' }}>
        <div className="section-head" style={{ position: 'sticky', top: 96 }}>
          <span className="eyebrow">Preise</span>
          <h2>Transparent, ab 29 €.</h2>
          <p style={{ marginBottom: 24 }}>
            Feste Preise je Anliegen — keine Abrechnung über die Krankenkasse, keine versteckten Gebühren.
            Sie zahlen erst nach der Sprechstunde.
          </p>
          <div className="row-tight" style={{ gap: 12, marginBottom: 12 }}>
            <Icon name="check" size={16} style={{ color: 'var(--bd-sage-700)' }} />
            <span style={{ fontSize: 14.5, color: 'var(--fg-2)' }}>Kostenvoranschlag vor der Buchung</span>
          </div>
          <div className="row-tight" style={{ gap: 12, marginBottom: 12 }}>
            <Icon name="check" size={16} style={{ color: 'var(--bd-sage-700)' }} />
            <span style={{ fontSize: 14.5, color: 'var(--fg-2)' }}>Befund und ggf. Rezept noch am selben Tag</span>
          </div>
          <div className="row-tight" style={{ gap: 12, marginBottom: 24 }}>
            <Icon name="check" size={16} style={{ color: 'var(--bd-sage-700)' }} />
            <span style={{ fontSize: 14.5, color: 'var(--fg-2)' }}>Zahlung wird erst nach dem Anruf freigegeben</span>
          </div>
          <Button variant="primary" size="lg" onClick={onBook} iconRight="arrow-right">Termin vereinbaren</Button>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--bd-line)' }}>
          <div style={{
            padding: '18px 28px', borderBottom: '1px solid var(--bd-line)',
            background: 'var(--bd-bg-2)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
          }}>
            <span className="eyebrow" style={{ color: 'var(--bd-sage-700)' }}>Sprechstunden-Preise</span>
            <span className="meta" style={{ fontFamily: 'var(--font-mono)' }}>Selbstzahler · inkl. MwSt.</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {items.map((it, i) => (
              <li key={it.label} style={{
                display: 'grid', gridTemplateColumns: '1fr auto',
                alignItems: 'center', gap: 16,
                padding: '20px 28px',
                borderTop: i ? '1px solid var(--bd-line)' : 'none',
                background: it.strong ? 'var(--bd-sage-50)' : 'transparent'
              }}>
                <div className="stack-2">
                  <span style={{ fontSize: 16, color: 'var(--bd-ink)', fontWeight: 500 }}>{it.label}</span>
                  <span className="meta">{it.hint}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 24, letterSpacing: '-0.01em',
                  color: 'var(--bd-ink)'
                }}>{it.price}</span>
              </li>
            ))}
          </ul>
          <div style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--bd-line)',
            background: 'var(--bd-bg-2)',
            fontSize: 13.5, color: 'var(--fg-3)'
          }}>
            Rezept (E-Rezept) und Krankschreibung bis 3 Tage sind im Preis enthalten, sofern medizinisch angezeigt.
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pricing });
