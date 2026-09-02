# Roadmap de specs — Frontend

## Situação

- Última atualização: 2026-09-02
- As 5 specs de frontend foram **aprovadas pelo usuário** em 2026-09-01 (status `Aprovada`).
- As specs de backend BE-0001 a BE-0005 foram **aprovadas** (2026-09-01) e **implementadas localmente** pelo agente de backend (BE-0001..0003 completas; BE-0004/0005 fatia (i) — domínio + porta Turmalina inerte). Ver `../backend/PLANO-DE-IMPLEMENTACAO.md`.
- **Contrato de API — resolvido pela opção (b) (2026-09-02).** Fonte = OpenAPI vivo do backend (`${NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`, base dev `http://localhost:8080/api/gestao-talento`). Snapshot derivado do código-fonte (`GestaoTalento-backend@defcbbe`) em **`../../contracts/backend-api.md`**; regeneração do JSON via `npm run openapi:fetch` (`scripts/fetch-openapi.mjs`) com o backend no ar. `src/interfaces/*` e schemas Zod passam a ser derivados desse contrato — **a camada de dados de FE-0001/0002/0003 está desbloqueada**. Divergência contrato × tela → registrar em `../OPEN-QUESTIONS.md`, não improvisar.
- **Questões abertas: nenhuma.** Q-012 a Q-016 resolvidas pelo backend em 2026-09-01; Q-017 (contrato da integração Turmalina) resolvida em 2026-09-02 — contrato provisório REST síncrono, ação pendente do agente de backend (fatia ii de BE-0004/0005; o frontend nunca fala com o Turmalina); Q-018 (cor de fundo de FE-0001) resolvida — segue o `DESIGN.md` `#f7f4ed`. Ver `../OPEN-QUESTIONS.md` › Decisões respondidas.
- **Progresso 2026-09-02:** **Fase 0 concluída**. **FE-0001 concluída** (T1.1–T1.14). **FE-0002 concluída** (T2.1–T2.10): servidor (cadastro formação/capacitação, upload de certificado base64, lista com status, oferta RN-005/Q-012) + Comissão (tela de validação `/cursos/validacao`, proxy de certificado, validar/recusar/editar). **Próximo:** FE-0003 (Busca de Talentos).
- **✅ Verificação (2026-09-02):** `npx tsc --noEmit` OK · `npm run lint` OK (0 erros; 1 warning pré-existente em `error.tsx`) · `npm test` 20/20 em 5 suítes · `npm run build` OK (rotas `/`, `/login`, `/perfil`, `/api/auth/[...]`, middleware). Fase 0 e FE-0001 T1.1–T1.4 verificadas.

## Specs

| Ordem | ID | Funcionalidade | Status | Mockup | Dependência funcional | Bloqueio de implementação | Próxima ação |
|---:|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | **Implementada** | Sincronizada | — | — | ✅ T1.1–T1.14 (tsc/lint/jest 25/25/build verdes). Falta: verificação e2e contra o backend rodando |
| 2 | 0002 | Cursos e Certificados | **Implementada** | Sincronizada | 0001 | — | ✅ T2.1–T2.10 (tsc/lint/jest 33/build verdes). Falta: verificação e2e contra o backend |
| 3 | 0003 | Busca de Talentos | Aprovada | Sincronizada | 0001, 0002 | ✅ contrato (BE-0003; `POST /api/v1/busca/servidores`) | Depois de FE-0001/0002. `percentualCorrespondencia` nulo com ≤1 filtro; item com 0% não vem |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Aprovada | Sincronizada | 0002 | ✅ contrato (BE-0004) | Depois de FE-0002. Turmalina (Q-017) é fatia (ii) do backend — não bloqueia o FE |
| 5 | 0005 | Permuta de Lotação | Aprovada | Sincronizada | 0001 | ✅ contrato (BE-0005) | Depois de FE-0001. Aba pública `GET /permutas/abertas` é anônima; identidade só após aceite mútuo |

## Regra de execução

