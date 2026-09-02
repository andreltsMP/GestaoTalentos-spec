# Spec Frontend — Cursos e Certificados (Formação/Capacitação)

## Metadados

- ID funcional: 0002
- Contexto: Frontend
- Status: Draft
- Criado em: 2026-08-27
- Última atualização: 2026-08-27
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Design System: `DESIGN.md`
- Template visual: `requirements/template_webdesign.html`
- Mockup central: `mockups/0002-cursos-e-certificados_mockup.html`
- Cópia local da mockup: `specs/frontend/0002-cursos-e-certificados/mockup.html`
- Status da mockup: Sincronizada
- Última sincronização da mockup: 2026-08-27
- Spec backend relacionada: `specs/backend/0002-cursos-e-certificados/spec.md`
- Questões em aberto: Q-012, Q-014
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

O servidor cadastra cursos de formação acadêmica e de capacitação profissional, anexando certificado obrigatório. Cada curso exibe seu status de verificação ("Pendente de verificação" até validação) e seu status de utilização (visível apenas ao próprio servidor e ao RH).

## Objetivo de interface

Permitir que o servidor cadastre cursos com certificado, acompanhe o status de validação pela Comissão de Gestão de Competências, e compreenda para que finalidade (requisito do cargo, qualificação, progressão) cada curso pode ser utilizado.

## Escopo incluído

- Formulário de cadastro de curso de formação acadêmica: área de formação, nível de formação, nome do curso, ano de início, ano de fim, quantidade de horas, utilização, e upload de certificado (obrigatório).
- Formulário de cadastro de curso de capacitação profissional, com upload de certificado (obrigatório).
- Exibição do status "Pendente de verificação" como subtítulo do curso até a validação.
- Exibição do status de utilização do curso (requisito do cargo, utilizado/não utilizado para qualificação, utilizado/não utilizado para progressão), visível apenas ao próprio servidor.
- Aviso ao servidor oferecendo a utilização do curso para progressão ou qualificação, conforme RN-005 (sujeito a confirmação de texto — Q-012).
- Tela de validação para a Comissão de Gestão de Competências: lista de cursos pendentes, visualização do certificado, ação de aprovar/recusar, e edição dos dados do curso (exceto certificado).

## Escopo não incluído

- Cadastro dos demais dados de perfil do servidor (spec 0001).
- Solicitação de Adicional de Qualificação/Progressão Funcional a partir de um curso validado (spec 0004).
- Regras de definição de "requisito do cargo" (pendente de decisão — Q-014).

## Atores e permissões percebidas

| Ator | Ação na interface | Origem |
|---|---|---|
| Servidor | Cadastra curso com certificado; visualiza status de verificação e utilização | REQ-FUNC-005, REQ-FUNC-006 |
| Comissão de Gestão de Competências | Visualiza cursos pendentes, analisa certificado, aprova/recusa, edita dados (exceto certificado) | REQ-FUNC-007 |
| RH | Visualiza o status de utilização dos cursos do servidor (leitura) | REQ-RN-003 |

## Fluxos de usuário

### Fluxo principal: Cadastrar curso de formação acadêmica

1. Servidor acessa a seção de formação acadêmica do perfil e clica no ícone "+".
2. Preenche área de formação, nível de formação, nome do curso, ano de início, ano de fim, quantidade de horas e utilização.
3. Anexa o certificado (campo obrigatório); a interface impede o envio sem o arquivo.
4. Servidor salva; curso aparece com subtítulo "Pendente de verificação".
5. Se o curso não é requisito do cargo e ainda não é usado para progressão/qualificação, a interface exibe um aviso oferecendo a utilização para progressão ou qualificação (RN-005).

### Fluxo alternativo: Validação pela Comissão

1. Membro da Comissão acessa a lista de cursos pendentes.
2. Seleciona um curso, visualiza o certificado anexado e os dados informados.
3. Pode editar os dados do curso, exceto o certificado.
4. Aprova ou recusa; o status "Pendente de verificação" é removido e o status de utilização aplicável passa a ser exibido.

### Fluxo de erro: Cadastro sem certificado

1. Servidor tenta salvar um curso sem anexar certificado.
2. Interface bloqueia o envio e exibe mensagem indicando que o certificado é obrigatório.

## Requisitos de interface

