# Requisitos Principais do Produto

> **Finalidade deste documento:** registrar os requisitos, premissas, restrições e decisões de negócio mandatórias que orientam a criação das especificações de desenvolvimento em `specs/frontend/` e `specs/backend/`.
>
> Este arquivo é a fonte principal de requisitos do projeto. Os documentos em `requirements/artifacts/` podem detalhar ou complementar seu conteúdo, mas não podem contradizê-lo, removê-lo ou reduzir seu escopo sem decisão humana formal registrada.

***

## 1. Controle do documento

| Campo                      | Valor                                          |
| --------------------------- | ----------------------------------------------- |
| Produto/Sistema            | `Sistema de Gestão de Talentos - MPMS`         |
| Identificador do documento | `MAIN-REQ-001`                                 |
| Versão                     | `0.3.0`                                        |
| Responsável técnico        | `Comissão de Gestão de Competências`           |
| Criado em                  | `2026-08-27`                                   |
| Última atualização         | `2026-08-27`                                   |
| Próxima revisão            | `Após aprovação formal deste documento pela Comissão de Gestão de Competências` |

### Histórico de alterações

| Versão | Data           | Alteração                    | Responsável     | Decisão/Referência |
| ------ | -------------- | ---------------------------- | --------------- | ------------------ |
| 0.1.0  | `2026-08-27` | Criação inicial do documento a partir do artefato `requirements/artifacts/Gestao de Talentos.docx` | `Comissão de Gestão de Competências` | SRC-ART-001 |
| 0.2.0  | `2026-08-27` | Respostas às questões em aberto Q-001, Q-003, Q-004, Q-005, Q-008, Q-009 e parcial de Q-002/Q-007 incorporadas (escopo excluído, integrações Turmalina/SSO, LGPD, disponibilidade 24/7, auditoria) | `Comissão de Gestão de Competências` | Q-001 a Q-009 |
| 0.3.0  | `2026-08-27` | Fechamento de Q-002 (indicadores de OBJ-002/OBJ-003), Q-006 (volume até 2.000 servidores, busca ≤ 3s) e Q-007 (RPO diário, RTO 24h) | `Comissão de Gestão de Competências` | Q-002, Q-006, Q-007 |

***

## 2. Regras de governança

### 2.1 Precedência

A ordem de precedência das informações do projeto é:

1. Este arquivo: `requirements/main_requirements.md`.
2. Decisões humanas formalizadas em `specs/OPEN-QUESTIONS.md`.
3. Documentos em `requirements/artifacts/`.
4. Catálogo normalizado em `specs/REQUIREMENTS-CATALOG.md`.
5. Specs de frontend e backend.

### 2.2 Regras para criação de specs

* Todo requisito marcado como **Mandatório** deve ser analisado e rastreado nas specs aplicáveis.
* Requisitos deste arquivo não podem ser omitidos de uma spec sem justificativa explícita e decisão humana registrada.
* O agente pode melhorar redação e decompor requisitos, mas não pode alterar sua intenção de negócio.
* Lacunas, ambiguidades e conflitos devem ser registrados em `specs/OPEN-QUESTIONS.md`.
* Requisitos técnicos, escolhas de framework, banco de dados, nuvem, linguagem ou arquitetura não devem ser definidos aqui, salvo quando forem uma restrição institucional formal.
* Requisitos de frontend e backend devem manter o mesmo ID funcional quando representarem a mesma capacidade de negócio.

### 2.3 Convenções de identificação

| Prefixo   | Uso                                |
| --------- | ----------------------------------- |
| `OBJ-XXX` | Objetivo de negócio                |
| `RF-XXX`  | Requisito funcional mandatório     |
| `RNF-XXX` | Requisito não funcional mandatório |
| `RN-XXX`  | Regra de negócio                   |
| `INT-XXX` | Integração externa ou interna      |
| `Q-XXX`   | Questão em aberto                  |

***

## 3. Visão do produto

### 3.1 Problema ou oportunidade

Atualmente não existe um processo formal para cadastro de competências, formação e experiência dos servidores do MPMS, nem para permuta de lotação ou busca interna de talentos. Essas atividades são conduzidas de forma manual e não sistematizada, sem centralização de dados, sem controle de validação de cursos/certificados e sem rastreabilidade de aprovações. Isso dificulta a localização de servidores com determinado perfil de competências, torna o processo de permuta lento e sem histórico auditável, e não garante a validação formal de cursos usados para Adicional de Qualificação ou Progressão Funcional.

### 3.2 Objetivo geral

> Centralizar o cadastro de dados profissionais, acadêmicos, de competências e de experiência dos servidores do MPMS, viabilizando: atualização controlada do cadastro com validação por RH e pela Comissão de Gestão de Competências; solicitação e acompanhamento de Adicional de Qualificação e Progressão Funcional vinculados a cursos validados; solicitação de permuta de lotação com fluxo de aprovação entre servidores, chefias e RH; e busca interna de talentos por competências, formação, experiência e idiomas.

### 3.3 Objetivos de negócio

