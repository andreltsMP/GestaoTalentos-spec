# AGENTS.md — Geração de Specs de Frontend, Backend e Mockups a partir de Requisitos

## 1. Objetivo do repositório

Este repositório utiliza **Specification-Driven Development (SDD)**.

Nesta etapa, a responsabilidade do agente é analisar os requisitos e os artefatos de apoio presentes em `requirements/` para criar especificações estruturadas, rastreáveis, verificáveis e separadas por contexto de implementação em `specs/frontend/` e `specs/backend/`.

Após criar ou modificar as specs e os roadmaps aplicáveis, o agente deve gerar ou sincronizar as mockups HTML das funcionalidades de frontend. As mockups são artefatos derivados das specs e devem refletir a aplicação de forma coerente e consolidada, seguindo estritamente as diretrizes de layout e identidade visual definidas no template base `requirements/template_webdesign.html` e no guia de design system `DESIGN.md`.

O agente não deve implementar código de produção, criar banco de dados, criar APIs, configurar infraestrutura ou modificar sistemas externos nesta etapa. A criação de mockups HTML é permitida exclusivamente como documentação visual derivada das specs de frontend.

Seu escopo é exclusivamente:

1. Consumir os documentos de requisitos.
2. Identificar regras, restrições, dependências e lacunas.
3. Catalogar os requisitos extraídos.
4. Gerar specs de frontend e backend.
5. Manter rastreabilidade entre requisitos, artefatos, specs e mockups.
6. Registrar dúvidas, conflitos e decisões pendentes.
7. Gerar e manter mockups HTML derivadas das specs de frontend e em conformidade com `DESIGN.md`.

***

## 2. Estrutura de diretórios

```text
/
├── AGENTS.md
├── DESIGN.md
├── requirements/
│   ├── main_requirements.md
│   ├── template_webdesign.html
│   └── artifacts/
│       ├── regras-de-negocio.md
│       ├── normas-e-politicas.pdf
│       ├── levantamento-processos.docx
│       ├── ata-reuniao.md
│       └── ...
├── specs/
│   ├── REQUIREMENTS-CATALOG.md
│   ├── OPEN-QUESTIONS.md
│   ├── ROADMAP.md
│   ├── frontend/
│   │   ├── ROADMAP.md
│   │   ├── 0001-nome-da-funcionalidade/
│   │   │   ├── spec.md
│   │   │   └── mockup.html
│   │   └── ...
│   └── backend/
│       ├── ROADMAP.md
│       ├── 0001-nome-da-funcionalidade/
│       │   └── spec.md
│       └── ...
├── mockups/
│   ├── 0001-nome-da-funcionalidade_mockup.html
│   └── ...
└── project-backlog/
    ├── backlog.csv
    └── team.md
```

***

## 3. Responsabilidade de cada diretório e artefato

### `DESIGN.md`

Este é o documento normativo do Design System do projeto.

Ele documenta a linguagem visual, tokens de cores, escala tipográfica, regras de elevação, componentes canônicos e diretrizes práticas (*Do's and Don'ts*). O agente deve consultá-lo obrigatoriamente para assegurar que todas as mockups HTML sigam rigorosamente a mesma identidade visual e padrões de componentes do ecossistema da aplicação.

### `requirements/`

Contém a fonte documental utilizada para criação das specs e mockups.

A pasta possui três tipos de fonte:

```text
requirements/
├── main_requirements.md
├── template_webdesign.html
└── artifacts/
```

### `requirements/main_requirements.md`

Este é o documento principal e mandatório do projeto.

Ele contém os requisitos prioritários que devem ser considerados obrigatórios durante a criação das specs, salvo quando existir uma alteração formal, documentada e aprovada.

O agente deve sempre ler este arquivo antes de analisar qualquer artefato localizado em `requirements/artifacts/`.

As informações presentes em `main_requirements.md` possuem precedência sobre informações encontradas em documentos auxiliares.

### `requirements/template_webdesign.html`

Este é o template obrigatório de referência estrutural e visual para as mockups HTML.

O agente deve utilizá-lo como base ao criar ou atualizar arquivos de mockup. O template orienta a estrutura do shell da página, cabeçalho, barra lateral, área de trabalho, estilos e recursos já presentes no projeto, mas não é fonte de requisitos de negócio.

O arquivo deve ser preservado: o agente nunca pode alterá-lo, renomeá-lo, movê-lo ou excluí-lo. A mockup gerada deve derivar do template, sem substituir a referência original.

A stack visual padrão das mockups é:

* PrimeReact para componentes de interface.
* PrimeFlex para grid, espaçamento, responsividade e utilitários de layout.
* PrimeIcons para iconografia.

Quando o template e o `DESIGN.md` possuírem recursos equivalentes já carregados ou definidos, o agente deve reaproveitá-los integralmente. O agente não deve introduzir uma biblioteca visual concorrente sem fonte ou decisão humana formal.

### `requirements/artifacts/`

Contém documentos de apoio ao levantamento e detalhamento dos requisitos.

Podem existir documentos em Markdown, TXT, PDF, DOCX, planilhas, atas de reunião, regras de negócio, protótipos, descrições de processos, políticas, normas, manuais, e-mails exportados ou outros materiais relevantes.

Esses arquivos servem para:

* Detalhar requisitos presentes em main\_requirements.md;
* Identificar regras de negócio;
* Identificar exceções e cenários alternativos;
* Identificar restrições funcionais e não funcionais;
* Identificar requisitos de segurança, privacidade e auditoria;
* Identificar integrações e entidades de negócio;
* Identificar dúvidas, dependências e conflitos.

Documentos em `requirements/artifacts/` não podem reduzir, remover ou contradizer silenciosamente um requisito mandatório presente em `main_requirements.md`.

Quando houver conflito, o agente deve registrar a situação em `specs/OPEN-QUESTIONS.md`.

### `specs/`

Contém as especificações produzidas pelo agente a partir dos documentos de `requirements/`.

As specs são organizadas por contexto de implementação:

```text
specs/
├── frontend/
└── backend/
```

A separação não significa que frontend e backend possuem requisitos de negócio diferentes. Ambos devem derivar dos mesmos requisitos de origem, mas cada contexto deve registrar somente os comportamentos, responsabilidades e critérios de aceite aplicáveis à sua camada.

### `specs/frontend/`

Contém specs orientadas à experiência, fluxo e interface do usuário.

**As specs de frontend podem conter:**

* Telas e jornadas de usuário;
* Componentes e comportamentos de interface;
* Estados de carregamento, vazio, erro e sucesso;
* Validações de entrada realizadas na interface;
* Exibição e tratamento de mensagens;
* Regras de apresentação;
* Acessibilidade;
* Responsividade;
* Navegação;
* Interações com APIs já previstas pelos requisitos;
* Critérios de aceite verificáveis pela interface.

**As specs de frontend não devem definir:**

* Modelo físico de banco de dados;
* Estrutura interna de serviços;
* Estratégias de persistência;
* Tecnologias de backend;
* Regras de autorização implementadas exclusivamente no servidor;
* Decisões de infraestrutura.

Cada spec de frontend deve conter uma cópia local da mockup correspondente em `mockup.html`, quando a funcionalidade possuir representação visual aplicável.

### `specs/backend/`

Contém specs orientadas a capacidades de servidor, regras de negócio, dados, segurança, integrações e contratos.

**As specs de backend podem conter:**

