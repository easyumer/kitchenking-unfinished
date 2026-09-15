<script setup>
import kitchenKingLogo from '~/assets/images/Kitchen King black Logo.png'

const { fadeUp } = useAnimation()
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="coming-soon-splash">
    <div class="coming-soon-splash__inner">
      <img :src="kitchenKingLogo" alt="Kitchen King" class="coming-soon-splash__logo" />

      <h1 class="coming-soon-splash__title">Something's Cooking!</h1>

      <p class="coming-soon-splash__description">
        Leave your email below and we'll send you a notification as soon as we are done cooking.
      </p>

      <NotifyForm />
    </div>
  </Motion>
</template>

<style scoped>
.coming-soon-splash {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: calc(100vw * 60 / 1920) calc(100vw * 24 / 1920);
  background: linear-gradient(180deg, var(--color-gold-light) 0%, var(--color-gold) 100%);
}

.coming-soon-splash__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vw * 28 / 1920);
  width: 100%;
  max-width: calc(100vw * 900 / 1920);
  text-align: center;
}

.coming-soon-splash__logo {
  width: calc(100vw * 420 / 1920);
  height: auto;
}

.coming-soon-splash__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: calc(100vw * 96 / 1920);
  line-height: 1.05;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: var(--color-deep);
}

.coming-soon-splash__description {
  max-width: calc(100vw * 620 / 1920);
  margin: 0;
  font-family: var(--font-body);
  font-size: calc(100vw * 18 / 1920);
  font-weight: 400;
  line-height: 1.5;
  color: color-mix(in srgb, var(--color-deep) 80%, transparent);
}

@media (max-width: 768px) {
  .coming-soon-splash {
    padding: 48px 24px;
  }

  .coming-soon-splash__inner {
    gap: 20px;
    max-width: 100%;
  }

  .coming-soon-splash__logo {
    width: 200px;
  }

  .coming-soon-splash__title {
    font-size: 40px;
  }

  .coming-soon-splash__description {
    max-width: 300px;
    font-size: 14px;
  }
}
</style>
