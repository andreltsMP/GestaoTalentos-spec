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
| Q-017 | Qual o contrato técnico da integração com o Turmalina (protocolo REST síncrono x mensageria, autenticação, endpoints por ambiente, payloads de "benefício aprovado" e "permuta aprovada", idempotência, retry/timeout, obrigatoriedade de confirmação)? | REQ-INT-001; BE-0004 e BE-0005 marcam a integração como pendência técnica; não existe contrato nem ADR de decisão efetiva — ver `docs/adr/0001-integracao-turmalina.md` | Bloqueia a fatia (ii) de BE-0004 e BE-0005 (adaptador do Turmalina). Sem contrato o backend não pode implementar a notificação sem inventar endpoints/autenticação | Backend | BE-0004, BE-0005 | Alta | Aberta |

## Decisões respondidas

| ID | Resposta | Responsável | Data | Impacto |
|---|---|---|---|---|
| Q-001 a Q-009 | Todas as questões originais de `main_requirements.md` (próxima revisão, indicadores de OBJ, processo atual, escopo excluído, integrações Turmalina/SSO, metas de desempenho, RTO/RPO, auditoria, LGPD) foram respondidas e incorporadas em `main_requirements.md` v0.2.0–v0.3.0 | Comissão de Gestão de Competências | 2026-08-27 | Ver histórico de alterações em `requirements/main_requirements.md` |
| Q-012 | O aviso da RN-005, quando o servidor já possui outra formação de mesmo nível usada como requisito do cargo ou para qualificação, deve oferecer **apenas a opção de progressão funcional**, acompanhada de um texto curto explicando que a opção de qualificação foi omitida por já existir formação de mesmo nível utilizada para essa finalidade | Usuário (sessão de planejamento) | 2026-09-01 | FE-0002, BE-0002 — define a mensagem retornada pela API ao cadastrar formação |
| Q-013 | O percentual de correspondência é a **proporção simples de filtros atendidos sobre o total de filtros selecionados**, com **peso igual** entre todos os tipos de filtro (formação, curso, competências, lotação, idiomas). Calculado apenas quando há mais de um filtro; servidores com 0% são ocultados | Usuário (sessão de planejamento) | 2026-09-01 | BE-0003 — destrava a implementação de RF-002/RN-001 |
| Q-014 | A informação de "requisito do cargo" vem de um **cadastro administrativo prévio por cargo, mantido pelo RH**. O backend terá uma entidade dedicada (`RequisitoDeCargo`) associando cargo e nível/área de formação exigidos, consultada durante a validação de curso | Usuário (sessão de planejamento) | 2026-09-01 | BE-0002 — cria entidade `RequisitoDeCargo`; consumida por BE-0004 |
| Q-015 | A listagem pública de permutas é **anônima até o aceite mútuo**: expõe apenas lotação/cidade de origem e destino. A identidade dos servidores envolvidos só é revelada após a confirmação do aceite mútuo | Usuário (sessão de planejamento) | 2026-09-01 | FE-0005, BE-0005 — define os campos retornados por OP-002/RF-002 |
| Q-016 | Dados pessoais e certificados são retidos **somente enquanto o servidor mantém vínculo ativo com o MPMS**. Ao encerramento do vínculo, os dados pessoais e certificados são **excluídos**; os registros da trilha de auditoria que os referenciam são **anonimizados** (não removidos), preservando data/hora, tipo de decisão e autor institucional sem PII do servidor desligado (AUD-001) | Usuário (sessão de planejamento) | 2026-09-01 | BE-0001, BE-0002, BE-0004, BE-0005 — define política de retenção/exclusão |
| Q-010 | O requisito de autenticação via SSO institucional (INT-002) é tratado como requisito transversal (REQ-SEC-001), replicado na seção de segurança de cada spec de backend, e não como funcionalidade/spec própria | Usuário (sessão de planejamento) | 2026-08-27 | Aplica-se a BE-0001 a BE-0005; nenhuma spec dedicada de autenticação será criada |
| Q-011 | `project-backlog/team_template.md` foi confirmado como o cadastro real da equipe e renomeado para `project-backlog/team.md`, para uso na atribuição automática de Tasks | Usuário (sessão de planejamento) | 2026-08-27 | Habilita o preenchimento de `Assigned To` no backlog consolidado e nos recortes locais |
| Q-018 | O mockup de FE-0001 usa `--surface-ground: #fafafa`; o `DESIGN.md` define `#f7f4ed` (cream) e proíbe branco/cinza frio no fundo da página. Decisão: a implementação segue o `DESIGN.md` (`#f7f4ed`); o `#fafafa` do mockup é divergência a corrigir no mockup | Usuário (sessão de planejamento) | 2026-09-02 | FE-0001 e demais mockups — cor de fundo da aplicação. Renumerada da antiga Q-017 (frontend), pois o ID Q-017 foi atribuído pelo backend à integração Turmalina |
