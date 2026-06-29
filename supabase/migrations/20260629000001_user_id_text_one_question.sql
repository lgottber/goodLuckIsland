-- auth.uid() casts the JWT sub claim to uuid, which fails for Auth0 IDs (e.g. "auth0|...").
-- Read the sub claim directly as text instead.

-- one_question_answers: replace policies
DROP POLICY IF EXISTS "Users can select own one_question answers" ON public.one_question_answers;
DROP POLICY IF EXISTS "Users can insert one_question answers" ON public.one_question_answers;
DROP POLICY IF EXISTS "Users can update own one_question answers" ON public.one_question_answers;

CREATE POLICY "Users can select own one_question answers"
  ON public.one_question_answers FOR SELECT
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can insert one_question answers"
  ON public.one_question_answers FOR INSERT
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can update own one_question answers"
  ON public.one_question_answers FOR UPDATE
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id)
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

-- users_seven_step_process: enable RLS and add policies
ALTER TABLE public.users_seven_step_process ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own seven step process"
  ON public.users_seven_step_process FOR SELECT
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can insert own seven step process"
  ON public.users_seven_step_process FOR INSERT
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);

CREATE POLICY "Users can update own seven step process"
  ON public.users_seven_step_process FOR UPDATE
  USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id)
  WITH CHECK ((current_setting('request.jwt.claims', true)::jsonb ->> 'sub') = user_id);
