<script setup>
defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  open: { type: Boolean, default: false }
})
defineEmits(['toggle'])
</script>

<template>
  <div class="faq-item" :class="{ 'faq-item--open': open }">
    <button class="faq-item__top-bar" :aria-expanded="open" @click="$emit('toggle')">
      <span class="faq-item__question">{{ question }}</span>
      <IconChevronDown class="faq-item__chevron" />
    </button>
    <div class="faq-item__reveal">
      <div class="faq-item__reveal-inner">
        <p class="faq-item__answer">{{ answer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 202, 89, 0.12);
}

.faq-item__top-bar {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.faq-item__question {
  flex: 1 1 auto;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 20px;
  line-height: 1.4;
  color: var(--color-offwhite);
  transition: color 0.4s var(--ease-out-expo);
}

.faq-item--open .faq-item__question {
  color: var(--color-gold);
}

.faq-item__chevron {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.4s var(--ease-out-expo), color 0.4s var(--ease-out-expo);
}

.faq-item--open .faq-item__chevron {
  color: var(--color-gold);
  transform: rotate(180deg);
}

.faq-item__reveal {
  display: grid;
  grid-template-rows: 0fr;
  width: 100%;
  transition: grid-template-rows 0.5s var(--ease-out-expo);
}

.faq-item--open .faq-item__reveal {
  grid-template-rows: 1fr;
}

.faq-item__reveal-inner {
  overflow: hidden;
  min-height: 0;
}

.faq-item__answer {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(252, 254, 254, 0.6);
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.35s var(--ease-out-expo), transform 0.35s var(--ease-out-expo);
}

.faq-item--open .faq-item__answer {
  opacity: 1;
  transform: translateY(0);
}
</style>
