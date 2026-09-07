<script setup>
import promoImage from '~/assets/images/Rectangle 52.png'
import { locations } from '~/data/locations'

const { orderNumber, orderSubtotal, orderTax, orderGrandTotal, placedAt } = useOrderConfirmation()
const { fadeUp } = useAnimation()

// Demo fallback so the page still renders the design when opened directly
// (not reached via checkout, so useOrderConfirmation's state is empty).
const FALLBACK = {
  orderNumber: '123456',
  subtotal: 19.5,
  tax: 3,
  grandTotal: 21.5
}

// A food truck has no live order-status feed to poll, so progress is
// simulated from the time the order was placed: received -> preparing for
// the first stretch, then ready-for-pickup once the estimated window opens.
// "Picked up" is deliberately never reached automatically — that step needs
// an actual hand-off, which this app has no way to observe.
const PREPARING_AFTER_MIN = 3
const READY_AFTER_MIN = 20
const READY_WINDOW_MIN = 15

const steps = ['Order received', 'Preparing', 'Ready for pickup', 'Picked up']

const hasLiveOrder = computed(() => !!placedAt.value)
const displayOrderNumber = computed(() => orderNumber.value || FALLBACK.orderNumber)
const subtotal = computed(() => hasLiveOrder.value ? orderSubtotal.value : FALLBACK.subtotal)
const tax = computed(() => hasLiveOrder.value ? orderTax.value : FALLBACK.tax)
const grandTotal = computed(() => hasLiveOrder.value ? orderGrandTotal.value : FALLBACK.grandTotal)

const now = ref(Date.now())
let ticker
onMounted(() => {
  ticker = setInterval(() => { now.value = Date.now() }, 30000)
})
onUnmounted(() => clearInterval(ticker))

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

const readyWindow = computed(() => {
  if (!hasLiveOrder.value) return '7:30 PM -7:45 PM'
  const start = new Date(placedAt.value + READY_AFTER_MIN * 60000)
  const end = new Date(placedAt.value + (READY_AFTER_MIN + READY_WINDOW_MIN) * 60000)
  return `${formatTime(start)} -${formatTime(end)}`
})

const currentStep = computed(() => {
  if (!hasLiveOrder.value) return 2
  const elapsedMin = (now.value - placedAt.value) / 60000
  if (elapsedMin < PREPARING_AFTER_MIN) return 1
  if (elapsedMin < READY_AFTER_MIN) return 2
  return 3
})

