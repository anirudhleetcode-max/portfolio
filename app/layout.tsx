import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { PageTransition } from "@/components/site/page-transition";
import "./globals.css";

/** Body and structure. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

/** Used only for short personal lines, in italic. Never for body copy. */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-loaded",
  display: "swap",
});

/** Small technical metadata only — section numbers, stacks, labels. */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anirudh Malladi — Developer",
    template: "%s · Anirudh Malladi",
  },
  description:
    "I'm Anirudh, a computer science student who builds web applications end to end — interface, API, data layer and the edge cases in between. Five complete applications, plus work in machine learning.",
  keywords: [
    "Anirudh Malladi",
    "developer portfolio",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "full-stack developer",
  ],
  authors: [{ name: "Anirudh Malladi" }],
  creator: "Anirudh Malladi",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Anirudh Malladi",
    title: "Anirudh Malladi — Developer",
    description:
      "I build web applications end to end — interface, API, data layer and the edge cases in between.",
    images: [{ url: "/art/og-cover.svg", width: 1200, height: 630, alt: "Anirudh Malladi — developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh Malladi — Developer",
    description: "I build web applications end to end.",
    images: ["/art/og-cover.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