| ID      | Objetivo                | Prioridade | Como medir o sucesso                  |
| ------- | ----------------------- | ---------- | -------------------------------------- |
| OBJ-001 | Centralizar o cadastro de dados profissionais, acadêmicos, de competências e de experiência dos servidores do MPMS. | Crítica | % de servidores com cadastro completo |
| OBJ-002 | Viabilizar o processo de permuta de lotação entre servidores, com fluxo de aprovação por chefias diretas e validação do RH. | Alta | Tempo médio do fluxo completo de permuta (do início até a aprovação/recusa final) |
| OBJ-003 | Viabilizar a busca interna de talentos por competências, formação acadêmica, capacitação profissional, experiência e idiomas. | Alta | Dados corretos apresentados na busca, sem erros e com ordenação funcionando corretamente |

### 3.4 Resultados esperados

* Para usuários: visão unificada do próprio perfil profissional, em formato de visualização inspirado no LinkedIn, com edição inline de formação, capacitação, idiomas, competências e experiência.
* Para a área de negócio (RH e Comissão de Gestão de Competências): centralização e rastreabilidade das validações de cursos, certificados, solicitações de benefício (Adicional de Qualificação e Progressão Funcional) e solicitações de permuta.
* Para governança e auditoria: histórico de status de cada solicitação (aguardando validação, aprovada, recusada) e histórico auditável de cada etapa do fluxo de permuta (usuários → chefias → RH).

***

## 4. Contexto de negócio

### 4.1 Processo atual

Não há hoje um processo formal e sistematizado para cadastro de competências/formação, permuta de lotação ou busca interna de talentos no MPMS; essas atividades ocorrem de maneira manual, sem sistema dedicado, sem validação centralizada de cursos/certificados e sem histórico auditável de aprovações.

### 4.2 Processo futuro esperado

O servidor mantém um perfil próprio (dados pessoais, cargo, lotação, formação, capacitação, idiomas, competências e experiência), podendo adicionar novos itens diretamente na tela de visualização. Alterações que exigem validação seguem um fluxo de solicitação para RH e/ou para a Comissão de Gestão de Competências, com status visíveis ao servidor. Cursos de formação acadêmica e de capacitação profissional exigem certificado obrigatório e passam por validação da Comissão antes de poderem ser usados como base para solicitações de Adicional de Qualificação ou Progressão Funcional junto ao RH. Servidores podem solicitar permuta de lotação, com fluxo de aceite entre usuários, aprovação das chefias diretas de ambos e validação final do RH. Qualquer usuário pode buscar servidores por competências, formação, capacitação e experiência, com resultados ordenáveis e ranqueados por percentual de correspondência aos filtros aplicados.

### 4.3 Glossário do domínio

| Termo     | Definição de negócio | Fonte ou responsável          |
| --------- | --------------------- | ------------------------------ |
| Lotação | Unidade/local de trabalho do servidor, identificado por nome e cidade. | `requirements/artifacts/Gestao de Talentos.docx` |
| Permuta | Processo de troca de lotação entre dois servidores, sujeito a aceite mútuo, aprovação das chefias diretas e validação do RH. | `requirements/artifacts/Gestao de Talentos.docx` |
| Comissão de Gestão de Competências | Órgão responsável por validar os cursos de formação acadêmica e de capacitação profissional cadastrados, incluindo seus certificados. | `requirements/artifacts/Gestao de Talentos.docx` |
| Adicional de Qualificação | Benefício que o servidor pode solicitar ao RH com base em curso de formação acadêmica já validado. | `requirements/artifacts/Gestao de Talentos.docx` |
| Progressão Funcional | Benefício que o servidor pode solicitar ao RH com base em curso de formação acadêmica ou de capacitação profissional já validado. | `requirements/artifacts/Gestao de Talentos.docx` |
| % de Correspondência | Percentual de aderência do perfil do servidor aos filtros selecionados em uma busca, calculado quando mais de um filtro é aplicado. | `requirements/artifacts/Gestao de Talentos.docx` |
| Pendente de verificação | Status inicial de um curso/certificado recém-cadastrado, exibido como subtítulo até a validação pela Comissão de Gestão de Competências. | `requirements/artifacts/Gestao de Talentos.docx` |
| Turmalina | Sistema de RH institucional do MPMS, com o qual este sistema deve integrar para refletir benefícios (Qualificação/Progressão) e permutas aprovados. | Resposta do usuário em sessão de esclarecimento (Q-005) |

### 4.4 Atores e partes interessadas

