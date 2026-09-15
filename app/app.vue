<script setup>
useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/eruda',
      defer: true,
      onload: () => {
        window.eruda?.init()
      }
    }
  ]
})


const route = useRoute()
// The coming-soon splash is a bare, standalone page per its own design (no
// header, timings strip, or nav drawer) — everything else keeps the global
// chrome mounted here in app.vue.
const isBareLayout = computed(() => route.path === '/coming-soon')

const isNavOpen = ref(false)
const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<template>
  <!-- `root` binds Lenis to the real window scroll (no wrapper div, so this
       adds nothing to the DOM and can't cause a hydration mismatch — Lenis
       only ever runs client-side and never touches Vue's rendered markup).
       `respectReducedMotion` is already Lenis's own default; it's spelled out
       here because this project spent real effort making every other
       animation honor Reduce Motion (see useAnimation.js /
       usePrefersReducedMotion.js) — a momentum/glide scroll is exactly the
       kind of effect that preference exists to turn off, so it must never be
       silently flipped to `false` in a future edit. -->
  <VueLenis root :options="{ respectReducedMotion: true }">
    <div>
      <NuxtRouteAnnouncer />

      <template v-if="!isBareLayout">
        <AppTimings :hidden="scrolled" />

        <AppHeader :scrolled="scrolled" @toggle-nav="isNavOpen = !isNavOpen" />

        <NavOverlay :open="isNavOpen" @close="isNavOpen = false" />
      </template>

      <NuxtPage />

      <CartMobileBar />
    </div>
  </VueLenis>
</template>