# Spec Backend — Perfil e Cadastro do Servidor

## Metadados

- ID funcional: 0001
- Contexto: Backend
- Status: Approved
- Criado em: 2026-08-27
- Última atualização: 2026-09-01 (aprovada)
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Spec frontend relacionada: `specs/frontend/0001-perfil-e-cadastro-do-servidor/spec.md`
- Questões em aberto: nenhuma (Q-016 resolvida em 2026-09-01)
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

Capacidades de servidor para armazenar, atualizar e disponibilizar o perfil profissional do servidor, e para conduzir o fluxo de validação de atualizações de cadastro por RH e pela Comissão de Gestão de Competências.

## Objetivo de backend

Garantir o armazenamento consistente do perfil do servidor, o controle de acesso (próprio perfil em edição, perfil de terceiros em leitura) e a integridade do fluxo de solicitação/validação de atualizações de cadastro.

## Escopo incluído

- Armazenamento do perfil do servidor: foto, nome, cargo, lotação (nome e cidade), formação acadêmica, cursos de capacitação, comissões, idiomas, competências e experiência profissional.
- Atualização do próprio perfil pelo servidor autenticado.
- Fluxo de solicitação e validação de atualizações de cadastro por RH e/ou Comissão de Gestão de Competências, com estados "aguardando validação", "aprovada", "recusada".
- Disponibilização de consulta de perfil de qualquer servidor (leitura), para uso pela funcionalidade de busca (spec 0003).
- Exclusão dos dados pessoais do servidor ao encerramento do vínculo com o MPMS, com anonimização dos registros de auditoria correlatos (PRIV-002, Q-016).

## Escopo não incluído

- Armazenamento de certificados de curso e regras de validação de curso/certificado (spec backend 0002).
- Regras de benefício (Qualificação/Progressão Funcional) (spec backend 0004).
- Regras de permuta de lotação (spec backend 0005).
- Cálculo de percentual de correspondência de busca (spec backend 0003).

## Capacidades de negócio

| ID | Capacidade | Origem |
|---|---|---|
| CAP-001 | Cadastrar o perfil completo de um servidor | REQ-FUNC-001 |
| CAP-002 | Atualizar dados do próprio perfil | REQ-FUNC-002 |
| CAP-003 | Conduzir fluxo de solicitação/validação de atualização de cadastro | REQ-FUNC-004 |
| CAP-004 | Disponibilizar consulta de perfil de qualquer servidor (leitura) | REQ-FUNC-015 |

## Requisitos funcionais

| ID | Requisito | Origem |
|---|---|---|
| RF-001 | O sistema deve armazenar o perfil do servidor com todos os campos: foto, nome, cargo, lotação (nome e cidade), formação acadêmica, cursos de capacitação, comissões que integra, idiomas, competências e experiência profissional | REQ-FUNC-001 |
| RF-002 | O sistema deve permitir que o servidor autenticado atualize os próprios dados de perfil | REQ-FUNC-002 |
| RF-003 | O sistema deve rotear atualizações de campos sujeitos a validação para RH ou para a Comissão de Gestão de Competências, conforme o tipo de campo | REQ-FUNC-004 |
| RF-004 | O sistema deve manter o status de cada solicitação de atualização como "aguardando validação", "aprovada" ou "recusada" | REQ-FUNC-004 |
| RF-005 | O sistema deve disponibilizar consulta somente leitura do perfil de qualquer servidor para usuários autenticados | REQ-FUNC-015 |

## Regras de negócio

| ID | Regra | Origem |
|---|---|---|
| RN-001 | Somente o próprio servidor pode editar seus dados de perfil; demais usuários acessam apenas em modo leitura | REQ-SEC-001 |
| RN-002 | Um item em status "aguardando validação" não pode ser editado novamente até a resolução da solicitação em curso | REQ-FUNC-004 |

## Segurança, privacidade e auditoria

| ID | Requisito | Origem |
|---|---|---|
| SEC-001 | Autenticação exclusiva via SSO institucional (Active Directory); nenhuma senha local deve ser armazenada para servidores | REQ-SEC-001 |
| SEC-002 | O servidor autenticado só pode alterar seu próprio registro de perfil; tentativas de alteração de registro de terceiros devem ser rejeitadas | RN-001 |
| PRIV-001 | Dados pessoais do servidor (foto, nome, cargo, lotação, formação, experiência) devem ser tratados em conformidade com a LGPD | REQ-PRIV-002 |
| PRIV-002 | Retenção (Q-016): dados pessoais do servidor são mantidos somente enquanto houver vínculo ativo com o MPMS. Ao encerramento do vínculo, os dados pessoais são excluídos; os registros da trilha de auditoria que os referenciam são anonimizados (não removidos), preservando data/hora, decisão e autor institucional sem PII | REQ-PRIV-002 |
| AUD-001 | Toda aprovação/recusa de solicitação de atualização de cadastro deve ser registrada em trilha de auditoria, identificando autor (RH/Comissão), data/hora e decisão. Os registros são preservados após o encerramento do vínculo do servidor, de forma anonimizada quanto à PII do servidor desligado (PRIV-002) | REQ-AUD-001 |
| AUD-002 | Todo acesso de leitura ao perfil de um servidor por outro usuário deve ser registrado em log de acesso a dados sensíveis | REQ-PRIV-001 |