| Ator ou área        | Papel no processo                   | Necessidade principal | Tipo        |
| --------------------- | -------------------------------------- | ------------------------ | ------------ |
| Servidor (usuário) | Mantém o próprio cadastro, solicita atualizações, cursos, benefícios e permutas; realiza buscas de outros servidores. | Visibilidade e controle do próprio perfil profissional; encontrar talentos internos. | Usuário |
| RH (Gestão de Pessoas) | Valida solicitações de atualização de cadastro, valida solicitações de Adicional de Qualificação/Progressão Funcional, dá a validação final das permutas. | Controle e rastreabilidade das solicitações e benefícios concedidos. | Stakeholder |
| Comissão de Gestão de Competências | Valida os cursos de formação acadêmica e de capacitação profissional e respectivos certificados. | Garantir a veracidade e a qualidade das informações de formação/capacitação cadastradas. | Stakeholder |
| Chefia direta (chefe de lotação) | Aprova ou recusa solicitações de permuta de servidores da sua lotação. | Manter controle sobre a composição da equipe sob sua gestão. | Stakeholder |

***

## 5. Escopo do produto

### 5.1 Escopo incluído

* Cadastro de servidor com foto, nome, cargo, lotação (nome e cidade), formação acadêmica, cursos de capacitação profissional, comissões que integra, idiomas conhecidos, competências e experiência profissional.
* Atualização de cadastro pelo próprio servidor, incluindo adição inline de itens (ícone "+" por campo, na tela de visualização, estilo LinkedIn).
* Fluxo de solicitação e validação de atualizações de cadastro por RH e/ou pela Comissão de Gestão de Competências, com status "aguardando validação", "aprovada" e "recusada".
* Cadastro de curso de formação acadêmica com certificado obrigatório e campos: área de formação, nível de formação, nome do curso, ano de início, ano de fim, quantidade de horas e utilização.
* Cadastro de curso de capacitação profissional com certificado obrigatório.
* Validação de cursos e certificados pela Comissão de Gestão de Competências, com status "Pendente de verificação" até a validação.
* Controle de status de utilização de cada curso (requisito do cargo, utilizado/não utilizado para qualificação, utilizado/não utilizado para progressão), visível apenas ao servidor e ao RH.
* Solicitação de Adicional de Qualificação e de Progressão Funcional vinculada a cursos já validados, com aprovação do RH.
* Fluxo completo de permuta de lotação: seleção de lotação/cidade desejada, aceite entre servidores, aprovação das chefias diretas de ambos, validação final do RH.
* Listagem pública de permutas em aberto (aba "Permutas", visível a todos os servidores).
* Busca interna de servidores com filtros de formação acadêmica (área e nível), curso, competências, lotação e idiomas.
* Cálculo e exibição de percentual de correspondência nos resultados de busca, com ocultação de resultados com 0% de correspondência.
* Ordenação de resultados de busca por Correspondência, Lotação, Alfabético ou Nível de Formação.
* Visualização de currículo/perfil do servidor (estilo LinkedIn), tanto na página inicial do próprio usuário quanto ao ser acessado por outro usuário via busca.

### 5.2 Escopo não incluído

* Avaliação de desempenho formal do servidor.
* Cálculo e pagamento do efeito financeiro do Adicional de Qualificação/Progressão Funcional (folha de pagamento) — o sistema registra apenas a aprovação do benefício, refletindo-a ao sistema de RH institucional (ver INT-001).
* Gestão de vagas, concursos ou lotação inicial de novos servidores.

### 5.3 Limites de responsabilidade

| Item                    | Responsabilidade do produto | Fora da responsabilidade do produto            |
| ------------------------ | ----------------------------- | ------------------------------------------------ |
| Validação de cursos e certificados | Registrar o cadastro, armazenar o certificado e conduzir o fluxo de status (pendente/validado/recusado). | Análise de mérito e autenticidade do certificado, que é decisão humana da Comissão de Gestão de Competências. |
| Aprovação de permuta de lotação | Conduzir o fluxo de aceites, notificações e mudanças de status entre usuários, chefias e RH. | A decisão de aprovar ou recusar cada etapa é humana (servidores, chefias e RH), não automatizada pelo sistema. |
| Concessão de Adicional de Qualificação / Progressão Funcional | Registrar a solicitação, vinculá-la ao curso validado, refletir o status aprovado/recusado e comunicar a aprovação ao sistema de RH (Turmalina). | O cálculo e o efeito financeiro do benefício concedido (folha de pagamento, carreira) são processados pelo Turmalina, fora deste sistema. |

***

## 6. Requisitos funcionais mandatórios

> Cada requisito deve descrever um comportamento observável. Evite frases vagas, como “o sistema deve ser intuitivo” ou “deve funcionar corretamente”.

