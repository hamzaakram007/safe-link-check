import { Disclaimer } from "@/components/Disclaimer";
import { HowItWorks } from "@/components/HowItWorks";
import { LaunchFact } from "@/components/LaunchFact";
import { OfficialStores } from "@/components/OfficialStores";
import { ScamPatterns } from "@/components/ScamPatterns";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustBanner } from "@/components/TrustBanner";
import { UrlCheckerBoundary } from "@/components/UrlCheckerBoundary";
import { getPatternsMeta } from "@/lib/check-url";
import { BRAND_NAME } from "@/lib/site";

export default function Home() {
  const meta = getPatternsMeta();

  return (
    <main className="shell">
      <a href="#checker" className="skip-link">
        Skip to link checker
      </a>

      <SiteHeader />

      <TrustBanner />

      <section className="hero">
        <p className="hero-brand">{BRAND_NAME}</p>
        <h1>Paste a link. See if it looks like a fake download or scam.</h1>
        <p>
          Get a clear <strong>safe</strong>, <strong>suspicious</strong>, or{" "}
          <strong>scam-pattern</strong> result — with why it matched and what to do next. Free,
          runs in your browser, never opens the link. Not antivirus.
        </p>
      </section>

      <LaunchFact />

      <section className="checker-panel" id="checker" aria-label="URL checker">
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
