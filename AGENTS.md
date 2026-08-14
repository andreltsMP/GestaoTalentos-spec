# AGENTS.md — Geração de Specs de Frontend e Backend a partir de Requisitos

## 1. Objetivo do repositório

Este repositório utiliza Specification-Driven Development (SDD).

Nesta etapa, a responsabilidade do agente é analisar os requisitos e os
artefatos de apoio presentes em `requirements/` para criar especificações
estruturadas, rastreáveis, verificáveis e separadas por contexto de implementação
em `specs/frontend/` e `specs/backend/`.

O agente deve produzir especificações para orientar futuramente os projetos de
frontend e backend. Ele não deve implementar código, criar banco de dados, criar
APIs, configurar infraestrutura ou modificar sistemas externos nesta etapa.

Seu escopo é exclusivamente:

1. Consumir os documentos de requisitos.
2. Identificar regras, restrições, dependências e lacunas.
3. Catalogar os requisitos extraídos.
4. Gerar specs de frontend e backend.
5. Manter rastreabilidade entre requisitos, artefatos e specs.
6. Registrar dúvidas, conflitos e decisões pendentes.

---

## 2. Estrutura de diretórios

```text
/
├── AGENTS.md
├── requirements/
│   ├── main_requirements.md
│   └── artifacts/
│       ├── regras-de-negocio.md
│       ├── normas-e-politicas.pdf
│       ├── levantamento-processos.docx
│       ├── ata-reuniao.md
│       └── ...
└── specs/
    ├── REQUIREMENTS-CATALOG.md
    ├── OPEN-QUESTIONS.md
    ├── ROADMAP.md
    ├── frontend/
    │   ├── ROADMAP.md
    │   ├── 0001-nome-da-funcionalidade/
    │   │   └── spec.md
    │   └── ...
    └── backend/
        ├── ROADMAP.md
        ├── 0001-nome-da-funcionalidade/
        │   └── spec.md
        └── ...
```

---

## 3. Responsabilidade de cada diretório

### `requirements/`

Contém a fonte documental utilizada para criação das specs.

A pasta possui dois níveis de prioridade:

```text
requirements/
├── main_requirements.md
└── artifacts/
```

### `requirements/main_requirements.md`

Este é o documento principal e mandatório do projeto.

Ele contém os requisitos prioritários que devem ser considerados obrigatórios
durante a criação das specs, salvo quando existir uma alteração formal,
documentada e aprovada.

O agente deve sempre ler este arquivo antes de analisar qualquer artefato
localizado em `requirements/artifacts/`.

As informações presentes em `main_requirements.md` possuem precedência sobre
informações encontradas em documentos auxiliares.

### `requirements/artifacts/`

Contém documentos de apoio ao levantamento e detalhamento dos requisitos.

Podem existir documentos em Markdown, TXT, PDF, DOCX, planilhas, atas de reunião,
regras de negócio, protótipos, descrições de processos, políticas, normas,
manuais, e-mails exportados ou outros materiais relevantes.

Esses arquivos servem para:

- Detalhar requisitos presentes em `main_requirements.md`.
- Identificar regras de negócio.
- Identificar exceções e cenários alternativos.
- Identificar restrições funcionais e não funcionais.
- Identificar requisitos de segurança, privacidade e auditoria.
- Identificar integrações e entidades de negócio.
- Identificar dúvidas, dependências e conflitos.

Documentos em `requirements/artifacts/` não podem reduzir, remover ou contradizer
silenciosamente um requisito mandatório presente em `main_requirements.md`.

Quando houver conflito, o agente deve registrar a situação em
`specs/OPEN-QUESTIONS.md`.

### `specs/`

Contém as especificações produzidas pelo agente a partir dos documentos de
`requirements/`.

As specs são organizadas por contexto de implementação:

```text
specs/
├── frontend/
└── backend/
```

A separação não significa que frontend e backend possuem requisitos de negócio
diferentes. Ambos devem derivar dos mesmos requisitos de origem, mas cada contexto
deve registrar somente os comportamentos, responsabilidades e critérios de aceite
que são aplicáveis à sua camada.

### `specs/frontend/`

Contém specs orientadas à experiência, fluxo e interface do usuário.

As specs de frontend podem conter:

