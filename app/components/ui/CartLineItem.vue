<script setup>
defineProps({
  item: { type: Object, required: true }
})

const { incrementItem, decrementItem, removeItem } = useCart()
</script>

<template>
  <div class="cart-line">
    <img v-if="item.image" class="cart-line__image" :src="item.image" :alt="item.name" />
    <div v-else class="cart-line__image cart-line__image--placeholder" />

    <div class="cart-line__info">
      <div class="cart-line__top">
        <span class="cart-line__name">{{ item.name }}</span>
        <span class="cart-line__price">{{ item.price }}</span>
      </div>

      <div class="cart-line__controls">
        <div class="cart-line__stepper">
          <button type="button" aria-label="Decrease quantity" @click="decrementItem(item.id)">
            <IconMinus />
          </button>
          <span>{{ item.quantity }}</span>
          <button type="button" aria-label="Increase quantity" @click="incrementItem(item.id)">
            <IconPlus />
          </button>
        </div>

        <button type="button" class="cart-line__remove" aria-label="Remove item" @click="removeItem(item.id)">
          <IconTrash />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-line {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cart-line__image {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-line__image--placeholder {
  background-color: var(--color-deep);
}

.cart-line__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cart-line__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}

.cart-line__name {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-offwhite);
}

.cart-line__price {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-gold);
}

.cart-line__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-line__stepper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-line__stepper button,
.cart-line__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  background: none;
  color: var(--color-offwhite);
  cursor: pointer;
}

.cart-line__stepper button svg {
  width: 10px;
  height: 10px;
}

.cart-line__stepper span {
  min-width: 12px;
  text-align: center;
  font-size: 12px;
}

.cart-line__remove {
  border-color: transparent;
  color: rgba(250, 250, 250, 0.5);
}

.cart-line__remove svg {
  width: 14px;
  height: 14px;
}

.cart-line__remove:hover {
  color: var(--color-coral);
}
</style>
