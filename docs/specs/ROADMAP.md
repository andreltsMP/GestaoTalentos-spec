# Roadmap global de especificações

## Regras

- Este arquivo controla a ordem macro de elaboração das funcionalidades.
- O mesmo identificador pode possuir uma spec de frontend e uma spec de backend.
- A ausência de spec em um dos contextos deve ser justificada.
- Specs com dúvida crítica aberta devem permanecer em `Draft` ou `Blocked`.
- O agente deve atualizar este arquivo ao criar, dividir, unir ou descontinuar specs.
- Quando houver impacto de frontend, o checkpoint deve registrar a situação da mockup correspondente.

## Checkpoint de geração de specs e mockups

- Última atualização: 2026-08-27
- Fonte principal analisada: `requirements/main_requirements.md` (v0.3.0)
- Design System analisado: `DESIGN.md`
- Template visual analisado: `requirements/template_webdesign.html`
- Artefato atual em análise: `requirements/artifacts/Gestao de Talentos.docx` (integralmente processado em `main_requirements.md`)
- Funcionalidade ativa: todas as 5 funcionalidades geradas nesta sessão
- Última ação concluída: geração inicial de catálogo, questões em aberto, roadmaps, specs de frontend/backend, mockups e backlog para as 5 funcionalidades
- Próxima ação: obter decisão humana para Q-012 a Q-016 e revisar as specs `Draft` para `Review Required`
- Bloqueios: nenhuma questão crítica pendente; Q-013 (fórmula de % de correspondência) e Q-014 (origem de "requisito do cargo") têm criticidade Alta e devem ser priorizadas antes da geração de código de BE-0002 e BE-0003

## Funcionalidades ordenadas

| Ordem | ID | Funcionalidade | Contextos | Status | Mockup | Prioridade | Dependências | Fontes | Questões abertas |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | Frontend, Backend | Draft | Sincronizada | Crítica | — | SRC-MAIN-001, SRC-ART-001 | Q-016 |
| 2 | 0002 | Cursos e Certificados (Formação/Capacitação) | Frontend, Backend | Draft | Sincronizada | Crítica | 0001 | SRC-MAIN-001, SRC-ART-001 | Q-012, Q-014 |
| 3 | 0003 | Busca de Talentos | Frontend, Backend | Draft | Sincronizada | Alta | 0001, 0002 | SRC-MAIN-001, SRC-ART-001 | Q-013 |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Frontend, Backend | Draft | Sincronizada | Alta | 0002 | SRC-MAIN-001, SRC-ART-001 | Q-016 |
| 5 | 0005 | Permuta de Lotação | Frontend, Backend | Draft | Sincronizada | Alta | 0001 | SRC-MAIN-001, SRC-ART-001 | Q-015, Q-016 |
