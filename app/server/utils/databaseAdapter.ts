import { createClient } from "@vercel/postgres";
import Database from "better-sqlite3";

// Interface para diferentes tipos de banco
interface DatabaseAdapter {
  prepare(query: string): {
    get(...params: any[]): any;
    all(...params: any[]): any[];
    run(...params: any[]): { lastInsertRowid: number; changes: number };
  };
  exec(query: string): void;
  close(): void;
}

// Adaptador SQLite para desenvolvimento
class SQLiteAdapter implements DatabaseAdapter {
  private db: Database.Database;

  constructor() {
    this.db = new Database("db.sqlite");
    this.db.pragma("foreign_keys = ON");
  }

  prepare(query: string) {
    return this.db.prepare(query);
  }

  exec(query: string) {
    this.db.exec(query);
  }

  close() {
    this.db.close();
  }
}

// Adaptador PostgreSQL para produção (Supabase)
class PostgresAdapter implements DatabaseAdapter {
  private client: any;

  constructor() {
    // Usar POSTGRES_URL do Supabase
    const connectionString =
      process.env.POSTGRES_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("POSTGRES_URL ou DATABASE_URL não configurado");
    }

    this.client = createClient({
      connectionString: connectionString,
    });
  }

  async prepare(query: string) {
    // Simular interface do SQLite para compatibilidade
    return {
      get: async (...params: any[]) => {
        const result = await this.client.query(query, params);
        return result.rows[0] || null;
      },
      all: async (...params: any[]) => {
        const result = await this.client.query(query, params);
        return result.rows;
      },
      run: async (...params: any[]) => {
        const result = await this.client.query(query, params);
        return {
          lastInsertRowid: result.rows[0]?.id || 0,
          changes: result.rowCount || 0,
        };
      },
    };
  }

  async exec(query: string) {
    await this.client.query(query);
  }

  close() {
    this.client.end();
  }
}

// Factory para criar o adaptador apropriado
function createDatabase(): DatabaseAdapter {
  const isProduction = process.env.NODE_ENV === "production";
  const hasPostgresUrl = !!process.env.POSTGRES_URL;
  const hasDatabaseUrl = !!process.env.DATABASE_URL;

  // Em produção, SEMPRE usar Supabase
  if (isProduction) {
    if (hasPostgresUrl || hasDatabaseUrl) {
      console.log("Usando PostgreSQL (Supabase) para produção");
      return new PostgresAdapter();
    } else {
      throw new Error(
        "POSTGRES_URL é obrigatório em produção. Configure Supabase na Vercel."
      );
    }
  } else {
    // Em desenvolvimento, usar SQLite
    console.log("Usando SQLite para desenvolvimento");
    return new SQLiteAdapter();
  }
}

// Instância global do banco
const db = createDatabase();

// Função para inicializar o banco (criar tabelas se não existirem)
export async function initializeDatabase() {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
      // Em produção, assumir que as tabelas já existem
      // ou executar migrations específicas
      console.log("Banco de produção - assumindo tabelas existentes");
      return;
    }

    // Schema para desenvolvimento (SQLite)
    const schema = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Characters table
      CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        class TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        health INTEGER DEFAULT 100,
        max_health INTEGER DEFAULT 100,
        mana INTEGER DEFAULT 50,
        max_mana INTEGER DEFAULT 50,
        attack INTEGER DEFAULT 10,
        defense INTEGER DEFAULT 5,
        speed INTEGER DEFAULT 8,
        gold INTEGER DEFAULT 100,
        materials INTEGER DEFAULT 0,
        crystals INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Skills table
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL,
        skill_name TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        last_used DATETIME,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
      );

      -- Equipment table
      CREATE TABLE IF NOT EXISTS equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL,
        equipment_name TEXT NOT NULL,
        equipment_type TEXT NOT NULL,
        equipped BOOLEAN DEFAULT FALSE,
        stats_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
      );

      -- Upgrades table
      CREATE TABLE IF NOT EXISTS upgrades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL,
        upgrade_type TEXT NOT NULL,
        level INTEGER DEFAULT 0,
        max_level INTEGER DEFAULT 10,
        cost_gold INTEGER DEFAULT 0,
        cost_materials INTEGER DEFAULT 0,
        cost_crystals INTEGER DEFAULT 0,
        upgrade_time INTEGER DEFAULT 0,
        started_at DATETIME,
        completed_at DATETIME,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
      );

      -- Story progress table
      CREATE TABLE IF NOT EXISTS story_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL,
        chapter INTEGER NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        completed_at DATETIME,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
      );

      -- Missions table
      CREATE TABLE IF NOT EXISTS missions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL,
        mission_name TEXT NOT NULL,
        description TEXT,
        reward_gold INTEGER DEFAULT 0,
        reward_xp INTEGER DEFAULT 0,
        reward_materials INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        completed_at DATETIME,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
      );

      -- Battle logs table
      CREATE TABLE IF NOT EXISTS battle_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL,
        opponent_name TEXT NOT NULL,
        result TEXT NOT NULL,
        damage_dealt INTEGER DEFAULT 0,
        damage_received INTEGER DEFAULT 0,
        gold_earned INTEGER DEFAULT 0,
        xp_earned INTEGER DEFAULT 0,
        battle_duration INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
      );
    `;

    db.exec(schema);
    console.log("Banco de dados inicializado com sucesso");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    throw error;
  }
}

export default db;