const pickupLocation = locations[0]
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="track-order">
    <div class="track-order__layout">

      <!-- LEFT SIDE -->
      <div class="track-order__main">

        <div class="status-card">
          <div class="status-card__head">
            <NuxtLink to="/" class="status-card__back" aria-label="Back to homepage">
              <IconChevronLeft />
            </NuxtLink>
            <h1>Order Status</h1>
          </div>

          <div class="status-card__body">
            <div class="status-card__meta">
              <span class="status-card__meta-label">Estimated ready time</span>
              <span class="status-card__order-pill">
                Order No. #{{ displayOrderNumber }}
                <IconChevronDown />
              </span>
            </div>

            <p class="status-card__time">{{ readyWindow }}</p>

            <ol class="status-steps">
              <li
                v-for="(label, index) in steps"
                :key="label"
                class="status-steps__item"
                :class="{ 'status-steps__item--active': index < currentStep }"
              >
                <div class="status-steps__row">
                  <span class="status-steps__badge">{{ index + 1 }}</span>
                  <span
                    v-if="index < steps.length - 1"
                    class="status-steps__line"
                    :class="{ 'status-steps__line--active': index + 1 < currentStep }"
                  />
                </div>
                <span class="status-steps__label">{{ label }}</span>
              </li>
            </ol>
          </div>
        </div>

        <NuxtLink to="/gallery" class="promo-card">
          <div class="promo-card__head">
            <h2>Doomscroll on Our Page While We Prepare Your Order</h2>
            <span class="promo-card__icon">
              <IconArrowUpRight />
            </span>
          </div>
          <img class="promo-card__image" :src="promoImage" alt="Oxtail Sliders" loading="lazy" />
        </NuxtLink>

      </div>

      <!-- RIGHT SIDE -->
      <div class="track-order__aside">

        <div class="pickup-card">
          <div class="pickup-card__head">
            <h2>Pickup From</h2>
          </div>

          <div class="pickup-card__body">
            <div class="pickup-card__top">
              <div>
                <h3>{{ pickupLocation.name }}</h3>
                <p class="pickup-card__address">{{ pickupLocation.address }}</p>
              </div>
              <span class="pickup-card__status">OPEN<i /></span>
            </div>

            <p class="pickup-card__hours">{{ pickupLocation.hours }}</p>

            <a
              :href="pickupLocation.map"
              target="_blank"
              rel="noopener noreferrer"
              class="pickup-card__directions"
            >
              <span>Get Directions</span>
              <IconLocation />
            </a>

            <div class="pickup-card__summary">
              <h3>Your Order</h3>

              <div class="pickup-card__row">
                <span>Total</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="pickup-card__row">
                <span>Taxes</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div class="pickup-card__row pickup-card__row--grand">
                <span>Grand Total</span>
                <span>${{ grandTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </Motion>
</template>

<style scoped>
.track-order {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  /* header clearance */
  padding: 160px 48px 140px;
}

.track-order__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(340px, 1fr);
  gap: 24px;
  align-items: start;
}

.track-order__main,
.track-order__aside {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ==================================================
   SHARED CARD CHROME
================================================== */
/* 
.pickup-card{
height: 600px;
} */



.status-card,
.pickup-card,
.promo-card {
  width: 100%;
  background: #181818;
  border: 1px solid #262626;
  border-radius: 16px;
  overflow: hidden;
}

.status-card__head,
.pickup-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #262626;
}

.status-card__head h1,
.pickup-card__head h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 16px;
  color: #FFEFAD;
}

.status-card__back {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #FFEFAD;
  border-radius: 8px;
  color: #FFEFAD;
}

.status-card__back :deep(svg) {
  width: 16px;
  height: 16px;
}

/* ==================================================
   ORDER STATUS
================================================== */

.status-card__body {
  padding: 28px 24px 32px;
}

.status-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.status-card__meta-label {
  font-family: var(--font-body);
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
}

.status-card__order-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(250, 250, 250, 0.8);
}

.status-card__order-pill :deep(svg) {
  width: 12px;
  height: 12px;
  color: rgba(250, 250, 250, 0.6);
}

.status-card__time {
  margin: 12px 0 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 40px;
  line-height: 1.2;
  color: var(--color-white);
}

.status-steps {
  display: flex;
  align-items: flex-start;
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
}

.status-steps__item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 0;
}

.status-steps__item:last-child {
  flex: 0 0 auto;
}

.status-steps__row {
  display: flex;
  align-items: center;
  width: 100%;
}

.status-steps__badge {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: rgba(250, 250, 250, 0.6);
  transition: background-color 0.3s var(--ease-out-expo), border-color 0.3s var(--ease-out-expo), color 0.3s var(--ease-out-expo);
}

.status-steps__item--active .status-steps__badge {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-deep);
}

.status-steps__line {
  flex: 1 1 auto;
  height: 0;
  margin: 0 8px;
  border-top: 2px dashed rgba(255, 255, 255, 0.2);
  transition: border-color 0.3s var(--ease-out-expo);
}

.status-steps__line--active {
  border-top-color: var(--color-gold);
}

.status-steps__label {
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(250, 250, 250, 0.55);
}

.status-steps__item--active .status-steps__label {
  color: var(--color-gold-light);
}

/* ==================================================
   PROMO / "DOOMSCROLL" CARD
================================================== */

.promo-card {
  display: block;
  padding: 20px;
  cursor: pointer;
  transition: border-color 0.3s var(--ease-out-expo);
}

.promo-card:hover {
  border-color: rgba(255, 202, 89, 0.4);
}

.promo-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.promo-card__head h2 {
  margin: 0;
  max-width: 560px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 22px;
  line-height: 1.3;
  color: var(--color-offwhite);
}

