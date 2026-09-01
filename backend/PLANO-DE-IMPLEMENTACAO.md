# Plano de Implementação — Backend Gestão de Talento (execução local)

- Data: 2026-09-01
- Base: specs BE-0001 a BE-0005 **aprovadas**; decisões Q-012 a Q-016 incorporadas; ADR 0001 (Turmalina) em aberto
- Objetivo: implementar as 5 features na ordem do SDD, mantendo o backend **executável localmente** ao final de cada fase (`docker compose up -d` + `mvn -s .mvn/settings.xml spring-boot:run`).
- Ferramentas locais já instaladas e validadas: JDK 17 (Temurin), Maven 3.9.9, Docker Desktop, Postgres via `docker-compose.yml`. Build verde (7 testes), app sobe com health `UP`.

---

## 0. Pré-requisitos que precisam de decisão antes de codar features

| # | Item | Situação | Ação |
|---|---|---|---|
| P1 | **Migrações de schema** | Não há Flyway/Liquibase; hoje o schema vem de `ddl-auto=update` no perfil `dev` | Adotar **Flyway** (ADR 0002). Migrations versionadas em `src/main/resources/db/migration`. `ddl-auto=validate` em **todos** os perfis (dev inclusive). |
| P2 | **Autorização via `_git/permissionamento`** | `MicroServiceSidecar 0.0.16` traz só o resource-server OAuth2; não há cliente de permissionamento no classpath | **Bloqueante.** Precisa de: como este serviço chama o permissionamento (lib? endpoint? via Sidecar?), nomes de papéis/claims (Comissão de Gestão de Competências, RH, Servidor, Chefia). Interim: porta `PermissionChecker` com stub local (perfil `dev`) e implementação real depois. |
| P3 | **Keycloak local para testes manuais** | App aponta para `keycloak-dev.mpms.mp.br` (exige rede MPMS) | Adicionar serviço `keycloak` ao `docker-compose.yml` (somente dev) com *realm export* contendo client + usuários de teste por papel. Alternativa: documentar obtenção de token no Keycloak dev. |
| P4 | **Integração Turmalina (INT-001)** | Contrato inexistente — ver **ADR 0001** | BE-0004 e BE-0005 entram em **2 fatias**: (i) domínio + porta `NotificadorTurmalina` inerte; (ii) adaptador quando houver contrato (novo ADR). |
| P5 | **Armazenamento de certificados (BE-0002)** | Spec não define storage (arquivo em disco? S3/MinIO? BLOB no banco?) | Definir antes da Fase 2. Sugestão local: MinIO no compose ou `bytea` no Postgres para o MVP. |

---

## Fase 0 — Fundação (sem regra de negócio de feature)

> **Progresso (2026-09-01): parcialmente concluída.** Build verde (6 testes), app
> sobe local com Flyway aplicando `V1` e `ddl-auto=validate`, health `UP`,
> `/v3/api-docs` 200 e `/actuator/**` protegido 401.

