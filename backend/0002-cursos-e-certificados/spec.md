# Spec Backend — Cursos e Certificados (Formação/Capacitação)

## Metadados

- ID funcional: 0002
- Contexto: Backend
- Status: Approved
- Criado em: 2026-08-27
- Última atualização: 2026-09-01 (aprovada)
- Fonte principal: `requirements/main_requirements.md`
- Artefatos complementares: `requirements/artifacts/Gestao de Talentos.docx`
- Spec frontend relacionada: `specs/frontend/0002-cursos-e-certificados/spec.md`
- Questões em aberto: nenhuma (Q-012 e Q-014 resolvidas em 2026-09-01)
- Responsável pela revisão: Comissão de Gestão de Competências

## Resumo

Capacidades de servidor para armazenar cursos de formação acadêmica e de capacitação profissional com certificado obrigatório, conduzir o fluxo de validação pela Comissão de Gestão de Competências e manter os status de verificação e de utilização de cada curso.

## Objetivo de backend

Garantir que nenhum curso seja utilizável para requisito de cargo, qualificação ou progressão sem validação formal da Comissão, e que o certificado permaneça imutável por terceiros após o envio pelo servidor.

## Escopo incluído

- Armazenamento de curso de formação acadêmica: área, nível, nome, ano de início, ano de fim, horas, utilização e certificado.
- Armazenamento de curso de capacitação profissional com certificado.
- Fluxo de validação: status "Pendente de verificação" → validado/recusado pela Comissão.
- Manutenção do status de utilização de cada curso (RN-003, RN-004), visível apenas ao servidor proprietário e ao RH.
- Regra de oferta condicional de progressão/qualificação (RN-005).
- Regra de edição pela Comissão, exceto o campo de certificado (RN-006).
- Cadastro administrativo de "requisito do cargo" por cargo, mantido pelo RH (entidade `RequisitoDeCargo`), consultado na validação de curso (Q-014).

## Escopo não incluído

- Solicitação e aprovação de Adicional de Qualificação/Progressão Funcional (spec backend 0004).
- Regras de perfil geral do servidor (spec backend 0001).

## Capacidades de negócio

| ID | Capacidade | Origem |
|---|---|---|
| CAP-001 | Cadastrar curso de formação acadêmica com certificado | REQ-FUNC-005 |
| CAP-002 | Cadastrar curso de capacitação profissional com certificado | REQ-FUNC-006 |
| CAP-003 | Validar (aprovar/recusar) curso e certificado | REQ-FUNC-007 |
| CAP-004 | Consultar status de utilização de um curso | REQ-RN-003, REQ-RN-004 |
| CAP-005 | Manter (RH) o cadastro de requisitos de formação por cargo | REQ-RN-003 (Q-014) |

## Requisitos funcionais

| ID | Requisito | Origem |
|---|---|---|
| RF-001 | O sistema deve exigir certificado no cadastro de curso de formação acadêmica ou de capacitação profissional | REQ-RN-001 |
| RF-002 | O sistema deve atribuir automaticamente o status "Pendente de verificação" a todo curso recém-cadastrado | REQ-RN-002 |
| RF-003 | O sistema deve permitir que a Comissão de Gestão de Competências aprove ou recuse um curso | REQ-FUNC-007 |
| RF-004 | O sistema deve permitir que a Comissão edite os dados do curso durante a validação, exceto o certificado | REQ-RN-006 |
| RF-005 | O sistema deve manter o status de utilização de curso de formação acadêmica entre: requisito do cargo, utilizado/não utilizado para qualificação, utilizado/não utilizado para progressão | REQ-RN-003 |
| RF-006 | O sistema deve manter o status de utilização de curso de capacitação entre: utilizado/não utilizado para progressão | REQ-RN-004 |
| RF-007 | O sistema deve oferecer ao servidor a opção de utilizar uma formação recém-cadastrada para progressão ou qualificação, quando aplicável (RN-005) | REQ-RN-005 |

## Regras de negócio

