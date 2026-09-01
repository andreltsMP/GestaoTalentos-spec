# Spec Frontend — Permuta de Lotação

## Metadados

- ID funcional: 0005
- Contexto: Frontend
- Status: Draft
- Criado em: 2026-08-27
- Última atualização: 2026-08-27
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Design System: `DESIGN.md`
- Template visual: `requirements/template_webdesign.html`
- Mockup central: `mockups/0005-permuta-de-lotacao_mockup.html`
- Cópia local da mockup: `specs/frontend/0005-permuta-de-lotacao/mockup.html`
- Status da mockup: Sincronizada
- Última sincronização da mockup: 2026-08-27
- Spec backend relacionada: `specs/backend/0005-permuta-de-lotacao/spec.md`
- Questões em aberto: Q-015, Q-016
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

O servidor solicita permuta para uma lotação/cidade desejada; a solicitação passa por aceite de outro servidor, aprovação das chefias diretas de ambos e validação final do RH, com status visíveis em todas as etapas.

## Objetivo de interface

Permitir que o servidor inicie, acompanhe e responda a solicitações de permuta de lotação, e que visualize as permutas em aberto disponíveis para aceite.

## Escopo incluído

- Tela "Permutas": seleção de lotação/cidade desejada para iniciar uma solicitação.
- Aba pública "Permutas" listando solicitações em aberto disponíveis para aceite por outros servidores (nível de exposição de dados pendente — Q-015).
- Aba "Minhas Solicitações" exibindo o status da permuta em cada etapa: aguardando aceite de usuário, aguardando aprovação de chefia, aguardando validação do RH, aprovada, recusada.
- Ação de aceitar/recusar uma permuta em aberto.
- Ação de aprovar/recusar para chefias diretas (tela específica para esse papel).
- Ação de validar (aprovar/recusar) para o RH (tela específica para esse papel).

## Escopo não incluído

- Cadastro de perfil e lotação do servidor (spec 0001).
- Regras de bloqueio de 180 dias e demais regras de negócio (aplicadas no backend, spec 0005 backend).

## Atores e permissões percebidas

| Ator | Ação na interface | Origem |
|---|---|---|
| Servidor | Inicia solicitação de permuta; aceita/recusa permuta de outro servidor; acompanha status | REQ-FUNC-010, REQ-FUNC-011 |
| Chefia direta | Aprova/recusa a permuta de servidor sob sua lotação | REQ-FUNC-010 |
| RH | Valida (aprova/recusa) a permuta após aprovação das chefias | REQ-FUNC-010 |

## Fluxos de usuário

### Fluxo principal: Iniciar solicitação de permuta

1. Servidor acessa a tela "Permutas" e seleciona a lotação ou cidade desejada.
2. Solicitação aparece na aba "Minhas Solicitações" com status "Aguardando aceite de usuário" e na aba pública "Permutas".

### Fluxo alternativo: Aceitar permuta de outro servidor

1. Servidor visualiza, na aba pública "Permutas", uma solicitação compatível com sua própria lotação.
2. Servidor aciona "Iniciar permuta"; a interface envia o aceite ao servidor que originou a solicitação.
3. Se o servidor inicial confirmar, ambas as solicitações avançam para "Aguardando aprovação de chefia" e saem da aba pública.
4. Se o servidor inicial recusar, a interface informa a recusa ao servidor aceitante ("Solicitação recusada") e a permuta original permanece disponível para outros interessados.

### Fluxo alternativo: Aprovação de chefia e validação do RH

1. Chefia direta acessa a lista de permutas pendentes de sua aprovação e aprova ou recusa.
2. Após aprovação de ambas as chefias, a solicitação avança para "Aguardando validação do RH".
3. RH acessa a lista de permutas pendentes de validação e aprova ou recusa.
4. Resultado final ("Aprovada" ou "Recusada") é refletido para ambos os servidores envolvidos.

### Fluxo de erro: Recusa parcial de chefia

1. Apenas uma das duas chefias recusa a solicitação.
2. Interface exibe "Recusada" para o servidor que havia aceitado (sem permitir reaceite) e retorna o status do servidor inicial para "Aguardando aceite de usuário", reexibindo a permuta na aba pública.

