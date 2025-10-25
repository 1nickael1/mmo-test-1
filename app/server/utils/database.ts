import Database from "better-sqlite3";
import { join } from "path";

const dbPath = join(process.cwd(), "db.sqlite");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create tables
export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      username TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Characters table
  db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      class TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      xp INTEGER DEFAULT 0,
      stats_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Skills table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      skill_name TEXT NOT NULL,
      level INTEGER DEFAULT 0,
      unlocked BOOLEAN DEFAULT FALSE,
      cooldown_seconds INTEGER DEFAULT 30,
      damage INTEGER DEFAULT 20,
      description TEXT,
      last_used DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
    )
  `);

  // Resources table
  db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      resource_type TEXT NOT NULL,
      amount INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE,
      UNIQUE(character_id, resource_type)
    )
  `);

  // Battles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS battles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      opponent_type TEXT NOT NULL,
      opponent_level INTEGER NOT NULL,
      outcome TEXT NOT NULL,
      xp_gained INTEGER DEFAULT 0,
      rewards_json TEXT,
      battle_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
    )
  `);

  // Items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      item_name TEXT NOT NULL,
      item_type TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      stats_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
    )
  `);

  // Equipment table
  db.exec(`
    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      equipment_name TEXT NOT NULL,
      equipment_type TEXT NOT NULL,
      equipped BOOLEAN DEFAULT FALSE,
      stats_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
    )
  `);

  // Story progress table
  db.exec(`
    CREATE TABLE IF NOT EXISTS story_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      chapter INTEGER NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE,
      UNIQUE(character_id, chapter)
    )
  `);

  // Active battles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS active_battles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      battle_type TEXT NOT NULL,
      opponent_data TEXT NOT NULL,
      character_health INTEGER NOT NULL,
      opponent_health INTEGER NOT NULL,
      battle_turn INTEGER DEFAULT 1,
      battle_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE,
      UNIQUE(character_id)
    )
  `);

  // Upgrades table
  db.exec(`
    CREATE TABLE IF NOT EXISTS upgrades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      upgrade_type TEXT NOT NULL,
      upgrade_name TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      cost_json TEXT NOT NULL,
      is_completed BOOLEAN DEFAULT FALSE,
      started_at DATETIME,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
    )
  `);

  // Mission progress table
  db.exec(`
    CREATE TABLE IF NOT EXISTS mission_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER NOT NULL,
      mission_id TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE,
      UNIQUE(character_id, mission_id)
    )
  `);

  // Adicionar colunas que podem não existir em tabelas antigas
  try {
    db.exec(
      `ALTER TABLE skills ADD COLUMN cooldown_seconds INTEGER DEFAULT 30`
    );
  } catch (e) {
    // Coluna já existe
  }

  try {
    db.exec(`ALTER TABLE skills ADD COLUMN damage INTEGER DEFAULT 20`);
  } catch (e) {
    // Coluna já existe
  }

  try {
    db.exec(`ALTER TABLE skills ADD COLUMN description TEXT`);
  } catch (e) {
    // Coluna já existe
  }

  try {
    db.exec(`ALTER TABLE skills ADD COLUMN last_used DATETIME`);
  } catch (e) {
    // Coluna já existe
  }

  console.log("Database initialized successfully");
}

// Initialize database on import
initializeDatabase();

export default db;
