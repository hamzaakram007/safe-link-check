export function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <h2>How this check works</h2>
      <p className="lede">
        You paste a link. The checker runs it against a local rules file — known lure hosts,
        risky path and query strings, brand lookalikes, shorteners, and installer-style filenames.
        Nothing is downloaded. The destination page is never opened from this site.
      </p>
      <ol className="how-list">
        <li>
          <strong>Normalize the URL</strong> — protocol, host, path, and query are parsed the same
          way your browser would.
        </li>
        <li>
          <strong>Match official stores first</strong> — PlayStation, Xbox / Microsoft, and Rockstar
          hosts on the allowlist get a clear “official storefront” result.
        </li>
        <li>
          <strong>Score the rest</strong> — each hit is labeled safe, suspicious, or scam-pattern,
          with plain-language next steps. Share a permalink if you want someone else to see the same
          result.
        </li>
      </ol>
      <p className="muted how-note">
        A clean result means no seeded patterns matched — not that the link is safe. Prefer typing
        store addresses yourself over clicking DMs, ads, or “download here” posts.
      </p>
    </section>
  );
}
