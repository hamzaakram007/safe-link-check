export function Disclaimer() {
  return (
    <aside className="disclaimer" role="note" id="disclaimer">
      <h2>Important disclaimer</h2>
      <ul>
        <li>
          Safe Link Check is an <strong>educational MVP</strong>. It uses a seeded blocklist and
          simple heuristics — it does <strong>not</strong> download files, visit the destination,
          sandbox malware, or replace antivirus / browser security.
        </li>
        <li>
          Verdicts can be wrong (false positives and false negatives). A “safe” result is{" "}
          <strong>not</strong> a guarantee. A “scam” result is a pattern match, not a court finding.
        </li>
        <li>
          Never open shady installers, archives, cracks, keygens, or “free Ultimate Edition”
          pages. Console launch is PlayStation and Xbox — treat “PC download now” claims as hostile.
        </li>
        <li>
          This product is <strong>independent and unaffiliated</strong> with Rockstar Games,
          Take-Two Interactive, PlayStation, Sony, Xbox, or Microsoft. No Rockstar trademarks or
          assets are used.
        </li>
        <li>
          You are responsible for how you use these signals. Use at your own risk. When in doubt,
          buy only from official storefronts linked on this page.
        </li>
      </ul>
    </aside>
  );
}
