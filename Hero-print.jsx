/* global React, Icon, Button, Badge */

/* Hero — statische Print-Version: alle Punkte in der geordneten
   Augen-Silhouette, kein requestAnimationFrame, kein Sweep.        */

function Hero({ onBook }) {
  return (
    <section id="top" style={{ paddingTop: 32, paddingBottom: 80 }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
        gap: 64, alignItems: 'center'
      }}>
        <div className="stack-6">
          <Badge tone="sage" icon="shield-check">Approbierte Augenärzt:innen</Badge>
          <h1 className="display-l" style={{ margin: 0, fontSize: 64 }}>
            Augenarzt-Sprechstunde,<br/>
            <span className="serif-italic" style={{ color: 'var(--bd-blue-700)' }}>
              in wenigen Minuten.
            </span>
          </h1>
          <p className="lead" style={{ maxWidth: 480 }}>
            Schildern Sie kurz Ihre Beschwerden — eine Fachärztin ruft Sie an.
            Ohne Wartezimmer, ohne Anfahrt.
          </p>
          <div>
            <Button variant="primary" size="lg" iconRight="arrow-right">
              Termin vereinbaren
            </Button>
          </div>
          <div className="row" style={{ gap: 24, marginTop: 8 }}>
            <div className="row-tight" style={{ gap: 8 }}>
              <Icon name="star" size={16} style={{ color: 'var(--bd-clay-600)' }} />
              <span className="meta">
                <strong style={{ color: 'var(--fg-1)' }}>4,9</strong> · 2.140 Bewertungen
              </span>
            </div>
            <div className="row-tight" style={{ gap: 8 }}>
              <Icon name="clock" size={16} style={{ color: 'var(--bd-success)' }} />
              <span className="meta">Anruf in der Regel innerhalb von 30 Minuten</span>
            </div>
          </div>
        </div>

        <HeroIllustrationStatic />
      </div>
    </section>
  );
}

function HeroIllustrationStatic() {
  const dots = React.useMemo(() => {
    const arr = [];
    function almondPoint(p) {
      const a = p * Math.PI * 2;
      const x = 200 + 140 * Math.cos(a);
      const y = 200 + 60 * Math.sin(a) * (0.6 + 0.4 * Math.abs(Math.cos(a)));
      return [x, y];
    }
    const seeded = (i, k) => { const s = Math.sin(i * k) * 43758.5453; return s - Math.floor(s); };
    for (let i = 0; i < 64; i++) {
      let tx, ty;
      if (i < 44) {
        const [x, y] = almondPoint(i / 44); tx = x; ty = y;
      } else {
        const a = ((i - 44) / 20) * Math.PI * 2;
        tx = 200 + 40 * Math.cos(a); ty = 200 + 40 * Math.sin(a);
      }
      const r2 = seeded(i, 78.233);
      const r3 = seeded(i, 33.1);
      arr.push({ tx, ty, size: 2.2 + r2 * 0.8, clay: r3 > 0.86 });
    }
    return arr;
  }, []);

  return (
    <div style={{
      position: 'relative', aspectRatio: '4/5',
      borderRadius: 'var(--r-2xl)', overflow: 'hidden',
      background: 'var(--bd-sage-50)'
    }}>
      <svg viewBox="0 0 400 500"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
           xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" fill="#ECEFE8"/>
        {/* Faint almond outline */}
        <g transform="translate(0,50)" opacity="0.18">
          <path d="M70 200 C 140 130, 260 130, 330 200 C 260 270, 140 270, 70 200 Z"
                fill="none" stroke="#2A5470" strokeWidth="1"/>
        </g>
        {/* Dots in final ordered position */}
        <g transform="translate(0,50)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.tx} cy={d.ty} r={d.size}
                    fill={d.clay ? '#B97A5C' : '#2A5470'}/>
          ))}
        </g>
        {/* Iris / pupil */}
        <g transform="translate(0,50)">
          <circle cx="200" cy="200" r="14" fill="#2A5470"/>
          <circle cx="196" cy="196" r="3.5" fill="#F6F2EB"/>
        </g>
      </svg>

      {/* Floating card */}
      <div style={{
        position: 'absolute', left: 24, bottom: 24,
        background: 'rgba(246,242,235,0.96)',
        border: '1px solid var(--bd-line)', borderRadius: 'var(--r-lg)',
        padding: '14px 18px', maxWidth: 260
      }}>
        <div className="eyebrow" style={{ color: 'var(--bd-sage-700)', marginBottom: 6 }}>
          Nächster freier Anruf
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--bd-ink)', letterSpacing: '-0.01em' }}>
          In ca. 8 Minuten
        </div>
        <div className="meta" style={{ marginTop: 4 }}>Dr. med. Lena Vogt · Anruf</div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero });
