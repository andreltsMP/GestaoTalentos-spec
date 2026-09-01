# AGENTS.md — Frontend Next.js (MPMS/DID)

Este é um projeto frontend React/Next.js da Divisão de Desenvolvimento do MPMS.
Siga rigorosamente estas regras ao gerar ou modificar código neste repositório.

> Este documento incorpora as diretrizes de Specification-Driven Development (SDD) e atua como fonte de verdade operacional para o agente de codificação frontend. Leia-o antes de criar, alterar ou remover código, componentes, páginas, rotas, testes ou configurações. **Este agente atua exclusivamente na camada frontend.**

***

## Stack Obrigatória

* Next.js 16.x (App Router)
* React 19.x + TypeScript 5.x
* @mpms/shared-ui (Design System oficial — fonte preferencial de componentes visuais)
* PrimeReact (biblioteca base de componentes, usada diretamente quando não houver equivalente no shared-ui)
* PrimeFlex (único sistema de estilização — utilitários CSS de layout e espaçamento)
* next-auth com provider Keycloak (autenticação)
* Zod + react-hook-form (validação e formulários)
* ESLint 9 + Prettier (qualidade de código)
* Jest + React Testing Library (testes)

## Dependências PROIBIDAS

* Material UI, Chakra UI, Ant Design, Radix, NextUI (usar @mpms/shared-ui ou PrimeReact)
* Tailwind CSS, styled-components, emotion, CSS Modules, SASS (usar PrimeFlex)
* Redux, MobX, Zustand (usar Context API + Server State)
* Qualquer lib de autenticação que não seja next-auth + Keycloak
* Qualquer pacote de npm público sem aprovação (registry é Verdaccio interno)
* Dependências com versão SNAPSHOT (NUNCA em main/master)
* Bibliotecas com CVE conhecido e sem correção disponível

***

## Estrutura da Documentação SDD

A documentação SDD (Specification-Driven Development) é a fonte de verdade funcional do sistema. Toda implementação deve partir dela.

```text
docs/
├── specs/
│   ├── backend/
│   │   ├── 0001-autenticacao/
│   │   │   └── spec.md
│   │   ├── 0002-consultas/
│   │   │   └── spec.md
│   │   └── ROADMAP.md
│   ├── frontend/
│   │   ├── 0001-autenticacao/
│   │   │   ├── spec.md
│   │   │   └── mockup.html
│   │   ├── 0002-dashboard/
│   │   │   ├── spec.md
│   │   │   └── mockup.html
│   │   └── ROADMAP.md
│   ├── OPEN-QUESTIONS.md
│   ├── REQUIREMENTS-CATALOG.md
│   └── ROADMAP.md
├── adr/
│   ├── 0001-usar-react-next-e-shared-ui.md
│   └── 0002-usar-keycloak-como-auth.md
└── DESIGN.md
```

### Papel de cada artefato

| Artefato                         | Finalidade                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `docs/specs/ROADMAP.md`          | Ordem macro, fases, dependências e prioridades do projeto                       |
| `docs/specs/backend/ROADMAP.md`  | Ordem de implementação das specs backend                                        |
| `docs/specs/frontend/ROADMAP.md` | Ordem de implementação das specs frontend                                       |
| `backend/*/spec.md`              | Dados, domínio, regras, segurança, autorização e contratos de API               |
| `frontend/*/spec.md`             | Fluxos de UI, rotas, ações, campos, validações e aceite funcional               |
| `DESIGN.md`                      | Design system global obrigatório: tokens, componentes, padrões e acessibilidade |
| `frontend/*/mockup.html`         | Referência visual específica; não é código de produção                          |
| `REQUIREMENTS-CATALOG.md`        | Requisitos transversais e regras globais                                        |
| `OPEN-QUESTIONS.md`              | Dúvidas, premissas pendentes e decisões bloqueantes                             |
| `docs/adr/*.md`                  | Decisões arquiteturais: contexto, alternativas e consequências                  |

### Regra de fronteira cross-layer

> **O diretório** **`docs/specs/backend/`** **é somente leitura para este agente.** Leia specs de backend para entender dados, regras de negócio, permissões e contratos de API, mas **nunca crie, edite ou remova** arquivos nesse diretório. A propriedade das specs de backend é do agente de backend.

### Regra para arquivos de backlog

