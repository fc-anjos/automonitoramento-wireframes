// Index launcher (COMMUNICATION register). Mirrors the original index.html:
// draft banner, intro, three surface sections, each a grid of cards whose
// thumbnail is the real screen component rendered scaled.
import { useNavigate } from 'react-router-dom'
import { SCREENS, SURFACES, screensBySurface } from './screens.jsx'

function LaunchCard({ screen }) {
  const navigate = useNavigate()
  const { path, num, title, blurb, Component } = screen
  return (
    <div
      className="launch-card"
      role="link"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(path)}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(path) }}
    >
      <div className="thumb">
        {/* real screen, scaled + click-inert (see wireframe.css .thumb-frame) */}
        <div className="thumb-frame" aria-hidden="true"><Component /></div>
      </div>
      <span className="num">{num}</span>
      <h3>{title}</h3>
      <p>{blurb}</p>
    </div>
  )
}

function VersionCard({ href, num, title, blurb }) {
  return (
    <a className="launch-card" href={href}>
      <div className="thumb" aria-hidden="true">
        <div style={{ padding: 18, fontFamily: 'var(--comm)' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Protótipo navegável</div>
          <div style={{ height: 10, width: '72%', background: '#bdbdbd', marginBottom: 10 }} />
          <div style={{ height: 10, width: '48%', background: '#d4d4d4', marginBottom: 18 }} />
          <div className="grid g-3">
            <div style={{ height: 44, background: '#e1e1e1', border: '1px solid #d0d0d0' }} />
            <div style={{ height: 44, background: '#e1e1e1', border: '1px solid #d0d0d0' }} />
            <div style={{ height: 44, background: '#e1e1e1', border: '1px solid #d0d0d0' }} />
          </div>
        </div>
      </div>
      <span className="num">{num}</span>
      <h3>{title}</h3>
      <p>{blurb}</p>
    </a>
  )
}

export default function Launcher() {
  return (
    <>
      <div className="wf-banner">
        <span>● Rascunho · Wireframe de baixa fidelidade</span>
        <b>Alinhamento de fornecedor</b>
        <span>Dados fictícios</span>
        <span className="sp" />
        <span>TR Automonitoramento · Bacia-piloto UGRHI-07 (Baixada Santista) · Cenário 4</span>
      </div>

      <div className="wrap stack">
        <header className="stack" style={{ '--space': '10px' }}>
          <div className="eyebrow">SP-Águas · CBH-BS · Bacia-piloto UGRHI-07</div>
          <h1>Sistema de Automonitoramento de usos de recursos hídricos</h1>
          <p className="lede">Conjunto de wireframes que ilustra, para alinhamento de escopo com o fornecedor, as três superfícies descritas no Termo de Referência: o <b>aplicativo próprio unificado</b> (roteado por porte de usuário, Curva ABC), a <b>plataforma de consolidação e alerta</b> do gestor, e o <b>portal público de transparência</b>. Telas estáticas, intencionalmente cruas. Nenhum dado é real.</p>
        </header>

        <div className="note">
          <b>Como ler estas telas.</b> São <b>rascunhos de estrutura</b>, não design final: blocos cinzas = conteúdo/imagem a definir, linhas tracejadas = região pendente, notas em texto neutro explicam a intenção do projeto. Números, nomes e outorgas são <b>placeholders fictícios</b>. As faixas da Curva ABC aparecem como <code>Faixa A/B/C</code> sem limites, a definir com a SP-Águas.
        </div>

        <div className="note">
          <b>Modelo de domínio.</b> O sistema é <b>multi-bacia por desenho</b>; estes wireframes instanciam a primeira bacia, a <b>bacia-piloto UGRHI-07 (Baixada Santista)</b>. A cadeia de contenção é <b>bacia → sub-bacia → ponto de captação → medidor</b>. O <b>outorgado</b> é entidade transversal, titular de uma ou mais outorgas/pontos, e não está contido numa sub-bacia.
        </div>

        <div className="note">
          <b>Convenção de navegação.</b> As pílulas de navegação conduzem à tela exemplar de cada módulo. Os verbos de ação (deferir, indeferir, registrar ciência…) abrem um <b>esboço de baixa fidelidade</b> do despacho, ilustrativo dos campos exigidos, da justificativa e do efeito jurídico do ato.
        </div>

        <section className="stack">
          <div className="row" style={{ alignItems: 'baseline' }}>
            <h2>Versões do protótipo <span className="pill">publicadas juntas</span></h2>
            <span className="sp" style={{ flex: 1 }} />
          </div>
          <p className="muted" style={{ margin: 0 }}>A versão 1 permanece como índice de telas por superfície. A versão 2 abre o console gestor em padrão workbook.</p>
          <div className="grid g-2">
            <VersionCard
              href="./"
              num="VERSÃO 1"
              title="Índice de telas por superfície"
              blurb="Aplicativo do outorgado, plataforma gestora e portal público no conjunto original de wireframes."
            />
            <VersionCard
              href="./v2/"
              num="VERSÃO 2"
              title="Console gestor em workbook"
              blurb="Protótipo gestor alternativo, com navegação por abas, tabelas densas, inspetor lateral e recortes operacionais."
            />
          </div>
        </section>

        <hr className="div" />

        {SURFACES.map((surface, i) => (
          <div key={surface.id}>
            <section className="stack">
              <div className="row" style={{ alignItems: 'baseline' }}>
                <h2>{surface.heading} <span className="pill">{surface.pill}</span></h2>
                <span className="sp" style={{ flex: 1 }} />
              </div>
              <p className="muted" style={{ margin: 0 }}>{surface.blurb}</p>
              <div className={`grid g-${surface.grid}`}>
                {screensBySurface(surface.id).map((screen) => (
                  <LaunchCard key={screen.id} screen={screen} />
                ))}
              </div>
            </section>
            {i < SURFACES.length - 1 && <hr className="div" />}
          </div>
        ))}

        <footer style={{ marginTop: 40, paddingTop: 18, borderTop: '1px solid var(--line)' }} className="legend">
          <span className="mono faint">{SCREENS.length} telas · 3 superfícies · Bacia-piloto UGRHI-07 (Baixada Santista)</span>
        </footer>
      </div>
    </>
  )
}
