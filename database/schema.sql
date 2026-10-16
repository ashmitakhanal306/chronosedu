-- DATABASE LAYER — PostgreSQL, multi-tenant (blueprint sections 6 & 7).
-- Every tenant-owned table carries school_id and is protected by Row-Level Security.
-- The API sets the tenant per request:  SET LOCAL app.current_school_id = '<uuid>';

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE tier_t         AS ENUM ('primary', 'senior');
CREATE TYPE subject_type_t AS ENUM ('academic', 'activity');
CREATE TYPE user_role_t    AS ENUM ('admin', 'teacher', 'student');
CREATE TYPE room_type_t    AS ENUM ('classroom', 'art_room', 'music_room', 'playground', 'other');
CREATE TYPE slot_kind_t    AS ENUM ('period', 'zero', 'break', 'lunch');

-- ---------------------------------------------------------------- tenant root
CREATE TABLE school (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL,
  subdomain      text NOT NULL UNIQUE,
  timezone       text NOT NULL DEFAULT 'Asia/Kolkata',
  term           text,
  holidays       date[] NOT NULL DEFAULT '{}',
  working_days   text[] NOT NULL DEFAULT '{Monday,Tuesday,Wednesday,Thursday,Friday}',
  published      boolean NOT NULL DEFAULT false,
  -- per-school rules (blueprint 4.5: configurable, not hard-coded)
  max_teacher_periods_per_day smallint NOT NULL DEFAULT 5 CHECK (max_teacher_periods_per_day BETWEEN 1 AND 5),
  activity_day   text NOT NULL DEFAULT 'Wednesday',
  activity_periods smallint[] NOT NULL DEFAULT '{1,2}',
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app_user (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id     uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  email         text NOT NULL,
  password_hash text NOT NULL,
  role          user_role_t NOT NULL,
  teacher_id    uuid,          -- set when role = teacher
  class_id      uuid,          -- set when role = student
  UNIQUE (school_id, email)
);

-- ---------------------------------------------------------------- structure
CREATE TABLE grade_level (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id    uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  name         text NOT NULL,
  tier         tier_t NOT NULL,           -- drives day length
  day_end_time time NOT NULL,             -- 12:00 primary / 14:00 senior by default
  UNIQUE (school_id, name)
);

CREATE TABLE room (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  name      text NOT NULL,
  type      room_type_t NOT NULL DEFAULT 'classroom',
  UNIQUE (school_id, name)
);

CREATE TABLE class_section (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id    uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  grade_id     uuid NOT NULL REFERENCES grade_level(id) ON DELETE CASCADE,
  section      text NOT NULL,             -- e.g. '5A'
  home_room_id uuid REFERENCES room(id),
  UNIQUE (school_id, grade_id, section)
);

CREATE TABLE subject (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  name      text NOT NULL,
  code      text NOT NULL,
  type      subject_type_t NOT NULL DEFAULT 'academic',
  room_id   uuid REFERENCES room(id),     -- e.g. Art Atelier for activity subjects
  UNIQUE (school_id, code)
);

-- required weekly frequency, per subject per grade tier/grade
CREATE TABLE subject_requirement (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id        uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  subject_id       uuid NOT NULL REFERENCES subject(id) ON DELETE CASCADE,
  grade_id         uuid NOT NULL REFERENCES grade_level(id) ON DELETE CASCADE,
  weekly_frequency smallint NOT NULL CHECK (weekly_frequency >= 0),
  UNIQUE (subject_id, grade_id)
);

CREATE TABLE teacher (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  name                text NOT NULL,
  max_periods_per_day smallint NOT NULL DEFAULT 5 CHECK (max_periods_per_day BETWEEN 1 AND 5), -- hard cap
  unavailable_days    text[] NOT NULL DEFAULT '{}'
);

CREATE TABLE teacher_subject (
  school_id  uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES teacher(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES subject(id) ON DELETE CASCADE,
  PRIMARY KEY (teacher_id, subject_id)
);

CREATE TABLE teacher_absence (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES teacher(id) ON DELETE CASCADE,
  day        text NOT NULL,
  on_date    date,
  reason     text,
  UNIQUE (teacher_id, day, on_date)
);

-- ---------------------------------------------------------------- time structure
CREATE TABLE period_slot (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id     uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  tier          tier_t NOT NULL,          -- separate structure for primary vs senior
  kind          slot_kind_t NOT NULL DEFAULT 'period',
  period_number smallint,                 -- NULL for breaks
  start_time    time NOT NULL,
  end_time      time NOT NULL,
  is_break      boolean NOT NULL DEFAULT false,
  CHECK (end_time > start_time)
);

-- ---------------------------------------------------------------- output
CREATE TABLE timetable_entry (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  class_id   uuid NOT NULL REFERENCES class_section(id) ON DELETE CASCADE,
  day        text NOT NULL,
  period     smallint NOT NULL,
  subject_id uuid NOT NULL REFERENCES subject(id),
  teacher_id uuid NOT NULL REFERENCES teacher(id),
  room_id    uuid REFERENCES room(id),
  is_manual_override boolean NOT NULL DEFAULT false,
  -- HARD RULE: a class never has two subjects in one period
  UNIQUE (school_id, class_id, day, period),
  -- HARD RULE: a teacher is never in two places in one period
  UNIQUE (school_id, teacher_id, day, period)
);

CREATE TABLE substitution (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id             uuid NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  entry_id              uuid NOT NULL REFERENCES timetable_entry(id) ON DELETE CASCADE,
  substitute_teacher_id uuid NOT NULL REFERENCES teacher(id),
  on_date               date,
  UNIQUE (entry_id, on_date)
);

CREATE INDEX ON timetable_entry (school_id, class_id);
CREATE INDEX ON timetable_entry (school_id, teacher_id, day);

-- ---------------------------------------------------------------- tenant isolation (RLS)
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'app_user','grade_level','room','class_section','subject','subject_requirement','teacher',
    'teacher_subject','teacher_absence','period_slot','timetable_entry','substitution'
  ] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I USING (school_id = NULLIF(current_setting(''app.current_school_id'', true), '''')::uuid)
       WITH CHECK (school_id = NULLIF(current_setting(''app.current_school_id'', true), '''')::uuid)', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------------- non-superuser app role for RLS enforcement
-- In PostgreSQL, superusers (and table owners without FORCE RLS) bypass RLS.
-- The API application connects as chronos_app (NOSUPERUSER, NOBYPASSRLS) to guarantee physical RLS enforcement.
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'chronos_app') THEN
    -- Dedicated application role with NOBYPASSRLS for kernel-level tenant isolation.
    -- Password is not hardcoded here; set via environment / init script (ALTER ROLE chronos_app WITH PASSWORD '...').
    CREATE ROLE chronos_app WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO chronos_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO chronos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO chronos_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO chronos_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO chronos_app;

-- Revoke all permissions on public schema tables from anon and authenticated roles (Supabase / PostgREST defense-in-depth)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
    REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
    REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM anon;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON ROUTINES FROM anon;
  END IF;

  IF EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;
    REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated;
    REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM authenticated;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM authenticated;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM authenticated;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON ROUTINES FROM authenticated;
  END IF;
END $$;
