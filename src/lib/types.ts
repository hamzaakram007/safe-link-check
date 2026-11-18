export type Verdict = "safe" | "suspicious" | "scam";

export type PatternHit = {
  id: string;
  reason: string;
  severity: Verdict;
  source: "allowlist" | "blocklist" | "host" | "path" | "query" | "heuristic";
};

export type CheckResult = {
  url: string;
  normalizedUrl: string;
  host: string;
  verdict: Verdict;
  score: number;
  hits: PatternHit[];
  summary: string;
  checkedAt: string;
  isOfficialStore: boolean;
};

export type OfficialStore = {
  name: string;
  url: string;
  note: string;
};

export type PatternsData = {
  version: number;
  updated: string;
  officialStores: OfficialStore[];
  allowlistHosts: string[];
  blocklistHosts: { host: string; reason: string; severity: Verdict }[];
  hostKeywords: { id: string; pattern: string; reason: string; severity: Verdict }[];
  pathKeywords: { id: string; pattern: string; reason: string; severity: Verdict }[];
  queryKeywords: { id: string; pattern: string; reason: string; severity: Verdict }[];
  heuristics: { id: string; type: string; reason: string; severity: Verdict }[];
  shortenerHosts: string[];
  pcClaimRegexes: string[];
};
