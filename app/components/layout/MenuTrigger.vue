<script setup>
// Temporary stand-in trigger for the retained side menu (NavOverlay), used
// while the homepage is rebuilt from scratch. The new homepage's header should
// provide the real menu button and this component can then be removed.
defineEmits(['open'])
</script>

<template>
  <button class="menu-trigger" type="button" aria-label="Open menu" @click="$emit('open')">
    <IconMenu />
    <span>Menu</span>
  </button>
</template>

<style scoped>
.menu-trigger {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border: 1px solid var(--color-offwhite);
  border-radius: 22px;
  background: none;
  color: var(--color-offwhite);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-trigger :deep(svg) {
  width: 16px;
  height: 16px;
}
</style>
