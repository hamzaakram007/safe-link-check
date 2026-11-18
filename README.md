# Safe Link Check

High-level MVP: paste a URL → get a **safe / suspicious / scam pattern** result card.

Educational heuristics for fake “PC GTA 6” download lures, phishing unlock pages, and similar launch-week scams. **Not antivirus.** Not affiliated with Rockstar Games, Take-Two, PlayStation, or Xbox.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Client-side rules engine over seeded JSON (`data/patterns.json`)

## Features (MVP)

- Paste-URL UI with example chips
- Rules engine: allowlist, blocklist hosts, host/path/query keywords, HTTPS / IP / punycode / shortener / PC-claim heuristics
- Result card with verdict, risk score, and hit reasons
- Official-store links (buy only from real storefronts)
- Disclaimer
- Discord bot stub (`/check` planned later)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Patterns

Edit `data/patterns.json` to add hosts, keywords, or heuristics. Pattern count is shown in the page footer.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com).

## License

MIT — use at your own risk; verdicts are best-effort educational signals only.
