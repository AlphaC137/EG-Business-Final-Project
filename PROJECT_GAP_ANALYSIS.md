# Project Gap Analysis and Completion Plan

This document inventories what’s implemented vs. missing, and outlines a concrete plan to take the project to production. It includes a proposed Supabase schema with RLS, routing/auth/payment integration plans, and prioritized next steps.

## Status update — 2025-08-09

- Done:
  - React Router integrated; URL-based routes configured in `App.tsx`.
  - Initial Supabase schema migration added: `supabase/migrations/20250809_initial_schema.sql` with RLS and order total triggers.
  - README expanded with setup steps; `.env.example` added.
  - Lint/build currently pass locally.
- Pending (high level):
  - Replace mock data with Supabase reads/writes (products, vendors, profiles).
  - Auth flows polish (Google OAuth, email verification, password reset) and ensure profile row creation on sign-up.
  - Checkout flow: create orders/order_items; Stripe Checkout + webhooks.
  - Storage buckets usage for images; upload UI.
  - Tests and CI; messaging/notifications; SEO/observability.

## Snapshot of current repo

- Tooling: Vite + React 18 + TypeScript, TailwindCSS, ESLint, Zustand
- Libraries present: @supabase/supabase-js, react-router-dom, headlessui, framer-motion, lucide-react
- State: Zustand stores for auth and cart
- Styling: Tailwind configured; custom theme
- Backend: Supabase client configured; migrations folder contains initial schema (`20250809_initial_schema.sql`) with RLS and triggers
- Auth: Supabase client wired; UI for AuthModal/SignIn/SignUp; session listener in `App.tsx`
- Navigation: Using react-router with routes defined in `App.tsx`
- Features implemented (UI-level):
  - Home (Hero, FeaturedProducts)
  - Marketplace (UI)
  - Knowledge Hub (static articles)
  - Vendor Registration/Profile (mock data)
  - Cart (Zustand store) + Cart Drawer/Page (UI works locally)
  - Checkout page (form UI; TODO: processing)
  - Order Confirmation (UI)
- Data: `src/data/products.ts`, `src/data/articles.ts` used for mock content
- Testing/CI: None
- Docs: README expanded; `.env.example` present

## High-level gaps

- Backend/Supabase
  - Schema migration exists; ensure it’s applied to your Supabase project
  - Storage buckets/config for images (products, avatars) not yet wired in-app
  - No server-side functions for payments/webhooks (Stripe) or messaging
- Frontend
  - Routing in place; consider moving pages into `src/pages/` and introducing nested routes
  - Pages use mock data; no Supabase reads/writes yet
  - Checkout has no order creation/payment flow
  - Auth flows incomplete (no OAuth setup, email verification, password reset UI)
  - Vendor/User profile pages not connected to backend
- Payments
  - No Stripe integration (keys, checkout, webhooks, order reconciliation)
- Search & filtering
  - No indexed search; filters are basic or missing
- Messaging/Notifications
  - No real-time chat between users and vendors; no notification system
- Image handling
  - No upload, optimization, or storage management path
- Observability/Quality
  - No tests (unit/integration/E2E)
  - No CI/CD pipeline
  - No error tracking, perf metrics, or SEO/meta setup
- Documentation
  - No developer or API docs; no environment bootstrap guide

## Proposed deliverables to complete the project

1) Supabase schema with RLS and storage buckets

- Tables (minimum viable):
  - profiles (extends auth.users)
  - vendors
  - categories
  - products
  - product_images
  - addresses
  - carts
  - cart_items
  - orders
  - order_items
  - reviews
  - favorites (wishlist)
  - messages
  - notifications
  - inventory_adjustments (optional)

- Example migration (already added at `supabase/migrations/20250809_initial_schema.sql`):

