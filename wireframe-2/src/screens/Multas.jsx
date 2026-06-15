import { useNavigate } from 'react-router-dom'
import { evidenciasProcessuais, multas, processos, usos } from '../data.js'
import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

const columns = [
  { key: 'id', label: 'Guia' },
  { key: 'processo', label: 'Processo' },
  { key: 'uso', label: 'Uso' },
  { key: 'identificacao', label: 'Identificação SiDeCC', render: (row) => related(row).uso?.identificacao || '-' },
  { key: 'subBacia', label: 'Sub-bacia', render: (row) => related(row).uso?.subBacia || '-' },
  { key: 'municipio', label: 'Município', render: (row) => related(row).uso?.municipio || '-' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'valor', label: 'Valor' },
  { key: 'vencimento', label: 'Vencimento' },
  { key: 'guiaEstado', label: 'Guia' },
  { key: 'conciliacaoEstado', label: 'Conciliação' },
  { key: 'cobrancaEstado', label: 'Cobrança' },
  { key: 'proximaAcao', label: 'Próxima ação' },
]

const recortes = [
  {
    name: 'Todas',
    sort: [{ field: 'vencimento' }, { field: 'outorgado' }],
    groupBy: 'guiaEstado',
    columns: columns.map((column) => column.key),
  },
  {
    name: 'Aguardando retorno',
    filters: [{ field: 'conciliacaoEstado', op: 'eq', value: 'aguardando retorno' }],
    sort: [{ field: 'vencimento' }],
    columns: ['id', 'processo', 'uso', 'outorgado', 'valor', 'vencimento', 'conciliacaoEstado', 'proximaAcao'],
  },
  {
    name: 'Divergências',
    filters: [{ field: 'conciliacaoEstado', op: 'eq', value: 'divergente' }],
    sort: [{ field: 'vencimento' }],
    columns: ['id', 'processo', 'uso', 'outorgado', 'valorEsperado', 'valorPago', 'conciliacaoEstado', 'proximaAcao'],
  },
  {
    name: 'Vencidas / inadimplentes',
    filters: [{ field: 'cobrancaEstado', op: 'eq', value: 'inadimplente' }],
    sort: [{ field: 'vencimento' }],
    columns: ['id', 'processo', 'uso', 'outorgado', 'valor', 'vencimento', 'guiaEstado', 'cobrancaEstado', 'proximaAcao'],
  },
]

const retornoCols = [
  { key: 'retorno', label: 'Retorno' },
  { key: 'data', label: 'Data' },
  { key: 'esperado', label: 'Esperado' },
  { key: 'pago', label: 'Pago' },
  { key: 'estado', label: 'Estado' },
]

const evidenciaCols = [
  { key: 'tipo', label: 'Tipo' },
  { key: 'documento', label: 'Documento' },
  { key: 'origem', label: 'Origem' },
  { key: 'estado', label: 'Estado' },
]

function related(row) {
  return {
    processo: processos.find((processo) => processo.id === row.processo),
    uso: usos.find((uso) => uso.id === row.uso),
    evidencias: evidenciasProcessuais.filter((doc) => doc.processo === row.processo),
  }
}

function retornoRows(row) {
  return [{
    id: `${row.id}-retorno`,
    retorno: row.retornoArrecadador,
    data: row.dataRetorno,
    esperado: row.valorEsperado,
    pago: row.valorPago,
    estado: row.conciliacaoEstado,
  }]
}

