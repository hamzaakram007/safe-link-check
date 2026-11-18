"use client";

import { useMemo, useState, useTransition } from "react";
import { checkUrl } from "@/lib/check-url";
import type { CheckResult } from "@/lib/types";
import { ResultCard } from "./ResultCard";

const EXAMPLES = [
  "https://store.playstation.com/",
  "http://free-gta6-pc-download.bad.example/setup.exe",
  "https://bit.ly/not-a-real-store",
];

export function UrlChecker() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => value.trim().length > 0 && !isPending, [value, isPending]);

  function runCheck(raw: string) {
    setError(null);
    startTransition(() => {
      try {
        const next = checkUrl(raw);
        setResult(next);
      } catch (e) {
        setResult(null);
        setError(e instanceof Error ? e.message : "Could not check that URL.");
      }
    });
  }

  return (
    <div className="stack-gap">
      <form
        className="checker-form"
        onSubmit={(e) => {
          e.preventDefault();
          runCheck(value);
        }}
      >
        <label htmlFor="url" className="sr-only">
          Paste a URL to check
        </label>
        <div className="input-row">
          <input
            id="url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="Paste a link — e.g. a “free PC download” someone sent you"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="url-input"
          />
          <button type="submit" className="cta" disabled={!canSubmit}>
            {isPending ? "Checking…" : "Check link"}
          </button>
        </div>
      </form>

      <div className="example-row">
        <span className="muted">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            className="chip"
            onClick={() => {
              setValue(ex);
              runCheck(ex);
            }}
          >
            {ex.replace(/^https?:\/\//, "").slice(0, 42)}
            {ex.length > 48 ? "…" : ""}
          </button>
        ))}
      </div>

      {error ? <p className="error-banner" role="alert">{error}</p> : null}
      {result ? <ResultCard result={result} /> : null}
    </div>
  );
}
