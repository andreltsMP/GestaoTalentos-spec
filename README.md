# Frontend Next.js (MPMS/DID)

Projeto frontend modelo da Divisao de Desenvolvimento (DID/DESIN) do MPMS.

## Stack

- Next.js 16.x (App Router)
- React 19 + TypeScript 5
- @mpms/shared-ui (Design System oficial — fonte preferencial de componentes visuais)
- PrimeReact + PrimeFlex (componentes base e unico sistema de estilizacao)
- next-auth + Keycloak (autenticacao SSO)
- Zod + react-hook-form (validacao e formularios)
- ESLint 9 + Prettier (qualidade de codigo)
- Jest + React Testing Library (testes unitarios e de UI)
- Playwright (testes E2E — jornadas criticas)

---

## Dependencias PROIBIDAS

| Categoria | Proibido | Usar |
|-----------|----------|------|
| UI | Material UI, Chakra UI, Ant Design, Radix, NextUI | @mpms/shared-ui ou PrimeReact |
| Estilizacao | Tailwind CSS, styled-components, emotion, CSS Modules, SASS | PrimeFlex |
| Estado | Redux, MobX, Zustand | Context API + estado local |
| Autenticacao | Qualquer lib que nao seja next-auth + Keycloak | next-auth + Keycloak |
| Pacotes | npm publico sem aprovacao, versoes SNAPSHOT | Registry Verdaccio interno |

---

## Documentacao SDD

A documentacao SDD (Specification-Driven Development) em `docs/` e a fonte de verdade funcional do sistema:

```
docs/
├── specs/
│   ├── backend/          ← SOMENTE LEITURA (propriedade do agente backend)
│   ├── frontend/         ← Specs de UI, mockups, criterios de aceite
│   ├── ROADMAP.md        ← Ordem macro, fases e dependencias
│   ├── REQUIREMENTS-CATALOG.md
│   └── OPEN-QUESTIONS.md
├── adr/                  ← Decisoes arquiteturais
└── DESIGN.md             ← Design system obrigatorio (tokens, componentes, acessibilidade)
```

**Nunca altere arquivos em `docs/specs/backend/`.**

---

## Hierarquia de Decisao

Ao implementar qualquer funcionalidade, respeite esta ordem de precedencia:

1. Solicitacao explicita atual
2. `docs/specs/REQUIREMENTS-CATALOG.md`
3. `docs/adr/` (decisoes arquiteturais aceitas)
4. `docs/specs/ROADMAP.md` (fases e dependencias)
5. `docs/specs/backend/<feature>/spec.md` (somente leitura)
6. `docs/specs/frontend/<feature>/spec.md`
7. `DESIGN.md` (design system — leitura obrigatoria antes de qualquer tela)
8. `docs/specs/frontend/<feature>/mockup.html`
9. `AGENTS.md` (padroes tecnicos, stack, arquitetura)

---

## Proibicoes Explicitas

- Nunca usar `any`, `@ts-ignore` ou suprimir regras de lint globalmente
- Nunca usar path relativo `../../` — sempre `@/` (app) ou `@/shared/` (Design System)
- Nunca expor erros tecnicos, stack traces, tokens, senhas ou PII na UI ou logs
- Nunca armazenar tokens em localStorage/sessionStorage
- Nunca fazer fetch inline em componentes de pagina — extrair para `src/service/`
- Nunca usar `dangerouslySetInnerHTML` sem sanitizacao
- Nunca commitar `.env`, `.env.local` ou `node_modules`
- Nunca criar pastas `features/`, `helpers/` ou `utils/` na raiz
- Nunca instalar pacotes npm publicos sem aprovacao
- Nunca usar versoes SNAPSHOT de dependencias

---

## Pre-Requisitos

| Ferramenta | Versao |
|-----------|--------|
| Node.js | 20 LTS |
| npm | 10+ |
| Docker | Ultima estavel |
| Git | 2.40+ |

---

## Configuracao

### 1. Registry npm (Verdaccio)

O `.npmrc` ja aponta para o registry interno. Verifique a conectividade:

```bash
npm ping --registry=https://verdaccio.mpms.mp.br/
```

### 2. Instalacao de dependencias

```bash
npm install
```

### 3. Variaveis de ambiente

```bash
cp .env.example .env.local
```

Preencha o `.env.local` com os valores do ambiente de desenvolvimento:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_NAME=Exemplo Frontend
NEXT_PUBLIC_KEYCLOAK_URL=https://keycloak-dev.mpms.mp.br
NEXT_PUBLIC_KEYCLOAK_REALM=mpms
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=exemplo-frontend
KEYCLOAK_CLIENT_SECRET=seu-secret
NEXTAUTH_SECRET=uma-string-aleatoria-longa
NEXTAUTH_URL=http://localhost:3000
```

---

## Execucao

```bash
# Desenvolvimento (hot reload)
npm run dev

# Acessar
http://localhost:3000

# Build de producao
npm run build
npm run start
```

---

## Testes

```bash
# Testes unitarios
npm test

# Testes em modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

---

## Lint e Formatacao

```bash
# Verificar erros de lint
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar com Prettier
npm run format
```

---

## Build Docker

```bash
docker build -t exemplo-frontend:1.0.0 .
docker run -p 3000:3000 --env-file .env.local exemplo-frontend:1.0.0
```

---

## Estrutura de Diretorios

