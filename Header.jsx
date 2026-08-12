/* global React, Icon, Button, Logo */

function FlagDE({ size }) {
  size = size || 22;
  var h = Math.round(size * 15 / 22);
  return React.createElement('svg', { width: size, height: h, viewBox: '0 0 22 15', style: { borderRadius: 2, display: 'block', flexShrink: 0, overflow: 'hidden' } },
    React.createElement('rect', { width: 22, height: 5, fill: '#000' }),
    React.createElement('rect', { y: 5, width: 22, height: 5, fill: '#DD0000' }),
    React.createElement('rect', { y: 10, width: 22, height: 5, fill: '#FFCC00' })
  );
}
function FlagTR({ size }) {
  size = size || 22;
  var h = Math.round(size * 15 / 22);
  return React.createElement('svg', { width: size, height: h, viewBox: '0 0 30 20', style: { borderRadius: 2, display: 'block', flexShrink: 0, overflow: 'hidden' } },
    React.createElement('rect', { width: 30, height: 20, fill: '#E30A17' }),
    React.createElement('circle', { cx: 10, cy: 10, r: 5, fill: '#fff' }),
    React.createElement('circle', { cx: 11.5, cy: 10, r: 4, fill: '#E30A17' }),
    React.createElement('path', { d: 'M18,7.5 L18.6,9.2 L20.4,9.2 L18.9,10.3 L19.5,12 L18,10.9 L16.5,12 L17.1,10.3 L15.6,9.2 L17.4,9.2Z', fill: '#fff' })
  );
}
function FlagEN({ size }) {
  size = size || 22;
  var h = Math.round(size * 15 / 22);
  return React.createElement('svg', { width: size, height: h, viewBox: '0 0 60 30', style: { borderRadius: 2, display: 'block', flexShrink: 0, overflow: 'hidden' } },
    React.createElement('rect', { width: 60, height: 30, fill: '#012169' }),
    React.createElement('path', { d: 'M0,0 L60,30 M60,0 L0,30', stroke: '#fff', strokeWidth: 6, fill: 'none' }),
    React.createElement('path', { d: 'M0,0 L60,30 M60,0 L0,30', stroke: '#C8102E', strokeWidth: 2, fill: 'none' }),
    React.createElement('path', { d: 'M30,0 V30 M0,15 H60', stroke: '#fff', strokeWidth: 10, fill: 'none' }),
    React.createElement('path', { d: 'M30,0 V30 M0,15 H60', stroke: '#C8102E', strokeWidth: 6, fill: 'none' })
  );
}

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
    { href: '/Startseite/#sprechstunde', label: 'Sprechstunde' },
    { href: '/Startseite/#wie', label: 'Wie es funktioniert' },
    { href: '/Startseite/#team', label: 'Team' },
    { href: '/Startseite/#preise', label: 'Preise' },
    { href: '/Startseite/aerzte/dr-evrim-oehmichen/', label: 'Über uns' },
  ];

  var bg = (scrolled || menuOpen) ? 'rgba(246,242,235,0.97)' : 'transparent';
  var blur = (scrolled || menuOpen) ? 'blur(12px)' : 'none';
  var border = scrolled ? '1px solid var(--bd-line-2)' : '1px solid transparent';

  var langBarStyle = {
    background: 'transparent',
    borderBottom: '1px solid var(--bd-line)',
    padding: '8px 32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    fontSize: 13
  };
  var currentLangStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    color: 'var(--bd-blue-700)', fontWeight: 500,
    padding: '4px 10px', borderRadius: 'var(--r-md)',
    background: 'rgba(42,84,112,0.08)'
  };
  var otherLangStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    color: 'var(--fg-2)', textDecoration: 'none',
    padding: '4px 10px', borderRadius: 'var(--r-md)'
  };

  return (
    React.createElement(React.Fragment, null,
      React.createElement('header', {
        style: {
          position: 'sticky', top: 0, zIndex: 30,
          background: bg,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderBottom: border,
          transition: 'background 220ms, border-color 220ms'
        }
      },
        React.createElement('div', {
          className: 'container',
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }
        },
          React.createElement('a', { href: '/Startseite/', style: { display: 'flex', textDecoration: 'none' } },
            React.createElement(Logo, { height: 28 })
          ),
          !isMobile && React.createElement('nav', { style: { display: 'flex', gap: 28 } },
            links.map(function(l) {
              return React.createElement('a', {
                key: l.href, href: l.href,
                style: { color: 'var(--fg-2)', fontSize: 14.5, textDecoration: 'none', letterSpacing: '-0.005em' }
              }, l.label);
            })
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement(Button, {
              variant: 'primary', size: 'sm',
              onClick: function() { window.open('https://www.etermin.net/blickdoktor', '_blank'); },
              iconRight: 'arrow-right'
            }, 'Termin vereinbaren'),
            isMobile && React.createElement('button', {
              onClick: function() { setMenuOpen(!menuOpen); },
              'aria-label': 'Menu',
              style: { background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }
            },
              React.createElement('span', { style: { display: 'block', width: 22, height: 2, background: 'var(--fg-1)', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'transform 200ms' } }),
              React.createElement('span', { style: { display: 'block', width: 22, height: 2, background: 'var(--fg-1)', opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms' } }),
              React.createElement('span', { style: { display: 'block', width: 22, height: 2, background: 'var(--fg-1)', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'transform 200ms' } })
            )
          )
        ),
        isMobile && menuOpen && React.createElement('nav', {
          style: { padding: '8px 24px 20px', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--bd-line-2)' }
        },
          links.map(function(l) {
            return React.createElement('a', {
              key: l.href, href: l.href,
              onClick: function() { setMenuOpen(false); },
              style: { color: 'var(--fg-1)', fontSize: 16, textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid var(--bd-line-2)', letterSpacing: '-0.01em' }
            }, l.label);
          })
        )
      ),
      /* Language bar - identical to TR page style */
      React.createElement('div', { id: 'lang-bar', style: langBarStyle },
        React.createElement('span', { style: currentLangStyle },
          React.createElement(FlagDE, null), React.createElement('span', null, 'Deutsch')
        ),
        React.createElement('a', { href: '/Startseite/tr/', style: otherLangStyle },
          React.createElement(FlagTR, null), React.createElement('span', null, 'T\u00fcrk\u00e7e')
        ),
        React.createElement('a', { href: '/Startseite/en/', style: otherLangStyle },
          React.createElement(FlagEN, null), React.createElement('span', null, 'English')
        )
      )
    )
  );
}

Object.assign(window, { Header });
