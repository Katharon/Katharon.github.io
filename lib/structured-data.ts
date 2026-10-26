import { metadataContent } from "@/data/content";
import { localeRoutes, type Locale } from "@/data/i18n";
import { profile } from "@/data/profile";
import { siteName, siteUrl } from "@/lib/metadata";

export function createPortfolioStructuredData(locale: Locale) {
  const homeUrl = new URL(localeRoutes.en, siteUrl).href;
  const pageUrl = new URL(localeRoutes[locale], siteUrl).href;
  const personId = `${homeUrl}#person`;
  const websiteId = `${homeUrl}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homeUrl,
        name: siteName,
        alternateName: profile.name,
        inLanguage: ["en", "de"],
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: metadataContent[locale].title,
        description: metadataContent[locale].description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: homeUrl,
        description: profile.role[locale],
        sameAs: [profile.github, profile.linkedin],
      },
    ],
  };
}

export function serializeStructuredData(data: ReturnType<typeof createPortfolioStructuredData>) {
  // A literal '<' could terminate the HTML script element, even inside a JSON string.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
