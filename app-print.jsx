/* global React, ReactDOM,
          Header, Hero, TrustStrip, HowItWorks, Conditions, Doctors,
          Testimonial, Pricing, Footer, Icon */

/* FAQ — print version: all answers visible, no accordion */
function FaqPrint() {
  const items = [
    { q: 'Wie schnell bekomme ich einen Termin?',
      a: 'In der Regel werden Sie innerhalb weniger Minuten zurückgerufen. Für spätere Termine können Sie aus den verfügbaren Zeiten wählen.' },
    { q: 'Was kostet eine Sprechstunde?',
      a: 'Wir arbeiten mit transparenten Festpreisen von 29 € bis 89 € — je nach Anliegen. Den genauen Preis sehen Sie vor der Buchung. Die Sprechstunde ist eine Selbstzahler-Leistung.' },
    { q: 'Kann ich ein Rezept oder eine Krankschreibung bekommen?',
      a: 'Ja. Wenn medizinisch angezeigt, stellen wir Rezepte (auch E-Rezepte) und Arbeitsunfähigkeitsbescheinigungen für bis zu drei Tage aus.' },
    { q: 'Was, wenn mein Anliegen einen Notfall darstellt?',
      a: 'Bei akuten Sehverlusten, starken Schmerzen oder Verletzungen wenden Sie sich bitte sofort an die Notaufnahme oder rufen Sie die 112. Wir sind keine Notfallpraxis.' },
    { q: 'Welche Technik brauche ich?',
      a: 'Ein Telefon. Mehr nicht. Die Ärztin ruft Sie zur vereinbarten Zeit an — kein App-Download, keine Anmeldung, keine Kamera nötig.' },
    { q: 'Wie sicher sind meine Daten?',
      a: 'Alle Daten werden DSGVO-konform auf Servern in Deutschland verarbeitet. Telefonate laufen über eine geschützte Leitung.' },
  ];
  return (
    <section className="section" style={{ breakBefore: 'page' }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1fr 1.4fr',
        gap: 64, alignItems: 'flex-start'
      }}>
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Häufige Fragen.</h2>
          <p>Weitere Fragen? Schreiben Sie uns:<br/><strong>hallo@blickdoktor.de</strong></p>
        </div>
        <div style={{ borderTop: '1px solid var(--bd-line)' }}>
          {items.map(it => (
            <div key={it.q} style={{
              borderBottom: '1px solid var(--bd-line)',
              padding: '20px 0', breakInside: 'avoid'
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 20,
                letterSpacing: '-0.01em', color: 'var(--bd-ink)', marginBottom: 8
              }}>{it.q}</div>
              <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.55 }}>{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const noop = () => {};
  return (
    <>
      <Header onBook={noop} />
      <main>
        <Hero onBook={noop} />
        <TrustStrip />
        <HowItWorks onBook={noop} />
        <Conditions onBook={noop} />
        <Doctors />
        <Testimonial />
        <Pricing onBook={noop} />
        <FaqPrint />
      </main>
      <Footer onBook={noop} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

/* Auto-print once fonts + React have settled */
document.fonts.ready.then(() => {
  setTimeout(() => window.print(), 1200);
});