* Serviços e capacidades de negócio;
* Regras de negócio aplicadas no servidor;
* Autenticação e autorização;
* Operações, comandos e consultas;
* Contratos de API em nível funcional;
* Entidades e dados necessários ao domínio;
* Integrações com sistemas externos;
* Auditoria, logs e rastreabilidade;
* Requisitos de segurança e privacidade;
* Critérios de aceite verificáveis por serviços, APIs ou integrações.

**As specs de backend não devem definir:**

* Componentes visuais;
* Layouts;
* Design visual;
* Estratégias específicas de navegação de interface;
* Detalhes de experiência visual que não afetem uma regra de negócio.

### `mockups/`

Contém as mockups HTML consolidadas da aplicação, derivadas das specs de frontend.

Cada funcionalidade de frontend com mockup deve possuir um arquivo central seguindo obrigatoriamente a convenção:

```text
mockups/{ID}-{slug}_mockup.html
```

Exemplo:

```text
mockups/0003-central-de-notificacoes_mockup.html
```

A mockup central deve possuir uma cópia idêntica em:

```text
specs/frontend/{ID}-{slug}/mockup.html
```

A pasta `mockups/` representa a visão visual consolidada das funcionalidades e deve permitir verificar consistência de navegação, estrutura, identidade visual e padrões compartilhados da aplicação. A mockup não é fonte de requisitos e não substitui a spec de frontend.

### `project-backlog/`

Contém o backlog de atividades humanas e o template de cadastro da equipe para planejamento da futura geração do código:

* `project-backlog/backlog.csv`: catálogo estruturado de atividades humanas pré-codificação em formato CSV para importação no Azure DevOps.
* `project-backlog/team.md`: arquivo em Markdown com o mapeamento dos membros da equipe e seus respectivos papéis canônicos para atribuição automática nas tarefas.

***

## 4. Hierarquia de fontes de verdade

A prioridade das fontes deve obedecer à seguinte ordem:

1. `requirements/main_requirements.md`
2. Documentos em `requirements/artifacts/`
3. Decisões humanas formalmente registradas em `specs/OPEN-QUESTIONS.md`
4. `specs/REQUIREMENTS-CATALOG.md`
5. Specs já criadas em `specs/frontend/` e `specs/backend/`
6. Roadmaps em `specs/`
7. Mockups em `mockups/` e cópias `mockup.html` nas specs de frontend

Para decisões visuais, de layout e de design system:

* `requirements/template_webdesign.html` é a referência obrigatória de layout, estrutura e componentes base.
* `DESIGN.md` é a especificação obrigatória do Design System (tokens, tipografia, cores, superfícies e regras de consistência visual).
* A spec de frontend associada é a fonte do comportamento e fluxo da interface.
* A mockup deve obedecer a todas essas referências, sem criar regras funcionais novas.

### Regras de precedência

* `main_requirements.md` contém requisitos mandatórios.
* Artefatos complementam, detalham ou contextualizam os requisitos principais.
* Nenhum artefato pode invalidar requisito mandatório sem decisão humana explícita.
* Nenhuma spec pode alterar um requisito de origem sem registrar a origem e a decisão que justifica a alteração.
* Mockups somente podem representar requisitos, fluxos e estados previstos nas fontes e nas specs de frontend.
* Uma mockup não pode validar, alterar ou substituir uma spec.
* Quando documentos apresentarem conflito, o agente deve registrar a dúvida, impacto e origem, sem escolher uma interpretação silenciosamente.
* Quando uma decisão humana resolver uma dúvida, ela deve ser mantida no histórico de `specs/OPEN-QUESTIONS.md`.

***

## 5. Regras obrigatórias

### 5.1 Preservação dos documentos de origem

* Nunca alterar, renomear, mover ou excluir arquivos em `requirements/`.
* Nunca alterar `DESIGN.md`.
* Nunca alterar `requirements/main_requirements.md` ou `requirements/template_webdesign.html`.
* Nunca alterar, renomear, mover ou excluir arquivos em `requirements/artifacts/`.
* Nunca resumir ou reescrever um documento de origem no próprio arquivo.
* Nunca assumir que um artefato mais recente invalida automaticamente outro.
* Sempre informar o arquivo, seção, página, item, título ou trecho utilizado como fonte, quando essa informação estiver disponível.
* Sempre registrar se um requisito foi extraído de `main_requirements.md` ou de um documento complementar em `requirements/artifacts/`.

### 5.2 Obrigatoriedade do `main_requirements.md`

Antes de criar, alterar, dividir ou descontinuar uma spec, o agente deve:

1. Ler integralmente `requirements/main_requirements.md`.
2. Identificar todos os requisitos mandatórios relacionados à funcionalidade.
3. Garantir que a spec cubra os requisitos mandatórios aplicáveis.
4. Verificar se os artefatos complementares adicionam regras, restrições ou exceções.
5. Registrar requisitos mandatórios no catálogo com indicação explícita de origem.
6. Nunca colocar um requisito mandatório em “fora de escopo” sem decisão humana formal registrada.

### 5.3 Não inventar requisitos

**O agente pode:**

* Extrair requisitos explícitos;
* Normalizar e reescrever requisitos para melhorar clareza;
* Classificar requisitos por tipo;
* Identificar dependências;
* Identificar inconsistências;
* Separar requisitos em specs coesas;
* Derivar critérios de aceite diretamente do comportamento solicitado;
* Identificar impactos distintos em frontend e backend;
* Formular perguntas objetivas para eliminar ambiguidades.

**O agente não pode:**

* Inventar regras de negócio ausentes;
* Assumir perfis, permissões ou políticas de acesso não documentadas;
* Definir limites de desempenho sem fonte explícita;
* Criar prazos, SLAs ou metas de disponibilidade não documentadas;
* Escolher tecnologias, frameworks, bancos de dados ou fornecedores;
* Criar decisões de arquitetura;
* Definir contratos técnicos completos de API sem base documental;
* Interpretar desejo, hipótese ou sugestão como requisito aprovado;
* Marcar uma dúvida crítica como resolvida sem decisão humana documentada.

### 5.4 Tratamento de incerteza

Quando uma informação não estiver clara, o agente deve:

1. Registrar a informação disponível.
2. Informar fonte e referência precisa.
3. Explicar a ambiguidade, lacuna ou conflito.
4. Informar o impacto sobre frontend, backend ou ambos.
5. Criar uma pergunta objetiva em `specs/OPEN-QUESTIONS.md`.
6. Indicar a spec afetada.
7. Manter a spec como `Draft` ou `Blocked` quando a dúvida for crítica.

Nunca preencher lacunas de negócio, segurança, dados, privacidade, autorização ou integração com suposições silenciosas.

### 5.5 Geração e sincronização de mockups

