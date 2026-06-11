import { useMemo } from 'react'
import {
  apontamentos,
  declaracoes,
  justificativas,
  linhaDoTempo,
  medidores,
  portarias,
  processos,
  roteamentos,
  solicitacoes,
  telemetriaDias,
  transmissoes,
  usos,
} from '../data.js'
import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'
import { IndicatorLens, OperationalMapLens, TelemetryEvidence } from '../components/visuals.jsx'

const usoColumns = [
  { key: 'id', label: 'Uso' },
  { key: 'identificacao', label: 'Identificação SiDeCC' },
  { key: 'tipoUso', label: 'Tipo de uso' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'subBacia', label: 'Sub-bacia' },
  { key: 'municipio', label: 'Município' },
  { key: 'dominialidade', label: 'Dominialidade' },
  { key: 'recurso', label: 'Recurso hídrico' },
  { key: 'ponto', label: 'Ponto' },
  { key: 'formaRegularizacao', label: 'Regularização' },
  { key: 'portariaVigente', label: 'Portaria vigente' },
  { key: 'atoVigente', label: 'Ato' },
  { key: 'vmVigente', label: 'VM vigente' },
  { key: 'canalAtual', label: 'Canal' },
  { key: 'frequenciaAtual', label: 'Frequência' },
  { key: 'medidoresAtivos', label: 'Medidores', num: true },
  { key: 'declaracoesPendentes', label: 'Pend.', num: true },
  { key: 'outorgadoMes', label: 'Outorgado mês', num: true },
  { key: 'permitidoMes', label: 'Permitido mês', num: true },
  { key: 'estadoVazao', label: 'Estado vazão' },
  { key: 'transmissao', label: 'Transmissão' },
  { key: 'apontamentos', label: 'Apont.', num: true },
  { key: 'proximaAcao', label: 'Próxima ação' },
]

const childTabs = [
  'Identidade',
  'Portarias / atos',
  'Roteamento',
  'Medidores',
  'Declarações',
  'Telemetria',
  'Justificativas',
  'Solicitações',
  'Apontamentos',
  'Autos',
  'Linha do tempo',
  'Auditoria',
]

const usoRecortes = [
  {
    name: 'Uso em atenção',
    logic: 'any',
    filters: [
      { field: 'apontamentos', op: 'gt', value: 0 },
      { field: 'declaracoesPendentes', op: 'gt', value: 0 },
      { field: 'transmissao', op: 'eq', value: 'FORA DA TOLERÂNCIA' },
      { field: 'proximaAcao', op: 'neq', value: 'Acompanhar' },
    ],
    sort: [{ field: 'apontamentos', dir: 'desc' }, { field: 'declaracoesPendentes', dir: 'desc' }, { field: 'id' }],
    groupBy: 'subBacia',
    columns: ['id', 'identificacao', 'outorgado', 'subBacia', 'municipio', 'portariaVigente', 'canalAtual', 'frequenciaAtual', 'declaracoesPendentes', 'transmissao', 'apontamentos', 'proximaAcao'],
  },
  {
    name: 'Todos os usos',
    sort: [{ field: 'id' }],
    groupBy: 'subBacia',
    columns: usoColumns.map((column) => column.key),
  },
  {
    name: 'Sem declaração',
    filters: [{ field: 'declaracoesPendentes', op: 'gt', value: 0 }],
    sort: [{ field: 'declaracoesPendentes', dir: 'desc' }, { field: 'subBacia' }],
    groupBy: 'subBacia',
    columns: ['id', 'identificacao', 'outorgado', 'subBacia', 'municipio', 'portariaVigente', 'medidoresAtivos', 'declaracoesPendentes', 'canalAtual', 'proximaAcao'],
  },
  {
    name: 'COT-R pendente',
    filters: [
      { field: 'canalAtual', op: 'contains', value: 'telemetria' },
      { field: 'transmissao', op: 'neq', value: 'EM DIA' },
    ],
    sort: [{ field: 'transmissao' }, { field: 'subBacia' }],
    groupBy: 'transmissao',
    columns: ['id', 'identificacao', 'outorgado', 'subBacia', 'municipio', 'portariaVigente', 'canalAtual', 'transmissao', 'estadoVazao', 'proximaAcao'],
  },
  {
    name: 'Calibração vencida',
    filters: [{ relation: 'medidores', mode: 'some', where: { field: 'calibracao', op: 'eq', value: 'vencida' } }],
    sort: [{ field: 'municipio' }, { field: 'id' }],
    groupBy: 'municipio',
    columns: ['id', 'identificacao', 'outorgado', 'subBacia', 'municipio', 'portariaVigente', 'medidoresAtivos', 'transmissao', 'proximaAcao'],
  },
  {
    name: 'A vencer',
    logic: 'any',
    filters: [
      { field: 'proximaAcao', op: 'contains', value: 'renovação' },
      { relation: 'portarias', mode: 'some', where: { field: 'ciclo', op: 'eq', value: 'renovação a requerer' } },
    ],
    sort: [{ field: 'municipio' }, { field: 'id' }],
    groupBy: 'municipio',
    columns: ['id', 'identificacao', 'outorgado', 'municipio', 'subBacia', 'portariaVigente', 'atoVigente', 'vmVigente', 'proximaAcao'],
  },
]

