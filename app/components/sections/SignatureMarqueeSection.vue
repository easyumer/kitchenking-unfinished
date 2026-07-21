<script setup>
const { fadeUp } = useAnimation()
</script>

<template>
  <section class="signature">
    <Motion as="p" v-bind="fadeUp" class="signature__subtitle">See what defines us.</Motion>

    <div class="signature__marquee">
      <div class="ticker-track signature__track">
        <div v-for="group in 2" :key="group" class="signature__group">
          <SignatureSlide v-for="slide in 2" :key="slide" />
        </div>
      </div>
      <div class="signature__fade signature__fade--left" />
      <div class="signature__fade signature__fade--right" />
    </div>
  </section>
</template>

<style scoped>
.signature {
  position: relative;
  background-color: var(--color-section);
  padding: 120px 0;
  overflow: hidden;
}

.signature__subtitle {
  display: block;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(20px, 2.2vw, 32px);
  line-height: 1.25;
  color: var(--color-gold-light);
  margin-bottom: 60px;
}

.signature__marquee {
  position: relative;
}

.signature__group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.signature__fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(60px, 10vw, 200px);
  pointer-events: none;
  z-index: 3;
}

.signature__fade--left {
  left: 0;
  background: linear-gradient(90deg, var(--color-section) 0%, transparent 100%);
}

.signature__fade--right {
  right: 0;
  background: linear-gradient(270deg, var(--color-section) 0%, transparent 100%);
}
</style>
