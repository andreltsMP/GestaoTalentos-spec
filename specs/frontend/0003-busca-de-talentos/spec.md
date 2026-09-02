# Spec Frontend — Busca de Talentos

## Metadados

- ID funcional: 0003
- Contexto: Frontend
- Status: Aprovada
- Criado em: 2026-08-27
- Última atualização: 2026-09-01
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Design System: `DESIGN.md`
- Template visual: `requirements/template_webdesign.html`
- Mockup central: `mockups/0003-busca-de-talentos_mockup.html`
- Cópia local da mockup: `specs/frontend/0003-busca-de-talentos/mockup.html`
- Status da mockup: Sincronizada
- Última sincronização da mockup: 2026-08-27
- Spec backend relacionada: `specs/backend/0003-busca-de-talentos/spec.md`
- Questões em aberto: Q-013
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

Qualquer servidor pode buscar outros servidores usando filtros de formação, curso, competências, lotação e idiomas, com os resultados ranqueados por percentual de correspondência e ordenáveis por diferentes critérios.

## Objetivo de interface

Permitir que o usuário encontre servidores com o perfil de competências desejado de forma rápida, visualizando o grau de aderência de cada resultado aos filtros aplicados.

## Escopo incluído

- Tela de busca com filtros de seleção múltipla: área de formação, nível de formação, curso, competências, lotação, idiomas.
- Exibição dos resultados com foto, nome, nível de formação, área de formação, lotação e percentual de correspondência (quando mais de um filtro selecionado).
- Ordenação dos resultados por Correspondência, Lotação, Alfabético e Nível de Formação, com critério principal e secundário.
- Ícone de lupa em cada resultado para abrir a visualização do currículo completo (reaproveitando a tela de perfil somente leitura da spec 0001).
- Ocultação de resultados com 0% de correspondência.

## Escopo não incluído

- Edição de perfil (spec 0001).
- Ações de permuta ou solicitação de benefício a partir da busca.
- Definição exata da fórmula de cálculo do percentual de correspondência (pendente — Q-013); a interface deve exibir o valor retornado pelo backend sem realizar o cálculo.

## Atores e permissões percebidas

| Ator | Ação na interface | Origem |
|---|---|---|
| Servidor | Aplica filtros, ordena resultados e visualiza currículo de outro servidor | REQ-FUNC-012, REQ-FUNC-013, REQ-FUNC-014 |

## Fluxos de usuário

### Fluxo principal: Buscar servidores por competências

1. Usuário acessa a tela de busca e seleciona um ou mais filtros (formação, curso, competências, lotação, idiomas).
2. Interface envia os filtros ao backend e exibe os resultados retornados, com foto, nome, nível/área de formação, lotação e percentual de correspondência.
3. Resultados com 0% de correspondência não são exibidos.
4. Usuário seleciona um critério de ordenação; a ordenação escolhida passa a ser o critério principal, e a anterior torna-se secundária.

### Fluxo alternativo: Visualizar currículo de um resultado

1. Usuário clica no ícone de lupa de um resultado.
2. Interface abre uma janela de visualização com o currículo completo do servidor, no mesmo formato da tela de perfil (spec 0001), em modo leitura.

### Fluxo de erro: Nenhum resultado encontrado

1. Usuário aplica filtros que não retornam nenhum servidor com correspondência maior que 0%.
2. Interface exibe estado vazio, informando que nenhum resultado foi encontrado para os filtros selecionados.

## Requisitos de interface

| ID | Requisito | Origem |
|---|---|---|
| UI-001 | Exibir filtros de seleção múltipla para área de formação, nível de formação, curso, competências, lotação e idiomas | REQ-FUNC-012 |
| UI-002 | Exibir, para cada resultado, foto, nome, nível de formação, área de formação, lotação e percentual de correspondência | REQ-FUNC-013 |
| UI-003 | Exibir controles de ordenação (Correspondência, Lotação, Alfabético, Nível de Formação) com indicação do critério principal e secundário ativos | REQ-FUNC-014 |
| UI-004 | Exibir ícone de lupa em cada resultado, abrindo a visualização do currículo completo | REQ-FUNC-015 |

