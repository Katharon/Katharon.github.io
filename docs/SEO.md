# Technische Suchmaschinenoptimierung

Stand: 26. Oktober 2026. Dieses Dokument beschreibt kostenlose Maßnahmen für
`https://katharon.github.io/` und `https://katharon.github.io/de/`.
Die Änderungen betreffen Metadaten und Prüfungen; Gestaltung, sichtbare Texte,
Sprachumschaltung und Kontaktmöglichkeiten bleiben unverändert.

## Kostenloser Betrieb

Es werden keine neuen Abhängigkeiten, kostenpflichtigen Dienste, Anzeigen, Abonnements,
Domainkäufe oder Tracking-Skripte benötigt. Das bestehende GitHub-Pages-Hosting bleibt bestehen.
Search Console, Rich Results Test, Schema Markup Validator, PageSpeed Insights und
Lighthouse können für die hier beschriebenen Prüfungen kostenlos verwendet werden.
Es werden keine Konten oder externen Dienste automatisch hinzugefügt.

## Metadaten und stabile Bildadressen

`lib/metadata.ts` verwaltet weiterhin Titel, Beschreibung, selbstreferenzierende Canonicals,
Open Graph, Twitter Cards, Indexierungsregeln sowie die gegenseitigen Sprachverweise.
Englisch bleibt auf `/`, Deutsch auf `/de/`; `x-default` verweist auf `/`.
Beide Sprachversionen dürfen indexiert werden und haben jeweils ihre eigene Canonical-URL.

| Zweck                  | Öffentliche Adresse             | Format und Größe   |
| ---------------------- | ------------------------------- | ------------------ |
| Favicon                | `/favicon.png`                  | PNG, 64 × 64 px    |
| Apple-Touch-Icon       | `/apple-touch-icon.png`         | PNG, 180 × 180 px  |
| Englische Linkvorschau | `/images/social-preview-en.png` | PNG, 1200 × 630 px |
| Deutsche Linkvorschau  | `/images/social-preview-de.png` | PNG, 1200 × 630 px |

Diese vier Dateien sind unveränderte Kopien der bereits generierten Export-PNGs des
bisherigen Projekts. Es wurde kein Bild neu gezeichnet, komprimiert oder skaliert.
Das LS-Zeichen und beide bestehenden Vorschaugrafiken sehen deshalb exakt wie bisher aus.
Die bisherigen Code-Dateikonventionen für Icons und Social-Bilder entfallen, damit sie
die expliziten PNG-Adressen nicht durch generierte, endungslose Routen überschreiben.

Eine `.png`-Endung ermöglicht statischen Hosts eine eindeutige MIME-Zuordnung zu `image/png`.
Die tatsächlich veröffentlichten HTTP-Header müssen nach dem Deployment geprüft werden.
Favicon-URLs sollen stabil bleiben; keine wechselnden Zeitstempel anhängen.
Bei künftigen inhaltlichen Änderungen müssen gegebenenfalls auch die Texte in den beiden
Vorschaugrafiken aktualisiert werden.

Die Bilder haben unterschiedliche Aufgaben: Das kleine Symbol neben einem Suchergebnis
ist das Favicon. Open-Graph-/Twitter-Bilder dienen Linkvorschauen. Ein großes Bild in einem
Google-Suchergebnis ist eine eigene, von Google ausgewählte Darstellung. Keine dieser
Angaben erzwingt die Aufnahme eines Bildes oder eine bestimmte Darstellung.

## Strukturierte Daten

`lib/structured-data.ts` erzeugt aus den bestehenden Profildaten einen JSON-LD-Graphen.
`components/seo/StructuredData.tsx` bindet ihn als nicht sichtbares, natives
`application/ld+json`-Script in beide Sprachlayouts ein.

- `WebSite`: gemeinsamer Websitename, Stamm-URL, unterstützte Sprachen und Verweis auf den Autor.
- `ProfilePage`: URL, Sprache und Beschreibung der jeweiligen Portfolio-Seite;
  `mainEntity` verweist auf dieselbe Person.
- `Person`: bestehender Name, Profilbeschreibung und die bereits veröffentlichten
  GitHub-/LinkedIn-Profiladressen. Die sprachübergreifende Identität erhält eine stabile `@id`.

Es werden keine neuen Qualifikationen, Bewertungen, Beschäftigungsverhältnisse oder anderen
Behauptungen ergänzt. `Person.image` wird bewusst nicht gesetzt: Es liegt kein echtes
Profilporträt vor. Ein LS-Logo oder ein abstraktes Hintergrundmotiv wäre kein geeigneter Ersatz.
Die Serialisierung ersetzt `<` durch `\u003c`, damit spätere Textwerte kein HTML-Script
vorzeitig beenden können.

## Sitemap, Crawling und interne Referenz

