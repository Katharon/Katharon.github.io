import type { Metadata } from "next";
import "../globals.css";
import { createPortfolioMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPortfolioMetadata("de");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
