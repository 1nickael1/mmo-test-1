# Plano de Ação - RPG de Browser Naruto/OGame

## 📋 Visão Geral do Projeto

**Objetivo**: Criar um RPG de browser single-player inspirado em Naruto Game e OGame, usando Nuxt 4, Tailwind CSS, shadcn-vue e SQLite.

**Características Principais**:

- RPG single-player com elementos de ninjas e estratégia espacial
- Sistema de progressão com XP, níveis e habilidades
- Batalhas contra NPCs com recompensas
- Gerenciamento de recursos e melhorias
- Interface moderna e responsiva

## 🏗️ Arquitetura Técnica

### Stack Tecnológico

- **Frontend**: Nuxt 4 + Vue 3
- **Styling**: Tailwind CSS + shadcn-vue
- **Backend**: Nitro (servidor integrado do Nuxt)
- **Banco de Dados**: SQLite (better-sqlite3)
- **Autenticação**: JWT/Sessions
- **Estado**: Pinia

### Estrutura de Diretórios

```
mmo/
├── components/          # Componentes Vue reutilizáveis
├── composables/         # Composables para lógica reativa
├── layouts/            # Layouts do Nuxt
├── middleware/         # Middleware de autenticação
├── pages/              # Páginas/rotas
├── server/             # Backend Nitro
│   ├── api/           # Endpoints da API
│   └── routes/        # Rotas customizadas
├── stores/             # Stores do Pinia
├── types/              # Tipos TypeScript
├── utils/              # Utilitários
├── db.sqlite          # Banco de dados SQLite
└── nuxt.config.ts     # Configuração do Nuxt
```

## 📊 Modelo de Dados (SQLite)

### Tabelas Principais

#### 1. users

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. characters

```sql
CREATE TABLE characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    class TEXT NOT NULL, -- 'ninja', 'guerreiro_espacial'
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    stats_json TEXT NOT NULL, -- JSON com força, agilidade, etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

#### 3. skills

```sql
CREATE TABLE skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL,
    skill_name TEXT NOT NULL,
    level INTEGER DEFAULT 0,
    unlocked BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters (id)
);
```

#### 4. resources

```sql
CREATE TABLE resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL,
    resource_type TEXT NOT NULL, -- 'ouro', 'cristais', 'materiais'
    amount INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters (id)
);
```

#### 5. battles

```sql
CREATE TABLE battles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL,
    opponent_type TEXT NOT NULL,
    opponent_level INTEGER NOT NULL,
    outcome TEXT NOT NULL, -- 'victory', 'defeat'
    xp_gained INTEGER DEFAULT 0,
    rewards_json TEXT, -- JSON com itens e recursos ganhos
    battle_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters (id)
);
```

#### 6. items

```sql
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    item_type TEXT NOT NULL, -- 'weapon', 'armor', 'consumable'
    quantity INTEGER DEFAULT 1,
    stats_json TEXT, -- JSON com stats do item
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters (id)
);
```

## 🎯 Fases de Desenvolvimento

### Fase 1: Setup e Configuração Base (1-2 dias)

- [ ] Inicializar projeto Nuxt 4
- [ ] Configurar Tailwind CSS
- [ ] Instalar e configurar shadcn-vue
- [ ] Configurar SQLite com better-sqlite3
- [ ] Criar estrutura de diretórios
- [ ] Configurar TypeScript e tipos básicos

### Fase 2: Sistema de Autenticação (2-3 dias)

- [ ] Implementar middleware de autenticação
- [ ] Criar páginas de login e cadastro
- [ ] Implementar APIs de autenticação (/api/auth/login, /api/auth/register)
- [ ] Configurar JWT/Sessions
- [ ] Criar sistema de proteção de rotas

### Fase 3: Sistema de Personagens (3-4 dias)

- [ ] Implementar criação de personagens
- [ ] Criar sistema de seleção de personagens
- [ ] Implementar sistema de XP e níveis
- [ ] Criar página de perfil do personagem
- [ ] Implementar lógica de level up automático

### Fase 4: Sistema de Habilidades (2-3 dias)

- [ ] Criar árvore de habilidades
- [ ] Implementar sistema de aprendizado de skills
- [ ] Criar página de habilidades
- [ ] Integrar habilidades com sistema de XP

### Fase 5: Sistema de Batalhas (4-5 dias)

- [ ] Implementar sistema de batalhas turn-based
- [ ] Criar NPCs e suas estatísticas
- [ ] Implementar lógica de combate
- [ ] Criar tela de resumo pós-batalha
- [ ] Implementar sistema de recompensas

### Fase 6: Sistema de Recursos e Melhorias (3-4 dias)

- [ ] Implementar sistema de recursos
- [ ] Criar página de melhorias
- [ ] Implementar sistema de construções
- [ ] Criar timers para construções
- [ ] Integrar com sistema de recursos

### Fase 7: Páginas Adicionais (2-3 dias)

- [ ] Implementar página de missões
- [ ] Criar sistema de loja
- [ ] Implementar rankings locais
- [ ] Criar página de itens/inventário

### Fase 8: UI/UX e Polimento (2-3 dias)

- [ ] Implementar layouts responsivos
- [ ] Adicionar animações com Tailwind
- [ ] Criar tema dark/light
- [ ] Implementar navegação global
- [ ] Adicionar feedback visual para ações

### Fase 9: Testes e Seed Data (1-2 dias)

- [ ] Criar dados de seed para testes
- [ ] Implementar usuário admin padrão
- [ ] Criar NPCs de exemplo
- [ ] Testar fluxos principais
- [ ] Documentar APIs

## 🔧 APIs a Implementar

### Autenticação

- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Dados do usuário logado

### Personagens

- `GET /api/characters` - Listar personagens do usuário
- `POST /api/characters` - Criar novo personagem
- `GET /api/characters/:id` - Detalhes do personagem
- `PUT /api/characters/:id` - Atualizar personagem
- `DELETE /api/characters/:id` - Deletar personagem

### Habilidades

- `GET /api/skills/:characterId` - Habilidades do personagem
- `POST /api/skills/learn` - Aprender nova habilidade
- `PUT /api/skills/:id/upgrade` - Melhorar habilidade

### Batalhas

- `GET /api/battles/opponents` - Listar NPCs disponíveis
- `POST /api/battles/start` - Iniciar batalha
- `POST /api/battles/:id/resolve` - Resolver batalha
- `GET /api/battles/history/:characterId` - Histórico de batalhas

### Recursos

- `GET /api/resources/:characterId` - Recursos do personagem
- `POST /api/resources/update` - Atualizar recursos
- `POST /api/resources/spend` - Gastar recursos

### Melhorias

- `GET /api/upgrades/:characterId` - Melhorias disponíveis
- `POST /api/upgrades/start` - Iniciar melhoria
- `GET /api/upgrades/status/:characterId` - Status das construções

## 🎨 Componentes shadcn-vue a Implementar

### Formulários

- Input, Label, Button
- Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Checkbox, RadioGroup, RadioGroupItem

### Layout

- Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
- Tabs, TabsContent, TabsList, TabsTrigger
- Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
- Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger

### Navegação

- NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger
- Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator

### Feedback

- Alert, AlertDescription, AlertTitle
- Progress, Badge, Avatar
- Toast, Toaster, useToast

### Dados

- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious

## 🎮 Mecânicas de Jogo

### Sistema de XP e Níveis

- **XP por nível**: 1000 \* (nível ^ 1.5)
- **Stats por nível**: +1 força, +1 agilidade, +1 defesa, +1 vida
- **Level up automático**: Quando XP atinge o threshold

### Classes de Personagem

- **Ninja**: +2 agilidade, +1 força, habilidades de stealth
- **Guerreiro Espacial**: +2 força, +1 defesa, habilidades de combate

### Sistema de Batalhas

- **Turnos**: Personagem vs NPC
- **Dano**: (Força + Arma) - (Defesa do oponente)
- **XP ganho**: 100-500 baseado na dificuldade do NPC
- **Recompensas**: Ouro, itens aleatórios, materiais

### Recursos

- **Ouro**: Moeda principal para compras
- **Cristais**: Recurso raro para melhorias avançadas
- **Materiais**: Para construções e upgrades

## 🚀 Comandos de Execução

```bash
# Instalação
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📝 Checklist de Funcionalidades

