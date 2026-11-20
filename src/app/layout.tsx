import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

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
    default: `${SITE_NAME} — fake download & scam URL checker`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Paste a URL and get a safe / suspicious / scam-pattern check. Educational heuristics for fake PC game download lures, phishing unlock pages, and launch-week scams. Not antivirus. A NeonGulf tool — unaffiliated with Rockstar.",
  applicationName: SITE_NAME,
  keywords: [
    "scam link checker",
    "fake download checker",
    "game download scam",
    "PC download scam",
    "phishing URL check",
    "safe link check",
    "console launch scam",
    "NeonGulf",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
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
    siteName: SITE_NAME,
    title: `${SITE_NAME} — spot fake download & scam links`,
    description:
      "URL pattern checker for fake PC installers, phishing unlock pages, and launch-week lures. Not antivirus. Buy only from official stores.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — fake download & scam URL checker`,
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
    name: SITE_NAME,
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
