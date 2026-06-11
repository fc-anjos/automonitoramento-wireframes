import { declaracoes, medidores, portarias, roteamentos, usos } from '../data.js'
import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

const columns = [
  { key: 'id', label: 'Portaria' },
  { key: 'uso', label: 'Uso' },
  { key: 'identificacao', label: 'Identificação SiDeCC' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'ato', label: 'Ato' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'status', label: 'Status' },
  { key: 'fim', label: 'Vigência fim' },
  { key: 'vazaoMax', label: 'Vazão máx.' },
  { key: 'vm', label: 'VM' },
  { key: 'regime', label: 'Regime' },
  { key: 'finalidade', label: 'Finalidade' },
  { key: 'medidoresEsperados', label: 'Med.', num: true },
  { key: 'ciclo', label: 'Ciclo' },
]

const medidorCols = [
  { key: 'id', label: 'Medidor' },
  { key: 'identificacao', label: 'Identificação' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'serie', label: 'Série' },
  { key: 'status', label: 'Status' },
  { key: 'inclusao', label: 'Inclusão' },
  { key: 'desativacao', label: 'Desativação' },
]

const declaracaoCols = [
  { key: 'id', label: 'Protocolo' },
  { key: 'medidor', label: 'Medidor' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'dataLeitura', label: 'Data/hora leitura' },
  { key: 'volumeDia', label: 'Volume diário' },
  { key: 'status', label: 'Status' },
]

const portariaRecortes = [
  {
    name: 'Vigentes',
    filters: [{ field: 'status', op: 'eq', value: 'Vigente' }],
    sort: [{ field: 'fim' }, { field: 'uso' }],
    groupBy: 'uso',
    columns: ['id', 'uso', 'identificacao', 'outorgado', 'ato', 'tipo', 'status', 'fim', 'vm', 'regime', 'finalidade', 'medidoresEsperados', 'ciclo'],
  },
  {
    name: 'A vencer',
    filters: [{ field: 'ciclo', op: 'eq', value: 'renovação a requerer' }],
    sort: [{ field: 'fim' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'identificacao', 'outorgado', 'ato', 'tipo', 'status', 'fim', 'vm', 'ciclo'],
  },
  {
    name: 'Vencidas',
    filters: [{ field: 'status', op: 'eq', value: 'Vencida' }],
    sort: [{ field: 'fim' }, { field: 'uso' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'identificacao', 'outorgado', 'ato', 'tipo', 'status', 'fim', 'vm', 'ciclo'],
  },
  {
    name: 'Sem medidor',
    filters: [{ relation: 'medidores', mode: 'none' }],
    sort: [{ field: 'outorgado' }, { field: 'uso' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'identificacao', 'outorgado', 'ato', 'status', 'fim', 'medidoresEsperados', 'condicionantes'],
  },
  {
    name: 'Com restrição',
    filters: [{ field: 'condicionantes', op: 'contains', value: 'restrição' }],
    sort: [{ field: 'outorgado' }, { field: 'uso' }],
    groupBy: 'finalidade',
    columns: ['id', 'uso', 'identificacao', 'outorgado', 'ato', 'status', 'fim', 'vm', 'finalidade', 'condicionantes'],
  },
]

function related(row) {
  return {
    uso: usos.find((uso) => uso.id === row.uso),
    medidores: medidores.filter((medidor) => medidor.portaria === row.id),
    declaracoes: declaracoes.filter((declaracao) => declaracao.portaria === row.id),
    roteamento: roteamentos.find((roteamento) => roteamento.portaria === row.id),
  }
}

function renderTab(row, active) {
  const scoped = related(row)

  if (active === 'Ato') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Portaria / ato', row.ato],
          ['Tipo', row.tipo],
          ['Origem', row.origem],
          ['Status', row.status],
          ['Vigência', `${row.inicio} a ${row.fim}`],
          ['Uso pai', row.uso],
          ['Identificação SiDeCC', row.identificacao],
          ['Outorgado', row.outorgado],
        ]} />
      </div>
    )
  }

  if (active === 'Uso pai') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Uso', scoped.uso?.id || row.uso],
          ['Tipo de uso', scoped.uso?.tipoUso || '-'],
          ['Recurso hídrico', scoped.uso?.recurso || '-'],
          ['Sub-bacia', scoped.uso?.subBacia || '-'],
          ['Município', scoped.uso?.municipio || '-'],
          ['Ponto', scoped.uso?.ponto || '-'],
          ['Coordenadas', scoped.uso?.coordenadas || '-'],
        ]} />
      </div>
    )
  }

  if (active === 'Parâmetros') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['VM', row.vm],
          ['Volume diário', row.volumeDia],
          ['Volume anual', row.volumeAno],
          ['Vazão máxima', row.vazaoMax],
          ['Regime', row.regime],
          ['Finalidade', row.finalidade],
          ['Condicionantes', row.condicionantes],
          ['Medidores esperados', row.medidoresEsperados],
        ]} />
      </div>
    )
  }

  if (active === 'Roteamento') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Classe ABC', scoped.roteamento?.classeAbc || '-'],
          ['Canal', scoped.roteamento?.canal || '-'],
          ['Frequência', scoped.roteamento?.frequencia || '-'],
          ['Cálculo manual', scoped.roteamento?.calculoManual || '-'],
          ['Vigência', scoped.roteamento ? `${scoped.roteamento.inicio} a ${scoped.roteamento.fim}` : '-'],
        ]} />
      </div>
    )
  }

  if (active === 'Medidores') return <DataTable columns={medidorCols} rows={scoped.medidores} noSearch compact />
  return <DataTable columns={declaracaoCols} rows={scoped.declaracoes} noSearch compact />
}

