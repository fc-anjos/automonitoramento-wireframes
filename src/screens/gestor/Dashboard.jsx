import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Zone, Pill, Btn, Svg, Row, Sp } from '../../components/ui.jsx'

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
        <b>Uma visão orientada por exceção.</b> A tela abre pela fila de triagem, o objeto que o gestor veio tratar; os totais por tipo são filtros sobre a fila, não cartões. O recorte (sub-bacia, município, finalidade, faixa de VM) aplica-se a toda a página, e os contadores estruturais da bacia ficam no fim.
      </Note>

      <Bento>
        {/* TRIAGE: led by gravest first */}
        <Panel lead col={12} header={<>Triagem por gravidade <Sp /><Pill>6 apontamentos abertos</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Todos os apontamentos →</Btn></>}>
          {/* type chips filter the queue; they replace the old kpi tiles */}
          <Row style={{ gap: 8, padding: '10px 14px 0', flexWrap: 'wrap' }}>
            <Pill variant="act">todos · 6</Pill>
            <Pill variant="label">volume · 2</Pill>
            <Pill variant="label">calendário · 2</Pill>
            <Pill variant="label">condicionante · 1</Pill>
            <Pill variant="label">qualidade do dado · 1</Pill>
          </Row>
          {/* recorte applies to the whole page, not only the queue */}
          <Row style={{ gap: 8, padding: '8px 14px 0', flexWrap: 'wrap' }}>
            <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Sub-bacia · todas ▾</div>
            <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Município · todos ▾</div>
            <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Finalidade · todas ▾</div>
            <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Faixa de VM · todas ▾</div>
          </Row>
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
                <td>Calibração de hidrômetro vencida</td>
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
          A fila lidera pela <b>gravidade</b>: a fraude gravíssima (07-1100) e o volume grave reincidente (07-1042) vêm antes do pico de vazão de grau média e dos achados de calendário sem grau. Um pico isolado de telemetria é uma <b>exceção</b> com ação pedida ao usuário; não constitui infração consumada. O desvio sancionável corre como <b>ato administrativo</b>, caso dos dois primeiros da fila, que já seguem o rito. As exceções são tipadas (volume, calendário, condicionante, qualidade do dado) porque calendário e condicionante são dirigidos por data e por obrigação acessória, não por leitura de telemetria; o <b>grau</b> ordena dentro de cada tipo. A natureza define a tratativa: um <b>sinal de gestão</b> tem baixa automática quando o uso volta ao previsto; uma <b>exceção</b> aguarda justificativa em prazo.
        </Note>

        {/* sanction + money rails: own queues, never mixed with the triagem */}
        <Panel col={7} header={<>Processos sancionadores <Sp /><Pill variant="label">rito próprio · ordenado por prazo</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Fila completa →</Btn></>}>
          <table className="table">
            <thead><tr><th>Processo</th><th>Ponto / outorgado</th><th>Fase do rito</th><th>Prazo / dono</th><th>Abrir</th></tr></thead>
            <tbody>
              <tr>
                <td className="mono">PAS-07-2026-0042</td><td>07-1100 · Indústria Química Cubatão</td>
                <td>Defesa a julgar</td><td>protocolada em 18/06 · <b>gestor</b></td>
                <td><Btn sub to="/gestor/processo" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td className="mono">PAS-07-2026-0051</td><td>07-1042 · Petroquímica Baixada S/A</td>
                <td>Ciência pendente</td><td>lavrado em 06/06 · <b>outorgado</b></td>
                <td><Btn sub to="/gestor/processo" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
              <tr>
                <td className="mono">PAS-07-2025-0019</td><td>07-1042 · Petroquímica Baixada S/A</td>
                <td>Recurso · 2ª instância</td><td>sem efeito suspensivo · <b>gestor</b></td>
                <td><Btn sub to="/gestor/processo" style={{ padding: '5px 12px' }}>Abrir →</Btn></td>
              </tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>Fila própria, fora da triagem de apontamentos: exceções e processos não se misturam na mesma fila. A ordem é pelo que vence primeiro (defesas a julgar, ciências pendentes, prazos a vencer), e os prazos do rito estadual aparecem como parâmetros: prazo parametrizável · conferir DOE.</Note>
        </Panel>
        <Panel col={5} header={<>Arrecadação <Sp /><Pill variant="label">emitidas × liquidadas</Pill><Btn sub to="/gestor/arrecadacao" style={{ padding: '6px 12px' }}>Abrir arrecadação →</Btn></>}>
          <table className="table"><tbody>
            <tr><td>Guias emitidas (exercício)</td><td className="num">87</td></tr>
            <tr><td>Liquidadas</td><td className="num">71</td></tr>
            <tr><td>Inadimplência</td><td className="num">9,2%</td></tr>
            <tr><td>Divergências de conciliação</td><td className="num">3</td></tr>
            <tr><td>Aptas à dívida ativa</td><td className="num">1</td></tr>
          </tbody></table>
          <Note style={{ margin: 14, fontSize: 12 }}>Multa do processo sancionador e cobrança pelo uso sob o mesmo critério: a situação da guia muda por conciliação bancária, nunca por edição direta, e o agregado destinado ao FEHIDRO alimenta o portal público, sem dados pessoais.</Note>
        </Panel>

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
              <tr><td><Link to="/gestor/pontos" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>Rio Cubatão</b></Link></td><td className="num">141</td><td className="num">96,1%</td><td className="num">8,4 hm³</td><td className="num">11,9 hm³</td><td><Pill variant="warn">Atenção</Pill></td></tr>
              <tr><td><Link to="/gestor/pontos" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>Rio Itapanhaú</b></Link></td><td className="num">73</td><td className="num">92,0%</td><td className="num">2,1 hm³</td><td className="num">3,0 hm³</td><td><Pill variant="ok">Normal</Pill></td></tr>
              <tr><td><Link to="/gestor/pontos" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>Drenagem direta (costeira)</b></Link></td><td className="num">98</td><td className="num">95,3%</td><td className="num">3,7 hm³</td><td className="num">4,5 hm³</td><td><Pill variant="ok">Normal</Pill></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>A sub-bacia é nível da cadeia de contenção (contém pontos de captação, não outorgados); na navegação, funciona como recorte: clicar no nome abre a lista de pontos já filtrada por ela.</Note>
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
          <Panel header={<>Qualidade do dado da bacia <Sp /><Pill variant="label">agregado · 24h</Pill></>}>
            <table className="table"><tbody>
              <tr><td>Recebido</td><td className="num">312</td></tr>
              <tr><td>Validado</td><td className="num">308</td></tr>
              <tr><td>Consolidado</td><td className="num">307</td></tr>
              <tr><td>Registros retidos</td><td className="num">4</td></tr>
            </tbody></table>
            <Note style={{ margin: 14, fontSize: 12 }}>Estados do dado antes da fiscalização: recebido, validado e consolidado. Quatro registros ficaram retidos nas checagens automáticas (limites físicos, continuidade de série, fluxo reverso); retificar gera um novo registro e nunca sobrescreve o original. Quando a checagem aponta integridade comprometida, abre-se um apontamento do tipo qualidade do dado, que entra na fila de apontamentos. Validar o dado é tratativa de leitura, não de mérito.</Note>
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
