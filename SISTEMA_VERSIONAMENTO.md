# 🔄 Sistema de Versionamento da Aplicação

## Visão Geral

O sistema de versionamento garante que todos os usuários sempre tenham a versão mais atualizada da aplicação e que dados antigos sejam limpos quando necessário. Isso previne problemas de compatibilidade, perda de progresso e falhas de autenticação.

## Componentes do Sistema

### 1. API de Versão (`/api/version`)

- **Endpoint**: `GET /api/version`
- **Função**: Retorna informações sobre a versão atual da aplicação
- **Dados retornados**:
  - `version`: Versão atual da aplicação
  - `minSupportedVersion`: Versão mínima suportada
  - `forceLogoutVersions`: Lista de versões que requerem logout forçado
  - `changelog`: Histórico de mudanças
  - `lastUpdate`: Data da última atualização

### 2. Verificação de Compatibilidade (`/api/auth/check-version`)

- **Endpoint**: `POST /api/auth/check-version`
- **Função**: Verifica se o token de autenticação é compatível com a versão atual
- **Comportamento**: Retorna erro 401 se o token foi criado com versão incompatível

### 3. Composable `useAppVersion`

- **Localização**: `app/composables/useAppVersion.ts`
- **Funções principais**:
  - `checkForUpdates()`: Verifica se há atualizações disponíveis
  - `forceLogout()`: Força logout e limpeza completa do localStorage
  - `clearLocalStorage()`: Limpa dados locais preservando ou não o token
  - `compareVersions()`: Compara versões usando semantic versioning

### 4. Interceptor de Versão

- **Localização**: `app/composables/useVersionInterceptor.ts`
- **Função**: Intercepta respostas da API para detectar erros de versão
- **Comportamento**: Força logout automático quando detecta incompatibilidade

### 5. Plugin de Versionamento

- **Localização**: `app/plugins/version.client.ts`
- **Função**: Inicializa verificação de versão e monitora periodicamente
- **Frequência**: Verifica a cada 30 segundos

## Fluxo de Funcionamento

### 1. Inicialização da Aplicação

```
1. Plugin carrega → useAppVersion.initializeVersionCheck()
2. Busca versão do servidor → /api/version
3. Compara com versão local armazenada
4. Se incompatível → força logout
5. Se compatível → atualiza versão local
```

### 2. Verificação Periódica

```
1. A cada 30 segundos → verifica versão
2. Se versão mudou → atualiza localStorage
3. Se versão incompatível → força logout
4. Se token incompatível → força logout
```

### 3. Interceptação de Requisições

```
1. Requisição API → intercepta resposta
2. Se erro 401 com mensagem de versão → força logout
3. Se token incompatível → força logout
4. Continua normalmente se compatível
```

## Cenários de Compatibilidade

### ✅ Versão Compatível

- **Condição**: `currentVersion >= minSupportedVersion`
- **Ação**: Continua funcionando normalmente
- **Exemplo**: Usuário com v1.0.0, servidor v1.0.0

### ⚠️ Versão Incompatível

- **Condição**: `currentVersion < minSupportedVersion`
- **Ação**: Força logout e limpeza completa
- **Exemplo**: Usuário com v0.9.0, servidor v1.0.0

### 🚨 Logout Forçado

- **Condição**: `currentVersion` está em `forceLogoutVersions`
- **Ação**: Logout imediato, sem aviso
- **Exemplo**: Versões com bugs críticos de segurança

## Estrutura de Dados

### localStorage

```javascript
{
  "app_version": "1.0.0",           // Versão atual da aplicação
  "app_storage_version": "1.0.0",   // Versão da estrutura de dados
  "token": "jwt_token_here",        // Token de autenticação
  "selectedCharacterId": "1"        // ID do personagem selecionado
}
```

### Token JWT

