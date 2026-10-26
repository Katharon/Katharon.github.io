# Blackline — Designsystem und UX-Referenz

Die ausführliche, interaktive Referenz liegt unter [`public/styleguide/index.html`](../public/styleguide/index.html). Sie dokumentiert die tatsächliche Blackline-Gestaltung dieses Projekts und verwendet dieselben Token und Primitives wie die Website. Die Datei funktioniert mit ihren lokalen Nachbardateien auch direkt über `file://`; es sind keine externen Schriften, Skripte, Abrufe oder Dienste erforderlich.

## Gestalterische Richtung

Blackline verbindet eine ruhige anthrazitfarbene Grundfläche, lokal eingebundenes abstraktes Bildmaterial, einen warmen Aktionsakzent und klare Typografie. Projekte werden in offenen Bild-/Textzeilen präsentiert. Karten grenzen nur dort Inhalte ab, wo dies die Orientierung verbessert. Es gibt keine dekorativen Abschnittsnummern mit angehängten Strichen, keine erfundenen Kennzahlen und keine pauschalen Fertigkeitsratings.

Geist ist die Hauptschrift; Geist Mono kennzeichnet kurze Metadaten, Technologien und Zeiträume. Beide werden aus `public/fonts/` geladen. Das Bild-Hero verwendet eigene semantische Farbrollen: Dunkel zeigt das schwarze Motiv mit heller Schrift, Hell das orangefarbene Motiv mit dunkler Schrift auf warmer Papierfläche. Overlays sichern die Lesbarkeit.

Der Redesign-Auftrag bewahrt die Inhalte des gelieferten Projekts. Dies umfasst die vier Projekte, bestehende Texte, Kontaktwege, DE/EN-Routen und auch die vorhandenen Ausbildungsangaben. Der Master-Eintrag bleibt in diesem Auftrag bei „Start 09/2026“ / „Zugelassen, mit geplantem Fokus …“. Eine inhaltliche Aktualisierung ist eine gesonderte Änderung, keine Nebenwirkung einer neuen Gestaltung.

## Gemeinsame Quelle

Die editierbare Token-Definition und Generierung liegt in [`scripts/build-design-tokens.mjs`](../scripts/build-design-tokens.mjs). Nach einer Änderung werden die drei Ausgabeformate gemeinsam erzeugt:

```sh
node scripts/build-design-tokens.mjs
```

| Datei                              | Aufgabe                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `public/design/tokens.json`        | Maschinenlesbarer Tokenbaum mit `$type`, `$value`, Rohpalette und Aliasen.                        |
| `public/design/tokens.css`         | Generierte CSS-Variablen für Dunkel und Hell.                                                     |
| `public/design/tokens.js`          | Derselbe Baum als `window.DESIGN_TOKENS` für die Offline-Referenz.                                |
| `public/design/primitives.css`     | Gemeinsame Schriften, Container, Buttons, Badges, Karten, Links und Überschriften.                |
| `public/styleguide/index.html`     | Vollständige UX-/UI-Dokumentation und Beispiele.                                                  |
| `public/styleguide/styleguide.css` | Ausschließlich die Komposition der Dokumentation und Beispiele.                                   |
| `public/styleguide/styleguide.js`  | Tokenanzeige, Kopierfunktion, Theme-/Sprachbeispiele, Kontrastberechnung und Komponentenverträge. |

Generierte Token-Dateien nicht unabhängig voneinander ändern. Komponenten verwenden semantische CSS-Variablen; rohe Hexfarben gehören in die Palette. Die Dokumentations-CSS ergänzt die Anordnung, definiert aber keine zweite Farbpalette und lädt keinen externen Fontdienst.

## Tokenvertrag

Die HTML-Referenz listet jeden öffentlichen CSS-Token mit aktuellem Wert und Verwendung. Sie zeigt außerdem den vollständigen Rohbaum mit aufgelösten Aliasen. CamelCase-Schlüssel werden in CSS zu Kebab-Case, zum Beispiel `color.surfaceRaised` → `--color-surface-raised`.

