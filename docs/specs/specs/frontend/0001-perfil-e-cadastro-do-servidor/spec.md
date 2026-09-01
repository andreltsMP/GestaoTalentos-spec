# Spec Frontend — Perfil e Cadastro do Servidor

## Metadados

- ID funcional: 0001
- Contexto: Frontend
- Status: Draft
- Criado em: 2026-08-27
- Última atualização: 2026-08-27
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Design System: `DESIGN.md`
- Template visual: `requirements/template_webdesign.html`
- Mockup central: `mockups/0001-perfil-e-cadastro-do-servidor_mockup.html`
- Cópia local da mockup: `specs/frontend/0001-perfil-e-cadastro-do-servidor/mockup.html`
- Status da mockup: Sincronizada
- Última sincronização da mockup: 2026-08-27
- Spec backend relacionada: `specs/backend/0001-perfil-e-cadastro-do-servidor/spec.md`
- Questões em aberto: Q-016
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

O servidor mantém um perfil profissional completo (dados pessoais, cargo, lotação, formação, capacitação, comissões, idiomas, competências e experiência), em um layout inspirado no LinkedIn. Ele pode editar itens diretamente na tela de visualização; alterações sujeitas a validação seguem um fluxo de solicitação acompanhável em uma aba própria.

## Objetivo de interface

Permitir que o servidor visualize e mantenha seu próprio perfil profissional de forma centralizada e acompanhe o status de qualquer atualização enviada para validação de RH ou da Comissão de Gestão de Competências.

## Escopo incluído

- Tela de perfil próprio, estilo LinkedIn, com foto, nome, cargo, lotação (nome e cidade), formação acadêmica, cursos de capacitação, comissões que integra, idiomas, competências e experiência profissional.
- Edição inline de cada seção via ícone "+"/editar na própria tela de visualização, sem navegação para outra página.
- Envio de atualizações de cadastro para validação de RH e/ou da Comissão de Gestão de Competências, quando aplicável.
- Aba "Minhas Solicitações", listando o histórico de solicitações de atualização com status (aguardando validação, aprovada, recusada).
- Visualização do perfil de outro servidor em modo somente leitura (a partir de um acesso originado na busca, spec 0003).

## Escopo não incluído

- Cadastro de curso de formação/capacitação com upload de certificado e seu fluxo de validação (tratado em `specs/frontend/0002-cursos-e-certificados`).
- Solicitação de Adicional de Qualificação e Progressão Funcional (tratado em `specs/frontend/0004-beneficios-qualificacao-progressao`).
- Solicitação de permuta de lotação (tratado em `specs/frontend/0005-permuta-de-lotacao`).
- Filtros e listagem de busca de outros servidores (tratado em `specs/frontend/0003-busca-de-talentos`).
- Regras de autorização aplicadas no servidor (tratadas em `specs/backend/0001-perfil-e-cadastro-do-servidor`).

## Atores e permissões percebidas

| Ator | Ação na interface | Origem |
|---|---|---|
| Servidor | Visualiza e edita o próprio perfil; envia campos para validação | REQ-FUNC-001, REQ-FUNC-002 |
| Servidor | Visualiza o perfil de outro servidor em modo somente leitura | REQ-FUNC-015 |
| RH | Recebe e valida solicitações de atualização de cadastro (fora desta spec de interface do servidor; ver dependências de backend) | REQ-FUNC-004 |
| Comissão de Gestão de Competências | Recebe e valida solicitações relacionadas a competências | REQ-FUNC-004 |

## Fluxos de usuário

### Fluxo principal: Editar campo de perfil inline

1. Servidor acessa a própria página de perfil.
2. Servidor clica no ícone "+" da seção desejada (ex.: idiomas, competências, experiência).
3. Interface exibe um formulário inline para adicionar o novo item, sem sair da tela.
4. Servidor salva; se o campo exigir validação (ex.: formação/curso — spec 0002), o item aparece com status "aguardando validação"; caso contrário, é refletido imediatamente no perfil.

### Fluxo alternativo: Acompanhar status de solicitação

1. Servidor acessa a aba "Minhas Solicitações".
2. Interface lista as solicitações de atualização de cadastro com o status atual (aguardando validação, aprovada, recusada) e a data de envio.

### Fluxo de erro: Tentativa de editar item em validação

1. Servidor tenta editar um item que já está com status "aguardando validação".
2. Interface impede a edição direta e exibe mensagem informando que o item está em análise, sem descartar a solicitação em andamento.

## Requisitos de interface

| ID | Requisito | Origem |
|---|---|---|
| UI-001 | Exibir o perfil do servidor em layout inspirado no LinkedIn: foto, nome, cargo e lotação em destaque no topo; seções para formação, capacitação, comissões, idiomas, competências e experiência abaixo | REQ-UI-001 |
| UI-002 | Exibir ícone "+" em cada seção editável do perfil, permitindo adicionar um novo item sem navegação de página | REQ-FUNC-003 |
| UI-003 | Exibir o status ("aguardando validação", "aprovada", "recusada") de cada item de perfil sujeito a validação | REQ-FUNC-004 |
| UI-004 | Exibir a aba "Minhas Solicitações" com o histórico e status de todas as solicitações de atualização do servidor | REQ-FUNC-004 |
| UI-005 | Exibir o perfil de outro servidor com a mesma estrutura visual, em modo somente leitura (sem ícones de edição) | REQ-FUNC-015 |

