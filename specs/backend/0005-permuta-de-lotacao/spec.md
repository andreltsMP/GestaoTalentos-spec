# Spec Backend — Permuta de Lotação

## Metadados

- ID funcional: 0005
- Contexto: Backend
- Status: Approved (entrega em 2 fatias — ver ADR 0001)
- Criado em: 2026-08-27
- Última atualização: 2026-09-01 (aprovada)
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Spec frontend relacionada: `specs/frontend/0005-permuta-de-lotacao/spec.md`
- Questões em aberto: Q-017 (contrato de integração com o Turmalina) — bloqueia apenas a fatia (ii); ver `docs/adr/0001-integracao-turmalina.md`
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

Capacidade de conduzir o fluxo completo de permuta de lotação entre dois servidores, com estados intermediários de aceite mútuo, aprovação de chefias diretas e validação final do RH, incluindo as regras de bloqueio temporário e comunicação ao Turmalina.

## Objetivo de backend

Garantir a integridade do fluxo de estados da permuta, impedindo transições inválidas (reaceite, reenvio de permuta recusada, avanço sem aprovação de ambas as partes) e comunicar a aprovação final ao sistema de RH institucional.

## Escopo incluído

- Criação de solicitação de permuta a partir da lotação/cidade desejada pelo servidor inicial.
- Listagem pública de permutas em aberto, anônima até o aceite mútuo: expõe apenas lotação/cidade de origem e destino, sem identidade dos servidores (Q-015).
- Aceite entre servidores (servidor aceitante → confirmação do servidor inicial).
- Aprovação das chefias diretas de ambos os servidores.
- Validação final do RH.
- Aplicação das regras RN-010 (bloqueio de 180 dias), RN-011 (não reenvio de permuta recusada) e RN-012 (não reaceite).
- Comunicação da permuta aprovada ao Turmalina (INT-001).

## Escopo não incluído

- Cadastro de perfil e lotação do servidor (spec backend 0001, consumida aqui como fonte de dados de lotação).
- Regras de cursos e benefícios (specs backend 0002 e 0004).

## Capacidades de negócio

| ID | Capacidade | Origem |
|---|---|---|
| CAP-001 | Iniciar solicitação de permuta | REQ-FUNC-010 |
| CAP-002 | Listar permutas públicas em aberto | REQ-FUNC-011 |
| CAP-003 | Conduzir aceite, aprovação de chefias e validação do RH | REQ-FUNC-010 |
| CAP-004 | Aplicar bloqueio temporário entre servidores após dupla recusa | REQ-RN-010 |

## Requisitos funcionais

| ID | Requisito | Origem |
|---|---|---|
| RF-001 | O sistema deve permitir que o servidor inicie uma solicitação de permuta selecionando lotação ou cidade desejada | REQ-FUNC-010 |
| RF-002 | O sistema deve listar publicamente as permutas em aberto para todos os servidores, retornando apenas lotação/cidade de origem e destino e o status; a identidade dos servidores envolvidos não é exposta antes do aceite mútuo confirmado (Q-015) | REQ-FUNC-011 |
| RF-003 | O sistema deve permitir que outro servidor aceite uma permuta em aberto, sujeitando-a à confirmação do servidor inicial | REQ-FUNC-010 |
| RF-004 | Com o aceite mútuo confirmado, o sistema deve avançar a solicitação para "Aguardando aprovação de chefia" e enviá-la às chefias diretas de ambos os servidores | REQ-FUNC-010 |
| RF-005 | O sistema deve avançar a solicitação para "Aguardando validação do RH" somente quando ambas as chefias aprovarem | REQ-FUNC-010 |
| RF-006 | O sistema deve permitir que o RH aprove ou recuse a solicitação, definindo o status final "Aprovada" ou "Recusada" para ambos os servidores | REQ-FUNC-010 |
| RF-007 | Ao aprovar, o sistema deve comunicar a permuta ao Turmalina | REQ-INT-001 |

## Regras de negócio

