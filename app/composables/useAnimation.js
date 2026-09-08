export const useAnimation = () => {
  const prefersReduced = useReducedMotion();

  const fadeUp = computed(() =>
    prefersReduced.value
      ? {
          initial: false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
  );

  const fadeIn = computed(() =>
    prefersReduced.value
      ? {
          initial: false,
          animate: { opacity: 1 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
  );

  const riseUp = computed(() =>
    prefersReduced.value
      ? {
          initial: false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 120 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        },
  );

  const staggerContainer = computed(() =>
    prefersReduced.value ? {} : { transition: { staggerChildren: 0.1 } },
  );

  // Enters from the right — matches the nav overlay's trigger (the Menu pill
  // sits at the header's right edge), so the panel arrives from the same side
  // as the button that opened it instead of crossing the screen.
  const slideInRight = computed(() =>
    prefersReduced.value
      ? {
          initial: false,
          animate: { x: 0, opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { x: "100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "100%", opacity: 0 },
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
  );

  return { fadeUp, fadeIn, riseUp, staggerContainer, slideInRight };
};
