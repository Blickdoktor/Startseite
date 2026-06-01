/* global React, Icon, Button */

function HowItWorks({ onBook }) {
  const steps = [
    {
      n: '01', icon: 'pencil-line',
      title: 'Symptome schildern',
      body: 'Beantworten Sie in 3 Minuten ein paar Fragen zu Ihren Beschwerden. Bei Bedarf laden Sie ein Foto hoch.'
    },
    {
      n: '02', icon: 'calendar-check',
      title: 'Termin wählen',
      body: 'Suchen Sie einen passenden Termin aus - meist noch am selben Tag verfügbar.'
    },
    {
      n: '03', icon: 'phone-call',
      title: 'Anruf der Ärztin',
      body: 'Die Ärztin ruft Sie telefonisch zur gewählten Zeit an und bespricht Ihr Anliegen mit Ihnen.'
    },
    {
      n: '04', icon: 'file-text',
      title: 'Dokumentation und Abrechnung',
      body: 'Im Anschluss erhalten Sie eine ärztliche Bescheinigung und ggf. nach ärztlichem Ermessen ein Rezept. Ebenfalls erhalten Sie die Rechnung nach Gebührenordnung für Ärzte.'
    },
  ];

  return (
    <section id="wie" className="section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 56 }}>
          <span className="eyebrow">Wie es funktioniert</span>
          <h2>Vier Schritte zum Termin.</h2>
          <p>Ohne Anmeldung, ohne App-Download. Sie brauchen nur ein Smartphone oder einen Laptop mit Kamera.</p>
        </div>
        <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {steps.map((s, i) => (
            <div key={s.n} className="card" style={{ background: 'var(--bd-bg-2)', borderColor: 'transparent', boxShadow: 'none', padding: 32 }}>
              <div className="spread" style={{ marginBottom: 24, alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--bd-sage-700)',
                  letterSpacing: '0.04em'
                }}>{s.n}</span>
                <span style={{
                  width: 44, height: 44, borderRadius: 'var(--r-pill)',
                  background: 'var(--bd-blue-700)', color: '#F6F2EB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon name={s.icon} size={20} />
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: 22 }}>{s.title}</h3>
              <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 15 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Button variant="primary" size="lg" as="a" href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" iconRight="arrow-right">Jetzt Symptome schildern</Button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks });
