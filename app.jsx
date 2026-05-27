/* global React, ReactDOM,
          Header, Hero, TrustStrip, HowItWorks, Conditions, Doctors, Pricing, Faq,
          Testimonial, Footer */

const ETERMIN_URL = 'https://www.etermin.net/blickdoktor';

function App() {
  const onBook = () => window.open(ETERMIN_URL, '_blank', 'noopener');

  return (
    <>
      <Header onBook={onBook} />
      <main>
        <Hero variant="A" onBook={onBook} />
        <TrustStrip />
        <HowItWorks onBook={onBook} />
        <Conditions onBook={onBook} />
        <Doctors />
        <Testimonial />
        <Pricing onBook={onBook} />
        <Faq />
      </main>
      <Footer onBook={onBook} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
