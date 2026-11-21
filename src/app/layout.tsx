import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { BRAND_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
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
    default: `${SITE_NAME} — fake download & scam URL checker | ${BRAND_NAME}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Paste a URL and get a clear safe / suspicious / scam-pattern result. Free NeonGulf checker for fake PC game download lures and phishing unlock pages. Not antivirus. Buy only from official stores.",
  applicationName: SITE_NAME,
  keywords: [
    "scam link checker",
    "fake download checker",
    "game download scam",
    "PC download scam",
    "phishing URL check",
    "safe link check",
    "console launch scam",
    "is this download safe",
    "NeonGulf",
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
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
    siteName: `${SITE_NAME} · ${BRAND_NAME}`,
    title: `${SITE_NAME} — spot fake download & scam links`,
    description:
      "Paste a link. Get safe / suspicious / scam-pattern signals, why they matched, and what to do. Not antivirus. Buy only from official stores.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — fake download & scam URL checker`,
    description:
      "Paste a link. Get a clear verdict and next steps. Educational pattern checks — not antivirus.",
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      description:
        "Educational URL checker that flags fake download and scam patterns using a rules list. Not antivirus.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      isAccessibleForFree: true,
      provider: {
        "@type": "Organization",
        name: BRAND_NAME,
        url: "https://neongulf.com",
      },
      disclaimer:
        "Educational pattern checks only. Not antivirus. Not affiliated with Rockstar Games, Take-Two, PlayStation, or Xbox.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is there a PC version at console launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. At console launch the game is sold for PlayStation and Xbox storefronts. Pages offering a PC installer, Steam unlock, or free setup.exe are almost always scams.",
          },
        },
        {
          "@type": "Question",
          name: "Is Safe Link Check antivirus?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It is an educational link checker. It compares the URL text to a rules list. It does not download files, open the destination, or replace antivirus.",
          },
        },
        {
          "@type": "Question",
          name: "Where should I buy the game?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Buy only from official PlayStation Store, Xbox / Microsoft Store, or the publisher store when listed. Type the address yourself when you can.",
          },
        },
      ],
    },
  ];

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
