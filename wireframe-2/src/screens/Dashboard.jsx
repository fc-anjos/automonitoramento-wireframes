import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { Link, useNavigate } from 'react-router-dom'
import { CircleMarker, GeoJSON, MapContainer, Tooltip as LeafletTooltip, useMap } from 'react-leaflet'
import {
  apontamentos,
  declaracoes,
  justificativas,
  medidores,
  outorgados,
  portarias,
  processos,
  solicitacoes,
  subBacias,
  telemetriaDias,
  transmissoes,
  usos,
} from '../data.js'
import { Button, Panel, Pill, Sp, Stat } from '../components/ui.jsx'
import { useWorkbookContext } from '../components/workbookContext.jsx'
import { geoData, geoProvenance } from '../geoData.js'
import { oceanMass, oceanStyle } from '../mapLayers.js'
import { buildMapPoints, numberValue, summarizeBySubBacia, summarizeRows } from '../monitoringSeeds.js'

const fmt = new Intl.NumberFormat('pt-BR')
const ACTION_PREVIEW_LIMIT = 6
const TABLE_PREVIEW_LIMIT = 6
const VOLUME_PREVIEW_LIMIT = 5
const statusOrder = { crítico: 0, atenção: 1, conforme: 2 }
const ink = '#2b2b2b'

function pct(part, total) {
  if (!total) return '0%'
  return `${Math.round((part / total) * 100)}%`
}

function statusTone(status) {
  if (status === 'crítico' || status === 'vencido') return 'bad'
  if (status === 'atenção') return 'warn'
  return 'ok'
}

function statusClass(status) {
  if (status === 'crítico' || status === 'vencido') return 'critico'
  if (status === 'atenção') return 'atencao'
  return 'conforme'
}

function prazoRank(prazo = '') {
  const text = String(prazo).toLowerCase()
  if (text.includes('vencido') || text.includes('hoje')) return 0
  const days = Number.parseInt(text, 10)
  return Number.isFinite(days) ? days : 99
}

function actionTone(item) {
  if (item.prioridade === 'crítica') return 'bad'
  if (item.prioridade === 'atenção') return 'warn'
  return 'label'
}

function workbookLink(path, params = {}) {
  const query = new URLSearchParams(params).toString()
  return query ? `${path}?${query}` : path
}

function processoDestino(row) {
  return workbookLink('/processos', {
    recorte: 'sem-recorte',
    field: 'id',
    value: row.id,
  })
}

function apontamentoDestino(row) {
  return workbookLink('/apontamentos', {
    recorte: 'sem-recorte',
    field: 'id',
    value: row.id,
  })
}

function usoDestino(row) {
  return workbookLink('/usos', {
    recorte: 'sem-recorte',
    field: 'id',
    value: row.id,
  })
}

function subBaciaDestino(row) {
  return workbookLink('/usos', {
    recorte: 'sem-recorte',
    field: 'subBacia',
    value: row.subBacia,
  })
}

function justificativaDestino(row) {
  return workbookLink('/justificativas', {
    recorte: 'sem-recorte',
    field: 'id',
    value: row.id,
  })
}

function currentPortariaForUso(row) {
  return portarias.find((portaria) => portaria.id === row.portariaVigente) || portarias.find((portaria) => portaria.uso === row.id && portaria.status === 'Vigente')
}

function isCotrUse(row) {
  return String(row.canalAtual || '').toLowerCase().includes('telemetria')
}

function medidoresAtivosForPortaria(portariaId) {
  return medidores.filter((row) => row.portaria === portariaId && row.status === 'Ativo')
}

function conditionTone(row) {
  if (row.status === 'crítico') return 'bad'
  if (row.status === 'atenção') return 'warn'
  return 'ok'
}

