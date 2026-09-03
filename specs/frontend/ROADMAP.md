# Roadmap de specs — Frontend

## Situação

- Última atualização: 2026-09-02
- As 5 specs de frontend foram **aprovadas pelo usuário** em 2026-09-01 (status `Aprovada`).
- As specs de backend BE-0001 a BE-0005 foram **aprovadas** (2026-09-01) e **implementadas localmente** pelo agente de backend (BE-0001..0003 completas; BE-0004/0005 fatia (i) — domínio + porta Turmalina inerte). Ver `../backend/PLANO-DE-IMPLEMENTACAO.md`.
- **Contrato de API — resolvido pela opção (b) (2026-09-02).** Fonte = OpenAPI vivo do backend (`${NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`, base dev `http://localhost:8080/api/gestao-talento`). Snapshot derivado do código-fonte (`GestaoTalento-backend@defcbbe`) em **`../../contracts/backend-api.md`**; regeneração do JSON via `npm run openapi:fetch` (`scripts/fetch-openapi.mjs`) com o backend no ar. `src/interfaces/*` e schemas Zod passam a ser derivados desse contrato — **a camada de dados de FE-0001/0002/0003 está desbloqueada**. Divergência contrato × tela → registrar em `../OPEN-QUESTIONS.md`, não improvisar.
- **Questões abertas: nenhuma.** Q-012 a Q-016 resolvidas pelo backend em 2026-09-01; Q-017 (contrato da integração Turmalina) resolvida em 2026-09-02 — contrato provisório REST síncrono, ação pendente do agente de backend (fatia ii de BE-0004/0005; o frontend nunca fala com o Turmalina); Q-018 (cor de fundo de FE-0001) resolvida — segue o `DESIGN.md` `#f7f4ed`. Ver `../OPEN-QUESTIONS.md` › Decisões respondidas.
- **Progresso 2026-09-02:** **Fase 0 ✅** · **FE-0001 ✅** · **FE-0002 ✅** (T2.1–T2.10) · **FE-0003 ✅** (T3.1–T3.7) · **FE-0004 ✅** (T4.1–T4.6) · **FE-0005 ✅** (T5.1–T5.7: nova permuta, aba pública anônima Q-015, "minhas" com stepper FB-003 + confirmar/recusar aceite). **Todas as 5 specs de frontend têm o lado do servidor implementado e verificado** (`jest` 55, `build` verde).
- **Telas de papéis administrativos implementadas** (`usePermissao` ainda stub — gate real é o 403 server-side): FE-0002 T2.10 (Comissão) · FE-0004 T4.7 (RH — benefício) · FE-0005 T5.8 (Chefia/RH — permuta). **Q-019 / Q-020 resolvidas (backend, 2026-09-02):** as filas agora usam `GET /beneficios/solicitacoes/pendentes`, `GET /permutas/pendentes-chefia` e `GET /permutas/pendentes-rh`.
- **✅ Verificação estática (2026-09-02):** `tsc --noEmit` OK · `lint` OK (0 erros; 1 warning pré-existente em `error.tsx`) · `jest` **58/58** (12 suítes) · `build` OK (14 rotas).
- **✅ Verificação e2e (2026-09-02)** contra o backend rodando em `localhost:8080`:
  - `/actuator/health` → 200; `npm run openapi:fetch` → `docs/contracts/openapi.json` (28 rotas). O OpenAPI vivo **bate campo a campo** com `src/interfaces/*` e schemas Zod (endpoints, DTOs, enums) — contrato confirmado.
  - Todos os endpoints retornam **401 sem token** (wiring OK; guarda de auth OK).
  - Frontend (`next start`): `/login` 200 e renderiza; `/perfil` → 307 para `/login?callbackUrl=…` (middleware OK).
  - **Não exercido:** fluxo autenticado ponta a ponta (login → CRUD) — exige Keycloak (`keycloak-dev.mpms.mp.br`, rede MPMS / P3 do PLANO).

## Specs

| Ordem | ID | Funcionalidade | Status | Mockup | Dependência funcional | Bloqueio de implementação | Próxima ação |
|---:|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | **Implementada** | Sincronizada | — | — | ✅ T1.1–T1.14 (tsc/lint/jest 25/25/build verdes). Falta: verificação e2e contra o backend rodando |
| 2 | 0002 | Cursos e Certificados | **Implementada** | Sincronizada | 0001 | — | ✅ T2.1–T2.10 (tsc/lint/jest 33/build verdes). Falta: verificação e2e contra o backend |
| 3 | 0003 | Busca de Talentos | **Implementada** | Sincronizada | 0001, 0002 | — | ✅ T3.1–T3.7 (tsc/lint/jest 38/build verdes). Falta: verificação e2e contra o backend |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | **Implementada** | Sincronizada | 0002 | — | ✅ T4.1–T4.7 (fila via `GET /beneficios/solicitacoes/pendentes`). Falta: e2e autenticado contra o backend |
| 5 | 0005 | Permuta de Lotação | **Implementada** | Sincronizada | 0001 | — | ✅ T5.1–T5.8 (filas via `GET /permutas/pendentes-chefia` + `/pendentes-rh`). Falta: e2e autenticado contra o backend |

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

