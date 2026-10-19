// Prices in USD per 1M tokens (standard tier, short-context rates).
// Update `lastChecked` and the entries below whenever you re-verify a provider's page.
window.PRICING = {
  lastChecked: "2026-10-19",
  providers: {
    anthropic: { name: "Anthropic", batch: true, source: "https://claude.com/pricing" },
    openai:    { name: "OpenAI",    batch: true, source: "https://developers.openai.com/api/docs/pricing" },
    google:    { name: "Google",    batch: true, source: "https://ai.google.dev/gemini-api/docs/pricing" },
    xai:       { name: "xAI",       batch: false, source: "https://docs.x.ai/docs/models" },
    deepseek:  { name: "DeepSeek",  batch: false, source: "https://api-docs.deepseek.com/quick_start/pricing" }
  },
  // tokenRatio: rough tokens-per-character multiplier relative to ~4 chars/token.
  models: [
    { id: "claude-fable-5-1",  name: "Claude Fable 5.1",  provider: "anthropic", input: 10,   cached: 0.25,  output: 50,   tokenRatio: 1.15 },
    { id: "claude-opus-5-5",   name: "Claude Opus 5.5",   provider: "anthropic", input: 4,    cached: 0.20,  output: 20,   tokenRatio: 1.15 },
    { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5", provider: "anthropic", input: 2,    cached: 0.20,  output: 10,   tokenRatio: 1.15 },
    { id: "claude-haiku-5-5",  name: "Claude Haiku 5.5",  provider: "anthropic", input: 0.10, cached: 0.01,  output: 0.50, tokenRatio: 1.15, note: "Prompts over 100K tokens: $0.50 / $2.50" },
    { id: "claude-opus-5",     name: "Claude Opus 5",     provider: "anthropic", input: 5,    cached: 0.50,  output: 25,   tokenRatio: 1.15 },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "anthropic", input: 3,    cached: 0.30,  output: 15,   tokenRatio: 1.0 },

    { id: "gpt-6-astra",   name: "GPT-6 Astra",   provider: "openai", input: 10,   cached: 1.00,  output: 50,   tokenRatio: 1.0 },
    { id: "gpt-6.1-sol",   name: "GPT-6.1 Sol",   provider: "openai", input: 2,    cached: 0.10,  output: 10,   tokenRatio: 1.0 },
    { id: "gpt-6-luna",    name: "GPT-6 Luna",    provider: "openai", input: 0.10, cached: 0.01,  output: 0.50, tokenRatio: 1.0 },
    { id: "gpt-5.6-terra", name: "GPT-5.6 Terra", provider: "openai", input: 2,    cached: 0.20,  output: 12,   tokenRatio: 1.0 },
    { id: "gpt-5.5",       name: "GPT-5.5",       provider: "openai", input: 5,    cached: 0.50,  output: 30,   tokenRatio: 1.0 },
    { id: "gpt-5.4-mini",  name: "GPT-5.4 mini",  provider: "openai", input: 0.75, cached: 0.075, output: 4.50, tokenRatio: 1.0 },

    { id: "gemini-4-argon",         name: "Gemini 4 Argon",         provider: "google", input: 2,    cached: 0.10,  output: 10,   tokenRatio: 1.0, note: "Rises to $4 / $20 on Dec 1, 2026" },
    { id: "gemini-3.8-flash",       name: "Gemini 3.8 Flash",       provider: "google", input: 0.75, cached: 0.075, output: 3.75, tokenRatio: 1.0, note: "Rises to $1.50 / $7.50 on Jan 1, 2027" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro",         provider: "google", input: 2,    cached: 0.20,  output: 12,   tokenRatio: 1.0, note: "Prompts over 200K: $4 / $18" },
    { id: "gemini-3.5-flash-lite",  name: "Gemini 3.5 Flash-Lite",  provider: "google", input: 0.30, cached: 0.03,  output: 2.50, tokenRatio: 1.0 },
    { id: "gemini-2.5-flash-lite",  name: "Gemini 2.5 Flash-Lite",  provider: "google", input: 0.10, cached: 0.01,  output: 0.40, tokenRatio: 1.0 },

    { id: "grok-4.7", name: "Grok 4.7", provider: "xai", input: 2,    cached: 0.50, output: 6,    tokenRatio: 1.0, note: "Prompts over 200K: double" },
    { id: "grok-4.3", name: "Grok 4.3", provider: "xai", input: 1.25, cached: 0.20, output: 2.50, tokenRatio: 1.0, note: "Prompts over 200K: double" },

    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", provider: "deepseek", input: 1.32, cached: 0.044, output: 3.96, tokenRatio: 1.0, note: "Peak price; off-peak is half" },
    { id: "deepseek-flash",  name: "DeepSeek Flash",  provider: "deepseek", input: 0.30, cached: 0.006, output: 1.20, tokenRatio: 1.0, note: "Peak price; off-peak is half" }
  ]
};