function buildNextActions() {
  const processRows = processos.map((row) => ({
    id: `proc-${row.id}`,
    prioridade: row.prazo === 'vencido' || row.grau === 'gravíssima' ? 'crítica' : 'atenção',
    origem: 'Processo',
    objeto: row.id,
    contexto: `${row.uso} · ${row.fase}`,
    prazo: row.prazo,
    destino: processoDestino(row),
    acao: row.proximaAcao,
  }))

  const justificationRows = justificativas
    .filter((row) => row.estado === 'Aguardando avaliação')
    .map((row) => ({
      id: `jus-${row.id}`,
      prioridade: row.prazo === 'hoje' ? 'crítica' : 'atenção',
      origem: 'Justificativa',
      objeto: row.id,
      contexto: `${row.uso} · ${row.motivo}`,
      prazo: row.prazo,
      destino: justificativaDestino(row),
      acao: 'Avaliar justificativa',
    }))

  const findingRows = apontamentos
    .filter((row) => row.fase !== 'Encerrada')
    .map((row) => ({
      id: `ap-${row.id}`,
      prioridade: row.prazo === 'vencido' || row.grau === 'gravíssima' ? 'crítica' : 'atenção',
      origem: 'Apontamento',
      objeto: row.id,
      contexto: `${row.uso} · ${row.tipo}`,
      prazo: row.prazo,
      destino: apontamentoDestino(row),
      acao: row.proximaAcao,
    }))

  const useRows = usos
    .filter((row) => row.proximaAcao !== 'Acompanhar')
    .map((row) => ({
      id: `uso-${row.id}`,
      prioridade: row.apontamentos > 1 || row.proximaAcao.toLowerCase().includes('notificar') ? 'crítica' : 'atenção',
      origem: 'Uso',
      objeto: row.id,
      contexto: `${row.municipio} · ${row.subBacia}`,
      prazo: row.proximaAcao.toLowerCase().includes('renovação') ? '19 dias' : '-',
      destino: usoDestino(row),
      acao: row.proximaAcao,
    }))

  return [...processRows, ...justificationRows, ...findingRows, ...useRows]
    .sort((a, b) => prazoRank(a.prazo) - prazoRank(b.prazo))
}

function buildDeclarationSummary(rows) {
  const currentRows = rows.map((row) => {
    const portaria = currentPortariaForUso(row)
    const activeMeters = portaria ? medidoresAtivosForPortaria(portaria.id) : []
    return {
      uso: row,
      portaria,
      activeMeters,
      expectedMeters: Number(portaria?.medidoresEsperados || 0),
    }
  })

  const mismatched = currentRows.filter((row) => row.portaria && row.activeMeters.length !== row.expectedMeters)
  const pendingJustificativas = justificativas.filter((row) => row.estado === 'Aguardando avaliação')
  const approvedJustificativas = justificativas.filter((row) => row.estado === 'Aprovado')
  const meterChangeRequests = solicitacoes.filter((row) => row.tipo.includes('medidor') && row.estado !== 'Encerrada')

  return {
    mismatched,
    pendingJustificativas,
    approvedJustificativas,
    meterChangeRequests,
    rows: [
      {
        id: 'leituras-pendentes',
        label: 'Leituras pendentes por medidor',
        value: rows.reduce((sum, row) => sum + Number(row.declaracoesPendentes || 0), 0),
        status: rows.some((row) => row.declaracoesPendentes > 0) ? 'atenção' : 'conforme',
        to: workbookLink('/usos', { recorte: 'sem-declaracao' }),
      },
      {
        id: 'medidores-divergentes',
        label: 'Medidores ativos divergentes do ato',
        value: mismatched.length,
        status: mismatched.length ? 'crítico' : 'conforme',
        to: workbookLink('/usos', { recorte: 'sem-recorte' }),
      },
      {
        id: 'justificativas-pendentes',
        label: 'Justificativas aguardando avaliação',
        value: pendingJustificativas.length,
        status: pendingJustificativas.length ? 'atenção' : 'conforme',
        to: workbookLink('/justificativas', { recorte: 'aguardando-avaliacao' }),
      },
      {
        id: 'troca-medidor',
        label: 'Solicitações de medidor em análise',
        value: meterChangeRequests.length,
        status: meterChangeRequests.length ? 'atenção' : 'conforme',
        to: workbookLink('/usos', { recorte: 'sem-recorte' }),
      },
      {
        id: 'declaracoes-registradas',
        label: 'Declarações registradas no recorte',
        value: declaracoes.length,
        status: 'conforme',
        to: workbookLink('/usos', { recorte: 'sem-recorte' }),
      },
    ],
  }
}

