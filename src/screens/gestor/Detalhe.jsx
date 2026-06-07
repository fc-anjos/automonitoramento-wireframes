import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Svg, Row, Sp } from '../../components/ui.jsx'

const top = (
  <>
    <div className="crumb"><Link to="/gestor/mapa">Pontos</Link> / <b style={{ color: 'var(--ink)' }}>07-1001</b></div>
    <span className="sp" />
    <Pill variant="warn">Exceção · grau média</Pill>
    <Pill variant="label">Sinal de gestão</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Detalhe() {
  return (
    <GestorShell tag="GESTOR · 03" title="Detalhe do ponto / outorgado" active="pontos" top={top}>
      <Bento>
        <Card col={12}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">Ponto de captação · 07-1001</div>
              <h1 style={{ marginTop: 6 }}>Indústria Cubatão S/A</h1>
              <div className="muted" style={{ marginTop: 4 }}>Polo industrial de Cubatão · Rio Cubatão</div>
            </div>
            <Row style={{ gap: 8 }}><Pill variant="act">Faixa A</Pill><Pill>Telemetria</Pill></Row>
          </Row>
          <hr className="div" />
          <div className="grid g-4">
            <div><div className="muted" style={{ fontSize: 11 }}>Nº da outorga</div><div className="mono" style={{ color: 'var(--ink)' }}>OUT-07-2024-001234</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>ID SiDeCC</div><div className="mono" style={{ color: 'var(--ink)' }}>SDC-998877</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Finalidade</div><div className="mono" style={{ color: 'var(--ink)' }}>Industrial</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Fonte</div><div className="mono" style={{ color: 'var(--ink)' }}>Superficial</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Município</div><div className="mono" style={{ color: 'var(--ink)' }}>Cubatão</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Coordenadas</div><div className="mono" style={{ color: 'var(--ink)' }}>−23.879, −46.418</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Medidor</div><div className="mono" style={{ color: 'var(--ink)' }}>SDC-R-4471 · ativo</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Transmissão (30d)</div><div className="mono" style={{ color: 'var(--ink)' }}>98,6%</div></div>
          </div>
        </Card>

        <Card kpi col={4}><div className="k-label">Pico de vazão (4 h)</div><div className="k-value">53</div><div className="k-meta">L/s · <b>118% do teto · exceção</b></div></Card>
        <Card kpi col={4}><div className="k-label">Volume anual</div><div className="k-value">58%</div><div className="k-meta">consumido · <b>projeção 116%</b></div></Card>
        <Card kpi col={4}><div className="k-label">Transmissão (30 d)</div><div className="k-value">98,6%</div><div className="k-meta">% · 1 lacuna retificada</div></Card>

        <Panel col={8} header={<>Limites outorgados × medido <Sp /><Pill variant="label">conformidade por dimensão</Pill></>}>
          <table className="table">
            <thead><tr><th>Limite</th><th className="num">Outorgado</th><th className="num">Medido</th><th>Situação</th></tr></thead>
            <tbody>
              <tr><td>Vazão máx. instantânea</td><td className="num">45 L/s</td><td className="num">pico 53 L/s · 118%</td><td><Pill variant="warn">Exceção</Pill></td></tr>
              <tr><td>Volume diário</td><td className="num">3.425 m³/dia</td><td className="num">3.180 m³/dia</td><td><Pill variant="ok">Conforme</Pill></td></tr>
              <tr><td>Volume mensal</td><td className="num">104.000 m³/mês</td><td className="num">110.200 m³/mês · 106%</td><td><Pill variant="warn">Atenção</Pill></td></tr>
              <tr><td>Volume anual</td><td className="num">1.250.000 m³</td><td className="num">58% · projeção 116%</td><td><Pill variant="warn">Em risco</Pill></td></tr>
              <tr><td>Regime de operação</td><td className="num">contínuo (24 h)</td><td className="num">conforme</td><td><Pill variant="ok">Conforme</Pill></td></tr>
              <tr><td>Transmissão (30 d)</td><td className="num">≥ 95%</td><td className="num">98,6%</td><td><Pill variant="ok">Conforme</Pill></td></tr>
            </tbody>
          </table>
        </Panel>

        <Panel col={4} header={<>Apontamentos <Sp /><Pill variant="label">3</Pill></>}>
          <Body>
            <div className="list">
              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Pico de vazão acima do teto</span>
                  <Pill variant="warn">grau média</Pill>
                </div>
                <div className="lr-sub">
                  <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill>
                  <span style={{ marginLeft: 6 }}>fase Notificada · 04/06 · pico 53 L/s (teto 45)</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: outorgado justifica até 25/06 · tratativa: classificar / autuar</div>
              </Link>

              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Volume anual em risco</span>
                  <Pill variant="label">sinal de gestão</Pill>
                </div>
                <div className="lr-sub">
                  <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Sinal de gestão</Pill>
                  <span style={{ marginLeft: 6 }}>sem grau · desde jun · 58% · projeção 116%</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: outorgado reduz o ritmo · tratativa: acompanhar / notificar se persistir</div>
              </Link>

              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Amostra isolada ausente</span>
                  <Pill variant="ok">grau leve</Pill>
                </div>
                <div className="lr-sub">
                  <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill>
                  <span style={{ marginLeft: 6 }}>fase Encerrada · 03/06 · 1 lacuna, já retificada</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: nenhuma · tratativa: encerrada</div>
              </Link>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>Cada linha é um apontamento tipado pela <b>natureza</b> (sinal de gestão, exceção, ato administrativo), pelo <b>grau</b> e pela <b>fase</b> da tramitação. Um sinal de gestão apenas acompanha e dá baixa sozinho; uma exceção aguarda justificativa em prazo; um ato administrativo segue rito próprio. Abrir um apontamento dá ao gestor os verbos de disposição: notificar, classificar, autuar, julgar. O sinal de gestão não tem grau, porque nada foi excedido ainda.</Note>
          </Body>
        </Panel>

        <Panel col={6} header={<>Vazão instantânea × teto <Sp /><Pill variant="label">janela 4 h</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-vazao.svg" ratio="520/280" label="Vazão instantânea numa janela de 4 h, com um pico de 53 L/s acima do teto de 45 L/s" />
            <Note style={{ fontSize: 12, marginTop: 10 }}>Mede o <b>momento</b>: vazão instantânea contra o teto outorgado. O pico de 53 L/s é uma <b>exceção</b>, que pede justificativa em prazo; não é, por si, infração.</Note>
          </Body>
        </Panel>

        <Panel col={6} header={<>Orçamento anual · projeção <Sp /><Pill variant="label">12 meses</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-burndown.svg" ratio="520/280" label="Consumo do orçamento anual: acúmulo acima do ritmo, projeção cruza 100% por volta de início de novembro" />
            <Note style={{ fontSize: 12, marginTop: 10 }}>Mede a <b>tendência</b>: orçamento anual contra o ritmo de consumo. Acima do ritmo, a projeção estoura o limite ~início de nov.</Note>
          </Body>
        </Panel>

        <Panel col={8} header={<>Histórico de medições (telemetria) <Sp /><Pill variant="label">amostras recentes</Pill></>}>
          <table className="table">
            <thead><tr><th>Data</th><th className="num">Vol. acum.</th><th className="num">Vazão</th><th>Estado do dado</th></tr></thead>
            <tbody>
              <tr><td>04/06 09:35</td><td className="num">725.040</td><td className="num">37,0 L/s</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
              <tr><td>04/06 08:20</td><td className="num">723.900</td><td className="num">53,0 L/s</td><td><Pill variant="warn">Pico {'>'} teto</Pill></td></tr>
              <tr><td>04/06 03:35</td><td className="num">722.700</td><td className="num">38,4 L/s</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
              <tr><td>03/06 21:35</td><td className="num">721.520</td><td className="num">36,1 L/s</td><td><Pill variant="warn">Validado</Pill></td></tr>
            </tbody>
          </table>
        </Panel>

        <Panel col={4} header={<>Transmissão (30 d) <Sp /><Pill variant="label">98,6%</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-transmissao.svg" ratio="520/200" label="Transmissão diária nos últimos 30 dias, com uma lacuna isolada já retificada" />
            <Note style={{ fontSize: 12, marginTop: 10 }}>A confiança no diagnóstico depende deste indicador: transmissão a <b>98,6%</b>, uma lacuna isolada (dia 20) já retificada. Trilha de auditoria na aba <b>Cadastro</b>.</Note>
          </Body>
        </Panel>
      </Bento>
    </GestorShell>
  )
}
