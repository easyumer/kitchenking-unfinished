<script setup>
const props = defineProps({
  item: { type: Object, required: true }
})

const { incrementItem, decrementItem } = useCart()

const expanded = ref(false)
const lineTotal = computed(() => parsePrice(props.item.price) * props.item.quantity)
const hasDetails = computed(() => Boolean(props.item.description || props.item.optionGroups?.length))
</script>

<template>
  <div class="cart-order-line">
    <img v-if="item.image" class="cart-order-line__image" :src="item.image" :alt="item.name" />
    <div v-else class="cart-order-line__image cart-order-line__image--placeholder" />

    <div class="cart-order-line__body">
      <div class="cart-order-line__top">
        <div class="cart-order-line__title">
          <span class="cart-order-line__name">{{ item.name }}</span>
          <span v-if="item.variant" class="cart-order-line__variant">{{ item.variant }}</span>
        </div>
        <span class="cart-order-line__price">${{ lineTotal.toFixed(2) }}</span>
      </div>

      <div class="cart-order-line__controls">
        <div class="cart-order-line__stepper">
          <button type="button" :aria-label="item.quantity === 1 ? 'Remove item' : 'Decrease quantity'"
            @click="decrementItem(item.id)">
            <IconTrash v-if="item.quantity === 1" />
            <IconMinus v-else />
          </button>
          <span>{{ item.quantity }}</span>
          <button type="button" aria-label="Increase quantity" @click="incrementItem(item.id)">
            <IconPlus />
          </button>
        </div>

        <button type="button" class="cart-order-line__edit" aria-label="Edit item">
          <IconEdit />
        </button>

        <button v-if="hasDetails" type="button" class="cart-order-line__details-toggle" :aria-expanded="expanded"
          @click="expanded = !expanded">
          Details
          <IconChevronDown :class="{ 'cart-order-line__chevron--open': expanded }" />
        </button>
      </div>

      <div v-if="expanded" class="cart-order-line__details">
        <p v-if="item.description">{{ item.description }}</p>
        <p v-for="group in item.optionGroups" :key="group.label">
          <span class="cart-order-line__details-label">{{ group.label }}:</span> {{ group.valueText }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-order-line {

  display: flex;

  gap: 14px;

  padding: 12px 0;

}

.cart-order-line__image {

  flex-shrink: 0;

  width: 84px;

  height: 74px;

  border-radius: 8px;

  object-fit: cover;

}

.cart-order-line__image--placeholder {
  background-color: var(--color-deep);
}

.cart-order-line__body {

  flex: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 6px;

}

.cart-order-line__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.cart-order-line__title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cart-order-line__name {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  color: var(--color-offwhite);
}

.cart-order-line__variant {
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(250, 250, 250, 0.5);
}

.cart-order-line__price {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-gold);
}

.cart-order-line__controls {

  display: flex;

  align-items: center;

  height: 22px;

  margin-top: 2px;

}

.cart-order-line__stepper {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 22px;
  padding: 0 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
}

.cart-order-line__stepper button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  color: var(--color-offwhite);
  cursor: pointer;
}

.cart-order-line__stepper button svg {
  width: 10px;
  height: 10px;
}

.cart-order-line__stepper span {
  min-width: 14px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--color-offwhite);
}

.cart-order-line__edit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: none;
  color: var(--color-offwhite);
  cursor: pointer;
}

.cart-order-line__edit svg {
  width: 11px;
  height: 11px;
}

.cart-order-line__details-toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  height: 22px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  padding: 0 10px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 11px;
  color: #b0b0b0;
}

.cart-order-line__details-toggle svg {
  width: 10px;
  height: 10px;
  transition: transform 0.3s var(--ease-out-expo);
}

.cart-order-line__chevron--open {
  transform: rotate(180deg);
}

.cart-order-line__details {
  margin-top: 4px;
}

.cart-order-line__details p {
  margin: 0;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.5;
  color: rgba(250, 250, 250, 0.6);
}

.cart-order-line__details p+p {
  margin-top: 6px;
}

.cart-order-line__details-label {
  font-weight: 600;
  color: rgba(250, 250, 250, 0.8);
}
</style>
