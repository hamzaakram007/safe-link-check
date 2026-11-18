import { getOfficialStores } from "@/lib/check-url";

export function OfficialStores() {
  const stores = getOfficialStores();

  return (
    <section className="section stores" id="official-stores">
      <h2>Buy only from official stores</h2>
      <p className="lede">
        Console launch is PlayStation and Xbox only. Skip random “PC installer” pages,
        torrents, gift-card DMs, and “free Ultimate Edition” claims. These are the real
        storefronts — open them yourself; don’t trust links from strangers.
      </p>
      <ul className="store-list">
        {stores.map((store) => (
          <li key={store.url}>
            <a
              className="store-cta store-cta-block"
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="store-cta-name">Shop {store.name}</span>
              <span className="store-cta-note">{store.note}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="store-footnote muted">
        Tip: type the store address yourself or use the bookmarks above. Scammers often send
        lookalike links that only differ by one character.
      </p>
    </section>
  );
}
