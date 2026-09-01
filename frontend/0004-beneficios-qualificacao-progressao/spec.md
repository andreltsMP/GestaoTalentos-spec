# Spec Frontend — Benefícios (Adicional de Qualificação e Progressão Funcional)

## Metadados

- ID funcional: 0004
- Contexto: Frontend
- Status: Draft
- Criado em: 2026-08-27
- Última atualização: 2026-08-27
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Design System: `DESIGN.md`
- Template visual: `requirements/template_webdesign.html`
- Mockup central: `mockups/0004-beneficios-qualificacao-progressao_mockup.html`
- Cópia local da mockup: `specs/frontend/0004-beneficios-qualificacao-progressao/mockup.html`
- Status da mockup: Sincronizada
- Última sincronização da mockup: 2026-08-27
- Spec backend relacionada: `specs/backend/0004-beneficios-qualificacao-progressao/spec.md`
- Questões em aberto: Q-016
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

O servidor solicita ao RH a utilização de um curso já validado para Adicional de Qualificação ou Progressão Funcional. A solicitação é acompanhada até a aprovação ou recusa do RH.

## Objetivo de interface

Permitir que o servidor identifique cursos elegíveis e solicite formalmente sua utilização para um dos dois benefícios, acompanhando o status até a decisão do RH.

## Escopo incluído

- Ação "Solicitar Adicional de Qualificação" em cursos de formação acadêmica elegíveis (status "Não utilizado para qualificação").
- Ação "Solicitar Progressão Funcional" em cursos de formação/capacitação elegíveis (status "Não utilizado para progressão").
- Bloqueio da ação em cursos já "Utilizado para qualificação"/"Utilizado para progressão".
- Aba de acompanhamento de solicitações de benefício, com status (pendente, aprovada, recusada).

## Escopo não incluído

- Cadastro e validação do curso em si (spec 0002).
- Cálculo ou pagamento do efeito financeiro do benefício (fora do sistema, ver `main_requirements.md`, seção 5.3).
- Fluxo de permuta (spec 0005).

## Atores e permissões percebidas

| Ator | Ação na interface | Origem |
|---|---|---|
| Servidor | Solicita benefício sobre curso elegível; acompanha status | REQ-FUNC-008, REQ-FUNC-009 |
| RH | Analisa e aprova/recusa a solicitação (fora desta spec de interface do servidor) | REQ-FUNC-008, REQ-FUNC-009 |

## Fluxos de usuário

### Fluxo principal: Solicitar Adicional de Qualificação

1. Servidor acessa um curso de formação acadêmica com status "Não utilizado para qualificação".
2. Servidor aciona "Solicitar Adicional de Qualificação".
3. Interface envia a solicitação e exibe o status "pendente" no curso e na aba de acompanhamento.
4. Quando o RH decide, o status muda para "aprovada" (curso passa a "Utilizado para qualificação") ou "recusada".

### Fluxo alternativo: Solicitar Progressão Funcional

1. Servidor acessa um curso (formação ou capacitação) com status "Não utilizado para progressão".
2. Servidor aciona "Solicitar Progressão Funcional"; segue o mesmo padrão de acompanhamento do fluxo principal.

### Fluxo de erro: Curso já utilizado

1. Servidor tenta solicitar benefício sobre curso já "Utilizado para qualificação" ou "Utilizado para progressão".
2. Interface não exibe a ação de solicitação para esse curso (ação desabilitada/oculta).

## Requisitos de interface

| ID | Requisito | Origem |
|---|---|---|
| UI-001 | Exibir ação "Solicitar Adicional de Qualificação" apenas em cursos de formação com status "Não utilizado para qualificação" | REQ-FUNC-008, REQ-RN-007 |
| UI-002 | Exibir ação "Solicitar Progressão Funcional" apenas em cursos com status "Não utilizado para progressão" | REQ-FUNC-009, REQ-RN-007 |
| UI-003 | Exibir aba de acompanhamento de solicitações de benefício com status pendente/aprovada/recusada | REQ-FUNC-008, REQ-FUNC-009 |

## Estados de interface

| Estado | Comportamento esperado | Origem |
|---|---|---|
| Carregando | Indicador de carregamento ao abrir a aba de solicitações de benefício | REQ-FUNC-008 |
| Vazio | Mensagem quando não há solicitações de benefício em andamento | REQ-FUNC-008 |
| Erro | Mensagem se o envio da solicitação falhar | REQ-FUNC-008 |
| Sucesso | Confirmação visual ao enviar a solicitação | REQ-FUNC-008, REQ-FUNC-009 |

## Acessibilidade e apresentação

| ID | Requisito | Origem |
|---|---|---|
| A11Y-001 | Botões de ação de solicitação devem ter texto explícito (não apenas ícone) e área de clique mínima de 40px | SRC-DS-001 |

## Dependências de backend

| Necessidade | Finalidade no frontend | Origem | Status |
|---|---|---|---|
| Solicitar Adicional de Qualificação sobre um curso | UI-001 | REQ-FUNC-008 | Pendente de spec backend — ver `specs/backend/0004-beneficios-qualificacao-progressao/spec.md` |
| Solicitar Progressão Funcional sobre um curso | UI-002 | REQ-FUNC-009 | Pendente de spec backend |
| Consultar status de solicitações de benefício do servidor | UI-003 | REQ-FUNC-008, REQ-FUNC-009 | Pendente de spec backend |

## Mockup relacionada

- Base obrigatória: `requirements/template_webdesign.html`.
- Guia de Design System: `DESIGN.md`.
- Stack visual: PrimeReact, PrimeFlex e PrimeIcons.
- Arquivo central: `mockups/0004-beneficios-qualificacao-progressao_mockup.html`.
- Cópia local: `mockup.html`.

| Item visual | Fluxo, estado ou requisito da spec | Situação |
|---|---|---|
| Ação de solicitar benefício no curso | UI-001, UI-002, fluxo principal | Representado |
| Aba de acompanhamento de benefícios | UI-003 | Representado |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | Ação de solicitação de benefício só aparece em cursos elegíveis | UI-001, UI-002, REQ-RN-007 |
| CA-FE-002 | Status da solicitação é refletido corretamente após decisão do RH | UI-003, REQ-RN-008 |
| CA-FE-003 | A mockup está sincronizada nas localizações central e local e segue as diretrizes do `DESIGN.md` e do template | UI-001, CA-FE-001 |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-016 | Qual o prazo de retenção de dados/solicitações de benefício? | Pode exigir política de exibição de histórico | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| UI-001 | REQ-FUNC-008 | SRC-MAIN-001, RF-008 |
| UI-002 | REQ-FUNC-009 | SRC-MAIN-001, RF-009 |
| UI-003 | REQ-RN-008 | SRC-MAIN-001, RN-008 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-008, RF-009, RN-005, RN-007 a RN-009) | Agente |
| 2026-08-27 | Mockup criada e sincronizada | Consolidação da spec | Agente |