- Implementar na ordem apresentada, respeitando as dependências funcionais.
- O contrato de API (endpoints + schemas + enums + formato de erro) está em `../../contracts/backend-api.md`, derivado do OpenAPI vivo do backend (opção b). As tarefas antes marcadas `⛔ BE-000X` estão **desbloqueadas** — implementá-las a partir desse contrato, sem inventar campos; se o contrato divergir do que a tela precisa, registrar em `../OPEN-QUESTIONS.md`.
- Tarefas marcadas `▶ livre` podem ser implementadas imediatamente (dependem apenas de mockup + `DESIGN.md`).
- Nenhuma feature é considerada concluída sem: critérios de aceite da spec atendidos, estados (loading/vazio/erro/sem permissão/sucesso), acessibilidade do `DESIGN.md`, testes, e `lint`/`typecheck`/`build` verdes.
- `docs/specs/backend/` é somente leitura para este agente.

## Legenda

- `▶ livre` — sem bloqueio; pode começar já.
- `⛔ BE-000X` — **histórico**: era bloqueio pelo contrato de API de BE-000X. Resolvido em 2026-09-02 via opção (b) — contrato em `../../contracts/backend-api.md`. Ler como "implementar a partir do contrato de BE-000X".
- `❓ Q-0XX` — depende de resposta a questão em aberto (Q-012 a Q-016 resolvidas; Q-017 é backend-only; Q-018 resolvida). Nenhuma questão aberta bloqueia o frontend.

---

## Fase 0 — Fundação (transversal, precede as features)

- [x] **F0.1 — Shell da aplicação** — Cromo do `DESIGN.md` implementado via **`src/app/globals.css`** (tokens de `:root` + `.app-header` 70px/friso `#337259` + `.app-sidebar` 250px + `.nav-link`/`.active` + `.app-content` + fundo `#f7f4ed`), com **[ADR 0001](../../adr/0001-css-de-shell-e-tokens-do-design-system.md)** reconciliando o AGENTS.md. Montserrat via `next/font/google` (host `display:contents` em `layout.tsx`, compatível com o CSP). `(portal)/layout.tsx` = `app-shell`→`Header`+(`Sidebar`+`app-content`); `Header`/`Sidebar` usam as classes de shell + os 5 itens em 3 seções. `@mpms/shared-ui@0.0.52` não fornece shell de portal (`BaseLayout` = html/body + `Providers` + tracking).
- [x] **F0.2 — Rebrand** `▶ livre` — Feito em `layout.tsx` (metadata), `package.json` (`name`), `login/page.tsx` e texto de marca do `Header.tsx`. Nav e estrutura do shell (Sidebar/menu) seguem para F0.1.
- [x] **F0.3 — Componentes de estado** `▶ livre` — `src/components/shared/`: `LoadingState`, `EmptyState` (border-dashed border-2, ícone `text-4xl`, slot `acao`), `ErrorState` (sem stack trace, slot `acao`), `SemPermissao`. Teste `tests/components/shared/EstadosUi.test.tsx`. (Verificação lint/typecheck/test pendente — ver Situação.)
- [~] **F0.4 — Hook `usePermissao`** — **Stub (2026-09-02):** `src/hooks/usePermissao.ts` permissivo (`pode() => true`) com TODO; contrato do `_git/permissionamento` ainda não publicado. Autorização real é server-side; substituir antes de produção.
- [x] **F0.5 — Toast centralizado** `▶ livre` — **Usa o `MessageProvider` do `@mpms/shared-ui`** (já montado em `BaseLayout > Providers`) em vez de provider próprio. `src/hooks/useToast.ts` é um adaptador PT-BR sobre `useMessageContext().showToast` (`sucesso/erro/aviso/info`). `ToastProvider` próprio removido; `(portal)/layout.tsx` revertido.
- [x] **F0.6 — Remoção do scaffold `Pessoa`** `▶ livre` — Removidos `(portal)/cadastros/`, `(portal)/dashboard/`, `PessoaForm`, `PessoaTable`, `pessoaActions`, `interfaces/Pessoa.ts`, `enums/StatusProcesso.ts`, `PortalMenu.tsx`, `tests/service/pessoaActions.test.ts` e (agora) `ApiService.ts` + teste — substituído por `src/service/http.ts` (o `fetchData` do shared-ui não faz PATCH). Mantidos `usePessoaLogada.ts`, `interfaces/ApiResponse.ts`.
- [x] **F0.7 — Ajuste do `middleware.ts`** `▶ livre` — `matcher` → `/perfil`, `/busca`, `/cursos`, `/beneficios`, `/permutas`. `page.tsx` redireciona para `/perfil`; `login` usa `callbackUrl: '/perfil'`; criada rota `(portal)/perfil/page.tsx` (placeholder — corpo real em T1.10).

