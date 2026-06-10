import { DraftBanner } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Svg, Meter, Row, Sp } from '../../components/ui.jsx'

export default function Publico() {
  return (
    <>
      <DraftBanner tag="PORTAL · 01" title="Portal público de transparência" right="Dados agregados · LGPD" />

      {/* public site header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--ink)' }}><span style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--act)', display: 'grid', placeItems: 'center', color: '#fff', font: '700 11px var(--mono)' }}>SP</span> SP-Águas · Automonitoramento</div>
          <span className="sp" style={{ flex: 1 }} />
          <a className="nav-i" style={{ display: 'none' }}>x</a>
          <span className="muted" style={{ fontSize: 13 }}>Indicadores</span>
          <span className="muted" style={{ fontSize: 13 }}>Mapa</span>
          <span className="muted" style={{ fontSize: 13 }}>Dados abertos</span>
          <span className="btn sub" style={{ padding: '6px 12px' }}>Sobre</span>
        </div>
      </div>

      <div className="wrap stack">

        <Note>
          <b>Superfície pública.</b> Mostra o uso da água na bacia de forma <b>agregada</b>, sem expor dados pessoais do outorgado (LGPD). Tom mais leve que a ferramenta do gestor.
        </Note>

        <header className="stack" style={{ marginTop: 6 }}>
          <div className="eyebrow">UGRHI-07 · Baixada Santista</div>
          <h1 style={{ fontSize: 28, maxWidth: '22ch' }}>Uso da água outorgada na UGRHI-07 (Baixada Santista)</h1>
          <p className="lede">Dados consolidados do sistema de automonitoramento, atualizados a partir das medições de telemetria e das autodeclarações. Valores agregados por sub-bacia, finalidade e período.</p>
        </header>

        <Bento>

          {/* public KPIs - strip */}
          <Card kpi col={3}><div className="k-label">Pontos monitorados</div><div className="k-value">312</div><div className="k-meta">na bacia</div></Card>
          <Card kpi col={3}><div className="k-label">Volume captado (ano)</div><div className="k-value">14,2 hm³</div><div className="k-meta">de 19,4 hm³ outorgados</div></Card>
          <Card kpi col={3}><div className="k-label">Pontos com dados recentes</div><div className="k-value">94,8%</div><div className="k-meta">últimos 30 dias</div></Card>
          <Card kpi col={3}><div className="k-label">Atualizado em</div><div className="k-value" style={{ fontSize: 20 }}>04/06/2026</div><div className="k-meta">dados consolidados</div></Card>

          {/* map = the public headline */}
          <Panel lead col={8} header={<>Mapa público da bacia <Sp /><Pill variant="label">agregado</Pill></>}>
            <Svg src="wireframe-mapa-publico.svg" ratio="760/577" label="Mapa público da bacia: uso agregado por sub-bacia, sem identificação individual de usuários" style={{ borderTop: '1.5px solid var(--ink)' }} />
          </Panel>
          <Panel col={4} header="Uso por finalidade">
            <Body stack>
              <div><Row style={{ justifyContent: 'space-between' }}><small>Industrial</small><small className="mono">61%</small></Row><Meter value="61%" /></div>
              <div><Row style={{ justifyContent: 'space-between' }}><small>Abastecimento público</small><small className="mono">24%</small></Row><Meter value="24%" /></div>
              <div><Row style={{ justifyContent: 'space-between' }}><small>Portuário / serviços</small><small className="mono">9%</small></Row><Meter value="9%" /></div>
              <div><Row style={{ justifyContent: 'space-between' }}><small>Irrigação / outros</small><small className="mono">6%</small></Row><Meter value="6%" /></div>
            </Body>
          </Panel>

          <Panel col={6} header={<>Captação por sub-bacia <Sp /><Pill variant="label">12 meses</Pill></>}>
            <Body><Svg src="wireframe-chart-portal-bars.svg" ratio="460/280" label="Volume agregado por sub-bacia" /></Body>
          </Panel>
          <Panel col={6} header={<>Comprometimento por sub-bacia <Sp /><Pill variant="label">outorga ÷ Q7,10</Pill></>}>
            <Body><Svg src="wireframe-chart-comprometimento.svg" ratio="460/280" label="Comprometimento estrutural por sub-bacia: soma das outorgas dividida pela disponibilidade (Q7,10)" /></Body>
          </Panel>

          {/* aggregate, anonymous count of usos em acompanhamento (no pins, no identities) */}
          <Panel col={8} header={<>Usos em acompanhamento <Sp /><Pill variant="label">contagem agregada</Pill></>}>
            <Body>
              <div className="grid g-3">
                <div>
                  <div className="k-value" style={{ font: '700 26px/1.1 var(--sketch)', color: 'var(--ink)' }}>1</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>sinal de gestão</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>o próprio uso projeta ultrapassar um limite; nada excedido ainda</div>
                </div>
                <div>
                  <div className="k-value" style={{ font: '700 26px/1.1 var(--sketch)', color: 'var(--ink)' }}>5</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>exceções em verificação</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>algo fora do esperado, à espera de explicação no prazo</div>
                </div>
                <div>
                  <div className="k-value" style={{ font: '700 26px/1.1 var(--sketch)', color: 'var(--ink)' }}>2</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>em processo</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>já formalizadas, com defesa e julgamento em curso</div>
                </div>
              </div>
              <hr className="div" />
              <Row style={{ gap: 18 }}>
                <span className="muted" style={{ fontSize: 12.5 }}>Por assunto:</span>
                <Pill variant="label">volume · 3</Pill>
                <Pill variant="label">qualidade do dado · 2</Pill>
                <Pill variant="label">calendário · 2</Pill>
                <Pill variant="label">condicionante · 1</Pill>
              </Row>
            </Body>
          </Panel>
          <Panel col={4} header="Como ler">
            <Body>
              <Note style={{ fontSize: 12, marginTop: 0 }}>A versão pública mostra <b>contagens agregadas</b>, sem identificar usuários nem localizar pontos individuais (LGPD). Ela espelha, sem nomes, as mesmas três naturezas que a ferramenta do gestor trata: <b>sinal de gestão</b> (preventivo), <b>exceção em verificação</b> (pede explicação) e <b>em processo</b> (rito administrativo). Uma exceção isolada não é, por si, infração.</Note>
            </Body>
          </Panel>

          {/* aggregate money rail: FEHIDRO destination, no personal data */}
          <Panel col={8} header={<>Arrecadação destinada ao FEHIDRO <Sp /><Pill variant="label">agregado · exercício 2026</Pill></>}>
            <Body>
              <div className="grid g-3">
                <div>
                  <div className="k-value" style={{ font: '700 26px/1.1 var(--sketch)', color: 'var(--ink)' }}>R$ 1,21 mi</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>cobrado no exercício</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>87 guias emitidas · cobrança pelo uso e multas</div>
                </div>
                <div>
                  <div className="k-value" style={{ font: '700 26px/1.1 var(--sketch)', color: 'var(--ink)' }}>R$ 1,10 mi</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>arrecadado (guias liquidadas)</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>R$ 112,4 mil em aberto após o vencimento</div>
                </div>
                <div>
                  <div className="k-value" style={{ font: '700 26px/1.1 var(--sketch)', color: 'var(--ink)' }}>100%</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>destinado ao FEHIDRO</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>Lei estadual 12.183/2005 · Deliberação CBH-BS 157/2009</div>
                </div>
              </div>
            </Body>
          </Panel>
          <Panel col={4} header="De onde vem">
            <Body>
              <Note style={{ fontSize: 12, marginTop: 0 }}>A cobrança pelo uso da água, alimentada pelos volumes declarados e medidos, e as multas do rito administrativo geram guias de recolhimento. O portal mostra apenas o <b>agregado destinado ao FEHIDRO</b>, sem identificar pagadores nem expor valores individuais (LGPD).</Note>
            </Body>
          </Panel>

          <Panel col={12} header="Dados abertos">
            <Body stack>
              <div className="mrow"><span className="ico">⤓</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Volume mensal por sub-bacia</b><div className="muted" style={{ fontSize: 11.5 }}>CSV · agregado</div></div><span className="btn sub" style={{ padding: '4px 10px' }}>Baixar</span></div>
              <div className="mrow"><span className="ico">⤓</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Uso por finalidade</b><div className="muted" style={{ fontSize: 11.5 }}>CSV · agregado</div></div><span className="btn sub" style={{ padding: '4px 10px' }}>Baixar</span></div>
              <div className="mrow"><span className="ico">⤓</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Pontos e cobertura de medição</b><div className="muted" style={{ fontSize: 11.5 }}>GeoJSON · sem dados pessoais</div></div><span className="btn sub" style={{ padding: '4px 10px' }}>Baixar</span></div>
              <Note style={{ fontSize: 12 }}>API pública e dicionário de dados entram conforme política de dados abertos da SP-Águas.</Note>
            </Body>
          </Panel>

        </Bento>

        <footer style={{ marginTop: 30, padding: '18px 0', borderTop: '1px solid var(--line)' }} className="row">
          <span className="muted" style={{ fontSize: 12.5 }}>Sistema de Automonitoramento · SP-Águas / FEHIDRO · CBH-BS</span>
          <span className="sp" style={{ flex: 1 }} />
          <span className="faint mono" style={{ fontSize: 11 }}>Dados agregados conforme LGPD · valores fictícios (rascunho)</span>
        </footer>

      </div>
    </>
  )
}
