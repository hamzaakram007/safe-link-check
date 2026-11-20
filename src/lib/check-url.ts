import patterns from "../../data/patterns.json";
import type { CheckResult, PatternHit, PatternsData, Verdict } from "./types";

const data = patterns as PatternsData;

const SEVERITY_WEIGHT: Record<Verdict, number> = {
  safe: 0,
  suspicious: 25,
  scam: 60,
};

const DOUBLE_EXT_RE =
  /\.(?:pdf|jpg|jpeg|png|gif|doc|docx|txt|mp3|mp4|svg|html|htm)\.(?:exe|scr|bat|cmd|msi|js|vbs|com|pif)$/i;

function ensureUrl(input: string): URL {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Enter a URL to check.");
  const withProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    throw new Error("That does not look like a valid URL.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https links are supported.");
  }
  return url;
}

function hostMatches(host: string, candidate: string): boolean {
  const h = host.toLowerCase();
  const c = candidate.toLowerCase();
  return h === c || h.endsWith(`.${c}`);
}

function isIpHost(host: string): boolean {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host.includes(":");
}

function tldOf(host: string): string {
  const parts = host.toLowerCase().split(".").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function looksLikeBrandImpersonation(host: string): boolean {
  const compact = host.toLowerCase().replace(/[^a-z0-9]/g, "");
  return data.brandLookalikeTokens.some((token) => {
    const t = token.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!t) return false;
    return compact.includes(t);
  });
}

function worstVerdict(hits: PatternHit[]): Verdict {
  if (hits.some((h) => h.severity === "scam")) return "scam";
  if (hits.some((h) => h.severity === "suspicious")) return "suspicious";
  return "safe";
}

function scoreHits(hits: PatternHit[]): number {
  const raw = hits.reduce((sum, h) => sum + SEVERITY_WEIGHT[h.severity], 0);
  return Math.min(100, raw);
}

function summarize(verdict: Verdict, isOfficial: boolean, hits: PatternHit[]): string {
  if (isOfficial) {
    return "This matches a seeded official storefront host. Still confirm the full address in your browser bar before signing in or paying — never from a random “download” page.";
  }
  if (verdict === "scam") {
    return `Strong scam-pattern match (${hits.length} signal${hits.length === 1 ? "" : "s"}). Do not download, run installers, or enter credentials. There is no PC version at console launch — fake installers are a common malware lure.`;
  }
  if (verdict === "suspicious") {
    return `Suspicious signals found (${hits.length}). Treat with caution: avoid installers, archives, and “free unlock” pages. Prefer official console stores.`;
  }
  return "No seeded scam patterns matched. That is not a guarantee of safety — this tool uses educational heuristics, not antivirus.";
}

function nextStepsFor(verdict: Verdict, isOfficial: boolean): string[] {
  if (isOfficial) {
    return [
      "Confirm the domain in your browser address bar matches the official store.",
      "Buy only from PlayStation Store, Xbox / Microsoft Store, or Rockstar’s store when listed.",
      "Ignore DMs offering “cheaper keys,” free Ultimate Edition, or PC installers.",
    ];
  }
  if (verdict === "scam") {
    return [
      "Do not open the link, download files, or enter passwords / wallet seeds.",
      "Close any page that asks you to run a setup.exe, .zip, or “unlock” script.",
      "Buy only from official PlayStation, Xbox, or Rockstar storefronts.",
      "If you already entered credentials, change those passwords and enable 2FA.",
    ];
  }
  if (verdict === "suspicious") {
    return [
      "Do not download installers or archives from this link.",
      "Expand any shortened URL with a preview tool before visiting.",
      "Prefer official console storefronts over third-party “download” pages.",
      "When unsure, assume it is unsafe until proven otherwise.",
    ];
  }
  return [
    "No seeded patterns matched — still avoid unexpected installers and credential forms.",
    "Prefer official PlayStation, Xbox, or Rockstar storefronts for purchases.",
    "This check uses educational heuristics only — not a malware scan.",
  ];
}

export function getOfficialStores() {
  return data.officialStores;
}