function buildScope(selected) {
  return {
    portarias: portarias.filter((row) => row.uso === selected.id),
    medidores: medidores.filter((row) => row.uso === selected.id),
    roteamentos: roteamentos.filter((row) => row.uso === selected.id),
    declaracoes: declaracoes.filter((row) => row.uso === selected.id),
    transmissoes: transmissoes.filter((row) => row.uso === selected.id),
    telemetriaDias: telemetriaDias.filter((row) => row.uso === selected.id),
    justificativas: justificativas.filter((row) => row.uso === selected.id),
    solicitacoes: solicitacoes.filter((row) => row.uso === selected.id),
    apontamentos: apontamentos.filter((row) => row.uso === selected.id),
    processos: processos.filter((row) => row.uso === selected.id),
    linhaDoTempo: linhaDoTempo.filter((row) => row.uso === selected.id),
  }
}

function IdentityFields({ selected, portariaAtual }) {
  return (
    <FieldGrid items={[
      ['Uso monitorado', selected.id],
      ['Identificação SiDeCC', selected.identificacao],
      ['Tipo de uso', selected.tipoUso],
      ['Outorgado / usuário', selected.outorgado],
      ['Regularização', selected.formaRegularizacao],
      ['Status do uso', selected.statusUso],
      ['Ponto', selected.ponto],
      ['Endereço', selected.endereco],
      ['Município', selected.municipio],
      ['Sub-bacia', selected.subBacia],
      ['Dominialidade', selected.dominialidade],
      ['Recurso hídrico', selected.recurso],
      ['Coordenadas', selected.coordenadas],
      ['Portaria vigente', portariaAtual?.id || '-'],
      ['Ato', portariaAtual?.ato || '-'],
      ['Regime / VM', portariaAtual ? `${portariaAtual.regime} · ${portariaAtual.vm}` : '-'],
      ['Condicionantes', portariaAtual?.condicionantes || '-'],
    ]} />
  )
}

function currentPortaria(selected) {
  const scoped = buildScope(selected)
  return scoped.portarias.find((row) => row.id === selected.portariaVigente) || scoped.portarias[0]
}

function inspectorItems(selected) {
  const scoped = buildScope(selected)
  const portariaAtual = currentPortaria(selected)
  return [
    ['Outorgado', selected.outorgado],
    ['Uso monitorado', `${selected.id} · ${selected.identificacao}`],
    ['Tipo', selected.tipoUso],
    ['Ponto', selected.ponto],
    ['Sub-bacia', selected.subBacia],
    ['Portaria vigente', portariaAtual?.id || '-'],
    ['Ato', portariaAtual?.ato || '-'],
    ['Medidores', scoped.medidores.length],
    ['Declarações', scoped.declaracoes.length],
    ['Apontamentos', scoped.apontamentos.length],
    ['Próxima ação', selected.proximaAcao],
  ]
}

function scopeItems(selected) {
  const scoped = buildScope(selected)
  const portariaAtual = currentPortaria(selected)
  return [
    ['Outorgado', selected.outorgado],
    ['Uso monitorado', `${selected.id} · ${selected.identificacao}`],
    ['Portaria / Ato', portariaAtual ? `${portariaAtual.id} · ${portariaAtual.ato}` : 'sem ato vigente'],
    ['Medidores', `${scoped.medidores.length} vinculados`],
    ['Declarações', `${scoped.declaracoes.length} no recorte`],
  ]
}

