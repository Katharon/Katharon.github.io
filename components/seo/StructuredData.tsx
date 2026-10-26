import type { Locale } from "@/data/i18n";
import { createPortfolioStructuredData, serializeStructuredData } from "@/lib/structured-data";

type StructuredDataProps = {
  locale: Locale;
};

export function StructuredData({ locale }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeStructuredData(createPortfolioStructuredData(locale)),
      }}
    />
  );
}
