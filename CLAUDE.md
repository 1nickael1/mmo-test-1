# Contexto Permanente - MMO RPG Project

## 🚀 Versão Atual: 1.2.0 (Janeiro 2025)

### 🎯 **Principais Melhorias Implementadas:**

#### **✅ Correções de Autenticação (v1.2.0)**

- **Cookie Padronizado**: Todos os cookies agora usam prefixo `@mmo/ninja/`
- **Botão de Logout Melhorado**: Ícone visível e funcional em desktop e mobile
- **Carregamento de Usuário**: Header agora carrega dados do usuário automaticamente
- **Consistência**: Todas as páginas agora usam autenticação correta

#### **✅ Interface de Personagem Reformulada (v1.2.0)**

- **Dashboard Completo**: Resumo de status, habilidades e equipamentos
- **Lista de Personagens**: Troca fácil entre personagens na mesma página
- **Carregamento Automático**: Habilidades e equipamentos carregam automaticamente
- **Estados Visuais**: Loading states e mensagens motivacionais

#### **✅ Filtros e Navegação Melhorados (v1.2.0)**

- **Legibilidade**: Texto escuro em fundos claros para melhor contraste
- **Indicação Visual**: Borda azul para filtros selecionados
- **Consistência**: Padrão visual unificado em todas as páginas
- **Responsividade**: Funciona perfeitamente em desktop e mobile

#### **✅ Correções de Sistema (v1.2.0)**

- **Erro "Personagem não encontrado"**: Resolvido em todas as páginas
- **Carregamento de Recursos**: Ouro, materiais e cristais agora aparecem corretamente
- **Funcionalidades Completas**: Loja, equipamentos, batalhas funcionam 100%
- **Estabilidade**: Sistema robusto e confiável para produção

## Stack Tecnológica (2025)

- **Frontend**: Nuxt 3.13.0 + Vue 3.5.22 + TypeScript 5.9.3
- **Backend**: Nuxt Server API (Nitro) + Node.js 22.x
- **Database**: SQLite com better-sqlite3 12.4.1
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui components
- **State Management**: Pinia 2.3.0
- **Validation**: Zod 3.25.76 + VeeValidate 4.15.1
- **Authentication**: JWT + bcryptjs 3.0.2
- **Icons**: Lucide Vue Next 0.546.0
- **Notifications**: Vue Sonner 1.4.0
- **UI Components**: Reka UI 2.5.1
- **Utilities**: VueUse 13.9.0

## Arquitetura do Projeto

### Estrutura de Pastas

```
app/
├── components/ui/     # Componentes shadcn/ui
├── composables/       # Composables Vue
├── layouts/          # Layouts Nuxt
├── middleware/       # Middleware de autenticação
├── pages/           # Páginas da aplicação
├── stores/          # Stores Pinia
└── types/           # Definições TypeScript

server/
├── api/             # Endpoints da API
└── utils/           # Utilitários do servidor
```

### Padrões de Desenvolvimento

#### 1. **Tipagem TypeScript (5.9.3)**

- Interfaces centralizadas em `app/types/index.ts`
- Tipos específicos para cada domínio (Character, Battle, Equipment, etc.)
- Validação com Zod 3.25.76 para requests/responses
- Strict mode habilitado para máxima segurança de tipos

#### 2. **Autenticação & Segurança**

- JWT tokens com cookies httpOnly
- Middleware global de autenticação (`auth.global.ts`)
- Hash de senhas com bcryptjs 3.0.2
- Rotas protegidas por padrão
- Validação de entrada com Zod schemas

#### 3. **Database & ORM**

- SQLite com better-sqlite3 12.4.1 (prepared statements)
- Schema centralizado em `server/utils/database.ts`
- Foreign keys habilitadas
- Migrations manuais com try/catch
- Índices otimizados para performance

#### 4. **Componentes UI (2025)**

- shadcn/ui com Tailwind CSS 3.4.17
- Reka UI 2.5.1 para componentes avançados
- Componentes composables e reutilizáveis
- Design system consistente com CSS variables
- Responsividade mobile-first
- Dark mode nativo

#### 5. **State Management**

- Pinia 2.3.0 para estado global
- Composables para lógica reutilizável
- Stores específicos por domínio
- VueUse 13.9.0 para utilitários reativos

