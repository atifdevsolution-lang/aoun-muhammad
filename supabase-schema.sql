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
create policy "Public can read projects" on public.projects for select using (true);
create policy "Signed in users can manage projects" on public.projects for all to authenticated using (true) with check (true);
