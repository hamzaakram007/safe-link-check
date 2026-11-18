"use client";

import { Suspense } from "react";
import { UrlChecker } from "./UrlChecker";

function CheckerFallback() {
  return (
    <div className="stack-gap" aria-busy="true">
      <div className="input-row">
        <div className="url-input skeleton" />
        <button type="button" className="cta" disabled>
          Check link
        </button>
      </div>
      <p className="muted">Loading checker…</p>
    </div>
  );
}

/** Suspense boundary required for useSearchParams under Cache Components. */
export function UrlCheckerBoundary() {
  return (
    <Suspense fallback={<CheckerFallback />}>
      <UrlChecker />
    </Suspense>
  );
}