- Telas e jornadas de usuário.
- Componentes e comportamentos de interface.
- Estados de carregamento, vazio, erro e sucesso.
- Validações de entrada realizadas na interface.
- Exibição e tratamento de mensagens.
- Regras de apresentação.
- Acessibilidade.
- Responsividade.
- Navegação.
- Interações com APIs já previstas pelos requisitos.
- Critérios de aceite verificáveis pela interface.

As specs de frontend não devem definir:

- Modelo físico de banco de dados.
- Estrutura interna de serviços.
- Estratégias de persistência.
- Tecnologias de backend.
- Regras de autorização implementadas exclusivamente no servidor.
- Decisões de infraestrutura.

### `specs/backend/`

Contém specs orientadas a capacidades de servidor, regras de negócio, dados,
segurança, integrações e contratos.

As specs de backend podem conter:

- Serviços e capacidades de negócio.
- Regras de negócio aplicadas no servidor.
- Autenticação e autorização.
- Operações, comandos e consultas.
- Contratos de API em nível funcional.
- Entidades e dados necessários ao domínio.
- Integrações com sistemas externos.
- Auditoria, logs e rastreabilidade.
- Requisitos de segurança e privacidade.
- Critérios de aceite verificáveis por serviços, APIs ou integrações.

As specs de backend não devem definir:

- Componentes visuais.
- Layouts.
- Design visual.
- Estratégias específicas de navegação de interface.
- Detalhes de experiência visual que não afetem uma regra de negócio.

---

## 4. Hierarquia de fontes de verdade

A prioridade das fontes deve obedecer à seguinte ordem:

1. `requirements/main_requirements.md`
2. Documentos em `requirements/artifacts/`
3. Decisões humanas formalmente registradas em `specs/OPEN-QUESTIONS.md`
4. `specs/REQUIREMENTS-CATALOG.md`
5. Specs já criadas em `specs/frontend/` e `specs/backend/`
6. Roadmaps em `specs/`

### Regras de precedência

- `main_requirements.md` contém requisitos mandatórios.
- Artefatos complementam, detalham ou contextualizam os requisitos principais.
- Nenhum artefato pode invalidar requisito mandatório sem decisão humana explícita.
- Nenhuma spec pode alterar um requisito de origem sem registrar a origem e a
  decisão que justifica a alteração.
- Quando documentos apresentarem conflito, o agente deve registrar a dúvida,
  impacto e origem, sem escolher uma interpretação de forma silenciosa.
- Quando uma decisão humana resolver uma dúvida, ela deve ser mantida no histórico
  de `specs/OPEN-QUESTIONS.md`.

---

## 5. Regras obrigatórias

### 5.1 Preservação dos documentos de origem

- Nunca alterar, renomear, mover ou excluir arquivos em `requirements/`.
- Nunca alterar `requirements/main_requirements.md`.
- Nunca alterar, renomear, mover ou excluir arquivos em `requirements/artifacts/`.
- Nunca resumir ou reescrever um documento de origem no próprio arquivo.
- Nunca assumir que um artefato mais recente invalida automaticamente outro.
- Sempre informar o arquivo, seção, página, item, título ou trecho utilizado
  como fonte, quando essa informação estiver disponível.
- Sempre registrar se um requisito foi extraído de `main_requirements.md` ou de
  um documento complementar em `requirements/artifacts/`.

### 5.2 Obrigatoriedade do `main_requirements.md`

Antes de criar, alterar, dividir ou descontinuar uma spec, o agente deve:

1. Ler integralmente `requirements/main_requirements.md`.
2. Identificar todos os requisitos mandatórios relacionados à funcionalidade.
3. Garantir que a spec cubra os requisitos mandatórios aplicáveis.
4. Verificar se os artefatos complementares adicionam regras, restrições ou
   exceções para aqueles requisitos.
5. Registrar requisitos mandatórios no catálogo com indicação explícita de origem.
6. Nunca colocar um requisito mandatório em “fora de escopo” sem decisão humana
   formal registrada.

### 5.3 Não inventar requisitos

O agente pode:

- Extrair requisitos explícitos.
- Normalizar e reescrever requisitos para melhorar clareza.
- Classificar requisitos por tipo.
- Identificar dependências.
- Identificar inconsistências.
- Separar requisitos em specs coesas.
- Derivar critérios de aceite diretamente do comportamento solicitado.
- Identificar impactos distintos em frontend e backend.
- Formular perguntas objetivas para eliminar ambiguidades.

