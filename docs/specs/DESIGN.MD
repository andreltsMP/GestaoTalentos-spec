# Sistema de Design - Guia de Estilo e Padrões de Interface

Este documento formaliza as especificações e diretrizes do sistema de design extraído a partir do template web corporativo (`template_webdesign.html`). O objetivo é servir como fonte única de verdade para que desenvolvedores e agentes de IA desenvolvam novas páginas e módulos mantendo total fidelidade e consistência visual.

---

## Overview

### Personalidade Visual
O sistema adota uma identidade visual **corporativa moderna (B2B/SaaS)**, equilibrando elegância, densidade informacional e alta usabilidade:
- **Profissional e Confiável**: Predomínio de tons neutros claros com acentos em Azul Royal vibrante (`#2f80ed`) e detalhe institucional em Verde Floresta (`#337259`).
- **Estruturado e Quase Plano (*Near-Flat*)**: A hierarquia e a separação espacial são obtidas prioritariamente por bordas sutis (`#e2e8f0`) e contraste sutil de superfícies, utilizando sombras apenas para leve desacoplamento de camadas.
- **Densidade Equilibrada**: O espaçamento é otimizado para sistemas de produtividade e painéis operacionais, permitindo rápida visualização de métricas e navegação fluida sem poluição visual.
- **Foco em Legibilidade e Acessibilidade**: Alto contraste em todos os textos, áreas de clique confortáveis (mínimo 40px para ações de toque/clique) e estados de foco nítidos com anel visual (*focus-ring*).

### Arquitetura de Layout (Shell da Aplicação)
- **Estrutura de Viewport Fixa**: A aplicação ocupa `100vw` e `100vh` com `overflow: hidden` no `body`.
- **Cabeçalho Superior Fixo (*App Header*)**: Altura de `70px`, `z-index: 100`, com borda inferior de destaque de `3px solid #337259`.
- **Barra Lateral Fixa (*App Sidebar*)**: Largura de `250px`, rolagem vertical independente (`overflow-y: auto`), fixada à esquerda.
- **Área de Conteúdo (*App Content*)**: Ocupa o restante do espaço (`flex: 1`), com rolagem vertical própria (`overflow-y: auto`) e preenchimento interno padronizado de `1.5rem 2rem` (24px 32px).

---

## Colors

### Variáveis CSS Nativas (`:root`)
```css
:root {
    --font-family: "Montserrat", sans-serif;
    --primary-color: #2f80ed;
    --primary-hover: #1f6cd2;
    --primary-active: #0f55b2;
    --primary-text: #ffffff;
    --surface-ground: #fafafa;
    --surface-card: #ffffff;
    --surface-border: #e2e8f0;
    --surface-hover: #f1f5f9;
    --text-color: #1e293b;
    --text-secondary: #64748b;
    --header-height: 70px;
    --sidebar-width: 250px;
    --border-radius: 6px;
}
```

### Paleta Principal e Ações
- **Primária / Ação Principal** (`#2f80ed`): Utilizada em botões principais, links ativos, ícones de identidade e estados de foco.
  - *Hover*: `#1f6cd2`
  - *Active / Pressionado*: `#0f55b2`
  - *Texto em Contraste*: `#ffffff`
  - *Fundo Ativo Translúcido*: `rgba(47, 128, 237, 0.08)` (itens de menu selecionados)
  - *Anel de Foco (Focus Ring)*: `rgba(47, 128, 237, 0.15)`
- **Acento Institucional** (`#337259`): Verde corporativo aplicado como friso decorativo na borda inferior do cabeçalho principal (`border-bottom: 3px solid #337259`).
- **Gradiente da Marca**: `linear-gradient(135deg, #2f80ed 0%, #1d4ed8 100%)` aplicado no contêiner do ícone do logotipo.

### Superfícies e Neutros
- **Fundo da Aplicação (`--surface-ground`)** (`#fafafa`): Cinza ultra-claro para o fundo geral e áreas reservadas.
- **Superfície de Cards e Painéis (`--surface-card`)** (`#ffffff`): Branco puro para cartões de métricas, tabelas, formulários e barra lateral.
- **Borda Padrão (`--surface-border`)** (`#e2e8f0`): Cinza claro suave (Slate 200) para divisores, bordas de cards e inputs.
- **Superfície em Hover (`--surface-hover`)** (`#f1f5f9`): Cinza azulado sutil (Slate 100) para hover em botões de ícone e links da navegação.
- **Fundo de Campos de Entrada** (`#f8fafc`): Fundo neutro suave para inputs em estado padrão.

