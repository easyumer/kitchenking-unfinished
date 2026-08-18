<script setup>
defineEmits(['click'])
</script>

<template>
  <button class="add-to-cart" type="button" @click="$emit('click')">
    <span>Add to Cart</span>
    <IconPlus />
  </button>
</template>

<style scoped>
.add-to-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(100vw * 8 / 1920);
  width: 100%;
  padding: calc(100vw * 16 / 1920) calc(100vw * 20 / 1920);
  border: 1px solid var(--color-gold);
  border-radius: calc(100vw * 12 / 1920);
  background-color: rgba(26, 26, 26, 0.6);
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 16 / 1920);
  line-height: 1.25;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-gold);
  transition:
    background-color 0.3s var(--ease-out-expo),
    border-color 0.3s var(--ease-out-expo);
}

.add-to-cart:hover {
  background-color: rgba(255, 202, 89, 0.12);
  border-color: var(--color-gold-200);
}

.add-to-cart svg {
  width: calc(100vw * 20 / 1920);
  height: calc(100vw * 20 / 1920);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .add-to-cart {
    padding: 14px 16px;
    font-size: 14px;
  }

  .add-to-cart svg {
    width: 18px;
    height: 18px;
  }
}
</style>
