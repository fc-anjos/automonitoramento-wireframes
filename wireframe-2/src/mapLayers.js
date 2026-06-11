export const oceanMass = {
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

export function oceanStyle() {
  return {
    color: '#707070',
    weight: 1.1,
    fillColor: '#e9e9e9',
    fillOpacity: 1,
    dashArray: '6 5',
  }
}