### Tipografia
- **Texto Principal (`--text-color`)** (`#1e293b`): Slate 800 para títulos, valores numéricos e textos de leitura principal.
- **Texto Secundário (`--text-secondary`)** (`#64748b`): Slate 500 para subtítulos, rótulos de métricas, títulos de seções e ícones neutros.

### Paleta Semântica para Indicadores e Métricas
Cada indicador utiliza um par de cores: fundo pastel e ícone/texto de alto contraste:
- **Informativo / Azul**:
  - Fundo do Ícone: `#e0f2fe`
  - Ícone / Destaque: `#0284c7`
- **Sucesso / Verde**:
  - Fundo do Ícone: `#dcfce7`
  - Ícone / Destaque: `#16a34a`
- **Alerta / Âmbar**:
  - Fundo do Ícone: `#fef3c7`
  - Ícone / Destaque: `#d97706`
- **Métrica / Roxo**:
  - Fundo do Ícone: `#f3e8ff`
  - Ícone / Destaque: `#9333ea`

---

## Typography

### Família Tipográfica
- **Fonte Principal (Headlines, Body e Labels)**: `"Montserrat", sans-serif` (Google Fonts).
- **Pesos Utilizados**:
  - `400` (Regular): Textos descritivos e placeholders.
  - `500` (Medium): Links da barra lateral e rótulos de métricas.
  - `600` (SemiBold): Botões principais e links de navegação ativos.
  - `700` (Bold): Títulos principais (H1), títulos de cartões, valores de métricas e seções de menu.

### Escala Tipográfica e Hierarquia

| Elemento / Aplicação | Tamanho | Peso | Cor | Transformação / Estilo |
| :--- | :--- | :--- | :--- | :--- |
| **Título da Página (H1)** | `1.5rem` (24px / `text-2xl`) | `700` (`font-bold`) | `#1e293b` | Padrão |
| **Valor de Métrica (KPI)** | `1.5rem` (24px) | `700` (`font-bold`) | `#1e293b` | Linha de altura compacta |
| **Título de Card** | `1.25rem` (20px) | `700` (`font-bold`) | `#1e293b` | Margem inferior `0.5rem` |
| **Nome da Marca / Logo** | `1.15rem` (18.4px) | `700` (`font-bold`) | `#1e293b` | Alinhamento vertical central |
| **Links de Navegação** | `0.9rem` (14.4px) | `500` / `600` | `#1e293b` / `#2f80ed` | `transition: all 0.2s ease` |
| **Campos de Texto / Busca** | `0.9rem` (14.4px) | `400` | `#1e293b` | Placeholder `#64748b` |
| **Subtítulos e Apoios** | `0.875rem` (14px / `text-sm`) | `400` / `500` | `#64748b` (`text-color-secondary`) | `margin-bottom: 1rem` |
| **Rótulo de Métrica (Card)** | `0.85rem` (13.6px) | `500` (`font-medium`) | `#64748b` | Caixa normal |
| **Rótulos de Seção (Sidebar)**| `0.75rem` (12px) | `700` (`font-bold`) | `#64748b` | Caixa alta (`uppercase`), `letter-spacing: 0.5px` |

---

## PrimeFlex Layout & Utilitários (PrimeFlex Design System)

A biblioteca **PrimeFlex (v3.3.1)** é a base utilitária de classes adotada para o posicionamento, grid responsivo, alinhamento flexível, espaçamento e visibilidade dinâmica.

### 1. Sistema de Grid Responsivo (12 Colunas)
- **Contêiner**: `.grid` (adiciona espaçamento gutter nativo e compensação de margens negativas).
- **Colunas Responsivas**:
  - `col-12`: Ocupa 100% da largura em dispositivos móveis (< 768px).
  - `md:col-6`: Ocupa 50% (2 colunas por linha) em tablets (≥ 768px).
  - `lg:col-3`: Ocupa 25% (4 colunas por linha) em desktops (≥ 992px).
  - `xl:col-*`: Ajustes para telas ultra-largas (≥ 1200px).

```html
<!-- Padrão de Grid para Métricas e Indicadores -->
<div class="grid mb-4">
    <div class="col-12 md:col-6 lg:col-3">
        <!-- Metric Card 1 -->
    </div>
    <div class="col-12 md:col-6 lg:col-3">
        <!-- Metric Card 2 -->
    </div>
    <div class="col-12 md:col-6 lg:col-3">
        <!-- Metric Card 3 -->
    </div>
    <div class="col-12 md:col-6 lg:col-3">
        <!-- Metric Card 4 -->
    </div>
</div>
```

