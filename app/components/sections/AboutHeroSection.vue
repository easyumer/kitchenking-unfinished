<script setup>
import aboutHeroImage from '~/assets/images/about/About page Hero picture.png'
const { fadeIn, fadeUp } = useAnimation()
</script>

<template>
  <section class="hero">
    <div class="hero__frame">
      <Motion as="div" v-bind="fadeIn" class="hero__card">
        <img class="hero__media" :src="aboutHeroImage" alt="Chef plating a dish at Kitchen King" />
        <div class="hero__overlay" />
      </Motion>
    </div>

    <Motion as="h1" v-bind="fadeUp" class="hero__heading">Good Food.<br />Made For You.</Motion>
  </section>
</template>

<style scoped>
/* Same rounded-banner-card pattern as HeroSection/MenuHeroSection: fixed
   44px top gutter, side/bottom gutters scale with viewport width. */
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
  top: calc(44px + 100vw * 558 / 1920);
  width: calc(100vw * 746 / 1920);
  height: calc(100vw * 230 / 1920);
  z-index: 1;
  display: flex;
  align-items: center;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 96 / 1920);
  line-height: 1.2;
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
    left: calc(100vw * 22 / 390);
    right: calc(100vw * 15 / 390);
    top: calc(32px + 100vw * 460 / 390);
    bottom: auto;
    width: auto;
    height: auto;
    font-size: calc(100vw * 56 / 390);
    line-height: 1.15;
  }
}
</style>
