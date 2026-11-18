import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://safe-link-check-jade.vercel.app";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Safe Link Check — fake download & scam URL checker",
    template: "%s · Safe Link Check",
  },
  description:
    "Paste a URL and get a safe / suspicious / scam-pattern check. Educational heuristics for fake PC game download lures, phishing unlock pages, and launch-week scams. Not antivirus. Unaffiliated with Rockstar.",
  applicationName: "Safe Link Check",
  keywords: [
    "scam link checker",
    "fake download checker",
    "GTA 6 scam",
    "PC download scam",
    "phishing URL check",
    "safe link check",
    "console launch scam",
  ],
  authors: [{ name: "Safe Link Check" }],
  creator: "Safe Link Check",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Safe Link Check",
    title: "Safe Link Check — spot fake download & scam links",
    description:
      "Educational URL pattern checker for fake PC installers, phishing unlock pages, and launch-week lures. Not antivirus. Buy only from official stores.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Link Check — fake download & scam URL checker",
    description:
      "Paste a link. Get safe / suspicious / scam-pattern signals. Educational heuristics — not antivirus.",
  },
  category: "security",
};

export const viewport: Viewport = {
  themeColor: "#061018",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Safe Link Check",
    url: SITE_URL,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    description:
      "Educational URL checker that flags fake download and scam patterns using seeded heuristics.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    disclaimer:
      "Educational heuristics only. Not antivirus. Not affiliated with Rockstar Games, Take-Two, PlayStation, or Xbox.",
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