* A mockup deve ser criada ou atualizada somente após a criação ou alteração das specs aplicáveis e a atualização dos roadmaps.
* A geração de mockups é a última etapa de consolidação da sessão para funcionalidades de frontend afetadas.
* Antes de gerar uma mockup, o agente deve revisar as specs de frontend já existentes e relevantes para preservar a visão integrada da aplicação, inclusive padrões de navegação e elementos compartilhados.
* O agente deve utilizar obrigatoriamente `requirements/template_webdesign.html` como base estrutural e seguir as diretrizes visuais estabelecidas no `DESIGN.md`.
* A representação visual deve utilizar PrimeReact, PrimeFlex e PrimeIcons como stack padrão, conforme estruturado no template e no `DESIGN.md`.
* Toda página HTML de mockup de frontend deve apresentar, no topo da página e logo após a identificação da aplicação, uma tag de identificação com o texto exato `Mockup Conceitual`.
* A tag `Mockup Conceitual` deve possuir fundo laranja claro e texto em laranja escuro, preservando contraste e legibilidade.
* A identificação da aplicação deve permanecer visualmente anterior à tag; a tag não pode substituir o nome, logotipo ou identificação existente da aplicação no template.
* O selo deve ser aplicado tanto no arquivo central em `mockups/{ID}-{slug}_mockup.html` quanto na cópia local `specs/frontend/{ID}-{slug}/mockup.html`.
* Quando a mockup representar uma funcionalidade que tenha referências de navegação ou itens de menu para outras funcionalidades já mockadas, essas referências devem utilizar links HTML para os arquivos correspondentes em `mockups/`.
* Os links de navegação entre mockups devem apontar somente para funcionalidades que possuam mockup criada. Referências a funcionalidades sem mockup devem permanecer sem link ou ser apresentadas como indisponíveis, sem inventar uma página de destino.
* Os links devem ser relativos, funcionais quando a mockup é aberta a partir de `mockups/`, e preservar a estrutura e os padrões de navegação definidos no `requirements/template_webdesign.html` e `DESIGN.md`.
* Para cada mockup aplicável, criar ou atualizar `mockups/{ID}-{slug}_mockup.html` e sincronizar uma cópia idêntica em `specs/frontend/{ID}-{slug}/mockup.html`.
* As duas cópias devem possuir o mesmo conteúdo após a geração ou atualização.
* A mockup deve refletir apenas telas, jornadas, ações, informações, validações, estados e mensagens documentados na spec de frontend ou nas fontes de origem.
* A mockup deve representar estados de carregamento, vazio, erro, sucesso e sem permissão somente quando estiverem documentados e forem aplicáveis.
* A mockup não pode inventar campos, menus, permissões, ações, dados, integrações, indicadores, regras ou comportamentos sem base documental.
* A mockup não implementa integração real, autenticação real, persistência ou regra de negócio; ela é documentação visual HTML.
* Se uma spec de backend alterar comportamento visível ao usuário, o agente deve avaliar o impacto na spec frontend e na mockup associada.
* Uma dúvida crítica pode permitir mockup preliminar apenas se a incerteza estiver explicitamente indicada na spec e em `OPEN-QUESTIONS.md`; a mockup não deve simular uma decisão definitiva.

***

## 6. Fluxo obrigatório para criação de specs

### Etapa 1 — Leitura obrigatória dos requisitos principais

Antes de qualquer análise, o agente deve ler `requirements/main_requirements.md` e identificar:

* Objetivos principais;
* Requisitos mandatórios;
* Escopo explícito;
* Não escopo explícito;
* Atores envolvidos;
* Regras de negócio declaradas;
* Critérios de aceite existentes;
* Integrações mencionadas;
* Restrições;
* Dependências;
* Pontos que exigem detalhamento nos artefatos.

### Etapa 2 — Inventário dos artefatos complementares

O agente deve listar e analisar os arquivos em `requirements/artifacts/`, e para cada arquivo relevante, identificar quando possível:

* Nome do documento;
* Tipo documental;
* Data;
* Versão;
* Autor ou área responsável;
* Assunto principal;
* Relação com requisitos mandatórios;
* Potenciais conflitos com outros documentos.

### Etapa 3 — Extração e classificação

O agente deve extrair e classificar informações como:

* Requisitos funcionais;
* Requisitos não funcionais;
* Regras de negócio;
* Requisitos de frontend;
* Requisitos de backend;
* Requisitos compartilhados entre frontend e backend;
* Requisitos de segurança;
* Requisitos de privacidade ou proteção de dados;
* Requisitos de integração;
* Requisitos de dados;
* Requisitos de auditoria;
* Restrições;
* Premissas;
* Dependências;
* Critérios de aceite;
* Questões em aberto.

Cada requisito extraído deve possuir um identificador estável.

### Etapa 4 — Normalização e catálogo

O agente deve criar ou atualizar `specs/REQUIREMENTS-CATALOG.md`, e cada requisito deve informar:

* Identificador estável;
* Tipo;
* Descrição normalizada;
* Prioridade de origem;
* Fonte;
* Referência no documento;
* Contexto aplicável: frontend, backend ou ambos;
* Status;
* Specs relacionadas.

### Etapa 5 — Decomposição por funcionalidade e contexto

O agente deve agrupar os requisitos em funcionalidades coesas.

Para cada funcionalidade, o agente deve avaliar a necessidade de gerar:

* Uma spec somente de frontend.
* Uma spec somente de backend.
* Uma spec de frontend e uma spec de backend com o mesmo identificador.
* Nenhuma spec em determinado contexto, quando os requisitos não forem aplicáveis.

Exemplo:

Requisito: “Usuário deve consultar suas notificações e marcá-las como lidas.”

Frontend:

* Criar listagem de notificações.
* Exibir estados de carregamento, vazio e erro.
* Permitir interação para marcar como lida.
* Exibir indicador de não lidas.

Backend:

* Disponibilizar consulta de notificações do usuário autenticado.
* Garantir que o usuário acesse apenas suas próprias notificações.
* Registrar a marcação como lida.
* Garantir idempotência da operação.
* Registrar auditoria ou logs, quando aplicável.

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

O identificador de uma funcionalidade deve ser o mesmo nos dois contextos quando ambas as specs representarem a mesma capacidade de negócio.

Exemplo:

```
specs/frontend/0003-central-de-notificacoes/spec.md
specs/backend/0003-central-de-notificacoes/spec.md
```

A numeração deve:

* Possuir quatro dígitos.
* Ser sequencial.
* Nunca ser reutilizada.
* Ser mantida mesmo se a spec for cancelada ou substituída.
* Ser compartilhada por frontend e backend quando ambos implementarem a mesma funcionalidade de negócio.

### Etapa 7 — Atualização dos roadmaps e do backlog

Após criar ou atualizar specs, o agente deve:

1. Atualizar os arquivos de roadmap:
```text
specs/ROADMAP.md
specs/frontend/ROADMAP.md
specs/backend/ROADMAP.md
```
2. O roadmap global deve registrar a funcionalidade e os contextos afetados.
3. Os roadmaps de frontend e backend devem registrar a ordem específica de elaboração de suas specs.
4. **Revisar e atualizar obrigatoriamente `project-backlog/backlog.csv`**, incluindo ou ajustando a `Feature` correspondente à spec, seus `Product Backlog Items` temáticos e as respectivas `Tasks` humanas necessárias para desbloqueio, revisão e validação daquela funcionalidade (conforme a seção 19).

### Etapa 8 — Geração e sincronização de mockups

Esta etapa deve ocorrer após todas as specs e roadmaps impactados terem sido atualizados.

1. Identificar todas as specs de frontend criadas ou modificadas na sessão.
2. Revisar as funcionalidades frontend existentes e relevantes para preservar consistência global da aplicação.
3. Ler `requirements/template_webdesign.html` e `DESIGN.md` como bases obrigatórias estruturais, de layout e de design system.
4. Criar ou atualizar `mockups/{ID}-{slug}_mockup.html` para cada funcionalidade aplicável.
5. Criar ou atualizar a cópia idêntica em `specs/frontend/{ID}-{slug}/mockup.html`.
6. Registrar na spec o caminho, status e data da última sincronização da mockup.
7. Atualizar o checkpoint do roadmap global com a situação das mockups e pendências visuais derivadas de questões em aberto.

***

## 7. Estados permitidos para specs

* `Draft`: spec em elaboração ou com lacunas relevantes.
* `Review Required`: spec elaborada e aguardando revisão humana.
* `Approved`: spec revisada e aprovada para planejamento ou implementação.
* `Blocked`: spec possui impedimento, conflito ou dependência não resolvida.
* `Deprecated`: spec foi cancelada, substituída ou deixou de ser aplicável.

