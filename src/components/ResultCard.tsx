import type { CheckResult, Verdict } from "@/lib/types";

const VERDICT_LABEL: Record<Verdict, string> = {
  safe: "Looks safe (patterns)",
  suspicious: "Suspicious",
  scam: "Scam pattern",
};

export function ResultCard({ result }: { result: CheckResult }) {
  return (
    <article className={`result-card verdict-${result.verdict}`} aria-live="polite">
      <header className="result-header">
        <p className="verdict-pill">{VERDICT_LABEL[result.verdict]}</p>
        <p className="risk-score">
          Risk score <strong>{result.score}</strong>/100
        </p>
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

      <p className="result-foot muted">
        Checked {new Date(result.checkedAt).toLocaleString()} · educational heuristics only —
        not antivirus or a malware scanner.
      </p>
    </article>
  );
}
