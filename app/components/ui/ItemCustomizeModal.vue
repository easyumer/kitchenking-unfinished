<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  item: { type: Object, default: null }
})



import { onBeforeUnmount } from 'vue'

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  document.body.style.overflow = ''
}

onBeforeUnmount(() => {
  unlockScroll()
})

const closeModal = () => {
  unlockScroll()
  emit('close')
}

const emit = defineEmits(['close'])

const { addItem } = useCart()
const { fadeIn, fadeUp } = useAnimation()

const quantity = ref(1)
const selections = reactive({})

// Re-seeds quantity/selections to the item's defaults every time the modal is
// opened, so reopening a different card (or the same one again) never carries
// over a previous customization.
const resetSelections = () => {
  quantity.value = 1
  const groups = props.item?.customization?.groups ?? []
  groups.forEach((group) => {
    selections[group.id] = group.type === 'multiple'
      ? group.options.filter((o) => o.default).map((o) => o.id)
      : (group.options.find((o) => o.default)?.id ?? group.options[0]?.id ?? null)
  })
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    resetSelections()
    lockScroll()
  } else {
    unlockScroll()
  }
})

const basePrice = computed(() => Number(String(props.item?.price ?? '0').replace(/[^0-9.]/g, '')) || 0)

const groupDelta = (group) => {
  if (group.type === 'multiple') {
    const selected = selections[group.id] ?? []
    return group.options.filter((o) => selected.includes(o.id)).reduce((sum, o) => sum + o.priceDelta, 0)
  }
  return group.options.find((o) => o.id === selections[group.id])?.priceDelta ?? 0
}

const unitPrice = computed(() => {
  const groups = props.item?.customization?.groups ?? []
  return basePrice.value + groups.reduce((sum, group) => sum + groupDelta(group), 0)
})

const totalPrice = computed(() => unitPrice.value * quantity.value)

const toggleMultiple = (group, optionId) => {
  const list = selections[group.id]
  const index = list.indexOf(optionId)
  if (index === -1) list.push(optionId)
  else list.splice(index, 1)
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value -= 1
}
const increaseQuantity = () => {
  quantity.value += 1
}

const formatDelta = (priceDelta) => (priceDelta ? `+$${priceDelta.toFixed(2)}` : 'Free')

const handleAddToOrder = () => {
  // Distinct option combinations become distinct cart lines (e.g. Large +
  // Jalapeños vs. Regular plain), while identical repeat orders still stack
  // onto the same line via useCart's existing id-match logic.
  const groups = props.item?.customization?.groups ?? []
  const optionKey = groups
    .map((group) => {
      const selected = selections[group.id]
      return Array.isArray(selected) ? selected.join(',') : selected
    })
    .filter(Boolean)
    .join('|')

  // The "size" group (if any) surfaces as a standalone variant tag on the
  // cart line (e.g. "Large"); every other group summarizes into a labeled
  // line the cart page can expand — "Toppings: Cheese, Grilled onions".
  const sizeGroup = groups.find((group) => group.id === 'size')
  const variant = sizeGroup?.options.find((o) => o.id === selections[sizeGroup.id])?.label ?? null

  const optionGroups = groups
    .filter((group) => group.id !== 'size')
    .map((group) => {
      const selected = selections[group.id]
      const labels = Array.isArray(selected)
        ? group.options.filter((o) => selected.includes(o.id)).map((o) => o.label)
        : [group.options.find((o) => o.id === selected)?.label].filter(Boolean)
      return labels.length ? { label: group.label, valueText: labels.join(', ') } : null
    })
    .filter(Boolean)

  addItem(
    {
      id: optionKey ? `${props.item.id}__${optionKey}` : props.item.id,
      name: props.item.name,
      price: `$${unitPrice.value.toFixed(2)}`,
      image: props.item.image,
      description: props.item.description,
      variant,
      optionGroups
    },
    quantity.value
  )
  closeModal()
}
</script>

<template>
  <AnimatePresence>
    <div v-if="open && item" class="item-modal" role="dialog" aria-modal="true">
      <Motion as="div" v-bind="fadeIn" class="item-modal__backdrop" @click="closeModal" />

      <Motion as="div" v-bind="fadeUp" class="item-modal__panel">
        <div class="item-modal__header">
          <img v-if="item.image" class="item-modal__image" :src="item.image" :alt="item.name" />
          <div v-else class="item-modal__image item-modal__image--placeholder" />

          <div class="item-modal__info">
            <h3 class="item-modal__name">{{ item.name }}</h3>
            <p class="item-modal__description">{{ item.description }}</p>
            <div class="item-modal__price-row">

              <span class="item-modal__base-price">
                {{ item.price }} base price
              </span>

              <div class="item-modal__stepper">
                <button type="button" aria-label="Decrease quantity" @click="decreaseQuantity">
                  <IconMinus />
                </button>
                <span>{{ quantity }}</span>
                <button type="button" class="item-modal__increase" aria-label="Increase quantity"
                  @click="increaseQuantity">
                  <IconPlus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-for="group in item.customization?.groups ?? []" :key="group.id" class="item-modal__section">
          <div class="item-modal__section-head">
            <span class="item-modal__eyebrow">{{ group.label }}</span>
            <span class="item-modal__pill">{{ group.pickLabel }}</span>
          </div>

          <label v-for="option in group.options" :key="option.id" class="item-modal__option">
            <span class="item-modal__option-left">
              <input v-if="group.type === 'multiple'" type="checkbox"
                class="item-modal__control item-modal__control--checkbox"
                :checked="selections[group.id]?.includes(option.id)" @change="toggleMultiple(group, option.id)" />
              <input v-else v-model="selections[group.id]" type="radio" class="item-modal__control"
                :name="`${item.id}-${group.id}`" :value="option.id" />
              {{ option.label }}
            </span>
            <span class="item-modal__option-price">{{ formatDelta(option.priceDelta) }}</span>
          </label>
        </div>

        <div class="item-modal__footer">
          <button type="button" class="item-modal__cancel" @click="closeModal">Cancel</button>
          <button type="button" class="item-modal__submit" @click="handleAddToOrder">
            <span>Add to Order</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </button>
        </div>
      </Motion>
    </div>
  </AnimatePresence>