O agente não deve alterar uma spec para `Approved` sem instrução explícita de aprovação humana ou mecanismo formal definido pelo projeto.

### Relação entre spec e mockup

* Mockups associadas a specs `Draft` são preliminares e devem refletir suas questões em aberto relevantes.
* Specs `Blocked` não devem receber mockup definitiva; uma mockup preliminar só é permitida quando a incerteza estiver registrada explicitamente.
* A existência de mockup não altera o estado da spec.
* Uma mockup deve ser atualizada sempre que uma mudança aprovada na spec frontend alterar tela, fluxo, estado, ação, navegação ou informação apresentada ao usuário.

***

## 8. Modelo obrigatório de catálogo

Arquivo: `specs/REQUIREMENTS-CATALOG.md`

```md
# Catálogo de requisitos

## Fontes analisadas

| ID | Arquivo | Origem | Tipo | Data/versão | Prioridade | Observação |
|---|---|---|---|---|---|---|
| SRC-MAIN-001 | `requirements/main_requirements.md` | Principal | Requisitos mandatórios | 2026-08-13 | Mandatória | Fonte principal de requisitos |
| SRC-DS-001 | `DESIGN.md` | Design System | Guia visual e tokens | — | Visual | Especificação oficial do Design System |
| SRC-TPL-001 | `requirements/template_webdesign.html` | Template | Referência estrutural | — | Visual | Base obrigatória de layout das mockups |
| SRC-ART-001 | `requirements/artifacts/regras-de-negocio.md` | Artefato | Regras de negócio | 2026-08-12 | Complementar | Detalha fluxo operacional |

## Requisitos catalogados

| ID | Tipo | Descrição normalizada | Contexto | Fonte | Referência | Prioridade | Status | Specs relacionadas |
|---|---|---|---|---|---|---|---|---|
| REQ-FUNC-001 | Funcional | O usuário deve consultar suas solicitações | Ambos | SRC-MAIN-001 | Seção 3.1 | Mandatória | Extraído | FE-0001, BE-0001 |
| REQ-RN-001 | Regra de negócio | Toda solicitação deve possuir responsável definido | Backend | SRC-ART-001 | Item 4.2 | Complementar | Em análise | BE-0001 |
| REQ-UI-001 | Interface | A listagem deve apresentar situação da solicitação | Frontend | SRC-ART-001 | Item 5.1 | Complementar | Extraído | FE-0001 |
```

### Prefixos permitidos

* `REQ-FUNC-XXX`: requisito funcional.
* `REQ-RNF-XXX`: requisito não funcional.
* `REQ-RN-XXX`: regra de negócio.
* `REQ-UI-XXX`: requisito específico de interface.
* `REQ-SEC-XXX`: requisito de segurança.
* `REQ-PRIV-XXX`: requisito de privacidade ou LGPD.
* `REQ-INT-XXX`: requisito de integração.
* `REQ-DATA-XXX`: requisito de dados.
* `REQ-AUD-XXX`: requisito de auditoria.
* `REQ-RES-XXX`: restrição.
* `REQ-PREM-XXX`: premissa.

### Status permitidos para requisitos

* `Extraído`: dentificado em documento de origem, sem revisão.
* `Em análise`: precisa de classificação, detalhamento ou confirmação.
* `Validado`: confirmado por responsável humano.
* `Rejeitado`: não será atendido, com justificativa documentada.
* `Substituído`: foi substituído por outro requisito.
* `Coberto por spec`: está coberto por ao menos uma spec.
* `Implementado`: reservado para uma futura fase de desenvolvimento.

***

## 9. Modelo obrigatório de dúvidas

Arquivo: `specs/OPEN-QUESTIONS.md`

```md
# Questões em aberto

## Regras

- Não ocultar dúvidas dentro de specs ou mockups.
- Formular perguntas objetivas.
- Informar fonte, referência e impacto.
- Informar se a questão afeta frontend, backend, mockup ou todos.
- Dúvidas críticas impedem a aprovação da spec.
- Após resposta humana, manter a decisão no histórico.

| ID | Pergunta | Fonte e contexto | Impacto | Contexto afetado | Specs | Criticidade | Status |
|---|---|---|---|---|---|---|---|
| Q-001 | Quais perfis podem consultar solicitações? | SRC-ART-002, item 8 menciona “usuários autorizados”, sem detalhar perfis | Segurança e autorização | Backend | BE-0001 | Alta | Aberta |
| Q-002 | A situação deve ser atualizada sem recarregar a página? | Não identificado nas fontes | Experiência de usuário e mockup | Frontend, Mockup | FE-0001 | Média | Aberta |
| Q-003 | Qual é o prazo de retenção das solicitações? | Não identificado nos documentos | Dados e privacidade | Backend | BE-0001 | Alta | Aberta |

## Decisões respondidas

| ID | Resposta | Responsável | Data | Impacto |
|---|---|---|---|---|
| Q-004 | Apenas administradores podem cancelar solicitações | Área de negócio | 2026-08-13 | Atualizar BE-0001, FE-0001 e mockup relacionada |
```

***

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
- Quando houver impacto de frontend, o checkpoint deve registrar a situação da mockup correspondente.

## Checkpoint de geração de specs e mockups

- Última atualização: 2026-08-13
- Fonte principal analisada: `requirements/main_requirements.md`
- Design System analisado: `DESIGN.md`
- Template visual analisado: `requirements/template_webdesign.html`
- Artefato atual em análise: `requirements/artifacts/regras-de-negocio.md`
- Funcionalidade ativa: `0002-central-de-notificacoes`
- Última ação concluída: requisitos mandatórios catalogados
- Próxima ação: gerar ou sincronizar a mockup de `0002-central-de-notificacoes` após concluir specs e roadmaps
- Bloqueios: confirmar se notificações por e-mail pertencem à primeira entrega

## Funcionalidades ordenadas

| Ordem | ID | Funcionalidade | Contextos | Status | Mockup | Prioridade | Dependências | Fontes | Questões abertas |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | 0001 | Gestão de solicitações | Frontend, Backend | Review Required | Sincronizada | Alta | — | SRC-MAIN-001, SRC-ART-001 | Q-001, Q-002 |
| 2 | 0002 | Central de notificações | Frontend, Backend | Draft | Pendente | Média | 0001 | SRC-MAIN-001, SRC-ART-002 | Q-003 |
```

***

## 11. Modelo de roadmap de frontend

Arquivo: `specs/frontend/ROADMAP.md`

```md
# Roadmap de specs — Frontend

| Ordem | ID | Funcionalidade | Status | Mockup | Dependência funcional | Fonte principal | Próxima ação |
|---:|---|---|---|---|---|---|---|
| 1 | 0001 | Gestão de solicitações | Review Required | Sincronizada | — | SRC-MAIN-001 | Revisar fluxos, estados e mockup |
| 2 | 0002 | Central de notificações | Draft | Pendente | 0001 | SRC-MAIN-001 | Criar spec de interface e mockup ao final |
```

***

## 12. Modelo de roadmap de backend

Arquivo: `specs/backend/ROADMAP.md`

```md
# Roadmap de specs — Backend

