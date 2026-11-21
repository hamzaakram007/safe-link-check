"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { checkUrl } from "@/lib/check-url";
import { buildShareUrl, readSharedUrlParam } from "@/lib/share";
import { MAX_URL_LENGTH, SITE_URL } from "@/lib/site";
import type { CheckResult } from "@/lib/types";
import { ResultCard } from "./ResultCard";

const EXAMPLES = [
  "https://store.playstation.com/",
  "http://free-gta6-pc-download.bad.example/setup.exe",
  "https://bit.ly/not-a-real-store",
  "https://rockstar-login-secure.xyz/verify-account",
];

/** Soft client throttle — checks run locally; this stops spam-click thrash. */
const MIN_CHECK_GAP_MS = 350;
const MAX_CHECKS_PER_MINUTE = 40;

export function UrlChecker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [hydratedShare, setHydratedShare] = useState(false);
  const lastCheckAt = useRef(0);
  const checkTimestamps = useRef<number[]>([]);
  const resultHeadingRef = useRef<HTMLDivElement>(null);

  const canSubmit = useMemo(() => value.trim().length > 0 && !isPending, [value, isPending]);

  function syncShareParam(raw: string) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const next = buildShareUrl(origin || SITE_URL, raw);
    const relative = `${pathname}?${new URL(next).searchParams.toString()}`;
    router.replace(relative, { scroll: false });
  }

  function allowCheck(): string | null {
    const now = Date.now();
    if (now - lastCheckAt.current < MIN_CHECK_GAP_MS) {
      return "Slow down a second — one check at a time.";
    }
    checkTimestamps.current = checkTimestamps.current.filter((t) => now - t < 60_000);
    if (checkTimestamps.current.length >= MAX_CHECKS_PER_MINUTE) {
      return "Too many checks in a short time. Wait a minute, then try again.";
    }
    return null;
  }

  function runCheck(raw: string, opts?: { syncUrl?: boolean }) {
    setError(null);
    const rateError = allowCheck();
    if (rateError) {
      setError(rateError);
      return;
    }
    lastCheckAt.current = Date.now();
    checkTimestamps.current.push(lastCheckAt.current);

    startTransition(() => {
      try {
        const next = checkUrl(raw);
        setResult(next);
        if (opts?.syncUrl !== false) {
          syncShareParam(raw);
        }
        queueMicrotask(() => {
          resultHeadingRef.current?.focus({ preventScroll: true });
        });
      } catch (e) {
        setResult(null);
        setError(e instanceof Error ? e.message : "Could not check that link.");
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
        noValidate
      >
        <label htmlFor="url" className="input-label">
          Paste a link to check
        </label>
        <div className="input-row">
          <input
            id="url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            maxLength={MAX_URL_LENGTH}
            placeholder="https://… paste a full link from a DM, ad, or “download” post"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="url-input"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "url-error" : "url-help"}
          />
          <button type="submit" className="cta" disabled={!canSubmit}>
            {isPending ? "Checking…" : "Check link"}
          </button>
        </div>
        <p id="url-help" className="input-help muted">
          We only read the text of the link. We never open it, download files, or scan your device.
        </p>
      </form>

      <div className="example-row" aria-label="Example links">
        <span className="muted">Try an example:</span>
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

      {error ? (
        <p id="url-error" className="error-banner" role="alert">
          {error}
        </p>
      ) : null}

      {!result && !error ? (
        <p className="empty-hint muted" role="status">
          Paste a link → get <strong>safe</strong>, <strong>suspicious</strong>, or{" "}
          <strong>scam-pattern</strong> → see why → know what to do next.
        </p>
      ) : null}

      {result ? (
        <div ref={resultHeadingRef} tabIndex={-1} className="result-focus-root">
          <ResultCard result={result} />
        </div>
      ) : null}
    </div>
  );
}
