CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  picture TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS onboarding (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  company TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  size TEXT,
  phone TEXT,
  country TEXT,
  services TEXT,          -- JSON array
  goals TEXT,
  budget TEXT,
  timeline TEXT,
  language TEXT,
  heard_from TEXT,
  status TEXT DEFAULT 'received',  -- received | review | kickoff | active
  notion_page_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