```sql
-- Profiles (1:1 auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  role text check (role in ('user','vendor','admin')) default 'user',
  created_at timestamptz default now()
);

-- Vendors (owned by a profile)
create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  farm_name text not null,
  description text,
  website text,
  phone text,
  location text,
  created_at timestamptz default now()
);

create table if not exists public.categories (
  id serial primary key,
  name text unique not null
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  category_id int references public.categories(id),
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  currency text not null default 'USD',
  stock int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  position int default 0
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  label text,
  full_name text,
  phone text,
  street text,
  apartment text,
  city text,
  state text,
  zip text,
  country text default 'US',
  is_default boolean default false
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete set null,
  status text not null check (status in ('pending','paid','processing','shipped','delivered','cancelled')) default 'pending',
  total_amount numeric(10,2) not null default 0,
  currency text not null default 'USD',
  payment_intent_id text,
  shipping_address_id uuid references public.addresses(id),
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity int not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create table if not exists public.favorites (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (profile_id, product_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  from_profile uuid not null references public.profiles(id) on delete cascade,
  to_profile uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- Basic RLS
alter table public.profiles enable row level security;
alter table public.vendors enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;

-- Policies (samples)
create policy "Profiles are readable by self" on public.profiles
  for select using (auth.uid() = id);
create policy "Profiles are insertable by self" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Profiles are updatable by self" on public.profiles
  for update using (auth.uid() = id);

create policy "Vendors readable by all" on public.vendors for select using (true);
create policy "Vendor owner can manage vendor" on public.vendors
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Products readable by all" on public.products for select using (is_active = true);
create policy "Vendor can manage own products" on public.products
  for all using (vendor_id in (select id from public.vendors where owner_id = auth.uid()))
  with check (vendor_id in (select id from public.vendors where owner_id = auth.uid()));

create policy "Addresses readable/writable by owner" on public.addresses
  for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "Orders readable by owner" on public.orders for select using (profile_id = auth.uid());
create policy "Orders insertable by owner" on public.orders for insert with check (profile_id = auth.uid());

create policy "Order items accessible via parent order" on public.order_items
  for select using (exists (select 1 from public.orders o where o.id = order_id and o.profile_id = auth.uid()));

-- Optional helper to maintain order_items total
create or replace function public.compute_order_total(order_id uuid) returns void language plpgsql as $$
begin
  update public.orders o
  set total_amount = coalesce((
    select sum(oi.total_price) from public.order_items oi where oi.order_id = o.id
  ), 0)
  where o.id = order_id;
end;
$$;

create or replace function public.before_order_items_ins_upd() returns trigger language plpgsql as $$
begin
  new.total_price := new.unit_price * new.quantity;
  return new;
end;$$;

create trigger trg_order_items_biu before insert or update on public.order_items
  for each row execute function public.before_order_items_ins_upd();

create or replace function public.after_order_items_change() returns trigger language plpgsql as $$
begin
  perform public.compute_order_total(coalesce(new.order_id, old.order_id));
  return null;
end;$$;

create trigger trg_order_items_aud after insert or update or delete on public.order_items
  for each row execute function public.after_order_items_change();
```

- Storage buckets (configure via Supabase Dashboard or SQL):
  - product-images (public read)
  - avatars (public read)

2) Environment and configuration

