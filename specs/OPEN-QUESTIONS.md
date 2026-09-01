# Questões em aberto

## Regras

- Não ocultar dúvidas dentro de specs ou mockups.
- Formular perguntas objetivas.
- Informar fonte, referência e impacto.
- Informar se a questão afeta frontend, backend, mockup ou todos.
- Dúvidas críticas impedem a aprovação da spec.
- Após resposta humana, manter a decisão no histórico.

| ID | Pergunta | Fonte e contexto | Impacto | Contexto afetado | Specs | Criticidade | Status |
|---|---|---|---|---|---|---|---|
| Q-012 | A regra RN-005 (`main_requirements.md`, seção 7) é ambígua quanto à mensagem exibida quando o servidor já possui outra formação de mesmo nível usada como requisito do cargo ou para qualificação: o aviso remanescente deve oferecer apenas "progressão", com texto explicando por que a qualificação foi omitida? | SRC-ART-001 (Gestao de Talentos.docx) descreve o comportamento de forma ambígua ("aparecerá apenas o aviso de utilização para capacitação", termo que não corresponde a nenhum status de formação acadêmica) | Comportamento incorreto do aviso pode induzir servidor a erro sobre qual benefício está disponível | Frontend, Backend | FE-0002, BE-0002 | Média | Aberta |
| Q-013 | Como deve ser calculado exatamente o percentual de correspondência da busca (RF-013/RN-013) quando múltiplos filtros são selecionados? É a proporção simples de filtros atendidos sobre o total selecionado, com peso igual entre todos os tipos de filtro (formação, curso, competências, lotação, idiomas)? | SRC-MAIN-001, RF-013/RN-013 — descreve a existência do cálculo sem detalhar a fórmula | Sem fórmula definida, o backend não pode implementar o cálculo de forma verificável | Backend | BE-0003 | Alta | Aberta |
| Q-014 | Quem define e mantém a informação de que uma formação acadêmica é "requisito do cargo" (RN-003)? É um cadastro administrativo prévio por cargo (mantido pelo RH), ou uma marcação feita manualmente pela Comissão durante a validação de cada curso? | SRC-MAIN-001, RN-003 — cita o status "requisito do cargo" sem definir sua origem | Sem definição, o backend não sabe se precisa de uma entidade "requisitos por cargo" separada | Backend | BE-0002 | Alta | Aberta |
| Q-015 | A aba pública de permutas (RF-011) deve exibir a identidade do servidor solicitante aos demais usuários, ou apenas a lotação/cidade de origem e destino, preservando anonimato até o aceite mútuo? | SRC-MAIN-001, RF-011 — não especifica o nível de exposição de dados pessoais na listagem pública | Afeta o desenho da tela de permutas e o tratamento de dados pessoais (LGPD) | Frontend, Backend | FE-0005, BE-0005 | Alta | Aberta |
| Q-016 | Qual o prazo de retenção de certificados e dados pessoais para fins de conformidade com a LGPD (RES-001), e existe processo de exclusão/anonimização quando um servidor deixa o quadro do MPMS? | SRC-MAIN-001, RES-001 — restrição LGPD confirmada, mas sem detalhamento de retenção/exclusão | Sem definição, as specs de backend não podem especificar política de retenção de dados | Backend | BE-0001, BE-0002, BE-0004, BE-0005 | Alta | Aberta |

## Decisões respondidas

| ID | Resposta | Responsável | Data | Impacto |
|---|---|---|---|---|
| Q-001 a Q-009 | Todas as questões originais de `main_requirements.md` (próxima revisão, indicadores de OBJ, processo atual, escopo excluído, integrações Turmalina/SSO, metas de desempenho, RTO/RPO, auditoria, LGPD) foram respondidas e incorporadas em `main_requirements.md` v0.2.0–v0.3.0 | Comissão de Gestão de Competências | 2026-08-27 | Ver histórico de alterações em `requirements/main_requirements.md` |
| Q-010 | O requisito de autenticação via SSO institucional (INT-002) é tratado como requisito transversal (REQ-SEC-001), replicado na seção de segurança de cada spec de backend, e não como funcionalidade/spec própria | Usuário (sessão de planejamento) | 2026-08-27 | Aplica-se a BE-0001 a BE-0005; nenhuma spec dedicada de autenticação será criada |
| Q-011 | `project-backlog/team_template.md` foi confirmado como o cadastro real da equipe e renomeado para `project-backlog/team.md`, para uso na atribuição automática de Tasks | Usuário (sessão de planejamento) | 2026-08-27 | Habilita o preenchimento de `Assigned To` no backlog consolidado e nos recortes locais |
