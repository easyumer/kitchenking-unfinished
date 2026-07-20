<script setup>
defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])
const { fadeIn, slideInLeft } = useAnimation()
</script>

<template>
  <AnimatePresence>
    <div v-if="open" class="nav-overlay" role="dialog" aria-modal="true">
      <Motion as="div" v-bind="fadeIn" class="nav-overlay__backdrop" @click="emit('close')" />

      <Motion as="div" v-bind="slideInLeft" class="nav-overlay__panel">
        <PillButton variant="dark" class="nav-overlay__close" @click="emit('close')">
          <IconPlus class="nav-overlay__close-icon" />
          <span>Close</span>
        </PillButton>

        <NavOverlayLinks @navigate="emit('close')" />
      </Motion>
    </div>
  </AnimatePresence>
</template>

<style scoped>
.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.nav-overlay__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.nav-overlay__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
  width: 100%;
  height: 100%;
  padding: 32px clamp(24px, 6vw, 48px) 48px;
  background-color: var(--color-gold);
  overflow-y: auto;
}

.nav-overlay__close-icon {
  transform: rotate(45deg);
}

@media (min-width: 768px) {
  .nav-overlay__backdrop {
    backdrop-filter: blur(6px);
  }

  .nav-overlay__panel {
    width: clamp(420px, 42vw, 560px);
    padding: 48px 56px 56px;
    gap: 96px;
    border-radius: 0 32px 32px 0;
    box-shadow: 24px 0 64px rgba(0, 0, 0, 0.35);
  }
}
</style>
