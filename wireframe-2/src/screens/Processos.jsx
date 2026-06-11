import { apontamentos, multas, processos, usos } from '../data.js'
import { FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

const columns = [
  { key: 'id', label: 'Processo' },
  { key: 'origem', label: 'Apontamento' },
  { key: 'uso', label: 'Uso' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'fase', label: 'Fase' },
  { key: 'grau', label: 'Grau' },
  { key: 'penalidade', label: 'Penalidade' },
  { key: 'guia', label: 'Guia' },
  { key: 'prazo', label: 'Prazo' },
  { key: 'proximaAcao', label: 'Próxima ação' },
]

const fases = ['Detectada', 'Notificada', 'Autuada', 'Ciência', 'Em defesa ou recurso', 'Em julgamento', 'Decidida', 'Aguardando regularização', 'Encerrada']

const processoRecortes = [
  {
    name: 'Todos',
    sort: [{ field: 'prazo' }, { field: 'fase' }],
    groupBy: 'fase',
    columns: columns.map((column) => column.key),
  },
  {
    name: 'Ciência pendente',
    logic: 'any',
    filters: [
      { field: 'fase', op: 'eq', value: 'Ciência' },
      { field: 'proximaAcao', op: 'contains', value: 'ciência' },
    ],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'outorgado',
    columns: ['id', 'origem', 'uso', 'portaria', 'outorgado', 'fase', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Defesas a julgar',
    logic: 'any',
    filters: [
      { field: 'fase', op: 'eq', value: 'Em julgamento' },
      { field: 'proximaAcao', op: 'contains', value: 'julgar defesa' },
    ],
    sort: [{ field: 'prazo' }, { field: 'grau', dir: 'desc' }],
    groupBy: 'grau',
    columns: ['id', 'origem', 'uso', 'portaria', 'outorgado', 'fase', 'grau', 'penalidade', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Recursos',
    logic: 'any',
    filters: [
      { field: 'fase', op: 'contains', value: 'recurso' },
      { field: 'proximaAcao', op: 'contains', value: 'recurso' },
    ],
    sort: [{ field: 'prazo' }, { field: 'fase' }],
    groupBy: 'fase',
    columns: ['id', 'origem', 'uso', 'portaria', 'outorgado', 'fase', 'grau', 'penalidade', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Regularização',
    filters: [{ field: 'fase', op: 'eq', value: 'Aguardando regularização' }],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'fase', 'penalidade', 'guia', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Com guia',
    filters: [{ field: 'guia', op: 'neq', value: 'pendente' }],
    sort: [{ field: 'outorgado' }, { field: 'id' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'portaria', 'outorgado', 'fase', 'penalidade', 'guia', 'prazo', 'proximaAcao'],
  },
]

function related(row) {
  return {
    uso: usos.find((uso) => uso.id === row.uso),
    apontamento: apontamentos.find((apontamento) => apontamento.id === row.origem),
    guia: multas.find((multa) => multa.id === row.guia),
  }
}

function renderTab(row, active) {
  const scoped = related(row)

  if (active === 'Rito') {
    return (
      <div className="record-fields">
        <div className="timeline">
          {fases.map((fase) => <span key={fase} className={row.fase.includes(fase.split(' ')[0]) ? 'on' : ''}>{fase}</span>)}
        </div>
        <FieldGrid items={[
          ['Processo', row.id],
          ['Apontamento origem', row.origem],
          ['Fase', row.fase],
          ['Prazo', row.prazo],
          ['Próxima ação', row.proximaAcao],
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
          ['Apontamento', scoped.apontamento?.descricao || row.origem],
        ]} />
      </div>
    )
  }

  if (active === 'Penalidade') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Grau', row.grau],
          ['Penalidade', row.penalidade],
          ['Reincidência 3 anos', row.reincidencia],
          ['Guia vinculada', row.guia],
          ['Valor', scoped.guia?.valor || '-'],
          ['Situação bancária', scoped.guia?.situacao || 'aguarda decisão definitiva'],
          ['Conciliação', scoped.guia?.conciliacao || '-'],
        ]} />
      </div>
    )
  }

  return (
    <div className="record-fields">
      <FieldGrid items={[
        ['Regularização', row.proximaAcao],
        ['Guia', scoped.guia?.id || 'pendente'],
        ['Vencimento', scoped.guia?.vencimento || '-'],
        ['Situação', scoped.guia?.situacao || '-'],
      ]} />
    </div>
  )
}

function processoActions(row) {
  const emJulgamento = row.fase === 'Em julgamento'
  const decidida = row.fase === 'Decidida'
  const temGuia = row.guia !== 'pendente'

  return [
    { label: 'Julgar defesa', enabled: emJulgamento, reason: row.fase === 'Em defesa ou recurso' ? 'prazo de defesa ainda aberto' : `fase atual: ${row.fase}` },
    { label: 'Gerar guia', enabled: decidida && !temGuia, reason: temGuia ? 'guia já emitida' : 'aguarda decisão definitiva' },
    { label: 'Emitir 2ª via', enabled: temGuia, reason: 'guia ainda não emitida' },
    { label: 'Encerrar processo', enabled: row.fase === 'Aguardando regularização' && row.prazo !== 'vencido', reason: row.fase === 'Aguardando regularização' ? 'regularização pendente ou prazo vencido' : 'regularização ainda não iniciada', sub: true },
  ]
}

export default function Processos() {
  return (
    <IndexWorkspace
      dataset="processos"
      title="Autos / Processos"
      meta="rito e prazos"
      recortes={processoRecortes}
      rows={processos}
      columns={columns}
      tabs={['Rito', 'Contexto', 'Penalidade', 'Regularização']}
      defaultTab="Rito"
      rowTitle={(row) => `${row.id} · ${row.fase}`}
      rowSubtitle={() => 'processo selecionado'}
      inspectorItems={(row) => {
        const scoped = related(row)
        return [
          ['Processo', row.id],
          ['Apontamento', row.origem],
          ['Uso', row.uso],
          ['Portaria', row.portaria],
          ['Outorgado', row.outorgado],
          ['Fase', row.fase],
          ['Grau', row.grau],
          ['Penalidade', row.penalidade],
          ['Guia', scoped.guia?.id || 'pendente'],
          ['Próxima ação', row.proximaAcao],
        ]
      }}
      scopeItems={(row) => [
        ['Outorgado', row.outorgado],
        ['Uso', row.uso],
        ['Portaria', row.portaria],
        ['Processo', row.id],
        ['Guia', related(row).guia?.id || 'pendente'],
      ]}
      recordActions={processoActions}
      renderTab={renderTab}
    />
  )
}
