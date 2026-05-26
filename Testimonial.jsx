/* global React, Icon */

function Testimonial() {
  const isMobile = useIsMobile();
  return (
    <section className="section">
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <div className="row-tight" style={{ justifyContent: 'center', gap: 4, marginBottom: 24, color: 'var(--bd-clay-600)' }}>
          {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={18} />)}
        </div>
        <blockquote style={{
          margin: 0, fontFamily: 'var(--font-serif)', fontSize: isMobile ? 18 : 36, lineHeight: 1.2,
          letterSpacing: '-0.015em', color: 'var(--bd-ink)', fontWeight: 350
        }}>
          „Ich hatte abends ein gerötetes Auge — um halb neun hatte ich eine Ärztin am Bildschirm, um zehn das Rezept in der Apotheke. <span className="serif-italic" style={{ color: 'var(--bd-blue-700)' }}>So sollte Medizin sein.</span>"
        </blockquote>
        <div className="row-tight" style={{ justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999, background: 'var(--bd-clay-100)', color: 'var(--bd-clay-700)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 18
          }}>AS</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Anna S.</div>
            <div className="meta">Patientin · Berlin</div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Testimonial });