| ID     | Requisito mandatório                  | Atores     | Prioridade | Contexto provável | Origem/justificativa |
| ------ | -------------------------------------- | ------------ | ---------- | -------------------- | ----------------------- |
| RF-001 | O sistema deve permitir que o servidor cadastre seu perfil com foto, nome, cargo, lotação (nome e cidade), formação acadêmica, cursos de capacitação profissional, comissões que integra, idiomas conhecidos, competências e experiência profissional. | Servidor | Crítica | Ambos | Gestao de Talentos.docx |
| RF-002 | O sistema deve permitir que o servidor atualize os dados do próprio cadastro. | Servidor | Crítica | Ambos | Gestao de Talentos.docx |
| RF-003 | A interface deve permitir a adição de novas informações de formação acadêmica, cursos de capacitação, idiomas, competências e experiência profissional diretamente na tela de visualização do perfil, por meio de um ícone "+" em cada campo. | Servidor | Alta | Frontend | Gestao de Talentos.docx |
| RF-004 | O sistema deve conduzir um fluxo de solicitação e validação, por RH ou pela Comissão de Gestão de Competências, para atualizações de cadastro que exijam aprovação, controlando os status "aguardando validação", "aprovada" e "recusada". | Servidor, RH, Comissão de Gestão de Competências | Crítica | Ambos | Gestao de Talentos.docx |
| RF-005 | O sistema deve exigir a inclusão de certificado no cadastro ou na atualização de cursos de formação acadêmica, com os campos área de formação, nível de formação, nome do curso, ano de início, ano de fim, quantidade de horas e utilização. | Servidor | Crítica | Ambos | Gestao de Talentos.docx |
| RF-006 | O sistema deve exigir a inclusão de certificado no cadastro ou na atualização de cursos de capacitação profissional. | Servidor | Crítica | Ambos | Gestao de Talentos.docx |
| RF-007 | O sistema deve permitir que a Comissão de Gestão de Competências valide ou recuse cursos de formação acadêmica e de capacitação profissional, incluindo seus certificados. | Comissão de Gestão de Competências | Crítica | Ambos | Gestao de Talentos.docx |
| RF-008 | O sistema deve permitir que o servidor solicite ao RH a utilização de um curso de formação acadêmica validado para Adicional de Qualificação. | Servidor, RH | Alta | Ambos | Gestao de Talentos.docx |
| RF-009 | O sistema deve permitir que o servidor solicite ao RH a utilização de um curso de formação acadêmica ou de capacitação profissional validado para Progressão Funcional. | Servidor, RH | Alta | Ambos | Gestao de Talentos.docx |
| RF-010 | O sistema deve permitir que o servidor solicite permuta de lotação, selecionando a lotação ou a cidade desejada, e conduzir o fluxo de aceite entre usuários, aprovação das chefias diretas e validação final do RH. | Servidor, Chefia direta, RH | Crítica | Ambos | Gestao de Talentos.docx |
| RF-011 | O sistema deve exibir, em aba própria visível a todos os servidores, as solicitações de permuta em aberto. | Servidor | Alta | Ambos | Gestao de Talentos.docx |
| RF-012 | O sistema deve permitir que qualquer servidor busque outros servidores utilizando filtros de formação acadêmica (área e nível), curso, competências, lotação e idiomas, com seleção múltipla em cada filtro. | Servidor | Crítica | Ambos | Gestao de Talentos.docx |
| RF-013 | O sistema deve calcular e exibir, para cada resultado de busca com mais de um filtro selecionado, o percentual de correspondência do servidor aos filtros aplicados, ocultando servidores com 0% de correspondência. | Servidor | Alta | Backend | Gestao de Talentos.docx |
| RF-014 | O sistema deve permitir ordenar os resultados de busca por Correspondência, Lotação, Alfabético ou Nível de Formação. | Servidor | Média | Frontend | Gestao de Talentos.docx |
| RF-015 | O sistema deve permitir a visualização do currículo/perfil completo de um servidor, em formato inspirado no LinkedIn, tanto na página inicial do próprio usuário quanto a partir dos resultados de busca. | Servidor | Alta | Ambos | Gestao de Talentos.docx |

### 6.1 Fluxos de negócio prioritários

#### Fluxo FB-001 — Validação de curso/certificado

1. Servidor cadastra curso de formação acadêmica ou de capacitação profissional, anexando certificado obrigatório.
2. Sistema atribui ao curso o status "Pendente de verificação".
3. Comissão de Gestão de Competências analisa e valida ou recusa o curso/certificado.
4. Curso passa a exibir o status de utilização aplicável (requisito do cargo, utilizado/não utilizado para qualificação ou progressão), visível ao servidor e ao RH.

#### Fluxo FB-002 — Solicitação de Adicional de Qualificação / Progressão Funcional

1. Servidor seleciona curso com status "Não utilizado para qualificação" ou "Não utilizado para progressão" e envia solicitação ao RH.
2. Solicitação fica pendente até a validação do RH, que pode alterar os dados enviados, exceto o certificado (alterável apenas pelo servidor).
3. RH aprova ou recusa a solicitação.
4. Se aprovada, o status da solicitação muda para "aprovada" e o status de utilização do curso muda para "Utilizado para qualificação" ou "Utilizado para progressão", conforme o benefício solicitado.

#### Fluxo FB-003 — Permuta de lotação

