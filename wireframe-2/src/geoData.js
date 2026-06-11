import brPaisRaw from './assets/geo/br-pais.geojson?raw'
import rmbsMunicipiosRaw from './assets/geo/rmbs-municipios.geojson?raw'
import spEstadoRaw from './assets/geo/sp-estado.geojson?raw'
import ugrhiLimiteRaw from './assets/geo/ugrhi07-limite.geojson?raw'
import ugrhiSubBaciasRaw from './assets/geo/ugrhi07-subbacias.geojson?raw'

const parseGeoJson = (raw) => JSON.parse(raw)

export const geoData = {
  brPais: parseGeoJson(brPaisRaw),
  spEstado: parseGeoJson(spEstadoRaw),
  rmbsMunicipios: parseGeoJson(rmbsMunicipiosRaw),
  ugrhiLimite: parseGeoJson(ugrhiLimiteRaw),
  ugrhiSubBacias: parseGeoJson(ugrhiSubBaciasRaw),
}

export const geoProvenance = [
  'IBGE Malhas territoriais 2023: Brasil, São Paulo e municípios da RMBS.',
  'DataGeo/SEMIL-SP: LimiteSubBacias2013 filtrado para NUGRHI 7.',
  'Recortes gerados por pipeline/mapas-bs e trazidos para o protótipo.',
]
