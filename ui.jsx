/* global React, lucide */
// Tiny shared primitives + icon helper

// (hooks accessed via React.* to avoid global name collisions across files)

// Lucide icon — renders the named icon as SVG using the global lucide.icons table.
function Icon({ name, size = 20, strokeWidth = 1.5, className = '', style, ariaLabel }) {
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
    // Accessibility: semantic icons get role="img" + aria-label, decorative ones get aria-hidden
    if (ariaLabel) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', ariaLabel);
    } else {
      svg.setAttribute('aria-hidden', 'true');
    }
    (children || []).forEach(([tag, a]) => {
      const node = document.createElementNS(ns, tag);
      Object.entries(a).forEach(([k, v]) => node.setAttribute(k, v));
      svg.appendChild(node);
    });
    ref.current.appendChild(svg);
  }, [name, size, strokeWidth, ariaLabel]);
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

function Logo({ inverse = false, height = 28 }) {
  const src = inverse ? '../../assets/logo-wordmark-inverse.svg' : '../../assets/logo-wordmark.svg';
  return <img src={src} alt="Blickdoktor" style={{ height, width: 'auto' }} />;
}

Object.assign(window, { Icon, Button, Badge, Field, Logo });
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

function Logo({ inverse = false, height = 28 }) {
  const src = inverse ? '../../assets/logo-wordmark-inverse.svg' : '../../assets/logo-wordmark.svg';
  return <img src={src} alt="Blickdoktor" style={{ height, width: 'auto' }} />;
}

Object.assign(window, { Icon, Button, Badge, Field, Logo });