1. Servidor inicial seleciona a lotação ou cidade para a qual deseja se transferir; a solicitação aparece na aba "Solicitações" do servidor, com status "Aguardando aceite de usuário", e na aba pública "Permutas".
2. Um servidor lotado na lotação/cidade desejada aceita a permuta, e o servidor inicial confirma o aceite.
3. Se o servidor inicial recusar o aceite recebido, a solicitação some da aba de permutas para aquele par específico; ele não pode solicitar novamente essa mesma permuta recusada, mas ela permanece aberta para outros interessados.
4. Com o aceite mútuo confirmado, a solicitação avança para "Aguardando aprovação de chefia" e é enviada às chefias diretas de ambos os servidores.
5. Se ambas as chefias aprovarem, a solicitação avança para "Aguardando validação do RH". Se ambas recusarem, as duas solicitações ficam "Recusadas" e os dois servidores ficam impedidos de trocar entre si pelos 180 dias seguintes. Se apenas uma chefia recusar, a solicitação do servidor que havia aceitado fica "Recusada" (sem poder aceitá-la novamente), e a do servidor inicial retorna para "Aguardando aceite de usuário".
6. RH valida a solicitação: se aprovada, ambos os servidores recebem status "Aprovada"; se recusada, ambos recebem "Recusada" e uma nova solicitação de permuta deve ser iniciada para nova tentativa.

#### Fluxo FB-004 — Busca de talentos

1. Usuário aplica um ou mais filtros (formação acadêmica, nível de formação, curso, competências, lotação, idiomas).
2. Sistema calcula o percentual de correspondência de cada servidor em relação aos filtros selecionados, quando mais de um filtro é aplicado, ocultando servidores com 0% de correspondência.
3. Usuário ordena os resultados por Correspondência, Lotação, Alfabético ou Nível de Formação; a última ordenação escolhida torna-se o critério principal, e a anterior passa a secundário.
4. Usuário seleciona um resultado (ícone de lupa) para visualizar o currículo completo do servidor em janela de visualização.

### 6.2 Exceções e cenários de erro relevantes

| ID      | Situação             | Comportamento esperado | Impacto     |
| ------- | ---------------------- | ------------------------- | ------------- |
| EXC-001 | Servidor tenta usar, em nova solicitação de benefício, um curso já com status "Utilizado para qualificação" ou "Utilizado para progressão". | Sistema deve impedir o envio da solicitação. | Integridade do controle de benefícios (RN-007). |
| EXC-002 | Ambas as chefias diretas recusam a permuta. | As duas solicitações ficam "Recusadas"; servidores ficam impedidos de trocar entre si pelos 180 dias seguintes. | Bloqueio temporário de nova tentativa entre o mesmo par (RN-010). |
| EXC-003 | Apenas uma das chefias diretas recusa a permuta. | Solicitação do servidor que havia aceitado fica "Recusada" (sem poder aceitá-la novamente); a do servidor inicial retorna para "Aguardando aceite de usuário". | Reabertura parcial do fluxo (RN-012). |
| EXC-004 | Servidor tenta solicitar novamente uma permuta que ele mesmo já recusou. | Sistema deve impedir nova solicitação para essa permuta específica. | Evita ciclo repetido de recusas (RN-011). |
| EXC-005 | RH tenta alterar o certificado de um curso durante a validação. | Sistema deve impedir; apenas o próprio servidor pode alterar o certificado. | Integridade e autoria do documento comprobatório (RN-006). |

***

## 7. Regras de negócio mandatórias

> Regras de negócio definem políticas, condições, cálculos, validações e restrições do domínio. Elas não devem depender de detalhes da interface ou da tecnologia.

