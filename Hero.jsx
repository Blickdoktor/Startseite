/* global React, Icon, Button, Badge, Logo */

function Hero({ variant = 'A', onBook }) {
  if (variant === 'A') return <HeroSplit onBook={onBook} />;
  if (variant === 'B') return <HeroCentered onBook={onBook} />;
  return <HeroEditorial onBook={onBook} />;
}

/* ───────── Variant A — Split with illustration ───────── */
function HeroSplit({ onBook }) {
  return (
    <section id="top" style={{ paddingTop: 32, paddingBottom: 80 }}>
      <div className="container hero-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>
        <div className="stack-6">
          <Badge tone="sage" icon="shield-check">Approbierte Augenärzt:innen</Badge>
          <h1 className="display-l" style={{ margin: 0, fontSize: 'clamp(26px, 6vw, 64px)' }}>
            Augenarzt-Sprechstunde,<br/>
            <span className="serif-italic" style={{ color: 'var(--bd-blue-700)' }}>in wenigen Minuten.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 480 }}>
            Schildern Sie kurz Ihre Beschwerden — eine Fachärztin ruft Sie an. Ohne Wartezimmer, ohne Anfahrt.
          </p>
          <div className="row-tight" style={{ gap: 12, marginTop: 8 }}>
            <Button variant="primary" size="lg" as="a" href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" iconRight="arrow-right">Termin vereinbaren</Button>
            <Button variant="ghost" size="lg" as="a" href="#wie" icon="play">So funktioniert es</Button>
          </div>
          <div className="row" style={{ gap: 24, marginTop: 16 }}>
            <div className="row-tight" style={{ gap: 8 }}>
              <Icon name="star" size={16} style={{ color: 'var(--bd-clay-600)' }} />
              <span className="meta" style={{ color: 'var(--fg-2)' }}><strong style={{ color: 'var(--fg-1)' }}>4,9</strong> · 2.140 Bewertungen</span>
            </div>
            <div className="row-tight" style={{ gap: 8 }}>
              <Icon name="clock" size={16} style={{ color: 'var(--bd-success)' }} />
              <span className="meta">Anruf in der Regel innerhalb von 30 Minuten</span>
            </div>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div style={{ position: 'relative', aspectRatio: '6/5', borderRadius: 'var(--r-2xl)', overflow: 'hidden', background: 'var(--bd-sage-50)' }}>
      <SignalflowEye />
    </div>
  );
}

/* ───────── SignalflowEye ─────────
   „Augenlicht als Signalfluss": a cloud of points jitters chaotically,
   then a single clay-coloured impulse sweeps left→right and orders them
   into the silhouette of an eye. Symbolises Unsicherheit → schnelle
   fachliche Klarheit. Pure SVG + rAF. Marine + sage with a single clay
   accent — no rotation, no spring, motion stays inside the system's
   gentle-ease + ≤1.03 scale rules. */
