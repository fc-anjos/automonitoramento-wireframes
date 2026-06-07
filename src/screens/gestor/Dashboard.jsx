import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Zone, Pill, Btn, Svg, Row, Sp } from '../../components/ui.jsx'

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Dashboard</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar outorga, usuário, ponto…</span></div>
    <Pill variant="label">Período: 2026</Pill>
  </>
)

export default function Dashboard() {
  return (
    <GestorShell tag="GESTOR · 01" title="Dashboard de fiscalização" active="dashboard" top={top} bodyStack>
      <Note>
        <b>Uma visão orientada por exceção.</b> O gestor abre o dashboard para saber o que precisa de ação, então a leitura começa pelos apontamentos por tipo e termina nos contadores estruturais da bacia. Os números são recortáveis por usuário, sub-bacia, município, finalidade e faixa de VM; aqui é a visão geral.
      </Note>

      <Bento>
        {/* EXCEPTION TILES por TIPO - the lead */}
        <Card kpi col={3}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="k-label">Volume</div><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção / Ato administrativo</Pill>
          </Row>
          <div className="k-value" style={{ color: 'var(--bad)' }}>2</div>
          <div className="k-meta">exceções abertas · pior: <b>grave</b> (3 meses acima)</div>
          <div className="k-meta">+ 1 sinal de gestão (orçamento anual em risco)</div>
        </Card>
        <Card kpi col={3}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="k-label">Calendário</div><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill>
          </Row>
          <div className="k-value">2</div>
          <div className="k-meta">1 outorga a vencer (40 dias)</div>
          <div className="k-meta">1 dormente · risco de perecimento (~24 meses)</div>
        </Card>
        <Card kpi col={3}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="k-label">Condicionante</div><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill>
          </Row>
          <div className="k-value">1</div>
          <div className="k-meta">calibração de hidrômetro vencida</div>
          <div className="k-meta">grau leve · recalibrar até 30/06</div>
        </Card>
        <Card kpi col={3}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="k-label">Qualidade do dado</div><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Ato administrativo</Pill>
          </Row>
          <div className="k-value" style={{ color: 'var(--bad)' }}>1</div>
          <div className="k-meta">indício de fraude na medição</div>
          <div className="k-meta">grau <b>gravíssima</b> · autuada</div>
        </Card>

        <Note col={12} style={{ marginTop: -2 }}>
          As exceções aparecem por <b>tipo</b> (volume, calendário, condicionante, qualidade do dado), e não reunidas num único grupo de desvios. Calendário e condicionante são dirigidos por data e por obrigação acessória, não por uma leitura cruzada de telemetria, de modo que um pico de vazão e uma calibração vencida não competem pela mesma fila. O <b>grau</b> ordena dentro de cada tipo, e a natureza define o que o apontamento exige: um <b>sinal de gestão</b> se autorregula e baixa sozinho quando o uso volta ao previsto; uma <b>exceção</b> aguarda a justificativa do outorgado em prazo; um <b>ato administrativo</b> já corre o rito sancionador.
        </Note>

        {/* TRIAGE: led by gravest first */}
        <Panel lead col={12} header={<>Triagem por gravidade <Sp /><Pill>6 apontamentos abertos</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Todos os apontamentos →</Btn></>}>
          <table className="table">
            <thead><tr><th>Apontamento</th><th>Ponto / outorgado</th><th>Tipo</th><th>Natureza</th><th>Grau</th><th className="num">Medido × outorgado</th><th>Fase</th><th>Abrir</th></tr></thead>
            <tbody>
              <tr>
                <td>Indício de fraude na medição</td>
                <td>07-1100 · Indústria Química Cubatão</td>
                <td>Qualidade do dado</td>
                <td><Pill variant="label">Ato administrativo</Pill></td>
                <td><Pill variant="bad">gravíssima</Pill></td>
                <td className="num">telemetria diverge · fluxo reverso</td>
                <td>Autuada</td>
                <td><Btn sub to="/gestor/apontamento" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td>Volume mensal acima do outorgado</td>
                <td>07-1042 · Petroquímica Baixada S/A</td>
                <td>Volume</td>
                <td><Pill variant="label">Ato administrativo</Pill></td>
                <td><Pill variant="bad">grave</Pill></td>
                <td className="num">3 meses acima · reincidência</td>
                <td>Em defesa/recurso</td>
                <td><Btn sub to="/gestor/apontamento" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td>Pico de vazão acima do teto</td>
                <td>07-1001 · Indústria Cubatão S/A</td>
                <td>Volume</td>
                <td><Pill variant="label">Exceção</Pill></td>
                <td><Pill variant="warn">média</Pill></td>
                <td className="num">53 / 45 L/s · 118%</td>
                <td>Notificada</td>
                <td><Btn sub to="/gestor/apontamento" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td>Outorga a vencer</td>
                <td>07-0830 · Serviço de Águas de Praia Grande</td>
                <td>Calendário</td>
                <td><Pill variant="label">Exceção</Pill></td>
                <td><Pill>sem grau</Pill></td>
                <td className="num">vence em 40 dias (17/07)</td>
                <td>Notificada</td>
                <td><Btn sub to="/gestor/apontamento" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td>Calibração do hidrômetro vencida</td>
                <td>07-0712 · Laticínios Itanhaém</td>
                <td>Condicionante</td>
                <td><Pill variant="label">Exceção</Pill></td>
                <td><Pill variant="warn">leve</Pill></td>
                <td className="num">vencida desde 01/05</td>
                <td>Notificada</td>
                <td><Btn sub to="/gestor/apontamento" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td>Sem uso há 2 anos (risco de perecimento)</td>
                <td>07-0455 · Indústria Têxtil Mongaguá</td>
                <td>Calendário</td>
                <td><Pill variant="label">Exceção</Pill></td>
                <td><Pill>sem grau</Pill></td>
                <td className="num">sem declaração há ~24 meses</td>
                <td>Detectada</td>
                <td><Btn sub to="/gestor/apontamento" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
            </tbody>
          </table>
        </Panel>

        <Note col={12} style={{ marginTop: -2 }}>
          A fila lidera pela <b>gravidade</b>: a fraude gravíssima (07-1100) e o volume grave reincidente (07-1042) vêm antes do pico de vazão de grau média e dos achados de calendário sem grau. Um pico isolado de telemetria é uma <b>exceção</b> com ação pedida ao usuário; não constitui infração consumada. O desvio sancionável corre como <b>ato administrativo</b>, caso dos dois primeiros da fila, que já seguem o rito.
        </Note>

        {/* two co-equal findings */}
        <Panel col={6} header={<>Volume captado × outorgado <Sp /><Pill>por mês</Pill></>}>
          <Body><Svg src="wireframe-chart-dashboard.svg" ratio="520/300" label="Volume captado mensal × outorgado (agregado da bacia)" /></Body>
        </Panel>
        <Panel col={6} header={<>Comprometimento por sub-bacia <Sp /><Pill>outorga ÷ Q7,10</Pill></>}>
          <Body><Svg src="wireframe-chart-comprometimento.svg" ratio="460/280" label="Comprometimento estrutural por sub-bacia: soma das outorgas dividida pela disponibilidade (Q7,10)" /></Body>
        </Panel>

        {/* prioritization: sub-bacia table */}
        <Panel col={8} header={<>Acompanhamento por sub-bacia <Sp /><Btn sub to="/gestor/mapa" style={{ padding: '6px 12px' }}>Ver no mapa →</Btn></>}>
          <table className="table">
            <thead><tr><th>Sub-bacia</th><th className="num">Pontos</th><th className="num">Transmissão</th><th className="num">Vol. medido</th><th className="num">Vol. outorgado</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Rio Cubatão</td><td className="num">141</td><td className="num">96,1%</td><td className="num">8,4 hm³</td><td className="num">11,9 hm³</td><td><Pill variant="warn">Atenção</Pill></td></tr>
              <tr><td>Rio Itapanhaú</td><td className="num">73</td><td className="num">92,0%</td><td className="num">2,1 hm³</td><td className="num">3,0 hm³</td><td><Pill variant="ok">Normal</Pill></td></tr>
              <tr><td>Drenagem direta (costeira)</td><td className="num">98</td><td className="num">95,3%</td><td className="num">3,7 hm³</td><td className="num">4,5 hm³</td><td><Pill variant="ok">Normal</Pill></td></tr>
            </tbody>
          </table>
        </Panel>

        {/* SIDE RAIL (span 4): contadores estruturais da bacia */}
        <Zone col={4}>
          <Panel header={<>Cobertura da bacia <Sp /><Pill variant="act">VM</Pill></>}>
            <table className="table"><tbody>
              <tr><td>Pontos monitorados</td><td className="num">312</td></tr>
              <tr><td>Telemetria</td><td className="num">64</td></tr>
              <tr><td>Autodeclaração</td><td className="num">248</td></tr>
              <tr><td>Transmissão (30d)</td><td className="num">94,8%</td></tr>
              <tr><td>Adesão declaratória</td><td className="num">87%</td></tr>
            </tbody></table>
            <Note style={{ margin: 14, fontSize: 12 }}>Contadores estruturais, não filas de ação. A meta de transmissão é ≥ 95%; a bacia está em 94,8%, e as lacunas viram apontamentos de qualidade do dado quando passam do limiar.</Note>
          </Panel>
          <Panel header="Por finalidade de uso">
            <table className="table"><tbody>
              <tr><td>Industrial</td><td className="num">61%</td></tr>
              <tr><td>Abastecimento público</td><td className="num">24%</td></tr>
              <tr><td>Portuário / serviços</td><td className="num">9%</td></tr>
              <tr><td>Irrigação / outros</td><td className="num">6%</td></tr>
            </tbody></table>
          </Panel>
        </Zone>
      </Bento>
    </GestorShell>
  )
}
