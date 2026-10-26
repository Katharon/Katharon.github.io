/* Standalone browser reference. No fetch, external dependencies or module loader. */
(() => {
  "use strict";
  const root = document.documentElement;
  const data = window.DESIGN_TOKENS || null;
  const byId = (id) => document.getElementById(id);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const kebab = (text) =>
    String(text)
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase();
  const cssName = (path) => "--" + path.map(kebab).join("-");
  const themeLabels = { dark: "Dunkel", light: "Hell" };
  const allowedThemes = new Set(Object.keys(themeLabels));
  let toastTimer;

  const descriptions = {
    "--color-bg": "Grundfläche der Seite.",
    "--color-surface": "Ruhige Abschnitts-, Badge- und Kartenfläche.",
    "--color-surface-raised": "Erhöhte Fläche und dezenter Hover-Hintergrund.",
    "--color-text": "Gut lesbarer Standard-Fließtext.",
    "--color-heading": "Überschriften und primäre Bezeichnungen.",
    "--color-muted": "Sekundäre Beschreibungen und ergänzende Texte.",
    "--color-subtle": "Metadaten, Zeiträume und Bildunterschriften.",
    "--color-accent": "Aktionen, aktive Auswahl und zurückhaltende Hervorhebung.",
    "--color-accent-hover": "Hover-Farbe von Aktionslinks.",
    "--color-border": "Dekorative Trennlinien; keine alleinige Kontrollkontur.",
    "--color-border-strong": "Erkennbare Begrenzung von Bedienelementen.",
    "--color-contact-bg": "Helle, kontrastreiche Kontaktfläche.",
    "--color-contact-text": "Primärer Text und Fokus auf der Kontaktfläche.",
    "--color-contact-muted": "Sekundärer Text auf der Kontaktfläche.",
    "--color-contact-border": "Trenner auf der Kontaktfläche.",
    "--color-contact-accent": "Aktionsakzent auf der Kontaktfläche.",
    "--color-focus": "Sichtbarer Tastaturfokus auf regulären Flächen.",
    "--color-action-text": "Kontrasttext auf einer gefüllten Primäraktion.",
    "--color-hero-base": "Themeabhängige Hero-Basis: Anthrazit in Dunkel, warmes Papier in Hell.",
    "--color-hero-heading": "Kontrastreiche Überschrift auf der zum Theme passenden Hero-Fläche.",
    "--color-hero-text": "Lesbarer beschreibender Text im Bild-Hero.",
    "--color-hero-accent": "Warmer Aktionsakzent im Bild-Hero.",
    "--color-hero-focus": "Kontrastreiche Fokusfarbe auf der zum Theme passenden Hero-Fläche.",
    "--color-hero-border": "Dekorativer Trenner zwischen Hero-Einstieg und Profildetails.",
    "--color-hero-control-border": "Erkennbare Kontur der sekundären Hero-Aktion.",
    "--color-hero-raised": "Themeabhängige Hover-Fläche für sekundäre Hero-Aktionen.",
    "--color-hero-overlay-strong":
      "Stark deckende dunkle oder helle Bildzone hinter dem führenden Text.",
    "--color-hero-overlay-medium": "Übergang zwischen Textzone und sichtbarem Bildmotiv.",
    "--color-hero-overlay-soft": "Leichtes Theme-Overlay am freien rechten Bildrand.",
    "--color-hero-overlay-mobile": "Mobiles Theme-Overlay für lesbaren Text über dem Motiv.",
    "--font-family-sans": "Geist für Inhalt, Navigation, Buttons und Überschriften.",
    "--font-family-mono": "Geist Mono für kurze Kategorien, Technik und Metadaten.",
    "--font-size-caption": "Kleine Labels, Eyebrows und Metadaten.",
    "--font-size-small": "Buttons, ergänzende Inhalte und kompakte Navigation.",
    "--font-size-body": "Standardtext mit skalierbarer Basisgröße.",
    "--font-size-lead": "Einleitung und hervorgehobene kurze Absätze.",
    "--font-size-h3": "Projekt- und Unterthementitel.",
    "--font-size-h2": "Obergrenze der Abschnittsüberschriften.",
    "--font-size-h1": "Obergrenze der großen Namensüberschrift.",
    "--font-size-h1-min": "Untere Grenze der responsiven Hero-Schrift.",
    "--font-size-h2-min": "Untere Grenze der responsiven Abschnittstitel.",
    "--font-weight-regular": "Regulärer Fließtext.",
    "--font-weight-medium": "Labels, Buttons und zurückhaltende Betonung.",
    "--font-weight-semibold": "Überschriften und klare inhaltliche Betonung.",
    "--font-weight-bold": "Sparsame starke Betonung.",
    "--line-height-body": "Luftiger Fließtext und längere Beschreibungen.",
    "--line-height-heading": "Kompakte mehrzeilige Überschriften.",
    "--line-height-label": "Buttons, Badges und kurze Metadaten.",
    "--radius-small": "Feine rechteckige Rundung an Buttons, Labels und kleinen Rahmen.",
    "--radius-medium": "Karten und kompakte Flächengruppen.",
    "--radius-large": "Größere Bild- und Flächenrahmen; sparsam einsetzen.",
    "--size-touch": "Mindesthöhe und Icon-Zielgröße für Interaktion.",
    "--size-icon": "Einheitliches kleines UI-Icon.",
    "--size-content-max": "Maximale Breite des zentralen Seitencontainers.",
    "--size-prose": "Maximale Breite ausführlicher Lesetexte.",
    "--size-header": "Grundhöhe des Headers und Bezug für Ankerabstände.",
    "--size-border": "Reguläre Konturstärke.",
    "--size-focus": "Stärke der abgesetzten sichtbaren Fokuslinie.",
    "--motion-fast": "Kurze Farb- und Zustandswechsel.",
    "--motion-normal": "Ruhigere nicht dekorativ übertriebene Übergänge.",
    "--breakpoint-compact":
      "40rem / 640px: kompakte Layoutanpassungen. Media Queries verwenden den generierten festen Wert.",
    "--breakpoint-wide": "64rem / 1024px: große Komposition und Desktop-Navigation.",
    "--shadow-card": "Zurückhaltender Flächenschatten; nie einzige Zustandsinformation.",
  };

  function tokenLeaves(object, path = [], result = []) {
    if (!object || typeof object !== "object") return result;
    if (Object.prototype.hasOwnProperty.call(object, "$value")) {
      result.push({ path, token: object });
      return result;
    }
    Object.entries(object).forEach(([key, value]) => {
      if (!key.startsWith("$")) tokenLeaves(value, path.concat(key), result);
    });
    return result;
  }
  function lookup(path) {
    return path.split(".").reduce((value, key) => value && value[key], data);
  }
  function formatValue(value, seen = new Set()) {
    if (typeof value === "string") {
      const alias = value.match(/^\{([^}]+)\}$/);
      if (alias && !seen.has(alias[1])) {
        const linked = lookup(alias[1]);
        if (linked && "$value" in linked)
          return formatValue(linked.$value, new Set([...seen, alias[1]]));
      }
      return value;
    }
    if (Array.isArray(value))
      return value
        .map((item) => (/\s/.test(String(item)) ? '"' + item + '"' : String(item)))
        .join(", ");
    if (value && typeof value === "object") {
      if (value.hex)
        return (
          value.hex +
          (value.alpha !== undefined && value.alpha !== 1 ? " / alpha " + value.alpha : "")
        );
      if ("value" in value && "unit" in value) return String(value.value) + value.unit;
      if (value.offsetX && value.offsetY)
        return [value.offsetX, value.offsetY, value.blur, value.spread, value.color]
          .map((item) => formatValue(item, seen))
          .join(" ");
      return JSON.stringify(value);
    }
    return String(value);
  }
  const leaves = tokenLeaves(data);
  const semantic = leaves.filter((entry) => !["palette", "themes"].includes(entry.path[0]));
  if (!semantic.length) {
    Object.keys(descriptions).forEach((name) => semantic.push({ path: [], token: {}, name }));
  }
  semantic.forEach((entry) => {
    entry.name = entry.name || cssName(entry.path);
    entry.description =
      descriptions[entry.name] ||
      (entry.path[0] === "space"
        ? "Abstandsstufe für konsistente Außen-, Innen- und Zwischenräume."
        : entry.token.$description ||
          "Gemeinsamer Designwert. In Komponenten über die CSS-Variable verwenden.");
  });

  function computed(name, target = root) {
    return getComputedStyle(target).getPropertyValue(name).trim() || "Nicht geladen";
  }
  function notify(text) {
    const toast = byId("guide-toast");
    clearTimeout(toastTimer);
    toast.textContent = text;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3600);
  }
  async function copyVariable(name) {
    const text = "var(" + name + ")";
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Use local fallback");
      await navigator.clipboard.writeText(text);
      notify(text + " kopiert.");
    } catch {
      const previousFocus = document.activeElement;
      const field = make("textarea");
      field.value = text;
      field.readOnly = true;
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.append(field);
      field.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
        /* The value remains visible in the reference. */
      }
      field.remove();
      if (previousFocus && previousFocus.focus) previousFocus.focus({ preventScroll: true });
      notify(
        copied
          ? text + " kopiert."
          : "Automatisches Kopieren ist hier nicht verfügbar. CSS-Ausdruck: " + text,
      );
    }
  }
  function copyButton(name, long = false) {
    const button = make("button", "guide-copy", long ? "Variable kopieren" : "Kopieren");
    button.type = "button";
    button.setAttribute("aria-label", name + " als CSS-Ausdruck kopieren");
    button.addEventListener("click", () => copyVariable(name));
    return button;
  }
  function renderSemantic() {
    const colors = document.createDocumentFragment();
    const rows = document.createDocumentFragment();
    semantic.forEach((entry) => {
      const value = computed(entry.name);
      const row = make("tr");
      row.dataset.search = [entry.name, value, entry.description].join(" ").toLowerCase();
      const nameCell = make("td", "guide-token-name");
      nameCell.append(make("code", "", entry.name));
      const actionCell = make("td");
      actionCell.append(copyButton(entry.name));
      row.append(
        nameCell,
        make("td", "guide-token-value", value),
        make("td", "", entry.description),
        actionCell,
      );
      rows.append(row);
      if (entry.name.startsWith("--color-")) {
        const card = make("article", "guide-color");
        card.dataset.search = row.dataset.search;
        const swatch = make("div", "guide-color__swatch");
        swatch.style.backgroundColor = "var(" + entry.name + ")";
        swatch.setAttribute("aria-hidden", "true");
        const info = make("div", "guide-color__info");
        info.append(
          make("code", "", entry.name),
          make("span", "guide-color__value", value),
          make("p", "", entry.description),
          copyButton(entry.name, true),
        );
        card.append(swatch, info);
        colors.append(card);
      }
    });
    byId("semantic-colors").replaceChildren(colors);
    byId("semantic-token-rows").replaceChildren(rows);
    applySearch();
  }
  function renderRaw() {
    const rows = document.createDocumentFragment();
    leaves.forEach((entry) => {
      const row = make("tr");
      const raw = entry.token.$value;
      const resolved = formatValue(raw);
      const value =
        typeof raw === "string" && raw.startsWith("{") ? raw + " → " + resolved : resolved;
      const path = entry.path.join(".");
      row.dataset.search = (path + " " + value).toLowerCase();
      const name = make("td");
      name.append(make("code", "", path));
      const cell = make("td", "guide-token-value", value);
      row.append(name, cell);
      rows.append(row);
    });
    if (!leaves.length) {
      const row = make("tr");
      const cell = make(
        "td",
        "",
        "Die gemeinsame Tokenquelle konnte nicht geladen werden. Bitte tokens.js neben tokens.css mitliefern.",
      );
      cell.colSpan = 2;
      row.append(cell);
      rows.append(row);
    }
    byId("raw-token-rows").replaceChildren(rows);
    byId("token-source-status").textContent = data
      ? "Gemeinsame Quelle: design/tokens.js · " + semantic.length + " CSS-Token"
      : "Tokenquelle fehlt; angezeigt werden die vertraglichen CSS-Namen.";
  }
  function applySearch() {
    const query = byId("token-search").value.trim().toLowerCase();
    const entries = document.querySelectorAll("[data-search]");
    let count = 0;
    entries.forEach((entry) => {
      const visible = !query || entry.dataset.search.includes(query);
      entry.hidden = !visible;
      if (visible) count += 1;
    });
    byId("token-search-status").textContent = query
      ? count + " sichtbare Einträge für „" + byId("token-search").value.trim() + "“."
      : "";
  }
  function renderScales() {
    const type = byId("type-scale");
    const samples = {
      caption: "Ausgewählte Projekte",
      small: "Repository ansehen →",
      body: "Verständliche Software beginnt mit klaren Entscheidungen.",
      lead: "Ich baue praxisnahe Softwareprojekte.",
      h3: "NodeControl",
      h2: "Software mit System.",
      h1: "Lukas Stumpfel",
    };
    Object.entries(samples).forEach(([key, text]) => {
      const row = make("div", "guide-type-row");
      const name = "--font-size-" + key;
      const meta = make("div", "guide-type-row__meta");
      const raw = data?.font?.size?.[key]?.$value;
      meta.append(
        make("code", "", name),
        make("span", "", raw ? formatValue(raw) + " / " + computed(name) : computed(name)),
      );
      const sample = make("p", "guide-type-row__sample", text);
      sample.style.fontSize =
        key === "h1"
          ? "clamp(var(--font-size-h1-min), 5vw, var(--font-size-h1))"
          : "var(" + name + ")";
      sample.style.fontWeight = ["h1", "h2", "h3"].includes(key)
        ? "var(--font-weight-semibold)"
        : "var(--font-weight-regular)";
      if (["caption", "small", "body", "lead"].includes(key))
        sample.style.lineHeight = "var(--line-height-body)";
      row.append(meta, sample);
      type.append(row);
    });
    const space = byId("space-scale");
    const values =
      data?.space ||
      Object.fromEntries([1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((key) => [key, null]));
    Object.entries(values)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .forEach(([key, token]) => {
        const name = "--space-" + key;
        const row = make("div", "guide-space-row");
        const bar = make("i");
        bar.style.width = "var(" + name + ")";
        bar.setAttribute("aria-hidden", "true");
        row.append(
          make("code", "", name),
          make("span", "", token ? formatValue(token.$value) : computed(name)),
          bar,
        );
        space.append(row);
      });
  }

  const contracts = [
    {
      title: "Container & Abschnitt",
      purpose:
        "Den Inhalt über die gesamte Seite konsistent ausrichten und Themen voneinander trennen.",
      anatomy:
        "Zentraler .container, semantischer section-Bereich mit eindeutiger ID, Abschnittsüberschrift und Inhalt. Keine sichtbare dekorative Abschnittsnummer.",
      tokens: [
        "--size-content-max",
        "--size-prose",
        "--space-10",
        "--space-16",
        "--space-20",
        "--space-24",
        "--color-bg",
        "--color-surface",
      ],
      states:
        "Ruhige Grund- oder Sekundärfläche. Keine Interaktion und kein künstlicher Hover-Zustand.",
      keyboard:
        "Abschnitte sind Ankerziele, keine Tab-Stationen ohne Aufgabe. Der Skip-Link erreicht den Hauptinhalt.",
      responsive:
        "Außenabstand 20px pro Seite unter 40rem, 32px pro Seite ab 40rem; maximale Breite 76rem. Abschnittsraum wächst bei 64rem.",
      copy: "Ein Thema pro Abschnitt. Überschrift benennt den Inhalt; Unterbeschreibung ergänzt sie ohne bloße Wiederholung.",
    },
    {
      title: "Abschnittsüberschrift & Eyebrow",
      purpose: "Themen klar benennen und eine verlässliche Dokumenthierarchie herstellen.",
      anatomy:
        "Optionaler kurzer Eyebrow als Text, h2 mit stabiler ID, optionale Beschreibung. Projekttitel folgen als h3.",
      tokens: [
        "--font-size-h2",
        "--font-size-h2-min",
        "--font-size-caption",
        "--font-family-mono",
        "--color-heading",
        "--color-accent",
        "--space-3",
        "--space-4",
        "--size-prose",
      ],
      states: "Statisch. Farbe und Typografie drücken Rang aus, keine Interaktionszustände.",
      keyboard:
        "Mit Überschriftennavigation auffindbar. Keine dekorative Nummer und kein klickbarer Titel ohne Ziel.",
      responsive:
        "Die h2-Größe wächst zwischen 1.75rem und 2.625rem; Zeilen dürfen umbrechen. Keine feste Höhe.",
      copy: "Eyebrow kurz, Titel aussagekräftig. Keine Muster wie „01 —“ und keine zusätzlichen Striche als Dekoration.",
    },
    {
      title: "Header, Marke & Skip-Link",
      purpose: "Identität, schnelle Orientierung und direkten Zugang zum Inhalt anbieten.",
      anatomy:
        "Sticky header, Container, verlinktes LS-Zeichen und Name, Hauptnavigation sowie Sprach-, Theme- und Menübedienung. Skip-Link vor der regulären Navigation.",
      tokens: [
        "--size-header",
        "--size-touch",
        "--color-bg",
        "--color-heading",
        "--color-border",
        "--color-focus",
        "--radius-small",
      ],
      states:
        "Marke: Standard, Hover, Focus-visible, Aktiv. Skip-Link erscheint bei Fokus. Header bleibt deckend und lesbar.",
      keyboard:
        "Erste erreichbare Aktion ist der Skip-Link. Marke führt zu #top. Fokus wird vom Sticky-Header nicht verdeckt.",
      responsive:
        "Unter 64rem nutzt die Hauptnavigation ein Disclosure-Menü. Bei engen Breiten darf der sichtbare Name kompakter werden; der zugängliche Markenname bleibt vollständig.",
      copy: "Lukas Stumpfel ist unverändert. Zugänglicher Markenname lokalisiert „Startseite“ / „home“. Keine nichtssagenden „hier“-Links.",
    },
    {
      title: "Hauptnavigation & mobiles Menü",
      purpose: "Die fünf zentralen Inhaltsbereiche ohne Umwege erreichbar machen.",
      anatomy:
        "Beschriftete nav mit fünf echten Ankerlinks. Mobil: natives details mit benanntem summary und darin enthaltenem Navigationsbereich. Der Browser vermittelt den offenen/geschlossenen Zustand nativ.",
      tokens: [
        "--size-touch",
        "--color-muted",
        "--color-heading",
        "--color-accent",
        "--color-focus",
        "--color-border-strong",
        "--space-3",
        "--breakpoint-wide",
      ],
      states:
        "Links: Standard, Hover, Fokus, Aktiv. Menü: geschlossen/offen über das native open-Attribut. Geschlossene Links sind nicht fokussierbar. Grundbedienung funktioniert ohne JavaScript.",
      keyboard:
        "Tab/Shift+Tab für Links; Enter/Leertaste am summary. Escape schließt und fokussiert summary. Ankerwahl schließt und fokussiert das Ziel; Klick außerhalb schließt ebenfalls.",
      responsive:
        "Desktop-Navigation ab 64rem. Unterhalb davon vertikale Menülinks mit mindestens 44px hohen Zielen und ohne horizontales Abschneiden.",
      copy: "DE: Über mich, Projekte, Erfahrung, Stack, Kontakt. EN: About, Projects, Experience, Stack, Contact. Reihenfolge und Ziele stimmen überein; bei Wechsel auf 64rem wird das mobile Menü geschlossen.",
    },
    {
      title: "Sprachauswahl DE / EN",
      purpose:
        "Den gleichen fachlichen Inhalt in einer bewusst gewählten Sprache erreichbar machen.",
      anatomy:
        'Eigenständig beschriftete nav mit zwei Links, hreflang/lang und aria-current="page" für die aktive Sprachroute.',
      tokens: [
        "--size-touch",
        "--font-family-mono",
        "--font-size-caption",
        "--color-accent",
        "--color-heading",
        "--color-subtle",
        "--color-border",
      ],
      states:
        "Aktuelle Sprache, inaktive Sprache, Hover, Fokus. Der aktuelle Zustand ist semantisch beschrieben und nicht allein farbig.",
      keyboard:
        "Tab und Enter wie bei gewöhnlichen Links. Kein nachgebauter Tab- oder Button-Schalter für Routen.",
      responsive:
        "Beide Sprachziele bleiben im Header erreichbar. Labels werden weder zu Flaggen reduziert noch im Menü vergessen.",
      copy: "DE und EN sichtbar; Deutsch und English als zugängliche Namen. Englisch /, Deutsch /de/. Technologiemarken und Namen unverändert.",
    },
    {
      title: "Theme-Auswahl",
      purpose: "Lesesituation und persönliche Darstellungspräferenz berücksichtigen.",
      anatomy:
        "Natives select mit zugänglicher Bezeichnung, zwei festen Optionen und gespeichertem Auswahlwert. data-theme enthält die konkrete Palette.",
      tokens: [
        "--size-touch",
        "--color-surface",
        "--color-heading",
        "--color-border-strong",
        "--color-focus",
        "--radius-small",
        "--font-size-small",
      ],
      states:
        "Standard, Hover, Fokus und native geöffnete Optionsliste. Default Dunkel; Auswahl Dunkel oder Hell.",
      keyboard:
        "Native Bedienung des Auswahlfelds beibehalten. Keine künstlichen Tastenkürzel oder selbstgebauten Options-Listen.",
      responsive:
        "Mindestens 44px hoch; genug Breite für die längste lokalisierte Option. Die gespeicherte Auswahl bleibt beim Sprachwechsel erhalten.",
      copy: "DE: Dunkel / Hell. EN: Dark / Light. Speicherfehler dürfen die lokale Auswahl nicht blockieren.",
    },
    {
      title: "Primäraktion",
      purpose: "Den wichtigsten nächsten Schritt im jeweiligen Kontext eindeutig hervorheben.",
      anatomy:
        "Nativer Link bei Navigation oder nativer Button bei lokaler Aktion. .button .button--primary; kurze Bezeichnung, optional unterstützendes Icon.",
      tokens: [
        "--size-touch",
        "--space-3",
        "--space-5",
        "--font-size-small",
        "--font-weight-medium",
        "--color-accent",
        "--color-action-text",
        "--color-focus",
        "--radius-small",
        "--motion-fast",
      ],
      states:
        "Standard: Kontur und Text im Akzent. Hover: Akzentfläche mit action-text. Fokus: abgesetzte Linie. Aktiv: kurze gedrückte Rückmeldung. Disabled und Loading sind reine Referenzzustände, solange kein entsprechender Website-Workflow existiert.",
      keyboard:
        'Link mit Enter, Button mit Enter/Leertaste. Ein deaktivierter Button nutzt disabled. Kein klickbarer Container und kein nutzloses href="#".',
      responsive:
        "Darf in engen Aktionsgruppen die verfügbare Breite nutzen; Label darf lesbar umbrechen. Zielhöhe nie zugunsten einer schmaleren Ansicht verkleinern.",
      copy: "Zielorientiert: „Projekte ansehen“ oder „E-Mail an Lukas“. Pro Kontext klare Priorität; kein unklarer Werbetext.",
    },
    {
      title: "Sekundäraktion, Ghost & Icon-Button",
      purpose: "Ergänzende Aktionen erreichbar halten, ohne die Primäraktion zu überdecken.",
      anatomy:
        ".button--secondary mit kräftiger Kontrollkontur; .button--ghost mit ruhiger Fläche. Icon-Button mit mindestens 44 × 44px großem Ziel und zugänglichem Namen.",
      tokens: [
        "--color-border-strong",
        "--color-heading",
        "--color-muted",
        "--color-surface-raised",
        "--color-focus",
        "--size-touch",
        "--size-icon",
        "--radius-small",
      ],
      states:
        "Standard, Hover mit erhöhter Fläche, Fokus, Aktiv. Disabled nur auf tatsächlichen Buttons; keine deaktivierten Navigationslinks vortäuschen.",
      keyboard:
        "Native Semantik. Dekoratives Icon aria-hidden; alleinstehendes Icon braucht einen präzisen aria-label.",
      responsive:
        "Aktionszeilen umbrechen. Icon bleibt in fester Größe, umgebendes Touch-Ziel bleibt mindestens 44px.",
      copy: "GitHub, LinkedIn, E-Mail oder Lebenslauf benennen das Ziel. Download nur bei vorhandener Datei. Ein neues Tab wird, wo sinnvoll, zugänglich angekündigt.",
    },
    {
      title: "Textlink & externe Verbindung",
      purpose: "Weiterführende Ziele im Lesefluss oder unter einem Projekt klar anbieten.",
      anatomy:
        'Echtes a mit href; .text-link nutzt sichtbaren Linktext und Pfeil oder externes Icon. target="_blank" wird mit rel="noreferrer" ergänzt.',
      tokens: [
        "--color-accent",
        "--color-accent-hover",
        "--color-focus",
        "--size-touch",
        "--space-2",
        "--font-size-small",
        "--font-weight-medium",
      ],
      states:
        "Standard, Hover, Focus-visible, Aktiv. Link bleibt auch ohne Farbe über Text, Unterstreichung und Kontext verständlich.",
      keyboard:
        "Mit Tab erreichbar, Enter öffnet. Keine Aktion ausschließlich am Icon oder nur bei Hover.",
      responsive: "Text darf umbrechen. Lange Adressen werden nicht aus dem Viewport gedrückt.",
      copy: "Beschreibend: „Repository ansehen“ im eindeutigen Projektkontext; zugänglicher Name benennt zusätzlich das konkrete Projekt.",
    },
    {
      title: "Badge & Technologielabel",
      purpose: "Kurze Einordnung und Technologietexte kompakt gliedern.",
      anatomy:
        "Nicht interaktives span bzw. Listenelement mit .badge; kleine rechteckige Kontur, Monospace-Text und knappe Innenabstände.",
      tokens: [
        "--color-surface",
        "--color-border",
        "--color-muted",
        "--font-family-mono",
        "--font-size-caption",
        "--line-height-label",
        "--space-1",
        "--space-2",
        "--radius-small",
      ],
      states:
        "Statisch. Keine Hover-Verfärbung als Scheinfunktion, kein Pointer-Cursor, kein Fokus.",
      keyboard: "Nicht in der Tab-Reihenfolge; Text ist regulär für Screenreader verfügbar.",
      responsive:
        "Gruppe flex-wrap; kleine Zwischenräume. Keine abgeschnittenen Technologien und keine horizontal scrollende Pflichtliste.",
      copy: "Offizielle Bezeichnungen wie C#, .NET, ASP.NET Core und Kubernetes beibehalten. Kein Prozentwert und keine Sternebewertung.",
    },
    {
      title: "Karte & ruhige Oberfläche",
      purpose:
        "Zusammengehörige Inhalte dort bündeln, wo eine abgegrenzte Fläche die Orientierung verbessert.",
      anatomy:
        ".card mit surface-Hintergrund, einfacher Kontur und mittlerem Radius. Die lokale Komposition ergänzt Innenabstand und Inhalt.",
      tokens: [
        "--color-surface",
        "--color-border",
        "--radius-medium",
        "--shadow-card",
        "--space-5",
        "--space-6",
        "--space-8",
      ],
      states:
        "Standard. Ein Inhaltscontainer erhält ohne tatsächliche Aktion keinen Hover-Lift und kein Link-Cursor.",
      keyboard:
        "Die Karte selbst ist nicht fokussierbar. Nur enthaltene echte Aktionen sind Tab-Ziele.",
      responsive:
        "Inhalt darf wachsen; kein festes Gleichhöhen-Raster für unterschiedlich lange Übersetzungen.",
      copy: "Eine inhaltliche Gruppe pro Fläche. Projekte verwenden die eigene offene Zeilenkomposition und nicht automatisch eine weitere Karte.",
    },
    {
      title: "Hero, Namensüberschrift & Bild",
      purpose:
        "Person, Junior-Rolle, fachlichen Schwerpunkt und wichtigsten nächsten Schritt sofort verständlich machen.",
      anatomy:
        "Section #top, kurzer Rollenhinweis, eine h1 mit Name, Einleitung, Hauptaktion, vorhandene Kontakt-/Profilwege und lokal gespeichertes Blackline-Bild.",
      tokens: [
        "--color-hero-base",
        "--color-hero-heading",
        "--color-hero-text",
        "--color-hero-accent",
        "--color-hero-focus",
        "--font-size-h1",
        "--font-size-h1-min",
        "--size-prose",
        "--space-8",
        "--space-12",
      ],
      states:
        "Bild ist dekorativ und nicht interaktiv. Bild und Hero-Farbrollen wechseln gemeinsam zwischen Anthrazit/hellem Text und warmem Papier/dunklem Text; Links haben ihren echten Fokus- und Hoverzustand.",
      keyboard:
        'Nur Aktionen fokussierbar. Rein atmosphärisches Bild alt=""; Name und Aussage sind echte Texte und für assistive Technik verfügbar.',
      responsive:
        "Bei 64rem große Bild-/Typografiekomposition. Kleine Ansicht: Text und Aktionen vor oder klar über dem art-direktierten Motiv; keine unlesbar kleine Namenszeile.",
      copy: "Lukas Stumpfel, Junior Software Engineer, nachvollziehbare Ausrichtung auf C#/.NET, Linux, Docker/Kubernetes und Systemdenken. Keine erfundenen Leistungen.",
    },
    {
      title: "Profilpanel, aktueller Fokus & Bachelorarbeit",
      purpose:
        "Die vorhandenen fachlichen Zusatzinformationen aus dem Hero übersichtlich bewahren.",
      anatomy:
        "Eigenständiges Panel unter dem Bild-Hero: Profil-Dateibezeichnung und .NET/Linux/K8s, Liste des aktuellen Fokus und kurzer Absatz zur Bachelorarbeit. Die Fokusliste und die Über-mich-Highlights teilen .accent-list: 4px-Quadrate in --color-accent, 12px Textabstand und role=list für zugängliche Listensemantik.",
      tokens: [
        "--color-surface",
        "--color-border",
        "--color-heading",
        "--color-muted",
        "--color-accent",
        "--font-family-mono",
        "--font-size-small",
        "--space-6",
        "--space-8",
      ],
      states:
        "Statischer Inhalt. Der Dateiname ist ein visuelles Metadatenmotiv und kein vorgetäuschter Dateidownload.",
      keyboard:
        "Überschriften und Liste regulär semantisch verfügbar; Terminal-Icon dekorativ. Kein künstlicher Fokus auf nicht interaktive Labels.",
      responsive:
        "Groß drei fachlich zusammengehörige Spalten, klein in klarer Reihenfolge untereinander. Texte bleiben vollständig erhalten.",
      copy: "Profil-Dateibezeichnung, drei Fokuszeilen und vorhandener Bachelorarbeits-Text aus data/content.ts bleiben DE/EN unverändert. Keine Terminalbefehle als neue Funktion.",
    },
    {
      title: "Projektzeile & Repository-Aktion",
      purpose: "Ausgewählte Arbeit nachvollziehbar vorstellen und prüfbar verlinken.",
      anatomy:
        "article mit Vorschau, Einordnung, h3-Projekttitel, Beschreibung, fachlichem Bezug, Technologiegruppe und eindeutigem Repository-Link.",
      tokens: [
        "--font-size-h3",
        "--color-heading",
        "--color-text",
        "--color-muted",
        "--color-accent",
        "--color-border",
        "--space-6",
        "--space-8",
        "--space-12",
      ],
      states:
        "Statischer Inhalt plus explizite Repository-Links an Vorschau und GitHub-Text. Keine versteckte Ganzzeilen-Klickfläche. Keine wichtige Information nur bei Hover.",
      keyboard:
        "Vorschau- und Textlink haben eindeutige projektbezogene Namen. Projektname ist eine Überschrift, keine Schaltfläche ohne Ziel.",
      responsive:
        "Groß: offene Bild-/Textzeile. Klein: Vorschau und Text in natürlicher Reihenfolge untereinander. Badges und lange Beschreibung dürfen wachsen.",
      copy: "NodeControl, WeatherMesh, CodeForge und ChatTool bleiben enthalten. Studienprojekt und Prototyp sind ehrlich gekennzeichnet. Technologieliste folgt den Projektdaten.",
    },
    {
      title: "Projektbild & textbasierter Fallback",
      purpose:
        "Echte Arbeit sichtbar machen, ohne bei fehlendem Bild eine fertige Oberfläche zu erfinden.",
      anatomy:
        "Seitenverhältnis-Rahmen, lokales Vorschaubild mit konkretem Alternativtext oder ruhiger Text-Fallback mit Name und Projektkategorie.",
      tokens: [
        "--color-surface",
        "--color-border",
        "--color-heading",
        "--color-accent",
        "--radius-small",
        "--space-6",
      ],
      states:
        "Vorhandene Datei oder Fallback. Die Darstellung ist keine neue Lade- oder Screenshot-Erzeugungsfunktion.",
      keyboard:
        "Das Bild selbst ist statisch; sein umgebender Repository-Link ist ein reguläres Tab-Ziel mit projektbezogenem Namen. Alternativtext beschreibt die Vorschau konkret.",
      responsive:
        "Breite flüssig, Bildverhältnis stabil. Wichtige Oberflächenbereiche nicht abschneiden. Keine Verzerrung und kein Layoutsprung beim Laden.",
      copy: "Resolver nach Projektnamen unter public/images; Präferenz WebP, AVIF, PNG, JPG, JPEG. Ohne passenden Asset neutral „Projektvorschau“, keine erfundenen Produktdaten.",
    },
    {
      title: "Über mich",
      purpose: "Aus Erfahrung und Werdegang ein glaubwürdiges persönliches Profil machen.",
      anatomy:
        "Abschnitt #about mit h2 und wenigen lesbaren Absätzen; kurze sachliche Zusammenfassungen ergänzen, ohne den Text zu ersetzen.",
      tokens: [
        "--size-prose",
        "--color-text",
        "--color-muted",
        "--color-heading",
        "--line-height-body",
        "--space-5",
        "--space-8",
      ],
      states: "Statischer Lesebereich. Keine Karten-Hover-Effekte ohne Aktion.",
      keyboard: "Normale Überschriften- und Absatzstruktur; keine künstlichen Tab-Stationen.",
      responsive:
        "Groß Überschrift neben Text, klein untereinander. Maximale Prosebreite bleibt bestehen.",
      copy: "Informatikabschluss, praktische .NET-Erfahrung bei FOTEC, aktueller Systemfokus und früherer operativer Gastronomie-Hintergrund bleiben nachvollziehbar.",
    },
    {
      title: "Schwerpunkte",
      purpose: "Fachliche Vertiefungsrichtungen verständlich in eigenständige Themen aufteilen.",
      anatomy:
        "Abschnittstitel und fünf Einträge mit unterstützendem Icon, Titel und kurzer Beschreibung.",
      tokens: [
        "--color-heading",
        "--color-muted",
        "--color-accent",
        "--size-icon",
        "--space-4",
        "--space-6",
        "--space-8",
      ],
      states: "Nicht interaktive Inhalte. Icons sind dekorativ; keine erfundene Detailnavigation.",
      keyboard:
        "Lesbare Liste oder klar gegliederte Artikel. Keine Tab-Station für dekorative Icons.",
      responsive: "Themenraster bricht in eine lesbare Spalte um; Textlängen bestimmen die Höhe.",
      copy: "C#/.NET Engineering, Linux & Container, verteilte Systeme, Softwarearchitektur und Security-Grundlagen. Lernrichtung nicht als unbelegte Spezialisierungszertifizierung formulieren.",
    },
    {
      title: "Erfahrung & Timeline",
      purpose: "Rollen, Zeiträume und konkrete Aufgaben schnell vergleichbar machen.",
      anatomy:
        "Abschnitt #experience, chronologisch rückwärts geordnete Stationen, Datum, Rolle, Organisation und Tätigkeitsbeschreibung.",
      tokens: [
        "--font-family-mono",
        "--font-size-small",
        "--color-accent",
        "--color-heading",
        "--color-muted",
        "--color-border",
        "--space-5",
        "--space-6",
      ],
      states: "Statisch. Verbindungslinien und Symbole dienen nur der Orientierung.",
      keyboard:
        "Die Reihenfolge ist im DOM korrekt. Keine Rolle als interaktiver Button ohne Ziel.",
      responsive:
        "Groß Datum neben Inhalt; klein Datum direkt oberhalb der Station. Dekorative Linie darf nicht in den Text ragen.",
      copy: "FOTEC Junior Developer 10/2024–03/2025, Praktikum 08/2024, Gastronomie-Hintergrund 2014–2023. Konkrete Tätigkeit statt erfundener Kennzahlen.",
    },
    {
      title: "Ausbildung",
      purpose:
        "Die vorhandenen Ausbildungsangaben mit klarer Hierarchie und unverändertem Wortlaut zugänglich machen.",
      anatomy:
        "Ausbildungsabschnitt mit Zeitraum/Status, Abschlussbezeichnung, Institution und kurzer Beschreibung; Titel als h3.",
      tokens: [
        "--color-heading",
        "--color-muted",
        "--color-accent",
        "--color-border",
        "--space-4",
        "--space-6",
        "--space-8",
      ],
      states: "Statischer Status als Text, nicht ausschließlich durch Badgefarbe.",
      keyboard: "Reguläre Überschriften und Texte. Ein Statusbadge ist nicht fokussierbar.",
      responsive:
        "Groß zwei offene Ausbildungsblöcke, klein untereinander. Lange Masterbezeichnung darf vollständig umbrechen.",
      copy: "Den gelieferten Projektstand erhalten: M.Sc. Informatik – Software and Security Engineering mit „Start 09/2026“ und „Zugelassen, mit geplantem Fokus …“. BSc. Informatik „Abgeschlossen 07/2026“, mit gutem Erfolg. Die Schreibweise BSc. ist ausdrücklich korrigiert. Weitere inhaltliche Aktualisierungen sind ein eigener Auftrag.",
    },
    {
      title: "Tech Stack",
      purpose:
        "Genutzte Werkzeuge und Konzepte übersichtlich nach fachlichem Zusammenhang gruppieren.",
      anatomy:
        "Abschnitt #stack, Backend, Frontend & App, Infrastruktur und Architektur; Gruppenüberschrift mit umbrechenden Textlabels.",
      tokens: [
        "--font-family-mono",
        "--font-size-caption",
        "--color-heading",
        "--color-muted",
        "--color-border",
        "--space-2",
        "--space-6",
        "--space-8",
      ],
      states:
        "Statische Angaben. Keine Hover-Popups mit versteckten notwendigen Erklärungen und keine fingierten Ratings.",
      keyboard:
        "Gruppentitel und Listen semantisch lesbar. Nicht interaktive Labels bleiben außerhalb der Tab-Reihenfolge.",
      responsive:
        "Regelmäßige Gruppen auf großen Ansichten, nacheinander auf Mobile. Technologien umbrechen ohne horizontale Pflichtnavigation.",
      copy: "Offizielle Schreibweise. „Ansible-Grundlagen“ und „Clean-Architecture-Konzepte“ behalten ihren einschränkenden Zusatz.",
    },
    {
      title: "Kontaktbereich",
      purpose: "Eine klare, niedrigschwellige Verbindung zur Person anbieten.",
      anatomy:
        "Abschnitt #contact mit Kontrastfläche, h2, kurzer Einladung, Mail-Aktion und den bestehenden GitHub-/LinkedIn-Verbindungen sowie Standorttext.",
      tokens: [
        "--color-contact-bg",
        "--color-contact-text",
        "--color-contact-muted",
        "--color-contact-border",
        "--color-contact-accent",
        "--size-touch",
        "--space-6",
        "--space-10",
      ],
      states:
        "Links haben Hover, Fokus und Aktiv. Fokus verwendet auf der hellen Kontaktfläche eine ausreichend dunkle Rolle. Standort bleibt ohne Kartenfunktion reiner Text.",
      keyboard:
        "Mail-Link und Profil-Links mit Tab/Enter. Keine Formulare oder Submit-Aktionen erfinden.",
      responsive:
        "Groß Text und Kontaktwege nebeneinander. Klein darunter mit umbrechender E-Mail-Adresse und ausreichend großen Zielen.",
      copy: "lukas.stumpfel@live.de, github.com/Katharon, LinkedIn Lukas Stumpfel und Bad Sauerbrunn/Burgenland. Offenheit für Junior-Rollen sachlich formulieren.",
    },
    {
      title: "Footer",
      purpose: "Die Seite ruhig abschließen und bestehende Profilwege wieder auffindbar machen.",
      anatomy:
        "footer mit feiner Trennung, aktuellem Jahr, Name, Hinweis auf das statische Portfolio und vorhandenen Links.",
      tokens: [
        "--color-bg",
        "--color-subtle",
        "--color-border",
        "--color-heading",
        "--color-focus",
        "--font-size-small",
        "--space-4",
        "--space-8",
      ],
      states: "Text statisch; Links Standard, Hover, Fokus und Aktiv.",
      keyboard: "Links regulär fokussierbar. Keine unbenannten alleinstehenden Icons.",
      responsive:
        "Groß in einer Zeile, klein mit sinnvollem Umbruch. Touch-Abstand zwischen Profil-Links bleibt erhalten.",
      copy: "Name und Kontaktziele stimmen mit Header, Hero und Kontaktbereich überein. Jahreszahl aktuell; lokalisierter Hinweis auf statisches Portfolio.",
    },
  ];
  function renderContracts() {
    const container = byId("component-contracts");
    const labels = [
      ["purpose", "Zweck"],
      ["anatomy", "Anatomie"],
      ["tokens", "CSS-Variablen"],
      ["states", "Zustände"],
      ["keyboard", "Tastatur & Semantik"],
      ["responsive", "Responsive Verhalten"],
      ["copy", "Inhaltsregeln"],
    ];
    contracts.forEach((contract, index) => {
      const details = make("details", "guide-contract");
      details.id = "vertrag-" + index;
      const summary = make("summary", "", contract.title);
      const region = make("div", "guide-table-scroll");
      const table = make("table");
      const caption = make("caption", "", contract.title + " — Regeln für Umsetzung und Prüfung");
      const body = make("tbody");
      labels.forEach(([key, label]) => {
        const row = make("tr");
        const heading = make("th", "", label);
        heading.scope = "row";
        const value = make("td");
        if (key === "tokens") {
          const group = make("div", "guide-contract-tokens");
          contract.tokens.forEach((token) => group.append(make("code", "", token)));
          value.append(group);
        } else value.textContent = contract[key];
        row.append(heading, value);
        body.append(row);
      });
      table.append(caption, body);
      region.append(table);
      details.append(summary, region);
      container.append(details);
    });
  }

  const contrastPairs = [
    ["Fließtext / Grundfläche", "--color-text", "--color-bg", 4.5],
    ["Überschrift / Grundfläche", "--color-heading", "--color-bg", 4.5],
    ["Sekundärtext / Grundfläche", "--color-muted", "--color-bg", 4.5],
    ["Metadaten / Grundfläche", "--color-subtle", "--color-bg", 4.5],
    ["Aktionslink / Grundfläche", "--color-accent", "--color-bg", 4.5],
    ["Überschrift / Oberfläche", "--color-heading", "--color-surface", 4.5],
    ["Gefüllter Primary / Text", "--color-action-text", "--color-accent", 4.5],
    ["Kontakttext / Kontaktfläche", "--color-contact-text", "--color-contact-bg", 4.5],
    ["Kontakt-Sekundärtext / Kontaktfläche", "--color-contact-muted", "--color-contact-bg", 4.5],
    ["Kontaktaktion / Kontaktfläche", "--color-contact-accent", "--color-contact-bg", 4.5],
    ["Fokus / Grundfläche", "--color-focus", "--color-bg", 3],
    ["Kontrollkontur / Grundfläche", "--color-border-strong", "--color-bg", 3],
    ["Hero-Titel / Hero-Basis", "--color-hero-heading", "--color-hero-base", 4.5],
    ["Hero-Text / Hero-Basis", "--color-hero-text", "--color-hero-base", 4.5],
    ["Hero-Aktion / Hero-Basis", "--color-hero-accent", "--color-hero-base", 4.5],
    ["Hero-Fokus / Hero-Basis", "--color-hero-focus", "--color-hero-base", 3],
  ];
  function rgbColor(value) {
    const hex = value.match(/^#([0-9a-f]{6})$/i);
    if (hex) return [0, 2, 4].map((index) => parseInt(hex[1].slice(index, index + 2), 16) / 255);
    const short = value.match(/^#([0-9a-f]{3})$/i);
    if (short) return short[1].split("").map((char) => parseInt(char + char, 16) / 255);
    const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (rgb)
      return rgb
        .slice(1, 4)
        .map(Number)
        .map((number) => number / 255);
    return null;
  }
  function luminance(rgb) {
    const linear = rgb.map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  }
  function contrast(first, second) {
    const a = rgbColor(first);
    const b = rgbColor(second);
    if (!a || !b) return null;
    const l1 = luminance(a),
      l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function renderContrast() {
    const probes = {};
    ["dark", "light"].forEach((theme) => {
      const probe = make("div");
      probe.dataset.theme = theme;
      probe.setAttribute("aria-hidden", "true");
      probe.style.cssText = "position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;";
      document.body.append(probe);
      probes[theme] = probe;
    });
    const fragment = document.createDocumentFragment();
    contrastPairs.forEach(([label, foreground, background, target]) => {
      const row = make("tr");
      const heading = make("th", "", label);
      heading.scope = "row";
      row.append(heading);
      ["dark", "light"].forEach((theme) => {
        const ratio = contrast(
          computed(foreground, probes[theme]),
          computed(background, probes[theme]),
        );
        const cell = make(
          "td",
          "guide-contrast-value",
          ratio === null ? "—" : ratio.toFixed(2) + ":1",
        );
        cell.dataset.pass = String(ratio !== null && ratio >= target);
        cell.append(
          make(
            "small",
            "",
            ratio === null ? "Token nicht geladen" : ratio >= target ? "Erfüllt" : "Prüfen",
          ),
        );
        row.append(cell);
      });
      row.append(make("td", "", target.toFixed(1) + ":1"));
      fragment.append(row);
    });
    byId("contrast-rows").replaceChildren(fragment);
    Object.values(probes).forEach((probe) => probe.remove());
  }

  function applyTheme(choice, persist = false) {
    const selected = allowedThemes.has(choice) ? choice : "dark";
    const resolved = selected;
    root.dataset.themeChoice = selected;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved === "light" ? "light" : "dark";
    byId("theme-choice").value = selected;
    byId("theme-status").textContent =
      "Aktive Auswahl: " +
      themeLabels[selected] +
      ". Die Komponenten und aktuellen Tokenwerte folgen dieser Ansicht.";
    if (persist)
      try {
        localStorage.setItem("blackline-styleguide-theme", selected);
      } catch {
        /* The live selection still works. */
      }
    document.querySelectorAll("[data-theme-image]").forEach((image) => {
      image.src = selected === "light" ? image.dataset.themeSrcLight : image.dataset.themeSrcDark;
    });
    renderSemantic();
    renderContrast();
  }

  const localizedExample = {
    de: {
      eyebrow: "Ausgewählte Projekte",
      title: "Portfolio- und Studienprojekte mit Systembezug.",
      body: "Ausgewählte Arbeiten zu Backend, Desktop, verteilten Systemen und Security-nahen Themen.",
      link: "Projekte ansehen →",
    },
    en: {
      eyebrow: "Selected projects",
      title: "Portfolio and study projects with a systems angle.",
      body: "Selected work across backend, desktop, distributed-systems and security-oriented topics.",
      link: "View projects →",
    },
  };
  document.querySelectorAll("[data-demo-locale]").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const locale = link.dataset.demoLocale;
      const copy = localizedExample[locale];
      document.querySelectorAll("[data-demo-locale]").forEach((item) => {
        if (item === link) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
      byId("language-copy").lang = locale;
      byId("language-eyebrow").textContent = copy.eyebrow;
      byId("language-title").textContent = copy.title;
      byId("language-body").textContent = copy.body;
      byId("language-link").textContent = copy.link;
    }),
  );

  const menuButton = byId("demo-menu");
  const demoDisclosure = byId("demo-disclosure");
  const demoNavigation = byId("demo-mobile-nav");
  function setDemoMenu(open, restoreFocus = false) {
    demoDisclosure.open = open;
    if (restoreFocus) menuButton.focus();
  }
  demoNavigation.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      setDemoMenu(false);
      const target = byId(link.hash.slice(1));
      if (target) {
        target.tabIndex = -1;
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    }),
  );
  document.addEventListener("pointerdown", (event) => {
    if (demoDisclosure.open && !demoDisclosure.contains(event.target)) setDemoMenu(false);
  });
  const wideQuery = window.matchMedia ? window.matchMedia("(min-width: 64rem)") : null;
  if (wideQuery?.addEventListener)
    wideQuery.addEventListener("change", () => {
      if (wideQuery.matches) setDemoMenu(false);
    });
  const guideMenu = byId("guide-menu");
  const guideSidebar = document.querySelector(".guide-sidebar");
  function setGuideMenu(open, restoreFocus = false) {
    guideSidebar.classList.toggle("is-open", open);
    guideMenu.setAttribute("aria-expanded", String(open));
    if (restoreFocus) guideMenu.focus();
  }
  guideMenu.addEventListener("click", () =>
    setGuideMenu(guideMenu.getAttribute("aria-expanded") !== "true"),
  );
  document
    .querySelectorAll(".guide-navigation a")
    .forEach((link) => link.addEventListener("click", () => setGuideMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (demoDisclosure.open) {
      setDemoMenu(false, true);
      event.preventDefault();
    } else if (guideMenu.getAttribute("aria-expanded") === "true") {
      setGuideMenu(false, true);
      event.preventDefault();
    }
  });
  byId("toggle-preview").addEventListener("click", (event) => {
    const fallback = event.currentTarget.getAttribute("aria-pressed") !== "true";
    event.currentTarget.setAttribute("aria-pressed", String(fallback));
    event.currentTarget.textContent = fallback ? "Screenshot zeigen" : "Fallback zeigen";
    byId("project-screenshot").hidden = fallback;
    byId("project-fallback").hidden = !fallback;
  });
  byId("example-action").addEventListener("click", () => {
    byId("example-action-status").textContent =
      "Beispielaktion ausgeführt. Dies ist nur eine lokale Zustandsdemonstration im Styleguide.";
  });
  byId("focus-example").addEventListener("click", () => {
    byId("focus-example-status").textContent =
      "Rückmeldung: Der native Button ist mit Enter oder Leertaste bedienbar; der Fokus bleibt am Auslöser.";
  });
  byId("expand-contracts").addEventListener("click", () =>
    document.querySelectorAll(".guide-contract").forEach((item) => {
      item.open = true;
    }),
  );
  byId("collapse-contracts").addEventListener("click", () =>
    document.querySelectorAll(".guide-contract").forEach((item) => {
      item.open = false;
    }),
  );
  byId("theme-choice").addEventListener("change", (event) => applyTheme(event.target.value, true));
  byId("token-search").addEventListener("input", applySearch);
  window.addEventListener("storage", (event) => {
    if (event.key === "blackline-styleguide-theme")
      applyTheme(allowedThemes.has(event.newValue) ? event.newValue : "dark");
  });

  let scrollPending = false;
  const sections = [...document.querySelectorAll("main > .guide-section")];
  const navigationLinks = [...document.querySelectorAll(".guide-navigation a")];
  function updateCurrentSection() {
    let active = sections[0]?.id;
    for (const section of sections)
      if (section.getBoundingClientRect().top <= 150) active = section.id;
    navigationLinks.forEach((link) => {
      if (link.hash === "#" + active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollPending = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(updateCurrentSection);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateCurrentSection, { passive: true });

  renderRaw();
  renderScales();
  renderContracts();
  applyTheme(root.dataset.themeChoice || "dark");
  updateCurrentSection();
})();
