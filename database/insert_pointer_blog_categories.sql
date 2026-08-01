-- وبلاگ روشمند Categories & Tags Seed Data
-- Reflects the company's work: AI consulting, AI product development,
-- agents/automation, workflow redesign, and client project proof points.

-- Clear any previous seed data (safe for fresh setup; comment out if running on top of existing data)
-- DELETE FROM blog_post_tags;
-- DELETE FROM blog_post_categories;
-- DELETE FROM blog_tags;
-- DELETE FROM blog_categories;

-- ─── CATEGORIES ────────────────────────────────────────────────────────────────

INSERT INTO blog_categories (name, slug, description, color, icon) VALUES
(
  'AI Strategy & Consulting',
  'ai-strategy-consulting',
  'How organizations identify AI opportunities, build adoption roadmaps, and align AI initiatives with business goals.',
  '#3B82F6',
  'fa-compass'
),
(
  'AI Product Development',
  'ai-product-development',
  'Designing and building AI-powered products, intelligent systems, and data-driven applications.',
  '#10B981',
  'fa-cube'
),
(
  'AI Agents & Automation',
  'ai-agents-automation',
  'Designing AI agents, multi-agent systems, and intelligent automation workflows that replace repetitive manual work.',
  '#8B5CF6',
  'fa-robot'
),
(
  'Workflow Redesign',
  'workflow-redesign',
  'Rethinking and rebuilding business processes with AI at the core — from intake to output.',
  '#F59E0B',
  'fa-sitemap'
),
(
  'Case Studies',
  'case-studies',
  'Real projects, real results. Detailed breakdowns of work done for clients and internally built products.',
  '#EF4444',
  'fa-folder-open'
),
(
  'Industry Insights',
  'industry-insights',
  'Analysis of how AI is changing specific industries — healthcare, finance, education, operations, and more.',
  '#06B6D4',
  'fa-chart-line'
),
(
  'Technical Deep Dives',
  'technical-deep-dives',
  'Architecture decisions, engineering trade-offs, and implementation details behind AI systems.',
  '#6366F1',
  'fa-code'
),
(
  'Business & ROI',
  'business-roi',
  'Making the business case for AI: how to measure impact, justify investment, and manage organizational change.',
  '#EC4899',
  'fa-dollar-sign'
);

-- ─── TAGS ──────────────────────────────────────────────────────────────────────

INSERT INTO blog_tags (name, slug) VALUES

-- Core AI Practice Tags
('AI Transformation',         'ai-transformation'),
('AI Strategy',               'ai-strategy'),
('AI Adoption',               'ai-adoption'),
('AI Consulting',             'ai-consulting'),
('AI Readiness',              'ai-readiness'),
('Opportunity Discovery',     'opportunity-discovery'),
('AI Roadmap',                'ai-roadmap'),

-- Product & System Tags
('AI Product Development',    'ai-product-development'),
('Intelligent Systems',       'intelligent-systems'),
('Machine Learning',          'machine-learning'),
('Large Language Models',     'large-language-models'),
('LLMs',                      'llms'),
('Computer Vision',           'computer-vision'),
('Natural Language Processing','natural-language-processing'),
('Retrieval-Augmented Generation', 'retrieval-augmented-generation'),
('RAG',                       'rag'),
('Fine-tuning',               'fine-tuning'),
('Prompt Engineering',        'prompt-engineering'),
('Embeddings',                'embeddings'),

-- Agents & Automation Tags
('AI Agents',                 'ai-agents'),
('Agentic Systems',           'agentic-systems'),
('Multi-Agent Systems',       'multi-agent-systems'),
('Automation',                'automation'),
('Workflow Automation',       'workflow-automation'),
('Process Automation',        'process-automation'),
('RPA',                       'rpa'),

-- Workflow & Operations Tags
('Workflow Redesign',         'workflow-redesign'),
('Business Process Optimization', 'business-process-optimization'),
('Operational Efficiency',    'operational-efficiency'),
('Digital Transformation',    'digital-transformation'),

-- Business Value Tags
('ROI',                       'roi'),
('Business Value',            'business-value'),
('Cost Reduction',            'cost-reduction'),
('Organizational Change',     'organizational-change'),
('AI Governance',             'ai-governance'),
('Responsible AI',            'responsible-ai'),
('AI Ethics',                 'ai-ethics'),

-- Industry Tags
('Healthcare AI',             'healthcare-ai'),
('Finance AI',                'finance-ai'),
('Education AI',              'education-ai'),
('Legal AI',                  'legal-ai'),
('Retail AI',                 'retail-ai'),
('Manufacturing AI',          'manufacturing-ai'),
('HR & Recruitment AI',       'hr-recruitment-ai'),
('Customer Support AI',       'customer-support-ai'),

-- Project / Product Tags
('AIDRA',                     'aidra'),
('MIPS',                      'mips'),
('ICreateSmiles',             'icreatesmiles'),

-- Technical Stack Tags
('Python',                    'python'),
('TypeScript',                'typescript'),
('Next.js',                   'nextjs'),
('Cloudflare',                'cloudflare'),
('Cloudflare Workers',        'cloudflare-workers'),
('API Design',                'api-design'),
('Vector Databases',          'vector-databases'),
('PostgreSQL',                'postgresql'),
('SQLite',                    'sqlite'),
('OpenAI',                    'openai'),
('Anthropic',                 'anthropic'),
('Claude',                    'claude'),

-- Audience / Org Size Tags
('Enterprise AI',             'enterprise-ai'),
('Startup AI',                'startup-ai'),
('SMB AI',                    'smb-ai'),
('CTO Perspective',           'cto-perspective'),
('Non-technical Leaders',     'non-technical-leaders'),

-- Content Format Tags
('Tutorial',                  'tutorial'),
('How-to Guide',              'how-to-guide'),
('Opinion',                   'opinion'),
('Research Summary',          'research-summary'),
('Project Breakdown',         'project-breakdown');
