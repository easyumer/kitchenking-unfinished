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
//
// Every item carries an optional `customization.groups` array that drives
// ItemCustomizeModal's popup: each group is either "single" (radio, one
// pick) or "multiple" (checkbox, any number), with its own label/pickLabel
// so the popup can say "Sauce" for a burger and "Sweetness" for a drink
// instead of a hardcoded section name.
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
        image: burgerImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 1.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'cheese', label: 'Cheese', priceDelta: 0, default: true },
                { id: 'grilled-onions', label: 'Grilled onions', priceDelta: 0, default: true },
                { id: 'jalapenos', label: 'Jalapeños', priceDelta: 1.5 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'classic-bbq', label: 'Classic BBQ', priceDelta: 0, default: true },
                { id: 'spicy-mayo', label: 'Spicy mayo', priceDelta: 1.5 }
              ]
            }
          ]
        }
      },
      {
        id: 'plantain-smash-burger',
        price: '$13.99',
        name: 'Plantain Smash Burger',
        description:
          'Double smashed beef patties, caramelized sweet plantain, American cheese, signature house sauce, served on a soft buttery brioche bun.',
        image: burgersCategoryImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 1.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'cheese', label: 'Cheese', priceDelta: 0, default: true },
                { id: 'extra-plantain', label: 'Extra plantain', priceDelta: 1.5 },
                { id: 'jalapenos', label: 'Jalapeños', priceDelta: 1.5 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'house-sauce', label: 'Signature house sauce', priceDelta: 0, default: true },
                { id: 'spicy-mayo', label: 'Spicy mayo', priceDelta: 1.5 }
              ]
            }
          ]
        }
      },
      {
        id: 'jerk-chicken-sliders',
        price: '$8.99',
        name: 'Jerk Chicken Sliders',
        description: 'Slow-marinated jerk chicken, pickled slaw, and spicy mayo on soft mini buns.',
        image: null,
        customization: {
          groups: [
            {
              id: 'spice',
              label: 'Spice Level',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'mild', label: 'Mild jerk', priceDelta: 0, default: true },
                { id: 'medium', label: 'Medium jerk', priceDelta: 0 },
                { id: 'scotch-bonnet', label: 'Scotch bonnet hot', priceDelta: 0.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'pickled-slaw', label: 'Pickled slaw', priceDelta: 0, default: true },
                { id: 'extra-slider', label: 'Extra slider (4th bun)', priceDelta: 2 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'spicy-mayo', label: 'Spicy mayo', priceDelta: 0, default: true },
                { id: 'jerk-glaze', label: 'Jerk glaze', priceDelta: 0.5 }
              ]
            }
          ]
        }
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
        image: bowlsImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 2.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'avocado', label: 'Avocado', priceDelta: 0, default: true },
                { id: 'roasted-pineapple', label: 'Roasted pineapple', priceDelta: 0, default: true },
                { id: 'extra-chicken', label: 'Extra chicken', priceDelta: 2.5 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'citrus-vinaigrette', label: 'House citrus vinaigrette', priceDelta: 0, default: true },
                { id: 'spicy-mango', label: 'Spicy mango sauce', priceDelta: 1 },
                { id: 'garlic-aioli', label: 'Garlic aioli', priceDelta: 1 }
              ]
            }
          ]
        }
      },
      {
        id: 'halal-kart-chicken-bowl',
        price: '$9.99',
        name: 'Halal Kart Style Chicken Bowl',
        description: 'Halal-style spiced chicken, seasoned rice, fresh slaw, and house pickles.',
        image: bowlsImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 2.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'fresh-slaw', label: 'Fresh slaw', priceDelta: 0, default: true },
                { id: 'house-pickles', label: 'House pickles', priceDelta: 0, default: true },
                { id: 'extra-chicken', label: 'Extra chicken', priceDelta: 2.5 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'white-garlic', label: 'White garlic sauce', priceDelta: 0, default: true },
                { id: 'red-hot', label: 'Red hot sauce', priceDelta: 0.75 },
                { id: 'both-sauces', label: 'Both sauces', priceDelta: 1 }
              ]
            }
          ]
        }
      },
      {
        id: 'steak-bowl',
        price: '$9.99',
        name: 'Steak Bowl',
        description: 'Grilled steak, quinoa, roasted pineapple, tomato, and avocado.',
        image: bowlsImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 2.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'avocado', label: 'Avocado', priceDelta: 0, default: true },
                { id: 'roasted-pineapple', label: 'Roasted pineapple', priceDelta: 0, default: true },
                { id: 'extra-steak', label: 'Extra steak', priceDelta: 3.5 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'citrus-vinaigrette', label: 'House citrus vinaigrette', priceDelta: 0, default: true },
                { id: 'chimichurri', label: 'Chimichurri', priceDelta: 1 },
                { id: 'garlic-aioli', label: 'Garlic aioli', priceDelta: 1 }
              ]
            }
          ]
        }
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
        image: wingsImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Order Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: '6pc', label: '6 piece', priceDelta: 0, default: true },
                { id: '12pc', label: '12 piece', priceDelta: 5 },
                { id: '18pc', label: '18 piece', priceDelta: 9 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'house-hot', label: 'House hot sauce', priceDelta: 0, default: true },
                { id: 'bbq', label: 'BBQ', priceDelta: 0.5 },
                { id: 'honey-garlic', label: 'Honey garlic', priceDelta: 0.5 },
                { id: 'lemon-pepper', label: 'Lemon pepper dry rub', priceDelta: 0.5 }
              ]
            },
            {
              id: 'dips',
              label: 'Dips',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'celery-carrots', label: 'Celery & carrot sticks', priceDelta: 0, default: true },
                { id: 'ranch', label: 'Ranch', priceDelta: 0.75 },
                { id: 'blue-cheese', label: 'Blue cheese', priceDelta: 0.75 }
              ]
            }
          ]
        }
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
        image: null,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 1.5 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'extra-seasoning', label: 'Extra seasoning', priceDelta: 0, default: true },
                { id: 'cheese-sauce', label: 'Cheese sauce', priceDelta: 1.5 },
                { id: 'bacon-bits', label: 'Bacon bits', priceDelta: 2 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'ketchup', label: 'Ketchup', priceDelta: 0, default: true },
                { id: 'garlic-aioli', label: 'Garlic aioli', priceDelta: 0.75 },
                { id: 'spicy-mayo', label: 'Spicy mayo', priceDelta: 0.75 }
              ]
            }
          ]
        }
      },
      {
        id: 'truffle-parmesan-fries',
        price: '$3.99',
        name: 'Truffle Parmesan Loaded Fries',
        description: 'Crispy fries tossed in truffle oil and shaved parmesan, finished with fresh herbs.',
        image: null,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 2 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'fresh-herbs', label: 'Fresh herbs', priceDelta: 0, default: true },
                { id: 'truffle-drizzle', label: 'Extra truffle oil drizzle', priceDelta: 0, default: true },
                { id: 'extra-parmesan', label: 'Extra parmesan', priceDelta: 1 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'garlic-aioli', label: 'Garlic aioli', priceDelta: 0, default: true },
                { id: 'spicy-mayo', label: 'Spicy mayo', priceDelta: 0.75 }
              ]
            }
          ]
        }
      },
      {
        id: 'bacon-loaded-fries',
        price: '$7.99',
        name: 'Bacon Loaded Fries',
        description: 'Crispy fries loaded with crispy bacon, melted cheese, and a drizzle of house sauce.',
        image: null,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 2 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'melted-cheese', label: 'Melted cheese', priceDelta: 0, default: true },
                { id: 'extra-bacon', label: 'Extra bacon', priceDelta: 2 },
                { id: 'jalapenos', label: 'Jalapeños', priceDelta: 1 }
              ]
            },
            {
              id: 'sauce',
              label: 'Sauce',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'house-sauce', label: 'House sauce drizzle', priceDelta: 0, default: true },
                { id: 'ranch', label: 'Ranch', priceDelta: 0.75 }
              ]
            }
          ]
        }
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
        image: dessertsImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 1 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'toasted-coconut', label: 'Toasted coconut', priceDelta: 0, default: true },
                { id: 'caramel-drizzle', label: 'Caramel drizzle', priceDelta: 0.75 },
                { id: 'crushed-graham', label: 'Crushed graham', priceDelta: 0.75 }
              ]
            }
          ]
        }
      },
      {
        id: 'peach-bellini-soft-serve',
        price: '$3.99',
        name: 'Peach Bellini Soft Serve',
        description: 'Creamy soft serve swirled with peach bellini flavor.',
        image: dessertsImg,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular', priceDelta: 0, default: true },
                { id: 'large', label: 'Large', priceDelta: 1 }
              ]
            },
            {
              id: 'toppings',
              label: 'Toppings',
              type: 'multiple',
              pickLabel: 'Pick any',
              options: [
                { id: 'peach-bits', label: 'Peach bits', priceDelta: 0, default: true },
                { id: 'whipped-cream', label: 'Whipped cream', priceDelta: 0.5 },
                { id: 'sprinkles', label: 'Sprinkles', priceDelta: 0.5 }
              ]
            }
          ]
        }
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
        image: null,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'small', label: 'Small', priceDelta: 0, default: true },
                { id: 'medium', label: 'Medium', priceDelta: 0.75 },
                { id: 'large', label: 'Large', priceDelta: 1.5 }
              ]
            },
            {
              id: 'sweetness',
              label: 'Sweetness',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular sweet', priceDelta: 0, default: true },
                { id: 'less-sweet', label: 'Less sweet', priceDelta: 0 },
                { id: 'extra-sweet', label: 'Extra sweet', priceDelta: 0 }
              ]
            }
          ]
        }
      },
      {
        id: 'classic-lemonade',
        price: '$3.99',
        name: 'Classic Lemonade',
        description: 'Fresh-squeezed lemons, lightly sweetened and served ice-cold.',
        image: null,
        customization: {
          groups: [
            {
              id: 'size',
              label: 'Size',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'small', label: 'Small', priceDelta: 0, default: true },
                { id: 'medium', label: 'Medium', priceDelta: 0.75 },
                { id: 'large', label: 'Large', priceDelta: 1.5 }
              ]
            },
            {
              id: 'sweetness',
              label: 'Sweetness',
              type: 'single',
              pickLabel: 'Pick one',
              options: [
                { id: 'regular', label: 'Regular sweet', priceDelta: 0, default: true },
                { id: 'less-sweet', label: 'Less sweet', priceDelta: 0 },
                { id: 'extra-sweet', label: 'Extra sweet', priceDelta: 0 }
              ]
            }
          ]
        }
      }
    ]
  }
]
