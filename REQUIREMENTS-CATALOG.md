# Catálogo de requisitos

## Fontes analisadas

| ID | Arquivo | Origem | Tipo | Data/versão | Prioridade | Observação |
|---|---|---|---|---|---|---|
| SRC-MAIN-001 | `requirements/main_requirements.md` | Principal | Requisitos mandatórios | v0.3.0 / 2026-08-27 | Mandatória | Fonte principal de requisitos; todas as questões Q-001 a Q-009 já respondidas |
| SRC-DS-001 | `DESIGN.md` | Design System | Guia visual e tokens | — | Visual | Especificação oficial do Design System (Montserrat, near-flat, PrimeFlex) |
| SRC-TPL-001 | `requirements/template_webdesign.html` | Template | Referência estrutural | — | Visual | Base obrigatória de layout das mockups (shell, header, sidebar) |
| SRC-ART-001 | `requirements/artifacts/Gestao de Talentos.docx` | Artefato | Descrição funcional completa | — | Complementar | Fonte primária usada para redigir SRC-MAIN-001; detalha RF-001 a RF-015 e RN-001 a RN-014 |

## Requisitos catalogados

| ID | Tipo | Descrição normalizada | Contexto | Fonte | Referência | Prioridade | Status | Specs relacionadas |
|---|---|---|---|---|---|---|---|---|
| REQ-FUNC-001 | Funcional | Cadastro de perfil do servidor (foto, nome, cargo, lotação, formação, capacitação, comissões, idiomas, competências, experiência) | Ambos | SRC-MAIN-001 | RF-001 | Crítica | Extraído | FE-0001, BE-0001 |
| REQ-FUNC-002 | Funcional | Atualização de cadastro pelo próprio servidor | Ambos | SRC-MAIN-001 | RF-002 | Crítica | Extraído | FE-0001, BE-0001 |
| REQ-FUNC-003 | Funcional | Adição inline de itens de perfil via ícone "+" (padrão LinkedIn) | Frontend | SRC-MAIN-001 | RF-003 | Alta | Extraído | FE-0001 |
| REQ-FUNC-004 | Funcional | Fluxo de solicitação/validação de atualização de cadastro por RH ou Comissão | Ambos | SRC-MAIN-001 | RF-004 | Crítica | Extraído | FE-0001, BE-0001 |
| REQ-FUNC-005 | Funcional | Cadastro de curso de formação acadêmica com certificado obrigatório | Ambos | SRC-MAIN-001 | RF-005 | Crítica | Extraído | FE-0002, BE-0002 |
| REQ-FUNC-006 | Funcional | Cadastro de curso de capacitação profissional com certificado obrigatório | Ambos | SRC-MAIN-001 | RF-006 | Crítica | Extraído | FE-0002, BE-0002 |
| REQ-FUNC-007 | Funcional | Validação de curso/certificado pela Comissão de Gestão de Competências | Ambos | SRC-MAIN-001 | RF-007 | Crítica | Extraído | FE-0002, BE-0002 |
| REQ-FUNC-008 | Funcional | Solicitação de Adicional de Qualificação vinculada a curso validado | Ambos | SRC-MAIN-001 | RF-008 | Alta | Extraído | FE-0004, BE-0004 |
| REQ-FUNC-009 | Funcional | Solicitação de Progressão Funcional vinculada a curso validado | Ambos | SRC-MAIN-001 | RF-009 | Alta | Extraído | FE-0004, BE-0004 |
| REQ-FUNC-010 | Funcional | Fluxo completo de permuta de lotação (aceite, chefias, RH) | Ambos | SRC-MAIN-001 | RF-010 | Crítica | Extraído | FE-0005, BE-0005 |
| REQ-FUNC-011 | Funcional | Listagem pública de permutas em aberto | Ambos | SRC-MAIN-001 | RF-011 | Alta | Extraído | FE-0005, BE-0005 |
| REQ-FUNC-012 | Funcional | Busca de servidores com filtros múltiplos (formação, curso, competências, lotação, idiomas) | Ambos | SRC-MAIN-001 | RF-012 | Crítica | Extraído | FE-0003, BE-0003 |
| REQ-FUNC-013 | Funcional | Cálculo e exibição de % de correspondência nos resultados de busca | Ambos | SRC-MAIN-001 | RF-013 | Alta | Extraído | FE-0003, BE-0003 |
| REQ-FUNC-014 | Funcional | Ordenação de resultados de busca (Correspondência, Lotação, Alfabético, Nível de Formação) | Ambos | SRC-MAIN-001 | RF-014 | Média | Extraído | FE-0003, BE-0003 |
| REQ-FUNC-015 | Funcional | Visualização de currículo/perfil do servidor (estilo LinkedIn) | Ambos | SRC-MAIN-001 | RF-015 | Alta | Extraído | FE-0001, BE-0001, FE-0003 |
| REQ-RN-001 | Regra de negócio | Certificado obrigatório para curso de formação/capacitação | Backend | SRC-MAIN-001 | RN-001 | Crítica | Extraído | BE-0002 |
| REQ-RN-002 | Regra de negócio | Status "Pendente de verificação" até validação da Comissão | Backend | SRC-MAIN-001 | RN-002 | Alta | Extraído | BE-0002 |
| REQ-RN-003 | Regra de negócio | Status de utilização de curso de formação acadêmica (5 valores) | Backend | SRC-MAIN-001 | RN-003 | Alta | Extraído | BE-0002 |
| REQ-RN-004 | Regra de negócio | Status de utilização de curso de capacitação (2 valores) | Backend | SRC-MAIN-001 | RN-004 | Alta | Extraído | BE-0002 |
| REQ-RN-005 | Regra de negócio | Oferta condicional de uso para progressão/qualificação ao cadastrar formação | Ambos | SRC-MAIN-001 | RN-005 | Alta | Extraído | FE-0002, BE-0002, BE-0004 |
| REQ-RN-006 | Regra de negócio | RH pode alterar dados de curso exceto certificado | Backend | SRC-MAIN-001 | RN-006 | Alta | Extraído | BE-0002 |
| REQ-RN-007 | Regra de negócio | Restrição de reuso de curso já utilizado em benefício | Backend | SRC-MAIN-001 | RN-007 | Alta | Extraído | BE-0004 |
| REQ-RN-008 | Regra de negócio | Aprovação de benefício altera status de utilização do curso | Backend | SRC-MAIN-001 | RN-008 | Alta | Extraído | BE-0004, BE-0002 |
| REQ-RN-009 | Regra de negócio | Cursos de capacitação seguem lógica de progressão (sem qualificação) | Backend | SRC-MAIN-001 | RN-009 | Alta | Extraído | BE-0002, BE-0004 |
| REQ-RN-010 | Regra de negócio | Bloqueio de 180 dias após recusa de permuta por ambas as chefias | Backend | SRC-MAIN-001 | RN-010 | Alta | Extraído | BE-0005 |
| REQ-RN-011 | Regra de negócio | Servidor não pode reenviar permuta que ele mesmo recusou | Backend | SRC-MAIN-001 | RN-011 | Alta | Extraído | BE-0005 |
| REQ-RN-012 | Regra de negócio | Servidor que aceitou não pode reaceitar a mesma solicitação | Backend | SRC-MAIN-001 | RN-012 | Alta | Extraído | BE-0005 |
| REQ-RN-013 | Regra de negócio | Cálculo de % de correspondência e ocultação de 0% | Backend | SRC-MAIN-001 | RN-013 | Alta | Extraído | BE-0003 |
| REQ-RN-014 | Regra de negócio | Critério principal/secundário de ordenação de busca | Ambos | SRC-MAIN-001 | RN-014 | Média | Extraído | FE-0003, BE-0003 |
| REQ-RNF-001 | Não funcional | Capacidade: até 2.000 servidores; busca ≤ 3s | Backend | SRC-MAIN-001 | RNF-001 | Alta | Extraído | BE-0003 |
| REQ-RNF-002 | Não funcional | Disponibilidade 24/7, RPO diário, RTO ≤ 24h | Backend | SRC-MAIN-001 | RNF-002 | Alta | Extraído | Todas as specs de backend |
| REQ-UI-001 | Interface | Visualização de perfil inspirada no LinkedIn | Frontend | SRC-MAIN-001 | RNF-003 | Alta | Extraído | FE-0001, FE-0003 |
| REQ-AUD-001 | Auditoria | Trilha de auditoria das aprovações (permuta, curso, benefício) | Backend | SRC-MAIN-001 | RNF-004 | Alta | Extraído | BE-0001, BE-0002, BE-0004, BE-0005 |
| REQ-PRIV-001 | Privacidade | Logs de acesso a dados sensíveis (certificados, dados pessoais) | Backend | SRC-MAIN-001 | RNF-005 | Alta | Extraído | Todas as specs de backend |
| REQ-PRIV-002 | Privacidade | Conformidade integral com a LGPD | Ambos | SRC-MAIN-001 | RES-001 | Alta | Extraído | Todas as specs |
| REQ-INT-001 | Integração | Integração com Turmalina (sistema de RH) para refletir benefícios e permutas aprovados | Backend | SRC-MAIN-001 | INT-001 | Alta | Extraído | BE-0004, BE-0005 |
| REQ-SEC-001 | Segurança | Autenticação exclusiva via SSO institucional (Active Directory), sem senha local | Backend | SRC-MAIN-001 | INT-002 | Alta | Extraído | Todas as specs de backend |

