# LLM Cost Calculator

Compare what a prompt costs across Claude, GPT, Gemini, Grok and DeepSeek models — per request, per day and per month, with prompt-caching and batch discounts.

Static site: `index.html` + `pricing.js`. No build step, no server, no database.

## Run locally

```bash
python -m http.server 8090 --directory llm-cost-calc
```

Then open http://localhost:8090.

## Update prices

All prices live in `pricing.js` (USD per 1M tokens). When you re-check a provider's page, edit the numbers and bump `lastChecked`.
Known upcoming changes:
- Gemini 4 Argon: $4 / $20 from 2026-12-01
- Gemini 3.8 Flash: $1.50 / $7.50 from 2027-01-01

## Deploy (Cloudflare Pages, free, commercial use allowed)

Option A — drag and drop:
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Upload assets.
2. Upload this folder. You get a `*.pages.dev` URL.
3. Custom domains → add your domain.

Option B — CLI:

```bash
npx wrangler pages deploy . --project-name llm-cost-calc
```

## Before launch

- Add Cloudflare Web Analytics (free) in the Pages project settings.
