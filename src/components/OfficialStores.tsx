import { getOfficialStores } from "@/lib/check-url";

export function OfficialStores() {
  const stores = getOfficialStores();

  return (
    <section className="section stores" id="official-stores">
      <h2>Buy only from official stores</h2>
      <p className="lede">
        Console launch is PlayStation and Xbox only. Skip random “PC installer” pages,
        torrents, and “free Ultimate Edition” claims.
      </p>
      <ul className="store-list">
        {stores.map((store) => (
          <li key={store.url}>
            <a href={store.url} target="_blank" rel="noopener noreferrer">
              {store.name}
            </a>
            <span className="muted">{store.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