O agente não pode:

- Inventar regras de negócio ausentes.
- Assumir perfis, permissões ou políticas de acesso não documentadas.
- Definir limites de desempenho sem fonte explícita.
- Criar prazos, SLAs ou metas de disponibilidade não documentadas.
- Escolher tecnologias, frameworks, bancos de dados ou fornecedores.
- Criar decisões de arquitetura.
- Definir contratos técnicos completos de API sem base documental.
- Interpretar desejo, hipótese ou sugestão como requisito aprovado.
- Marcar uma dúvida crítica como resolvida sem decisão humana documentada.

### 5.4 Tratamento de incerteza

Quando uma informação não estiver clara, o agente deve:

1. Registrar a informação disponível.
2. Informar a fonte e a referência precisa.
3. Explicar a ambiguidade, lacuna ou conflito.
4. Informar o impacto sobre frontend, backend ou ambos.
5. Criar uma pergunta objetiva em `specs/OPEN-QUESTIONS.md`.
6. Indicar a spec afetada.
7. Manter a spec como `Draft` ou `Blocked` quando a dúvida for crítica.

Nunca preencher lacunas de negócio, segurança, dados, privacidade, autorização ou
integração com suposições silenciosas.

---

## 6. Fluxo obrigatório para criação de specs

### Etapa 1 — Leitura obrigatória dos requisitos principais

Antes de qualquer análise, o agente deve ler:

```text
requirements/main_requirements.md
```

O agente deve identificar:

- Objetivos principais.
- Requisitos mandatórios.
- Escopo explícito.
- Não escopo explícito.
- Atores envolvidos.
- Regras de negócio declaradas.
- Critérios de aceite existentes.
- Integrações mencionadas.
- Restrições.
- Dependências.
- Pontos que exigem detalhamento nos artefatos.

### Etapa 2 — Inventário dos artefatos complementares

O agente deve listar e analisar os arquivos existentes em:

```text
requirements/artifacts/
```

Para cada arquivo relevante, identificar quando possível:

- Nome do documento.
- Tipo documental.
- Data.
- Versão.
- Autor ou área responsável.
- Assunto principal.
- Relação com requisitos mandatórios.
- Potenciais conflitos com outros documentos.

### Etapa 3 — Extração e classificação

O agente deve extrair e classificar informações como:

- Requisitos funcionais.
- Requisitos não funcionais.
- Regras de negócio.
- Requisitos de frontend.
- Requisitos de backend.
- Requisitos compartilhados entre frontend e backend.
- Requisitos de segurança.
- Requisitos de privacidade ou proteção de dados.
- Requisitos de integração.
- Requisitos de dados.
- Requisitos de auditoria.
- Restrições.
- Premissas.
- Dependências.
- Critérios de aceite.
- Questões em aberto.

Cada requisito extraído deve possuir um identificador estável.

### Etapa 4 — Normalização e catálogo

O agente deve criar ou atualizar:

```text
specs/REQUIREMENTS-CATALOG.md
```

Cada requisito deve informar:

- Identificador estável.
- Tipo.
- Descrição normalizada.
- Prioridade de origem.
- Fonte.
- Referência no documento.
- Contexto aplicável: frontend, backend ou ambos.
- Status.
- Specs relacionadas.

### Etapa 5 — Decomposição por funcionalidade e contexto

O agente deve agrupar os requisitos em funcionalidades coesas.

Para cada funcionalidade, o agente deve avaliar a necessidade de gerar:

- Uma spec somente de frontend.
- Uma spec somente de backend.
- Uma spec de frontend e uma spec de backend com o mesmo identificador.
- Nenhuma spec em determinado contexto, quando os requisitos não forem aplicáveis.

Exemplo:

```text
Requisito: “Usuário deve consultar suas notificações e marcá-las como lidas.”

Frontend:
- Criar listagem de notificações.
- Exibir estados de carregamento, vazio e erro.
- Permitir interação para marcar como lida.
- Exibir indicador de não lidas.

Backend:
- Disponibilizar consulta de notificações do usuário autenticado.
- Garantir que o usuário acesse apenas suas próprias notificações.
- Registrar a marcação como lida.
- Garantir idempotência da operação.
- Registrar auditoria ou logs, quando aplicável.
```