| Ordem | ID | Funcionalidade | Status | Dependência funcional | Fonte principal | Próxima ação |
|---:|---|---|---|---|---|---|
| 1 | 0001 | Gestão de solicitações | Review Required | — | SRC-MAIN-001 | Revisar regras, dados e segurança |
| 2 | 0002 | Central de notificações | Draft | 0001 | SRC-MAIN-001 | Criar spec de serviços e operações |
```

***

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
- Design System: `DESIGN.md`
- Template visual: `requirements/template_webdesign.html`
- Mockup central: `mockups/000X-nome-da-funcionalidade_mockup.html`
- Cópia local da mockup: `specs/frontend/000X-nome-da-funcionalidade/mockup.html`
- Status da mockup: Pendente | Preliminar | Sincronizada | Requer revisão
- Última sincronização da mockup:
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

## Mockup relacionada

- Base obrigatória: `requirements/template_webdesign.html`.
- Guia de Design System: `DESIGN.md`.
- Stack visual: PrimeReact, PrimeFlex e PrimeIcons.
- Arquivo central: `mockups/000X-nome-da-funcionalidade_mockup.html`.
- Cópia local: `mockup.html`.
- A mockup deve representar somente os fluxos, requisitos e estados documentados nesta spec.
- Identificação obrigatória da página: após a identificação da aplicação, exibir a tag `Mockup Conceitual` com fundo laranja claro e texto laranja escuro.
- Navegação entre mockups: itens de menu ou referências a funcionalidades que possuam mockups existentes devem apontar para o arquivo correspondente em `mockups/`.

| Item visual | Fluxo, estado ou requisito da spec | Situação |
|---|---|---|
| [Tela ou componente] | [UI-001, fluxo principal ou estado] | [Representado/Pendente/Dependente de Q-XXX] |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | [Usuário consegue realizar o fluxo principal] | UI-001, REQ-FUNC-XXX |
| CA-FE-002 | [Interface apresenta estado vazio corretamente] | REQ-FUNC-XXX |
| CA-FE-003 | [Interface trata falha de acesso adequadamente] | REQ-SEC-XXX |
| CA-FE-004 | A mockup está sincronizada nas localizações central e local e segue as diretrizes do DESIGN.md e do template | UI-001, CA-FE-001 |

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
| [Data] | Mockup criada ou sincronizada | Atualização posterior à consolidação da spec | Agente |
```

***

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

***

## 15. Regras de consistência entre frontend, backend e mockups

Quando uma funcionalidade possuir specs nos dois contextos, o agente deve:

1. Utilizar o mesmo ID funcional nas duas specs.
2. Manter referência cruzada entre a spec de frontend e a spec de backend.
3. Garantir que ambas apontem para os mesmos requisitos de origem aplicáveis.
4. Garantir que critérios de aceite de frontend e backend não sejam contraditórios.
5. Registrar dependências de frontend em relação a capacidades esperadas do backend.
6. Registrar regras de segurança e autorização na spec de backend, mesmo quando seus efeitos precisarem ser tratados pela interface.
7. Não duplicar regras de negócio sem necessidade.
8. Diferenciar claramente responsabilidade de apresentação e responsabilidade de aplicação de regras.
9. Registrar em `OPEN-QUESTIONS.md` toda lacuna que impeça a compatibilização entre interface e serviços.
10. Criar mockup somente para funcionalidades que possuam spec de frontend e representação visual aplicável.
11. Garantir que a mockup central e sua cópia local estejam sincronizadas.
12. Reavaliar a spec frontend e a mockup quando uma alteração de backend mudar informação, ação, estado ou fluxo perceptível ao usuário.
13. Garantir que cada página de mockup apresente, imediatamente após a identificação da aplicação, a tag visual `Mockup Conceitual`, com fundo laranja claro e texto laranja escuro.
14. Garantir total conformidade com as diretrizes do `DESIGN.md` e a estrutura do `requirements/template_webdesign.html`.
15. Quando itens de menu, atalhos ou referências de funcionalidades representadas na página corresponderem a outras mockups existentes, vinculá-los ao respectivo arquivo `mockups/{ID}-{slug}_mockup.html`.
16. Não criar links para páginas, funcionalidades ou fluxos que não possuam mockup correspondente criada.

Exemplo de rastreabilidade:

```text
REQ-FUNC-001: usuário deve consultar solicitações

├── specs/frontend/0001-gestao-solicitacoes/spec.md
│   ├── UI-001: exibir listagem de solicitações do usuário
│   └── mockup.html: representa a listagem conforme DESIGN.md e o template
│
├── specs/backend/0001-gestao-solicitacoes/spec.md
│   └── RF-001: disponibilizar consulta de solicitações permitidas ao usuário
│
└── mockups/0001-gestao-solicitacoes_mockup.html
    └── cópia central sincronizada da mockup de frontend
```

***

## 16. Regras de qualidade das specs e mockups

Antes de marcar uma spec como `Review Required`, o agente deve verificar:

* [ ] `requirements/main_requirements.md` foi lido e considerado.
* [ ] Requisitos mandatórios aplicáveis foram cobertos.
* [ ] Artefatos relevantes foram analisados.
* [ ] Todo requisito possui uma origem rastreável.
* [ ] A fonte foi identificada como principal ou complementar.
* [ ] Requisitos ambíguos foram convertidos em perguntas.
* [ ] Não existem decisões de negócio inventadas.
* [ ] Escopo incluído e não incluído estão claros.
* [ ] Requisitos funcionais descrevem comportamentos observáveis.
* [ ] Regras de negócio estão separadas dos requisitos funcionais.
* [ ] Segurança, privacidade, auditoria, integração e dados foram avaliados.
* [ ] Critérios de aceite são verificáveis.
* [ ] Dependências foram registradas.
* [ ] Conflitos entre documentos foram registrados.
* [ ] Dúvidas críticas foram destacadas.
* [ ] A rastreabilidade entre fonte, catálogo e spec está preenchida.
* [ ] A spec está classificada corretamente como frontend, backend ou ambos.
* [ ] Os roadmaps global e específicos foram atualizados.
* [ ] O backlog de atividades humanas (`project-backlog/backlog.csv`) foi revisado e atualizado com as novas Features, PBIs e Tasks correspondentes à spec (conforme seção 19).

Quando uma mockup for aplicável, o agente também deve verificar:

* [ ] `requirements/template_webdesign.html` foi lido e utilizado como base estrutural.
* [ ] As diretrizes do `DESIGN.md` foram respeitadas (tokens, tipografia, cores, superfícies e componentes).
* [ ] A mockup foi gerada após a consolidação das specs e roadmaps da sessão.
* [ ] A mockup segue PrimeReact, PrimeFlex e PrimeIcons como padrão visual.
* [ ] A mockup representa apenas requisitos, fluxos e estados documentados.
* [ ] Nenhuma regra de negócio, permissão, campo, ação ou dado foi inventado.
* [ ] A mockup central segue o nome `mockups/{ID}-{slug}_mockup.html`.
* [ ] A cópia local está em `specs/frontend/{ID}-{slug}/mockup.html`.
* [ ] As cópias central e local possuem conteúdo idêntico.
* [ ] O status e a data de sincronização da mockup foram registrados na spec de frontend.
* [ ] Questões abertas com impacto visual estão identificadas na spec e, quando necessário, na mockup preliminar.
* [ ] A identificação da aplicação é seguida, no topo da página, pela tag `Mockup Conceitual`.
* [ ] A tag utiliza fundo laranja claro, texto laranja escuro e contraste legível.
* [ ] Os itens de menu ou referências a funcionalidades já mockadas possuem links relativos e funcionais para os arquivos correspondentes em `mockups/`.
* [ ] Não há links para mockups inexistentes ou funcionalidades não documentadas.

***

## 17. Encerramento de sessão

Antes de encerrar uma sessão, o agente deve:

