import {
  acessos,
  apontamentos,
  declaracoes,
  justificativas,
  linhaDoTempo,
  medidores,
  multas,
  outorgados,
  portarias,
  processos,
  relatorios,
  roteamentos,
  solicitacoes,
  telemetriaDias,
  transmissoes,
  usos,
} from './data.js'

const field = (label, type = 'text') => ({ label, type })

export const datasets = {
  outorgados: {
    label: 'Outorgados',
    rows: outorgados,
    fields: {
      id: field('ID'),
      nome: field('Outorgado'),
      documento: field('Documento'),
      status: field('Status'),
      acesso: field('Acesso'),
      municipio: field('Município'),
      usos: field('Usos', 'number'),
      portarias: field('Portarias', 'number'),
      medidores: field('Medidores', 'number'),
      subBacias: field('Sub-bacias', 'number'),
      vmTotal: field('VM total', 'number'),
      apontamentos: field('Apontamentos', 'number'),
      processos: field('Processos', 'number'),
    },
    relations: {
      usos: { label: 'Usos', to: 'usos', localField: 'id', foreignField: 'outorgadoId', many: true },
      portarias: { label: 'Portarias', to: 'portarias', localField: 'nome', foreignField: 'outorgado', many: true },
      apontamentos: { label: 'Apontamentos', to: 'apontamentos', localField: 'nome', foreignField: 'outorgado', many: true },
      processos: { label: 'Processos', to: 'processos', localField: 'nome', foreignField: 'outorgado', many: true },
      multas: { label: 'Multas', to: 'multas', localField: 'nome', foreignField: 'outorgado', many: true },
    },
  },
  usos: {
    label: 'Usos monitorados',
    rows: usos,
    fields: {
      id: field('Uso'),
      identificacao: field('Identificação SiDeCC'),
      tipoUso: field('Tipo de uso'),
      outorgadoId: field('Outorgado ID'),
      outorgado: field('Outorgado'),
      subBacia: field('Sub-bacia'),
      municipio: field('Município'),
      dominialidade: field('Dominialidade'),
      recurso: field('Recurso hídrico'),
      ponto: field('Ponto'),
      formaRegularizacao: field('Regularização'),
      statusUso: field('Status do uso'),
      portariaVigente: field('Portaria vigente'),
      atoVigente: field('Ato'),
      vmVigente: field('VM vigente'),
      canalAtual: field('Canal'),
      frequenciaAtual: field('Frequência'),
      medidoresAtivos: field('Medidores', 'number'),
      declaracoesPendentes: field('Pendências declaratórias', 'number'),
      outorgadoMes: field('Outorgado mês', 'number'),
      permitidoMes: field('Permitido mês', 'number'),
      estadoVazao: field('Estado vazão'),
      transmissao: field('Transmissão'),
      apontamentos: field('Apontamentos', 'number'),
      proximaAcao: field('Próxima ação'),
    },
    relations: {
      outorgado: { label: 'Outorgado', to: 'outorgados', localField: 'outorgadoId', foreignField: 'id' },
      portarias: { label: 'Portarias / atos', to: 'portarias', localField: 'id', foreignField: 'uso', many: true },
      medidores: { label: 'Medidores', to: 'medidores', localField: 'id', foreignField: 'uso', many: true },
      roteamentos: { label: 'Roteamentos', to: 'roteamentos', localField: 'id', foreignField: 'uso', many: true },
      declaracoes: { label: 'Declarações', to: 'declaracoes', localField: 'id', foreignField: 'uso', many: true },
      transmissoes: { label: 'Transmissões', to: 'transmissoes', localField: 'id', foreignField: 'uso', many: true },
      telemetriaDias: { label: 'Telemetria diária', to: 'telemetriaDias', localField: 'id', foreignField: 'uso', many: true },
      justificativas: { label: 'Justificativas', to: 'justificativas', localField: 'id', foreignField: 'uso', many: true },
      solicitacoes: { label: 'Solicitações', to: 'solicitacoes', localField: 'id', foreignField: 'uso', many: true },
      apontamentos: { label: 'Apontamentos', to: 'apontamentos', localField: 'id', foreignField: 'uso', many: true },
      processos: { label: 'Processos', to: 'processos', localField: 'id', foreignField: 'uso', many: true },
      linhaDoTempo: { label: 'Linha do tempo', to: 'linhaDoTempo', localField: 'id', foreignField: 'uso', many: true },
    },
  },
  portarias: {
    label: 'Portarias / atos',
    rows: portarias,
    fields: {
      id: field('Portaria'),
      uso: field('Uso'),
      identificacao: field('Identificação SiDeCC'),
      outorgado: field('Outorgado'),
      ato: field('Ato'),
      tipo: field('Tipo'),
      status: field('Status'),
      fim: field('Vigência fim', 'date'),
      vazaoMax: field('Vazão máx.'),
      vm: field('VM'),
      regime: field('Regime'),
      finalidade: field('Finalidade'),
      condicionantes: field('Condicionantes'),
      medidoresEsperados: field('Medidores esperados', 'number'),
      ciclo: field('Ciclo'),
    },
    relations: {
      uso: { label: 'Uso pai', to: 'usos', localField: 'uso', foreignField: 'id' },
      medidores: { label: 'Medidores', to: 'medidores', localField: 'id', foreignField: 'portaria', many: true },
      declaracoes: { label: 'Declarações', to: 'declaracoes', localField: 'id', foreignField: 'portaria', many: true },
      roteamentos: { label: 'Roteamentos', to: 'roteamentos', localField: 'id', foreignField: 'portaria', many: true },
    },
  },
  medidores: {
    label: 'Medidores',
    rows: medidores,
    fields: {
      id: field('Medidor'),
      uso: field('Uso'),
      portaria: field('Portaria'),
      outorgado: field('Outorgado'),
      identificacao: field('Identificação'),
      status: field('Status'),
      calibracao: field('Calibração'),
    },
  },
  apontamentos: {
    label: 'Apontamentos',
    rows: apontamentos,
    fields: {
      id: field('Apontamento'),
      uso: field('Uso'),
      portaria: field('Portaria'),
      outorgado: field('Outorgado'),
      natureza: field('Natureza'),
      tipo: field('Tipo'),
      descricao: field('Descrição'),
      grau: field('Grau'),
      fase: field('Fase'),
      ciencia: field('Ciência'),
      prazo: field('Prazo', 'deadline'),
      proximaAcao: field('Próxima ação'),
    },
    relations: {
      uso: { label: 'Uso', to: 'usos', localField: 'uso', foreignField: 'id' },
      telemetriaDias: { label: 'Telemetria diária', to: 'telemetriaDias', localField: 'uso', foreignField: 'uso', many: true },
      processos: { label: 'Processos', to: 'processos', localField: 'id', foreignField: 'origem', many: true },
    },
  },
  processos: {
    label: 'Processos',
    rows: processos,
    fields: {
      id: field('Processo'),
      origem: field('Apontamento'),
      uso: field('Uso'),
      portaria: field('Portaria'),
      outorgado: field('Outorgado'),
      fase: field('Fase'),
      grau: field('Grau'),
      penalidade: field('Penalidade'),
      guia: field('Guia'),
      prazo: field('Prazo', 'deadline'),
      proximaAcao: field('Próxima ação'),
    },
    relations: {
      uso: { label: 'Uso', to: 'usos', localField: 'uso', foreignField: 'id' },
      apontamento: { label: 'Apontamento', to: 'apontamentos', localField: 'origem', foreignField: 'id' },
      multa: { label: 'Multa', to: 'multas', localField: 'guia', foreignField: 'id' },
    },
  },
  multas: {
    label: 'Multas',
    rows: multas,
    fields: {
      id: field('Multa'),
      processo: field('Processo'),
      uso: field('Uso'),
      outorgado: field('Outorgado'),
      valor: field('Valor'),
      vencimento: field('Vencimento'),
      situacao: field('Situação'),
    },
  },
  roteamentos: { label: 'Roteamentos', rows: roteamentos, fields: { id: field('ID'), uso: field('Uso'), portaria: field('Portaria') } },
  declaracoes: { label: 'Declarações', rows: declaracoes, fields: { id: field('Protocolo'), uso: field('Uso'), portaria: field('Portaria') } },
  transmissoes: { label: 'Transmissões', rows: transmissoes, fields: { id: field('Registro'), uso: field('Uso'), portaria: field('Portaria') } },
  telemetriaDias: { label: 'Telemetria diária', rows: telemetriaDias, fields: { id: field('Registro'), uso: field('Uso'), portaria: field('Portaria') } },
  justificativas: {
    label: 'Justificativas',
    rows: justificativas,
    fields: {
      id: field('Justificativa'),
      uso: field('Uso'),
      portaria: field('Portaria'),
      medidor: field('Medidor'),
      outorgado: field('Outorgado'),
      periodo: field('Período'),
      motivo: field('Motivo'),
      estado: field('Estado'),
      recorrencia: field('Recorrência'),
      prazo: field('Prazo'),
    },
  },
  solicitacoes: { label: 'Solicitações', rows: solicitacoes, fields: { id: field('Solicitação'), uso: field('Uso'), estado: field('Estado') } },
  linhaDoTempo: { label: 'Linha do tempo', rows: linhaDoTempo, fields: { id: field('Evento'), uso: field('Uso'), portaria: field('Portaria') } },
  relatorios: {
    label: 'Relatórios',
    rows: relatorios,
    fields: {
      id: field('ID'),
      nome: field('Relatório'),
      familia: field('Família'),
      filtros: field('Filtros'),
      saida: field('Saída'),
      linhas: field('Linhas', 'number'),
      ultima: field('Última geração'),
      parametros: field('Parâmetros'),
    },
  },
  acessos: {
    label: 'Acessos',
    rows: acessos,
    fields: {
      id: field('Usuário'),
      nome: field('Nome'),
      perfil: field('Perfil'),
      estado: field('Estado'),
      autenticacao: field('Autenticação'),
      ultimo: field('Último acesso'),
      ato: field('Último ato'),
    },
  },
}