| # | Entregável | Status |
|---|---|---|
| 1 | **Flyway**: `org.springframework.boot:spring-boot-flyway` (no Boot 4 a auto-config do Flyway é modularizada — só `flyway-core` **não** ativa) + `flyway-database-postgresql`; `spring.flyway` habilitado; `ddl-auto=validate` em `application.yml`, `application-dev.yml` e `.env`; `spring.flyway.enabled=false` em teste | ✅ feito |
| 2 | **Estrutura de pacotes**: criados `infra/security`, `infra/audit`; `infra/exception` estendido. `v1/*` esvaziado (ver #3) | ✅ feito |
| 3 | **Remoção do exemplo `Pessoa`** (6 fontes + 2 testes) | ✅ feito |
| 4 | **Segurança**: alinhar `SecurityConfig` ao `WebSecurityBaseConfig` do Sidecar + conversor claims→authorities + headers/CORS | ⏳ **follow-up** — `SecurityConfig` atual (standalone, funcional) mantido; ver "Decisão pendente" abaixo |
| 5 | **Porta `PermissionChecker`** + impl interina `JwtRolePermissionChecker` (lê `realm_access`/`resource_access` do JWT) + stub `DevPermissivePermissionChecker` (`@Profile("dev")`, `@Primary`) — P2 | ✅ feito (interino) |
| 6 | **Auditoria transversal (AUD-001)**: `RegistroAuditoria` + `RegistroAuditoriaRepository` + `AuditoriaService` + `RegistrarAuditoriaCommand` + `TipoAcaoAuditoria`; migration `V1__baseline.sql` | ✅ feito |
| 7 | **Log de acesso a dados sensíveis (PRIV-001 / AUD-002)**: aspecto/interceptor, CPF mascarado | ⏳ adiado para a Fase 1 (onde há o que registrar) |
| 8 | **OpenAPI** bearer JWT | ✅ já existia em `OpenApiConfig` |
| 9 | **`GlobalExceptionHandler`**: `ForbiddenException` (403) RFC 7807 | ✅ feito |
| 10 | **`docker-compose.yml`**: serviço `keycloak` + realm export (P3) | ⏳ pendente (precisa do realm export) |
| 11 | **Base de testes**: `AuditoriaServiceTest`, `JwtRolePermissionCheckerTest` | ✅ inicial |

### Decisão pendente — `SecurityConfig` × Sidecar

O `MicroServiceSidecar 0.0.16` traz `WebSecurityBaseConfig` (classe-base **não**
auto-configurada) com `securityFilterChain`, CORS e whitelist de swagger/actuator.
O `SecurityConfig` do template é uma reimplementação standalone equivalente e
**funcional**. Alinhar via `class SecurityConfig extends WebSecurityBaseConfig`
(override de `getWhiteRouteList()`) é o padrão do Sidecar e reduz código próprio,
mas altera a fiação de segurança — **confirmar antes de trocar**.

**Roda localmente hoje:**
```
docker compose up -d
mvn -s .mvn/settings.xml test              # 6 testes verdes
mvn -s .mvn/settings.xml spring-boot:run   # Flyway V1 aplicada; health UP; 401 em /actuator/**
```

---

## Fase 1 — BE-0001 Perfil e Cadastro do Servidor

Depende de: Fase 0. Critérios de aceite: CA-BE-001..004 da spec 0001.

> **Progresso (2026-09-01): implementada.** `mvn test` = **23 testes verdes**;
> app sobe local, Flyway aplica `V1`+`V2` (9 tabelas), `ddl-auto=validate` passa,
> endpoints `/api/v1/servidores/**` e `/api/v1/solicitacoes/**` respondem 401 sem token.
>
> Decisões incorporadas (2026-09-01): identidade pelo `sub` + criação sob demanda no 1º
> `GET /servidores/me`; modelo misto (`idiomas`/`competencias` = listas; `experiencias` e
> `participacoesComissao` = subentidades); foto em `bytea` (transporte base64); mapa
> `campo → validador` (`RoteamentoValidacaoCadastro`, `@ConfigurationProperties perfil.validacao.campos`)
> começa **vazio** — nenhum campo do perfil exige validação hoje; a máquina de
> `SolicitacaoAtualizacaoCadastro` (criar/listar/decidir + auditoria + RN-002) está pronta.
>
> Follow-ups: papéis em `infra/security/Papeis.java` com nomes provisórios (confirmar
> no Keycloak/permissionamento — P2); aplicação automática de valor aprovado só cobre
> `cargo` (demais campos → erro explícito até haver regra); `GET /servidores/{id}/foto`
> e leitura de perfil de terceiro registram `ACESSO_DADO_SENSIVEL` (AUD-002).

Entregáveis:

- **Entidades / migration `V2`**: `Servidor` (foto, nome, cargo, lotação FK, idiomas, competências, experiência…), `Lotacao` (nome, cidade), `SolicitacaoAtualizacaoCadastro` (campo alvo, valor proposto, status `AGUARDANDO_VALIDACAO|APROVADA|RECUSADA`, direcionamento RH/Comissão, decisão, auditoria).
- **Retenção (Q-016 / PRIV-002)**: operação de encerramento de vínculo → exclui dados pessoais do `Servidor` e certificados; anonimiza `RegistroAuditoria` correlato (mantém data/hora/decisão/autor institucional). Migration + serviço dedicado.
- **Endpoints** (`/api/v1/...`):
  - `GET /servidores/me` — perfil próprio (OP-001)
  - `PATCH /servidores/me` — campo não sujeito a validação (OP-002)
  - `POST /servidores/me/solicitacoes` — campo sujeito a validação (OP-003)
  - `POST /solicitacoes/{id}/decisao` — aprovar/recusar (RH/Comissão) → grava auditoria + aplica alteração se aprovada (OP-004)
  - `GET /servidores/{id}` — leitura de terceiro → registra log de acesso (OP-005 / AUD-002)
- **Regras**: RN-001 (só o próprio edita), RN-002 (item `AGUARDANDO_VALIDACAO` não reeditável), SEC-002 (bloqueio de edição de terceiro).
- **Autorização**: via `PermissionChecker` (papéis RH / Comissão / Servidor).
- **Testes**: service (JUnit5+Mockito, ≥70%), controller (`@WebMvcTest`, ≥50%) — input inválido, sucesso, 401/403; repositório (consultas parametrizadas).

**Roda localmente:** subir app, obter token de usuário `servidor` no Keycloak local, exercitar CRUD do próprio perfil; token `rh`/`comissao` para decisão; conferir linha em `registro_auditoria`.

---

## Fase 2 — BE-0002 Cursos e Certificados

Depende de: Fase 1. Critérios: CA-BE-001..004 da spec 0002.

> **Progresso (2026-09-01): implementada.** `mvn test` = **41 testes verdes**; app sobe
> local, Flyway aplica `V3` (tabelas `curso` [SINGLE_TABLE], `certificado`,
> `requisito_de_cargo`), `ddl-auto=validate` passa, endpoints `/api/v1/cursos/**` e
> `/api/v1/requisitos-de-cargo/**` respondem 401 sem token.
>
> Decisões (2026-09-01): P5 = certificado em `bytea` (transporte base64, como a foto da
> Fase 1); `NivelFormacao` = TECNICO/GRADUACAO/ESPECIALIZACAO/MESTRADO/DOUTORADO/POS_DOUTORADO;
> "é requisito do cargo" casa por **cargo + nível + área** (todos obrigatórios) contra
> `RequisitoDeCargo` (RH); o próprio servidor edita dados (não o certificado) e troca o
> certificado enquanto `PENDENTE_VERIFICACAO`, e exclui o curso enquanto `PENDENTE` ou
> `RECUSADO` (`VALIDADO` é imutável para o servidor).
>
> Componente de negócio: `OfertaBeneficioCalculator` (RF-007 / RN-003 / RN-005 / Q-012) —
> decide oferecer qualificação e/ou progressão ao cadastrar formação e devolve a mensagem
> explicativa quando a qualificação é omitida. Recusa de curso exige motivo. Toda
> validação da Comissão gera auditoria (AUD-001); download de certificado de terceiro
> gera `ACESSO_DADO_SENSIVEL` (AUD-002).

Entregáveis:

- **Entidades / migration `V3`**: `CursoFormacao` (área, nível, nome, anos, horas, status verificação, status utilização), `CursoCapacitacao`, `Certificado` (arquivo, imutável exceto pelo autor — P5), `RequisitoDeCargo` (cargo ↔ nível/área exigidos — **Q-014**, mantido pelo RH).
- **Fluxo de validação**: `PENDENTE_VERIFICACAO` → validado/recusado pela Comissão (SEC-002); edição pela Comissão exceto certificado (RN-001/RN-006).
- **Status de utilização**: formação (requisito do cargo / qualificação usada|não / progressão usada|não), capacitação (progressão usada|não) — RN-003/RN-004; visível só ao dono e ao RH.
- **RN-005 (Q-012)**: ao cadastrar formação, resposta da API oferece progressão + (condicionalmente) qualificação; quando a qualificação é omitida, retornar mensagem explicativa.
- **Endpoints**: cadastro de curso c/ certificado (OP-001), listagem de pendentes (OP-002), aprovar/recusar (OP-003), editar curso pela Comissão (OP-004), consultar status de utilização (OP-005), CRUD de `RequisitoDeCargo` restrito a RH (OP-006 / SEC-003).
- **Auditoria** em toda aprovação/recusa (AUD-001); log de acesso a certificado (AUD-002).
- **Testes**: idem convenção; cobrir CA-BE-001 (curso sem certificado rejeitado), CA-BE-003 (certificado imutável por terceiro).

**Roda localmente:** cadastrar curso+certificado como `servidor`; validar como `comissao`; consultar utilização; manter `RequisitoDeCargo` como `rh`.

---

## Fase 3 — BE-0003 Busca de Talentos

Depende de: Fases 1 e 2 (fonte de leitura). Critérios: CA-BE-001..003 da spec 0003.

> **Progresso (2026-09-01): implementada.** `mvn test` = **52 testes verdes**; sem
> migration (read-only sobre 0001/0002). `POST /api/v1/busca/servidores` respondendo
> 401 sem token; app sobe normalmente (schema em v3).
>
> Fórmula Q-013 em `CorrespondenciaCalculator` (`% = tipos atendidos ÷ tipos selecionados × 100`,
> arredondado; binário com 1 filtro; exclui 0% com >1 filtro). Cinco tipos de filtro
> (formação[área+nível], curso, competências, lotação, idiomas). Avaliação **em memória**
> (adequada ao teto de 2.000 servidores da RNF-001) sobre projeções JPQL
> (`BuscaServidorRepository`), limitada a servidores com vínculo ativo e **cursos VALIDADO**.
> Ordenação por CORRESPONDENCIA/LOTACAO/ALFABETICO/NIVEL_FORMACAO com principal (última
> escolha) + secundária (anterior) + desempate por nome. Resultado expõe só dados
> "públicos internos" (PRIV-001); busca com resultado gera auditoria `CONSULTA` (AUD-001).
>
> Interpretações registradas: filtro "formação" satisfeito quando **um mesmo curso**
> atende às dimensões área e nível informadas; filtros de curso/lotação casam por nome
> (case-insensitive); só cursos VALIDADO entram no índice.

Entregáveis:

- **Consulta** com filtros combináveis multivalorados: área/nível de formação, curso, competências, lotação, idiomas.
- **% de correspondência (Q-013 / RN-002)**: `% = filtros atendidos ÷ filtros selecionados × 100`, peso igual entre tipos; filtro multivalorado = atendido se satisfaz ≥1 valor (booleano por filtro). Calculado só com >1 filtro; **omitir servidores com 0%**.
- **Ordenação** por Correspondência, Lotação, Alfabético, Nível de Formação, com critério principal (última escolha) e secundário (anterior) — RN-014.
- **Desempenho (RNF-001)**: índices adequados (migration `V4`); meta ≤ 3 s para 2.000 servidores. Considerar *query* nativa/`Specification` + projeções (nunca retornar entidade).
- **Privacidade**: retornar só o conjunto de campos "público interno" (mesmo da leitura de 0001).
- **Endpoint**: `GET /busca/servidores` (ou `POST` se o filtro ficar grande).
- **Testes**: cálculo do % (vários cenários), omissão de 0%, ordenação principal/secundária; teste de desempenho com massa sintética.

**Roda localmente:** *seed* de servidores/cursos (script SQL ou endpoint de carga dev), rodar buscas variando filtros e ordenação, conferir % e latência.

---

## Fase 4 — BE-0004 Benefícios (fatia i — domínio + porta inerte)

Depende de: Fase 2. **INT-001 bloqueado → ADR 0001.** Critérios: CA-BE-001..004 (exceto a parte de comunicação efetiva ao Turmalina).

Entregáveis:

- **Entidade / migration `V5`**: `SolicitacaoBeneficio` (tipo `QUALIFICACAO|PROGRESSAO`, curso vinculado, status, decisão do RH).
- **Elegibilidade (RN-001/RN-007)**: só curso validado e "não utilizado" para a finalidade; capacitação só progressão (RN-002/RN-009).
- **Decisão do RH (RN-008)**: aprovar → atualiza status de utilização do curso (integra com 0002) + grava auditoria (AUD-001).
- **Porta `NotificadorTurmalina`** (interface em `v1/service` ou `infra/integration`) chamada **após** aprovação (RN-003), com implementação `no-op` logada e feature-flag `turmalina.enabled=false`. Sem URL/credencial/cliente HTTP (ADR 0001).
- **Retenção (Q-016 / PRIV-002)**: exclusão de dados pessoais da solicitação ao encerrar vínculo; anonimização da auditoria.
- **Endpoints**: `POST /beneficios/solicitacoes` (OP-001), `POST /beneficios/solicitacoes/{id}/decisao` (OP-002).
- **Testes**: rejeição de curso já utilizado (CA-BE-001), atualização de status do curso na aprovação (CA-BE-002), notificação disparada só após aprovação (CA-BE-003 — verifica chamada à porta, mock).

**Roda localmente:** solicitar benefício sobre curso validado; aprovar como `rh`; conferir status do curso e log `no-op` da notificação.

---

## Fase 5 — BE-0005 Permuta de Lotação (fatia i — domínio + porta inerte)

Depende de: Fase 1. **INT-001 bloqueado → ADR 0001.** Critérios: CA-BE-001..005.

Entregáveis:

- **Entidades / migration `V6`**: `SolicitacaoPermuta` (servidor inicial, aceitante, lotação origem/destino, status, histórico de transições), `BloqueioPermuta` (par de servidores, expiração 180 dias).
- **Máquina de estados**: `AGUARDANDO_ACEITE_USUARIO` → aceite → confirmação do inicial → `AGUARDANDO_APROVACAO_CHEFIA` → ambas as chefias → `AGUARDANDO_VALIDACAO_RH` → `APROVADA|RECUSADA`. Transições inválidas bloqueadas.
- **Regras**: RN-010 (bloqueio 180 d na dupla recusa de chefia), RN-011 (não reenvio de permuta que recusou), RN-012 (não reaceite); RN-003 da spec (recusa de uma só chefia retorna inicial para aguardando aceite).
- **Listagem pública anônima (Q-015 / RN-006)**: `GET /permutas/abertas` retorna só lotação/cidade origem-destino + status; identidade só após aceite mútuo confirmado.
- **Porta `NotificadorTurmalina`** (a mesma da Fase 4) chamada após validação final do RH (RN-005), `no-op` + flag.
- **Retenção (Q-016 / PRIV-002)**: exclusão/anonimização ao encerrar vínculo (registro mantido enquanto ao menos um envolvido tiver vínculo ativo).
- **Auditoria** em cada decisão (aceite, chefia, RH) — AUD-001.
- **Endpoints**: iniciar (OP-001), aceitar (OP-002), confirmar/recusar aceite (OP-003), decisão de chefia (OP-004), validação RH (OP-005), listagem pública anônima.
- **Testes**: reenvio bloqueado (CA-BE-001), bloqueio 180 d (CA-BE-002), retorno correto na recusa de uma chefia (CA-BE-003), notificação só após RH (CA-BE-004), auditoria completa (CA-BE-005).

**Roda localmente:** simular o fluxo completo com tokens `servidor` (x2), `chefia` (x2), `rh`; conferir listagem pública sem identidade e `bloqueio_permuta` após dupla recusa.

---

## Fase 6 — Adaptadores Turmalina (BLOQUEADA)

Pré-condição: contrato técnico do Turmalina + novo ADR (substitui ADR 0001).

Entregáveis (quando destravar): implementação real de `NotificadorTurmalina` (WebClient/RestTemplate conforme decisão), Resilience4j (circuit breaker + retry + timeout), idempotência, `application-*.yml` com URL/credencial por ambiente via env var, testes de fallback/recuperação, `turmalina.enabled=true` em hml/prod.

---

## Ordem de execução e marcos

```
Fase 0  ──> Fase 1 ──> Fase 2 ──> Fase 3
                 └────> Fase 5 (após Fase 1)
        Fase 2 ──────> Fase 4
Fase 6: quando houver contrato Turmalina
```

- Cada fase termina com: `mvn -s .mvn/settings.xml test` verde, `spring-boot:run` sobe, smoke via Swagger/curl com token do Keycloak local, cobertura mínima (70% service / 50% controller), sem violação de camadas (controller ↛ repository; service retorna DTO).
- Nenhuma alteração em `docs/specs/frontend/`.
- Branch por fase: `feature/PID-XXX-be000N-descricao`; commits `tipo(escopo): ...`.

## Riscos / dependências externas

| Risco | Impacto | Mitigação |
|---|---|---|
| Permissionamento sem cliente/definição (P2) | Bloqueia autorização real de todas as fases | Porta + stub `dev`; obter definição da infra antes da Fase 1 fechar |
| Contrato Turmalina inexistente (P4 / ADR 0001) | BE-0004 e BE-0005 ficam na fatia (i) | Porta inerte + flag; Fase 6 destrava depois |
| Storage de certificados indefinido (P5) | Bloqueia Fase 2 | Decidir MinIO x `bytea` antes da Fase 2 |
| Keycloak dev exige rede MPMS (P3) | Dificulta teste manual local | Keycloak no compose com realm export |
| Meta de 3 s na busca (RNF-001) | Risco em Fase 3 | Índices + projeções + teste de carga desde o início da fase |
