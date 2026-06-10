// Design-system primitives: thin wrappers over the classes in wireframe.css.
// They exist to encode structure and kill repetition; one-off styling stays as
// `className`/`style` props, which every component forwards.
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { cx, asset } from '../lib.js'

// ---- layout ---------------------------------------------------------------
export const Wrap = ({ stack, className, children, ...p }) => (
  <div className={cx('wrap', stack && 'stack', className)} {...p}>{children}</div>
)
export const Stack = ({ className, children, ...p }) => (
  <div className={cx('stack', className)} {...p}>{children}</div>
)
export const Row = ({ className, children, ...p }) => (
  <div className={cx('row', className)} {...p}>{children}</div>
)
// cols: 2 | 3 | 4  ->  g-2 / g-3 / g-4
export const Grid = ({ cols, className, children, ...p }) => (
  <div className={cx('grid', cols && `g-${cols}`, className)} {...p}>{children}</div>
)
export const Bento = ({ className, children, ...p }) => (
  <div className={cx('bento', className)} {...p}>{children}</div>
)
// 12-col bento cell that stacks panels (the side rail)
export const Zone = ({ col, className, children, ...p }) => (
  <div className={cx('zone', col && `col-${col}`, className)} {...p}>{children}</div>
)
// flex spacer
export const Sp = (p) => <span className="sp" {...p} />

// ---- surfaces -------------------------------------------------------------
export const Card = ({ kpi, col, className, children, ...p }) => (
  <div className={cx('card', kpi && 'kpi', col && `col-${col}`, className)} {...p}>{children}</div>
)

// Panel with optional sketched header. `header` is JSX (may contain <Sp/> + pills).
export const Panel = ({ lead, col, header, className, children, ...p }) => (
  <div className={cx('panel', lead && 'lead', col && `col-${col}`, className)} {...p}>
    {header != null && <header>{header}</header>}
    {children}
  </div>
)
// panel inner padding wrapper
export const Body = ({ stack, className, children, ...p }) => (
  <div className={cx('body', stack && 'stack', className)} {...p}>{children}</div>
)

export const Note = ({ col, className, children, ...p }) => (
  <div className={cx('note', col && `col-${col}`, className)} {...p}>{children}</div>
)

// ---- tags / buttons -------------------------------------------------------
// variant: 'act' | 'ok' | 'warn' | 'bad' | 'label'
export const Pill = ({ variant, className, children, ...p }) => (
  <span className={cx('pill', variant, className)} {...p}>{children}</span>
)

// A navigating Btn passes `to` (renders <Link>, gets the pointer affordance);
// a decorative/dead Btn omits it (renders <a> with no href, cursor stays default).
export const Btn = ({ to, variant, block, lg, sub, ghost, className, children, ...p }) => {
  const cls = cx('btn', block && 'block', lg && 'lg', sub && 'sub', ghost && 'ghost', variant, className)
  return to
    ? <Link className={cls} to={to} {...p}>{children}</Link>
    : <a className={cls} {...p}>{children}</a>
}

