import { apontamentos, subBacias, telemetriaDias, transmissoes } from './data.js'

const STATUS_ORDER = ['crítico', 'atenção', 'conforme']

export function numberValue(value) {
  if (typeof value === 'number') return value
  const normalized = String(value ?? '')
    .replace(/\./g, '')
    .replace(',', '.')
    .replace(/[^\d.-]/g, '')
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

export function percentValue(value) {
  return numberValue(value)
}

export function parseCoordinates(value) {
  const [lat, lon] = String(value || '')
    .split(',')
    .map((item) => Number.parseFloat(item.trim()))
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
  return [lat, lon]
}

export function severityForUso(row) {
  const transmissao = String(row.transmissao || '').toLowerCase()
  const proximaAcao = String(row.proximaAcao || '').toLowerCase()
  if (row.apontamentos > 1 || proximaAcao.includes('lavrar') || proximaAcao.includes('notificar')) return 'crítico'
  if (row.apontamentos > 0 || transmissao.includes('fora') || transmissao.includes('tolerância') || row.declaracoesPendentes > 0) return 'atenção'
  return 'conforme'
}

export function buildMapPoints(rows = []) {
  return rows
    .map((row) => ({
      ...row,
      position: parseCoordinates(row.coordenadas),
      severity: severityForUso(row),
      volumeOutorgado: numberValue(row.outorgadoMes),
      volumePermitido: numberValue(row.permitidoMes),
      volumeMedido: numberValue(row.medidoMes || row.declaradoMes),
    }))
    .filter((row) => row.position)
}

export function summarizeRows(rows = []) {
  const total = rows.length
  const outorgado = rows.reduce((sum, row) => sum + numberValue(row.outorgadoMes), 0)
  const permitido = rows.reduce((sum, row) => sum + numberValue(row.permitidoMes), 0)
  const medido = rows.reduce((sum, row) => sum + numberValue(row.medidoMes || row.declaradoMes), 0)
  const pendencias = rows.reduce((sum, row) => sum + numberValue(row.declaracoesPendentes), 0)
  const telemetria = rows.filter((row) => String(row.canalAtual || '').toLowerCase().includes('telemetria')).length

  return {
    total,
    telemetria,
    pendencias,
    outorgado,
    permitido,
    medido,
    comprometimento: permitido ? Math.round((medido / permitido) * 100) : 0,
  }
}

export function summarizeBySubBacia(rows = []) {
  const buckets = new Map(subBacias.map((item) => [item.nome, {
    subBacia: item.nome,
    usos: 0,
    excecoes: 0,
    pendencias: 0,
    outorgado: 0,
    permitido: 0,
    medido: 0,
    transmissao: percentValue(item.transmissao),
  }]))

  for (const row of rows) {
    if (!buckets.has(row.subBacia)) {
      buckets.set(row.subBacia, {
        subBacia: row.subBacia || 'Sem sub-bacia',
        usos: 0,
        excecoes: 0,
        pendencias: 0,
        outorgado: 0,
        permitido: 0,
        medido: 0,
        transmissao: 0,
      })
    }

    const bucket = buckets.get(row.subBacia)
    bucket.usos += 1
    bucket.excecoes += Number(row.apontamentos > 0)
    bucket.pendencias += numberValue(row.declaracoesPendentes)
    bucket.outorgado += numberValue(row.outorgadoMes)
    bucket.permitido += numberValue(row.permitidoMes)
    bucket.medido += numberValue(row.medidoMes || row.declaradoMes)
  }

  return [...buckets.values()]
    .filter((item) => item.usos > 0)
    .map((item) => ({
      ...item,
      comprometimento: item.permitido ? Math.round((item.medido / item.permitido) * 100) : 0,
    }))
}

export function summarizeByStatus(rows = []) {
  const counts = new Map(STATUS_ORDER.map((status) => [status, 0]))
  for (const row of rows) counts.set(severityForUso(row), (counts.get(severityForUso(row)) || 0) + 1)
  return [...counts.entries()].map(([status, usos]) => ({ status, usos }))
}

export function summarizeByTransmission(rows = []) {
  const counts = new Map()
  for (const row of rows) {
    const key = row.transmissao || 'sem informação'
    counts.set(key, (counts.get(key) || 0) + 1)
  }
  return [...counts.entries()].map(([transmissao, usos]) => ({ transmissao, usos }))
}

export function scopedTelemetryRows(usoId) {
  return telemetriaDias.filter((row) => row.uso === usoId)
}

export function scopedTransmission(usoId) {
  return transmissoes.find((row) => row.uso === usoId)
}

export function telemetrySeriesForUso(usoId) {
  return scopedTelemetryRows(usoId).map((row) => ({
    data: row.data.slice(0, 5),
    captado: numberValue(row.captado),
    outorgado: numberValue(row.outorgado),
    permitido: numberValue(row.permitido),
  }))
}

export function worstOpenFinding(usoId) {
  const rows = apontamentos.filter((row) => row.uso === usoId)
  if (!rows.length) return null
  return rows.find((row) => row.grau === 'gravíssima') || rows.find((row) => row.grau === 'grave') || rows[0]
}
