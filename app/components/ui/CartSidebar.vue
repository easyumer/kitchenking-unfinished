<script setup>
const { items, itemCount, subtotal } = useCart()
</script>

<template>
  <aside class="cart-sidebar">
    <div class="cart-sidebar__panel">
      <p v-if="!items.length" class="cart-sidebar__empty">Your cart is empty — add something tasty.</p>
      <CartLineItem v-for="item in items" :key="item.id" :item="item" />
    </div>

    <div class="cart-sidebar__footer">
      <span>View Cart</span>
      <span class="cart-sidebar__summary">
        {{ itemCount }} item{{ itemCount === 1 ? '' : 's' }} &middot; ${{ subtotal.toFixed(2) }}
      </span>
    </div>
  </aside>
</template>

<style scoped>
.cart-sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--color-section);
  border-radius: 16px;
  overflow: hidden;
}

.cart-sidebar__panel {
  padding: 16px;
  max-height: calc(100vh - 320px);
  min-height: 160px;
  overflow-y: auto;
}

.cart-sidebar__empty {
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
}

.cart-sidebar__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background-color: var(--color-gold);
  color: var(--color-deep);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.cart-sidebar__summary {
  font-family: var(--font-body);
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
}
</style>
