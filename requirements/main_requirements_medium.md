# Requisitos Principais do Produto

> **Finalidade deste documento:** registrar os requisitos, premissas, restrições e decisões de negócio mandatórias que orientam a criação das especificações de desenvolvimento em `specs/frontend/` e `specs/backend/`.
>
> Este arquivo é a fonte principal de requisitos do projeto. Os documentos em `requirements/artifacts/` podem detalhar ou complementar seu conteúdo, mas não podem contradizê-lo, removê-lo ou reduzir seu escopo sem decisão humana formal registrada.

***

## 1. Controle do documento

| Campo                      | Valor                      |
| -------------------------- | -------------------------- |
| Produto/Sistema            | `[nome do produto]`        |
| Identificador do documento | `MAIN-REQ-001`             |
| Versão                     | `0.1.0`                    |
| Responsável técnico        | `[nome, área ou unidade]`  |
| Criado em                  | `[AAAA-MM-DD]`             |
| Última atualização         | `[AAAA-MM-DD]`             |
| Próxima revisão            | `[AAAA-MM-DD ou condição]` |

### Histórico de alterações

| Versão | Data           | Alteração                    | Responsável     | Decisão/Referência |
| ------ | -------------- | ---------------------------- | --------------- | ------------------ |
| 0.1.0  | `[AAAA-MM-DD]` | Criação inicial do documento | `[responsável]` | —                  |

***

## 2. Regras de governança

### 2.1 Precedência

A ordem de precedência das informações do projeto é:

1. Este arquivo: `requirements/main_requirements.md`.
2. Decisões humanas formalizadas em `specs/OPEN-QUESTIONS.md`.
3. Documentos em `requirements/artifacts/`.
4. Catálogo normalizado em `specs/REQUIREMENTS-CATALOG.md`.
5. Specs de frontend e backend.

### 2.2 Regras para criação de specs

* Todo requisito marcado como **Mandatório** deve ser analisado e rastreado nas specs aplicáveis.
* Requisitos deste arquivo não podem ser omitidos de uma spec sem justificativa explícita e decisão humana registrada.
* O agente pode melhorar redação e decompor requisitos, mas não pode alterar sua intenção de negócio.
* Lacunas, ambiguidades e conflitos devem ser registrados em `specs/OPEN-QUESTIONS.md`.
* Requisitos técnicos, escolhas de framework, banco de dados, nuvem, linguagem ou arquitetura não devem ser definidos aqui, salvo quando forem uma restrição institucional formal.
* Requisitos de frontend e backend devem manter o mesmo ID funcional quando representarem a mesma capacidade de negócio.

### 2.3 Convenções de identificação

| Prefixo   | Uso                                |
| --------- | ---------------------------------- |
| `OBJ-XXX` | Objetivo de negócio                |
| `RF-XXX`  | Requisito funcional mandatório     |
| `RNF-XXX` | Requisito não funcional mandatório |
| `RN-XXX`  | Regra de negócio                   |
| `INT-XXX` | Integração externa ou interna      |
| `Q-XXX`   | Questão em aberto                  |

***

## 3. Visão do produto

### 3.1 Problema ou oportunidade

`[Descreva o problema atual, a dor dos usuários, a necessidade institucional ou a oportunidade que o produto deve atender.]`

Exemplo:

> Atualmente, solicitações administrativas são recebidas por múltiplos canais e acompanhadas manualmente. Isso reduz a rastreabilidade, dificulta a distribuição de responsabilidades e impede uma visão confiável do status de cada solicitação.

### 3.2 Objetivo geral

`[Descreva o resultado principal esperado com o produto.]`

Exemplo:

> Centralizar o registro, encaminhamento, acompanhamento e auditoria de solicitações administrativas, permitindo que usuários autorizados acompanhem o ciclo de vida de suas demandas.

### 3.3 Objetivos de negócio

| ID      | Objetivo                | Prioridade | Como medir o sucesso                  |
| ------- | ----------------------- | ---------- | ------------------------------------- |
| OBJ-001 | `[objetivo mensurável]` | Alta       | `[indicador, resultado ou evidência]` |
| OBJ-002 | `[objetivo mensurável]` | Média      | `[indicador, resultado ou evidência]` |

### 3.4 Resultados esperados

* `[Resultado esperado para usuários.]`
* `[Resultado esperado para a área de negócio.]`
* `[Resultado esperado para governança, auditoria ou operação.]`

***

## 4. Contexto de negócio

### 4.1 Processo atual

`[Descreva resumidamente como o processo funciona hoje, incluindo canais, participantes, sistemas existentes e problemas conhecidos.]`