| Gruppe          | CSS-Namen und Verwendung                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Flächen         | `--color-bg`, `--color-surface`, `--color-surface-raised`                                                                                                                            |
| Texte           | `--color-text`, `--color-heading`, `--color-muted`, `--color-subtle`                                                                                                                 |
| Aktion          | `--color-accent`, `--color-accent-hover`, `--color-action-text`                                                                                                                      |
| Kontur / Fokus  | `--color-border`, `--color-border-strong`, `--color-focus`                                                                                                                           |
| Kontakt         | `--color-contact-bg`, `--color-contact-text`, `--color-contact-muted`, `--color-contact-border`, `--color-contact-accent`                                                            |
| Bild-Hero       | `--color-hero-base`, `--color-hero-heading`, `--color-hero-text`, `--color-hero-accent`, `--color-hero-focus`                                                                        |
| Schriftfamilien | `--font-family-sans`, `--font-family-mono`                                                                                                                                           |
| Schriftgrößen   | `--font-size-caption`, `--font-size-small`, `--font-size-body`, `--font-size-lead`, `--font-size-h3`, `--font-size-h2`, `--font-size-h1`, `--font-size-h1-min`, `--font-size-h2-min` |
| Gewichte        | `--font-weight-regular`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`                                                                                      |
| Zeilenhöhe      | `--line-height-body`, `--line-height-heading`, `--line-height-label`                                                                                                                 |
| Abstand         | `--space-1`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24` mit jeweils vollständigem `--space-`-Präfix                                                                  |
| Radius          | `--radius-small`, `--radius-medium`, `--radius-large`                                                                                                                                |
| Maße            | `--size-touch`, `--size-icon`, `--size-content-max`, `--size-prose`, `--size-header`, `--size-border`, `--size-focus`                                                                |
| Bewegung        | `--motion-fast`, `--motion-normal`                                                                                                                                                   |
| Layout          | `--breakpoint-compact`, `--breakpoint-wide` als dokumentierte Quellwerte; Media Queries verwenden die festen generierten Werte.                                                      |
| Schatten        | `--shadow-card`                                                                                                                                                                      |

Die Basisschrift ist 1rem bei 1.7 Zeilenhöhe. Der Container misst maximal 76rem, ausführlicher Text maximal 42rem. Die Abstandsgrundlage ist 0.25rem. Buttons und Icon-Ziele sind mindestens 2.75rem hoch; Icon-Ziele zusätzlich mindestens ebenso breit. Normale Konturen sind 1px, Fokuslinien 2px mit sichtbarem Abstand.

## Themes und Sprache

Die Website startet ohne gespeicherten Wert im Theme `dark`. Das native Auswahlfeld bietet nur `dark` und `light`:

- `data-theme-choice` enthält die gewählte Option.
- `data-theme` enthält eine konkrete Palette.
- Die Auswahl folgt keiner automatischen Systemumschaltung.
- Nicht mehr unterstützte gespeicherte Werte fallen auf `dark` zurück.
- Die Website speichert unter `portfolio-theme`; die Referenz nutzt getrennt `blackline-styleguide-theme`.
- Eine blockierte Speicherung verhindert die Bedienung der aktuellen Ansicht nicht.

Englisch liegt unter `/`, Deutsch unter `/de/`. Die Sprachauswahl verwendet echte Links mit `hreflang`, `lang` und `aria-current="page"`. Die Sprachvorschau im Styleguide wechselt nur ihr eigenes Beispiel und ist kein zusätzlicher Website-Router.

## Responsive Vertrag

Es gibt zwei systemweite Layoutgrenzen:

- **40rem / 640 CSS-Pixel:** kompakte Anpassungen, größere Container-Außenränder und passende mehrspaltige Inhaltsanordnung.
- **64rem / 1024 CSS-Pixel:** Desktop-Navigation und große Hero-/Abschnittskomposition.

Unter 64rem bleibt die Hauptnavigation ein natives `details`/`summary`-Disclosure. Es funktioniert grundlegend ohne JavaScript. Die ergänzende Browserlogik schließt bei Escape, Klick außerhalb, Ankerwahl und Wechsel in die breite Ansicht. Escape fokussiert den Auslöser; die Ankerwahl fokussiert das Ziel. Die Ankerziele haben passende Fokus- und Scroll-Abstände zum Sticky-Header.

Mobile erhält die gleichen Inhalte und Aktionen. Projektzeilen werden einspaltig, Badges brechen um, Datumsangaben stehen vor der zugehörigen Station, und lange E-Mail-Adressen bleiben innerhalb des Viewports. Keine feste Kartenhöhe darf eine deutsche Übersetzung abschneiden. Dekorative Bildausschnitte dürfen variieren; Projektoberflächen müssen verständlich bleiben.

## Komponentenbestand

Der HTML-Styleguide enthält für jeden der folgenden Bausteine einen eigenen Komponentenvertrag mit **Zweck, Anatomie, CSS-Variablen, Zuständen, Tastatur/Semantik, responsive Verhalten und Inhaltsregeln**:

