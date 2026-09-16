import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Cursor } from "@/components/site/cursor";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { PageTransition } from "@/components/site/page-transition";
import { ScrollProgress } from "@/components/site/scroll-progress";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anirudh — Full-stack developer",
    template: "%s · Anirudh",
  },
  description:
    "Full-stack developer building web applications with React, Next.js and TypeScript, plus AI/ML features. Five complete demo applications with real data layers, auth and payments in test mode.",
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "web application development",
    "AI ML developer",
  ],
  authors: [{ name: "Anirudh" }],
  creator: "Anirudh",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Anirudh",
    title: "Anirudh — Full-stack developer",
    description:
      "Building digital experiences that feel alive. Five complete demo applications: ordering, reservations, CRUD dashboards, accounts and test-mode payments.",
    images: [{ url: "/art/og-cover.svg", width: 1200, height: 630, alt: "Anirudh — full-stack developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh — Full-stack developer",
    description: "Building digital experiences that feel alive.",
    images: ["/art/og-cover.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-white-warm focus:px-4 focus:py-2 focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Cursor />
        <SiteNav />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