---

## FE-0001 — Perfil e Cadastro do Servidor

Rotas: `/(portal)/perfil` (próprio), `/(portal)/perfil/[id]` (leitura, origem: busca 0003).
Q-016 resolvida (backend, 2026-09-01): retenção enquanto vínculo ativo; no encerramento, exclusão de PII + anonimização de auditoria, tratada server-side por BE-0001 — sem tela adicional no FE por ora.
Endpoints BE-0001 (do `PLANO-DE-IMPLEMENTACAO.md`, sujeitos a contrato formal): `GET`/`PATCH /api/v1/servidores/me`, `POST /api/v1/servidores/me/solicitacoes`, `POST /api/v1/solicitacoes/{id}/decisao`, `GET /api/v1/servidores/{id}`, `GET /api/v1/servidores/{id}/foto`. Perfil criado sob demanda no 1º `GET /me`; `idiomas`/`competencias` = listas; `experiencias`/`participacoesComissao` = subentidades; foto `bytea` transportada em base64; nenhum campo do perfil exige validação hoje (mapa de roteamento vazio).

- [x] **T1.1 — `interfaces/Perfil.ts`** — Criado a partir do contrato: `Perfil`, `Lotacao`, `ExperienciaProfissional`, `ParticipacaoComissao`, `AtualizarPerfilRequest`, `SolicitacaoAtualizacao`, `ValidadorCadastro`, `CriarSolicitacaoRequest`, `DecisaoSolicitacaoRequest`. **Divergência do texto original:** `idiomas` e `competencias` são `string[]` (não entidades `Idioma`/`Competencia`) — o contrato manda.
- [x] **T1.2 — `enums/StatusSolicitacaoEnum.ts`** `▶ livre` — `AguardandoValidacao | Aprovada | Recusada`.
- [x] **T1.3 — Schemas Zod** — `src/service/perfil.schema.ts`: schemas de resposta (`perfilSchema`, `solicitacaoAtualizacaoSchema`, ...) para validar o contrato + schemas de formulário por seção (`idiomaFormSchema`, `competenciaFormSchema`, `experienciaFormSchema`, `comissaoFormSchema`, `enviarValidacaoFormSchema`) com `z.infer` para os tipos de form.
- [x] **T1.4 — `service/perfil.service.ts` + `service/actions/perfil.actions.ts`** — Leituras (`getPerfilProprio`, `getPerfilPorId`, `listarSolicitacoes`, `urlFotoPerfil`) via `http.ts`, validadas com Zod. Escritas (Server Actions): `atualizarSecaoPerfil` (PATCH /me — replace por seção), `enviarParaValidacao`, `decidirSolicitacao`. **"Adicionar item"** = ler seção + anexar + PATCH da lista completa (backend não tem endpoint de item isolado).
- [x] **T1.5 — `components/perfil/PerfilHeader.tsx`** `▶ livre` — Avatar (`Avatar` PrimeReact, `shape="circle"`), nome, cargo, lotação (nome + cidade) (UI-001). Props simples; candidato ao DS.
- [x] **T1.6 — `components/perfil/PerfilSecaoCard.tsx`** `▶ livre` — Card genérico: título + botão "+" (`aria-label`, ≥40px) + `children` como linhas; variante de estado vazio (border-dashed) (UI-002). Candidato ao DS.
- [x] **T1.7 — Formulários inline por seção** — `SecaoInlineForm` (RHF + `zodResolver`, `<label htmlFor>` associado, foco pelo tema PrimeReact, `noValidate`, submit desabilitado em `isSubmitting`) + `SecaoEditavel` (toggle do form no card, sem navegação). Erro → toast + valores preservados; sucesso → fecha o form. Seções: `SecaoValoresTexto` (idiomas, competências), `SecaoExperiencias`, `SecaoComissoes`, compostas por `PerfilSecoes`.
- [x] **T1.8 — `components/perfil/StatusSolicitacaoBadge.tsx`** `▶ livre` — `Tag` PrimeReact com `severity` (warning/success/secondary) + ícone, a partir do enum `StatusSolicitacao` (UI-003). Cores via tema do DS (sem hex arbitrário).
- [x] **T1.9 — "Minhas Solicitações"** — `MinhasSolicitacoes`: `DataTable` (descrição + status via `StatusSolicitacaoBadge` + data de envio) com `EmptyState` quando vazio (UI-004).
- [x] **T1.10 — Página `perfil/page.tsx`** — RSC: `Promise.all([getPerfilProprio, listarSolicitacoes])` → `PerfilView`. Carregando = `app/loading.tsx`; erro = `ErrorState`; vazio/sucesso nas seções; feedback de escrita por toast.
- [x] **T1.11 — Página `perfil/[id]/page.tsx`** — RSC modo leitura (`PerfilView somenteLeitura` — sem "+" e sem "Minhas Solicitações"). `HttpError` 404 → `notFound()`; 403 → `SemPermissao`; demais → `ErrorState` (UI-005, REQ-SEC-001).
- [x] **T1.12 — Item "aguardando validação"** — No contrato atual o mapa `campo→validador` é **vazio**: nenhuma seção do perfil gera item em validação, e "Minhas Solicitações" é somente leitura (sem affordance de re-edição). RN-002 é garantida server-side. Sem UI adicional necessária hoje; revisitar se o backend popular o roteamento.
- [x] **T1.13 — Testes** — `tests/components/perfil/PerfilView.test.tsx`: "+" adiciona idioma sem navegação (mock da action); modo leitura sem "+"; modo leitura sem "Minhas Solicitações"; os 3 status renderizam; estado vazio. **Verificado:** `tsc` OK · `lint` OK · `jest` 25/25 (6 suítes) · `build` OK (rota `/perfil` e `/perfil/[id]`).
- [x] **T1.14 — Divergência mockup × `DESIGN.md`** `▶ livre` — Registrada como **Q-018** em `../OPEN-QUESTIONS.md` (renumerada da ex-Q-017, que o backend reatribuiu à integração Turmalina); implementação segue `#f7f4ed` do `DESIGN.md`.

