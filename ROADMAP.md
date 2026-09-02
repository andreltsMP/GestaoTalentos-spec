# Roadmap global de especificações

## Regras

- Este arquivo controla a ordem macro de elaboração das funcionalidades.
- O mesmo identificador pode possuir uma spec de frontend e uma spec de backend.
- A ausência de spec em um dos contextos deve ser justificada.
- Specs com dúvida crítica aberta devem permanecer em `Draft` ou `Blocked`.
- O agente deve atualizar este arquivo ao criar, dividir, unir ou descontinuar specs.
- Quando houver impacto de frontend, o checkpoint deve registrar a situação da mockup correspondente.

## Checkpoint de geração de specs e mockups

- Última atualização: 2026-09-02
- 2026-09-02: respondidas Q-012, Q-013, Q-014, Q-015 e Q-017 (ver `OPEN-QUESTIONS.md` › Decisões respondidas). Resta apenas Q-016 (retenção LGPD) em aberto. Specs de **backend** seguem `Draft` e sem contratos de API publicados.
- 2026-09-01: specs de **frontend** aprovadas pelo usuário (status `Aprovada`); planejamento de tarefas em `frontend/ROADMAP.md`. Specs de **backend** permanecem `Draft` e sem contratos de API publicados — implementação das camadas de dados do frontend está bloqueada por isso.
- Fonte principal analisada: `requirements/main_requirements.md` (v0.3.0)
- Design System analisado: `DESIGN.md`
- Template visual analisado: `requirements/template_webdesign.html`
- Artefato atual em análise: `requirements/artifacts/Gestao de Talentos.docx` (integralmente processado em `main_requirements.md`)
- Funcionalidade ativa: todas as 5 funcionalidades geradas nesta sessão
- Última ação concluída: geração inicial de catálogo, questões em aberto, roadmaps, specs de frontend/backend, mockups e backlog para as 5 funcionalidades
- Próxima ação: publicar contratos de API das specs de backend (BE-0001 a BE-0005); então desbloquear as tarefas de frontend marcadas `⛔ BE-000X` em `frontend/ROADMAP.md`. Q-013 e Q-014 já respondidas — BE-0003 usa proporção simples com peso igual; BE-0002 requer entidade "requisitos por cargo" mantida pelo RH.
- Bloqueios: Q-016 (retenção/exclusão LGPD) segue aberta e afeta BE-0001, BE-0002, BE-0004 e BE-0005; encaminhar à Comissão/DPO.

## Funcionalidades ordenadas

| Ordem | ID | Funcionalidade | Contextos | Status | Mockup | Prioridade | Dependências | Fontes | Questões abertas |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | Frontend, Backend | FE: Aprovada · BE: Draft | Sincronizada | Crítica | — | SRC-MAIN-001, SRC-ART-001 | Q-016 |
| 2 | 0002 | Cursos e Certificados (Formação/Capacitação) | Frontend, Backend | FE: Aprovada · BE: Draft | Sincronizada | Crítica | 0001 | SRC-MAIN-001, SRC-ART-001 | — (Q-012, Q-014 respondidas em 2026-09-02) |
| 3 | 0003 | Busca de Talentos | Frontend, Backend | FE: Aprovada · BE: Draft | Sincronizada | Alta | 0001, 0002 | SRC-MAIN-001, SRC-ART-001 | — (Q-013 respondida em 2026-09-02) |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Frontend, Backend | FE: Aprovada · BE: Draft | Sincronizada | Alta | 0002 | SRC-MAIN-001, SRC-ART-001 | Q-016 |
| 5 | 0005 | Permuta de Lotação | Frontend, Backend | FE: Aprovada · BE: Draft | Sincronizada | Alta | 0001 | SRC-MAIN-001, SRC-ART-001 | Q-016 (Q-015 respondida em 2026-09-02) |