function portariaActions(row) {
  const vigente = row.status === 'Vigente'
  const renovacao = row.ciclo === 'renovação a requerer'

  return [
    { label: 'Nova frequência', enabled: vigente, reason: 'ato vencido ou substituído' },
    { label: 'Solicitar renovação', enabled: renovacao, reason: 'fora da janela operacional de renovação' },
    { label: 'Recalcular roteamento', enabled: vigente && row.medidoresEsperados > 0, reason: 'sem medidor vinculado ao ato' },
  ]
}

export default function Portarias() {
  return (
    <IndexWorkspace
      dataset="portarias"
      title="Portarias / Atos"
      meta="filhos de uso"
      recortes={portariaRecortes}
      rows={portarias}
      columns={columns}
      tabs={['Ato', 'Uso pai', 'Parâmetros', 'Roteamento', 'Medidores', 'Declarações']}
      defaultTab="Ato"
      rowTitle={(row) => `${row.id} · ${row.ato}`}
      rowSubtitle={() => 'portaria selecionada'}
      inspectorItems={(row) => {
        const scoped = related(row)
        return [
          ['Portaria', row.id],
          ['Ato', row.ato],
          ['Uso pai', row.uso],
          ['Outorgado', row.outorgado],
          ['Status', row.status],
          ['Fim da vigência', row.fim],
          ['VM', row.vm],
          ['Roteamento', scoped.roteamento ? `${scoped.roteamento.canal} · ${scoped.roteamento.frequencia}` : '-'],
          ['Medidores', scoped.medidores.length],
          ['Declarações', scoped.declaracoes.length],
        ]
      }}
      scopeItems={(row) => {
        const scoped = related(row)
        return [
          ['Outorgado', row.outorgado],
          ['Uso', `${row.uso} · ${row.identificacao}`],
          ['Portaria / Ato', `${row.id} · ${row.ato}`],
          ['Medidores', `${scoped.medidores.length} vinculados`],
          ['Declarações', `${scoped.declaracoes.length} no recorte`],
        ]
      }}
      recordActions={portariaActions}
      renderTab={renderTab}
    />
  )
}
