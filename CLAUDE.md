# Contexto Permanente - MMO RPG Project

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
