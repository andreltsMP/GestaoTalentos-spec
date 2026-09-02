# Spec Backend — Benefícios (Adicional de Qualificação e Progressão Funcional)

## Metadados

- ID funcional: 0004
- Contexto: Backend
- Status: Approved (entrega em 2 fatias — ver ADR 0001)
- Criado em: 2026-08-27
- Última atualização: 2026-09-01 (aprovada)
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Spec frontend relacionada: `specs/frontend/0004-beneficios-qualificacao-progressao/spec.md`
- Questões em aberto: Q-017 (contrato de integração com o Turmalina) — bloqueia apenas a fatia (ii); ver `docs/adr/0001-integracao-turmalina.md`
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

Capacidade de solicitar, ao RH, a utilização de um curso validado para Adicional de Qualificação ou Progressão Funcional, incluindo a validação da elegibilidade do curso, a decisão do RH e a atualização do status de utilização do curso, além da comunicação da aprovação ao sistema de RH institucional (Turmalina).

## Objetivo de backend

Garantir que apenas cursos elegíveis (validados e ainda não utilizados para a mesma finalidade) possam ser objeto de solicitação, e que a aprovação reflita corretamente o novo status do curso e seja comunicada ao Turmalina.

## Escopo incluído

- Solicitação de Adicional de Qualificação vinculada a curso de formação acadêmica elegível.
- Solicitação de Progressão Funcional vinculada a curso de formação acadêmica ou de capacitação elegível.
- Validação de elegibilidade do curso antes de aceitar a solicitação (RN-007).
- Decisão do RH (aprovar/recusar) e atualização do status do curso (RN-008).
- Notificação da aprovação ao Turmalina (INT-001).

## Escopo não incluído

- Cadastro e validação de curso/certificado (spec backend 0002, consumida aqui como fonte de elegibilidade).
- Cálculo ou pagamento do efeito financeiro do benefício (processado pelo Turmalina).
- Fluxo de permuta de lotação (spec backend 0005).

## Capacidades de negócio

| ID | Capacidade | Origem |
|---|---|---|
| CAP-001 | Solicitar Adicional de Qualificação sobre curso elegível | REQ-FUNC-008 |
| CAP-002 | Solicitar Progressão Funcional sobre curso elegível | REQ-FUNC-009 |
| CAP-003 | Validar (aprovar/recusar) solicitação de benefício | REQ-RN-008 |
| CAP-004 | Comunicar benefício aprovado ao Turmalina | REQ-INT-001 |

## Requisitos funcionais

| ID | Requisito | Origem |
|---|---|---|
| RF-001 | O sistema deve permitir que o servidor solicite Adicional de Qualificação sobre curso de formação com status "Não utilizado para qualificação" | REQ-FUNC-008 |
| RF-002 | O sistema deve permitir que o servidor solicite Progressão Funcional sobre curso (formação ou capacitação) com status "Não utilizado para progressão" | REQ-FUNC-009 |
| RF-003 | O sistema deve rejeitar solicitações sobre cursos já "Utilizado para qualificação" ou "Utilizado para progressão" | REQ-RN-007 |
| RF-004 | O sistema deve permitir que o RH aprove ou recuse a solicitação | REQ-RN-008 |
| RF-005 | Ao aprovar, o sistema deve atualizar o status de utilização do curso para "Utilizado para qualificação" ou "Utilizado para progressão", conforme o tipo de solicitação | REQ-RN-008 |
| RF-006 | Ao aprovar, o sistema deve comunicar o benefício concedido ao Turmalina | REQ-INT-001 |

## Regras de negócio

| ID | Regra | Origem |
|---|---|---|
| RN-001 | Solicitação só é aceita se o curso estiver validado e com status "Não utilizado" para a finalidade solicitada | REQ-RN-007 |
| RN-002 | Cursos de capacitação só podem gerar solicitação de Progressão Funcional, nunca de Qualificação | REQ-RN-009 |
| RN-003 | A comunicação ao Turmalina ocorre somente após a aprovação da solicitação pelo RH, nunca antes | REQ-INT-001 |

## Segurança, privacidade e auditoria

| ID | Requisito | Origem |
|---|---|---|
| SEC-001 | Autenticação exclusiva via SSO institucional | REQ-SEC-001 |
| SEC-002 | Apenas usuários com papel "RH" podem aprovar/recusar solicitações de benefício | REQ-FUNC-008 |
| PRIV-001 | Dados da solicitação de benefício devem ser tratados em conformidade com a LGPD | REQ-PRIV-002 |
| PRIV-002 | Retenção (Q-016): a solicitação de benefício é mantida enquanto o servidor tiver vínculo ativo com o MPMS. Ao encerramento do vínculo, os dados pessoais da solicitação são excluídos; os registros da trilha de auditoria correlatos são anonimizados (não removidos), preservando data/hora, decisão e autor institucional sem PII | REQ-PRIV-002 |
| AUD-001 | Toda aprovação/recusa de benefício deve ser registrada em trilha de auditoria (autor, data/hora, decisão). Os registros são preservados após o encerramento do vínculo do servidor, de forma anonimizada quanto à PII do servidor desligado (PRIV-002) | REQ-AUD-001 |

