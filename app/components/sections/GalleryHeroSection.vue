<script setup>
import galleryHeroImage from '~/assets/images/gallery/Hero sec image.png'
const { fadeIn, fadeUp } = useAnimation()
</script>

<template>
  <section class="hero">
    <div class="hero__frame">
      <Motion as="div" v-bind="fadeIn" class="hero__card">
        <img class="hero__media" :src="galleryHeroImage" alt="Kitchen King food photography" />
        <div class="hero__overlay" />
      </Motion>
    </div>

    <Motion as="h1" v-bind="fadeUp" class="hero__heading">Good food<br />deserves a close-up.</Motion>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 44px calc(100vw * 20 / 1920) calc(100vw * 20 / 1920);
}

.hero__frame {
  position: relative;
}

.hero__card {
  position: relative;
  width: 100%;
  aspect-ratio: 1880 / 806;
  overflow: hidden;
  border-radius: 32px;
}

.hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(7, 7, 7, 0.55) 0%, rgba(7, 7, 7, 0.1) 55%, rgba(7, 7, 7, 0) 100%);
}

.hero__heading {
  position: absolute;
  left: calc(100vw * 48 / 1920);
  top: calc(44px + 100vw * 570 / 1920);
  width: calc(100vw * 1040 / 1920);
  height: calc(100vw * 208 / 1920);
  z-index: 1;
  display: flex;
  align-items: center;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 96 / 1920);
  line-height: 1.083;
  text-transform: uppercase;
  color: var(--color-white);
}

@media (max-width: 768px) {
  .hero {
    padding: 32px calc(100vw * 8 / 390) calc(100vw * 8 / 390);
  }

  .hero__card {
    aspect-ratio: 374 / 665;
    border-radius: 24px;
  }

  .hero__heading {
    left: calc(100vw * 20 / 390);
    right: calc(100vw * 20 / 390);
    top: calc(32px + 100vw * 461 / 390);
    bottom: auto;
    width: auto;
    height: auto;
    font-size: calc(100vw * 56 / 390);
    line-height: 1.143;
  }
}
</style>
