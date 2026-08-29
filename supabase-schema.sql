create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  icon_class text not null default 'fa-solid fa-star',
  color_class text not null default '',
  link text not null default '#',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
drop policy if exists "Public can read projects" on public.projects;
drop policy if exists "Signed in users can manage projects" on public.projects;
create policy "Public can read projects" on public.projects for select using (true);
create policy "Signed in users can manage projects" on public.projects for all to authenticated using (true) with check (true);

create table if not exists public.site_content (
  id integer primary key default 1 check (id = 1),
  hero_title text not null default 'Turning Data into Insights & Words into Impact',
  hero_description text not null default '',
  profile_image text not null default 'profile.jpg',
  roadmap_title text not null default 'AI + DATA SKILLS — BEGINNER TO JOB READY',
  roadmap_description text not null default '',
  course_price text not null default 'PKR 999',
  email text not null default 'syedaoun07@gmail.com',
  whatsapp text not null default '',
  linkedin text not null default '',
  theme_primary text not null default '#8b5cf6',
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "Public can read site content" on public.site_content;
drop policy if exists "Signed in users can manage site content" on public.site_content;
create policy "Public can read site content" on public.site_content for select using (true);
create policy "Signed in users can manage site content" on public.site_content for all to authenticated using (true) with check (true);
insert into public.site_content (id) values (1) on conflict (id) do nothing;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', icon_class text not null default 'fa-solid fa-star', tags text[] not null default '{}', sort_order integer not null default 0
);
alter table public.services enable row level security;
drop policy if exists "Public can read services" on public.services;
drop policy if exists "Signed in users can manage services" on public.services;
create policy "Public can read services" on public.services for select using (true);
create policy "Signed in users can manage services" on public.services for all to authenticated using (true) with check (true);

create table if not exists public.handbook_items (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', resource_url text not null default '', resource_type text not null default 'link', sort_order integer not null default 0
);
alter table public.handbook_items enable row level security;
drop policy if exists "Public can read handbook" on public.handbook_items;
drop policy if exists "Signed in users can manage handbook" on public.handbook_items;
create policy "Public can read handbook" on public.handbook_items for select using (true);
create policy "Signed in users can manage handbook" on public.handbook_items for all to authenticated using (true) with check (true);
