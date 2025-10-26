import { createClient } from "@vercel/postgres";

// Interface para o banco PostgreSQL (Supabase)
interface DatabaseAdapter {
  prepare(query: string): {
    get(...params: any[]): Promise<any>;
    all(...params: any[]): Promise<any[]>;
    run(
      ...params: any[]
    ): Promise<{ lastInsertRowid: number; changes: number }>;
  };
  exec(query: string): Promise<void>;
  close(): Promise<void>;
}

// Adaptador PostgreSQL para Supabase
class SupabaseAdapter implements DatabaseAdapter {
  private client: any;

  constructor() {
    // Usar POSTGRES_URL do Supabase
    const connectionString =
      process.env.POSTGRES_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        "POSTGRES_URL é obrigatório. Configure Supabase na Vercel."
      );
    }

    console.log("🔌 Conectando ao Supabase PostgreSQL...");
    this.client = createClient({
      connectionString: connectionString,
    });
  }

  async prepare(query: string) {
    // Simular interface do SQLite para compatibilidade
    return {
      get: async (...params: any[]) => {
        try {
          const result = await this.client.query(query, params);
          return result.rows[0] || null;
        } catch (error) {
          console.error("Erro na query get:", error);
          throw error;
        }
      },
      all: async (...params: any[]) => {
        try {
          const result = await this.client.query(query, params);
          return result.rows;
        } catch (error) {
          console.error("Erro na query all:", error);
          throw error;
        }
      },
      run: async (...params: any[]) => {
        try {
          const result = await this.client.query(query, params);
          return {
            lastInsertRowid: result.rows[0]?.id || 0,
            changes: result.rowCount || 0,
          };
        } catch (error) {
          console.error("Erro na query run:", error);
          throw error;
        }
      },
    };
  }

  async exec(query: string) {
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
      console.error("Erro ao fechar conexão:", error);
      throw error;
    }
  }
}

// Factory para criar o adaptador Supabase
function createDatabase(): DatabaseAdapter {
  console.log("🚀 Usando Supabase PostgreSQL");
  return new SupabaseAdapter();
}

// Instância global do banco
const db = createDatabase();

// Função para inicializar o banco (verificar conexão)
export async function initializeDatabase() {
  try {
    console.log("🔍 Verificando conexão com Supabase...");

    // Testar conexão com uma query simples
    const testQuery = db.prepare("SELECT NOW() as current_time");
    const result = await testQuery.get();

    if (result) {
      console.log("✅ Conexão com Supabase estabelecida com sucesso!");
      console.log(`   Hora atual: ${result.current_time}`);
    } else {
      throw new Error("Falha ao conectar com Supabase");
    }

    // Verificar se as tabelas existem
    const tablesQuery = db.prepare(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    const tables = await tablesQuery.all();

    if (tables.length === 0) {
      console.log("⚠️  Nenhuma tabela encontrada no Supabase");
      console.log(
        "   Execute o script supabase-schema.sql no Supabase SQL Editor"
      );
    } else {
      console.log(`✅ ${tables.length} tabelas encontradas no Supabase:`);
      tables.forEach((table: any) => {
        console.log(`   - ${table.table_name}`);
      });
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
    throw error;
  }
}

export default db;
