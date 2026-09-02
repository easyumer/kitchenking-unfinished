<script setup>
import { checkoutPattern } from '~/assets/images'

useSeoMeta({
  title: 'Your Cart | Kitchen King',
  description: 'Review your order and check out for pickup at Kitchen King, Nassau Bahamas.'
})
</script>

<template>
  <main
    class="checkout-page"
    :style="{ '--checkout-pattern': `url(${checkoutPattern})` }"
  >
    <CartCheckoutSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background-color: #050505;
  background-image: var(--checkout-pattern);
  background-repeat: repeat;
  background-position: top left;
  background-size: auto;
}
</style>