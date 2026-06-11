import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { CircleMarker, GeoJSON, MapContainer, Tooltip as LeafletTooltip, useMap } from 'react-leaflet'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { geoData, geoProvenance } from '../geoData.js'
import {
  buildMapPoints,
  scopedTransmission,
  summarizeByStatus,
  summarizeBySubBacia,
  summarizeByTransmission,
  summarizeRows,
  telemetrySeriesForUso,
  worstOpenFinding,
} from '../monitoringSeeds.js'

const ink = '#2b2b2b'
const muted = '#6f6f6f'
const grid = '#cfcfcf'
const surface = '#fff'
const subBaciaPatterns = {
  'Rio Cubatão': 'url(#wire-map-hatch-forward)',
  'Rio Itapanhaú': 'url(#wire-map-hatch-back)',
  'Drenagem direta ao oceano': 'url(#wire-map-hatch-cross)',
}
const oceanMass = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { nome: 'Oceano Atlântico' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-47.24, -24.62],
        [-47.24, -24.12],
        [-47.12, -24.10],
        [-46.99, -24.13],
        [-46.83, -24.16],
        [-46.67, -24.13],
        [-46.51, -24.08],
        [-46.36, -24.02],
        [-46.22, -23.96],
        [-46.08, -23.88],
        [-45.94, -23.82],
        [-45.78, -23.78],
        [-45.78, -24.62],
        [-47.24, -24.62],
      ]],
    },
  }],
}
const statusColors = {
  crítico: '#2b2b2b',
  atenção: '#9a9a9a',
  conforme: '#fff',
}

function ChartBox({ title, meta, children }) {
  return (
    <section className="visual-card">
      <header>
        <b>{title}</b>
        {meta && <span>{meta}</span>}
      </header>
      <div className="visual-chart">{children}</div>
    </section>
  )
}

function SummaryStats({ summary }) {
  return (
    <div className="visual-stats">
      <div><span>Usos no recorte</span><b>{summary.total}</b></div>
      <div><span>Telemetria COT-R</span><b>{summary.telemetria}</b></div>
      <div><span>Pendências</span><b>{summary.pendencias}</b></div>
      <div><span>Medido / permitido</span><b>{summary.comprometimento}%</b></div>
    </div>
  )
}

function BoundsFitter({ points }) {
  const map = useMap()

  useEffect(() => {
    const layers = L.featureGroup()
    layers.addLayer(L.geoJSON(geoData.ugrhiLimite))
    points.forEach((point) => layers.addLayer(L.circleMarker(point.position)))
    const bounds = layers.getBounds()
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [18, 18] })
    window.setTimeout(() => map.invalidateSize(), 0)
  }, [map, points])

  return null
}

function MapPatterns() {
  const map = useMap()

  useEffect(() => {
    function installPatterns() {
      const svg = map.getPanes().overlayPane.querySelector('svg')
      if (!svg || svg.querySelector('#wire-map-patterns')) return

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      defs.setAttribute('id', 'wire-map-patterns')
      defs.innerHTML = `
        <pattern id="wire-map-hatch-forward" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
          <rect width="9" height="9" fill="#f7f7f7"></rect>
          <line x1="0" y1="0" x2="0" y2="9" stroke="#8a8a8a" stroke-width="1" opacity="0.7"></line>
        </pattern>
        <pattern id="wire-map-hatch-back" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45)">
          <rect width="10" height="10" fill="#ffffff"></rect>
          <line x1="0" y1="0" x2="0" y2="10" stroke="#8f8f8f" stroke-width="1" opacity="0.65"></line>
        </pattern>
        <pattern id="wire-map-hatch-cross" patternUnits="userSpaceOnUse" width="11" height="11">
          <rect width="11" height="11" fill="#f2f2f2"></rect>
          <path d="M0 0L11 11M11 0L0 11" stroke="#9c9c9c" stroke-width="0.9" opacity="0.58"></path>
        </pattern>
        <pattern id="wire-map-ocean" patternUnits="userSpaceOnUse" width="13" height="13" patternTransform="rotate(-32)">
          <rect width="13" height="13" fill="#e9e9e9"></rect>
          <line x1="0" y1="0" x2="0" y2="13" stroke="#b1b1b1" stroke-width="1" opacity="0.55"></line>
        </pattern>
      `
      svg.prepend(defs)
    }

    installPatterns()
    const id = window.setTimeout(installPatterns, 0)
    map.on('layeradd zoomend moveend', installPatterns)
    return () => {
      window.clearTimeout(id)
      map.off('layeradd zoomend moveend', installPatterns)
    }
  }, [map])

  return null
}

