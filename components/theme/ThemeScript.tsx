const themeScript = `
(function() {
  var storageKey = "portfolio-theme";
  var themes = { system: true, dark: true, light: true, midnight: true };
  var choice = "system";

  try {
    var stored = window.localStorage.getItem(storageKey);
    if (stored && themes[stored]) {
      choice = stored;
    }
  } catch (error) {}

  var resolved = choice;

  if (choice === "system") {
    resolved = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "midnight";
  }

  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themeChoice = choice;
  document.documentElement.style.colorScheme = resolved === "light" ? "light" : "dark";
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