## Dados e integrações

### Dados relevantes

| ID | Entidade ou dado | Necessidade de negócio | Origem |
|---|---|---|---|
| DATA-001 | Servidor (perfil) | Entidade central: foto, nome, cargo, lotação, idiomas, competências, experiência | REQ-FUNC-001 |
| DATA-002 | Lotação | Nome e cidade, usada no perfil e como base para permutas (spec 0005) | REQ-FUNC-001 |
| DATA-003 | Solicitação de atualização de cadastro | Registro de cada solicitação, seu status e histórico | REQ-FUNC-004 |

### Integrações

Nenhuma integração externa é necessária para esta funcionalidade além da autenticação SSO institucional (SEC-001), já registrada como requisito transversal.

## Operações esperadas

| ID | Operação | Resultado esperado | Origem |
|---|---|---|---|
| OP-001 | Consultar perfil do servidor autenticado | Retorna todos os campos do perfil próprio | REQ-FUNC-001 |
| OP-002 | Atualizar campo de perfil não sujeito a validação | Campo é refletido imediatamente | REQ-FUNC-002 |
| OP-003 | Enviar campo de perfil sujeito a validação | Cria solicitação com status "aguardando validação", direcionada a RH ou Comissão | REQ-FUNC-004 |
| OP-004 | Validar (aprovar/recusar) uma solicitação de atualização | Atualiza o status da solicitação e, se aprovada, aplica a alteração ao perfil | REQ-FUNC-004 |
| OP-005 | Consultar perfil de um servidor por identificador | Retorna dados de perfil em modo leitura | REQ-FUNC-015 |

## Requisitos não funcionais

| ID | Requisito | Origem |
|---|---|---|
| RNF-001 | O sistema deve suportar até 2.000 servidores cadastrados | REQ-RNF-001 |
| RNF-002 | O sistema deve estar disponível 24/7, com RPO diário e RTO de até 24 horas | REQ-RNF-002 |

## Critérios de aceite de backend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-BE-001 | Servidor autenticado consulta e atualiza somente o próprio perfil | RF-002, RN-001 |
| CA-BE-002 | Tentativa de edição de perfil de terceiro é bloqueada | SEC-002 |
| CA-BE-003 | Toda aprovação/recusa de solicitação gera registro de auditoria com autor, data/hora e decisão | AUD-001 |
| CA-BE-004 | Consulta de perfil de terceiro retorna dados em modo leitura e gera log de acesso | AUD-002, RF-005 |

## Dependências

| Tipo | Dependência | Impacto | Situação |
|---|---|---|---|
| Integração | Provedor de SSO institucional (Active Directory) | Necessário para autenticação de todos os usuários | Pendente de credenciais/acesso (ver backlog) |
| Negócio | Política de retenção/exclusão de dados LGPD (Q-016) | Define regras de retenção e exclusão do perfil | Resolvida em 2026-09-01 — retenção enquanto vínculo ativo; exclusão dos dados pessoais e anonimização da auditoria ao encerrar o vínculo (ver PRIV-002) |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| — | Nenhuma. Q-016 resolvida em 2026-09-01 (ver `docs/specs/OPEN-QUESTIONS.md`). | — | — |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| RF-001 | REQ-FUNC-001 | SRC-MAIN-001, RF-001 |
| RF-003, RF-004 | REQ-FUNC-004 | SRC-MAIN-001, RF-004 |
| AUD-001 | REQ-AUD-001 | SRC-MAIN-001, RNF-004 |
| SEC-001 | REQ-SEC-001 | SRC-MAIN-001, INT-002 |
| PRIV-001 | REQ-PRIV-002 | SRC-MAIN-001, RES-001 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-001 a RF-004, RF-015) | Agente |
| 2026-09-01 | Incorporação da decisão Q-016 (retenção/exclusão LGPD): PRIV-002, ajuste de AUD-001, escopo e dependências; status Draft → Review Required | Decisão humana (sessão de planejamento) | Agente |
| 2026-09-01 | Spec aprovada; status Review Required → Approved. Pronta para implementação (ver `docs/specs/backend/PLANO-DE-IMPLEMENTACAO.md`) | Decisão humana | Agente |
| 2026-09-01 | Implementação da Fase 1: entidades `Servidor`/`Lotacao`/`ExperienciaProfissional`/`ParticipacaoComissao`/`SolicitacaoAtualizacaoCadastro`, migration `V2`, endpoints OP-001..OP-005 + encerramento de vínculo (Q-016), RN-001/RN-002/SEC-002, AUD-001/AUD-002. 23 testes. Decisões de modelagem: identidade por `sub`, modelo misto, foto `bytea`, roteamento de validação configurável vazio | Sessão de implementação | Agente |