function usoActions(row) {
  const isTelemetria = row.canalAtual.includes('telemetria')
  const transmissaoFalha = row.transmissao === 'FORA DA TOLERÂNCIA'
  const notificavel = row.proximaAcao.toLowerCase().includes('notificar')

  return [
    { label: 'Nova frequência', enabled: row.statusUso === 'Ativo', reason: 'uso não está ativo' },
    { label: 'Declaração de contingência', enabled: isTelemetria && transmissaoFalha, reason: isTelemetria ? 'transmissão regular no recorte' : 'uso sem telemetria COT-R' },
    { label: 'Notificar exceção', enabled: notificavel, reason: 'sem exceção em fase notificável', sub: true },
  ]
}

function ChildSheet({ selected, active }) {
  const scoped = useMemo(() => buildScope(selected), [selected])
  const portariaAtual = scoped.portarias.find((row) => row.id === selected.portariaVigente) || scoped.portarias[0]

  if (active === 'Identidade') {
    return <div className="record-fields"><IdentityFields selected={selected} portariaAtual={portariaAtual} /></div>
  }

  const baseParent = [
    { key: 'uso', label: 'Uso' },
    { key: 'portaria', label: 'Portaria' },
  ]

  const configs = {
    'Portarias / atos': {
      rows: scoped.portarias,
      columns: [
        { key: 'id', label: 'Portaria' },
        { key: 'uso', label: 'Uso' },
        { key: 'ato', label: 'Ato' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'status', label: 'Status' },
        { key: 'inicio', label: 'Início' },
        { key: 'fim', label: 'Fim' },
        { key: 'vazaoMax', label: 'Vazão máx.' },
        { key: 'volumeDia', label: 'Vol. dia' },
        { key: 'vm', label: 'VM' },
        { key: 'regime', label: 'Regime' },
        { key: 'finalidade', label: 'Finalidade' },
        { key: 'condicionantes', label: 'Condicionantes' },
      ],
    },
    Roteamento: {
      rows: scoped.roteamentos,
      columns: [...baseParent, { key: 'id', label: 'ID' }, { key: 'inicio', label: 'Início' }, { key: 'fim', label: 'Fim' }, { key: 'vm', label: 'VM' }, { key: 'classeAbc', label: 'Classe ABC' }, { key: 'canal', label: 'Canal' }, { key: 'frequencia', label: 'Frequência' }, { key: 'qtdeMedidores', label: 'Medidores' }, { key: 'calculoManual', label: 'Manual' }, { key: 'atoAdministrativo', label: 'Ato' }],
    },
    Medidores: {
      rows: scoped.medidores,
      columns: [...baseParent, { key: 'id', label: 'Medidor' }, { key: 'identificacao', label: 'Identificação' }, { key: 'tipo', label: 'Tipo' }, { key: 'serie', label: 'Série' }, { key: 'fabricante', label: 'Fabricante' }, { key: 'modelo', label: 'Modelo' }, { key: 'diametro', label: 'Diâmetro' }, { key: 'status', label: 'Status' }, { key: 'inclusao', label: 'Inclusão' }, { key: 'desativacao', label: 'Desativação' }, { key: 'calibracao', label: 'Calibração' }],
    },
    Declarações: {
      rows: scoped.declaracoes,
      columns: [...baseParent, { key: 'id', label: 'Protocolo' }, { key: 'medidor', label: 'Medidor' }, { key: 'tipo', label: 'Tipo' }, { key: 'dataLeitura', label: 'Data/hora leitura' }, { key: 'dataCadastro', label: 'Data/hora cadastro' }, { key: 'leitura', label: 'Leitura' }, { key: 'dias', label: 'Dias', num: true }, { key: 'volumeDia', label: 'Volume diário' }, { key: 'status', label: 'Status' }, { key: 'medidorZerado', label: 'Zerado' }],
    },
    Telemetria: {
      rows: [...scoped.transmissoes, ...scoped.telemetriaDias],
      columns: [...baseParent, { key: 'id', label: 'Registro' }, { key: 'cotr', label: 'COT-R' }, { key: 'data', label: 'Data' }, { key: 'captado', label: 'Captado' }, { key: 'outorgado', label: 'Outorgado' }, { key: 'permitido', label: 'Permitido' }, { key: 'horasCaptadas', label: 'Horas' }, { key: 'situacao', label: 'Transmissão' }, { key: 'estadoVazao', label: 'Estado vazão' }],
    },
    Justificativas: {
      rows: scoped.justificativas,
      columns: [...baseParent, { key: 'id', label: 'Justificativa' }, { key: 'medidor', label: 'Medidor' }, { key: 'periodo', label: 'Período' }, { key: 'motivo', label: 'Motivo' }, { key: 'estado', label: 'Estado' }, { key: 'recorrencia', label: 'Recorrência' }, { key: 'prazo', label: 'Prazo' }],
    },
    Solicitações: {
      rows: scoped.solicitacoes,
      columns: [...baseParent, { key: 'id', label: 'Solicitação' }, { key: 'medidor', label: 'Medidor' }, { key: 'tipo', label: 'Tipo' }, { key: 'estado', label: 'Estado' }, { key: 'entrada', label: 'Entrada' }, { key: 'destino', label: 'Destino' }],
    },
    Apontamentos: {
      rows: scoped.apontamentos,
      columns: [...baseParent, { key: 'id', label: 'Apontamento' }, { key: 'natureza', label: 'Natureza' }, { key: 'tipo', label: 'Tipo' }, { key: 'descricao', label: 'Descrição' }, { key: 'grau', label: 'Grau' }, { key: 'fase', label: 'Fase' }, { key: 'prazo', label: 'Prazo' }, { key: 'proximaAcao', label: 'Próxima ação' }],
    },
    Autos: {
      rows: scoped.processos,
      columns: [...baseParent, { key: 'id', label: 'Processo' }, { key: 'origem', label: 'Apontamento' }, { key: 'fase', label: 'Fase' }, { key: 'grau', label: 'Grau' }, { key: 'penalidade', label: 'Penalidade' }, { key: 'reincidencia', label: 'Reincidência' }, { key: 'prazo', label: 'Prazo' }, { key: 'proximaAcao', label: 'Próxima ação' }],
    },
    'Linha do tempo': {
      rows: scoped.linhaDoTempo,
      columns: [...baseParent, { key: 'id', label: 'ID' }, { key: 'data', label: 'Data' }, { key: 'eixo', label: 'Eixo' }, { key: 'evento', label: 'Evento' }, { key: 'origem', label: 'Origem' }],
    },
    Auditoria: {
      rows: [
        { id: 'AUD-1', uso: selected.id, portaria: portariaAtual?.id || '-', quando: '10/06 09:40', ator: 'Sistema', ato: 'reconciliou declaração com ato vigente' },
        { id: 'AUD-2', uso: selected.id, portaria: portariaAtual?.id || '-', quando: '10/06 09:14', ator: 'Gestor', ato: 'abriu fila de triagem' },
      ],
      columns: [...baseParent, { key: 'id', label: 'Evento' }, { key: 'quando', label: 'Quando' }, { key: 'ator', label: 'Ator' }, { key: 'ato', label: 'Ato' }],
    },
  }

  const cfg = configs[active]
  const table = <DataTable columns={cfg.columns} rows={cfg.rows} noSearch compact />

  if (active === 'Telemetria') {
    return (
      <div className="record-visual-tab">
        <TelemetryEvidence selected={selected} />
        {table}
      </div>
    )
  }

  return table
}

export default function Usos({ defaultIndexView = 'Tabela', defaultPanelMode = 'inspector' }) {
  return (
    <IndexWorkspace
      dataset="usos"
      title="Usos monitorados"
      meta="índice principal"
      recortes={usoRecortes}
      rows={usos}
      columns={usoColumns}
      tabs={childTabs}
      defaultTab="Identidade"
      rowTitle={(row) => `${row.id} · ${row.identificacao}`}
      rowSubtitle={() => 'uso selecionado'}
      inspectorItems={inspectorItems}
      scopeItems={scopeItems}
      recordActions={usoActions}
      indexViews={['Tabela', 'Mapa', 'Indicadores']}
      defaultIndexView={defaultIndexView}
      defaultPanelMode={defaultPanelMode}
      renderIndexView={({ view, rows, selected, onSelect, onOpen, tableView }) => {
        if (view === 'Mapa') return <OperationalMapLens rows={rows} selected={selected} onSelect={onSelect} onOpen={onOpen} />
        if (view === 'Indicadores') return <IndicatorLens rows={rows} />
        return tableView
      }}
      renderTab={(row, active) => <ChildSheet selected={row} active={active} />}
    />
  )
}
