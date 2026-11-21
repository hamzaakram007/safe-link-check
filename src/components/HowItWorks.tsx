export function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <h2>How this check works</h2>
      <p className="lede">
        You paste a link. We compare it to a local rules list — known bad hosts, risky file names,
        brand lookalikes, short links, and “PC download” claims. Nothing is downloaded. The page is
        never opened from here.
      </p>
      <ol className="how-list">
        <li>
          <strong>Read the link</strong> — host, path, and query, the same way a browser would.
        </li>
        <li>
          <strong>Check official stores first</strong> — PlayStation, Xbox / Microsoft, and
          Rockstar hosts on the allowlist get a clear “official store” result.
        </li>
        <li>
          <strong>Show a clear verdict</strong> — safe, suspicious, or scam-pattern, with why and
          what to do next. Share a permalink if you want someone else to see the same result.
        </li>
      </ol>
      <p className="muted how-note">
        A clean result means no known patterns matched — not that the link is safe. Prefer typing
        store addresses yourself over clicking DMs, ads, or “download here” posts.
      </p>
    </section>
  );
}
