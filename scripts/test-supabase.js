#!/usr/bin/env node

// Script para testar conexão com Supabase
import { createClient } from "@vercel/postgres";

async function testSupabaseConnection() {
  console.log("🔍 Testando conexão com Supabase...\n");

  // Verificar variáveis de ambiente
  const postgresUrl = process.env.POSTGRES_URL;

  if (!postgresUrl) {
    console.log("❌ POSTGRES_URL não encontrado nas variáveis de ambiente");
    console.log("   Configure POSTGRES_URL no painel da Vercel\n");
    return;
  }

  console.log("✅ POSTGRES_URL encontrado");
  console.log(
    `   Host: ${postgresUrl.includes("supabase.com") ? "Supabase" : "Outro"}\n`
  );

  try {
    // Criar cliente PostgreSQL
    const client = createClient({
      connectionString: postgresUrl,
    });

    console.log("🔌 Tentando conectar ao banco...");

    // Testar conexão com uma query simples
    const result = await client.query(
      "SELECT NOW() as current_time, version() as postgres_version"
    );

    console.log("✅ Conexão estabelecida com sucesso!");
    console.log(`   Hora atual: ${result.rows[0].current_time}`);
    console.log(
      `   Versão PostgreSQL: ${result.rows[0].postgres_version.split(" ")[0]}\n`
    );

    // Verificar se as tabelas existem
    console.log("📋 Verificando tabelas...");

    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    const tables = tablesResult.rows.map((row) => row.table_name);

    if (tables.length === 0) {
      console.log("⚠️  Nenhuma tabela encontrada");
      console.log(
        "   Execute o script supabase-schema.sql no Supabase SQL Editor\n"
      );
    } else {
      console.log(`✅ ${tables.length} tabelas encontradas:`);
      tables.forEach((table) => {
        console.log(`   - ${table}`);
      });
      console.log();
    }

    // Fechar conexão
    await client.end();

    console.log("🎯 Teste de conexão concluído com sucesso!");
    console.log("   O banco está pronto para uso em produção\n");
  } catch (error) {
    console.log("❌ Erro ao conectar com o banco:");
    console.log(`   ${error.message}\n`);

    if (error.message.includes("ENOTFOUND")) {
      console.log("💡 Possíveis soluções:");
      console.log("   - Verifique se o POSTGRES_URL está correto");
      console.log("   - Confirme se o projeto Supabase está ativo");
      console.log("   - Verifique se a senha está correta\n");
    }
  }
}

// Executar teste
testSupabaseConnection();
