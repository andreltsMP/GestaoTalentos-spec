# Spec Backend — Busca de Talentos

## Metadados

- ID funcional: 0003
- Contexto: Backend
- Status: Draft
- Criado em: 2026-08-27
- Última atualização: 2026-08-27
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Spec frontend relacionada: `specs/frontend/0003-busca-de-talentos/spec.md`
- Questões em aberto: Q-013
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

Capacidade de busca de servidores por múltiplos filtros (formação, curso, competências, lotação, idiomas), com cálculo de percentual de correspondência e suporte a ordenação por diferentes critérios.

## Objetivo de backend

Retornar, de forma performática, os servidores aderentes aos filtros aplicados, ordenados conforme o critério solicitado, sem expor servidores com 0% de correspondência.

## Escopo incluído

- Consulta de servidores com filtros combináveis: área de formação, nível de formação, curso, competências, lotação, idiomas.
- Cálculo do percentual de correspondência de cada servidor em relação aos filtros aplicados (fórmula pendente — Q-013).
- Ocultação de servidores com 0% de correspondência quando mais de um filtro é aplicado.
- Suporte a ordenação por Correspondência, Lotação, Alfabético e Nível de Formação, com critério principal e secundário.

## Escopo não incluído

- Armazenamento dos dados de perfil, formação e cursos (specs backend 0001 e 0002, consumidos aqui como fonte de leitura).
- Regras de edição de perfil.

## Capacidades de negócio

| ID | Capacidade | Origem |
|---|---|---|
| CAP-001 | Buscar servidores por filtros combinados | REQ-FUNC-012 |
| CAP-002 | Calcular percentual de correspondência por servidor | REQ-FUNC-013 |
| CAP-003 | Ordenar resultados por critério principal e secundário | REQ-FUNC-014 |

## Requisitos funcionais

| ID | Requisito | Origem |
|---|---|---|
| RF-001 | O sistema deve permitir busca de servidores combinando múltiplos filtros (formação, curso, competências, lotação, idiomas) com seleção múltipla em cada filtro | REQ-FUNC-012 |
| RF-002 | O sistema deve calcular o percentual de correspondência de cada servidor retornado, quando mais de um filtro for aplicado | REQ-FUNC-013 |
| RF-003 | O sistema deve excluir do resultado servidores com 0% de correspondência | REQ-RN-013 |
| RF-004 | O sistema deve suportar ordenação dos resultados por Correspondência, Lotação, Alfabético e Nível de Formação, com um critério principal (última escolha) e um secundário (escolha anterior) | REQ-RN-014 |

## Regras de negócio

| ID | Regra | Origem |
|---|---|---|
| RN-001 | O percentual de correspondência é calculado apenas quando mais de um filtro é selecionado; com um único filtro, o resultado é binário (atende/não atende) | REQ-RN-013 |
| RN-002 | A fórmula exata de cálculo do percentual está pendente de definição (Q-013); até a decisão, nenhuma implementação deve assumir peso arbitrário entre filtros | Q-013 |

## Segurança, privacidade e auditoria

| ID | Requisito | Origem |
|---|---|---|
| SEC-001 | Autenticação exclusiva via SSO institucional | REQ-SEC-001 |
| PRIV-001 | A busca deve retornar apenas dados de perfil já classificados como públicos internamente (mesmo conjunto exposto na consulta de leitura da spec 0001) | REQ-PRIV-002 |
| AUD-001 | Consultas de busca com resultado (>0% de correspondência) devem ser passíveis de auditoria conforme política geral de logs de acesso | REQ-PRIV-001 |

## Dados e integrações

### Dados relevantes

| ID | Entidade ou dado | Necessidade de negócio | Origem |
|---|---|---|---|
| DATA-001 | Índice de busca (formação, curso, competências, lotação, idiomas) | Permite filtragem eficiente sobre os dados de perfil (spec 0001) e cursos (spec 0002) | REQ-FUNC-012 |

### Integrações

Nenhuma integração externa é necessária para esta funcionalidade.

## Operações esperadas

| ID | Operação | Resultado esperado | Origem |
|---|---|---|---|
| OP-001 | Buscar servidores por filtros combinados | Lista de servidores com percentual de correspondência, ordenada conforme critério solicitado | REQ-FUNC-012, REQ-FUNC-013, REQ-FUNC-014 |

## Requisitos não funcionais

| ID | Requisito | Origem |
|---|---|---|
| RNF-001 | O sistema deve suportar até 2.000 servidores cadastrados e responder à busca (com filtros aplicados) em até 3 segundos | REQ-RNF-001 |
| RNF-002 | O sistema deve estar disponível 24/7, com RPO diário e RTO de até 24 horas | REQ-RNF-002 |

## Critérios de aceite de backend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-BE-001 | Busca com múltiplos filtros retorna somente servidores com correspondência maior que 0% | RF-003, RN-001 |
| CA-BE-002 | Resposta da busca (até 2.000 servidores cadastrados) ocorre em até 3 segundos | RNF-001 |
| CA-BE-003 | Alteração do critério de ordenação reordena corretamente com principal/secundário | RF-004 |

## Dependências

| Tipo | Dependência | Impacto | Situação |
|---|---|---|---|
| Negócio | Fórmula de cálculo do percentual de correspondência (Q-013) | Bloqueia implementação de RF-002/RN-001 com precisão | Pendente de decisão humana |
| Funcionalidade | Specs backend 0001 e 0002 (dados de perfil e cursos) | Fonte de dados para indexação da busca | Ativa |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-013 | Qual a fórmula exata de cálculo do percentual de correspondência? | Bloqueia a implementação de RF-002 até definição | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| RF-001 | REQ-FUNC-012 | SRC-MAIN-001, RF-012 |
| RF-002, RN-001 | REQ-FUNC-013, REQ-RN-013 | SRC-MAIN-001, RF-013, RN-013 |
| RF-004 | REQ-RN-014 | SRC-MAIN-001, RN-014 |
| RNF-001 | REQ-RNF-001 | SRC-MAIN-001, RNF-001 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-012 a RF-014, RN-013, RN-014) | Agente |
