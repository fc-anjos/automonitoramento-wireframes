import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Btn, Sp, Row, DataTable } from '../../components/ui.jsx'

// The immutable ledger as a first-class surface. The doctrine repeated across
// the platform ("quem, quando, qual ato", "nunca é apagada", "imutável", "é
// ela que sustenta o devido processo") describes ONE unified trail; the other
// screens render only the slice that touches their object (Apontamento shows
// "Últimos eventos", Multas its guias). This screen is that single ledger.
// It is one surface, the log table; the doctrine lives in the annotations
// below, not in teaching panels.

// origin drives the pill, and the column IS the visible asymmetry of verbs:
// Sistema = automático (faint), Gestor = ato dispositivo (act), Outorgado =
// participação no rito.
const fonteVar = { Sistema: 'label', Gestor: 'act', Outorgado: undefined }

// unified, time-sorted ledger (newest first). the rows reproduce the slices
// shown on Apontamento, Detalhe and Multas, plus the export and
// credential acts that those screens declare are themselves audited.
const TRILHA = [
  { id: 't17', ts: '10/06 07:02', fonte: 'Sistema', obj: 'GR-2026-0258', to: '/gestor/multas', ato: 'Conciliou retorno CNAB 240: 14 guias liquidadas, 1 divergência aberta (pagamento a menor)' },
  { id: 't16', ts: '09/06 15:21', fonte: 'Gestor', ator: 'M. Souza', obj: 'GR-2026-0263', to: '/gestor/multas', ato: 'Resolveu divergência (pagamento a maior) com justificativa: diferença compensada na guia seguinte' },
  { id: 't15', ts: '08/06 09:12', fonte: 'Gestor', ator: 'R. Alves', obj: 'REL-volumes-1ºtri', to: '/gestor/relatorios', ato: 'Gerou relatório de volumes do 1º trimestre (filtros: UGRHI-07, todas as finalidades); exportação registrada' },
  { id: 't14', ts: '07/06 14:30', fonte: 'Gestor', ator: 'M. Souza', obj: '07-1042', to: '/gestor/acessos', ato: 'Criou usuário e emitiu convite (Petroquímica Baixada S/A · login experimental de telemetria)' },
  { id: 't13', ts: '06/06 11:18', fonte: 'Gestor', ator: 'M. Souza', obj: 'SOL-2026-0461', to: '/gestor/solicitacoes', ato: 'Recebeu solicitação de renovação (07-0830)' },
  { id: 't12', ts: '06/06 10:44', fonte: 'Sistema', obj: 'GR-2026-0301', to: '/gestor/multas', ato: 'Emitiu 2ª via com encargos por ato do gestor, em substituição à GR-2026-0269' },
  { id: 't11', ts: '06/06 09:40', fonte: 'Outorgado', obj: 'AP-1001-A', to: '/gestor/apontamento', ato: 'Anexou documento (relatório de bombeamento)' },
  { id: 't10', ts: '05/06 16:40', fonte: 'Gestor', ator: 'M. Souza', obj: '07-1100', to: '/gestor/processo', ato: 'Classificou como gravíssima e lavrou auto de infração' },
  { id: 't09', ts: '05/06 14:12', fonte: 'Outorgado', obj: 'AP-1001-A', to: '/gestor/apontamento', ato: 'Registrou ciência (início da contagem do prazo)' },
  { id: 't08', ts: '04/06 14:05', fonte: 'Sistema', obj: '07-0830', to: '/gestor/detalhe', ato: 'Sinalizou outorga a vencer (renovar até 17/07)' },
  { id: 't07', ts: '04/06 10:05', fonte: 'Gestor', ator: 'R. Alves', obj: 'AP-1001-A', to: '/gestor/apontamento', ato: 'Emitiu notificação' },
  { id: 't06', ts: '04/06 08:20', fonte: 'Sistema', obj: 'AP-1001-A', to: '/gestor/apontamento', ato: 'Detectou exceção (pico 53 L/s acima do teto de 45)' },
  { id: 't05', ts: '03/06 09:30', fonte: 'Sistema', obj: '07-0455', to: '/gestor/detalhe', ato: 'Sinalizou outorga dormente (sem uso ~24 meses)' },
  { id: 't04', ts: '02/06 09:15', fonte: 'Gestor', ator: 'M. Souza', obj: 'GR-2025-0188', to: '/gestor/multas', ato: 'Inscreveu em dívida ativa, com fundamento, a partir da fila de exceção de calendário' },
  { id: 't03', ts: '31/05 00:00', fonte: 'Sistema', obj: 'OUT-07-2018-009907', to: '/gestor/detalhe', ato: 'Espelho refletiu outorga extinta por prazo vencido' },
  { id: 't02', ts: '29/05 00:00', fonte: 'Sistema', obj: 'GR-2026-0288', to: '/gestor/multas', ato: 'Abriu exceção de calendário: guia vencida sem liquidação (multa · PAS-07-2025-0019)' },]

