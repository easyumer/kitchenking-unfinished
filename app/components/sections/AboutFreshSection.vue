<script setup>
import burgerImage from '~/assets/images/about/burger png.png'
const { fadeUp } = useAnimation()
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="fresh">
    <div class="fresh__content">
      <h2 class="fresh__heading">Fresh.<br />Flavorful.<br />Satisfying.</h2>

      <p class="fresh__text">
        Every order should be something you're excited to eat. That's why we keep things simple:
        quality ingredients, great flavors, and food made fresh.
      </p>
    </div>

    <img class="fresh__image" :src="burgerImage" alt="Kitchen King signature burger" />
  </Motion>
</template>

<style scoped>
/* Positioned relative with generous bottom padding so the burger image can
   hang past the section's own visual end — LocationSection (rendered right
   after this one) pulls itself up over that extra space with its own
   negative top margin, the same overlap technique FooterSection also uses,
   so the image bleeds into the yellow section below without this component
   needing to know anything about what follows it. */
.fresh {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: calc(100vw * 48 / 1920);
  padding: calc(100vw * 40 / 1920) calc(100vw * 48 / 1920) calc(100vw * 260 / 1920);
  overflow: visible;
  margin-bottom: -250px;
  z-index: 2;
}

.fresh__content {
  flex: 1 1 calc(100vw * 700 / 1920);
  min-width: 0;
}

.fresh__heading {
  margin: 0 0 calc(100vw * 24 / 1920);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 55 / 1920);
  line-height: 1.1;
  text-transform: uppercase;
  margin-top: 100px  ;
  color: var(--color-white);
}

.fresh__text {
  max-width: calc(100vw * 600 / 1920);
  margin: 0;
  margin-top: 250px;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: calc(100vw * 18 / 1920);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);
}

.fresh__image {
  flex: 0 1 calc(100vw * 1200 / 1920);
  align-self: flex-end;
  min-width: 0;
  max-width: calc(100vw * 1500 / 1920);
  margin-right: calc(100vw * -100 / 1920);
  height: auto;
  object-fit: contain;
  z-index: 1;
}

@media (max-width: 768px) {
  .fresh {
    flex-direction: column;
    gap: 32px;
    padding: 0 20px 200px;
    margin-top: -40px;
  }

  .fresh__heading {
    margin-bottom: 16px;
    font-size: calc(100vw * 37 / 390);
    font-weight: 500;
  }

  .fresh__text {
    max-width: 40%;
    font-size: 12px;
    margin-top: 60px;
  }

  .fresh__image {
    flex: none;
    max-width: 110%;
    align-self: flex-end;
    margin-right: -195px;
    margin-top: -290px;
  }
}
</style>
