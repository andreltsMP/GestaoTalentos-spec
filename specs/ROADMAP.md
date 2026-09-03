# Roadmap global de especificações

## Regras

- Este arquivo controla a ordem macro de elaboração das funcionalidades.
- O mesmo identificador pode possuir uma spec de frontend e uma spec de backend.
- A ausência de spec em um dos contextos deve ser justificada.
- Specs com dúvida crítica aberta devem permanecer em `Draft` ou `Blocked`.
- O agente deve atualizar este arquivo ao criar, dividir, unir ou descontinuar specs.
- Quando houver impacto de frontend, o checkpoint deve registrar a situação da mockup correspondente.

## Checkpoint de geração de specs e mockups

- Última atualização: 2026-09-03
- 2026-09-03: correção de defasagem deste checkpoint. **Fase 6 do plano de backend concluída em 2026-09-02** (adaptador `NotificadorTurmalinaRest` da fatia (ii) de BE-0004/BE-0005 sob **contrato provisório** — ADR 0002 substitui o ADR 0001; filas de pendência Q-019/Q-020). Todas as 5 features de backend e de frontend estão com implementação registrada como concluída. **Continuam em aberto** (fundação/infra, não escopo funcional): P2 permissionamento real (hoje stub — BE `PermissionChecker` interino + `Papeis.java` provisórios; FE `usePermissao` permissivo); P3 Keycloak local no `docker-compose` + realm export; verificação e2e autenticada ponta a ponta (login → CRUD) ainda não exercida em nenhuma feature (bloqueada por P3); alinhamento de `SecurityConfig` ao Sidecar e log de acesso a dado sensível PRIV-001/AUD-002 (itens 4 e 7 da Fase 0); contrato **oficial** do Turmalina (substituirá o provisório do ADR 0002).
- 2026-09-02: merge do subtree `docs/specs/` (progresso do backend) reconciliado pelo agente de frontend. `OPEN-QUESTIONS.md` e este arquivo passam a refletir a versão do backend; status de FE corrigido de `Draft` para `Aprovada` (specs de frontend aprovadas em 2026-09-01). Divergência de cor de fundo de FE-0001 renumerada da antiga Q-017 para **Q-018** (o ID Q-017 é a integração Turmalina).
- 2026-09-02: Q-017 respondida — contrato **provisório** do Turmalina (REST síncrono, Bearer JWT, `Idempotency-Key`, retry/timeout), exige novo ADR substituindo o ADR 0001; execução da fatia (ii) de BE-0004/BE-0005 é ação pendente do agente de backend. Frontend não é afetado. Não há mais questões em aberto.
- 2026-09-02: contrato de API do backend adotado pela **opção (b)** — OpenAPI vivo (`/v3/api-docs`); snapshot em `docs/contracts/backend-api.md` (frontend), regen via `npm run openapi:fetch`. Camada de dados de FE-0001/0002/0003 desbloqueada.
- Fonte principal analisada: `requirements/main_requirements.md` (v0.3.0)
- Design System analisado: `DESIGN.md`
- Template visual analisado: `requirements/template_webdesign.html`
- Artefato atual em análise: `requirements/artifacts/Gestao de Talentos.docx` (integralmente processado em `main_requirements.md`)
- Funcionalidade ativa: todas as 5 funcionalidades geradas nesta sessão
- Última ação concluída: **Fase 6 do plano de backend** (2026-09-02) — fatia (ii) do Turmalina (ADR 0002, contrato provisório) + filas de pendência Q-019/Q-020. Backend: Fases 0–6 executadas (84 testes verdes); Frontend: FE-0001 a FE-0005 com lado do servidor implementado e verificado (`jest` 58, `build` verde). Specs BE e FE aprovadas em 2026-09-01.
- Próxima ação: (1) obter do time de infra a definição real de permissionamento (`_git/permissionamento`) e substituir o stub — BE `PermissionChecker`/`Papeis.java`, FE `usePermissao` (P2); (2) subir Keycloak local via `docker-compose` com realm export (P3); (3) executar a verificação e2e autenticada ponta a ponta (login → CRUD) das 5 features de frontend contra o backend; (4) fechar os itens 4 e 7 da Fase 0 do plano de backend (alinhamento `SecurityConfig` × Sidecar; log de acesso a dado sensível PRIV-001/AUD-002); (5) quando o contrato **oficial** do Turmalina existir, novo ADR referenciando o 0002 e ajuste localizado do `NotificadorTurmalinaRest`.
- Bloqueios: nenhuma questão (`OPEN-QUESTIONS.md`) nem funcionalidade em aberto. Pendências técnicas: P2 (permissionamento real), P3 (Keycloak local) — este bloqueia a verificação e2e autenticada; contrato oficial do Turmalina (o provisório do ADR 0002 mantém BE-0004/BE-0005 operantes). P1 (Flyway) e P5 (storage de certificado — `bytea`) resolvidos.

## Funcionalidades ordenadas

| Ordem | ID | Funcionalidade | Contextos | Status | Mockup | Prioridade | Dependências | Fontes | Questões abertas |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | Frontend, Backend | BE: Implementado / FE: Implementado (servidor) | Sincronizada | Crítica | — | SRC-MAIN-001, SRC-ART-001 | — (Q-016 resolvida 2026-09-01) |
| 2 | 0002 | Cursos e Certificados (Formação/Capacitação) | Frontend, Backend | BE: Implementado / FE: Implementado (servidor) | Sincronizada | Crítica | 0001 | SRC-MAIN-001, SRC-ART-001 | — (Q-012, Q-014 resolvidas 2026-09-01) |
| 3 | 0003 | Busca de Talentos | Frontend, Backend | BE: Implementado / FE: Implementado (servidor) | Sincronizada | Alta | 0001, 0002 | SRC-MAIN-001, SRC-ART-001 | — (Q-013 resolvida 2026-09-01) |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Frontend, Backend | BE: Implementado (fatias i+ii, ADR 0002 provisório) / FE: Implementado (servidor) | Sincronizada | Alta | 0002 | SRC-MAIN-001, SRC-ART-001 | — (Q-017/Q-019 resolvidas; fatia ii entregue na Fase 6, 2026-09-02; aguarda contrato Turmalina oficial) |
| 5 | 0005 | Permuta de Lotação | Frontend, Backend | BE: Implementado (fatias i+ii, ADR 0002 provisório) / FE: Implementado (servidor) | Sincronizada | Alta | 0001 | SRC-MAIN-001, SRC-ART-001 | — (Q-017/Q-020 resolvidas; fatia ii entregue na Fase 6, 2026-09-02; aguarda contrato Turmalina oficial) |
