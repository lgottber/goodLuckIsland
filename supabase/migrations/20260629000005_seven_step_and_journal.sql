-- Add unique constraint on user_id to allow upsert-by-user for seven step process
ALTER TABLE public.users_seven_step_process
  ADD CONSTRAINT users_seven_step_process_user_id_key UNIQUE (user_id);

-- RLS for users_seven_step_process
ALTER TABLE public.users_seven_step_process ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own seven step progress"
  ON public.users_seven_step_process FOR SELECT
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can insert own seven step progress"
  ON public.users_seven_step_process FOR INSERT
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can update own seven step progress"
  ON public.users_seven_step_process FOR UPDATE
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id)
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

-- journal_entries
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  step_slug text NOT NULL,
  body text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, step_slug)
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own journal entries"
  ON public.journal_entries FOR SELECT
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON public.journal_entries FOR INSERT
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can update own journal entries"
  ON public.journal_entries FOR UPDATE
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id)
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

-- past_person_answers
CREATE TABLE IF NOT EXISTS public.past_person_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  answer text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

ALTER TABLE public.past_person_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own past person answers"
  ON public.past_person_answers FOR SELECT
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can insert own past person answers"
  ON public.past_person_answers FOR INSERT
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can update own past person answers"
  ON public.past_person_answers FOR UPDATE
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id)
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);
