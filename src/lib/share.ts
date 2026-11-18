/** Build a shareable app URL that re-runs the check for `checkedUrl`. */
export function buildShareUrl(origin: string, checkedUrl: string): string {
  const base = origin.replace(/\/$/, "");
  const params = new URLSearchParams();
  params.set("u", checkedUrl);
  return `${base}/?${params.toString()}`;
}

export function readSharedUrlParam(
  searchParams: URLSearchParams | { get(name: string): string | null },
): string | null {
  const raw = searchParams.get("u") ?? searchParams.get("url");
  if (!raw) return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}
