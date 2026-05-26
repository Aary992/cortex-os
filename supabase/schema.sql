create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  identity_key text default 'custom',
  timezone text default 'UTC',
  proof_strictness text default 'high',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table identities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  key text not null,
  label text not null,
  mission_templates jsonb not null default '[]',
  failure_patterns jsonb not null default '[]',
  scoring_rules jsonb not null default '[]',
  achievements jsonb not null default '[]',
  created_at timestamptz default now()
);

create table onboarding_responses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  responses jsonb not null,
  created_at timestamptz default now()
);

create table missions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  identity_key text not null,
  title text not null,
  objective text not null,
  why_it_matters text not null,
  avoidance_prediction text not null,
  first_move text not null,
  deadline timestamptz,
  difficulty int check (difficulty between 1 and 5),
  time_estimate text,
  proof_required text not null,
  fallback_version text not null,
  reward text,
  consequence text,
  status text default 'locked',
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table mission_proofs (
  id uuid primary key default uuid_generate_v4(),
  mission_id uuid references missions(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  proof_type text not null,
  content text,
  storage_path text,
  ai_verdict text,
  ai_score numeric,
  ai_feedback text,
  created_at timestamptz default now()
);

create table focus_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  mission_id uuid references missions(id) on delete set null,
  started_at timestamptz not null,
  ended_at timestamptz,
  minutes int,
  quality int check (quality between 1 and 5)
);

create table state_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  sleep numeric,
  mood int,
  stress int,
  focus int,
  energy int,
  urge_to_scroll int,
  environment text,
  logged_at timestamptz default now()
);

create table scores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  execution int,
  focus int,
  clarity int,
  discipline int,
  recovery int,
  momentum int,
  inputs jsonb not null default '{}',
  calculated_at timestamptz default now()
);

create table ai_memory (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  memory_type text not null,
  content text not null,
  confidence numeric default 0.5,
  source_id uuid,
  created_at timestamptz default now()
);

create table behavioral_patterns (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  evidence text not null,
  intervention text not null,
  confidence int default 50,
  last_seen_at timestamptz default now()
);

create table decision_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  decision text not null,
  context text,
  options jsonb default '[]',
  expected_outcome text,
  fear text,
  tradeoff text,
  review_date date,
  final_result text,
  created_at timestamptz default now()
);

create table commitment_contracts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  trigger_rule text not null,
  penalty text,
  reward text,
  status text default 'active',
  created_at timestamptz default now()
);

create table distraction_rules (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  banned_targets jsonb default '[]',
  danger_windows jsonb default '[]',
  triggers jsonb default '[]',
  cooldown_ritual text,
  penalty_task text,
  environment_change text,
  created_at timestamptz default now()
);

create table accountability_pods (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table pod_members (
  pod_id uuid references accountability_pods(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text default 'member',
  joined_at timestamptz default now(),
  primary key (pod_id, user_id)
);

create table weekly_reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  week_start date not null,
  strongest_pattern text,
  weakest_pattern text,
  improved text,
  declined text,
  avoided text,
  next_protocol text,
  uncomfortable_truth text,
  highest_leverage_move text,
  created_at timestamptz default now()
);

create table achievements (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  label text not null,
  description text not null,
  xp int default 0
);

create table user_achievements (
  user_id uuid references profiles(id) on delete cascade,
  achievement_id uuid references achievements(id) on delete cascade,
  unlocked_at timestamptz default now(),
  primary key (user_id, achievement_id)
);

alter table profiles enable row level security;
alter table identities enable row level security;
alter table onboarding_responses enable row level security;
alter table missions enable row level security;
alter table mission_proofs enable row level security;
alter table focus_sessions enable row level security;
alter table state_logs enable row level security;
alter table scores enable row level security;
alter table ai_memory enable row level security;
alter table behavioral_patterns enable row level security;
alter table decision_logs enable row level security;
alter table commitment_contracts enable row level security;
alter table distraction_rules enable row level security;
alter table accountability_pods enable row level security;
alter table pod_members enable row level security;
alter table weekly_reviews enable row level security;
alter table user_achievements enable row level security;
