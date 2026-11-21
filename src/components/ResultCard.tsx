"use client";

import { useEffect, useState } from "react";
import { getOfficialStores } from "@/lib/check-url";
import { buildShareUrl } from "@/lib/share";
import type { CheckResult, Verdict } from "@/lib/types";

const VERDICT_LABEL: Record<Verdict, string> = {
  safe: "Looks safe (patterns)",
  suspicious: "Suspicious",
  scam: "Scam pattern",
};

const VERDICT_HINT: Record<Verdict, string> = {
  safe: "No strong scam signals in our rules — still not a guarantee.",
  suspicious: "Only continue if you fully trust the source. Prefer official stores.",
  scam: "Strong scam / malware-lure patterns. Do not engage.",
};

export function ResultCard({ result }: { result: CheckResult }) {
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared" | "error">("idle");
  const stores = getOfficialStores().slice(0, 3);
  const showStoreCtas = result.verdict !== "safe" || !result.isOfficialStore;

  useEffect(() => {
    setShareState("idle");
  }, [result.normalizedUrl, result.checkedAt]);

  async function shareResult() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = buildShareUrl(origin, result.url);
    const title = `Safe Link Check — ${VERDICT_LABEL[result.verdict]}`;
    const text = `${VERDICT_LABEL[result.verdict]} (risk ${result.score}/100) for ${result.host}. There is no PC version at console launch — buy only from official stores.`;

    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title, text, url: shareUrl });
        setShareState("shared");
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setShareState("copied");
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      } catch {
        setShareState("error");
      }
    }
  }

  const shareLabel =
    shareState === "copied"
      ? "Link copied"
      : shareState === "shared"
        ? "Thanks for sharing"
        : result.verdict === "scam"
          ? "Warn a friend — share result"
          : "Share this result";

  return (
    <article className={`result-card verdict-${result.verdict}`} aria-live="polite">
      <header className="result-header">
        <div>
          <p className="verdict-pill">{VERDICT_LABEL[result.verdict]}</p>
          <p className="verdict-hint muted">{VERDICT_HINT[result.verdict]}</p>
        </div>
        <div className="risk-block" aria-label={`Risk score ${result.score} out of 100`}>
          <p className="risk-score">
            Risk score <strong>{result.score}</strong>/100
          </p>
          <div className="risk-meter" role="presentation">
            <span className="risk-meter-fill" style={{ width: `${result.score}%` }} />
          </div>
        </div>
      </header>

      <p className="result-summary">{result.summary}</p>

      <dl className="result-meta">
        <div>
          <dt>Host</dt>
          <dd>{result.host}</dd>
        </div>
        <div>
          <dt>Normalized</dt>
          <dd className="mono wrap">{result.normalizedUrl}</dd>
        </div>
        <div>
          <dt>Signals</dt>
          <dd>
            {result.hits.length} matched ·{" "}
            {result.isOfficialStore ? "official allowlist" : "rules + pattern checks"}
          </dd>
        </div>
      </dl>

      {result.hits.length > 0 ? (
        <ul className="hit-list">
          {result.hits.map((hit) => (
            <li key={`${hit.id}-${hit.source}`}>
              <span className={`hit-sev sev-${hit.severity}`}>{hit.severity}</span>
              <span>{hit.reason}</span>
              <span className="hit-source">{hit.source}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <section className="next-steps" aria-label="What to do next">
        <h3>What to do next</h3>
        <ol>
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {showStoreCtas ? (
        <section className="result-stores" aria-label="Official store shortcuts">
          <h3>{result.verdict === "scam" ? "Skip the lure — buy official" : "Safer path: official stores"}</h3>
          <div className="store-cta-row">
            {stores.map((store) => (
              <a
                key={store.url}
                className="store-cta"
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="store-cta-name">{store.name}</span>
                <span className="store-cta-note">{store.note}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <div className="result-actions">
        <button type="button" className="cta share-cta" onClick={shareResult}>
          {shareLabel}
        </button>
        {shareState === "error" ? (
          <span className="muted" role="status">
            Could not copy — copy the address bar instead.
          </span>
        ) : (
          <span className="muted">
            Creates a shareable link with <code>?u=</code> so others see the same check.
          </span>
        )}
      </div>

      <p className="result-foot muted">
        Checked {new Date(result.checkedAt).toLocaleString()} · pattern rules only — not antivirus,
        not a live malware scan, and not affiliated with Rockstar, Take-Two, PlayStation, or Xbox.
      </p>
    </article>
  );
}
