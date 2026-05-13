import type { Metadata } from "next";
import { localeRoutes, type Locale } from "@/data/i18n";
import { metadataContent } from "@/data/content";

const siteUrl = "https://katharon.github.io";
const siteName = "Lukas Stumpfel Portfolio";

const keywords = [
  "Lukas Stumpfel",
  "C#",
  ".NET",
  "Linux",
  "Kubernetes",
  "Distributed Systems",
  "Verteilte Systeme",
  "Software Architecture",
  "Softwarearchitektur",
  "Platform Engineering",
  "Plattform-Engineering",
];

export function createPortfolioMetadata(locale: Locale): Metadata {
  const content = metadataContent[locale];
  const canonical = localeRoutes[locale];
  const socialImage = locale === "de" ? "/de/opengraph-image" : "/opengraph-image";
  const twitterImage = locale === "de" ? "/de/twitter-image" : "/twitter-image";

  return {
    metadataBase: new URL(siteUrl),
    title: content.title,
    description: content.description,
    applicationName: siteName,
    authors: [{ name: "Lukas Stumpfel" }],
    creator: "Lukas Stumpfel",
    alternates: {
      canonical,
      languages: {
        en: localeRoutes.en,
        de: localeRoutes.de,
        "x-default": localeRoutes.en,
      },
    },
    keywords,
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName,
      locale: content.openGraphLocale,
      alternateLocale: content.alternateOpenGraphLocale,
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [twitterImage],
    },
  };
}
