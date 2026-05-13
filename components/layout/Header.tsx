import { clsx } from "clsx";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { getAlternateLocale, localeLabels, localeNames, localeRoutes, type Locale } from "@/data/i18n";
import { portfolioContent } from "@/data/content";
import { ThemeSelector } from "@/components/theme/ThemeSelector";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const { aria, header } = portfolioContent[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--site-border)] bg-[var(--site-header-bg)] backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <a
          className="group inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[var(--site-heading)]"
          href="#top"
          aria-label={aria.home}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-[color:var(--site-accent-border)] bg-[var(--site-accent-soft)] font-mono text-[var(--site-accent-text)]">
            LS
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden items-center gap-1 md:flex" aria-label={aria.primaryNav}>
            {header.navigation.map((item) => (
              <a
                key={item.href}
                className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-[var(--site-muted)] transition hover:bg-[var(--site-control-hover)] hover:text-[var(--site-heading)]"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeSelector locale={locale} ariaLabel={aria.themeNav} />
          <LanguageSwitcher locale={locale} ariaLabel={aria.languageNav} />
        </div>
      </Container>
      <div className="border-t border-[color:var(--site-border-soft)] md:hidden">
        <Container>
          <nav
            className="-mx-2 flex gap-1 overflow-x-auto py-2"
            aria-label={aria.mobilePrimaryNav}
          >
            {header.navigation.map((item) => (
              <a
                key={item.href}
                className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-sm font-medium text-[var(--site-muted)] transition hover:bg-[var(--site-control-hover)] hover:text-[var(--site-heading)]"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}

function LanguageSwitcher({ locale, ariaLabel }: { locale: Locale; ariaLabel: string }) {
  const alternateLocale = getAlternateLocale(locale);

  return (
    <nav
      aria-label={ariaLabel}
      className="inline-flex rounded-lg border border-[color:var(--site-border)] bg-[var(--site-control-bg)] p-1"
    >
      {([locale, alternateLocale] as const).map((item) => {
        const isActive = item === locale;

        return (
          <a
            key={item}
            href={localeRoutes[item]}
            hrefLang={item}
            aria-current={isActive ? "page" : undefined}
            aria-label={localeNames[item]}
            className={clsx(
              "inline-flex min-h-9 min-w-10 items-center justify-center rounded-md px-2.5 font-mono text-xs font-semibold transition",
              isActive
                ? "bg-[var(--site-accent-soft)] text-[var(--site-accent-text)]"
                : "text-[var(--site-subtle)] hover:bg-[var(--site-control-hover)] hover:text-[var(--site-heading)]",
            )}
          >
            {localeLabels[item]}
          </a>
        );
      })}
    </nav>
  );
}
