<script setup>
const faqs = [
  {
    question: 'Do I need to make a reservation, or do you accept walk-ins?',
    answer:
      'Reservations are recommended, especially on weekends. Walk-ins are welcome when tables are available. To guarantee your seat, book ahead through our Reserve a Table page.'
  },
  {
    question: 'Do you offer vegetarian, vegan, or gluten-free options?',
    answer:
      'Yes, we offer a range of vegetarian and plant-based dishes, and can accommodate gluten-free requests. Let your server know about any dietary needs when you order.'
  },
  {
    question: 'Can I host a private event or large group at your restaurant?',
    answer:
      'Absolutely. We welcome private events and large groups — reach out ahead of time so we can prepare the space and menu for your party.'
  },
  {
    question: 'Do you offer takeaway or delivery?',
    answer: 'Yes, takeaway is available at the counter, and delivery is offered through our online ordering page.'
  }
]

const openIndex = ref(0)

function toggle(index) {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <section class="faq">
    <div class="faq__title">
      <h2>Frequently asked questions</h2>
      <p>Find helpful information about dining with us.</p>
    </div>

    <div class="faq__list">
      <div
        v-for="(item, index) in faqs"
        :key="item.question"
        class="faq__item"
        :class="{ 'faq__item--open': openIndex === index }"
      >
        <button class="faq__top-bar" :aria-expanded="openIndex === index" @click="toggle(index)">
          <span class="faq__question">{{ item.question }}</span>
          <IconChevronDown class="faq__chevron" />
        </button>
        <div class="faq__reveal">
          <div class="faq__reveal-inner">
            <p class="faq__answer">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 160px 48px;
  background-color: var(--color-deep);
  border-radius: 48px;
}

.faq__title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1208px;
  margin: 0 auto;
}

.faq__title h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(28px, 3.5vw, 40px);
  line-height: 1.2;
  color: var(--color-gold-light);
}

.faq__title p {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 20px;
  line-height: 1.2;
  color: var(--color-offwhite);
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 1208px;
  margin: 0 auto;
}

.faq__item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(245, 166, 35, 0.12);
}

.faq__top-bar {
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

.faq__question {
  flex: 1 1 auto;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 20px;
  line-height: 1.4;
  color: var(--color-offwhite);
  transition: color 0.4s var(--ease-out-expo);
}

.faq__item--open .faq__question {
  color: var(--color-gold);
}

.faq__chevron {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.4s var(--ease-out-expo), color 0.4s var(--ease-out-expo);
}

.faq__item--open .faq__chevron {
  color: var(--color-gold);
  transform: rotate(180deg);
}

.faq__reveal {
  display: grid;
  grid-template-rows: 0fr;
  width: 100%;
  transition: grid-template-rows 0.5s var(--ease-out-expo);
}

.faq__item--open .faq__reveal {
  grid-template-rows: 1fr;
}

.faq__reveal-inner {
  overflow: hidden;
  min-height: 0;
}

.faq__answer {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(252, 254, 254, 0.6);
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.35s var(--ease-out-expo), transform 0.35s var(--ease-out-expo);
}

.faq__item--open .faq__answer {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .faq {
    padding: 64px 24px;
  }
}
</style>
