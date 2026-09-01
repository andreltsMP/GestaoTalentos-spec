# Roadmap de specs — Frontend

## Situação

- Última atualização: 2026-09-01
- As 5 specs de frontend foram **aprovadas pelo usuário** em 2026-09-01 (status `Aprovada`).
- As specs de backend correlatas permanecem `Draft` e **ainda não publicaram contratos de API** (endpoints, schemas de request/response, modelo de dados). Isso não bloqueia o planejamento, mas bloqueia a implementação das camadas de dados de cada feature (ver "Bloqueios" abaixo).
- Questões em aberto Q-012 a Q-016 permanecem registradas em `../OPEN-QUESTIONS.md`; as que afetam decisão de UI estão anotadas por feature.

## Specs

| Ordem | ID | Funcionalidade | Status | Mockup | Dependência funcional | Bloqueio de implementação | Próxima ação |
|---:|---|---|---|---|---|---|---|
| 1 | 0001 | Perfil e Cadastro do Servidor | Aprovada | Sincronizada | — | ⛔ BE-0001 (contrato + modelo de dados do perfil) | Detalhar contrato com o time de backend; iniciar tarefas não bloqueadas (F0, T1.5/T1.6/T1.8) |
| 2 | 0002 | Cursos e Certificados | Aprovada | Sincronizada | 0001 | ⛔ BE-0002 (contrato + upload de certificado); Q-012, Q-014 | Aguardar BE-0001; confirmar Q-012 (mensagem RN-005) e Q-014 (origem "requisito do cargo") |
| 3 | 0003 | Busca de Talentos | Aprovada | Sincronizada | 0001, 0002 | ⛔ BE-0003 (contrato de busca + % de correspondência); Q-013 | Confirmar fórmula do % (Q-013) para exibição/ordenação corretas |
| 4 | 0004 | Benefícios (Qualificação/Progressão Funcional) | Aprovada | Sincronizada | 0002 | ⛔ BE-0004 (contrato de solicitação de benefício) | Aguardar BE-0002 |
| 5 | 0005 | Permuta de Lotação | Aprovada | Sincronizada | 0001 | ⛔ BE-0005 (contrato do fluxo de permuta); Q-015 | Confirmar Q-015 (exposição de dados na aba pública) — é gate de UI |

## Regra de execução

- Implementar na ordem apresentada, respeitando as dependências funcionais.
- Tarefas marcadas `⛔ BE-000X` só entram em implementação após o contrato de API correspondente estar publicado e revisado.
- Tarefas marcadas `▶ livre` podem ser implementadas imediatamente (dependem apenas de mockup + `DESIGN.md`).
- Nenhuma feature é considerada concluída sem: critérios de aceite da spec atendidos, estados (loading/vazio/erro/sem permissão/sucesso), acessibilidade do `DESIGN.md`, testes, e `lint`/`typecheck`/`build` verdes.
- `docs/specs/backend/` é somente leitura para este agente.

## Legenda

- `▶ livre` — sem bloqueio; pode começar já.
- `⛔ BE-000X` — bloqueado pelo contrato de API do backend indicado.
- `❓ Q-0XX` — depende de resposta a questão em aberto.

---

## Fase 0 — Fundação (transversal, precede as features)