### Etapa 6 — Criação das specs

As specs devem seguir esta estrutura:

```text
specs/
├── frontend/
│   └── 0001-nome-da-funcionalidade/
│       └── spec.md
└── backend/
    └── 0001-nome-da-funcionalidade/
        └── spec.md
```

O identificador de uma funcionalidade deve ser o mesmo nos dois contextos quando
ambas as specs representarem a mesma capacidade de negócio.

Exemplo:

```text
specs/frontend/0003-central-de-notificacoes/spec.md
specs/backend/0003-central-de-notificacoes/spec.md
```

A numeração deve:

- Possuir quatro dígitos.
- Ser sequencial.
- Nunca ser reutilizada.
- Ser mantida mesmo se a spec for cancelada ou substituída.
- Ser compartilhada por frontend e backend quando ambos implementarem a mesma
  funcionalidade de negócio.

### Etapa 7 — Atualização dos roadmaps

Após criar ou atualizar specs, o agente deve atualizar:

```text
specs/ROADMAP.md
specs/frontend/ROADMAP.md
specs/backend/ROADMAP.md
```

O roadmap global deve registrar a funcionalidade e os contextos afetados.

Os roadmaps de frontend e backend devem registrar a ordem específica de elaboração
das specs daquele contexto.

---

## 7. Estados permitidos para specs

- `Draft`: spec em elaboração ou com lacunas relevantes.
- `Review Required`: spec elaborada e aguardando revisão humana.
- `Approved`: spec revisada e aprovada para planejamento ou implementação.
- `Blocked`: spec possui impedimento, conflito ou dependência não resolvida.
- `Deprecated`: spec foi cancelada, substituída ou deixou de ser aplicável.

O agente não deve alterar uma spec para `Approved` sem instrução explícita de
aprovação humana ou mecanismo formal definido pelo projeto.

---

## 8. Modelo obrigatório de catálogo

Arquivo: `specs/REQUIREMENTS-CATALOG.md`

```md
# Catálogo de requisitos

## Fontes analisadas

| ID | Arquivo | Origem | Tipo | Data/versão | Prioridade | Observação |
|---|---|---|---|---|---|---|
| SRC-MAIN-001 | `requirements/main_requirements.md` | Principal | Requisitos mandatórios | 2026-08-13 | Mandatória | Fonte principal |
| SRC-ART-001 | `requirements/artifacts/regras-de-negocio.md` | Artefato | Regras de negócio | 2026-08-12 | Complementar | Detalha fluxo |
| SRC-ART-002 | `requirements/artifacts/ata-reuniao.md` | Artefato | Ata de reunião | 2026-08-12 | Complementar | Possui decisões pendentes |

## Requisitos catalogados

| ID | Tipo | Descrição normalizada | Contexto | Fonte | Referência | Prioridade | Status | Specs relacionadas |
|---|---|---|---|---|---|---|---|---|
| REQ-FUNC-001 | Funcional | O usuário deve consultar suas solicitações | Ambos | SRC-MAIN-001 | Seção 3.1 | Mandatória | Extraído | FE-0001, BE-0001 |
| REQ-FUNC-002 | Funcional | O usuário deve criar uma solicitação | Ambos | SRC-MAIN-001 | Seção 3.2 | Mandatória | Extraído | FE-0001, BE-0001 |
| REQ-RN-001 | Regra de negócio | Toda solicitação deve possuir responsável definido | Backend | SRC-ART-001 | Item 4.2 | Complementar | Em análise | BE-0001 |
| REQ-SEC-001 | Segurança | Usuário só pode consultar solicitações permitidas | Backend | SRC-ART-002 | Item 8 | Complementar | Em análise | BE-0001 |
| REQ-UI-001 | Interface | A listagem deve apresentar situação da solicitação | Frontend | SRC-ART-001 | Item 5.1 | Complementar | Extraído | FE-0001 |
```

### Prefixos permitidos