| ID     | Regra de negócio | Aplicável a                    | Consequência se violada    | Fonte/justificativa |
| ------ | ------------------- | --------------------------------- | ----------------------------- | ---------------------- |
| RN-001 | Cursos de formação acadêmica e de capacitação profissional exigem certificado obrigatório no cadastro/atualização. | Cadastro de curso | Sistema não deve permitir salvar o cadastro sem certificado anexado. | Gestao de Talentos.docx |
| RN-002 | Todo curso recém-cadastrado recebe o status "Pendente de verificação" até validação pela Comissão de Gestão de Competências. | Curso/certificado | Curso não pode ser usado para qualificação, progressão ou requisito de cargo enquanto pendente. | Gestao de Talentos.docx |
| RN-003 | O status de utilização de curso de formação acadêmica é um entre: requisito do cargo, utilizado para qualificação, não utilizado para qualificação, utilizado para progressão, não utilizado para progressão; visível apenas ao servidor e à Gestão de Pessoas. | Curso de formação acadêmica | Exposição indevida de status a terceiros. | Gestao de Talentos.docx |
| RN-004 | O status de utilização de curso de capacitação profissional é um entre: utilizado para progressão, não utilizado para progressão (sem status de qualificação). | Curso de capacitação profissional | Atribuição incorreta de status de qualificação a curso de capacitação. | Gestao de Talentos.docx |
| RN-005 | Ao cadastrar uma formação que não é requisito do cargo e ainda não foi utilizada para qualificação nem progressão, o sistema deve oferecer ao servidor a opção de utilizá-la para progressão ou qualificação; a opção de qualificação só é oferecida se o servidor não tiver outra formação de mesmo nível já usada como requisito do cargo ou já utilizada para qualificação. | Cadastro de formação acadêmica | Servidor perde a oportunidade de vincular a formação a um benefício elegível. | Gestao de Talentos.docx |
| RN-006 | O RH pode alterar os dados de um curso enviados para validação, exceto o certificado, que só pode ser alterado pelo próprio servidor. | Validação de curso pelo RH | Alteração indevida do documento comprobatório. | Gestao de Talentos.docx |
| RN-007 | Solicitação de Adicional de Qualificação ou Progressão Funcional só pode ser feita com cursos no status "Não utilizado para qualificação" ou "Não utilizado para progressão"; não pode ser feita com cursos já "Utilizado para qualificação" ou "Utilizado para progressão". | Solicitação de benefício | Uso duplicado do mesmo curso para o mesmo tipo de benefício. | Gestao de Talentos.docx |
| RN-008 | Ao aprovar solicitação de Adicional de Qualificação ou Progressão Funcional, o status do curso muda para "Utilizado para qualificação" ou "Utilizado para progressão", conforme a solicitação realizada. | Validação do RH | Status do curso fica desatualizado em relação ao benefício concedido. | Gestao de Talentos.docx |
| RN-009 | O cadastro e a solicitação de benefício para cursos de capacitação seguem a mesma lógica dos cursos de formação acadêmica, restrita ao status de progressão (sem qualificação). | Curso de capacitação profissional | Atribuição indevida de benefício de qualificação a curso de capacitação. | Gestao de Talentos.docx |
| RN-010 | A recusa de permuta por ambas as chefias diretas impede os dois servidores envolvidos de aceitarem permuta entre si novamente pelos 180 dias seguintes. | Fluxo de permuta | Repetição de tentativas de permuta já recusadas por ambas as chefias. | Gestao de Talentos.docx |
| RN-011 | Um servidor que recusou uma solicitação de permuta não pode solicitar novamente a mesma permuta; ela permanece em aberto para os demais interessados. | Fluxo de permuta | Ciclo repetido de solicitação/recusa pelo mesmo servidor. | Gestao de Talentos.docx |
| RN-012 | Um servidor que aceitou uma solicitação de permuta não pode aceitá-la novamente caso ela retorne para "Aguardando aceite de usuário" por recusa de apenas uma chefia. | Fluxo de permuta | Reaceite indevido de uma solicitação já processada. | Gestao de Talentos.docx |
| RN-013 | No resultado de busca com mais de um filtro selecionado, o sistema deve calcular o percentual de correspondência de cada servidor e nunca exibir servidores com 0% de correspondência. | Busca de talentos | Exibição de resultados irrelevantes para o usuário. | Gestao de Talentos.docx |
| RN-014 | A ordenação dos resultados de busca segue um critério principal (última ordenação selecionada) e um critério secundário (ordenação anterior). | Busca de talentos | Ordenação inconsistente dos resultados. | Gestao de Talentos.docx |

### 7.1 Estados e transições de negócio

**Solicitação de atualização de cadastro / curso / benefício (RF-004, RF-008, RF-009):**

| Estado atual | Evento ou condição | Próximo estado  | Quem pode executar | Regra relacionada |
| -------------- | --------------------- | ----------------- | --------------------- | -------------------- |
| — | Servidor envia solicitação | Aguardando validação | Servidor | RF-004 |
| Aguardando validação | RH ou Comissão aprova | Aprovada | RH / Comissão de Gestão de Competências | RN-002, RN-008 |
| Aguardando validação | RH ou Comissão recusa | Recusada | RH / Comissão de Gestão de Competências | RN-002 |

**Solicitação de permuta de lotação (RF-010, Fluxo FB-003):**

| Estado atual | Evento ou condição | Próximo estado  | Quem pode executar | Regra relacionada |
| -------------- | --------------------- | ----------------- | --------------------- | -------------------- |
| — | Servidor inicial seleciona lotação/cidade desejada | Aguardando aceite de usuário | Servidor inicial | FB-003 |
| Aguardando aceite de usuário | Outro servidor aceita e servidor inicial confirma | Aguardando aprovação de chefia | Servidor inicial e servidor aceitante | FB-003 |
| Aguardando aceite de usuário | Servidor inicial recusa o aceite recebido | Encerrada para o par (permuta permanece aberta para outros) | Servidor inicial | RN-011 |
| Aguardando aprovação de chefia | Ambas as chefias aprovam | Aguardando validação do RH | Chefias diretas | FB-003 |
| Aguardando aprovação de chefia | Ambas as chefias recusam | Recusada (ambos os servidores) | Chefias diretas | RN-010 |
| Aguardando aprovação de chefia | Apenas uma chefia recusa | Recusada (servidor aceitante) / Aguardando aceite de usuário (servidor inicial) | Chefia direta | RN-012 |
| Aguardando validação do RH | RH aprova | Aprovada (ambos os servidores) | RH | FB-003 |
| Aguardando validação do RH | RH recusa | Recusada (ambos os servidores) | RH | FB-003 |

***

## 8. Integrações

