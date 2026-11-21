import { getOfficialStores } from "@/lib/check-url";

export function OfficialStores() {
  const stores = getOfficialStores();

  return (
    <section className="section stores" id="official-stores">
      <h2>Buy only from official stores</h2>
      <p className="lede">
        Real purchases happen on PlayStation Store, Xbox / Microsoft Store, or the publisher’s
        store when listed — not on random “PC installer” pages, torrents, gift-card DMs, or free
        Ultimate Edition claims. Open these stores yourself; do not trust links from strangers.
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
