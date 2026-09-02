<script setup>
const name = defineModel('name', { type: String, default: '' })
const phone = defineModel('phone', { type: String, default: '' })
</script>

<template>
  <div class="contact-form">
    <h3 class="contact-form__heading">Contact Info</h3>

    <div class="contact-form__grid">
      <label class="contact-form__field">
        <span>Name</span>
        <input v-model="name" type="text" placeholder="For calling out your order" />
      </label>

      <label class="contact-form__field">
        <span>Phone number</span>
        <input v-model="phone" type="tel" placeholder="For pickup and updates" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.contact-form__heading {
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
  color: #FFEFAD;
}

.contact-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-form__field span {
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(250, 250, 250, 0.5);
}

.contact-form__field input {
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

.contact-form__field input::placeholder {
  color: rgba(250, 250, 250, 0.35);
}

.contact-form__field input:focus {
  outline: none;
  border-color: var(--color-gold);
}

@media (max-width: 640px) {
  .contact-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