> Registre apenas a necessidade de negócio da integração. Contratos técnicos, protocolos, autenticação técnica e detalhes de implementação pertencem às specs de backend e aos planos técnicos futuros.

| ID      | Sistema/serviço | Finalidade de negócio | Dados trocados          | Direção                    | Obrigatória? |
| ------- | ------------------ | ------------------------ | -------------------------- | ----------------------------- | -------------- |
| INT-001 | Turmalina (sistema de RH do MPMS) | Refletir no sistema de RH institucional a aprovação de Adicional de Qualificação e de Progressão Funcional, e a conclusão de permutas de lotação. | Status de solicitação aprovada (qualificação, progressão, permuta) | Saída | Sim |
| INT-002 | SSO Institucional (Active Directory) | Autenticar servidores usando a identidade institucional já existente, evitando cadastro de credenciais próprias. | Identidade do usuário autenticado (login) | Entrada | Sim |

### Regras de integração

* A aprovação de Adicional de Qualificação, Progressão Funcional ou permuta só é considerada concluída no sistema após o registro correspondente; a comunicação ao Turmalina (INT-001) é consequência dessa aprovação, não condição para ela.
* O acesso ao sistema deve ocorrer exclusivamente via autenticação SSO institucional (INT-002); não deve haver cadastro de senha local para servidores.
* Contratos técnicos, protocolos e detalhes de implementação dessas integrações pertencem às specs de backend.

***

## 9. Requisitos não funcionais mandatórios

> Requisitos não funcionais devem ser objetivos e verificáveis sempre que possível. Quando a métrica for desconhecida, registre uma questão em aberto, em vez de criar uma meta arbitrária.

### 9.1 Desempenho e capacidade

| ID      | Requisito                     | Métrica ou condição de validação                      | Prioridade |
| ------- | -------------------------------- | ----------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve suportar o cadastro de até 2.000 servidores e responder às buscas de talentos dentro de um tempo aceitável. | Volume de referência: até 2.000 servidores cadastrados. Tempo de resposta da busca (com filtros aplicados): até 3 segundos. | Alta |

### 9.2 Disponibilidade e continuidade

| ID      | Requisito                          | Métrica ou condição de validação                | Prioridade |
| ------- | ------------------------------------ | ------------------------------------------------- | ---------- |
| RNF-002 | O sistema deve estar disponível 24 horas por dia, 7 dias por semana (24/7), seguindo o mesmo padrão dos demais sistemas institucionais do MPMS (ex.: Turmalina), com RPO diário e RTO de até 24 horas em caso de indisponibilidade. | Uptime mensurável; RPO = 1 dia (backup diário); RTO ≤ 24 horas para restabelecimento do serviço. | Alta |

### 9.3 Usabilidade e acessibilidade

| ID      | Requisito                                        | Critério de validação    | Prioridade |
| ------- | --------------------------------------------------- | --------------------------- | ---------- |
| RNF-003 | A visualização do perfil/currículo do servidor deve seguir um padrão inspirado no LinkedIn, aplicado tanto na página inicial do próprio usuário quanto na visualização por terceiros via busca. | Avaliação qualitativa de aderência ao padrão de referência (LinkedIn), a validar com stakeholders. | Alta |

### 9.4 Observabilidade e suporte operacional

| ID      | Requisito                                         | Critério de validação                | Prioridade |
| ------- | ---------------------------------------------------- | ---------------------------------------- | ---------- |
| RNF-004 | O sistema deve manter trilha de auditoria das aprovações realizadas nos fluxos de permuta, validação de curso/certificado e concessão de Adicional de Qualificação/Progressão Funcional, registrando quem aprovou/recusou, quando e em qual etapa. | Cada aprovação/recusa deve ser consultável posteriormente, associada a autor e timestamp. | Alta |
| RNF-005 | O sistema deve registrar logs de acesso a dados sensíveis, incluindo visualização/download de certificados e de dados pessoais dos servidores. | Log deve permitir identificar quem acessou qual dado sensível e quando. | Alta |

***

## 10. Restrições obrigatórias

> Registre restrições institucionais, legais, operacionais ou tecnológicas já definidas. Não inclua preferências técnicas sem decisão formal.

| ID      | Restrição     | Tipo                                    | Justificativa | Impacto esperado |
| ------- | --------------- | ------------------------------------------ | ---------------- | ------------------- |
| RES-001 | O tratamento de dados pessoais dos servidores (foto, nome, cargo, lotação, formação, experiência) e de documentos comprobatórios (certificados) deve observar integralmente a Lei Geral de Proteção de Dados (LGPD). | Legal | Confirmado pelo respondente do documento: a LGPD se aplica integralmente ao sistema. | Necessidade de base legal para tratamento, controle de acesso a dados sensíveis, política de retenção/exclusão e registro de consentimento onde aplicável — detalhamento a ser tratado nas specs de backend em conjunto com a área jurídica. |

***

## 11. Questões em aberto

> Questões abertas não devem ser resolvidas por suposição. Elas devem ser sincronizadas com `specs/OPEN-QUESTIONS.md` durante a geração das specs.

