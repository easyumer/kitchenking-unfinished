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
      <FaqItem
        v-for="(item, index) in faqs"
        :key="item.question"
        :question="item.question"
        :answer="item.answer"
        :open="openIndex === index"
        @toggle="toggle(index)"
      />
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
  border-radius: 48px 48px 0 0;
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

@media (max-width: 768px) {
  .faq {
    padding: 64px 24px;
  }
}
</style>
