import type { MetadataRoute } from "next";
import { localeRoutes } from "@/data/i18n";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

const lastModified = "2026-07-23";

const localizedUrls = {
  en: new URL(localeRoutes.en, siteUrl).toString(),
  de: new URL(localeRoutes.de, siteUrl).toString(),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: localizedUrls.en,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: localizedUrls.en,
          de: localizedUrls.de,
          "x-default": localizedUrls.en,
        },
      },
    },
    {
      url: localizedUrls.de,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: localizedUrls.en,
          de: localizedUrls.de,
          "x-default": localizedUrls.en,
        },
      },
    },
  ];
}
