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
- 2026-09-02: merge do subtree `docs/specs/` (progresso do backend) reconciliado pelo agente de frontend. `OPEN-QUESTIONS.md` e este arquivo passam a refletir a versão do backend; status de FE corrigido de `Draft` para `Aprovada` (specs de frontend aprovadas em 2026-09-01). Divergência de cor de fundo de FE-0001 renumerada da antiga Q-017 para **Q-018** (o ID Q-017 é a integração Turmalina).
- Fonte principal analisada: `requirements/main_requirements.md` (v0.3.0)
- Design System analisado: `DESIGN.md`
- Template visual analisado: `requirements/template_webdesign.html`
- Artefato atual em análise: `requirements/artifacts/Gestao de Talentos.docx` (integralmente processado em `main_requirements.md`)
- Funcionalidade ativa: todas as 5 funcionalidades geradas nesta sessão
- Última ação concluída: specs de backend BE-0001 a BE-0005 **aprovadas** (2026-09-01); ADR 0001 (integração Turmalina) registrado como pendente; plano de implementação em `docs/specs/backend/PLANO-DE-IMPLEMENTACAO.md`
- Próxima ação: executar o plano de implementação do backend a partir da Fase 0 (fundação) e Fase 1 (BE-0001); obter o contrato de integração com o Turmalina (Q-017) para destravar a fatia (ii) de BE-0004 e BE-0005; atualizar as specs de frontend correlatas (FE-0002 e FE-0005) quanto às decisões Q-012 e Q-015 — responsabilidade do agente de frontend
- Bloqueios: Q-017 (contrato técnico do Turmalina) bloqueia apenas a fatia (ii) de BE-0004 e BE-0005; pré-requisitos técnicos P1–P5 do plano (migrações, permissionamento, Keycloak local, contrato Turmalina, storage de certificado)

## Funcionalidades ordenadas

| Ordem | ID | Funcionalidade | Contextos | Status | Mockup | Prioridade | Dependências | Fontes | Questões abertas |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | Frontend, Backend | BE: Approved / FE: Aprovada | Sincronizada | Crítica | — | SRC-MAIN-001, SRC-ART-001 | — (Q-016 resolvida 2026-09-01) |
| 2 | 0002 | Cursos e Certificados (Formação/Capacitação) | Frontend, Backend | BE: Approved / FE: Aprovada | Sincronizada | Crítica | 0001 | SRC-MAIN-001, SRC-ART-001 | — (Q-012, Q-014 resolvidas 2026-09-01) |
| 3 | 0003 | Busca de Talentos | Frontend, Backend | BE: Approved / FE: Aprovada | Sincronizada | Alta | 0001, 0002 | SRC-MAIN-001, SRC-ART-001 | — (Q-013 resolvida 2026-09-01) |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Frontend, Backend | BE: Approved (2 fatias, ADR 0001) / FE: Aprovada | Sincronizada | Alta | 0002 | SRC-MAIN-001, SRC-ART-001 | Q-017 (contrato Turmalina — só fatia ii) |
| 5 | 0005 | Permuta de Lotação | Frontend, Backend | BE: Approved (2 fatias, ADR 0001) / FE: Aprovada | Sincronizada | Alta | 0001 | SRC-MAIN-001, SRC-ART-001 | Q-017 (contrato Turmalina — só fatia ii) |
