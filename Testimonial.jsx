/* global React, Icon */

const TESTIMONIALS = [
  {
    text: "Super schnelle und kompetente Beratung! Meine Angst war unbegründet, den Weg in die Notfallklinik konnte ich mir sparen. Die Taxikosten wären teurer gewesen. Vielen Dank!",
    author: "Heike W.",
    initials: "HW"
  },
  {
    text: "An einem Sonntag auf Knopfdruck einen Termin erhalten und kurze Zeit später mit einer sehr netten Ärztin telefoniert. Die Verdachtsdiagnose hat eine Woche später der niedergelassene Augenarzt bestätigt. Vielen Dank!",
    author: "Konstantin F.",
    initials: "KF"
  },
  {
    text: "Ich war total ratlos, da ich keinen zeitnahen Termin in meiner Nähe bekommen habe und nicht wusste, was mit meinem Auge los war. Blickdoktor hat mir sofort geholfen. Ich konnte in der Apotheke eine entsprechende Salbe besorgen und meinem Auge ging es nach 3 Tagen wieder gut! Nur zu empfehlen!",
    author: "C. Müller",
    initials: "CM"
  },
  {
    text: "Innerhalb von 10 Minuten hat mich eine sehr nette und kompetente Ärztin kontaktiert! Dank Blickdoktor habe ich meine Augenproblematik ernst genommen und bin sofort in eine Notfallambulanz gefahren. Dort wurde die Diagnose Netzhautablösung bestätigt und ich konnte rechtzeitig operiert werden. Ohne Blickdoktor wäre ich nicht in die Klinik gefahren, sondern hätte erst noch abgewartet! Sind die 25€ total wert! Vielen Dank, kann ich nur jedem weiterempfehlen!",
    author: "Anonym",
    initials: "AN"
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

  const containerStyle = {
    background: 'var(--bd-teal-100, #b0d0d5)',
    padding: isMobile ? '48px 0' : '80px 0',
    position: 'relative',
    userSelect: 'none'
  };

  const cardStyle = {
    background: 'var(--bd-surface, #f0f4f5)',
    borderRadius: 4,
    padding: isMobile ? '32px 24px' : '48px 48px',
    maxWidth: 640,
    margin: '0 auto',
    minHeight: isMobile ? 220 : 260,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const quoteStyle = {
    fontFamily: 'var(--font-sans, sans-serif)',
    fontSize: isMobile ? 15 : 18,
    lineHeight: 1.6,
    color: 'var(--bd-ink, #1a1a2e)',
    margin: 0,
    fontWeight: 400
  };

  const authorStyle = {
    marginTop: 24,
    fontFamily: 'var(--font-sans, sans-serif)',
    fontSize: 14,
    color: 'var(--bd-ink, #1a1a2e)',
    fontWeight: 400
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--bd-ink, #1a1a2e)',
    fontSize: isMobile ? 18 : 22,
    padding: isMobile ? '8px 12px' : '8px 16px',
    opacity: 0.7,
    lineHeight: 1
  };

  const dotsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24
  };

  return (
    <section
      style={containerStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => { setPaused(false); }}
    >
      <button
        style={{ ...arrowStyle, left: isMobile ? 4 : 24 }}
        onClick={prev}
        aria-label="Vorherige Bewertung"
      >
        ←
      </button>

      <div style={{ padding: isMobile ? '0 44px' : '0 80px' }}>
        <div style={cardStyle}>
          <p style={quoteStyle}>{t.text}</p>
          <p style={authorStyle}>{t.author}</p>
        </div>
      </div>

      <button
        style={{ ...arrowStyle, right: isMobile ? 4 : 24 }}
        onClick={next}
        aria-label="Nächste Bewertung"
      >
        →
      </button>

      <div style={dotsStyle}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Bewertung ${i + 1}`}
            style={{
              width: 8, height: 8, borderRadius: 999,
              background: i === current ? 'var(--bd-ink, #1a1a2e)' : 'rgba(0,0,0,0.25)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'background 0.3s'
            }}
          />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Testimonial });