function buildTelemetrySummary(rows) {
  const transmissionByUso = new Map(transmissoes.map((row) => [row.uso, row]))
  const cotrRows = rows.filter((row) => isCotrUse(row) || transmissionByUso.has(row.id))
  const transmissionRows = cotrRows.map((row) => transmissionByUso.get(row.id)).filter(Boolean)
  const restrictedUses = rows.filter((row) => row.estadoVazao !== 'SEM RESTRIÇÃO')
  const hoursOver = telemetriaDias.filter((row) => numberValue(row.horasCaptadas) > numberValue(row.horasOutorgadas))
  const volumeOverAllowed = telemetriaDias.filter((row) => numberValue(row.captado) > numberValue(row.permitido))

  return {
    cotrRows,
    transmissionRows,
    restrictedUses,
    hoursOver,
    volumeOverAllowed,
    rows: [
      {
        id: 'fora-tolerancia',
        label: 'COT-R fora da tolerância',
        value: transmissionRows.filter((row) => row.situacao === 'FORA DA TOLERÂNCIA').length,
        status: transmissionRows.some((row) => row.situacao === 'FORA DA TOLERÂNCIA') ? 'crítico' : 'conforme',
        to: workbookLink('/usos', { recorte: 'cot-r-pendente' }),
      },
      {
        id: 'em-tolerancia',
        label: 'COT-R em tolerância',
        value: transmissionRows.filter((row) => row.situacao === 'EM TOLERÂNCIA').length,
        status: transmissionRows.some((row) => row.situacao === 'EM TOLERÂNCIA') ? 'atenção' : 'conforme',
        to: workbookLink('/usos', { recorte: 'cot-r-pendente' }),
      },
      {
        id: 'restricao-vazao',
        label: 'Usos sob regra de restrição',
        value: restrictedUses.length,
        status: restrictedUses.length ? 'atenção' : 'conforme',
        to: workbookLink('/usos', { recorte: 'sem-recorte', field: 'estadoVazao', op: 'neq', value: 'SEM RESTRIÇÃO' }),
      },
      {
        id: 'horas-operacao',
        label: 'Dias com horas acima do regime',
        value: hoursOver.length,
        status: hoursOver.length ? 'crítico' : 'conforme',
        to: workbookLink('/usos', { recorte: 'cot-r-pendente' }),
      },
      {
        id: 'acima-permitido',
        label: 'Dias com captado acima do permitido',
        value: volumeOverAllowed.length,
        status: volumeOverAllowed.length ? 'crítico' : 'conforme',
        to: workbookLink('/usos', { recorte: 'uso-em-atencao' }),
      },
    ],
  }
}

function buildSubBaciaRows() {
  const summarized = summarizeBySubBacia(usos)
  return summarized
    .map((row) => {
      const base = subBacias.find((item) => item.nome === row.subBacia)
      const status = row.comprometimento > 100 || row.transmissao < 90 ? 'crítico' : (row.excecoes || row.pendencias ? 'atenção' : 'conforme')
      const proximaAcao = status === 'crítico' ? 'Abrir usos em atenção' : (status === 'atenção' ? 'Revisar recorte' : 'Acompanhar')

      return {
        ...row,
        vm: base?.vm || `${fmt.format(Math.round(row.outorgado))} m³`,
        status,
        proximaAcao,
      }
    })
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || b.comprometimento - a.comprometimento || b.excecoes - a.excecoes)
}

function buildVolumePreview(rows) {
  const sorted = [...rows].sort((a, b) => b.comprometimento - a.comprometimento)
  const visible = sorted.slice(0, VOLUME_PREVIEW_LIMIT)
  const rest = sorted.slice(VOLUME_PREVIEW_LIMIT)

  if (!rest.length) return visible

  const demais = rest.reduce((acc, row) => ({
    ...acc,
    usos: acc.usos + row.usos,
    excecoes: acc.excecoes + row.excecoes,
    pendencias: acc.pendencias + row.pendencias,
    outorgado: acc.outorgado + row.outorgado,
    permitido: acc.permitido + row.permitido,
    medido: acc.medido + row.medido,
  }), {
    subBacia: 'Demais sub-bacias',
    usos: 0,
    excecoes: 0,
    pendencias: 0,
    outorgado: 0,
    permitido: 0,
    medido: 0,
    transmissao: 0,
    status: 'conforme',
  })

  return [
    ...visible,
    {
      ...demais,
      comprometimento: demais.permitido ? Math.round((demais.medido / demais.permitido) * 100) : 0,
    },
  ]
}

