export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

export const localeRoutes: Record<Locale, string> = {
  en: "/",
  de: "/de/",
};

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}