Arquivos `backlog.csv` podem existir dentro de `docs/specs/` ou em suas subpastas. Esses arquivos são registros de planejamento/priorização externos e **não fazem parte da documentação SDD**. O agente deve:

* **Não ler** arquivos `backlog.csv` durante o fluxo SDD.
* **Não usar** `backlog.csv` como fonte de requisitos, escopo, prioridade ou ordem de implementação.
* **Não inferir** tarefas, dependências ou decisões a partir de `backlog.csv`.
* A fonte de verdade para ordem e escopo são exclusivamente os arquivos `ROADMAP.md`, `spec.md` e `REQUIREMENTS-CATALOG.md`.

### Correlação entre specs

* Trate specs com mesmo identificador ou objetivo de negócio entre `frontend/` e `backend/` como uma unidade correlata de entrega.
* Não presuma que números iguais são equivalentes se títulos/objetivos divergirem; use nome, escopo e dependências documentadas.
* Se existir somente spec backend, não invente UI sem solicitação explícita.
* Se existir somente spec frontend dependente de dados/operações inexistentes, não invente contratos: registre bloqueio em `OPEN-QUESTIONS.md`.

***

## Objetivo e prioridades

Construir uma aplicação web corporativa, modular, responsiva, segura e orientada por especificações (SDD), integrada com APIs internas do MPMS e autenticada via Keycloak.

Prioridades, nesta ordem:

1. Segurança, autorização efetiva e isolamento de dados.
2. Aderência às specs, ao `DESIGN.md`, aos mockups e critérios de aceite.
3. Clareza arquitetural, consistência e manutenibilidade.
4. Tipagem ponta a ponta.
5. Experiência de uso consistente, responsiva e acessível.
6. Performance, rastreabilidade e observabilidade.

***

## Princípios obrigatórios

* Trate a documentação SDD em `docs/specs/` como fonte de verdade funcional do sistema.
* Trate `DESIGN.md` como a fonte de verdade obrigatória do design system. Toda tela e componente de frontend deve obedecê-lo.
* Não invente regras de negócio, campos, permissões, fluxos, integrações ou requisitos ausentes nas specs, requisitos globais, ADRs, `DESIGN.md` ou solicitação explícita.
* Antes de implementar, localize a feature, suas dependências, critérios de aceite, permissões, spec correlata da outra camada, `DESIGN.md` e mockup, quando existir.
* Faça mudanças pequenas, coesas, rastreáveis e estritamente relacionadas à tarefa. Não refatore áreas não relacionadas sem solicitação explícita.
* Não introduza dependências sem justificativa técnica clara. Prefira as bibliotecas padronizadas neste documento.
* Não use `any`, `@ts-ignore`, casts inseguros ou desativação global de regras de lint.
* Não exponha segredos, credenciais, tokens, PII desnecessária ou chaves privilegiadas no client, logs, testes ou arquivos versionados.
* Toda operação de escrita deve ter validação, tratamento de erro, feedback de progresso e atualização/invalidação de cache apropriada.
* Autenticação exclusivamente via next-auth + Keycloak. Tokens nunca em localStorage/sessionStorage.
* A UI melhora a experiência, mas não autoriza acesso: validações server-side e permissionamento são os controles efetivos.
* Quando houver uma ambiguidade que altere comportamento de negócio, registre a questão e solicite validação. Não assuma silenciosamente.

***

## Hierarquia de decisão

Ao implementar qualquer funcionalidade, respeite a seguinte ordem de precedência:

1. Solicitação explícita atual do usuário.
2. Requisitos globais em `docs/specs/REQUIREMENTS-CATALOG.md`.
3. Decisões aceitas em `docs/adr/`.
4. `docs/specs/ROADMAP.md`, para fases, prioridades macro e dependências globais.
5. `docs/specs/frontend/ROADMAP.md`, para a ordem de implementação da camada frontend.
6. `docs/specs/backend/<numero>-<feature>/spec.md`, **somente leitura**, para domínio, dados, regras de negócio, segurança e contratos de API.
7. `docs/specs/frontend/<numero>-<feature>/spec.md`, para rotas, fluxos, validações, comportamento de interface e critérios de aceite de UI.
8. `DESIGN.md`, para tokens, componentes, padrões visuais, acessibilidade e interação do frontend.
9. `docs/specs/frontend/<numero>-<feature>/mockup.html`, para referência visual específica da feature.
10. Este `AGENTS.md`, para padrões técnicos, stack, arquitetura, qualidade e processo de implementação.

