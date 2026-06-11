import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CommandStrip, DataTable, FieldGrid, Sheet, ViewTabs } from './ui.jsx'
import { useWorkbookContext } from './workbookContext.jsx'
import { applyRecorte, normalizeRecortes, slugify } from '../recortes.js'

function useDragWidth(initial = 620) {
  const [width, setWidth] = useState(initial)
  const active = useRef(false)

  useEffect(() => {
    function move(event) {
      if (!active.current) return
      const next = window.innerWidth - event.clientX - 8
      setWidth(Math.max(420, Math.min(860, next)))
    }

    function stop() {
      active.current = false
      document.body.classList.remove('dragging-panel')
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', stop)
    }
  }, [])

  function start() {
    active.current = true
    document.body.classList.add('dragging-panel')
  }

  return [width, start]
}

export function ScopeTrail({ items = [] }) {
  return (
    <div className="scope-ladder">
      {items.map(([label, value], idx) => (
        <div key={`${label}-${idx}`}>
          <span>{label}</span>
          <b>{value}</b>
          {idx < items.length - 1 && <i>&gt;</i>}
        </div>
      ))}
    </div>
  )
}

function cloneRecorte(recorte) {
  return JSON.parse(JSON.stringify(recorte || {}))
}

function cleanRecorte(recorte) {
  const { _draftMode, system, ...clean } = cloneRecorte(recorte)
  if (Array.isArray(clean.conditionGroups)) {
    clean.conditionGroups = clean.conditionGroups
      .map((group, idx) => ({
        id: group.id || `bloco-${idx + 1}`,
        name: group.name || `Bloco ${idx + 1}`,
        logic: group.logic === 'any' ? 'any' : 'all',
        filters: Array.isArray(group.filters) ? group.filters.filter(Boolean) : [],
      }))
      .filter((group) => group.filters.length)
    delete clean.filters
    delete clean.logic
  }
  return clean
}

function baseRecorte(columns, dataset) {
  return {
    id: 'sem-recorte',
    name: 'Sem recorte',
    dataset,
    system: true,
    conditionGroups: [],
    filters: [],
    sort: [],
    columns: columns.map((column) => column.key),
  }
}

function withBaseRecorte(recortes, columns, dataset) {
  const base = baseRecorte(columns, dataset)
  const normalized = normalizeRecortes(recortes, columns, dataset)
    .filter((recorte) => recorte.id !== base.id)
  return [base, ...normalized]
}

function uniqueRecorteId(name, recortes, currentId) {
  const base = slugify(name || 'recorte') || 'recorte'
  const taken = new Set(recortes.map((recorte) => recorte.id).filter((id) => id !== currentId))
  if (!taken.has(base)) return base

  let idx = 2
  while (taken.has(`${base}-${idx}`)) idx += 1
  return `${base}-${idx}`
}

function storageKey(dataset, title) {
  return `wireframe-2-recortes:${dataset || slugify(title)}`
}

function applyUrlFilter(rows, field, value, op = 'eq') {
  if (!field || value === null) return rows
  const expected = String(value).toLowerCase()

  return rows.filter((row) => {
    const actual = String(row?.[field] ?? '').toLowerCase()
    if (op === 'contains') return actual.includes(expected)
    if (op === 'neq') return actual !== expected
    return actual === expected
  })
}

function loadStoredRecortes(key, fallback, columns, dataset) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(key) || 'null')
    if (Array.isArray(stored) && stored.length) return withBaseRecorte(stored, columns, dataset)
  } catch {
    window.localStorage.removeItem(key)
  }

  return withBaseRecorte(fallback, columns, dataset)
}

function storeRecortes(key, recortes) {
  window.localStorage.setItem(key, JSON.stringify(recortes.filter((recorte) => !recorte.system).map(cleanRecorte)))
}

