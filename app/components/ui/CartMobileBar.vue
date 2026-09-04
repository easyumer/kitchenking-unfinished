<script setup>
const { itemCount, subtotal } = useCart()
const route = useRoute()

const isVisible = computed(() => itemCount.value > 0 && route.path !== '/order')
</script>

<template>
  <NuxtLink v-if="isVisible" to="/order" class="cart-mobile-bar">

    <div class="cart-mobile-bar__action">
      View Cart
      <IconArrowUpRight />
    </div>
    <div class="cart-mobile-bar__summary">
      {{ itemCount }} <span v-if="itemCount !== 1">Items</span><span v-else="itemCount !== 1">Item</span>
      <span>|</span>
      ${{ subtotal.toFixed(2) }}
    </div>


  </NuxtLink>
</template>

<style scoped>
.cart-mobile-bar {
  display: none;
}

@media (max-width: 768px) {
  .cart-mobile-bar {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 0;
    right: 0;
    bottom: -7px;
    min-height: 59px;
    padding: 12px 20px calc(12px + env(safe-area-inset-bottom, 0px));
    background: var(--color-gold);
    border-radius: 10px;
    z-index: 9999;
    color: var(--color-deep);
    font-family: var(--font-display);
    font-weight: 700;
    text-transform: uppercase;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.35);
  }

  .cart-mobile-bar__summary {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
  }

  .cart-mobile-bar__action {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }

  .cart-mobile-bar svg {
    width: 18px;
    height: 18px;
  }
}
</style>
