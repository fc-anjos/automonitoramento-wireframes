export const cx = (...xs) => xs.filter(Boolean).join(' ')

export const asset = (name) => {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/assets/${name}`
}

export const fmt = new Intl.NumberFormat('pt-BR')