## Regras de Comportamento

### Código & Arquitetura (2025)

- **SOLID, DRY, KISS**: Princípios fundamentais
- **TypeScript 5.9.3 strict**: Tipagem completa e segura
- **Vue 3.5.22 Composition API**: Preferir `<script setup>`
- **Nuxt 3.13.0 conventions**: Aproveitar auto-imports e convenções
- **SQLite optimization**: Prepared statements, índices apropriados
- **Component composition**: Preferir composição sobre herança
- **Modern CSS**: Tailwind CSS 3.4.17 com CSS variables

### Padrões Específicos do Projeto

- **API Responses**: Sempre usar interface `ApiResponse<T>`
- **Error Handling**: `createError()` do Nuxt para consistência
- **Database Queries**: Prepared statements para segurança
- **Authentication**: Middleware global + JWT verification
- **Component Props**: Tipagem explícita com interfaces
- **Store Actions**: Async/await com error handling
- **Validation**: Zod 3.25.76 schemas em todos os endpoints

### Performance & Escalabilidade (2025)

- **Database**: Índices em foreign keys e campos de busca
- **Frontend**: Lazy loading de componentes pesados
- **API**: Paginação para listas grandes
- **Caching**: Considerar cache para dados estáticos
- **Bundle**: Tree-shaking e code splitting
- **Tailwind CSS 3.4.17**: Builds otimizados e estáveis
- **Vue 3.5.22**: Otimizações de performance e reatividade

### Segurança

- **Input Validation**: Zod 3.25.76 schemas em todos os endpoints
- **SQL Injection**: Prepared statements obrigatórios
- **XSS**: Sanitização de dados do usuário
- **CSRF**: Cookies SameSite configurados
- **Rate Limiting**: Implementar em endpoints críticos
- **bcryptjs 3.0.2**: Hash seguro de senhas
- **JWT**: Tokens seguros com expiração

## Tom e Estilo de Resposta

- **Técnico e direto**: Foco em soluções práticas
- **Contextualizado**: Considerar a stack específica do projeto (2025)
- **Exemplos concretos**: Código adaptado ao ecossistema atual
- **Code review mindset**: Identificar problemas e melhorias
- **Performance-aware**: Sempre considerar impacto na performance
- **Modern practices**: Aproveitar recursos das versões mais recentes

## Exemplos de Contexto

### Otimização de Query (better-sqlite3 12.4.1)

```typescript
// ❌ Evitar
const characters = db.prepare("SELECT * FROM characters").all();

// ✅ Preferir
const characters = db
  .prepare(
    `
  SELECT c.*, u.username 
  FROM characters c 
  JOIN users u ON c.user_id = u.id 
  WHERE c.user_id = ?
`
  )
  .all(userId);
```

### Componente Vue (3.5.22)

```vue
<script setup lang="ts">
interface Props {
  character: Character;
  showStats?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showStats: true,
});
</script>
```

### API Endpoint (Nuxt 3.13.0)

```typescript
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<CreateCharacterRequest>(event);
    // validation, business logic, response
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno",
    });
  }
});
```

### Validação com Zod (3.25.76)

```typescript
import { z } from "zod";

const createCharacterSchema = z.object({
  name: z.string().min(1).max(50),
  class: z.enum(["ninja", "guerreiro_espacial"]),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validatedData = createCharacterSchema.parse(body);
  // process validated data
});
```

### Notificações (Vue Sonner 1.4.0)

```typescript
const { showSuccess, showError } = useToast();

// Uso moderno com opções avançadas
showSuccess("Personagem criado!", {
  duration: 4000,
  position: "top-right",
});
```

## Objetivo

Manter um fluxo de trabalho de alto nível entre pares de engenharia, garantindo que cada sugestão e geração de código reflita a experiência de um desenvolvedor sênior familiarizado com a stack específica do projeto MMO RPG, utilizando as versões mais recentes e otimizadas de 2025.

**FOCO PRINCIPAL: PRODUÇÃO**

- Todo código deve ser desenvolvido pensando em produção desde o início
- Qualidade, performance e segurança são prioridades absolutas
- Cada funcionalidade deve ser robusta, testada e pronta para usuários finais
- Zero tolerância para código experimental ou "quick fixes" em produção

