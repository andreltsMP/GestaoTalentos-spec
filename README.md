# Specs e Mockups a partir de Requisitos

Este repositório usa **Specification-Driven Development (SDD)** para transformar documentos de requisitos em specs rastreáveis de frontend e backend, além de mockups HTML conceituais das funcionalidades de frontend.

O detalhamento das regras operacionais está em [`AGENTS.md`](AGENTS.md).
As diretrizes visuais e tokens de interface estão documentados em [`DESIGN.md`](DESIGN.MD).

## O que o agente produz

* Catálogo de requisitos, com fontes e rastreabilidade.
* Specs de frontend, focadas em jornadas, telas, estados e critérios de aceite de interface.
* Specs de backend, focadas em regras de negócio, dados, segurança, integrações e operações.
* Roadmaps e questões em aberto.
* Mockups HTML das funcionalidades de frontend em conformidade com o Design System.
* Backlog de atividades humanas (`project-backlog/backlog.csv`) para importação no Azure DevOps, com as ações humanas necessárias para orientar, desbloquear e validar a futura geração de código.

## Estrutura

```text
/
├── AGENTS.md
├── DESIGN.md
├── requirements/
│   ├── main_requirements.md
│   ├── template_webdesign.html
│   └── artifacts/
├── specs/
│   ├── REQUIREMENTS-CATALOG.md
│   ├── OPEN-QUESTIONS.md
│   ├── ROADMAP.md
│   ├── frontend/
│   │   └── 0001-nome-da-funcionalidade/
│   │       ├── spec.md
│   │       └── mockup.html
│   └── backend/
│       └── 0001-nome-da-funcionalidade/
│           └── spec.md
├── mockups/
│   └── 0001-nome-da-funcionalidade_mockup.html
└── project-backlog/
    ├── backlog.csv
    └── team.md
```

## Fontes e precedência

`requirements/main_requirements.md` é a fonte principal e mandatória de requisitos de negócio. Os documentos em `requirements/artifacts/` complementam os requisitos; conflitos ou lacunas devem ser registrados em `specs/OPEN-QUESTIONS.md`.

Para o desenvolvimento visual das mockups:

* `DESIGN.md` é o guia normativo do Design System (tokens de cores, tipografia Montserrat, elevação *near-flat*, componentes canônicos e utilitários PrimeFlex).
* `requirements/template_webdesign.html` é o template obrigatório de referência para a estrutura de layout e casca (*shell*) da aplicação. Ele não define regras de negócio e não deve ser alterado.

## Navegação rápida

| Item                                   | Finalidade                                                            |
| -------------------------------------- | --------------------------------------------------------------------- |
| [`AGENTS.md`](AGENTS.md)               | Regras completas para o agente                                        |
| [`DESIGN.md`](DESIGN.MD)               | Guia oficial do Design System (tokens, cores, tipografia e PrimeFlex) |
| `requirements/main_requirements.md`    | Requisitos mandatórios                                                |
| `requirements/artifacts/`              | Documentos de apoio                                                   |
| `requirements/template_webdesign.html` | Template base de layout das mockups                                   |
| `specs/REQUIREMENTS-CATALOG.md`        | Catálogo rastreável de requisitos                                     |
| `specs/OPEN-QUESTIONS.md`              | Dúvidas, conflitos e decisões                                         |
| `specs/ROADMAP.md`                     | Planejamento global das funcionalidades                               |
| `mockups/`                             | Mockups HTML consolidadas                                             |
| `project-backlog/backlog.csv`          | Backlog de atividades humanas para importação no Azure DevOps         |
| `project-backlog/team.md`              | Cadastro da equipe e papéis para atribuição automática nas tarefas    |

## Prompt de início (exemplos)

### Modo de planejamento

```text
Efetue analise de todos os requisitos e artefatos disponíveis no projeto e me traga o plano para geração das specs.
```

### Modo de execução

```text
Analise todos os requisitos e artefatos disponíveis no projeto e crie todas as specs.
```
