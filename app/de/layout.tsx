import type { Metadata } from "next";
import "../globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";
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
      data-theme="midnight"
      data-theme-choice="system"
      suppressHydrationWarning
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--site-bg)] text-[var(--site-text)]">
        {children}
      </body>
    </html>
  );
}
