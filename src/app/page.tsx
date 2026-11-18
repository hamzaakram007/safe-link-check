import { Disclaimer } from "@/components/Disclaimer";
import { DiscordStub } from "@/components/DiscordStub";
import { OfficialStores } from "@/components/OfficialStores";
import { UrlChecker } from "@/components/UrlChecker";
import { getPatternsMeta } from "@/lib/check-url";

export default function Home() {
  const meta = getPatternsMeta();

  return (
    <main className="shell">
      <header className="brand-bar">
        <p className="brand">
          Safe <span>Link</span> Check
        </p>
        <p className="tag">Educational MVP</p>
      </header>

      <section className="hero">
        <h1>Paste a link. Spot fake download &amp; scam patterns fast.</h1>
        <p>
          Built for launch-week noise: phishing pages, “free Ultimate Edition” traps, and
          fake PC installers when the real game is console-only. Heuristics — not a scanner.
        </p>
      </section>

      <section className="checker-panel" aria-label="URL checker">
        <UrlChecker />
      </section>

      <OfficialStores />
      <DiscordStub />
      <Disclaimer />

      <p className="meta-line">
        Seeded rules v{meta.version} · {meta.patternCount} patterns · updated {meta.updated}
      </p>

      <footer className="site-footer">
        <span>Independent tool — unaffiliated with Rockstar, Take-Two, PlayStation, or Xbox.</span>
        <a href="https://github.com/hamzaakram007/safe-link-check">Source on GitHub</a>
      </footer>
    </main>
  );
}