export function getPatternsMeta() {
  const count =
    data.blocklistHosts.length +
    data.hostKeywords.length +
    data.pathKeywords.length +
    data.queryKeywords.length +
    data.heuristics.length +
    data.pcClaimRegexes.length +
    data.shortenerHosts.length +
    data.suspiciousTlds.length +
    data.brandLookalikeTokens.length;
  return { version: data.version, updated: data.updated, patternCount: count };
}

export function checkUrl(input: string): CheckResult {
  const url = ensureUrl(input);
  const host = url.hostname.toLowerCase();
  const pathAndQuery = `${url.pathname}${url.search}`.toLowerCase();
  const fullLower = url.href.toLowerCase();
  const hits: PatternHit[] = [];

  const isOfficialStore = data.allowlistHosts.some((h) => hostMatches(host, h));

  if (isOfficialStore) {
    return {
      url: input.trim(),
      normalizedUrl: url.href,
      host,
      verdict: "safe",
      score: 0,
      hits: [
        {
          id: "allowlist",
          reason: "Host matches seeded official store allowlist",
          severity: "safe",
          source: "allowlist",
        },
      ],
      summary: summarize("safe", true, []),
      nextSteps: nextStepsFor("safe", true),
      checkedAt: new Date().toISOString(),
      isOfficialStore: true,
    };
  }

  for (const entry of data.blocklistHosts) {
    if (hostMatches(host, entry.host)) {
      hits.push({
        id: `block-${entry.host}`,
        reason: entry.reason,
        severity: entry.severity,
        source: "blocklist",
      });
    }
  }

  for (const kw of data.hostKeywords) {
    if (host.includes(kw.pattern.toLowerCase())) {
      hits.push({
        id: kw.id,
        reason: kw.reason,
        severity: kw.severity,
        source: "host",
      });
    }
  }

  for (const kw of data.pathKeywords) {
    if (pathAndQuery.includes(kw.pattern.toLowerCase())) {
      hits.push({
        id: kw.id,
        reason: kw.reason,
        severity: kw.severity,
        source: "path",
      });
    }
  }

  for (const kw of data.queryKeywords) {
    if (url.search.toLowerCase().includes(kw.pattern.toLowerCase())) {
      hits.push({
        id: kw.id,
        reason: kw.reason,
        severity: kw.severity,
        source: "query",
      });
    }
  }

  for (const h of data.heuristics) {
    let match = false;
    switch (h.type) {
      case "no_https":
        match = url.protocol !== "https:";
        break;
      case "ip_host":
        match = isIpHost(host);
        break;
      case "punycode":
        match = host.includes("xn--");
        break;
      case "many_subdomains":
        match = host.split(".").length >= 5;
        break;
      case "pc_version_claim":
        match = data.pcClaimRegexes.some((re) => new RegExp(re, "i").test(fullLower));
        break;
      case "url_shortener":
        match = data.shortenerHosts.some((s) => hostMatches(host, s));
        break;
      case "suspicious_tld":
        match = data.suspiciousTlds.includes(tldOf(host));
        break;
      case "credentials_in_url":
        match = Boolean(url.username || url.password);
        break;
      case "brand_lookalike":
        match = looksLikeBrandImpersonation(host);
        break;
      case "double_extension":
        match = DOUBLE_EXT_RE.test(url.pathname);
        break;
      case "long_query":
        match = url.search.length >= 180;
        break;
      case "nonstandard_port":
        match =
          url.port !== "" &&
          url.port !== "80" &&
          url.port !== "443" &&
          !(url.protocol === "http:" && url.port === "80") &&
          !(url.protocol === "https:" && url.port === "443");
        break;
      default:
        break;
    }
    if (match) {
      hits.push({
        id: h.id,
        reason: h.reason,
        severity: h.severity,
        source: "heuristic",
      });
    }
  }

  const verdict = worstVerdict(hits);
  return {
    url: input.trim(),
    normalizedUrl: url.href,
    host,
    verdict,
    score: scoreHits(hits),
    hits,
    summary: summarize(verdict, false, hits),
    nextSteps: nextStepsFor(verdict, false),
    checkedAt: new Date().toISOString(),
    isOfficialStore: false,
  };
}