</template>

<style scoped>
.item-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.item-modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
}

.item-modal__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 680px;
  max-height: calc(99vh - 48px);
  overflow-y: auto;
  padding: 10px;
  background-color: var(--color-deep);
  border-radius: 22px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}

.item-modal__header {
  display: flex;
  gap: 16px;
  padding-bottom: 10px;
}

.item-modal__image {
  flex-shrink: 0;
  width: 220px;
  height: 170px;
  border-radius: 11px;
  object-fit: cover;
}

.item-modal__image--placeholder {
  background-color: var(--color-section);
}

.item-modal__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.item-modal__name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  padding-top: 10px;
  font-size: 19px;
  line-height: 1.25;
  color: var(--color-offwhite);
}

.item-modal__description {
  margin: 6px 0 10px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.4;
  color: rgba(250, 250, 250, 0.6);
}

.item-modal__base-price {
  margin-top: 10px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 16px;
  color: var(--color-gold);
}

.item-modal__stepper {
  display: flex;
  align-items: center;
  gap: 14px;
  width: fit-content;
  margin-top: 12px;
  background: #1A1A1A;
  padding: 6px 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

.item-modal__stepper button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--color-offwhite);
  cursor: pointer;
}

.item-modal__stepper button svg {
  width: 11px;
  height: 11px;
}

.item-modal__stepper span {
  min-width: 12px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-offwhite);
}

.item-modal__section {
  padding: 16px 18px;
  background-color: var(--color-section);
  border-radius: 14px;
}

.item-modal__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.item-modal__eyebrow {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.item-modal__pill {
  padding: 3px 10px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.08);
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(250, 250, 250, 0.6);
}

.item-modal__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  cursor: pointer;
}

.item-modal__option-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-offwhite);
}

.item-modal__option-price {
  flex-shrink: 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
}

.item-modal__control {
  flex-shrink: 0;
  appearance: none;
  position: relative;
  width: 17px;
  height: 17px;
  margin: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.item-modal__control:checked {
  border-color: var(--color-gold);
}

.item-modal__control:checked::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background-color: var(--color-gold);
}

.item-modal__control--checkbox {
  border-radius: 5px;
}

.item-modal__control--checkbox:checked::after {
  content: '';
  position: absolute;
  inset: auto;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border-radius: 0;
  background: none;
  border: solid var(--color-offwhite);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.item-modal__footer {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.item-modal__cancel,
.item-modal__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 18px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background-color 0.3s var(--ease-out-expo), border-color 0.3s var(--ease-out-expo);
}

.item-modal__cancel {
  flex: 1;
  border: 1px solid var(--color-gold);
  background: transparent;
  color: var(--color-gold);
}

.item-modal__cancel:hover {
  background-color: rgba(255, 202, 89, 0.12);
}

.item-modal__submit {
  flex: 1.6;
  justify-content: space-between;
  border: 1px solid var(--color-gold);
  background-color: var(--color-gold);
  color: var(--color-deep);
}


.item-modal__submit:hover {
  background-color: var(--color-gold-200);
}




.item-modal__stepper .item-modal__increase {
  color: var(--color-gold);
}

@media (max-width: 768px) {

  .item-modal__price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .item-modal {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    padding: 0;
    align-items: stretch;
    justify-content: stretch;
    z-index: 99999;
  }

  .item-modal__backdrop {
    position: fixed;
    inset: 0;
  }

  .item-modal__panel {
    width: 100%;
    height: 100dvh;
    max-height: none;
    overflow-y: auto;

    padding: 14px;
    gap: 10px;

    border-radius: 0;
  }

  .item-modal__header {
    display: block;
    padding-bottom: 5px;
  }

  .item-modal__image {
    width: 100%;
    height: 190px;
    border-radius: 10px;
    object-fit: cover;
  }

  .item-modal__info {
    padding: 0 4px;
  }

  .item-modal__name {
    font-size: 14px;
    padding-top: 15px;
  }

  .item-modal__description {
    font-size: 11px;
    line-height: 1.35;
    padding-bottom: 7px;
  }

  .item-modal__base-price {
    margin: 0;
    font-size: 14px;
  }


  .item-modal__stepper {
    margin: 0;
    margin-right: -11px;
    transform: scale(.85);
  }

  .item-modal__section {
    padding: 12px;
    border-radius: 10px;
  }


  .item-modal__option {
    padding: 7px 0;
  }


  .item-modal__footer {
    position: static;
    bottom: 0;
    background: var(--color-deep);
    padding-top: 6px;
  }


  .item-modal__cancel,
  .item-modal__submit {
    padding: 12px;
    font-size: 11px;
  }

  .item-modal__stepper .item-modal__increase {
    color: var(--color-gold);
  }

}
</style>
