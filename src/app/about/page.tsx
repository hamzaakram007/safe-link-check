import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Safe Link Check is, how the rules work, and what it is not. Educational URL pattern checker from NeonGulf.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="shell">
      <SiteHeader />

      <article className="legal-doc">
        <p className="legal-kicker">About</p>
        <h1>Safe Link Check</h1>
        <p className="lede">
          Safe Link Check helps people spot fake game-download and phishing URL patterns before they
          click, download, or sign in. It is a NeonGulf educational tool — not a security product
          that scans files or replaces antivirus.
        </p>

        <h2>What we do</h2>
        <p>
          You paste a link. We parse the host, path, and query, then compare them to a maintained
          rules file: official store allowlists, known lure naming, risky file extensions,
          shorteners, suspicious TLDs, and brand lookalike tokens. Results are labeled with
          plain-language next steps and can be shared with a permalink.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not download or execute files from the link you paste.</li>
          <li>We do not visit or sandbox the destination page from our servers.</li>
          <li>We do not replace antivirus, browser warnings, or platform safety tools.</li>
          <li>
            We are not affiliated with Rockstar Games, Take-Two Interactive, PlayStation, Sony,
            Xbox, or Microsoft.
          </li>
        </ul>

        <h2>Who it is for</h2>
        <p>
          Anyone who gets “free download,” “PC version,” “Ultimate Edition unlock,” or “verify your
          account” links around a console launch — especially when the real game is sold only through
          official PlayStation, Xbox, or publisher storefronts.
        </p>

        <h2>Contact</h2>
        <p>
          Product feedback and rule suggestions: open an issue on{" "}
          <a href="https://github.com/hamzaakram007/safe-link-check">GitHub</a>. For how we handle
          data, see the <Link href="/privacy">Privacy</Link> page.
        </p>

        <p className="muted legal-updated">Last updated: November 20, 2026</p>
      </article>

      <SiteFooter />
    </main>
  );
}
