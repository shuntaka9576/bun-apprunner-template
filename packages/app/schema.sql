CREATE TABLE IF NOT EXISTS task(
  task_id    TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  create_at  TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);
