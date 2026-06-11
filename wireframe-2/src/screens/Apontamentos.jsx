import { apontamentos, telemetriaDias, usos } from '../data.js'
import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

const columns = [
  { key: 'id', label: 'Apontamento' },
  { key: 'uso', label: 'Uso' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'natureza', label: 'Natureza' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'grau', label: 'Grau' },
  { key: 'fase', label: 'Fase' },
  { key: 'ciencia', label: 'Ciência' },
  { key: 'prazo', label: 'Prazo' },
  { key: 'proximaAcao', label: 'Próxima ação' },
]

const evidenciaCols = [
  { key: 'id', label: 'Registro' },
  { key: 'uso', label: 'Uso' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'data', label: 'Data' },
  { key: 'captado', label: 'Captado' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'permitido', label: 'Permitido' },
  { key: 'estadoVazao', label: 'Estado vazão' },
]

const apontamentoRecortes = [
  {
    name: 'Todos',
    sort: [{ field: 'prazo' }, { field: 'fase' }],
    groupBy: 'fase',
    columns: columns.map((column) => column.key),
  },
  {
    name: 'Detectadas',
    filters: [{ field: 'fase', op: 'eq', value: 'Detectada' }],
    sort: [{ field: 'prazo' }, { field: 'grau', dir: 'desc' }],
    groupBy: 'tipo',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'natureza', 'tipo', 'grau', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Notificadas',
    filters: [{ field: 'fase', op: 'eq', value: 'Notificada' }],
    sort: [{ field: 'prazo' }, { field: 'tipo' }],
    groupBy: 'tipo',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'tipo', 'grau', 'ciencia', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Autuadas',
    filters: [{ field: 'fase', op: 'eq', value: 'Autuada' }],
    sort: [{ field: 'prazo' }, { field: 'grau', dir: 'desc' }],
    groupBy: 'grau',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'tipo', 'grau', 'ciencia', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Com prazo',
    filters: [{ field: 'prazo', op: 'present' }],
    sort: [{ field: 'prazo' }, { field: 'fase' }],
    groupBy: 'fase',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'natureza', 'tipo', 'fase', 'ciencia', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Regularização',
    logic: 'any',
    filters: [
      { field: 'tipo', op: 'eq', value: 'condicionante' },
      { field: 'proximaAcao', op: 'contains', value: 'regularização' },
    ],
    sort: [{ field: 'prazo' }, { field: 'tipo' }],
    groupBy: 'tipo',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'tipo', 'descricao', 'fase', 'prazo', 'proximaAcao'],
  },
]

function related(row) {
  return {
    uso: usos.find((uso) => uso.id === row.uso),
    evidencia: telemetriaDias.filter((dia) => dia.uso === row.uso),
  }
}

function renderTab(row, active) {
  const scoped = related(row)

  if (active === 'Triagem') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Natureza', row.natureza],
          ['Tipo', row.tipo],
          ['Grau', row.grau],
          ['Fase', row.fase],
          ['Ciência', row.ciencia],
          ['Prazo', row.prazo],
          ['Próxima ação', row.proximaAcao],
          ['Origem da fila', 'reconciliação medido/declarado x outorgado'],
        ]} />
      </div>
    )
  }

  if (active === 'Contexto') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Uso', row.uso],
          ['Portaria', row.portaria],
          ['Outorgado', row.outorgado],
          ['Identificação SiDeCC', scoped.uso?.identificacao || '-'],
          ['Tipo de uso', scoped.uso?.tipoUso || '-'],
          ['Sub-bacia', scoped.uso?.subBacia || '-'],
          ['Município', scoped.uso?.municipio || '-'],
          ['Ponto', scoped.uso?.ponto || '-'],
        ]} />
      </div>
    )
  }

  if (active === 'Evidência') return <DataTable columns={evidenciaCols} rows={scoped.evidencia} noSearch compact />

  return (
    <div className="record-fields">
      <FieldGrid items={[
        ['Pacote probatório', row.evidencia],
        ['Ciência', row.ciencia],
        ['Prazo', row.prazo],
        ['Fase atual', row.fase],
        ['Regularização esperada', row.proximaAcao],
      ]} />
    </div>
  )
}

function apontamentoActions(row) {
  const detectada = row.fase === 'Detectada'
  const notificada = row.fase === 'Notificada'
  const semCiencia = row.ciencia === '-'
  const prazoVencido = row.prazo === 'vencido'
  const autuada = row.fase === 'Autuada'

  return [
    { label: 'Notificar', enabled: detectada, reason: `fase atual: ${row.fase}` },
    { label: 'Registrar ciência', enabled: notificada && semCiencia, reason: semCiencia ? 'notificação ainda não emitida nesta fase' : 'ciência já registrada' },
    { label: 'Lavrar auto', enabled: notificada && !semCiencia && prazoVencido, reason: autuada ? 'auto já lavrado' : 'aguarda ciência, prazo ou avaliação da resposta' },
    { label: 'Encerrar apontamento', enabled: false, reason: 'somente após regularização comprovada', sub: true },
  ]
}

export default function Apontamentos() {
  return (
    <IndexWorkspace
      dataset="apontamentos"
      title="Apontamentos"
      meta="detecção e triagem"
      recortes={apontamentoRecortes}
      rows={apontamentos}
      columns={columns}
      tabs={['Triagem', 'Contexto', 'Evidência', 'Prazos / regularização']}
      defaultTab="Triagem"
      rowTitle={(row) => `${row.id} · ${row.fase}`}
      rowSubtitle={() => 'apontamento selecionado'}
      inspectorItems={(row) => {
        const scoped = related(row)
        return [
          ['Apontamento', row.id],
          ['Uso', row.uso],
          ['Portaria', row.portaria],
          ['Outorgado', row.outorgado],
          ['Tipo', row.tipo],
          ['Grau', row.grau],
          ['Fase', row.fase],
          ['Prazo', row.prazo],
          ['Evidências', scoped.evidencia.length || 'sem série vinculada'],
          ['Próxima ação', row.proximaAcao],
        ]
      }}
      scopeItems={(row) => [
        ['Outorgado', row.outorgado],
        ['Uso', row.uso],
        ['Portaria', row.portaria],
        ['Apontamento', row.id],
      ]}
      recordActions={apontamentoActions}
      renderTab={renderTab}
    />
  )
}