## Estados de interface

| Estado | Comportamento esperado | Origem |
|---|---|---|
| Carregando | Exibir indicador de carregamento enquanto os dados do perfil são obtidos | REQ-FUNC-001 |
| Vazio | Quando uma seção do perfil (ex.: idiomas) estiver vazia, exibir mensagem convidando o servidor a adicionar o primeiro item, com o ícone "+" em destaque | REQ-FUNC-003 |
| Erro | Se a gravação de uma edição falhar, exibir mensagem de erro e preservar os dados digitados no formulário inline | REQ-FUNC-002 |
| Sucesso | Exibir confirmação visual ao salvar uma edição ou ao enviar uma solicitação de validação | REQ-FUNC-002 |
| Sem permissão | Ao tentar acessar edição do perfil de outro servidor, a interface deve apresentar somente o modo leitura, sem controles de edição | REQ-SEC-001 |

## Acessibilidade e apresentação

| ID | Requisito | Origem |
|---|---|---|
| A11Y-001 | Todos os campos de formulário inline devem possuir rótulo associado e área de toque/clique mínima de 40px, conforme padrão de acessibilidade do Design System | SRC-DS-001 |
| A11Y-002 | Estados de foco devem exibir o anel visual (`focus-ring`) definido no Design System em todos os campos e botões interativos | SRC-DS-001 |
| UI-006 | Layout responsivo seguindo o grid PrimeFlex (`col-12 md:col-6 lg:col-4`) para as seções do perfil | SRC-DS-001 |

## Dependências de backend

| Necessidade | Finalidade no frontend | Origem | Status |
|---|---|---|---|
| Consultar dados de perfil do servidor autenticado | Exibir perfil próprio (UI-001) | REQ-FUNC-001 | Pendente de spec backend — ver `specs/backend/0001-perfil-e-cadastro-do-servidor/spec.md` |
| Enviar atualização de campo sujeito a validação | Fluxo de solicitação (UI-003) | REQ-FUNC-004 | Pendente de spec backend |
| Consultar status de solicitações do servidor | Aba "Minhas Solicitações" (UI-004) | REQ-FUNC-004 | Pendente de spec backend |
| Consultar perfil de outro servidor (leitura) | Visualização somente leitura (UI-005) | REQ-FUNC-015 | Pendente de spec backend |

## Mockup relacionada

- Base obrigatória: `requirements/template_webdesign.html`.
- Guia de Design System: `DESIGN.md`.
- Stack visual: PrimeReact, PrimeFlex e PrimeIcons.
- Arquivo central: `mockups/0001-perfil-e-cadastro-do-servidor_mockup.html`.
- Cópia local: `mockup.html`.
- A mockup representa somente os fluxos, requisitos e estados documentados nesta spec.
- Identificação obrigatória: tag `Mockup Conceitual` após a identificação da aplicação.

| Item visual | Fluxo, estado ou requisito da spec | Situação |
|---|---|---|
| Tela de perfil próprio | UI-001, fluxo principal | Representado |
| Edição inline por seção | UI-002, fluxo principal | Representado |
| Aba "Minhas Solicitações" | UI-004, fluxo alternativo | Representado |
| Estado vazio de seção | Estado Vazio | Representado |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | Servidor consegue visualizar todos os campos do próprio perfil em um único layout consolidado | UI-001, REQ-FUNC-001 |
| CA-FE-002 | Servidor consegue adicionar um novo item (idioma, competência, experiência) via ícone "+" sem navegação de página | UI-002, REQ-FUNC-003 |
| CA-FE-003 | Interface apresenta corretamente os três status de solicitação (aguardando validação, aprovada, recusada) na aba "Minhas Solicitações" | UI-003, UI-004, REQ-FUNC-004 |
| CA-FE-004 | A mockup está sincronizada nas localizações central e local e segue as diretrizes do `DESIGN.md` e do template | UI-001, CA-FE-001 |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-016 | Qual o prazo de retenção de dados pessoais do servidor e existe processo de exclusão/anonimização ao deixar o quadro do MPMS? | Pode exigir tela/ação adicional de exportação ou exclusão de dados | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| UI-001 | REQ-UI-001 | SRC-MAIN-001, RNF-003 |
| UI-002 | REQ-FUNC-003 | SRC-MAIN-001, RF-003 |
| UI-003, UI-004 | REQ-FUNC-004 | SRC-MAIN-001, RF-004 |
| UI-005 | REQ-FUNC-015 | SRC-MAIN-001, RF-015 |
| CA-FE-001 | REQ-FUNC-001 | SRC-MAIN-001, RF-001 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-001 a RF-004, RF-015) | Agente |
| 2026-08-27 | Mockup criada e sincronizada | Consolidação da spec | Agente |
