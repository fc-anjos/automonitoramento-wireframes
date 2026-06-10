import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, Row } from '../../components/ui.jsx'

// parity target: the SiDeCC "Relatórios" admin page (~15 queries). the argument
// of this screen is paridade de informação, não de forma: what is operational
// became a live surface elsewhere; what is genuinely a report stays here,
// filterable and exportable, with the legacy calculation rules made explicit.

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Relatórios e exportações</b></div>
    <span className="sp" />
    <Pill variant="label">paridade · página Relatórios do SiDeCC</Pill>
    <Pill variant="label">Exercício: 2026</Pill>
  </>
)

// the SiDeCC filter set, kept as the parity contract for every consulta
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
        <b>Paridade de informação, não de forma.</b> Toda consulta da página de relatórios do SiDeCC tem equivalente aqui, mas nem toda virou relatório: o que é <b>operacional</b> (pendências de cadastro, atos vencidos, atos sem declaração) vive como painel ou fila em outra tela e aparece nesta página apenas como exportação e corte histórico; o que é <b>consolidação</b> (volumes, totais, dados básicos, listagens para ofício) permanece relatório, com os mesmos filtros do legado e saída em CSV e PDF.
      </Note>

      <Bento>

        {/* saúde cadastral: referential-integrity queries, absorbed by live surfaces */}
        <Panel col={6} header={<>Saúde cadastral <Sp /><Pill variant="ok">absorvido · painel dinâmico</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Usuários com pendências de cadastro</span><Link className="pill" to="/gestor/dashboard">Ver no Dashboard</Link></div>
              <div className="lr-sub">Usuário ativo sem uso ativo, uso sem portaria ativa, portaria sem frequência. No SiDeCC era consulta manual; aqui é contador permanente no painel de saúde de dados, com drill-down. O relatório permanece para exportação e corte histórico.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Usos com ato vencido</span><Link className="pill" to="/gestor/pontos">Ver fila</Link></div>
              <div className="lr-sub">Sem ato vigente após a data final informada, por período de vencimento. Alimenta a lista de pontos como filtro dinâmico; a exportação serve à cobrança de regularização.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Atos sem declarações ou sem medidores</span><Link className="pill" to="/gestor/dashboard">Ver no Dashboard</Link></div>
              <div className="lr-sub">Atos vigentes e ativos, de usos ativos, com início de declaração até a data corrente e nenhuma declaração ou medidor cadastrado. É o estoque de omissos de declaração; no painel dinâmico, antecede o apontamento de ausência.</div>
            </div>
            <ExportRow act="Exportar corte histórico" />
          </Body>
        </Panel>

        {/* fiscalização: the anti-gaming query is promoted to a signal */}
        <Panel col={6} header={<>Fiscalização <Sp /><Pill variant="warn">justificativas repetidas → sinal</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Justificativas repetidas</span><Link className="pill warn" to="/gestor/apontamentos">Sinal na triagem</Link></div>
              <div className="lr-sub">Repetidas por usuário ou por tipo, agrupadas, em período. A mesma justificativa reciclada mês a mês deixa de ser achado de relatório e passa a <b>indicador de recorrência na fila de apontamentos</b>; o relatório permanece para a análise de período.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Infrações constatadas · deferidas · e recursos</span><Link className="pill" to="/gestor/processo">Visões do processo</Link></div>
              <div className="lr-sub">No legado, três consultas planas (constatadas por mês e dominialidade; deferidas com prazo de recurso expirado ou recurso analisado; completo com recursos). Aqui são visões do módulo de processo sancionador: cada linha abre o processo, com rito, prazos e evidência congelada.</div>
            </div>
            <Filters list={['Período', 'Dominialidade', 'Infração', 'Status']} />
            <ExportRow />
          </Body>
        </Panel>

        {/* volumes: the reports that carry calculation rules with money effect */}
        <Panel lead col={7} header={<>Volumes <Sp /><Pill variant="label">outorgado × utilizado</Pill></>}>
          <table className="table">
            <thead><tr><th>Relatório</th><th>Recorte</th><th>Saída</th></tr></thead>
            <tbody>
              <tr><td>Ato · volume outorgado/utilizado</td><td className="mono">mês/ano · 05/2026</td><td><Pill variant="label">CSV · PDF</Pill></td></tr>
              <tr><td>Volume mensal por ato</td><td className="mono">mês/ano · 05/2026</td><td><Pill variant="label">CSV · PDF</Pill></td></tr>
              <tr><td>Volume anual</td><td className="mono">ano · 2026 · por tipo, bacia, dominialidade</td><td><Pill variant="label">CSV · PDF</Pill></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>
            Duas regras de cálculo herdadas das notas de rodapé do SiDeCC, aqui tornadas explícitas: <b>atos sazonais</b> entram pelo volume outorgado do mês de maior valor; <b>períodos sem declaração</b> e dias entre remoção e reinstalação do medidor são imputados ao <b>volume máximo diário</b> no consumo anual. Regra do sistema legado, tratada como <b>parâmetro configurável</b>; fundamento normativo a confirmar com a SP-Águas na Etapa 1. Como a imputação repercute na cobrança pelo uso, o cálculo aparece discriminado na memória da guia (<Link to="/gestor/arrecadacao">Arrecadação</Link>).
          </Note>
        </Panel>

        {/* consolidações e ofícios: genuinely reports, kept as reports */}
        <Panel col={5} header={<>Consolidações e ofícios <Sp /><Pill variant="label">exportáveis</Pill></>}>
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
          <b>Exportar também é ato registrado.</b> Cada geração de relatório grava na trilha de auditoria quem extraiu, com quais filtros e quando; relatórios com dados pessoais do outorgado circulam apenas no perfil do gestor, e o que o portal público recebe são os agregados, observada a LGPD.
        </Note>

      </Bento>
    </GestorShell>
  )
}