```javascript
{
  "userId": 1,
  "email": "user@example.com",
  "username": "username",
  "version": "1.0.0",              // Versão quando o token foi criado
  "iat": 1640995200,
  "exp": 1641600000
}
```

## Comandos Úteis

### Atualizar Versão

```bash
# Atualização patch (1.0.0 → 1.0.1)
node scripts/update-version.js patch "Correção de bug"

# Atualização minor (1.0.0 → 1.1.0)
node scripts/update-version.js minor "Nova funcionalidade"

# Atualização major (1.0.0 → 2.0.0)
node scripts/update-version.js major "Mudanças que quebram compatibilidade"
```

### Testar Sistema

```bash
# Executar testes de versionamento
node scripts/test-versioning.js
```

## Configuração para Novas Versões

### 1. Atualizar Versão

```bash
node scripts/update-version.js patch "Descrição da mudança"
```

### 2. Configurar Compatibilidade

No arquivo `app/server/api/version.get.ts`:

```typescript
const currentVersion = "1.0.1";
const minSupportedVersion = "1.0.0"; // Versão mínima suportada
const forceLogoutVersions = []; // Versões que requerem logout
```

### 3. Adicionar ao Changelog

```typescript
const changelog = [
  {
    version: "1.0.1",
    date: "2025-01-25T19:00:00Z",
    changes: ["Nova funcionalidade X", "Correção de bug Y"],
    breaking_changes: [], // Se houver mudanças que quebram compatibilidade
  },
];
```

## Segurança

### Proteções Implementadas

1. **Verificação de Token**: Tokens criados com versões antigas são rejeitados
2. **Limpeza de Dados**: localStorage é limpo quando necessário
3. **Logout Forçado**: Usuários com versões incompatíveis são deslogados
4. **Verificação Periódica**: Sistema monitora continuamente a compatibilidade
5. **Interceptação**: Requisições são interceptadas para detectar problemas

### Cenários de Segurança

- **Token Antigo**: Usuário com token de versão antiga é forçado a fazer login
- **Dados Corrompidos**: localStorage é limpo se estrutura mudou
- **Versão Incompatível**: Usuário é redirecionado para login
- **Falha de Rede**: Sistema assume incompatibilidade se não conseguir verificar

## Monitoramento

### Logs Importantes

```
🔄 Aplicação atualizada para versão X.X.X
🧹 localStorage limpo (token preservado)
🚪 Logout forçado devido à incompatibilidade de versão
⚠️ Versão X.X.X não é mais suportada ou requer logout
🚨 Versão incompatível detectada na API
```

### Métricas a Acompanhar

- Número de usuários forçados a fazer logout
- Frequência de limpeza de localStorage
- Erros de compatibilidade de versão
- Tempo de resposta da API de versão

## Troubleshooting

### Problema: Usuário não consegue fazer login

**Causa**: Token criado com versão incompatível
**Solução**: Limpar localStorage e fazer login novamente

### Problema: Dados perdidos após atualização

**Causa**: Estrutura do localStorage mudou
**Solução**: Sistema limpa automaticamente e preserva dados essenciais

### Problema: Aplicação não atualiza

**Causa**: Cache do navegador ou erro de rede
**Solução**: Forçar refresh (Ctrl+F5) ou limpar cache

### Problema: Loop de logout

**Causa**: Versão mínima configurada incorretamente
**Solução**: Verificar configuração de `minSupportedVersion`

## Conclusão

O sistema de versionamento garante que:

- ✅ Usuários sempre tenham a versão mais atualizada
- ✅ Dados antigos sejam limpos quando necessário
- ✅ Tokens incompatíveis sejam rejeitados
- ✅ Problemas de compatibilidade sejam detectados automaticamente
- ✅ O progresso do usuário seja preservado quando possível
- ✅ A segurança seja mantida com logout forçado quando necessário

Este sistema é essencial para manter a estabilidade e segurança da aplicação, especialmente em um ambiente de desenvolvimento ativo com múltiplas atualizações.