### 4.2 Processo futuro esperado

`[Descreva o processo que o software deve viabilizar, sem definir tecnologia ou arquitetura.]`

### 4.3 Glossário do domínio

| Termo     | Definição de negócio | Fonte ou responsável          |
| --------- | -------------------- | ----------------------------- |
| `[termo]` | `[definição]`        | `[área, documento ou pessoa]` |

### 4.4 Atores e partes interessadas

| Ator ou área        | Papel no processo                   | Necessidade principal | Tipo        |
| ------------------- | ----------------------------------- | --------------------- | ----------- |
| `[usuário]`         | `[ação ou responsabilidade]`        | `[necessidade]`       | Usuário     |
| `[área]`            | `[decisão, operação ou aprovação]`  | `[necessidade]`       | Stakeholder |
| `[sistema externo]` | `[origem ou destino de informação]` | `[integração]`        | Integração  |

***

## 5. Escopo do produto

### 5.1 Escopo incluído

Liste capacidades e entregas que fazem parte da iniciativa atual.

* `[Capacidade ou fluxo incluído.]`
* `[Capacidade ou fluxo incluído.]`
* `[Capacidade ou fluxo incluído.]`

### 5.2 Escopo não incluído

Liste explicitamente o que não faz parte da entrega. Isso evita que agentes incluam funcionalidades por inferência.

* `[Funcionalidade futura ou excluída.]`
* `[Integração não contemplada.]`
* `[Processo que continuará fora do sistema.]`

### 5.3 Limites de responsabilidade

| Item                    | Responsabilidade do produto | Fora da responsabilidade do produto            |
| ----------------------- | --------------------------- | ---------------------------------------------- |
| `[domínio ou processo]` | `[o que o sistema faz]`     | `[o que permanece manual ou em outro sistema]` |

***

## 6. Requisitos funcionais mandatórios

> Cada requisito deve descrever um comportamento observável. Evite frases vagas, como “o sistema deve ser intuitivo” ou “deve funcionar corretamente”.

| ID     | Requisito mandatório                  | Atores     | Prioridade | Contexto provável | Origem/justificativa |
| ------ | ------------------------------------- | ---------- | ---------- | ----------------- | -------------------- |
| RF-001 | `[O sistema deve permitir que ...]`   | `[atores]` | Crítica    | Ambos             | `[motivação]`        |
| RF-002 | `[O sistema deve ...]`                | `[atores]` | Alta       | Backend           | `[motivação]`        |
| RF-003 | `[A interface deve permitir que ...]` | `[atores]` | Alta       | Frontend          | `[motivação]`        |

### 6.1 Fluxos de negócio prioritários

#### Fluxo FB-001 — `[nome do fluxo]`

1. `[Ação inicial do ator.]`
2. `[Validação ou regra aplicável.]`
3. `[Resultado esperado.]`
4. `[Evento de encerramento ou mudança de estado.]`

#### Fluxo FB-002 — `[nome do fluxo]`

1. `[Ação inicial do ator.]`
2. `[Exceção, alternativa ou aprovação necessária.]`
3. `[Resultado esperado.]`

### 6.2 Exceções e cenários de erro relevantes

| ID      | Situação             | Comportamento esperado | Impacto     |
| ------- | -------------------- | ---------------------- | ----------- |
| EXC-001 | `[situação anormal]` | `[resposta esperada]`  | `[impacto]` |

***

## 7. Regras de negócio mandatórias

> Regras de negócio definem políticas, condições, cálculos, validações e restrições do domínio. Elas não devem depender de detalhes da interface ou da tecnologia.

| ID     | Regra de negócio | Aplicável a                    | Consequência se violada    | Fonte/justificativa |
| ------ | ---------------- | ------------------------------ | -------------------------- | ------------------- |
| RN-001 | `[regra]`        | `[processo, entidade ou ator]` | `[comportamento esperado]` | `[origem]`          |
| RN-002 | `[regra]`        | `[processo, entidade ou ator]` | `[comportamento esperado]` | `[origem]`          |

### 7.1 Estados e transições de negócio

Caso exista ciclo de vida de uma entidade, registre-o aqui.

| Estado atual | Evento ou condição | Próximo estado  | Quem pode executar | Regra relacionada |
| ------------ | ------------------ | --------------- | ------------------ | ----------------- |
| `[estado]`   | `[evento]`         | `[novo estado]` | `[ator]`           | RN-XXX            |

***

## 8. Integrações

> Registre apenas a necessidade de negócio da integração. Contratos técnicos, protocolos, autenticação técnica e detalhes de implementação pertencem às specs de backend e aos planos técnicos futuros.

