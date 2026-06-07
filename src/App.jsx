import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Launcher from './Launcher.jsx'
import { SCREENS } from './screens.jsx'

// The launcher is the COMMUNICATION register (neutral sans); screens are the
// sketched product. wireframe.css keys that off `body.comms`, so toggle it.
function useBodyComms() {
  const { pathname } = useLocation()
  useEffect(() => {
    const comms = pathname === '/'
    document.body.classList.toggle('comms', comms)
    return () => document.body.classList.remove('comms')
  }, [pathname])
}

export default function App() {
  useBodyComms()
  useScrollReset()
  return (
    <Routes>
      <Route path="/" element={<Launcher />} />
      {SCREENS.map(({ id, path, Component }) => (
        <Route key={id} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Launcher />} />
    </Routes>
  )
}

// Each "screen" is a separate document in spirit; reset scroll on navigation.
function useScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
}
