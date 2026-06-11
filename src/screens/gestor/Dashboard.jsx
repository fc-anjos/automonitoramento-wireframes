import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Zone, Pill, Btn, Svg, Row, Sp, DataTable } from '../../components/ui.jsx'

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Dashboard</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar outorga, usuário, ponto…</span></div>
    <Pill variant="label">Período: 2026</Pill>
  </>
)

// Processos sancionadores resumidos para a mini-fila do dashboard.
// Ordem: o que vence primeiro (defesas a julgar, ciências pendentes, prazos a vencer).
const PROCESSOS = [
  { id: 'PAS-07-2026-0042', num: 'PAS-07-2026-0042', ponto: '07-1100 · Indústria Química Cubatão', fase: 'Defesa a julgar', dono: 'gestor', faseVar: 'bad' },
  { id: 'PAS-07-2026-0051', num: 'PAS-07-2026-0051', ponto: '07-1042 · Petroquímica Baixada S/A', fase: 'Ciência pendente', dono: 'outorgado', faseVar: 'warn' },
  { id: 'PAS-07-2025-0019', num: 'PAS-07-2025-0019', ponto: '07-1042 · Petroquímica Baixada S/A', fase: 'Recurso · 2ª instância', dono: 'gestor', faseVar: 'label' },
]

const PROCESSOS_COLS = [
  { key: 'num', label: 'Processo', render: (r) => (
    <Link to="/gestor/processo" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
      <b className="mono">{r.num}</b>
    </Link>
  ) },
  { key: 'ponto', label: 'Ponto' },
  { key: 'fase', label: 'Fase', render: (r) => <Pill variant={r.faseVar}>{r.fase}</Pill> },
  { key: 'dono', label: 'Dono da próx. ação', render: (r) => <b>{r.dono}</b> },
]

// Acompanhamento por sub-bacia: DataTable (Princípio B).
const SUBBACIA_ROWS = [
  { id: 'cubatao', subbacia: 'Rio Cubatão', pontos: '141', transmissao: '96,1%', volMedido: '8,4 hm³', volOutorgado: '11,9 hm³', status: 'Atenção', statusVar: 'warn' },
  { id: 'itapanhau', subbacia: 'Rio Itapanhaú', pontos: '73', transmissao: '92,0%', volMedido: '2,1 hm³', volOutorgado: '3,0 hm³', status: 'Normal', statusVar: 'ok' },
  { id: 'costeira', subbacia: 'Drenagem direta (costeira)', pontos: '98', transmissao: '95,3%', volMedido: '3,7 hm³', volOutorgado: '4,5 hm³', status: 'Normal', statusVar: 'ok' },
]

const SUBBACIA_COLS = [
  { key: 'subbacia', label: 'Sub-bacia', render: (r) => (
    <Link to="/gestor/pontos" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>{r.subbacia}</b></Link>
  ) },
  { key: 'pontos', label: 'Pontos', num: true },
  { key: 'transmissao', label: 'Transmissão (30d)', num: true },
  { key: 'volMedido', label: 'Vol. medido', num: true },
  { key: 'volOutorgado', label: 'Vol. outorgado', num: true },
  { key: 'status', label: 'Status', render: (r) => <Pill variant={r.statusVar}>{r.status}</Pill> },
]

