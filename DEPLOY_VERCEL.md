# Deploy na Vercel - MMO RPG Project

## 🚀 Configuração para Produção

### 1. **Configuração de Variáveis de Ambiente**

No painel da Vercel, adicione as seguintes variáveis de ambiente:

```bash
# OBRIGATÓRIO
NODE_ENV=production
JWT_SECRET=sua-chave-secreta-super-segura-aqui

# SUPABASE DATABASE (OBRIGATÓRIO para produção)
POSTGRES_URL=postgres://postgres.user:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
POSTGRES_USER=postgres
POSTGRES_HOST=db.project-id.supabase.co
POSTGRES_PASSWORD=your-password
POSTGRES_DATABASE=postgres
POSTGRES_PRISMA_URL=postgres://postgres.user:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://postgres.user:password@aws-1-sa-east-1.pooler.supabase.com:5432/postgres?sslmode=require

# SUPABASE API KEYS
SUPABASE_URL=https://project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
NEXT_PUBLIC_SUPABASE_URL=https://project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# OPCIONAL (credenciais admin)
ADMIN_USERNAME=root
ADMIN_PASSWORD=sua-senha-admin-segura
```

### 2. **Banco de Dados Supabase**

#### ✅ Supabase PostgreSQL (Recomendado)

- ✅ Dados persistentes
- ✅ Escalável e confiável
- ✅ Interface web para gerenciamento
- ✅ Backup automático
- ✅ Suporte completo

**Para configurar Supabase:**

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em "Settings" → "Database"
4. Copie todas as variáveis de ambiente
5. Execute o script `supabase-schema.sql` no SQL Editor
6. Adicione as variáveis na Vercel

#### ❌ SQLite (Não funciona em produção)

- ❌ Dados são perdidos a cada deploy
- ❌ Não funciona na Vercel
- ❌ Apenas para desenvolvimento local

### 3. **Configurações de Build**

O projeto já está configurado com:

- ✅ `vercel.json` para configurações específicas
- ✅ Cookies seguros para produção
- ✅ Adaptador de banco de dados
- ✅ Configurações de CORS

### 4. **Deploy**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Ou conectar repositório GitHub
# 1. Acesse vercel.com
# 2. Import project
# 3. Conecte seu repositório
# 4. Configure variáveis de ambiente
# 5. Deploy automático
```

### 5. **Verificação Pós-Deploy**

Após o deploy, teste:

1. **Acesso à aplicação**: `https://seu-projeto.vercel.app`
2. **Registro de usuário**: `/cadastro`
3. **Login**: `/login`
4. **Admin**: `/admin` (root/root)

### 6. **Problemas Comuns**

#### ❌ "Cannot connect to database"

- **Causa**: SQLite não funciona na Vercel
- **Solução**: Configure PostgreSQL

#### ❌ "Token inválido"

- **Causa**: Cookies não configurados corretamente
- **Solução**: Verifique `JWT_SECRET` e configurações de cookie

#### ❌ "CORS error"

- **Causa**: Domínio não configurado
- **Solução**: Configure `CORS_ORIGIN` com seu domínio

### 7. **Monitoramento**

- **Logs**: Vercel Dashboard → Functions → Logs
- **Métricas**: Vercel Dashboard → Analytics
- **Erros**: Vercel Dashboard → Functions → Errors

### 8. **Backup e Migração**

Para migrar dados do SQLite local para PostgreSQL:

```bash
# Exportar dados do SQLite
sqlite3 db.sqlite ".dump" > backup.sql

# Importar para PostgreSQL
psql $DATABASE_URL < backup.sql
```

## 🔧 Configurações Avançadas

### Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Environment Variables

```bash
# Desenvolvimento
NODE_ENV=development
JWT_SECRET=dev-secret-key

# Produção
NODE_ENV=production
JWT_SECRET=super-secure-production-key
DATABASE_URL=postgresql://...
```

### Performance

- ✅ Serverless functions otimizadas
- ✅ Edge caching habilitado
- ✅ Compressão automática
- ✅ CDN global

## 📊 Status do Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados configurado
- [ ] Deploy realizado
- [ ] Testes de funcionalidade
- [ ] Monitoramento ativo

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs da Vercel
2. Confirme variáveis de ambiente
3. Teste endpoints individualmente
4. Verifique configurações de banco

**Lembre-se**: O SQLite não funciona na Vercel em produção. Use PostgreSQL para dados persistentes.
