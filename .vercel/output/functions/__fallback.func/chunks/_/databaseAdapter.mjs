import { createClient } from '@vercel/postgres';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class SupabaseAdapter {
  constructor() {
    __publicField(this, "client");
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "POSTGRES_URL \xE9 obrigat\xF3rio. Configure Supabase na Vercel."
      );
    }
    console.log("\u{1F50C} Conectando ao Supabase PostgreSQL...");
    this.client = createClient({
      connectionString
    });
  }
  async prepare(query) {
    return {
      get: async (...params) => {
        try {
          const result = await this.client.query(query, params);
          return result.rows[0] || null;
        } catch (error) {
          console.error("Erro na query get:", error);
          throw error;
        }
      },
      all: async (...params) => {
        try {
          const result = await this.client.query(query, params);
          return result.rows;
        } catch (error) {
          console.error("Erro na query all:", error);
          throw error;
        }
      },
      run: async (...params) => {
        var _a;
        try {
          const result = await this.client.query(query, params);
          return {
            lastInsertRowid: ((_a = result.rows[0]) == null ? void 0 : _a.id) || 0,
            changes: result.rowCount || 0
          };
        } catch (error) {
          console.error("Erro na query run:", error);
          throw error;
        }
      }
    };
  }
  async exec(query) {
    try {
      await this.client.query(query);
    } catch (error) {
      console.error("Erro na exec:", error);
      throw error;
    }
  }
  async close() {
    try {
      await this.client.end();
    } catch (error) {
      console.error("Erro ao fechar conex\xE3o:", error);
      throw error;
    }
  }
}
function createDatabase() {
  console.log("\u{1F680} Usando Supabase PostgreSQL");
  return new SupabaseAdapter();
}
const db = createDatabase();

export { db as d };
//# sourceMappingURL=databaseAdapter.mjs.map