export default function IndexWorkspace({
  dataset,
  title,
  meta,
  actions,
  recortes,
  views,
  rows,
  columns,
  tabs = ['Dados', 'Auditoria'],
  defaultTab,
  inspectorWidth = 350,
  panelWidth = 620,
  rowTitle = (row) => row?.id,
  rowSubtitle = () => 'registro selecionado',
  inspectorItems = (row) => Object.entries(row || {}).slice(0, 8).map(([k, v]) => [k, v]),
  scopeItems,
  renderTab,
  recordActions,
  indexViews,
  defaultIndexView = 'Tabela',
  defaultPanelMode = 'inspector',
  renderIndexView,
}) {
  const { setWorkbookContext } = useWorkbookContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const fallbackRecortes = useMemo(() => recortes || views, [recortes, views])
  const recorteStorageKey = storageKey(dataset, title)
  const [recorteDefs, setRecorteDefs] = useState(() => loadStoredRecortes(recorteStorageKey, fallbackRecortes, columns, dataset))
  const requestedRecorte = searchParams.get('recorte')
  const requestedIndex = recorteDefs.findIndex((recorte) => recorte.id === requestedRecorte)
  const defaultRecorteIndex = recorteDefs.length > 1 ? 1 : 0
  const [activeRecorteIndex, setActiveRecorteIndex] = useState(requestedIndex >= 0 ? requestedIndex : defaultRecorteIndex)
  const activeRecorte = recorteDefs[activeRecorteIndex] || recorteDefs[0]
  const [draftRecorte, setDraftRecorte] = useState(null)
  const urlFilterField = searchParams.get('field')
  const urlFilterValue = searchParams.get('value')
  const urlFilterOp = searchParams.get('op') || 'eq'
  const recorteTableState = applyRecorte(rows, columns, draftRecorte || activeRecorte)
  const tableState = {
    ...recorteTableState,
    rows: applyUrlFilter(recorteTableState.rows, urlFilterField, urlFilterValue, urlFilterOp),
  }
  const [selected, setSelected] = useState(rows[0])
  const [panelMode, setPanelMode] = useState(defaultPanelMode)
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])
  const availableIndexViews = indexViews?.length ? indexViews : ['Tabela']
  const [activeIndexView, setActiveIndexView] = useState(availableIndexViews.includes(defaultIndexView) ? defaultIndexView : availableIndexViews[0])
  const [width, startResize] = useDragWidth(panelWidth)

  useEffect(() => {
    if (requestedIndex >= 0 && requestedIndex !== activeRecorteIndex) setActiveRecorteIndex(requestedIndex)
  }, [requestedIndex, activeRecorteIndex])

  useEffect(() => {
    if (!tableState.rows.some((row) => row.id === selected?.id)) setSelected(tableState.rows[0])
  }, [tableState.rows, selected])

  useEffect(() => {
    const nextView = availableIndexViews.includes(defaultIndexView) ? defaultIndexView : availableIndexViews[0]
    setActiveIndexView(nextView)
  }, [defaultIndexView])

  function selectRecorte(idx) {
    if (!recorteDefs[idx]) return
    setDraftRecorte(null)
    setActiveRecorteIndex(idx)
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('recorte', recorteDefs[idx].id)
    setSearchParams(nextParams, { replace: true })
  }

  function updateUrlForRecorte(recorte) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('recorte', recorte.id)
    setSearchParams(nextParams, { replace: true })
  }

  function startDraft(mode = 'edit') {
    const base = cloneRecorte(activeRecorte)
    const draft = {
      ...base,
      dataset,
      _draftMode: mode,
    }

    if (mode === 'new') {
      draft.name = 'Novo recorte'
      draft.id = uniqueRecorteId(draft.name, recorteDefs)
      delete draft.system
    }

    setDraftRecorte(draft)
  }

  function updateDraft(next) {
    setDraftRecorte((current) => {
      const base = current || { ...cloneRecorte(activeRecorte), dataset, _draftMode: 'edit' }
      const value = typeof next === 'function' ? next(base) : { ...base, ...next }
      return { ...value, dataset }
    })
  }

  function cancelDraft() {
    setDraftRecorte(null)
  }

  function saveDraft() {
    if (!draftRecorte?.name?.trim()) return

    const currentId = draftRecorte._draftMode === 'new' ? null : activeRecorte?.id
    const clean = cleanRecorte(draftRecorte)
    clean.name = clean.name.trim()
    clean.id = uniqueRecorteId(clean.name, recorteDefs, currentId)
    clean.dataset = dataset
    clean.conditionGroups = clean.conditionGroups || []
    clean.columns = clean.columns?.length ? clean.columns : columns.map((column) => column.key)

    const currentIndex = currentId ? recorteDefs.findIndex((recorte) => recorte.id === currentId) : -1
    const nextRecortes = currentIndex >= 0
      ? recorteDefs.map((recorte, idx) => (idx === currentIndex ? clean : recorte))
      : [...recorteDefs, clean]
    const nextIndex = currentIndex >= 0 ? currentIndex : nextRecortes.length - 1

    setRecorteDefs(nextRecortes)
    storeRecortes(recorteStorageKey, nextRecortes)
    setActiveRecorteIndex(nextIndex)
    updateUrlForRecorte(clean)
    setDraftRecorte(null)
  }

  function deleteActiveRecorte() {
    if (recorteDefs.length <= 1 || activeRecorte?.system) return
    const nextRecortes = recorteDefs.filter((_, idx) => idx !== activeRecorteIndex)
    const preferredIndex = Math.min(activeRecorteIndex, nextRecortes.length - 1)
    const nextIndex = preferredIndex === 0 && nextRecortes.length > 1 ? 1 : preferredIndex
    setRecorteDefs(nextRecortes)
    storeRecortes(recorteStorageKey, nextRecortes)
    setActiveRecorteIndex(nextIndex)
    updateUrlForRecorte(nextRecortes[nextIndex])
    setDraftRecorte(null)
  }

  function selectRow(row) {
    setSelected(row)
    if (panelMode === 'closed') setPanelMode('inspector')
  }

  function openRow(row) {
    setSelected(row)
    setPanelMode('record')
  }

  const isInspector = panelMode === 'inspector'
  const isWorkspace = panelMode === 'workspace'
  const style = isWorkspace ? undefined : { width: isInspector ? inspectorWidth : width }
  const workspaceOpen = panelMode === 'workspace'
  const commands = selected ? (typeof recordActions === 'function' ? recordActions(selected) : recordActions || []) : []
  const tableView = <DataTable columns={tableState.columns} rows={tableState.rows} groupBy={tableState.groupBy} selectedId={selected?.id} onSelect={selectRow} onOpen={openRow} noSearch />
  const indexView = renderIndexView?.({
    view: activeIndexView,
    rows: tableState.rows,
    columns: tableState.columns,
    groupBy: tableState.groupBy,
    selected,
    selectedId: selected?.id,
    onSelect: selectRow,
    onOpen: openRow,
    tableView,
    recorte: draftRecorte || activeRecorte,
  }) || tableView

  useEffect(() => {
    const selectedLabel = selected ? `Selecionado: ${rowTitle(selected)}` : 'Nenhum registro selecionado'
    const visibleCount = `${tableState.rows.length} ${tableState.rows.length === 1 ? 'registro visível' : 'registros visíveis'}`
    setWorkbookContext({
      title,
      subtitle: meta || 'contexto operacional',
      contextLine: `${title} · ${activeIndexView} · ${visibleCount} · ${selectedLabel}`,
    })

    return () => setWorkbookContext(null)
  }, [activeIndexView, meta, selected?.id, setWorkbookContext, tableState.rows.length, title])

  return (
    <div className={`record-layout ${panelMode === 'closed' ? 'panel-closed' : ''} ${workspaceOpen ? 'workspace-open' : ''}`}>
      {!workspaceOpen && (
        <div className="index-area">
          <Sheet
            title={title}
            meta={meta}
            recortes={recorteDefs}
            activeRecorte={activeRecorteIndex}
            onSelectRecorte={selectRecorte}
            draftRecorte={draftRecorte}
            onStartDraft={startDraft}
            onDraftChange={updateDraft}
            onSaveDraft={saveDraft}
            onCancelDraft={cancelDraft}
            onDeleteRecorte={deleteActiveRecorte}
            canDeleteRecorte={Boolean(activeRecorte && !activeRecorte.system)}
            actions={actions}
            rows={tableState.rows}
            columns={tableState.columns}
            allColumns={columns}
            dataset={dataset}
          >
            <div className="index-view">
              {availableIndexViews.length > 1 && (
                <div className="lens-switch">
                  <span>Modo de exibição</span>
                  {availableIndexViews.map((view) => (
                    <button className={view === activeIndexView ? 'on' : ''} type="button" key={view} onClick={() => setActiveIndexView(view)}>{view}</button>
                  ))}
                </div>
              )}
              {indexView}
            </div>
          </Sheet>
        </div>
      )}

      {panelMode !== 'closed' && selected && (
        <aside className={`record-panel ${panelMode}`} style={style}>
          {!isWorkspace && !isInspector && (
            <button className="resize-grip" type="button" aria-label="Redimensionar painel" onMouseDown={startResize} />
          )}
          <header className="record-head">
            <div>
              <span>{isInspector ? 'inspetor' : rowSubtitle(selected)}</span>
              <b>{rowTitle(selected)}</b>
            </div>
            <div className="panel-modebar">
              <button className={panelMode === 'inspector' ? 'on' : ''} onClick={() => setPanelMode('inspector')}>Inspetor</button>
              <button className={panelMode === 'record' ? 'on' : ''} onClick={() => setPanelMode('record')}>Registro</button>
              <button className={panelMode === 'workspace' ? 'on' : ''} onClick={() => setPanelMode('workspace')}>Workspace</button>
              <button onClick={() => setPanelMode('closed')}>Fechar</button>
            </div>
          </header>

          {isInspector ? (
            <>
              <FieldGrid items={inspectorItems(selected)} />
              <CommandStrip commands={commands} />
              <div className="actions">
                <button className="btn" type="button" onClick={() => setPanelMode('record')}>Abrir registro</button>
                <button className="btn sub" type="button" onClick={() => setPanelMode('workspace')}>Workspace</button>
              </div>
            </>
          ) : (
            <>
              {scopeItems && <div className="record-scope"><ScopeTrail items={scopeItems(selected)} /></div>}
              <CommandStrip commands={commands} />
              <ViewTabs items={tabs} active={tabs.indexOf(activeTab)} onSelect={setActiveTab} addView={false} />
              {renderTab?.(selected, activeTab)}
            </>
          )}
        </aside>
      )}
    </div>
  )
}
