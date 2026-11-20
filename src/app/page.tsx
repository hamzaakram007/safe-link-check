import { Disclaimer } from "@/components/Disclaimer";
import { HowItWorks } from "@/components/HowItWorks";
import { OfficialStores } from "@/components/OfficialStores";
import { ScamPatterns } from "@/components/ScamPatterns";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustBanner } from "@/components/TrustBanner";
import { UrlCheckerBoundary } from "@/components/UrlCheckerBoundary";
import { getPatternsMeta } from "@/lib/check-url";

export default function Home() {
  const meta = getPatternsMeta();

  return (
    <main className="shell">
      <SiteHeader />

      <TrustBanner />

      <section className="hero">
        <h1>Check a link before you download or sign in.</h1>
        <p>
          Paste a URL to see whether it matches known fake-download and phishing patterns — PC
          installer lures, free “Ultimate Edition” claims, brand lookalikes, and similar launch-week
          traps. Heuristics only: this is not antivirus, and the destination is never opened from
          here. Results can be shared with a <code>?u=</code> permalink.
        </p>
      </section>

      <section className="checker-panel" aria-label="URL checker">
        <UrlCheckerBoundary />
      </section>

      <HowItWorks />
      <ScamPatterns />
      <OfficialStores />
      <Disclaimer />

      <p className="meta-line">
        Rules v{meta.version} · {meta.patternCount} patterns · updated {meta.updated}
      </p>

      <SiteFooter />
    </main>
  );
}