function SignalflowEye() {
  const [t, setT] = React.useState(0);
  const LOOP_MS = 6400;

  React.useEffect(() => {
    let raf, start;
    function tick(now) {
      if (start == null) start = now;
      setT(((now - start) % LOOP_MS) / LOOP_MS);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Deterministic dot field. 44 dots ride the almond outline, 20 the iris ring.
  const dots = React.useMemo(() => {
    const arr = [];
    function almondPoint(p) {
      const a = p * Math.PI * 2;
      const x = 200 + 140 * Math.cos(a);
      const y = 200 + 60 * Math.sin(a) * (0.6 + 0.4 * Math.abs(Math.cos(a)));
      return [x, y];
    }
    const seeded = (i, k) => {
      const s = Math.sin(i * k) * 43758.5453;
      return s - Math.floor(s);
    };
    const N = 64;
    for (let i = 0; i < N; i++) {
      let tx, ty;
      if (i < 44) {
        const [x, y] = almondPoint(i / 44);
        tx = x; ty = y;
      } else {
        const a = ((i - 44) / 20) * Math.PI * 2;
        tx = 200 + 40 * Math.cos(a);
        ty = 200 + 40 * Math.sin(a);
      }
      const r1 = seeded(i, 12.9898);
      const r2 = seeded(i, 78.233);
      const r3 = seeded(i, 33.1);
      arr.push({
        tx, ty,
        cr: 14 + r1 * 26,     // chaos drift radius
        cp: r2 * Math.PI * 2, // chaos phase
        cs: 0.6 + r3 * 0.9,   // chaos speed
        delay: r1 * 0.10,     // cascade pickup
        size: 1.8 + r2 * 1.4,
        clay: r3 > 0.86,      // ~1 in 7 dots is a clay accent
      });
    }
    return arr;
  }, []);

  const sweepStart = 0.42;
  const sweepEnd   = 0.62;
  const holdEnd    = 0.92;

  let sweepX = -40;
  if (t >= sweepStart && t <= sweepEnd) {
    const k = (t - sweepStart) / (sweepEnd - sweepStart);
    sweepX = -40 + k * 480;
  }

  function dotPos(d) {
    const k = (t - sweepStart - d.delay) / (sweepEnd - sweepStart - d.delay);
    const ordered = Math.max(0, Math.min(1, k));
    const e = ordered < 0.5
      ? 2 * ordered * ordered
      : 1 - Math.pow(-2 * ordered + 2, 2) / 2;
    const angle = d.cp + t * d.cs * Math.PI * 2 * 2.4;
    const cx = d.tx + Math.cos(angle) * d.cr;
    const cy = d.ty + Math.sin(angle) * d.cr;
    return [cx + (d.tx - cx) * e, cy + (d.ty - cy) * e, e];
  }

  const reset = t > holdEnd ? (1 - (t - holdEnd) / (1 - holdEnd)) : 1;
  const outlineOpacity = Math.min(0.18, Math.max(0, (t - sweepStart) * 1.4)) * reset;
  const irisOpacity = Math.max(0, (t - 0.55) * 3) * reset;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Animierte Darstellung: aus verstreuten Lichtpunkten formt sich ein klar fokussiertes Auge."
      role="img"
    >
      <defs>
        <linearGradient id="bd-signalflow-sweep" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor="#B97A5C" stopOpacity="0"/>
          <stop offset="50%"  stopColor="#B97A5C" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#B97A5C" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Flat warm field — matches existing illustration background */}
      <rect width="400" height="500" fill="#ECEFE8"/>

      {/* Faint target almond outline appears as dots lock in */}
      <g transform="translate(0,50)" opacity={outlineOpacity}>
        <path
          d="M70 200 C 140 130, 260 130, 330 200 C 260 270, 140 270, 70 200 Z"
          fill="none" stroke="#2A5470" strokeWidth="1"
        />
      </g>

      {/* Sweep impulse — narrow vertical band of clay light */}
      {t >= sweepStart && t <= sweepEnd && (
        <g transform="translate(0,50)">
          <rect x={sweepX - 30} y="60" width="60" height="280"
                fill="url(#bd-signalflow-sweep)" opacity="0.7"/>
          <line x1={sweepX} y1="60" x2={sweepX} y2="340"
                stroke="#B97A5C" strokeWidth="0.8" opacity="0.55"/>
        </g>
      )}

      {/* Dots */}
      <g transform="translate(0,50)">
        {dots.map((d, i) => {
          const [x, y, ordered] = dotPos(d);
          const isClay = d.clay && ordered < 0.5;
          const color = isClay
            ? '#B97A5C'
            : (ordered > 0.4 ? '#2A5470' : '#7A8F7E');
          const o = (0.35 + 0.65 * ordered) * reset;
          return (
            <circle key={i} cx={x} cy={y} r={d.size + ordered * 0.6}
                    fill={color} opacity={o}/>
          );
        })}
      </g>

      {/* Iris pupil materialises after order */}
      <g transform="translate(0,50)" opacity={irisOpacity}>
        <circle cx="200" cy="200" r="14" fill="#2A5470"/>
        <circle cx="196" cy="196" r="3.5" fill="#F6F2EB" opacity="0.9"/>
      </g>
    </svg>
  );
}

/* ───────── Variant B — Centered editorial ───────── */
function HeroCentered({ onBook }) {
  return (
    <section id="top" style={{ paddingTop: 56, paddingBottom: 32, textAlign: 'center' }}>
      <div className="container-narrow stack-6" style={{ alignItems: 'center' }}>
        <Badge tone="sage" icon="shield-check">Approbierte Augenärzt:innen · DSGVO-konform</Badge>
        <h1 className="display-l" style={{ margin: 0, fontSize: 72, lineHeight: 1.02, textAlign: 'center' }}>
          Wieder klar sehen.<br/>
          <span className="serif-italic" style={{ color: 'var(--bd-blue-700)' }}>Ohne Wartezimmer.</span>
        </h1>
        <p className="lead" style={{ maxWidth: 540, textAlign: 'center' }}>
          Fachärztliche Beratung bei Augenproblemen — telefonisch, in wenigen Minuten, bequem von zu Hause aus.
        </p>
        <div className="row-tight" style={{ gap: 12 }}>
          <Button variant="primary" size="lg" as="a" href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" iconRight="arrow-right">Termin vereinbaren</Button>
          <Button variant="secondary" size="lg" as="a" href="#sprechstunde">Symptome prüfen</Button>
        </div>
        <div style={{ marginTop: 40, width: '100%', maxWidth: 820, position: 'relative', aspectRatio: '16/8', borderRadius: 'var(--r-2xl)', overflow: 'hidden', background: 'var(--bd-blue-50)' }}>
          <svg viewBox="0 0 800 400" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="400" fill="#ECF2F6"/>
            <path d="M220 200 C 280 110, 520 110, 580 200 C 520 290, 280 290, 220 200 Z" fill="none" stroke="#2A5470" strokeWidth="3"/>
            <circle cx="400" cy="200" r="56" fill="#2A5470"/>
            <circle cx="400" cy="200" r="18" fill="#F6F2EB"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ───────── Variant C — Asymmetric with metric strip ───────── */
function HeroEditorial({ onBook }) {
  return (
    <section id="top" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="container">
        <div className="row" style={{ alignItems: 'flex-start', gap: 48 }}>
          <div style={{ flex: '1 1 56%' }} className="stack-6">
            <div className="eyebrow" style={{ color: 'var(--bd-sage-700)' }}>Digitale Augenheilkunde · seit 2021</div>
            <h1 style={{
              margin: 0, fontSize: 88, lineHeight: 0.95, letterSpacing: '-0.03em',
              fontFamily: 'var(--font-serif)', fontWeight: 350
            }}>
              Schnell.<br/>Fachlich.<br/><span style={{ color: 'var(--bd-clay-600)' }}>Menschlich.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--fg-2)', maxWidth: 460, margin: 0, lineHeight: 1.55 }}>
              Wir sind ein Team aus Augenärzt:innen, das Sie online behandelt — mit der gleichen Sorgfalt wie in der Praxis.
            </p>
            <div className="row-tight" style={{ gap: 12 }}>
              <Button variant="primary" size="lg" as="a" href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" iconRight="arrow-right">Termin vereinbaren</Button>
              <Button variant="ghost" size="lg" as="a" href="#wie">Unser Vorgehen</Button>
            </div>
          </div>
          <div style={{ flex: '1 1 44%' }}>
            <div style={{ borderRadius: 'var(--r-2xl)', overflow: 'hidden', position: 'relative', aspectRatio: '3/4', background: 'var(--bd-clay-50)' }}>
              <svg viewBox="0 0 400 533" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="533" fill="#F6EBE0"/>
                <path d="M70 260 C 140 170, 260 170, 330 260 C 260 350, 140 350, 70 260 Z" fill="none" stroke="#8E5740" strokeWidth="3"/>
                <circle cx="200" cy="260" r="56" fill="#8E5740"/>
                <circle cx="200" cy="260" r="18" fill="#F6F2EB"/>
              </svg>
            </div>
          </div>
        </div>
        {/* Metric strip */}
        <div style={{
          marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          borderTop: '1px solid var(--bd-line)', borderBottom: '1px solid var(--bd-line)', paddingBlock: 32
        }}>
          {[
            ['Minuten', 'Antwortzeit — nicht Stunden'],
            ['12.400+', 'behandelte Patient:innen'],
            ['4,9/5', '2.140 Bewertungen'],
            ['25,47 €', 'transparente Festpreise'],
          ].map(([n, l], i) => (
            <div key={i} style={{
              padding: '0 24px',
              borderLeft: i ? '1px solid var(--bd-line)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 6
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, lineHeight: 1, color: 'var(--bd-ink)', letterSpacing: '-0.02em' }}>{n}</div>
              <div className="meta">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
