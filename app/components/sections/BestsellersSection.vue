<script setup>
import burgersImg from '~/assets/images/menu-category-burgers.jpg'
import bowlsImg from '~/assets/images/menu-category-bowls.jpg'
import wingsImg from '~/assets/images/menu-category-wings.jpg'
import dessertsImg from '~/assets/images/menu-category-desserts.jpg'

// Lemonade and the loaded fries have no matching photo yet (the leftover
// "special-*" assets turned out to be mismatched stock photos — a sushi
// platter and a cocktail — not the dishes their filenames claimed), so they
// render ProductCard's placeholder state instead of a wrong picture. The
// burger and bowl photos repeat across two items each because that's what
// the reference itself shows (the source file reuses the same two images).
const products = [
  {
    price: '$11.99',
    name: 'KitchenKing Smash Burger',
    description:
      'Double smashed beef patties, American cheese, grilled onions, signature house sauce, served on a soft buttery brioche bun.',
    image: burgersImg
  },
  {
    price: '$3.99',
    name: 'Classic Lemonade',
    description: 'Fresh-squeezed lemons, lightly sweetened and served ice-cold.',
    image: null
  },
  {
    price: '$11.99',
    name: 'Jerk Chicken Sliders',
    description: 'Slow-marinated jerk chicken, pickled slaw, and spicy mayo on soft mini buns.',
    image: burgersImg
  },
  {
    price: '$7.99',
    name: 'Truffle Parmesan Loaded Fries',
    description: 'Crispy fries tossed in truffle oil and shaved parmesan, finished with fresh herbs.',
    image: null
  },
  {
    price: '$15.99',
    name: 'Char Grilled Chicken Bowl',
    description: 'Char-grilled chicken, quinoa, roasted pineapple, tomato, and avocado.',
    image: bowlsImg
  },
  {
    price: '$3.99',
    name: 'Sweet Plantain Soft Serve',
    description: 'Creamy soft serve infused with caramelized sweet plantain.',
    image: dessertsImg
  },
  {
    price: '$15.99',
    name: 'Steak Bowl',
    description: 'Grilled steak, quinoa, roasted pineapple, tomato, and avocado.',
    image: bowlsImg
  },
  {
    price: '$9.99',
    name: '6 Piece Crispy Wings',
    description: 'Six crispy fried wings served with a side of house hot sauce.',
    image: wingsImg
  }
]
</script>

<template>
  <section class="bestsellers">
    <h2 class="bestsellers__heading">Bestsellers</h2>
    <div class="bestsellers__grid">
      <ProductCard v-for="product in products" :key="product.name" v-bind="product" />
    </div>
  </section>
</template>

<style scoped>
.bestsellers {
  padding: 0 calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.bestsellers__heading {
  margin: 0 0 calc(100vw * 40 / 1920);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.125;
  text-transform: uppercase;
  color: var(--color-white);
}

.bestsellers__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: calc(100vw * 24 / 1920);
}

@media (max-width: 1024px) {
  .bestsellers__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .bestsellers {
    padding: 0 16px 48px;
  }

  .bestsellers__heading {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .bestsellers__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
