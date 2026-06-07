// Join truthy class fragments: cx('pill', warn && 'warn') -> "pill warn"
export const cx = (...parts) => parts.filter(Boolean).join(' ')

// Resolve a static SVG (charts / maps) living in public/assets, base-path aware
// so it works both on `vite dev` and under the GitHub Pages project path.
export const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