**Critérios de aceite (spec):** CA-FE-001 (perfil consolidado), CA-FE-002 ("+" inline sem navegação), CA-FE-003 (3 status na aba de solicitações), CA-FE-004 (mockup sincronizada + `DESIGN.md`).

---

## FE-0002 — Cursos e Certificados

Rota: `/(portal)/cursos`. Dep.: FE-0001. Decidido (2026-09-02): Q-012 — aviso da RN-005 oferece **apenas progressão** com texto explicando a omissão da qualificação; Q-014 — "requisito do cargo" vem de cadastro por cargo mantido pelo RH.

Contrato: `docs/contracts/backend-api.md` › BE-0002.

- [x] **T2.1 — Interfaces/enums** — `interfaces/Curso.ts` (`Curso`, `CertificadoUpload`, requests de cadastro/edição, `CadastroCursoResultado`, `OfertaBeneficio`, `UtilizacaoCurso`) + `NivelFormacaoEnum`, `StatusVerificacaoEnum`, `TipoCursoEnum` (valores do contrato).
- [x] **T2.2 — Schema Zod formação** — `service/curso.schema.ts` `formacaoFormSchema` (área, nível, nome, anoInício, anoFim?, horas?, **certificado obrigatório** via `z.custom` no nível do campo — RN-001; ano 1900–2100; anoFim ≥ anoInício). **Divergência da spec UI-001:** não há campo "utilização" — o contrato não o inclui (Q-014: derivado de `RequisitoDeCargo`).
- [x] **T2.3 — Schema Zod capacitação** — `capacitacaoFormSchema` (nome, instituição?, ano?, cargaHorária?, descrição?, certificado obrigatório). Utilização restrita a progressão é server-side (RN-009).
- [x] **T2.4 — Upload de certificado** — `components/cursos/CampoCertificado.tsx`: `<input type=file>` acionado por botão (operável por teclado — A11Y-001), `accept` PDF/PNG/JPG, limite 5 MB, `FileReader` → base64 → `CertificadoUploadDto`. Sem `dangerouslySetInnerHTML`.
- [x] **T2.5 — `service/curso.service.ts` + `actions/curso.actions.ts`** — leituras (`listarMeusCursos`, `getCurso`, `getUtilizacaoCurso`) validadas com Zod; escritas (`cadastrarFormacao`, `cadastrarCapacitacao`, `editarFormacao`, `editarCapacitacao`, `substituirCertificado`, `excluirCurso`) + `revalidatePath('/cursos')`.
- [x] **T2.6 — Lista de cursos com status** — `ListaCursos` + `CursoStatusBadge` (`Tag`): "Pendente de verificação" como subtítulo até `VALIDADO`; motivo exibido em `RECUSADO`; tags de utilização.
- [x] **T2.7 — Visibilidade do status de utilização** — `/cursos` é a página do próprio servidor; `page.tsx` busca `getUtilizacaoCurso` por curso (`requisitoDoCargo` + `utilizado*`). RN-003 (visível a dono e RH) satisfeita pelo contexto; `usePermissao` não é necessário aqui.
- [x] **T2.8 — Oferta condicional (RN-005 / Q-012)** — `OfertaBeneficioAviso`: após cadastrar, exibe `CadastroCursoResultado.ofertaBeneficio` (progressão e/ou qualificação) + `mensagem` (explica a omissão da qualificação). A solicitação em si é FE-0004.
- [x] **T2.9 — Estados + testes** — carregando (`app/loading.tsx`), vazio (`EmptyState`), erro (`ErrorState` + toast), sucesso (toast + oferta). Testes `tests/components/cursos/Cursos.test.tsx`: cadastro sem certificado bloqueado (CA-FE-001), "Pendente de verificação" no curso novo (CA-FE-002), aviso RN-005 + mensagem, sem oferta não renderiza. **Verificado:** tsc/lint/jest 30/30/build OK.
- [x] **T2.10 — Tela de validação da Comissão (UI-006 / CA-FE-003)** — Rota `/(portal)/cursos/validacao`: lista de pendentes (`listarCursosPendentes`), `DetalheCurso` (dados), **ver certificado** via proxy autenticado `GET /api/cursos/[id]/certificado` (route handler com Bearer da sessão), `DecisaoValidacao` (validar / recusar com **motivo obrigatório** — CA-FE-003), `EditarCurso` (`FormEditarFormacao`/`FormEditarCapacitacao` reusando `CamposFormacao`/`CamposCapacitacao` com `semCertificado` — RN-006). `HttpError` 403 → `SemPermissao`; vazio → `EmptyState`. Link em `/cursos` gated por `usePermissao().pode('cursos.validar')` (stub visível em dev; gate real é o 403 da página). Testes em `tests/components/cursos/Validacao.test.tsx`.

