const PATTERNS = [
  {
    title: "Fake PC installers",
    body: "Console launch has no PC build. Pages offering setup.exe, “Steam keys,” ISO packs, or “full PC version” are almost always malware or phishing.",
  },
  {
    title: "Free Ultimate / pre-order “claim” pages",
    body: "Giveaway forms that ask you to “verify,” complete a survey, connect a wallet, or run an unlocker are credential-theft kits dressed as bonuses.",
  },
  {
    title: "Brand lookalike domains",
    body: "Hosts that mash Rockstar, PlayStation, Xbox, or Social Club into a random domain (extra hyphens, odd TLDs like .xyz / .top) are built to look official in a hurry.",
  },
  {
    title: "Crack, repack, trainer, and mod-menu packs",
    body: "Torrent and file-host “repacks,” keygens, DLC unlockers, save editors, and “mod menus” are classic malware droppers — especially around a hyped launch.",
  },
  {
    title: "Short links and nested redirects",
    body: "bit.ly, tinyurl, and similar shorteners hide the real host. Nested ?url= / ?redirect= parameters do the same. Expand them before you click.",
  },
  {
    title: "Fake launcher / Social Club updates",
    body: "“Update required,” “RGL installer,” or “verify your Rockstar account” pages that are not on rockstargames.com are account-takeover traps.",
  },
];

export function ScamPatterns() {
  return (
    <section className="section scam-patterns" id="common-scams">
      <h2>Common fake-download scam patterns</h2>
      <p className="lede">
        Launch-week noise is loud on Discord, Telegram, TikTok, and random search ads. These are
        the patterns this tool is built to flag — learn them so you can spot them even without a
        checker.
      </p>
      <ul className="pattern-grid">
        {PATTERNS.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
