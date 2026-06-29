-- RLS policies: authenticated users can create new rows and only update/select their own

-- pinwirl_answers
CREATE POLICY "Users can select own pinwirl answers"
  ON public.pinwirl_answers FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert pinwirl answers"
  ON public.pinwirl_answers FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own pinwirl answers"
  ON public.pinwirl_answers FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- one_question_answers: use jwt claims directly — auth.uid() casts sub to uuid which breaks Auth0 IDs
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