Contrato: `docs/contracts/backend-api.md` › BE-0003.

- [x] **T3.1 — Interfaces** — `interfaces/Busca.ts` (`FiltroBusca`, `ResultadoBusca`) + `enums/CriterioOrdenacaoEnum.ts` (+ helper `proximaOrdenacao` — RN-014).
- [x] **T3.2 — Painel de filtros** — `components/busca/PainelFiltros.tsx`: `Chips` (área, curso, competências, lotação, idiomas — texto multivalorado, `max=50`) + `MultiSelect` (níveis, enum). `<label htmlFor>` associado, grid PrimeFlex responsivo.
- [x] **T3.3 — `service/actions/busca.actions.ts`** — `buscarServidores(filtro)` → `POST /api/v1/busca/servidores`, resposta validada com `busca.schema.ts`. (É POST por causa do corpo, mas é consulta — sem `revalidatePath`.)
- [x] **T3.4 — Lista de resultados** — `ListaResultados`/`ItemResultado`: foto (`Avatar` iniciais), nome, nível+lotação, `percentualCorrespondencia` **só quando não nulo**; `filtrarVisiveis` remove 0% (RN-013 — defensivo; backend já omite). Contagem "Resultados (N)".
- [x] **T3.5 — Ordenação** — `BarraOrdenacao`: 4 critérios; `proximaOrdenacao` coloca a escolha como 1º e a anterior como 2º; troca de critério re-executa a busca com `ordenacao: [principal, secundária]`.
- [x] **T3.6 — Abertura do currículo** — ícone `pi pi-search-plus` = `<Link href="/perfil/{id}">` (modo leitura, reusa T1.11).
- [x] **T3.7 — Estados + testes** — inicial (convite), carregando (`LoadingState`), erro (`ErrorState` + "Tentar novamente"), vazio ("Nenhum resultado…"), sucesso. Testes `tests/components/busca/Busca.test.tsx`: `proximaOrdenacao` (CA-FE-003), badge 1º/2º, oculta 0% (CA-FE-002), omite % nulo. **Verificado:** tsc/lint/jest 38/build OK.

---

## FE-0004 — Benefícios (Adicional de Qualificação e Progressão Funcional)

Rota: `/(portal)/beneficios`. Dep.: FE-0002. Sem questão aberta que afete o FE (Q-016 resolvida; Q-017/Turmalina é interno ao backend). Endpoints BE-0004: `POST /api/v1/beneficios/solicitacoes`, `POST /api/v1/beneficios/solicitacoes/{id}/decisao`.

Contrato: `docs/contracts/backend-api.md` › BE-0004. `status` reusa `StatusSolicitacao` (AGUARDANDO_VALIDACAO/APROVADA/RECUSADA) e `StatusSolicitacaoBadge`.

