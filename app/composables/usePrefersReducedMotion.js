// SSR-safe replacement for motion-v's own `useReducedMotion()`.
//
// motion-v's version is built on VueUse's `useMediaQuery`, which reads
// `matchMedia` synchronously the moment it's called — i.e. during setup(),
// before Vue's first client render. On the server the same query always
// resolves to `false` (there's no `window`), so on a device that actually
// has Reduce Motion turned on, the client's very first (hydration) render
// disagrees with the server-rendered HTML. Vue's hydration does not force a
// mismatched `style`/attribute back in sync — it only warns and keeps
// whatever the server sent — so any element motion-v had already hidden via
// an inline `opacity`/`transform` on the server stayed hidden forever, with
// nothing left to trigger a real (non-hydration) reactive update afterward.
//
// Reading the real value inside `onMounted` instead guarantees the server
// and the client's first render always agree (both start at `false`), and
// any later correction happens through a genuine Vue update — which does
// patch styles correctly — rather than through hydration adoption.
const prefersReducedMotion = ref(false)
let initialized = false

function initWatcher() {
  if (initialized) return
  initialized = true

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaQuery.addEventListener('change', (event) => {
    prefersReducedMotion.value = event.matches
  })
}

// Shared across every caller: one underlying matchMedia listener, one
// reactive source of truth, so every component's animation config updates
// together the moment the real preference is known.
export const usePrefersReducedMotion = () => {
  onMounted(initWatcher)
  return prefersReducedMotion
}
