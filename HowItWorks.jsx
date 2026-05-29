/* global React, Icon, Button */

function HowItWorks({ onBook }) {
  const steps = [
    {
      n: '01', icon: 'pencil-line',
      title: 'Symptome schildern',
      body: 'Beschreiben Sie Ihre Beschwerden in wenigen Minuten und laden Sie ein Foto Ihres Auges hoch, damit die Ärztin Ihre Situation besser einschätzen kann.'
    },
    {
      n: '02', icon: 'calendar-check',
      title: 'Termin wählen',
      body: 'Suchen Sie einen passenden Termin aus — meist noch am selben Tag verfügbar.'
    },
    {
      n: '03', icon: 'phone-call',
      title: 'Anruf der Ärztin',
      body: 'Die Ärztin ruft Sie telefonisch zur gewählten Zeit an. Im Anschluss erhalten Sie eine Dokumentation und ggf. nach ärztlichem Ermessen ein Rezept.'
    },
  ];

  return (
    <section id="wie" className="section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 56 }}>
          <span className="eyebrow">Wie es funktioniert</span>
          <h2>Drei Schritte zum Termin.</h2>
          <p>Ohne Anmeldung, ohne App-Download. Sie brauchen nur ein Smartphone oder einen Laptop mit Kamera.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
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
