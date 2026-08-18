<script setup>
defineProps({
  count: { type: Number, required: true },
  activeIndex: { type: Number, required: true }
})

defineEmits(['select'])
</script>

<template>
  <div class="carousel-dots">
    <button
      v-for="index in count"
      :key="index"
      class="carousel-dots__dot"
      :class="{ 'carousel-dots__dot--active': index - 1 === activeIndex }"
      type="button"
      :aria-label="`Go to slide ${index}`"
      @click="$emit('select', index - 1)"
    />
  </div>
</template>

<style scoped>
.carousel-dots {
  display: flex;
  align-items: center;
  gap: calc(100vw * 8 / 1920);
}

.carousel-dots__dot {
  width: calc(100vw * 12 / 1920);
  height: calc(100vw * 12 / 1920);
  padding: 0;
  border: none;
  border-radius: calc(100vw * 4 / 1920);
  background-color: rgba(250, 250, 250, 0.6);
  cursor: pointer;
  transition:
    width 0.3s var(--ease-out-expo),
    height 0.3s var(--ease-out-expo),
    background-color 0.3s var(--ease-out-expo);
}

.carousel-dots__dot--active {
  width: calc(100vw * 20 / 1920);
  height: calc(100vw * 20 / 1920);
  background-color: var(--color-gold);
}

@media (max-width: 768px) {
  .carousel-dots__dot {
    width: 8px;
    height: 8px;
    border-radius: 3px;
  }

  .carousel-dots__dot--active {
    width: 16px;
    height: 8px;
  }
}
</style>