function spEstadoStyle() {
  return {
    color: '#999',
    weight: 0.8,
    fillColor: '#fafafa',
    fillOpacity: 1,
  }
}

function oceanStyle() {
  return {
    color: '#707070',
    weight: 1.1,
    fillColor: 'url(#wire-map-ocean)',
    fillOpacity: 1,
    dashArray: '6 5',
  }
}

function subBaciaStyle(feature) {
  const nome = feature?.properties?.nome
  return {
    color: '#4f4f4f',
    weight: 0.85,
    fillColor: subBaciaPatterns[nome] || '#f4f4f4',
    fillOpacity: 1,
    className: 'sub-bacia-boundary',
  }
}

function municipioStyle() {
  return {
    color: '#8f8f8f',
    weight: 0.65,
    fillColor: '#fff',
    fillOpacity: 0.16,
    dashArray: '4 6',
  }
}

function limiteStyle() {
  return {
    color: ink,
    weight: 2.4,
    fill: false,
  }
}

function markerOptions(point, selectedId) {
  const selected = point.id === selectedId
  const color = statusColors[point.severity] || muted
  return {
    radius: selected ? 10 : 7,
    color: ink,
    weight: selected ? 3 : 1.8,
    fillColor: color,
    fillOpacity: selected ? 0.95 : 0.72,
    dashArray: point.severity === 'atenção' ? '3 3' : undefined,
  }
}

export function OperationalMapLens({ rows, selected, onSelect, onOpen }) {
  const points = useMemo(() => buildMapPoints(rows), [rows])
  const selectedPoint = points.find((point) => point.id === selected?.id) || points[0]

  return (
    <div className="map-lens">
      <div className="map-frame">
        <MapContainer
          className="leaflet-wire-map"
          center={[-24.05, -46.55]}
          zoom={9}
          minZoom={8}
          maxZoom={13}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <MapPatterns />
          <GeoJSON data={oceanMass} style={oceanStyle} interactive={false} />
          <GeoJSON data={geoData.spEstado} style={spEstadoStyle} interactive={false} />
          <GeoJSON data={geoData.rmbsMunicipios} style={municipioStyle} />
          <GeoJSON data={geoData.ugrhiSubBacias} style={subBaciaStyle} />
          <GeoJSON data={geoData.ugrhiLimite} style={limiteStyle} />
          {points.map((point) => (
            <CircleMarker
              key={point.id}
              center={point.position}
              pathOptions={markerOptions(point, selected?.id)}
              eventHandlers={{
                click: () => onSelect?.(point),
                dblclick: () => onOpen?.(point),
              }}
            >
              <LeafletTooltip direction="top" offset={[0, -8]}>
                <b>{point.id}</b><br />
                {point.outorgado}<br />
                {point.subBacia}
              </LeafletTooltip>
            </CircleMarker>
          ))}
          <BoundsFitter points={points} />
        </MapContainer>
      </div>
      <aside className="map-side">
        <header>
          <span>seleção espacial</span>
          <b>{selectedPoint ? `${selectedPoint.id} · ${selectedPoint.identificacao}` : 'sem ponto'}</b>
        </header>
        <div className="map-legend">
          <span><i className="critico" />crítico</span>
          <span><i className="atencao" />atenção</span>
          <span><i className="conforme" />conforme</span>
          <span><i className="hatch" />sub-bacia</span>
        </div>
        <div className="map-list">
          {points.map((point) => (
            <button className={point.id === selected?.id ? 'on' : ''} type="button" key={point.id} onClick={() => onSelect?.(point)} onDoubleClick={() => onOpen?.(point)}>
              <i style={{ background: statusColors[point.severity] }} />
              <span>
                <b>{point.id}</b>
                <small>{point.municipio} · {point.subBacia}</small>
              </span>
              <em>{point.apontamentos}</em>
            </button>
          ))}
        </div>
        <footer>{geoProvenance[1]}</footer>
      </aside>
    </div>
  )
}

