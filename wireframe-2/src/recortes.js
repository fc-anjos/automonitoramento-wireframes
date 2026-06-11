import { getFieldLabel, getRelatedRows, getRelationDataset, getRelationLabel } from './dataModel.js'

export function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function recorteName(recorte) {
  return typeof recorte === 'string' ? recorte : recorte?.name
}

export function normalizeRecortes(recortes = ['Todos'], columns = [], dataset) {
  return recortes.map((recorte) => {
    if (typeof recorte === 'string') {
      return {
        id: slugify(recorte),
        name: recorte,
        dataset,
        columns: columns.map((column) => column.key),
        filters: [],
      }
    }

    const normalized = {
      id: recorte.id || slugify(recorte.name),
      dataset,
      filters: [],
      columns: columns.map((column) => column.key),
      ...recorte,
    }

    normalized.conditionGroups = conditionGroupsForRecorte(normalized)
    return normalized
  })
}

export function conditionGroupsForRecorte(recorte = {}) {
  if (Array.isArray(recorte.conditionGroups)) {
    return recorte.conditionGroups.map((group, idx) => ({
      id: group.id || `bloco-${idx + 1}`,
      name: group.name || `Bloco ${idx + 1}`,
      logic: group.logic === 'any' ? 'any' : 'all',
      filters: Array.isArray(group.filters) ? group.filters : [],
    }))
  }

  const filters = recorte.filters || []
  if (!filters.length) return []

  return [{
    id: 'bloco-1',
    name: 'Bloco 1',
    logic: recorte.logic === 'any' ? 'any' : 'all',
    filters,
  }]
}

function prazoRank(value) {
  const text = String(value || '').toLowerCase()
  if (!text || text === '-') return 9999
  if (text.includes('vencido')) return -1
  if (text.includes('hoje')) return 0
  const number = Number.parseInt(text, 10)
  return Number.isFinite(number) ? number : 5000
}

function dateRank(value) {
  const match = String(value || '').match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/)
  if (!match) return null
  const [, day, month, year, hour = '00', minute = '00'] = match
  return Number(`${year}${month}${day}${hour}${minute}`)
}

function normalizedValue(value, key) {
  if (key === 'prazo') return prazoRank(value)
  if (typeof value === 'number') return value
  const date = dateRank(value)
  if (date !== null) return date
  const numeric = Number(String(value ?? '').replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''))
  if (Number.isFinite(numeric) && String(value ?? '').match(/\d/)) return numeric
  return String(value ?? '').toLowerCase()
}

function text(value) {
  return String(value ?? '').toLowerCase()
}

function ruleField(rule) {
  return rule?.field || rule?.key
}

function compareValue(actual, operator = 'eq', expected) {
  const actualText = text(actual)
  const expectedText = text(expected)
  const actualNumber = normalizedValue(actual, '')
  const expectedNumber = normalizedValue(expected, '')

  if (operator === 'eq') return actual === expected
  if (operator === 'neq') return actual !== expected
  if (operator === 'contains') return actualText.includes(expectedText)
  if (operator === 'notContains') return !actualText.includes(expectedText)
  if (operator === 'startsWith') return actualText.startsWith(expectedText)
  if (operator === 'endsWith') return actualText.endsWith(expectedText)
  if (operator === 'in') return (expected || []).includes(actual)
  if (operator === 'notIn') return !(expected || []).includes(actual)
  if (operator === 'present') return actual !== undefined && actual !== null && actual !== '' && actual !== '-'
  if (operator === 'empty') return actual === undefined || actual === null || actual === '' || actual === '-'
  if (operator === 'gt') return actualNumber > expectedNumber
  if (operator === 'gte') return actualNumber >= expectedNumber
  if (operator === 'lt') return actualNumber < expectedNumber
  if (operator === 'lte') return actualNumber <= expectedNumber
  return true
}

function matchRelation(row, dataset, filter) {
  const relatedRows = getRelatedRows(row, dataset, filter.relation)
  const mode = filter.mode || filter.op || 'some'
  const targetDataset = getRelationDataset(dataset, filter.relation)
  const relationFilter = filter.where || filter.filter || (filter.field ? { field: filter.field, op: filter.fieldOp || 'eq', value: filter.value } : null)

  if (!relationFilter) {
    if (mode === 'none') return relatedRows.length === 0
    if (mode === 'every') return relatedRows.length > 0
    return relatedRows.length > 0
  }

  const matches = (candidate) => matchFilter(candidate, targetDataset, relationFilter)
  if (mode === 'none') return !relatedRows.some(matches)
  if (mode === 'every') return relatedRows.length > 0 && relatedRows.every(matches)
  return relatedRows.some(matches)
}

function matchFilter(row, dataset, filter) {
  if (!filter) return true
  if (typeof filter === 'function') return filter(row)
  if (filter.any) return filter.any.some((item) => matchFilter(row, dataset, item))
  if (filter.all) return filter.all.every((item) => matchFilter(row, dataset, item))
  if (filter.not) return !matchFilter(row, dataset, filter.not)
  if (filter.relation) return matchRelation(row, dataset, filter)

  const field = ruleField(filter)
  return compareValue(row?.[field], filter.op || 'eq', filter.value)
}

function matchConditionGroup(row, dataset, group) {
  const filters = group.filters || []
  if (!filters.length) return true
  if (group.logic === 'any') return filters.some((filter) => matchFilter(row, dataset, filter))
  return filters.every((filter) => matchFilter(row, dataset, filter))
}

