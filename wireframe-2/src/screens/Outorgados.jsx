import { apontamentos, outorgados, portarias, processos, usos } from '../data.js'
import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Outorgado' },
  { key: 'documento', label: 'Documento' },
  { key: 'status', label: 'Status' },
  { key: 'acesso', label: 'Acesso' },
  { key: 'municipio', label: 'Município' },
  { key: 'usos', label: 'Usos', num: true },
  { key: 'portarias', label: 'Portarias', num: true },
  { key: 'medidores', label: 'Medidores', num: true },
  { key: 'subBacias', label: 'Sub-bacias', num: true },
  { key: 'vmTotal', label: 'VM total', num: true },
  { key: 'apontamentos', label: 'Apont.', num: true },
  { key: 'processos', label: 'Proc.', num: true },
]

const outorgadoRecortes = [
  {
    name: 'Todos',
    sort: [{ field: 'municipio' }, { field: 'nome' }],
    groupBy: 'municipio',
    columns: columns.map((column) => column.key),
  },
  {
    name: 'Com processo',
    filters: [{ relation: 'processos', mode: 'some' }],
    sort: [{ field: 'processos', dir: 'desc' }, { field: 'nome' }],
    groupBy: 'municipio',
    columns: ['id', 'nome', 'documento', 'status', 'municipio', 'usos', 'portarias', 'apontamentos', 'processos'],
  },
  {
    name: 'Com apontamento',
    filters: [{ relation: 'apontamentos', mode: 'some' }],
    sort: [{ field: 'apontamentos', dir: 'desc' }, { field: 'nome' }],
    groupBy: 'municipio',
    columns: ['id', 'nome', 'documento', 'status', 'municipio', 'usos', 'medidores', 'apontamentos', 'processos'],
  },
  {
    name: 'Multas',
    filters: [{ relation: 'multas', mode: 'some' }],
    sort: [{ field: 'municipio' }, { field: 'nome' }],
    groupBy: 'municipio',
    columns: ['id', 'nome', 'documento', 'municipio', 'usos', 'apontamentos', 'processos'],
  },
  {
    name: 'Sem acesso',
    filters: [{ field: 'acesso', op: 'eq', value: 'sem conta' }],
    sort: [{ field: 'municipio' }, { field: 'nome' }],
    groupBy: 'municipio',
    columns: ['id', 'nome', 'documento', 'status', 'acesso', 'municipio', 'usos', 'apontamentos'],
  },
]

const usoCols = [
  { key: 'id', label: 'Uso' },
  { key: 'identificacao', label: 'Identificação SiDeCC' },
  { key: 'tipoUso', label: 'Tipo' },
  { key: 'municipio', label: 'Município' },
  { key: 'subBacia', label: 'Sub-bacia' },
  { key: 'portariaVigente', label: 'Portaria vigente' },
  { key: 'vmVigente', label: 'VM' },
  { key: 'proximaAcao', label: 'Próxima ação' },
]

const portariaCols = [
  { key: 'id', label: 'Portaria' },
  { key: 'uso', label: 'Uso' },
  { key: 'ato', label: 'Ato' },
  { key: 'status', label: 'Status' },
  { key: 'fim', label: 'Fim' },
  { key: 'vm', label: 'VM' },
]

const apontamentoCols = [
  { key: 'id', label: 'Apontamento' },
  { key: 'uso', label: 'Uso' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'fase', label: 'Fase' },
  { key: 'prazo', label: 'Prazo' },
]

function related(row) {
  return {
    usos: usos.filter((uso) => uso.outorgadoId === row.id),
    portarias: portarias.filter((portaria) => portaria.outorgado === row.nome),
    apontamentos: apontamentos.filter((apontamento) => apontamento.outorgado === row.nome),
    processos: processos.filter((processo) => processo.outorgado === row.nome),
  }
}

function renderTab(row, active) {
  const scoped = related(row)

  if (active === 'Cadastro') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Identificador', row.id],
          ['Documento', row.documento],
          ['Status', row.status],
          ['Município', row.municipio],
          ['Usos vinculados', row.usos],
          ['Portarias vinculadas', row.portarias],
          ['Medidores vinculados', row.medidores],
          ['Sub-bacias com uso', row.subBacias],
          ['Eixo jurídico', 'titular das obrigações'],
          ['Eixo geográfico', 'derivado dos usos, não do cadastro'],
        ]} />
      </div>
    )
  }

  if (active === 'Usos') return <DataTable columns={usoCols} rows={scoped.usos} noSearch compact />
  if (active === 'Portarias') return <DataTable columns={portariaCols} rows={scoped.portarias} noSearch compact />
  if (active === 'Apontamentos') return <DataTable columns={apontamentoCols} rows={scoped.apontamentos} noSearch compact />
  return <DataTable columns={[
    { key: 'id', label: 'Processo' },
    { key: 'uso', label: 'Uso' },
    { key: 'portaria', label: 'Portaria' },
    { key: 'fase', label: 'Fase' },
    { key: 'prazo', label: 'Prazo' },
    { key: 'proximaAcao', label: 'Próxima ação' },
  ]} rows={scoped.processos} noSearch compact />
}

export default function Outorgados() {
  return (
    <IndexWorkspace
      dataset="outorgados"
      title="Outorgados"
      meta="titularidade e responsabilidade"
      recortes={outorgadoRecortes}
      rows={outorgados}
      columns={columns}
      tabs={['Cadastro', 'Usos', 'Portarias', 'Apontamentos', 'Processos']}
      defaultTab="Cadastro"
      rowTitle={(row) => row.nome}
      rowSubtitle={() => 'outorgado selecionado'}
      inspectorItems={(row) => [
        ['Outorgado', row.nome],
        ['Documento', row.documento],
        ['Status', row.status],
        ['Município', row.municipio],
        ['Usos', row.usos],
        ['Portarias', row.portarias],
        ['Medidores', row.medidores],
        ['Apontamentos', row.apontamentos],
        ['Processos', row.processos],
      ]}
      scopeItems={(row) => [
        ['Outorgado', row.nome],
        ['Usos', `${related(row).usos.length} vinculados`],
        ['Portarias', `${related(row).portarias.length} atos`],
        ['Apontamentos', `${related(row).apontamentos.length} em fila`],
      ]}
      renderTab={renderTab}
    />
  )
}