---

## FE-0003 — Busca de Talentos

Rota: `/(portal)/busca`. Dep.: FE-0001, FE-0002. Decidido (2026-09-02): Q-013 — % de correspondência é proporção simples (filtros atendidos ÷ total selecionado), peso igual entre todos os tipos de filtro.

- [ ] **T3.1 — Interfaces** `⛔ BE-0003` — `FiltroBusca` (formação área/nível, curso, competências, lotação, idiomas — seleção múltipla), `ResultadoBusca` (servidor + % de correspondência).
- [ ] **T3.2 — Painel de filtros** `▶ livre (visual)` — Multi-select por filtro (PrimeReact/shared-ui); layout responsivo do `DESIGN.md`.
- [ ] **T3.3 — `service/busca.service.ts`** `⛔ BE-0003` — Executar busca com filtros; resposta ≤ 3s (RNF-001, responsabilidade do backend).
- [ ] **T3.4 — Lista de resultados** `⛔ BE-0003` — Exibir % de correspondência quando >1 filtro; **ocultar 0%** (RN-013). Q-013 respondida: % = filtros atendidos ÷ total de filtros selecionados (peso igual).
- [ ] **T3.5 — Ordenação** `▶ livre` — Correspondência / Lotação / Alfabético / Nível de Formação; última ordenação = critério principal, anterior = secundário (RN-014).
- [ ] **T3.6 — Abertura do currículo** `⛔ BE-0001` — Ícone de lupa abre `perfil/[id]` em modo leitura (reusa T1.11).
- [ ] **T3.7 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio (nenhum resultado)/erro; testes de ordenação principal/secundária.

