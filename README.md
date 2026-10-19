# LLM Cost Calculator

Compare what a prompt costs across Claude, GPT, Gemini, Grok and DeepSeek models — per request, per day and per month, with prompt-caching and batch discounts.

Static site: `public/index.html` + `public/pricing.js`. No build step, no server code, no database.

## Run locally

From this folder:

```bash
python -m http.server 8090 --directory public
```

Then open http://localhost:8090.

## Update prices

All prices live in `public/pricing.js` (USD per 1M tokens). When you re-check a provider's page, edit the numbers and bump `lastChecked`.
Known upcoming changes:
- Gemini 4 Argon: $4 / $20 from 2026-12-01
- Gemini 3.8 Flash: $1.50 / $7.50 from 2027-01-01

## Deploy (Cloudflare Workers, connected to GitHub)

The Cloudflare project is connected to this repo. Every push to `main` runs `npx wrangler deploy`, which publishes the `public` folder as configured in `wrangler.jsonc`.

Cloudflare settings: build command empty, deploy command `npx wrangler deploy`, root directory `/`.

## Before launch

- Turn on Cloudflare Web Analytics (free) for the site.