| ID | Regra | Origem |
|---|---|---|
| RN-001 | Certificado é obrigatório e não pode ser alterado por ninguém além do próprio servidor, mesmo durante a validação | REQ-RN-006 |
| RN-002 | Curso pendente não pode ser utilizado como requisito de cargo, qualificação ou progressão | REQ-RN-002 |
| RN-003 | Ao cadastrar formação que não é requisito do cargo e ainda não usada para qualificação/progressão, oferecer qualificação apenas se não houver outra formação de mesmo nível já usada como requisito do cargo ou para qualificação; caso contrário, oferecer apenas progressão | REQ-RN-005 |
| RN-004 | Cursos de capacitação seguem a mesma lógica de validação dos cursos de formação, restrita ao status de progressão | REQ-RN-009 |
| RN-005 | Quando a qualificação for omitida pela RN-003 (já existe formação de mesmo nível usada como requisito do cargo ou para qualificação), a resposta da API deve retornar apenas a opção de progressão acompanhada de mensagem explicativa curta informando que a qualificação foi omitida por já existir formação de mesmo nível utilizada para essa finalidade (Q-012) | REQ-RN-005 |
| RN-006 | A condição "é requisito do cargo" de uma formação é determinada pelo cadastro `RequisitoDeCargo` (mantido pelo RH), que associa um cargo ao nível/área de formação exigidos; não é marcação manual da Comissão (Q-014) | REQ-RN-003 |

## Segurança, privacidade e auditoria

| ID | Requisito | Origem |
|---|---|---|
| SEC-001 | Autenticação exclusiva via SSO institucional | REQ-SEC-001 |
| SEC-002 | Apenas usuários com papel "Comissão de Gestão de Competências" podem aprovar/recusar cursos | REQ-FUNC-007 |
| SEC-003 | Apenas usuários com papel "RH" podem criar, editar ou remover registros de `RequisitoDeCargo` | REQ-RN-003 (Q-014) |
| PRIV-001 | Certificados (documentos pessoais/comprobatórios) devem ser tratados em conformidade com a LGPD | REQ-PRIV-002 |
| AUD-001 | Toda aprovação/recusa de curso deve ser registrada em trilha de auditoria (autor, data/hora, decisão) | REQ-AUD-001 |
| AUD-002 | Todo acesso (visualização/download) a um certificado deve ser registrado em log de acesso a dados sensíveis | REQ-PRIV-001 |

## Dados e integrações

### Dados relevantes

| ID | Entidade ou dado | Necessidade de negócio | Origem |
|---|---|---|---|
| DATA-001 | Curso de formação acadêmica | Área, nível, nome, período, horas, utilização, status | REQ-FUNC-005 |
| DATA-002 | Curso de capacitação profissional | Nome, dados descritivos, utilização, status | REQ-FUNC-006 |
| DATA-003 | Certificado | Arquivo comprobatório vinculado a um curso, imutável exceto pelo autor | REQ-RN-001 |
| DATA-004 | RequisitoDeCargo | Associa um cargo ao nível/área de formação exigidos como requisito; cadastro administrativo mantido pelo RH; consultado na validação de curso para definir o status "requisito do cargo" (Q-014) | REQ-RN-003 |

### Integrações

Nenhuma integração externa é necessária diretamente por esta funcionalidade; a integração com o Turmalina ocorre na aprovação de benefício (spec backend 0004), consumindo o status de utilização mantido aqui.

## Operações esperadas

| ID | Operação | Resultado esperado | Origem |
|---|---|---|---|
| OP-001 | Cadastrar curso de formação/capacitação com certificado | Curso criado com status "Pendente de verificação" | REQ-FUNC-005, REQ-FUNC-006 |
| OP-002 | Listar cursos pendentes de validação | Retorna cursos aguardando decisão da Comissão | REQ-FUNC-007 |
| OP-003 | Aprovar/recusar curso | Atualiza status de verificação e, se aprovado, aplica status de utilização inicial | REQ-FUNC-007 |
| OP-004 | Editar dados de curso (Comissão) | Atualiza campos do curso, exceto certificado | REQ-RN-006 |
| OP-005 | Consultar status de utilização de um curso | Retorna status visível ao servidor/RH | REQ-RN-003, REQ-RN-004 |
| OP-006 | Manter cadastro `RequisitoDeCargo` (RH): criar, editar, remover requisito de formação por cargo | Atualiza a base consultada na validação de curso para o status "requisito do cargo" | REQ-RN-003 (Q-014) |

