import { MAX_URL_LENGTH } from "./site";

/** Build a shareable app URL that re-runs the check for `checkedUrl`. */
export function buildShareUrl(origin: string, checkedUrl: string): string {
  const base = origin.replace(/\/$/, "");
  const params = new URLSearchParams();
  params.set("u", checkedUrl.slice(0, MAX_URL_LENGTH));
  return `${base}/?${params.toString()}`;
}

export function readSharedUrlParam(
  searchParams: URLSearchParams | { get(name: string): string | null },
): string | null {
  const raw = searchParams.get("u") ?? searchParams.get("url");
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > MAX_URL_LENGTH) {
    return trimmed.slice(0, MAX_URL_LENGTH);
  }
  return trimmed;
}
