<script setup>
const isNavOpen = ref(false)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppTimings />
    <AppHeader @toggle-nav="isNavOpen = !isNavOpen" />
    <NavOverlay :open="isNavOpen" @close="isNavOpen = false" />
    <NuxtPage />
  </div>
</template>