`docs/specs/OPEN-QUESTIONS.md` não substitui uma decisão aceita. É o registro de dúvidas e bloqueios: se uma questão aberta afetar a tarefa, interrompa a decisão correspondente, informe o bloqueio e solicite esclarecimento.

### Conflitos entre documentos

* Regras de negócio, integridade e segurança seguem a spec de backend e ADRs aceitos.
* O `DESIGN.md` é a diretriz visual e de interação global obrigatória para qualquer frontend.
* A spec de frontend define comportamento funcional da tela; o mockup define a referência visual específica; ambos devem obedecer ao `DESIGN.md`.
* Se mockup e `DESIGN.md` divergirem em tokens, componentes, cores, tipografia, espaçamento, responsividade, acessibilidade ou padrões de interação, siga o `DESIGN.md` e registre a divergência em `OPEN-QUESTIONS.md`.
* Se frontend e backend divergem em requisito funcional, não invente uma conciliação: registre em `OPEN-QUESTIONS.md` e solicite decisão.
* Uma solicitação atual do usuário pode alterar documentação e código, mas mudanças arquiteturais ou de design system recorrentes devem ser registradas em ADR ou atualizadas no `DESIGN.md`, conforme o caso.

***

## Fluxo SDD obrigatório do agente

Ao receber uma tarefa, siga esta sequência sem pular etapas:

1. Leia `docs/specs/ROADMAP.md` para fase, prioridade e dependências globais.
2. Leia `docs/specs/frontend/ROADMAP.md` para a ordem de implementação da camada frontend.
3. Identifique a próxima spec pendente que respeita ordem e dependências. Não pule dependência sem solicitação explícita.
4. Leia `docs/specs/REQUIREMENTS-CATALOG.md` e `docs/specs/OPEN-QUESTIONS.md`.
5. Leia a `spec.md` da feature frontend e a spec de backend correlata (**somente leitura**, para entender dados, permissões e contratos de API).
6. Leia obrigatoriamente `DESIGN.md` **antes** de analisar ou implementar qualquer tela.
7. Leia também o `mockup.html` correspondente antes de escrever componentes.
8. Leia ADRs pertinentes em `docs/adr/`, especialmente stack, autorização, dados, integrações e observabilidade.
9. Estabeleça um plano curto: objetivo, arquivos afetados, telas/componentes, services chamados, testes e dúvidas/riscos.
10. Implemente nos limites corretos da arquitetura, reutilizando padrões já existentes e respeitando a estrutura de diretórios deste documento.
11. Valide todos os critérios de aceite e execute lint, typecheck, testes e build.
12. Atualize roadmap, questões abertas ou documentação apenas se isso fizer parte do processo autorizado. Nunca marque spec como concluída sem validação completa.
13. Na entrega final, informe: o que mudou, componentes/telas implementados, testes executados e pendências conhecidas.

***

## Design system obrigatório

`DESIGN.md` define o design system oficial e obrigatório do projeto. Ele deve ser seguido em todas as telas, componentes e estados de interface novos ou alterados. O `@mpms/shared-ui` é a implementação concreta do design system.

### O agente deve consultar e aplicar

* Tokens de cor, tipografia, escala de espaçamento, elevação, bordas, raios e breakpoints.
* Componentes e variações aprovadas: botões, campos, tabelas, cards, modais, menus, toasts, badges, empty states e loading states.
* Hierarquia tipográfica e padrões de conteúdo.
* Regras de layout, grid, responsividade e densidade de informação.
* Estados de interação: default, hover, focus, ativo, selecionado, desabilitado, carregando, erro e sucesso.
* Diretrizes de acessibilidade: contraste, foco visível, semântica, navegação por teclado, labels, feedback e mensagens de erro.
* Padrões de confirmação para ações destrutivas e tratamento de estados vazios/erros.

### Regras de implementação visual

