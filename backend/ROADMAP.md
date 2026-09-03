# Roadmap de specs — Backend

> **Situação (2026-09-03):** specs BE-0001 a BE-0005 aprovadas em 2026-09-01 e **implementadas** — Fases 0–6 do `PLANO-DE-IMPLEMENTACAO.md` executadas (`mvn test` = 84 verdes em 2026-09-02). Pendências transversais (não de feature): P2 permissionamento real (hoje `PermissionChecker` interino + `Papeis.java` com nomes provisórios); P3 Keycloak local no `docker-compose` + realm export; itens 4 e 7 da Fase 0 (alinhamento `SecurityConfig` × Sidecar; log de acesso a dado sensível PRIV-001/AUD-002); contrato **oficial** do Turmalina (o adaptador roda sob o contrato provisório do ADR 0002).

| Ordem | ID | Funcionalidade | Status | Dependência funcional | Fonte principal | Próxima ação |
|---:|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | Implementado (Fase 1) | — | SRC-MAIN-001 | — (verificação e2e autenticada depende de P3) |
| 2 | 0002 | Cursos e Certificados | Implementado (Fase 2) | 0001 | SRC-MAIN-001 | — (storage de certificado resolvido: `bytea`, transporte base64) |
| 3 | 0003 | Busca de Talentos | Implementado (Fase 3) | 0001, 0002 | SRC-MAIN-001 | — |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Implementado (fatias i+ii — ADR 0002 provisório) | 0002 | SRC-MAIN-001 | Fatia (i) na Fase 4; fatia (ii) e fila Q-019 na Fase 6 (2026-09-02). Ajustar `NotificadorTurmalinaRest` quando houver contrato oficial |
| 5 | 0005 | Permuta de Lotação | Implementado (fatias i+ii — ADR 0002 provisório) | 0001 | SRC-MAIN-001 | Fatia (i) na Fase 5; fatia (ii) e filas Q-020 na Fase 6 (2026-09-02). Ajustar `NotificadorTurmalinaRest` quando houver contrato oficial |
