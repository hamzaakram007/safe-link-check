import Link from "next/link";
import { BRAND_NAME, BRAND_LINE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="brand-bar">
      <div className="brand-block">
        <p className="brand-kicker">{BRAND_NAME}</p>
        <Link href="/" className="brand brand-link">
          Safe <span>Link</span> Check
        </Link>
        <p className="tag">{BRAND_LINE}</p>
      </div>
      <nav className="site-nav" aria-label="Site">
        <a href="#checker">Checker</a>
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#common-scams">Scam patterns</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </header>
  );
}