Die bestehende `app/sitemap.ts` enthält ausschließlich die beiden öffentlichen Sprachseiten
mit vollständigen URLs und gegenseitigen Sprachverweisen. `lastModified` muss das Datum einer
relevanten tatsächlichen Änderung wiedergeben; es darf nicht einfach bei jedem Build auf
die aktuelle Uhrzeit gesetzt werden. Google ignoriert `priority` und `changeFrequency`.

`app/robots.ts` erlaubt weiterhin das Crawling und nennt `/sitemap.xml`.
Die bestehende Google-Verifizierungsdatei bleibt unverändert erhalten.
`/styleguide/` und der eigenständige Export `/styleguide.html` erhalten `noindex, follow`:
Die interne Designreferenz ist erreichbar und nutzbar, soll aber nicht mit dem Portfolio
in den Suchergebnissen konkurrieren. Diese URLs werden nicht per `robots.txt` gesperrt,
damit Suchmaschinen den `noindex`-Hinweis lesen können. `noindex` ist kein Zugriffsschutz.

## Lokale Prüfung

```powershell
npm run lint
npm run typecheck
npm run build
npm run seo:check
```

`npm run build` führt nach dem Export bereits `styleguide:export` und `seo:check` aus.
Der letzte Befehl ist zusätzlich für einen vorhandenen Export einzeln ausführbar.
Der Check verwendet nur Node.js-Bordmittel und prüft die tatsächlich erzeugten Dateien in `out/`:

- beide Sprachen, Titel/Beschreibung, Canonicals und gegenseitige `hreflang`-Verweise;
- erlaubte Indexierung und große Bildvorschauen der Portfolio-Seiten;
- eindeutige Icon-/Social-Metadaten mit stabilen PNG-Adressen und tatsächlich passenden PNG-Größen;
- parsebare JSON-LD-Daten, eindeutige Identitäten, Profilzuordnung und vorhandene externe Profile;
- Sitemap, Crawling-Regeln, unveränderte Google-Verifizierung und `noindex` im Styleguide.

Das ist eine Prüfung des lokalen Exports. Sie bestätigt weder eine erfolgreiche Veröffentlichung
noch Google-Indexierung, Ranking, Bildauswahl oder tatsächliche HTTP-Header des Hosters.

### Lokale Prüfergebnisse am 26. Oktober 2026

- `npm run lint`: erfolgreich, keine ESLint-Meldungen.
- `npm run typecheck`: erfolgreich, keine TypeScript-Fehler.
- `npm run build`: erfolgreich, einschließlich statischem Export und anschließendem SEO-Check.
- `npm run seo:check`: beide Sprachseiten, Metadaten, PNGs, strukturierte Daten,
  Sitemap, Robots-Regeln, Google-Verifizierung und beide Styleguide-Varianten erfolgreich geprüft.
- Alle vier neuen PNG-Dateien sind byteidentisch mit den bisherigen Export-Grafiken.
- Alle vier PNG-Adressen antworten beim lokalen statischen Testserver mit HTTP 200 und
  `Content-Type: image/png`. Dies ist ausdrücklich kein Test der GitHub-Pages-Veröffentlichung.
- Sämtliche CSS-Dateien, sichtbaren Komponenten und Inhaltsdaten entsprechen unverändert
  dem als Ausgangspunkt kopierten Quellstand. In den beiden Styleguide-HTML-Dateien wurde
  ausschließlich der nicht sichtbare Robots-Metatag ergänzt. Die sichtbaren Texte des neu
  erzeugten englischen und deutschen Exports stimmen mit dem bisherigen Export überein.

## Search Console und Prüfung nach Veröffentlichung

**Prüfstand: 26. Oktober 2026, nach erfolgreicher Veröffentlichung.**

- Alle vier neuen PNG-Adressen liefern öffentlich HTTP 200 und `image/png`;
  ihre Bytes entsprechen den bisherigen Grafiken. Beide Sprachseiten enthalten die neuen
  Metadaten und JSON-LD-Daten. Die sichtbaren Texte wurden mit dem vorherigen Live-Stand verglichen.
- Google Rich Results Test: je eine gültige Profilseite für `/` und `/de/`.
  Schema Markup Validator: 0 Fehler und 0 Warnungen für den veröffentlichten Graphen.
- Search Console: `/` ist indexiert, `/de/` war bei der Prüfung noch nicht bekannt.
  Die Indexierung wurde nach Veröffentlichung für beide URLs beantragt und von Google bestätigt.
  Beide Live-Tests bestätigten Erreichbarkeit und Indexierbarkeit.
- `sitemap.xml` wurde erneut eingereicht. **Offen:** Google meldet weiterhin
  „Konnte nicht abgerufen werden“ und 0 erkannte Seiten. Der direkte Abruf liefert gültiges XML
  mit HTTP 200. Erfolgreiche Verarbeitung wird damit ausdrücklich noch nicht behauptet.
- Keine manuellen Maßnahmen oder Sicherheitsprobleme gemeldet.
  Für Core Web Vitals liegen auf beiden Gerätetypen nicht genügend Nutzungsdaten vor.