---

## FE-0004 — Benefícios (Adicional de Qualificação e Progressão Funcional)

Rota: `/(portal)/beneficios`. Dep.: FE-0002. Sem questão aberta que afete o FE (Q-016 resolvida; Q-017/Turmalina é interno ao backend). Endpoints BE-0004: `POST /api/v1/beneficios/solicitacoes`, `POST /api/v1/beneficios/solicitacoes/{id}/decisao`.

- [ ] **T4.1 — Interfaces/enums** `⛔ BE-0004` — `SolicitacaoBeneficio`, `TipoBeneficio` (`QUALIFICACAO | PROGRESSAO`), status (`AGUARDANDO | APROVADA | RECUSADA`).
- [ ] **T4.2 — Seleção de curso elegível** `⛔ BE-0004` — Só cursos validados com status "Não utilizado para qualificação/progressão" (RN-007); impedir envio com curso já utilizado (EXC-001).
- [ ] **T4.3 — `service/beneficios.service.ts`** `⛔ BE-0004` — Criar/listar/acompanhar solicitação.
- [ ] **T4.4 — Tela de solicitação** `⛔ BE-0004` — Formulário vinculado ao curso; desabilitar submit durante envio; impedir submissão duplicada.
- [ ] **T4.5 — Acompanhamento de status** `⛔ BE-0004` — Lista com status e histórico.
- [ ] **T4.6 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio/erro/sucesso; teste de bloqueio EXC-001.

---

## FE-0005 — Permuta de Lotação

Rota: `/(portal)/permutas`. Dep.: FE-0001. Q-015 resolvida (backend, 2026-09-01): a aba pública (`GET /api/v1/permutas/abertas`) é **anônima** — só lotação/cidade origem-destino + status; identidade só a partir de `AGUARDANDO_APROVACAO_CHEFIA` (aceite mútuo confirmado). Q-016 resolvida; Q-017/Turmalina é interno ao backend.

- [ ] **T5.1 — Interfaces/enums** `⛔ BE-0005` — `SolicitacaoPermuta`, estados do fluxo (`AGUARDANDO_ACEITE_USUARIO | AGUARDANDO_APROVACAO_CHEFIA | AGUARDANDO_VALIDACAO_RH | APROVADA | RECUSADA`).
- [ ] **T5.2 — Formulário de solicitação** `⛔ BE-0005` — Seleção de lotação ou cidade desejada.
- [ ] **T5.3 — `service/permutas.service.ts`** `⛔ BE-0005` — Criar solicitação; aceitar/recusar; consultar aba pública.
- [ ] **T5.4 — Aba "Solicitações" (minhas)** `⛔ BE-0005` — Status em todas as etapas do fluxo FB-003; ações contextuais (aceitar/confirmar/recusar) conforme estado.
- [ ] **T5.5 — Aba pública "Permutas"** `⛔ BE-0005` — Lista de permutas em aberto visível a todos. Q-015 respondida: exibir **somente lotação/cidade de origem e destino**; sem nome ou identificação do solicitante até o aceite mútuo.
- [ ] **T5.6 — Regras de UI do fluxo** `⛔ BE-0005` — Refletir RN-010 (bloqueio 180 dias), RN-011 (não re-solicitar permuta recusada pelo próprio), RN-012 (não reaceitar) — desabilitando/ocultando ações; proteção real é server-side.
- [ ] **T5.7 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio/erro/sucesso; testes de renderização por estado do fluxo.
