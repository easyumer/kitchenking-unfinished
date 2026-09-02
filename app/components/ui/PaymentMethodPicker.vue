<script setup>
import IconCard from './IconCard.vue'
import IconCash from './IconCash.vue'
import IconDollarCircle from './IconDollarCircle.vue'

const selected = defineModel({ type: String, default: 'card' })

const methods = [
  { id: 'card', label: 'Card', icon: IconCard },
  { id: 'cash', label: 'Cash', icon: IconCash },
  { id: 'app', label: 'App Integration', icon: IconDollarCircle }
]

const showCardModal = ref(false)

const selectMethod = (methodId) => {
  selected.value = methodId
  if (methodId === 'card') showCardModal.value = true
}
</script>

<template>
  <div class="payment-method">
    <h3 class="payment-method__heading">Payment Method</h3>

    <div class="payment-method__grid">
      <button
        v-for="method in methods"
        :key="method.id"
        type="button"
        class="payment-method__tile"
        :class="{ 'payment-method__tile--active': selected === method.id }"
        @click="selectMethod(method.id)"
      >
        <component :is="method.icon" />
        <span>{{ method.label }}</span>
      </button>
    </div>

    <CardDetailsModal :open="showCardModal" @close="showCardModal = false" />
  </div>
</template>

<style scoped>
.payment-method__heading {
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
  color: var(--color-offwhite);
}

.payment-method__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.payment-method__tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background-color: var(--color-section);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  color: rgba(250, 250, 250, 0.6);
  transition: border-color 0.3s var(--ease-out-expo), color 0.3s var(--ease-out-expo);
}

.payment-method__tile svg {
  width: 30px;
  height: 30px;
}

.payment-method__tile:hover {
  border-color: #FFCA59;
}

.payment-method__tile--active {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

@media (max-width: 480px) {
  .payment-method__grid {
    gap: 8px;
  }

  .payment-method__tile {
    padding: 14px 4px;
  }
}
</style>
