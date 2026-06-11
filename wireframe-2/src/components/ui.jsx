import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cx, asset } from '../lib.js'
import { conditionGroupsForRecorte, formatRecorteRecipe, recorteName } from '../recortes.js'
import { getDatasetFields, getDatasetRelations, getRelationDataset } from '../dataModel.js'

export const Sp = () => <span className="sp" />

export const Pill = ({ tone = 'label', children }) => (
  <span className={cx('pill', tone)}>{children}</span>
)

export const Button = ({ to, children, sub, tone = 'act', ...props }) => {
  const cls = cx('btn', sub && 'sub', tone)
  return to ? <Link className={cls} to={to}>{children}</Link> : <button className={cls} type="button" {...props}>{children}</button>
}

export const Panel = ({ title, meta, lead, children, className }) => (
  <section className={cx('panel', lead && 'lead', className)}>
    {(title || meta) && (
      <header>
        <b>{title}</b>
        <Sp />
        {meta}
      </header>
    )}
    <div className="body">{children}</div>
  </section>
)

export const ViewTabs = ({ items = ['Todos'], active = 0, onSelect, onAddView, addView = true }) => (
  <div className="view-tabs">
    {items.map((item, idx) => <button className={idx === active ? 'on' : ''} key={item} onClick={() => onSelect?.(item, idx)}>{item}</button>)}
    {addView && <button onClick={onAddView}>+ recorte</button>}
  </div>
)

function actionTool(action) {
  if (typeof action !== 'string') return action

  const lower = action.toLowerCase()
  if (lower.includes('recorte') || lower.includes('agrup') || lower.includes('orden') || lower.includes('ocultar') || lower.includes('coluna') || lower.includes('campo')) {
    return { label: action, tool: 'recorte' }
  }
  if (lower.includes('salvar')) return { label: action, tool: 'save-recorte' }
  if (lower.includes('export')) return { label: action, tool: 'export' }
  return { label: action, tool: 'view' }
}

const operatorOptions = [
  ['eq', '='],
  ['neq', '≠'],
  ['contains', 'contém'],
  ['notContains', 'não contém'],
  ['present', 'preenchido'],
  ['empty', 'vazio'],
  ['gt', '>'],
  ['gte', '≥'],
  ['lt', '<'],
  ['lte', '≤'],
]

const noValueOperators = new Set(['present', 'empty'])

function fieldOptions(dataset, allColumns = []) {
  const fields = getDatasetFields(dataset)
  if (fields.length) return fields
  return allColumns.map((column) => ({ key: column.key, label: column.label || column.key }))
}

function relationFieldOptions(dataset, relation) {
  return getDatasetFields(getRelationDataset(dataset, relation))
}

function asFieldFilter(filter, fallbackField) {
  return filter?.relation ? { field: fallbackField, op: 'eq', value: '' } : { field: filter?.field || fallbackField, op: filter?.op || 'eq', value: filter?.value ?? '' }
}

function asRelationFilter(filter, dataset, fallbackRelation) {
  const relation = filter?.relation || fallbackRelation
  const relationFields = relationFieldOptions(dataset, relation)
  const fallbackField = relationFields[0]?.key || 'id'
  return {
    relation,
    mode: filter?.mode || 'some',
    where: filter?.where || { field: fallbackField, op: 'eq', value: '' },
  }
}

function newConditionBlock(idx, filters = []) {
  return {
    id: `bloco-${Date.now().toString(36)}-${idx + 1}`,
    name: `Bloco ${idx + 1}`,
    logic: 'all',
    filters,
  }
}

function builderConditionGroups(recorte) {
  const groups = conditionGroupsForRecorte(recorte)
  return groups.length ? groups : [{ id: 'bloco-1', name: 'Bloco 1', logic: 'all', filters: [] }]
}

function countLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}

