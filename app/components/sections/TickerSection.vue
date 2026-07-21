<template>
  <section class="ticker">
    <div class="ticker-track">
      <div v-for="n in 2" :key="n" class="ticker__group" :aria-hidden="n === 2 ? 'true' : undefined">
        <span class="ticker__text ticker__text--light">Fresh Caribbean Flavors</span>
        <span class="ticker__text ticker__text--bold">Born and Raised</span>
      </div>
    </div>
    <div class="ticker__fade ticker__fade--left" />
    <div class="ticker__fade ticker__fade--right" />
  </section>
</template>

<style scoped>
.ticker {
  position: relative;
  overflow: hidden;
  background-color: var(--color-deep);
  padding: 60px 0;
}

.ticker__group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.ticker__text {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 96px);
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0 33px;
}

.ticker__text--light {
  font-weight: 300;
  color: rgba(250, 250, 250, 0.8);
}

.ticker__text--bold {
  font-weight: 800;
  color: var(--color-gold-light);
}

.ticker__fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  pointer-events: none;
  z-index: 1;
}

.ticker__fade--left {
  left: 0;
  background: linear-gradient(90deg, var(--color-deep) 0%, transparent 100%);
}

.ticker__fade--right {
  right: 0;
  background: linear-gradient(270deg, var(--color-deep) 0%, transparent 100%);
}
</style>
