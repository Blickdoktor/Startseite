# Blickdoktor — Marketing Website

Schnelle, fachärztliche Augenheilkunde — online.

## Projektstruktur

```
/
├── index.html                  ← Einstiegspunkt
├── colors_and_type.css         ← Design-Tokens (Farben, Typografie, Abstände)
├── styles.css                  ← Globale Stile
├── app.jsx                     ← Root-Komponente
├── ui.jsx                      ← Gemeinsame UI-Elemente
├── tweaks-panel.jsx            ← In-Page Tweaks-Panel
│
├── Header.jsx                  ← Navigation & Header
├── Hero.jsx                    ← Hero-Sektion
├── Trust.jsx                   ← Vertrauens-Indikatoren
├── HowItWorks.jsx              ← So funktioniert's
├── Conditions.jsx              ← Beschwerdebilder
├── Doctors.jsx                 ← Ärzte-Sektion
├── Testimonial.jsx             ← Patientenstimmen
├── Pricing.jsx                 ← Preise
├── Faq.jsx                     ← Häufige Fragen
├── Footer.jsx                  ← Footer
├── Booking.jsx                 ← Buchungsflow
│
└── assets/
    ├── logo-mark.svg
    ├── logo-mark-sage.svg
    ├── logo-wordmark.svg
    ├── logo-wordmark-inverse.svg
    ├── illustration-consult.svg
    ├── illustration-eye.svg
    └── illustration-online.svg
```

## Lokale Vorschau

Da die JSX-Komponenten über `<script type="text/babel">` geladen werden, benötigen Sie einen lokalen HTTP-Server (direkt aus dem Dateisystem öffnen funktioniert nicht).

**Option 1 — VS Code Live Server**  
Rechtsklick auf `index.html` → „Open with Live Server"

**Option 2 — Python (im Terminal)**  
```bash
cd blickdoktor
python3 -m http.server 8080
```
Dann `http://localhost:8080` im Browser öffnen.

**Option 3 — Node.js**  
```bash
npx serve .
```

## Technologie

- **React 18** (via CDN, kein Build-Schritt nötig)
- **Babel Standalone** (JSX-Transpilierung im Browser)
- **Lucide Icons** (via CDN)
- Keine npm-Abhängigkeiten — alles läuft direkt im Browser

## GitHub Pages

Um die Seite über GitHub Pages zu veröffentlichen:

1. Repository-Einstellungen → **Pages**
2. Branch: `main`, Ordner: `/ (root)`
3. Speichern — die Seite ist nach wenigen Minuten unter  
   `https://<ihr-nutzername>.github.io/<repository-name>/` erreichbar

## Design System

Die Gestaltung basiert auf dem **Blickdoktor Design System**:
- Farbe: Marine-Blau (`#2A5470`), Salbei (`#7A8F7E`), Ton (`#B97A5C`)
- Schrift: Geist (Google Fonts)
- 8 px Basisraster
