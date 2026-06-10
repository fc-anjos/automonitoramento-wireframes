// Repeated chrome shared across screens: the draft banner, the mobile phone
// frame (app surface) and the gestor web shell with its sidebar nav.
import { Link } from 'react-router-dom'
import { cx } from '../lib.js'
import { Sp } from './ui.jsx'

// ---- COMMUNICATION: draft banner (every screen) ---------------------------
// tag e.g. "APP · 01" / "GESTOR" ; title bold ; right = trailing context note.
export const DraftBanner = ({ tag, title, right = 'Rascunho · dados fictícios' }) => (
  <div className="wf-banner">
    <Link to="/">‹ Índice</Link>
    <span>{tag}</span>
    <b>{title}</b>
    <Sp />
    <span>{right}</span>
  </div>
)

// =========================================================================
// APP surface: sketched phone
// =========================================================================
export const Phone = ({ children }) => (
  <div className="phone"><div className="screen">{children}</div></div>
)
export const Notch = () => <div className="notch" />
export const StatusBar = ({ left = '9:41', right = '▰▰▰ 5G ▮' }) => (
  <div className="statusbar"><span>{left}</span><span>{right}</span></div>
)
export const PScroll = ({ className, children, ...p }) => (
  <div className={cx('pscroll', className)} {...p}>{children}</div>
)
export const HomeBar = () => <div className="homebar" />
export const PhoneLabel = ({ children }) => <div className="phone-label">{children}</div>

// AppBar. `back`: route string -> back link; `back` true -> dead back arrow.
// `menu`: true -> trailing hamburger pushed right (painel pattern).
export const AppBar = ({ title, back, menu }) => (
  <div className="appbar">
    {back && (typeof back === 'string'
      ? <Link className="back" to={back} style={{ textDecoration: 'none' }}>‹</Link>
      : <div className="back">‹</div>)}
    <h2>{title}</h2>
    {menu && <><span className="sp" style={{ flex: 1 }} /><div className="back">≡</div></>}
  </div>
)

// Bottom tab bar: identical across every app screen; only `active` differs.
const APP_TABS = [
  { key: 'inicio', label: 'Início', to: '/app/painel' },
  { key: 'captacao', label: 'Captação', to: '/app/telemetria' },
  { key: 'apontamentos', label: 'Apontamentos', to: '/app/apontamentos' },
  { key: 'pagamentos', label: 'Pagamentos', to: '/app/pagamentos' },
  { key: 'perfil', label: 'Perfil', to: null }, // dead (was href="#")
]
export const AppTabBar = ({ active }) => (
  <div className="tabbar">
    {APP_TABS.map((t) => {
      const cls = cx('tab', active === t.key && 'on')
      const inner = <><div className="ic" />{t.label}</>
      return t.to
        ? <Link key={t.key} className={cls} to={t.to}>{inner}</Link>
        : <a key={t.key} className={cls}>{inner}</a>
    })}
  </div>
)

// =========================================================================
// GESTOR surface: sketched web shell
// =========================================================================
const GESTOR_NAV = [
  { sec: 'Operação' },
  { key: 'dashboard', label: 'Dashboard', to: '/gestor/dashboard' },
  { key: 'mapa', label: 'Mapa', to: '/gestor/mapa' },
  { key: 'pontos', label: 'Pontos / outorgas', to: '/gestor/pontos' },
  { key: 'apontamentos', label: 'Apontamentos', to: '/gestor/apontamentos' },
  { key: 'solicitacoes', label: 'Solicitações', to: '/gestor/solicitacoes' },
  { key: 'arrecadacao', label: 'Arrecadação', to: '/gestor/arrecadacao' },
  { sec: 'Dados' },
  { key: 'cadastro', label: 'Cadastro & admin', to: '/gestor/cadastro' },
  { key: 'relatorios', label: 'Relatórios', to: '/gestor/relatorios' },
]
export const GestorSidebar = ({ active }) => (
  <aside className="app-side">
    <div className="brand">
      <div className="logo"><span className="mark">SP</span> Automonitoramento</div>
      <small>SP-Águas · UGRHI-07</small>
    </div>
    {GESTOR_NAV.map((n, i) =>
      n.sec
        ? <div key={i} className="nav-sec">{n.sec}</div>
        : <Link key={n.key} className={cx('nav-i', active === n.key && 'on')} to={n.to}><span className="ic" />{n.label}</Link>,
    )}
  </aside>
)

// Full gestor page: banner + sidebar + top bar + body. `top` is the app-top
// content (crumb, pills, search). `bodyStack` adds the `stack` body modifier.
export const GestorShell = ({ tag, title, right, active, top, bodyStack, children }) => (
  <>
    <DraftBanner tag={tag} title={title} right={right} />
    <div className="app-shell">
      <GestorSidebar active={active} />
      <main className="app-main">
        <div className="app-top">{top}</div>
        <div className={cx('app-body', bodyStack && 'stack')}>{children}</div>
      </main>
    </div>
  </>
)
