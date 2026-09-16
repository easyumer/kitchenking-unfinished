<script setup>
defineProps({
  label: { type: String, default: 'Submit' }
})
</script>

<template>
  <button type="submit" class="submit-button">
    <span class="submit-button__text-wrap">
      <span class="submit-button__text">{{ label }}</span>
      <span class="submit-button__text submit-button__text--hover">{{ label }}</span>
    </span>

    <span class="submit-button__icon-wrap">
      <IconArrowRight class="submit-button__icon" />
    </span>
  </button>
</template>

<style scoped>
.submit-button {
  position: relative;
  overflow: hidden;

  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  gap: calc(100vw * 24 / 1920);
  height: calc(100vw * 100 / 1920);
  padding: 0 calc(100vw * 40 / 1920);

  margin-top: 29px;
  margin-left: 18px;
  border: none;
  border-radius: calc(100vw * 8 / 1920);

  background: var(--color-gold);
  cursor: pointer;

  transition:
    background-color 0.35s var(--ease-out-expo),
    box-shadow 0.35s var(--ease-out-expo);
}

.submit-button:hover {
  background-color: var(--color-gold-200);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--color-gold) 45%, transparent);
}

.submit-button__text-wrap {
  position: relative;
  overflow: hidden;
  display: block;
  height: 2.2em;
  line-height: 1.5;
}

.submit-button__text {
  display: block;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 24 / 1920);
  line-height: 1.5;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-deep);
  transition: transform 0.55s cubic-bezier(0.76, 0, 0.24, 1);
}

.submit-button__text--hover {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(100%);
}

.submit-button:hover .submit-button__text {
  transform: translateY(-100%);
}

.submit-button:hover .submit-button__text--hover {
  transform: translateY(0);
}

.submit-button__icon-wrap {
  position: relative;
  flex-shrink: 0;

  display: grid;
  place-items: center;

  width: calc(100vw * 32 / 1920);
  height: calc(100vw * 32 / 1920);
}

.submit-button__icon {
  width: 100%;
  height: 100%;
  color: var(--color-deep);
}

@media (max-width: 768px) {
  .submit-button {
    height: 56px;
    width: 270px;
    gap: 0;
    padding: 0 20px;
    border-radius: 12px;
    bottom: 42px;
  }

  .submit-button__text-wrap {
    flex: 1;
  }

  .submit-button__text {
    font-size: 18px;
  }

  .submit-button__icon-wrap {
    width: 20px;
    height: 20px;
  }
}
</style>
