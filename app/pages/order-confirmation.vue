<script setup>
import { checkoutPattern } from '~/assets/images'
import checkoutPatternMobile from '~/assets/images/Background pattern mobile.png'

useSeoMeta({
  title: 'Order Confirmed | Kitchen King',
  description: 'Your Kitchen King order has been confirmed.'
})

</script>

<template>
  <main class="order-confirmation" :style="{
    '--checkout-pattern': `url('${checkoutPattern}')`,
    '--checkout-pattern-mobile': `url('${checkoutPatternMobile}')`
  }">
    <OrderConfirmationSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.order-confirmation {
  min-height: 100vh;
  background-color: #050505;
  background-image: var(--checkout-pattern);
  background-repeat: repeat;
  background-position: top left;
  background-size: auto;
}



@media (max-width: 768px) {
  .order-confirmation {
    background-image: var(--checkout-pattern-mobile);
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
}
</style>