.promo-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--color-white);
  transition: transform 0.35s var(--ease-out-expo), background-color 0.35s var(--ease-out-expo), border-color 0.35s var(--ease-out-expo);
}

.promo-card__icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.promo-card:hover .promo-card__icon {
  background-color: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-deep);
  transform: translate(3px, -3px);
}

.promo-card__image {
  width: 100%;
  height: 280px;
  border-radius: 12px;
  object-fit: cover;
  object-position: center 30%;
}

/* ==================================================
   PICKUP FROM
================================================== */

.pickup-card__body {
  padding: 20px 24px 28px;
}

.pickup-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.pickup-card__top h3 {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 20px;
  color: var(--color-white);
}

.pickup-card__address {
  margin: 0;
  max-width: 320px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.5;
  color: rgba(250, 250, 250, 0.55);
}

.pickup-card__status {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  background: rgba(52, 192, 73, 0.12);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-offwhite);
}

.pickup-card__status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34C049;
}

.pickup-card__hours {
  margin: 16px 0 0;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-offwhite);
}

.pickup-card__directions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 44px;
  margin-top: 20px;
  padding: 0 16px;
  border: 1px solid var(--color-gold);
  border-radius: 10px;
  color: var(--color-gold);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: background-color 0.3s var(--ease-out-expo);
}

.pickup-card__directions:hover {
  background-color: color-mix(in srgb, var(--color-gold) 12%, transparent);
}

.pickup-card__directions :deep(svg) {
  width: 16px;
  height: 16px;
  color: var(--color-gold);
}

.pickup-card__summary {
  margin-top: 295px;
  padding-top: 20px;
  border-top: 1px solid #262626;
}

.pickup-card__summary h3 {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
  color: #FFEFAD;
}

.pickup-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-family: var(--font-body);
  font-size: 14px;
  color: rgba(250, 250, 250, 0.65);
}

.pickup-card__row--grand {
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  color: var(--color-white);
}

/* ==================================================
   TABLET
================================================== */

@media (max-width: 1100px) {
  .track-order {
    padding: 120px 24px 70px;
  }

  .track-order__layout {
    grid-template-columns: 1fr;
  }
}

/* ==================================================
   MOBILE
================================================== */

@media (max-width: 768px) {
  .track-order {
    padding: 100px 16px 40px;
  }

  .track-order__layout {
    gap: 16px;
  }

  .track-order__main,
  .track-order__aside {
    gap: 16px;
  }

  .status-card__head,
  .pickup-card__head {
    height: 54px;
    padding: 0 16px;
  }

  .status-card__head h1,
  .pickup-card__head h2 {
    font-size: 14px;
  }

  .status-card__back {
    width: 27px;
    height: 27px;
    border-radius: 6px;
  }

  .status-card__back :deep(svg) {
    width: 14px;
    height: 14px;
  }

  .status-card__body {
    padding: 20px 16px 24px;
  }

  .status-card__meta-label {
    font-size: 12px;
  }

  .status-card__order-pill {
    height: 28px;
    font-size: 11px;
  }

  .status-card__time {
    margin-top: 10px;
    font-size: 26px;
  }

  .status-steps {
    margin-top: 28px;
  }

  .status-steps__badge {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 13px;
  }

  .status-steps__label {
    font-size: 11px;
  }

  .promo-card {
    padding: 16px;
  }

  .promo-card__head {
    margin-bottom: 16px;
  }

  .promo-card__head h2 {
    font-size: 16px;
  }

  .promo-card__icon {
    width: 36px;
    height: 36px;
  }

  .promo-card__icon :deep(svg) {
    width: 15px;
    height: 15px;
  }

  .promo-card__image {
    height: 340px;
    border-radius: 10px;
  }

  .pickup-card__body {
    padding: 16px 16px 20px;
  }

  .pickup-card__top h3 {
    font-size: 17px;
  }

  .pickup-card__address {
    max-width: none;
  }

  .pickup-card__hours {
    font-size: 13px;
  }

  .pickup-card__directions {
    height: 40px;
    font-size: 12px;
  }

  .pickup-card__summary {
    margin-top: 20px;
    padding-top: 16px;
  }
}
</style>
