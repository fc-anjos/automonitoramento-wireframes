import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'
import { justificativas, telemetriaDias, usos } from '../data.js'

const columns = [
  { key: 'id', label: 'Justificativa' },
  { key: 'uso', label: 'Uso' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'medidor', label: 'Medidor' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'periodo', label: 'Período' },
  { key: 'motivo', label: 'Motivo' },
  { key: 'estado', label: 'Estado' },
  { key: 'recorrencia', label: 'Recorrência' },
  { key: 'prazo', label: 'Prazo' },
]

const evidenciaCols = [
  { key: 'id', label: 'Registro' },
  { key: 'uso', label: 'Uso' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'data', label: 'Data' },
  { key: 'captado', label: 'Captado' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'permitido', label: 'Permitido' },
  { key: 'situacao', label: 'Transmissão' },
  { key: 'estadoVazao', label: 'Estado vazão' },
]

const justificativaRecortes = [
  {
    name: 'Todas',
    sort: [{ field: 'estado' }, { field: 'prazo' }],
    groupBy: 'estado',
    columns: columns.map((column) => column.key),
  },
  {
    name: 'Aguardando avaliação',
    filters: [{ field: 'estado', op: 'eq', value: 'Aguardando avaliação' }],
    sort: [{ field: 'prazo' }, { field: 'recorrencia', dir: 'desc' }],
    groupBy: 'motivo',
    columns: ['id', 'uso', 'portaria', 'medidor', 'outorgado', 'periodo', 'motivo', 'recorrencia', 'prazo'],
  },
  {
    name: 'Aprovadas',
    filters: [{ field: 'estado', op: 'eq', value: 'Aprovado' }],
    sort: [{ field: 'periodo' }, { field: 'uso' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'portaria', 'medidor', 'outorgado', 'periodo', 'motivo', 'recorrencia'],
  },
  {
    name: 'Recorrentes',
    filters: [{ field: 'recorrencia', op: 'contains', value: 'em' }],
    sort: [{ field: 'recorrencia', dir: 'desc' }, { field: 'prazo' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'portaria', 'medidor', 'outorgado', 'periodo', 'motivo', 'estado', 'recorrencia', 'prazo'],
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

  if (active === 'Contexto') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Uso', row.uso],
          ['Portaria', row.portaria],
          ['Medidor', row.medidor],
          ['Outorgado', row.outorgado],
          ['Identificação SiDeCC', scoped.uso?.identificacao || '-'],
          ['Sub-bacia', scoped.uso?.subBacia || '-'],
          ['Município', scoped.uso?.municipio || '-'],
          ['Canal atual', scoped.uso?.canalAtual || '-'],
        ]} />
      </div>
    )
  }

  if (active === 'Evidência') return <DataTable columns={evidenciaCols} rows={scoped.evidencia} noSearch compact />

  if (active === 'Auditoria') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Ato', row.estado === 'Aguardando avaliação' ? 'aguarda avaliação do gestor' : `justificativa ${row.estado.toLowerCase()}`],
          ['Registro', row.id],
          ['Uso', row.uso],
          ['Período', row.periodo],
          ['Trilha', 'registro preservado no histórico do uso e do medidor'],
        ]} />
      </div>
    )
  }

  return (
    <div className="record-fields">
      <FieldGrid items={[
        ['Justificativa', row.id],
        ['Motivo', row.motivo],
        ['Período', row.periodo],
        ['Estado', row.estado],
        ['Recorrência', row.recorrencia],
        ['Prazo', row.prazo],
      ]} />
    </div>
  )
}

function justificativaActions(row) {
  const aguardando = row.estado === 'Aguardando avaliação'

  return [
    { label: 'Aprovar', enabled: aguardando, reason: `estado atual: ${row.estado}` },
    { label: 'Reprovar', enabled: aguardando, reason: `estado atual: ${row.estado}` },
    { label: 'Abrir uso vinculado', enabled: true, sub: true },
  ]
}

export default function Justificativas() {
  return (
    <IndexWorkspace
      dataset="justificativas"
      title="Justificativas"
      meta="ausência de declaração"
      recortes={justificativaRecortes}
      rows={justificativas}
      columns={columns}
      tabs={['Avaliação', 'Contexto', 'Evidência', 'Auditoria']}
      defaultTab="Avaliação"
      rowTitle={(row) => `${row.id} · ${row.estado}`}
      rowSubtitle={() => 'justificativa selecionada'}
      inspectorItems={(row) => [
        ['Justificativa', row.id],
        ['Uso', row.uso],
        ['Portaria', row.portaria],
        ['Medidor', row.medidor],
        ['Outorgado', row.outorgado],
        ['Período', row.periodo],
        ['Motivo', row.motivo],
        ['Estado', row.estado],
        ['Prazo', row.prazo],
      ]}
      scopeItems={(row) => [
        ['Outorgado', row.outorgado],
        ['Uso', row.uso],
        ['Portaria', row.portaria],
        ['Justificativa', row.id],
      ]}
      recordActions={justificativaActions}
      renderTab={renderTab}
    />
  )
}