1. Atualizar `specs/REQUIREMENTS-CATALOG.md`.
2. Atualizar as specs de frontend e backend criadas ou modificadas.
3. Atualizar `specs/OPEN-QUESTIONS.md`.
4. Atualizar `specs/ROADMAP.md`.
5. Atualizar `specs/frontend/ROADMAP.md`, quando houver impacto de frontend.
6. Atualizar `specs/backend/ROADMAP.md`, quando houver impacto de backend.
7. Revisar e atualizar `project-backlog/backlog.csv` com todas as novas specs ou alterações realizadas na sessão, garantindo a árvore hierárquica completa (Epic → Feature → Product Backlog Item → Task) e a integridade das tarefas humanas.
8. Gerar ou sincronizar as mockups de todas as specs de frontend criadas ou modificadas na sessão, após a conclusão dos itens anteriores, garantindo conformidade com `template_webdesign.html` e `DESIGN.md`.
9. Garantir a cópia central em `mockups/{ID}-{slug}_mockup.html` e a cópia local em `specs/frontend/{ID}-{slug}/mockup.html`.
10. Registrar uma próxima ação objetiva no checkpoint do roadmap global, incluindo pendência de mockup quando aplicável.

Exemplo de próxima ação adequada:

> “Ler `requirements/artifacts/regras-de-acesso.pdf`, página 8, e verificar se a regra de consulta se aplica a todos os usuários autenticados ou somente aos usuários associados à unidade responsável.”

Exemplo de próxima ação inadequada:

> “Continuar análise.”

***

## 18. Resultado esperado

Ao finalizar o consumo dos documentos em `requirements/`, o repositório deve possuir:

* `requirements/main_requirements.md` preservado como fonte mandatória.
* `DESIGN.md` preservado como guia normativo do Design System.
* `requirements/template_webdesign.html` preservado como template obrigatório de referência visual e layout.
* Artefatos complementares preservados em `requirements/artifacts/`.
* Um catálogo único de requisitos extraídos e rastreáveis.
* Identificação explícita da prioridade de cada fonte.
* Uma lista de dúvidas, conflitos e decisões pendentes.
* Um roadmap global de funcionalidades.
* Um roadmap específico de frontend.
* Um roadmap específico de backend.
* Specs separadas em `specs/frontend/` e `specs/backend/`.
* Mockups HTML consolidadas em `mockups/{ID}-{slug}_mockup.html` alinhadas ao `DESIGN.md`.
* Uma cópia `mockup.html` em cada pasta de spec de frontend aplicável.
* Sincronização entre cada mockup central e sua cópia local.
* Rastreabilidade entre requisitos mandatórios, artefatos, specs de frontend, specs de backend e mockups.
* Specs e mockups claras, auditáveis, sem requisitos inventados e prontas para revisão humana.
* A pasta `project-backlog/` contendo `backlog.csv` com as atividades humanas necessárias durante a futura geração do código, e `team.md` com o cadastro da equipe (conforme a seção 19).

***

## 19. Backlog de atividades humanas (`project-backlog/backlog.csv`)

### 19.1 Objetivo

O `project-backlog/backlog.csv` registra **as atividades que humanos (desenvolvedores e analistas) precisarão executar durante a futura
geração do código**, para desbloquear, orientar, validar e evidenciar essa geração. Ele **não** é um backlog geral de
implementação, nem uma lista de tarefas de codificação que o próprio agente ou a IA executarão.

Cada item deve responder à pergunta: *"O que uma pessoa precisa decidir, fornecer, preparar, revisar ou validar para que
o código possa ser gerado corretamente a partir das specs?"*

Exemplos de atividades válidas:

- Responder a uma questão em aberto (`specs/OPEN-QUESTIONS.md`) que bloqueia uma spec.
- Decidir uma regra de negócio, perfil de acesso, política de retenção ou métrica ausente.
- Validar e aprovar uma spec (`Draft` → `Review Required` → `Approved`).
- Preparar ambiente, credenciais ou acessos de integração necessários para o desenvolvimento.
- Fornecer dados de homologação ou cenários de teste.
- Revisar o código gerado contra os critérios de aceite das specs e registrar evidências.

Exemplos de atividades **inválidas** (não devem entrar no backlog):

- "Implementar o endpoint X" ou "Criar o componente Y" (trabalho de codificação, não atividade humana de apoio).
- Tarefas genéricas sem relação com a geração do código a partir das specs.

### 19.2 Localização e formato