- `REQ-FUNC-XXX`: requisito funcional.
- `REQ-RNF-XXX`: requisito não funcional.
- `REQ-RN-XXX`: regra de negócio.
- `REQ-UI-XXX`: requisito específico de interface.
- `REQ-SEC-XXX`: requisito de segurança.
- `REQ-PRIV-XXX`: requisito de privacidade ou LGPD.
- `REQ-INT-XXX`: requisito de integração.
- `REQ-DATA-XXX`: requisito de dados.
- `REQ-AUD-XXX`: requisito de auditoria.
- `REQ-RES-XXX`: restrição.
- `REQ-PREM-XXX`: premissa.

### Status permitidos para requisitos

- `Extraído`: identificado em documento de origem, sem revisão.
- `Em análise`: precisa de classificação, detalhamento ou confirmação.
- `Validado`: confirmado por responsável humano.
- `Rejeitado`: não será atendido, com justificativa documentada.
- `Substituído`: foi substituído por outro requisito.
- `Coberto por spec`: está coberto por ao menos uma spec.
- `Implementado`: reservado para uma futura fase de desenvolvimento.

---

## 9. Modelo obrigatório de dúvidas

Arquivo: `specs/OPEN-QUESTIONS.md`

```md
# Questões em aberto

## Regras

- Não ocultar dúvidas dentro de specs.
- Formular perguntas objetivas.
- Informar fonte, referência e impacto.
- Informar se a questão afeta frontend, backend ou ambos.
- Dúvidas críticas impedem a aprovação da spec.
- Após resposta humana, manter a decisão no histórico.

| ID | Pergunta | Fonte e contexto | Impacto | Contexto afetado | Specs | Criticidade | Status |
|---|---|---|---|---|---|---|---|
| Q-001 | Quais perfis podem consultar solicitações? | SRC-ART-002, item 8 menciona “usuários autorizados”, sem detalhar os perfis | Segurança e autorização | Backend | BE-0001 | Alta | Aberta |
| Q-002 | A situação da solicitação deve ser atualizada sem recarregar a página? | Não identificado nas fontes | Experiência de usuário | Frontend | FE-0001 | Média | Aberta |
| Q-003 | Qual é o prazo de retenção das solicitações? | Não identificado nos documentos | Dados e privacidade | Backend | BE-0001 | Alta | Aberta |

## Decisões respondidas

| ID | Resposta | Responsável | Data | Impacto |
|---|---|---|---|---|
| Q-004 | Apenas administradores podem cancelar solicitações | Área de negócio | 2026-08-13 | Atualizar BE-0001 e FE-0001 |
```

---

## 10. Modelo obrigatório de roadmap global

Arquivo: `specs/ROADMAP.md`

```md
# Roadmap global de especificações

## Regras

- Este arquivo controla a ordem macro de elaboração das funcionalidades.
- O mesmo identificador pode possuir uma spec de frontend e uma spec de backend.
- A ausência de spec em um dos contextos deve ser justificada.
- Specs com dúvida crítica aberta devem permanecer em `Draft` ou `Blocked`.
- O agente deve atualizar este arquivo ao criar, dividir, unir ou descontinuar specs.

## Checkpoint de geração de specs

- Última atualização: 2026-08-13
- Fonte principal analisada: `requirements/main_requirements.md`
- Artefato atual em análise: `requirements/artifacts/regras-de-negocio.md`
- Funcionalidade ativa: `0002-central-de-notificacoes`
- Última ação concluída: requisitos mandatórios catalogados
- Próxima ação: gerar specs de frontend e backend para a funcionalidade 0002
- Bloqueios: confirmar se notificações por e-mail pertencem à primeira entrega

## Funcionalidades ordenadas

| Ordem | ID | Funcionalidade | Contextos | Status | Prioridade | Dependências | Fontes | Questões abertas |
|---:|---|---|---|---|---|---|---|---|
| 1 | 0001 | Gestão de solicitações | Frontend, Backend | Review Required | Alta | — | SRC-MAIN-001, SRC-ART-001 | Q-001, Q-002 |
| 2 | 0002 | Central de notificações | Frontend, Backend | Draft | Média | 0001 | SRC-MAIN-001, SRC-ART-002 | Q-003 |
```

---

## 11. Modelo de roadmap de frontend

Arquivo: `specs/frontend/ROADMAP.md`

