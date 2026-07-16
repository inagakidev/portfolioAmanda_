# Amanda Inagaki — Portfólio (Home)

Recriação da home em **React + CSS Modules**, com tema claro/escuro via **Context API**.

## Estrutura

```
src/
  context/
    ThemeContext.jsx      → Provider + hook useTheme() (dark/light, persiste em localStorage)
  components/
    Background/           → grid de pontos + arcos de radar + molduras de canto
    Telemetry/             → leituras HUD nos cantos (lat/lon/alt, status)
    Header/                → logo, navegação numerada (00–07), botão de tema
    Hero/                  → badge, título, texto, CTAs, redes sociais
  pages/
    Home/                  → compõe Background + Telemetry + Header + Hero
  styles/
    theme.css              → variáveis CSS dos dois temas (tokens de design)
    global.css             → reset + fontes (Space Grotesk / Inter / JetBrains Mono)
  App.jsx                  → envolve tudo em <ThemeProvider>
  main.jsx                 → entrada Vite/CRA
```

## Como integrar no seu projeto

1. Copie a pasta `src/` para dentro do seu projeto React (Vite, CRA ou Next com "use client").
2. Garanta que seu bundler suporta CSS Modules com a extensão `.module.css` (Vite e CRA já vêm configurados).
3. Se for usar em Next.js (App Router), adicione `'use client'` no topo de `ThemeContext.jsx`, `Header.jsx` e `Home.jsx`, pois usam hooks e `window`.
4. Rode `npm install` (ou `pnpm i` / `yarn`) e depois `npm run dev`.

## Como funciona o tema

- `ThemeContext.jsx` guarda o tema atual (`dark` | `light`) e expõe `toggleTheme()`.
- Ao mudar, ele seta `document.documentElement.dataset.theme`, o que troca instantaneamente
  todas as variáveis CSS definidas em `theme.css` (sem re-render pesado, é só CSS).
- O tema inicial respeita `prefers-color-scheme` do sistema na primeira visita, e depois
  é persistido em `localStorage`.
- Qualquer componente pode consumir com `const { theme, isDark, toggleTheme } = useTheme();`

## Decisões de UX

- **Foco visível**: todo link/botão interativo tem `:focus-visible` com contorno azul (acessibilidade via teclado).
- **`prefers-reduced-motion`**: transições são desativadas automaticamente para quem pede menos movimento.
- **Nav com rótulos**: os números (00–07) mostram um rótulo (ex. "Projetos") no hover/foco — mantém o visual limpo do design original mas ainda comunica pra onde cada número leva.
- **Responsivo**: no mobile, o HUD decorativo (telemetria + arcos de radar) some para não competir com o conteúdo em telas pequenas; os CTAs empilham em largura total.
- **Toggle de tema com `aria-pressed`**: leitores de tela anunciam corretamente o estado atual.

## Personalização rápida

- Trocar a paleta → edite só `src/styles/theme.css`.
- Trocar textos do hero → edite `src/components/Hero/Hero.jsx`.
- Trocar itens de navegação → edite o array `NAV_ITEMS` em `src/components/Header/Header.jsx`.
- Trocar os dados de telemetria (lat/lon, status) → edite `src/components/Telemetry/Telemetry.jsx`.