```
src/
├── app/                    ← Rotas (App Router, Server Components)
│   ├── (auth)/login/       ← Tela de login (SSO Keycloak)
│   ├── (portal)/           ← Rotas autenticadas
│   │   ├── dashboard/
│   │   └── cadastros/
│   └── api/auth/           ← NextAuth route handler
├── components/             ← Componentes React (max 150 linhas)
│   ├── layout/             ← Header, Sidebar
│   ├── forms/              ← Formularios com Zod + react-hook-form
│   └── shared/             ← Componentes compartilhados genericos
├── hooks/                  ← usePessoaLogada, usePermissao
├── service/                ← Chamadas HTTP, Server Actions
│   └── actions/            ← Server Actions
├── interfaces/             ← Tipos TypeScript
└── enums/                  ← Enumeracoes
docs/
├── specs/                  ← Documentacao SDD (fonte de verdade funcional)
│   ├── backend/            ← SOMENTE LEITURA
│   └── frontend/
├── adr/                    ← Decisoes arquiteturais
└── DESIGN.md               ← Design system obrigatorio
```

---

## Renomeacao da Pasta .harness

A pasta `.harness/` contem skills de codificacao agentica estruturadas por dominio (frontend, pipeline, seguranca, containers). Ao criar um novo projeto a partir deste template, **renomeie esta pasta** para o nome da ferramenta de IA utilizada:

| Ferramenta | Nome da pasta |
|-----------|---------------|
| OpenCode | `.opencode/` |
| Claude Code | `.claude/` |
| Cursor | `.cursor/` |
| GitHub Copilot | `.copilot/` |

Mantenha a estrutura interna de subpastas (`skills/`, etc.) ao renomear.

---

## Configuracoes Criticas

| Arquivo | O que verificar |
|---------|----------------|
| `next.config.ts` | `transpilePackages: ['@mpms/shared-ui']`, `output: 'standalone'`, headers de seguranca |
| `tsconfig.json` | `strict: true`, `"@/*": ["./src/*"]`, `"@/shared/*": ["./node_modules/@mpms/shared-ui/src/shared/*"]` |
| `.npmrc` | Registry apontando para Verdaccio (`https://verdaccio.mpms.mp.br/`) |
| `src/app/layout.tsx` | CSS base importado via `@mpms/shared-ui/public/css/globals.css` e `app.css` |
| `eslint.config.mjs` | Flat config ESLint 9, `@typescript-eslint/no-explicit-any: error` |
| `prettier.config.js` | Padrao de formatacao do projeto |
| `jest.config.js` | Configuracao de testes com path aliases |

---

## Regras do Projeto

### Componentes e Estilizacao
- Componentes visuais: `@mpms/shared-ui` (preferencial) ou PrimeReact (fallback).
- Estilizacao APENAS com PrimeFlex. Proibido Tailwind, `style={{}}`, CSS Modules, SASS, `!important`.
- Server Components por padrao. `'use client'` apenas para interatividade real (eventos, `useState`, `useEffect`).
- Maximo 150 linhas por componente.
- Paginas orquestram hooks; regras de dominio e acesso a dados ficam em `src/service/` e `src/hooks/`.

### Autenticacao e Autorizacao
- Autenticacao EXCLUSIVAMENTE via next-auth + Keycloak. Nunca login proprio.
- Tokens gerenciados por next-auth em cookies HttpOnly. Nunca em localStorage/sessionStorage.
- Permissoes via hook `usePermissao` (microsservico `_git/permissionamento`).
- Verificar autorizacao em toda operacao, nao apenas no login.

### TypeScript e Imports
- `strict: true`. Nunca usar `any`.
- Dados de API com interface tipada em `src/interfaces/`.
- Path alias obrigatorio: `@/` (app) e `@/shared/` (Design System). Nunca `../../`.
- Trailing comma obrigatorio em multiline. Ponto e virgula obrigatorio.
- Ordem de imports: React/Next.js → libs externas → @mpms/shared-ui → @/service → @/components → @/hooks → @/interfaces e @/enums.

### Convencoes de Nomenclatura

| Item | Convencao | Exemplo |
|------|-----------|---------|
| Componentes e paginas | `PascalCase` | `UsuarioFormPage.tsx` |
| Hooks | `use` + `PascalCase` | `usePessoaLogada.ts` |
| Services | `<dominio>.service.ts` | `usuarios.service.ts` |
| Schemas Zod | `<entidade>.schema.ts` | `usuario.schema.ts` |
| Interfaces | `<Entidade>.ts` ou `<dominio>.ts` | `Usuario.ts` |
| Enums | `<Dominio>Enum.ts` | `StatusProcessoEnum.ts` |
| Funcoes e variaveis | `camelCase` | `atualizarUsuario` |
| Constantes globais | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_SIZE` |

### Formularios
- Todo formulario usa React Hook Form + Zod (`z.infer<typeof schema>`).
- Desabilitar submit durante mutation. Impedir submissao duplicada.
- Mensagens de Toast centralizadas, em portugues.

### Estados de UI Obrigatorios
Toda tela deve implementar: **loading**, **vazio**, **erro**, **sem permissao** e **sucesso**.

### Git
- Branch: `feature/PID-XXX-descricao`, `bugfix/PID-XXX-descricao`, `hotfix/PID-XXX-descricao`
- Commit: `tipo(escopo): descricao imperativa` (feat, fix, refactor, docs, test, chore)
- Nunca commitar `.env`, `.env.local` ou `node_modules`.
- `.env.example` deve documentar TODAS as variaveis necessarias.

---

## Para saber mais

Consulte o `AGENTS.md` para a referencia completa de regras, fluxo SDD, checklist de pronto, criterios de decisao e anti-alucinacao.
