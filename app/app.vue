<script setup>
const isNavOpen = ref(false)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppHeader @toggle-nav="isNavOpen = !isNavOpen" />
    <NavOverlay :open="isNavOpen" @close="isNavOpen = false" />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
