/* global React, Icon, Button, Logo */

const ETERMIN_URL = 'https://www.etermin.net/blickdoktor';

function Footer({ onBook }) {
  return (
    <footer style={{ background: 'var(--bd-blue-900)', color: '#F6F2EB', paddingTop: 80, paddingBottom: 32 }}>
      <div className="container">
        {/* Final CTA */}
        <div className="footer-cta-grid" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, paddingBottom: 64,
          borderBottom: '1px solid rgba(246,242,235,0.12)'
        }}>
          <div>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 350, color: '#F6F2EB'
            }}>
              Bereit für die<br/>Sprechstunde?
            </h2>
          </div>
          <div className="stack-4" style={{ alignSelf: 'flex-end' }}>
            <p style={{ margin: 0, color: 'rgba(246,242,235,0.75)', fontSize: 16, maxWidth: 360 }}>
              In drei Minuten Symptome schildern, Termin wählen, behandelt werden.
            </p>
            <Button variant="on-dark" size="lg" as="a" href={ETERMIN_URL} target="_blank" rel="noopener" iconRight="arrow-right">
              Termin vereinbaren
            </Button>
          </div>
        </div>

        {/* Link columns */}
        <div className="footer-links-grid" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48,
          paddingTop: 56, paddingBottom: 56
        }}>
          <div>
            <Logo inverse height={26} />
            <p style={{ marginTop: 16, color: 'rgba(246,242,235,0.65)', fontSize: 14, maxWidth: 280, lineHeight: 1.55 }}>
              Blickdoktor GmbH — Digitale Augenheilkunde aus Hamburg. Approbierte Fachärzt:innen, online.
            </p>
          </div>
          <FooterCol title="Sprechstunde" links={[
            { label: 'Trockene Augen',     href: ETERMIN_URL },
            { label: 'Sehverschlechterung',href: ETERMIN_URL },
            { label: 'Rezeptverlängerung', href: ETERMIN_URL },
            { label: 'Zweitmeinung',       href: ETERMIN_URL },
            { label: 'Alle Leistungen',    href: ETERMIN_URL },
          ]} />
          <FooterCol title="Rechtliches" links={[
            { label: 'Datenschutzerklärung', href: '/Startseite/datenschutzerklaerung/' },
            { label: 'Impressum',            href: '/Startseite/impressum/' },
            { label: 'Kontakt',              href: 'mailto:hallo@blickdoktor.de' },
          ]} />
        </div>

        {/* Legal strip */}
        <div className="spread footer-legal" style={{
          paddingTop: 24, borderTop: '1px solid rgba(246,242,235,0.12)',
          flexWrap: 'wrap', gap: 16
        }}>
          <div className="row-tight" style={{ gap: 16, color: 'rgba(246,242,235,0.55)', fontSize: 13, flexWrap: 'wrap' }}>
            <span>© 2026 Blickdoktor GmbH</span>
            <span>·</span>
            <span>Server in Deutschland</span>
            <span>·</span>
            <span>DSGVO-konform</span>
          </div>
          <div className="row-tight" style={{ gap: 16, color: 'rgba(246,242,235,0.55)', fontSize: 13 }}>
            <a href="/Startseite/datenschutzerklaerung/" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutzerklärung</a>
            <a href="/Startseite/impressum/" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontSize: 12, fontWeight: 500, color: 'rgba(246,242,235,0.55)',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16
      }}>{title}</div>
      <ul className="stack-3">
        {links.map(l => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener' : undefined}
              style={{ color: 'rgba(246,242,235,0.85)', textDecoration: 'none', fontSize: 14.5 }}
            >{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { Footer });