export function getDataset(name) {
  return datasets[name]
}

export function getRelation(datasetName, relationName) {
  return getDataset(datasetName)?.relations?.[relationName]
}

export function getDatasetFields(datasetName) {
  return Object.entries(getDataset(datasetName)?.fields || {}).map(([key, config]) => ({ key, ...config }))
}

export function getDatasetRelations(datasetName) {
  return Object.entries(getDataset(datasetName)?.relations || {}).map(([key, config]) => ({ key, ...config }))
}

export function getRelatedRows(row, datasetName, relationName) {
  const relation = getRelation(datasetName, relationName)
  const target = relation ? getDataset(relation.to) : null
  if (!relation || !target) return []

  const value = row?.[relation.localField]
  return target.rows.filter((candidate) => candidate[relation.foreignField] === value)
}

export function getFieldLabel(datasetName, fieldName, columns = []) {
  const fromColumns = columns.find((column) => column.key === fieldName)?.label
  if (fromColumns) return fromColumns

  return getDataset(datasetName)?.fields?.[fieldName]?.label || fieldName
}

export function getRelationLabel(datasetName, relationName) {
  return getRelation(datasetName, relationName)?.label || relationName
}

export function getRelationDataset(datasetName, relationName) {
  return getRelation(datasetName, relationName)?.to
}
