# Safe Link Check

Paste a URL → get a **safe / suspicious / scam pattern** result with next steps, a shareable permalink, and official-store links.

Educational heuristics for fake PC game-download lures, phishing unlock pages, and similar launch-week scams. **Not antivirus.** Not affiliated with Rockstar Games, Take-Two, PlayStation, or Xbox.

**Live:** [https://check.neongulf.com](https://check.neongulf.com) (NeonGulf)

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Client-side rules engine over seeded JSON (`data/patterns.json`)

## Features

- Paste-URL UI with example chips
- Expanded rules (v3): allowlist, blocklist hosts, host/path/query keywords, shorteners, suspicious TLDs, brand lookalikes, double extensions, credentials-in-URL, PC-claim regexes, repack/crack/trainer lures, and more
- Result card with verdict, risk meter, hit list, **what to do next**, and official-store CTAs
- Shareable results via `/?u=<url>`
- Educational sections: how it works + common fake-download scam patterns
- About and Privacy pages
- SEO: metadata, Open Graph / Twitter images, `robots.ts`, `sitemap.ts`, JSON-LD

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Patterns

Edit `data/patterns.json` to add hosts, keywords, heuristics, TLDs, or brand tokens. Pattern count is shown on the home page footer.

## Deploy

Push to GitHub; Vercel deploys from the production branch. Canonical host: [check.neongulf.com](https://check.neongulf.com).

## License

MIT — use at your own risk; verdicts are best-effort educational signals only.
