<script setup>
const { fadeUp } = useAnimation()
const prefersReduced = useReducedMotion()
</script>

<template>
  <section class="hero">
    <div class="hero-top">
      <Motion as="div" v-bind="fadeUp" class="hero-top__logo-wrap">
        <img src="~/assets/images/kitchen-king-logo.png" alt="Kitchen King" class="hero-top__logo" />
      </Motion>

      <Motion as="div" v-bind="fadeUp" class="hero-top__text">
        <p>At Kitchen King, we honor the ingredients the sea and the land give us.</p>
        <PillButton to="/menu" variant="solid">
          <span>View Our Full Menu</span>
          <IconArrowRight />
        </PillButton>
      </Motion>
    </div>

    <div class="hero-media-wrap">
      <video
        class="hero-media"
        src="~/assets/video/hero-loop.mp4"
        poster="~/assets/video/hero-loop-poster.jpg"
        :autoplay="!prefersReduced"
        muted
        loop
        playsinline
        aria-hidden="true"
      />
      <div class="hero-media__overlay" />
    </div>
  </section>
</template>

<style scoped>
.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  padding: 148px 48px 56px;
  background-color: var(--color-section);
}

.hero-top__logo-wrap {
  flex: 1 1 500px;
  max-width: 55%;
  margin-left: -84px;
}

.hero-top__logo {
  width: 100%;
  max-width: 1059px;
  height: auto;
}

.hero-top__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 438px;
}

.hero-top__text p {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  color: var(--color-offwhite);
}

.hero-media-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1920 / 823;
  overflow: hidden;
  border-radius: 20px;
}

.hero-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-media__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(7, 7, 7, 0.45) 0%, rgba(7, 7, 7, 0) 100%);
}

@media (max-width: 768px) {
  .hero-top {
    padding: 120px 24px 32px;
    justify-content: center;
    text-align: center;
  }

  .hero-top__logo-wrap {
    margin-left: 0;
    max-width: 280px;
  }

  .hero-top__text {
    align-items: center;
    max-width: 100%;
  }
}
</style>
