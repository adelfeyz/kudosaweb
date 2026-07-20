-- روشمند sample blog data
-- Run insert_pointer_blog_categories.sql first to populate categories and tags.
-- All IDs are resolved by slug/email — safe to re-run regardless of autoincrement state.

-- ─── AUTHORS ───────────────────────────────────────────────────────────────────

INSERT INTO blog_authors (name, email, bio, title, credentials) VALUES
(
  'Adel Feyz',
  'adel@raveshmand.com',
  'Founder of روشمند. Works with organizations to identify real AI opportunities and turn them into working systems.',
  'Founder & AI Solutions Architect',
  'AI Strategy, System Design, Full-Stack Engineering'
),
(
  'تیم روشمند',
  'team@raveshmand.com',
  'تیم روشمند writes about AI consulting, product development, and practical AI implementation across industries.',
  'Editorial Team',
  NULL
);

-- ─── STARTER POST ─────────────────────────────────────────────────────────────
-- author_id resolved by email — not hardcoded

INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  content,
  author_id,
  status,
  published_at,
  reading_time,
  seo_title,
  seo_description,
  meta_keywords
)
SELECT
  'what-ai-transformation-actually-means',
  'What AI Transformation Actually Means — and How to Get It Right',
  'AI transformation is not about adopting every new tool. It is about identifying where AI creates real business value and building toward that deliberately.',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"What AI Transformation Actually Means — and How to Get It Right"}]},{"type":"paragraph","content":[{"type":"text","text":"Most organizations know they should be doing something with AI. Few are clear on what that something is."}]},{"type":"paragraph","content":[{"type":"text","text":"AI transformation gets discussed as if it is a single project with a clear finish line. In practice it is a series of deliberate decisions: where to focus first, what to build versus buy, how to change existing workflows, and how to measure whether any of it is working."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Start with the problem, not the technology"}]},{"type":"paragraph","content":[{"type":"text","text":"The most common mistake organizations make is starting with a tool or a model and working backwards to find a use case. This produces demos that impress in meetings and fail in production."}]},{"type":"paragraph","content":[{"type":"text","text":"A more reliable starting point is a specific, painful, and measurable problem. Something that slows people down, creates errors, or requires work that should not require human time. AI is most effective when it is solving a problem that is already well understood."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Transformation happens at the workflow level"}]},{"type":"paragraph","content":[{"type":"text","text":"Adding an AI tool to an unchanged process rarely produces meaningful results. The real gains come from redesigning the process itself — removing steps that only existed because humans were doing them, and building new steps that are only possible because AI is doing them."}]},{"type":"paragraph","content":[{"type":"text","text":"This requires involvement from the people who actually do the work, not just leadership. The people closest to the process know where the friction is."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"What this looks like in practice"}]},{"type":"paragraph","content":[{"type":"text","text":"Three projects built by روشمند illustrate different points of entry:"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"AIDRA: An AI-powered healthcare platform built to improve care coordination and decision support in clinical settings. The focus was on augmenting clinical workflows rather than replacing clinical judgment."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"MIPS: A management information and performance system that uses AI to surface relevant data and reduce the time leaders spend producing reports manually."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"ICreateSmiles: An intelligent patient engagement platform for dental practices, designed to automate scheduling, follow-up, and communication without losing the human quality of patient interaction."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Each of these started from a real operational problem, not a technology hypothesis."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"How to approach your own AI transformation"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Identify two or three processes that are expensive, error-prone, or slow — and pick the one with the clearest data trail."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Map the current workflow end to end. Understand every handoff and every point where decisions are made."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Determine where AI can act — not assist, not suggest, but actually act — and what guardrails are needed for that to be safe."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Build the smallest version that produces a measurable result. Validate it before expanding scope."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Measure what changes — in time, cost, error rate, or output quality — and use that to inform the next decision."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"AI transformation done well is iterative, grounded in business outcomes, and led by people who understand both the technology and the work it is being applied to. That combination is rarer than the tools themselves."}]}]}}',
  id,
  'published',
  '2025-01-15 09:00:00',
  7,
  'What AI Transformation Actually Means — روشمند',
  'AI transformation is not about adopting every new tool. Learn how to identify where AI creates real business value and build toward it deliberately.',
  'AI transformation, AI strategy, AI adoption, workflow redesign, AIDRA, MIPS, ICreateSmiles, AI consulting'
FROM blog_authors
WHERE email = 'adel@raveshmand.com';

-- ─── LINK POST → CATEGORIES (by slug) ─────────────────────────────────────────

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id
FROM blog_posts bp, blog_categories bc
WHERE bp.slug = 'what-ai-transformation-actually-means'
  AND bc.slug IN ('ai-strategy-consulting', 'case-studies', 'business-roi');

-- ─── LINK POST → TAGS (by slug) ───────────────────────────────────────────────

INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = 'what-ai-transformation-actually-means'
  AND bt.slug IN ('ai-transformation', 'ai-strategy', 'ai-adoption', 'ai-readiness', 'aidra', 'mips', 'icreatesmiles');