- [ ] **F0.1 — Shell da aplicação** `❓ shared-ui` — Header (70px, friso `#337259`) + Sidebar (250px) conforme `DESIGN.md`, com os 5 itens de navegação do mockup (Meu Perfil, Busca de Talentos, Cursos e Certificados, Qualificação/Progressão, Permuta de Lotação). Depende de confirmar se o `BaseLayout` do `@mpms/shared-ui` já fornece esse shell; substituir/adaptar `Header.tsx`/`Sidebar.tsx`/`PortalMenu.tsx` genéricos (hoje com `style={{}}` inline, proibido).
- [x] **F0.2 — Rebrand** `▶ livre` — Feito em `layout.tsx` (metadata), `package.json` (`name`), `login/page.tsx` e texto de marca do `Header.tsx`. Nav e estrutura do shell (Sidebar/menu) seguem para F0.1.
- [ ] **F0.3 — Componentes de estado** `▶ livre` — `src/components/shared/`: `LoadingState`, `EmptyState` (border-dashed border-2, ícone `text-4xl`), `ErrorState` (sem stack trace), `SemPermissao`.
- [ ] **F0.4 — Hook `usePermissao`** `⛔ permissionamento` — Consumir o microsserviço `_git/permissionamento` (AGENTS.md). Depende do contrato desse serviço.
- [ ] **F0.5 — Toast centralizado** `▶ livre` — Provider de `Toast` (PrimeReact) em `src/service/`, mensagens em português, para feedback de escrita.
- [ ] **F0.6 — Remoção do scaffold `Pessoa`** `▶ livre` — Remover `(portal)/cadastros/`, `PessoaForm`, `PessoaTable`, `pessoaActions`, `interfaces/Pessoa.ts` e testes correlatos após F0.1/F0.2 (é código de exemplo do template).
- [ ] **F0.7 — Ajuste do `middleware.ts`** `▶ livre` — Atualizar o `matcher` para as rotas reais do portal (`/perfil`, `/busca`, `/cursos`, `/beneficios`, `/permutas`) no lugar de `/dashboard` e `/cadastros`.

---

## FE-0001 — Perfil e Cadastro do Servidor

Rotas: `/(portal)/perfil` (próprio), `/(portal)/perfil/[id]` (leitura, origem: busca 0003).
Aberto: `❓ Q-016` (retenção/exclusão LGPD — pode exigir ação de exportação/exclusão de dados).

- [ ] **T1.1 — `interfaces/Perfil.ts`** `⛔ BE-0001` — `Perfil`, `Lotacao`, `Idioma`, `Competencia`, `Experiencia`, `Comissao`, `SolicitacaoAtualizacao`. Campos de cada seção dependem do modelo de dados do BE-0001.
- [x] **T1.2 — `enums/StatusSolicitacaoEnum.ts`** `▶ livre` — `AguardandoValidacao | Aprovada | Recusada`.
- [ ] **T1.3 — Schemas Zod por seção** `⛔ BE-0001` — idioma, competência, experiência, comissão (campos pendentes de contrato).
- [ ] **T1.4 — `service/perfil.service.ts` + actions** `⛔ BE-0001` — `getPerfilProprio`, `getPerfilPorId`, `adicionarItemSecao`, `enviarParaValidacao`, `listarSolicitacoes`. Validar resposta com Zod.
- [x] **T1.5 — `components/perfil/PerfilHeader.tsx`** `▶ livre` — Avatar (`Avatar` PrimeReact, `shape="circle"`), nome, cargo, lotação (nome + cidade) (UI-001). Props simples; candidato ao DS.
- [x] **T1.6 — `components/perfil/PerfilSecaoCard.tsx`** `▶ livre` — Card genérico: título + botão "+" (`aria-label`, ≥40px) + `children` como linhas; variante de estado vazio (border-dashed) (UI-002). Candidato ao DS.
- [ ] **T1.7 — Formulários inline por seção** `⛔ BE-0001` — RHF + Zod, label associado, `focus-ring`, sem navegação de página (fluxo principal). Depende de T1.3.
- [x] **T1.8 — `components/perfil/StatusSolicitacaoBadge.tsx`** `▶ livre` — `Tag` PrimeReact com `severity` (warning/success/secondary) + ícone, a partir do enum `StatusSolicitacao` (UI-003). Cores via tema do DS (sem hex arbitrário).
- [ ] **T1.9 — "Minhas Solicitações"** `⛔ BE-0001` — Tabela: descrição + status + data de envio (UI-004). Depende de T1.4.
- [ ] **T1.10 — Página `perfil/page.tsx`** `⛔ BE-0001` — Orquestra hooks; estados loading/vazio/erro/sucesso (Estados de interface).
- [ ] **T1.11 — Página `perfil/[id]/page.tsx`** `⛔ BE-0001` — Modo leitura, sem controles de edição; estado "sem permissão" ao tentar editar terceiro (UI-005, REQ-SEC-001).
- [ ] **T1.12 — Bloqueio de edição de item "aguardando validação"** `⛔ BE-0001` — Fluxo de erro da spec: impedir edição direta, exibir aviso, preservar solicitação em andamento.
- [ ] **T1.13 — Testes** `▶ livre / ⛔ parcial` — RTL: "+" adiciona item sem navegação; render dos 3 status; modo leitura sem "+". Casos que tocam service dependem de T1.4.
- [x] **T1.14 — Divergência mockup × `DESIGN.md`** `▶ livre` — Registrada como Q-017 em `../OPEN-QUESTIONS.md`; implementação segue `#f7f4ed` do `DESIGN.md`.

