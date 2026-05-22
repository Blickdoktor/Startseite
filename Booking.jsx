/* global React, Icon, Button, Badge, Field */

/*
  Booking flow — 3 layout variants share the same 4-step inner flow.
  - 'modal'      : centered card overlay
  - 'drawer'     : right-aligned drawer
  - 'fullscreen' : takes over the viewport (calmer, single column)
*/

function BookingFlow({ open, variant = 'modal', onClose }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ symptom: null, slot: null });

  React.useEffect(() => {
    if (open) { setStep(0); setData({ symptom: null, slot: null }); }
  }, [open]);

  if (!open) return null;

  const inner = (
    <BookingInner
      variant={variant}
      step={step} setStep={setStep}
      data={data} setData={setData}
      onClose={onClose}
    />
  );

  if (variant === 'fullscreen') {
    return <div className="fullscreen-take">{inner}</div>;
  }
  if (variant === 'drawer') {
    return (
      <>
        <div className="drawer-overlay" onClick={onClose} />
        <aside className="drawer">{inner}</aside>
      </>
    );
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>{inner}</div>
    </div>
  );
}

function BookingInner({ variant, step, setStep, data, setData, onClose }) {
  const steps = ['Anliegen', 'Termin', 'Daten', 'Bezahlung', 'Bestätigt'];
  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const wide = variant === 'fullscreen';
  const padding = wide ? '40px 64px' : '28px 28px 32px';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: variant === 'fullscreen' ? '100vh' : 'auto' }}>
      {/* Header */}
      <header style={{
        padding: wide ? '24px 64px' : '20px 28px',
        borderBottom: '1px solid var(--bd-line)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bd-bg)'
      }}>
        <div className="row-tight" style={{ gap: 10 }}>
          <Icon name="eye" size={20} style={{ color: 'var(--bd-blue-700)' }} />
          <strong style={{ fontSize: 15, color: 'var(--bd-ink)' }}>Sprechstunde buchen</strong>
        </div>
        <button onClick={onClose} aria-label="Schließen" style={{
          background: 'transparent', border: 0, color: 'var(--fg-3)', padding: 4, cursor: 'pointer'
        }}>
          <Icon name="x" size={20} />
        </button>
      </header>

      {/* Progress */}
      <div style={{
        padding: wide ? '24px 64px 0' : '20px 28px 0',
        display: 'flex', gap: 6, alignItems: 'center'
      }}>
        {steps.map((label, i) => (
          <React.Fragment key={label}>
            <div className="row-tight" style={{ gap: 8, opacity: i <= step ? 1 : 0.45 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 999,
                background: i < step ? 'var(--bd-blue-700)' : i === step ? 'var(--bd-blue-700)' : 'var(--bd-line)',
                color: i <= step ? '#F6F2EB' : 'var(--fg-3)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: 'var(--font-mono)'
              }}>
                {i < step ? <Icon name="check" size={12} /> : i + 1}
              </span>
              <span style={{ fontSize: 12.5, color: i === step ? 'var(--bd-ink)' : 'var(--fg-3)' }}>{label}</span>
            </div>
            {i < steps.length - 1 && <span style={{ flex: 1, height: 1, background: 'var(--bd-line)' }} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step body */}
      <div style={{
        padding, flex: 1,
        maxWidth: wide ? 720 : '100%', margin: wide ? '0 auto' : 0, width: '100%'
      }}>
        {step === 0 && <StepSymptom data={data} setData={setData} />}
        {step === 1 && <StepSlot data={data} setData={setData} />}
        {step === 2 && <StepDetails />}
        {step === 3 && <StepPayment data={data} setData={setData} />}
        {step === 4 && <StepDone data={data} />}
      </div>

      {/* Footer */}
      {step < 4 && (
        <footer style={{
          padding: wide ? '24px 64px' : '20px 28px',
          borderTop: '1px solid var(--bd-line)',
          display: 'flex', justifyContent: 'space-between', gap: 12,
          background: 'var(--bd-bg)'
        }}>
          <Button variant="ghost" onClick={step === 0 ? onClose : back}>
            {step === 0 ? 'Abbrechen' : 'Zurück'}
          </Button>
          <Button variant="primary" onClick={next}
                  disabled={(step === 0 && !data.symptom) || (step === 1 && !data.slot)}
                  iconRight="arrow-right">
            {step === 3 ? 'Jetzt bezahlen' : step === 2 ? 'Weiter zur Bezahlung' : 'Weiter'}
          </Button>
        </footer>
      )}
    </div>
  );
}

/* ── Step 0 — Symptom ─────────────────────────── */
function StepSymptom({ data, setData }) {
  const symptoms = [
    { id: 'dry',       label: 'Trockene Augen',       icon: 'droplet' },
    { id: 'blurred',   label: 'Verschwommen sehen',   icon: 'glasses' },
    { id: 'redness',   label: 'Rote, juckende Augen', icon: 'eye' },
    { id: 'rx',        label: 'Rezeptverlängerung',   icon: 'file-text' },
    { id: 'second',    label: 'Zweitmeinung',         icon: 'shield-alert' },
    { id: 'other',     label: 'Anderes Anliegen',     icon: 'more-horizontal' },
  ];
  return (
    <div className="stack-6">
      <div>
        <h2 style={{ margin: 0, fontSize: 24, fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>Was beschäftigt Sie?</h2>
        <p style={{ margin: '6px 0 0', color: 'var(--fg-2)', fontSize: 14.5 }}>Wählen Sie das passende Anliegen. Sie können später noch Details ergänzen.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {symptoms.map(s => {
          const active = data.symptom === s.id;
          return (
            <button key={s.id} onClick={() => setData({ ...data, symptom: s.id })} style={{
              padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
              background: active ? 'var(--bd-blue-50)' : 'var(--bd-surface)',
              border: `1px solid ${active ? 'var(--bd-blue-700)' : 'var(--bd-line)'}`,
              borderRadius: 'var(--r-md)',
              display: 'flex', alignItems: 'center', gap: 12,
              transition: 'background 220ms, border-color 220ms'
            }}>
              <Icon name={s.icon} size={20} style={{ color: active ? 'var(--bd-blue-700)' : 'var(--fg-3)' }} />
              <span style={{ fontSize: 14, color: 'var(--fg-1)', fontWeight: active ? 500 : 400 }}>{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 1 — Slot ─────────────────────────────── */
function StepSlot({ data, setData }) {
  const days = [
    { date: '14.05.', day: 'Heute',   slots: ['14:30', '15:00', '16:30', '18:00'] },
    { date: '15.05.', day: 'Morgen',  slots: ['09:00', '10:30', '13:00', '14:30', '17:00'] },
    { date: '16.05.', day: 'Sa',      slots: ['10:00', '11:30'] },
    { date: '19.05.', day: 'Mo',      slots: ['08:30', '09:00', '11:00', '14:00', '15:30'] },
  ];
  return (
    <div className="stack-6">
      <div>
        <h2 style={{ margin: 0, fontSize: 24, fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>Wann passt es Ihnen?</h2>
        <p style={{ margin: '6px 0 0', color: 'var(--fg-2)', fontSize: 14.5 }}>Verfügbare Anruf-Termine bei Dr. med. Lena Vogt — ca. 15 Minuten.</p>
      </div>
      {/* "Sofort" option */}
      <button onClick={() => setData({ ...data, slot: 'sofort' })} style={{
        textAlign: 'left', cursor: 'pointer', padding: '16px 18px',
        background: data.slot === 'sofort' ? 'var(--bd-blue-700)' : 'var(--bd-blue-50)',
        color: data.slot === 'sofort' ? '#F6F2EB' : 'var(--bd-blue-800)',
        border: '1px solid ' + (data.slot === 'sofort' ? 'var(--bd-blue-700)' : 'var(--bd-blue-100)'),
        borderRadius: 'var(--r-md)',
        display: 'flex', alignItems: 'center', gap: 14,
        transition: 'background 220ms, color 220ms'
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 999, flex: 'none',
          background: data.slot === 'sofort' ? 'rgba(246,242,235,0.15)' : 'var(--bd-blue-100)',
          color: data.slot === 'sofort' ? '#F6F2EB' : 'var(--bd-blue-700)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="phone-call" size={18} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <strong style={{ fontSize: 15 }}>Sofort — in wenigen Minuten</strong>
          <span style={{ fontSize: 13, opacity: 0.85 }}>Die nächste verfügbare Ärztin ruft Sie an. Ca. 8 Min. Wartezeit.</span>
        </span>
      </button>
      <div className="row-tight" style={{ gap: 12, color: 'var(--fg-3)' }}>
        <span style={{ flex: 1, height: 1, background: 'var(--bd-line)' }} />
        <span className="meta">oder Termin wählen</span>
        <span style={{ flex: 1, height: 1, background: 'var(--bd-line)' }} />
      </div>
      <div className="stack-4">
        {days.map(d => (
          <div key={d.date}>
            <div className="row-tight" style={{ gap: 10, marginBottom: 10 }}>
              <strong style={{ fontSize: 13, color: 'var(--fg-1)' }}>{d.day}</strong>
              <span className="meta">{d.date}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {d.slots.map(s => {
                const id = `${d.date}-${s}`;
                const active = data.slot === id;
                return (
                  <button key={id} onClick={() => setData({ ...data, slot: id })} style={{
                    padding: '10px 14px', fontSize: 14, fontFamily: 'var(--font-mono)',
                    background: active ? 'var(--bd-blue-700)' : 'var(--bd-surface)',
                    color: active ? '#F6F2EB' : 'var(--fg-1)',
                    border: `1px solid ${active ? 'var(--bd-blue-700)' : 'var(--bd-line)'}`,
                    borderRadius: 'var(--r-md)', cursor: 'pointer',
                    transition: 'background 220ms, color 220ms'
                  }}>{s}</button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2 — Details ─────────────────────────── */
function StepDetails() {
  return (
    <div className="stack-6">
      <div>
        <h2 style={{ margin: 0, fontSize: 24, fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>Ihre Angaben</h2>
        <p style={{ margin: '6px 0 0', color: 'var(--fg-2)', fontSize: 14.5 }}>Damit die Ärztin sich auf die Sprechstunde vorbereiten kann.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Vorname"><input className="input" placeholder="Anna" /></Field>
        <Field label="Nachname"><input className="input" placeholder="Schmidt" /></Field>
        <Field label="Geburtsdatum"><input className="input" placeholder="TT.MM.JJJJ" /></Field>
        <Field label="Telefonnummer"><input className="input" placeholder="+49 …" /></Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="E-Mail-Adresse" hint="Wir senden die Bestätigung an diese Adresse.">
            <input className="input" placeholder="ihre.mail@beispiel.de" />
          </Field>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Beschreiben Sie kurz Ihre Beschwerden">
            <textarea className="textarea" rows="3" placeholder="Seit wann? Was hilft, was verschlimmert? …" />
          </Field>
        </div>
      </div>
      <label className="row-tight" style={{ gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
        <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
        <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>
          Ich stimme der Verarbeitung meiner Gesundheitsdaten gemäß <a href="#">Datenschutzerklärung</a> zu.
        </span>
      </label>
    </div>
  );
}

/* ── Step 3 — Payment ─────────────────────────── */
function StepPayment({ data, setData }) {
  const method = data.payMethod || 'card';
  const price = priceForSymptom(data.symptom);
  const slotLabel = data.slot === 'sofort'
    ? 'Sofort · in wenigen Minuten'
    : data.slot ? data.slot.replace('-', ' · ') : 'Heute · 14:30';
  return (
    <div className="stack-6">
      <div>
        <h2 style={{ margin: 0, fontSize: 24, fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>Bezahlung</h2>
        <p style={{ margin: '6px 0 0', color: 'var(--fg-2)', fontSize: 14.5 }}>Erst nach erfolgreicher Sprechstunde wird Ihre Zahlung freigegeben — Sie tragen kein Risiko.</p>
      </div>

      {/* Order summary */}
      <div style={{
        background: 'var(--bd-bg-2)', borderRadius: 'var(--r-md)', padding: 16,
        display: 'flex', flexDirection: 'column', gap: 8
      }}>
        <div className="spread" style={{ alignItems: 'flex-start' }}>
          <div className="stack-2">
            <div style={{ fontSize: 14.5, fontWeight: 500 }}>Telefonische Sprechstunde</div>
            <div className="meta">{symptomLabel(data.symptom)} · Dr. med. Lena Vogt</div>
            <div className="meta">{slotLabel}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, letterSpacing: '-0.01em', color: 'var(--bd-ink)' }}>{price} €</div>
        </div>
      </div>

      {/* Payment method tabs */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 8 }}>Zahlungsart</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { id: 'card',  icon: 'credit-card', label: 'Karte' },
            { id: 'sepa',  icon: 'building-2',  label: 'SEPA' },
            { id: 'apple', icon: 'apple',       label: 'Apple Pay' },
          ].map(m => {
            const active = method === m.id;
            return (
              <button key={m.id} onClick={() => setData({ ...data, payMethod: m.id })} style={{
                padding: '12px 10px', cursor: 'pointer',
                background: active ? 'var(--bd-blue-50)' : 'var(--bd-surface)',
                border: '1px solid ' + (active ? 'var(--bd-blue-700)' : 'var(--bd-line)'),
                borderRadius: 'var(--r-md)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                color: active ? 'var(--bd-blue-800)' : 'var(--fg-2)',
                fontSize: 13, fontWeight: active ? 500 : 400
              }}>
                <Icon name={m.icon} size={20} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card form */}
      {method === 'card' && (
        <div className="stack-4">
          <Field label="Karteninhaber:in"><input className="input" placeholder="Anna Schmidt" /></Field>
          <Field label="Kartennummer"><input className="input" placeholder="4242 4242 4242 4242" /></Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Ablauf (MM/JJ)"><input className="input" placeholder="04/29" /></Field>
            <Field label="CVC"><input className="input" placeholder="123" /></Field>
          </div>
        </div>
      )}
      {method === 'sepa' && (
        <div className="stack-4">
          <Field label="Kontoinhaber:in"><input className="input" placeholder="Anna Schmidt" /></Field>
          <Field label="IBAN" hint="Wir buchen 1,00 € zur Verifizierung ab und erstatten umgehend."><input className="input" placeholder="DE __ ____ ____ ____ ____ __" /></Field>
        </div>
      )}
      {method === 'apple' && (
        <div style={{
          padding: 18, borderRadius: 'var(--r-md)',
          background: 'var(--bd-bg-2)', textAlign: 'center'
        }}>
          <Icon name="apple" size={28} style={{ color: 'var(--bd-ink)' }} />
          <p style={{ margin: '8px 0 0', fontSize: 13.5, color: 'var(--fg-2)' }}>
            Sie schließen die Zahlung mit Apple Pay auf dem nächsten Schritt ab.
          </p>
        </div>
      )}

      {/* Trust + AGB */}
      <div className="row-tight" style={{ gap: 8, color: 'var(--fg-3)', fontSize: 12.5 }}>
        <Icon name="lock" size={14} />
        <span>Zahlung über Stripe · 256-Bit-Verschlüsselung · keine Speicherung der Kartendaten</span>
      </div>
    </div>
  );
}

function priceForSymptom(id) {
  return { dry: 39, blurred: 49, redness: 39, rx: 29, second: 89, other: 49 }[id] || 49;
}
function symptomLabel(id) {
  return {
    dry: 'Trockene Augen', blurred: 'Verschwommen sehen', redness: 'Rote, juckende Augen',
    rx: 'Rezeptverlängerung', second: 'Zweitmeinung', other: 'Anderes Anliegen'
  }[id] || 'Sprechstunde';
}

/* ── Step 4 — Done ─────────────────────────────── */
function StepDone({ data }) {
  const slotLabel = data.slot === 'sofort'
    ? 'In wenigen Minuten'
    : data.slot ? data.slot.replace('-', ' · ') : 'Heute, 14:30 Uhr';
  const price = priceForSymptom(data.symptom);
  return (
    <div className="stack-6" style={{ alignItems: 'center', textAlign: 'center', paddingTop: 16, paddingBottom: 24 }}>
      <span style={{
        width: 64, height: 64, borderRadius: 999, background: 'var(--bd-success-bg)', color: 'var(--bd-success)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon name="phone-incoming" size={28} strokeWidth={2} />
      </span>
      <div className="stack-3" style={{ alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 28, fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>Bestätigt — wir rufen Sie an.</h2>
        <p style={{ margin: 0, color: 'var(--fg-2)', maxWidth: 400 }}>
          {data.slot === 'sofort'
            ? 'Dr. med. Lena Vogt ruft Sie in ca. 8 Minuten unter Ihrer angegebenen Telefonnummer an. Bitte halten Sie sich bereit.'
            : 'Wir rufen Sie zur gewählten Zeit unter Ihrer angegebenen Telefonnummer an. Eine Bestätigung haben wir Ihnen per E-Mail geschickt.'}
        </p>
      </div>
      <div style={{
        background: 'var(--bd-surface)', border: '1px solid var(--bd-line)', borderRadius: 'var(--r-md)',
        padding: 20, width: '100%', maxWidth: 360, textAlign: 'left'
      }}>
        <div className="meta" style={{ marginBottom: 4 }}>Ihr Anruf</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.01em', marginBottom: 12 }}>
          {slotLabel}
        </div>
        <div className="row-tight" style={{ gap: 8, color: 'var(--fg-2)', fontSize: 14, marginBottom: 6 }}>
          <Icon name="user" size={14} /><span>Dr. med. Lena Vogt</span>
        </div>
        <div className="row-tight" style={{ gap: 8, color: 'var(--fg-2)', fontSize: 14, marginBottom: 6 }}>
          <Icon name="phone-call" size={14} /><span>Telefonische Sprechstunde</span>
        </div>
        <div className="row-tight" style={{ gap: 8, color: 'var(--fg-2)', fontSize: 14 }}>
          <Icon name="credit-card" size={14} /><span>{price} € · vorgemerkt, freigegeben nach dem Anruf</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BookingFlow });