export function IndicatorLens({ rows }) {
  const bySubBacia = useMemo(() => summarizeBySubBacia(rows), [rows])
  const byStatus = useMemo(() => summarizeByStatus(rows), [rows])
  const byTransmission = useMemo(() => summarizeByTransmission(rows), [rows])
  const summary = useMemo(() => summarizeRows(rows), [rows])

  return (
    <div className="indicator-lens">
      <SummaryStats summary={summary} />
      <div className="visual-grid">
        <ChartBox title="Volume por sub-bacia" meta="mês corrente">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bySubBacia} margin={{ top: 10, right: 14, left: -16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke={grid} />
              <XAxis dataKey="subBacia" tick={{ fontSize: 11, fill: muted }} interval={0} height={48} />
              <YAxis tick={{ fontSize: 11, fill: muted }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="permitido" name="Permitido" fill="#d9d9d9" stroke={ink} strokeWidth={1.4} />
              <Bar dataKey="medido" name="Medido" fill="#f7f7f7" stroke={ink} strokeWidth={1.4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Comprometimento" meta="medido / permitido">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bySubBacia} margin={{ top: 10, right: 16, left: -18, bottom: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke={grid} />
              <XAxis dataKey="subBacia" tick={{ fontSize: 11, fill: muted }} interval={0} height={48} />
              <YAxis unit="%" tick={{ fontSize: 11, fill: muted }} />
              <Tooltip />
              <ReferenceLine y={100} stroke={ink} strokeDasharray="6 4" />
              <Bar dataKey="comprometimento" name="%" fill="#ededed" stroke={ink} strokeWidth={1.4}>
                {bySubBacia.map((item) => <Cell key={item.subBacia} fill={item.comprometimento > 100 ? '#bdbdbd' : '#ededed'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Estado operacional" meta="pior sinal por uso">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStatus} margin={{ top: 10, right: 16, left: -18, bottom: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke={grid} />
              <XAxis dataKey="status" tick={{ fontSize: 12, fill: muted }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: muted }} />
              <Tooltip />
              <Bar dataKey="usos" name="Usos" stroke={ink} strokeWidth={1.4}>
                {byStatus.map((item) => <Cell key={item.status} fill={statusColors[item.status] || surface} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Transmissão" meta="linha filtrada">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byTransmission} layout="vertical" margin={{ top: 10, right: 18, left: 70, bottom: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke={grid} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: muted }} />
              <YAxis type="category" dataKey="transmissao" tick={{ fontSize: 11, fill: muted }} width={78} />
              <Tooltip />
              <Bar dataKey="usos" name="Usos" fill="#e6e6e6" stroke={ink} strokeWidth={1.4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
    </div>
  )
}

export function TelemetryEvidence({ selected }) {
  const series = useMemo(() => telemetrySeriesForUso(selected.id), [selected.id])
  const transmission = scopedTransmission(selected.id)
  const finding = worstOpenFinding(selected.id)

  return (
    <div className="telemetry-evidence">
      <div className="telemetry-chart">
        <header>
          <b>Série diária</b>
          <span>{transmission?.situacao || selected.transmissao}</span>
        </header>
        <div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 14, right: 18, left: -14, bottom: 6 }}>
              <CartesianGrid strokeDasharray="4 4" stroke={grid} />
              <XAxis dataKey="data" tick={{ fontSize: 11, fill: muted }} />
              <YAxis tick={{ fontSize: 11, fill: muted }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="captado" name="Captado" stroke="#666" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="outorgado" name="Outorgado" stroke={ink} strokeDasharray="6 4" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="permitido" name="Permitido" stroke="#9a9a9a" strokeDasharray="3 4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="telemetry-facts">
        <div><span>COT-R</span><b>{transmission?.cotr || '-'}</b></div>
        <div><span>Pacotes</span><b>{transmission ? `${transmission.emDia}/${transmission.total}` : '-'}</b></div>
        <div><span>Atrasados/perdidos</span><b>{transmission ? `${transmission.atrasado}/${transmission.perdido}` : '-'}</b></div>
        <div><span>Apontamento</span><b>{finding ? `${finding.id} · ${finding.grau}` : 'sem apontamento aberto'}</b></div>
      </div>
    </div>
  )
}
