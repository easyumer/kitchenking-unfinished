<script setup>
defineProps({
  label: { type: String, required: true },
  image: { type: String, required: true },
  to: { type: String, default: '/menu' }
})
</script>

<template>
  <NuxtLink :to="to" class="category-card">
    <img class="category-card__image" :src="image" :alt="label" loading="lazy" />
    <div class="category-card__overlay" />
    <span class="category-card__label">{{ label }}</span>
    <IconArrowUpRight class="category-card__icon" />
  </NuxtLink>
</template>

<style scoped>
/* Sizing is owned by the carousel track that places this (see
   ExploreMenuSection.vue's .menu__card, which sets flex-basis/height) —
   this component only fills whatever box it's given. */
.category-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: calc(100vw * 40 / 1920);
  padding: calc(100vw * 24 / 1920);
  border-radius: calc(100vw * 24 / 1920);
  overflow: hidden;
}

.category-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-card__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(7, 7, 7, 0.6) 0%, rgba(7, 7, 7, 0) 85%);
}

.category-card__label {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: calc(100vw * 24 / 1920);
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-white);
}

.category-card__icon {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: calc(100vw * 32 / 1920);
  height: calc(100vw * 32 / 1920);
  color: var(--color-white);
}

@media (prefers-reduced-motion: no-preference) {
  .category-card__icon {
    transition: transform 0.35s var(--ease-out-expo);
  }

  .category-card:hover .category-card__icon {
    transform: translate(4px, -4px);
  }
}

@media (max-width: 768px) {
  .category-card {
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
  }

  .category-card__label {
    font-size: 18px;
  }

  .category-card__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
