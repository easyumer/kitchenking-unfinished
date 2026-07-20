export const useAnimation = () => {
  const prefersReduced = useReducedMotion()

  const fadeUp = computed(() => prefersReduced.value
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      })

  const fadeIn = computed(() => prefersReduced.value
    ? { initial: false }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      })

  const riseUp = computed(() => prefersReduced.value
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 120 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
      })

  const staggerContainer = computed(() => prefersReduced.value
    ? {}
    : { transition: { staggerChildren: 0.1 } })

  const slideInLeft = computed(() => prefersReduced.value
    ? { initial: false }
    : {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      })

  return { fadeUp, fadeIn, riseUp, staggerContainer, slideInLeft }
}
