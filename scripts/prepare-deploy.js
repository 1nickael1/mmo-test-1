#!/usr/bin/env node

// Script de deploy para Vercel
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Preparando deploy para Vercel...\n");

// Verificar se estamos em produção
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  console.log('⚠️  NODE_ENV não está definido como "production"');
  console.log("   Configure NODE_ENV=production na Vercel\n");
}

// Verificar variáveis obrigatórias
const requiredEnvVars = ["JWT_SECRET", "NODE_ENV"];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.log("❌ Variáveis de ambiente obrigatórias não encontradas:");
  missingVars.forEach((varName) => {
    console.log(`   - ${varName}`);
  });
  console.log("\n📝 Configure essas variáveis no painel da Vercel:\n");
  console.log("   NODE_ENV=production");
  console.log("   JWT_SECRET=sua-chave-secreta-super-segura");
  console.log("\n💡 Supabase Database (obrigatório para produção):");
  console.log(
    "   POSTGRES_URL=postgres://postgres.user:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres"
  );
  console.log("   POSTGRES_USER=postgres");
  console.log("   POSTGRES_HOST=db.project-id.supabase.co");
  console.log("   POSTGRES_PASSWORD=your-password");
  console.log("   POSTGRES_DATABASE=postgres");
  console.log("   SUPABASE_URL=https://project-id.supabase.co");
  console.log("   SUPABASE_ANON_KEY=your-supabase-anon-key");
  console.log("   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key");
  console.log("   SUPABASE_JWT_SECRET=your-supabase-jwt-secret\n");
}

// Verificar se o banco de dados está configurado
const hasPostgresUrl = !!process.env.POSTGRES_URL;
const hasDatabaseUrl = !!process.env.DATABASE_URL;

if (!hasPostgresUrl && !hasDatabaseUrl) {
  console.log("⚠️  POSTGRES_URL não configurado");
  console.log("   O sistema usará SQLite (dados serão perdidos a cada deploy)");
  console.log("   OBRIGATÓRIO: Configure Supabase PostgreSQL na Vercel\n");
} else {
  console.log("✅ POSTGRES_URL configurado - Supabase PostgreSQL será usado\n");
}

// Verificar arquivos de configuração
const configFiles = [
  "vercel.json",
  "nuxt.config.ts",
  "DEPLOY_VERCEL.md",
  "supabase-schema.sql",
  "scripts/seed-supabase.js",
  "scripts/populate-game-data.js",
  "scripts/complete-seed.js",
];

console.log("📁 Verificando arquivos de configuração:");
configFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - Arquivo não encontrado`);
  }
});

console.log("\n🔧 Próximos passos:");
console.log("1. Configure as variáveis de ambiente na Vercel");
console.log("2. Execute o schema: supabase-schema.sql no Supabase SQL Editor");
console.log("3. Popule o banco:");
console.log("   - Seed básico: npm run seed:supabase");
console.log("   - Seed completo: npm run seed:complete");
console.log("   - População máxima: npm run populate:game");
console.log("4. Conecte seu repositório GitHub à Vercel");
console.log("5. Execute o deploy");
console.log("6. Teste as funcionalidades:\n");
console.log("   - Registro: /cadastro");
console.log("   - Login: /login");
console.log("   - Admin: /admin (root/root)");
console.log("   - Personagens: /personagem");
console.log("   - Loja: /loja");
console.log("   - Batalhas: /batalhas");

console.log("\n📚 Documentação completa: DEPLOY_VERCEL.md");
console.log("🎯 Deploy pronto para produção!");
