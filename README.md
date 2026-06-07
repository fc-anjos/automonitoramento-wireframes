# Wireframes · Sistema de Automonitoramento (UGRHI-07 / Baixada Santista)

Wireframes de baixa fidelidade das três superfícies do TR de Automonitoramento: o
**aplicativo próprio** do outorgado (mobile), a **plataforma do gestor** (web) e o
**portal público** de transparência. Telas estáticas, dados fictícios.

Aplicação **React + Vite**. O estilo é o kit "Balsamiq-like" em `src/styles/wireframe.css`,
mantido intencionalmente cru (duas faixas: produto esboçado vs. comunicação neutra).

## Desenvolvimento

```bash
npm install      # uma vez
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o dist/ gerado
```

## Estrutura

```
src/
  main.jsx          entrada (HashRouter)
  App.jsx           rotas + alternância do registro "comms" no <body>
  Launcher.jsx      índice (cards com miniatura ao vivo de cada tela)
  screens.jsx       registro: rota, número, título e blurb de cada tela
  components/
    shell.jsx       DraftBanner, moldura do app (Phone/AppBar/AppTabBar…),
                    GestorShell + GestorSidebar (web)
    ui.jsx          primitivos: Card, Panel, Pill, Btn, Note, Meter, Svg, layout…
  screens/
    app/            7 telas do aplicativo (telefone)
    gestor/         9 telas da plataforma do gestor (shell web)
    portal/         1 tela do portal público
  assets/fonts/     Balsamiq Sans (empacotada pelo Vite)
public/assets/      SVGs de gráficos e mapas (servidos estáticos)
```

Cada tela é um componente em `src/screens/**`, composto a partir dos componentes
compartilhados. Para adicionar uma tela: crie o componente e registre-o em `src/screens.jsx`.

## Deploy

`.github/workflows/pages.yml` roda `npm ci && npm run build` e publica `dist/` no GitHub
Pages a cada push em `main`. O `base` é relativo (`./`), então funciona sob o caminho do
projeto no Pages; o roteamento é por hash, então links profundos não dão 404.