```md
# Roadmap de specs — Frontend

| Ordem | ID | Funcionalidade | Status | Dependência funcional | Fonte principal | Próxima ação |
|---:|---|---|---|---|---|---|
| 1 | 0001 | Gestão de solicitações | Review Required | — | SRC-MAIN-001 | Revisar fluxos e estados de interface |
| 2 | 0002 | Central de notificações | Draft | 0001 | SRC-MAIN-001 | Criar spec de interface |
```

---

## 12. Modelo de roadmap de backend

Arquivo: `specs/backend/ROADMAP.md`

```md
# Roadmap de specs — Backend

| Ordem | ID | Funcionalidade | Status | Dependência funcional | Fonte principal | Próxima ação |
|---:|---|---|---|---|---|---|
| 1 | 0001 | Gestão de solicitações | Review Required | — | SRC-MAIN-001 | Revisar regras, dados e segurança |
| 2 | 0002 | Central de notificações | Draft | 0001 | SRC-MAIN-001 | Criar spec de serviços e operações |
```

---

## 13. Modelo obrigatório de spec de frontend

Arquivo:

```text
specs/frontend/000X-nome-da-funcionalidade/spec.md
```

```md
# Spec Frontend — [nome da funcionalidade]

## Metadados

- ID funcional: 000X
- Contexto: Frontend
- Status: Draft
- Criado em:
- Última atualização:
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares:
- Spec backend relacionada: `specs/backend/000X-nome-da-funcionalidade/spec.md`
- Questões em aberto:
- Responsável pela revisão:

## Resumo

[Resumo da experiência e dos comportamentos esperados para o usuário.]

## Objetivo de interface

[Resultado que o usuário deve conseguir alcançar por meio da interface.]

## Escopo incluído

- [Telas, fluxos, ações, exibições e interações previstas.]

## Escopo não incluído

- [Itens explicitamente fora de escopo.]
- [Itens tratados apenas no backend.]
- [Evoluções futuras ou dependentes de decisão.]

## Atores e permissões percebidas

| Ator | Ação na interface | Origem |
|---|---|---|
| [Ator] | [Ação permitida ou visualização esperada] | REQ-FUNC-XXX |

## Fluxos de usuário

### Fluxo principal: [nome]

1. [Ação do usuário.]
2. [Comportamento esperado da interface.]
3. [Resultado visível ao usuário.]

### Fluxo alternativo: [nome]

1. [Condição alternativa.]
2. [Comportamento esperado.]

### Fluxo de erro: [nome]

1. [Erro ou resposta inesperada.]
2. [Mensagem e comportamento esperado da interface.]

## Requisitos de interface

| ID | Requisito | Origem |
|---|---|---|
| UI-001 | [Comportamento de tela ou componente] | REQ-UI-XXX |
| UI-002 | [Ação possível para o usuário] | REQ-FUNC-XXX |

## Estados de interface

| Estado | Comportamento esperado | Origem |
|---|---|---|
| Carregando | [Feedback enquanto dados são carregados] | REQ-FUNC-XXX |
| Vazio | [Mensagem e ação possível sem dados] | REQ-FUNC-XXX |
| Erro | [Mensagem, recuperação e comportamento] | REQ-RNF-XXX |
| Sucesso | [Feedback após operação concluída] | REQ-FUNC-XXX |
| Sem permissão | [Comportamento para acesso negado] | REQ-SEC-XXX |

## Acessibilidade e apresentação

| ID | Requisito | Origem |
|---|---|---|
| A11Y-001 | [Requisito de acessibilidade documentado] | REQ-RNF-XXX |
| UI-003 | [Requisito de responsividade ou apresentação] | REQ-UI-XXX |

## Dependências de backend

| Necessidade | Finalidade no frontend | Origem | Status |
|---|---|---|---|
| [Consulta ou operação necessária] | [Uso na interface] | REQ-FUNC-XXX | Pendente de spec backend |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | [Usuário consegue realizar o fluxo principal] | UI-001, REQ-FUNC-XXX |
| CA-FE-002 | [Interface apresenta estado vazio corretamente] | REQ-FUNC-XXX |
| CA-FE-003 | [Interface trata falha de acesso adequadamente] | REQ-SEC-XXX |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-XXX | [Pergunta] | [Impacto] | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| UI-001 | REQ-UI-001 | SRC-ART-001, item 5.1 |
| CA-FE-001 | REQ-FUNC-001 | SRC-MAIN-001, seção 3.1 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-13 | Criação inicial | Extração de requisitos de origem | Agente |
```