## Dados e integrações

### Dados relevantes

| ID | Entidade ou dado | Necessidade de negócio | Origem |
|---|---|---|---|
| DATA-001 | Solicitação de benefício | Tipo (qualificação/progressão), curso vinculado, status, decisão | REQ-FUNC-008, REQ-FUNC-009 |

### Integrações

| ID | Sistema ou serviço | Necessidade | Origem |
|---|---|---|---|
| INT-001 | Turmalina (RH) | Refletir a aprovação do benefício no sistema de RH institucional | REQ-INT-001 |

## Operações esperadas

| ID | Operação | Resultado esperado | Origem |
|---|---|---|---|
| OP-001 | Solicitar benefício (qualificação ou progressão) sobre um curso | Cria solicitação com status pendente, após validar elegibilidade | REQ-FUNC-008, REQ-FUNC-009 |
| OP-002 | Aprovar/recusar solicitação | Atualiza status da solicitação; se aprovada, atualiza status do curso e notifica o Turmalina | REQ-RN-008, REQ-INT-001 |

## Requisitos não funcionais

| ID | Requisito | Origem |
|---|---|---|
| RNF-001 | O sistema deve estar disponível 24/7, com RPO diário e RTO de até 24 horas | REQ-RNF-002 |

## Critérios de aceite de backend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-BE-001 | Solicitação sobre curso já utilizado para a mesma finalidade é rejeitada | RF-003, RN-001 |
| CA-BE-002 | Aprovação de benefício atualiza corretamente o status do curso | RF-005 |
| CA-BE-003 | Comunicação ao Turmalina ocorre somente após aprovação, nunca antes | RN-003 |
| CA-BE-004 | Toda decisão do RH gera registro de auditoria | AUD-001 |

## Dependências

| Tipo | Dependência | Impacto | Situação |
|---|---|---|---|
| Funcionalidade | Spec backend 0002 (status de utilização do curso) | Fonte de elegibilidade da solicitação | Ativa |
| Integração | Contrato/credenciais de integração com o Turmalina | Necessário para a fatia (ii): implementação do adaptador de notificação de benefício aprovado | Contrato inexistente — ver ADR 0001 e Q-017. Fatia (i) implementa porta `NotificadorTurmalina` inerte |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-016 | Qual o prazo de retenção dos dados de solicitação de benefício? | Define política de retenção de DATA-001 | Resolvida em 2026-09-01 — ver PRIV-002 (retenção enquanto vínculo ativo; exclusão + anonimização da auditoria ao encerrar) |
| Q-017 | Qual o contrato técnico da integração com o Turmalina? | Bloqueia a fatia (ii) — adaptador de notificação | Aberta — ver `docs/adr/0001-integracao-turmalina.md` |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| RF-001 | REQ-FUNC-008 | SRC-MAIN-001, RF-008 |
| RF-002 | REQ-FUNC-009 | SRC-MAIN-001, RF-009 |
| RF-003, RN-001 | REQ-RN-007 | SRC-MAIN-001, RN-007 |
| RF-005 | REQ-RN-008 | SRC-MAIN-001, RN-008 |
| RF-006, INT-001 | REQ-INT-001 | SRC-MAIN-001, INT-001 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-008, RF-009, RN-005, RN-007 a RN-009, INT-001) | Agente |
| 2026-09-01 | Incorporação da decisão Q-016 (retenção/exclusão LGPD): PRIV-002 e ajuste de AUD-001. Mantém status Draft por pendência técnica do contrato de integração com o Turmalina (INT-001) | Decisão humana (sessão de planejamento) | Agente |
| 2026-09-01 | Spec aprovada; status Draft → Approved com entrega em 2 fatias (ADR 0001): (i) domínio + porta `NotificadorTurmalina` inerte; (ii) adaptador quando houver contrato (Q-017) | Decisão humana | Agente |
| 2026-09-02 | Implementação da fatia (i): `SolicitacaoBeneficio` + migration `V4`, elegibilidade RN-001/RN-002, decisão do RH (SEC-002) com atualização do status do curso (RF-005), auditoria (AUD-001) e notificação via porta `NotificadorTurmalina` inerte (RF-006/RN-003), endpoints OP-001/OP-002. Fatia (ii) segue bloqueada por Q-017. 10 testes (62 no total) | Sessão de implementação | Agente |