### 2. Utilitários Flexbox e Alinhamento
- **Contêineres Flex**: `.flex`, `.inline-flex`, `.flex-column`.
- **Alinhamento Vertical (Cross-Axis)**:
  - `align-items-center`: Centraliza verticalmente itens em barras e cabeçalhos.
- **Distribuição Horizontal (Main-Axis)**:
  - `justify-content-between`: Distribui extremidades (ex.: título da página à esquerda, botão de ação à direita).
  - `justify-content-center`: Centraliza elementos interna e horizontalmente.
- **Espaçamento entre Itens (*Gap*)**:
  - `gap-1`: 0.25rem (4px)
  - `gap-2`: 0.5rem (8px) – *Padrão em barras de navegação e agrupamentos de botões*
  - `gap-3`: 1rem (16px) – *Padrão entre blocos maiores*

### 3. Espaçamento (Padding e Margins)
- **Margens Verticais de Ritmo**:
  - `mb-4`: Margem inferior de `1.5rem` (24px) entre o cabeçalho da página, o grid de métricas e os cartões de conteúdo.
  - `mb-2`: Margem inferior de `0.5rem` (8px) para ícones de áreas reservadas.
  - `mt-3`: Margem superior de `1rem` (16px) para separadores de seções na barra lateral.
  - `mt-1`: Margem superior de `0.25rem` (4px) para subtítulos sob títulos H1.
  - `ml-2`: Margem esquerda de `0.5rem` (8px) para espaçar o bloco do perfil no cabeçalho.
- **Preenchimento (*Padding*)**:
  - `p-4`: Preenchimento interno de `1.5rem` (24px) utilizado em áreas reservadas e contêineres vazios.

### 4. Tipografia e Cores Utilitárias do PrimeFlex
- **Tamanhos de Fonte**:
  - `text-sm`: 0.875rem (14px) – subtítulos, legendas e textos de perfil.
  - `text-2xl`: 1.5rem (24px) – títulos de página (H1).
  - `text-4xl`: 2.5rem (40px) – ícones de destaque e estados vazios.
- **Pesos de Fonte**:
  - `font-medium`: Peso 500.
  - `font-semibold`: Peso 600.
  - `font-bold`: Peso 700.
- **Cores Utilitárias Integradas**:
  - `text-color-secondary`: `#64748b` (texto de apoio e ícones inativos).
  - `text-white`: `#ffffff` (texto em fundos primários).
  - `bg-primary`: `#2f80ed` (fundo com a cor primária).

### 5. Bordas, Formas e Superfícies Utilitárias
- **Formas e Arredondamento**:
  - `border-circle`: Aplica `border-radius: 50%` (utilizado no avatar do usuário e ícones circulares).
  - `border-round`: Aplica o raio padrão de borda (`--border-radius: 6px`).
- **Bordas Decorativas**:
  - `border-2`: Espessura de borda de 2px.
  - `border-dashed`: Borda pontilhada/tracejada para caixas de upload ou estados vazios.
- **Superfícies**:
  - `surface-ground`: Aplica a cor de fundo padrão (`#fafafa`).

### 6. Visibilidade e Responsividade Condicional
- **Esconder/Exibir por Dispositivo**:
  - `hidden md:block`: Oculta o elemento em celulares (< 768px) e exibe como bloco em telas médias e superiores (utilizado no campo de busca do cabeçalho).
  - `hidden lg:inline`: Oculta o elemento até telas grandes (≥ 992px) e exibe inline (utilizado no nome do usuário junto ao avatar).
- **Interação**:
  - `cursor-pointer`: Define o cursor do mouse como ponteiro de clique (utilizado no agrupamento de perfil).

---

## Elevation

### Tratamento de Profundidade
A aplicação adota uma abordagem **quase plana (*near-flat*)**, onde a profundidade é comunicada através de:
1. **Contorno por Bordas**: Borda sólida contínua de `1px solid #e2e8f0` delimitando todos os cartões, cabeçalho e barra lateral.
2. **Sombras Sutis de Desacoplamento**:
   - **Cabeçalho (*Header*)**: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);`
   - **Cartões (*Cards*)**: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);`
   - **Estado de Foco (*Focus Ring*)**: `box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.15);`

