<script setup>
defineProps({
  prevDisabled: { type: Boolean, default: false },
  nextDisabled: { type: Boolean, default: false }
})

defineEmits(['prev', 'next'])
</script>

<template>
  <div class="carousel-nav">
    <button
      class="carousel-nav__btn"
      type="button"
      aria-label="Previous"
      :disabled="prevDisabled"
      @click="$emit('prev')"
    >
      <IconArrowUpRight class="carousel-nav__icon carousel-nav__icon--prev" />
    </button>
    <button
      class="carousel-nav__btn"
      type="button"
      aria-label="Next"
      :disabled="nextDisabled"
      @click="$emit('next')"
    >
      <IconArrowUpRight class="carousel-nav__icon" />
    </button>
  </div>
</template>

<style scoped>
.carousel-nav {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 1920);
}

/* Base state matches the "previous" button at rest — outlined, muted icon.
   :not(:disabled) below is the emphasized state (there's somewhere to go):
   solid white fill, dark icon — so whichever direction still has cards left
   reads as the inviting one, and the exhausted direction reads as inert. */
.carousel-nav__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw * 40 / 1920);
  height: calc(100vw * 40 / 1920);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: calc(100vw * 12 / 1920);
  background: none;
  color: #e3e3e3;
  cursor: pointer;
  transition:
    background-color 0.3s var(--ease-out-expo),
    border-color 0.3s var(--ease-out-expo),
    color 0.3s var(--ease-out-expo);
}

.carousel-nav__btn:not(:disabled) {
  background-color: var(--color-white);
  border-color: var(--color-white);
  color: var(--color-deep);
}

.carousel-nav__btn:disabled {
  cursor: not-allowed;
}

.carousel-nav__icon {
  width: calc(100vw * 24 / 1920);
  height: calc(100vw * 24 / 1920);
}

.carousel-nav__icon--prev {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .carousel-nav {
    gap: 10px;
  }

  .carousel-nav__btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .carousel-nav__icon {
    width: 18px;
    height: 18px;
  }
}
</style>