* Use `@mpms/shared-ui` como fonte preferencial de componentes visuais: `import { Button, DataTable } from '@mpms/shared-ui'`.
* Use PrimeReact diretamente quando não houver equivalente no `@mpms/shared-ui`.
* Use PrimeFlex como único sistema de estilização para layout e espaçamento.
* Reutilize componentes compartilhados antes de criar variações locais.
* Se um componente não existir no @mpms/shared-ui, crie com PrimeReact + PrimeFlex e documente como candidato ao DS.
* Não use cores, tamanhos, espaçamentos, sombras, fontes ou breakpoints arbitrários quando houver token/diretriz equivalente no `DESIGN.md`.
* Não crie componente visual novo sem verificar se já há componente, padrão ou variante definida no design system ou no `@mpms/shared-ui`.

***

## Regra obrigatória para mockups

O arquivo `mockup.html` em `docs/specs/frontend/<numero>-<feature>/` é referência visual obrigatória da feature, mas **não substitui o** **`DESIGN.md`**.

O agente deve extrair do mockup:

* Hierarquia de informações e estrutura do layout.
* Seções, agrupamentos, cabeçalhos, cards, tabelas, modais, filtros e ações disponíveis.
* Campos, rótulos, estados visuais e mensagens relevantes.
* Navegação e comportamento responsivo inferível.
* Prioridade visual, densidade de informação e intenção de experiência.

O agente não deve:

* Copiar HTML/CSS do mockup diretamente para produção.
* Tratar mockup como fonte de segurança, regras de domínio ou autorização.
* Ignorar tokens e padrões definidos no `DESIGN.md`.
* Introduzir biblioteca de UI diferente do padrão.
* Criar campos, botões, operações ou fluxos ausentes na spec e no mockup.
* Ignorar acessibilidade, responsividade, loading, vazio, erro e sem permissão.

A implementação final deve reproduzir a intenção do mockup usando React, `@mpms/shared-ui`, PrimeReact e PrimeFlex, obedecendo primeiro ao `DESIGN.md`, depois à spec de frontend e, por fim, aos detalhes específicos do mockup.

***

## Roadmaps e planejamento

Roadmaps devem permitir identificar objetivamente a próxima unidade válida de trabalho.

```md
# Roadmap — Frontend

- [x] 0001 — Autenticação
- [ ] 0002 — Dashboard
- [ ] 0003 — Cadastros

## Dependências
- 0002 depende de BE-0001 e BE-0002.
- 0003 depende de BE-0003.

## Regra de execução
Implementar na ordem apresentada, salvo dependência resolvida ou solicitação
explícita de alteração de prioridade.
```

* Considere `[x]` concluído e `[ ]` pendente, salvo convenção documentada diferente.
* Respeite dependências explícitas, mesmo que item posterior pareça mais simples.
* Um item só é concluído após critérios de aceite, testes e validações obrigatórias.
* Não altere prioridade, escopo ou sequência por conveniência de implementação.

### Metadados recomendados em specs

```md
---
id: FE-0003
titulo: Gestão de cadastros
status: ready
prioridade: alta
dependencias:
  - BE-0001
  - BE-0003
rotas:
  - /cadastros
permissoes:
  - cadastros.listar
  - cadastros.criar
  - cadastros.editar
  - cadastros.excluir
---
```

***

## ADRs: decisões arquiteturais

Mantenha `docs/adr/` como repositório de decisões técnicas relevantes e duradouras. ADR não substitui spec funcional: ele registra contexto, decisão, alternativas e consequências.

Crie ADR para decisões que impactem múltiplas features, segurança, custo, operação, manutenção ou evolução futura. Exemplos: uso de React/Next.js/@mpms/shared-ui, Keycloak como provedor de identidade, arquitetura por features e estrutura de services.

Não reescreva ADR aceito para mudar sua história. Se uma decisão for substituída, crie novo ADR referenciando o anterior.

***

## Tecnologias padronizadas

