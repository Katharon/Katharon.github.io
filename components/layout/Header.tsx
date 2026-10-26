import { profile } from "@/data/profile";
import { localeLabels, localeNames, localeRoutes, type Locale } from "@/data/i18n";
import { portfolioContent } from "@/data/content";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { MobileNavigation } from "./MobileNavigation";

export function Header({ locale }: { locale: Locale }) {
  const { aria, header } = portfolioContent[locale];
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <div className="header-inner container">
        <a className="brand" href="#top" aria-label={aria.home}>
          <span className="brand-mark" aria-hidden="true">
            LS
          </span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <nav className="header-navigation" aria-label={aria.primaryNav}>
          {header.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <nav className="language-switch" aria-label={aria.languageNav}>
            {(["en", "de"] as const).map((item) => (
              <a
                key={item}
                href={localeRoutes[item]}
                hrefLang={item}
                lang={item}
                aria-current={item === locale ? "page" : undefined}
                aria-label={localeNames[item]}
              >
                {localeLabels[item]}
              </a>
            ))}
          </nav>
          <ThemeSelector locale={locale} ariaLabel={aria.themeNav} />
          <MobileNavigation locale={locale} />
        </div>
      </div>
    </header>
  );
}
