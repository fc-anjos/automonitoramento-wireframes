import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, Row, DataTable } from '../../components/ui.jsx'

// Relatórios são cortes exportáveis. Acompanhamento diário aparece como painel
// ou fila viva e chega aqui como exportação e corte histórico; consolidação
// (volumes, totais, dados básicos, listagens para ofício) permanece relatório,
// com filtros consistentes e saída em CSV e PDF.

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Relatórios e exportações</b></div>
    <span className="sp" />
    <Pill variant="label">catálogo de consultas</Pill>
    <Pill variant="label">Exercício: 2026</Pill>
  </>
)

// Verificações de saúde do cadastro (decisão 6): condição · severidade · tratamento.
// Grau: leve · grave · gravíssima (Lei 7.663/1991, art. 13). "média" não existe
// na norma estadual.
const SAUDE_ROWS = [
  {
    id: 'pendencias',
    condicao: 'Usuário ativo sem uso ativo, uso sem portaria ativa, ou portaria sem frequência',
    severidade: 'leve',
    sevVar: 'warn',
    tratamento: '/gestor/dashboard',
    tratamentoLabel: 'Ver no Dashboard',
  },
  {
    id: 'ato-vencido',
    condicao: 'Uso com ato vencido (sem ato vigente após data final do ato)',
    severidade: 'grave',
    sevVar: 'bad',
    tratamento: '/gestor/pontos',
    tratamentoLabel: 'Ver fila de pontos',
  },
  {
    id: 'sem-declaracao',
    condicao: 'Ato vigente de uso ativo com início de declaração até a data corrente e nenhuma declaração cadastrada',
    severidade: 'grave',
    sevVar: 'bad',
    tratamento: '/gestor/apontamentos',
    tratamentoLabel: 'Fila de omissos',
  },
  {
    id: 'sem-medidor',
    condicao: 'Ato vigente de uso ativo com início de declaração até a data corrente e nenhum medidor cadastrado',
    severidade: 'grave',
    sevVar: 'bad',
    tratamento: '/gestor/dashboard',
    tratamentoLabel: 'Ver no Dashboard',
  },
]

const SAUDE_COLS = [
  { key: 'condicao', label: 'Condição' },
  {
    key: 'severidade',
    label: 'Severidade',
    render: (r) => <Pill variant={r.sevVar}>{r.severidade}</Pill>,
  },
  {
    key: 'tratamento',
    label: 'Tratamento',
    render: (r) => <Link className="pill" to={r.tratamento}>{r.tratamentoLabel}</Link>,
  },
]

const FILTERS = ['Status', 'Bacia', 'Dominialidade', 'UGRHI', 'Município', 'Período']
const Filters = ({ list = FILTERS }) => (
  <Row style={{ gap: 8, flexWrap: 'wrap' }}>
    {list.map((f) => (
      <div key={f} className="input" style={{ minHeight: 30, padding: '4px 10px', fontSize: 12, flex: 'none' }}>
        <span className="faint">{f}: todos ▾</span>
      </div>
    ))}
  </Row>
)

const ExportRow = ({ act = 'Gerar relatório' }) => (
  <Row style={{ gap: 8, marginTop: 10 }}>
    <Btn variant="act" style={{ padding: '5px 12px' }}>{act}</Btn>
    <Btn sub style={{ padding: '5px 12px' }}>Exportar CSV</Btn>
    <Btn sub style={{ padding: '5px 12px' }}>Exportar PDF</Btn>
  </Row>
)

