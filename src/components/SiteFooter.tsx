import Link from "next/link";
import { GEAR_HUB_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-copy">
        <span>
          Independent NeonGulf tool — unaffiliated with Rockstar, Take-Two, PlayStation, or Xbox.
          Not antivirus. Pattern checks only; always verify the address bar yourself.
        </span>
        <p className="footer-gear muted">
          Need real console gear (SSD, headset, capture)? Soft link only:{" "}
          <a href={GEAR_HUB_URL} rel="noopener noreferrer">
            NeonGulf Gear Hub
          </a>
          .
        </p>
      </div>
      <nav className="footer-nav" aria-label="Legal and source">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="https://github.com/hamzaakram007/safe-link-check">Source on GitHub</a>
        <a href={GEAR_HUB_URL} rel="noopener noreferrer">
          Gear Hub
        </a>
      </nav>
    </footer>
  );
}