## Requisitos não funcionais

| ID | Requisito | Origem |
|---|---|---|
| RNF-001 | O sistema deve estar disponível 24/7, com RPO diário e RTO de até 24 horas | REQ-RNF-002 |

## Critérios de aceite de backend

| ID | Critério verificável | Requisitos relacionados |
|---|---|---|
| CA-BE-001 | Cadastro de curso sem certificado é rejeitado pelo servidor | RF-001, RN-001 |
| CA-BE-002 | Curso recusado ou pendente não pode ser usado em nenhuma operação de benefício | RN-002 |
| CA-BE-003 | Alteração de certificado por usuário diferente do proprietário é bloqueada | SEC-002, RN-001 |
| CA-BE-004 | Aprovação/recusa de curso gera registro de auditoria completo | AUD-001 |

## Dependências

| Tipo | Dependência | Impacto | Situação |
|---|---|---|---|
| Negócio | Origem do status "requisito do cargo" (Q-014) | Definiu entidade `RequisitoDeCargo` (DATA-004) mantida pelo RH | Resolvida em 2026-09-01 |
| Negócio | Texto do aviso da RN-005 (Q-012) | Definido em RN-005: apenas progressão + mensagem explicativa da omissão da qualificação | Resolvida em 2026-09-01 |
| Funcionalidade | Spec backend 0001 (perfil do servidor) | Curso é vinculado ao perfil do servidor proprietário | Ativa |

## Questões em aberto

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| — | Nenhuma. Q-012 e Q-014 resolvidas em 2026-09-01 (ver `docs/specs/OPEN-QUESTIONS.md`). | — | — |

## Rastreabilidade de origem

| Item da spec | Requisito catalogado | Fonte original |
|---|---|---|
| RF-001 | REQ-RN-001 | SRC-MAIN-001, RN-001 |
| RF-002 | REQ-RN-002 | SRC-MAIN-001, RN-002 |
| RF-005, RF-006 | REQ-RN-003, REQ-RN-004 | SRC-MAIN-001, RN-003, RN-004 |
| RF-007 | REQ-RN-005 | SRC-MAIN-001, RN-005 |
| RN-005, RN-006, DATA-004 | REQ-RN-005, REQ-RN-003 | SRC-MAIN-001, RN-003, RN-005; decisões Q-012 e Q-014 |
| AUD-001 | REQ-AUD-001 | SRC-MAIN-001, RNF-004 |

## Histórico de alterações

| Data | Alteração | Motivo | Responsável |
|---|---|---|---|
| 2026-08-27 | Criação inicial | Extração de requisitos de origem (RF-005 a RF-007, RN-001 a RN-006, RN-009) | Agente |
| 2026-09-01 | Incorporação das decisões Q-012 (RN-005: aviso apenas de progressão + mensagem explicativa) e Q-014 (entidade `RequisitoDeCargo` mantida pelo RH — DATA-004, RN-006, CAP-005, OP-006, SEC-003); status Draft → Review Required | Decisão humana (sessão de planejamento) | Agente |
| 2026-09-01 | Spec aprovada; status Review Required → Approved. Resolver storage de certificado (P5 do plano) antes da implementação | Decisão humana | Agente |
| 2026-09-01 | Implementação da Fase 2: entidades `Curso` (SINGLE_TABLE) / `CursoFormacao` / `CursoCapacitacao` / `Certificado` / `RequisitoDeCargo`, migration `V3`, endpoints OP-001..OP-006, `OfertaBeneficioCalculator` (RN-003/RN-005/Q-012), validação pela Comissão (SEC-002, AUD-001), download de certificado com log de acesso (AUD-002). Decisões: certificado em `bytea` (P5), enum `NivelFormacao`, match do requisito por cargo+nível+área, edição/exclusão pelo servidor enquanto pendente/recusado. 41 testes no total | Sessão de implementação | Agente |
