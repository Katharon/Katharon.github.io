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
      data-theme="dark"
      data-theme-choice="dark"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