function renderTab(row, active) {
  const scoped = related(row)

  if (active === 'Guia') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Documento', row.documentoArrecadacao],
          ['Arrecadador', row.arrecadador],
          ['Código de receita', row.codigoReceita],
          ['Valor', row.valor],
          ['Vencimento', row.vencimento],
          ['Guia', row.guiaEstado],
          ['Processo de origem', row.processo],
        ]} />
        <div className="payment-rail">
          <div>
            <span>PIX dinâmico</span>
            <b>{row.pix}</b>
          </div>
          <div>
            <span>Boleto / código de barras</span>
            <b>{row.linhaDigitavel}</b>
          </div>
        </div>
      </div>
    )
  }

  if (active === 'Pagamento') return <DataTable columns={retornoCols} rows={retornoRows(row)} noSearch compact />

  if (active === 'Conciliação') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Conciliação', row.conciliacaoEstado],
          ['Cobrança', row.cobrancaEstado],
          ['Retorno do arrecadador', row.retornoArrecadador],
          ['Valor esperado', row.valorEsperado],
          ['Valor pago', row.valorPago],
          ['Tipo de divergência', row.divergenciaTipo],
          ['Encaminhamento', row.encaminhamento],
        ]} />
      </div>
    )
  }

  if (active === 'Processo') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Processo', row.processo],
          ['Fase', scoped.processo?.fase || '-'],
          ['Decisão', scoped.processo?.decisao || '-'],
          ['Regularização', scoped.processo?.regularizacao || '-'],
          ['Próxima ação do processo', scoped.processo?.proximaAcao || '-'],
        ]} />
        <DataTable columns={evidenciaCols} rows={scoped.evidencias} noSearch compact />
      </div>
    )
  }

  return (
    <div className="record-fields">
      <FieldGrid items={[
        ['Último retorno', row.dataRetorno],
        ['Estado da guia', row.guiaEstado],
        ['Estado da conciliação', row.conciliacaoEstado],
        ['Estado de cobrança', row.cobrancaEstado],
        ['Próxima ação', row.proximaAcao],
      ]} />
    </div>
  )
}

function multaActions(row, navigate) {
  const processoPath = `/processos?field=id&value=${encodeURIComponent(row.processo)}`

  return [
    { label: 'Abrir processo', enabled: true, onClick: () => navigate(processoPath) },
    { label: 'Consultar retorno', enabled: row.conciliacaoEstado === 'aguardando retorno', reason: 'retorno já recebido ou não aplicável' },
    { label: 'Registrar divergência', enabled: row.conciliacaoEstado === 'divergente', reason: 'sem divergência pendente', onClick: () => navigate(processoPath) },
    { label: 'Emitir 2ª via', enabled: row.guiaEstado === 'vencida', reason: 'guia não vencida', onClick: () => navigate(processoPath) },
    { label: 'Encaminhar cobrança', enabled: row.cobrancaEstado === 'inadimplente', reason: 'cobrança ainda em prazo', onClick: () => navigate(processoPath) },
  ]
}

export default function Multas() {
  const navigate = useNavigate()

  return (
    <IndexWorkspace
      dataset="multas"
      title="Multas"
      meta="livro de guias, conciliação e cobrança"
      recortes={recortes}
      rows={multas}
      columns={columns}
      tabs={['Guia', 'Pagamento', 'Conciliação', 'Processo', 'Auditoria']}
      defaultTab="Guia"
      rowTitle={(row) => `${row.id} · ${row.guiaEstado}`}
      rowSubtitle={() => 'guia selecionada'}
      inspectorItems={(row) => [
        ['Guia', row.id],
        ['Processo', row.processo],
        ['Uso', row.uso],
        ['Outorgado', row.outorgado],
        ['Valor', row.valor],
        ['Vencimento', row.vencimento],
        ['Guia', row.guiaEstado],
        ['Conciliação', row.conciliacaoEstado],
        ['Cobrança', row.cobrancaEstado],
        ['Próxima ação', row.proximaAcao],
      ]}
      scopeItems={(row) => [
        ['Outorgado', row.outorgado],
        ['Uso', row.uso],
        ['Portaria', row.portaria],
        ['Processo', row.processo],
        ['Guia', row.id],
      ]}
      recordActions={(row) => multaActions(row, navigate)}
      renderTab={renderTab}
    />
  )
}
