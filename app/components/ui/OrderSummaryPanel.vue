<script setup>
defineEmits(['place-order'])

const { itemCount, subtotal } = useCart()
const { taxRate } = useSiteConfig()

const tax = computed(() => subtotal.value * taxRate)
const grandTotal = computed(() => subtotal.value + tax.value)
</script>

<template>
  <div class="order-summary">
    <h3 class="order-summary__heading">Your Order</h3>

    <div class="order-summary__rows">
      <div class="order-summary__row">
        <span>Total</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="order-summary__row">
        <span>Taxes</span>
        <span>${{ tax.toFixed(2) }}</span>
      </div>
      <div class="order-summary__row order-summary__row--grand">
        <span>Grand Total</span>
        <span>${{ grandTotal.toFixed(2) }}</span>
      </div>
    </div>

    <button type="button" class="order-summary__submit" :disabled="!itemCount" @click="$emit('place-order')">
      <span>Place Order</span>
      <span>{{ itemCount }} item{{ itemCount === 1 ? '' : 's' }} &middot; ${{ grandTotal.toFixed(2) }}</span>
    </button>
  </div>
</template>

<style scoped>
.order-summary__heading {
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
  color: #FFEFAD;
}

.order-summary__rows {
  padding: 14px 16px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
}

.order-summary__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
}

.order-summary__row--grand {
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 15px;
  color: #FFEFAD;
}

.order-summary__submit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  margin-top: 18px;
  padding: 14px 18px;
  border: none;
  border-radius: 10px;
  background-color: var(--color-gold);
  color: var(--color-deep);
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: background-color 0.3s var(--ease-out-expo);
}

.order-summary__submit:hover:not(:disabled) {
  background-color: var(--color-gold-200);
}

.order-summary__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
