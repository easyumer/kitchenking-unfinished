<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: 'This page is on the way. Check back soon.' }
})
const { fadeUp } = useAnimation()
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="coming-soon">
    <p class="coming-soon__eyebrow">Coming Soon</p>
    <h1 class="coming-soon__title">{{ title }}</h1>
    <p class="coming-soon__description">{{ description }}</p>
    <PillButton to="/" variant="accent">
      <span>Back to Homepage</span>
      <IconArrowRight />
    </PillButton>
  </Motion>
</template>

<style scoped>
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 70vh;
  padding: 160px 48px;
  text-align: center;
  background-color: var(--color-section);
}

.coming-soon__eyebrow {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.coming-soon__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.1;
  color: var(--color-gold-light);
}

.coming-soon__description {
  max-width: 520px;
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 18px;
  line-height: 1.5;
  color: var(--color-offwhite);
}

@media (max-width: 768px) {
  .coming-soon {
    padding: 120px 24px;
  }
}
</style>