**Critérios de aceite (spec):** CA-FE-001 (perfil consolidado), CA-FE-002 ("+" inline sem navegação), CA-FE-003 (3 status na aba de solicitações), CA-FE-004 (mockup sincronizada + `DESIGN.md`).

---

## FE-0002 — Cursos e Certificados

Rota: `/(portal)/cursos`. Dep.: FE-0001. Aberto: `❓ Q-012` (mensagem RN-005), `❓ Q-014` (origem "requisito do cargo").

- [ ] **T2.1 — Interfaces/enums** `⛔ BE-0002` — `CursoFormacaoAcademica`, `CursoCapacitacao`, `StatusVerificacao` (`PENDENTE_VERIFICACAO | VALIDADO | RECUSADO`), `StatusUtilizacao` (formação: 5 valores; capacitação: 2 valores — RN-003/RN-004).
- [ ] **T2.2 — Schema Zod de cadastro de formação** `⛔ BE-0002 / ❓ Q-014` — área de formação, nível, nome do curso, ano início, ano fim, quantidade de horas, utilização; **certificado obrigatório** (RN-001).
- [ ] **T2.3 — Schema Zod de cadastro de capacitação** `⛔ BE-0002` — certificado obrigatório; utilização restrita a progressão (RN-009).
- [ ] **T2.4 — Upload de certificado** `⛔ BE-0002` — Componente de upload (PrimeReact/shared-ui), validação de obrigatoriedade e tipo/tamanho; sem `dangerouslySetInnerHTML`.
- [ ] **T2.5 — `service/cursos.service.ts`** `⛔ BE-0002` — cadastrar/listar/atualizar curso; anexar certificado.
- [ ] **T2.6 — Lista de cursos com status** `▶ livre (visual)` — Card/lista exibindo status de verificação como subtítulo ("Pendente de verificação" até validação — RN-002).
- [ ] **T2.7 — Visibilidade do status de utilização** `⛔ BE-0002` — Exibir status de utilização **apenas** ao próprio servidor e ao RH (RN-003); depende de `usePermissao` (F0.4).
- [ ] **T2.8 — Oferta condicional de uso (RN-005)** `❓ Q-012` — Ao cadastrar formação não-requisito e não utilizada, oferecer progressão/qualificação; qualificação só se não houver outra formação de mesmo nível já usada. Mensagem pendente de Q-012.
- [ ] **T2.9 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio/erro/sucesso; testes de schema (válido/ inválido/ certificado ausente) e do fluxo RN-005.

---

## FE-0003 — Busca de Talentos

Rota: `/(portal)/busca`. Dep.: FE-0001, FE-0002. Aberto: `❓ Q-013` (fórmula do % de correspondência).

