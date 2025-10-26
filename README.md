# 🥷🚀 Ninja Space RPG

Um RPG de browser single-player que combina elementos de ninjas (inspirado em Naruto) com estratégia espacial (inspirado em OGame). Crie personagens, desenvolva habilidades, batalhe contra NPCs e construa sua base espacial!

## ✨ Características

- **Sistema de Personagens**: Crie ninjas ou guerreiros espaciais com stats únicos
- **Sistema de XP e Níveis**: Progressão automática com melhorias de stats
- **Habilidades**: Aprenda jutsus ninja ou tecnologias espaciais
- **Batalhas Turn-based**: Enfrente NPCs variados com diferentes dificuldades
- **Sistema de Recursos**: Gerencie ouro, cristais e materiais
- **Melhorias de Base**: Construa e melhore sua base espacial
- **Missões**: Complete missões diárias e da história
- **Loja**: Compre equipamentos e consumíveis
- **Rankings**: Veja os melhores jogadores da galáxia

## 🛠️ Tecnologias

- **Frontend**: Nuxt 3 + Vue 3
- **Styling**: Tailwind CSS + shadcn-vue
- **Backend**: Nitro (servidor integrado do Nuxt)
- **Banco de Dados**: Supabase PostgreSQL
- **Autenticação**: JWT
- **Estado**: Pinia
- **Notificações**: Vue Sonner

## 🚀 Instalação

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd mmo
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o seed do banco de dados (opcional)**

   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse o jogo**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🎮 Como Jogar

### Primeiros Passos

1. **Cadastre-se** ou use as credenciais de teste:

   - Email: `admin@ninjarpg.com` | Senha: `admin123`
   - Email: `test@ninjarpg.com` | Senha: `test123`

2. **Crie seu personagem**:

   - Escolha entre **Ninja** (ágil) ou **Guerreiro Espacial** (forte)
   - Dê um nome único ao seu personagem

3. **Explore o jogo**:
   - **Home**: Veja seu progresso e stats
   - **Batalhas**: Enfrente NPCs para ganhar XP e recursos
   - **Habilidades**: Aprenda novas técnicas
   - **Melhorias**: Construa e melhore sua base
   - **Missões**: Complete objetivos para recompensas
   - **Loja**: Compre equipamentos
   - **Rankings**: Veja sua posição entre outros jogadores

### Sistema de Classes

#### 🥷 Ninja

- **Vantagens**: Alta agilidade, ataques rápidos
- **Habilidades**: Jutsus de fogo, vento, clones, etc.
- **Especialidades**: Stealth, ataques críticos

#### 🚀 Guerreiro Espacial

- **Vantagens**: Alta força e defesa, mais vida
- **Habilidades**: Armas de energia, escudos, explosões
- **Especialidades**: Combate direto, tecnologia avançada

### Sistema de Progressão

- **XP**: Ganhe experiência em batalhas e missões
- **Level Up**: Aumenta automaticamente stats quando XP atinge o threshold
- **Habilidades**: Aprenda novas técnicas gastando XP
- **Melhorias**: Construa edifícios e melhore stats com recursos

## 🏗️ Estrutura do Projeto

```
mmo/
├── components/          # Componentes Vue reutilizáveis
├── composables/         # Composables para lógica reativa
├── layouts/            # Layouts do Nuxt
├── middleware/         # Middleware de autenticação
├── pages/              # Páginas/rotas
├── server/             # Backend Nitro
│   ├── api/           # Endpoints da API
│   └── utils/         # Utilitários do servidor
├── stores/             # Stores do Pinia
├── types/              # Tipos TypeScript
├── assets/             # Assets estáticos
└── db.sqlite          # Banco de dados SQLite
```

## 🔧 APIs Disponíveis

### Autenticação

- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Dados do usuário logado

### Personagens

- `GET /api/characters` - Listar personagens do usuário
- `POST /api/characters` - Criar novo personagem
- `POST /api/characters/:id/add-xp` - Adicionar XP ao personagem

### Habilidades

- `GET /api/skills/:characterId` - Habilidades do personagem
- `GET /api/skills/available` - Habilidades disponíveis
- `POST /api/skills/learn` - Aprender nova habilidade

### Batalhas

- `GET /api/battles/opponents` - Listar NPCs disponíveis
- `POST /api/battles/start` - Iniciar batalha
- `POST /api/battles/resolve` - Resolver batalha

### Recursos

- `GET /api/resources/:characterId` - Recursos do personagem

### Melhorias

- `GET /api/upgrades/:characterId` - Melhorias disponíveis
- `POST /api/upgrades/start` - Iniciar melhoria

## 🎯 Funcionalidades Implementadas

### ✅ Completas

- [x] Sistema de autenticação (login/cadastro)
- [x] Criação e seleção de personagens
- [x] Sistema de XP e níveis
- [x] Árvore de habilidades
- [x] Sistema de batalhas turn-based
- [x] NPCs com diferentes dificuldades
- [x] Sistema de recursos (ouro, cristais, materiais)
- [x] Melhorias de stats e construções
- [x] Páginas de missões, loja e rankings
- [x] Interface responsiva com Tailwind CSS
- [x] Componentes shadcn-vue
- [x] Notificações toast
- [x] Banco de dados SQLite
- [x] Dados de seed para testes

### 🔄 Em Desenvolvimento

- [ ] Sistema de inventário
- [ ] Equipamentos e itens
- [ ] Sistema de guilds
- [ ] Eventos especiais
- [ ] Mais tipos de NPCs
- [ ] Sistema de crafting

## 🐛 Solução de Problemas

### Erro de Banco de Dados

Se o banco não estiver funcionando, execute o seed:

```bash
curl -X POST http://localhost:3000/api/seed
```

### Erro de Dependências

Limpe o cache e reinstale:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build

Verifique se todas as dependências estão instaladas:

```bash
npm install
npm run build
```

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a seção de solução de problemas
2. Consulte as issues do repositório
3. Crie uma nova issue com detalhes do problema

---

**Divirta-se jogando Ninja Space RPG! 🥷🚀**
