# EG-Business-Final-Project

Modern marketplace app using React + Vite + TypeScript, Tailwind CSS, Supabase (Auth/DB/Storage), and Zustand. See `PROJECT_GAP_ANALYSIS.md` for the full roadmap and schema.

## Tech Stack

- Frontend: React 18, Vite, TypeScript, TailwindCSS, Zustand
- Backend: Supabase (Postgres, Auth, Storage, Realtime)
- Payments: Stripe (planned)
- Testing: Vitest/RTL + Playwright (planned)

## Getting started

1) Prerequisites

- Node.js 18+
- A Supabase project (free tier is fine)

2) Environment variables

Copy `.env.example` to `.env` and fill in values:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
VITE_SITE_URL=http://localhost:5173
```

3) Install and run

```
npm install
npm run dev
```

4) Database schema

- Apply the SQL migration at `supabase/migrations/20250809_initial_schema.sql` using the Supabase SQL editor or CLI.
- In Supabase Dashboard, enable Google OAuth (optional) and configure email confirmations as desired.
- Create Storage buckets: `product-images` and `avatars` (public read).

## Project structure

- `src/` React app, components, state
- `supabase/` SQL migrations (and functions in future)
- `PROJECT_GAP_ANALYSIS.md` Roadmap and schema details

## Next steps (short)

- Introduce react-router and convert manual navigation to routes
- Wire SignIn/SignUp to Supabase (email + Google) and ensure a `profiles` row on sign-up
- Replace mock products with Supabase reads on marketplace
- Implement order creation flow on checkout (orders + order_items)
- Add Stripe checkout (Edge Function) and webhook to update order status

For a detailed plan, see `PROJECT_GAP_ANALYSIS.md`.
