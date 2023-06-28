DROP TABLE IF EXISTS links;
CREATE TABLE IF NOT EXISTS links (id TEXT PRIMARY KEY, original_url TEXT, modified BOOLEAN, create_at DATETIME, update_at DATETIME);
