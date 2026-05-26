/* global React, Icon, Button, Logo */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < breakpoint);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

function Header({ onBook }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route / resize to desktop */
  React.useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  /* Lock body scroll when menu is open */
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '#sprechstunde', label: 'Sprechstunde' },
    { href: '#wie',          label: 'Wie es funktioniert' },
    { href: '#team',         label: 'Team' },
    { href: '#preise',       label: 'Preise' },
  ];

  const navLinkStyle = {
    color: 'var(--fg-2)', fontSize: 14.5, textDecoration: 'none', letterSpacing: '-0.005em',
    minHeight: 44, display: 'inline-flex', alignItems: 'center',
  };

  const handleLinkClick = () => { if (isMobile) setMenuOpen(false); };

  /* Hamburger icon – three lines morphing to ✕ */
  const barBase = {
    display: 'block', width: 20, height: 2, borderRadius: 1,
    background: 'var(--fg-1)', transition: 'transform 250ms ease, opacity 200ms ease',
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: (scrolled || menuOpen) ? 'rgba(246,242,235,0.95)' : 'transparent',
      backdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--bd-line-2)' : '1px solid transparent',
      transition: 'background 220ms, border-color 220ms'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '14px 20px' : '20px 32px' }}>
        <a href="#top" style={{ display: 'flex', textDecoration: 'none' }}><Logo height={28} /></a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={navLinkStyle}>{l.label}</a>
            ))}
          </nav>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <div className="row-tight">
            <Button variant="primary" size="sm" onClick={onBook} iconRight="arrow-right">Termin vereinbaren</Button>
          </div>
        )}

        {/* Mobile hamburger button */}
        {isMobile && (
          <button
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 10,
              minWidth: 44, minHeight: 44, display: 'inline-flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            <span style={{ ...barBase, transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none' }} />
            <span style={{ ...barBase, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...barBase, transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none' }} />
          </button>
        )}
      </div>

      {/* Mobile slide-down menu */}
      {isMobile && (
        <nav style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? 400 : 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 300ms ease, opacity 200ms ease',
          borderTop: menuOpen ? '1px solid var(--bd-line-2)' : '1px solid transparent',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 20px 20px' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={handleLinkClick} style={{
                ...navLinkStyle,
                fontSize: 16, padding: '0 8px',
                borderRadius: 8,
              }}>{l.label}</a>
            ))}
            <div style={{ paddingTop: 8 }}>
              <Button variant="primary" size="sm" onClick={() => { handleLinkClick(); onBook && onBook(); }} iconRight="arrow-right" style={{ width: '100%' }}>Termin vereinbaren</Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

Object.assign(window, { Header, useIsMobile });
