/* global React, Icon, Button, Logo */

function Header({ onBook }) {
  var scrolled = React.useState(false);
  var setScrolled = scrolled[1];
  scrolled = scrolled[0];

  var menuState = React.useState(false);
  var setMenuOpen = menuState[1];
  var menuOpen = menuState[0];

  var mobileState = React.useState(window.innerWidth < 700);
  var setIsMobile = mobileState[1];
  var isMobile = mobileState[0];

  React.useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 24); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  React.useEffect(function() {
    function onResize() { setIsMobile(window.innerWidth < 700); }
    window.addEventListener('resize', onResize);
    return function() { window.removeEventListener('resize', onResize); };
  }, []);

  var links = [
    { href: '#sprechstunde', label: 'Sprechstunde' },
    { href: '#wie', label: 'Wie es funktioniert' },
    { href: '#team', label: 'Team' },
    { href: '#preise', label: 'Preise' },
  ];

  var bg = (scrolled || menuOpen) ? 'rgba(246,242,235,0.97)' : 'transparent';
  var blur = (scrolled || menuOpen) ? 'blur(12px)' : 'none';
  var border = scrolled ? '1px solid var(--bd-line-2)' : '1px solid transparent';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: bg,
      backdropFilter: blur,
      WebkitBackdropFilter: blur,
      borderBottom: border,
      transition: 'background 220ms, border-color 220ms'
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '16px 24px'
      }}>

        <a href="#top" style={{ display: 'flex', textDecoration: 'none' }}>
          <Logo height={28} />
        </a>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: 28 }}>
            {links.map(function(l) {
              return (
                <a key={l.href} href={l.href} style={{
                  color: 'var(--fg-2)', fontSize: 14.5,
                  textDecoration: 'none', letterSpacing: '-0.005em'
                }}>{l.label}</a>
              );
            })}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button variant="primary" size="sm" onClick={onBook} iconRight="arrow-right">
            Termin vereinbaren
          </Button>

          {isMobile && (
            <button
              onClick={function() { setMenuOpen(!menuOpen); }}
              aria-label="Menu"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', display: 'flex',
                flexDirection: 'column', gap: '5px', alignItems: 'center'
              }}
            >
              <span style={{
                display: 'block', width: 22, height: 2, background: 'var(--fg-1)',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                transition: 'transform 200ms'
              }} />
              <span style={{
                display: 'block', width: 22, height: 2, background: 'var(--fg-1)',
                opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms'
              }} />
              <span style={{
                display: 'block', width: 22, height: 2, background: 'var(--fg-1)',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                transition: 'transform 200ms'
              }} />
            </button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <nav style={{
          padding: '8px 24px 20px', display: 'flex',
          flexDirection: 'column', borderTop: '1px solid var(--bd-line-2)'
        }}>
          {links.map(function(l) {
            return (
              <a key={l.href} href={l.href}
                onClick={function() { setMenuOpen(false); }}
                style={{
                  color: 'var(--fg-1)', fontSize: 16, textDecoration: 'none',
                  padding: '14px 0', borderBottom: '1px solid var(--bd-line-2)',
                  letterSpacing: '-0.01em'
                }}
              >{l.label}</a>
            );
          })}
        </nav>
      )}
    </header>
  );
}

Object.assign(window, { Header });