## Atualizações de Versão (2025)

### Principais Melhorias

- **Tailwind CSS 3.4.17**: Builds estáveis e otimizados
- **Vue 3.5.22**: Otimizações de performance e reatividade
- **TypeScript 5.9.3**: Melhor inferência de tipos e performance
- **Nuxt 3.13.0**: Melhorias no SSR e auto-imports
- **Pinia 2.3.0**: Estado global estável e eficiente
- **Zod 3.25.76**: Validação mais robusta e performática
- **Vue Sonner 1.4.0**: Notificações estáveis e acessíveis

### Compatibilidade

Todas as bibliotecas foram testadas e são compatíveis entre si, garantindo estabilidade e performance otimizada para o projeto MMO RPG.

## Sistema de Versionamento e Testes Automatizados

### Versionamento Automático

- **Sempre atualizar versão**: Toda mudança significativa deve incrementar a versão da aplicação
- **Script de atualização**: Usar `scripts/update-version.js` para incrementar versão automaticamente
- **Validação de compatibilidade**: Sistema robusto de verificação de versão entre cliente e servidor
- **Logout inteligente**: Apenas forçar logout quando realmente necessário (versões incompatíveis)

### Testes Automatizados

- **Cobertura completa**: Todos os testes devem ser executados após qualquer mudança
- **Validação obrigatória**: Sempre executar `npm test` antes de considerar uma tarefa concluída
- **Correção automática**: Se testes falharem, corrigir problemas antes de prosseguir
- **Atualização de testes**: Novas funcionalidades devem incluir testes correspondentes

### Fluxo de Trabalho Obrigatório

1. **Implementar funcionalidade**
2. **Atualizar versão** (se necessário): `node scripts/update-version.js patch "Descrição da mudança"`
3. **Executar testes**: `npm test`
4. **Corrigir falhas** (se houver)
5. **Validar funcionamento** completo
6. **Documentar mudanças**

### Comandos Essenciais

```bash
# Executar todos os testes
npm test

# Atualizar versão (patch/minor/major)
node scripts/update-version.js patch "Correção de bug"
node scripts/update-version.js minor "Nova funcionalidade"
node scripts/update-version.js major "Breaking change"

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

### Regras de Versionamento

- **Patch (1.0.1)**: Correções de bugs, ajustes menores
- **Minor (1.1.0)**: Novas funcionalidades, melhorias
- **Major (2.0.0)**: Breaking changes, refatorações significativas

### Validação de Qualidade

- **100% dos testes passando**: Obrigatório antes de qualquer deploy
- **Cobertura mínima**: 80% de cobertura de código
- **Linting limpo**: Sem erros de TypeScript ou ESLint
- **Performance**: Tempo de resposta < 200ms para APIs críticas

## Padrões de Produção

### Qualidade de Código

- **Código limpo**: Legível, bem documentado e seguindo padrões
- **Tratamento de erros**: Todos os cenários de erro devem ser tratados
- **Logs estruturados**: Sistema de logging para monitoramento em produção
- **Métricas**: Implementar métricas de performance e uso

### Segurança em Produção

- **Validação rigorosa**: Todos os inputs devem ser validados e sanitizados
- **Rate limiting**: Proteção contra abuso e ataques
- **Headers de segurança**: CSP, HSTS, X-Frame-Options configurados
- **Secrets management**: Variáveis sensíveis nunca hardcoded

### Performance em Produção

- **Otimização de queries**: Índices apropriados, queries otimizadas
- **Caching estratégico**: Cache de dados frequentes e estáticos
- **Bundle optimization**: Code splitting, tree shaking, lazy loading
- **CDN ready**: Assets otimizados para distribuição global

### Monitoramento e Observabilidade

- **Health checks**: Endpoints para verificar saúde da aplicação
- **Error tracking**: Sistema para capturar e reportar erros
- **Performance monitoring**: Métricas de tempo de resposta e throughput
- **User analytics**: Tracking de uso e comportamento (com privacidade)

### Deployment e DevOps

- **CI/CD robusto**: Pipeline automatizado com testes e validações
- **Rollback strategy**: Capacidade de reverter deployments rapidamente
- **Environment parity**: Desenvolvimento, staging e produção similares
- **Backup strategy**: Backup automático e recuperação de dados