## Estados de interface

| Estado | Comportamento esperado | Origem |
|---|---|---|
| Carregando | Indicador de carregamento durante a busca | REQ-FUNC-012 |
| Vazio | Mensagem quando nenhum filtro foi aplicado ainda, convidando o usuário a buscar | REQ-FUNC-012 |
| Erro | Mensagem quando a busca falha (ex.: erro de comunicação), com opção de tentar novamente | REQ-FUNC-012 |
| Sucesso | Lista de resultados ordenada, sem servidores de 0% de correspondência | REQ-RN-013 |

## Acessibilidade e apresentação

| ID | Requisito | Origem |
|---|---|---|
| A11Y-001 | Filtros de seleção múltipla (dropdowns) devem ser operáveis por teclado e leitor de tela | SRC-DS-001 |
| UI-005 | Grid de resultados responsivo conforme PrimeFlex | SRC-DS-001 |

## Dependências de backend

| Necessidade | Finalidade no frontend | Origem | Status |
|---|---|---|---|
| Buscar servidores por filtros combinados | UI-001, UI-002 | REQ-FUNC-012 | Pendente de spec backend — ver `specs/backend/0003-busca-de-talentos/spec.md` |
| Calcular percentual de correspondência | UI-002 | REQ-FUNC-013 | Pendente de spec backend (fórmula pendente — Q-013) |
| Consultar perfil completo de um servidor | UI-004 | REQ-FUNC-015 | Reaproveita dependência da spec 0001 |

## Mockup relacionada

- Base obrigatória: `requirements/template_webdesign.html`.
- Guia de Design System: `DESIGN.md`.
- Stack visual: PrimeReact, PrimeFlex e PrimeIcons.
- Arquivo central: `mockups/0003-busca-de-talentos_mockup.html`.
- Cópia local: `mockup.html`.

| Item visual | Fluxo, estado ou requisito da spec | Situação |
|---|---|---|
| Painel de filtros | UI-001, fluxo principal | Representado |
| Lista de resultados com % de correspondência | UI-002, fluxo principal | Representado, valor de exemplo — fórmula pendente de Q-013 |
| Controles de ordenação | UI-003 | Representado |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | Usuário consegue combinar múltiplos filtros e visualizar resultados com percentual de correspondência | UI-001, UI-002, REQ-FUNC-012 |
| CA-FE-002 | Resultados com 0% de correspondência não aparecem na lista | UI-002, REQ-RN-013 |
| CA-FE-003 | Ao trocar o critério de ordenação, o anterior passa a secundário | UI-003, REQ-RN-014 |
| CA-FE-004 | A mockup está sincronizada nas localizações central e local e segue as diretrizes do `DESIGN.md` e do template | UI-001, CA-FE-001 |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-013 | Qual a fórmula exata de cálculo do percentual de correspondência? | Frontend hoje apenas exibe o valor retornado pelo backend; fórmula não afeta o layout, mas afeta o valor exibido | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| UI-001 | REQ-FUNC-012 | SRC-MAIN-001, RF-012 |
| UI-002 | REQ-FUNC-013, REQ-RN-013 | SRC-MAIN-001, RF-013, RN-013 |
| UI-003 | REQ-FUNC-014, REQ-RN-014 | SRC-MAIN-001, RF-014, RN-014 |
| UI-004 | REQ-FUNC-015 | SRC-MAIN-001, RF-015 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-012 a RF-014) | Agente |
| 2026-08-27 | Mockup criada e sincronizada | Consolidação da spec | Agente |
| 2026-09-01 | Status alterado de Draft para Aprovada | Aprovação humana das specs de frontend para início da implementação | Usuário |