| ID | Regra | Origem |
|---|---|---|
| RN-001 | Se o servidor inicial recusar o aceite recebido, a permuta permanece em aberto para outros interessados, mas o servidor aceitante não pode reaceitá-la | REQ-RN-011, REQ-RN-012 |
| RN-002 | Se ambas as chefias recusarem, ambas as solicitações ficam "Recusadas" e os dois servidores ficam impedidos de trocar entre si pelos 180 dias seguintes | REQ-RN-010 |
| RN-003 | Se apenas uma chefia recusar, a solicitação do servidor aceitante fica "Recusada" (sem possibilidade de reaceite) e a do servidor inicial retorna para "Aguardando aceite de usuário" | REQ-RN-012 |
| RN-004 | Um servidor que recusou uma permuta não pode solicitar novamente a mesma permuta | REQ-RN-011 |
| RN-005 | A comunicação ao Turmalina ocorre somente após a validação final do RH, nunca antes | REQ-INT-001 |
| RN-006 | A identidade dos servidores (nome, matrícula ou qualquer PII) só é revelada às partes após a confirmação do aceite mútuo; até lá, a permuta é tratada como anônima na listagem pública, expondo apenas lotação/cidade de origem e destino (Q-015) | REQ-PRIV-002 |

## Segurança, privacidade e auditoria

| ID | Requisito | Origem |
|---|---|---|
| SEC-001 | Autenticação exclusiva via SSO institucional | REQ-SEC-001 |
| SEC-002 | Apenas a chefia direta responsável pode aprovar/recusar a permuta do servidor sob sua lotação; apenas RH pode dar a validação final | REQ-FUNC-010 |
| PRIV-001 | Dados de permuta devem ser tratados em conformidade com a LGPD. Exposição na listagem pública restrita a lotação/cidade de origem e destino; identidade das partes revelada apenas após o aceite mútuo confirmado (Q-015, RN-006) | REQ-PRIV-002 |
| PRIV-002 | Retenção (Q-016): a solicitação de permuta é mantida enquanto ao menos um dos servidores envolvidos tiver vínculo ativo com o MPMS. Ao encerramento do vínculo, os dados pessoais são excluídos; os registros da trilha de auditoria correlatos são anonimizados (não removidos), preservando data/hora, decisão e autor institucional sem PII | REQ-PRIV-002 |
| AUD-001 | Toda decisão (aceite, aprovação de chefia, validação do RH) deve ser registrada em trilha de auditoria (autor, data/hora, decisão). Os registros são preservados após o encerramento do vínculo do servidor, de forma anonimizada quanto à PII do servidor desligado (PRIV-002) | REQ-AUD-001 |

## Dados e integrações

### Dados relevantes

| ID | Entidade ou dado | Necessidade de negócio | Origem |
|---|---|---|---|
| DATA-001 | Solicitação de permuta | Servidor inicial, servidor aceitante, lotação de origem/destino, status, histórico de transições. A identidade (servidor inicial/aceitante) é dado interno; não integra a projeção pública antes do aceite mútuo (RN-006) | REQ-FUNC-010 |
| DATA-002 | Bloqueio temporário entre servidores | Par de servidores e data de expiração (180 dias) após dupla recusa de chefia | REQ-RN-010 |

### Integrações

| ID | Sistema ou serviço | Necessidade | Origem |
|---|---|---|---|
| INT-001 | Turmalina (RH) | Refletir a permuta aprovada no sistema de RH institucional | REQ-INT-001 |

## Operações esperadas

| ID | Operação | Resultado esperado | Origem |
|---|---|---|---|
| OP-001 | Iniciar solicitação de permuta | Cria solicitação com status "Aguardando aceite de usuário" | REQ-FUNC-010 |
| OP-002 | Aceitar permuta em aberto | Envia aceite ao servidor inicial para confirmação | REQ-FUNC-010 |
| OP-003 | Confirmar/recusar aceite (servidor inicial) | Avança para aprovação de chefia ou encerra o par, mantendo a permuta aberta para outros | RN-001 |
| OP-004 | Aprovar/recusar como chefia direta | Avança para RH (se ambas aprovarem) ou aplica RN-002/RN-003 | RF-004, RF-005 |
| OP-005 | Validar como RH | Define status final e, se aprovado, comunica ao Turmalina | RF-006, RF-007 |

## Requisitos não funcionais

| ID | Requisito | Origem |
|---|---|---|
| RNF-001 | O sistema deve estar disponível 24/7, com RPO diário e RTO de até 24 horas | REQ-RNF-002 |

