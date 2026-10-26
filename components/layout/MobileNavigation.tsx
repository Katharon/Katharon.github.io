"use client";

import { useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

export function MobileNavigation({ locale }: { locale: Locale }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const content = portfolioContent[locale];

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !disclosure.current?.contains(event.target))
        disclosure.current?.removeAttribute("open");
    };
    const query = window.matchMedia("(min-width: 64rem)");
    const closeOnWideScreen = () => {
      if (query.matches) disclosure.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", closeOutside);
    query.addEventListener("change", closeOnWideScreen);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      query.removeEventListener("change", closeOnWideScreen);
    };
  }, []);

  function closeAndFocusTarget(href: string) {
    disclosure.current?.removeAttribute("open");
    window.requestAnimationFrame(() =>
      document.getElementById(href.slice(1))?.focus({ preventScroll: true }),
    );
  }

  return (
    <details
      className="mobile-navigation"
      ref={disclosure}
      onKeyDown={(event) => {
        if (event.key === "Escape" && disclosure.current?.open) {
          event.preventDefault();
          disclosure.current.removeAttribute("open");
          summary.current?.focus();
        }
      }}
    >
      <summary ref={summary} className="menu-trigger" aria-label={content.aria.mobilePrimaryNav}>
        <Menu aria-hidden="true" />
      </summary>
      <nav className="mobile-menu" aria-label={content.aria.mobilePrimaryNav}>
        {content.header.navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => closeAndFocusTarget(item.href)}>
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