| Área               | Tecnologia                                             | Uso definido                                               |
| ------------------ | ------------------------------------------------------ | ---------------------------------------------------------- |
| Linguagem          | TypeScript com `strict: true`                          | Todo código de aplicação e funções                         |
| Build              | Next.js 16.x (App Router)                              | SSR/SSG/ISR, Server Components por padrão                  |
| UI                 | @mpms/shared-ui (preferencial) + PrimeReact (fallback) | Componentes visuais e design system                        |
| Layout             | PrimeFlex                                              | Único sistema de estilização — utilitários CSS             |
| Ícones             | PrimeIcons                                             | Iconografia padronizada                                    |
| Design system      | `DESIGN.md` + `@mpms/shared-ui`                        | Fonte obrigatória de tokens, padrões e componentes         |
| Roteamento         | Next.js App Router                                     | File-based routing, layouts aninhados, server components   |
| Autenticação       | next-auth + Keycloak                                   | Cookies HttpOnly, sessão server-side                       |
| Estado remoto      | Server State + Context API                             | Dados de API via `src/service/`, sem lib externa de estado |
| Formulários        | React Hook Form + Zod                                  | Form state e validação tipada                              |
| Integração backend | APIs internas MPMS                                     | Chamadas HTTP via `src/service/`                           |
| Testes unitários   | Jest                                                   | Regras puras, schemas, utilitários e hooks                 |
| Testes de UI       | React Testing Library                                  | Comportamento de componentes e páginas                     |
| Testes E2E         | Playwright                                             | Jornadas críticas                                          |
| Qualidade          | ESLint 9 + Prettier                                    | Flat config, padrão de código                              |
| CI/CD              | Azure DevOps                                           | Lint, testes, SAST, build, image e deploy                  |

***

## Arquitetura de Diretórios

```
src/
├── app/                → Rotas, layouts, pages (Server Components por padrão)
│   ├── (auth)/         → Rotas de autenticação (login)
│   ├── (portal)/       → Rotas autenticadas (dashboard, cadastros)
│   └── api/            → Route Handlers (next-auth, BFF)
├── components/         → Componentes React reutilizáveis
│   ├── layout/         → Header, Sidebar, Footer
│   ├── forms/          → Formulários com Zod
│   └── shared/         → Componentes compartilhados
├── hooks/              → Hooks customizados (usePessoaLogada, usePermissao)
├── service/            → Chamadas HTTP, Server Actions, contextos
│   └── actions/        → Server Actions
├── interfaces/         → Tipos e contratos TypeScript
└── enums/              → Enumerações constantes
docs/
├── specs/              → Documentação SDD (specs, roadmaps, mockups)
│   ├── backend/        → Specs de backend (somente leitura)
│   ├── frontend/       → Specs de frontend (propriedade deste agente)
│   ├── OPEN-QUESTIONS.md
│   ├── REQUIREMENTS-CATALOG.md
│   └── ROADMAP.md
├── adr/                → Decisões arquiteturais
└── DESIGN.md           → Design system obrigatório
```

**Regra:** **`src/components/`** **é o local para componentes reutilizáveis.** **`src/service/`** **centraliza toda lógica de acesso a dados e APIs. Não crie pastas como** **`features/`,** **`helpers/`** **ou** **`utils/`** **na raiz.**

***

## Regras Inquebráveis

### Componentes

* Server Components por PADRÃO. Usar `'use client'` APENAS para interatividade real (eventos, useState, useEffect).
* Componentes visuais de `@mpms/shared-ui` (preferencial) ou diretamente do `PrimeReact` quando não houver equivalente: `import { Button, DataTable } from '@mpms/shared-ui'`.
* Máximo 150 linhas por componente.
* NUNCA fetch inline em componentes de página — extrair para `src/service/`.
* Páginas compõem a tela e orquestram hooks; regras de domínio e acesso a dados ficam fora delas.
* Componentes de apresentação não acessam APIs diretamente.
* Não faça side effects durante renderização.
* Use `next/dynamic` para lazy loading de componentes pesados; o code splitting por rota é automático no App Router.

### Estilização

* APENAS PrimeFlex (classes utilitárias de layout e espaçamento).
* PROIBIDO: Tailwind CSS, style={{}}, CSS Modules, .css/.scss soltos, styled-components, !important.
* Se componente não existir no @mpms/shared-ui, criar com PrimeReact + PrimeFlex e documentar como candidato ao DS.

### Segurança

* Autenticação EXCLUSIVAMENTE via next-auth + Keycloak. NUNCA login próprio.
* Tokens NUNCA em localStorage/sessionStorage. Gerenciados por next-auth em cookies HttpOnly.
* Variáveis de ambiente cliente: prefixo `NEXT_PUBLIC_`. Segredos: apenas `process.env` (server-side).
* NUNCA `dangerouslySetInnerHTML` sem sanitização. NUNCA renderizar HTML de API sem escape.
* NUNCA expor mensagens de erro técnicas, stack traces, nomes de tabelas ou versões de framework na UI.
* NUNCA registrar em logs ou expor em código: CPF, senhas, tokens JWT, refresh tokens, chaves de API, IPs internos.
* Dados de PII devem ser mascarados (ex.: CPF como `***.***.***-XX`).
* Não exponha segredos, credenciais, tokens ou PII desnecessária em código, logs, testes ou arquivos versionados.

