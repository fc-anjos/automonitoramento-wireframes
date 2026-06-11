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
        <b>Uma visão orientada por exceção.</b> O dashboard resume prioridade, risco e cobertura da bacia; a operação detalhada fica nas telas de fila. O recorte (sub-bacia, município, finalidade, faixa de VM) aplica-se a toda a página, e cada bloco abre a lista completa correspondente.
      </Note>

      <Bento>
        <Panel lead col={12} header={<>Panorama de apontamentos <Sp /><Pill>6 abertos</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Abrir fila completa →</Btn></>}>
          <Body>
            <Row style={{ gap: 10, flexWrap: 'wrap' }}>
              <div className="lrow" style={{ flex: '1 1 220px', minWidth: 220 }}>
                <div className="lr-top"><span className="lr-title">Críticos</span><Pill variant="bad">2 graves+</Pill></div>
                <div className="lr-sub">Fraude na medição e volume reincidente já estão em ato administrativo.</div>
              </div>
              <div className="lrow" style={{ flex: '1 1 220px', minWidth: 220 }}>
                <div className="lr-top"><span className="lr-title">Exceções em prazo</span><Pill variant="warn">3</Pill></div>
                <div className="lr-sub">Pico de vazão, condicionante vencida e outorga a vencer aguardam resposta ou correção.</div>
              </div>
              <div className="lrow" style={{ flex: '1 1 220px', minWidth: 220 }}>
                <div className="lr-top"><span className="lr-title">Calendário</span><Pill variant="label">2</Pill></div>
                <div className="lr-sub">Vencimento e dormência aparecem como exceções próprias, sem grau sancionador.</div>
              </div>
              <div className="lrow" style={{ flex: '1 1 220px', minWidth: 220 }}>
                <div className="lr-top"><span className="lr-title">Sinais preventivos</span><Pill variant="label">3</Pill></div>
                <div className="lr-sub">Projeções de risco ficam separadas dos apontamentos que exigem desfecho.</div>
              </div>
            </Row>
            <Row style={{ gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Sub-bacia · todas ▾</div>
              <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Município · todos ▾</div>
              <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Finalidade · todas ▾</div>
              <div className="input" style={{ minHeight: 32, fontSize: 12 }}>Faixa de VM · todas ▾</div>
            </Row>
          </Body>
        </Panel>

        <Note col={12} style={{ marginTop: -2 }}>
          O dashboard não repete a tabela de apontamentos: ele mostra a composição da fila e deixa a triagem detalhada para <Link to="/gestor/apontamentos">Apontamentos</Link>. Um pico isolado de telemetria é uma <b>exceção</b> com ação pedida ao usuário; não constitui infração consumada. O desvio sancionável corre como <b>ato administrativo</b>. A natureza define a tratativa: um <b>sinal de gestão</b> tem baixa automática quando o uso volta ao previsto; uma <b>exceção</b> aguarda justificativa em prazo.
        </Note>

        {/* sanction + money rails: own queues, never mixed with the triagem */}
        <Panel col={7} header={<>Processos sancionadores <Sp /><Pill variant="label">rito próprio</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Fila completa →</Btn></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title mono">PAS-07-2026-0042</span><Pill variant="bad">defesa a julgar</Pill></div>
              <div className="lr-sub">07-1100 · Indústria Química Cubatão · dono da próxima ação: gestor</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title mono">PAS-07-2026-0051</span><Pill variant="warn">ciência pendente</Pill></div>
              <div className="lr-sub">07-1042 · Petroquímica Baixada S/A · dono da próxima ação: outorgado</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title mono">PAS-07-2025-0019</span><Pill variant="label">2ª instância</Pill></div>
              <div className="lr-sub">Recurso sem efeito suspensivo · guia exigível enquanto aguarda decisão.</div>
            </div>
            <Note style={{ fontSize: 12 }}>Fila própria, fora da triagem de apontamentos: exceções e processos não se misturam. A ordem operacional é pelo que vence primeiro: defesas a julgar, ciências pendentes e prazos a vencer.</Note>
          </Body>
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
            <Note style={{ margin: 14, fontSize: 12 }}>A cobertura resume a saúde operacional da bacia. A meta de transmissão é ≥ 95%; a bacia está em 94,8%, e as lacunas viram apontamentos de qualidade do dado quando passam do limiar.</Note>
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
