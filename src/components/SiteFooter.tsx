import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        Independent tool — unaffiliated with Rockstar, Take-Two, PlayStation, or Xbox. Not
        antivirus. Pattern checks only; always verify the address bar yourself.
      </span>
      <nav className="footer-nav" aria-label="Legal and source">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="https://github.com/hamzaakram007/safe-link-check">Source on GitHub</a>
      </nav>
    </footer>
  );
}
