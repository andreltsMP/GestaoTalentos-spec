# Geração de Specs de Frontend e Backend a partir de Requisitos

## Sobre este repositório

Este repositório utiliza **Specification-Driven Development (SDD)**.

Nesta etapa, o agente analisa os requisitos e os artefatos de apoio presentes em
`requirements/` para criar especificações estruturadas, rastreáveis, verificáveis
e separadas por contexto de implementação em `specs/frontend/` e
`specs/backend/`.

O escopo desta etapa é exclusivamente:

1. Consumir os documentos de requisitos.
2. Identificar regras, restrições, dependências e lacunas.
3. Catalogar os requisitos extraídos.
4. Gerar specs de frontend e backend.
5. Manter rastreabilidade entre requisitos, artefatos e specs.
6. Registrar dúvidas, conflitos e decisões pendentes.

> **Fora de escopo nesta etapa:** implementar código, criar banco de dados,
> criar APIs, configurar infraestrutura ou modificar sistemas externos. As
> especificações produzidas aqui orientam os futuros projetos de frontend e
> backend.

## Estrutura do repositório

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

## Responsabilidade de cada diretório

### `requirements/`

Contém a fonte documental utilizada para criação das specs, em dois níveis de
prioridade: `main_requirements.md` (principal e mandatório) e `artifacts/`
(complementar).

**`requirements/main_requirements.md`** — documento principal e mandatório do
projeto. Deve ser sempre lido antes de qualquer artefato em
`requirements/artifacts/` e possui precedência sobre os documentos auxiliares.

**`requirements/artifacts/`** — documentos de apoio (Markdown, TXT, PDF, DOCX,
planilhas, atas, regras de negócio, protótipos, políticas, normas, manuais,
e-mails, entre outros) que detalham requisitos do documento principal,
identificam regras de negócio, exceções, restrições, requisitos de segurança,
privacidade, auditoria, integrações e entidades, além de dúvidas, dependências
e conflitos. Documentos de apoio **não podem** reduzir, remover ou contradizer
silenciosamente um requisito mandatório; conflitos devem ser registrados em
`specs/OPEN-QUESTIONS.md`.

### `specs/`

Contém as especificações produzidas a partir de `requirements/`, organizadas
por contexto de implementação (`frontend/` e `backend/`). Ambos os contextos
derivam dos mesmos requisitos de origem, mas cada um registra apenas os
comportamentos, responsabilidades e critérios de aceite aplicáveis à sua camada.

**`specs/frontend/`** — specs orientadas à experiência, fluxo e interface:
telas e jornadas, componentes, estados de carregamento/vazio/erro/sucesso,
validações de entrada, mensagens, regras de apresentação, acessibilidade,
responsividade, navegação, interações com APIs previstas e critérios de aceite
verificáveis pela interface.

**`specs/backend/`** — specs orientadas a capacidades de servidor, regras de
negócio, dados, segurança, integrações e contratos: serviços e capacidades,
autenticação e autorização, operações/consultas/comandos, contratos de API em
nível funcional, entidades de domínio, integrações externas, auditoria e logs,
requisitos de segurança e privacidade e critérios de aceite verificáveis por
serviços, APIs ou integrações.

## Hierarquia de fontes de verdade

A prioridade das fontes obedece à seguinte ordem:

1. `requirements/main_requirements.md`
2. Documentos em `requirements/artifacts/`
3. Decisões humanas formalmente registradas em `specs/OPEN-QUESTIONS.md`
4. `specs/REQUIREMENTS-CATALOG.md`
5. Specs já criadas em `specs/frontend/` e `specs/backend/`
6. Roadmaps em `specs/`

**Regras de precedência:**

- `main_requirements.md` contém os requisitos mandatórios.
- Artefatos complementam, detalham ou contextualizam os requisitos principais.
- Nenhum artefato pode invalidar requisito mandatório sem decisão humana explícita.
- Nenhuma spec pode alterar um requisito de origem sem registrar a origem e a
  decisão que justifica a alteração.
- Conflitos entre documentos devem ser registrados como dúvida em
  `specs/OPEN-QUESTIONS.md`, sem escolha silenciosa de interpretação.
- Decisões humanas que resolvem dúvidas devem ser mantidas no histórico de
  `specs/OPEN-QUESTIONS.md`.

## Regras obrigatórias

### Preservação dos documentos de origem

- Nunca alterar, renomear, mover ou excluir arquivos em `requirements/`.
- Nunca alterar `requirements/main_requirements.md` nem os arquivos de
  `requirements/artifacts/`.
