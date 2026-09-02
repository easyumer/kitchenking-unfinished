<script setup>
defineProps({
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const { fadeIn, fadeUp } = useAnimation()

const nameOnCard = ref('')
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')

const handleSave = () => {
  emit('save', {
    nameOnCard: nameOnCard.value,
    cardNumber: cardNumber.value,
    expiryDate: expiryDate.value,
    cvv: cvv.value
  })
  emit('close')
}
</script>

<template>
  <AnimatePresence>
    <div v-if="open" class="card-modal" role="dialog" aria-modal="true">
      <Motion as="div" v-bind="fadeIn" class="card-modal__backdrop" @click="emit('close')" />

      <Motion as="div" v-bind="fadeUp" class="card-modal__panel">
        <h3 class="card-modal__heading">Credit/Debit Card</h3>

        <label class="card-modal__field">
          <span>Name on card</span>
          <input v-model="nameOnCard" type="text" placeholder="John Doe" />
        </label>

        <label class="card-modal__field">
          <span>Card Number</span>
          <input v-model="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX" />
        </label>

        <div class="card-modal__row">
          <label class="card-modal__field">
            <span>Expiry Date</span>
            <input v-model="expiryDate" type="text" placeholder="--/--" />
          </label>

          <label class="card-modal__field">
            <span>CVV</span>
            <input v-model="cvv" type="text" placeholder="***" />
          </label>
        </div>

        <button type="button" class="card-modal__submit" @click="handleSave">Save Info</button>
      </Motion>
    </div>
  </AnimatePresence>
</template>

<style scoped>
.card-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card-modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
}

.card-modal__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 760px;
  max-width: 100%;
  padding: 24px;
  background-color: var(--color-section);
  border-radius: 20px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}

.card-modal__heading {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 16px;
  color: #FFEFAD;
}

.card-modal__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-modal__field span {
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(250, 250, 250, 0.7);
}

.card-modal__field input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background-color: var(--color-section);
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--color-offwhite);
  transition: border-color 0.3s var(--ease-out-expo);
}

.card-modal__field input::placeholder {
  color: rgba(250, 250, 250, 0.35);
}

.card-modal__field input:focus {
  outline: none;
  border-color: var(--color-gold);
}

.card-modal__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.card-modal__submit {
  width: 100%;
  padding: 15px 18px;
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

.card-modal__submit:hover {
  background-color: var(--color-gold-200);
}

@media (max-width: 640px) {
  .card-modal__row {
    grid-template-columns: 1fr;
  }
}
</style>
