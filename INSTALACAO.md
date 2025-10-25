# Instalação e Configuração - MMO RPG Project

## Versões Compatíveis (2025)

Este projeto utiliza versões estáveis e compatíveis entre si para garantir estabilidade e performance.

### Stack Principal

- **Nuxt**: 3.13.0 (estável e bem testado)
- **Vue**: 3.5.22 (última versão estável)
- **TypeScript**: 5.9.3 (melhor inferência de tipos)
- **Tailwind CSS**: 3.4.17 (versão estável com todas as funcionalidades)

### Dependências de Suporte

- **Pinia**: 2.3.0 (estado global estável)
- **Vue Sonner**: 1.4.0 (notificações estáveis)
- **Zod**: 3.25.76 (validação robusta)
- **VeeValidate**: 4.15.1 (formulários modernos)

## Instalação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configuração do Banco de Dados

```bash
# O banco SQLite será criado automaticamente
# Dados de seed serão inseridos na primeira execução
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

### 4. Build para Produção

```bash
npm run build
npm run preview
```

## Configurações Importantes

### Tailwind CSS

- Configurado com `@nuxtjs/tailwindcss` para integração nativa
- Suporte a dark mode habilitado
- CSS variables para temas personalizados

### Vue Sonner

- Configurado para funcionar com SSR
- Estilos customizados para shadcn/ui
- Posicionamento no canto superior direito

### TypeScript

- Strict mode habilitado
- Type checking ativo
- Paths configurados para imports limpos

## Solução de Problemas

### Notificações não aparecem

1. Verifique se o componente `<Sonner />` está no layout
2. Confirme se o composable `useToast` está sendo importado corretamente
3. Verifique o console para erros de importação

### Estilos não aplicados

1. Confirme se o Tailwind CSS está configurado corretamente
2. Verifique se as classes CSS estão sendo purgadas
3. Reinicie o servidor de desenvolvimento

### Erros de TypeScript

1. Execute `npm run build` para verificar tipos
2. Confirme se todas as interfaces estão definidas
3. Verifique se os imports estão corretos

## Comandos Úteis

```bash
# Verificar dependências desatualizadas
npm outdated

# Auditoria de segurança
npm audit

# Limpar cache
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## Estrutura de Arquivos

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

## Notas de Compatibilidade

- **Nuxt 3.13.0**: Versão estável com todas as funcionalidades necessárias
- **Tailwind CSS 3.4.17**: Versão estável com suporte completo a shadcn/ui
- **Vue Sonner 1.4.0**: Versão estável compatível com Nuxt 3
- **Pinia 2.3.0**: Versão estável para gerenciamento de estado

Todas as versões foram testadas e são compatíveis entre si, garantindo estabilidade e performance otimizada.
