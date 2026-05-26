# Blickdoktor — Website UI kit

Interactive marketing site recreation for the Blickdoktor brand. German-language, formal _Sie_, warm-Scandi visual direction.

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | The wired-up app. Open in a browser. |
| `styles.css` | Page-level styles built on the root `colors_and_type.css` tokens. |
| `ui.jsx` | Shared primitives: `<Icon>`, `<Button>`, `<Badge>`, `<Field>`, `<Logo>`. |
| `Header.jsx` | Site header with sticky-on-scroll backdrop blur. |
| `Hero.jsx` | Hero with **three variants** (A — split + illustration, B — centered editorial, C — asymmetric with metric strip). |
| `Trust.jsx` | Four-prop trust strip. |
| `HowItWorks.jsx` | Three-step explainer. |
| `Conditions.jsx` | Six-card grid of common eye complaints. |
| `Doctors.jsx` | Doctor team cards with monogram avatars. |
| `Testimonial.jsx` | Single editorial pull-quote. |
| `Pricing.jsx` | Two-card pricing (self-pay vs reimbursable). |
| `Faq.jsx` | Sticky-headed FAQ accordion. |
| `Footer.jsx` | Dark footer with final CTA + 3 link columns. |
| `Booking.jsx` | Four-step booking flow with **three layout variants** (modal, drawer, fullscreen). |
| `app.jsx` | Root App. Wires Tweaks (hero variant, booking layout, accent emphasis). |
| `tweaks-panel.jsx` | Tweaks framework. |

## Tweaks

Toggle the **Tweaks** button in the toolbar to swap:

- **Hero layout** — Split / Centered / Editorial.
- **Booking surface** — Modal / Drawer / Fullscreen.
- **Accent emphasis** — Sage / Clay / Marine. (Swaps which family the page leans on for highlights.)

## Notes

- The doctor avatars are monogram placeholders. Replace with real photography when available — the `aspect-ratio: 1` slot is sized for portrait headshots.
- Hero illustrations are SVG, designed in-system. They re-use the lens + iris motif from the logo. They are decorative — pair with real photography on launch.
- The booking flow is a click-through prototype: it accepts input but does not actually post anywhere.