- Kostenloser PageSpeed-Labortest des vorherigen Live-Stands: Mobil 96 Leistung,
  Desktop 100 Leistung; Barrierefreiheit, Best Practices und SEO jeweils 100.
  [Messbericht vom 26.10.2026, 19:36 MEZ](https://pagespeed.web.dev/analysis/https-katharon-github-io/b0x1ibc9mc?form_factor=mobile).
  Dies sind automatische Laborprüfungen, keine vollständige Barrierefreiheitsprüfung oder Ranking-Zusage.

Diese Angaben beschreiben den überprüften Stand an diesem Datum. Die folgenden Punkte
dienen als Anleitung für spätere Änderungen und die noch ausstehende Google-Verarbeitung.

1. Die URL-Präfix-Property `https://katharon.github.io/` verwenden. Eine Domain-Property
   verlangt DNS-Zugriff, der für eine gewöhnliche `github.io`-Subdomain nicht zur Verfügung steht.
   Die vorhandene HTML-Verifizierung nicht entfernen.
2. `/`, `/de/`, `/robots.txt`, `/sitemap.xml`, die Verifizierungsdatei und alle vier PNG-Adressen
   direkt aufrufen. Erfolgreiche Antworten und für PNG-Dateien `Content-Type: image/png` prüfen.
3. `sitemap.xml` in der richtigen Property einreichen. Einen früheren Abruffehler anhand
   des aktuellen Abrufs und der vollständigen URL prüfen; die Einreichung allein ist kein
   Nachweis erfolgreicher Verarbeitung.
4. Beide Sprach-URLs mit der URL-Prüfung untersuchen: Indexstatus, gewählte Canonical-URL,
   Crawlbarkeit und Live-Test. Nach einer Veröffentlichung einmal die Indexierung beantragen,
   sofern die Funktion verfügbar ist. Wiederholte Anträge beschleunigen den Vorgang nicht.
5. `ProfilePage` im Rich Results Test prüfen. `WebSite`/Websitename wird von diesem Test nicht
   unterstützt; dafür Schema Markup Validator und anschließend URL-Prüfung verwenden.
6. Sicherheit, manuelle Maßnahmen und HTTPS-Bericht kontrollieren, soweit diese Berichte für
   die Property verfügbar sind. Nur tatsächlich gemeldete Probleme beheben.
7. PageSpeed Insights oder Lighthouse für Mobile und Desktop ausführen. Core Web Vitals
   beruhen in der Search Console auf echten Besuchsdaten über 28 Tage. Bei wenig Traffic
   kann „nicht genügend Daten“ erscheinen; ein Labortest erzeugt diese Felddaten nicht.
8. Im Leistungsbericht Suchanfrage „Lukas Stumpfel“, Seiten, Länder und Geräte betrachten.
   Impressionen, Klicks, Klickrate und durchschnittliche Position über vergleichbare Zeiträume
   vor/nach dem Redesign vergleichen. Einzelne manuelle Suchanfragen sind keine verlässliche Messung.

Für eine gute Nutzererfahrung sind LCP ≤ 2,5 s, INP ≤ 200 ms und CLS ≤ 0,1 sinnvolle Zielwerte.
Die Laborwerte eines Tests sind keine Garantie für Feldwerte oder eine bestimmte Suchposition.
Die Website besitzt bereits responsive Ansichten; zusätzliche Messungen sollen konkrete
Probleme zeigen, bevor das unveränderte Design oder bestehendes Ladeverhalten angefasst wird.

## Grenzen

Eine Platzierung auf Seite 1, ein persönliches Knowledge Panel, Rich Results, ein bestimmter
Websitename oder ein angezeigtes Bild lassen sich nicht einstellen oder garantieren.
Strukturierte Daten helfen bei der Zuordnung vorhandener Inhalte; sie sind kein Ranking-Schalter.
Google entscheidet über Crawling, Indexierung und Darstellung. Nach Änderungen können Tage
bis Wochen bis zur erneuten Verarbeitung vergehen.

Für dieses persönliche Portfolio sind weder bezahlte Werbung noch ein Business Profile,
ein Shop-/Merchant-Center-Konto oder Analytics erforderlich. Zusätzliche Dienste werden
nicht allein wegen ihrer Existenz eingerichtet. Neue Inhalte oder externe Profiländerungen
sind von dieser rein technischen Umsetzung nicht umfasst.

## Offizielle kostenlose Referenzen

- [Favicon in Google-Suchergebnissen](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Websitename und WebSite-Markup](https://developers.google.com/search/docs/appearance/site-names)
- [ProfilePage und Person](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Sitemap erstellen und einreichen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Erneutes Crawling anfordern](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Core-Web-Vitals-Bericht](https://support.google.com/webmasters/answer/9205520?hl=de)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

Die Implementierung folgt zusätzlich den mit der installierten Next.js-Version gelieferten
Anleitungen in `node_modules/next/dist/docs/` zu Metadata, Icons, JSON-LD und statischem Export.
