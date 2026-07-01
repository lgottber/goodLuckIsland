create table if not exists public.pinwirl_recommendations (
  id         uuid        primary key default gen_random_uuid(),
  dimension  text        not null,
  band       text        not null,
  body       text        not null,
  sort_order integer     not null default 0,
  created_at timestamptz not null default now(),
  unique (dimension, band)
);

alter table public.pinwirl_recommendations enable row level security;

create policy "Anyone can read pinwirl recommendations"
  on public.pinwirl_recommendations for select
  using (true);

-- sort_order: dimension groups 1-8 (4 rows each), bands ordered Needs Attention → Developing → Building Strength → Strong
insert into public.pinwirl_recommendations (dimension, band, sort_order, body) values
  -- Physical (1–4)
  ('Physical', 'Needs Attention',    1,  'Your physical health habits could use some attention. Small, consistent changes — a daily walk, more water, one scheduled check-up — can shift things meaningfully over time.'),
  ('Physical', 'Developing',         2,  'You''ve started building healthy habits. Keep the momentum by picking one area to focus on this month and making it a non-negotiable part of your routine.'),
  ('Physical', 'Building Strength',  3,  'Your physical health is in solid shape. You''re doing the right things — now it''s about consistency and pushing a little further where you feel you could grow.'),
  ('Physical', 'Strong',             4,  'Your physical wellbeing is a genuine strength. You''re an example of what intentional health habits look like — keep it up and consider sharing your approach with others.'),
  -- Emotional (5–8)
  ('Emotional', 'Needs Attention',   5,  'Emotional health can be the hardest to work on — and the most rewarding. Try one tool this week: journaling, a counselor conversation, or five minutes of daily reflection.'),
  ('Emotional', 'Developing',        6,  'You''re building emotional awareness. Practice active listening and give yourself grace when you fall short — both habits compound quietly over time.'),
  ('Emotional', 'Building Strength', 7,  'You handle challenges with care and show real empathy for others. Focus on deepening these skills and creating space for the people around you to do the same.'),
  ('Emotional', 'Strong',            8,  'Your emotional intelligence is exceptional. You navigate stress, relationships, and self-awareness with real skill — a powerful foundation for everything else in your life.'),
  -- Intellectual (9–12)
  ('Intellectual', 'Needs Attention',    9,  'Continuing to challenge your mind is one of the best investments you can make. Try one non-fiction book, one new class, or one topic that genuinely stretches you this month.'),
  ('Intellectual', 'Developing',         10, 'Your curiosity is growing — that''s the foundation of intellectual vitality. Try stepping outside your comfort zone with perspectives or subjects that feel unfamiliar.'),
  ('Intellectual', 'Building Strength',  11, 'Your intellectual life is active and engaged. You believe in growth and aren''t afraid to be challenged — keep seeking new ideas and the people who carry them.'),
  ('Intellectual', 'Strong',             12, 'You have a powerful and curious mind. Your openness to learning is a real asset — keep it sharp and find ways to share what you know with those around you.'),
  -- Spiritual (13–16)
  ('Spiritual', 'Needs Attention',   13, 'Spiritual health is about meaning and what anchors you — not just religion. Consider what you believe most deeply and how you might build intentional quiet into your day.'),
  ('Spiritual', 'Developing',        14, 'You''re beginning to build a spiritual foundation. Whether through prayer, meditation, community, or values-based living, deepen the practices that give you peace and purpose.'),
  ('Spiritual', 'Building Strength', 15, 'Your faith, values, and sense of community are real anchors. Look for ways to go deeper and carry that stability into the people and relationships around you.'),
  ('Spiritual', 'Strong',            16, 'Your spiritual health is exceptional. You live with a strong sense of values, faith, and community — a resilience that quietly touches every other area of your life.'),
  -- Social (17–20)
  ('Social', 'Needs Attention',   17, 'Deep relationships are one of the greatest predictors of happiness and longevity. Take an honest look at where you could invest more — one meaningful conversation is a real start.'),
  ('Social', 'Developing',        18, 'You''re building meaningful connections. Focus on deepening a few key relationships rather than widening your circle — true friendship takes time and consistent investment.'),
  ('Social', 'Building Strength', 19, 'Your social life is healthy and fulfilling. You''ve invested in people who matter. Consider how you could deepen those connections even further over the next season.'),
  ('Social', 'Strong',            20, 'Your relationships are a genuine strength. You''ve built something most people never find — keep investing in the people around you and in being the kind of friend that changes things.'),
  -- Environmental (21–24)
  ('Environmental', 'Needs Attention',   21, 'Your environment has a bigger impact on your wellbeing than you might expect. Consider what you''d need to change about where or how you live to better align with your values and goals.'),
  ('Environmental', 'Developing',        22, 'You''re beginning to align your environment with who you are. Think about small changes — in your home, community, or routine — that would make your days feel more intentional.'),
  ('Environmental', 'Building Strength', 23, 'Your environment supports your wellbeing and reflects your values. Now think longer term — where do you want to be living, and how do you want to live, in ten years?'),
  ('Environmental', 'Strong',            24, 'Your environment is deeply aligned with your lifestyle, values, and goals. Where you live truly reflects who you are — that''s something worth protecting and continuing to build.'),
  -- Purpose / Vision / Mission (25–28)
  ('Purpose / Vision / Mission', 'Needs Attention',   25, 'Purpose is the why behind everything you do. If yours feels unclear, that''s okay — start by asking: what makes you come alive? What would you regret not doing?'),
  ('Purpose / Vision / Mission', 'Developing',        26, 'You''re beginning to connect to your purpose. Keep asking the deep questions and following what energizes you — clarity tends to emerge through action, not just reflection.'),
  ('Purpose / Vision / Mission', 'Building Strength', 27, 'You have a growing sense of purpose and direction. Continue to clarify your vision and let it guide your decisions — the clearer it gets, the more aligned your life becomes.'),
  ('Purpose / Vision / Mission', 'Strong',            28, 'You live with a strong sense of purpose and you''re making a real impact. Keep investing in your mission — and look for opportunities to help others find theirs.'),
  -- Financial (29–32)
  ('Financial', 'Needs Attention',   29, 'Financial clarity is empowering. Start by getting a clear picture of where you stand — income, expenses, savings — and consider meeting with a financial advisor to build a real plan.'),
  ('Financial', 'Developing',        30, 'You''re building financial awareness and starting to put pieces in place. Focus on your roadmap: retirement savings, estate planning, and budget discipline will move you forward.'),
  ('Financial', 'Building Strength', 31, 'Your financial foundation is solid. Now fine-tune: tax efficiency, estate documents, and every piece in order so the long game is covered.'),
  ('Financial', 'Strong',            32, 'Your financial health is exceptional. You have clarity, discipline, and a real plan. Now focus on making your wealth work for your values and the legacy you want to leave.')
on conflict (dimension, band) do update set body = excluded.body, sort_order = excluded.sort_order;
