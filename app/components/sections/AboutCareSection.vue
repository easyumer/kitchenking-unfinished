<script setup>
import careImage from '~/assets/images/about/Made with care section picture.png'
const { fadeUp } = useAnimation()
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="care">
    <p class="care__intro">
      Kitchen King was created with a simple idea: make great food that people love to share.
      From the kitchen to your table, we focus on fresh ingredients, bold flavors, and food made
      with care.
    </p>

    <div class="care__row">
      <img class="care__image" :src="careImage" alt="Chef finishing a plate at Kitchen King" />
      <h2 class="care__heading">Made with care, served with flavor.</h2>
    </div>
  </Motion>
</template>

<style scoped>
.care {
  padding: calc(100vw * 64 / 1920) calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.care__intro {
  max-width: calc(100vw * 1000 / 1920);
  margin: 0 0 calc(100vw * 40 / 1920);
  font-family: var(--font-body);
  font-weight: 400;
  font-size: calc(100vw * 18 / 1920);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);
}

.care__row {
  display: flex;
  align-items: center;
  gap: calc(100vw * 64 / 1920);
}

.care__image {
  flex: 1 1 calc(100vw * 1120 / 1920);
  min-width: 0;
  height: calc(100vw * 280 / 1920);
  object-fit: cover;
  border-radius: calc(100vw * 16 / 1920);
}

.care__heading {
  flex: 1 1 calc(100vw * 760 / 1920);
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 96 / 1920);
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--color-white);
}

@media (max-width: 768px) {
  .care {
    padding: 70px 20px 48px;
  }

  .care__intro {
    max-width: 100%;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .care__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .care__image {
    flex: none;
    width: 100%;
    height: 100px;
    aspect-ratio: 4 / 3;
    border-radius: 12px;
  }

  .care__heading {
    flex: none;
     font-size: calc(100vw * 56 / 390);
  }
}
</style>
