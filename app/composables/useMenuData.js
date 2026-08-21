import burgerImg from '~/assets/images/menu-item-burger.jpg'
import burgersCategoryImg from '~/assets/images/menu-category-burgers.jpg'
import bowlsImg from '~/assets/images/menu-category-bowls.jpg'
import wingsImg from '~/assets/images/menu-category-wings.jpg'
import dessertsImg from '~/assets/images/menu-category-desserts.jpg'

// Lychee/Classic Lemonade, the fries, and Jerk Chicken Sliders have no real
// matching photography — the "special-*" assets that look like candidates by
// filename are mismatched stock photos (a cocktail, a sushi bowl), same issue
// already noted in BestsellersSection.vue — so those render ProductCard's
// placeholder instead of a wrong picture.
export const useMenuData = () => [
  {
    id: 'burgers',
    label: 'Burgers & Sandwiches',
    items: [
      {
        id: 'kitchenking-smash-burger',
        price: '$11.99',
        name: 'KitchenKing Smash Burger',
        description:
          'Double smashed beef patties, American cheese, grilled onions, signature house sauce, served on a soft buttery brioche bun.',
        image: burgerImg
      },
      {
        id: 'plantain-smash-burger',
        price: '$13.99',
        name: 'Plantain Smash Burger',
        description:
          'Double smashed beef patties, caramelized sweet plantain, American cheese, signature house sauce, served on a soft buttery brioche bun.',
        image: burgersCategoryImg
      },
      {
        id: 'jerk-chicken-sliders',
        price: '$8.99',
        name: 'Jerk Chicken Sliders',
        description: 'Slow-marinated jerk chicken, pickled slaw, and spicy mayo on soft mini buns.',
        image: null
      }
    ]
  },
  {
    id: 'bowls',
    label: 'Caribbean Bowls',
    items: [
      {
        id: 'char-grilled-chicken-bowl',
        price: '$9.99',
        name: 'Char Grilled Chicken Bowl',
        description: 'Char-grilled chicken, quinoa, roasted pineapple, tomato, and avocado.',
        image: bowlsImg
      },
      {
        id: 'halal-kart-chicken-bowl',
        price: '$9.99',
        name: 'Halal Kart Style Chicken Bowl',
        description: 'Halal-style spiced chicken, seasoned rice, fresh slaw, and house pickles.',
        image: bowlsImg
      },
      {
        id: 'steak-bowl',
        price: '$9.99',
        name: 'Steak Bowl',
        description: 'Grilled steak, quinoa, roasted pineapple, tomato, and avocado.',
        image: bowlsImg
      }
    ]
  },
  {
    id: 'wings',
    label: 'Wings',
    items: [
      {
        id: 'crispy-wings-6pc',
        price: '$5.99',
        name: '6 Piece Crispy Wings',
        description: 'Six crispy fried wings served with a side of house hot sauce.',
        image: wingsImg
      }
    ]
  },
  {
    id: 'fries',
    label: 'Fries',
    items: [
      {
        id: 'seasoned-fries',
        price: '$2.99',
        name: 'Seasoned Fries',
        description: 'Crispy golden fries tossed in our signature seasoning blend.',
        image: null
      },
      {
        id: 'truffle-parmesan-fries',
        price: '$3.99',
        name: 'Truffle Parmesan Loaded Fries',
        description: 'Crispy fries tossed in truffle oil and shaved parmesan, finished with fresh herbs.',
        image: null
      },
      {
        id: 'bacon-loaded-fries',
        price: '$7.99',
        name: 'Bacon Loaded Fries',
        description: 'Crispy fries loaded with crispy bacon, melted cheese, and a drizzle of house sauce.',
        image: null
      }
    ]
  },
  {
    id: 'soft-serve',
    label: 'Soft Serve',
    items: [
      {
        id: 'sweet-plantain-soft-serve',
        price: '$2.99',
        name: 'Sweet Plantain Soft Serve',
        description: 'Creamy soft serve infused with caramelized sweet plantain.',
        image: dessertsImg
      },
      {
        id: 'peach-bellini-soft-serve',
        price: '$3.99',
        name: 'Peach Bellini Soft Serve',
        description: 'Creamy soft serve swirled with peach bellini flavor.',
        image: dessertsImg
      }
    ]
  },
  {
    id: 'drinks',
    label: 'Drinks',
    items: [
      {
        id: 'lychee-lemonade',
        price: '$2.99',
        name: 'Lychee Lemonade',
        description: 'Fresh lychee puree blended with lightly sweetened lemonade, served ice-cold.',
        image: null
      },
      {
        id: 'classic-lemonade',
        price: '$3.99',
        name: 'Classic Lemonade',
        description: 'Fresh-squeezed lemons, lightly sweetened and served ice-cold.',
        image: null
      }
    ]
  }
]
