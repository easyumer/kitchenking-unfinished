<script setup>
import burgerImage from '~/assets/images/menu-item-burger.jpg'

const sharedDescription =
  "Double smashed beef patties, American cheese, grilled onions, signature house sauce, served on a soft buttery brioche bun"
const sharedNote = 'Extra details can be added here for examples Sauces, Quantity etc.'

const categories = [
  {
    name: 'Burgers & Sandwiches',
    items: [
      { title: 'KitchenKing Smash Burger', price: '$14' },
      { title: 'Plantain Smash Burger', price: '$14' },
      { title: 'Jerk Chicken Sliders', price: '$14' }
    ]
  },
  {
    name: 'Caribbean Bowls',
    items: [
      { title: 'Char Grilled Chicken Bowl', price: '$14' },
      { title: 'Halal Kart Style Chicken Bowl', price: '$14' },
      { title: 'Steak Bowl', price: '$14' }
    ]
  },
  {
    name: 'Wings',
    items: [{ title: '6 Piece Crispy Wings', price: '$14' }]
  },
  {
    name: 'Fries',
    items: [
      { title: 'Seasoned Fries', price: '$14' },
      { title: 'Truffle Parmesan Loaded Fries', price: '$14' },
      { title: 'Bacon Loaded Fries', price: '$14' }
    ]
  }
]

const activeItemPerCategory = ref(categories.map(() => null))

function toggleItem(categoryIndex, itemIndex) {
  activeItemPerCategory.value[categoryIndex] =
    activeItemPerCategory.value[categoryIndex] === itemIndex ? null : itemIndex
}

function formatIndex(i) {
  return String(i + 1).padStart(2, '0')
}
</script>

<template>
  <section class="menu">
    <div class="menu__title">
      <h2>Our Menu</h2>
    </div>

    <div class="menu__categories">
      <div v-for="(category, categoryIndex) in categories" :key="category.name" class="menu-category">
        <h3 class="menu-category__label">{{ category.name }}</h3>
        <div class="menu-category__items">
          <MenuItemRow
            v-for="(item, itemIndex) in category.items"
            :key="item.title"
            :index="formatIndex(itemIndex)"
            :title="item.title"
            :price="item.price"
            :description="sharedDescription"
            :note="sharedNote"
            :image="burgerImage"
            :active="activeItemPerCategory[categoryIndex] === itemIndex"
            @toggle="toggleItem(categoryIndex, itemIndex)"
          />
        </div>
      </div>
    </div>

    <PillButton to="/menu" variant="accent">
      <span>View The Full Menu</span>
      <IconArrowRight />
    </PillButton>
  </section>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 160px 48px;
  max-width: 1920px;
  margin: 0 auto;
}

.menu__title {
  width: 100%;
  max-width: 1208px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(245, 166, 35, 0.18);
}

.menu__title h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(28px, 3.5vw, 40px);
  line-height: 1.2;
  color: var(--color-gold-light);
}

.menu__categories {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  max-width: 1208px;
}

.menu-category {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.menu-category__label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  color: var(--color-gold);
}

.menu-category__items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 768px) {
  .menu {
    padding: 100px 24px;
  }
}
</style>