- [x] **T4.1 — Interfaces/enums** — `interfaces/Beneficio.ts` (`SolicitarBeneficioRequest`, `SolicitacaoBeneficio`, `DecisaoBeneficioRequest`) + `enums/TipoBeneficioEnum.ts` (`QUALIFICACAO`/`PROGRESSAO` + rótulos).
- [x] **T4.2 — Seleção de curso elegível** — `components/beneficios/elegibilidade.ts` `elegibilidadeBeneficio(curso, utilizacao, solicitacoes)`: só `VALIDADO`; qualificação só formação, não utilizada, **não requisito do cargo**; progressão se não utilizada; **bloqueia se já há solicitação `AGUARDANDO_VALIDACAO` para o mesmo curso+tipo** (RN-007 / EXC-001 / anti-duplicidade).
- [x] **T4.3 — `service/beneficio.service.ts` + `actions/beneficio.actions.ts`** — `listarSolicitacoesBeneficio` (Zod) + `solicitarBeneficio` (`POST`, 201) + `revalidatePath('/beneficios')`.
- [x] **T4.4 — Tela de solicitação** — `CursoElegivel`: botões "Solicitar Qualificação"/"Solicitar Progressão" (texto explícito, ≥40px — A11Y-001) só quando elegível; `useTransition` desabilita durante o envio; duplicidade prevenida pela elegibilidade. Vinculado ao curso via `cursoId`.
- [x] **T4.5 — Acompanhamento de status** — `MinhasSolicitacoesBeneficio`: "TipoBenefício — cursoNome" + `StatusSolicitacaoBadge`; motivo exibido em `RECUSADA` (UI-003 / CA-FE-002).
- [x] **T4.6 — Estados + testes** — carregando (`app/loading.tsx`), vazio (`EmptyState`), erro (`ErrorState`), sucesso (toast + `router.refresh`). `tests/components/beneficios/Beneficios.test.tsx`: elegibilidade (validado/pendente/utilizado/requisito/capacitação/**duplicidade EXC-001**), `CursoElegivel` ações vs "não elegível", acompanhamento. **Verificado:** tsc/lint/jest 48/build OK.
- [x] **T4.7 — Tela de decisão do RH** — Rota `/(portal)/beneficios/decisao`: `FilaDecisaoBeneficio` + `DecisaoAdmin` (aprovar/recusar, motivo obrigatório na recusa) → `decidirBeneficio` (`POST /{id}/decisao`). `HttpError` 403 → `SemPermissao`; link em `/beneficios` gated por `usePermissao().pode('beneficios.decidir')`. **Q-019 resolvida (backend, 2026-09-02):** a fila usa `GET /api/v1/beneficios/solicitacoes/pendentes` (`listarSolicitacoesBeneficioPendentes`) — solicitações `AGUARDANDO_VALIDACAO` de todo o órgão, sem filtro client-side.

---

## FE-0005 — Permuta de Lotação

Rota: `/(portal)/permutas`. Dep.: FE-0001. Q-015 resolvida (backend, 2026-09-01): a aba pública (`GET /api/v1/permutas/abertas`) é **anônima** — só lotação/cidade origem-destino + status; identidade só a partir de `AGUARDANDO_APROVACAO_CHEFIA` (aceite mútuo confirmado). Q-016 resolvida; Q-017/Turmalina é interno ao backend.

Contrato: `docs/contracts/backend-api.md` › BE-0005. `StatusPermuta` tem 6 estados (inclui `AGUARDANDO_CONFIRMACAO_INICIAL`).

- [x] **T5.1 — Interfaces/enums** — `interfaces/Permuta.ts` (`CriarPermutaRequest`, `ConfirmacaoAceiteRequest`, `DecisaoPermutaRequest`, `Permuta`, `PermutaAberta`) + `enums/StatusPermutaEnum.ts` (6 estados + rótulos).
- [x] **T5.2 — Formulário de solicitação** — `NovaPermuta` (RHF + Zod: `destinoLotacao`/`destinoCidade`, **ao menos um** — `novaPermutaFormSchema`), collapsible, "Publicar solicitação".
- [x] **T5.3 — `service/permuta.service.ts` + `actions/permuta.actions.ts`** — `listarMinhasPermutas` / `listarPermutasAbertas` (Zod) + `criarPermuta` / `aceitarPermuta` / `confirmarAceite` + `revalidatePath('/permutas')`.
- [x] **T5.4 — "Minhas solicitações"** — `MinhasPermutas`/`ItemMinhaPermuta`: `EtapasPermuta` (stepper FB-003: Aceite → Chefia → RH, etapa atual por `StatusPermuta`) + `PermutaStatusBadge` (6 estados); ação contextual **Confirmar / Recusar aceite** apenas em `AGUARDANDO_CONFIRMACAO_INICIAL` (o backend valida se o usuário é o solicitante). Motivo exibido em `RECUSADA`.
- [x] **T5.5 — Permutas em aberto** — `PermutasAbertas`/`ItemPermutaAberta`: `RotaPermuta` (origem→destino, **sem identidade** — Q-015) + "Iniciar permuta" = `aceitarPermuta`.
- [x] **T5.6 — Regras de UI do fluxo** — ações oferecidas só conforme o `status` atual; RN-010/011/012 (bloqueio 180 d, não re-solicitar/reaceitar) **não estão nas respostas do contrato** → o FE não consegue pré-desabilitar por esse estado; a violação é rejeitada pelo backend e o erro aparece via toast. Documentado.
- [x] **T5.7 — Estados + testes** — carregando/vazio/erro/sucesso; `tests/components/permutas/Permutas.test.tsx`: etapa atual do stepper, stepper oculto em `RECUSADA`, ações só em `AGUARDANDO_CONFIRMACAO_INICIAL`, aba pública anônima + vazio, schema exige lotação|cidade. **Verificado:** tsc/lint/jest 55/build OK.
- [x] **T5.8 — Telas de decisão de Chefia e RH** — Rota `/(portal)/permutas/decisao`: `FilaDecisaoPermuta` + `DecisaoAdmin`; escolhe `aprovarComoChefia` (status `AGUARDANDO_APROVACAO_CHEFIA`) ou `validarComoRh` (`AGUARDANDO_VALIDACAO_RH`), motivo obrigatório na recusa. 403 → `SemPermissao`; link em `/permutas` gated por `usePermissao().pode('permutas.decidir')`. **Q-020 resolvida (backend, 2026-09-02):** a tela consome `GET /api/v1/permutas/pendentes-chefia` (`listarPermutasPendentesChefia`) + `GET /api/v1/permutas/pendentes-rh` (`listarPermutasPendentesRh`) em paralelo, cada fila tolera 403 conforme o papel — `SemPermissao` só quando as duas negam. Sem filtro client-side.
