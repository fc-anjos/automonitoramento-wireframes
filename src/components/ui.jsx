// Design-system primitives: thin wrappers over the classes in wireframe.css.
// They exist to encode structure and kill repetition; one-off styling stays as
// `className`/`style` props, which every component forwards.
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