### Sistema de Arredondamento (Border Radius)
- **Base / Padrão do Sistema (`--border-radius`)**: `6px` (aplicado a botões principais, cartões de conteúdo e cartões de métricas).
- **Ícones de Destaque / Logotipo**: `8px` (aplicado aos contêineres de ícones de 48x48px e 38x38px).
- **Campos de Busca (*Pill / Stadium*)**: `20px` (proporciona formato de cápsula arredondada).
- **Ações de Ícone e Avatar**: `50%` (`border-circle` - circular completo).

---

## Components

### 1. Barra Superior (`.app-header`)
- **Dimensões**: `height: 70px; width: 100vw; padding: 0 1.25rem;`.
- **Estilização**: Fundo `#ffffff`, borda inferior `3px solid #337259`, sombra leve `0 1px 3px rgba(0,0,0,0.05)`.
- **Estrutura HTML com Classes PrimeFlex**:
```html
<header class="app-header">
    <!-- Lado Esquerdo: Navegação & Identidade -->
    <div class="flex align-items-center gap-2">
        <button class="btn-icon" title="Menu Principal">
            <i class="pi pi-bars"></i>
        </button>
        <div class="header-brand">
            <div class="logo-icon">
                <i class="pi pi-compass"></i>
            </div>
            <span>Nome do Sistema</span>
        </div>
    </div>

    <!-- Centro: Campo de Busca Responsivo -->
    <div class="search-container hidden md:block">
        <i class="pi pi-search search-icon"></i>
        <input type="search" class="search-input" placeholder="Pesquisar registros, módulos ou ações... (Ctrl+K)">
    </div>

    <!-- Lado Direito: Ações & Perfil -->
    <div class="flex align-items-center gap-2">
        <button class="btn-icon" title="Assistente Virtual"><i class="pi pi-sparkles"></i></button>
        <button class="btn-icon" title="Mensagens"><i class="pi pi-envelope"></i></button>
        <button class="btn-icon" title="Notificações"><i class="pi pi-bell"></i></button>
        
        <!-- Avatar do Usuário -->
        <div class="flex align-items-center gap-2 ml-2 cursor-pointer">
            <div class="w-2rem h-2rem border-circle flex align-items-center justify-content-center bg-primary text-white font-semibold text-sm">
                US
            </div>
            <span class="text-sm font-medium hidden lg:inline">Usuário</span>
        </div>
    </div>
</header>
```

### 2. Barra Lateral de Navegação (`.app-sidebar`)
- **Dimensões**: `width: 250px; padding: 1rem 0; overflow-y: auto;`.
- **Divisores de Seção (`.nav-section-title`)**: Texto em `0.75rem`, `font-weight: 700`, `text-transform: uppercase`, cor `#64748b`, `padding: 0.5rem 1.25rem`. Utilizar `.mt-3` para seções subsequentes.
- **Links de Navegação (`.nav-link`)**:
  - Layout: `display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;`.
  - Tipografia: `font-size: 0.9rem; font-weight: 500; color: #1e293b;`.
  - Borda Esquerda: `3px solid transparent`.
  - **Hover**: Fundo `#f1f5f9`, cor `#2f80ed`.
  - **Ativo (`.active`)**: Fundo `rgba(47, 128, 237, 0.08)`, cor `#2f80ed`, peso `600`, borda esquerda `3px solid #2f80ed`.

```html
<aside class="app-sidebar">
    <span class="nav-section-title">Principal</span>
    <a href="#dashboard" class="nav-link active">
        <i class="pi pi-home"></i>
        <span>Dashboard</span>
    </a>
    <a href="#registros" class="nav-link">
        <i class="pi pi-folder"></i>
        <span>Meus Registros</span>
    </a>

    <span class="nav-section-title mt-3">Ferramentas</span>
    <a href="#configuracoes" class="nav-link">
        <i class="pi pi-sliders-h"></i>
        <span>Configurações</span>
    </a>
</aside>
```

### 3. Cabeçalho de Conteúdo da Página (*Page Header*)
- **Estrutura com PrimeFlex**:
```html
<div class="flex justify-content-between align-items-center mb-4">
    <div>
        <h1 class="text-2xl font-bold">Painel Geral</h1>
        <p class="text-sm text-color-secondary mt-1">Visão integrada das operações e indicadores.</p>
    </div>
    <button class="btn-primary">
        <i class="pi pi-plus"></i>
        <span>Novo Registro</span>
    </button>
</div>
```