| ID    | Pergunta              | Contexto                         | Impacto     | Responsável pela resposta | Criticidade | Status |
| ----- | ------------------------ | ----------------------------------- | ------------- | ---------------------------- | ------------- | -------- |
| Q-001 | Qual o critério ou a data prevista para a próxima revisão deste documento? | Seção 1, Controle do documento | Planejamento de revisões do documento | Comissão de Gestão de Competências | Baixa | Respondida — próxima revisão após aprovação formal do documento |
| Q-002 | Quais os indicadores mensuráveis (KPIs) específicos para OBJ-002 (Permutas) e OBJ-003 (Busca)? (OBJ-001 já definido: % de servidores com cadastro completo) | Seção 3.3, Objetivos de negócio | Sem indicadores para OBJ-002/OBJ-003, não é possível avaliar objetivamente o sucesso desses objetivos | Comissão de Gestão de Competências / RH | Média | Respondida — ver Seção 3.3 |
| Q-003 | Qual é o processo atual (pré-sistema) de cadastro, permuta e busca de talentos, e qual a dor/problema que motivou este projeto? | Seções 3.1 e 4.1 | Falta de contexto do "antes" pode levar a decisões de escopo equivocadas nas specs | Comissão de Gestão de Competências / RH | Alta | Respondida — não há processo formal hoje; atividades são manuais e não sistematizadas |
| Q-004 | Quais funcionalidades ou processos ficam explicitamente fora do escopo desta entrega (ex.: avaliação de desempenho, folha de pagamento, integração com sistema de RH institucional)? | Seção 5.2, Escopo não incluído | Sem exclusões explícitas, agentes de spec podem incluir funcionalidades por inferência indevida | Comissão de Gestão de Competências | Alta | Respondida — ver Seção 5.2 |
| Q-005 | Existem integrações externas obrigatórias (ex.: sistema de RH/folha de pagamento do MPMS, sistema de autenticação institucional/Active Directory)? | Seção 8, Integrações | Ausência de integração crítica pode invalidar o fluxo de benefícios (Adicional de Qualificação/Progressão Funcional) | RH / TI | Alta | Respondida — Turmalina (RH) e SSO institucional, ver INT-001/INT-002 |
| Q-006 | Qual o tempo de resposta esperado para a busca de talentos e qual o volume esperado de usuários simultâneos / servidores cadastrados? | Seção 9.1, Desempenho e capacidade | Sem meta definida, dimensionamento técnico fica sem critério objetivo | Comissão de Gestão de Competências / TI | Média | Respondida — ver RNF-001 (até 2.000 servidores, busca ≤ 3s) |
| Q-007 | Qual o RTO/RPO esperado em caso de indisponibilidade, considerando que o sistema deve operar 24/7 (RNF-002)? | Seção 9.2, Disponibilidade e continuidade | Sem meta definida, não é possível planejar contingência | TI | Média | Respondida — RPO diário, RTO de 24h, ver RNF-002 |
| Q-008 | Quais são os requisitos de observabilidade e auditoria (trilha de auditoria das aprovações de permuta/curso, logs de acesso a dados sensíveis)? | Seção 9.4, Observabilidade | Auditoria de aprovações (chefias, RH, Comissão) pode ser mandatória em processo administrativo público | Comissão de Gestão de Competências / TI | Média | Respondida — ver RNF-004/RNF-005 |
| Q-009 | Existem restrições legais/institucionais (ex.: LGPD, normas internas do MPMS) aplicáveis ao tratamento de dados pessoais e certificados dos servidores? | Seção 10, Restrições obrigatórias | Pode impactar retenção de dados, consentimento e controle de acesso aos certificados | Jurídico / Comissão de Gestão de Competências | Alta | Respondida — LGPD aplica-se integralmente, ver RES-001 |

***

## 12. Referências e artefatos de apoio

> Registre os documentos que detalham, comprovam ou contextualizam este arquivo. Os arquivos devem existir em `requirements/artifacts/`.

| ID da fonte | Arquivo                                | Descrição     | Requisitos relacionados | Prioridade da fonte |
| ------------- | ------------------------------------------ | ---------------- | -------------------------- | ---------------------- |
| SRC-ART-001 | `requirements/artifacts/Gestao de Talentos.docx` | Documento fonte com a descrição funcional completa do Sistema de Gestão de Talentos (cadastro, validação de cursos, permutas e busca), usado como base para o preenchimento deste arquivo. | RF-001 a RF-015, RN-001 a RN-014 | Complementar |

***

## 13. Mapa de rastreabilidade esperado

Após a execução do agente, deve ser possível navegar no seguinte sentido:

```text
main_requirements.md
      ↓
requirements/artifacts/
      ↓
specs/REQUIREMENTS-CATALOG.md
      ↓
specs/frontend/000X-nome-da-funcionalidade/spec.md
specs/backend/000X-nome-da-funcionalidade/spec.md
      ↓
Planos, tarefas, código, testes e evidências de validação
```
