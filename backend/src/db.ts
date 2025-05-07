import Database from 'better-sqlite3';
import path from 'path';

// Skapa sökvägen till databasfilen
const dbPath = path.join(__dirname, '../questions.db');
const db = new Database(dbPath);

// Skapa tabellen om den inte finns
db.prepare(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;