### Autenticação ✅

- [ ] Login com email/senha
- [ ] Cadastro de usuário
- [ ] Proteção de rotas
- [ ] Logout

### Personagens ✅

- [ ] Criação de personagem
- [ ] Seleção de personagem
- [ ] Sistema de XP/níveis
- [ ] Perfil do personagem

### Habilidades ✅

- [ ] Árvore de habilidades
- [ ] Aprendizado de skills
- [ ] Melhoria de habilidades
- [ ] Integração com XP

### Batalhas ✅

- [ ] Sistema turn-based
- [ ] NPCs variados
- [ ] Cálculo de dano
- [ ] Recompensas pós-batalha
- [ ] Histórico de batalhas

### Recursos ✅

- [ ] Sistema de recursos
- [ ] Coleta de recursos
- [ ] Gastos em melhorias
- [ ] Loja de itens

### Melhorias ✅

- [ ] Sistema de construções
- [ ] Timers de construção
- [ ] Upgrades de stats
- [ ] Melhorias de base

### UI/UX ✅

- [ ] Design responsivo
- [ ] Tema dark/light
- [ ] Animações
- [ ] Navegação intuitiva
- [ ] Feedback visual

## 🎯 Objetivos de Qualidade

- **Performance**: Carregamento rápido, otimização de imagens
- **Acessibilidade**: Componentes acessíveis, navegação por teclado
- **Responsividade**: Funcionamento em mobile, tablet e desktop
- **Usabilidade**: Interface intuitiva, feedback claro
- **Manutenibilidade**: Código limpo, documentado e testável

## 📚 Recursos e Referências

- [Nuxt 4 Documentation](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [Pinia](https://pinia.vuejs.org/)

---

**Estimativa Total**: 20-30 dias de desenvolvimento
**Prioridade**: MVP funcional em 15 dias, polimento nos 15 dias restantes