export default function Dashboard() {
  const goProcesso = useNavigate()
  return (
    <GestorShell tag="GESTOR · 01" title="Dashboard de fiscalização" active="dashboard" top={top} bodyStack>
      <Note>
        <b>Uma visão orientada por exceção.</b> O dashboard resume prioridade, risco e cobertura da bacia; a operação detalhada fica nas telas de fila. O recorte (sub-bacia, município, finalidade, faixa de VM) aplica-se a toda a página, e cada bloco abre a lista completa correspondente.
      </Note>

      <Bento>
        {/* lead: panorama de apontamentos com filtros de recorte */}
        <Panel lead col={12} header={<>Panorama de apontamentos <Sp /><Pill>6 abertos</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Abrir fila completa →</Btn></>}>
          <Body>
            <Row style={{ gap: 10, flexWrap: 'wrap' }}>
              <div className="lrow" style={{ flex: '1 1 220px', minWidth: 220 }}>
                <div className="lr-top"><span className="lr-title">Críticos</span><Pill variant="bad">2 graves+</Pill></div>
                <div className="lr-sub">Fraude na medição e volume reincidente estão em ato administrativo.</div>
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

        {/* sanction queue + justificativas: side-by-side, never mixed */}
        <Panel col={7} header={<>Processos sancionadores <Sp /><Pill variant="label">rito próprio</Pill><Btn sub to="/gestor/apontamentos" style={{ padding: '6px 12px' }}>Fila completa →</Btn></>}>
          <DataTable
            columns={PROCESSOS_COLS}
            rows={PROCESSOS.map((r) => ({ ...r, onClick: () => {} }))}
            pageSize={6}
            empty="Nenhum processo sancionador em curso."
          />
          <Note style={{ margin: 14, fontSize: 12 }}>Fila própria, fora da triagem de apontamentos: exceções e processos não se misturam. A ordem operacional é pelo que vence primeiro: defesas a julgar, ciências pendentes e prazos a vencer. O recurso não tem efeito suspensivo por regra (Lei 10.177/1998, art. 46).</Note>
        </Panel>

        {/* justificativas mini-panel */}
        <Panel col={5} header={<>Justificativas <Sp /><Pill variant="warn">Aguardando avaliação</Pill><Btn sub to="/gestor/justificativas" style={{ padding: '6px 12px' }}>Abrir fila →</Btn></>}>
          <table className="table"><tbody>
            <tr><td>Aguardando avaliação</td><td className="num"><b>9</b></td></tr>
            <tr><td>Aprovadas (exercício)</td><td className="num">34</td></tr>
            <tr><td>Reprovadas (exercício)</td><td className="num">5</td></tr>
          </tbody></table>
          <Note style={{ margin: 14, fontSize: 12 }}>Justificativas de ausência de declaração formam fila própria de avaliação (estados: Aguardando avaliação, Aprovado, Reprovado), separada das Solicitações, como no SiDeCC. As pendentes exigem despacho do gestor.</Note>
        </Panel>

        {/* two co-equal charts */}
        <Panel col={6} header={<>Volume captado × outorgado <Sp /><Pill>por mês</Pill></>}>
          <Body><Svg src="wireframe-chart-dashboard.svg" ratio="520/300" label="Volume captado mensal × outorgado (agregado da bacia)" /></Body>
        </Panel>
        <Panel col={6} header={<>Comprometimento por sub-bacia <Sp /><Pill>outorga ÷ Q7,10</Pill></>}>
          <Body><Svg src="wireframe-chart-comprometimento.svg" ratio="460/280" label="Comprometimento estrutural por sub-bacia: soma das outorgas dividida pela disponibilidade (Q7,10)" /></Body>
        </Panel>

        {/* prioritization: sub-bacia DataTable (Princípio B), largura cheia */}
        <Panel col={12} header={<>Acompanhamento por sub-bacia <Sp /><Btn sub to="/gestor/mapa" style={{ padding: '6px 12px' }}>Ver no mapa →</Btn></>}>
          <DataTable
            columns={SUBBACIA_COLS}
            rows={SUBBACIA_ROWS}
            pageSize={6}
            empty="Nenhuma sub-bacia encontrada."
          />
          <Note style={{ margin: 14, fontSize: 12 }}>A sub-bacia é nível da cadeia de contenção (contém pontos de captação, não outorgados); na navegação, funciona como recorte: clicar no nome abre a lista de pontos já filtrada por ela.</Note>
        </Panel>

        {/* contadores estruturais da bacia: três painéis co-iguais em linha cheia */}
        <Panel col={4} header={<>Cobertura da bacia <Sp /><Pill variant="act">VM</Pill></>}>
          <table className="table"><tbody>
            <tr><td>Pontos monitorados</td><td className="num">312</td></tr>
            <tr><td>Telemetria</td><td className="num">64</td></tr>
            <tr><td>Autodeclaração</td><td className="num">248</td></tr>
            <tr><td>Transmissão (30d)</td><td className="num">94,8%</td></tr>
            <tr><td>Adesão declaratória</td><td className="num">87%</td></tr>
          </tbody></table>
          <Note style={{ margin: 14, fontSize: 12 }}>A cobertura resume a saúde operacional da bacia. A meta de transmissão é ≥ 95%; a bacia está em 94,8%, e as lacunas viram apontamentos de qualidade do dado quando passam do limiar.</Note>
        </Panel>
        <Panel col={4} header={<>Qualidade do dado da bacia <Sp /><Pill variant="label">agregado · 24h</Pill></>}>
          <table className="table"><tbody>
            <tr><td>Recebido</td><td className="num">312</td></tr>
            <tr><td>Validado</td><td className="num">308</td></tr>
            <tr><td>Consolidado</td><td className="num">307</td></tr>
            <tr><td>Retidos</td><td className="num">4</td></tr>
          </tbody></table>
          <Note style={{ margin: 14, fontSize: 12 }}>Estados do dado antes da fiscalização: recebido, validado e consolidado. Quatro registros ficaram retidos nas checagens automáticas (limites físicos, continuidade de série, fluxo reverso). Quando a checagem aponta integridade comprometida, abre-se um apontamento do tipo qualidade do dado, que entra na fila de apontamentos.</Note>
        </Panel>
        <Panel col={4} header="Por finalidade de uso">
          <table className="table"><tbody>
            <tr><td>Industrial</td><td className="num">61%</td></tr>
            <tr><td>Abastecimento público</td><td className="num">24%</td></tr>
            <tr><td>Portuário / serviços</td><td className="num">9%</td></tr>
            <tr><td>Irrigação / outros</td><td className="num">6%</td></tr>
          </tbody></table>
        </Panel>
      </Bento>
    </GestorShell>
  )
}