---

## 14. Modelo obrigatório de spec de backend

Arquivo:

```text
specs/backend/000X-nome-da-funcionalidade/spec.md
```

```md
# Spec Backend — [nome da funcionalidade]

## Metadados

- ID funcional: 000X
- Contexto: Backend
- Status: Draft
- Criado em:
- Última atualização:
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares:
- Spec frontend relacionada: `specs/frontend/000X-nome-da-funcionalidade/spec.md`
- Questões em aberto:
- Responsável pela revisão:

## Resumo

[Resumo das capacidades de negócio e responsabilidades de servidor.]

## Objetivo de backend

[Resultado que os serviços, dados, integrações e regras de negócio devem garantir.]

## Escopo incluído

- [Operações, regras, consultas, comandos, dados e integrações previstas.]

## Escopo não incluído

- [Itens fora do escopo.]
- [Comportamentos exclusivos da interface.]
- [Evoluções futuras ou dependentes de decisão.]

## Capacidades de negócio

| ID | Capacidade | Origem |
|---|---|---|
| CAP-001 | [Ação ou capacidade provida pelo sistema] | REQ-FUNC-XXX |

## Requisitos funcionais

| ID | Requisito | Origem |
|---|---|---|
| RF-001 | [Comportamento esperado do sistema] | REQ-FUNC-XXX |

## Regras de negócio

| ID | Regra | Origem |
|---|---|---|
| RN-001 | [Regra aplicada pelo servidor] | REQ-RN-XXX |

## Segurança, privacidade e auditoria

| ID | Requisito | Origem |
|---|---|---|
| SEC-001 | [Regra de autenticação ou autorização] | REQ-SEC-XXX |
| PRIV-001 | [Requisito de dados pessoais ou retenção] | REQ-PRIV-XXX |
| AUD-001 | [Requisito de auditoria] | REQ-AUD-XXX |

## Dados e integrações

### Dados relevantes

| ID | Entidade ou dado | Necessidade de negócio | Origem |
|---|---|---|---|
| DATA-001 | [Entidade] | [Finalidade] | REQ-DATA-XXX |

### Integrações

| ID | Sistema ou serviço | Necessidade | Origem |
|---|---|---|---|
| INT-001 | [Integração] | [Troca necessária] | REQ-INT-XXX |

## Operações esperadas

| ID | Operação | Resultado esperado | Origem |
|---|---|---|---|
| OP-001 | [Consulta, comando ou processo] | [Resultado] | REQ-FUNC-XXX |

## Requisitos não funcionais

| ID | Requisito | Origem |
|---|---|---|
| RNF-001 | [Desempenho, confiabilidade ou disponibilidade] | REQ-RNF-XXX |
| RNF-002 | [Auditoria, observabilidade ou rastreabilidade] | REQ-AUD-XXX |

## Critérios de aceite de backend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-BE-001 | [Operação atende à regra de negócio] | RF-001, RN-001 |
| CA-BE-002 | [Acesso indevido é bloqueado] | SEC-001 |
| CA-BE-003 | [Dados ou eventos são registrados conforme exigência] | AUD-001 |
| CA-BE-004 | [Integração entrega ou recebe os dados exigidos] | INT-001 |

## Dependências

| Tipo | Dependência | Impacto | Situação |
|---|---|---|---|
| Funcionalidade | [Outra spec] | [Motivo] | [Status] |
| Negócio | [Decisão pendente] | [Motivo] | [Status] |
| Integração | [Sistema externo] | [Motivo] | [Status] |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-XXX | [Pergunta] | [Impacto] | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| RF-001 | REQ-FUNC-001 | SRC-MAIN-001, seção 3.1 |
| RN-001 | REQ-RN-001 | SRC-ART-001, item 4.2 |
| CA-BE-001 | REQ-FUNC-001 | SRC-MAIN-001, seção 3.1 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-13 | Criação inicial | Extração de requisitos de origem | Agente |
```

---

## 15. Regras de consistência entre frontend e backend

Quando uma funcionalidade possuir specs nos dois contextos, o agente deve:

