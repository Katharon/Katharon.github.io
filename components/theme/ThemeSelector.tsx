"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Monitor, Moon, MoonStar, Sun } from "lucide-react";
import { clsx } from "clsx";
import type { Locale } from "@/data/i18n";

type ThemeChoice = "system" | "dark" | "light" | "midnight";
type ResolvedTheme = Exclude<ThemeChoice, "system">;

const storageKey = "portfolio-theme";

const themeOptions: Array<{
  value: ThemeChoice;
  icon: LucideIcon;
  labels: Record<Locale, string>;
}> = [
  {
    value: "system",
    icon: Monitor,
    labels: {
      en: "System",
      de: "System",
    },
  },
  {
    value: "dark",
    icon: Moon,
    labels: {
      en: "Dark",
      de: "Dunkel",
    },
  },
  {
    value: "light",
    icon: Sun,
    labels: {
      en: "Light",
      de: "Hell",
    },
  },
  {
    value: "midnight",
    icon: MoonStar,
    labels: {
      en: "Midnight",
      de: "Midnight",
    },
  },
];

const themeValues = new Set<ThemeChoice>(themeOptions.map((option) => option.value));

type ThemeSelectorProps = {
  locale: Locale;
  ariaLabel: string;
};

export function ThemeSelector({ locale, ariaLabel }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeChoice>("system");

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = root.dataset.themeChoice ?? window.localStorage.getItem(storageKey);
    const initialTheme =
      storedTheme && themeValues.has(storedTheme as ThemeChoice)
        ? (storedTheme as ThemeChoice)
        : "system";

    window.requestAnimationFrame(() => setSelectedTheme(initialTheme));
    applyTheme(initialTheme);

    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemThemeChange = () => {
      if ((root.dataset.themeChoice ?? "system") === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function handleThemeChange(theme: ThemeChoice) {
    setSelectedTheme(theme);
    applyTheme(theme);
  }

  return (
    <div
      className="inline-flex rounded-lg border border-[color:var(--site-border)] bg-[var(--site-control-bg)] p-1"
      role="group"
      aria-label={ariaLabel}
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const label = option.labels[locale];
        const isActive = selectedTheme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={clsx(
              "inline-grid min-h-9 min-w-9 place-items-center rounded-md transition",
              isActive
                ? "bg-[var(--site-accent-soft)] text-[var(--site-accent-text)]"
                : "text-[var(--site-muted)] hover:bg-[var(--site-control-hover)] hover:text-[var(--site-heading)]",
            )}
            aria-label={label}
            aria-pressed={isActive}
            title={label}
            onClick={() => handleThemeChange(option.value)}
          >
            <Icon aria-hidden="true" className="size-4" />
          </button>
        );
      })}
    </div>
  );
}

function applyTheme(theme: ThemeChoice) {
  const root = document.documentElement;
  const resolvedTheme = resolveTheme(theme);

  root.dataset.theme = resolvedTheme;
  root.dataset.themeChoice = theme;
  root.style.colorScheme = resolvedTheme === "light" ? "light" : "dark";

  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {}
}

function resolveTheme(theme: ThemeChoice): ResolvedTheme {
  if (theme !== "system") {
    return theme;
  }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "midnight";
}
