/* global React, lucide */
// Tiny shared primitives + icon helper
// (hooks accessed via React.* to avoid global name collisions across files)

// Lucide icon — renders the named icon as SVG using the global lucide.icons table.
function Icon({ name, size = 20, strokeWidth = 1.5, className = '', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const lib = window.lucide.icons || window.lucide;
    // newer lucide-static UMD exposes camelCase keys
    const camel = name.replace(/(^|-)([a-z])/g, (_, _d, c) => c.toUpperCase());
    const data = lib[camel] || lib[name];
    if (!data) return;
    // data is [tag, attrs, children]
    const [, attrs, children] = data;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    Object.entries({ ...attrs, width: size, height: size, 'stroke-width': strokeWidth }).forEach(([k, v]) => svg.setAttribute(k, v));
    (children || []).forEach(([tag, a]) => {
      const node = document.createElementNS(ns, tag);
      Object.entries(a).forEach(([k, v]) => node.setAttribute(k, v));
      svg.appendChild(node);
    });
    ref.current.appendChild(svg);
  }, [name, size, strokeWidth]);
  return <span ref={ref} className={`lucide-icon ${className}`} style={{ display: 'inline-flex', ...style }} />;
}

function Button({ as = 'button', variant = 'primary', size, icon, iconRight, children, className = '', ...rest }) {
  const Tag = as;
  const cls = ['btn', `btn-${variant}`, size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {icon && <Icon name={icon} size={18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={18} />}
    </Tag>
  );
}

function Badge({ tone = 'info', icon, children }) {
  const cls = tone === 'info' ? 'badge' : `badge badge-${tone}`;
  return <span className={cls}>{icon && <Icon name={icon} size={14} />}{children}</span>;
}

function Field({ label, hint, error, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
      {error ? <div className="meta" style={{ color: 'var(--bd-danger)' }}>{error}</div>
        : hint ? <div className="meta">{hint}</div> : null}
    </div>
  );
}

// Logo inlined as SVG — no external file dependency
function Logo({ inverse = false, height = 28 }) {
  const textColor = inverse ? '#F6F2EB' : '#16344C';
  const subColor = inverse ? 'rgba(246,242,235,0.65)' : '#5A6571';
  const strokeColor = inverse ? '#7AAFC8' : '#2A5470';
  const irisColor = inverse ? '#1A3A52' : '#F6F2EB';
  // Scale factor so the SVG fits the requested height (original viewBox height = 148)
  const scale = height / 148;
  const width = Math.round(575 * scale);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 575 148"
      width={width}
      height={height}
      role="img"
      aria-label="Blickdoktor"
      style={{ display: 'block' }}
    >
      <path d="M 8,65 C 28,20 118,20 140,65 C 118,110 28,110 8,65 Z" fill="none" stroke={strokeColor} strokeWidth="2.5" />
      <circle cx="74" cy="62" r="20" fill={strokeColor} />
      <circle cx="74" cy="62" r="7" fill={irisColor} />
      <circle cx="79.5" cy="57" r="3" fill={irisColor} opacity="0.8" />
      <line x1="156" y1="10" x2="156" y2="128" stroke={strokeColor} strokeWidth="1.8" />
      <text x="172" y="83" fontFamily="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="63" fontWeight="600" letterSpacing="-2" fill={textColor}>Blickdoktor</text>
      <text x="172" y="108" fontFamily="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="16" fontWeight="400" fill={subColor}>Online Augenarztpraxis</text>
      <text x="172" y="130" fontFamily="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="16" fontWeight="400" fill={subColor}>Dr. Oehmichen</text>
    </svg>
  );
}

function useIsMobile(bp = 768) {
  const [m, setM] = React.useState(() => window.innerWidth < bp);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => setM(e.matches);
    mq.addEventListener('change', h);
    setM(mq.matches);
    return () => mq.removeEventListener('change', h);
  }, [bp]);
  return m;
}

Object.assign(window, { Icon, Button, Badge, Field, Logo, useIsMobile });