1. Utilizar o mesmo ID funcional nas duas specs.
2. Manter referência cruzada entre a spec de frontend e a spec de backend.
3. Garantir que ambas apontem para os mesmos requisitos de origem aplicáveis.
4. Garantir que critérios de aceite de frontend e backend não sejam contraditórios.
5. Registrar dependências de frontend em relação a capacidades esperadas do backend.
6. Registrar regras de segurança e autorização na spec de backend, mesmo quando
   seus efeitos precisarem ser tratados pela interface.
7. Não duplicar regras de negócio sem necessidade.
8. Diferenciar claramente responsabilidade de apresentação e responsabilidade de
   aplicação de regras.
9. Registrar em `OPEN-QUESTIONS.md` toda lacuna que impeça a compatibilização
   entre interface e serviços.

Exemplo de rastreabilidade:

```text
REQ-FUNC-001: usuário deve consultar solicitações

├── specs/frontend/0001-gestao-solicitacoes/spec.md
│   └── UI-001: exibir listagem de solicitações do usuário
│
└── specs/backend/0001-gestao-solicitacoes/spec.md
    └── RF-001: disponibilizar consulta de solicitações permitidas ao usuário
```

---

## 16. Regras de qualidade das specs

Antes de marcar uma spec como `Review Required`, o agente deve verificar:

- [ ] `requirements/main_requirements.md` foi lido e considerado.
- [ ] Requisitos mandatórios aplicáveis foram cobertos.
- [ ] Artefatos relevantes foram analisados.
- [ ] Todo requisito possui uma origem rastreável.
- [ ] A fonte foi identificada como principal ou complementar.
- [ ] Requisitos ambíguos foram convertidos em perguntas.
- [ ] Não existem decisões de negócio inventadas.
- [ ] Escopo incluído e não incluído estão claros.
- [ ] Requisitos funcionais descrevem comportamentos observáveis.
- [ ] Regras de negócio estão separadas dos requisitos funcionais.
- [ ] Segurança, privacidade, auditoria, integração e dados foram avaliados.
- [ ] Critérios de aceite são verificáveis.
- [ ] Dependências foram registradas.
- [ ] Conflitos entre documentos foram registrados.
- [ ] Dúvidas críticas foram destacadas.
- [ ] A rastreabilidade entre fonte, catálogo e spec está preenchida.
- [ ] A spec está classificada corretamente como frontend, backend ou ambos.
- [ ] Os roadmaps global e específicos foram atualizados.

---

## 17. Encerramento de sessão

Antes de encerrar uma sessão, o agente deve:

1. Atualizar `specs/REQUIREMENTS-CATALOG.md`.
2. Atualizar as specs de frontend e backend criadas ou modificadas.
3. Atualizar `specs/OPEN-QUESTIONS.md`.
4. Atualizar `specs/ROADMAP.md`.
5. Atualizar `specs/frontend/ROADMAP.md`, quando houver impacto de frontend.
6. Atualizar `specs/backend/ROADMAP.md`, quando houver impacto de backend.
7. Registrar uma próxima ação objetiva no checkpoint do roadmap global.

Exemplo de próxima ação adequada:

> “Ler `requirements/artifacts/regras-de-acesso.pdf`, página 8, e verificar
> se a regra de consulta se aplica a todos os usuários autenticados ou somente
> aos usuários associados à unidade responsável.”

Exemplo de próxima ação inadequada:

> “Continuar análise.”

---

## 18. Resultado esperado

Ao finalizar o consumo dos documentos em `requirements/`, o repositório deve
possuir:

- `requirements/main_requirements.md` preservado como fonte mandatória.
- Artefatos complementares preservados em `requirements/artifacts/`.
- Um catálogo único de requisitos extraídos e rastreáveis.
- Identificação explícita da prioridade de cada fonte.
- Uma lista de dúvidas, conflitos e decisões pendentes.
- Um roadmap global de funcionalidades.
- Um roadmap específico de frontend.
- Um roadmap específico de backend.
- Specs separadas em `specs/frontend/` e `specs/backend/`.
- Rastreabilidade entre requisitos mandatórios, artefatos, specs de frontend e
  specs de backend.
- Specs claras, auditáveis, sem requisitos inventados e prontas para revisão humana.