### Autorização

* Permissões via hook `usePermissao` que consulta o microsserviço `_git/permissionamento`.
* NUNCA hardcodar verificações de role no frontend.
* Verificar autorização em TODA operação, não apenas no login.
* Ações sem permissão podem ser ocultadas/desabilitadas para UX, mas a proteção real permanece no backend.

### TypeScript

* `@typescript-eslint/no-explicit-any`: error. NUNCA usar `any`.
* Todos os dados de API devem ter interface tipada em `src/interfaces/`.
* Path alias obrigatório. NUNCA usar `../../`.
  * `@/` para imports internos da aplicação (ex.: `@/service`, `@/components`, `@/hooks`, `@/interfaces`).
  * `@/shared/` para módulos internos do Design System `@mpms/shared-ui` (ex.: `@/shared/components/layout/BaseLayout`).
* Trailing comma obrigatório em multiline. Ponto e vírgula obrigatório.

### Imports (ordem)

1. React / Next.js
2. Bibliotecas externas
3. @mpms/shared-ui
4. @/service
5. @/components
6. @/hooks
7. @/interfaces e @/enums

***

## Convenções de código

| Item                  | Convenção                         | Exemplo                 |
| --------------------- | --------------------------------- | ----------------------- |
| Componentes e páginas | `PascalCase`                      | `UsuarioFormPage.tsx`   |
| Hooks                 | `use` + `PascalCase`              | `usePessoaLogada.ts`    |
| Services              | `<dominio>.service.ts`            | `usuarios.service.ts`   |
| Schemas               | `<entidade>.schema.ts`            | `usuario.schema.ts`     |
| Interfaces            | `<Entidade>.ts` ou `<dominio>.ts` | `Usuario.ts`            |
| Enums                 | `<Dominio>Enum.ts`                | `StatusProcessoEnum.ts` |
| Funções e variáveis   | `camelCase`                       | `atualizarUsuario`      |
| Constantes globais    | `UPPER_SNAKE_CASE`                | `DEFAULT_PAGE_SIZE`     |

* NUNCA usar path relativo `../../`. Use `@/` para todos os imports internos.
* Trailing comma obrigatório em objetos/arrays/interfaces multiline.
* Ponto e vírgula obrigatório ao final de statements.
* Use componentes funcionais, TypeScript e exports nomeados.

### Formulários, estado e dados

* Todo formulário usa React Hook Form e Zod; use `z.infer<typeof schema>` para tipos.
* Validações de formato ficam no Zod; regras autoritativas também existem no backend.
* Desabilite submit durante mutation pendente e impeça submissão duplicada.
* Dados remotos são encapsulados em `src/service/` com tipagem completa.
* Estado de UI usa Context API ou estado local (useState). Não usar Zustand, Redux ou MobX.
* Após operação de escrita, invalide ou atualize o estado apropriadamente; forneça feedback de sucesso/erro.
* Centralize `Toast`; mensagens devem ser claras e em português.
* Implemente loading, vazio, erro, sem permissão e sucesso em toda tela.

***

## Segurança e acesso a dados

### Comunicação com APIs

* Todas as chamadas a APIs internas do MPMS são encapsuladas em `src/service/`.
* Cada service exporta funções tipadas com os contratos definidos em `src/interfaces/`.
* Páginas e componentes NUNCA fazem fetch diretamente — usam os services ou hooks.
* Valide respostas de API com Zod antes de propagar para a UI.
* Selecione apenas os campos necessários nas requisições; evite `select *` ou equivalente.

### Autenticação e autorização

* Autenticação EXCLUSIVAMENTE via next-auth + provider Keycloak.
* Sessão e tokens gerenciados por next-auth em cookies HttpOnly — nunca em localStorage/sessionStorage.
* Hooks `usePessoaLogada` e `usePermissao` são a fonte de identidade e permissões na UI.
* Em logout, limpe cache sensível e estado local dependente do usuário.
* A UI pode ocultar/desabilitar ações para UX, mas a autorização real é server-side.

