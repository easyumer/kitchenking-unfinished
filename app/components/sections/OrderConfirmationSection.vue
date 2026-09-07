<script setup>
// Placeholder banner — swap for the real photo once it's imported into assets/images.
import orderConfirmationImage from '~/assets/images/order Confirmation hero pic.png'

const { customerName, orderNumber } = useOrderConfirmation()
const { fadeIn, fadeUp } = useAnimation()

const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=West+Bay+Street+Nassau+Bahamas'

// Falls back gracefully if this page is opened directly rather than reached
// via "Place Order" (the module-scoped state above would be empty).
const displayName = computed(() => customerName.value || 'Guest')
const displayOrderNumber = computed(() => orderNumber.value || '000000')
</script>

<template>
  <section class="hero">
    <div class="hero__frame">
      <Motion as="div" v-bind="fadeIn" class="hero__card">
        <img class="hero__media" :src="orderConfirmationImage" alt="Kitchen King kitchen" />
        <div class="hero__overlay" />

        <Motion as="div" v-bind="fadeUp" class="hero__content">
          <h1 class="hero__heading">{{ displayName }}, thank you<br>for your order</h1>
          <p class="hero__subtext">Your order #{{ displayOrderNumber }} has been confirmed!</p>

          <div class="hero__actions">
            <PillButton :href="directionsUrl" variant="accent">
              <span>Get Directions</span>
              <IconLocation />
            </PillButton>

            <PillButton to="/track-order" variant="solid">
              <span>Track Order</span>
              <IconArrowRight />
            </PillButton>
          </div>
        </Motion>
      </Motion>
    </div>
  </section>
</template>

<style scoped>
/* Same card/frame/overlay treatment as MenuHeroSection — only the media and
   the content layered on top (centered copy instead of a left heading) differ. */
.hero {
  position: relative;
  padding: 44px calc(100vw * 20 / 1920) calc(100vw * 200 / 1920);
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
  background:
    linear-gradient(0deg, rgba(7, 7, 7, 0.55) 0%, rgba(7, 7, 7, 0.25) 100%),
    rgba(0, 0, 0, 0.2);
}

.hero__content {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(100vw * 20 / 1920);
  padding: 0 calc(100vw * 48 / 1920);
  text-align: center;
}

.hero__heading {
  margin: 0;
  max-width: calc(100vw * 1100 / 1920);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-offwhite);
}

.hero__subtext {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: calc(100vw * 20 / 1920);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.8);
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 1920);
  margin-top: calc(100vw * 12 / 1920);
}

.hero__actions :deep(.pill-button) {
  height: 56px;
  padding: 0 32px;
  border-radius: 28px;
  font-size: 15px;
}

@media (max-width: 768px) {
  .hero {
    padding: 32px calc(100vw * 8 / 390) calc(100vw * 50 / 390);
  }

  .hero__card {
    aspect-ratio: 374 / 665;
  }

  .hero__content {
    gap: 16px;
    padding: 0 24px;
  }

  .hero__heading {
    max-width: none;
    font-size: 36px;
  }

  .hero__subtext {
    font-size: 14px;
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
    margin-top: 8px;
  }

  .hero__actions :deep(.pill-button) {
    width: 100%;
    justify-content: center;
  }
}
</style>