## Requisitos de interface

| ID | Requisito | Origem |
|---|---|---|
| UI-001 | Exibir tela de seleção de lotação/cidade desejada para iniciar permuta | REQ-FUNC-010 |
| UI-002 | Exibir aba pública "Permutas" com solicitações em aberto disponíveis para aceite | REQ-FUNC-011 |
| UI-003 | Exibir na aba "Minhas Solicitações" o status detalhado da permuta em cada etapa | REQ-FUNC-010 |
| UI-004 | Exibir tela de aprovação para chefias diretas, listando permutas pendentes de sua decisão | REQ-FUNC-010 |
| UI-005 | Exibir tela de validação para o RH, listando permutas pendentes de decisão final | REQ-FUNC-010 |

## Estados de interface

| Estado | Comportamento esperado | Origem |
|---|---|---|
| Carregando | Indicador de carregamento ao abrir a aba pública ou "Minhas Solicitações" | REQ-FUNC-010 |
| Vazio | Mensagem quando não há permutas em aberto ou solicitações do servidor | REQ-FUNC-011 |
| Erro | Mensagem se o envio/aceite/decisão falhar | REQ-FUNC-010 |
| Sucesso | Confirmação visual a cada transição de status | REQ-FUNC-010 |

## Acessibilidade e apresentação

| ID | Requisito | Origem |
|---|---|---|
| A11Y-001 | Cada status de permuta deve ser comunicado por texto, não apenas por cor | SRC-DS-001 |

## Dependências de backend

| Necessidade | Finalidade no frontend | Origem | Status |
|---|---|---|---|
| Iniciar solicitação de permuta | UI-001 | REQ-FUNC-010 | Pendente de spec backend — ver `specs/backend/0005-permuta-de-lotacao/spec.md` |
| Consultar permutas públicas em aberto | UI-002 | REQ-FUNC-011 | Pendente de spec backend |
| Aceitar/recusar permuta | UI-002, UI-003 | REQ-FUNC-010 | Pendente de spec backend |
| Aprovar/recusar como chefia | UI-004 | REQ-FUNC-010 | Pendente de spec backend |
| Validar como RH | UI-005 | REQ-FUNC-010 | Pendente de spec backend |

## Mockup relacionada

- Base obrigatória: `requirements/template_webdesign.html`.
- Guia de Design System: `DESIGN.md`.
- Stack visual: PrimeReact, PrimeFlex e PrimeIcons.
- Arquivo central: `mockups/0005-permuta-de-lotacao_mockup.html`.
- Cópia local: `mockup.html`.

| Item visual | Fluxo, estado ou requisito da spec | Situação |
|---|---|---|
| Tela de iniciar permuta | UI-001, fluxo principal | Representado |
| Aba pública de permutas | UI-002 | Representado, nível de exposição de dados dependente de Q-015 |
| Minhas Solicitações (status) | UI-003 | Representado |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | Servidor consegue iniciar uma solicitação de permuta selecionando lotação/cidade | UI-001, REQ-FUNC-010 |
| CA-FE-002 | Todos os status do fluxo de permuta são exibidos corretamente na aba "Minhas Solicitações" | UI-003, REQ-FUNC-010 |
| CA-FE-003 | A mockup está sincronizada nas localizações central e local e segue as diretrizes do `DESIGN.md` e do template | UI-001, CA-FE-001 |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-015 | A aba pública de permutas deve exibir a identidade do solicitante? | Define os campos exibidos em UI-002 | Aberta |
| Q-016 | Qual o prazo de retenção dos dados de permuta? | Pode exigir política de exibição de histórico | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| UI-001, UI-003 | REQ-FUNC-010 | SRC-MAIN-001, RF-010, Fluxo FB-003 |
| UI-002 | REQ-FUNC-011 | SRC-MAIN-001, RF-011 |
| UI-004, UI-005 | REQ-FUNC-010 | SRC-MAIN-001, RF-010, seção 7.1 (estados) |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-010, RF-011, RN-010 a RN-012) | Agente |
| 2026-08-27 | Mockup criada e sincronizada | Consolidação da spec | Agente |