function DashboardTable({ columns, rows, limit = TABLE_PREVIEW_LIMIT, footer }) {
  const visibleRows = rows.slice(0, limit)
  const hidden = rows.length - visibleRows.length

  return (
    <>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>{columns.map((column) => <th key={column.key} className={column.num ? 'num' : undefined}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id || row.subBacia || row.label}>
                {columns.map((column) => (
                  <td key={column.key} className={column.num ? 'num' : undefined}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(hidden > 0 || footer) && (
        <div className="dashboard-preview-footer">
          {hidden > 0 && <span>{hidden} registros fora da prévia</span>}
          {footer}
        </div>
      )}
    </>
  )
}

function ActionQueue({ rows, limit = ACTION_PREVIEW_LIMIT }) {
  const visibleRows = rows.slice(0, limit)
  const hidden = rows.length - visibleRows.length

  return (
    <>
      <div className="action-queue">
        {visibleRows.map((row) => (
          <Link to={row.destino} className="action-row" key={row.id}>
            <Pill tone={actionTone(row)}>{row.prioridade}</Pill>
            <span>
              <b>{row.objeto}</b>
              <small>{row.origem} · {row.contexto}</small>
            </span>
            <em>{row.prazo}</em>
            <strong>{row.acao}</strong>
          </Link>
        ))}
      </div>
      <div className="dashboard-preview-footer">
        <span>{rows.length} ações no recorte · prévia de {visibleRows.length}</span>
        <Link to={workbookLink('/apontamentos', { recorte: 'com-prazo' })}>{hidden > 0 ? `Abrir fila completa (+${hidden})` : 'Abrir fila completa'}</Link>
      </div>
    </>
  )
}

function VolumeBars({ rows }) {
  const max = Math.max(...rows.flatMap((row) => [row.outorgado, row.permitido, row.medido]), 1)

  return (
    <div className="volume-bars">
      {rows.map((row) => (
        <div className="volume-row" key={row.subBacia}>
          <div>
            <b>{row.subBacia}</b>
            <span>{row.comprometimento}% medido/permitido</span>
          </div>
          <div className="bar-stack" aria-label={`${row.subBacia}: captado, outorgado e permitido`}>
            <i className="captado" style={{ width: `${Math.max(4, (row.medido / max) * 100)}%` }} />
            <i className="outorgado" style={{ width: `${Math.max(4, (row.outorgado / max) * 100)}%` }} />
            <i className="permitido" style={{ width: `${Math.max(4, (row.permitido / max) * 100)}%` }} />
          </div>
        </div>
      ))}
      <div className="volume-legend">
        <span><i className="captado" />Captado</span>
        <span><i className="outorgado" />Outorgado</span>
        <span><i className="permitido" />Permitido</span>
      </div>
    </div>
  )
}

function BoundsFitter({ clusters }) {
  const map = useMap()

  useEffect(() => {
    const layers = L.featureGroup()
    layers.addLayer(L.geoJSON(geoData.ugrhiLimite))
    clusters.forEach((cluster) => layers.addLayer(L.circleMarker(cluster.position)))
    const bounds = layers.getBounds()
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [14, 14] })
    window.setTimeout(() => map.invalidateSize(), 0)
  }, [clusters, map])

  return null
}

function subBaciaStyleFor(rowsBySubBacia) {
  return (feature) => {
    const row = rowsBySubBacia.get(feature?.properties?.nome)
    const status = row?.status || 'conforme'
    const fillColor = status === 'crítico' ? '#bdbdbd' : (status === 'atenção' ? '#e0e0e0' : '#fff')

    return {
      color: ink,
      weight: status === 'crítico' ? 2.2 : 1.2,
      fillColor,
      fillOpacity: 0.9,
      dashArray: status === 'atenção' ? '5 5' : undefined,
    }
  }
}

function mapUseRank(row) {
  if (row.transmissao === 'FORA DA TOLERÂNCIA' || row.apontamentos > 1) return 0
  if (row.apontamentos > 0 || row.declaracoesPendentes > 0 || row.proximaAcao !== 'Acompanhar') return 1
  return 2
}

function MapNavRow({ to, marker, title, detail, value }) {
  return (
    <Link to={to} className="map-nav-row">
      <i className={`map-nav-dot ${marker}`} />
      <span>
        <b>{title}</b>
        {detail && <small>{detail}</small>}
      </span>
      {value !== undefined && value !== null && <em>{value}</em>}
    </Link>
  )
}

function MapSidePanel({ rows, subBaciaRows }) {
  const useRows = useMemo(() => [...rows].sort((a, b) => (
    mapUseRank(a) - mapUseRank(b)
    || b.apontamentos - a.apontamentos
    || b.declaracoesPendentes - a.declaracoesPendentes
    || a.id.localeCompare(b.id)
  )), [rows])
  const declarationSummary = buildDeclarationSummary(rows)
  const telemetrySummary = buildTelemetrySummary(rows)

  const recorteRows = [
    {
      label: 'Apontamentos',
      value: apontamentos.filter((row) => row.fase !== 'Encerrada').length,
      to: workbookLink('/apontamentos', { recorte: 'com-prazo' }),
      marker: 'critico',
    },
    {
      label: 'Sem declaração',
      value: rows.filter((row) => row.declaracoesPendentes > 0).length,
      to: workbookLink('/usos', { recorte: 'sem-declaracao' }),
      marker: 'atencao',
    },
    {
      label: 'Telemetria COT-R',
      value: telemetrySummary.transmissionRows.filter((row) => row.situacao !== 'EM DIA').length,
      to: workbookLink('/usos', { recorte: 'cot-r-pendente' }),
      marker: 'atencao',
    },
    {
      label: 'Justificativas',
      value: declarationSummary.pendingJustificativas.length,
      to: workbookLink('/justificativas', { recorte: 'aguardando-avaliacao' }),
      marker: declarationSummary.pendingJustificativas.length ? 'atencao' : 'conforme',
    },
    {
      label: 'Ato a vencer',
      value: rows.filter((row) => row.proximaAcao.toLowerCase().includes('renovação')).length,
      to: workbookLink('/usos', { recorte: 'a-vencer' }),
      marker: 'conforme',
    },
    {
      label: 'Calibração',
      value: medidores.filter((row) => row.status === 'Ativo' && String(row.calibracao).includes('vencida')).length,
      to: workbookLink('/usos', { recorte: 'calibracao-vencida' }),
      marker: 'atencao',
    },
  ]

  return (
    <aside className="dashboard-map-side" aria-label="Legenda e navegação do mapa">
      <section className="map-side-section map-side-head">
        <span>Legenda ativa</span>
        <b>UGRHI-07 · Baixada Santista</b>
        <small>Clique em uma escala ou recorte para abrir o workbook já filtrado.</small>
      </section>

      <section className="map-side-section">
        <h3>Escala</h3>
        <MapNavRow
          to={workbookLink('/usos', { recorte: 'todos-os-usos' })}
          marker="bacia"
          title="Bacia"
          detail="todos os usos monitorados"
          value={rows.length}
        />
        <div className="map-side-list" aria-label="Sub-bacias">
          {subBaciaRows.map((row) => (
            <MapNavRow
              key={row.subBacia}
              to={subBaciaDestino(row)}
              marker={`sub-bacia ${statusClass(row.status)}`}
              title={row.subBacia}
              detail={`${row.comprometimento}% medido/permitido · ${row.excecoes} apontamentos`}
              value={row.usos}
            />
          ))}
        </div>
      </section>

      <section className="map-side-section">
        <h3>Usos</h3>
        <div className="map-side-list" aria-label="Usos monitorados">
          {useRows.map((row) => (
            <MapNavRow
              key={row.id}
              to={usoDestino(row)}
              marker={`uso ${mapUseRank(row) === 0 ? 'critico' : (mapUseRank(row) === 1 ? 'atencao' : 'conforme')}`}
              title={row.id}
              detail={`${row.outorgado} · ${row.subBacia}`}
              value={row.apontamentos ? `${row.apontamentos} ap.` : row.transmissao}
            />
          ))}
        </div>
        <Link className="map-side-footer-link" to="/mapa">Abrir mapa completo de usos</Link>
      </section>

      <section className="map-side-section">
        <h3>Recortes operacionais</h3>
        <div className="map-side-list">
          {recorteRows.map((row) => (
            <MapNavRow
              key={row.label}
              to={row.to}
              marker={row.marker}
              title={row.label}
              detail="abrir recorte no workbook"
              value={row.value}
            />
          ))}
        </div>
      </section>

      <section className="map-side-section map-condition-legend">
        <h3>Condição</h3>
        <span><i className="critico" />crítico</span>
        <span><i className="atencao" />atenção</span>
        <span><i className="conforme" />conforme</span>
        <em>{geoProvenance[1]}</em>
      </section>
    </aside>
  )
}

function DashboardBasinMap({ rows, subBaciaRows, onOpenSubBacia }) {
  const points = useMemo(() => buildMapPoints(rows), [rows])
  const rowsBySubBacia = useMemo(() => new Map(subBaciaRows.map((row) => [row.subBacia, row])), [subBaciaRows])
  const clusters = useMemo(() => subBaciaRows.map((row) => {
    const scoped = points.filter((point) => point.subBacia === row.subBacia)
    const lat = scoped.reduce((sum, point) => sum + point.position[0], 0) / Math.max(scoped.length, 1)
    const lon = scoped.reduce((sum, point) => sum + point.position[1], 0) / Math.max(scoped.length, 1)

    return {
      ...row,
      position: [lat, lon],
      radius: Math.max(12, Math.min(24, 9 + Math.sqrt(row.usos) * 5)),
    }
  }).filter((cluster) => Number.isFinite(cluster.position[0]) && Number.isFinite(cluster.position[1])), [points, subBaciaRows])

  return (
    <div className="dashboard-map-summary">
      <MapContainer
        className="leaflet-wire-map dashboard-wire-map"
        center={[-24.05, -46.55]}
        zoom={9}
        minZoom={8}
        maxZoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <GeoJSON data={oceanMass} style={oceanStyle} interactive={false} />
        <GeoJSON data={geoData.rmbsMunicipios} style={{ color: '#8f8f8f', weight: 0.7, fillOpacity: 0.08, dashArray: '4 6' }} />
        <GeoJSON
          data={geoData.ugrhiSubBacias}
          style={subBaciaStyleFor(rowsBySubBacia)}
          eventHandlers={{
            click: (event) => onOpenSubBacia?.(event.layer?.feature?.properties?.nome),
          }}
        />
        <GeoJSON data={geoData.ugrhiLimite} style={{ color: ink, weight: 2.5, fill: false }} />
        {clusters.map((cluster) => (
          <CircleMarker
            key={cluster.subBacia}
            center={cluster.position}
            pathOptions={{
              radius: cluster.radius,
              color: ink,
              weight: cluster.status === 'crítico' ? 3 : 2,
              fillColor: cluster.status === 'crítico' ? ink : (cluster.status === 'atenção' ? '#9a9a9a' : '#fff'),
              fillOpacity: cluster.status === 'conforme' ? 0.7 : 0.85,
              dashArray: cluster.status === 'atenção' ? '4 4' : undefined,
            }}
            eventHandlers={{ click: () => onOpenSubBacia?.(cluster.subBacia) }}
          >
            <LeafletTooltip direction="top" offset={[0, -8]}>
              <b>{cluster.subBacia}</b><br />
              {cluster.usos} usos · {cluster.excecoes} apontamentos<br />
              {cluster.comprometimento}% medido/permitido
            </LeafletTooltip>
          </CircleMarker>
        ))}
        <BoundsFitter clusters={clusters} />
      </MapContainer>
      <MapSidePanel rows={rows} subBaciaRows={subBaciaRows} />
    </div>
  )
}

export default function Dashboard() {
  const { setWorkbookContext } = useWorkbookContext()
  const navigate = useNavigate()
  const summary = useMemo(() => summarizeRows(usos), [])
  const subBaciaRows = useMemo(() => buildSubBaciaRows(), [])
  const volumeRows = useMemo(() => buildVolumePreview(subBaciaRows), [subBaciaRows])
  const nextActions = useMemo(() => buildNextActions(), [])
  const declarationSummary = useMemo(() => buildDeclarationSummary(usos), [])
  const telemetrySummary = useMemo(() => buildTelemetrySummary(usos), [])
  const activeMedidores = useMemo(() => medidores.filter((row) => row.status === 'Ativo'), [])
  const vencidos = activeMedidores.filter((row) => String(row.calibracao).includes('vencida')).length
  const transmissaoOk = telemetrySummary.transmissionRows.filter((row) => row.situacao === 'EM DIA').length
  const transmissaoCritica = telemetrySummary.transmissionRows.filter((row) => row.situacao === 'FORA DA TOLERÂNCIA').length
  const transmissaoAtencao = telemetrySummary.transmissionRows.filter((row) => row.situacao !== 'EM DIA').length
  const usosComPendenciaDeclaratoria = usos.filter((row) => row.declaracoesPendentes > 0).length
  const acoesCriticas = nextActions.filter((row) => row.prioridade === 'crítica').length
  const graves = apontamentos.filter((row) => row.grau === 'grave' || row.grau === 'gravíssima').length

  useEffect(() => {
    setWorkbookContext({
      title: 'Dashboard operacional',
      subtitle: 'UGRHI-07 – Baixada Santista',
      contextLine: `Dashboard operacional · ${summary.total} usos monitorados · ${apontamentos.length} apontamentos abertos · ${nextActions.length} ações em fila`,
    })

    return () => setWorkbookContext(null)
  }, [nextActions.length, setWorkbookContext, summary.total])

  const subBaciaColumns = [
    { key: 'subBacia', label: 'Sub-bacia', render: (row) => <Link to={workbookLink('/usos', { recorte: 'sem-recorte', field: 'subBacia', value: row.subBacia })}><b>{row.subBacia}</b></Link> },
    { key: 'usos', label: 'Usos', num: true },
    { key: 'medido', label: 'Captado', num: true, render: (row) => fmt.format(Math.round(row.medido)) },
    { key: 'outorgado', label: 'Outorgado', num: true, render: (row) => fmt.format(Math.round(row.outorgado)) },
    { key: 'permitido', label: 'Permitido', num: true, render: (row) => fmt.format(Math.round(row.permitido)) },
    { key: 'transmissao', label: 'Transmissão', num: true, render: (row) => `${row.transmissao}%` },
    { key: 'pendencias', label: 'Sem declaração', num: true },
    { key: 'excecoes', label: 'Apontamentos', num: true },
    { key: 'status', label: 'Status', render: (row) => <Pill tone={statusTone(row.status)}>{row.status}</Pill> },
    { key: 'proximaAcao', label: 'Próxima ação', render: (row) => <Link to={workbookLink('/usos', { recorte: 'sem-recorte', field: 'subBacia', value: row.subBacia })}>{row.proximaAcao}</Link> },
  ]

  const dataQualityRows = [
    { label: 'Usos sem coordenada', value: usos.filter((row) => !row.coordenadas).length, status: 'conforme' },
    { label: 'Medidores ativos divergentes do ato', value: declarationSummary.mismatched.length, status: declarationSummary.mismatched.length ? 'crítico' : 'conforme', to: workbookLink('/usos', { recorte: 'sem-recorte' }) },
    { label: 'Outorgados ativos sem conta', value: outorgados.filter((row) => row.acesso === 'sem conta').length, status: outorgados.some((row) => row.acesso === 'sem conta') ? 'atenção' : 'conforme', to: '/outorgados' },
    { label: 'Atos com renovação a requerer', value: portarias.filter((row) => row.ciclo === 'renovação a requerer').length, status: portarias.some((row) => row.ciclo === 'renovação a requerer') ? 'atenção' : 'conforme', to: workbookLink('/usos', { recorte: 'a-vencer' }) },
  ]
  const qualityIssueCount = dataQualityRows.filter((row) => row.status !== 'conforme').length

  const qualityColumns = [
    { key: 'label', label: 'Condição', render: (row) => row.to ? <Link to={row.to}><b>{row.label}</b>{row.note && <small>{row.note}</small>}</Link> : row.label },
    { key: 'value', label: 'Qtde.', num: true },
    { key: 'status', label: 'Status', render: (row) => <Pill tone={conditionTone(row)}>{row.status}</Pill> },
  ]

  const justificativaColumns = [
    { key: 'id', label: 'Justificativa', render: (row) => <Link to={justificativaDestino(row)}><b>{row.id}</b></Link> },
    { key: 'uso', label: 'Uso', render: (row) => <Link to={workbookLink('/usos', { recorte: 'sem-recorte', field: 'id', value: row.uso })}>{row.uso}</Link> },
    { key: 'motivo', label: 'Motivo' },
    { key: 'prazo', label: 'Prazo' },
    { key: 'estado', label: 'Estado', render: (row) => <Pill tone={row.estado === 'Aguardando avaliação' ? 'warn' : 'ok'}>{row.estado}</Pill> },
  ]

  return (
    <div className="dashboard-home">
      <div className="dashboard-filterbar">
        <div className="search">
          <span>⌕</span>
          <input placeholder="Buscar uso, outorgado, portaria, município ou ponto" />
        </div>
        <span className="select dashboard-context-chip">Bacia · UGRHI-07</span>
        <span className="select dashboard-context-chip">Período · junho/2026</span>
        <span className="select dashboard-context-chip">Recorte · operação ordinária</span>
      </div>

      <div className="stats dashboard-stats">
        <Stat to="/usos" label="Usos monitorados" value={summary.total} sub={`${summary.telemetria} COT-R · ${summary.total - summary.telemetria} app`} />
        <Stat to={workbookLink('/usos', { recorte: 'uso-em-atencao' })} label="Captado / permitido" value={`${summary.comprometimento}%`} sub={`${fmt.format(Math.round(summary.medido))} m³ captados`} />
        <Stat to={workbookLink('/usos', { recorte: 'sem-declaracao' })} label="Leituras pendentes" value={summary.pendencias} sub={`${usosComPendenciaDeclaratoria} usos com lacuna`} />
        <Stat to={workbookLink('/usos', { recorte: 'cot-r-pendente' })} label="COT-R em atenção" value={transmissaoAtencao} sub={`${transmissaoCritica} fora da tolerância · ${transmissaoOk} em dia`} />
        <Stat to={workbookLink('/apontamentos', { recorte: 'com-prazo' })} label="Fila com prazo" value={nextActions.length} sub={`${acoesCriticas} críticas · ${graves} apontamentos graves`} />
        <Stat to={workbookLink('/usos', { recorte: 'calibracao-vencida' })} label="Medidores com ação" value={declarationSummary.mismatched.length + vencidos} sub={`${vencidos} com calibração vencida`} />
      </div>

      <div className="dashboard-main-grid">
        <Panel title="Mapa operacional da bacia" meta={<><Pill>sub-bacias agregadas</Pill><Sp /><Button sub to="/mapa">Abrir mapa completo</Button></>} lead className="dashboard-map-panel">
          <DashboardBasinMap
            rows={usos}
            subBaciaRows={subBaciaRows}
            onOpenSubBacia={(subBacia) => navigate(workbookLink('/usos', { recorte: 'sem-recorte', field: 'subBacia', value: subBacia }))}
          />
        </Panel>

        <Panel title="Próximas ações" meta={<Pill tone="warn">prazo</Pill>} className="dashboard-action-panel">
          <ActionQueue rows={nextActions} />
        </Panel>
      </div>

      <div className="dashboard-secondary-grid">
        <Panel title="Situação por sub-bacia" meta={<Button sub to="/usos">Abrir usos monitorados</Button>} lead>
          <DashboardTable
            columns={subBaciaColumns}
            rows={subBaciaRows}
            footer={<Link to="/usos">Abrir workbook de usos</Link>}
          />
        </Panel>

        <Panel title="Reconciliação hídrica" meta={<Pill>captado × outorgado × permitido</Pill>}>
          <VolumeBars rows={volumeRows} />
          <div className="dashboard-preview-footer">
            <span>{subBaciaRows.length > VOLUME_PREVIEW_LIMIT ? `Top ${VOLUME_PREVIEW_LIMIT} por comprometimento; demais agregados.` : 'Todas as sub-bacias no recorte atual.'}</span>
            <Link to="/usos?recorte=uso-em-atencao">Abrir usos em atenção</Link>
          </div>
        </Panel>

        <Panel title="Declaração e medidores" meta={<Pill>{fmt.format(Math.round(summary.medido))} m³ captados</Pill>} className="dashboard-health-panel">
          <DashboardTable columns={qualityColumns} rows={declarationSummary.rows} limit={5} />
        </Panel>

        <Panel title="Telemetria e restrição" meta={<Pill>{telemetrySummary.cotrRows.length} usos COT-R</Pill>}>
          <DashboardTable columns={qualityColumns} rows={telemetrySummary.rows} limit={5} />
        </Panel>

        <Panel title="Qualidade cadastral" meta={<><Pill>{qualityIssueCount} com atenção</Pill><Sp /><Button sub to="/relatorios">Relatórios</Button></>}>
          <DashboardTable columns={qualityColumns} rows={dataQualityRows} />
        </Panel>

        <Panel title="Justificativas" meta={<Button sub to="/justificativas">Abrir fila</Button>} className="dashboard-quality-panel">
          <DashboardTable
            columns={justificativaColumns}
            rows={justificativas.filter((row) => row.estado === 'Aguardando avaliação')}
            footer={<Link to={workbookLink('/justificativas', { recorte: 'aguardando-avaliacao' })}>Abrir justificativas aguardando avaliação</Link>}
          />
        </Panel>
      </div>
    </div>
  )
}
