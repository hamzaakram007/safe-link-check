"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { checkUrl } from "@/lib/check-url";
import { buildShareUrl, readSharedUrlParam } from "@/lib/share";
import type { CheckResult } from "@/lib/types";
import { ResultCard } from "./ResultCard";

const EXAMPLES = [
  "https://store.playstation.com/",
  "http://free-gta6-pc-download.bad.example/setup.exe",
  "https://bit.ly/not-a-real-store",
  "https://rockstar-login-secure.xyz/verify-account",
];

export function UrlChecker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [hydratedShare, setHydratedShare] = useState(false);

  const canSubmit = useMemo(() => value.trim().length > 0 && !isPending, [value, isPending]);

  function syncShareParam(raw: string) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const next = buildShareUrl(origin || "https://safe-link-check-jade.vercel.app", raw);
    const relative = `${pathname}?${new URL(next).searchParams.toString()}`;
    router.replace(relative, { scroll: false });
  }

  function runCheck(raw: string, opts?: { syncUrl?: boolean }) {
    setError(null);
    startTransition(() => {
      try {
        const next = checkUrl(raw);
        setResult(next);
        if (opts?.syncUrl !== false) {
          syncShareParam(raw);
        }
      } catch (e) {
        setResult(null);
        setError(e instanceof Error ? e.message : "Could not check that URL.");
      }
    });
  }

  useEffect(() => {
    if (hydratedShare) return;
    const shared = readSharedUrlParam(searchParams);
    setHydratedShare(true);
    if (!shared) return;
    setValue(shared);
    runCheck(shared, { syncUrl: false });
    // Initial deep-link hydration only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, hydratedShare]);

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
