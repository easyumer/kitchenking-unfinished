import { reactive, computed } from 'vue'

// Module-scoped state (not created inside the composable function) so every
// component that calls useCart() shares the same cart, e.g. AppHeader's
// badge and the menu page's sidebar both need to reflect the same items.
const items = reactive([])

const parsePrice = (price) => Number(String(price).replace(/[^0-9.]/g, '')) || 0

export const useCart = () => {
  const addItem = (product) => {
    const existing = items.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (id) => {
    const index = items.findIndex((item) => item.id === id)
    if (index !== -1) items.splice(index, 1)
  }

  const incrementItem = (id) => {
    const item = items.find((item) => item.id === id)
    if (item) item.quantity += 1
  }

  const decrementItem = (id) => {
    const item = items.find((item) => item.id === id)
    if (!item) return
    if (item.quantity <= 1) {
      removeItem(id)
    } else {
      item.quantity -= 1
    }
  }

  const itemCount = computed(() => items.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() => items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0))

  return { items, addItem, removeItem, incrementItem, decrementItem, itemCount, subtotal }
}