- [ ] **T3.1 — Interfaces** `⛔ BE-0003` — `FiltroBusca` (formação área/nível, curso, competências, lotação, idiomas — seleção múltipla), `ResultadoBusca` (servidor + % de correspondência).
- [ ] **T3.2 — Painel de filtros** `▶ livre (visual)` — Multi-select por filtro (PrimeReact/shared-ui); layout responsivo do `DESIGN.md`.
- [ ] **T3.3 — `service/busca.service.ts`** `⛔ BE-0003` — Executar busca com filtros; resposta ≤ 3s (RNF-001, responsabilidade do backend).
- [ ] **T3.4 — Lista de resultados** `⛔ BE-0003 / ❓ Q-013` — Exibir % de correspondência quando >1 filtro; **ocultar 0%** (RN-013).
- [ ] **T3.5 — Ordenação** `▶ livre` — Correspondência / Lotação / Alfabético / Nível de Formação; última ordenação = critério principal, anterior = secundário (RN-014).
- [ ] **T3.6 — Abertura do currículo** `⛔ BE-0001` — Ícone de lupa abre `perfil/[id]` em modo leitura (reusa T1.11).
- [ ] **T3.7 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio (nenhum resultado)/erro; testes de ordenação principal/secundária.

---

## FE-0004 — Benefícios (Adicional de Qualificação e Progressão Funcional)

Rota: `/(portal)/beneficios`. Dep.: FE-0002. Aberto: `❓ Q-016`.

- [ ] **T4.1 — Interfaces/enums** `⛔ BE-0004` — `SolicitacaoBeneficio`, `TipoBeneficio` (`QUALIFICACAO | PROGRESSAO`), status (`AGUARDANDO | APROVADA | RECUSADA`).
- [ ] **T4.2 — Seleção de curso elegível** `⛔ BE-0004` — Só cursos validados com status "Não utilizado para qualificação/progressão" (RN-007); impedir envio com curso já utilizado (EXC-001).
- [ ] **T4.3 — `service/beneficios.service.ts`** `⛔ BE-0004` — Criar/listar/acompanhar solicitação.
- [ ] **T4.4 — Tela de solicitação** `⛔ BE-0004` — Formulário vinculado ao curso; desabilitar submit durante envio; impedir submissão duplicada.
- [ ] **T4.5 — Acompanhamento de status** `⛔ BE-0004` — Lista com status e histórico.
- [ ] **T4.6 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio/erro/sucesso; teste de bloqueio EXC-001.

---

## FE-0005 — Permuta de Lotação

Rota: `/(portal)/permutas`. Dep.: FE-0001. Aberto: `❓ Q-015` (exposição de dados na aba pública — **gate de UI**), `❓ Q-016`.

- [ ] **T5.1 — Interfaces/enums** `⛔ BE-0005` — `SolicitacaoPermuta`, estados do fluxo (`AGUARDANDO_ACEITE_USUARIO | AGUARDANDO_APROVACAO_CHEFIA | AGUARDANDO_VALIDACAO_RH | APROVADA | RECUSADA`).
- [ ] **T5.2 — Formulário de solicitação** `⛔ BE-0005` — Seleção de lotação ou cidade desejada.
- [ ] **T5.3 — `service/permutas.service.ts`** `⛔ BE-0005` — Criar solicitação; aceitar/recusar; consultar aba pública.
- [ ] **T5.4 — Aba "Solicitações" (minhas)** `⛔ BE-0005` — Status em todas as etapas do fluxo FB-003; ações contextuais (aceitar/confirmar/recusar) conforme estado.
- [ ] **T5.5 — Aba pública "Permutas"** `⛔ BE-0005 / ❓ Q-015` — Lista de permutas em aberto visível a todos. Nível de exposição de identidade pendente de Q-015.
- [ ] **T5.6 — Regras de UI do fluxo** `⛔ BE-0005` — Refletir RN-010 (bloqueio 180 dias), RN-011 (não re-solicitar permuta recusada pelo próprio), RN-012 (não reaceitar) — desabilitando/ocultando ações; proteção real é server-side.
- [ ] **T5.7 — Estados + testes** `▶ livre / ⛔ parcial` — loading/vazio/erro/sucesso; testes de renderização por estado do fluxo.