function LogicToggle({ value, onChange, allLabel, anyLabel }) {
  return (
    <div className="logic-toggle">
      <button className={value !== 'any' ? 'on' : ''} type="button" onClick={() => onChange('all')}>{allLabel}</button>
      <button className={value === 'any' ? 'on' : ''} type="button" onClick={() => onChange('any')}>{anyLabel}</button>
    </div>
  )
}

function relationModeValue(filter) {
  const mode = filter.mode || 'some'
  if (mode === 'none' && !filter.where) return 'none'
  if (mode === 'none') return 'noneWhere'
  return mode
}

function relationModeFilter(filter, dataset, relation, value) {
  if (value === 'none') return { relation, mode: 'none' }

  const nextMode = value === 'noneWhere' ? 'none' : value
  const relationFields = relationFieldOptions(dataset, relation)
  const fallbackField = relationFields[0]?.key || 'id'
  return {
    ...asRelationFilter(filter, dataset, relation),
    relation,
    mode: nextMode,
    where: filter.where || { field: fallbackField, op: 'eq', value: '' },
  }
}

function ConditionRule({
  filter,
  idx,
  joiner,
  dataset,
  fields,
  relations,
  fallbackField,
  fallbackRelation,
  onChange,
  onRemove,
}) {
  const isRelation = Boolean(filter.relation)
  const relation = filter.relation || fallbackRelation
  const relationFields = relationFieldOptions(dataset, relation)
  const where = filter.where || { field: relationFields[0]?.key || 'id', op: 'eq', value: '' }
  const operator = isRelation ? where.op || 'eq' : filter.op || 'eq'
  const modeValue = isRelation ? relationModeValue(filter) : 'some'
  const showRelationWhere = modeValue !== 'none'

  return (
    <div className={cx('condition-rule', isRelation && 'relation')}>
      <span className="rule-joiner">{idx === 0 ? 'SE' : joiner}</span>
      <select value={isRelation ? 'relation' : 'field'} onChange={(event) => onChange(event.target.value === 'relation' ? asRelationFilter(filter, dataset, fallbackRelation) : asFieldFilter(filter, fallbackField))}>
        <option value="field">Campo do registro</option>
        <option value="relation" disabled={!relations.length}>Relação</option>
      </select>

      {isRelation ? (
        <>
          <select value={relation} onChange={(event) => onChange(asRelationFilter({ ...filter, relation: event.target.value, where: null }, dataset, event.target.value))}>
            {relations.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
          <select value={modeValue} onChange={(event) => onChange(relationModeFilter(filter, dataset, relation, event.target.value))}>
            <option value="some">existe com</option>
            <option value="noneWhere">não existe com</option>
            <option value="none">não existe</option>
            <option value="every">todos atendem</option>
          </select>
          {showRelationWhere && (
            <>
              <select value={where.field || relationFields[0]?.key || ''} onChange={(event) => onChange({ ...filter, where: { ...where, field: event.target.value } })}>
                {relationFields.map((field) => <option key={field.key} value={field.key}>{field.label}</option>)}
              </select>
              <select value={operator} onChange={(event) => onChange({ ...filter, where: { ...where, op: event.target.value } })}>
                {operatorOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <input value={where.value ?? ''} disabled={noValueOperators.has(operator)} onChange={(event) => onChange({ ...filter, where: { ...where, value: event.target.value } })} />
            </>
          )}
        </>
      ) : (
        <>
          <select value={filter.field || fallbackField} onChange={(event) => onChange({ ...filter, field: event.target.value })}>
            {fields.map((field) => <option key={field.key} value={field.key}>{field.label}</option>)}
          </select>
          <select value={operator} onChange={(event) => onChange({ ...filter, op: event.target.value })}>
            {operatorOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <input value={filter.value ?? ''} disabled={noValueOperators.has(operator)} onChange={(event) => onChange({ ...filter, value: event.target.value })} />
        </>
      )}

      <button className="mini danger" type="button" onClick={onRemove}>remover</button>
    </div>
  )
}

function RecorteBuilder({
  draft,
  recorte,
  allColumns = [],
  rows = [],
  dataset,
  onDraftChange,
  onSaveDraft,
  onCancelDraft,
  onDeleteRecorte,
  canDeleteRecorte,
}) {
  const current = draft || recorte
  const fields = fieldOptions(dataset, allColumns)
  const relations = getDatasetRelations(dataset)
  const conditionGroups = builderConditionGroups(current)
  const sort = current?.sort || []
  const visibleKeys = new Set(current?.columns || allColumns.map((column) => column.key))
  const fallbackField = fields[0]?.key || allColumns[0]?.key || 'id'
  const fallbackRelation = relations[0]?.key
  const isNew = current?._draftMode === 'new'
  const canSave = Boolean(current?.name?.trim())
  const blockConnector = current?.conditionLogic === 'any' ? 'OU' : 'E'

  const patch = (next) => onDraftChange(typeof next === 'function' ? (draftNow) => next(draftNow || current) : { ...current, ...next })
  const patchConditionGroups = (next, extra = {}) => patch((draftNow) => ({
    ...draftNow,
    ...extra,
    conditionGroups: next,
    filters: undefined,
    logic: undefined,
  }))
  const patchSort = (next) => patch({ sort: next })

  function updateGroup(groupIdx, next) {
    patchConditionGroups(conditionGroups.map((group, idx) => (idx === groupIdx ? { ...group, ...next } : group)))
  }

  function updateGroupFilters(groupIdx, nextFilters) {
    updateGroup(groupIdx, { filters: nextFilters })
  }

  function updateFilter(groupIdx, filterIdx, next) {
    const group = conditionGroups[groupIdx]
    updateGroupFilters(groupIdx, group.filters.map((filter, idx) => (idx === filterIdx ? next : filter)))
  }

  function addFieldFilter(groupIdx) {
    const group = conditionGroups[groupIdx]
    updateGroupFilters(groupIdx, [...group.filters, { field: fallbackField, op: 'eq', value: '' }])
  }

  function addRelationFilter(groupIdx) {
    if (!fallbackRelation) return
    const group = conditionGroups[groupIdx]
    updateGroupFilters(groupIdx, [...group.filters, asRelationFilter(null, dataset, fallbackRelation)])
  }

  function addConditionGroup() {
    const next = [
      ...conditionGroups,
      newConditionBlock(conditionGroups.length, [{ field: fallbackField, op: 'eq', value: '' }]),
    ]
    patchConditionGroups(next, { conditionLogic: current?.conditionLogic || 'any' })
  }

  function removeConditionGroup(groupIdx) {
    const next = conditionGroups.filter((_, idx) => idx !== groupIdx)
    patchConditionGroups(next.length ? next : [{ id: 'bloco-1', name: 'Bloco 1', logic: 'all', filters: [] }])
  }

  function updateSort(idx, next) {
    patchSort(sort.map((rule, ruleIdx) => (ruleIdx === idx ? next : rule)))
  }

  function updateColumns(key, checked) {
    const next = checked
      ? [...visibleKeys, key]
      : [...visibleKeys].filter((item) => item !== key)
    patch({ columns: next.length ? next : [key] })
  }

  return (
    <div className="tool-panel recorte-builder">
      <header>
        <b>{isNew ? 'Novo recorte' : 'Editar recorte'}</b>
        <span>{countLabel(rows.length, 'registro na prévia', 'registros na prévia')}</span>
      </header>

      <div className="builder-top">
        <label>
          <span>Nome</span>
          <input value={current?.name || ''} onChange={(event) => patch({ name: event.target.value })} />
        </label>
        <label>
          <span>Agrupar linhas por</span>
          <select value={Array.isArray(current?.groupBy) ? current.groupBy[0] : current?.groupBy || ''} onChange={(event) => patch({ groupBy: event.target.value || undefined })}>
            <option value="">sem agrupamento</option>
            {fields.map((field) => <option key={field.key} value={field.key}>{field.label}</option>)}
          </select>
        </label>
      </div>

      <section className="builder-section condition-builder">
        <div className="builder-section-head">
          <div>
            <b>Condições</b>
            <span>Mostrar registros quando</span>
          </div>
          <div>
            {conditionGroups.length > 1 && (
              <LogicToggle
                value={current?.conditionLogic || 'all'}
                onChange={(value) => patch({ conditionLogic: value })}
                allLabel="todos os blocos"
                anyLabel="pelo menos um bloco"
              />
            )}
            <button className="mini" type="button" onClick={addConditionGroup}>+ bloco</button>
          </div>
        </div>
        <div className="condition-blocks">
          {conditionGroups.map((group, groupIdx) => {
            const rowConnector = group.logic === 'any' ? 'OU' : 'E'
            return (
              <div className="condition-block-wrap" key={group.id || groupIdx}>
                {groupIdx > 0 && <button className="condition-connector" type="button" onClick={() => patch({ conditionLogic: current?.conditionLogic === 'any' ? 'all' : 'any' })}>{blockConnector}</button>}
                <div className="condition-block">
                  <header>
                    <div>
                      <b>{group.name || `Bloco ${groupIdx + 1}`}</b>
                      <span>{countLabel(group.filters.length, 'condição', 'condições')}</span>
                    </div>
                    <LogicToggle
                      value={group.logic || 'all'}
                      onChange={(value) => updateGroup(groupIdx, { logic: value })}
                      allLabel="todas"
                      anyLabel="qualquer"
                    />
                    <div>
                      <button className="mini" type="button" onClick={() => addFieldFilter(groupIdx)}>+ campo</button>
                      <button className="mini" type="button" onClick={() => addRelationFilter(groupIdx)} disabled={!relations.length}>+ relação</button>
                      <button className="mini danger" type="button" disabled={conditionGroups.length <= 1} onClick={() => removeConditionGroup(groupIdx)}>remover bloco</button>
                    </div>
                  </header>
                  <div className="builder-rules">
                    {group.filters.map((filter, filterIdx) => (
                      <ConditionRule
                        key={`${group.id}-${filterIdx}`}
                        filter={filter}
                        idx={filterIdx}
                        joiner={rowConnector}
                        dataset={dataset}
                        fields={fields}
                        relations={relations}
                        fallbackField={fallbackField}
                        fallbackRelation={fallbackRelation}
                        onChange={(next) => updateFilter(groupIdx, filterIdx, next)}
                        onRemove={() => updateGroupFilters(groupIdx, group.filters.filter((_, idx) => idx !== filterIdx))}
                      />
                    ))}
                    {!group.filters.length && <div className="builder-empty">Sem condições neste bloco.</div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="builder-section organization-builder">
        <div className="builder-section-head">
          <b>Ordenação</b>
          <button className="mini" type="button" onClick={() => patchSort([...sort, { field: fallbackField, dir: 'asc' }])}>+ ordenar</button>
        </div>
        <div className="builder-sort">
          {sort.map((rule, idx) => {
            const field = rule.field || rule.key || fallbackField
            return (
              <div className="builder-sort-row" key={`${idx}-${field}`}>
                <b>{idx + 1}</b>
                <select value={field} onChange={(event) => updateSort(idx, { ...rule, field: event.target.value })}>
                  {fields.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
                <select value={rule.dir || 'asc'} onChange={(event) => updateSort(idx, { ...rule, dir: event.target.value })}>
                  <option value="asc">crescente</option>
                  <option value="desc">decrescente</option>
                </select>
                <button className="mini danger" type="button" onClick={() => patchSort(sort.filter((_, sortIdx) => sortIdx !== idx))}>remover</button>
              </div>
            )
          })}
          {!sort.length && <div className="builder-empty">Sem ordenação própria.</div>}
        </div>
      </section>

      <section className="builder-section">
        <div className="builder-section-head">
          <b>Colunas</b>
          <div>
            <button className="mini" type="button" onClick={() => patch({ columns: allColumns.map((column) => column.key) })}>todas</button>
            <button className="mini" type="button" onClick={() => patch({ columns: [allColumns[0]?.key].filter(Boolean) })}>mínimo</button>
          </div>
        </div>
        <div className="column-builder">
          {allColumns.map((column) => (
            <label key={column.key}>
              <input type="checkbox" checked={visibleKeys.has(column.key)} onChange={(event) => updateColumns(column.key, event.target.checked)} />
              <span>{column.label || column.key}</span>
              <button className="mini" type="button" disabled>{visibleKeys.has(column.key) ? 'visível' : 'oculta'}</button>
            </label>
          ))}
        </div>
      </section>

      <div className="builder-actions">
        <button className="btn" type="button" disabled={!canSave} onClick={onSaveDraft}>{isNew ? 'Salvar recorte' : 'Atualizar recorte'}</button>
        <button className="btn sub" type="button" onClick={onCancelDraft}>Cancelar</button>
        <button className="btn sub danger" type="button" disabled={!canDeleteRecorte || isNew} onClick={onDeleteRecorte}>Excluir recorte</button>
      </div>
    </div>
  )
}

function ViewRail({ recortes = [], activeRecorte, onSelectRecorte, onAddRecorte, onEditRecorte, title, collapsed, onToggle, columns = [], dataset, editor }) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const active = recortes[activeRecorte] || recortes[0]
  const base = recortes.find((recorte) => recorte.system)
  const showBase = base && (!needle || recorteName(base).toLowerCase().includes(needle))
  const savedItems = recortes.filter((recorte) => !recorte.system)
  const items = needle ? savedItems.filter((recorte) => recorteName(recorte).toLowerCase().includes(needle)) : savedItems

  if (collapsed) {
    return (
      <aside className="view-rail collapsed">
        <button className="rail-opener" type="button" onClick={onToggle}>
          <span>Recortes</span>
          <b>{recorteName(active)}</b>
        </button>
      </aside>
    )
  }

  return (
    <aside className="view-rail">
      <header>
        <div>
          <b>Recortes</b>
          <span>{title}</span>
        </div>
        <button type="button" onClick={onToggle}>Ocultar</button>
        <button type="button" onClick={onAddRecorte}>Novo</button>
      </header>
      <label className="view-search">
        <span>⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar recorte..." />
      </label>
      <div className="active-view-card">
        <div className="active-view-head">
          <span>recorte atual</span>
          <b>{recorteName(active)}</b>
        </div>
        <small>{formatRecorteRecipe(active, columns, dataset)}</small>
        <div className="active-view-actions">
          {!active?.system && <button className="mini" type="button" onClick={onEditRecorte}>Editar recorte</button>}
          <button className="mini" type="button" onClick={onAddRecorte}>{active?.system ? 'Criar recorte' : 'Novo recorte'}</button>
        </div>
      </div>
      {editor || (
        <>
          {showBase && (
            <div className="view-rail-group">
              <span>Base</span>
              <button className={recortes.indexOf(base) === activeRecorte ? 'on' : ''} type="button" onClick={() => onSelectRecorte(recortes.indexOf(base))}>
                <span className="view-row-head"><b>{base.name}</b></span>
                <small>{formatRecorteRecipe(base, columns, dataset)}</small>
                <em>sem configuração salva</em>
              </button>
            </div>
          )}
          <div className="view-rail-group">
            <span>Recortes salvos</span>
            {items.map((recorte) => {
              const idx = recortes.indexOf(recorte)
              return (
                <button className={idx === activeRecorte ? 'on' : ''} type="button" key={recorte.id} onClick={() => onSelectRecorte(idx)}>
                  <span className="view-row-head"><b>{recorte.name}</b></span>
                  <small>{formatRecorteRecipe(recorte, columns, dataset)}</small>
                  <em>{recorte.groupBy ? 'filtro · campos · ordem · grupo' : 'filtro · campos · ordem'}</em>
                </button>
              )
            })}
            {!items.length && <div className="builder-empty">Nenhum recorte salvo encontrado.</div>}
          </div>
        </>
      )}
    </aside>
  )
}

function ToolPanel({ tool, allColumns = [], rows = [], recorte, draftRecorte, dataset, onDraftChange, onSaveDraft, onCancelDraft, onDeleteRecorte, canDeleteRecorte }) {
  const hasRows = rows.length > 0

  if (!tool) return null

  if (['recorte', 'save-recorte', 'filter', 'columns', 'sort', 'group', 'save-view'].includes(tool.type)) {
    return (
      <RecorteBuilder
        draft={draftRecorte}
        recorte={recorte}
        allColumns={allColumns}
        rows={rows}
        dataset={dataset}
        onDraftChange={onDraftChange}
        onSaveDraft={onSaveDraft}
        onCancelDraft={onCancelDraft}
        onDeleteRecorte={onDeleteRecorte}
        canDeleteRecorte={canDeleteRecorte}
      />
    )
  }

  if (tool.type === 'export') {
    return (
      <div className="tool-panel">
        <header><b>Exportação auditada</b><span>recorte atual</span></header>
        <div className="tool-grid">
          <label><span>Formato</span><button className="select">CSV ou PDF ▾</button></label>
          <div className="readonly-field"><span>Escopo</span><b>{recorteName(recorte)} · {rows.length} registros</b></div>
          <label><span>Finalidade</span><input placeholder="motivo do uso interno" /></label>
        </div>
        <div className="command-strip inline">
          <div className="command-item"><button className="btn" type="button" disabled={!hasRows}>Exportar CSV</button>{!hasRows && <small>sem linhas no recorte</small>}</div>
          <div className="command-item"><button className="btn sub" type="button" disabled={!hasRows}>Gerar PDF</button>{!hasRows && <small>sem linhas no recorte</small>}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="tool-panel">
      <header><b>{tool.label}</b><span>comando do índice</span></header>
    </div>
  )
}

export const Sheet = ({
  title,
  meta,
  recortes,
  activeRecorte,
  onSelectRecorte,
  draftRecorte,
  onStartDraft,
  onDraftChange,
  onSaveDraft,
  onCancelDraft,
  onDeleteRecorte,
  canDeleteRecorte,
  actions,
  columns,
  allColumns = columns,
  rows,
  dataset,
  children,
}) => {
  const [tool, setTool] = useState(null)
  const [railOpen, setRailOpen] = useState(() => window.localStorage.getItem('wireframe-view-rail-open') !== 'false')
  const builderTools = new Set(['recorte', 'save-recorte', 'filter', 'columns', 'sort', 'group', 'save-view'])
  const builderOpen = tool && builderTools.has(tool.type)
  const openTool = (type, label) => {
    const isBuilder = builderTools.has(type)
    if (isBuilder) {
      if (!draftRecorte) onStartDraft?.(type === 'save-recorte' || type === 'save-view' ? 'new' : 'edit')
      setRailOpen(true)
      window.localStorage.setItem('wireframe-view-rail-open', 'true')
    }
    setTool((current) => {
      if (current?.type === type && current?.label === label) {
        if (isBuilder) onCancelDraft?.()
        return null
      }
      return { type, label }
    })
  }
  const normalizedActions = (actions || []).map(actionTool)
  const currentRecorte = draftRecorte || recortes[activeRecorte] || recortes[0]
  const toggleRail = () => {
    setRailOpen((current) => {
      const next = !current
      window.localStorage.setItem('wireframe-view-rail-open', String(next))
      return next
    })
  }
  const addView = () => {
    onStartDraft?.('new')
    setRailOpen(true)
    window.localStorage.setItem('wireframe-view-rail-open', 'true')
    setTool({ type: 'save-recorte', label: 'Novo recorte' })
  }
  const editView = () => openTool('recorte', 'Editar recorte')
  const selectView = (idx) => {
    setTool(null)
    onCancelDraft?.()
    onSelectRecorte?.(idx)
  }
  const railEditor = builderOpen ? (
    <ToolPanel
      tool={tool}
      allColumns={allColumns}
      rows={rows}
      recorte={currentRecorte}
      draftRecorte={draftRecorte}
      dataset={dataset}
      onDraftChange={onDraftChange}
      onSaveDraft={() => {
        onSaveDraft?.()
        setTool(null)
      }}
      onCancelDraft={() => {
        onCancelDraft?.()
        setTool(null)
      }}
      onDeleteRecorte={() => {
        onDeleteRecorte?.()
        setTool(null)
      }}
      canDeleteRecorte={canDeleteRecorte}
    />
  ) : null

  return (
    <section className="sheet">
      <div className="sheet-head">
        <div>
          <span>tabela</span>
          <b>{title}</b>
        </div>
        {meta && <Pill>{meta}</Pill>}
      </div>
      <Toolbar onOpenTool={openTool}>
        {normalizedActions.map((action) => (
          <button
            className="select"
            key={action.label}
            disabled={action.disabled}
            title={action.disabled ? action.reason : undefined}
            onClick={() => openTool(action.tool || 'view', action.label)}
          >
            {action.label}
          </button>
        ))}
      </Toolbar>
      {!builderOpen && <ToolPanel
        tool={tool}
        allColumns={allColumns}
        rows={rows}
        recorte={currentRecorte}
        draftRecorte={draftRecorte}
        dataset={dataset}
        onDraftChange={onDraftChange}
        onSaveDraft={() => {
          onSaveDraft?.()
          setTool(null)
        }}
        onCancelDraft={() => {
          onCancelDraft?.()
          setTool(null)
        }}
        onDeleteRecorte={() => {
          onDeleteRecorte?.()
          setTool(null)
        }}
        canDeleteRecorte={canDeleteRecorte}
      />}
      <div className={cx('sheet-body', 'with-rail', !railOpen && 'rail-closed', builderOpen && 'rail-editing')}>
        <ViewRail recortes={recortes} activeRecorte={activeRecorte} onSelectRecorte={selectView} onAddRecorte={addView} onEditRecorte={editView} title={title} collapsed={!railOpen} onToggle={toggleRail} columns={allColumns} dataset={dataset} editor={railEditor} />
        {children}
      </div>
    </section>
  )
}

export const Stat = ({ label, value, sub, to }) => {
  const content = (
    <>
      <span>{label}</span>
      <b>{value}</b>
      {sub && <small>{sub}</small>}
    </>
  )

  return to ? (
    <Link className="stat stat-link" to={to}>
      {content}
    </Link>
  ) : (
    <div className="stat">
      {content}
    </div>
  )
}

export const Toolbar = ({ children, onOpenTool }) => (
  <div className="toolbar">
    <label className="search">
      <span>⌕</span>
      <input placeholder="Buscar por ponto, outorgado, protocolo..." />
    </label>
    <Sp />
    {children}
    <button className="select" onClick={() => onOpenTool?.('export', 'Exportar')}>Exportar</button>
  </div>
)

export const CommandStrip = ({ commands = [] }) => {
  if (!commands.length) return null

  return (
    <div className="command-strip">
      {commands.map((command) => {
        const enabled = command.enabled !== false
        return (
          <div className="command-item" key={command.label}>
            <button className={cx('btn', command.sub && 'sub')} type="button" disabled={!enabled} title={!enabled ? command.reason : command.note}>
              {command.label}
            </button>
            {!enabled && command.reason && <small>{command.reason}</small>}
          </div>
        )
      })}
    </div>
  )
}

export const DataTable = ({ columns, rows, selectedId, onSelect, onOpen, compact, noSearch, groupBy }) => {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!needle) return rows
    return rows.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(needle)))
  }, [needle, rows])
  const grouped = useMemo(() => {
    if (!groupBy) return filtered.map((row) => ({ type: 'row', row }))
    const buckets = new Map()
    const groupFields = Array.isArray(groupBy) ? groupBy : [groupBy]
    for (const row of filtered) {
      const value = groupFields.map((field) => row[field] || '-').join(' > ')
      if (!buckets.has(value)) buckets.set(value, [])
      buckets.get(value).push(row)
    }

    return Array.from(buckets.entries()).flatMap(([value, groupRows]) => [
      { type: 'group', value, count: groupRows.length },
      ...groupRows.map((row) => ({ type: 'row', row })),
    ])
  }, [filtered, groupBy])

  return (
    <div className={cx('datatable', compact && 'compact')}>
      {!noSearch && <div className="table-search">
        <label className="search">
          <span>⌕</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filtrar linhas..." />
        </label>
        <span className="count">{filtered.length} registros</span>
      </div>}
      <table>
        <thead>
          <tr>{columns.map((col) => <th key={col.key} className={col.num ? 'num' : undefined}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {grouped.map((item) => item.type === 'group' ? (
            <tr className="group-row" key={`group-${item.value}`}>
              <td colSpan={columns.length}><b>{item.value}</b><span>{item.count} registros</span></td>
            </tr>
          ) : (
            <tr
              key={item.row.id}
              className={cx(onSelect && 'clickable', selectedId === item.row.id && 'selected')}
              onClick={() => onSelect?.(item.row)}
              onDoubleClick={() => onOpen?.(item.row)}
            >
              {columns.map((col) => <td key={col.key} className={col.num ? 'num' : undefined}>{col.render ? col.render(item.row) : item.row[col.key]}</td>)}
            </tr>
          ))}
          {!grouped.length && (
            <tr className="empty-row">
              <td colSpan={columns.length}>Nenhum registro neste recorte.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const Detail = ({ record, title, children }) => (
  <aside className="detail">
    <div className="detail-head">
      <span>registro selecionado</span>
      <b>{title || record?.id || 'Selecione uma linha'}</b>
    </div>
    {record ? children : <div className="empty">Clique em uma linha para abrir a ficha lateral.</div>}
  </aside>
)

export const Tabs = ({ items }) => (
  <div className="tabs">{items.map((item, idx) => <button className={idx === 0 ? 'on' : ''} key={item}>{item}</button>)}</div>
)

export const Chart = ({ title, type = 'bars' }) => (
  <div className={cx('chart', type)}>
    <div className="chart-title">{title}</div>
    {type === 'line' ? (
      <svg viewBox="0 0 500 150" role="img" aria-label={title}>
        <path d="M18 115 C75 95, 102 122, 150 78 S230 54, 286 75 S360 130, 478 42" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M18 92 C90 88, 142 90, 202 80 S338 72, 478 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M18 54 C94 62, 160 52, 228 58 S360 45, 478 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 7" />
      </svg>
    ) : (
      <div className="bars">{[58, 86, 42, 72, 66, 31, 91, 48].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
    )}
  </div>
)

export const MapSketch = () => (
  <div className="map-sketch">
    <object type="image/svg+xml" data={asset('wireframe-mapa-bacia.svg')} aria-label="Mapa da bacia" />
    <div className="map-tools">
      <button className="select">Camadas ▾</button>
      <button className="select">Tabela vinculada</button>
      <button className="select">Seleção por polígono</button>
    </div>
  </div>
)

export const FieldGrid = ({ items }) => (
  <div className="fields">
    {items.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
  </div>
)
