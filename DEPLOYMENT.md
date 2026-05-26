# Cortex OS Deployment

## Local setup

1. Install dependencies: `npm install`
2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run the schema in Supabase SQL Editor: `supabase/schema.sql`
4. Start locally: `npm run dev`

## Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the repo.
3. Framework preset: **Next.js**.
4. Add the same environment variables from `.env.local`.
5. Deploy.
6. After deploy, open the production URL and install it as a PWA from the browser.

If you already have variables named `OPENAI_API_KEY` and `OPENAI_MODEL`, Cortex OS will still read them as a fallback for OpenRouter-compatible calls. The preferred production names are `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`.

## Supabase storage

Create a private bucket named `mission-proofs` for proof files and screenshots. The `mission_proofs.storage_path` field is ready to reference uploaded assets.
