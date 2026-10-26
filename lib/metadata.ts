import type { Metadata } from "next";
import { localeRoutes, type Locale } from "@/data/i18n";
import { metadataContent } from "@/data/content";

export const siteUrl = "https://katharon.github.io";
export const siteName = "Lukas Stumpfel Portfolio";

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
  const socialImage = `/images/social-preview-${locale}.png`;

  return {
    metadataBase: new URL(siteUrl),
    title: content.title,
    description: content.description,
    applicationName: siteName,
    authors: [{ name: "Lukas Stumpfel" }],
    creator: "Lukas Stumpfel",
    icons: {
      icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
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
          type: "image/png",
          width: 1200,
          height: 630,
          alt: content.socialImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [
        {
          url: socialImage,
          alt: content.socialImageAlt,
        },
      ],
    },
  };
}
