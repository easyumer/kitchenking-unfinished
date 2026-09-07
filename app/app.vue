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
  <div>
    <NuxtRouteAnnouncer />

    <AppTimings :hidden="scrolled" />

    <AppHeader :scrolled="scrolled" @toggle-nav="isNavOpen = !isNavOpen" />

    <NavOverlay :open="isNavOpen" @close="isNavOpen = false" />

    <NuxtPage />

    <CartMobileBar />
  </div>
</template>