- Container und Abschnitt
- Abschnittsüberschrift und Eyebrow
- Header, Marke und Skip-Link
- Hauptnavigation und mobiles Disclosure
- Sprachauswahl
- Theme-Auswahl
- Primäraktion
- Sekundäraktion, Ghost und Icon-Button
- Textlink und externe Verbindung
- Badge und Technologielabel
- Karte und ruhige Oberfläche
- Hero, Namensüberschrift und Bild
- Profilpanel, aktueller Fokus und Bachelorarbeit
- Projektzeile und Repository-Aktion
- Projektbild und ehrlicher Fallback
- Über mich
- Schwerpunkte
- Erfahrung und Timeline
- Ausbildung
- Tech Stack
- Kontaktbereich
- Footer

Ein Navigationsziel ist ein Link; eine lokale Aktion ist ein Button. Die primäre Aktion ist zunächst nur mit dem Akzent umrandet und füllt sich bei Hover. `--color-action-text` sorgt auf der gefüllten Fläche für den passenden Kontrast. Sekundäraktionen nutzen eine erkennbare Kontrollkontur; Ghost-Aktionen bleiben visuell zurückhaltend. Badges sind nicht interaktiv.

Vorschau und sichtbarer GitHub-Link eines Projekts führen ausdrücklich zum selben Repository. Die gesamte Projektzeile erhält keinen versteckten Click-Handler. Vorhandene echte Screenshots werden lokal geladen; der Resolver bevorzugt WebP, AVIF, PNG, JPG und JPEG. Ohne passenden Asset zeigt die Seite einen textbasierten, klar als Vorschau erkennbaren Fallback statt einer erfundenen fertigen Oberfläche.

Das Profilpanel unter dem Hero bewahrt die Dateibezeichnung, .NET/Linux/K8s, die drei vorhandenen Fokuszeilen und den Bachelorarbeits-Text. Der Dateiname ist ein Gestaltungslabel und kein vorgetäuschter Download.

## Zugänglichkeit und Zustände

Alle interaktiven Elemente haben einen klaren Namen und sichtbaren Fokus. Es gibt keine positiven `tabindex`-Werte. Dekorative Icons sind `aria-hidden`; aussagekräftige Projektbilder haben passende Alternativtexte. Das Hero-Motiv ist rein atmosphärisch und verwendet einen leeren Alternativtext.

Die Referenz zeigt Standard, Hover, Fokus, Aktiv sowie gesondert markierte Disabled-/Loading-Beispiele. Die letzten beiden sind Zustandsreferenzen und behaupten keine zusätzliche Funktion im statischen Portfolio. Kontaktformulare, Konten, Zahlungen und weitere Produkt-Workflows sind nicht Teil dieses Systems.

Die Live-Kontrasttabelle berechnet Kontraste aus den eingebundenen CSS-Token für Dunkel und Hell. Normaler Text zielt auf mindestens 4.5:1, Fokus und Kontrollkonturen auf mindestens 3:1. Die Kontaktfläche und der Bild-Hero werden ausdrücklich mit ihren eigenen Rollen geprüft. Farbige Trennlinien sind keine Kontrollkonturen.

`prefers-reduced-motion: reduce` deaktiviert dekorative Bewegung und sanftes Scrollen. Inhalte sind ohne Animation sofort sichtbar. Eine Hover-Bewegung verändert keine notwendige Information. Die Seitensprache und die Überschriftenhierarchie bleiben eindeutig; jede Sprachseite hat eine H1.

## Pflege und Überprüfung

1. Passende vorhandene Token und Grundbausteine wählen.
2. Den zugehörigen Komponentenvertrag in der HTML-Referenz prüfen.
3. Änderung im relevanten Quelltext durchführen; bei Farb-/Maßänderung die gemeinsame Tokenquelle regenerieren.
4. Inhalte aus `data/profile.ts`, `data/content.ts`, `data/projects.ts`, `data/skills.ts` und `data/i18n.ts` konsistent halten. Bestehende Inhalte bleiben im vorliegenden Redesign unverändert.
5. Beide Themes, den Bildwechsel sowie DE und EN prüfen.
6. 320, 390, 768, 1024 und 1440 Pixel sowie 200 % Zoom prüfen.
7. Tastatur, Escape im mobilen Menü, Fokus, lokale Bild-/Dateipfade und reduzierte Bewegung prüfen.
8. Den statischen Produktionsbuild und die beiden Sprachrouten kontrollieren.

Die ausführlichen Beispielkompositionen, die komplette Tokenliste, die interaktiven Bedienproben und wiederverwendbare Vanilla-/Next.js-Codebeispiele stehen in der [HTML-Referenz](../public/styleguide/index.html).
