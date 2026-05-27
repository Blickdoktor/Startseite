/* global React, Icon */

function Faq() {
  const items = [
    {
      q: 'Wie schnell bekomme ich einen Termin?',
      a: 'In der Regel werden Sie innerhalb weniger Minuten zurückgerufen. Für spätere Termine können Sie aus den verfügbaren Zeiten wählen.'
    },
    {
      q: 'Was kostet eine Sprechstunde?',
      a: 'Wir arbeiten mit transparenten Festpreisen von 29 € bis 89 € — je nach Anliegen. Den genauen Preis sehen Sie vor der Buchung. Die Sprechstunde ist eine Selbstzahler-Leistung.'
    },
    {
      q: 'Kann ich ein Rezept oder eine Krankschreibung bekommen?',
      a: 'Ja. Wenn medizinisch angezeigt, stellen wir Rezepte (auch E-Rezepte) und Arbeitsunfähigkeitsbescheinigungen für bis zu drei Tage aus.'
    },
    {
      q: 'Was, wenn mein Anliegen einen Notfall darstellt?',
      a: 'Bei akuten Sehverlusten, starken Schmerzen oder Verletzungen wenden Sie sich bitte sofort an die Notaufnahme oder rufen Sie die 112. Wir sind keine Notfallpraxis.'
    },
    {
      q: 'Welche Technik brauche ich?',
      a: 'Ein Telefon. Mehr nicht. Die Ärztin ruft Sie zur vereinbarten Zeit an — kein App-Download, keine Anmeldung, keine Kamera nötig.'
    },
    {
      q: 'Wie sicher sind meine Daten?',
      a: 'Alle Daten werden DSGVO-konform auf Servern in Deutschland verarbeitet. Telefonate laufen über eine geschützte Leitung.'
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section">
      <div className="container section-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }}>
        <div className="section-head" style={{ position: 'sticky', top: 96 }}>
          <span className="eyebrow">FAQ</span>
          <h2>Häufige Fragen.</h2>
          <p>Sie finden hier keine Antwort? Schreiben Sie uns an <a href="mailto:hallo@blickdoktor.de">hallo@blickdoktor.de</a>.</p>
        </div>
        <div style={{ borderTop: '1px solid var(--bd-line)' }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} style={{ borderBottom: '1px solid var(--bd-line)' }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', background: 'transparent', border: 0, padding: '22px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', color: 'var(--fg-1)', textAlign: 'left'
                }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 21, letterSpacing: '-0.01em' }}>{it.q}</span>
                  <span style={{
                    color: 'var(--fg-3)', transition: 'transform 220ms', flex: 'none',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)'
                  }}>
                    <Icon name="plus" size={22} />
                  </span>
                </button>
                <div style={{
                  display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 280ms cubic-bezier(0.2,0.6,0.2,1)'
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ margin: 0, padding: '0 0 22px', color: 'var(--fg-2)', maxWidth: 560, fontSize: 15.5 }}>{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Faq });
