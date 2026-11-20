import Link from "next/link";
import { BRAND_LINE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="brand-bar">
      <div className="brand-block">
        <Link href="/" className="brand brand-link">
          Safe <span>Link</span> Check
        </Link>
        <p className="tag">{BRAND_LINE}</p>
      </div>
      <nav className="site-nav" aria-label="Site">
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#common-scams">Scam patterns</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </header>
  );
}
