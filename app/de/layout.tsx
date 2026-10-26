import type { Metadata } from "next";
import "../globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPortfolioMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPortfolioMetadata("de");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-theme="dark"
      data-theme-choice="dark"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <ThemeScript />
        <StructuredData locale="de" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
