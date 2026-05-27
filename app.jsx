/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect,
          Header, Hero, TrustStrip, HowItWorks, Conditions, Doctors, Pricing, Faq,
          Testimonial, Footer, BookingFlow */

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "A",
  "bookingVariant": "modal",
  "accentEmphasis": "calm"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAKS_DEFAULTS);
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const onBook = () => setBookingOpen(true);

  // Accent emphasis swaps which family the page leans on for accents.
  React.useEffect(() => {
    const root = document.documentElement;
    if (t.accentEmphasis === 'warm') {
      root.style.setProperty('--accent', 'var(--bd-clay-600)');
    } else if (t.accentEmphasis === 'calm') {
      root.style.setProperty('--accent', 'var(--bd-sage-600)');
    } else {
      root.style.setProperty('--accent', 'var(--bd-blue-700)');
    }
  }, [t.accentEmphasis]);

  return (
    <>
      <Header onBook={onBook} />
      <main>
        <Hero variant={t.heroVariant} onBook={onBook} />
        <TrustStrip />
        <HowItWorks onBook={onBook} />
        <Conditions onBook={onBook} />
        <Doctors />
        <Testimonial />
        <Pricing onBook={onBook} />
        <Faq />
      </main>
      <Footer onBook={onBook} />

      <BookingFlow
        open={bookingOpen}
        variant={t.bookingVariant}
        onClose={() => setBookingOpen(false)}
      />

      <TweaksPanel title="Tweaks" noDeckControls>
        <TweakSection label="Hero">
          <TweakRadio
            label="Layout"
            value={t.heroVariant}
            options={[
              { value: 'A', label: 'Split' },
              { value: 'B', label: 'Center' },
              { value: 'C', label: 'Editor.' },
            ]}
            onChange={v => setTweak('heroVariant', v)}
          />
        </TweakSection>
        <TweakSection label="Booking">
          <TweakRadio
            label="Surface"
            value={t.bookingVariant}
            options={[
              { value: 'modal',      label: 'Modal' },
              { value: 'drawer',     label: 'Drawer' },
              { value: 'fullscreen', label: 'Full' },
            ]}
            onChange={v => setTweak('bookingVariant', v)}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setBookingOpen(true)}>
              Buchung öffnen
            </button>
          </div>
        </TweakSection>
        <TweakSection label="Brand emphasis">
          <TweakRadio
            label="Accent"
            value={t.accentEmphasis}
            options={[
              { value: 'calm',   label: 'Sage' },
              { value: 'warm',   label: 'Clay' },
              { value: 'marine', label: 'Marine' },
            ]}
            onChange={v => setTweak('accentEmphasis', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
