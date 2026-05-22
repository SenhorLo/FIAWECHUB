import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIA WEC Fan Hub — 14 marcas. 2 classes. 24 horas.",
  description:
    "Fan hub não-oficial celebrando o FIA World Endurance Championship 2026 — Hypercar, LMGT3 e as 24 Horas de Le Mans.",
  openGraph: {
    title: "FIA WEC Fan Hub",
    description:
      "14 fabricantes. 2 classes. 24 horas. Celebrando o Mundial de Endurance 2026.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
