-- ============================================================
-- KIRAFLAKES CMS — Supabase SQL Schema
-- Jalankan ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLE: profiles
-- User admin dengan role (owner / admin)
-- ============================================================
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text not null default 'admin' check (role in ('owner', 'admin')),
  display_name text,
  created_at timestamptz default now() not null
);

-- RLS: owner bisa lihat semua, admin hanya lihat diri sendiri
alter table profiles enable row level security;
create policy "Owner can manage all profiles"
  on profiles for all
  using (
    exists (
      select 1 from profiles p where p.id = auth.uid() and p.role = 'owner'
    )
  );
create policy "Admin can read own profile"
  on profiles for select
  using (auth.uid() = id);

-- ============================================================
-- TABLE: hero_content
-- Konten hero section (bio, tagline, social links, avatar)
-- ============================================================
create table if not exists hero_content (
  id uuid default uuid_generate_v4() primary key,
  display_name text not null default 'Kiraflakes',
  bio text not null default 'hii! my name is kira (or tama) she/her | uni student! take a look around',
  avatar_url text,
  wa_link text,
  discord_link text,
  twitter_link text,
  updated_at timestamptz default now() not null
);

alter table hero_content enable row level security;
create policy "Public can read hero_content"
  on hero_content for select using (true);
create policy "Admin can update hero_content"
  on hero_content for update
  using (auth.role() = 'authenticated');

-- Seed initial data
insert into hero_content (display_name, bio, wa_link, discord_link, twitter_link)
values (
  'Kiraflakes',
  'hii! my name is kira (or tama) she/her | uni student! take a look around',
  'https://wa.me/628xxxxxxxxxx',
  'https://discord.com/users/812705923352625174',
  'https://twitter.com/@kiravflakes'
);

-- ============================================================
-- TABLE: pricing_cards
-- Kartu harga commission
-- ============================================================
create table if not exists pricing_cards (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subtitle text not null,
  description text,
  image_url text,
  prices jsonb not null default '[]'::jsonb,
  note text,
  popular boolean default false,
  button_color text,
  sort_order int default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table pricing_cards enable row level security;
create policy "Public can read pricing_cards"
  on pricing_cards for select using (true);
create policy "Admin can manage pricing_cards"
  on pricing_cards for all
  using (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: showcase_images
-- Gambar showcase gallery
-- ============================================================
create table if not exists showcase_images (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  alt_text text default 'showcase artwork',
  sort_order int default 0,
  created_at timestamptz default now() not null
);

alter table showcase_images enable row level security;
create policy "Public can read showcase_images"
  on showcase_images for select using (true);
create policy "Admin can manage showcase_images"
  on showcase_images for all
  using (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: rules
-- Will draw / Won't draw
-- ============================================================
create table if not exists rules (
  id uuid default uuid_generate_v4() primary key,
  type text not null check (type in ('ok', 'no')),
  text text not null,
  sort_order int default 0,
  created_at timestamptz default now() not null
);

alter table rules enable row level security;
create policy "Public can read rules"
  on rules for select using (true);
create policy "Admin can manage rules"
  on rules for all
  using (auth.role() = 'authenticated');

-- Seed initial rules
insert into rules (type, text, sort_order) values
  ('ok', 'Anime Artstyle', 0),
  ('ok', 'Couples / Yumeship', 1),
  ('ok', 'Kemonomimi / Nekomimi', 2),
  ('ok', 'Any Gender', 3),
  ('ok', 'Complex Character', 4),
  ('no', 'NSFW', 0),
  ('no', 'Furry', 1),
  ('no', 'Mecha / Heavy Armor', 2),
  ('no', 'Muscular Characters', 3),
  ('no', 'Real Life People (will be simplified)', 4);

-- ============================================================
-- TABLE: tnc_items
-- Terms & Conditions sections
-- ============================================================
create table if not exists tnc_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  sort_order int default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table tnc_items enable row level security;
create policy "Public can read tnc_items"
  on tnc_items for select using (true);
create policy "Admin can manage tnc_items"
  on tnc_items for all
  using (auth.role() = 'authenticated');

-- Seed initial TnC
insert into tnc_items (title, content, sort_order) values
  ('General', 'I own the right to decline any commission I don''t feel comfortable with. Please credit me with either a link to my X (Twitter) @kiravflakes or Discord account if you use my work.', 0),
  ('Refunds', 'I do not accept refunds once work is started. Refund is only possible when I have not started work, of which I will notify when I start.', 1),
  ('Revisions', 'I accept three revisions at maximum. More than that would incur fees. When needed, I may send you the work in progress very early on and ask for your feedback. This would not count as a revision.', 2),
  ('Usage', 'The commission is for personal use only. Commercial use fees are worth twice the price. NFT/AI training are not allowed.', 3),
  ('Deadlines and Delivery', 'I prefer 100% payment upfront. I start work when at least 50% down payment is paid. I would need time ranging from 1 to 4 weeks, depending on complexity and revisions required.', 4);

-- ============================================================
-- SUPABASE STORAGE — Buat bucket ini via Dashboard:
-- Dashboard > Storage > New bucket
--   Name: kiraflakes-media
--   Public: YES (centang public)
-- ============================================================

-- RLS POLICIES FOR STORAGE (Kiraflakes Media)
-- Jalankan ini agar Anda bisa mengupload gambar melalui sistem:

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'kiraflakes-media' );

create policy "Admin Insert Access"
  on storage.objects for insert
  with check ( bucket_id = 'kiraflakes-media' and auth.role() = 'authenticated' );

create policy "Admin Update Access"
  on storage.objects for update
  using ( bucket_id = 'kiraflakes-media' and auth.role() = 'authenticated' );

create policy "Admin Delete Access"
  on storage.objects for delete
  using ( bucket_id = 'kiraflakes-media' and auth.role() = 'authenticated' );
