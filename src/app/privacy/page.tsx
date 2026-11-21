import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Safe Link Check: checks run in your browser; we do not sell personal data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy · ${SITE_NAME}`,
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="shell">
      <SiteHeader />

      <article className="legal-doc">
        <p className="legal-kicker">Privacy</p>
        <h1>Privacy policy</h1>
        <p className="lede">
          This page explains what Safe Link Check collects and what it does not. The checker is
          designed so URL analysis runs in your browser against a local rules file.
        </p>

        <h2>Summary</h2>
        <ul>
          <li>URL checks run client-side. We do not need an account for the public checker.</li>
          <li>We do not sell personal information.</li>
          <li>We do not use pasted URLs to build advertising profiles.</li>
          <li>
            Shareable result links put the checked URL in the page address (<code>?u=</code>). Anyone
            with that link can see the same check — treat shared links like any other URL you pass
            along.
          </li>
        </ul>

        <h2>Information we process</h2>
        <h3>URLs you paste</h3>
        <p>
          The address you enter is evaluated in your browser. It may appear in your browser history
          and in share permalinks you create. Do not paste secrets, passwords, or private tokens into
          the checker or into a share link.
        </p>

        <h3>Hosting and logs</h3>
        <p>
          The site is hosted on standard web infrastructure (for example Vercel). Hosts may keep
          routine access logs such as IP address, user agent, referrer, and requested path for
          security, reliability, and abuse prevention. Those logs are controlled by the host’s
          policies, not stored by us as a product database of checked links.
        </p>

        <h3>Analytics and cookies</h3>
        <p>
          The public checker does not require login cookies. If analytics or similar measurement is
          added later, this page will be updated to name the provider and the categories of data
          involved. Until then, assume only what your browser and the hosting provider collect by
          default for serving a static/web app.
        </p>

        <h2>Children</h2>
        <p>
          Safe Link Check is a general educational tool. It is not directed at children under 13, and
          we do not knowingly collect personal information from children.
        </p>

        <h2>Third-party links</h2>
        <p>
          Official store buttons and other outbound links go to third-party sites. Their privacy
          practices are their own. Prefer typing store addresses yourself when you can.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy as the product changes. The “Last updated” date at the bottom
          will change when we do. Continued use after an update means you accept the revised policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy: open an issue on{" "}
          <a href="https://github.com/hamzaakram007/safe-link-check">GitHub</a>, or see{" "}
          <Link href="/about">About</Link> for product context.
        </p>

        <p className="muted legal-updated">Last updated: November 21, 2026</p>
      </article>

      <SiteFooter />
    </main>
  );
}