- Add `.env.example` (do not commit real secrets):

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Payments (Stripe)
VITE_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# App
VITE_SITE_URL=http://localhost:5173
```

- Update README with setup instructions (Supabase project creation, running migrations, env setup, dev scripts)
  - Note: README has been expanded with these steps; keep it updated as features land

3) Routing and page structure

- Introduce react-router and replace manual navigation in `App.tsx` — Done
  - Routes: `/`, `/marketplace`, `/knowledge-hub`, `/vendor/registration`, `/vendor/profile`, `/user/profile`, `/cart`, `/checkout`, `/order/:id`
  - Move pages to `src/pages/...` and convert existing components accordingly

4) Auth completion

- Enable Google provider in Supabase; add "Continue with Google" in SignIn/SignUp
- Email verification flow (Supabase auth settings)
- Password reset (magic link/email) with a `/auth/callback` page
- Persist profile row on sign-up; profile editing hooked to Supabase

5) Data integration

- Replace mock products/articles with Supabase tables and `select` queries
- Add CRUD for vendor products (list/create/edit/delete)
- Connect vendor profile to `vendors` table

6) Checkout and orders

- Implement order creation flow:
  - Validate cart client-side
  - Create `orders` row, then `order_items`
  - Initiate Stripe Checkout session (serverless/Edge Function) and redirect
  - Handle webhook to mark order as paid and update status
  - Redirect user to `/order/:id` confirmation page

7) Search and filtering

- Add category filters, price sort
- Consider Postgres full-text search or pgvector for advanced search later

8) Messaging and notifications

- Real-time chat using Supabase Realtime on `messages`
- Notification rows + client subscriptions

9) Image handling

- Upload to Supabase Storage with signed URLs when needed
- Client-side image compression (optional) before upload

10) Quality, tests, and CI/CD

- Add Vitest + React Testing Library; write unit tests for store and key components
- Add Playwright for E2E (checkout happy path)
- GitHub Actions: lint + test + build
- Add ErrorBoundary usage where appropriate; loading states around suspenseful pages
- Basic SEO: meta tags, OpenGraph, sitemaps (static)

## Concrete file/folder changes to plan

- New folders/files to add:
  - `src/pages/` for routed pages (Home, Marketplace, KnowledgeHub, VendorRegistration, VendorProfile, UserProfile, Cart, Checkout, OrderConfirmation)
  - `src/routes.tsx` or `src/AppRoutes.tsx` for route definitions
  - `src/lib/api/` with modules: `products.ts`, `orders.ts`, `profiles.ts`, `vendors.ts`
  - `src/lib/stripe.ts` (client init) and `supabase/functions/stripe/*` (serverless if using Edge Functions)
  - `supabase/migrations/20250809_initial_schema.sql` with the SQL above
  - `.env.example`
  - `README.md` expanded
  - `.github/workflows/ci.yml` for CI (lint/test/build)
  - `tests/` for unit/integration; `e2e/` for Playwright

## Example frontend service outline

```ts
// src/lib/api/orders.ts
import { supabase } from '../supabase';

export async function createOrder(profileId: string, items: Array<{product_id: string; quantity: number; unit_price: number;}>, addressId?: string) {
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({ profile_id: profileId, status: 'pending', shipping_address_id: addressId })
    .select()
    .single();
  if (orderErr) throw orderErr;

  const orderItems = items.map(i => ({
    order_id: order.id,
    product_id: i.product_id,
    quantity: i.quantity,
    unit_price: i.unit_price,
    total_price: i.quantity * i.unit_price,
  }));
  const { error: itemsErr } = await supabase.from('order_items').insert(orderItems);
  if (itemsErr) throw itemsErr;

  return order;
}
```

## Example Stripe checkout (high-level)

- Client: call an API/Edge Function to create a Checkout Session, then `window.location = session.url`.
- Server (Edge Function): create session with line items, store `payment_intent_id` on order, verify via webhook.

## Acceptance criteria per milestone

MVP 1: Routing + Auth + Schema
- React Router replacing manual nav — Done
- Supabase schema and RLS applied (migration added; ensure applied in Supabase project) — Mostly Done
- Sign up/in/out works; profile row created — Pending profile row creation logic

MVP 2: Products + Cart + Checkout (mock Stripe)
- Marketplace lists products from Supabase
- Cart flows work with server data
- Order created on checkout (pending), then marked paid via mock endpoint; confirmation page shows order

MVP 3: Stripe + Vendor CRUD
- Stripe checkout + webhook updates order status to paid
- Vendor can create/edit/delete own products

MVP 4: Reviews, Wishlist, Addresses
- Review submission and display
- Wishlist per user
- Address book used in checkout

MVP 5: Messaging + Notifications + QA
- Real-time chat
- Notifications list/toasts
- Tests in CI; basic SEO and docs

## Immediate next actions

- Run the migration in your Supabase project (if not yet applied) and create storage buckets
- Move current pages under `src/pages` with routes (optional structural improvement)
- Wire auth UI to Google/email sign-in and profile creation
- Swap mock products for Supabase reads in Marketplace
- Implement order creation API and integrate checkout button flow

## Assumptions

- Supabase project will be used for auth, DB, storage, and realtime
- Stripe is the preferred payment provider
- Keep Vite + Tailwind + Zustand stack
- Single repo for client; serverless functions (if used) live under `supabase/functions`

---

If you’d like, I can start by adding the `.env.example`, creating the migration file with the schema above, and refactoring navigation to React Router.