## Critérios de aceite de backend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-BE-001 | Servidor que recusou uma permuta não consegue reenviá-la | RN-001, RN-004 |
| CA-BE-002 | Dupla recusa de chefia bloqueia o par de servidores por 180 dias | RN-002 |
| CA-BE-003 | Recusa de apenas uma chefia retorna a solicitação corretamente para "Aguardando aceite de usuário" sem permitir reaceite pelo mesmo servidor | RN-003 |
| CA-BE-004 | Comunicação ao Turmalina ocorre somente após validação final do RH | RN-005 |
| CA-BE-005 | Toda decisão do fluxo gera registro de auditoria completo | AUD-001 |

## Dependências

| Tipo | Dependência | Impacto | Situação |
|---|---|---|---|
| Funcionalidade | Spec backend 0001 (dados de lotação do servidor) | Fonte de dados para lotação de origem/destino | Ativa |
| Negócio | Nível de exposição de dados na listagem pública (Q-015) | Definido em RN-006/PRIV-001: apenas lotação/cidade de origem e destino; identidade só após aceite mútuo | Resolvida em 2026-09-01 |
| Integração | Contrato/credenciais de integração com o Turmalina | Necessário para a fatia (ii): implementação do adaptador de notificação (OP-005) | Contrato inexistente — ver ADR 0001 e Q-017. Fatia (i) implementa porta `NotificadorTurmalina` inerte |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-015 | A listagem pública de permutas deve exibir a identidade do solicitante? | Define os campos retornados por OP-002/RF-002 | Resolvida em 2026-09-01 — anônima até o aceite mútuo (RN-006) |
| Q-016 | Qual o prazo de retenção dos dados de permuta? | Define política de retenção de DATA-001 | Resolvida em 2026-09-01 — ver PRIV-002 |
| Q-017 | Qual o contrato técnico da integração com o Turmalina? | Bloqueia a fatia (ii) — adaptador de notificação | Aberta — ver `docs/adr/0001-integracao-turmalina.md` |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| RF-001 a RF-006 | REQ-FUNC-010 | SRC-MAIN-001, RF-010, Fluxo FB-003, seção 7.1 |
| RF-002 | REQ-FUNC-011 | SRC-MAIN-001, RF-011 |
| RN-002 | REQ-RN-010 | SRC-MAIN-001, RN-010 |
| RN-006, PRIV-002 | REQ-PRIV-002 | SRC-MAIN-001, RES-001; decisões Q-015 e Q-016 |
| RN-001, RN-004 | REQ-RN-011 | SRC-MAIN-001, RN-011 |
| RN-003 | REQ-RN-012 | SRC-MAIN-001, RN-012 |
| RF-007, INT-001 | REQ-INT-001 | SRC-MAIN-001, INT-001 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-010, RF-011, RN-010 a RN-012, INT-001) | Agente |
| 2026-09-01 | Incorporação das decisões Q-015 (listagem pública anônima até aceite mútuo — RN-006, ajuste de RF-002/PRIV-001/DATA-001) e Q-016 (retenção/exclusão LGPD — PRIV-002, ajuste de AUD-001). Mantém status Draft por pendência técnica do contrato de integração com o Turmalina (INT-001) | Decisão humana (sessão de planejamento) | Agente |
| 2026-09-01 | Spec aprovada; status Draft → Approved com entrega em 2 fatias (ADR 0001): (i) domínio + porta `NotificadorTurmalina` inerte; (ii) adaptador quando houver contrato (Q-017) | Decisão humana | Agente |
| 2026-09-02 | Implementação da fatia (i): `SolicitacaoPermuta` (uma por servidor inicial, recicla), `BloqueioPermutaPar` (RN-010) e `BloqueioReenvioPermuta` (180d), migration `V5`, máquina de estados OP-001..005, chefia por papel `CHEFIA` + mesma lotação (SEC-002), listagem pública anônima (Q-015/RN-006), notificação via porta `NotificadorTurmalina` inerte após validação do RH (RN-005), auditoria de todas as decisões (AUD-001). Fatia (ii) segue bloqueada por Q-017. 17 testes (79 no total) | Sessão de implementação | Agente |
| 2026-09-02 | Q-017 respondida (contrato provisório): fatia (ii) implementada — `NotificadorTurmalina.notificarPermutaAprovada` real via `NotificadorTurmalinaRest` (ADR 0002). Q-020 resolvida: `GET /api/v1/permutas/pendentes-chefia` e `GET /api/v1/permutas/pendentes-rh` (filas de decisão) | Sessão de implementação | Agente |
