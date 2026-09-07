import { reactive, computed } from 'vue'

// Module-scoped state (not created inside the composable function) so every
// component that calls useCart() shares the same cart, e.g. AppHeader's
// badge and the menu page's sidebar both need to reflect the same items.
const items = reactive([])

// Exported (not just used internally) so any component pricing out a single
// cart line — e.g. CartOrderLineItem's per-item total — parses the same way
// the cart's own subtotal does, instead of re-implementing the regex.
export const parsePrice = (price) => Number(String(price).replace(/[^0-9.]/g, '')) || 0

export const useCart = () => {
  const addItem = (product, quantity = 1) => {
    const existing = items.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.push({ ...product, quantity })
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

  const clearCart = () => {
    items.splice(0, items.length)
  }

  const itemCount = computed(() => items.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() => items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0))

  return { items, addItem, removeItem, incrementItem, decrementItem, clearCart, itemCount, subtotal }
}
