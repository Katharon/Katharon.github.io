export const themeStorageKey = "portfolio-theme";
export const defaultTheme = "dark";
export const themeOptions = [
  { value: "dark", labels: { en: "Dark", de: "Dunkel" } },
  { value: "light", labels: { en: "Light", de: "Hell" } },
] as const;
export type ThemeChoice = (typeof themeOptions)[number]["value"];
export function isThemeChoice(value: unknown): value is ThemeChoice {
  return themeOptions.some((option) => option.value === value);
}
const bootstrapConfig = JSON.stringify({
  key: themeStorageKey,
  choices: themeOptions.map((option) => option.value),
  fallback: defaultTheme,
});
export const themeBootstrapScript =
  "(function(){var config=" +
  bootstrapConfig +
  ";var choice=config.fallback;try{var stored=localStorage.getItem(config.key);if(config.choices.indexOf(stored)!==-1)choice=stored;}catch(error){}var root=document.documentElement;root.dataset.theme=choice;root.dataset.themeChoice=choice;root.style.colorScheme=choice;})();";