const COLS = [
  { key: 'ts', label: 'Data / hora', cls: 'mono faint' },
  { key: 'fonte', label: 'Origem', render: (r) => <Pill variant={fonteVar[r.fonte]}>{r.fonte}{r.ator ? ` · ${r.ator}` : ''}</Pill> },
  { key: 'obj', label: 'Objeto', cls: 'mono', render: (r) => r.to ? <Link className="mono" to={r.to}>{r.obj}</Link> : r.obj },
  { key: 'ato', label: 'Ato registrado' },
]

// forensic filters, the structured cuts over the free-text search. non-functional
// (wireframe), the way Relatórios renders its parity filter set.
const FILTERS = ['Origem', 'Tipo de ato', 'Objeto', 'Período']
const Filters = () => (
  <Row style={{ gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    {FILTERS.map((f) => (
      <div key={f} className="input" style={{ minHeight: 30, padding: '4px 10px', fontSize: 12, flex: 'none' }}>
        <span className="faint">{f}: todos ▾</span>
      </div>
    ))}
  </Row>
)

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Auditoria</b></div>
    <span className="sp" />
    <Btn sub style={{ padding: '6px 12px' }}>Exportar trilha</Btn>
  </>
)

export default function Auditoria() {
  return (
    <GestorShell tag="GESTOR · 12" title="Auditoria" active="auditoria" top={top}>
      <Note style={{ marginBottom: 16 }}>
        Trilha única da plataforma: cada ato de disposição e cada evento do sistema (apontamento, solicitação, sanção, multas, cadastro e credenciais) grava <b>quem, quando e qual ato</b>. As demais telas mostram apenas o recorte que toca o seu objeto.
      </Note>

      <Bento>

        {/* the unified ledger: the whole platform's acts and events, one table.
            the Origem column is where the asymmetry of verbs is read off. */}
        <Panel lead col={12} header={<>Trilha de auditoria · plataforma <Sp /><Pill variant="label">quem · quando · qual ato</Pill></>}>
          <Filters />
          <DataTable
            columns={COLS}
            rows={TRILHA}
            search={['ts', 'fonte', 'ator', 'obj', 'ato']}
            searchPlaceholder="Buscar por objeto, ator ou ato…"
            universe={12480}
            pageSize={8}
            empty="Nenhum registro corresponde ao filtro."
          />
        </Panel>

        <Note col={12}>
          A coluna <b>Origem</b> distingue o ato pela autoria: <b>gestor</b> (notifica, classifica, lavra, julga, encerra, resolve divergência, inscreve em dívida ativa), <b>sistema</b> (detecção de exceção, sinais de calendário, conciliação bancária, reflexos do espelho de outorgas) e <b>outorgado</b> (ciência, anexo, defesa).
        </Note>

        <Note col={12}>
          Relatórios com dados pessoais do outorgado circulam apenas no perfil do gestor; ao portal público vão os agregados, observada a LGPD. As consolidações exportáveis ficam em <Link to="/gestor/relatorios">Relatórios</Link>.
        </Note>

      </Bento>
    </GestorShell>
  )
}