### 4. Cartão de Métrica / Indicador KPI (`.metric-card`)
- **Estrutura**: Fundo `#ffffff`, borda `1px solid #e2e8f0`, raio `6px`, padding `1.25rem`, display flex com alinhamento central e `gap: 1rem`.
- **Estrutura HTML com PrimeFlex**:
```html
<div class="metric-card">
    <!-- Ícone com fundo pastel e cor temática -->
    <div class="metric-icon" style="background: #e0f2fe; color: #0284c7;">
        <i class="pi pi-file"></i>
    </div>
    <div class="metric-info">
        <h4>Total Processado</h4>
        <span>1.224</span>
    </div>
</div>
```

### 5. Cartão de Conteúdo Geral (`.card`)
- **Estrutura**: Fundo `#ffffff`, borda `1px solid #e2e8f0`, raio `6px`, padding `1.5rem`, margem inferior `1.5rem`, sombra `0 1px 2px rgba(0,0,0,0.04)`.
```html
<div class="card">
    <div class="card-title">Área de Trabalho</div>
    <div class="card-subtitle">Insira aqui tabelas, formulários ou gráficos do seu módulo.</div>
    
    <!-- Área de Conteúdo ou Tabela -->
</div>
```

### 6. Botões
- **Botão de Ação Primária (`.btn-primary`)**:
  - Fundo `#2f80ed`, texto `#ffffff`, sem borda, padding `0.65rem 1.25rem`, raio `6px`, peso `600`, cursor pointer, `gap: 0.5rem`.
  - Hover: Fundo `#1f6cd2`.
- **Botão de Ícone (`.btn-icon`)**:
  - Fundo transparente, sem borda, `width: 40px; height: 40px; border-radius: 50%;` cor `#64748b`.
  - Hover: Fundo `#f1f5f9`, cor `#1e293b`.

### 7. Estado Vazio e Área Reservada (*Empty State / Placeholder*)
- **Estrutura com Classes PrimeFlex**:
```html
<div class="p-4 border-dashed border-2 border-round surface-ground text-center">
    <i class="pi pi-inbox text-4xl text-color-secondary mb-2"></i>
    <p class="text-color-secondary">Área reservada para o conteúdo dinâmico da página.</p>
</div>
```

---

## Do's and Don'ts

### O que Fazer (Do's)
- **Usar as Classes Utilitárias do PrimeFlex**: Para flexbox, alinhamento, gaps e grid responsivo, utilize sempre classes PrimeFlex (`flex`, `align-items-center`, `justify-content-between`, `gap-2`, `col-12 md:col-6 lg:col-3`) em vez de recriar regras CSS isoladas.
- **Manter a Viewport Travada**: O contêiner pai `.app-shell` deve preservar altura de `100vh` e rolagem independente na área `.app-content` e na barra lateral.
- **Preservar o Friso Institucional**: Sempre incluir a borda `border-bottom: 3px solid #337259` no cabeçalho superior.
- **Usar os Pares de Cores em Métricas**: Combine sempre o fundo pastel suave com o ícone em tom mais escuro e saturado (ex: fundo `#dcfce7` com ícone `#16a34a`).
- **Respeitar os Raios de Curvatura**: Utilize `6px` (`border-round`) para botões e cartões, `8px` para contêineres de ícones destacados, `20px` para inputs de busca e `50%` (`border-circle`) para ações circulares e avatar.
- **Sinalizar Navegação Ativa**: Todo link ativo na barra lateral deve exibir o fundo azul claro `rgba(47, 128, 237, 0.08)` e o traço à esquerda de `3px solid #2f80ed`.
- **Manter Responsividade no Campo de Busca**: Oculte o campo de busca global em mobile usando `hidden md:block` e mostre o menu de opções compacto.

### O que Não Fazer (Don'ts)
- **Não Utilizar Posicionamentos Flutuantes (`float`)**: Toda a diagramação deve ser conduzida através de `grid` e `flex` do PrimeFlex.
- **Não Utilizar Sombras Pesadas**: Evite sombras escuras ou difusas (como `0 10px 25px rgba(0,0,0,0.2)`). O design é quase plano e sustentado por bordas finas `#e2e8f0`.
- **Não Misturar Famílias de Fontes**: Não utilize fontes serifadas ou fontes alternativas fora da família **Montserrat**.
- **Não Alterar a Altura do Header**: O cabeçalho deve manter estritamente os `70px` definidos na variável `--header-height`.
- **Não Usar Cores Primárias Arbitrárias**: Ações primárias devem sempre utilizar a escala `#2f80ed` (normal), `#1f6cd2` (hover) e `#0f55b2` (active).
- **Não Remover o Anel de Foco**: Nunca defina `outline: none` sem substituir por uma indicação visual clara de foco (`box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.15)`).
