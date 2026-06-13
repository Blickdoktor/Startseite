/* global React, Icon, Button */

function Pricing({ onBook }) {

const items = [
{ label: 'Aufklärung über Erkrankung', hint: 'u.a. Altersbedingte Makuladegeneration, Glaukom, Grauer Star, u.v.m.', price: '37,54 €' },
{ label: 'Trockene Augen oder Fremdkörpergefühl', hint: 'Beratung & Therapieempfehlung', price: '37,54 €' },
{ label: 'Rötung/Reizung', hint: 'juckende Augen, Schmerzen, Allergien', price: '37,54 €' },
{ label: 'Lidproblem/Schwellung', hint: 'Druckschmerz, Lidrandentzündung, Gerstenkorn/Hagelkorn', price: '37,54 €' },
{ label: 'Anderes Anliegen', hint: 'Beratung mit Fachärztin', price: '37,54 €' },
{ label: 'Zweitmeinung', hint: 'Beurteilung eines bestehenden Befundes', price: '37,54 €' },
];

return (
<section id="preise" className="section">
<div className="container section-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'flex-start' }}>
<div className="section-head" style={{ position: 'sticky', top: 96 }}>
<span className="eyebrow">Preise</span>
<h2>Transparent, 37,54 €.</h2>
<p style={{ marginBottom: 24 }}>
Abgerechnet nach der Gebührenordnung für Ärzte als Privatpatient oder Selbstzahler. Keine Abrechnung über die Krankenkasse. Sie zahlen erst nach der Sprechstunde.
</p>
<div className="row-tight" style={{ gap: 12, marginBottom: 12 }}>
<Icon name="check" size={16} style={{ color: 'var(--bd-sage-700)' }} />
<span style={{ fontSize: 14.5, color: 'var(--fg-2)' }}>Kostenvoranschlag vor der Buchung</span>
</div>
<div className="row-tight" style={{ gap: 12, marginBottom: 12 }}>
<Icon name="check" size={16} style={{ color: 'var(--bd-sage-700)' }} />
<span style={{ fontSize: 14.5, color: 'var(--fg-2)' }}>Ärztlicher Bericht noch am selben Tag</span>
</div>
<div className="row-tight" style={{ gap: 12, marginBottom: 24 }}>
<Icon name="check" size={16} style={{ color: 'var(--bd-sage-700)' }} />
<span style={{ fontSize: 14.5, color: 'var(--fg-2)' }}>Zahlung wird erst nach dem Anruf freigegeben</span>
</div>
<Button variant="primary" size="lg" as="a" href="https://www.etermin.net/blickdoktor" target="_blank" rel="noopener" iconRight="arrow-right">Termin vereinbaren</Button>
</div>
<div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--bd-line)' }}>
<div style={{
padding: '18px 28px', borderBottom: '1px solid var(--bd-line)',
background: 'var(--bd-bg-2)',
display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
}}>
<span className="eyebrow" style={{ color: 'var(--bd-sage-700)' }}>Ziffern nach GOÄ</span>
<span className="meta" style={{ fontFamily: 'var(--font-mono)' }}>Selbstzahler</span>
</div>
<ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
{items.map((it, i) => (
<li key={it.label} style={{
display: 'grid', gridTemplateColumns: '1fr auto',
alignItems: 'center', gap: 16,
padding: '20px 28px',
borderTop: i ? '1px solid var(--bd-line)' : 'none',
background: it.strong ? 'var(--bd-sage-50)' : 'transparent'
}}>
<div className="stack-2">
<span style={{ fontSize: 16, color: 'var(--bd-ink)', fontWeight: 500 }}>{it.label}</span>
<span className="meta">{it.hint}</span>
</div>
<span style={{
fontFamily: 'var(--font-serif)', fontSize: 24, letterSpacing: '-0.01em',
color: 'var(--bd-ink)'
}}>{it.price}</span>
</li>
))}
</ul>
<div style={{
padding: '16px 28px',
borderTop: '1px solid var(--bd-line)',
background: 'var(--bd-bg-2)',
fontSize: 13.5, color: 'var(--fg-3)'
}}>
Rezept und Krankschreibung sind im Preis enthalten, sofern medizinisch angezeigt (ausschließlich über Postweg möglich).
</div>
</div>
</div>
</section>
);
}

Object.assign(window, { Pricing });
