import { ref } from 'vue'

// Module-scoped state (same pattern as useCart) so the value set by the
// checkout page on "Place Order" is still readable after navigating to
// /order-confirmation and /track-order (the cart itself is cleared on
// placement, so the totals are captured here instead).
const customerName = ref('')
const orderNumber = ref('')
const orderSubtotal = ref(0)
const orderTax = ref(0)
const orderGrandTotal = ref(0)
const orderItemCount = ref(0)
const placedAt = ref(null)

export const useOrderConfirmation = () => {
  const confirmOrder = (name, summary = {}) => {
    customerName.value = name?.trim() || 'Guest'
    orderNumber.value = String(Math.floor(100000 + Math.random() * 900000))
    orderSubtotal.value = summary.subtotal ?? 0
    orderTax.value = summary.tax ?? 0
    orderGrandTotal.value = summary.grandTotal ?? 0
    orderItemCount.value = summary.itemCount ?? 0
    placedAt.value = Date.now()
  }

  return {
    customerName,
    orderNumber,
    orderSubtotal,
    orderTax,
    orderGrandTotal,
    orderItemCount,
    placedAt,
    confirmOrder
  }
}
