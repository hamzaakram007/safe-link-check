# Safe Link Check

Paste a URL → get a **safe / suspicious / scam pattern** result card with next steps, shareable permalinks, and official-store CTAs.

Educational heuristics for fake “PC GTA 6” download lures, phishing unlock pages, and similar launch-week scams. **Not antivirus.** Not affiliated with Rockstar Games, Take-Two, PlayStation, or Xbox.

**Live:** [https://safe-link-check-jade.vercel.app](https://safe-link-check-jade.vercel.app)

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Client-side rules engine over seeded JSON (`data/patterns.json`)

## Features

- Paste-URL UI with example chips
- Expanded rules: allowlist, blocklist hosts, host/path/query keywords, shorteners, suspicious TLDs, brand lookalikes, double extensions, credentials-in-URL, PC-claim regexes, and more
- Result card with verdict, risk meter, hit list, **what to do next**, and official-store CTAs
- **Shareable results** via `/?u=<url>` (Share button + auto-hydrate)
- Stronger trust banner + multi-point disclaimer
- SEO: metadata, Open Graph / Twitter images, `robots.ts`, `sitemap.ts`, JSON-LD
- Discord bot stub (`/check` planned later)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Patterns

Edit `data/patterns.json` to add hosts, keywords, heuristics, TLDs, or brand tokens. Pattern count is shown in the page footer.

## Deploy

Push to GitHub; Vercel deploys from the production branch. Site: [safe-link-check-jade.vercel.app](https://safe-link-check-jade.vercel.app).

## License

MIT — use at your own risk; verdicts are best-effort educational signals only.
