import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base keeps assets resolvable both on `vite dev` and under the
// GitHub Pages project path (/automonitoramento-wireframes/). Routing is hash
// based (see main.jsx), so deep links never hit a 404 on Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
})
