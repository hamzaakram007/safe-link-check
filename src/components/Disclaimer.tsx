export function Disclaimer() {
  return (
    <aside className="disclaimer" role="note" id="disclaimer">
      <h2>Important disclaimer</h2>
      <ul>
        <li>
          Safe Link Check is an <strong>educational link checker</strong>. It uses a rules list and
          simple pattern matches — it does <strong>not</strong> download files, visit the page,
          sandbox malware, or replace antivirus or browser warnings.
        </li>
        <li>
          Results can be wrong (false positives and false negatives). A “safe” result is{" "}
          <strong>not</strong> a guarantee. A “scam” result is a pattern match, not a legal finding.
        </li>
        <li>
          Never open surprise installers, zip files, cracks, keygens, trainers, or “free Ultimate
          Edition” pages. When a title is console-only at launch, treat “PC download now” claims as
          hostile.
        </li>
        <li>
          This product is <strong>independent and unaffiliated</strong> with Rockstar Games,
          Take-Two Interactive, PlayStation, Sony, Xbox, or Microsoft. No publisher trademarks or
          assets are used as product branding.
        </li>
        <li>
          You are responsible for how you use these signals. Use at your own risk. When in doubt,
          buy only from the official stores linked on this site — and type the address yourself when
          you can.
        </li>
      </ul>
    </aside>
  );
}