<script setup>
const email = ref('')
const submitted = ref(false)

const emit = defineEmits(['submit'])

function handleSubmit() {
  if (!email.value) return
  emit('submit', email.value)
  submitted.value = true
}
</script>

<template>
  <form class="notify-form" @submit.prevent="handleSubmit">
    <template v-if="!submitted">
      <input
        v-model="email"
        type="email"
        required
        placeholder="Enter your email here..."
        aria-label="Email address"
        class="notify-form__input"
      />
      <button type="submit" class="notify-form__button">Notify Me</button>
    </template>

    <p v-else class="notify-form__success">
      Thanks! We'll let you know as soon as we're ready.
    </p>
  </form>
</template>

<style scoped>
.notify-form {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 1920);
  width: 100%;
  max-width: calc(100vw * 900 / 1920);
}

.notify-form__input {
  flex: 1;
  height: calc(100vw * 70 / 1920);
  padding: 0 calc(100vw * 28 / 1920);
  border: 1.5px solid color-mix(in srgb, var(--color-deep) 35%, transparent);
  border-radius: calc(100vw * 12 / 1920);
  background: transparent;
  font-family: var(--font-body);
  font-size: calc(100vw * 15 / 1920);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-deep);
  transition: border-color 0.3s var(--ease-out-expo);
}

.notify-form__input::placeholder {
  color: color-mix(in srgb, var(--color-deep) 45%, transparent);
}

.notify-form__input:focus {
  outline: none;
  border-color: var(--color-deep);
}

.notify-form__button {
  flex-shrink: 0;
  height: calc(100vw * 70 / 1920);
  padding: 0 calc(100vw * 40 / 1920);
  border: none;
  border-radius: calc(100vw * 12 / 1920);
  background: var(--color-deep);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: calc(100vw * 15 / 1920);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
  transition: background-color 0.3s var(--ease-out-expo);
}

.notify-form__button:hover {
  background: color-mix(in srgb, var(--color-deep) 85%, var(--color-gold));
}

.notify-form__success {
  width: 100%;
  padding: calc(100vw * 22 / 1920) 0;
  font-family: var(--font-body);
  font-size: calc(100vw * 16 / 1920);
  font-weight: 600;
  text-align: center;
  color: var(--color-deep);
}

@media (prefers-reduced-motion: no-preference) {
  .notify-form__button {
    transition-property: background-color, transform;
  }

  .notify-form__button:active {
    transform: scale(0.97);
  }
}

@media (max-width: 768px) {
  .notify-form {
    flex-direction: column;
    gap: 12px;
  }

  .notify-form__input,
  .notify-form__button {
    width: 100%;
    height: 52px;
    padding: 0 18px;
    border-radius: 10px;
    font-size: 12px;
  }

  .notify-form__success {
    padding: 16px 0;
    font-size: 14px;
  }
}
</style>