### Requisitos transversais (aplicados em todas as specs de backend)

Os seguintes requisitos não constituem uma funcionalidade própria; devem ser replicados na seção "Segurança, privacidade e auditoria" e "Requisitos não funcionais" de **cada** spec de backend (BE-0001 a BE-0005), conforme decisão registrada em `specs/OPEN-QUESTIONS.md` (Q-010):

* REQ-SEC-001 — autenticação via SSO institucional.
* REQ-RNF-002 — disponibilidade 24/7, RPO diário, RTO ≤ 24h.
* REQ-PRIV-001 — logs de acesso a dados sensíveis.
* REQ-PRIV-002 — conformidade com a LGPD.

## Decomposição de funcionalidades

| ID | Funcionalidade | Contextos | Requisitos principais |
|---|---|---|---|
| 0001 | Perfil e Cadastro do Servidor | Frontend, Backend | REQ-FUNC-001 a 004, REQ-FUNC-015, REQ-UI-001, REQ-AUD-001 |
| 0002 | Cursos e Certificados (Formação/Capacitação) | Frontend, Backend | REQ-FUNC-005 a 007, REQ-RN-001 a 006, REQ-RN-009 |
| 0003 | Busca de Talentos | Frontend, Backend | REQ-FUNC-012 a 014, REQ-RN-013, REQ-RN-014, REQ-RNF-001, REQ-UI-001 |
| 0004 | Benefícios (Qualificação/Progressão Funcional) | Frontend, Backend | REQ-FUNC-008, REQ-FUNC-009, REQ-RN-005, REQ-RN-007 a 009, REQ-INT-001 |
| 0005 | Permuta de Lotação | Frontend, Backend | REQ-FUNC-010, REQ-FUNC-011, REQ-RN-010 a 012, REQ-INT-001 |

### Prefixos permitidos

* `REQ-FUNC-XXX`: requisito funcional.
* `REQ-RNF-XXX`: requisito não funcional.
* `REQ-RN-XXX`: regra de negócio.
* `REQ-UI-XXX`: requisito específico de interface.
* `REQ-SEC-XXX`: requisito de segurança.
* `REQ-PRIV-XXX`: requisito de privacidade ou LGPD.
* `REQ-INT-XXX`: requisito de integração.
* `REQ-DATA-XXX`: requisito de dados.
* `REQ-AUD-XXX`: requisito de auditoria.
* `REQ-RES-XXX`: restrição.
* `REQ-PREM-XXX`: premissa.

### Status permitidos para requisitos

* `Extraído`: identificado em documento de origem, sem revisão.
* `Em análise`: precisa de classificação, detalhamento ou confirmação.
* `Validado`: confirmado por responsável humano.
* `Rejeitado`: não será atendido, com justificativa documentada.
* `Substituído`: foi substituído por outro requisito.
* `Coberto por spec`: está coberto por ao menos uma spec.
* `Implementado`: reservado para uma futura fase de desenvolvimento.
