<script setup>
const { fadeUp } = useAnimation()

const links = [
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Portfolio', to: '/portfolio' }
]
</script>

<template>
  <Motion as="div" v-bind="fadeUp" class="cta-links">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="cta-links__row">
      <span class="cta-links__pill" />
      <span class="cta-links__label">{{ link.label }}</span>
      <IconArrowRight class="cta-links__arrow" />
    </NuxtLink>
  </Motion>
</template>

<style scoped>
.cta-links {
  display: flex;
  flex-direction: column;
  border-radius: 48px;
  overflow: hidden;
}

.cta-links__row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;
  background-color: var(--color-deep);
  border-bottom: 1px solid rgba(245, 166, 35, 0.12);
  overflow: hidden;
}

.cta-links__row:last-child {
  border-bottom: none;
}

.cta-links__pill {
  position: absolute;
  top: 0;
  left: 0;
  width: 81.77%;
  height: 100%;
  background-color: var(--color-gold);
  border-radius: 0 999px 999px 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease-out-expo);
  z-index: 0;
}

.cta-links__row:hover .cta-links__pill,
.cta-links__row:focus-visible .cta-links__pill {
  transform: scaleX(1);
}

.cta-links__label {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(40px, 6vw, 112px);
  line-height: 0.86;
  letter-spacing: -0.057em;
  color: var(--color-gold);
  transition: color 0.5s var(--ease-out-expo);
}

.cta-links__row:hover .cta-links__label,
.cta-links__row:focus-visible .cta-links__label {
  color: var(--color-deep);
}

.cta-links__arrow {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  color: var(--color-gold);
}

@media (max-width: 768px) {
  .cta-links__row {
    padding: 24px 24px;
  }

  .cta-links__arrow {
    width: 40px;
    height: 40px;
  }
}
</style>
