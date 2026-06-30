-- saved_items: one row per (user, item_type, item_id)
CREATE TABLE public.saved_items (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     text        NOT NULL,
  item_type   text        NOT NULL CHECK (item_type IN ('article', 'episode')),
  item_id     integer     NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE (user_id, item_type, item_id)
);

ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_items_select" ON public.saved_items
  FOR SELECT USING (current_setting('request.jwt.claims', true)::jsonb ->> 'sub' = user_id);

CREATE POLICY "saved_items_insert" ON public.saved_items
  FOR INSERT WITH CHECK (current_setting('request.jwt.claims', true)::jsonb ->> 'sub' = user_id);

CREATE POLICY "saved_items_delete" ON public.saved_items
  FOR DELETE USING (current_setting('request.jwt.claims', true)::jsonb ->> 'sub' = user_id);
