<script setup>
defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])
const { fadeIn, slideInRight } = useAnimation()
</script>

<template>
  <AnimatePresence>
    <div v-if="open" class="nav-overlay" role="dialog" aria-modal="true">
      <Motion as="div" v-bind="fadeIn" class="nav-overlay__backdrop" @click="emit('close')" />

      <Motion as="div" v-bind="slideInRight" class="nav-overlay__panel">
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
  /* Panel is anchored to the right edge — pushes it there via flex rather than
     absolute-positioning it, so its own width/flow (full-width on mobile,
     clamped on desktop) still drives its layout. */
  display: flex;
  justify-content: flex-end;
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
  gap: 60px;
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
    padding: 40px 56px 56px;
    gap: 45px;
    /* Flat edge against the screen's right boundary, rounded edge facing
       inward — mirrors the old left-anchored radius/shadow for the new side. */
    border-radius: 32px 0 0 32px;
    box-shadow: -24px 0 64px rgba(0, 0, 0, 0.35);
  }
}
</style>
