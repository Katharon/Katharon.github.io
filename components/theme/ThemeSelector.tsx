"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/data/i18n";
import {
  defaultTheme,
  isThemeChoice,
  themeOptions,
  themeStorageKey,
  type ThemeChoice,
} from "@/lib/theme";

const themeChangeEvent = "portfolio-theme-change";

function applyTheme(choice: ThemeChoice, persist: boolean) {
  const root = document.documentElement;
  root.dataset.theme = choice;
  root.dataset.themeChoice = choice;
  root.style.colorScheme = choice;
  if (persist) {
    try {
      window.localStorage.setItem(themeStorageKey, choice);
    } catch {
      /* Theme changes still work when browser storage is unavailable. */
    }
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

function getSnapshot(): ThemeChoice {
  const choice = document.documentElement.dataset.themeChoice;
  return isThemeChoice(choice) ? choice : defaultTheme;
}

function subscribe(onChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === themeStorageKey)
      applyTheme(isThemeChoice(event.newValue) ? event.newValue : defaultTheme, false);
  };
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ThemeSelector({ locale, ariaLabel }: { locale: Locale; ariaLabel: string }) {
  const choice = useSyncExternalStore(subscribe, getSnapshot, () => defaultTheme);
  return (
    <select
      className="theme-select"
      value={choice}
      aria-label={ariaLabel}
      onChange={(event) => {
        if (isThemeChoice(event.target.value)) applyTheme(event.target.value, true);
      }}
    >
      {themeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.labels[locale]}
        </option>
      ))}
    </select>
  );
}