| ID | Requisito | Origem |
|---|---|---|
| UI-001 | Exibir formulário de cadastro de curso de formação acadêmica com os campos: área, nível, nome, ano de início, ano de fim, horas, utilização e upload de certificado | REQ-FUNC-005 |
| UI-002 | Exibir formulário de cadastro de curso de capacitação profissional com upload de certificado obrigatório | REQ-FUNC-006 |
| UI-003 | Exibir "Pendente de verificação" como subtítulo do curso até a validação | REQ-RN-002 |
| UI-004 | Exibir o status de utilização do curso (visível apenas ao servidor e ao RH) | REQ-RN-003, REQ-RN-004 |
| UI-005 | Exibir aviso de oferta de utilização para progressão/qualificação conforme RN-005 (texto a confirmar — Q-012) | REQ-RN-005 |
| UI-006 | Exibir, para a Comissão, tela de validação com lista de cursos pendentes, visualização do certificado e ações de aprovar/recusar/editar (exceto certificado) | REQ-FUNC-007 |

## Estados de interface

| Estado | Comportamento esperado | Origem |
|---|---|---|
| Carregando | Indicador de carregamento ao abrir a lista de cursos pendentes (Comissão) | REQ-FUNC-007 |
| Vazio | Mensagem quando não há cursos cadastrados ou não há pendências de validação | REQ-FUNC-005 |
| Erro | Bloqueio do envio do formulário sem certificado, com mensagem explicativa | REQ-RN-001 |
| Sucesso | Confirmação visual ao cadastrar curso ou ao concluir validação | REQ-FUNC-005, REQ-FUNC-007 |
| Sem permissão | Servidor não pode ver a tela de validação da Comissão | REQ-SEC-001 |

## Acessibilidade e apresentação

| ID | Requisito | Origem |
|---|---|---|
| A11Y-001 | Campo de upload de certificado deve ser operável por teclado e indicar claramente o formato aceito | SRC-DS-001 |
| UI-007 | Layout do formulário responsivo conforme grid PrimeFlex | SRC-DS-001 |

## Dependências de backend

| Necessidade | Finalidade no frontend | Origem | Status |
|---|---|---|---|
| Cadastrar curso com certificado | UI-001, UI-002 | REQ-FUNC-005, REQ-FUNC-006 | Pendente de spec backend — ver `specs/backend/0002-cursos-e-certificados/spec.md` |
| Consultar cursos pendentes de validação | UI-006 | REQ-FUNC-007 | Pendente de spec backend |
| Validar (aprovar/recusar/editar) curso | UI-006 | REQ-FUNC-007 | Pendente de spec backend |

## Mockup relacionada

- Base obrigatória: `requirements/template_webdesign.html`.
- Guia de Design System: `DESIGN.md`.
- Stack visual: PrimeReact, PrimeFlex e PrimeIcons.
- Arquivo central: `mockups/0002-cursos-e-certificados_mockup.html`.
- Cópia local: `mockup.html`.

| Item visual | Fluxo, estado ou requisito da spec | Situação |
|---|---|---|
| Formulário de cadastro de curso | UI-001, fluxo principal | Representado |
| Lista de validação da Comissão | UI-006, fluxo alternativo | Representado |
| Aviso RN-005 | UI-005 | Representado, dependente de Q-012 |

## Critérios de aceite de frontend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-FE-001 | Servidor não consegue salvar cadastro de curso sem anexar certificado | UI-001, UI-002, REQ-RN-001 |
| CA-FE-002 | Curso recém-cadastrado exibe "Pendente de verificação" como subtítulo | UI-003, REQ-RN-002 |
| CA-FE-003 | Comissão consegue aprovar ou recusar um curso e editar seus dados, exceto o certificado | UI-006, REQ-FUNC-007 |
| CA-FE-004 | A mockup está sincronizada nas localizações central e local e segue as diretrizes do `DESIGN.md` e do template | UI-001, CA-FE-001 |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| Q-012 | Qual o texto exato do aviso da RN-005 quando a opção de qualificação é omitida? | Define a mensagem exibida em UI-005 | Aberta |
| Q-014 | Quem define que uma formação é "requisito do cargo"? | Afeta se UI-001 precisa de um campo adicional de seleção manual | Aberta |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| UI-001 | REQ-FUNC-005 | SRC-MAIN-001, RF-005 |
| UI-002 | REQ-FUNC-006 | SRC-MAIN-001, RF-006 |
| UI-003, UI-004 | REQ-RN-002, REQ-RN-003 | SRC-MAIN-001, RN-002, RN-003 |
| UI-005 | REQ-RN-005 | SRC-MAIN-001, RN-005 |
| UI-006 | REQ-FUNC-007 | SRC-MAIN-001, RF-007 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-005 a RF-007, RN-001 a RN-006, RN-009) | Agente |
| 2026-08-27 | Mockup criada e sincronizada | Consolidação da spec | Agente |