- Nunca resumir ou reescrever um documento de origem no próprio arquivo.
- Nunca assumir que um artefato mais recente invalida automaticamente outro.
- Sempre informar arquivo, seção, página, item ou trecho utilizado como fonte.
- Sempre registrar se um requisito veio de `main_requirements.md` ou de um
  documento complementar.

### Obrigatoriedade do `main_requirements.md`

Antes de criar, alterar, dividir ou descontinuar uma spec, o agente deve lê-lo
integralmente, identificar os requisitos mandatórios relacionados, garantir a
cobertura na spec, verificar regras adicionais nos artefatos, registrar os
requisitos mandatórios no catálogo com origem explícita e nunca colocar um
requisito mandatório em "fora de escopo" sem decisão humana formal registrada.

### Não inventar requisitos

O agente pode extrair, normalizar e classificar requisitos; identificar
dependências e inconsistências; separar requisitos em specs coesas; derivar
critérios de aceite; e formular perguntas objetivas.

O agente **não pode** inventar regras de negócio ausentes, assumir perfis ou
permissões não documentadas, definir limites de desempenho, prazos, SLAs ou
metas sem fonte explícita, escolher tecnologias/frameworks/bancos/fornecedores,
criar decisões de arquitetura, definir contratos técnicos completos de API sem
base documental, interpretar desejo/hipótese como requisito aprovado ou marcar
dúvida crítica como resolvida sem decisão humana documentada.

### Tratamento de incerteza

Quando uma informação não estiver clara: registrar a informação disponível com
fonte e referência, explicar a ambiguidade/lacuna/conflito, informar o impacto
(frontend, backend ou ambos), criar uma pergunta objetiva em
`specs/OPEN-QUESTIONS.md`, indicar a spec afetada e manter a spec como `Draft`
ou `Blocked` quando a dúvida for crítica. Lacunas de negócio, segurança, dados,
privacidade, autorização ou integração nunca são preenchidas com suposições
silenciosas.

## Fluxo de trabalho para criação de specs

1. **Leitura obrigatória** de `requirements/main_requirements.md`, identificando
   objetivos, requisitos mandatórios, escopo, atores, regras, critérios,
   integrações, restrições, dependências e pontos de detalhamento.
2. **Inventário dos artefatos** em `requirements/artifacts/`, registrando nome,
   tipo, data, versão, autor/área, assunto, relação com os requisitos
   mandatórios e potenciais conflitos.
3. **Extração e classificação** das informações (funcionais, não funcionais,
   regras de negócio, segurança, privacidade, integração, dados, auditoria,
   restrições, premissas, dependências, critérios de aceite e questões em
   aberto), atribuindo identificador estável a cada requisito.
4. **Normalização e catálogo** em `specs/REQUIREMENTS-CATALOG.md`, com
   identificador, tipo, descrição, prioridade de origem, fonte, referência,
   contexto aplicável (frontend, backend ou ambos), status e specs relacionadas.
5. **Decomposição por funcionalidade e contexto**: avaliar a necessidade de
   spec somente de frontend, somente de backend, de ambos com o mesmo
   identificador, ou de nenhuma, com justificativa.
6. **Criação das specs** em `specs/frontend/000X-nome/spec.md` e
   `specs/backend/000X-nome/spec.md`.
7. **Atualização dos roadmaps**: `specs/ROADMAP.md` (macro), além de
   `specs/frontend/ROADMAP.md` e `specs/backend/ROADMAP.md` (ordem por contexto).

## Estados das specs

| Estado | Significado |
|---|---|
| `Draft` | Em elaboração ou com lacunas relevantes. |
| `Review Required` | Elaborada e aguardando revisão humana. |
| `Approved` | Revisada e aprovada para planejamento ou implementação. |
| `Blocked` | Possui impedimento, conflito ou dependência não resolvida. |
| `Deprecated` | Cancelada, substituída ou deixou de ser aplicável. |

Uma spec só passa para `Approved` com instrução explícita de aprovação humana
ou mecanismo formal definido pelo projeto.

## Convenções de identificação

### Prefixos de requisitos no catálogo

| Prefixo | Uso |
|---|---|
| `REQ-FUNC-XXX` | Requisito funcional |
| `REQ-RNF-XXX` | Requisito não funcional |
| `REQ-RN-XXX` | Regra de negócio |
| `REQ-UI-XXX` | Requisito específico de interface |
| `REQ-SEC-XXX` | Requisito de segurança |
| `REQ-PRIV-XXX` | Requisito de privacidade ou LGPD |
| `REQ-INT-XXX` | Requisito de integração |
| `REQ-DATA-XXX` | Requisito de dados |
| `REQ-AUD-XXX` | Requisito de auditoria |
| `REQ-RES-XXX` | Restrição |
| `REQ-PREM-XXX` | Premissa |

