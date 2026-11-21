const PATTERNS = [
  {
    title: "Fake PC installers",
    body: "Console launch has no PC build. Pages offering setup.exe, “Steam keys,” ISO packs, or “full PC version” are almost always malware or phishing.",
  },
  {
    title: "Free Ultimate / “claim” pages",
    body: "Giveaway forms that ask you to “verify,” finish a survey, connect a wallet, or run an unlocker are password-theft kits dressed as bonuses.",
  },
  {
    title: "Brand lookalike domains",
    body: "Hosts that mash Rockstar, PlayStation, Xbox, or Social Club into a random domain (extra hyphens, odd endings like .xyz / .top) are built to look official in a hurry.",
  },
  {
    title: "Crack, repack, trainer packs",
    body: "Torrent and file-host “repacks,” keygens, DLC unlockers, save editors, and “mod menus” are classic malware droppers — especially around a hyped launch.",
  },
  {
    title: "Short links and hidden redirects",
    body: "bit.ly, tinyurl, and similar short links hide the real host. Nested ?url= / ?redirect= parameters do the same. Expand them before you click.",
  },
  {
    title: "Fake launcher / account updates",
    body: "“Update required,” “launcher installer,” or “verify your account” pages that are not on the real publisher site are account-takeover traps.",
  },
];

export function ScamPatterns() {
  return (
    <section className="section scam-patterns" id="common-scams">
      <h2>Common fake-download scam patterns</h2>
      <p className="lede">
        Launch week is loud on Discord, Telegram, TikTok, and search ads. Learn these patterns so
        you can spot them even without a checker — then share this page with a friend.
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
