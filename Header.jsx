/* global React, Icon, Button, Logo */

const ETERMIN_URL = 'https://www.etermin.net/blickdoktor';

function Header({ onBook }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = [
    { href: '#sprechstunde', label: 'Sprechstunde' },
    { href: '#wie',          label: 'Wie es funktioniert' },
    { href: '#team',         label: 'Team' },
    { href: '#preise',       label: 'Preise' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: (scrolled || menuOpen) ? 'rgba(246,242,235,0.96)' : 'transparent',
      backdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--bd-line-2)' : '1px solid transparent',
      transition: 'background 220ms, border-color 220ms'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <a href="#top" style={{ display: 'flex', textDecoration: 'none' }}><Logo height={28} /></a>

        {/* Desktop nav */}
        <nav className="header-nav-desktop" style={{ display: 'flex', gap: 32 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: 'var(--fg-2)', fontSize: 14.5, textDecoration: 'none', letterSpacing: '-0.005em'
            }}>{l.label}</a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="header-cta-desktop">
          <Button variant="primary" size="sm" as="a" href={ETERMIN_URL} target="_blank" rel="noopener" iconRight="arrow-right">
            Termin vereinbaren
          </Button>
        </div>

        {/* Mobile: CTA + Hamburger */}
        <div className="header-mobile-actions" style={{ display: 'none', gap: 8, alignItems: 'center' }}>
          <a href={ETERMIN_URL} target="_blank" rel="noopener" className="btn btn-primary btn-sm">
            Termin buchen
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            style={{
              background: 'transparent', border: '1px solid var(--bd-line)',
              borderRadius: 'var(--r-md)', padding: '8px', cursor: 'pointer',
              color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <nav className="header-mobile-menu" style={{
          padding: '8px 24px 24px',
          borderTop: '1px solid var(--bd-line)',
          background: 'rgba(246,242,235,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '14px 0',
                fontSize: 17, color: 'var(--fg-1)', textDecoration: 'none',
                borderBottom: '1px solid var(--bd-line)',
                letterSpacing: '-0.005em'
              }}
            >{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

Object.assign(window, { Header });
