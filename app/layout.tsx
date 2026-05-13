import type { Metadata } from "next";
import "./globals.css";

const title = "Lukas Stumpfel | C#/.NET, Linux & Kubernetes";
const description =
  "Computer science student focused on C#/.NET, Linux, Kubernetes, distributed systems and software architecture.";

export const metadata: Metadata = {
  metadataBase: new URL("https://katharon.github.io"),
  title,
  description,
  applicationName: "Lukas Stumpfel Portfolio",
  authors: [{ name: "Lukas Stumpfel" }],
  creator: "Lukas Stumpfel",
  openGraph: {
    title,
    description,
    url: "https://katharon.github.io",
    siteName: "Lukas Stumpfel Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