// ---- mutation verb → low-fidelity dispatch modal ---------------------------
// action verbs never navigate: clicking opens a sketched stub of the despacho
// form (required inputs + the legal effect in a note), instead of teleporting
// to an unrelated screen. `pill` keeps the pill look for lr-top / table cells.
export const Verb = ({ label, variant, fields = ['Justificativa do despacho…'], note, confirm, pill, className, style }) => {
  const [open, setOpen] = useState(false)
  // verbs act (open the stub), so they earn the pointer affordance
  const trigger = { cursor: 'pointer', ...style }
  return (
    <>
      {pill
        ? <a className={cx('pill', variant, className)} style={trigger} onClick={() => setOpen(true)}>{label}</a>
        : <Btn variant={variant} className={className} style={trigger} onClick={() => setOpen(true)}>{label}</Btn>}
      {open && (
        <div className="veil" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">{label}</div>
            {fields.map((f) => (
              <div key={f} className="input" style={f.endsWith('…') ? { minHeight: 64, alignItems: 'flex-start' } : { minHeight: 34 }}>
                <span className="faint">{f}</span>
              </div>
            ))}
            {note && <Note style={{ fontSize: 12 }}>{note}</Note>}
            <div className="modal-foot">Esboço de baixa fidelidade · campos ilustrativos; o formulário definitivo será especificado no detalhamento do TR.</div>
            <Row style={{ gap: 8, justifyContent: 'flex-end' }}>
              <Btn sub onClick={() => setOpen(false)}>Cancelar</Btn>
              <Btn variant="act" onClick={() => setOpen(false)}>{confirm || label}</Btn>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

// ---- meter / progress -----------------------------------------------------
// value: CSS width string e.g. '58%'. variant: 'warn' | 'bad'
export const Meter = ({ value, variant, className, ...p }) => (
  <div className={cx('meter', variant, className)} {...p}><i style={{ width: value }} /></div>
)

// ---- embedded SVG chart / map (public/assets) -----------------------------
// src: filename only. ratio: e.g. '520/300'. label -> aria-label.
export const Svg = ({ src, label, ratio, className, style, ...p }) => (
  <object
    type="image/svg+xml"
    data={asset(src)}
    aria-label={label}
    className={className}
    style={{ display: 'block', width: '100%', aspectRatio: ratio, ...style }}
    {...p}
  />
)

// ---- data table: search + pagination + count + empty state ----------------
// The affordances a sketched <table> lacks once the row count is unknown:
// a search box that filters live, a result count, client pagination and an
// empty state. Built for wireframe sample data, not a production grid.
//   columns: [{ key, label, num, cls, render(row) }]  render defaults to row[key]
//   rows:    object[]  (a row may carry `onClick` to navigate, and `id` as key)
//   search:  array of row keys to match; presence enables the search box
//   universe: real total behind the loaded sample, shown as context in the count
export function DataTable({
  columns, rows, pageSize = 6, search, searchPlaceholder = 'Buscar…',
  universe, empty = 'Nenhum resultado.', className,
}) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const needle = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!search || !needle) return rows
    return rows.filter((r) => search.some((k) => String(r[k] ?? '').toLowerCase().includes(needle)))
  }, [rows, search, needle])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pageCount - 1)
  const start = current * pageSize
  const slice = filtered.slice(start, start + pageSize)

  const count = needle
    ? `${filtered.length} de ${rows.length}`
    : universe != null ? `${rows.length} de ${universe}`
    : `${rows.length} ${rows.length === 1 ? 'registro' : 'registros'}`

  return (
    <div className={cx('dt', className)}>
      {search && (
        <div className="dt-toolbar">
          <label className="input search" style={{ minHeight: 34 }}>
            <span className="faint" aria-hidden>⌕</span>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0) }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </label>
          <Sp />
          <span className="dt-count muted">{count}</span>
        </div>
      )}
      <table className="table">
        <thead><tr>{columns.map((c) => <th key={c.key} className={c.num ? 'num' : undefined}>{c.label}</th>)}</tr></thead>
        <tbody>
          {slice.length === 0
            ? <tr><td className="dt-empty muted" colSpan={columns.length}>{empty}</td></tr>
            : slice.map((r, i) => (
              <tr
                key={r.id ?? start + i}
                className={r.onClick ? 'dt-rowlink' : undefined}
                onClick={r.onClick}
                style={r.onClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map((c) => (
                  <td key={c.key} className={cx(c.num && 'num', c.cls)}>{c.render ? c.render(r) : r[c.key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {pageCount > 1 && (
        <div className="dt-pager">
          <button type="button" className="pill" disabled={current === 0} onClick={() => setPage(current - 1)} aria-label="Página anterior">‹</button>
          <span className="muted">{start + 1}–{Math.min(start + pageSize, filtered.length)} de {filtered.length}</span>
          <button type="button" className="pill" disabled={current >= pageCount - 1} onClick={() => setPage(current + 1)} aria-label="Próxima página">›</button>
          <Sp />
          <span className="faint">pág. {current + 1} / {pageCount}</span>
        </div>
      )}
    </div>
  )
}
