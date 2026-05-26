/* global React, Icon, Button, Logo */

function Header({ onBook }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      background: scrolled ? 'rgba(246,242,235,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--bd-line-2)' : '1px solid transparent',
      transition: 'background 220ms, border-color 220ms'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px' }}>
        <a href="#top" style={{ display: 'flex', textDecoration: 'none' }}><Logo height={28} /></a>
        <nav style={{ display: 'flex', gap: 32 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: 'var(--fg-2)', fontSize: 14.5, textDecoration: 'none', letterSpacing: '-0.005em'
            }}>{l.label}</a>
          ))}
        </nav>
        <div className="row-tight">
          <Button variant="primary" size="sm" onClick={onBook} iconRight="arrow-right">Termin vereinbaren</Button>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Header });