export default function Relatorios() {
  return (
    <GestorShell tag="GESTOR · 11" title="Relatórios e exportações" active="relatorios" top={top} bodyStack>
      <Note>
        <b>Relatórios são cortes exportáveis.</b> O que é acompanhamento diário aparece como painel ou fila viva e chega aqui como exportação e corte histórico; o que é <b>consolidação</b> (volumes, totais, dados básicos, listagens para ofício) permanece relatório, com filtros consistentes e saída em CSV e PDF.
      </Note>

      <Bento>

        {/* saúde cadastral: verificações de integridade referencial convertidas em tabela (decisão 6) */}
        <Panel col={12} header={<>Saúde cadastral <Sp /><Pill variant="ok">painel + exportação</Pill></>}>
          <DataTable
            columns={SAUDE_COLS}
            rows={SAUDE_ROWS}
            pageSize={6}
            empty="Nenhuma condição de saúde cadastral."
          />
          <ExportRow act="Exportar corte histórico" />
          <Note style={{ margin: 14, fontSize: 12 }}>
            Estes indicadores ficam vivos no painel e nas listas operacionais: pendências de cadastro no painel de saúde de dados, atos vencidos como filtro dinâmico na lista de pontos, e atos sem declaração como estoque de omissos que antecede o apontamento de ausência. A exportação permanece para corte histórico e cobrança de regularização. Severidade conforme Lei 7.663/1991, art. 13: leve, grave, gravíssima.
          </Note>
        </Panel>

        {/* fiscalização: a consulta anti-gaming promovida a sinal */}
        <Panel col={6} header={<>Fiscalização <Sp /><Pill variant="warn">justificativas repetidas: sinal</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Justificativas repetidas</span><Link className="pill warn" to="/gestor/apontamentos">Sinal na triagem</Link></div>
              <div className="lr-sub">Justificativas repetidas por usuário ou por tipo, agrupadas, em período.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Infrações constatadas, deferidas e recursos</span><Link className="pill" to="/gestor/processo">Visões do processo</Link></div>
              <div className="lr-sub">Infrações constatadas, deferidas e em recurso, por mês e dominialidade.</div>
            </div>
            <Filters list={['Período', 'Dominialidade', 'Infração', 'Status']} />
            <ExportRow />
            <Note>
              A justificativa reciclada mês a mês vira indicador de recorrência na fila de apontamentos; o relatório serve à análise de período. As infrações constatadas, deferidas e em recurso são visões do módulo de processo sancionador, em que cada linha abre o processo com rito, prazos e evidência congelada.
            </Note>
          </Body>
        </Panel>

        {/* volumes: outorgado × utilizado; volumes alimentam fiscalização e consolidação */}
        <Panel lead col={6} header={<>Volumes <Sp /><Pill variant="label">outorgado × utilizado</Pill></>}>
          <table className="table">
            <thead><tr><th>Relatório</th><th>Recorte</th><th>Saída</th></tr></thead>
            <tbody>
              <tr><td>Ato: volume outorgado/utilizado</td><td className="mono">mês/ano · 05/2026</td><td><Pill variant="label">CSV · PDF</Pill></td></tr>
              <tr><td>Volume mensal por ato</td><td className="mono">mês/ano · 05/2026</td><td><Pill variant="label">CSV · PDF</Pill></td></tr>
              <tr><td>Volume anual</td><td className="mono">ano · 2026 · por tipo, bacia, dominialidade</td><td><Pill variant="label">CSV · PDF</Pill></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>
            As regras de cálculo ficam explícitas na memória do relatório: <b>atos sazonais</b> entram pelo volume outorgado do mês de maior valor; <b>períodos sem declaração</b> e dias entre remoção e reinstalação do medidor são imputados ao <b>volume máximo diário</b> no consumo anual. Os volumes calculados aqui alimentam os módulos de fiscalização e de consolidação.
          </Note>
        </Panel>

        {/* consolidações e ofícios: genuinamente relatórios, mantidos como relatórios */}
        <Panel col={12} header={<>Consolidações e ofícios <Sp /><Pill variant="label">exportáveis</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Principais dados</span></div>
              <div className="lr-sub">Usuário, uso/interferência, ato vigente e última frequência, excluídos os registros apagados.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Totais</span></div>
              <div className="lr-sub">Contagens de usuários, usos, atos e frequências ativos, com filtros em cascata (o filtro definido se aplica às informações relacionadas).</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Dados básicos + medidores + volume estimado</span></div>
              <div className="lr-sub">Inclui menor e maior volume estimado dos últimos 3 meses, por medidor.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Listagem para emissão de ofícios</span><Pill variant="label">papel</Pill></div>
              <div className="lr-sub">Todos os usos/interferências e seus atos, independentemente do status, para o contingente não alcançado pelos canais digitais.</div>
            </div>
            <Filters />
            <ExportRow />
          </Body>
        </Panel>

        <Note col={12}>
          <b>Exportar também é ato registrado.</b> Cada geração de relatório grava quem extraiu, com quais filtros e quando; relatórios com dados pessoais do outorgado circulam apenas no perfil do gestor, e as divulgações públicas usam recortes agregados, observada a LGPD.
        </Note>

      </Bento>
    </GestorShell>
  )
}
