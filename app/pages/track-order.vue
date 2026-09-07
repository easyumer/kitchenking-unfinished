<script setup>

import { checkoutPattern } from '~/assets/images'
import checkoutPatternMobile from '~/assets/images/Background pattern mobile.png'

useSeoMeta({
  title: 'Track Order | Kitchen King',
  description: 'Track your Kitchen King order status.'
})
</script>

<template>
  <main class="track-order-page" :style="{
    '--checkout-pattern': `url('${checkoutPattern}')`,
    '--checkout-pattern-mobile': `url('${checkoutPatternMobile}')`
  }">
    <TrackOrderSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.track-order-page {
  min-height: 100vh;
  background-color: #050505;
  background-image: var(--checkout-pattern);
  background-repeat: repeat;
  background-position: top left;
  background-size: auto;
}

@media (max-width: 768px) {
  .track-order-page {
    background-image: var(--checkout-pattern-mobile);
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
}
</style>