- Arquivo único: `project-backlog/backlog.csv`.
- Codificação UTF-8, primeira linha de cabeçalho obrigatória.
- O arquivo deve ser importável pelo recurso **Import Work Items (CSV)** do Azure DevOps.
- As colunas devem corresponder a campos de work item do Azure DevOps (ver a referência de campos:
  https://learn.microsoft.com/en-us/azure/devops/boards/work-items/guidance/work-item-field). Foram escolhidos os campos
  mais relevantes e comuns aos tipos `Epic`, `Feature`, `Product Backlog Item` e `Task`, evitando campos dependentes de processo
  (ex.: `State`, `Area Path`, `Iteration Path`, `Acceptance Criteria`) para não gerar erros de importação; o estado inicial padrão é
  aplicado automaticamente.
- Colunas, nesta ordem exata:

```csv
Work Item Type,Title 1,Title 2,Title 3,Title 4,Priority,Activity,Tags,Assigned To,Description
```

### 19.3 Hierarquia e regras das colunas

#### 19.3.1 Estrutura hierárquica e integridade estrita

O backlog segue a hierarquia padrão de 4 níveis do Azure DevOps:

$$\text{Epic} \longrightarrow \text{Feature} \longrightarrow \text{Product Backlog Item} \longrightarrow \text{Task}$$

As seguintes regras de cardinalidade e dependência são obrigatórias:

1. **Multiplicidade:**
   - 1 `Epic` contém 1 ou mais `Feature`s.
   - 1 `Feature` contém 1 ou mais `Product Backlog Item`s.
   - 1 `Product Backlog Item` contém 1 ou mais `Task`s.
2. **Integridade estrita (sem itens órfãos):**
   - Nenhuma `Task` pode existir sem um `Product Backlog Item` pai.
   - Nenhum `Product Backlog Item` pode existir sem uma `Feature` pai.
   - Nenhuma `Feature` pode existir sem um `Epic` pai.
   - Todos os itens devem estar estritamente vinculados na árvore hierárquica.

#### 19.3.2 Padrão de identificação e título de cada nível

- **Epic (Nível 1):** representa o produto/sistema consolidado e sua versão de entrega.
  - **Identificação/Título:** deve ser obrigatoriamente composto pelo valor do campo `Produto/Sistema` do arquivo
    `requirements/main_requirements.md`, acrescido de ` - Versão ` e o valor do campo `Versão` (ex.: `Portal de Atendimento - Versão 1.0.0`).
- **Feature (Nível 2):** representa a funcionalidade/capacidade de negócio descrita nas especificações.
  - **Identificação/Título:** corresponde à spec que agrupa os itens de backlog e tarefas, no formato
    `{ID de 4 dígitos} - {Nome da Funcionalidade}` (ex.: `0001 - Gestão de solicitações`).
- **Product Backlog Item (Nível 3):** agrupador temático de atividades humanas dentro daquela funcionalidade
  (ex.: "Decisões de negócio pendentes", "Revisão e aprovação de specs", "Preparação de ambiente e integrações").
- **Task (Nível 4):** atividade humana acionável específica, executável por um membro da equipe
  (ex.: "Definir perfis de autorização (Q-001)", "Validar spec FE-0001").

#### 19.3.3 Regras de preenchimento das colunas

- **Work Item Type** (System, obrigatório): deve ser exatamente `Epic`, `Feature`, `Product Backlog Item` ou `Task`.
- **Title 1 / Title 2 / Title 3 / Title 4** (System, obrigatório): título da atividade, distribuído em colunas indentadas
  para criar o vínculo pai-filho na importação (ver seção 19.8):
  - Em linha de `Epic`: preencher `Title 1` (deixar `Title 2`, `Title 3` e `Title 4` vazios).
  - Em linha de `Feature`: preencher `Title 2` (deixar `Title 1`, `Title 3` e `Title 4` vazios).
  - Em linha de `Product Backlog Item`: preencher `Title 3` (deixar `Title 1`, `Title 2` e `Title 4` vazios).
  - Em linha de `Task`: preencher `Title 4` (deixar `Title 1`, `Title 2` e `Title 3` vazios).
  - Cada item filho deve aparecer **imediatamente abaixo** do seu respectivo item pai na sequência do arquivo.
- **Priority** (campo de planejamento): valor numérico de `1` a `4`, com o seguinte significado (alinhado à seção 16):
  - `1` = Crítica
  - `2` = Alta
  - `3` = Média
  - `4` = Baixa
- **Activity** (campo do processo Agile): classifica o tipo de trabalho. Aplica-se exclusivamente a `Task`; para `Epic`,
  `Feature` e `Product Backlog Item` deve ficar em branco. Use exatamente um dos valores permitidos:
  - `Deployment`
  - `Design`
  - `Development`
  - `Documentation`
  - `Requirements`
  - `Testing`
  - Orientação de uso para atividades humanas: decisões de negócio e revisão/aprovação de specs → `Requirements`;
    validação de modelo de dados e decisões de modelo → `Design`; preparação de ambiente, credenciais e integrações →
    `Deployment`; dados de homologação, cenários e validação de evidências → `Testing`; produção de documentação →
    `Documentation`; eventual codificação de apoio → `Development`.
- **Tags**: rótulos separados por ponto e vírgula (`;`) para agrupamento e filtro no Azure Boards. Recomenda-se incluir
  o tema (ex.: "Decisão de negócio", "Ambiente", "Revisão de spec") e as referências relacionadas (ex.: `Q-001`,
  `FE-0001`, `BE-0002`, `INT-005`). O vínculo pai-filho é criado pela indentação das colunas de título (ver seção 19.8);
  as Tags servem para agrupamento/filtro complementar.
- **Assigned To** (campo de atribuição): responsável pela atividade:
  - Para `Epic`, `Feature` e `Product Backlog Item`: **deve ser sempre deixado em branco**.
  - Para `Task`: **obrigatoriamente atribuído através de `project-backlog/team.md`** por correspondência direta entre o campo `Activity` da tarefa e o campo `Papel` do membro (ver seção 19.6). Para que o Azure DevOps resolva a identidade corretamente na importação, usar o formato `Nome <e-mail>` (ex.: `Ana Souza <ana.souza@mpms.mp.br>`). Se `team.md` não existir, ou não houver membro com o papel exigido, o campo deve ficar em branco.
- **Description** (System): descrição do que deve ser realizado, incluindo, quando aplicável, a spec, a questão em
  aberto ou a fonte relacionada, e o critério para considerar a atividade concluída.

### 19.4 Regras de conteúdo, qualidade e gatilhos de sincronização

- **Gatilho de sincronização obrigatória:** a cada criação, atualização ou descontinuação de uma spec (`spec.md`), o agente deve obrigatoriamente revisar e atualizar `project-backlog/backlog.csv`.
- **Ao registrar uma nova spec:**
  - Inserir a linha de `Feature` correspondente com o ID e título da spec, subordinada ao `Epic` do projeto.
  - Inserir os `Product Backlog Items` temáticos da funcionalidade (ex.: decisões pendentes, homologação, validação de regras).
  - Inserir as `Tasks` humanas necessárias, garantindo ao menos uma tarefa de revisão/aprovação caso a spec esteja em `Draft`.
- **Ao atualizar uma spec existente:**
  - Avaliar se novas questões em aberto (`specs/OPEN-QUESTIONS.md`) com criticidade crítica ou alta exigem inclusão de novas `Tasks`.
  - Avaliar se novas restrições, dependências de integração ou alterações de dados demandam novas `Tasks` de preparação técnica ou credenciais.
  - Atualizar o status, descrições ou critérios de conclusão das `Tasks` impactadas.
- **Regras gerais de qualidade:**
  - Toda questão crítica ou alta em `specs/OPEN-QUESTIONS.md` deve ter uma `Task` correspondente no backlog.
  - Toda spec em `Draft` deve ter ao menos uma `Task` de revisão/aprovação humana.
  - Integrações e restrições que exijam ação humana (credenciais, acessos, dados) devem gerar `Task`.
  - Anomalias registradas como risco devem gerar uma `Task` de decisão/validação humana (não uma correção silenciosa).
  - Campos que contenham vírgula ou quebras de linha devem ser envolvidos por aspas duplas, conforme o padrão CSV.
  - A hierarquia estrita `Epic` $\rightarrow$ `Feature` $\rightarrow$ `Product Backlog Item` $\rightarrow$ `Task` deve ser integralmente preservada a cada atualização.

### 19.5 Exemplo

```csv
Work Item Type,Title 1,Title 2,Title 3,Title 4,Priority,Activity,Tags,Assigned To,Description
Epic,Portal de Atendimento - Versão 1.0.0,,,,1,,,,,<b>Contexto:</b> Épico raiz representando o produto e versão.<br><b>Referências:</b> requirements/main_requirements.md
Feature,,0001 - Gestão de solicitações,,,1,,,,,<b>Contexto:</b> Funcionalidade de gestão de solicitações do cidadão.<br><b>Referências:</b> specs/frontend/0001-gestao-solicitacoes, specs/backend/0001-gestao-solicitacoes
Product Backlog Item,,,Decisões de negócio pendentes,,1,,Decisão de negócio; Q-001,,<b>Contexto:</b> Agrupa as decisões humanas que desbloqueiam a geração do código a partir das specs.<br><b>Passos:</b><ol><li>Acompanhar as tasks de decisão vinculadas.</li><li>Garantir resposta a toda questão crítica/alta.</li></ol><b>Referências:</b> specs/OPEN-QUESTIONS.md<br><b>Conclusão:</b> Todas as questões vinculadas respondidas e specs atualizadas.
Task,,,,Definir perfis de autorização (Q-001),2,Requirements,Decisão de negócio; Autorização; Q-001,Ana Souza <ana.souza@mpms.mp.br>,"<b>Contexto:</b> Os perfis/papéis de autorização do painel administrativo não estão definidos nas fontes.<br><b>Passos:</b><ol><li>Levantar os perfis de usuário.</li><li>Definir permissões por operação.</li><li>Registrar a decisão em OPEN-QUESTIONS.md.</li><li>Atualizar SEC-007 em BE-0002..0006 e FE-0002.</li></ol><b>Referências:</b> Q-001; BE-0002..0006; FE-0002<br><b>Conclusão:</b> Decisão registrada e specs atualizadas."
```

### 19.6 Arquivo `project-backlog/team.md` e atribuição por papel

O repositório contém o arquivo `project-backlog/team.md` que define os membros da equipe humana, seus identificadores
(e-mail) e seus papéis. O agente deve usá-lo para **preencher automaticamente a coluna `Assigned To` das `Tasks`**,
fazendo a correspondência direta entre o campo `Activity` da tarefa e o `Papel` do membro em `team.md`.

#### Formato de `project-backlog/team.md`

- Arquivo único: `project-backlog/team.md`, em Markdown.
- Deve conter uma tabela com as colunas: `Identificador (e-mail)`, `Nome` e `Papel`.
- O `Identificador (e-mail)` e `Nome` são usados no formato `Nome <e-mail>` na coluna `Assigned To` de `project-backlog/backlog.csv`.
- A identificação do **`Papel` deve ser equivalente aos valores canônicos do campo `Activity` de `Task`** do Azure DevOps:
  - `Requirements`
  - `Design`
  - `Deployment`
  - `Development`
  - `Documentation`
  - `Testing`

Exemplo:

```md
# Equipe

| Identificador (e-mail) | Nome | Papel |
|---|---|---|
| ana.souza@mpms.mp.br | Ana Souza | Requirements |
| bruno.lima@mpms.mp.br | Bruno Lima | Design |
| carla.dias@mpms.mp.br | Carla Dias | Development |
| diego.melo@mpms.mp.br | Diego Melo | Development |
| ana.paula@mpms.mp.br | Ana Paula | Deployment |
| joao.reis@mpms.mp.br | João Reis | Documentation |
| lia.matos@mpms.mp.br | Lia Matos | Testing |
```

#### Papéis canônicos e responsabilidade sobre as atividades humanas

| Papel (`team.md`) / Activity (`Task`) | Responsabilidade nas atividades humanas |
|---|---|
| `Requirements` | Decisões de negócio, esclarecimento de dúvidas (`OPEN-QUESTIONS.md`), revisão e aprovação funcional de specs |
| `Design` | Validação de modelo de dados, decisões conceituais de arquitetura e padrões conceituais de interface |
| `Deployment` | Preparação de ambientes, provisionamento de credenciais, configuração de acessos e integrações (`INT-XXX`) |
| `Testing` | Definição de dados de homologação, criação de cenários de teste e validação de evidências |
| `Documentation` | Produção, validação e revisão de artefatos documentais normativos |
| `Development` | Apoio técnico de codificação preliminar, scaffolds e provas de conceito |

#### Algoritmo de atribuição

1. Para itens do tipo **`Epic`**, **`Feature`** e **`Product Backlog Item`**: deixar a coluna `Assigned To` **em branco**.
2. Para itens do tipo **`Task`**:
   - Obter o valor do campo `Activity` da `Task` (`Requirements`, `Design`, `Deployment`, `Development`, `Documentation` ou `Testing`).
   - Localizar em `team.md` o(s) membro(s) cujo `Papel` seja idêntico ao `Activity` da `Task`.
   - Preencher `Assigned To` no formato `Nome <e-mail>`.
   - Se houver mais de um membro com o mesmo `Papel` (ex.: múltiplos membros em `Development`), distribuir as tarefas daquele papel de forma equilibrada (*round-robin*), preservando a ordem declarada no `team.md`.
3. Se `team.md` não existir, ou não houver membro cadastrado com o `Papel` correspondente ao `Activity` da tarefa, deixar `Assigned To` em branco e registrar a lacuna como observação (não inventar membros nem e-mails).
4. Reatribuir sempre que `team.md` ou o conjunto de atividades for alterado.

### 19.7 Formatação de descrições no Azure DevOps

Para preservar a legibilidade no Azure DevOps:
- A coluna `Description` deve conter tags HTML simples (`<b>`, `<br>`, `<ol>`, `<li>`, `<ul>`, `<code>`) para formatar seções, passos e referências.
- Todo texto que contiver quebra de linha ou vírgula deve estar entre aspas duplas no padrão CSV.

### 19.8 Vínculo hierárquico (Epic → Feature → Product Backlog Item → Task) na importação

No Azure DevOps, a coluna `Parent` **é ignorada** na importação por CSV — não é possível vincular um filho ao pai
informando o ID do pai. O método oficial para importar a árvore hierárquica completa já vinculada é a **indentação de colunas de
título** (`Title 1`, `Title 2`, `Title 3`, `Title 4`). Referência:
https://learn.microsoft.com/en-us/azure/devops/boards/queries/import-work-items-from-csv#tree-items

#### Como estruturar o CSV

- Utilizar 4 colunas de título: `Title 1` (Epic), `Title 2` (Feature), `Title 3` (Product Backlog Item) e `Title 4` (Task).
- Em cada linha de `Epic`: preencher `Title 1` e deixar `Title 2`, `Title 3` e `Title 4` vazios.
- Em cada linha de `Feature`: deixar `Title 1` vazio, preencher `Title 2`, e deixar `Title 3` e `Title 4` vazios.
- Em cada linha de `Product Backlog Item`: deixar `Title 1` e `Title 2` vazios, preencher `Title 3`, e deixar `Title 4` vazio.
- Em cada linha de `Task`: deixar `Title 1`, `Title 2` e `Title 3` vazios, e preencher `Title 4`.
- Cada item filho deve aparecer **imediatamente abaixo** do item pai ao qual pertence; o Azure DevOps vincula o item filho ao
  item pai mais próximo acima dele com nível de título imediatamente superior preenchido.
- **Não incluir a coluna `ID`** para itens novos (o Azure atribui os IDs ao salvar). Incluir `ID` em itens novos gera
  erro.
- **Não incluir a coluna `State`**: itens novos entram no estado inicial padrão (`New`).

#### Exemplo

```csv
Work Item Type,Title 1,Title 2,Title 3,Title 4,Priority,Activity,Tags,Assigned To,Description
Epic,Portal de Atendimento - Versão 1.0.0,,,,1,,,,,<b>Contexto:</b> Épico raiz representando o produto e versão.<br><b>Referências:</b> requirements/main_requirements.md
Feature,,0001 - Gestão de solicitações,,,1,,,,,<b>Contexto:</b> Funcionalidade de gestão de solicitações.<br><b>Referências:</b> specs/frontend/0001-gestao-solicitacoes, specs/backend/0001-gestao-solicitacoes
Product Backlog Item,,,Decisões de negócio pendentes,,1,,Decisão de negócio; Q-001,,<b>Contexto:</b> Agrupa decisões humanas para desbloquear o desenvolvimento.<br><b>Referências:</b> specs/OPEN-QUESTIONS.md
Task,,,,Definir perfis de autorização (Q-001),2,Requirements,Decisão de negócio; Autorização; Q-001,Ana Souza <ana.souza@mpms.mp.br>,"<b>Contexto:</b> Perfis não definidos.<br><b>Passos:</b><ol><li>Levantar perfis.</li><li>Registrar em OPEN-QUESTIONS.md.</li></ol><b>Referências:</b> Q-001"
Task,,,,Definir política de retenção/LGPD (Q-002),2,Requirements,Decisão de negócio; LGPD; Q-002,João Reis <joao.reis@mpms.mp.br>,"<b>Contexto:</b> Política de retenção não documentada.<br><b>Passos:</b><ol><li>Consultar encarregado.</li><li>Registrar em OPEN-QUESTIONS.md.</li></ol><b>Referências:</b> Q-002"
```

#### Observações

- A importação é feita em **Boards > Queries > Import work items**; os itens entram sem ID, em estado não salvo, para
  revisão antes de salvar.
- Para preservar a formatação HTML da `Description`, manter as tags HTML na célula (ver seção 19.7).
- Identidades em `Assigned To` devem usar o formato `Nome <e-mail>`; se o Azure não reconhecer a identidade, o campo é
  sinalizado como erro e deve ser corrigido antes de salvar.
- Limite de 1000 itens por importação; dividir em múltiplos arquivos se necessário.
