import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { territorio } from '../data.js'
import { WorkbookContext } from './workbookContext.jsx'

const workbookTabs = [
  ['/', 'Dashboard'],
  ['/usos', 'Usos'],
  ['/outorgados', 'Outorgados'],
  ['/portarias', 'Portarias / Atos'],
  ['/justificativas', 'Justificativas'],
  ['/apontamentos', 'Apontamentos'],
  ['/processos', 'Autos / Processos'],
  ['/multas', 'Multas'],
  ['/relatorios', 'Relatórios'],
  ['/admin', 'Administração'],
]

export default function Shell({ children }) {
  const [workbookContext, setWorkbookContext] = useState(null)
  const contextValue = useMemo(() => ({ setWorkbookContext }), [])
  const title = workbookContext?.title || 'Automonitoramento'
  const subtitle = workbookContext?.subtitle || territorio.nome
  const contextLine = workbookContext?.contextLine || `Contexto operacional · ${territorio.nome}`

  return (
    <WorkbookContext.Provider value={contextValue}>
      <div className="workbook">
        <header className="wb-top">
          <div className="wb-title">
            <b>{title}</b>
            <span>{subtitle}</span>
          </div>
          <div className="formula context-line">
            <span>contexto</span>
            <b>{contextLine}</b>
          </div>
          <div className="wb-actions">
            <button>⌕</button>
            <button>↥</button>
            <button>⚙</button>
          </div>
        </header>
        <nav className="wb-tabs">
          {workbookTabs.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
          ))}
        </nav>
        <main className="wb-main">{children}</main>
      </div>
    </WorkbookContext.Provider>
  )
}
