-- Initial schema for EG Business (Supabase)
-- Generated 2025-08-09

-- Extensions (if not already enabled at project level)
-- create extension if not exists pgcrypto;
-- create extension if not exists uuid-ossp;

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

-- Enable RLS
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

-- Policies (initial set)
create policy "Profiles readable by self" on public.profiles for select using (auth.uid() = id);
create policy "Profiles insertable by self" on public.profiles for insert with check (auth.uid() = id);
create policy "Profiles updatable by self" on public.profiles for update using (auth.uid() = id);

create policy "Vendors readable by all" on public.vendors for select using (true);
create policy "Vendor owner manage vendor" on public.vendors for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Products readable by all" on public.products for select using (is_active = true);
create policy "Vendor manage own products" on public.products
  for all using (vendor_id in (select id from public.vendors where owner_id = auth.uid()))
  with check (vendor_id in (select id from public.vendors where owner_id = auth.uid()));

create policy "Addresses by owner" on public.addresses for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "Orders readable by owner" on public.orders for select using (profile_id = auth.uid());
create policy "Orders insertable by owner" on public.orders for insert with check (profile_id = auth.uid());

create policy "Order items via parent order" on public.order_items
  for select using (exists (select 1 from public.orders o where o.id = order_id and o.profile_id = auth.uid()));

-- Totals helpers
create or replace function public.compute_order_total(order_id uuid) returns void language plpgsql as $$
begin
  update public.orders o
  set total_amount = coalesce((
    select sum(oi.total_price) from public.order_items oi where oi.order_id = o.id
  ), 0)
  where o.id = order_id;
end;$$;

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