***

## Rotas, erros e observabilidade

* Use App Router com file-based routing; organize por route groups (`(auth)`, `(portal)`) para layouts públicos e autenticados.
* Implemente `middleware.ts` para guards de autenticação e redirecionamentos server-side (via next-auth).
* Declare metadados por página com `generateMetadata` ou o objeto `metadata` exportado.
* Implemente `not-found.tsx` (404), `error.tsx` (error boundary) e `loading.tsx` (skeleton/loading) globais e por segmento.
* Normalize erros de APIs internas e externas; NUNCA exponha erros técnicos ou stack traces na UI.
* Para ações críticas, implemente auditoria quando a spec exigir.

***

## Testes e definição de pronto

| Mudança                      | Cobertura mínima esperada                     |
| ---------------------------- | --------------------------------------------- |
| Função pura ou cálculo       | Teste unitário Jest                           |
| Schema Zod                   | Casos válidos, inválidos e limites relevantes |
| Componente com comportamento | React Testing Library                         |
| Service/hook novo            | Cenários de sucesso e erro mockados           |
| Jornada crítica              | Playwright E2E                                |

**Padrão de nomes de teste:** `deve [comportamento] quando [condição]`.
**Cobertura mínima:** 60% em hooks e services.
Testar comportamento visível ao usuário, não implementação.

### Checklist de pronto

* [ ] A implementação cobre os critérios de aceite da spec de frontend.
* [ ] Foram lidas a spec de backend correlata (somente leitura), o `DESIGN.md` e o mockup quando aplicável.
* [ ] Tipos estão corretos, sem `any`, supressões ou casts inseguros.
* [ ] A tela obedece tokens, componentes, padrões de interação, responsividade e acessibilidade definidos no `DESIGN.md`.
* [ ] Componentes visuais usam `@mpms/shared-ui` (preferencial) ou PrimeReact (fallback).
* [ ] Loading, vazio, erro, sem permissão e sucesso foram tratados.
* [ ] Escritas possuem feedback, prevenção de duplicidade e estado atualizado.
* [ ] Não há segredo, chave privilegiada ou PII desnecessária em código/logs.
* [ ] Lint, typecheck, testes e build passam.
* [ ] Não há alterações fora do escopo solicitado.
* [ ] Nenhum arquivo em `docs/specs/backend/` foi alterado.

***

## Configurações Críticas

