<script setup>
const isNavOpen = ref(false)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <MenuTrigger @open="isNavOpen = true" />
    <NavOverlay :open="isNavOpen" @close="isNavOpen = false" />
    <NuxtPage />
  </div>
</template>
