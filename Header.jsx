/* global React, Icon, Button, Logo */

function Header({ onBook }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#sprechstunde', label: 'Sprechstunde' },
    { href: '#wie', label: 'Wie es funktioniert' },
    { href: '#team', label: 'Team' },
    { href: '#preise', label: 'Preise' },
  ];

  const headerBg = scrolled || menuOpen
    ? 'rgba(246,242,235,0.97)'
    : 'transparent';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: headerBg,
      backdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--bd-line-2)' : '1px solid transparent',
      transition: 'background 220ms, border-color 220ms'
    }}>
      {/* Hauptleiste */}
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '16px 24px'
      }}>
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', textDecoration: 'none' }}>
          <Logo height={28} />
        </a>

        {/* Desktop-Navigation (ab ~700px sichtbar) */}
        <nav className="bd-nav-desktop" style={{ display: 'flex', gap: 28 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: 'var(--fg-2)', fontSize: 14.5,
              textDecoration: 'none', letterSpacing: '-0.005em'
            }}>{l.label}</a>
          ))}
        </nav>

        {/* Rechte Seite: CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* CTA immer sichtbar */}
          <Button variant="primary" size="sm" onClick={onBook} iconRight="arrow-right">
            Termin vereinbaren
          </Button>

          {/* Hamburger-Button: nur auf Mobile */}
          <button
            className="bd-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menü"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', display: 'none',
              flexDirection: 'column', gap: 5, alignItems: 'center'
            }}
          >
            <span style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--fg-1)',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              transition: 'transform 200ms'
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--fg-1)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 200ms'
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--fg-1)',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              transition: 'transform 200ms'
            }} />
          </button>
        </div>
      </div>

      {/* Mobile-Menü ausgeklappt */}
      {menuOpen && (
        <nav style={{
          padding: '8px 24px 20px',
          display: 'flex', flexDirection: 'column', gap: 0,
          borderTop: '1px solid var(--bd-line-2)'
        }}>
          {links.map(l => (
            
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--fg-1)', fontSize: 16,
                textDecoration: 'none', padding: '14px 0',
                borderBottom: '1px solid var(--bd-line-2)',
                letterSpacing: '-0.01em'
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}

      {/* CSS für Mobile/Desktop */}
      <style>{`
        @media (max-width: 699px) {
          .bd-nav-desktop { display: none !important; }
          .bd-hamburger { display: flex !important; }
        }
        @media (min-width: 700px) {
          .bd-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
}

Object.assign(window, { Header });