* `.npmrc` aponta para Verdaccio interno (<https://verdaccio.mpms.mp.br/>)
* `next.config.ts` deve ter `transpilePackages: ['@mpms/shared-ui']` e `output: 'standalone'`
* `tsconfig.json` deve ter `strict: true` e os aliases `"@/*": ["./src/*"]` (app) e `"@/shared/*": ["./node_modules/@mpms/shared-ui/src/shared/*"]` (Design System)
* O resolvedor de imports usa os `paths` do `tsconfig.json` (lido nativamente pelo Next.js). NÃO redefinir o alias `@` manualmente em `webpack`/`turbopack`.
* CSS base (tema PrimeReact + PrimeFlex) importado uma única vez no `src/app/layout.tsx` via `@mpms/shared-ui/public/css/globals.css` e `@mpms/shared-ui/public/css/app.css`
* `eslint.config.mjs` (flat config do ESLint 9) com `@typescript-eslint/no-explicit-any: error`
* Headers de segurança obrigatórios no `next.config.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Strict-Transport-Security: max-age=31536000`
  - `Content-Security-Policy: default-src 'self'`

***

## Ambiente e configuração

* Versione somente `.env.example`, com nomes de variáveis e valores fictícios.
* Arquivos `.env*` reais devem estar no `.gitignore`.
* `.env.example` deve documentar TODAS as variáveis necessárias.
* Valide variáveis obrigatórias na inicialização da aplicação.
* Separe ambientes local, desenvolvimento, homologação e produção.
* Não reutilize dados produtivos localmente sem anonimização formal.

```dotenv
NEXT_PUBLIC_API_URL=https://api.hom.mpms.mp.br
NEXT_PUBLIC_KEYCLOAK_URL=https://auth.mpms.mp.br
NEXTAUTH_SECRET=<secret>
NEXTAUTH_URL=http://localhost:3000
```

***

## Git

* Branch: `feature/PID-XXX-descricao`, `bugfix/PID-XXX-descricao`, `hotfix/PID-XXX-descricao`
* Commit: `tipo(escopo): descricao imperativa` (feat, fix, refactor, docs, test, chore)
* NUNCA commitar .env, .env.local, ou node\_modules.
* `.env.example` deve documentar TODAS as variáveis necessárias.

***

## Proibições explícitas

* Não usar chaves secretas, tokens ou credenciais privilegiadas no frontend (Client Components ou Server Components expostos).
* Não usar bibliotecas de UI concorrentes ao @mpms/shared-ui e PrimeReact (MUI, Chakra, Ant, Radix, NextUI).
* Não usar Tailwind CSS, CSS Modules, SASS, styled-components, emotion ou style={{}} inline.
* Não usar Zustand, Redux ou MobX (Context API + estado local).
* Não usar qualquer lib de autenticação que não seja next-auth + Keycloak.
* Não fazer fetch inline em componentes de página — extrair para `src/service/`.
* Não usar `any`, `@ts-ignore` ou suprimir regras de lint globalmente.
* Não usar path relativo `../../` — sempre `@/`.
* Não expor erros técnicos ou stack traces na UI.
* Não armazenar tokens em localStorage/sessionStorage.
* Não usar `dangerouslySetInnerHTML` sem sanitização.
* Não renderizar HTML de API sem escape.
* Não commitar .env, .env.local ou node\_modules.
* Não ignorar spec, `DESIGN.md`, mockup, roadmap, ADR ou questão aberta relevante para acelerar implementação.
* Não ler, processar ou basear-se em arquivos `backlog.csv` dentro de `docs/specs/`.
* **Não criar, editar ou remover arquivos em** **`docs/specs/backend/`.**
* Não instalar pacotes npm públicos sem aprovação (registry é Verdaccio interno).
* NUNCA usar dependências com versão SNAPSHOT. Prefira versões LTS e mantidas.
* Sinalizar quando uma biblioteca sugerida tiver CVE conhecido.

***

## Critério de decisão rápido

| Pergunta                                                | Decisão                                                          |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| É leitura simples que pode ser resolvida no servidor?   | Server Component com fetch no service                            |
| É leitura/escrita interativa?                           | Client Component → `src/service/` via hook                       |
| É guarda de autenticação ou redirecionamento?           | `middleware.ts` + next-auth                                      |
| É verificação de permissão?                             | Hook `usePermissao` (microsserviço `_git/permissionamento`)      |
| Dados vêm de API?                                       | `src/service/` com tipagem em `src/interfaces/`                  |
| É estado efêmero de interface?                          | `useState` ou Context API, conforme alcance                      |
| É formulário?                                           | React Hook Form + Zod                                            |
| É componente visual?                                    | `@mpms/shared-ui` (preferencial) ou PrimeReact                   |
| É componente reutilizável sem domínio?                  | `src/components/shared/`                                         |
| É específico de domínio?                                | `src/components/` (layout/forms) + `src/hooks/` + `src/service/` |
| Precisa entender dados, permissões ou contratos de API? | Ler `docs/specs/backend/` (somente leitura)                      |
| Há trabalho de frontend?                                | Ler `DESIGN.md` obrigatoriamente antes de implementar            |
| Há mockup para a feature?                               | Ler e reproduzir a intenção visual obedecendo ao `DESIGN.md`     |
| Há dúvida aberta que muda negócio ou segurança?         | Consultar/registrar `OPEN-QUESTIONS.md` e solicitar decisão      |

***

## Anti-Alucinação

Se faltar contexto sobre:

* Quais componentes existem no @mpms/shared-ui
* Formato de resposta de APIs internas
* Permissões ou roles do Keycloak
* Regras de negócio do formulário

**PARE e pergunte.** Nunca presuma padrões genéricos da web.

***

## Regra final

Quando houver conflito entre velocidade e segurança/consistência, escolha segurança e consistência. Quando houver conflito visual entre um mockup e o design system, escolha o `DESIGN.md` e registre a divergência. Quando uma decisão estiver ausente das specs, ADRs, `DESIGN.md` e deste arquivo, não assuma silenciosamente: documente a hipótese, adote a alternativa mais conservadora e solicite validação antes de introduzir comportamento novo. **Nunca altere arquivos em** **`docs/specs/backend/`** **— eles pertencem ao agente de backend.**