| ID      | Sistema/serviço | Finalidade de negócio | Dados trocados          | Direção                    | Obrigatória? |
| ------- | --------------- | --------------------- | ----------------------- | -------------------------- | ------------ |
| INT-001 | `[sistema]`     | `[finalidade]`        | `[dados em alto nível]` | Entrada/Saída/Bidirecional | Sim/Não      |

### Regras de integração

* `[Regra de negócio ou operacional da integração.]`
* `[Regra de contingência ou comportamento em indisponibilidade.]`

***

## 9. Requisitos não funcionais mandatórios

> Requisitos não funcionais devem ser objetivos e verificáveis sempre que possível. Quando a métrica for desconhecida, registre uma questão em aberto, em vez de criar uma meta arbitrária.

### 9.1 Desempenho e capacidade

| ID      | Requisito                     | Métrica ou condição de validação                      | Prioridade |
| ------- | ----------------------------- | ----------------------------------------------------- | ---------- |
| RNF-001 | `[necessidade de desempenho]` | `[tempo, volume, quantidade de usuários ou condição]` | Alta       |

### 9.2 Disponibilidade e continuidade

| ID      | Requisito                          | Métrica ou condição de validação                | Prioridade |
| ------- | ---------------------------------- | ----------------------------------------------- | ---------- |
| RNF-002 | `[necessidade de disponibilidade]` | `[horário, contingência, RTO/RPO, se definido]` | Média      |

### 9.3 Usabilidade e acessibilidade

| ID      | Requisito                                        | Critério de validação    | Prioridade |
| ------- | ------------------------------------------------ | ------------------------ | ---------- |
| RNF-003 | `[necessidade de acessibilidade ou usabilidade]` | `[condição verificável]` | Alta       |

### 9.4 Observabilidade e suporte operacional

| ID      | Requisito                                         | Critério de validação                | Prioridade |
| ------- | ------------------------------------------------- | ------------------------------------ | ---------- |
| RNF-004 | `[logs, indicadores, alertas ou rastreabilidade]` | `[eventos ou informações esperadas]` | Média      |

***

## 10. Restrições obrigatórias

> Registre restrições institucionais, legais, operacionais ou tecnológicas já definidas. Não inclua preferências técnicas sem decisão formal.

| ID      | Restrição     | Tipo                                    | Justificativa | Impacto esperado |
| ------- | ------------- | --------------------------------------- | ------------- | ---------------- |
| RES-001 | `[restrição]` | Legal/Institucional/Operacional/Técnica | `[motivo]`    | `[impacto]`      |
| RES-002 | `[restrição]` | Legal/Institucional/Operacional/Técnica | `[motivo]`    | `[impacto]`      |

***

## 11. Questões em aberto

> Questões abertas não devem ser resolvidas por suposição. Elas devem ser sincronizadas com `specs/OPEN-QUESTIONS.md` durante a geração das specs.

| ID    | Pergunta              | Contexto                         | Impacto     | Responsável pela resposta | Criticidade | Status |
| ----- | --------------------- | -------------------------------- | ----------- | ------------------------- | ----------- | ------ |
| Q-001 | `[pergunta objetiva]` | `[requisito, fluxo ou entidade]` | `[impacto]` | `[área ou pessoa]`        | Alta        | Aberta |
| Q-002 | `[pergunta objetiva]` | `[requisito, fluxo ou entidade]` | `[impacto]` | `[área ou pessoa]`        | Média       | Aberta |

***

## 12. Referências e artefatos de apoio

> Registre os documentos que detalham, comprovam ou contextualizam este arquivo. Os arquivos devem existir em `requirements/artifacts/`.

| ID da fonte | Arquivo                                | Descrição     | Requisitos relacionados | Prioridade da fonte |
| ----------- | -------------------------------------- | ------------- | ----------------------- | ------------------- |
| SRC-ART-001 | `requirements/artifacts/[arquivo].md`  | `[descrição]` | RF-001, RN-001          | Complementar        |
| SRC-ART-002 | `requirements/artifacts/[arquivo].pdf` | `[descrição]` | SEC-001, AUD-001        | Complementar        |

***

## 13. Mapa de rastreabilidade esperado

Após a execução do agente, deve ser possível navegar no seguinte sentido:

```text
main_requirements.md
      ↓
requirements/artifacts/
      ↓
specs/REQUIREMENTS-CATALOG.md
      ↓
specs/frontend/000X-nome-da-funcionalidade/spec.md
specs/backend/000X-nome-da-funcionalidade/spec.md
      ↓
Planos, tarefas, código, testes e evidências de validação
```