### Status de requisitos

`Extraído`, `Em análise`, `Validado`, `Rejeitado`, `Substituído`,
`Coberto por spec` e `Implementado` (reservado para futura fase de
desenvolvimento).

### Identificadores de funcionalidades

- Quatro dígitos, sequenciais e nunca reutilizados.
- Mantidos mesmo se a spec for cancelada ou substituída.
- Compartilhados por frontend e backend quando ambos implementarem a mesma
  capacidade de negócio (mesmo ID nos dois contextos).

## Consistência entre frontend e backend

Quando uma funcionalidade tiver specs nos dois contextos:

1. Utilizar o mesmo ID funcional nas duas specs.
2. Manter referência cruzada entre a spec de frontend e a de backend.
3. Garantir que ambas apontem para os mesmos requisitos de origem aplicáveis.
4. Garantir que os critérios de aceite não sejam contraditórios.
5. Registrar dependências do frontend em relação às capacidades do backend.
6. Registrar regras de segurança e autorização na spec de backend, mesmo
   quando seus efeitos precisem ser tratados pela interface.
7. Não duplicar regras de negócio sem necessidade.
8. Diferenciar claramente responsabilidade de apresentação e de aplicação de
   regras.
9. Registrar em `OPEN-QUESTIONS.md` toda lacuna que impeça a compatibilização
   entre interface e serviços.

## Qualidade das specs

Antes de marcar uma spec como `Review Required`, o agente verifica:

- `main_requirements.md` foi lido e os requisitos mandatórios aplicáveis cobertos.
- Artefatos relevantes foram analisados e toda origem é rastreável
  (principal ou complementar).
- Requisitos ambíguos viraram perguntas; não há decisões de negócio inventadas.
- Escopo incluído/não incluído estão claros; requisitos funcionais são
  observáveis; regras de negócio estão separadas dos requisitos funcionais.
- Segurança, privacidade, auditoria, integração e dados foram avaliados.
- Critérios de aceite são verificáveis; dependências e conflitos foram
  registrados; dúvidas críticas foram destacadas.
- Rastreabilidade entre fonte, catálogo e spec está preenchida; a spec está
  classificada corretamente como frontend, backend ou ambos.
- Roadmaps global e específicos foram atualizados.

## Encerramento de sessão

Antes de encerrar uma sessão, o agente atualiza:

1. `specs/REQUIREMENTS-CATALOG.md`
2. Specs de frontend e backend criadas ou modificadas
3. `specs/OPEN-QUESTIONS.md`
4. `specs/ROADMAP.md`
5. `specs/frontend/ROADMAP.md` (quando houver impacto de frontend)
6. `specs/backend/ROADMAP.md` (quando houver impacto de backend)
7. Registro de uma próxima ação objetiva no checkpoint do roadmap global

## Resultado esperado

Ao finalizar o consumo dos documentos em `requirements/`, o repositório possui:

- `requirements/main_requirements.md` preservado como fonte mandatória.
- Artefatos complementares preservados em `requirements/artifacts/`.
- Catálogo único de requisitos extraídos e rastreáveis, com identificação
  explícita da prioridade de cada fonte.
- Lista de dúvidas, conflitos e decisões pendentes.
- Roadmaps global, de frontend e de backend.
- Specs separadas em `specs/frontend/` e `specs/backend/`.
- Rastreabilidade entre requisitos mandatórios, artefatos, specs de frontend e
  specs de backend.
- Specs claras, auditáveis, sem requisitos inventados e prontas para revisão
  humana.

## Navegação rápida

| Arquivo | Conteúdo |
|---|---|
| `AGENTS.md` | Regras e fluxo de trabalho deste repositório |
| `requirements/main_requirements.md` | Requisitos principais e mandatórios |
| `requirements/artifacts/` | Documentos de apoio aos requisitos |
| `specs/REQUIREMENTS-CATALOG.md` | Catálogo único de requisitos extraídos |
| `specs/OPEN-QUESTIONS.md` | Dúvidas em aberto e decisões respondidas |
| `specs/ROADMAP.md` | Roadmap global das funcionalidades |
| `specs/frontend/ROADMAP.md` | Ordem de elaboração das specs de frontend |
| `specs/backend/ROADMAP.md` | Ordem de elaboração das specs de backend |
