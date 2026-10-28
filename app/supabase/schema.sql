-- Можно запускать повторно: ничего не сломается.
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);
alter table public.users add column if not exists email text;
alter table public.users add column if not exists created_at timestamptz not null default now();

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  scores jsonb not null,
  primary_type_id int,
  secondary_type_id int
);
create index if not exists test_results_user_idx on public.test_results(user_id, created_at desc);

alter table public.users enable row level security;
alter table public.test_results enable row level security;
drop policy if exists "own profile" on public.users;
drop policy if exists "own results read" on public.test_results;
drop policy if exists "own results insert" on public.test_results;
create policy "own profile" on public.users for select using (auth.uid() = id);
create policy "own results read" on public.test_results for select using (auth.uid() = user_id);
create policy "own results insert" on public.test_results for insert with check (auth.uid() = user_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer as $$
begin insert into public.users(id,email) values (new.id,new.email) on conflict (id) do nothing; return new; end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Уже зарегистрированные пользователи тоже получают профиль
insert into public.users(id,email) select id,email from auth.users on conflict (id) do nothing;