function matchesRecorte(row, recorte) {
  if (recorte.filter && !recorte.filter(row)) return false
  const groups = conditionGroupsForRecorte(recorte).filter((group) => group.filters.length)
  if (!groups.length) return true
  if (recorte.conditionLogic === 'any') return groups.some((group) => matchConditionGroup(row, recorte.dataset, group))
  return groups.every((group) => matchConditionGroup(row, recorte.dataset, group))
}

function compareBySort(rowA, rowB, sort) {
  const rules = (sort || []).map((rule) => (typeof rule === 'string' ? { field: rule, dir: 'asc' } : rule))

  for (const rule of rules) {
    const field = ruleField(rule)
    const dir = rule.dir === 'desc' ? -1 : 1
    const a = normalizedValue(rowA[field], field)
    const b = normalizedValue(rowB[field], field)
    if (a < b) return -1 * dir
    if (a > b) return 1 * dir
  }

  return 0
}

export function applyRecorte(rows = [], columns = [], recorte) {
  const filteredRows = rows.filter((row) => matchesRecorte(row, recorte))
  const sortedRows = recorte.sort?.length ? [...filteredRows].sort((a, b) => compareBySort(a, b, recorte.sort)) : filteredRows
  const visibleColumns = (recorte.columns || columns.map((column) => column.key))
    .map((key) => columns.find((column) => column.key === key))
    .filter(Boolean)

  return {
    rows: sortedRows,
    columns: visibleColumns.length ? visibleColumns : columns,
    groupBy: recorte.groupBy,
  }
}

function describeValue(value) {
  return Array.isArray(value) ? value.join(', ') : String(value)
}

function describeFilter(filter, dataset, columns = []) {
  if (!filter) return 'nenhum'
  if (filter.any) return filter.any.map((item) => describeFilter(item, dataset, columns)).join(' ou ')
  if (filter.all) return filter.all.map((item) => describeFilter(item, dataset, columns)).join(' e ')
  if (filter.not) return `não (${describeFilter(filter.not, dataset, columns)})`
  if (filter.relation) {
    const relationDataset = getRelationDataset(dataset, filter.relation)
    const relation = getRelationLabel(dataset, filter.relation)
    const relationFilter = filter.where || filter.filter || (filter.field ? { field: filter.field, op: filter.fieldOp || 'eq', value: filter.value } : null)
    if (!relationFilter) return filter.mode === 'none' || filter.op === 'none' ? `sem ${relation}` : `com ${relation}`
    return `${relation} com ${describeFilter(relationFilter, relationDataset, columns)}`
  }

  const label = getFieldLabel(dataset, ruleField(filter), columns)
  const operator = {
    eq: '=',
    neq: '≠',
    contains: 'contém',
    notContains: 'não contém',
    startsWith: 'começa com',
    endsWith: 'termina com',
    in: 'em',
    notIn: 'fora de',
    present: 'preenchido',
    empty: 'vazio',
    gt: '>',
    gte: '≥',
    lt: '<',
    lte: '≤',
  }[filter.op || 'eq']

  return filter.op === 'present' || filter.op === 'empty' ? `${label} ${operator}` : `${label} ${operator} ${describeValue(filter.value)}`
}

function describeConditionGroup(group, dataset, columns = [], idx) {
  const filters = group.filters || []
  const connector = group.logic === 'any' ? ' ou ' : ' e '
  const body = filters.length
    ? filters.map((filter) => describeFilter(filter, dataset, columns)).join(connector)
    : 'sem condições'

  return `${group.name || `Bloco ${idx + 1}`}: ${body}`
}

export function formatRecorteRecipe(recorte, allColumns = [], dataset) {
  if (!recorte) return ''
  if (recorte.system) return 'Filtro: nenhum · Ordem: padrão · Grupo: sem agrupamento · Campos: todos'

  const sourceDataset = recorte.dataset || dataset
  const conditionGroups = conditionGroupsForRecorte(recorte).filter((group) => group.filters.length)
  const filters = recorte.filterLabel || (conditionGroups.length
    ? conditionGroups.map((group, idx) => describeConditionGroup(group, sourceDataset, allColumns, idx)).join(recorte.conditionLogic === 'any' ? ' ou ' : ' e ')
    : 'nenhum')
  const sort = recorte.sort?.length
    ? recorte.sort.map((rule) => {
      const item = typeof rule === 'string' ? { field: rule, dir: 'asc' } : rule
      const field = ruleField(item)
      return `${getFieldLabel(sourceDataset, field, allColumns)} ${item.dir === 'desc' ? 'desc' : 'asc'}`
    }).join(', ')
    : 'padrão'
  const rowGroups = Array.isArray(recorte.groupBy) ? recorte.groupBy : (recorte.groupBy ? [recorte.groupBy] : [])
  const group = rowGroups.length ? rowGroups.map((field) => getFieldLabel(sourceDataset, field, allColumns)).join(' > ') : 'sem agrupamento'
  const fields = recorte.columns?.length
    ? recorte.columns.map((key) => getFieldLabel(sourceDataset, key, allColumns)).slice(0, 4).join(', ') + (recorte.columns.length > 4 ? ` +${recorte.columns.length - 4}` : '')
    : 'padrão'

  return `Filtro: ${filters} · Ordem: ${sort} · Grupo: ${group} · Campos: ${fields}`
}
