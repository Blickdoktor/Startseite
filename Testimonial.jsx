/* global React, Icon */

const TESTIMONIALS = [
  {
    text: "Super schnelle und kompetente Beratung! Meine Angst war unbegründet, den Weg in die Notfallklinik konnte ich mir sparen. Die Taxikosten wären teurer gewesen. Vielen Dank!",
    author: "Heike W.",
    initials: "HW",
    meta: "Patientin"
  },
  {
    text: "An einem Sonntag auf Knopfdruck einen Termin erhalten und kurze Zeit später mit einer sehr netten Ärztin telefoniert. Die Verdachtsdiagnose hat eine Woche später der niedergelassene Augenarzt bestätigt. Vielen Dank!",
    author: "Konstantin F.",
    initials: "KF",
    meta: "Patient"
  },
  {
    text: "Ich war total ratlos, da ich keinen zeitnahen Termin in meiner Nähe bekommen habe und nicht wusste, was mit meinem Auge los war. Blickdoktor hat mir sofort geholfen. Ich konnte in der Apotheke eine entsprechende Salbe besorgen und meinem Auge ging es nach 3 Tagen wieder gut! Nur zu empfehlen!",
    author: "C. Müller",
    initials: "CM",
    meta: "Patientin"
  },
  {
    text: "Innerhalb von 10 Minuten hat mich eine sehr nette und kompetente Ärztin kontaktiert! Dank Blickdoktor habe ich meine Augenproblematik ernst genommen und bin sofort in eine Notfallambulanz gefahren. Dort wurde die Diagnose Netzhautablösung bestätigt und ich konnte rechtzeitig operiert werden. Ohne Blickdoktor wäre ich nicht in die Klinik gefahren, sondern hätte erst noch abgewartet! Sind die 25€ total wert! Vielen Dank, kann ich nur jedem weiterempfehlen!",
    author: "Anonym",
    initials: "AN",
    meta: "Patient"
  }
];

function Testimonial() {
  const isMobile = typeof useIsMobile === 'function' ? useIsMobile() : false;
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = TESTIMONIALS.length;

  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  const t = TESTIMONIALS[current];

  return (
    <section
      className="section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative' }}
    >
      {/* Pfeil links */}
      <button
        onClick={prev}
        aria-label="Vorherige Bewertung"
        style={{
          position: 'absolute',
          left: isMobile ? 8 : 24,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--bd-ink)',
          fontSize: 20,
          opacity: 0.5,
          padding: '8px',
          lineHeight: 1,
          zIndex: 2
        }}
      >←</button>

      {/* Inhalt */}
      <div
        className="container-narrow"
        style={{ textAlign: 'center', padding: isMobile ? '0 44px' : '0 72px' }}
      >
        {/* Sterne */}
        <div className="row-tight" style={{ justifyContent: 'center', gap: 4, marginBottom: 24, color: 'var(--bd-clay-600)' }}>
          {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={18} />)}
        </div>

        {/* Quote */}
        <blockquote style={{
          margin: 0,
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile ? 18 : 36,
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          color: 'var(--bd-ink)',
          fontWeight: 350
        }}>
          „{t.text}"
        </blockquote>

        {/* Avatar + Name */}
        <div className="row-tight" style={{ justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: 'var(--bd-clay-100)',
            color: 'var(--bd-clay-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: 16,
            flexShrink: 0
          }}>
            {t.initials}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{t.author}</div>
            <div className="meta">{t.meta}</div>
          </div>
        </div>

        {/* Punkte */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Bewertung ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: i === current ? 'var(--bd-ink)' : 'var(--bd-ink-200, rgba(0,0,0,0.2))',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Pfeil rechts */}
      <button
        onClick={next}
        aria-label="Nächste Bewertung"
        style={{
          position: 'absolute',
          right: isMobile ? 8 : 24,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--bd-ink)',
          fontSize: 20,
          opacity: 0.5,
          padding: '8px',
          lineHeight: 1,
          zIndex: 2
        }}
      >→</button>
    </section>
  );
}

Object.assign(window, { Testimonial });
