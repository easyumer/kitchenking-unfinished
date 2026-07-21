<script setup>
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: false },
  dimmed: { type: Boolean, default: false }
})
defineEmits(['toggle'])
</script>

<template>
  <div
    class="specials-card"
    :class="{ 'specials-card--active': active, 'specials-card--dimmed': dimmed }"
    role="button"
    tabindex="0"
    :aria-expanded="active"
    @click="$emit('toggle')"
    @keydown.enter="$emit('toggle')"
    @keydown.space.prevent="$emit('toggle')"
  >
    <img :src="image" :alt="title" class="specials-card__image" />
    <div class="specials-card__overlay" />
    <div class="specials-card__content">
      <div class="specials-card__text">
        <h3 class="specials-card__title">{{ title }}</h3>
        <div class="specials-card__reveal">
          <div class="specials-card__reveal-inner">
            <p class="specials-card__description">{{ description }}</p>
          </div>
        </div>
      </div>
      <PillButton variant="solid" class="specials-card__cta" @click.stop>
        <span>Add to Cart</span>
        <IconPlus />
      </PillButton>
    </div>
  </div>
</template>

<style scoped>
.specials-card {
  position: relative;
  flex: 1 1 0;
  aspect-ratio: 3 / 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 24px;
  border-radius: 16px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  will-change: flex-grow;
  transition:
    flex-grow 0.6s var(--ease-out-expo),
    filter 0.6s var(--ease-out-expo);
}

.specials-card--dimmed {
  filter: brightness(0.55);
}

.specials-card--active {
  flex-grow: 2;
  filter: brightness(1);
}

.specials-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.specials-card--active .specials-card__image {
  transform: scale(1.06);
}

.specials-card__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(7, 7, 7, 0.75) 0%, rgba(7, 7, 7, 0) 55%);
}

.specials-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  width: 100%;
}

.specials-card__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
}

.specials-card__title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
  text-align: left;
}

.specials-card__reveal {
  display: grid;
  grid-template-rows: 0fr;
  width: 100%;
  transition: grid-template-rows 0.5s var(--ease-out-expo);
}

.specials-card--active .specials-card__reveal {
  grid-template-rows: 1fr;
}

.specials-card__reveal-inner {
  min-height: 0;
  overflow: hidden;
}

.specials-card__description {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.14;
  text-align: left;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.4s var(--ease-out-expo) 0.05s,
    transform 0.4s var(--ease-out-expo) 0.05s;
}

.specials-card__cta {
  flex-shrink: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition:
    opacity 0.4s var(--ease-out-expo) 0.15s,
    transform 0.4s var(--ease-out-expo) 0.15s;
}

.specials-card--active .specials-card__description {
  opacity: 1;
  transform: translateY(0);
}

.specials-card--active .specials-card__cta {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

@media (hover: hover) and (pointer: fine) {
  .specials-card:hover {
    flex-grow: 2;
    filter: brightness(1);
  }

  .specials-card:hover .specials-card__image {
    transform: scale(1.06);
  }

  .specials-card:hover .specials-card__reveal {
    grid-template-rows: 1fr;
  }

  .specials-card:hover .specials-card__description,
  .specials-card:hover .specials-card__cta {
    opacity: 1;
    transform: translateY(0);
  }

  .specials-card:hover .specials-card__cta {
    pointer-events: auto;
  }
}

@media (max-width: 768px) {
  .specials-card {
    flex: none;
    width: 100%;
  }
}
</style>
